import { addYears, parseISO, formatISO } from 'date-fns';
import { resolveInstrument } from './resolveYahooInstrument.js';
import { getPriceOnOrAfter, getPriceWithFallback } from './priceProviderYahoo.js';
import { getFxRateToEUR, convertToEUR } from './getFxRate.js';
import { normalizeMinorUnits } from './priceNormalizer.js';
import { classifyIsin } from './instrumentClassifier.js';

/**
 * Apply FIFO to reduce holdings by sales.
 * Critical: Only sells matching the ISIN are applied to that ISIN's holdings.
 * If sell has no ISIN, fall back to ticker matching.
 * Returns remaining holdings with per-lot remainingQty.
 */
function applyFIFOSales(buyLots, sellLots) {
  const result = {
    remaining: buyLots.map((lot) => ({
      ...lot,
      remainingQty: lot.quantity,
    })),
    soldByLot: {},
  };

  // Helper: check if a string looks like an ISIN (12 chars, starts with letter, etc)
  const isLikelyIsin = (str) => {
    if (!str) return false;
    return /^[A-Z]{2}[A-Z0-9]{9}[0-9]$/.test(str);
  };

  // Group sells by ISIN or ticker
  const sellsByKey = {};
  for (const sell of sellLots) {
    // Prefer ISIN if it looks valid, otherwise use ticker
    const key = (sell.isin && isLikelyIsin(sell.isin)) 
      ? sell.isin 
      : (sell.ticker || 'UNKNOWN');
    if (!sellsByKey[key]) {
      sellsByKey[key] = [];
    }
    sellsByKey[key].push({ sell, keyType: (sell.isin && isLikelyIsin(sell.isin)) ? 'ISIN' : 'TICKER' });
  }

  // For each key (ISIN or ticker), apply FIFO sales to that key's holdings only
  for (const key in sellsByKey) {
    const sellsWithType = sellsByKey[key];
    const keyType = sellsWithType[0]?.keyType;
    
    // Sort sells by date
    const sortedSells = sellsWithType.sort(
      (a, b) => new Date(a.sell.dateObj) - new Date(b.sell.dateObj)
    );

    // Get lots for this key
    const lotsForKey = result.remaining
      .map((lot, idx) => ({ lot, idx }))
      .filter((item) => {
        if (keyType === 'ISIN') {
          return (item.lot.isin || 'UNKNOWN') === key;
        } else {
          return (item.lot.ticker || 'UNKNOWN') === key;
        }
      });

    // Apply FIFO sells to matching lots only
    for (const { sell } of sortedSells) {
      let qtyRemaining = sell.quantity;

      for (const { lot, idx } of lotsForKey) {
        if (qtyRemaining <= 0) break;
        
        const qtyToReduce = Math.min(qtyRemaining, lot.remainingQty);
        lot.remainingQty -= qtyToReduce;
        qtyRemaining -= qtyToReduce;

        if (!result.soldByLot[idx]) {
          result.soldByLot[idx] = 0;
        }
        result.soldByLot[idx] += qtyToReduce;
      }
    }
  }

  return result;
}

/**
 * Compute deemed disposal events and tax for a set of transactions.
 * 
 * @param {Object} opts - {transactions (normalized), taxYear}
 * @returns {Promise<Object>} {totalTax, detail: [{...}, ...]}
 */
export async function computeDeemedDisposal({ transactions, taxYear }) {
  const rows = [];
  const ignored = [];
  let totalTax = 0;

  if (!Array.isArray(transactions) || transactions.length === 0) {
    return { totalTax: 0, rows: [], ignored: [] };
  }

  const buyLots = transactions.filter((t) => t.isBuy);
  const sellLots = transactions.filter((t) => t.isSell);
  
  // Stage logging
  if (process.env.DEBUG_PRICES === '1') {
    console.log('[deemedDisposal] Pipeline Stage Summary:');
    console.log(`  Transactions parsed: ${transactions.length}`);
    console.log(`  Buy lots created: ${buyLots.length}`);
    if (buyLots.length > 0) {
      console.log(`    Sample (first 5): ${buyLots.slice(0, 5).map(b => `${b.ticker}(${b.isin}): ${b.dateISO} qty=${b.quantity}`).join(', ')}`);
    }
    console.log(`  Sell lots created: ${sellLots.length}`);
  }
  
  const { remaining } = applyFIFOSales(buyLots, sellLots);
  
  if (process.env.DEBUG_PRICES === '1') {
    console.log(`  Buy lots after FIFO sales: ${remaining.length}`);
    if (remaining.length > 0) {
      console.log(`    Sample (first 5): ${remaining.slice(0, 5).map(b => `${b.ticker}(${b.isin}): ${b.dateISO} qty=${b.remainingQty}`).join(', ')}`);
    }
  }

  const lotsForYear = remaining.filter((lot) => {
    if (lot.remainingQty <= 0) return false;
    const ddDate = addYears(lot.dateObj, 8);
    const ddYear = ddDate.getFullYear();
    return ddYear === taxYear;
  });
  
  if (process.env.DEBUG_PRICES === '1') {
    console.log(`  Lots with ddDate in tax year ${taxYear}: ${lotsForYear.length}`);
    if (lotsForYear.length > 0) {
      console.log(`    Sample (first 5): ${lotsForYear.slice(0, 5).map(b => `${b.ticker}(${b.isin}): ${b.dateISO}`).join(', ')}`);
    }
  }

  for (const lot of remaining) {
    if (lot.remainingQty <= 0) continue;
    const ddDate = addYears(lot.dateObj, 8);
    const ddYear = ddDate.getFullYear();
    if (ddYear !== taxYear) continue;
    const ddDateISO = formatISO(ddDate, { representation: 'date' });

    if (process.env.DEBUG_PRICES === '1') {
      console.log(
        `[computeDeemedDisposal] Processing ${lot.ticker} (ISIN: ${lot.isin}): buyDate=${lot.dateISO}, ddDate=${ddDateISO}, remainingQty=${lot.remainingQty}`
      );
    }

    const audit = { buy: {}, dd: {} };

    // Layer 1: Classify ISIN (authoritative ETF detection)
    const classification = await classifyIsin(lot.isin);
    audit.classification = { isin: classification.isin, isEtf: classification.isEtf, confidence: classification.confidence, source: classification.source };

    if (process.env.DEBUG_PRICES === '1') {
      console.log('[deemedDisposal.classifyIsin]', {
        isin: classification.isin,
        isEtf: classification.isEtf,
        confidence: classification.confidence,
        source: classification.source,
      });
    }

    // Strict ETF-only policy: process only positively classified ETFs
    if (classification.isEtf !== true) {
      const reason = classification.isEtf === false
        ? 'Not an ETF (authoritative classification)'
        : 'ETF classification unknown; add ISIN override to confirm ETF status';
      ignored.push({ isin: lot.isin, brokerTicker: lot.ticker, buyDate: lot.dateISO, reason });
      continue;
    }

    // Layer 2: Resolve symbol (non-ETF gating removed here)
    const resolution = await resolveInstrument({
      isin: lot.isin,
      brokerTicker: lot.ticker,
      tradeCurrency: lot.tradeCurrency,
      name: lot.name,
      preferredCurrency: lot.totalCurrency === 'EUR' ? 'EUR' : lot.priceCurrency || 'EUR',
    });

    if (process.env.DEBUG_PRICES === '1') {
      console.log('[deemedDisposal.resolveInstrument]', {
        isin: lot.isin,
        yahooSymbol: resolution.yahooSymbol,
        status: resolution.status,
        quoteMeta: resolution.yahooQuoteMeta,
      });
    }

    if (resolution.status !== 'resolved' || !resolution.bestSymbol) {
      ignored.push({ isin: lot.isin, brokerTicker: lot.ticker, buyDate: lot.dateISO, reason: resolution.reason || 'No Yahoo symbol found' });
      continue;
    }

    const isLikelyUcits = !!lot.isin && /^(IE|LU)/i.test(lot.isin);
    const bestSymbol = resolution.bestSymbol;
    const allSymbols = resolution.allCandidates?.map(c => c.symbol) || [bestSymbol];
    const yahooQuoteCurrency = resolution.yahooQuoteMeta?.currency || 'EUR';

    const priceNativeVal = lot.priceNative ?? lot.price ?? null;
    const priceCurrencyVal = lot.priceCurrency ?? lot.currencyPrice ?? lot.tradeCurrency ?? null;
    const totalValueVal = lot.totalValue ?? lot.totalNative ?? null;
    const totalCurrencyVal = lot.totalCurrency ?? lot.currencyTotal ?? null;

    let buyPriceEUR = null;

    // a) use EUR total
    if (totalValueVal != null && totalCurrencyVal === 'EUR') {
      buyPriceEUR = totalValueVal / lot.quantity;
      audit.buy = { priceNative: buyPriceEUR, currency: 'EUR', totalEurUsed: true, fx: null };
    }
    // b) use EUR price
    if (buyPriceEUR == null && priceNativeVal != null && priceCurrencyVal === 'EUR') {
      buyPriceEUR = priceNativeVal;
      audit.buy = { priceNative: priceNativeVal, currency: 'EUR', totalEurUsed: false, fx: null };
    }
    // c) convert total non-EUR
    if (buyPriceEUR == null && totalValueVal != null && totalCurrencyVal && totalCurrencyVal !== 'EUR') {
      const { amountEUR, fx } = await convertToEUR(totalValueVal / lot.quantity, totalCurrencyVal, lot.dateISO);
      if (amountEUR != null) {
        buyPriceEUR = amountEUR;
        audit.buy = { priceNative: totalValueVal / lot.quantity, currency: totalCurrencyVal, totalEurUsed: false, fx };
      }
    }
    // d) convert price non-EUR
    if (buyPriceEUR == null && priceNativeVal != null && priceCurrencyVal && priceCurrencyVal !== 'EUR') {
      const { amountEUR, fx } = await convertToEUR(priceNativeVal, priceCurrencyVal, lot.dateISO);
      if (amountEUR != null) {
        buyPriceEUR = amountEUR;
        audit.buy = { priceNative: priceNativeVal, currency: priceCurrencyVal, totalEurUsed: false, fx };
      }
    }
    // e) fallback market + FX (try all candidates)
    if (buyPriceEUR == null && allSymbols && allSymbols.length > 0) {
      try {
        const fallbackResult = await getPriceWithFallback(allSymbols, lot.dateISO);
        if (fallbackResult.success && fallbackResult.price && fallbackResult.price.rawPrice != null) {
          const mkt = fallbackResult.price;
          const normalized = normalizeMinorUnits(mkt.rawPrice, mkt.rawCurrency, fallbackResult.attempts[0].symbol);
          const { amountEUR, fx } = await convertToEUR(normalized.price, normalized.currency, lot.dateISO);
          if (amountEUR != null) {
            buyPriceEUR = amountEUR;
            audit.buy = {
              priceNative: mkt.rawPrice,
              currency: mkt.rawCurrency,
              quoteRaw: { price: mkt.rawPrice, currency: mkt.rawCurrency },
              quoteNormalized: { price: normalized.price, currency: normalized.currency, unitAdjusted: normalized.unitAdjusted },
              dateUsed: mkt.dateUsed,
              source: mkt.source,
              totalEurUsed: false,
              fx,
              symbolTried: fallbackResult.attempts[0].symbol,
            };
          }
        }
      } catch (_) {}
    }

    const ddPriceResult = await getPriceWithFallback(allSymbols, ddDateISO);
    
    audit.dd.resolutionCandidates = {
      bestSymbol,
      allAttempted: allSymbols,
      fallbackAttempts: ddPriceResult.attempts,
    };

    if (!ddPriceResult.success) {
      ignored.push({
        isin: lot.isin,
        brokerTicker: lot.ticker,
        buyDate: lot.dateISO,
        reason: ddPriceResult.reason || 'DD price not available from any candidate',
      });
      continue;
    }

    const ddPriceInfo = ddPriceResult.price;
    const ddPriceRaw = ddPriceInfo?.rawPrice ?? null;
    const ddCurrencyRaw = ddPriceInfo?.rawCurrency ?? null;
    
    audit.dd.quoteRaw = { price: ddPriceRaw, currency: ddCurrencyRaw };
    audit.dd.dateUsed = ddPriceInfo?.dateUsed;
    audit.dd.source = ddPriceInfo?.source;

    if (ddPriceRaw == null) {
      ignored.push({ isin: lot.isin, brokerTicker: lot.ticker, buyDate: lot.dateISO, reason: 'DD price not available' });
      continue;
    }

    const ddNormalized = normalizeMinorUnits(ddPriceRaw, ddCurrencyRaw, bestSymbol);
    audit.dd.quoteNormalized = { price: ddNormalized.price, currency: ddNormalized.currency, unitAdjusted: ddNormalized.unitAdjusted };

    const { amountEUR: ddPriceEUR, fx: fxDd } = await convertToEUR(ddNormalized.price, ddNormalized.currency, ddDateISO);
    audit.dd.fx = fxDd;

    if (ddPriceEUR == null) {
      ignored.push({ isin: lot.isin, brokerTicker: lot.ticker, buyDate: lot.dateISO, reason: 'FX conversion failed' });
      continue;
    }

    if (buyPriceEUR == null) {
      ignored.push({ isin: lot.isin, brokerTicker: lot.ticker, buyDate: lot.dateISO, reason: 'Buy price in EUR not available' });
      continue;
    }

    const gainPerUnit = ddPriceEUR - buyPriceEUR;
    const gainTotal = gainPerUnit * lot.remainingQty;
    const taxAmount = Math.max(gainTotal, 0) * 0.38;
    totalTax += taxAmount;

    // Build notes
    const notes = [];
    if (!isLikelyUcits) {
      notes.push('This holding may not be an EU/UCITS fund; Irish tax treatment may differ.');
    }
    rows.push({
      isin: lot.isin,
      brokerTicker: lot.ticker,
      yahooSymbol: bestSymbol,
      buyDate: lot.dateISO,
      ddDate: ddDateISO,
      quantity: lot.remainingQty,
      buyPriceEur: Number(buyPriceEUR.toFixed(4)),
      ddPriceEur: Number(ddPriceEUR.toFixed(4)),
      gainEur: Number(gainTotal.toFixed(2)),
      taxEur: Number(taxAmount.toFixed(2)),
      audit,
      notes,
    });
  }

  if (process.env.DEBUG_PRICES === '1') {
    console.log(`[deemedDisposal] Final output rows: ${rows.length}`);
    console.log(`[deemedDisposal] Ignored rows: ${ignored.length}`);
  }

  return { totalTax: Number(totalTax.toFixed(2)), rows, ignored };
}

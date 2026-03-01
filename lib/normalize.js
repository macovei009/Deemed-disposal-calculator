// lib/normalize.js
import { parseISO, formatISO, parse } from 'date-fns';

/**
 * Normalize header names: trim spaces, collapse repeated spaces, handle encoding issues.
 */
function normalizeHeaderName(name) {
  if (!name) return '';
  return String(name)
    .replace(/\u00A0/g, ' ')       // non-breaking spaces
    .trim()
    .replace(/\s+/g, ' ')          // collapse repeated spaces
    .toLowerCase();
}

/**
 * Find a column key by normalized header names with aliases.
 */
function findKey(obj, candidates) {
  if (!obj) return null;
  const keys = Object.keys(obj);
  const normalizedKeys = new Map();
  
  // Build map of normalized → original
  for (const k of keys) {
    normalizedKeys.set(normalizeHeaderName(k), k);
  }

  // Try each candidate (in order of preference)
  for (const c of candidates) {
    const norm = normalizeHeaderName(c);
    if (normalizedKeys.has(norm)) {
      return normalizedKeys.get(norm);
    }
  }
  return null;
}

function toNumber(v) {
  if (v == null) return NaN;
  const s = String(v)
    .replace(/\u00A0/g, ' ')       // non-breaking spaces
    .trim()
    .replace(/[,\s]/g, '')         // commas/spaces
    .replace(/[^0-9.\-]/g, '');    // keep digits . -
  const n = Number(s);
  return isNaN(n) ? NaN : n;
}

/**
 * Parse dates in DD/MM/YYYY HH:MM format or ISO format.
 */
function parseDate(dateRaw) {
  if (!dateRaw) return null;
  
  const s = String(dateRaw).trim();
  
  // Try ISO first
  try {
    const iso = parseISO(s);
    if (!isNaN(iso.getTime())) return iso;
  } catch (_) {}
  
  // Try DD/MM/YYYY HH:MM format (with or without time)
  try {
    // Pattern: 25/07/2016 02:44 or similar
    const datefnsMatch = s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})\s*(.*)$/);
    if (datefnsMatch) {
      const [, day, month, year, timeStr] = datefnsMatch;
      const dateStr = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}${timeStr ? ' ' + timeStr : ''}`;
      const parsed = parse(dateStr, 'yyyy-MM-dd HH:mm', new Date());
      if (!isNaN(parsed.getTime())) return parsed;
    }
  } catch (_) {}
  
  // Last resort: native Date constructor
  try {
    const alt = new Date(s);
    if (!isNaN(alt.getTime())) return alt;
  } catch (_) {}
  
  return null;
}

export function normalizeRows(rows) {
  if (!Array.isArray(rows)) return [];

  const summary = {
    totalRows: rows.length,
    rowsParsed: 0,
    marketBuysFound: 0,
    marketSellsFound: 0,
    isinPresent: 0,
    accepted: {
      buys: [],
      sells: [],
    },
    skipped: {
      nonBuyAction: [],
      missingQuantity: [],
      missingPriceAndTotal: [],
      dateParseFailure: [],
      other: [],
    },
    trace: [], // Individual row traces
  };

  const normalized = rows
    .map((raw, idx) => {
      const rowNum = idx + 1;
      summary.rowsParsed++;

      // Column detection with tracing
      const dateKey = findKey(raw, ['time', 'date', 'execution time', 'order time', 'timestamp']);
      const actionKey = findKey(raw, ['action', 'type', 'operation']);
      const isinKey = findKey(raw, ['isin']);
      const tickerKey = findKey(raw, ['ticker', 'symbol']);
      const nameKey = findKey(raw, ['name', 'product name', 'description']);
      const qtyKey = findKey(raw, ['no. of shares', 'quantity', 'qty', 'shares']);
      const priceKey = findKey(raw, ['price / share', 'price per share', 'execution price', 'price']);
      const priceCurrencyKey = findKey(raw, ['currency (price / share)', 'currency (price)']);
      const totalKey = findKey(raw, ['total', 'amount']);
      const totalCurrencyKey = findKey(raw, ['currency (total)', 'currency (amount)']);
      const exchangeRateKey = findKey(raw, ['exchange rate']);

      // Extract raw values
      const action = actionKey ? String(raw[actionKey]).trim() : '';
      const dateRaw = dateKey ? String(raw[dateKey]).trim() : null;
      const name = nameKey ? String(raw[nameKey]).trim() : null;
      const isin = isinKey ? String(raw[isinKey]).trim() : null;
      const ticker = tickerKey ? String(raw[tickerKey]).trim() : null;

      // CRITICAL: Parse quantity directly and ONLY from the CSV
      // Do NOT allow it to be null unless the column is genuinely missing
      const qtyRaw = qtyKey ? raw[qtyKey] : null;
      const quantity = toNumber(qtyRaw);
      
      let priceNative = toNumber(priceKey ? raw[priceKey] : null);
      let totalNative = toNumber(totalKey ? raw[totalKey] : null);
      const exchangeRate = toNumber(exchangeRateKey ? raw[exchangeRateKey] : null);

      const currencyPrice = priceCurrencyKey ? String(raw[priceCurrencyKey]).trim().toUpperCase() : null;
      const currencyTotal = totalCurrencyKey ? String(raw[totalCurrencyKey]).trim().toUpperCase() : null;
      const fxRate = exchangeRateKey ? toNumber(raw[exchangeRateKey]) : null;

      // Determine transaction currency (prefer total currency, fallback to price currency)
      const tradeCurrency = currencyTotal || currencyPrice || 'EUR';

      // Parse date
      let dateObj = null;
      let dateISO = null;
      if (dateRaw) {
        dateObj = parseDate(dateRaw);
        if (dateObj) {
          dateISO = formatISO(dateObj, { representation: 'date' });
        }
      }

      const actionLower = (action || '').toLowerCase();
      const isBuy = actionLower.includes('market buy');
      const isSell = actionLower.includes('market sell');

      // Trace this row (for buy/sell only)
      if (isBuy || isSell) {
        summary.trace.push({
          rowNum,
          action,
          date: dateRaw,
          dateISO,
          isin,
          ticker,
          qtyRaw,      // Raw value from CSV
          quantity,    // Parsed quantity
          priceRaw: priceKey ? raw[priceKey] : null,
          priceNative,
          priceCurrency: currencyPrice,
          totalRaw: totalKey ? raw[totalKey] : null,
          totalNative,
          totalCurrency: currencyTotal,
          tradeCurrency,
        });
      }

      // If price is missing but total & quantity exist, derive it
      if ((priceNative == null || isNaN(priceNative)) && !isNaN(totalNative) && !isNaN(quantity) && quantity > 0) {
        priceNative = Math.abs(totalNative) / quantity;
      }

      // Compute total if missing
      if ((totalNative == null || isNaN(totalNative)) && !isNaN(priceNative) && !isNaN(quantity)) {
        totalNative = priceNative * quantity;
      }

      // Compute EUR values if we have exchange rate
      let buyPriceEUR = null;
      let totalEUR = null;
      if (isBuy) {
        if (tradeCurrency === 'EUR' || tradeCurrency === undefined) {
          buyPriceEUR = priceNative;
          totalEUR = totalNative;
        } else if (!isNaN(exchangeRate) && exchangeRate > 0) {
          buyPriceEUR = !isNaN(priceNative) ? priceNative * exchangeRate : null;
          totalEUR = !isNaN(totalNative) ? totalNative * exchangeRate : null;
        }
      }

      return {
        raw,
        action,
        isBuy,
        isSell,
        date: dateRaw,
        dateObj,
        dateISO,
        isin: isin || null,
        ticker: ticker || null,
        brokerTicker: ticker || null,
        name: name || null,
        quantity: isNaN(quantity) ? null : quantity,
        priceNative: isNaN(priceNative) ? null : priceNative,
        priceCurrency: currencyPrice || 'EUR',
        currencyPrice: currencyPrice || 'EUR',
        totalValue: isNaN(totalNative) ? null : Math.abs(totalNative),
        totalNative: isNaN(totalNative) ? null : Math.abs(totalNative),
        totalCurrency: currencyTotal || 'EUR',
        currencyTotal: currencyTotal || 'EUR',
        tradeCurrency,
        fxRate: isNaN(fxRate) ? null : fxRate,
        exchangeRate: isNaN(fxRate) ? null : fxRate,
        buyPriceEUR,
        totalEUR,
        _rowNum: rowNum,
      };
    })
    .filter((r) => {
      // Accept buys and sells, but track why we skip rows
      if (r.isBuy) {
        summary.marketBuysFound++;
        if (r.isin) summary.isinPresent++;
      } else if (r.isSell) {
        summary.marketSellsFound++;
        if (r.isin) summary.isinPresent++;
      } else {
        summary.skipped.nonBuyAction.push(r._rowNum);
        return false;
      }

      // Check for required fields
      if (!r.dateObj) {
        summary.skipped.dateParseFailure.push(r._rowNum);
        return false;
      }

      if (r.quantity == null || isNaN(r.quantity) || r.quantity <= 0) {
        summary.skipped.missingQuantity.push(r._rowNum);
        return false;
      }

      // Require either price or total
      if (!r.priceNative && !r.totalNative) {
        summary.skipped.missingPriceAndTotal.push(r._rowNum);
        return false;
      }

      if (r.isBuy) {
        summary.accepted.buys.push(r);
      } else if (r.isSell) {
        summary.accepted.sells.push(r);
      }

      return true;
    });

  // Attach summary to exported object
  return {
    transactions: normalized,
    summary,
  };
}
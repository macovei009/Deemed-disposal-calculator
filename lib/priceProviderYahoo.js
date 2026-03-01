import { yahooFinance } from './yahooClient.js';
import { subDays, addDays, formatISO, parseISO, isAfter } from 'date-fns';

// In-memory cache: key = "SYMBOL|DATE_ISO" => price
const priceCache = new Map();

/**
 * Get the close price (or first available) on or after a target date.
 * Uses daily candles fetched from Yahoo Finance.
 * 
 * @param {string} symbol - Yahoo Finance symbol (e.g., "VUSA.L")
 * @param {string} dateISO - ISO date string (e.g., "2024-05-10")
 * @returns {Promise<number|null>} Adjusted close price or null if not found
 */
/**
 * Get price info on or after a date.
 *
 * @param {string} symbol - Yahoo symbol
 * @param {string} dateISO - target ISO date string
 * @returns {Promise<{price:number|null, currency:string|null, rawCurrency:string|null, rawPrice:number|null, dateUsed:string|null, source:string}|null>}
 */
export async function getPriceOnOrAfter(symbol, dateISO) {
  if (!symbol || !dateISO) {
    return null;
  }

  // cache uses same key
  const cacheKey = `${symbol}|${dateISO}`;
  if (priceCache.has(cacheKey)) {
    const cached = priceCache.get(cacheKey);
    if (process.env.DEBUG_PRICES === '1') {
      console.log(`[priceProviderYahoo] Cache hit for ${cacheKey} →`, cached);
    }
    return cached;
  }

  if (process.env.TEST_MODE === '1') {
    const target = parseISO(dateISO);
    const synthetic =
      (target.getFullYear() % 2000) +
      (target.getMonth() + 1) +
      target.getDate() / 100;
    const price = Number(synthetic.toFixed(4));
    const result = {
      price,
      currency: 'EUR',
      rawPrice: price,
      rawCurrency: 'EUR',
      dateUsed: dateISO,
      source: 'testmode',
    };
    priceCache.set(cacheKey, result);
    return result;
  }

  try {
    const target = parseISO(dateISO);
    const start = subDays(target, 5);
    const end = addDays(target, 25);

    const period1 = formatISO(start, { representation: 'date' });
    const period2 = formatISO(end, { representation: 'date' });

    if (process.env.DEBUG_PRICES === '1') {
      console.log(
        `[priceProviderYahoo] Fetching ${symbol} for ${dateISO} (window: ${period1} to ${period2})`
      );
    }

    let candles = [];
    let source = 'historical';

    try {
      candles = await yahooFinance.historical(symbol, {
        period1,
        period2,
        interval: '1d',
      });
    } catch (e) {
      source = 'chart';
      if (process.env.DEBUG_PRICES === '1') {
        console.log(
          `[priceProviderYahoo] historical() failed for ${symbol}, trying chart(): ${e.message}`
        );
      }
      try {
        const chart = await yahooFinance.chart(symbol, {
          period1,
          period2,
          interval: '1d',
        });
        candles = chart?.quotes || chart?.chart?.result?.[0]?.indicators?.quote?.[0] || [];
      } catch (e2) {
        if (process.env.DEBUG_PRICES === '1') {
          console.log(`[priceProviderYahoo] chart() also failed for ${symbol}: ${e2.message}`);
        }
        throw e2;
      }
    }

    if (!Array.isArray(candles) || candles.length === 0) {
      if (process.env.DEBUG_PRICES === '1') {
        console.log(`[priceProviderYahoo] No candles found for ${symbol}`);
      }
      const result = { price: null, currency: null, rawPrice: null, rawCurrency: null, dateUsed: null, source };
      priceCache.set(cacheKey, result);
      return result;
    }

    candles.sort((a, b) => new Date(a.date) - new Date(b.date));
    const found = candles.find((c) => {
      const cDate = new Date(c.date);
      return !isAfter(target, cDate);
    });
    const chosen = found || candles[candles.length - 1];
    const price = chosen?.adjClose ?? chosen?.close ?? null;
    const dateUsed = chosen?.date ? formatISO(new Date(chosen.date), { representation: 'date' }) : null;

    // determine currency via quote lookup
    let currency = null;
    try {
      const quote = await yahooFinance.quote(symbol);
      currency = quote?.currency || null;
    } catch {
      // ignore
    }

    if (process.env.DEBUG_PRICES === '1') {
      console.log(
        `[priceProviderYahoo] ${symbol} on/after ${dateISO}: chose ${dateUsed}, price=${price}, currency=${currency}`
      );
    }

    const result = { price, currency, rawPrice: price, rawCurrency: currency, dateUsed, source };
    priceCache.set(cacheKey, result);
    return result;
  } catch (e) {
    if (process.env.DEBUG_PRICES === '1') {
      console.log(`[priceProviderYahoo] Error fetching ${symbol}: ${e.message}`);
    }
    const result = { price: null, currency: null, rawPrice: null, rawCurrency: null, dateUsed: null, source: 'error' };
    priceCache.set(cacheKey, result);
    return result;
  }
}

/**
 * Try to get price from multiple candidate symbols, using fallback logic.
 * Attempts each symbol in order and returns the first successful result with diagnostics.
 *
 * @param {Array<string>} symbols - List of Yahoo symbols to try, in preference order
 * @param {string} dateISO - Target ISO date
 * @returns {Promise<{success: boolean, price: object | null, attempts: Array, reason: string | null}>}
 */
export async function getPriceWithFallback(symbols, dateISO) {
  if (!Array.isArray(symbols) || symbols.length === 0) {
    return { success: false, price: null, attempts: [], reason: 'No symbols provided' };
  }

  const attempts = [];

  for (let i = 0; i < symbols.length; i++) {
    const sym = symbols[i];
    if (!sym) continue;

    try {
      const result = await getPriceOnOrAfter(sym, dateISO);

      if (result && result.rawPrice != null && result.rawCurrency != null) {
        if (process.env.DEBUG_PRICES === '1') {
          console.log(`[getPriceWithFallback] Success on ${sym}:`, result);
        }
        attempts.push({
          symbol: sym,
          success: true,
          price: result.rawPrice,
          currency: result.rawCurrency,
          dateUsed: result.dateUsed,
        });
        return { success: true, price: result, attempts, reason: null };
      } else {
        attempts.push({
          symbol: sym,
          success: false,
          reason: 'No price/currency data returned',
        });
      }
    } catch (err) {
      attempts.push({
        symbol: sym,
        success: false,
        reason: `Error: ${err.message}`,
      });
      if (process.env.DEBUG_PRICES === '1') {
        console.log(`[getPriceWithFallback] ${sym} failed:`, err.message);
      }
    }
  }

  const failureReasons = attempts.map((a) => `${a.symbol}: ${a.reason}`).join('; ');
  return {
    success: false,
    price: null,
    attempts,
    reason: `All candidates failed: ${failureReasons}`,
  };
}

/**
 * Clear the price cache (useful for testing).
 */
export function clearPriceCache() {
  priceCache.clear();
}

import { getPriceOnOrAfter } from './priceProviderYahoo.js';

// cache key = `${currency}|${dateISO}` => fxInfo
const fxCache = new Map();

/**
 * Get FX rate to EUR for a given currency on or after a date.
 *
 * Returned object describes the conversion so consumers can audit.
 *
 * @param {string} currencyCode e.g. 'USD','GBP','EUR','GBX'
 * @param {string} dateISO ISO date string
 * @returns {Promise<{fxToEur:number|null,fxPair:string|null,fxDateUsed:string|null,appliedGbxToGbp:boolean,source:string}>}
 */
export async function getFxRateToEUR(currencyCode, dateISO) {
  const resultTemplate = {
    fxToEur: null,
    fxPair: null,
    fxDateUsed: null,
    appliedGbxToGbp: false,
    source: 'yahoo',
  };

  if (!currencyCode || !dateISO) return resultTemplate;
  let ccy = String(currencyCode).toUpperCase();
  if (ccy === 'EUR') {
    return { ...resultTemplate, fxToEur: 1, fxPair: 'EUR', fxDateUsed: dateISO };
  }
  if (ccy === 'GBX' || ccy === 'GBp') {
    ccy = 'GBP';
    resultTemplate.appliedGbxToGbp = true;
  }

  const cacheKey = `${ccy}|${dateISO}`;
  if (fxCache.has(cacheKey)) {
    const cached = fxCache.get(cacheKey);
    if (process.env.DEBUG_PRICES === '1') {
      console.log(`[getFxRate] cache hit ${cacheKey} ->`, cached);
    }
    return cached;
  }

  const pair1 = `${ccy}EUR=X`;
  const pair2 = `EUR${ccy}=X`;
  let rate = null;
  let pairUsed = null;
  let dateUsed = null;

  try {
    const res1 = await getPriceOnOrAfter(pair1, dateISO);
    if (res1 && res1.price != null) {
      rate = res1.price;
      pairUsed = pair1;
      dateUsed = res1.dateUsed;
    } else {
      const res2 = await getPriceOnOrAfter(pair2, dateISO);
      if (res2 && res2.price != null) {
        rate = res2.price !== 0 ? 1 / res2.price : null;
        pairUsed = pair2;
        dateUsed = res2.dateUsed;
      }
    }
  } catch (e) {
    if (process.env.DEBUG_PRICES === '1') {
      console.log(`[getFxRate] error fetching FX ${currencyCode}: ${e.message}`);
    }
    rate = null;
  }

  const fxInfo = {
    fxToEur: rate,
    fxPair: pairUsed,
    fxDateUsed: dateUsed,
    appliedGbxToGbp: resultTemplate.appliedGbxToGbp,
    source: 'yahoo',
  };
  fxCache.set(cacheKey, fxInfo);
  return fxInfo;
}

/**
 * Convert a native amount to EUR, returning both converted value and fx details.
 */
export async function convertToEUR(amount, currencyCode, dateISO) {
  if (amount == null || isNaN(amount)) return { amountEUR: null, fx: null };
  const fx = await getFxRateToEUR(currencyCode, dateISO);
  if (fx.fxToEur == null) return { amountEUR: null, fx };
  return { amountEUR: amount * fx.fxToEur, fx };
}

export function clearFxCache() {
  fxCache.clear();
}

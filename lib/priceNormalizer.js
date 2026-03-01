/**
 * Normalize minor currency units (GBp/GBX, EUC, USC, ZAC) into major units.
 * Returns normalized price and currency along with unitAdjusted flag and raw copy.
 * 
 * CRITICAL: GBp/GBx (pence) ÷100, but GBP (pounds) ×1. Must be case-sensitive!
 */
export function normalizeMinorUnits(price, currency, symbol = null) {
  const raw = { price, currency };
  if (price == null || isNaN(price)) return { price: null, currency: currency || null, unitAdjusted: false, raw };
  if (!currency) return { price: null, currency: null, unitAdjusted: false, raw };

  const c = String(currency).trim();
  const upper = c.toUpperCase();

  // Layer 1: Handle GBX/GBx/gbx variants (pence, needs ÷100)
  // The key distinction: GBX/GBx (pence) vs GBP (pounds)
  if (upper === 'GBX') {
    // GBX in any case is pence
    if (process.env.DEBUG_PRICES === '1') {
      console.log(`[normalizeMinorUnits] ${c} detected as GBX pence, dividing by 100`);
    }
    return { price: Number((price / 100).toFixed(8)), currency: 'GBP', unitAdjusted: true, raw };
  }

  // GBp or gbp specifically (lowercase 'p') is also pence
  if (c === 'GBp' || c === 'gbp') {
    if (process.env.DEBUG_PRICES === '1') {
      console.log(`[normalizeMinorUnits] ${c} detected as pence, dividing by 100`);
    }
    return { price: Number((price / 100).toFixed(8)), currency: 'GBP', unitAdjusted: true, raw };
  }
  if (c === 'EUC' || c === 'euc') {
    return { price: Number((price / 100).toFixed(8)), currency: 'EUR', unitAdjusted: true, raw };
  }
  if (c === 'USC' || c === 'usc') {
    return { price: Number((price / 100).toFixed(8)), currency: 'USD', unitAdjusted: true, raw };
  }
  if (c === 'ZAC' || c === 'zac') {
    return { price: Number((price / 100).toFixed(8)), currency: 'ZAR', unitAdjusted: true, raw };
  }

  // Layer 2: Major currencies (case-insensitive for common codes) — no conversion
  const majorCurrencies = ['GBP', 'EUR', 'USD', 'ZAR', 'JPY', 'CHF', 'AUD', 'CAD', 'SEK', 'NOK'];
  if (majorCurrencies.includes(upper)) {
    if (process.env.DEBUG_PRICES === '1') {
      console.log(`[normalizeMinorUnits] ${upper} is a major currency, no adjustment needed`);
    }
    return { price: Number(price), currency: upper, unitAdjusted: false, raw };
  }

  // Layer 3: Last-resort heuristic for LSE listings
  // If symbol ends in .L and price is suspiciously large (>2000), assume pence
  if (symbol && String(symbol).toUpperCase().endsWith('.L') && price > 2000) {
    if (process.env.DEBUG_PRICES === '1') {
      console.log(`[normalizeMinorUnits] Heuristic: ${symbol} with price ${price} > 2000, treating as pence`);
    }
    return { price: Number((price / 100).toFixed(8)), currency: 'GBP', unitAdjusted: true, raw };
  }

  // Default: no change
  if (process.env.DEBUG_PRICES === '1') {
    console.log(`[normalizeMinorUnits] ${c} unrecognized, no adjustment`);
  }
  return { price: Number(price), currency: c, unitAdjusted: false, raw };
}

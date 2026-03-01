import { yahooFinance } from "./yahooClient.js";

// Common ISIN → Yahoo symbol mappings for EU ETFs
const ISIN_MAP = {
  'IE00B3XXRP09': 'VUSA.L',   // Vanguard S&P 500
  'IE00B4L5Y983': 'IUSA.L',   // iShares Core S&P 500
  'IE00BFXRH005': 'EUNL.L',   // iShares MSCI World
  'IE00B0M63284': 'IGLD.L',   // iShares Physical Gold
  'GB00B63H8491': 'RR.',      // Rolls-Royce
  'DE000A1EWWW0': 'ADS.DE',   // Adidas
};

export async function resolveYahooSymbol({ isin, ticker }) {
  // Check ISIN map first (most reliable for EU ETFs)
  if (isin && ISIN_MAP[isin]) {
    if (process.env.DEBUG_PRICES === '1') console.log(`[resolveYahooSymbol] ISIN ${isin} → ${ISIN_MAP[isin]} (from map)`);
    return ISIN_MAP[isin];
  }

  // Try ISIN search
  if (isin) {
    try {
      const r = await yahooFinance.search(isin);
      const sym = r?.quotes?.[0]?.symbol;
      if (sym) {
        if (process.env.DEBUG_PRICES === '1') console.log(`[resolveYahooSymbol] ISIN ${isin} → ${sym} (from search)`);
        return sym;
      }
    } catch (e) {
      if (process.env.DEBUG_PRICES === '1') console.log(`[resolveYahooSymbol] ISIN search failed for ${isin}:`, e.message);
    }
  }

  // Try ticker search directly
  if (ticker) {
    try {
      const r = await yahooFinance.search(ticker);
      const sym = r?.quotes?.[0]?.symbol;
      if (sym) {
        if (process.env.DEBUG_PRICES === '1') console.log(`[resolveYahooSymbol] Ticker ${ticker} → ${sym}`);
        return sym;
      }
    } catch (e) {
      if (process.env.DEBUG_PRICES === '1') console.log(`[resolveYahooSymbol] Ticker search failed for ${ticker}:`, e.message);
    }
  }

  // Try ticker with common exchange suffixes (for EU ETFs/stocks)
  if (ticker) {
    const suffixes = ['.L', '.AS', '.MI', '.SWX', '.PA', '.DE', '.VX', '.OL', '.ST', '.CO', '.IR'];
    for (const suffix of suffixes) {
      try {
        const tickerWithSuffix = ticker + suffix;
        const r = await yahooFinance.search(tickerWithSuffix);
        const sym = r?.quotes?.[0]?.symbol;
        if (sym) {
          if (process.env.DEBUG_PRICES === '1') console.log(`[resolveYahooSymbol] Ticker ${tickerWithSuffix} → ${sym}`);
          return sym;
        }
      } catch (e) {
        // Silent fail, try next suffix
      }
    }
  }

  if (process.env.DEBUG_PRICES === '1') console.log(`[resolveYahooSymbol] Fallback: returning ticker ${ticker}`);
  return ticker || null;
}
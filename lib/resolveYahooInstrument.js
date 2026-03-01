import { yahooFinance } from './yahooClient.js';

// cache keyed by `${isin}|${preferredCurrency}`
const instrumentCache = new Map();

// helper for token overlap in names
function nameSimilarity(a, b) {
  if (!a || !b) return 0;
  const sa = a.toLowerCase().split(/\W+/).filter(Boolean);
  const sb = b.toLowerCase().split(/\W+/).filter(Boolean);
  let count = 0;
  for (const t of sa) {
    if (sb.includes(t)) count++;
  }
  return count;
}

/**
 * Resolve an instrument symbol from ISIN + broker ticker.
 * 
 * This module finds the best Yahoo symbols for pricing purposes ONLY.
 * ETF classification is delegated to instrumentClassifier.js.
 * Returns multiple ranked candidates for fallback resilience.
 * 
 * @param {Object} opts - {isin, brokerTicker, tradeCurrency, name}
 * @returns {Promise<Object>} {status, isin, bestSymbol, allCandidates, yahooQuoteMeta, debug}
 */
export async function resolveInstrument({ isin, brokerTicker, name, preferredCurrency = 'EUR' }) {
  // TEST_MODE stub avoids network
  if (process.env.TEST_MODE === '1') {
    return {
      status: 'resolved',
      isin: isin || 'TEST_ISIN',
      bestSymbol: brokerTicker || 'TEST',
      allCandidates: [{ symbol: brokerTicker || 'TEST', score: 1000, currency: preferredCurrency, quoteType: 'ETF' }],
      yahooQuoteMeta: {
        currency: preferredCurrency,
        quoteType: 'ETF',
      },
      debug: { stub: true },
    };
  }

  if (!isin) {
    return {
      status: 'no_match',
      isin: null,
      reason: 'No ISIN provided',
      bestSymbol: null,
      allCandidates: [],
      yahooQuoteMeta: null,
    };
  }

  const cacheKey = `${isin}|${preferredCurrency}`;
  if (instrumentCache.has(cacheKey)) {
    return instrumentCache.get(cacheKey);
  }

  try {
    const result = await yahooFinance.search(isin);
    const quotes = result?.quotes || [];

    if (quotes.length === 0) {
      const obj = {
        status: 'no_match',
        isin,
        reason: 'No quotes found for ISIN',
        bestSymbol: null,
        allCandidates: [],
        yahooQuoteMeta: null,
      };
      instrumentCache.set(cacheKey, obj);
      return obj;
    }

    // Score all candidates (keep all for fallback)
    const allCandidates = [];

    for (const candidate of quotes.slice(0, 20)) {
      let quoteData;
      try {
        quoteData = await yahooFinance.quote(candidate.symbol);
      } catch {
        quoteData = candidate;
      }

      const currency = quoteData?.currency || candidate.currency || null;
      const quoteType = quoteData?.quoteType || candidate.quoteType || null;
      const nameScore = nameSimilarity(name, quoteData?.longName || quoteData?.shortName);

      let score = 0;
      if (currency === preferredCurrency) score += 100;
      score += nameScore * 10;
      // Weak boost for quoteType hint; NOT authoritative
      if (quoteType === 'ETF' || quoteType === 'Fund') score += 5;

      allCandidates.push({
        symbol: candidate.symbol,
        currency,
        quoteType,
        score,
        nameScore,
      });
    }

    // Sort by score descending
    allCandidates.sort((a, b) => b.score - a.score);

    if (allCandidates.length === 0) {
      const obj = {
        status: 'no_match',
        isin,
        reason: 'No candidate selected',
        bestSymbol: null,
        allCandidates: [],
        yahooQuoteMeta: null,
      };
      instrumentCache.set(cacheKey, obj);
      return obj;
    }

    // Return best plus all for fallback
    const best = allCandidates[0];
    const obj = {
      status: 'resolved',
      isin,
      bestSymbol: best.symbol,
      allCandidates: allCandidates.slice(0, 10), // Keep top 10 for fallback
      yahooQuoteMeta: { currency: best.currency, quoteType: best.quoteType },
      debug: { reason: 'Best match from Yahoo search', topScores: allCandidates.slice(0, 3).map(c => `${c.symbol}:${c.score}`) },
    };
    instrumentCache.set(cacheKey, obj);
    return obj;
  } catch (e) {
    return {
      status: 'no_match',
      isin,
      reason: e.message,
      bestSymbol: null,
      allCandidates: [],
      yahooQuoteMeta: null,
    };
  }
}

/**
 * Clear the instrument cache (useful for testing).
 */
export function clearInstrumentCache() {
  instrumentCache.clear();
}

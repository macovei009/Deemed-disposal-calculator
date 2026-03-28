import fs from 'fs/promises';
import path from 'path';
import { yahooFinance } from './yahooClient.js';

const OVERRIDES_PATH = path.join(process.cwd(), 'overrides', 'isin-classification.json');
const CACHE_PATH = path.join(process.cwd(), 'data', 'isin_classification_cache.json');
const DEFAULT_TTL_DAYS = 90;

const NON_ETF_QUOTE_TYPES = new Set(['EQUITY', 'STOCK', 'ADR', 'ETN']);
const ETF_QUOTE_TYPES = new Set(['ETF']);

function readJsonSafe(p) {
  return fs.readFile(p, 'utf8')
    .then(s => JSON.parse(s))
    .catch(() => null);
}

async function writeClassificationCache(isin, rec) {
  try {
    const existingCache = await readJsonSafe(CACHE_PATH) || {};
    existingCache[isin] = {
      isEtf: rec.isEtf,
      confidence: rec.confidence,
      source: rec.source,
      cachedAt: new Date().toISOString(),
    };
    const cacheDir = path.dirname(CACHE_PATH);
    await fs.mkdir(cacheDir, { recursive: true });
    await fs.writeFile(CACHE_PATH, JSON.stringify(existingCache, null, 2), 'utf8');
  } catch (writeErr) {
    if (process.env.DEBUG_PRICES === '1') {
      console.log(`[classifyIsin] Cache write failed for ${isin}: ${writeErr.message}`);
    }
  }
}

function looksEtfLikeName(name) {
  if (!name) return false;
  const n = String(name).toUpperCase();
  return n.includes('ETF') || n.includes('UCITS') || n.includes('EXCHANGE TRADED FUND');
}

async function classifyViaYahooSearch(isin) {
  try {
    const result = await yahooFinance.search(isin);
    const quotes = Array.isArray(result?.quotes) ? result.quotes.slice(0, 10) : [];
    if (quotes.length === 0) return null;

    let etfEvidence = 0;
    let nonEtfEvidence = 0;

    for (const quote of quotes) {
      const quoteType = String(quote?.quoteType || '').toUpperCase();
      const displayName = quote?.longname || quote?.shortname || quote?.name || '';

      if (ETF_QUOTE_TYPES.has(quoteType)) {
        etfEvidence += 2;
      }
      if (NON_ETF_QUOTE_TYPES.has(quoteType)) {
        nonEtfEvidence += 2;
      }
      if (looksEtfLikeName(displayName)) {
        etfEvidence += 1;
      }
    }

    if (etfEvidence > 0 && nonEtfEvidence === 0) {
      return {
        isEtf: true,
        confidence: 0.9,
        source: 'yahoo_search',
        evidence: {
          etfEvidence,
          nonEtfEvidence,
          topQuotes: quotes.map(q => ({ symbol: q.symbol, quoteType: q.quoteType, exchange: q.exchange })),
        },
      };
    }

    if (nonEtfEvidence > 0 && etfEvidence === 0) {
      return {
        isEtf: false,
        confidence: 0.9,
        source: 'yahoo_search',
        evidence: {
          etfEvidence,
          nonEtfEvidence,
          topQuotes: quotes.map(q => ({ symbol: q.symbol, quoteType: q.quoteType, exchange: q.exchange })),
        },
      };
    }

    return {
      isEtf: null,
      confidence: 0.0,
      source: 'yahoo_search_ambiguous',
      evidence: {
        etfEvidence,
        nonEtfEvidence,
        topQuotes: quotes.map(q => ({ symbol: q.symbol, quoteType: q.quoteType, exchange: q.exchange })),
      },
    };
  } catch (err) {
    if (process.env.DEBUG_PRICES === '1') {
      console.log(`[classifyIsin] Yahoo search lookup failed for ${isin}: ${err.message}`);
    }
    return null;
  }
}

/**
 * Tri-state ETF classification for an ISIN.
 * Returns true (confirmed ETF), false (confirmed NOT ETF), or null (unknown).
 *
 * @param {string} isin - ISIN code
 * @returns {Promise<{isin, isEtf: boolean|null, confidence: number, source: string, evidence: object}>}
 */
export async function classifyIsin(isin) {
  if (!isin || typeof isin !== 'string') {
    return { isin, isEtf: null, confidence: 0.0, source: 'invalid', evidence: { reason: 'invalid_isin' } };
  }

  const norm = isin.trim().toUpperCase();
  if (!/^[A-Z0-9]{12}$/.test(norm)) {
    return { isin: norm, isEtf: null, confidence: 0.0, source: 'invalid', evidence: { reason: 'malformed_isin' } };
  }

  // Layer A: Overrides (always win)
  const overrides = await readJsonSafe(OVERRIDES_PATH);
  if (overrides && Object.prototype.hasOwnProperty.call(overrides, norm)) {
    const entry = overrides[norm];
    const isEtf = entry.isEtf === true ? true : (entry.isEtf === false ? false : null);
    return {
      isin: norm,
      isEtf,
      confidence: 0.99,
      source: 'override',
      evidence: { override: entry },
    };
  }

  // Layer B: Cache (TTL-based)
  const cache = await readJsonSafe(CACHE_PATH) || {};
  if (cache && cache[norm]) {
    const rec = cache[norm];
    const ts = rec.cachedAt ? new Date(rec.cachedAt).getTime() : 0;
    const ageDays = (Date.now() - ts) / (1000 * 60 * 60 * 24);
    if (ageDays < DEFAULT_TTL_DAYS) {
      const isEtf = rec.isEtf === true ? true : (rec.isEtf === false ? false : null);
      if (process.env.DEBUG_PRICES === '1') {
        console.log(`[classifyIsin] Cache hit for ${norm}: isEtf=${isEtf}, confidence=${rec.confidence}`);
      }
      return {
        isin: norm,
        isEtf,
        confidence: rec.confidence || 0.8,
        source: 'cache',
        evidence: { cacheRecord: rec },
      };
    }
  }

  // Layer C: OpenFIGI (if available)
  let openFigiResult = null;
  try {
    const payload = [{ idType: 'ID_ISIN', idValue: norm }];
    const headers = {
      'Content-Type': 'application/json',
    };
    if (process.env.OPENFIGI_APIKEY) {
      headers['X-OPENFIGI-APIKEY'] = process.env.OPENFIGI_APIKEY;
    }

    // Use global fetch if available
    if (typeof fetch !== 'undefined') {
      const resp = await fetch('https://api.openfigi.com/v3/mapping', {
        method: 'POST',
        headers,
        body: JSON.stringify(payload),
      });

      if (resp.ok) {
        const data = await resp.json();
        if (Array.isArray(data) && data.length > 0 && data[0].data) {
          const figi = data[0].data[0];
          if (figi) {
            const securityType = figi.securityType || '';
            const securityType2 = figi.securityType2 || '';
            const combined = `${securityType} ${securityType2}`.toUpperCase();

            // Classify based on OpenFIGI metadata
            if (combined.includes('ETF') || combined.includes('EXCHANGE TRADED FUND')) {
              openFigiResult = {
                isEtf: true,
                confidence: 0.95,
                evidence: { securityType, securityType2, figiData: figi },
              };
            } else if (combined.includes('COMMON STOCK') || combined.includes('EQUITY')) {
              openFigiResult = {
                isEtf: false,
                confidence: 0.95,
                evidence: { securityType, securityType2, figiData: figi },
              };
            }
          }
        }
      }
    }
  } catch (err) {
    if (process.env.DEBUG_PRICES === '1') {
      console.log(`[classifyIsin] OpenFIGI lookup failed for ${norm}: ${err.message}`);
    }
  }

  if (openFigiResult) {
    if (process.env.DEBUG_PRICES === '1') {
      console.log(`[classifyIsin] OpenFIGI hit for ${norm}: isEtf=${openFigiResult.isEtf}, confidence=${openFigiResult.confidence}`);
    }

    await writeClassificationCache(norm, {
      isEtf: openFigiResult.isEtf,
      confidence: openFigiResult.confidence,
      source: 'openfigi',
    });

    return {
      isin: norm,
      isEtf: openFigiResult.isEtf,
      confidence: openFigiResult.confidence,
      source: 'openfigi',
      evidence: openFigiResult.evidence,
    };
  }

  // Layer D: Yahoo Search consensus by ISIN
  const yahooResult = await classifyViaYahooSearch(norm);
  if (yahooResult && (yahooResult.isEtf === true || yahooResult.isEtf === false)) {
    await writeClassificationCache(norm, {
      isEtf: yahooResult.isEtf,
      confidence: yahooResult.confidence,
      source: yahooResult.source,
    });

    return {
      isin: norm,
      isEtf: yahooResult.isEtf,
      confidence: yahooResult.confidence,
      source: yahooResult.source,
      evidence: yahooResult.evidence,
    };
  }

  // Layer E: Unknown
  if (process.env.DEBUG_PRICES === '1') {
    console.log(`[classifyIsin] No authoritative data found for ${norm}; returning unknown`);
  }

  return {
    isin: norm,
    isEtf: null,
    confidence: 0.0,
    source: 'unknown',
    evidence: { reason: 'no_authoritative_source_found' },
  };
}

export async function clearClassifierCache() {
  try {
    await fs.unlink(CACHE_PATH);
    return true;
  } catch (err) {
    // ignore
    return false;
  }
}

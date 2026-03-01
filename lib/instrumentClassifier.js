import fs from 'fs/promises';
import path from 'path';

const OVERRIDES_PATH = path.join(process.cwd(), 'overrides', 'isin-classification.json');
const CACHE_PATH = path.join(process.cwd(), 'data', 'isin_classification_cache.json');
const DEFAULT_TTL_DAYS = 90;

function readJsonSafe(p) {
  return fs.readFile(p, 'utf8')
    .then(s => JSON.parse(s))
    .catch(() => null);
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
    return {
      isin: norm,
      isEtf: openFigiResult.isEtf,
      confidence: openFigiResult.confidence,
      source: 'openfigi',
      evidence: openFigiResult.evidence,
    };
  }

  // Layer D: Weak heuristic (last resort)
  // If name contains UCITS or ETF, assume ETF with low confidence
  // Otherwise return unknown
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

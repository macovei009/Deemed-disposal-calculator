// app/api/calculate/route.js
import { normalizeRows } from '../../../lib/normalize.js';
import { computeDeemedDisposal } from '../../../lib/deemedDisposal.js';

export async function computeTaxes(body) {
  const rows = Array.isArray(body.rows) ? body.rows : [];
  const taxYear = Number(body.taxYear || new Date().getFullYear());

  if (process.env.DEBUG_PRICES === '1') {
    console.log('[api/calculate] Starting pipeline with', rows.length, 'CSV rows, taxYear =', taxYear);
  }

  // Normalize all rows (separates buys/sells, parses currencies, dates, etc.)
  // Returns object with { transactions, summary }
  const normalization = normalizeRows(rows);
  const normalized = normalization.transactions || [];
  const importSummary = normalization.summary || {};

  if (process.env.DEBUG_PRICES === '1') {
    console.log('[api/calculate] Normalization complete:');
    console.log('  Total transactions:', normalized.length);
    console.log('  Market buys:', importSummary.marketBuysFound);
    console.log('  Market sells:', importSummary.marketSellsFound);
    console.log('  Buys with ISIN:', importSummary.isinPresent);
  }

  if (normalized.length === 0) {
    return { totalTax: 0, rows: [], ignored: [], importSummary: importSummary || {} };
  }

  // Compute deemed disposal tax
  const result = await computeDeemedDisposal({ transactions: normalized, taxYear });

  if (process.env.DEBUG_PRICES === '1') {
    console.log('[api/calculate] Deemed disposal computation complete:');
    console.log('  Output rows:', result.rows.length);
    console.log('  Ignored rows:', result.ignored.length);
    console.log('  Total tax:', result.totalTax);
  }

  // Attach import summary to result
  result.importSummary = importSummary;

  return result;
}

export async function POST(req) {
  try {
    const body = await req.json();
    const result = await computeTaxes(body);
    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (e) {
    console.error('[api/calculate] Error:', e);
    return new Response(JSON.stringify({ error: e?.message || 'Server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
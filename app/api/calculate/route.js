import { NextResponse } from 'next/server';
import { normalizeRows } from '../../../lib/normalize.js';
import { computeDeemedDisposal } from '../../../lib/deemedDisposal.js';

export async function POST(request) {
  try {
    const body = await request.json();
    const { rows, taxYear } = body;

    if (!rows || !Array.isArray(rows) || rows.length === 0) {
      return NextResponse.json(
        { error: 'No rows provided. Please upload a CSV file.' },
        { status: 400 }
      );
    }

    if (!taxYear || typeof taxYear !== 'number') {
      return NextResponse.json(
        { error: 'Invalid tax year.' },
        { status: 400 }
      );
    }

    // Step 1: Normalize CSV rows into structured transactions
    const { transactions, summary } = normalizeRows(rows);

    if (process.env.DEBUG_PRICES === '1') {
      console.log('[API /calculate] Normalized transactions:', transactions.length);
      console.log('[API /calculate] Import summary:', JSON.stringify(summary, null, 2));
    }

    // Step 2: Compute deemed disposal events and tax
    const result = await computeDeemedDisposal({ transactions, taxYear });

    // Step 3: Return results with import summary
    return NextResponse.json({
      totalTax: result.totalTax,
      rows: result.rows,
      ignored: result.ignored,
      importSummary: summary,
    });
  } catch (err) {
    console.error('[API /calculate] Error:', err);
    return NextResponse.json(
      { error: err.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * End-to-end test: process all test CSVs through the full pipeline
 * Run with: node --experimental-vm-modules scripts/testAllCsvs.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Papa from 'papaparse';
import { normalizeRows } from '../lib/normalize.js';
import { computeDeemedDisposal } from '../lib/deemedDisposal.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const testsDir = path.join(__dirname, '..', 'tests');

process.env.TEST_MODE = '1'; // synthetic prices, no network

const csvFiles = fs.readdirSync(testsDir).filter(f => f.endsWith('.csv')).sort();

console.log(`\n🧪 Testing ${csvFiles.length} CSV files through the full pipeline\n`);
console.log('='.repeat(80));

let totalPassed = 0;
let totalFailed = 0;
const failures = [];

for (const csvFile of csvFiles) {
  const csvPath = path.join(testsDir, csvFile);
  const csvContent = fs.readFileSync(csvPath, 'utf8');

  let rows;
  try {
    const parsed = Papa.parse(csvContent, { header: true, skipEmptyLines: true });
    rows = parsed.data;
  } catch (e) {
    console.log(`\n❌ ${csvFile}: CSV parse error: ${e.message}`);
    totalFailed++;
    failures.push({ file: csvFile, error: `CSV parse error: ${e.message}` });
    continue;
  }

  console.log(`\n📄 ${csvFile} — ${rows.length} raw rows`);

  // Normalize
  let normalized;
  try {
    normalized = normalizeRows(rows);
  } catch (e) {
    console.log(`  ❌ normalizeRows failed: ${e.message}`);
    totalFailed++;
    failures.push({ file: csvFile, error: `normalizeRows failed: ${e.message}` });
    continue;
  }

  const { transactions, summary } = normalized;
  console.log(`  📊 Summary: ${summary.totalRows} total, ${summary.marketBuysFound} buys, ${summary.marketSellsFound || 0} sells, ${summary.isinPresent} with ISIN`);
  console.log(`  ✅ Accepted: ${summary.accepted.buys.length} buys, ${summary.accepted.sells?.length || 0} sells`);

  const skipCounts = Object.entries(summary.skipped)
    .filter(([, v]) => v.length > 0)
    .map(([k, v]) => `${k}: ${v.length}`)
    .join(', ');
  if (skipCounts) {
    console.log(`  ⏭️  Skipped: ${skipCounts}`);
  }

  // Test multiple tax years
  const testYears = [2024, 2025, 2026, 2027];
  
  for (const taxYear of testYears) {
    try {
      const result = await computeDeemedDisposal({ transactions, taxYear });
      
      // Validate result shape
      if (typeof result.totalTax !== 'number') {
        throw new Error(`totalTax is not a number: ${typeof result.totalTax}`);
      }
      if (!Array.isArray(result.rows)) {
        throw new Error(`rows is not an array`);
      }
      if (!Array.isArray(result.ignored)) {
        throw new Error(`ignored is not an array`);
      }
      
      // Validate each row
      for (const row of result.rows) {
        if (!row.buyDate) throw new Error(`Row missing buyDate`);
        if (!row.ddDate) throw new Error(`Row missing ddDate`);
        if (typeof row.quantity !== 'number') throw new Error(`Row quantity not a number`);
        if (typeof row.buyPriceEur !== 'number') throw new Error(`Row buyPriceEur not a number`);
        if (typeof row.ddPriceEur !== 'number') throw new Error(`Row ddPriceEur not a number`);
        if (typeof row.taxEur !== 'number') throw new Error(`Row taxEur not a number`);
        if (row.taxEur < 0) throw new Error(`Row taxEur is negative: ${row.taxEur}`);
      }

      // Validate totalTax = sum of row taxes
      const sum = result.rows.reduce((s, r) => s + r.taxEur, 0);
      if (Math.abs(sum - result.totalTax) > 0.02) {
        throw new Error(`totalTax mismatch: sum=${sum.toFixed(2)} vs totalTax=${result.totalTax}`);
      }

      if (result.rows.length > 0 || result.ignored.length > 0) {
        console.log(`  📅 ${taxYear}: ${result.rows.length} DD events, ${result.ignored.length} ignored, tax=€${result.totalTax.toFixed(2)}`);
      }

      totalPassed++;
    } catch (e) {
      console.log(`  ❌ ${taxYear}: ${e.message}`);
      if (e.stack) console.log(`     ${e.stack.split('\n').slice(1, 3).join('\n     ')}`);
      totalFailed++;
      failures.push({ file: csvFile, year: taxYear, error: e.message });
    }
  }
}

console.log('\n' + '='.repeat(80));
console.log(`\n📊 FINAL RESULTS: ${totalPassed} passed, ${totalFailed} failed out of ${totalPassed + totalFailed} total tests\n`);

if (failures.length > 0) {
  console.log('❌ FAILURES:');
  for (const f of failures) {
    console.log(`  - ${f.file}${f.year ? ` (${f.year})` : ''}: ${f.error}`);
  }
  console.log('');
  process.exit(1);
} else {
  console.log('✅ All tests passed!\n');
  process.exit(0);
}

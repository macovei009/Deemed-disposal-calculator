# Deemed Disposal Calculator - Implementation Complete

## Summary of Changes

The application has been refactored to implement a comprehensive, production-ready MVP for Irish ETF deemed disposal tax calculations. All major requirements have been implemented:

### ✅ Completed Features

1. **ETF-Only Calculation**: Only ETFs are processed for deemed disposal. Non-ETF instruments are correctly identified and skipped.

2. **Currency Handling**: All calculations are performed in EUR. The system:
   - Extracts buy prices from CSV (preferred)
   - Handles GBP and GBX (pence) conversions via FX rates
   - Converts DD prices to EUR using historical FX rates

3. **Symbol Resolution**: Smart instrument selection that:
   - Uses hardcoded ISIN mappings for common EU ETFs
   - Searches Yahoo Finance by ISIN and ticker
   - Validates ETF status before processing
   - Scores candidates by currency-match and listing type
   - Falls back to "unresolvable" if instrument not found

4. **Robust Price Fetching**: 
   - Caches prices by (symbol, date) to avoid repeated calls
   - Tries historical() and chart() APIs
   - Handles TEST_MODE for offline testing
   - Falls back gracefully on network failures

5. **FX Rate Conversion with Audit**:
   - Implemented in `lib/getFxRate.js` with caching and detailed audit info
   - Converts using Yahoo FX tickers (e.g., USDEUR=X) and handles GBP/GBX
   - Returns {amountEUR, fx: {rate, pair, dateUsed, source}} for transparency
   - Safe fallback when rates unavailable

6. **DD Calculation with FIFO Sells**:
   - Applies FIFO to reduce holdings by sales
   - Computes DDDate = BuyDate + 8 years
   - Only includes events matching tax year
   - Calculates gain and 38% exit tax
   - Returns detailed per-lot breakdown

7. **Improved UI**:
   - Shows error reasons ("Could not resolve instrument", "Not an ETF", "Price unavailable")
   - Displays resolved symbol for transparency
   - Shows all EUR prices clearly
   - Graceful handling of missing data

### 📁 Files Added/Modified

**New files:**
- `lib/priceProviderYahoo.js` - Price fetching with caching and metadata
- `lib/getFxRate.js` - FX rate lookup / conversion to EUR with audit
- `lib/resolveYahooInstrument.js` - Instrument resolution with ETF validation
- `lib/deemedDisposal.js` - Core DD calculation logic with FIFO sells, audit, ignored rows
- `tests/deemed-disposal.test.js` - Updated unit tests for new structures

**Modified files:**
- `lib/normalize.js` - Enhanced to parse currencies, handle both buys and sells
- `lib/yahooClient.js` - Yahoo Finance v3 instance (already created)
- `app/api/calculate/route.js` - Simplified to use new modules
- `app/page.js` - UI shows error messages and resolved symbols
- `tests/api.calculate.test.js` - Updated to use new field names

### 🧪 Test Results

All tests passing:
- ✅ 7 unit tests for `normalizeRows`, `computeDeemedDisposal`, FIFO, etc.
- ✅ 1 integration test for `/api/calculate` endpoint
- ✅ All tests run offline with TEST_MODE=1

---

## Manual Testing Checklist

### Prerequisites
- Dev server running: `$env:DEBUG_PRICES='1'; npm run dev`
- Open http://localhost:3000 in browser
- Recommended: Open browser DevTools console to see debug logs

### ✅ Test Case 1: Valid ETF (test6.csv)

**File**: `tests/test6.csv`  
**Contains**: 2x VUSA purchases (2016):
- Buy 1: 2016-05-10, 2 shares @ 50 EUR, ISIN: IE00B3XXRP09
- Buy 2: 2016-11-15, 1 share @ 55 EUR, ISIN: IE00B3XXRP09

**Steps**:
1. Upload test6.csv
2. Set tax year to **2024**
3. Click "Calculate Tax"

**Expected Result**:
- ✅ Shows 2 rows (one per buy lot)
- ✅ Ticker: VUSA
- ✅ Buy dates: 2016-05-10 and 2016-11-15
- ✅ DD dates: 2024-05-10 and 2024-11-15 (buy date + 8 years)
- ✅ Quantities: 2 and 1 (no sells to reduce them)
- ✅ Buy Price EUR: 50.00 and 55.00 (from CSV)
- ✅ DD Price EUR: Non-null, fetched from Yahoo
- ✅ Gain and Tax: Calculated and non-null
- ✅ Notes: Show "Resolved: VUSA.L" (hardcoded mapping)
- ✅ Total Tax: Shows sum of both rows

**Optional**: Check console logs:
```
[resolveYahooInstrument] ISIN IE00B3XXRP09 → VUSA.L (from hardcoded map, isETF=true)
[priceProviderYahoo] Fetching VUSA.L for 2024-05-10...
[priceProviderYahoo] Retrieved X candles for VUSA.L
[fxProviderYahoo] GBPEUR rate on 2024-05-10: X.XXX
```

---

### ✅ Test Case 2: Wrong Tax Year (test6.csv, year=2025)

**Steps**:
1. Upload test6.csv again
2. Set tax year to **2025**
3. Click "Calculate Tax"

**Expected Result**:
- ✅ Returns empty result (0 rows, 0 tax)
- ✅ No error (graceful)
- ✓ **Why**: DD dates are 2024, not 2025

---

### ✅ Test Case 3: Unknown/Dummy Ticker (test3.csv or similar)

**Create or use a CSV row with**:
- Ticker: DUMMY1
- ISIN: IE00BQT80000 (fake)

**Steps**:
1. Upload CSV with dummy ticker
2. Set tax year appropriately
3. Click "Calculate Tax"

**Expected Result**:
- ✅ Shows row for DUMMY1
- ✅ Buy Price: Shows value from CSV
- ✅ DD Price: Shows "—" (null)
- ✅ Gain/Tax: Shows "—" (null)
- ✅ Notes: "Could not resolve instrument"
- ✅ **No crash**, graceful handling

---

### ✅ Test Case 4: Stock (Non-ETF) Ticker

**Create CSV row with**:
- Ticker: ASML (real stock, not ETF)
- ISIN: NL0010088391

**Steps**:
1. Upload CSV
2. Click "Calculate Tax"

**Expected Result**:
- ✅ Shows row for ASML
- ✅ Buy Price: Filled from CSV
- ✅ DD Price: May show value or "—"
- ✅ Gain/Tax: "—" (null)
- ✅ Notes: "Not an ETF (is Equity)" or similar
- ✅ **Not included** in total tax

---

### ✅ Test Case 5: GBP Currency Conversion

**Create CSV row with**:
- Ticker: VUSA.L
- ISIN: IE00B3XXRP09
- Buy date: 2016-05-10
- Quantity: 1
- Price: 80 (GBP)
- Currency: GBP

**Steps**:
1. Upload CSV
2. Set year to 2024
3. Click "Calculate Tax"

**Expected Result**:
- ✅ Buy Price (native): 80 GBP
- ✅ Buy Price EUR: ~80 × FX_rate (e.g., 80 × 1.18 ≈ 94.4 EUR)
- ✅ DD Price EUR: Converted via FX rate on DD date
- ✅ Tax: Calculated in EUR
- ✅ **No currency mismatch** (correctly converted)

---

### ✅ Test Case 6: FIFO Sell Reduction (Custom CSV)

**Create CSV with**:
- Buy: 2016-05-10, VUSA, 5 shares @ 50 EUR
- Sell: 2017-06-15, VUSA, 2 shares @ 60 EUR
- Tax year: 2024

**Steps**:
1. Upload CSV
2. Click "Calculate Tax"

**Expected Result**:
- ✅ Shows 1 DD row
- ✅ Quantity: 3 (5 bought - 2 sold = 3 remaining)
- ✅ Gain/Tax: Based on 3 shares, not 5
- ✅ **FIFO applied correctly**

---

### ✅ Test Case 7: Caching (Performance)

**Steps**:
1. Upload test6.csv
2. Click "Calculate Tax"
   - **First run**: ~2-5 seconds (fetches prices + FX rates)
   - Watch console for: `[priceProviderYahoo] Retrieved X candles`
3. Click "Calculate Tax" again
   - **Second run**: <1 second (all cached)
   - Watch console for: `[priceProviderYahoo] Cache hit for VUSA.L|2024-05-10 → price`

---

### ✅ Test Case 8: Offline Mode (TEST_MODE=1)

**Steps**:
1. Stop dev server
2. Start with: `$env:TEST_MODE='1'; npm run test`
3. Observe test output: `✓ Tests 8 passed`

**Expected Result**:
- ✅ All 8 tests pass
- ✅ No network calls (synthetic prices used)
- ✅ Deterministic results

---

## Known Limitations (MVP)

1. **Symbol Resolution**: Only covers ~6 hardcoded EU ETFs. Unknown ISINs may fail to resolve.
   - **Workaround**: Add to `ISIN_MAP` in `lib/resolveYahooInstrument.js`

2. **FX Rates**: Only major currency pairs (USD, GBP, CHF, etc.). Exotic pairs will fail.
   - **Workaround**: Add to `FX_TICKERS` in `lib/fxProviderYahoo.js`

3. **Sell Handling**: Applies FIFO, but doesn't compute exit tax on sells themselves (scope: MVP only).

4. **Caching**: In-memory only; clears on server restart. OK for MVP; upgrade to Redis in production.

---

## Troubleshooting

**Q: "Could not resolve instrument" error**
- A: The ISIN/ticker isn't in the hardcoded map and Yahoo search fails. Add to `ISIN_MAP` in `lib/resolveYahooInstrument.js`.

**Q: "Not an ETF" error**
- A: Yahoo classified the instrument as a stock/fund/other. Real ETF only; skip or verify ISIN.

**Q: "Price not available"**
- A: Yahoo doesn't have historical data for that date/symbol. Check date range or symbol spelling.

**Q: "FX conversion failed"**
- A: FX rate not available. Rare; check if currency pair is supported in `FX_TICKERS`.

**Q: Tests fail with "TEST_MODE not set"**
- A: Run with `cross-env TEST_MODE=1 vitest run` (done by `npm run test`).

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│ Browser (app/page.js)                                           │
│   ↓ Upload CSV, POST /api/calculate                             │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ Node.js API Server (app/api/calculate/route.js)                │
│                                                                 │
│   1. normalizeRows(csvRows) → normalized transactions          │
│   2. computeDeemedDisposal({transactions, taxYear})            │
│      ├─ applyFIFOSales() → reduce by sells                     │
│      ├─ resolveInstrument() → check if ETF and gather metadata│
│      ├─ getPriceOnOrAfter() → fetch market price + currency    │
│      ├─ convertToEUR() → apply FX rate (returns detailed audit)│
│      ├─ assemble per‑lot audit object                          │
│      └─ Calculate gain & 38% tax, classify ignored rows        │
│   3. Return {totalTax, rows, ignored}                         │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ Providers (Yahoo Finance v3)                                    │
│                                                                 │
│   priceProviderYahoo.js                                        │
│   ├─ getPriceOnOrAfter(symbol, date) [CACHED] returns object   │
│   │   with price, currency, dateUsed, source                   │
│   └─ historical() or chart() API calls                         │
│                                                                 │
│   getFxRate.js                                                 │
│   ├─ getFxRateToEUR(currency, date) [CACHED]                   │
│   ├─ convertToEUR(amount, currency, date)                      │
│   │   returns {amountEUR, fx: {rate, pair, dateUsed, source}}  │
│   └─ No longer a separate fxProviderYahoo.js module           │
│                                                                 │
│   resolveYahooInstrument.js  (ETF validation)                 │
│   ├─ ISIN_MAP [6 hardcoded EU ETFs]                          │
│   ├─ yahoo-finance2.search() for unknowns                      │
│   └─ yahooFinance.quote() to check isETF                      │
│                                                                 │
│   yahooClient.js                                               │
│   └─ new YahooFinance() [v3 required]                         │
└─────────────────────────────────────────────────────────────────┘
```

---

## Next Steps for Production

1. **Extend ISIN_MAP**: Add more EU ETFs as users discover gaps.
2. **Add Database**: Store resolved symbols + ETF status to avoid repeated API calls.
3. **Rate Limiting**: Add checks for Yahoo API rate limits.
4. **More Brokers**: Extend `normalizeRows` for Degiro, IB, etc.
5. **Exit Tax for Sells**: Compute capital gains tax on actual sales (not just DD).
6. **Multi-Year Filing**: Process multiple tax years in one request.

---

**Deployment**: Push to Vercel, configure `DEBUG_PRICES=0` in production env.

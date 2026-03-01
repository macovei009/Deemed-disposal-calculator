import { test, describe, expect } from 'vitest';
import { normalizeRows } from '../lib/normalize.js';
import { computeDeemedDisposal } from '../lib/deemedDisposal.js';

describe('normalizeRows', () => {
  test('parses Trading212 CSV with currencies', () => {
    const rows = [
      {
        'Action': 'Market buy',
        'Time': '2016-05-10 09:05:12',
        'ISIN': 'IE00B3XXRP09',
        'Ticker': 'VUSA',
        'No. of shares': '2.0000000000',
        'Price / share': '50.0000000000',
        'Currency (Price / share)': 'EUR',
        'Total': '100.00',
        'Currency (Total)': 'EUR',
      },
    ];
    const result = normalizeRows(rows);
    const normalized = result.transactions;
    expect(normalized).toHaveLength(1);
    expect(normalized[0]).toMatchObject({
      action: 'Market buy',
      isBuy: true,
      isSell: false,
      ticker: 'VUSA',
      isin: 'IE00B3XXRP09',
      quantity: 2,
      priceNative: 50,
      tradeCurrency: 'EUR',
      totalNative: 100,
    });
    expect(normalized[0].dateISO).toBe('2016-05-10');
    expect(result.summary.marketBuysFound).toBe(1);
  });

  test('handles missing price by computing from total/qty', () => {
    const rows = [
      {
        'Action': 'Market buy',
        'Time': '2016-05-10 09:05:12',
        'Ticker': 'VUSA',
        'No. of shares': '2',
        'Total': '100',
        'Currency (Total)': 'EUR',
      },
    ];
    const result = normalizeRows(rows);
    const normalized = result.transactions;
    expect(normalized).toHaveLength(1);
    expect(normalized[0].priceNative).toBe(50); // 100 / 2
  });

  test('handles sell transactions', () => {
    const rows = [
      {
        'Action': 'Market sell',
        'Time': '2016-05-15 10:00:00',
        'Ticker': 'VUSA',
        'No. of shares': '1',
        'Price / share': '52',
      },
    ];
    const result = normalizeRows(rows);
    const normalized = result.transactions;
    expect(normalized).toHaveLength(1);
    expect(normalized[0].isSell).toBe(true);
    expect(normalized[0].isBuy).toBe(false);
  });

  test('filters out invalid rows (missing required fields)', () => {
    const rows = [
      { 'Action': 'Market buy' }, // No date, ticker, price
      {
        'Action': 'Market buy',
        'Time': '2016-05-10',
        'Ticker': 'VUSA',
        'No. of shares': '2',
        'ISIN': 'IE00B3XXRP09',
        'Price / share': '50',
        'Currency (Price / share)': 'EUR',
      },
    ];
    const result = normalizeRows(rows);
    const normalized = result.transactions;
    expect(normalized).toHaveLength(1); // Only second row is valid
    expect(result.summary.rowsParsed).toBe(2);
    expect(result.summary.skipped.dateParseFailure).toContain(1);
  });
});

describe('computeDeemedDisposal (with TEST_MODE)', () => {
  // These tests run with TEST_MODE=1, so prices are synthetic

  test('computes DD tax for ETF with deterministic prices', async () => {
    process.env.TEST_MODE = '1';
    const transactions = [
      {
        action: 'Market buy',
        isBuy: true,
        isSell: false,
        dateISO: '2016-05-10',
        dateObj: new Date('2016-05-10'),
        ticker: 'VUSA',
        isin: 'IE00B3XXRP09',
        name: 'Vanguard S&P 500',
        quantity: 2,
        priceNative: 50,
        currencyPrice: 'EUR',
        totalNative: 100,
        currencyTotal: 'EUR',
        tradeCurrency: 'EUR',
        exchangeRate: 1,
        buyPriceEUR: 50,
        totalEUR: 100,
      },
    ];

    const result = await computeDeemedDisposal({
      transactions,
      taxYear: 2024,
    });

    const row = result.rows[0];
    expect(row.buyPriceEur).toBe(50);
    expect(row.ddPriceEur).toBeDefined();
    // audit.buy.fx may be null (for prices from CSV that don't need conversion)
    // audit.dd.fx should contain FX info since DD price comes from Yahoo in its native currency
    expect(row.audit.dd.fx).toBeDefined();
    if (row.audit.dd.fx) {
      expect(typeof row.audit.dd.fx.fxToEur).toBe('number');
    }
    // notes is always an array (empty for UCITS in TEST_MODE)
    expect(Array.isArray(row.notes)).toBe(true);
    process.env.TEST_MODE = undefined;
  });

  test('skips DD events in other tax years', async () => {
    const transactions = [
      {
        action: 'Market buy',
        isBuy: true,
        isSell: false,
        dateISO: '2016-05-10',
        dateObj: new Date('2016-05-10'),
        ticker: 'VUSA',
        isin: 'IE00B3XXRP09',
        quantity: 2,
        buyPriceEUR: 50,
        tradeCurrency: 'EUR',
      },
    ];
    const result = await computeDeemedDisposal({
      transactions,
      taxYear: 2023,
    });
    expect(result.rows).toHaveLength(0);
    expect(result.ignored).toBeDefined();
  });

  test('handles FIFO sell reduction', async () => {
    process.env.TEST_MODE = '1';
    const transactions = [
      {
        action: 'Market buy',
        isBuy: true,
        isSell: false,
        dateISO: '2016-05-10',
        dateObj: new Date('2016-05-10'),
        ticker: 'VUSA',
        isin: 'IE00B3XXRP09',
        quantity: 2,
        buyPriceEUR: 50,
        tradeCurrency: 'EUR',
      },
      {
        action: 'Market sell',
        isBuy: false,
        isSell: true,
        dateISO: '2017-06-15',
        dateObj: new Date('2017-06-15'),
        ticker: 'VUSA',
        quantity: 1,
      },
    ];
    const result = await computeDeemedDisposal({
      transactions,
      taxYear: 2024,
    });
    expect(result.rows).toHaveLength(1);
    expect(result.rows[0].quantity).toBe(1);
    process.env.TEST_MODE = undefined;
  });

  test('getFxRateToEUR returns detailed FX info', async () => {
    process.env.TEST_MODE = '1';
    const { getFxRateToEUR } = await import('../lib/getFxRate.js');
    const eurResult = await getFxRateToEUR('EUR', '2024-05-10');
    // EUR should return fxToEur: 1
    expect(eurResult.fxToEur).toBe(1);
    expect(eurResult.fxPair).toBe('EUR');
    // USD should return an FX info object with a numeric rate
    const usdResult = await getFxRateToEUR('USD', '2024-05-10');
    expect(usdResult).toHaveProperty('fxToEur');
    expect(typeof usdResult.fxToEur).toBe('number');
    expect(usdResult).toHaveProperty('fxPair');
    process.env.TEST_MODE = undefined;
  });
});

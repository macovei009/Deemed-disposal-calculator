process.env.TEST_MODE = '1'; // force synthetic prices, no network

import { describe, it, expect, beforeAll } from 'vitest';
import { POST as calculate } from '../app/api/calculate/route.js';

// Build a Request with JSON body (Node 18+ has global Request)
function jsonRequest(body) {
  return new Request('http://localhost/api/calculate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
}

describe('/api/calculate (TEST_MODE=1)', () => {
  beforeAll(() => {
    process.env.TEST_MODE = '1'; // force synthetic prices, no network
  });

  it('returns totalTax and rows for lots due in selected tax year', async () => {
    // Use Trading212-style headers to match normalized format
    const rows = [
      {
        'Action': 'Market buy',
        'Time': '2018-02-13 09:30:00',
        'ISIN': 'IE00B5BMR087',
        'Ticker': 'CSPX.L',
        'No. of shares': '10',
        'Price / share': '28.12',
        'Currency (Price / share)': 'EUR',
        'Total': '281.20',
        'Currency (Total)': 'EUR',
      },
      {
        'Action': 'Market buy',
        'Time': '2019-03-20 10:15:00',
        'ISIN': 'IE00BKM4GZ66',
        'Ticker': 'EIMI.L',
        'No. of shares': '3',
        'Price / share': '23.10',
        'Currency (Price / share)': 'EUR',
        'Total': '69.30',
        'Currency (Total)': 'EUR',
      },
      {
        'Action': 'Market buy',
        'Time': '2023-11-02 14:00:00',
        'ISIN': 'IE00B3XXRP09',
        'Ticker': 'VEUR.L',
        'No. of shares': '2',
        'Price / share': '42.80',
        'Currency (Price / share)': 'EUR',
        'Total': '85.60',
        'Currency (Total)': 'EUR',
      },
    ];
    const req = jsonRequest({ rows, taxYear: 2026 });

    const res = await calculate(req);
    expect(res.ok).toBe(true);

    const data = await res.json();
    expect(data).toHaveProperty('totalTax');
    expect(data).toHaveProperty('rows');
    expect(Array.isArray(data.rows)).toBe(true);

    // Ensure at least one 2018 row (dd year = 2026) is included
    const has2018 = data.rows.some(d => d.buyDate?.startsWith('2018-'));
    expect(has2018).toBe(true);

    const first = data.rows[0];
    expect(first).toMatchObject({
      brokerTicker: expect.any(String),
      yahooSymbol: expect.any(String),
      buyDate: expect.any(String),
      ddDate: expect.any(String),
      quantity: expect.any(Number)
    });

    // New field names: buyPriceEur, ddPriceEur, taxEur
    expect(typeof first.buyPriceEur).toBe('number');
    expect(typeof first.ddPriceEur).toBe('number');
    expect(typeof first.taxEur).toBe('number');

    // total ≈ sum of row taxes
    const sum = data.rows.reduce((s, d) => s + (d.taxEur || 0), 0);
    expect(Math.abs(sum - data.totalTax)).toBeLessThan(0.01);
  });
});
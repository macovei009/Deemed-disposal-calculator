import { test, expect } from 'vitest'
import { classifyIsin, clearClassifierCache } from '../lib/instrumentClassifier.js'

test('VWCE (IE00BK5BQT80) classifies as ETF via override', async () => {
  clearClassifierCache()
  const res = await classifyIsin('IE00BK5BQT80')
  expect(res.isEtf).toBe(true)
  expect(res.confidence).toBeGreaterThanOrEqual(0.95)
  expect(res.source).toBe('override')
})

test('HSBC MSCI WORLD (IE00B4X9L533) classifies as ETF via override', async () => {
  clearClassifierCache()
  const res = await classifyIsin('IE00B4X9L533')
  expect(res.isEtf).toBe(true)
  expect(res.confidence).toBeGreaterThanOrEqual(0.95)
  expect(res.source).toBe('override')
})

test('Adidas (DE000A1EWWW0) classifies as NOT ETF via override', async () => {
  clearClassifierCache()
  const res = await classifyIsin('DE000A1EWWW0')
  expect(res.isEtf).toBe(false)
  expect(res.confidence).toBeGreaterThanOrEqual(0.95)
  expect(res.source).toBe('override')
})

test('Returns tri-state: true, false, or null', async () => {
  clearClassifierCache()
  const vwce = await classifyIsin('IE00BK5BQT80')
  expect([true, false, null]).toContain(vwce.isEtf)

  const adidas = await classifyIsin('DE000A1EWWW0')
  expect([true, false, null]).toContain(adidas.isEtf)

  // Unknown ISIN should return null
  const unknown = await classifyIsin('XX0000000000')
  expect(unknown.isEtf).toBe(null)
  expect(unknown.source).toBe('unknown')
})

test('Invalid ISIN returns null', async () => {
  clearClassifierCache()
  const invalid = await classifyIsin('INVALID')
  expect(invalid.isEtf).toBe(null)
  expect(invalid.source).toBe('invalid')
})

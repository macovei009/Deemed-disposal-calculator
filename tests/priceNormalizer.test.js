import { test, expect } from 'vitest'
import { normalizeMinorUnits } from '../lib/priceNormalizer.js'

test('GBp normalization', () => {
  const inPrice = 8412.0
  const out = normalizeMinorUnits(inPrice, 'GBp')
  expect(out.price).toBeCloseTo(84.12, 8)
  expect(out.currency).toBe('GBP')
  expect(out.unitAdjusted).toBe(true)
})

test('GBX normalization', () => {
  const out = normalizeMinorUnits(520.0, 'GBX')
  expect(out.price).toBeCloseTo(5.2, 8)
  expect(out.currency).toBe('GBP')
  expect(out.unitAdjusted).toBe(true)
})

test('No normalization for EUR', () => {
  const out = normalizeMinorUnits(103.77, 'EUR')
  expect(out.price).toBeCloseTo(103.77, 8)
  expect(out.currency).toBe('EUR')
  expect(out.unitAdjusted).toBe(false)
})

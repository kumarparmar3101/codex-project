import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateTicketPrice } from '../../src/domain/pricing.js';

test('calculateTicketPrice applies multipliers tax and fees', () => {
  const result = calculateTicketPrice(20, {
    seatCategoryMultiplier: 1.5,
    demandMultiplier: 1.1,
    taxRate: 0.07,
    fees: 2
  });

  assert.equal(result, 37.31);
});

test('calculateTicketPrice rounds to 2 decimals', () => {
  const result = calculateTicketPrice(9.99, {
    seatCategoryMultiplier: 1,
    demandMultiplier: 1,
    taxRate: 0.0825,
    fees: 0
  });

  assert.equal(result, 10.81);
});

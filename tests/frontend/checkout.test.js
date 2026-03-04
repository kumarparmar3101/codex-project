import test from 'node:test';
import assert from 'node:assert/strict';
import { createCheckoutSummary } from '../../src/frontend/components/checkout.js';

test('checkout summary computes total and invokes callback', () => {
  let calls = 0;
  const summary = createCheckoutSummary({
    seatCount: 3,
    ticketPrice: 12.5,
    onCheckout: () => {
      calls += 1;
    }
  });

  assert.equal(summary.total, 37.5);
  assert.equal(summary.canCheckout, true);
  assert.equal(summary.confirm(), true);
  assert.equal(calls, 1);
});

test('checkout summary blocks checkout when no seats selected', () => {
  const summary = createCheckoutSummary({
    seatCount: 0,
    ticketPrice: 12.5,
    onCheckout: () => {
      throw new Error('should not run');
    }
  });

  assert.equal(summary.canCheckout, false);
  assert.equal(summary.confirm(), false);
});

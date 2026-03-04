import test from 'node:test';
import assert from 'node:assert/strict';
import { canTransition, transitionState } from '../../src/domain/booking.js';

test('booking transitions allow valid edges', () => {
  assert.equal(canTransition('draft', 'held'), true);
  assert.equal(canTransition('held', 'confirmed'), true);
  assert.equal(canTransition('confirmed', 'cancelled'), true);
});

test('booking transitions reject invalid edges', () => {
  assert.equal(canTransition('draft', 'confirmed'), false);
  assert.throws(() => transitionState('cancelled', 'confirmed'), {
    message: 'Invalid booking transition from cancelled to confirmed'
  });
});

import test from 'node:test';
import assert from 'node:assert/strict';
import { isSeatLockExpired } from '../../src/domain/seatLock.js';

test('isSeatLockExpired false before ttl', () => {
  const lock = {
    seatId: 'A1',
    bookingId: 'b1',
    lockedAt: new Date('2025-01-01T12:00:00Z'),
    ttlMs: 60000
  };
  assert.equal(isSeatLockExpired(lock, new Date('2025-01-01T12:00:30Z')), false);
});

test('isSeatLockExpired true at ttl boundary', () => {
  const lock = {
    seatId: 'A1',
    bookingId: 'b1',
    lockedAt: new Date('2025-01-01T12:00:00Z'),
    ttlMs: 60000
  };
  assert.equal(isSeatLockExpired(lock, new Date('2025-01-01T12:01:00Z')), true);
});

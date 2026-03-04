import test from 'node:test';
import assert from 'node:assert/strict';
import { createBookingServer } from '../../src/api/server.js';

async function startServer(server) {
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const address = server.address();
  return `http://127.0.0.1:${address.port}`;
}

test('booking lifecycle hold confirm fetch', async () => {
  const server = createBookingServer();
  const baseUrl = await startServer(server);

  const hold = await fetch(`${baseUrl}/bookings/hold`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ bookingId: 'booking-1', seatId: 'A1', ttlMs: 60000 })
  });
  assert.equal(hold.status, 201);

  const confirm = await fetch(`${baseUrl}/bookings/booking-1/confirm`, { method: 'POST' });
  assert.equal(confirm.status, 200);

  const fetched = await fetch(`${baseUrl}/bookings/booking-1`);
  assert.equal(fetched.status, 200);
  const payload = await fetched.json();
  assert.equal(payload.state, 'confirmed');

  server.close();
});

test('booking lifecycle lock expiry and cancel', async () => {
  const server = createBookingServer();
  const baseUrl = await startServer(server);

  await fetch(`${baseUrl}/bookings/hold`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ bookingId: 'booking-2', seatId: 'B2', ttlMs: 1 })
  });

  await new Promise((resolve) => setTimeout(resolve, 10));
  const expired = await fetch(`${baseUrl}/bookings/booking-2/confirm`, { method: 'POST' });
  assert.equal(expired.status, 409);

  await fetch(`${baseUrl}/bookings/hold`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ bookingId: 'booking-3', seatId: 'C3', ttlMs: 60000 })
  });
  const cancelled = await fetch(`${baseUrl}/bookings/booking-3/cancel`, { method: 'POST' });
  assert.equal(cancelled.status, 200);
  const cancelPayload = await cancelled.json();
  assert.equal(cancelPayload.state, 'cancelled');

  server.close();
});

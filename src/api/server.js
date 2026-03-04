import { createServer } from 'node:http';
import { transitionState } from '../domain/booking.js';
import { isSeatLockExpired } from '../domain/seatLock.js';
import { logError, logInfo } from '../logging/logger.js';

export function createBookingServer() {
  const bookings = new Map();

  return createServer(async (req, res) => {
    try {
      const url = new URL(req.url, 'http://localhost');

      if (req.method === 'POST' && url.pathname === '/bookings/hold') {
        const payload = await readBody(req);
        const booking = {
          id: payload.bookingId,
          seatId: payload.seatId,
          state: transitionState('draft', 'held'),
          lockCreatedAt: new Date(),
          lockTtlMs: payload.ttlMs ?? 300000
        };
        bookings.set(booking.id, booking);
        logInfo('Seat held', { bookingId: booking.id, seatId: booking.seatId });
        return json(res, 201, booking);
      }

      const confirmMatch = url.pathname.match(/^\/bookings\/([^/]+)\/confirm$/);
      if (req.method === 'POST' && confirmMatch) {
        const booking = bookings.get(confirmMatch[1]);
        if (!booking) return json(res, 404, { error: 'Booking not found' });

        const expired = isSeatLockExpired(
          {
            seatId: booking.seatId,
            bookingId: booking.id,
            lockedAt: booking.lockCreatedAt,
            ttlMs: booking.lockTtlMs
          },
          new Date()
        );

        if (expired) {
          booking.state = transitionState('held', 'expired');
          return json(res, 409, { error: 'Seat lock expired' });
        }

        booking.state = transitionState(booking.state, 'confirmed');
        logInfo('Booking confirmed', { bookingId: booking.id });
        return json(res, 200, booking);
      }

      const cancelMatch = url.pathname.match(/^\/bookings\/([^/]+)\/cancel$/);
      if (req.method === 'POST' && cancelMatch) {
        const booking = bookings.get(cancelMatch[1]);
        if (!booking) return json(res, 404, { error: 'Booking not found' });
        booking.state = transitionState(booking.state, 'cancelled');
        logInfo('Booking cancelled', { bookingId: booking.id });
        return json(res, 200, booking);
      }

      const fetchMatch = url.pathname.match(/^\/bookings\/([^/]+)$/);
      if (req.method === 'GET' && fetchMatch) {
        const booking = bookings.get(fetchMatch[1]);
        if (!booking) return json(res, 404, { error: 'Booking not found' });
        return json(res, 200, booking);
      }

      return json(res, 404, { error: 'Not found' });
    } catch (error) {
      logError(error, { route: req.url, method: req.method });
      return json(res, 500, { error: 'Internal server error' });
    }
  });
}

function json(res, statusCode, body) {
  res.writeHead(statusCode, { 'content-type': 'application/json' });
  res.end(JSON.stringify(body));
}

async function readBody(req) {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  const raw = Buffer.concat(chunks).toString();
  return raw ? JSON.parse(raw) : {};
}

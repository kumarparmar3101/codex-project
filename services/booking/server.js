const http = require('http');
const url = require('url');
const crypto = require('crypto');

const seatMapByShowtime = {
  sho_1: createSeats(60),
  sho_2: createSeats(40)
};

const locks = new Map();
const bookings = [];

function createSeats(count) {
  return Array.from({ length: count }, (_, i) => {
    const seatNo = i + 1;
    return { seatId: `A${String(seatNo).padStart(2, '0')}`, status: 'available' };
  });
}

function sendJson(res, statusCode, body) {
  res.writeHead(statusCode, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(body));
}

function parseJson(req) {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', (chunk) => {
      data += chunk;
    });
    req.on('end', () => {
      if (!data) return resolve({});
      try {
        resolve(JSON.parse(data));
      } catch (err) {
        reject(new Error('Invalid JSON body'));
      }
    });
  });
}

function releaseExpiredLocks() {
  const now = Date.now();
  for (const [lockId, lock] of locks.entries()) {
    if (lock.expiresAt <= now && !lock.confirmed) {
      const seats = seatMapByShowtime[lock.showtimeId] || [];
      for (const seat of seats) {
        if (lock.seatIds.includes(seat.seatId) && seat.status === 'locked') {
          seat.status = 'available';
          delete seat.lockExpiresAt;
        }
      }
      locks.delete(lockId);
    }
  }
}

const server = http.createServer(async (req, res) => {
  releaseExpiredLocks();
  const { pathname, query } = url.parse(req.url, true);

  if (req.method === 'GET' && pathname === '/api/v1/seats/availability') {
    const showtimeId = query.showtimeId;
    const seats = seatMapByShowtime[showtimeId];
    if (!seats) return sendJson(res, 404, { error: 'Unknown showtimeId' });
    return sendJson(res, 200, { showtimeId, seats });
  }

  if (req.method === 'POST' && pathname === '/api/v1/seats/lock') {
    try {
      const body = await parseJson(req);
      const { showtimeId, userId, seatIds, ttlSeconds = 300 } = body;
      const seats = seatMapByShowtime[showtimeId];

      if (!showtimeId || !userId || !Array.isArray(seatIds) || !seatIds.length) {
        return sendJson(res, 400, { error: 'showtimeId, userId and seatIds are required' });
      }
      if (!seats) return sendJson(res, 404, { error: 'Unknown showtimeId' });

      const conflicted = seatIds.filter((seatId) => {
        const seat = seats.find((s) => s.seatId === seatId);
        return !seat || seat.status !== 'available';
      });

      if (conflicted.length) {
        return sendJson(res, 409, { error: 'Seat conflict', conflictedSeatIds: conflicted });
      }

      const lockId = `lock_${crypto.randomUUID()}`;
      const expiresAt = Date.now() + ttlSeconds * 1000;
      for (const seatId of seatIds) {
        const seat = seats.find((s) => s.seatId === seatId);
        seat.status = 'locked';
        seat.lockExpiresAt = new Date(expiresAt).toISOString();
      }

      locks.set(lockId, { lockId, showtimeId, userId, seatIds, expiresAt, confirmed: false });
      return sendJson(res, 201, {
        lockId,
        showtimeId,
        seatIds,
        expiresAt: new Date(expiresAt).toISOString()
      });
    } catch (err) {
      return sendJson(res, 400, { error: err.message });
    }
  }

  if (req.method === 'POST' && pathname === '/api/v1/bookings/confirm') {
    try {
      const { lockId, paymentIntentId } = await parseJson(req);
      const lock = locks.get(lockId);
      if (!lock) return sendJson(res, 404, { error: 'Unknown lockId' });
      if (lock.expiresAt <= Date.now()) {
        return sendJson(res, 410, { error: 'Lock expired' });
      }

      const bookingId = `bkg_${crypto.randomUUID()}`;
      const seats = seatMapByShowtime[lock.showtimeId] || [];
      for (const seatId of lock.seatIds) {
        const seat = seats.find((s) => s.seatId === seatId);
        seat.status = 'booked';
        delete seat.lockExpiresAt;
      }

      lock.confirmed = true;
      bookings.push({
        bookingId,
        userId: lock.userId,
        showtimeId: lock.showtimeId,
        seatIds: lock.seatIds,
        paymentIntentId,
        status: 'confirmed',
        createdAt: new Date().toISOString()
      });

      return sendJson(res, 201, bookings[bookings.length - 1]);
    } catch (err) {
      return sendJson(res, 400, { error: err.message });
    }
  }

  if (req.method === 'GET' && pathname === '/api/v1/internal/bookings') {
    return sendJson(res, 200, { items: bookings });
  }

  return sendJson(res, 404, { error: 'Not found' });
});

if (require.main === module) {
  server.listen(4002, () => {
    console.log('booking service listening on :4002');
  });
}

module.exports = { server };

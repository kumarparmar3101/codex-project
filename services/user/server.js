const http = require('http');
const url = require('url');

const usersByToken = {
  token_demo_123: { id: 'usr_1', email: 'alice@example.com', name: 'Alice Doe' },
  token_demo_456: { id: 'usr_2', email: 'bob@example.com', name: 'Bob Ray' }
};

const bookingHistory = {
  usr_1: [
    {
      bookingId: 'bkg_demo_1',
      showtimeId: 'sho_1',
      seatIds: ['A01', 'A02'],
      status: 'confirmed',
      createdAt: '2026-03-01T10:00:00Z'
    }
  ],
  usr_2: []
};

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
      } catch {
        reject(new Error('Invalid JSON body'));
      }
    });
  });
}

const server = http.createServer(async (req, res) => {
  const { pathname } = url.parse(req.url, true);

  if (req.method === 'POST' && pathname === '/api/v1/auth/profile') {
    try {
      const { accessToken } = await parseJson(req);
      const profile = usersByToken[accessToken];
      if (!profile) return sendJson(res, 401, { error: 'Invalid token' });
      return sendJson(res, 200, profile);
    } catch (err) {
      return sendJson(res, 400, { error: err.message });
    }
  }

  const match = pathname.match(/^\/api\/v1\/users\/([^/]+)\/bookings\/history$/);
  if (req.method === 'GET' && match) {
    const userId = match[1];
    return sendJson(res, 200, { userId, items: bookingHistory[userId] || [] });
  }

  return sendJson(res, 404, { error: 'Not found' });
});

if (require.main === module) {
  server.listen(4003, () => {
    console.log('user service listening on :4003');
  });
}

module.exports = { server };

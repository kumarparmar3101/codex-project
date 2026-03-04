const http = require('http');
const url = require('url');
const crypto = require('crypto');

const intents = new Map();

const transitions = {
  created: ['pending_confirmation', 'canceled'],
  pending_confirmation: ['confirmed', 'failed', 'canceled'],
  confirmed: [],
  failed: [],
  canceled: []
};

const webhookEventToState = {
  'intent.requires_confirmation': 'pending_confirmation',
  'intent.succeeded': 'confirmed',
  'intent.failed': 'failed',
  'intent.canceled': 'canceled'
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

function applyTransition(intentId, targetState) {
  const intent = intents.get(intentId);
  if (!intent) {
    return { error: 'Unknown intentId', statusCode: 404 };
  }

  if (!transitions[intent.status].includes(targetState)) {
    return {
      error: `Invalid transition from ${intent.status} to ${targetState}`,
      statusCode: 409
    };
  }

  intent.status = targetState;
  intent.updatedAt = new Date().toISOString();
  return { intent };
}

const server = http.createServer(async (req, res) => {
  const { pathname } = url.parse(req.url, true);

  if (req.method === 'POST' && pathname === '/api/v1/payments/intents') {
    try {
      const { bookingReference, amount, currency } = await parseJson(req);
      if (!bookingReference || !amount || !currency) {
        return sendJson(res, 400, { error: 'bookingReference, amount and currency are required' });
      }

      const intentId = `pi_${crypto.randomUUID()}`;
      const intent = {
        intentId,
        bookingReference,
        amount,
        currency,
        status: 'created',
        clientSecret: `secret_${crypto.randomUUID()}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      intents.set(intentId, intent);
      return sendJson(res, 201, intent);
    } catch (err) {
      return sendJson(res, 400, { error: err.message });
    }
  }

  const webhookMatch = pathname.match(/^\/api\/v1\/payments\/([^/]+)\/webhook$/);
  if (req.method === 'POST' && webhookMatch) {
    try {
      const intentId = webhookMatch[1];
      const { eventType } = await parseJson(req);
      const targetState = webhookEventToState[eventType];
      if (!targetState) {
        return sendJson(res, 400, { error: 'Unsupported webhook eventType' });
      }

      const result = applyTransition(intentId, targetState);
      if (result.error) return sendJson(res, result.statusCode, { error: result.error });
      return sendJson(res, 200, result.intent);
    } catch (err) {
      return sendJson(res, 400, { error: err.message });
    }
  }

  const intentMatch = pathname.match(/^\/api\/v1\/payments\/intents\/([^/]+)$/);
  if (req.method === 'GET' && intentMatch) {
    const intent = intents.get(intentMatch[1]);
    if (!intent) return sendJson(res, 404, { error: 'Unknown intentId' });
    return sendJson(res, 200, intent);
  }

  return sendJson(res, 404, { error: 'Not found' });
});

if (require.main === module) {
  server.listen(4004, () => {
    console.log('payment service listening on :4004');
  });
}

module.exports = { server };

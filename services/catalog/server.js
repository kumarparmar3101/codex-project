const http = require('http');
const url = require('url');

const movies = [
  {
    id: 'mov_1',
    title: 'Solar Odyssey',
    language: 'en',
    durationMinutes: 122,
    rating: 'PG-13',
    genres: ['Sci-Fi']
  },
  {
    id: 'mov_2',
    title: 'Monsoon Raga',
    language: 'hi',
    durationMinutes: 138,
    rating: 'U/A',
    genres: ['Drama', 'Music']
  }
];

const venues = [
  { id: 'ven_1', name: 'Grand Multiplex', city: 'Bengaluru', screens: 6 },
  { id: 'ven_2', name: 'Regal Downtown', city: 'Mumbai', screens: 4 }
];

const showtimes = [
  {
    id: 'sho_1',
    movieId: 'mov_1',
    venueId: 'ven_1',
    screen: 'Screen 2',
    startTime: '2026-03-10T18:30:00Z',
    availableSeats: 72
  },
  {
    id: 'sho_2',
    movieId: 'mov_2',
    venueId: 'ven_2',
    screen: 'Screen 1',
    startTime: '2026-03-10T20:00:00Z',
    availableSeats: 48
  }
];

const sendJson = (res, statusCode, body) => {
  res.writeHead(statusCode, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(body));
};

const server = http.createServer((req, res) => {
  const { pathname } = url.parse(req.url, true);

  if (req.method === 'GET' && pathname === '/api/v1/movies/events') {
    return sendJson(res, 200, { items: movies });
  }

  if (req.method === 'GET' && pathname === '/api/v1/venues/theaters') {
    return sendJson(res, 200, { items: venues });
  }

  if (req.method === 'GET' && pathname === '/api/v1/schedules/showtimes') {
    return sendJson(res, 200, { items: showtimes });
  }

  return sendJson(res, 404, { error: 'Not found' });
});

if (require.main === module) {
  server.listen(4001, () => {
    console.log('catalog service listening on :4001');
  });
}

module.exports = { server };

import http from "node:http";

async function getJson(url) {
  const response = await fetch(url);
  return response.json();
}

export function createGatewayServer(ports = { catalog: 4101, booking: 4102, user: 4103 }) {
  return http.createServer(async (req, res) => {
    if (req.url === "/health") {
      res.setHeader("content-type", "application/json");
      res.end(JSON.stringify({ ok: true }));
      return;
    }

    if (req.url === "/bootstrap") {
      const [catalog, seats, bookings] = await Promise.all([
        getJson(`http://127.0.0.1:${ports.catalog}/listings`),
        getJson(`http://127.0.0.1:${ports.booking}/seats`),
        getJson(`http://127.0.0.1:${ports.user}/bookings`)
      ]);

      res.setHeader("content-type", "application/json");
      res.end(JSON.stringify({ catalog: catalog.data, seats: seats.data, bookings: bookings.data }));
      return;
    }

    res.statusCode = 404;
    res.end("Not Found");
  });
}

if (process.argv[1] && process.argv[1].endsWith("server.js")) {
  createGatewayServer().listen(4100, () => {
    console.log("api-gateway running on :4100");
  });
}

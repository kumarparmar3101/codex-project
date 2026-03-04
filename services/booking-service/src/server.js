import http from "node:http";

const seats = Array.from({ length: 24 }).map((_, idx) => ({
  code: `A${idx + 1}`,
  isAvailable: idx % 7 !== 0
}));

export function createBookingServer() {
  return http.createServer(async (req, res) => {
    if (req.method === "GET" && req.url === "/seats") {
      res.setHeader("content-type", "application/json");
      res.end(JSON.stringify({ data: seats }));
      return;
    }

    if (req.method === "POST" && req.url === "/lock") {
      res.setHeader("content-type", "application/json");
      res.end(JSON.stringify({ lockId: "lock_demo_123", expiresInSeconds: 300 }));
      return;
    }

    res.statusCode = 404;
    res.end("Not Found");
  });
}

if (process.argv[1] && process.argv[1].endsWith("server.js")) {
  createBookingServer().listen(4102, () => {
    console.log("booking-service running on :4102");
  });
}

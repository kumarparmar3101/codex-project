import http from "node:http";

const bookings = [
  { id: "b1", title: "Stand-up Night", date: "2026-06-18" },
  { id: "b2", title: "Galactic Heist", date: "2026-06-24" }
];

export function createUserServer() {
  return http.createServer((req, res) => {
    if (req.url === "/bookings") {
      res.setHeader("content-type", "application/json");
      res.end(JSON.stringify({ data: bookings }));
      return;
    }
    res.statusCode = 404;
    res.end("Not Found");
  });
}

if (process.argv[1] && process.argv[1].endsWith("server.js")) {
  createUserServer().listen(4103, () => {
    console.log("user-service running on :4103");
  });
}

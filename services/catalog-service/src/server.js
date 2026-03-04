import http from "node:http";

const listings = [
  { id: "m1", kind: "movie", title: "Galactic Heist", city: "Mumbai" },
  { id: "e1", kind: "event", title: "Stand-up Night", city: "Mumbai" },
  { id: "m2", kind: "movie", title: "Midnight Case", city: "Bengaluru" }
];

export function createCatalogServer() {
  return http.createServer((req, res) => {
    if (req.url?.startsWith("/listings")) {
      res.setHeader("content-type", "application/json");
      res.end(JSON.stringify({ data: listings }));
      return;
    }
    res.statusCode = 404;
    res.end("Not Found");
  });
}

if (process.argv[1] && process.argv[1].endsWith("server.js")) {
  createCatalogServer().listen(4101, () => {
    console.log("catalog-service running on :4101");
  });
}

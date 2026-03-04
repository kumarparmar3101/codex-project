import test from "node:test";
import assert from "node:assert/strict";
import http from "node:http";
import { createGatewayServer } from "./server.js";

function mockServer(payload) {
  return http.createServer((_, res) => {
    res.setHeader("content-type", "application/json");
    res.end(JSON.stringify(payload));
  });
}

test("gateway bootstrap aggregates service payloads", async () => {
  const catalog = mockServer({ data: [{ id: "x" }] });
  const booking = mockServer({ data: [{ code: "A1" }] });
  const user = mockServer({ data: [{ id: "b1" }] });

  await Promise.all([
    new Promise((resolve) => catalog.listen(0, resolve)),
    new Promise((resolve) => booking.listen(0, resolve)),
    new Promise((resolve) => user.listen(0, resolve))
  ]);

  const gateway = createGatewayServer({
    catalog: catalog.address().port,
    booking: booking.address().port,
    user: user.address().port
  });

  await new Promise((resolve) => gateway.listen(0, resolve));
  const { port } = gateway.address();
  const response = await fetch(`http://127.0.0.1:${port}/bootstrap`);
  const body = await response.json();

  assert.equal(response.status, 200);
  assert.equal(body.catalog[0].id, "x");

  await Promise.all([
    new Promise((resolve) => gateway.close(resolve)),
    new Promise((resolve) => catalog.close(resolve)),
    new Promise((resolve) => booking.close(resolve)),
    new Promise((resolve) => user.close(resolve))
  ]);
});

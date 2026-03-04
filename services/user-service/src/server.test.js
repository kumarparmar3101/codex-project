import test from "node:test";
import assert from "node:assert/strict";
import { createUserServer } from "./server.js";

test("user service returns booking history", async () => {
  const server = createUserServer();
  await new Promise((resolve) => server.listen(0, resolve));
  const { port } = server.address();

  const response = await fetch(`http://127.0.0.1:${port}/bookings`);
  const body = await response.json();
  assert.equal(response.status, 200);
  assert.equal(body.data.length, 2);

  await new Promise((resolve) => server.close(resolve));
});

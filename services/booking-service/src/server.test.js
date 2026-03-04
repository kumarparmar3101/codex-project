import test from "node:test";
import assert from "node:assert/strict";
import { createBookingServer } from "./server.js";

test("booking service returns a lock id", async () => {
  const server = createBookingServer();
  await new Promise((resolve) => server.listen(0, resolve));
  const { port } = server.address();

  const response = await fetch(`http://127.0.0.1:${port}/lock`, { method: "POST" });
  const body = await response.json();
  assert.equal(response.status, 200);
  assert.equal(body.lockId, "lock_demo_123");

  await new Promise((resolve) => server.close(resolve));
});

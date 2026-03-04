import test from "node:test";
import assert from "node:assert/strict";
import { createCatalogServer } from "./server.js";

test("catalog service returns listings", async () => {
  const server = createCatalogServer();
  await new Promise((resolve) => server.listen(0, resolve));
  const { port } = server.address();

  const response = await fetch(`http://127.0.0.1:${port}/listings`);
  const body = await response.json();
  assert.equal(response.status, 200);
  assert.ok(Array.isArray(body.data));

  await new Promise((resolve) => server.close(resolve));
});

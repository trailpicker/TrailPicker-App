import assert from "node:assert/strict";
import { test } from "node:test";
import { loadWaypointWeather } from "../lib/weather/client-cache";

test("identical weather requests share one fetch and reuse the result", async t => {
  let calls = 0;
  t.mock.method(globalThis, "fetch", async () => {
    calls++;
    return Response.json({ generated: "2026-10-29T20:00:00Z", hourly: [] });
  });
  const url = "/api/weather?lat=49.1&lng=-122.7&view=summary";
  const [first, second] = await Promise.all([
    loadWaypointWeather(url),
    loadWaypointWeather(url),
  ]);
  assert.strictEqual(first, second);
  await loadWaypointWeather(url);
  assert.equal(calls, 1);
  await loadWaypointWeather(url, true);
  assert.equal(calls, 2);
});

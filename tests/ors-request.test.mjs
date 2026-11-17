import test from "node:test";
import assert from "node:assert/strict";
import { buildORSRequest } from "../lib/ors-request.ts";

const coordinates = [[50.022245, -122.872238], [50.023, -122.871]];

test("directions uses the HeiGIT URL and accepts GeoJSON (regression for HTTP 406/2007)", () => {
  const request = buildORSRequest("route", coordinates, "test-key", 75);
  assert.equal(request.url, "https://api.heigit.org/openrouteservice/v2/directions/foot-hiking/geojson");
  assert.equal(request.options.method, "POST");
  assert.equal(request.options.headers.Accept, "application/geo+json");
  assert.equal(request.options.headers["Content-Type"], "application/json");
  assert.equal(request.options.headers.Authorization, "test-key");
  assert.deepEqual(JSON.parse(request.options.body), {
    coordinates: [[-122.872238, 50.022245], [-122.871, 50.023]],
    instructions: false,
    elevation: true,
  });
});

test("snap retains /json and accepts JSON, with a 75m radius", () => {
  const request = buildORSRequest("snap", [coordinates[0]], "test-key", 75);
  assert.equal(request.url, "https://api.heigit.org/openrouteservice/v2/snap/foot-hiking/json");
  assert.equal(request.options.headers.Accept, "application/json");
  assert.deepEqual(JSON.parse(request.options.body), {
    locations: [[-122.872238, 50.022245]],
    radius: 75,
  });
});

test("ORS uses the radius provided by the app, not a hidden constant", () => {
  const request = buildORSRequest("snap", [coordinates[0]], "test-key", 25);
  assert.equal(JSON.parse(request.options.body).radius, 25);
});


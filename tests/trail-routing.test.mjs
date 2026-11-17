import test from "node:test";
import assert from "node:assert/strict";
import {
  validLatLng, metersBetween, parseSnapResponse, parseRouteResponse,
  usableTrailSegment, validTrailSegment, simplifyTrail,
} from "../lib/trail-routing.ts";

const a = [49.2801, -123.1207];
const b = [49.2821, -123.1187];

test("validates trail coordinates and distance", () => {
  assert.equal(validLatLng(a), true);
  assert.equal(validLatLng([91, 0]), false);
  assert.equal(validLatLng([49, Number.NaN]), false);
  assert.ok(metersBetween(a, b) > 0);
  assert.equal(metersBetween(a, a), 0);
});

test("snapping never accepts results outside the configured 75m radius", () => {
  const response = { locations: [{ location: [a[1], a[0]], snapped_distance: 12 }] };
  assert.deepEqual(parseSnapResponse(response), { point: a, distanceM: 12 });
  assert.equal(parseSnapResponse({ locations: [null] }), null);
  assert.equal(parseSnapResponse({ locations: [{ location: [a[1], a[0]], snapped_distance: 150 }] }), null);
});

test("valid routing preserves geometry and rejects mismatched endpoints", () => {
  const middle = [49.2813, -123.121];
  const response = { features: [{ geometry: { type: "LineString", coordinates: [a, middle, b].map(([lat, lng]) => [lng, lat]) }, properties: { summary: { distance: 575 } } }] };
  const result = parseRouteResponse(response, a, b);
  assert.deepEqual(result?.geometry, [a, middle, b]);
  assert.equal(result?.distanceM, 575);
  const segment = { toId: "b", geometry: result.geometry, distanceM: 575, source: "openrouteservice" };
  assert.equal(validTrailSegment(segment), true);
  assert.deepEqual(usableTrailSegment({ id: "a", lat: a[0], lng: a[1], trailToNext: segment }, { id: "b", lat: b[0], lng: b[1] }), segment);
  assert.equal(usableTrailSegment({ id: "a", lat: a[0], lng: a[1], trailToNext: segment }, { id: "c", lat: b[0], lng: b[1] }), null);
  assert.equal(usableTrailSegment({ id: "a", lat: 50, lng: a[1], trailToNext: segment }, { id: "b", lat: b[0], lng: b[1] }), null);
  assert.equal(parseRouteResponse(response, [40, 10], b), null);
});

test("keeps both route endpoints when simplifying a long track", () => {
  const many = Array.from({ length: 900 }, (_, index) => [49 + index / 10000, -123 + Math.sin(index / 15) / 500]);
  const simplified = simplifyTrail(many, 150);
  assert.ok(simplified.length <= 150);
  assert.deepEqual(simplified[0], many[0]);
  assert.deepEqual(simplified[simplified.length - 1], many[many.length - 1]);
});

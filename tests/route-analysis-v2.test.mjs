import test from "node:test";
import assert from "node:assert/strict";
import { computeRouteMetrics, completeDaySummaries } from "../lib/route-metrics.ts";

const point = (id, dayId, lat, lng) => ({ id, name: id, kind: "waypoint", lat, lng, elevationM: null, dayId });
const routed = (from, to, { elevation = true } = {}) => ({
  toId: to.id, source: "gpx", geometry: [[from.lat, from.lng], [to.lat, to.lng]], distanceM: 1500,
  ...(elevation ? { elevationsM: [200, 290], ascentM: 90, descentM: 0 } : {}),
});

test("elevation profile samples stay aligned with day ids", () => {
  const a = point("a", "one", 49.2, -123.2);
  const b = point("b", "one", 49.201, -123.201);
  const c = point("c", "two", 49.202, -123.202);
  const d = point("d", "two", 49.203, -123.203);
  a.trailToNext = routed(a, b);
  b.trailToNext = routed(b, c);
  c.trailToNext = routed(c, d, { elevation: false });
  const result = computeRouteMetrics([a, b, c, d], [{ id: "one" }, { id: "two" }]);
  assert.deepEqual(result.profileDayIds, ["one", null]);
  assert.equal(result.profileSections.length, result.profileDayIds.length);
  assert.equal(result.unassignedDaySegments, 1);
  assert.equal(result.ascentM, null, "missing elevation cannot become a total");
  assert.deepEqual(completeDaySummaries(result), [], "cross-day links cannot overwrite day records");
});

test("unrouted and no-elevation links do not invent samples", () => {
  const a = point("a", "one", 49.2, -123.2);
  const b = point("b", "one", 49.201, -123.201);
  const c = point("c", "one", 49.202, -123.202);
  a.trailToNext = routed(a, b, { elevation: false });
  b.manualToNext = true;
  const result = computeRouteMetrics([a, b, c], [{ id: "one" }]);
  assert.deepEqual(result.profileSections, []);
  assert.deepEqual(result.profileDayIds, []);
  assert.equal(result.estimatedMinutes, null);
  assert.equal(result.unroutedSegments, 1);
});


test("nine mapped 3D sections without provider totals get real sample-based climb estimates", () => {
  const points = Array.from({ length: 10 }, (_, i) => point(`point-${i}`, "one", 49.2 + i * .001, -123.2 - i * .001));
  for (let i = 0; i < 9; i++) points[i].trailToNext = {
    toId: points[i+1].id, source: "openrouteservice",
    geometry: [[points[i].lat, points[i].lng],[points[i+1].lat, points[i+1].lng]],
    distanceM: 1632, elevationsM: [300 + i * 40, 340 + i * 40],
    // No ascentM/descentM, exactly the situation in the reported UI.
  };
  const m = computeRouteMetrics(points, [{id: "one"}], 3.5);
  assert.equal(m.profileSections.length, 9);
  assert.equal(m.climbedSegments, 9);
  assert.equal(m.sampleDerivedSegments, 9);
  assert.equal(m.unroutedSegments, 0);
  assert.equal(m.ascentM, 360);
  assert.equal(m.descentM, 0);
  assert.ok(m.estimatedMinutes > 0);
  assert.ok(m.dayMetrics[0].estimatedMinutes > 0);
  assert.equal(m.dayMetrics[0].routedEstimateMinutes > 0, true);
  assert.deepEqual(completeDaySummaries(m), [], "estimated elevations do not overwrite manual day stats");
});

test("time for mapped same-day sections remains visible when another leg crosses days", () => {
  const a = point("a", "one", 49.2, -123.2);
  const b = point("b", "one", 49.201, -123.201);
  const c = point("c", "two", 49.2015, -123.2015);
  a.trailToNext = {toId: "b", source: "gpx", geometry: [[a.lat,a.lng],[b.lat,b.lng]], distanceM: 14690, elevationsM: [100,250]};
  b.trailToNext = {toId: "c", source: "gpx", geometry: [[b.lat,b.lng],[c.lat,c.lng]], distanceM: 80, elevationsM: [250,260]};
  const m = computeRouteMetrics([a,b,c],[{id:"one"},{id:"two"}]);
  assert.equal(m.distanceM, 14770);
  assert.equal(m.dayMetrics[0].distanceM,14690);
  assert.equal(m.dayMetrics[0].unresolvedLinks,1);
  assert.equal(m.dayMetrics[0].estimatedMinutes,null, "complete day time still blocked");
  assert.ok(m.dayMetrics[0].routedEstimateMinutes > 0, "assigned mapped leg has an honest partial time");
  assert.equal(m.estimatedMinutes !== null,true,"whole-route time independent of day assignment");
});

test("missing all sampled elevations still cannot produce complete ascent or day time", () => {
  const a = point("a","one",49.2,-123.2), b = point("b","one",49.201,-123.201);
  a.trailToNext = routed(a,b,{elevation:false});
  const m = computeRouteMetrics([a,b],[{id:"one"}]);
  assert.equal(m.profileSections.length,0);
  assert.equal(m.ascentM,null);
  assert.equal(m.sampleDerivedSegments,0);
  assert.equal(m.dayMetrics[0].estimatedMinutes,null);
  assert.ok(m.dayMetrics[0].routedEstimateMinutes > 0);
});

import test from "node:test";
import assert from "node:assert/strict";
import { computeRouteMetrics } from "../lib/route-metrics.ts";
import { parseRouteResponse, validTrailSegment, usableTrailSegment } from "../lib/trail-routing.ts";

const a = [49.2, -123.2], b = [49.21, -123.19], c = [49.22, -123.18], d = [49.23, -123.17];
const waypoint = (id, coords, dayId = "day1") => ({id, name:id, lat:coords[0], lng:coords[1], elevationM:null, kind:"waypoint", dayId});
function leg(toId, start, end, distanceM, elevationsM, ascentM = 100, descentM = 25) {
  return {toId,geometry:[start,end],distanceM,elevationsM,ascentM,descentM,source:"openrouteservice"};
}

test("full trail metrics combine real ORS distances and ascent, with adjustable pace", () => {
  const points = [waypoint("a",a),waypoint("b",b),waypoint("c",c)];
  points[0].trailToNext = leg("b",a,b,2000,[100,190],120,30);
  points[1].trailToNext = leg("c",b,c,3000,[190,290],180,50);
  const data = computeRouteMetrics(points,[{id:"day1"}], 4);
  assert.equal(data.distanceM,5000);
  assert.equal(data.routedDistanceM,5000);
  assert.equal(data.straightLineDistanceM,0);
  assert.equal(data.ascentM,300);
  assert.equal(data.descentM,80);
  assert.equal(data.estimatedMinutes,105); // 5km /4km/h + 300m/600m/h
  assert.equal(data.dayMetrics[0].estimatedMinutes,105);
  assert.equal(data.profileSections.length,2);
  assert.equal(data.profileSections[0].at(-1).distanceM,2000);
  assert.equal(data.profileSections[1].at(-1).distanceM,5000);
  assert.equal(computeRouteMetrics(points,[],2).estimatedMinutes,180);
});

test("manual lines are explicitly lower bounds and cannot create fake ascent or full route estimates", () => {
  const points = [waypoint("a",a),waypoint("b",b),waypoint("c",c, "day2")];
  points[0].trailToNext = leg("b",a,b,2200,[80,110],55,15);
  points[1].manualToNext = true;
  const data = computeRouteMetrics(points,[{id:"day1"},{id:"day2"}]);
  assert.equal(data.routedDistanceM,2200);
  assert.equal(data.unroutedSegments,1);
  assert.ok(data.straightLineDistanceM > 0);
  assert.equal(data.ascentM,null);
  assert.equal(data.estimatedMinutes,null);
  assert.equal(data.knownAscentM,55);
  assert.equal(data.profileSections.length,1);
  assert.equal(data.dayMetrics[0].segments,1);
  assert.equal(data.dayMetrics[1].segments,0);
  assert.equal(data.unassignedDaySegments,1);
});

test("missing provider totals are estimated from complete saved elevation samples", () => {
  const points = [waypoint("a",a),waypoint("b",b)];
  points[0].trailToNext = {toId:"b",geometry:[a,b],elevationsM:[0,250],distanceM:2500,source:"openrouteservice"};
  const data = computeRouteMetrics(points,[{id:"day1"}]);
  assert.equal(data.profileSections.length,1);
  assert.equal(data.elevationSegments,1);
  assert.equal(data.climbedSegments,1);
  assert.equal(data.sampleDerivedSegments,1);
  assert.equal(data.ascentM,250);
  assert.equal(data.descentM,0);
  assert.ok(data.dayMetrics[0].estimatedMinutes > 0);
  assert.equal(data.dayMetrics[0].sampleDerivedSegments,1);
});

test("legacy trail segments remain usable, but do not claim an elevation profile", () => {
  const points = [waypoint("a",a),waypoint("b",b)];
  points[0].trailToNext = {toId:"b",geometry:[a,b],distanceM:2500,source:"openrouteservice"};
  const data = computeRouteMetrics(points);
  assert.equal(data.routedDistanceM,2500);
  assert.equal(data.elevationSegments,0);
  assert.equal(data.ascentM,null);
  assert.equal(data.routedEstimateMinutes,38); // 2.5km at new default 4 km/h (no ascent data)
});

test("bad route elevations are rejected, and a moved stop invalidates cached altitude", () => {
  const old = leg("b",a,b,2300,[150,200]);
  assert.equal(validTrailSegment(old),true);
  assert.equal(validTrailSegment({...old,elevationsM:[150]}),false);
  assert.equal(validTrailSegment({...old,elevationsM:[150,Number.NaN]}),false);
  assert.equal(validTrailSegment({...old,elevationsM:[150,12000]}),false);
  assert.equal(validTrailSegment({...old,ascentM:-1}),false);
  assert.equal(validTrailSegment({...old,descentM:undefined}),false);
  assert.equal(usableTrailSegment({...waypoint("a",a),trailToNext:old},{...waypoint("b",b),lat:50}),null);
});

test("3D ORS coordinates and summary are parsed, while 2D ORS routes still work", () => {
  const response = {features:[{geometry:{type:"LineString",coordinates:[
    [a[1],a[0],0],[b[1],b[0],150]
  ]},properties:{summary:{distance:3300,ascent:170,descent:20}}}]};
  const parsed = parseRouteResponse(response,a,b);
  assert.deepEqual(parsed,{geometry:[a,b],distanceM:3300,elevationsM:[0,150],ascentM:170,descentM:20});
  assert.equal(validTrailSegment({toId:"b",...parsed,source:"openrouteservice"}),true);
  const invalidElevation = structuredClone(response);
  invalidElevation.features[0].geometry.coordinates[1][2] = null;
  assert.deepEqual(parseRouteResponse(invalidElevation,a,b),{geometry:[a,b],distanceM:3300});
  const missingSummary = structuredClone(response);
  delete missingSummary.features[0].properties.summary.ascent;
  const partial = parseRouteResponse(missingSummary,a,b);
  assert.deepEqual(partial.elevationsM,[0,150]);
  assert.equal(partial.ascentM,undefined);
});

test("simplification keeps matching sampled elevations and both route endpoints", () => {
  const coords = Array.from({length:900},(_,i)=>[a[1] + i / 200000,a[0] + i / 200000,
    100 + Math.sin(i / 30)*200]);
  const response = {features:[{geometry:{type:"LineString",coordinates:coords},properties:{summary:{distance:18000,ascent:1900,descent:1800}}}]};
  const start = [coords[0][1],coords[0][0]], end = [coords.at(-1)[1],coords.at(-1)[0]];
  const result = parseRouteResponse(response,start,end);
  assert.ok(result && result.geometry.length <= 400);
  assert.equal(result.geometry.length,result.elevationsM.length);
  assert.equal(result.elevationsM[0],Number(coords[0][2].toFixed(1)));
  assert.equal(result.elevationsM.at(-1),Number(coords.at(-1)[2].toFixed(1)));
  assert.equal(result.ascentM,1900);
  assert.equal(validTrailSegment({toId:"b",...result,source:"openrouteservice"}),true);
});

test("invalid hiking speeds are rejected",()=>{
  assert.throws(()=>computeRouteMetrics([],[],0),RangeError);
  assert.throws(()=>computeRouteMetrics([],[],Number.NaN),RangeError);
  assert.throws(()=>computeRouteMetrics([],[],9),RangeError);
});

test("vertical elevation peaks survive simplification of a nearly straight mapped route", () => {
  const coordinates = Array.from({length:900},(_,i)=>[
    -123 + i / 100000,
    49 + i / 100000,
    100 + 700 * Math.max(0, 1 - Math.abs(i-449)/449),
  ]);
  const response = {features:[{geometry:{type:"LineString",coordinates},properties:{summary:{distance:2500,ascent:700,descent:700}}}]};
  const start = [coordinates[0][1],coordinates[0][0]], end = [coordinates.at(-1)[1],coordinates.at(-1)[0]];
  const parsed = parseRouteResponse(response,start,end);
  assert.ok(parsed.elevationsM.length <= 400);
  assert.ok(Math.max(...parsed.elevationsM) > 795, "The summit must not be erased by XY-only decimation");
});


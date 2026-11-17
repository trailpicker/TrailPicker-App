import test from "node:test";
import assert from "node:assert/strict";
import { computeRouteMetrics, completeDaySummaries, hikingDifficulty } from "../lib/route-metrics.ts";
import { validTrailSegment } from "../lib/trail-routing.ts";
const xy = [[49.2,-123.2],[49.201,-123.201],[49.202,-123.202],[49.203,-123.203]];
const day = (i, id) => ({id, name:`Stop ${i}`, kind:"waypoint", lat:xy[i][0], lng:xy[i][1], elevationM:null, dayId:id});
const routed = (a, b, distanceM=2000) => ({toId:b.id, geometry:[[a.lat,a.lng],[b.lat,b.lng]], elevationsM:[300,400], ascentM:100, descentM:0, distanceM, source:"gpx"});
test("GPX track geometry is valid and daily difficulty varies by effort",()=>{
  const [a,b]=[day(0,"day1"), day(1,"day1")]; a.trailToNext=routed(a,b);
  assert.equal(validTrailSegment(a.trailToNext),true);
  const result=computeRouteMetrics([a,b],[{id:"day1"}],3.5);
  assert.equal(result.dayMetrics[0].difficulty,"Easy");
  assert.deepEqual(completeDaySummaries(result),[{dayId:"day1",distanceKm:2,elevationGainM:100,elevationLossM:0,durationMinutes:44}]);
  assert.equal(hikingDifficulty(8000,350,200),"Moderate");
  assert.equal(hikingDifficulty(15000,800,350),"Challenging");
  assert.equal(hikingDifficulty(25000,1500,480),"Strenuous");
});
test("an inter-day link blocks partial day totals from overwriting saved values",()=>{
  const a=day(0,"day1"), b=day(1,"day1"), c=day(2,"day2"), d=day(3,"day2");
  a.trailToNext=routed(a,b); b.manualToNext=true; c.trailToNext=routed(c,d);
  const data=computeRouteMetrics([a,b,c,d],[{id:"day1"},{id:"day2"}]);
  assert.equal(data.unassignedDaySegments,1);
  assert.equal(data.dayMetrics[0].unresolvedLinks,1);
  assert.equal(data.dayMetrics[1].unresolvedLinks,1);
  assert.equal(data.dayMetrics[0].estimatedMinutes,null);
  assert.deepEqual(completeDaySummaries(data),[]);
});
test("gaps and incomplete altitude never persist manufactured climb or time",()=>{
  const a=day(0,"day1"), b=day(1,"day1"); a.manualToNext=true;
  assert.deepEqual(completeDaySummaries(computeRouteMetrics([a,b],[{id:"day1"}])),[]);
  delete a.manualToNext;
  a.trailToNext={...routed(a,b),elevationsM:undefined,ascentM:undefined,descentM:undefined};
  assert.deepEqual(completeDaySummaries(computeRouteMetrics([a,b],[{id:"day1"}])),[]);
});

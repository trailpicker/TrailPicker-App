const test = require("node:test");
const assert = require("node:assert/strict");
const { readFileSync } = require("node:fs");
const { join } = require("node:path");
const { buildRouteExplorer, locationAtDistance, gradeAtDistance } = require("../lib/route-explorer.ts");
const { computeRouteMetrics } = require("../lib/route-metrics.ts");

const fixture = (id, dayId, lat, lng, kind = "waypoint") => ({ id, name:id, dayId, lat, lng, kind, elevationM:null });
function segment(start, end, distanceM, elevationsM) {
  return { toId:end.id, source:"gpx", distanceM,
    geometry:Array.from({length:elevationsM.length}, (_, i) => {
      const t=i/(elevationsM.length-1);
      return [start.lat+(end.lat-start.lat)*t, start.lng+(end.lng-start.lng)*t];
    }), elevationsM };
}

test("map cursor follows precisely the elevation profile measured location", () => {
  const a=fixture("a","one",49.2,-123.2);
  const b=fixture("b","one",49.203,-123.203,"camp");
  a.trailToNext=segment(a,b,900,[600,625,675,700]);
  const route=buildRouteExplorer([a,b]);
  const metrics=computeRouteMetrics([a,b],[{id:"one"}]);
  assert.equal(route.distanceM,metrics.distanceM);
  assert.equal(route.sections.length,1);
  assert.equal(route.sections[0].dayId,metrics.profileDayIds[0]);
  const cursor=locationAtDistance(route,450);
  assert.ok(cursor);
  assert.ok(cursor.lat > a.lat && cursor.lat < b.lat);
  assert.ok(cursor.lng < a.lng && cursor.lng > b.lng);
  assert.ok(Math.abs(cursor.elevationM-650)<0.01);
  assert.ok(gradeAtDistance(route,450)>0);
  assert.equal(route.stopDistances[b.id],900);
});

test("a day crossover and a manual link never become a continuous elevation profile", () => {
  const a=fixture("a","one",49.2,-123.2);
  const b=fixture("b","one",49.203,-123.203);
  const c=fixture("c","two",49.204,-123.204);
  const d=fixture("d","two",49.207,-123.207);
  a.trailToNext=segment(a,b,900,[600,625,675,700]);
  b.manualToNext=true;
  c.trailToNext=segment(c,d,900,[700,725,750,800]);
  const route=buildRouteExplorer([a,b,c,d]);
  assert.equal(route.sections.length,2);
  assert.deepEqual(route.sections.map(s=>s.dayId),["one","two"]);
  const gap=(route.stopDistances[b.id]+route.stopDistances[c.id])/2;
  assert.equal(locationAtDistance(route,gap),null);
  assert.equal(gradeAtDistance(route,gap),null);
  assert.ok(locationAtDistance(route,route.stopDistances[c.id]+450));
});

test("sparse >400m windows cannot create fake chart lines or map locations", () => {
  const a=fixture("a","one",49.2,-123.2);
  const b=fixture("b","one",49.205,-123.205);
  a.trailToNext=segment(a,b,1200,[600,850]);
  const route=buildRouteExplorer([a,b]);
  assert.equal(route.sections.length,0);
  assert.equal(locationAtDistance(route,600),null);
});

test("map profile and itinerary share explicit day and cursor state", () => {
  const root=join(__dirname,"../components/builder/TripPlanner");
  const trip=readFileSync(join(root,"TripRoute.tsx"),"utf8");
  const map=readFileSync(join(root,"RouteMapInner.tsx"),"utf8");
  const day=readFileSync(join(root,"DayStopsItinerary.tsx"),"utf8");
  const dock=readFileSync(join(root,"RouteProfileDock.tsx"),"utf8");
  const analysis=readFileSync(join(root,"RouteElevationPanel.tsx"),"utf8");
  assert.match(trip,/RouteProfileDock route=\{explorer\}/);
  assert.match(trip,/hoverLocation=\{hoverProfile/);
  assert.match(map,/CircleMarker center=\{hoverLocation\}/);
  assert.match(map,/FocusSelectedDay/);
  assert.match(day,/route\.focusDay\(isFocused/);
  assert.match(dock,/onPointerMove=\{move\}/);
  assert.match(dock,/onKeyDown=\{keyDown\}/);
  assert.match(analysis,/<section id="route-notable-terrain"/);
  assert.doesNotMatch(analysis,/<ProfileChart/);
});


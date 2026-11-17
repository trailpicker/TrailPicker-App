const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const base = path.join(__dirname, '../components/builder/TripPlanner');
const read = f => fs.readFileSync(path.join(base,f),'utf8');

test('desktop route map and itinerary use the same full-height workspace', () => {
  const trip=read('TripRoute.tsx');
  const itinerary=read('DayStopsItinerary.tsx');
  const map=read('RouteMapInner.tsx');
  assert.match(trip,/overflow-hidden rounded-xl border border-gray-200 bg-white xl:h-\[min\(82vh,870px\)\]/);
  assert.match(itinerary,/id="itinerary" className="[^"]*xl:h-\[min\(82vh,870px\)\]/);
  assert.match(itinerary,/xl:h-full xl:overflow-y-auto/);
  assert.match(map,/trailpicker-route-map relative z-0 h-\[500px\] w-full sm:h-\[600px\] xl:h-full/);
  assert.doesNotMatch(map,/63vh,625px/);
  assert.match(trip,/absolute left-3 right-28 top-3/); // Controls overlay, not a row above the map
});

test('optional elevation is a map overlay, with no reserved whitespace', () => {
  const trip=read('TripRoute.tsx');
  const resizer=read('ResizableElevationDock.tsx');
  const css=fs.readFileSync(path.join(__dirname,'../app/globals.css'),'utf8');
  assert.match(trip,/const \[elevationOpen, setElevationOpen\] = useState\(false\)/);
  assert.match(trip,/<ResizableElevationDock onHeightChange=\{setElevationHeight\}>/);
  assert.match(resizer,/absolute inset-x-0 bottom-0/);
  assert.match(resizer,/calc\(100% - 170px\)/); // Keep access to map even with maximum profile height
  assert.match(resizer,/drag\.current\.initial \+ drag\.current\.y - event\.clientY/);
  assert.match(resizer,/event\.key === "ArrowUp" \? 18 : -18/);
  assert.match(css,/\.trailpicker-route-map \.leaflet-bottom/);
  assert.match(css,/bottom: calc\(var\(--route-profile-inset, 0px\) \+ 8px\) !important/); // Keep OSM attribution visible
});

test('profile is measured at rendered size; 0km is never clipped or stretched', () => {
  const profile=read('RouteProfileDock.tsx');
  assert.match(profile,/new ResizeObserver/);
  assert.match(profile,/viewBox=\{`0 0 \$\{width\} \$\{height\}`\}/);
  assert.match(profile,/preserveAspectRatio="none"/);
  assert.doesNotMatch(profile,/preserveAspectRatio="xMidYMid meet"/);
  assert.match(profile,/<span>0 km<\/span>/);
  assert.match(profile,/<span>\{fmtDistance\(route\.distanceM\)\}<\/span>/);
  assert.doesNotMatch(profile,/<text[^>]*>0 km<\/text>/);
  assert.doesNotMatch(profile,/Detailed analysis|ArrowUpRight/);
});

test('mapped polylines reset stale Leaflet dash styles after routing or saving', () => {
  const map=read('RouteMapInner.tsx');
  assert.match(map,/key=\{trail \? "mapped" : "direct"\}/);
  assert.match(map,/trail \? \{ color: "#166534", dashArray: undefined/);
  assert.match(map,/\{ color: "#d97706", weight: 3, dashArray: "6 8"/);
  // Leaflet's setStyle merges options: explicitly resetting dashArray is essential.
  const priorStyle={color:'#d97706',dashArray:'6 8'};
  const nextStyle=Object.assign(priorStyle,{color:'#166534',dashArray:undefined});
  assert.equal(nextStyle.dashArray,undefined);
  assert.match(read('TripRoute.tsx'),/routeForSave\(followTrails \? points/);
  assert.match(read('TripRoute.tsx'),/saveTripRoute\(form\)/);
});

test('map and itinerary sharing, editing and daylight analysis remain wired', () => {
  const trip=read('TripRoute.tsx');
  const dock=read('RouteProfileDock.tsx');
  assert.match(trip,/<ResizableRouteLayout enabled=/);
  assert.match(trip,/hoverLocation=\{hoverProfile/);
  assert.match(trip,/<RouteAnalysisSection points=/);
  assert.match(dock,/onDayChange\(activeDayId === day.id \? null : day.id\)/);
  assert.match(dock,/locationAtDistance\(route/);
});

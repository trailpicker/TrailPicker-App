const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const base = path.join(__dirname, '../components/builder/TripPlanner');
const read = file => fs.readFileSync(path.join(base, file), 'utf8');

test('the elevation profile starts closed and is toggled next to Edit route', () => {
  const source = read('TripRoute.tsx');
  assert.match(source, /const \[elevationOpen, setElevationOpen\] = useState\(false\)/);
  assert.match(source, /aria-label="Route workspace controls"/);
  assert.match(source, /aria-expanded=\{elevationOpen\}/);
  assert.match(source, /Elevation profile/);
  assert.match(source, /Edit route/);
  const controls = source.slice(source.indexOf('aria-label="Route workspace controls"'), source.indexOf('{placing && canEdit', source.indexOf('aria-label="Route workspace controls"')));
  assert.ok(controls.indexOf('Edit route') < controls.indexOf('Elevation profile'));
  assert.match(source, /\{elevationOpen && <ResizableElevationDock(?: [^>]*)?>/);
  assert.match(source, /setHoverProfile\(null\)/);
});

test('map and itinerary have no redundant heading and helper text', () => {
  const trip = read('TripRoute.tsx');
  const itinerary = read('DayStopsItinerary.tsx');
  assert.doesNotMatch(trip, /<h2[^>]*>Route map<\/h2>/);
  assert.doesNotMatch(trip, /Saved stops are destinations\. Shaping waypoints/);
  assert.doesNotMatch(itinerary, /<h3[^>]*>Daily itinerary<\/h3>/);
  assert.doesNotMatch(itinerary, /Select a stop to find it on the map/);
  assert.match(itinerary, /<DaySection/);
});

test('elevation height has a keyboard and pointer accessible resizer with saved size', () => {
  const resize = read('ResizableElevationDock.tsx');
  for (const token of ['role="separator"', 'aria-orientation="horizontal"', 'onPointerDown', 'onPointerMove', 'onPointerUp', 'onPointerCancel', 'onLostPointerCapture', 'onDoubleClick', 'onKeyDown', 'ArrowDown', 'ArrowUp', 'localStorage.setItem', 'localStorage.getItem']) {
    assert.ok(resize.includes(token), `missing ${token}`);
  }
  assert.match(resize, /Math\.min\(MAX_HEIGHT, Math\.max\(MIN_HEIGHT, height\)\)/);
  assert.match(resize, /style=\{\{ height: `min\(/);
  assert.match(read('RouteProfileDock.tsx'), /cursor-crosshair/);
  assert.match(read('TripRoute.tsx'), /<ResizableElevationDock onHeightChange=/);
});

test('map remains sizeable and cross-panel routing features stay wired', () => {
  const map = read('RouteMapInner.tsx');
  const trip = read('TripRoute.tsx');
  assert.match(map, /xl:h-full/);
  assert.match(map, /RefreshMapOnResize/);
  assert.match(trip, /hoverLocation=\{hoverProfile/);
  assert.match(trip, /<ResizableRouteLayout enabled=/);
  assert.match(trip, /<RouteAnalysisSection points=/);
  assert.match(trip, /saveTripRoute/);
});

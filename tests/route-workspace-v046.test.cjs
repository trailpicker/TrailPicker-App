const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const root = path.join(__dirname, '../components/builder/TripPlanner');
const route = fs.readFileSync(path.join(root, 'TripRoute.tsx'), 'utf8');
const toolbar = route.slice(route.indexOf('aria-label="Route workspace controls"'), route.indexOf('      <RouteMap\n', route.indexOf('aria-label="Route workspace controls"')));

test('edit route is followed by elevation control in the top-left map toolbar', () => {
  assert.match(route, /pointer-events-none absolute left-3 right-28 top-3 z-\[1100\]/);
  const edit = toolbar.lastIndexOf('Edit route');
  const elevation = toolbar.lastIndexOf('Elevation profile');
  assert.ok(edit >= 0 && elevation > edit);
  assert.match(toolbar, /aria-expanded=\{elevationOpen\}/);
  assert.match(toolbar, /aria-controls="route-elevation-profile"/);
});

test('route editing uses a single compact action row', () => {
  assert.match(toolbar, /Save route/);
  assert.match(toolbar, /onClick=\{save\}/);
  assert.match(toolbar, /onClick=\{cancel\}/);
  assert.match(toolbar, /aria-label="Undo route edit"/);
  assert.match(toolbar, /onClick=\{undoEdit\}/);
  assert.match(toolbar, /aria-label="More route editing tools"/);
  assert.doesNotMatch(toolbar, /aria-label="Route editing tools"/);
  assert.doesNotMatch(toolbar, /Add a blue diamond waypoint/);
});

test('secondary route modes remain operable from More, retry is contextual', () => {
  assert.match(toolbar, /role="group" aria-label="Route editing options"/);
  assert.match(toolbar, /aria-pressed=\{followTrails\}/);
  assert.match(toolbar, /aria-pressed=\{!followTrails\}/);
  assert.match(toolbar, /changeMode\(true\)/);
  assert.match(toolbar, /changeMode\(false\)/);
  assert.match(toolbar, /followTrails && routingMessage &&/);
  assert.match(toolbar, /setRetryRouting\(n => n \+ 1\)/);
  assert.match(route, /Dashed lines are approximate, not verified paths/);
  assert.match(route, /routeForSave\(consolidateOvernightStops\(followTrails \? points/);
});

test('More closes on outside clicks, Escape, route save and cancel', () => {
  assert.match(route, /toolsMenuRef\.current\?\.contains\(event\.target as Node\)/);
  assert.match(route, /event\.key === "Escape"/);
  assert.match(route, /document\.removeEventListener\("pointerdown", outside\)/);
  assert.match(route, /document\.removeEventListener\("keydown", escape\)/);
  assert.match(route, /setToolsMenuOpen\(false\);\n    setPoints\(committed\)/);
  assert.match(route, /setEditing\(false\);\n        setToolsMenuOpen\(false\)/);
});

test('placing an actual stop still shows brief contextual instruction with cancel', () => {
  assert.match(toolbar, /\{placing && canEdit && \(/);
  assert.match(toolbar, /Click the map to add a/);
  assert.match(toolbar, /aria-label="Cancel map placement"/);
});

test('map, elevation, itinerary and analysis data paths stay intact', () => {
  assert.match(route, /<ResizableRouteLayout enabled=\{Boolean\(renderItinerary\)\}>/);
  assert.match(route, /hoverLocation=\{hoverProfile \?/);
  assert.match(route, /\{elevationOpen && <ResizableElevationDock/);
  assert.match(route, /\{renderItinerary\?\.\(routeControls\)\}/);
  assert.match(route, /<RouteAnalysisSection points=\{points\}/);
});


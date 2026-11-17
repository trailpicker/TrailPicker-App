const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const read = name => fs.readFileSync(path.join(root, name), 'utf8');

test('elevation profile never paints a guessed 680px graph before measuring', () => {
  const source = read('components/builder/TripPlanner/RouteProfileDock.tsx');
  assert.doesNotMatch(source, /width: 680, height: 140/);
  assert.match(source, /useLayoutEffect/);
  assert.match(source, /getBoundingClientRect\(\)/);
  assert.match(source, /ResizeObserver/);
  assert.match(source, /dimensions && <svg/);
  assert.match(source, /max-w-\[900px\]/);
});

test('graph x-labels share the plot width instead of spanning the whole drawer', () => {
  const source = read('components/builder/TripPlanner/RouteProfileDock.tsx');
  assert.match(source, /mx-auto flex w-full max-w-\[900px\][^\n]+justify-between/);
  assert.match(source, /<span>0 km<\/span><span>\{fmtDistance\(route.distanceM\)\}<\/span>/);
});

test('zoom buttons, attribution and Ctrl+scroll hint are raised above open elevation', () => {
  const css = read('app/globals.css');
  assert.match(css, /\.leaflet-container\.trailpicker-route-map \.leaflet-bottom/);
  assert.match(css, /bottom: calc\(var\(--route-profile-inset, 0px\) \+ 8px\) !important;/);
  assert.match(css, /\.leaflet-container\.trailpicker-route-map \.trailpicker-ctrl-wheel-hint/);
  assert.match(css, /bottom: calc\(var\(--route-profile-inset, 0px\) \+ 1\.25rem\) !important;/);
  const map = read('components/builder/TripPlanner/RouteMapInner.tsx');
  assert.match(map, /<ZoomControl position="bottomleft"/);
  assert.match(map, /<CtrlWheelZoom \/>/);
});

test('drawer and map use identical vertical inset caps and leave visible map controls', () => {
  const dock = read('components/builder/TripPlanner/ResizableElevationDock.tsx');
  const trip = read('components/builder/TripPlanner/TripRoute.tsx');
  assert.match(dock, /calc\(100% - 170px\)/);
  assert.match(trip, /calc\(100% - 170px\)/);
  assert.match(trip, /relative isolate z-0/);
  assert.match(trip, /<RouteProfileDock/);
});

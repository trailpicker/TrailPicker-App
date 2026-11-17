const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const read = name => fs.readFileSync(path.join(root, name), 'utf8');

test('map workspace isolates Leaflet and drawer stacking below the sticky site navbar', () => {
  const map = read('components/builder/TripPlanner/TripRoute.tsx');
  const header = read('components/NavbarNavigation.tsx');
  assert.match(header, /sticky top-0 z-50/);
  assert.match(map, /className="relative isolate z-0 min-w-0 overflow-hidden rounded-xl border/);
  const mapBoundary = map.indexOf('className="relative isolate z-0');
  assert.ok(mapBoundary >= 0);
  assert.ok(map.indexOf('z-[1100]', mapBoundary) > mapBoundary, 'toolbar inside isolation boundary');
  assert.ok(map.indexOf('<ResizableElevationDock', mapBoundary) > mapBoundary, 'drawer inside isolation boundary');
});

test('compact elevation panel has no mountain icon', () => {
  const panel = read('components/builder/TripPlanner/RouteProfileDock.tsx');
  assert.doesNotMatch(panel, /\bMountain\b|<Mountain/);
  assert.match(panel, /Map-linked elevation profile|aria-label="Map-linked elevation profile"/i);
  assert.match(panel, /Elevat(?:ion|ion profile)/);
});

test('elevation toggle retains its icon while analysis section headings are plain text', () => {
  const map = read('components/builder/TripPlanner/TripRoute.tsx');
  const analysis = read('components/builder/TripPlanner/RouteElevationPanel.tsx');
  assert.match(map, /<Mountain className="h-4 w-4" aria-hidden="true" \/>\s*Elevation profile/);
  assert.doesNotMatch(analysis, /<Mountain[^>]*\s*\/>Notable climbs & descents/);
  assert.match(analysis, />Notable climbs & descents<\/h3>/);
});

test('route editing, map profile and slope section remain functional surfaces', () => {
  const map = read('components/builder/TripPlanner/TripRoute.tsx');
  assert.match(map, /<RouteMap[\s\S]*onSelect=/);
  assert.match(map, /<ResizableElevationDock[\s\S]*<RouteProfileDock/);
  assert.match(map, /onInspectTerrain=\{inspectTerrainSection\}/);
});



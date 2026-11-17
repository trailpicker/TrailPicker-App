const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const base = path.join(__dirname, '../components/builder/TripPlanner');
const read = name => fs.readFileSync(path.join(base, name), 'utf8');

test('Fit route is icon-only but preserves keyboard and screen reader access', () => {
  const map = read('RouteMapInner.tsx');
  const fit = map.slice(map.indexOf('function FitRoute('), map.indexOf('function StopMarker('));
  assert.match(fit, /aria-label="Fit route" title="Fit route"/);
  assert.match(fit, /<LocateFixed className="h-4 w-4" aria-hidden="true"\s*\/>/);
  assert.doesNotMatch(fit, /\/>Fit route/);
  assert.match(fit, /onClick=\{fit\}/);
});

test('Leaflet zoom controls are outside the elevation toggle and remain above the drawer', () => {
  const map = read('RouteMapInner.tsx');
  const css = fs.readFileSync(path.join(__dirname, '../app/globals.css'), 'utf8');
  const route = read('TripRoute.tsx');
  assert.match(map, /<MapContainer[^>]*zoomControl=\{false\}/);
  assert.match(map, /<ZoomControl position="bottomleft"\s*\/>/);
  assert.match(map, /trailpicker-ctrl-wheel-hint[^\"]*left-14/);
  assert.match(route, /--route-profile-inset/);
  assert.match(css, /\.trailpicker-route-map \.leaflet-bottom\s*\{\s*bottom: calc\(var\(--route-profile-inset, 0px\) \+ 8px\) !important/);
  assert.match(css, /\.trailpicker-route-map \.trailpicker-ctrl-wheel-hint/);
});

test('elevation plot displays a metre-labelled vertical axis without stretching', () => {
  const profile = read('RouteProfileDock.tsx');
  assert.match(profile, /const LEFT = 55/);
  assert.match(profile, /const elevationTicks = useMemo/);
  assert.match(profile, /<text x=\{LEFT - 9\} y=\{y\(tick\) \+ 3\.5\} textAnchor="end"/);
  assert.match(profile, /\{tick\.toLocaleString\(\)\} m<\/text>/);
  assert.match(profile, /paddingLeft: LEFT, paddingRight: RIGHT/);
  assert.match(profile, /preserveAspectRatio="none"/);
  assert.match(profile, /new ResizeObserver/);
});

test('map, route selection and elevation dock remain connected', () => {
  const route = read('TripRoute.tsx');
  const map = read('RouteMapInner.tsx');
  assert.match(route, /<ResizableElevationDock onHeightChange=\{setElevationHeight\}>/);
  assert.match(route, /hoverLocation=\{hoverProfile/);
  assert.match(map, /<CircleMarker center=\{hoverLocation\}/);
  assert.match(route, /<RouteAnalysisSection points=/);
});

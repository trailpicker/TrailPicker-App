const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const read = name => fs.readFileSync(path.join(root,name), 'utf8');

test('profile plots independently scaled axes without letterboxing during panel resizing', () => {
  const source = read('components/builder/TripPlanner/RouteProfileDock.tsx');
  assert.match(source, /viewBox=\{`0 0 \$\{width\} \$\{height\}`\} preserveAspectRatio="none"/);
  assert.doesNotMatch(source, /preserveAspectRatio="xMidYMid meet"/);
  assert.match(source, /dimensions && <svg/);
  assert.match(source, /ResizeObserver/);
  assert.match(source, /vectorEffect="non-scaling-stroke"/);
});

test('saved elevation height is read before mounting, not after a flash of default height', () => {
  const source = read('components/builder/TripPlanner/ResizableElevationDock.tsx');
  assert.match(source, /function initialHeight\(\)/);
  assert.match(source, /useState\(initialHeight\)/);
  assert.match(source, /useRef\(height\)/);
  assert.doesNotMatch(source, /requestAnimationFrame\(/);
  assert.match(source, /localStorage\.getItem\(STORAGE_KEY\)/);
  assert.match(source, /localStorage\.setItem\(STORAGE_KEY/);
});

test('map controls and distance labels retain previous v0.4.9 behavior', () => {
  const profile = read('components/builder/TripPlanner/RouteProfileDock.tsx');
  const css = read('app/globals.css');
  const route = read('components/builder/TripPlanner/TripRoute.tsx');
  assert.match(profile, /mx-auto flex w-full max-w-\[900px\]/);
  assert.match(profile, /style=\{\{ paddingLeft: LEFT, paddingRight: RIGHT \}\}/);
  assert.match(css, /route-profile-inset/);
  assert.match(route, /<ResizableElevationDock/);
  assert.match(route, /<RouteProfileDock/);
});

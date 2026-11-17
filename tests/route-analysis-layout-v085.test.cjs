const test = require('node:test');
const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { resolve } = require('node:path');
const root = resolve(__dirname, '..');
const section = readFileSync(resolve(root, 'components/builder/TripPlanner/RouteAnalysisSection.tsx'), 'utf8');
const terrain = readFileSync(resolve(root, 'components/builder/TripPlanner/RouteElevationPanel.tsx'), 'utf8');

test('the route analysis header has only the custom day selector, without an Analysis scope label or wrapper card', () => {
  assert.match(section, /<StopSelectPicker label="Filter route analysis by day" hideLabel variant="analysis"/);
  assert.match(section, /value=\{scopeDayId \?\? ""\}/);
  assert.doesNotMatch(section, />Analysis scope<\/span>/);
  assert.doesNotMatch(section, /rounded-xl border border-green-200 bg-green-50\/70 px-3 py-2 shadow-sm/);
  assert.ok(section.indexOf('StopSelectPicker label="Filter route analysis by day"') < section.indexOf('<RouteElevationPanel'));
});

test('terrain methodology has no dividing border above its toggle', () => {
  const className = terrain.match(/<details id="route-terrain-method" className="([^"]+)"/);
  assert.ok(className, 'terrain methodology details present');
  assert.doesNotMatch(className[1], /\bborder-(?:t|top)\b/);
  assert.match(className[1], /\bmt-4\b/);
  assert.match(terrain, /How terrain sections are identified/);
});

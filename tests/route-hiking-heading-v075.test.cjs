const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const source = fs.readFileSync(path.resolve(__dirname, '../components/builder/TripPlanner/RouteElevationPanel.tsx'), 'utf8');

test('Hiking time header is 18px, semibold, and keeps the accessible heading', () => {
  assert.match(source, /<h3 id="route-hiking-time-heading" className="text-lg font-semibold text-gray-950">Hiking time<\/h3>/);
  assert.doesNotMatch(source, /<h3 id="route-hiking-time-heading" className="text-sm/);
});

test('Estimate number retains existing size and calculation', () => {
  assert.match(source, /className="text-4xl font-bold tracking-tight tabular-nums text-gray-950"/);
  assert.match(source, /const totalMinutes = movingMinutes !== null && breakEstimate !== null \? movingMinutes \+ breakEstimate : null/);
});

test('Two-column and collapsible settings layout remains intact', () => {
  assert.match(source, /settingsOpen \? "lg:grid-cols-\[minmax\(0,1fr\)_minmax\(0,0\.95fr\)\]" : "lg:grid-cols-1"/);
  assert.match(source, /\{!settingsOpen && <button/);
  assert.match(source, /Show settings/);
  assert.match(source, /Close hiking settings/);
  assert.match(source, /settingsOpen && advancedOpen \? "lg:items-start" : "lg:items-stretch"/);
  assert.match(source, /grid grid-cols-3 gap-x-3/);
});

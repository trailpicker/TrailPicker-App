const test = require('node:test');
const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { resolve } = require('node:path');
const panel = readFileSync(resolve(__dirname, '../components/builder/TripPlanner/RouteElevationPanel.tsx'), 'utf8');
const parent = readFileSync(resolve(__dirname, '../components/builder/TripPlanner/RouteAnalysisSection.tsx'), 'utf8');
test('route analysis remains the visually larger section title', () => {
  assert.match(parent, /id="route-analysis-heading" className="text-xl font-bold/);
});
test('both subsection headings are a smaller matching size', () => {
  for (const heading of ['Notable climbs & descents', 'Compare hiking days']) {
    assert.ok(panel.includes(`className="text-base font-semibold text-gray-950">${heading}`));
    assert.ok(!panel.includes(`className="text-lg font-semibold text-gray-950">${heading}`));
  }
});

const test = require('node:test');
const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { resolve } = require('node:path');
const src = readFileSync(resolve(__dirname, '../components/builder/TripPlanner/RouteElevationPanel.tsx'), 'utf8');
test('compare hiking days uses the same per-day time and break model as the main card', () => {
  assert.match(src, /days\.map\(\(day, index\) =>/);
  assert.match(src, /routeAnalysisScope\(metrics, day\.id, breaks\)/);
  assert.match(src, /dayScope\.movingMinutes \+ dayScope\.breakMinutes/);
  assert.match(src, /\[days, metrics, breaks\]/);
});
test('unrouted days are not mistakenly assigned the entire route estimate', () => {
  assert.match(src, /!dayMetrics \|\| dayMetrics\.segments === 0/);
  assert.match(src, /No mapped route/);
  assert.match(src, /Unavailable/);
});
test('comparison is compact and does not duplicate reliability warnings', () => {
  assert.match(src, /dayComparison\.length > 1/);
  assert.match(src, /Compare hiking days/);
  assert.match(src, /maxDayMinutes/);
  assert.match(src, /Partial days have incomplete trail or elevation data/);
  assert.doesNotMatch(src.slice(src.indexOf('id="route-compare-days"')), /Some route estimates are incomplete/);
});

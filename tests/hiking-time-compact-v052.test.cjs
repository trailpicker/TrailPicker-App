const test = require('node:test');
const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { resolve } = require('node:path');
const source = readFileSync(resolve(__dirname, '../components/builder/TripPlanner/RouteElevationPanel.tsx'), 'utf8');
const scope = readFileSync(resolve(__dirname, '../lib/route-analysis-scope.ts'), 'utf8');

test('hiking summary is primary, partial coverage is explicit, and underlying time arithmetic is unchanged', () => {
  for(const item of ['Hiking time', 'Moving time unavailable',
    'moving', 'breaks', 'Partial estimate', 'Only estimable route sections', 'totalBreakText', 'totalMinutes']) {
     assert.ok(source.toLowerCase().includes(item.toLowerCase()),`missing ${item}`);
  }
  assert.match(source, /const totalMinutes = movingMinutes !== null && breakEstimate !== null \? movingMinutes \+ breakEstimate : null/);
  assert.match(scope, /metrics.dayMetrics.length/);
  assert.match(scope, /const movingMinutes = day/);
  assert.match(scope, /const breakMinutes = day/);
  assert.match(source, /routeTimeComplete/);
});

test('pace, breaks, Tobler model are shared with itinerary, not a second timing dashboard',()=>{
 for(const item of ['Hiking pace','level-trail speed','Break duration','Advanced pace',
    'customMinutesPerHour','Classic Naismith','Swiss Alpine Club']) assert.ok(source.includes(item),`missing ${item}`);
 assert.match(scope, /estimateBreaks\(dayMoving\[index\], breaks\)/);
 assert.doesNotMatch(source, /Plan your hiking days|Daylight planning reserve|Compare with a completed hike/);
});



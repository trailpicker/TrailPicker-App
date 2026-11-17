import test from 'node:test';import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';
const source=readFileSync(new URL('../components/builder/TripPlanner/RouteElevationPanel.tsx',import.meta.url),'utf8');
const daily=readFileSync(new URL('../components/builder/TripPlanner/DayStopsItinerary.tsx',import.meta.url),'utf8');
test('gradient colors now belong to the map profile; analysis shows notable terrain',()=>{
 const dock=readFileSync(new URL('../components/builder/TripPlanner/RouteProfileDock.tsx',import.meta.url),'utf8');
 assert.match(source,/id="route-notable-terrain"/);
 assert.match(source,/Notable climbs & descents/);
 assert.match(source,/terrainFindings\.map/);
 assert.doesNotMatch(source,/<GradientBar|Gradient distribution/);
 assert.match(dock,/buildTerrainStrokes/);
 assert.match(dock,/Elevation profile display mode/);
});
test('time and terrain stay in Route Analysis; day-by-day schedule is not duplicated',()=>{
 assert.match(source,/aria-label="Hiking time and breaks"/);
 assert.doesNotMatch(source,/aria-label="Daily hiking analysis"/);
 assert.match(source,/routeIssues\.length > 0/);
 assert.match(daily,/calculateDayItinerary/);
 assert.match(daily,/Day forecast/);
});
test('pace and breaks control the time model; itinerary schedules use those settings',()=>{
 for(const item of ['Advanced pace','Break duration','Classic Naismith','Swiss Alpine Club'])assert.ok(source.includes(item));
 assert.match(source,/routeAnalysisScope\(metrics, activeDayId, breaks\)/);
 assert.match(readFileSync(new URL('../lib/route-analysis-scope.ts',import.meta.url),'utf8'),/estimateBreaks/);
 assert.match(daily,/route\.breakSettings/);
});




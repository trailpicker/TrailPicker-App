const test=require('node:test');const assert=require('node:assert/strict');const {readFileSync}=require('node:fs');const {resolve}=require('node:path');
const source=readFileSync(resolve(__dirname,'../components/builder/TripPlanner/RouteElevationPanel.tsx'),'utf8');
const route=readFileSync(resolve(__dirname,'../components/builder/TripPlanner/TripRoute.tsx'),'utf8');
const itinerary=readFileSync(resolve(__dirname,'../components/builder/TripPlanner/DayStopsItinerary.tsx'),'utf8');
test('hiking-time and terrain use a spacious hierarchy without a dashboard wrapper',()=>{
 assert.match(source,/space-y-5 pb-3 sm:space-y-6/);
 assert.match(source,/Route fundamentals/);
 assert.ok(source.indexOf('Hiking time')<source.indexOf('Notable climbs & descents'));
 assert.doesNotMatch(source,/Daily hiking analysis/);
});
test('pace and breaks remain primary, collapsible controls',()=>{
 for(const label of ['Hiking pace','Break duration','Advanced settings','Classic Naismith','Swiss Alpine Club'])assert.ok(source.includes(label));
 assert.match(source,/settingsOpen/);
 assert.match(route,/breakSettings/);
 assert.match(itinerary,/route\.breakSettings/);
});
test('terrain overview and leading sustained climb visible by default',()=>{
 assert.match(source,/id="route-notable-terrain"/);
 assert.match(source,/terrainFindings\.map/);
 assert.match(source,/id="route-terrain-method"/);
 assert.doesNotMatch(source,/<GradientBar/);
});
test('timing only depends on route estimates, while solar is part of day forecast',()=>{
 assert.match(readFileSync(resolve(__dirname,'../lib/route-analysis-scope.ts'),'utf8'),/metrics\.unassignedDaySegments === 0/);
 assert.match(source,/totalMinutes = movingMinutes !== null && breakEstimate !== null \? movingMinutes \+ breakEstimate : null/);
 assert.match(itinerary,/sunriseMinutes=\{dayTiming\.solar\?\.sunriseMinutes/);
 assert.match(itinerary,/daylight=\{forecastSolar\}/);
});




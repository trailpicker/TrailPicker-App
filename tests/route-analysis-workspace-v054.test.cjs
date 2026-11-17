const test=require('node:test');const assert=require('node:assert/strict');const {readFileSync}=require('node:fs');const {resolve}=require('node:path');
const source=readFileSync(resolve(__dirname,'../components/builder/TripPlanner/RouteElevationPanel.tsx'),'utf8');
const section=readFileSync(resolve(__dirname,'../components/builder/TripPlanner/RouteAnalysisSection.tsx'),'utf8');
const scope=readFileSync(resolve(__dirname,'../lib/route-analysis-scope.ts'),'utf8');
const itinerary=readFileSync(resolve(__dirname,'../components/builder/TripPlanner/DayStopsItinerary.tsx'),'utf8');
test('Route Analysis is an open layout with hiking time and terrain, not a duplicate itinerary',()=>{
 assert.match(source,/space-y-5/);assert.match(source,/Hiking time/);assert.match(source,/Notable climbs & descents/);
 assert.doesNotMatch(source,/Plan your hiking days|Daily hiking analysis/);
 assert.match(source,/Distance/);assert.match(source,/Ascent/);assert.match(source,/Descent/);
 assert.match(section,/<RouteElevationPanel/);
});
test('incomplete-data warning remains conditional and no reliability dashboard returns',()=>{
 assert.match(source,/routeIssues\.length > 0 &&/);
 assert.match(scope,/unroutedSegments > 0/);
 assert.match(scope,/routedSegments > climbedSegments/);
 assert.match(scope,/unassigned > 0/);
 assert.doesNotMatch(source,/How reliable is this analysis/);
});
test('daily schedule estimates, solar times and warnings belong to the itinerary',()=>{
 assert.match(itinerary,/calculateDayItinerary/);
 assert.match(itinerary,/itineraryTimingIssues/);
 assert.match(itinerary,/forecastSolar/);
 assert.match(itinerary,/warnings\.map/);
 assert.doesNotMatch(source,/Departure preview|Expected finish|Daylight planning reserve/);
});
test('break controls are shared instead of isolated inside Route Analysis',()=>{
 assert.match(source,/onBreaksChange/);
 assert.match(source,/aria-label="Hiking time and settings"/);
 assert.match(scope,/estimateBreaks\(dayMoving\[index\], breaks\)/);
});
test('terrain findings and map-link controls are preserved',()=>{
 assert.match(source,/id="route-terrain-method"/);
 assert.match(source,/terrainFindings\.map/);
 assert.match(source,/onInspect=\{onInspectTerrain\}/);
 assert.doesNotMatch(source,/<ProfileChart/);
});



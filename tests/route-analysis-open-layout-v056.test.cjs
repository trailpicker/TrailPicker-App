const test = require('node:test');
const assert = require('node:assert/strict');
const {readFileSync}=require('node:fs');
const {resolve}=require('node:path');
const source=readFileSync(resolve(__dirname,'../components/builder/TripPlanner/RouteElevationPanel.tsx'),'utf8');
const itinerary=readFileSync(resolve(__dirname,'../components/builder/TripPlanner/DayStopsItinerary.tsx'),'utf8');

test('Route Analysis remains an open, two-section page with whitespace, not a parent dashboard card',()=>{
 assert.match(source,/space-y-5 pb-3 sm:space-y-6/);
 assert.doesNotMatch(source,/return <section className="overflow-hidden rounded-xl border/);
 assert.ok(source.indexOf('Hiking time')<source.indexOf('Notable climbs & descents'));
 assert.doesNotMatch(source,/Plan your hiking days|aria-label="Daily hiking analysis"/);
});
test('estimates stay visible while pace and break settings can collapse',()=>{
 assert.match(source,/useState\(true\)/);
 assert.match(source,/Show settings/);
 assert.doesNotMatch(source, /Estimated hiking time/);
 assert.ok(source.indexOf('route-hiking-time-heading')<source.indexOf('{settingsOpen && <section'));
 for(const label of ['Hiking pace','Break duration','Advanced settings'])assert.ok(source.includes(label));
 assert.match(source,/onBreaksChange\(prev/);
});
test('itinerary owns stop scheduling and daylight; gradient stays visible and map-linked',()=>{
 assert.match(itinerary,/calculateDayItinerary\(/);
 assert.match(itinerary,/Departure time \(optional\)/);
 assert.match(itinerary,/Sunrise/);assert.match(itinerary,/daylight=\{forecastSolar\}/);
 assert.match(source,/id="route-notable-terrain"/);
 assert.match(source,/terrainFindings\.map/);
 assert.doesNotMatch(source,/<GradientBar/);
 assert.match(source,/onInspect=\{onInspectTerrain\}/);
});



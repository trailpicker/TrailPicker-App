const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { analyzeTerrain } = require('../lib/route-analysis-insights.ts');
const { summarizeGradient } = require('../lib/terrain-gradient-summary.ts');
const source = (name) => fs.readFileSync(path.join(__dirname, '../components/builder/TripPlanner/', name), 'utf8');
const p = (distanceM, elevationM) => ({distanceM, elevationM});

test('gradient split distinguishes ascent, descent, and near-level terrain', () => {
  const result = summarizeGradient([
    {startM:0,endM:200,gradePct:3,band:'gentle',dayId:'a'},
    {startM:200,endM:400,gradePct:9,band:'moderate',dayId:'a'},
    {startM:400,endM:600,gradePct:15,band:'steep',dayId:'a'},
    {startM:600,endM:800,gradePct:-2,band:'gentle',dayId:'a'},
    {startM:800,endM:1000,gradePct:-9,band:'moderate',dayId:'a'},
    {startM:1000,endM:1200,gradePct:-13,band:'steep',dayId:'a'},
    {startM:1200,endM:1400,gradePct:0.3,band:'gentle',dayId:'a'},
  ]);
  assert.equal(result.analyzedM,1400);
  assert.equal(result.uphill.totalM,600);
  assert.equal(result.downhill.totalM,600);
  assert.equal(result.levelM,200);
  assert.deepEqual([result.uphill.gentleM,result.uphill.moderateM,result.uphill.steepM],[200,200,200]);
  assert.deepEqual([result.downhill.gentleM,result.downhill.moderateM,result.downhill.steepM],[200,200,200]);
});

test('longest sustained climb requires >= 500 m at >= 8% without crossing gaps or days', () => {
  const c=(a,b,g,d='one')=>({startM:a,endM:b,gradePct:g,band:g>=12?'steep':'moderate',dayId:d});
  const result=summarizeGradient([c(0,200,9),c(200,400,9),c(400,600,9),
     c(600,800,2),c(800,1000,10),c(1000,1200,10),
     c(1500,1700,10),c(1700,1900,10),c(1900,2100,10),c(2100,2300,10,'two')]);
  assert.equal(result.longestSteepClimb.startM,0);
  assert.equal(result.longestSteepClimb.endM,600);
  assert.equal(result.longestSteepClimb.gainM,54);
  assert.equal(result.longestSteepClimb.dayId,'one');
  assert.equal(summarizeGradient([c(0,200,9),c(200,400,9)]).longestSteepClimb,null);
});

test('existing terrain window gap handling is retained', () => {
  const sections=[[p(0,600),p(100,615),p(200,630),p(300,645),p(400,660),p(500,675),p(600,690)],
    [p(1800,700),p(2600,900)]];
  const existing=analyzeTerrain(sections,['a','b']);
  assert.equal(existing.analyzedDistanceM,600);
  assert.equal(summarizeGradient(existing.cells).analyzedM,600);
  assert.equal(summarizeGradient(existing.cells).longestSteepClimb.endM,600);
});

test('route analysis uses one gradient report, no duplicated elevation chart', () => {
  const panel=source('RouteElevationPanel.tsx');
  const route=source('TripRoute.tsx');
  const section=source('RouteAnalysisSection.tsx');
  const dock=source('RouteProfileDock.tsx');
  assert.match(panel, /id="route-notable-terrain"/);
  assert.match(panel, /Notable climbs & descents/);
  assert.doesNotMatch(panel, /Gradient distribution|Uphill distance|Downhill distance/);
  assert.match(dock, /aria-label="Gradient legend"/);
  assert.match(dock, /terrainStrokes.map/);
  assert.match(panel, /Locate on map/);
  assert.doesNotMatch(panel, /<ProfileChart|Detailed elevation & gradient analysis|route-elevation-detail/);
  assert.match(section, /onInspectTerrain=\{onInspectTerrain\}/);
  assert.match(route, /function inspectTerrainSection\(section: SustainedSlope\)/);
  assert.match(route, /locationAtDistance\(explorer, midpoint\)/);
  assert.match(route, /setElevationOpen\(true\)/);
  assert.match(dock, /focusedRange &&/);
});

test('time and breaks remain while daily schedules move to itinerary', () => {
  const panel=source('RouteElevationPanel.tsx');
  assert.match(panel, /aria-label="Hiking time and breaks"/);
  assert.doesNotMatch(panel, /Plan your hiking days/);
  assert.doesNotMatch(panel, /How reliable is this analysis/);
  assert.match(panel, /classicNaismithMinutes/);
  assert.match(panel, /estimateBreaks/);
  assert.match(panel, /onBreaksChange/);
});



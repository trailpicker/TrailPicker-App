const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { analyzeTerrain } = require('../lib/route-analysis-insights.ts');
const { buildTerrainStrokes, terrainStrokeColor } = require('../lib/route-profile-visual.ts');
const from = file => fs.readFileSync(path.join(__dirname, '../components/builder/TripPlanner',file),'utf8');
const dock = from('RouteProfileDock.tsx');
const panel = from('RouteElevationPanel.tsx');
const trip = from('TripRoute.tsx');
const point = (d,h) => ({distanceM:d,elevationM:h});

test('Profile has a two-mode accessible control and preserves day filtering and map-linked hover',()=>{
  assert.match(dock,/aria-label="Elevation profile display mode"/);
  assert.match(dock,/aria-pressed=\{profileMode === mode\}/);
  assert.match(dock,/onProfileModeChange\(mode\)/);
  assert.match(trip,/profileMode=\{profileMode\} onProfileModeChange=\{setProfileMode\}/);
  assert.match(trip,/setProfileMode\("gradient"\)/);
  assert.match(dock,/profileMode === "gradient" && terrainStrokes.map/);
  assert.match(dock,/onPointerMove=\{move\}/);
  assert.match(dock,/onDayChange\(activeDayId === day.id/);
  assert.match(dock,/opacity=\{!activeDayId \|\| activeDayId === stroke.dayId \? 1 : 0\.16\}/);
  assert.match(trip,/focusedRange=\{focusedTerrainRange\}/);
});

test('200 m gradient windows color the actual elevation path, with day and gap metadata retained',()=>{
  const samples = [point(0,100),point(100,102),point(200,105),point(300,120),point(400,135),point(500,160),point(600,190)];
  const result = analyzeTerrain([samples], ['day-one']);
  const strokes = buildTerrainStrokes([samples],result.cells);
  assert.equal(strokes.length,3);
  assert.deepEqual(strokes.map(s=>s.band),['gentle','steep','steep']);
  assert.ok(strokes.every(s=>s.dayId==='day-one'));
  assert.deepEqual(strokes[1].points.map(x=>x.elevationM),[105,120,135]);
  assert.equal(terrainStrokeColor('steep'),'#dc2626');
  assert.notEqual(terrainStrokeColor('gentle'),terrainStrokeColor('moderate'));
  assert.deepEqual(buildTerrainStrokes([samples],[{...result.cells[0],startM:700,endM:900}]),[]);
});

test('Analysis retains exactly one linked findings surface and hiking-time controls are unaffected',()=>{
  assert.match(panel,/id="route-notable-terrain"/);
  assert.match(panel,/terrainFindings.map/);
  assert.match(panel,/onInspect=\{onInspectTerrain\}/);
  assert.match(panel,/id="route-hiking-time-heading"/);
  assert.match(panel,/id="route-analysis-settings"/);
  assert.doesNotMatch(panel,/Gradient distribution|<GradientBar|route-gradient-analysis/);
});

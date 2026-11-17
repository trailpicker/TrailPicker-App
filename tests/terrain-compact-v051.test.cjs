const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { notableTerrainFindings } = require('../lib/terrain-gradient-summary.ts');
const panel = fs.readFileSync(path.resolve(__dirname, '../components/builder/TripPlanner/RouteElevationPanel.tsx'), 'utf8');
const slope = (direction, dayId, startM, endM, gradePct = 12) => ({
  direction, dayId, startM, endM, gradePct, gainM: Math.abs(endM - startM) * Math.abs(gradePct) / 100,
});

test('repeated hardest and longest climb is one finding with a combined label', () => {
  const hardest = slope('climb','day-1', 740, 2720, 13.3);
  const longest = { ...hardest };
  const result = notableTerrainFindings(hardest, longest, null);
  assert.equal(result.length, 1);
  assert.equal(result[0].title, 'Hardest & longest steep climb');
  assert.equal(result[0].slope, hardest);
});

test('distinct notable climb intervals remain separate, including descent', () => {
  const hardest = slope('climb','one',100,700);
  const longest = slope('climb','one',1100,2200);
  const descent = slope('descent','two',2800,3600, -12);
  const result = notableTerrainFindings(hardest,longest,descent);
  assert.equal(result.length,3);
  assert.deepEqual(result.map(x=>x.title), ['Hardest sustained climb','Longest sustained steep climb','Hardest sustained descent']);
});

test('equal start/end but different day or direction are not incorrectly deduplicated', () => {
  const first=slope('climb','one',0,600);
  const otherDay=slope('climb','two',0,600);
  assert.equal(notableTerrainFindings(first,otherDay,null).length,2);
});

test('absent slopes do not produce misleading empty placeholder cards', () => {
  assert.deepEqual(notableTerrainFindings(null,null,null), []);
});

test('notable climbs stay in Route Analysis and the gradient bars move to the map', () => {
  const dock = fs.readFileSync(path.resolve(__dirname, '../components/builder/TripPlanner/RouteProfileDock.tsx'), 'utf8');
  assert.match(panel, /<section id="route-notable-terrain"/);
  assert.match(panel, /<details id="route-terrain-method"/);
  for(const phrase of ['Notable climbs & descents', 'terrainFindings.map', 'Locate on map', 'onInspect={onInspectTerrain}', 'value={activeDayId ?? ""}']) {
    assert.ok(panel.includes(phrase), `missing ${phrase}`);
  }
  assert.doesNotMatch(panel, /<GradientBar|Gradient distribution/);
  assert.match(dock, /aria-label="Gradient legend"/);
  assert.match(dock, /buildTerrainStrokes/);
  assert.doesNotMatch(panel, /<ProfileChart|Detailed elevation & gradient analysis/);
});

test('terrain and hiking time are open sections, without a duplicate daily planner',()=>{
 for(const item of ['aria-label="Hiking time and breaks"','estimateBreaks(dayMoving[i], breaks)','classicNaismithMinutes'])assert.ok(panel.includes(item),`missing ${item}`);
 assert.doesNotMatch(panel,/Daily hiking analysis|Plan your hiking days|How reliable is this analysis/);
});


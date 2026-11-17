import test from 'node:test';
import assert from 'node:assert/strict';
import { buildTerrainStrokes, preserveProfileExtrema, terrainStrokeColor } from '../lib/route-profile-visual.ts';
import {readFileSync} from 'node:fs';

const cell = (startM,endM,gradePct,band) => ({startM,endM,gradePct,band,dayId:null});

test('Profile decimation keeps the original summit, low point and route endpoints', () => {
  const samples = Array.from({length:1200}, (_, i) => ({distanceM:i*10,elevationM:1000 + i*0.01}));
  samples[392].elevationM=2134;
  samples[707].elevationM=403;
  const reduced = preserveProfileExtrema(samples, 200);
  assert.ok(reduced.length <= 202);
  assert.equal(reduced[0],samples[0]);
  assert.equal(reduced.at(-1),samples.at(-1));
  assert.ok(reduced.includes(samples[392]));
  assert.ok(reduced.includes(samples[707]));
});

test('Slope overlay follows sampled elevation and uses actual 200 m terrain windows', () => {
  const sections = [[{distanceM:0,elevationM:500},{distanceM:100,elevationM:504},{distanceM:200,elevationM:510},{distanceM:300,elevationM:527},{distanceM:400,elevationM:550}]];
  const strokes = buildTerrainStrokes(sections,[cell(0,200,5,'moderate'),cell(200,400,20,'steep')]);
  assert.equal(strokes.length,2);
  assert.deepEqual(strokes[0].points.map(point=>point.elevationM),[500,504,510]);
  assert.deepEqual(strokes[1].points.map(point=>point.elevationM),[510,527,550]);
  assert.notEqual(terrainStrokeColor('gentle'),terrainStrokeColor('steep'));
});

test('Missing sections and sparse elevation gaps never receive invented slope strokes', () => {
  const disconnected = [[{distanceM:0,elevationM:200},{distanceM:200,elevationM:220}], [{distanceM:600,elevationM:600},{distanceM:800,elevationM:700}]];
  assert.equal(buildTerrainStrokes(disconnected,[cell(200,600,45,'steep')]).length,0);
  const sparse = [[{distanceM:0,elevationM:100},{distanceM:100,elevationM:110},{distanceM:900,elevationM:800}]];
  assert.equal(buildTerrainStrokes(sparse,[cell(100,400,80,'steep')]).length,0);
});

test('Route Analysis remains separate from map profile and itinerary daylight timing', () => {
  const source = readFileSync(new URL('../components/builder/TripPlanner/RouteElevationPanel.tsx',import.meta.url),'utf8');
  const dock = readFileSync(new URL('../components/builder/TripPlanner/RouteProfileDock.tsx',import.meta.url),'utf8');
  assert.match(dock, /preserveProfileExtrema/);
  assert.match(dock, /focusedRange/);
  assert.match(dock, /Map-linked elevation profile/);
  assert.match(source, /aria-label="Hiking time and breaks"/);
  assert.doesNotMatch(source, /Daylight planning reserve/);
  assert.doesNotMatch(source, /function GradientChart\(/);
});


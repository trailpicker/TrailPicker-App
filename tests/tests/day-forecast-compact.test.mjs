import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { resolve, dirname } from 'node:path';

const src = readFileSync(resolve(dirname(fileURLToPath(import.meta.url)), '../components/builder/TripPlanner/WeatherPanel.tsx'), 'utf8');
const dateBranch = src.split('  if (date) {')[1]?.split('\n  return (\n    <section\n      id={!date')[0] ?? '';

test('daily forecast has one title owned by itinerary, no duplicate inside weather card', () => {
  assert.ok(dateBranch.includes('Only one Day forecast title'));
  assert.doesNotMatch(dateBranch, /<span[^>]*>Day forecast<\/span>/);
  assert.ok(dateBranch.includes('Model estimate'));
});

test('forecast location is always named and change selector is accessible', () => {
  assert.match(dateBranch, /\{point\?\.name \?\? "No forecast location"\}/);
  assert.match(dateBranch, /aria-label="Change day forecast location"/);
  assert.match(dateBranch, /aria-expanded=\{locationOpen\}/);
  assert.match(dateBranch, /onClick=\{\(\) => setLocationOpen\(value => !value\)\}/);
  assert.match(dateBranch, /<select[\s\S]*?aria-label="Day forecast location"/);
  assert.match(dateBranch, /setSelected\(event.target.value\)/);
});

test('forecast temperature stays left, precipitation and wind are grouped to the right', () => {
  assert.match(dateBranch, /<SkyIcon kind=\{condition.kind\}/);
  assert.match(dateBranch, /\{temp\(day.high\)\}[\s\S]*?\{temp\(day.low\)\}/);
  assert.match(dateBranch, /className="ml-auto flex flex-wrap items-center justify-end/);
  assert.match(dateBranch, /Precip\. \{number\(day.pop, "%"\)\}/);
  assert.match(dateBranch, /Wind \{wind\(day.wind\)\}/);
});

test('removed unhelpful unique waypoint warning without changing fallback logic', () => {
  assert.doesNotMatch(src, /No unique waypoint matches this day/);
  assert.match(src, /const point = points.find\(p => p.id === selected\)/);
  assert.match(src, /points.find\(p => p.id === defaultPointId\) \|\| points\[0\]/);
});

test('official ECCC alerts stay visible but their long descriptions collapse', () => {
  assert.match(dateBranch, /\{actualAlerts.length > 0 && \(\s*<details/);
  assert.match(dateBranch, /<summary className=/);
  assert.match(dateBranch, /\{actualAlerts.length\} active ECCC/);
  assert.match(dateBranch, /\{actualAlerts.length === 1 \? actualAlerts\[0\]\.area/);
  assert.match(dateBranch, /These are current alerts, not necessarily alerts for your trip date/);
  assert.match(dateBranch, /\{actualAlerts.map\(alert => \(/);
  assert.match(dateBranch, /Official weather alert status couldn&apos;t be checked/);
});

test('the full weather dashboard is unchanged in scope and keeps its details', () => {
  assert.match(src, /Forecast by day/);
  assert.match(src, /Weather considerations/);
  assert.match(src, /loadDetails\(\)/);
  assert.match(src, /tripDayForecast/);
});

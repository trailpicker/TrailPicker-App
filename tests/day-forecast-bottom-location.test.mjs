import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { resolve, dirname } from 'node:path';

const src = readFileSync(resolve(dirname(fileURLToPath(import.meta.url)), '../components/builder/TripPlanner/WeatherPanel.tsx'), 'utf8');
const daily = src.split('  if (date) {')[1]?.split('\n  return (\n    <section\n      id={!date')[0] ?? '';

test('daily card does not duplicate the Day forecast heading', () => {
  assert.match(daily, /The itinerary owns the only Day forecast heading/);
  assert.doesNotMatch(daily, />Day forecast<\/h[1-6]>/);
});

test('location selector is visible, full width and AFTER the weather summary but BEFORE alerts', () => {
  const summary = daily.indexOf('<SkyIcon kind={condition.kind}');
  const location = daily.indexOf('aria-label="Day forecast location"');
  const alerts = daily.indexOf('{actualAlerts.length > 0 &&');
  assert.ok(summary >= 0 && location > summary && alerts > location);
  assert.match(daily, /className="min-w-0 w-full cursor-pointer rounded-lg border border-gray-200 bg-white px-3 py-2/);
  assert.match(daily, /value=\{point.id\}/);
  assert.match(daily, /setSelected\(event.target.value\)/);
  assert.doesNotMatch(daily, /SlidersHorizontal|locationOpen/);
});

test('unknown or unavailable daily forecast displays question mark icon', () => {
  assert.match(daily, /!forecastAvailable \|\| !hasNumbers \? \(/);
  assert.match(daily, /<CircleHelp aria-hidden="true" className="h-9 w-9 shrink-0 text-gray-400" \/>/);
  assert.match(daily, /Forecast unavailable/);
  assert.match(src, /default: return <CircleHelp/);
});

test('temperature stays left with precipitation and wind on right', () => {
  assert.match(daily, /<SkyIcon kind=\{condition.kind\}/);
  assert.match(daily, /ml-auto flex flex-wrap items-center justify-end/);
  assert.match(daily, /Precip\. \{number\(day.pop, "%"\)\}/);
  assert.match(daily, /Wind \{wind\(day.wind\)\}/);
});

test('compact expandable ECCC alert and no unique waypoint warning', () => {
  assert.match(daily, /\{actualAlerts.length > 0 && \(\s*<details/);
  assert.match(daily, /<summary className=/);
  assert.doesNotMatch(daily, /No unique waypoint matches/);
});

test('main weather dashboard preserved', () => {
  assert.match(src, /Forecast by day/);
  assert.match(src, /Weather considerations/);
  assert.match(src, /loadDetails\(\)/);
});

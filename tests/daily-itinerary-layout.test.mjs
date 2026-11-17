import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const componentFile = new URL('../components/builder/TripPlanner/DayStopsItinerary.tsx', import.meta.url);
const component = readFileSync(componentFile, 'utf8');
const daySection = component.slice(component.indexOf('function DaySection('), component.indexOf('export default function DayStopsItinerary('));

function position(text) {
  const index = daySection.indexOf(text);
  assert.ok(index >= 0, `Expected DaySection to contain: ${text}`);
  return index;
}

test('daily controls render in order: stops, Add stop, Day note, Day forecast', () => {
  assert.ok(position('<StopItem key={stop.id}') < position('isPlacingHere ? "Cancel" : "Add stop"'));
  assert.ok(position('isPlacingHere ? "Cancel" : "Add stop"') < position('<DayNote day={day}'));
  assert.ok(position('<DayNote day={day}') < position('Day forecast\n'));
});

test('Add stop remains an editable stop action, separate from day note and forecast', () => {
  assert.match(daySection, /!route\.readOnly\s*&&\s*\(\s*<div className="mt-3">/);
  assert.match(daySection, /route\.startAddingToDay\(day\.id, kind\)/);
  assert.match(daySection, /<WaypointSearch near=\{route\.near\}/);
  assert.match(daySection, /<DayNote day=\{day\} buildId=\{buildId\} readOnly=\{route\.readOnly\}/);
});

test('forecast uses an accessible expandable row and the same WeatherPanel', () => {
  assert.match(daySection, /aria-expanded=\{forecastOpen\}/);
  assert.match(daySection, /aria-controls=\{`day-forecast-\$\{day\.id\}`\}/);
  assert.match(daySection, /setForecastOpen\(\(value\) => !value\)/);
  assert.match(daySection, /\{forecastOpen && \(\s*<div id=\{`day-forecast-\$\{day\.id\}`\}/);
  assert.match(daySection, /<WeatherPanel/);
});

test('spacing is balanced around later day separators', () => {
  assert.match(daySection, /index === 0 \? "pt-1" : "pt-6"/);
  assert.match(daySection, /min-w-0 pb-6/);
  assert.doesNotMatch(daySection, /first:pt-1/);
});

test('only adjacent days get dividers; Unassigned stops never get an extra top line', () => {
  assert.doesNotMatch(component, /className="divide-y divide-gray-200/);
  assert.match(component, /index > 0 \? "border-t border-gray-200" : ""/);
  assert.match(component, /\{unassigned\.length > 0 && \(\s*<section className="mt-3 rounded-xl border border-amber-200 bg-amber-50\/40 p-4"/);
});

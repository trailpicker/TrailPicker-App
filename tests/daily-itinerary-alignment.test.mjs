import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const component = readFileSync(new URL('../components/builder/TripPlanner/DayStopsItinerary.tsx', import.meta.url), 'utf8');
const dayNote = component.slice(component.indexOf('function DayNote('), component.indexOf('const DAY_SUBHEADING_MAX'));
const daySection = component.slice(component.indexOf('function DaySection('), component.indexOf('export default function DayStopsItinerary('));

function position(text) {
  const i = daySection.indexOf(text);
  assert.ok(i >= 0, `Expected: ${text}`);
  return i;
}

test('stop controls, day note, day forecast appear in requested order', () => {
  assert.ok(position('<StopItem key={stop.id}') < position('isPlacingHere ? "Cancel" : "Add stop"'));
  assert.ok(position('isPlacingHere ? "Cancel" : "Add stop"') < position('<DayNote day={day}'));
  assert.ok(position('<DayNote day={day}') < position('Day forecast'));
});

test('note and forecast share row height, padding, label size, icon gap, icon size', () => {
  assert.match(dayNote, /flex min-h-12 items-center justify-between gap-3 rounded-lg px-2 py-2/);
  assert.match(dayNote, /inline-flex items-center gap-2 text-sm font-semibold/);
  assert.match(dayNote, /NotebookPen className="h-\[18px\] w-\[18px\] shrink-0/);
  assert.match(daySection, /flex min-h-12 w-full items-center justify-between gap-3 rounded-lg px-2 py-2 text-left text-sm font-semibold/);
  assert.match(daySection, /CloudSun className="h-\[18px\] w-\[18px\] shrink-0/);
});

test('note editing and forecast expansion still function', () => {
  assert.match(dayNote, /await updateTripDayNote\(data\)/);
  assert.match(dayNote, /\{hasNote \? "Edit note" : "Add note"\}/);
  assert.match(daySection, /aria-expanded=\{forecastOpen\}/);
  assert.match(daySection, /aria-controls=\{`day-forecast-\$\{day\.id\}`\}/);
  assert.match(daySection, /setForecastOpen\(\(value\) => !value\)/);
  assert.match(daySection, /<WeatherPanel/);
});

test('horizontal rules separating day note, forecast, and next day are absent', () => {
  assert.doesNotMatch(dayNote, /border-t/);
  const controls = daySection.slice(position('<DayNote day={day}'), daySection.indexOf('</article>'));
  assert.doesNotMatch(controls, /border-t/);
  assert.doesNotMatch(component, /index > 0 \? "border-t/);
  assert.doesNotMatch(component, /divide-y divide-gray/);
});

test('section gaps remain balanced and unassigned stops remain separated by whitespace', () => {
  assert.match(daySection, /index === 0 \? "pt-1" : "pt-4"/);
  assert.match(daySection, /min-w-0 pb-4/);
  assert.match(component, /<section className="mt-5 rounded-xl border border-amber-200 bg-amber-50\/40 p-4" aria-label="Unassigned route stops"/);
});

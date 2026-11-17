const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const base = path.resolve(__dirname, '..');
const read = rel => fs.readFileSync(path.join(base, rel), 'utf8');
const panel = read('components/builder/TripPlanner/WeatherPanel.tsx');
const picker = read('components/builder/TripPlanner/StopSelectPicker.tsx');
const locations = read('lib/weather/locations.ts');
const day = panel.slice(panel.indexOf('aria-label={`Day forecast for'), panel.indexOf('id={!date ? "weather"'));
const tripWide = panel.slice(panel.indexOf('id={!date ? "weather"'));

test('Day Forecast reuses the existing StopSelectPicker, not a native select', () => {
  assert.match(day, /<StopSelectPicker[\s\S]*?label="Day forecast location"[\s\S]*?hideLabel/);
  assert.doesNotMatch(day, /<select\b/);
  assert.match(day, /value=\{point\.id\}/);
});
test('Stop icons derive from the actual waypoint kind and reuse WaypointIcon', () => {
  assert.match(locations, /kind\?: Waypoint\["kind"\]/);
  assert.match(locations, /kind: p\.kind/);
  assert.match(day, /item\.kind \? \(/);
  assert.match(day, /<WaypointIcon kind=\{item\.kind\}/);
  assert.match(day, /waypointType\(item\.kind\)\.color/);
  assert.match(day, /<MapPin className="h-4 w-4 text-gray-500"/);
});
test('Selecting a forecast stop keeps the existing forecast behavior', () => {
  assert.match(day, /setSelected\(nextId\)/);
  assert.match(day, /onLocationChange\?\.\(nextPoint\)/);
  assert.match(day, /setShowDetails\(false\)/);
  assert.match(day, /setDetailsError\(""\)/);
});
test('Shared selector optionally hides its visual label without losing accessibility', () => {
  assert.match(picker, /hideLabel\?: boolean/);
  assert.match(picker, /hideLabel \? "sr-only"/);
  assert.match(picker, /aria-label=\{label\}/);
  assert.match(picker, /aria-haspopup="listbox"/);
});
test('Trip-wide Weather location selector stays native and daylight stays in panel', () => {
  assert.match(tripWide, /<select\b/);
  assert.match(day, /Times from \{daylight\.zone\}/);
  assert.match(day, /<Sunrise/);
  assert.match(day, /<Sunset/);
});

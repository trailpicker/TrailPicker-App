const test = require('node:test');
const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { resolve } = require('node:path');
const read = file => readFileSync(resolve(__dirname, '..', file), 'utf8');
const toolbar = read('components/builder/BuildDataTools.tsx');
const route = read('components/builder/TripPlanner/TripRoute.tsx');
const bridge = read('lib/trip-export-events.ts');
const server = read('lib/trip-export-actions.ts');

test('toolbar is the only home for the four export formats', () => {
  for (const name of ['TrailPicker backup', 'Trip document', 'GPX route', 'Spreadsheet (CSV)']) {
    assert.ok(toolbar.includes(name), `${name} option missing`);
  }
  assert.match(toolbar, /role="menu"/);
  assert.match(toolbar, /tool === "trip-document"/);
  assert.match(toolbar, /tool === "csv-export"/);
  assert.match(toolbar, /tool === "gpx-export"/);
  assert.doesNotMatch(route, /Print & export|Open printable itinerary|Logistics CSV|Campsites CSV|Packing checklist CSV|aria-label="Print and export"/);
});

test('JSON backup and both import paths remain available', () => {
  assert.match(toolbar, /getBuildExport\(buildId\)/);
  assert.match(toolbar, /inspectImport\(text\)/);
  assert.match(toolbar, /importBuildItems\(formData\)/);
  assert.match(toolbar, /startGpxAction\(action\)/);
  assert.match(toolbar, /importGpx\(await file\.text\(\), gpxDayId \|\| null\)/);
  assert.match(toolbar, /GPX_TOOLBAR_IMPORT/);
  assert.match(toolbar, /GPX_TOOLBAR_EXPORT/);
  assert.match(toolbar, /No(thing)? to export yet/);
});

test('export bridge uses live Trip Planner data, otherwise an authenticated saved projection', () => {
  assert.match(bridge, /TRIP_EXPORT_REQUEST/);
  assert.match(route, /window\.addEventListener\(TRIP_EXPORT_REQUEST/);
  assert.match(route, /liveExportRef\.current = liveExport/);
  assert.match(toolbar, /liveTripExport\(\) \?\? getTripExportData\(buildId\)/);
  assert.match(server, /requireBuildAccess\(buildId\)/);
  assert.match(server, /readPrivateResources\(build\.tripLogistics\)/);
  assert.match(server, /analyzePack\(build\.items\)/);
});

test('document sections and private details are explicitly selectable', () => {
  for (const name of ['itinerary','resources','logistics','packing']) assert.match(toolbar, new RegExp(`"${name}"`));
  assert.match(toolbar, /checked=\{includePrivate\}/);
  assert.match(toolbar, /printableTripHtml\(data, includePrivate, documentSections/);
  assert.match(toolbar, /window\.open\("", "_blank"\)/);
});

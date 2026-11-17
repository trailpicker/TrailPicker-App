const test = require('node:test');
const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { resolve } = require('node:path');
const read = path => readFileSync(resolve(__dirname, '..', path), 'utf8');
const toolbar = read('components/builder/BuildDataTools.tsx');
const route = read('components/builder/TripPlanner/TripRoute.tsx');
const analysis = read('components/builder/TripPlanner/RouteAnalysisSection.tsx');
const page = read('app/build/[id]/page.tsx');
const bar = read('components/builder/ShareBar.tsx');
const bridge = read('lib/gpx-toolbar-events.ts');

test('global Import/Export buttons expose separate JSON and GPX menu actions', () => {
  assert.match(toolbar, /aria-haspopup="menu"/);
  assert.match(toolbar, /role="menu"/);
  assert.match(toolbar, /Build data \(JSON\)/);
  assert.match(toolbar, /GPX route/);
  assert.match(toolbar, /onClick=\{\(\) => startGpxAction\(action\)\}/);
  assert.match(toolbar, /open\("import"\)/);
  assert.match(toolbar, /open\("export"\)/);
  assert.match(toolbar, /outside/);
  assert.match(toolbar, /event\.key === "Escape"/);
  assert.match(bar, /<BuildDataTools/);
  assert.match(page, /activeTab=\{activeTab\}/);
  assert.match(page, /gpxDays=\{build\.days\.map/);
  assert.match(page, /overflow-visible rounded-2xl/);
});

test('GPX import retains size validation, preview, day assignment, replacement confirmation and Save route', () => {
  assert.match(toolbar, /importGpx\(await file\.text\(\), gpxDayId \|\| null\)/);
  assert.match(toolbar, /GPX_MAX_BYTES/);
  assert.match(toolbar, /Assign imported track to a day/);
  assert.match(toolbar, /gpxPreview\.trackPoints/);
  assert.match(toolbar, /gpxPreview\.hasCompleteElevation/);
  assert.match(toolbar, /window\.confirm/);
  assert.match(toolbar, /will not be stored until you click Save route/);
  assert.match(toolbar, /window\.dispatchEvent\(new CustomEvent\(GPX_TOOLBAR_IMPORT/);
  assert.match(route, /const accepted = replaceFromGpx\(detail\.points\)/);
  assert.match(route, /setEditing\(true\)/);
  assert.match(route, /function save\(\)/);
});

test('Export GPX downloads the current working route, including draft changes', () => {
  assert.match(toolbar, /window\.dispatchEvent\(new CustomEvent\(GPX_TOOLBAR_EXPORT/);
  assert.match(route, /exportGpx\(points, buildName\)/);
  assert.match(route, /link\.download = "trailpicker-route\.gpx"/);
  assert.match(route, /points\.length < 2/);
  assert.match(bridge, /GPX_TOOLBAR_EXPORT/);
  assert.doesNotMatch(toolbar, /getBuildExport\(buildId\)[\s\S]*\.gpx"/);
});

test('GPX options from gear tab transition to Trip Planner via ready/ping handshake', () => {
  assert.match(toolbar, /sessionStorage\.setItem\(pendingGpxKey, action\)/);
  assert.match(toolbar, /router\.push\(`\/build\/\$\{encodeURIComponent\(buildId\)\}\?tab=trip`\)/);
  assert.match(toolbar, /sessionStorage\.removeItem\(pendingGpxKey\)/);
  assert.match(toolbar, /GPX_TOOLBAR_READY/);
  assert.match(toolbar, /GPX_TOOLBAR_PING/);
  assert.match(route, /window\.addEventListener\(GPX_TOOLBAR_PING, ready\)/);
  assert.match(route, /window\.addEventListener\(GPX_TOOLBAR_IMPORT, importRequested\)/);
  assert.match(route, /window\.addEventListener\(GPX_TOOLBAR_EXPORT, exportRequested\)/);
});

test('Route Analysis no longer hosts duplicate GPX controls or accordion', () => {
  assert.match(analysis, /<RouteElevationPanel/);
  assert.doesNotMatch(analysis, /GPX files & route tools|Import GPX|Export GPX|Download GPX|toolsOpen/);
  assert.doesNotMatch(analysis, /importGpx|exportGpx|<input[^>]*type="file"/);
  assert.doesNotMatch(route, /onImport=\{replaceFromGpx\}/);
  assert.match(route, /onSave=\{save\}/);
});

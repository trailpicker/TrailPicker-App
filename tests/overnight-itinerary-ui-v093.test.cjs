const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');
const dir = path.resolve(__dirname, '..');
const source = path => fs.readFileSync(require('node:path').join(dir, path), 'utf8');
const itinerary = source('components/builder/TripPlanner/DayStopsItinerary.tsx');
const route = source('components/builder/TripPlanner/TripRoute.tsx');
const manager = source('components/builder/TripPlanner/PermitReservationManager.tsx');

test('v093 shared start renders through the same StopItem component, with no warning card or duplicate map link', () => {
  assert.match(itinerary, /<StopItem key=\{`inherited-/);
  assert.match(itinerary, /inherited=\{handoff\}/);
  assert.doesNotMatch(itinerary, /function InheritedOvernightStart/);
  assert.doesNotMatch(itinerary, /Show on map|One campsite, linked to both days|Edit shared campsite\s*<\/button>/);
  assert.match(itinerary, /Start · Shared with Day/);
  assert.match(itinerary, /<WaypointIcon kind=\{point.kind\}/);
});

test('clicking inherited stop focuses its original waypoint on the next day', () => {
  assert.match(itinerary, /onClick=\{\(\) => inherited \? route\.selectOvernightStart\(point, inherited\.toDayId\) : route\.selectStop\(point\)\}/);
  assert.match(route, /selectOvernightStart:\(point,nextDayId\)=>select\(point,nextDayId\)/);
  assert.match(route, /function select\(point: Waypoint, dayOverride\?: string\)/);
  assert.match(route, /setFocus\(\(previous\) => \(\{/);
});

test('inherited editor uses original ID but is scoped to the next day and is not draggable', () => {
  assert.match(itinerary, /route\.activeDayId === \(inherited\?\.toDayId \?\? point\.dayId \?\? null\)/);
  assert.match(itinerary, /onClick=\{\(\) => inherited \? route\.editOvernightStart\(point, inherited\.toDayId\) : route\.editStop\(point\.id\)\}/);
  assert.match(route, /function editOvernightStart\(point: Waypoint, nextDayId: string\)/);
  assert.match(route, /editStop, editOvernightStart, updateStop: patch/);
  assert.match(itinerary, /draggable=\{!route\.pending\}/);
  assert.match(itinerary, /inherited \? \(/);
  assert.match(itinerary, /data-trailpicker-stop-id=\{inherited \? undefined : point\.id\}/);
});

test('next morning departure fields live in edit mode and stay separate from original arrival time', () => {
  assert.match(itinerary, /formattedTime\(inherited \? point\.nextDayDepartureTime : point\.time\)/);
  assert.match(itinerary, /\{editing && \(inherited \? \(/);
  assert.match(itinerary, /onChange=\{value => route\.updateStop\(point\.id, \{ nextDayDepartureTime: value \}\)\}/);
  assert.match(itinerary, /nextDayDepartureNote/);
  assert.doesNotMatch(itinerary, /Next morning departure \(optional\)[\s\S]*Edit shared campsite\s*<\/button>/);
});

test('campsite dropdown reuses the actual map campground icon and calls unlinked option by a clear name', () => {
  assert.match(manager, /import WaypointIcon from "\.\/WaypointIcon"/);
  assert.match(manager, /backgroundColor:waypointType\("camp"\)\.color/);
  assert.match(manager, /<WaypointIcon kind="camp"/);
  assert.match(manager, /Clear link/);
  assert.match(manager, /detail:stop\.dayLabel/);
  assert.doesNotMatch(manager, /Manual \/ not mapped|text-amber-700/);
});

test('the changed TSX files parse without syntax errors', () => {
  for (const file of ['DayStopsItinerary.tsx','TripRoute.tsx','PermitReservationManager.tsx']) {
    const content = source('components/builder/TripPlanner/' + file);
    const parsed = ts.createSourceFile(file, content, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
    assert.equal(parsed.parseDiagnostics.length, 0, file + ': ' + parsed.parseDiagnostics.map(d => ts.flattenDiagnosticMessageText(d.messageText,' ')).join('; '));
    const compiled = ts.transpileModule(content, {fileName:file, compilerOptions:{jsx:ts.JsxEmit.ReactJSX,module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022}, reportDiagnostics:true});
    assert.equal((compiled.diagnostics??[]).filter(d=>d.category===ts.DiagnosticCategory.Error).length, 0, file);
  }
});

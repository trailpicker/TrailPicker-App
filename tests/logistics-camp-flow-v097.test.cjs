const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');
const root = path.resolve(__dirname, '..');
const manager = fs.readFileSync(path.join(root, 'components/builder/TripPlanner/PermitReservationManager.tsx'),'utf8');
const search = fs.readFileSync(path.join(root, 'components/builder/TripPlanner/WaypointSearch.tsx'),'utf8');
const logistics = fs.readFileSync(path.join(root, 'components/builder/TripPlanner/TripLogistics.tsx'),'utf8');

test('place search never creates nested forms inside the Logistics autosave form', () => {
  assert.match(logistics, /<form ref=\{formRef\}>/);
  assert.doesNotMatch(search, /<form\b|<\/form>/);
  assert.match(search, /<div role="search"/);
  assert.match(search, /type="button" onClick=\{\(\) => void search\(\)\}/);
  assert.match(search, /event\.key === "Enter"/);
  assert.match(search, /event\.preventDefault\(\)/);
});

test('uses existing TrailPicker campground waypoint artwork rather than resurrecting TentTree',()=>{
  assert.match(manager, /<WaypointIcon kind="camp"/);
  assert.match(manager, /<CampgroundIcon compact\/>/);
  assert.doesNotMatch(manager, /TentTree/);
});

test('logistics uses only saved itinerary campgrounds and keeps shared overnight selection', () => {
  assert.match(manager, /campsiteChoices\(savedStops, days\)/);
  assert.match(manager, /StopSelectPicker label="Itinerary campground"/);
  assert.match(manager, /detail:stop\.dayLabel/);
  assert.match(manager, /Clear link/);
  for (const forbidden of ['Add new campground', 'Custom campground', 'Find mapped place', 'newCampMethod', 'addBookingCampsiteStop', 'createCampground', '<WaypointSearch']) {
    assert.ok(!manager.includes(forbidden), `unexpected creation interface: ${forbidden}`);
  }
});

test('category dropdown remains text-only, while existing waypoint artwork stays in itinerary picker', () => {
  for (const category of ['campsite', 'hut', 'rental', 'other']) {
    assert.match(manager, new RegExp('value:"' + category + '",label:'));
  }
  assert.doesNotMatch(manager, /label:"Campsite",icon:/);
  assert.doesNotMatch(manager, /label:"Hut \/ shelter",icon:/);
  assert.doesNotMatch(manager, /label:"Equipment rental",icon:/);
  assert.doesNotMatch(manager, /label:"Other",icon:/);
  assert.match(manager, /<WaypointIcon kind="camp"/);
});

test('rental dates are presented as rental duration with a calendar-day summary', () => {
  assert.match(manager, /"Rental duration"/);
  assert.doesNotMatch(manager, /Pickup and return dates/);
  assert.match(manager, /rentalDuration\(draft\.startDate, draft\.endDate\)/);
  assert.match(manager, /Same-day rental/);
  assert.match(manager, /Pickup \{draft\.startDate\}/);
});

test('affected TSX syntax parses and transpiles',()=>{
  for(const rel of ['components/builder/TripPlanner/PermitReservationManager.tsx','components/builder/TripPlanner/WaypointSearch.tsx']){
    const file=path.join(root,rel), source=fs.readFileSync(file,'utf8');
    const parsed=ts.createSourceFile(file,source,ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX);
    assert.equal(parsed.parseDiagnostics.length,0, `${rel}: ${parsed.parseDiagnostics.map(d=>ts.flattenDiagnosticMessageText(d.messageText,' ')).join(';')}`);
    const transpile=ts.transpileModule(source,{fileName:file,compilerOptions:{jsx:ts.JsxEmit.ReactJSX,target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.ESNext},reportDiagnostics:true});
    assert.equal(transpile.diagnostics?.filter(d=>d.category===ts.DiagnosticCategory.Error).length??0,0);
  }
});

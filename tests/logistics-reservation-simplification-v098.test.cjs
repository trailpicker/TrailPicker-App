const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');
const root = path.resolve(__dirname, '..');
const manager = fs.readFileSync(path.join(root,'components/builder/TripPlanner/PermitReservationManager.tsx'),'utf8');

test('reservation editor never creates or searches for campgrounds',()=>{
  assert.match(manager,/campsiteChoices\(savedStops, days\)/);
  assert.match(manager,/No campsite stops yet/);
  assert.match(manager,/Route &amp; itinerary/);
  assert.match(manager,/select it here before saving/);
  for(const text of ['addBookingCampsiteStop','WaypointSearch','PlaceResult','customLat','customLng','createCampground','Add new campground','Custom campground','Find mapped place','newStops','campSource','newCampDayId']) assert.ok(!manager.includes(text),text);
});
test('four allowed reservation categories have clean text-only picker choices',()=>{
  for(const cat of ['campsite','hut','rental','other']) assert.match(manager, new RegExp('value:"'+cat+'",label:'));
  assert.doesNotMatch(manager, /value:"campsite",label:"Campsite",icon:/);
  assert.doesNotMatch(manager, /value:"hut",label:"Hut \/ shelter",icon:/);
  assert.doesNotMatch(manager, /value:"rental",label:"Equipment rental",icon:/);
  assert.doesNotMatch(manager, /value:"other",label:"Other",icon:/);
  assert.match(manager, /<WaypointIcon kind="camp"/);
  assert.doesNotMatch(manager, /TentTree/);
});
test('date range for equipment rentals is rental duration and reports calendar days',()=>{
  assert.match(manager,/"Rental duration"/);
  assert.match(manager,/rentalDuration\(draft\.startDate, draft\.endDate\)/);
  assert.match(manager,/Same-day rental/);
  assert.doesNotMatch(manager,/Pickup and return dates/);
  assert.match(manager,/DateRangePicker/);
});
test('manager TSX parses and transpiles cleanly',()=>{
  const file='components/builder/TripPlanner/PermitReservationManager.tsx';
  const source=fs.readFileSync(path.join(root,file),'utf8');
  const parsed=ts.createSourceFile(file,source,ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX);
  assert.equal(parsed.parseDiagnostics.length,0,parsed.parseDiagnostics.map(d=>ts.flattenDiagnosticMessageText(d.messageText,' ')).join(';'));
  const compiled=ts.transpileModule(source,{fileName:file,compilerOptions:{jsx:ts.JsxEmit.ReactJSX,target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.ESNext},reportDiagnostics:true});
  assert.equal((compiled.diagnostics??[]).filter(d=>d.category===ts.DiagnosticCategory.Error).length,0);
});

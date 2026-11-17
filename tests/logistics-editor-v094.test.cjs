const {test} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');
const root = path.resolve(__dirname,'..');
const source = fs.readFileSync(path.join(root,'components/builder/TripPlanner/PermitReservationManager.tsx'),'utf8');
const datePicker = fs.readFileSync(path.join(root,'components/build/DateRangePicker.tsx'),'utf8');
const action = fs.readFileSync(path.join(root,'lib/trip-planner-actions.ts'),'utf8');
const route = fs.readFileSync(path.join(root,'components/builder/TripPlanner/TripRoute.tsx'),'utf8');
const arrangements = fs.readFileSync(path.join(root,'lib/trip-arrangements.ts'),'utf8');

test('booking categories are campsite, hut/shelter, rental, other with old categories readable only',()=>{
  for(const category of ['campsite','hut','rental','other']) assert.match(source,new RegExp(`value:"${category}"`));
  for(const category of ['shuttle','ferry','parking']) assert.doesNotMatch(source,new RegExp(`value:"${category}"`));
  assert.match(source,/LEGACY_CATEGORIES\.includes\(draft\.category/);
});

test('editor matches Trip Details styling and uses the real custom select and date picker',()=>{
  assert.match(source,/max-w-4xl rounded-xl border border-gray-200 bg-white/);
  assert.match(source,/import DateRangePicker from "@\/components\/build\/DateRangePicker"/);
  assert.match(source,/import StopSelectPicker from "\.\/StopSelectPicker"/);
  assert.match(source,/startValue=\{draft\.startDate\} endValue=\{draft\.endDate\}/);
  assert.match(source,/allowPast label=\{draft.category === "rental" \? "Rental duration"/);
  assert.doesNotMatch(source,/<select\b|type="date"/);
  assert.match(source,/aria-expanded=\{detailsOpen\}/);
  assert.match(source,/Additional details/);
  assert.match(source,/> Close<\/button>/);
});

test('controlled date picker preserves the original trip-details form path',()=>{
  assert.match(datePicker,/const controlled = startValue !== undefined \|\| endValue !== undefined/);
  assert.match(datePicker,/const start = controlled \? parseDate\(startValue\) : localStart/);
  assert.match(datePicker,/onChange\?\.\(nextStart \? dateValue\(nextStart\) : ""/);
  assert.match(datePicker,/disabled=\{isPast && !allowPast\}/);
  assert.match(datePicker,/name=\{startName\}/);
});

test('campsite picker uses unique day handoffs and automatic dates without creating campsites',()=>{
  assert.match(source,/campsiteChoices\(savedStops, days\)/);
  assert.match(source,/detail:stop\.dayLabel/);
  assert.match(source,/Clear link/);
  assert.match(source,/startDate: current\.startDate \|\| checkIn/);
  assert.match(source,/endDate: current\.endDate \|\| checkOut/);
  assert.doesNotMatch(source,/Add campground to itinerary|Add new campground|Custom campground/);
  assert.doesNotMatch(source,/<WaypointSearch|addBookingCampsiteStop/);
  assert.match(source,/No campsite stops yet/);
  assert.match(route,/trailpicker:route-edit-state/);
  assert.match(action,/The itinerary changed\. Reload before adding/);
});

test('hut booking links are optional, validated and retained through overnight consolidation',()=>{
  assert.match(arrangements,/waypointId\?: string/);
  assert.match(arrangements,/entry\.category !== "hut"/);
  assert.match(action,/validateArrangements\(next, dayIds, campIds\)/);
  assert.match(action,/const arrangements = Object\.keys\(bookingRedirects\)/);
  assert.match(source,/draft\.category === "hut" && draft\.waypointId/);
});

test('all modified TSX and TypeScript files parse and transpile',()=>{
  for(const rel of ['components/builder/TripPlanner/PermitReservationManager.tsx','components/builder/TripPlanner/TripRoute.tsx','components/build/DateRangePicker.tsx','lib/trip-arrangements.ts','lib/build-validation.ts','lib/trip-planner-actions.ts','lib/tracked-build-actions.ts']){
    const content=fs.readFileSync(path.join(root,rel),'utf8');
    const parse=ts.createSourceFile(rel,content,ts.ScriptTarget.Latest,true,rel.endsWith('tsx')?ts.ScriptKind.TSX:ts.ScriptKind.TS);
    assert.equal(parse.parseDiagnostics.length,0,rel+': '+parse.parseDiagnostics.map(d=>ts.flattenDiagnosticMessageText(d.messageText,' ')).join(';'));
    const result=ts.transpileModule(content,{fileName:rel,compilerOptions:{jsx:ts.JsxEmit.ReactJSX,target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.ESNext},reportDiagnostics:true});
    assert.equal((result.diagnostics??[]).filter(d=>d.category===ts.DiagnosticCategory.Error).length,0,rel);
  }
});

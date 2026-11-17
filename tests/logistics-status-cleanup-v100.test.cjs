const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');
const { stripTypeScriptTypes } = require('node:module');
const root = path.resolve(__dirname, '..');
const manager = fs.readFileSync(path.join(root,'components/builder/TripPlanner/PermitReservationManager.tsx'),'utf8');
const arrangementSource = fs.readFileSync(path.join(root,'lib/trip-arrangements.ts'),'utf8');
function loadArrangements(){
  const js=stripTypeScriptTypes(arrangementSource).replace(/export /g,'');
  return new Function(js+'\nreturn {ARRANGEMENT_STATUSES,validateArrangements,readArrangements}')();
}
const example=(patch={})=>({id:'x',kind:'reservation',category:'rental',name:'Canister',status:'planned',startDate:'2027-06-12',endDate:'2027-06-14',provider:'Local outfitter',confirmation:'',bookingUrl:'',notes:'',dayId:'',...patch});

test('category dropdown is text-only, with four supported options',()=>{
  for(const [key,label] of [['campsite','Campsite'],['hut','Hut / shelter'],['rental','Equipment rental'],['other','Other']]) {
    assert.ok(manager.includes(`{value:"${key}",label:"${label}"}`));
  }
  assert.doesNotMatch(manager,/label:"Campsite",icon:|label:"Hut \/ shelter",icon:|label:"Equipment rental",icon:|label:"Other",icon:/);
  assert.match(manager,/detail:stop\.dayLabel, icon: <CampgroundIcon compact\/>/);
});

test('trip day picker removed but stay/rental dates and implicit linkage preserved',()=>{
  assert.ok(!manager.includes('Trip day (optional)'));
  assert.match(manager,/dayId: stop\?\.dayId \|\| ""/);
  assert.match(manager,/startDate: current\.startDate \|\| checkIn/);
  assert.match(manager,/endDate: current\.endDate \|\| checkOut/);
  assert.match(manager,/DateRangePicker startName="bookingStartDate"/);
  assert.match(manager,/"Rental duration"/);
});

test('four-stage draggable status bar has accessible range and clickable labels',()=>{
  const statuses=[...manager.matchAll(/\{ value: "(not_required|planned|pending|confirmed)", label: "[^"]+" \}/g)].map(m=>m[1]);
  assert.deepEqual(statuses,['not_required','planned','pending','confirmed']);
  assert.match(manager,/type="range"/);
  assert.match(manager,/min=\{0\}/);
  assert.match(manager,/max=\{BOOKING_STEPS\.length - 1\}/);
  assert.match(manager,/aria-valuetext=/);
  assert.match(manager,/onChange=\{event => onChange\(BOOKING_STEPS\[Number\(event\.currentTarget\.value\)\]\.value\)\}/);
  assert.match(manager,/aria-pressed=\{currentIndex === i\}/);
  assert.ok(!manager.includes('value:"cancelled",label:"Cancelled"'));
});

test('not required validates for permits, huts, rentals and other; legacy cancelled accepted for old records',()=>{
  const {ARRANGEMENT_STATUSES,validateArrangements,readArrangements}=loadArrangements();
  assert.ok(ARRANGEMENT_STATUSES.includes('not_required'));
  const choices=[example({kind:'permit',category:'other',status:'not_required'}),example({id:'b',kind:'reservation',category:'hut',status:'not_required'}),example({id:'c',kind:'reservation',category:'rental',status:'not_required'}),example({id:'d',kind:'other',category:'other',status:'not_required'})];
  assert.deepEqual(validateArrangements(choices),choices);
  assert.deepEqual(readArrangements({arrangements:choices}),choices);
  assert.equal(validateArrangements([example({status:'cancelled'})])[0].status,'cancelled');
  assert.throws(()=>validateArrangements([example({status:'unknown'})]),/status/);
});

test('changed TypeScript parses and transpiles',()=>{
 for(const rel of ['components/builder/TripPlanner/PermitReservationManager.tsx','lib/trip-arrangements.ts']){
  const src=fs.readFileSync(path.join(root,rel),'utf8');
  const kind=rel.endsWith('.tsx')?ts.ScriptKind.TSX:ts.ScriptKind.TS;
  const sf=ts.createSourceFile(rel,src,ts.ScriptTarget.Latest,true,kind);
  assert.equal(sf.parseDiagnostics.length,0);
  const out=ts.transpileModule(src,{fileName:rel,compilerOptions:{jsx:ts.JsxEmit.ReactJSX,target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.ESNext},reportDiagnostics:true});
  assert.equal(out.diagnostics?.filter(d=>d.category===ts.DiagnosticCategory.Error).length??0,0);
 }
});

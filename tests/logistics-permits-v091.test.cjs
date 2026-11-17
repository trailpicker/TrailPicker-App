const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { stripTypeScriptTypes } = require('node:module');
const root = path.resolve(__dirname, '..');
function load(rel, mocks = {}) {
  let js = stripTypeScriptTypes(fs.readFileSync(path.join(root, rel), 'utf8'));
  const names = [...js.matchAll(/export (?:async )?function (\w+)|export const (\w+)/g)].map(m=>m[1]||m[2]);
  js = js.replace(/import\s+\{([^}]+)\}\s+from\s+["']([^"']+)["'];/g, (_,imports,spec)=>`const {${imports}} = require(${JSON.stringify(spec)});`).replace(/export /g, '');
  return new Function('require', js+`\nreturn {${names.join(',')}};`)(key => key in mocks ? mocks[key] : require(key));
}
const arrangements = load('lib/trip-arrangements.ts');
const resources = load('lib/trip-resources.ts', {'./trail-routing': {metersBetween:()=>0, usableTrailSegment:()=>null}});
const notes = {permits:'old permit text',reservations:'old reservation text',transportation:'drive',parking:'lot',emergencyContact:'private',emergencyPlan:'exit',notes:'other'};
const makeArrangement = (patch={}) => ({id:'entry-one',kind:'permit',category:'other',name:'Park permit',status:'planned',startDate:'2027-07-15',endDate:'2027-07-17',provider:'BC Parks',confirmation:'SECRET-123',bookingUrl:'https://example.com/permit',notes:'Remember pickup',dayId:'',...patch});
const makeCamp = (patch={}) => ({id:'camp-one',waypointId:'camp-stop',dayId:'day-one',campground:'Camp A',status:'confirmed',arrival:'2027-07-15',departure:'2027-07-16',provider:'BC Parks',confirmation:'PRIVATE-456',notes:'Tent pad',bookingUrl:'https://example.com/camp',...patch});
const form = x => {const f = new FormData();for(const [k,v] of Object.entries(x))f.set(k,typeof v==='string'?v:JSON.stringify(v));return f;};

test('structured arrangements validate date, type, URL, limits, linked days, duplicates', () => {
  assert.deepEqual(arrangements.validateArrangements([makeArrangement()],['day-one']),[makeArrangement()]);
  assert.throws(()=>arrangements.validateArrangements([makeArrangement({bookingUrl:'http://bad.example'})]), /HTTPS/);
  assert.throws(()=>arrangements.validateArrangements([makeArrangement({startDate:'2027-02-30'})]), /dates/);
  assert.throws(()=>arrangements.validateArrangements([makeArrangement({endDate:'2027-07-01'})]), /dates/);
  assert.throws(()=>arrangements.validateArrangements([makeArrangement({kind:'reservation',category:'campsite'})]), /type, name, or status/);
  assert.throws(()=>arrangements.validateArrangements([makeArrangement({dayId:'removed'})],['day-one']), /removed/);
  assert.throws(()=>arrangements.validateArrangements([makeArrangement(),makeArrangement()]), /Duplicate/);
  assert.throws(()=>arrangements.validateArrangements(Array.from({length:81},(_,i)=>makeArrangement({id:'id'+i}))), /80/);
  assert.equal(arrangements.readArrangements({arrangements:[makeArrangement()]}).length,1);
});

test('existing campsite booking URL is optional, HTTPS-only and survives normalization', () => {
  const sample={settings:resources.defaultResourceSettings,bookings:[makeCamp()]};
  assert.deepEqual(resources.validatePrivateResources(sample,['day-one'],['camp-stop']).bookings[0],makeCamp());
  assert.deepEqual(resources.readPrivateResources({phase6:sample}).bookings[0],makeCamp());
  assert.throws(()=>resources.validatePrivateResources({...sample,bookings:[makeCamp({bookingUrl:'javascript:bad'})]},['day-one'],['camp-stop']),/HTTPS/);
  assert.equal(resources.validatePrivateResources({...sample,bookings:[{...makeCamp(),bookingUrl:undefined}]},['day-one'],['camp-stop']).bookings[0].id,'camp-one');
});

function setup() {
  let rootData = {...notes,phase6:{settings:resources.defaultResourceSettings,bookings:[makeCamp()]},phase7:{existing:'food survives'},routeTiming:{speed:3}};
  const writes=[];
  const tx={
    build:{findUnique:async()=>({tripLogistics:rootData,routeWaypoints:[{id:'camp-stop',kind:'camp'}]}),update:async arg=>{writes.push(arg);rootData=arg.data.tripLogistics;return {}}},
    tripDay:{findMany:async()=>[{id:'day-one'}]},
  };
  const actions=load('lib/trip-planner-actions.ts', {
    '@/lib/build-access':{requireBuildAccess:async id=>{if(id!=='owned')throw Error('no access');return {userId:'owner'};}, requireTripDayAccess:async()=>({accessUserId:'owner'})},
    'next/cache':{revalidatePath:()=>{}},
    '@/lib/destinations':{getDestination:()=>null},
    '@/lib/trip':{getDateRange:()=>[]},
    '@/lib/trip-planner':{emptyLogistics:notes,nullableNumber:()=>null,parseDates:()=>({})},
    '@/lib/build-history':{mutateBuildWithRevision:async(_buildId,_uid,_kind,_msg,callback)=>callback(tx)},
    '@/lib/build-validation':{parseLogistics:()=>notes},
    '@/lib/itinerary-links':{validatedRoute:()=>[{id:'camp-stop',kind:'camp'}]},
    '@/lib/overnight-handoffs':{consolidateOvernightStops:points=>({points,replacedIds:{}})},
    '@/lib/route-metrics':{computeRouteMetrics:()=>[],completeDaySummaries:()=>[],DEFAULT_HIKING_PACE_KMH:3},
    '@/lib/trip-resources':resources,
    '@/lib/trip-arrangements':arrangements,
    '@/lib/food-plan':{validateFoodPlan:()=>({})},
    '@/lib/route-timing-preferences':{ROUTE_TIMING_KEY:'routeTiming',validateRouteTimingPreferences:x=>x},
  });
  return {actions, writes, get:()=>rootData};
}

test('saving permits deletes legacy notes but preserves campsite reservations, water settings and food', async () => {
  const h=setup();
  const result=await h.actions.saveTripBooking(form({buildId:'owned',operation:'upsert',source:'arrangement',booking:makeArrangement()}));
  assert.equal(result.arrangements[0].name,'Park permit');
  assert.equal(h.get().permits,'');
  assert.equal(h.get().reservations,'');
  assert.equal(h.get().emergencyContact,notes.emergencyContact);
  assert.deepEqual(h.get().phase7,{existing:'food survives'});
  assert.equal(h.get().phase6.bookings[0].bookingUrl,'https://example.com/camp');
  assert.deepEqual(h.get().phase6.settings,resources.defaultResourceSettings);
  assert.equal(h.get().arrangements.length,1);
  assert.equal(h.writes[0].where.userId,'owner');
  await h.actions.saveTripBooking(form({buildId:'owned',operation:'upsert',source:'arrangement',booking:makeArrangement({status:'confirmed'})}));
  assert.equal(h.get().arrangements.length,1);
  assert.equal(h.get().arrangements[0].status,'confirmed');
  await h.actions.saveTripBooking(form({buildId:'owned',operation:'delete',source:'arrangement',booking:{id:'entry-one'}}));
  assert.deepEqual(h.get().arrangements,[]);
});

test('editing a campsite changes its original phase6 record, without creating a duplicate', async () => {
  const h=setup();
  await h.actions.saveTripBooking(form({buildId:'owned',operation:'upsert',source:'camp',booking:makeCamp({confirmation:'NEW-111'})}));
  assert.equal(h.get().phase6.bookings.length,1);
  assert.equal(h.get().phase6.bookings[0].confirmation,'NEW-111');
  assert.deepEqual(h.get().arrangements,[]);
  await h.actions.saveTripBooking(form({buildId:'owned',operation:'upsert',source:'camp',booking:makeCamp({id:'camp-two',arrival:'2027-07-16',departure:'2027-07-17'})}));
  assert.equal(h.get().phase6.bookings.length,2);
  await assert.rejects(()=>h.actions.saveTripBooking(form({buildId:'owned',operation:'upsert',source:'camp',booking:makeCamp({id:'duplicate'})})),/already has a booking/);
  await h.actions.saveTripBooking(form({buildId:'owned',operation:'delete',source:'camp',booking:{id:'camp-one'}}));
  assert.equal(h.get().phase6.bookings.length,1);
});

test('bad booking data is rejected before the database write', async () => {
  const h=setup();
  await assert.rejects(()=>h.actions.saveTripBooking(form({buildId:'owned',operation:'upsert',source:'arrangement',booking:makeArrangement({bookingUrl:'http://bad.example'})})),/HTTPS/);
  await assert.rejects(()=>h.actions.saveTripBooking(form({buildId:'owned',operation:'upsert',source:'camp',booking:makeCamp({waypointId:'removed'})})),/removed campsite/);
  assert.equal(h.writes.length,0);
});

test('private CSV and printable exports include reservations only when explicitly requested', () => {
  const e=load('lib/trip-resources-export.ts');
  const data={name:'Trip',days:[],points:[],logistics:notes,bookings:[makeCamp()],arrangements:[makeArrangement()],packLines:[]};
  const publicCsv=e.exportLogisticsCsv(data,false);
  const privateCsv=e.exportLogisticsCsv(data,true);
  assert.ok(!publicCsv.includes('SECRET-123'));
  assert.ok(!publicCsv.includes('PRIVATE-456'));
  assert.ok(privateCsv.includes('SECRET-123'));
  const publicHtml=e.printableTripHtml(data,false);
  const privateHtml=e.printableTripHtml(data,true);
  assert.ok(!publicHtml.includes('SECRET-123'));
  assert.ok(privateHtml.includes('SECRET-123'));
});

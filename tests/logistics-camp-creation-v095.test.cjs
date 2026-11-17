const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const {stripTypeScriptTypes}=require('node:module');
const root=path.resolve(__dirname,'..');
function load(rel, mocks={}){
  let js=stripTypeScriptTypes(fs.readFileSync(path.join(root,rel),'utf8'));
  const names=[...js.matchAll(/export (?:async )?function (\w+)|export const (\w+)/g)].map(m=>m[1]||m[2]);
  js=js.replace(/import\s+\{([^}]+)\}\s+from\s+["']([^"']+)["'];/g,(_,imports,spec)=>`const {${imports}}=require(${JSON.stringify(spec)});`).replace(/export /g,'');
  return new Function('require',js+`\nreturn {${names.join(',')}};`)(key=>key in mocks?mocks[key]:require(key));
}
const validate=load('lib/trip-arrangements.ts');
const form=values=>{const f=new FormData();for(const [k,v] of Object.entries(values))f.set(k,String(v));return f;};
function stubRoute(initial=[]){
  let route=structuredClone(initial),writes=0;
  const days=[{id:'day-one',date:new Date('2027-07-15')},{id:'day-two',date:new Date('2027-07-16')}];
  const tx={
    build:{findUnique:async()=>({routeWaypoints:route}),update:async ({data})=>{route=data.routeWaypoints;writes++;return {}}},
    tripDay:{findMany:async()=>days},
  };
  const action=load('lib/trip-planner-actions.ts',{
    '@/lib/build-access':{requireBuildAccess:async id=>{if(id!=='owned')throw Error('Access denied');return{userId:'owner'};},requireTripDayAccess:async()=>({accessUserId:'owner'})},
    'next/cache':{revalidatePath:()=>{}},
    '@/lib/destinations':{getDestination:()=>null},
    '@/lib/trip':{getDateRange:()=>[]},
    '@/lib/trip-planner':{emptyLogistics:{},nullableNumber:(v,k,min,max)=>{const n=Number(v);if(v===null || v==='' || !Number.isFinite(n)||n<min||n>max)throw Error('Invalid '+k);return n;},parseDates:()=>({})},
    '@/lib/build-history':{mutateBuildWithRevision:async(_buildId,_userId,_kind,_message,work)=>work(tx)},
    '@/lib/build-validation':{parseLogistics:()=>({})},
    '@/lib/itinerary-links':{validatedRoute:val=>Array.isArray(val)?val:null},
    '@/lib/overnight-handoffs':{consolidateOvernightStops:points=>({points,replacedIds:{}})},
    '@/lib/route-metrics':{computeRouteMetrics:()=>[],completeDaySummaries:()=>[],DEFAULT_HIKING_PACE_KMH:3},
    '@/lib/trip-resources':{readPrivateResources:()=>({bookings:[]})},
    '@/lib/trip-arrangements':validate,
    '@/lib/food-plan':{validateFoodPlan:()=>({})},
    '@/lib/route-timing-preferences':{ROUTE_TIMING_KEY:'routeTiming',validateRouteTimingPreferences:x=>x},
  });
  return {action,route:()=>route,writes:()=>writes};
}
function locationRoute(initial, extra={}){
  return form({buildId:'owned',dayId:'day-one',name:'Kees and Claire Hut',lat:50.03,lng:-122.95,expectedRoute:JSON.stringify(initial),...extra});
}
test('can add a campground with zero trailheads or existing stops',async()=>{
  const s=stubRoute([]);
  const result=await s.action.addBookingCampsiteStop(locationRoute([]));
  assert.equal(result.name,'Kees and Claire Hut');
  assert.equal(result.kind,'camp');
  assert.equal(result.dayId,'day-one');
  assert.equal(typeof result.id,'string');
  assert.equal(s.route().length,1);
  assert.equal(s.route()[0].id,result.id);
  assert.equal(s.writes(),1);
});
test('adding an overnight after existing stops retains later day stops and invalidates only affected leg',async()=>{
  const a={id:'trail',name:'Trailhead',kind:'trailhead',lat:50.0,lng:-122.9,dayId:'day-one',elevationM:null,trailToNext:{distanceM:123}};
  const b={id:'day2',name:'Summit',kind:'waypoint',lat:50.1,lng:-123.0,dayId:'day-two',elevationM:null};
  const initial=[a,b],s=stubRoute(initial);
  const added=await s.action.addBookingCampsiteStop(locationRoute(initial));
  assert.deepEqual(s.route().map(p=>p.id),['trail',added.id,'day2']);
  assert.equal(s.route()[0].trailToNext,undefined);
  assert.equal(s.route()[2].id,'day2');
});
test('stale route snapshot and invalid day are rejected with no write',async()=>{
  const p={id:'newer',name:'Other',kind:'camp',lat:50,lng:-122,dayId:'day-one',elevationM:null};
  const s=stubRoute([p]);
  await assert.rejects(()=>s.action.addBookingCampsiteStop(locationRoute([])),/itinerary changed/);
  await assert.rejects(()=>s.action.addBookingCampsiteStop(locationRoute([p],{dayId:'removed'})),/no longer exists/);
  assert.equal(s.writes(),0);
});
test('hut bookings can reference the shared campsite but other categories cannot',()=>{
  const base={id:'h1',kind:'reservation',category:'hut',name:'Kees and Claire Hut',status:'confirmed',startDate:'2027-07-15',endDate:'2027-07-16',provider:'',confirmation:'',bookingUrl:'',notes:'',dayId:'day-one',waypointId:'camp-one'};
  assert.deepEqual(validate.validateArrangements([base],['day-one'],['camp-one']),[base]);
  assert.throws(()=>validate.validateArrangements([{...base,category:'rental'}],['day-one'],['camp-one']),/Only hut/);
  assert.throws(()=>validate.validateArrangements([base],['day-one'],['missing']),/removed overnight/);
  const withoutLink={...base};delete withoutLink.waypointId;
  assert.deepEqual(validate.validateArrangements([withoutLink],['day-one'],['camp-one']),[withoutLink]);
});

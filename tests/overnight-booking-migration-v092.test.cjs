const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const {stripTypeScriptTypes}=require('node:module');
const root=path.resolve(__dirname,'..');
function load(rel,mocks){
 let js=stripTypeScriptTypes(fs.readFileSync(path.join(root,rel),'utf8'));
 const names=[...js.matchAll(/export (?:async )?function (\w+)|export const (\w+)/g)].map(m=>m[1]||m[2]);
 js=js.replace(/import\s+\{([^}]+)\}\s+from\s+["']([^"']+)["'];/g,(_,imports,spec)=>`const {${imports}} = require(${JSON.stringify(spec)});`).replace(/export /g,'');
 return new Function('require',js+`\nreturn {${names.join(',')}};`)(key=>{if(key in mocks)return mocks[key];throw new Error(`Unexpected server dependency ${key}`)});
}
const dates=[{id:'day-1',date:new Date('2027-07-15')},{id:'day-2',date:new Date('2027-07-16')}];
const original={id:'camp-main',dayId:'day-1',name:'Kees and Claire Hut',lat:49.25,lng:-123.15,kind:'camp',elevationM:null};
const duplicate={...original,id:'camp-duplicate',dayId:'day-2'};
const booking={id:'res-1',waypointId:'camp-duplicate',dayId:'day-2',campground:'Kees and Claire Hut',status:'confirmed',arrival:'2027-07-15',departure:'2027-07-16',provider:'BC Parks',confirmation:'PRIVATE',notes:''};
const logistics={permits:'old permit',reservations:'old reservation',phase6:{settings:{rateLph:.5,reserveL:1,capacityL:2},bookings:[booking]},phase7:{saved:'food'}};
const result={};
const tx={
 tripDay:{findMany:async({where}={})=>where?.id?.in?dates.filter(d=>where.id.in.includes(d.id)):dates,update:async()=>({})},
 build:{findUnique:async()=>({tripLogistics:logistics,routeWaypoints:[original,duplicate]}),update:async payload=>{result.payload=payload;return {};}}
};
const actions=load('lib/trip-planner-actions.ts',{
 '@/lib/build-access':{requireBuildAccess:async()=>({userId:'owner'})},
 'next/cache':{revalidatePath:()=>{}},
 '@/lib/destinations':{getDestination:()=>null},
 '@/lib/trip':{getDateRange:()=>[]},
 '@/lib/trip-planner':{emptyLogistics:{},nullableNumber:()=>0,parseDates:()=>({})},
 '@/lib/build-history':{mutateBuildWithRevision:async(_id,_owner,_type,_label,fn)=>fn(tx)},
 '@/lib/build-validation':{parseLogistics:()=>({})},
 '@/lib/itinerary-links':{validatedRoute:waypoints=>waypoints},
 '@/lib/overnight-handoffs':{consolidateOvernightStops:(points,days)=>{
   if(points.length===2&&points[1].id==='camp-duplicate'&&days.length===2)return {points:[points[0]],replacedIds:{'camp-duplicate':'camp-main'}};
   return {points,replacedIds:{}};
 }},
 '@/lib/route-metrics':{computeRouteMetrics:()=>({dayMetrics:[]}),completeDaySummaries:()=>[],DEFAULT_HIKING_PACE_KMH:4},
 '@/lib/trip-resources':{readPrivateResources:root=>root.phase6},
 '@/lib/trip-arrangements':{validateArrangements:()=>[]},
 '@/lib/food-plan':{validateFoodPlan:()=>({})},
 '@/lib/route-timing-preferences':{ROUTE_TIMING_KEY:'routeTiming',validateRouteTimingPreferences:x=>x},
});
test('route consolidation redirects campsite bookings that pointed to the removed duplicate ID',async()=>{
 const f=new FormData();f.set('buildId','build-one');f.set('waypoints',JSON.stringify([original]));
 await actions.saveTripRoute(f);
 assert.deepEqual(result.payload.data.routeWaypoints,[original]);
 assert.equal(result.payload.data.tripLogistics.phase6.bookings[0].waypointId,'camp-main');
 assert.equal(result.payload.data.tripLogistics.phase6.bookings[0].confirmation,'PRIVATE');
 assert.deepEqual(result.payload.data.tripLogistics.phase7,{saved:'food'});
});

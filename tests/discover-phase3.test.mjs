import assert from 'node:assert/strict';
import test from 'node:test';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {
  tripDateError, discoverTripPreview, starterDayActivity,
  createDiscoverDaySeed, createDiscoverLogistics,
} from '../lib/discover-trip.ts';

const dir = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(dir, '..');
const file = rel => fs.readFileSync(path.join(root,rel),'utf8');
const destination = {
  id:'garibaldi-lake',name:'Garibaldi Lake',kind:'campground',
  park:'Garibaldi Park',region:'Sea to Sky',
  sourceUrl:'https://bcparks.ca/garibaldi-park/black-tusk-garibaldi-lake-area/',
  caution:'Bookings and park access rules may change.',
};

test('date inputs are optional as a pair and reject malformed, backwards, and >366-day ranges',()=>{
  assert.equal(tripDateError('',''),null);
  assert.match(tripDateError('2027-05-01',''),/both/);
  assert.match(tripDateError('','2027-05-01'),/both/);
  assert.match(tripDateError('2027-02-30','2027-03-02'),/valid/);
  assert.match(tripDateError('2027-03-02','2027-03-01'),/before/);
  assert.equal(tripDateError('2028-02-28','2028-03-01'),null);
  assert.equal(tripDateError('2027-01-01','2028-01-01'),null); // 366 inclusive days
  assert.match(tripDateError('2027-01-01','2028-01-02'),/366/);
});

test('preview handles single day, multi-day, leap day and displays bounded date list',()=>{
  let result=discoverTripPreview('Garibaldi Lake','2028-02-29','2028-02-29');
  assert.equal(result.count,1);assert.equal(result.days[0].date,'2028-02-29');
  assert.match(result.days[0].activities,/Explore Garibaldi Lake/);
  result=discoverTripPreview('Garibaldi Lake','2028-02-28','2028-03-02');
  assert.equal(result.count,4);assert.deepEqual(result.days.map(day=>day.day),[1,2,4]);
  assert.deepEqual(result.days.map(day=>day.date),['2028-02-28','2028-02-29','2028-03-02']);
  assert.match(result.days.at(-1).activities,/Return/);
  assert.equal(discoverTripPreview('Garibaldi Lake','','').count,0);
});

test('seeded days are high-level editable activities without fake route or campsite data',()=>{
  const first=createDiscoverDaySeed(destination,0,3);
  const middle=createDiscoverDaySeed(destination,1,3);
  const last=createDiscoverDaySeed(destination,2,3);
  assert.match(first.activities,/Travel/);assert.match(first.notes,/not.*verified|No route/i);
  assert.match(middle.activities,/choose and verify/);assert.equal(middle.notes,undefined);
  assert.match(last.activities,/Return/);
  for (const day of [first,middle,last]) {
    for (const key of ['distanceKm','campsite','startLocation','endLocation','durationMinutes','waterSource']) {
      assert.equal(Object.hasOwn(day,key),false,`${key} must not be fabricated`);
    }
  }
  assert.match(starterDayActivity('Lake',0,1),/Explore Lake/);
});

test('Trip Logistics includes official source, caution and placeholders, never reservations as booked',()=>{
  const result=createDiscoverLogistics(destination);
  assert.match(result.notes,/bcparks.ca/);
  assert.match(result.notes,/Bookings and park access rules may change/);
  assert.match(result.notes,/no.*verified|does not provide a verified/i);
  assert.match(result.reservations,/No booking/);
  assert.equal(result.emergencyContact,'');
  assert.equal(result.transportation,'');
  assert.ok(result.notes.length < 5000);
  assert.equal(createDiscoverLogistics({...destination,kind:'lake'}).reservations,'');
  assert.doesNotMatch(createDiscoverLogistics({...destination,sourceUrl:'javascript:alert(1)'}).notes,/javascript:/);
});

test('sidebar offers date and traveller choice, day preview, and private planner handoff',()=>{
  const c=file('components/discover/DestinationTripForm.tsx');
  const d=file('components/discover/DestinationDetail.tsx');
  assert.match(c,/name="startDate"/);assert.match(c,/name="endDate"/);
  assert.match(c,/name="people"/);assert.match(c,/name="seedItinerary"/);
  assert.match(c,/name="discoverPlan" value="1"/);
  assert.match(c,/discoverTripPreview/);
  assert.match(c,/form action=\{startDestinationPlan\}/);
  assert.match(d,/<DestinationTripForm destination=\{destination\}/);
  assert.match(d,/<DiscoverLocationMap/);
  assert.doesNotMatch(d,/<iframe/);
  assert.match(d,/relatedCampgrounds|campgrounds\.map/);
});

test('server forwards whitelisted fields and existing build action seeds inside transaction',()=>{
  const discover=file('app/discover/actions.ts');
  const build=file('app/build/actions.ts');
  assert.match(discover,/const raw = formData.get\("destinationId"\)/);
  assert.match(discover,/for \(const key of \["startDate", "endDate", "people"\]/);
  assert.match(discover,/values.set\("discoverPlan", "1"\)/);
  assert.match(discover,/await createBuild\(values\)/);
  assert.match(build,/parseBuildDetails\(formData\)/);
  assert.match(build,/createDiscoverLogistics\(selected\)/);
  assert.match(build,/createDiscoverDaySeed\(selected, index, dates.length\)/);
  assert.match(build,/isPublic: discoverPlan \? false : newBuildPublic/);
  assert.match(build,/discoverPlan \? "\?tab=trip"/);
  assert.match(build,/await setCurrentBuild\(build.id, !ownerId\)/);
  assert.match(build,/await recordBuildRevision\(created.id, ownerId, "create"/);
});

test('createBuild transaction keeps ordinary builds unchanged and seeds only Discover plans', async () => {
  // Exercise the actual patched createBuild function with repository-shaped mocks,
  // not a rewritten version of the production implementation.
  const source=file('app/build/actions.ts');
  const begin=source.indexOf('export async function createBuild(formData: FormData) {');
  const end=source.indexOf('export async function addGear(',begin);
  assert.ok(begin > 0 && end > begin);
  const executable=source.slice(begin,end).replace('export async function createBuild(formData: FormData) {','async function createBuild(formData) {');
  const makeAction=new Function('services',`const {currentBuildUserId,prisma,parseBuildDetails,getDestination,getDateRange,createDiscoverLogistics,createDiscoverDaySeed,recordBuildRevision,setCurrentBuild,redirect}=services;\n${executable}\nreturn createBuild;`);
  const run = async (discover, seed) => {
    const writes={build:null,days:[],revisions:[],current:null,url:null};
    const services={
      currentBuildUserId: async()=> 'user-1',
      prisma:{
        userSettings:{findUnique:async()=>({defaultBuildPublic:true})},
        $transaction: async fn=>fn({
          build:{create:async ({data})=>{writes.build=data;return {id:'new-trip',startDate:data.startDate,endDate:data.endDate};}},
          tripDay:{createMany:async({data})=>{writes.days=data;}},
        }),
      },
      parseBuildDetails: form=>({
        name:String(form.get('name')), destinationId:'garibaldi-lake',
        location:null, latitude:null, longitude:null,
        people:2,conditions:null,minTemperature:null,
        dates:{startDate:new Date('2028-07-01'),endDate:new Date('2028-07-02')},
      }),
      getDestination:()=>destination,
      getDateRange:(start,end)=>[new Date(start),new Date(end)],
      createDiscoverLogistics,createDiscoverDaySeed,
      recordBuildRevision:async (...args)=>{writes.revisions.push(args);},
      setCurrentBuild:async(...args)=>{writes.current=args;},
      redirect:url=>{writes.url=url;},
    };
    const form=new FormData();form.set('name','Lake trip');
    if(discover)form.set('discoverPlan','1');
    if(seed)form.set('seedItinerary','1');
    await makeAction(services)(form);
    return writes;
  };
  const discover=await run(true,true);
  assert.equal(discover.build.isPublic,false);
  assert.equal(discover.build.location,'Garibaldi Lake, Garibaldi Park');
  assert.match(discover.build.tripLogistics.notes,/bcparks.ca/);
  assert.equal(discover.days.length,2);
  assert.match(discover.days[0].activities,/Travel to/);
  assert.match(discover.days[1].activities,/Return from/);
  assert.ok(discover.days.every(day=>!Object.hasOwn(day,'campsite') && !Object.hasOwn(day,'distanceKm')));
  assert.equal(discover.revisions.length,1);
  assert.deepEqual(discover.current,['new-trip',false]);
  assert.equal(discover.url,'/build/new-trip?tab=trip');
  const noSeed=await run(true,false);
  assert.equal(noSeed.days[0].activities,undefined);
  assert.equal(noSeed.days[0].notes,undefined);
  const regular=await run(false,true);
  assert.equal(regular.build.isPublic,true);
  assert.equal(regular.build.tripLogistics,undefined);
  assert.equal(regular.days[0].activities,undefined);
  assert.equal(regular.url,'/build/new-trip');
});


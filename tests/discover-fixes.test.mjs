import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import test from 'node:test';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const read=rel=>readFileSync(path.join(root,rel),'utf8');

test('destination cards lead to the trip setup form rather than silently creating builds',()=>{
  const landing=read('components/discover/DiscoverLanding.tsx');
  const details=read('components/discover/DestinationDetail.tsx');
  const form=read('components/discover/DestinationTripForm.tsx');
  assert.doesNotMatch(landing,/startDestinationPlan/);
  assert.match(landing,/destinationHref\(destination\.id\)\}#plan-trip-heading/);
  assert.match(details,/<DestinationTripForm destination=\{destination\}/);
  assert.match(form,/id="plan-trip-heading"/);
  assert.match(form,/name="startDate"/);
  assert.match(form,/name="endDate"/);
  assert.match(form,/name="people"/);
});

test('server handoff forwards chosen name, dates, people and seed option',async()=>{
  const source=read('app/discover/actions.ts');
  const start=source.indexOf('export async function startDestinationPlan(');
  const finish=source.indexOf('\n}',start)+2;
  assert.ok(start>0 && finish>start);
  const code=source.slice(start,finish)
    .replace('export async function startDestinationPlan(formData: FormData): Promise<void>', 'async function startDestinationPlan(formData)')
    .replace(' as const','');
  const received=[];
  const action=new Function('services',`const {getDestination,createBuild}=services;\n${code}\nreturn startDestinationPlan;`)(
    {getDestination:id=>id==='lake' ? {id,name:'Lake',region:'Coast',park:'Park'} : null,
      createBuild:async form=>received.push(form)});
  const data=new FormData();
  for(const [k,v] of Object.entries({destinationId:'lake',name:'My trip',startDate:'2028-06-01',endDate:'2028-06-05',people:'3',seedItinerary:'1',isPublic:'true',discoverPlan:'0'}))data.set(k,v);
  await action(data);
  assert.equal(received.length,1);
  assert.deepEqual(Object.fromEntries(received[0]),{
    name:'My trip',destinationId:'lake',startDate:'2028-06-01',endDate:'2028-06-05',people:'3',discoverPlan:'1',seedItinerary:'1',
  });
  await assert.rejects(action(new FormData()),/destination/i);
  const bad=new FormData();bad.set('destinationId','nope');
  await assert.rejects(action(bad),/Destination not found/);
});

test('build destination type supports the full catalog and nullable coordinates',()=>{
  const types=read('lib/destinations.ts');
  const data=JSON.parse(read('data/destinations.json'));
  assert.equal(data.length,184);
  assert.equal(new Set(data.map(item=>item.id)).size,data.length);
  assert.match(types,/latitude: number \| null/);
  assert.match(types,/longitude: number \| null/);
  assert.match(types,/kind: DestinationKind/);
  assert.match(types,/activities: DestinationActivity\[\]/);
  assert.match(types,/distanceType: DistanceType \| null/);
  const kinds=new Set(['campground','lake','trail','summit','waterfall','viewpoint','coastal','backcountry-area','meadow','hut']);
  const activities=new Set(['hiking','backpacking','camping','paddling']);
  for(const item of data){
    assert.ok(kinds.has(item.kind),`unexpected kind ${item.id}`);
    assert.ok(Array.isArray(item.activities) && item.activities.every(a=>activities.has(a)),`bad activities ${item.id}`);
    assert.ok(item.distanceType===null||['one-way','round-trip','loop'].includes(item.distanceType));
    assert.ok((item.latitude===null&&item.longitude===null)||(typeof item.latitude==='number'&&typeof item.longitude==='number'));
  }
});

test('facility audit updates do not convert unverified storage into confident NO',()=>{
  const data=JSON.parse(read('data/destinations.json'));
  const byId=Object.fromEntries(data.map(d=>[d.id,d]));
  assert.equal(byId['alder-flats'].foodStorage,'unknown');
  assert.equal(byId['magnesia-meadows-cypress'].foodStorage,'unknown');
  assert.equal(byId['circlet-lake-strathcona'].foodStorage,'yes');
  assert.equal(byId['kwai-lake-strathcona'].foodStorage,'yes');
  assert.equal(byId['dark-creek-campground-pinecone-burke']?.foodStorage ?? 'not found','no');
  assert.match(byId['alder-flats'].caution,/does not confirm/);
});

test('planner recognises tab=trip and shows TripPlanner',()=>{
  const page=read('app/build/[id]/page.tsx');
  const build=read('app/build/actions.ts');
  assert.match(page,/const activeTab = tab === "trip" \? "trip" : "gear"/);
  assert.match(page,/activeTab === "trip"\s*\?/);
  assert.match(page,/<TripPlanner/);
  assert.match(build,/discoverPlan \? "\?tab=trip" : ""/);
});

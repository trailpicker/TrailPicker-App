const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');
const root = path.resolve(__dirname, '..');
const { orsCoordinateKey, retryAfterSeconds, createOrsResultCache, createOrsTrafficController,
  OrsCooldownError, OrsQueueFullError } = require('../lib/ors-request-control.ts');
const { missingTrailLegs } = require('../lib/route-request-planner.ts');

const point = (id, lat, lng) => ({ id, name:id, lat, lng, elevationM:null, kind:'waypoint' });
const line = (from, to) => ({ toId:to.id, source:'openrouteservice', geometry:[[from.lat,from.lng],[to.lat,to.lng]],distanceM:200 });

test('routing cache keys keep directions, kinds and shaping waypoints separate', () => {
  const a=[49.1,-122.1], b=[49.2,-122.2], via=[49.15,-122.15];
  assert.notEqual(orsCoordinateKey('route',[a,b]),orsCoordinateKey('route',[b,a]));
  assert.notEqual(orsCoordinateKey('route',[a,b]),orsCoordinateKey('route',[a,via,b]));
  assert.notEqual(orsCoordinateKey('route',[a,b]),orsCoordinateKey('snap',[a,b]));
  assert.equal(orsCoordinateKey('route',[a,b]),orsCoordinateKey('route',[a,b]));
});

test('positive, negative and concurrent ORS requests share bounded cache results', async () => {
  let now=0, calls=0;
  const cache=createOrsResultCache({maxEntries:2,successTtlMs:100,missingTtlMs:10,now:()=>now});
  let release;
  const work=()=>{calls++;return new Promise(resolve=>{release=resolve;});};
  const p1=cache.getOrLoad('A',work),p2=cache.getOrLoad('A',work);
  assert.equal(calls,1);
  release({ok:true});
  assert.deepEqual(await Promise.all([p1,p2]),[{ok:true},{ok:true}]);
  assert.deepEqual(await cache.getOrLoad('A',()=>{throw new Error('should not load')}),{ok:true});
  await cache.getOrLoad('B',async()=>null);
  assert.equal(await cache.getOrLoad('B',async()=>{throw new Error('negative hit')}),null);
  now=11;
  await cache.getOrLoad('B',async()=>{calls++;return {ok:false}});
  assert.equal(calls,2);
  await cache.getOrLoad('C',async()=>1);
  assert.equal(cache.size(),2);
  now=150;
  await cache.getOrLoad('B',async()=>2);
  assert.equal(await cache.getOrLoad('B',async()=>{throw new Error('after refresh')}),2);
});

test('failed provider calls are not cached',async()=>{
  const cache=createOrsResultCache();
  let calls=0;
  await assert.rejects(cache.getOrLoad('a',async()=>{calls++;throw new Error('429')}));
  await cache.getOrLoad('a',async()=>{calls++;return 2});
  assert.equal(calls,2);
});

test('serial ORS controller spaces calls and stops its queue after rate limiting',async()=>{
  let now=0;
  const traffic=createOrsTrafficController({intervalMs:1600, now:()=>now, sleep:async(ms)=>{now+=ms;}});
  const starts=[];
  const one=traffic.schedule(async()=>{starts.push(now);return 'one'});
  const two=traffic.schedule(async()=>{starts.push(now);traffic.cooldown(90);return 'two'});
  const three=traffic.schedule(async()=>{starts.push(now);return 'three'});
  assert.equal(await one,'one');
  assert.equal(await two,'two');
  assert.deepEqual(starts,[0,1600]);
  await assert.rejects(three,e=>e instanceof OrsCooldownError && e.retryAfterSeconds===90);
  assert.equal(traffic.remainingCooldownSeconds(),90);
  now+=90000;
  assert.equal(await traffic.schedule(async()=>{starts.push(now);return 'resumed'}),'resumed');
  assert.equal(starts.length,3);
});

test('queue capacity rejects excess work without executing it',async()=>{
  let release;
  const gate=new Promise(resolve=>release=resolve);
  const traffic=createOrsTrafficController({queueLimit:1,intervalMs:0});
  const first=traffic.schedule(()=>gate);
  await assert.rejects(traffic.schedule(async()=>2), OrsQueueFullError);
  release(1);
  assert.equal(await first,1);
});

test('moving one stop in a long route only invalidates its two adjacent legs', () => {
  const points=Array.from({length:12},(_,index)=>point(`p${index}`,49+index*0.001,-122-index*0.001));
  for(let i=0;i<points.length-1;i++) points[i].trailToNext=line(points[i],points[i+1]);
  assert.equal(missingTrailLegs(points).length,0);
  points[5]={...points[5],lat:points[5].lat+0.002,trailToNext:undefined};
  assert.deepEqual(missingTrailLegs(points).map(({from})=>from.id),['p4','p5']);
});

test('Retry-After accepts seconds and dates but rejects dangerous values',()=>{
  assert.equal(retryAfterSeconds('42',0),42);
  assert.equal(retryAfterSeconds('Thu, 01 Jan 1970 00:00:30 GMT',0),30);
  assert.equal(retryAfterSeconds('99999',0),3600);
  assert.equal(retryAfterSeconds('invalid',0),90);
});

test('valid saved routes do not re-request ORS merely because elevation metadata is missing',()=>{
  const a=point('a',49.1,-122.1),b=point('b',49.101,-122.101),c=point('c',49.102,-122.102);
  a.trailToNext=line(a,b);
  assert.deepEqual(missingTrailLegs([a,b,c]).map(({from})=>from.id),['b']);
  b.trailToNext=line(b,c);
  assert.equal(missingTrailLegs([a,b,c]).length,0);
  b.lat=49.103;
  assert.deepEqual(missingTrailLegs([a,b,c]).map(({from})=>from.id),['a','b']);
  a.manualToNext=true;
  assert.deepEqual(missingTrailLegs([a,b,c]).map(({from})=>from.id),['b']);
});

test('route endpoints enforce access before using shared cache and propagate Retry-After',()=>{
  for (const f of ['app/api/trails/route/route.ts','app/api/trails/snap/route.ts']) {
    const code=fs.readFileSync(path.join(root,f),'utf8');
    assert.ok(code.indexOf('trailRoutingRequest(request,') < code.indexOf('orsResultCache.getOrLoad('));
    assert.match(code,/Retry-After/);
    assert.match(code,/error\.status === 422/);
  }
  const server=fs.readFileSync(path.join(root,'lib/trail-routing-server.ts'),'utf8');
  assert.match(server,/orsTraffic\.schedule\(async/);
  assert.match(server,/orsTraffic\.cooldown\(seconds\)/);
  const client=fs.readFileSync(path.join(root,'components/builder/TripPlanner/TripRoute.tsx'),'utf8');
  assert.match(client,/const missing = missingTrailLegs\(points\)/);
  assert.match(client,/if \(response\.status === 429\)/);
  assert.match(client,/break; \/\/ Do NOT send the other pending segments/);
});

test('all modified TS/TSX files transpile',()=>{
  for (const f of ['lib/ors-request-control.ts','lib/route-request-planner.ts','lib/trail-routing-server.ts','app/api/trails/route/route.ts','app/api/trails/snap/route.ts','components/builder/TripPlanner/TripRoute.tsx']) {
    const parsed=ts.transpileModule(fs.readFileSync(path.join(root,f),'utf8'),{fileName:f,compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,jsx:ts.JsxEmit.ReactJSX},reportDiagnostics:true});
    assert.deepEqual((parsed.diagnostics||[]).map(d=>ts.flattenDiagnosticMessageText(d.messageText,' ')),[],f);
  }
});

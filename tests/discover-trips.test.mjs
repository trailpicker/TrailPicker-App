import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {parseTripFeature, publicTripAuthor, publicTripDay, summarizeTripDays, tripBrowseHref, tripHref, tripDayTitle} from '../lib/discover-trips.ts';
const root=new URL('../',import.meta.url);
const file=rel=>fs.readFileSync(new URL(rel,root),'utf8');

test('trip query params reject unexpected values and encode urls',()=>{
  assert.equal(parseTripFeature('route'),'route');
  assert.equal(parseTripFeature(['gear','campsite']),'gear');
  assert.equal(parseTripFeature('hijack'),'all');
  const href=tripBrowseHref({q:'Forest & Ocean',location:'Vancouver Island',region:'Sea to Sky',sort:'popular'},'campsite',{page:2});
  const p=new URL(href,'http://localhost').searchParams;
  assert.equal(new URL(href,'http://localhost').pathname,'/discover/community');assert.equal(p.get('feature'),'campsite');assert.equal(p.get('q'),'Forest & Ocean');assert.equal(p.get('page'),'2');
  assert.equal(tripHref('abc/123'),'/discover/trips/abc%2F123');
});

test('distance and ascent metrics are transparent about partial data',()=>{
  const days=[{date:'2026-08-01',startLocation:'Trailhead',endLocation:'Camp',distanceKm:10,elevationGainM:400,campsite:'Camp',activities:'Hike'},
    {date:'2026-08-02',startLocation:'Camp',endLocation:'Trailhead',distanceKm:null,elevationGainM:0,campsite:null,activities:null}];
  const s=summarizeTripDays(days);
  assert.deepEqual(s,{dayCount:2,distanceKm:10,elevationGainM:400,measuredDistanceDays:1,measuredGainDays:2,campsites:1});
  assert.equal(summarizeTripDays([]).distanceKm,null);
  assert.equal(tripDayTitle(days[0],0),'Trailhead → Camp');
});

test('public day whitelist excludes notes, reservations and private logistics',()=>{
  const day={date:'2026-01-01',startLocation:null,endLocation:null,distanceKm:0,elevationGainM:null,campsite:null,activities:'Walk',notes:'Secret',reservation:'123456',tripLogistics:'Private'};
  assert.equal(publicTripDay(day).distanceKm,0);
  for(const key of ['notes','reservation','tripLogistics']) assert.equal(Object.hasOwn(publicTripDay(day),key),false);
  assert.equal(publicTripAuthor({name:'Private Name',username:'secret',isProfilePublic:false}),'Community member');
  assert.equal(publicTripAuthor({name:'Public Name',username:'hiker',isProfilePublic:true}),'hiker');
});

test('Trip discovery is public-only and indexed by real stored itinerary data',()=>{
  const landing=file('components/discover/DiscoverResultsServer.tsx');
  assert.match(landing,/if \(filters\.view === "trips"\)/);
  assert.match(landing,/isPublic: true, days: \{some: \{\}\}/);
  assert.match(landing,/feature === "campsite"/);
  assert.match(landing,/feature === "route"/);
  assert.match(landing,/feature === "gear"/);
  assert.match(landing,/const count = await prisma\.build\.count/);
  assert.match(landing,/return <TripExplore/);
  const page=file('app/discover/trips/[id]/page.tsx');
  assert.match(page,/where:\{id,isPublic:true,days:\{some:\{\}\}\}/);
  assert.match(page,/routeWaypoints:true/);
  assert.match(page,/id:true,date:true/);
  assert.doesNotMatch(page,/tripLogistics:true|reservation:true|notes:true/);
  assert.doesNotMatch(page,/locationLat:true|locationLng:true/);
  const detail=file('components/discover/PublicTripDetail.tsx');
  assert.match(detail,/const coords=destination\?validCoordinates\(destination\):null/);
  assert.match(detail,/TripActions/);
  const actions=file('app/discover/actions.ts');
  assert.match(actions,/source\.days\.length \? "\?tab=trip" : ""/);
});

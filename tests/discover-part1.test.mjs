import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {parseFinderPreferences,finderEligible,recommendDestinations,DEFAULT_PREFERENCES} from '../lib/discover-finder.ts';
import {publicRouteWaypoints} from '../lib/discover-public-route.ts';
import {relatedCampgrounds} from '../lib/destination-detail.ts';
const read=rel=>readFileSync(new URL('../'+rel,import.meta.url),'utf8');
const destinations=JSON.parse(read('data/destinations.json'));
const sample=destinations.find(x=>x.dogs==='leashed'&&x.toilet==='yes');

test('10 non-redundant finder questions use the existing Lucide icon family',()=>{
 const finder=read('components/discover/AdventureFinder.tsx');
 for(const key of ['area','activity','difficulty','distance','gain','scenery','dogs','toilets','storage','priority'])assert.match(finder,new RegExp(`name="${key}"`));
 assert.match(finder,/<SceneryIcon scene=\{scene\}/);
 const icons=read('components/discover/SceneryIcon.tsx');
 for(const key of ['any','lakes','summits','forest','coast','meadows'])assert.match(icons,new RegExp(`${key}:`));
 assert.match(icons,/lucide-react/);assert.doesNotMatch(icons,/<svg/);
});
test('finder parses extras and keeps legacy links working',()=>{
 assert.deepEqual(parseFinderPreferences({}),DEFAULT_PREFERENCES);
 const p=parseFinderPreferences({activity:'hiking',distance:'10',gain:'600',dogs:'yes',toilets:'yes',storage:'yes'});
 assert.equal(p.activity,'hiking');assert.equal(p.distance,'10');assert.equal(p.gain,'600');
 assert.equal(p.dogs,'yes');assert.equal(p.toilets,'yes');assert.equal(p.storage,'yes');
 assert.equal(parseFinderPreferences({activity:'hacked',distance:'800',dogs:'invalid'}).activity,'any');
});
test('confirmed access, facilities and activity are actually enforced',()=>{
 const prefs={...DEFAULT_PREFERENCES,dogs:'yes',toilets:'yes',activity:'hiking'};
 for(const d of destinations.filter(x=>finderEligible(x,prefs))){
  assert.ok(['leashed','under-control'].includes(d.dogs));assert.equal(d.toilet,'yes');assert.ok(d.activities.includes('hiking'));
 }
 assert.ok(recommendDestinations(destinations,prefs).every(x=>finderEligible(x.destination,prefs)));
});
test('recorded distances/gains outside preferences are excluded, missing stays unknown',()=>{
 const known=destinations.find(x=>x.distanceKm!==null&&x.distanceKm>10);
 const missing=destinations.find(x=>x.distanceKm===null);
 assert.equal(finderEligible(known,{...DEFAULT_PREFERENCES,distance:'10'}),false);
 assert.equal(finderEligible(missing,{...DEFAULT_PREFERENCES,distance:'10'}),true);
 const result=recommendDestinations([missing],{...DEFAULT_PREFERENCES,distance:'10'})[0];
 assert.ok(result.cautions.some(x=>x.includes('unverified')));
 const steep=destinations.find(x=>x.elevationGainM!==null&&x.elevationGainM>300);
 assert.equal(finderEligible(steep,{...DEFAULT_PREFERENCES,gain:'300'}),false);
});
test('public stops are safely whitelisted, keep day assignments, reject invalid points',()=>{
 const waypoints=[{id:'a',name:'Camp',lat:49,lng:-123,kind:'camp',elevationM:250,dayId:'day1',time:'14:10',note:'private note',reservation:'secret'},
  {id:'a',name:'Duplicate',lat:49,lng:-123,kind:'camp'}, {id:'bad',name:'Bad',lat:900,lng:0,kind:'waypoint'},
  {id:'b',name:'Lookout',lat:49.01,lng:-123.01,kind:'waypoint',dayId:'secret-day',note:'secret'}];
 const output=publicRouteWaypoints(waypoints,['day1']);
 assert.equal(output.length,2);assert.equal(output[0].dayId,'day1');assert.equal(output[0].time,'14:10');
 assert.equal(output[1].dayId,undefined);
 assert.ok(output.every(x=>!('note' in x)&&!('reservation' in x)));
 assert.deepEqual(publicRouteWaypoints(null),[]);
});
test('published trip route is selected and displayed, not only copied',()=>{
 const page=read('app/discover/trips/[id]/page.tsx');
 const view=read('components/discover/PublicTripDetail.tsx');
 assert.match(page,/routeWaypoints:true/);assert.match(page,/waypoints=\{trip.routeWaypoints\}/);
 assert.match(view,/publicRouteWaypoints\(waypoints/);assert.match(view,/DiscoverLocationMap coords=\{coords\} points=\{route\}/);
 assert.match(view,/Mapped stops/);
 assert.doesNotMatch(page,/tripLogistics:true|reservation:true|notes:true/);
});
test('destination and builder maps use canonical OSM tile URL, send origin and offer fallback',()=>{
 const detail=read('components/discover/DestinationDetail.tsx');
 const pub=read('components/discover/PublicTripDetail.tsx');
 const map=read('components/discover/DiscoverLocationMapInner.tsx');
 const route=read('components/builder/TripPlanner/RouteMapInner.tsx');
 const location=read('components/build/LocationMap.tsx');
 assert.doesNotMatch(detail,/<iframe/);assert.doesNotMatch(pub,/<iframe/);
 for(const text of [map,route,location]){
  assert.match(text,/https:\/\/tile.openstreetmap.org\/\{z\}\/\{x\}\/\{y\}.png/);
  assert.match(text,/referrerPolicy="origin"/);
 }
 assert.match(map,/tileerror/);assert.match(route,/tileerror/);
});
test('green plan CTA is a real link to the destination trip form',()=>{
 for(const path of ['components/discover/DiscoverHome.tsx','components/discover/DiscoverLanding.tsx','components/discover/AdventureFinder.tsx','components/discover/DestinationDetail.tsx']){
  const content=read(path); assert.match(content,/Plan this destination/);assert.match(content,/plan-trip-heading/);
 }
});
test('nearby campground copy is natural and suggestions stay in same region across parks',()=>{
 const detail=read('components/discover/DestinationDetail.tsx');
 assert.match(detail,/Camping near this destination/);assert.doesNotMatch(detail,/Same park first, then sites with coordinates within 35 km/);
 const a={id:'a',park:'Sample Park',region:'Sea to Sky',kind:'lake',latitude:49,longitude:-123};
 const b={...a,id:'b',park:'Other Park',kind:'campground',latitude:49.001};
 const c={...b,id:'c',region:'Canadian Rockies'};
 assert.deepEqual(relatedCampgrounds(a,[a,b,c]).map(x=>x.destination.id),['b']);
});

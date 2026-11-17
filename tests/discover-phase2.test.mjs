import assert from 'node:assert/strict';
import test from 'node:test';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import {
  destinationHref, validCoordinates, straightLineKm, parkKey,
  relatedCampgrounds, relatedPlaces, officialUrl,
  openStreetMapEmbedUrl, openStreetMapLink, openStreetMapSearch,
  dogsLabel, facilityLabel, permitLabel, distanceLabel,
} from '../lib/destination-detail.ts';

const make = (id, name, park, kind, latitude=null, longitude=null, extra={}) => ({
  id, name, park, region:'Sea to Sky', kind, latitude, longitude,
  difficulty:'moderate',distanceKm:null,elevationGainM:null,featured:false,
  summary:'Sample record', toilet:null,foodStorage:null, dogs:'check-current-rules',
  reservations:'check-current-rules',tentSites:null,sourceUrl:'https://bcparks.ca/',bookingUrl:null,
  ...extra,
});
const target = make('lake', 'Sample lake', 'Garibaldi Provincial Park', 'lake', null, null);
const sameCamp = make('camp','Camp', 'Garibaldi Park', 'campground', 49.94,-123.04);
const sameOther = make('other', 'Different view','Garibaldi Provincial Park','viewpoint');
const elsewhere = make('else','Faraway camp','Manning Park','campground',49.2,-120.8);
const unsafe = make('fake','No coordinates','Other Park','campground',0,0);

test('detail paths preserve identifier and do not interpolate unsafe HTML', () => {
  assert.equal(destinationHref('garibaldi-lake'), '/discover/destinations/garibaldi-lake');
  assert.equal(destinationHref('name with slash/a'), '/discover/destinations/name%20with%20slash%2Fa');
});
test('only valid explicit lat/lon can power a pin', () => {
  assert.equal(validCoordinates(target), null);
  assert.equal(validCoordinates({latitude:null,longitude:-123}), null);
  assert.equal(validCoordinates({latitude:91,longitude:-123}), null);
  assert.equal(validCoordinates({latitude:49,longitude:Infinity}), null);
  assert.deepEqual(validCoordinates({latitude:49.94,longitude:-123.04}),{latitude:49.94,longitude:-123.04});
});
test('map links use proper OSM embed and search rather than fabricated coordinates',()=>{
  const coords=validCoordinates(sameCamp);
  const embed=new URL(openStreetMapEmbedUrl(coords));
  assert.equal(embed.hostname,'www.openstreetmap.org');
  assert.equal(embed.pathname,'/export/embed.html');
  assert.equal(embed.searchParams.get('marker'),'49.94,-123.04');
  assert.equal(embed.searchParams.get('layer'),'mapnik');
  assert.equal(embed.searchParams.get('bbox').split(',').length,4);
  assert.ok(openStreetMapLink(coords).includes('mlat=49.94'));
  const lookup=new URL(openStreetMapSearch(target));
  assert.equal(lookup.pathname,'/search');
  assert.match(lookup.searchParams.get('query'),/Garibaldi Provincial Park/);
});
test('related campgrounds respect park aliases and skip unsupported distances',()=>{
  assert.equal(parkKey('Mount Robson Provincial Park'),parkKey('Mount Robson Park'));
  const items=relatedCampgrounds(target,[target,sameCamp,sameOther,elsewhere,unsafe]);
  assert.deepEqual(items.map(x=>x.destination.id),['camp']);
  assert.equal(items[0].straightLineKm,null);
  assert.equal(items[0].relation,'same-park');
  assert.deepEqual(relatedPlaces(target,[target,sameCamp,sameOther,elsewhere]).map(x=>x.id),['other']);
});
test('distance only calculated between two stored coordinates and is straight-line',()=>{
  const p1={latitude:49.94,longitude:-123.04};
  assert.equal(straightLineKm(p1,p1),0);
  assert.ok(straightLineKm(p1,{latitude:49.95,longitude:-123.04}) > 1);
  const a=make('a','A','First Park','lake',49.94,-123.04);
  const b=make('b','B','Other Park','campground',49.95,-123.04);
  const linked=relatedCampgrounds(a,[a,b]);
  assert.equal(linked.length,1);
  assert.equal(linked[0].relation,'nearby-coordinate');
  assert.ok(linked[0].straightLineKm > 1);
});
test('facility, permit and trip distance labels never infer missing details',()=>{
  assert.equal(facilityLabel('unknown'),'Not confirmed');
  assert.equal(facilityLabel(null),'Not listed');
  assert.equal(facilityLabel('seasonal'),'Seasonal');
  assert.equal(dogsLabel('check-current-rules'),'Check current rules');
  assert.equal(permitLabel('required'),'Reservation required');
  assert.equal(distanceLabel(null),'Not provided');
  assert.equal(distanceLabel(9,null),'9 km listed');
  assert.equal(distanceLabel(9,'round-trip'),'9 km round trip');
});
test('only valid HTTP(S) official URLs are displayed',()=>{
  assert.equal(officialUrl('javascript:alert(1)'),null);
  assert.equal(officialUrl('//website'),null);
  assert.equal(officialUrl('not a url'),null);
  assert.equal(officialUrl('https://bcparks.ca/golden-ears-park/'),'https://bcparks.ca/golden-ears-park/');
});
test('detail route, metadata, plan action and related links are wired',()=>{
  const dir=path.dirname(fileURLToPath(import.meta.url));
  const file=fs.readFileSync(path.join(dir,'../app/discover/destinations/[id]/page.tsx'),'utf8');
  const component=fs.readFileSync(path.join(dir,'../components/discover/DestinationDetail.tsx'),'utf8');
  const landing=fs.readFileSync(path.join(dir,'../components/discover/DiscoverLanding.tsx'),'utf8');
  assert.match(file,/getDestination\(id\)/);
  assert.match(file,/notFound\(\)/);
  assert.match(file,/generateMetadata/);
  assert.match(component,/DestinationTripForm/);
  const tripForm=fs.readFileSync(path.join(dir,'../components/discover/DestinationTripForm.tsx'),'utf8');
  assert.match(tripForm,/form action=\{startDestinationPlan\}/);
  assert.match(tripForm,/name="destinationId" value=\{destination\.id\}/);
  assert.match(component,/relatedCampgrounds|campgrounds\.map/);
  assert.match(landing,/href=\{destinationHref\(destination\.id\)\}/);
});


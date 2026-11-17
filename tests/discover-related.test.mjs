import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {
  relatedTripHref, relatedPackHref, relatedDestinationHref,
  relatedDestinationMatches, relatedPublicSummary, EMPTY_RELATED_CONTENT,
} from '../lib/discover-related.ts';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');

test('Exact ID matches only: similar location names cannot create fake relationships', () => {
  assert.equal(relatedDestinationMatches('joffre-lakes','joffre-lakes'), true);
  assert.equal(relatedDestinationMatches('joffre-lakes','joffre-lakes-trail'), false);
  assert.equal(relatedDestinationMatches('alice-lake','Alice Lake'), false);
  assert.equal(relatedDestinationMatches(null,'alice-lake'), false);
  assert.equal(relatedDestinationMatches('alice-lake',undefined), false);
  assert.equal(relatedDestinationMatches('',''), false);
});

test('Cross-section hrefs encode IDs and use public Discover pages', () => {
  assert.equal(relatedTripHref('odd /id'), '/discover/trips/odd%20%2Fid');
  assert.equal(relatedPackHref('odd /id'), '/discover/packs/odd%20%2Fid');
  assert.equal(relatedDestinationHref('odd /id'), '/discover/destinations/odd%20%2Fid');
});

test('Related counts describe recorded content without inventing weight, budget or route statistics', () => {
  assert.equal(relatedPublicSummary({id:'a',name:'A',dayCount:1,gearCount:0},'trip'),'1 day');
  assert.equal(relatedPublicSummary({id:'a',name:'A',dayCount:2,gearCount:9},'trip'),'2 days · 9 gear entries');
  assert.equal(relatedPublicSummary({id:'a',name:'A',dayCount:2,gearCount:1},'pack'),'1 gear entry · 2 itinerary days');
  assert.deepEqual(EMPTY_RELATED_CONTENT,{trips:[],packs:[]});
});

test('Related DB queries require known catalog IDs, published builds and exact destination foreign identifiers', () => {
  const query=read('lib/discover-related-query.ts');
  assert.match(query,/getDestination\(destinationId\)/);
  assert.match(query,/isPublic: true/);
  assert.match(query,/destinationId: destinationId!/);
  assert.match(query,/days: \{ some: \{\} \}/);
  assert.match(query,/items: \{ some: \{\} \}/);
  assert.match(query,/id: \{ not: options\.excludeBuildId \}/);
  assert.match(query,/take: limit/);
  assert.match(query,/Math\.min\(6/);
  assert.doesNotMatch(query,/\bcontains\b|\bstartsWith\b|\bendsWith\b|\bmode:|\$queryRaw/);
});

test('Related query selects public titles and counts only, never private itinerary or user data', () => {
  const query=read('lib/discover-related-query.ts');
  assert.match(query,/select: \{ days: true, items: true \}/);
  assert.doesNotMatch(query,/reservation: true|notes: true|tripLogistics: true|routeWaypoints: true|locationLat: true|locationLng: true|user: \{/);
});

test('All three server pages enforce public visibility of their own content', () => {
  const destination=read('app/discover/destinations/[id]/page.tsx');
  const trip=read('app/discover/trips/[id]/page.tsx');
  const pack=read('app/discover/packs/[id]/page.tsx');
  assert.match(destination,/findRelatedPublicContent\(destination\.id/);
  assert.match(trip,/where:\{id,isPublic:true,days:\{some:\{\}\}\}/);
  assert.match(pack,/where:\{id,isPublic:true,items:\{some:\{\}\}\}/);
  assert.match(trip,/excludeBuildId:trip\.id/);
  assert.match(pack,/excludeBuildId:pack\.id/);
});

test('Trip and pack linked views require recorded gear/days, and expose destination only by catalog ID', () => {
  const tripPage=read('app/discover/trips/[id]/page.tsx');
  const packPage=read('app/discover/packs/[id]/page.tsx');
  const tripUI=read('components/discover/PublicTripDetail.tsx');
  const packUI=read('components/discover/PublicPackDetail.tsx');
  assert.match(tripPage,/gearCount=\{trip\._count\.items\}/);
  assert.match(tripUI,/gearCount>0\?<Link href=\{relatedPackHref\(id\)\}/);
  assert.match(tripUI,/relatedDestinationHref\(destination\.id\)/);
  assert.match(packPage,/hasTrip=\{pack\.days\.length>0\}/);
  assert.match(packPage,/getDestination\(pack\.destinationId\)/);
  assert.match(packUI,/hasTrip&&<Link href=\{relatedTripHref\(pack\.id\)\}/);
  assert.match(packUI,/relatedDestinationHref\(destination\.id\)/);
});

test('Consistent Discover navigation is available on all three details',()=>{
  const ui=read('components/discover/DiscoverSectionNav.tsx');
  assert.match(ui,/href:"\/discover\/search"/);
  assert.match(ui,/href:"\/discover\/community"/);
  assert.doesNotMatch(ui,/Discover views|Saved\"/);
  for (const [file,section] of [
    ['DestinationDetail.tsx','destinations'],['PublicTripDetail.tsx','trips'],['PublicPackDetail.tsx','packs'],
  ]) assert.match(read('components/discover/'+file),new RegExp(`<DiscoverSectionNav active="${section}"`));
});

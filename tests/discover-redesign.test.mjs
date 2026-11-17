import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {parseFinderPreferences,recommendDestinations,finderEligible,sceneryMatches,DEFAULT_PREFERENCES} from '../lib/discover-finder.ts';
import {legacyDiscoverDestination} from '../lib/discover-navigation.ts';
import {parseDiscoverSearch,discoverUrl} from '../lib/discover.ts';
import {packBrowseHref,parsePackFilters} from '../lib/discover-packs.ts';
import {tripBrowseHref} from '../lib/discover-trips.ts';
import {savedUrl} from '../lib/discover-saved.ts';

const read=(rel)=>readFileSync(new URL('../'+rel,import.meta.url),'utf8');
const DESTINATIONS=JSON.parse(read('data/destinations.json'));

test('finder safely normalizes unsupported URL preferences and array inputs',()=>{
  assert.deepEqual(parseFinderPreferences({}),DEFAULT_PREFERENCES);
  assert.deepEqual(parseFinderPreferences({style:'overnight',area:'sea-to-sky',difficulty:['hard','easy'],scenery:'lakes',priority:'facilities'}),
    {style:'overnight',area:'sea-to-sky',difficulty:'hard',scenery:'lakes',priority:'facilities'});
  assert.deepEqual(parseFinderPreferences({style:'inject',area:'not-a-region',difficulty:'impossible',scenery:'unknown',priority:'random'}),DEFAULT_PREFERENCES);
});

test('overnight suggestions require both camping and backpacking on an explicit campground',()=>{
  const prefs={...DEFAULT_PREFERENCES,style:'overnight'};
  for(const row of DESTINATIONS.filter(d=>finderEligible(d,prefs))) {
    assert.equal(row.kind,'campground');assert.ok(row.activities.includes('camping'));assert.ok(row.activities.includes('backpacking'));
  }
  const results=recommendDestinations(DESTINATIONS,prefs);
  assert.ok(results.length>=1);
  for(const result of results) assert.equal(result.destination.kind,'campground');
  assert.equal(finderEligible(DESTINATIONS.find(d=>d.id==='garibaldi-lake-destination'),prefs),false);
});

test('day-hike suggestions exclude campgrounds with no listed hiking activity',()=>{
  const prefs={...DEFAULT_PREFERENCES,style:'day'};
  assert.ok(recommendDestinations(DESTINATIONS,prefs).every(x=>x.destination.activities.includes('hiking')));
});

test('region and difficulty are enforced, never softened to create recommendations',()=>{
  const prefs={...DEFAULT_PREFERENCES,area:'island',difficulty:'hard'};
  assert.ok(recommendDestinations(DESTINATIONS,prefs).every(x=>x.destination.region==='Vancouver Island'&&x.destination.difficulty==='hard'));
  const rows=DESTINATIONS.filter(d=>d.region==='Haida Gwaii');
  assert.deepEqual(recommendDestinations(rows,{...DEFAULT_PREFERENCES,area:'sea-to-sky'}),[]);
});

test('scenery preference is supported by catalog text, not guessed from region',()=>{
  for(const scenery of ['lakes','summits','forest','coast','meadows']) {
    const prefs={...DEFAULT_PREFERENCES,scenery};
    for(const entry of recommendDestinations(DESTINATIONS,prefs)) {
      assert.equal(entry.sceneryMatch,true);assert.ok(sceneryMatches(entry.destination,scenery));
      assert.ok(entry.reasons.some(reason=>reason.includes('catalog description')));
    }
  }
  assert.deepEqual(recommendDestinations(DESTINATIONS.filter(d=>d.kind==='summit'),{...DEFAULT_PREFERENCES,scenery:'coast'}).filter(x=>!sceneryMatches(x.destination,'coast')),[]);
});

test('recommendations are deterministic, capped and diverse by park where possible',()=>{
  const prefs={...DEFAULT_PREFERENCES,area:'sea-to-sky',scenery:'lakes'};
  const actual=recommendDestinations(DESTINATIONS,prefs);
  assert.ok(actual.length>0&&actual.length<=4);
  assert.deepEqual(actual.map(m=>m.destination.id),recommendDestinations([...DESTINATIONS].reverse(),prefs).map(m=>m.destination.id));
  assert.equal(new Set(actual.map(m=>m.destination.id)).size,actual.length);
  const one=recommendDestinations(DESTINATIONS,prefs,1);assert.equal(one.length,1);
  const empty=recommendDestinations([],prefs);assert.deepEqual(empty,[]);
});

test('finder reasons and cautions never misreport missing data as zero',()=>{
  const d=DESTINATIONS.find(x=>x.distanceKm===null&&x.elevationGainM===null);
  assert.ok(d);
  const result=recommendDestinations([d],DEFAULT_PREFERENCES)[0];
  assert.ok(result.cautions.some(t=>t.includes('distance missing')));
  assert.ok(result.cautions.some(t=>t.includes('Elevation gain missing')));
  assert.ok(!result.reasons.includes('Route distance listed'));
  const withFacilities=recommendDestinations([d],{...DEFAULT_PREFERENCES,priority:'facilities'})[0];
  if(d.foodStorage!=='yes'||d.toilet!=='yes')assert.ok(withFacilities.cautions.some(t=>t.includes('Facilities not fully confirmed')));
});

test('legacy Discover links redirect to canonical pages, carrying safe filter fields',()=>{
  const old=legacyDiscoverDestination({view:'destinations',q:'Alice & Lake',difficulty:'easy',page:'2',evil:'secret'});
  assert.ok(old.startsWith('/discover/search?'));
  const u=new URL(old,'http://localhost');assert.equal(u.searchParams.get('q'),'Alice & Lake');assert.equal(u.searchParams.has('evil'),false);
  assert.equal(legacyDiscoverDestination({view:'trips'}),'/discover/community');
  assert.equal(legacyDiscoverDestination({view:'packs'}),'/discover/community?type=packs');
  assert.equal(legacyDiscoverDestination({view:'saved',savedType:'trips'}),'/discover/saved?savedType=trips');
  assert.equal(legacyDiscoverDestination({q:'Munro Lake'}),'/discover/search?q=Munro+Lake');
  assert.equal(legacyDiscoverDestination({}),null);
});

test('new search, trip, pack and saved links use the dedicated routes',()=>{
  const d=discoverUrl({...parseDiscoverSearch({view:'destinations'}),q:'Garibaldi',page:2});
  assert.equal(new URL(d,'http://localhost').pathname,'/discover/search');
  assert.equal(new URL(d,'http://localhost').searchParams.get('page'),'2');
  assert.equal(new URL(tripBrowseHref({q:'lake',location:'',region:'',sort:'recent'},'all'),'http://localhost').pathname,'/discover/community');
  const p=packBrowseHref(parsePackFilters({packCategory:'Shelter'}));
  assert.equal(new URL(p,'http://localhost').searchParams.get('type'),'packs');
  assert.equal(savedUrl('packs'),'/discover/saved?savedType=packs');
});

test('home offers functional search and guided finder without a second tab bar',()=>{
  const home=read('components/discover/DiscoverHome.tsx');
  const head=read('components/discover/DiscoverHeader.tsx');
  const index=read('app/discover/page.tsx');
  assert.match(home,/action="\/discover\/search"/);
  assert.match(home,/href="\/discover\/find"/);
  assert.match(home,/href="\/discover\/community"/);
  assert.match(home,/href="\/discover\/saved"/);
  assert.doesNotMatch(head,/Discover views|\?view=/);
  assert.match(index,/legacyDiscoverDestination\(await searchParams\)/);
});

test('finder form is refreshable, has real results and routes to Planner setup',()=>{
  const ui=read('components/discover/AdventureFinder.tsx');
  const route=read('app/discover/find/page.tsx');
  assert.match(ui,/method="get" action="\/discover\/find#matches"/);
  for(const key of ['activity','area','difficulty','scenery','priority'])assert.match(ui,new RegExp(`name="${key}"`));
  assert.match(ui,/destinationHref\(d.id\)\}#plan-trip-heading/);
  assert.match(route,/recommendDestinations\(DESTINATIONS,preferences\)/);
  assert.doesNotMatch(route,/prisma\.|openai|fetch\(/i);
});

test('Search lists all matches instead of double-counting featured items on page one',()=>{
  const code=read('components/discover/DiscoverResultsServer.tsx');
  assert.match(code,/const listings = matching/);
  assert.match(code,/featuredDestinations=\{\[\]\}/);
  assert.match(code,/visibleIds = listings\.slice/);
  assert.match(code,/parseDiscoverSearch\(\{\.\.\.params, view: section\}\)/);
});

test('Community and Saved reuse published visibility checks and account-scoped bookmarks',()=>{
  const source=read('components/discover/DiscoverResultsServer.tsx');
  assert.match(source,/isPublic: true, days: \{some: \{\}\}/);
  assert.match(source,/isPublic:true,items:\{some:\{\}\}/);
  assert.match(source,/savedDestination\.findMany\(\{where:\{userId\}/);
  assert.match(source,/savedBuild\.findMany\(\{where:\{userId\}/);
  assert.doesNotMatch(source,/reservation:true|tripLogistics:true/);
});

test('global navbar does not duplicate Community above Discover, old direct URL redirects',()=>{
  assert.doesNotMatch(read('components/NavbarNavigation.tsx'),/name: "Community", href: "\/community"/);
  assert.match(read('app/community/page.tsx'),/permanentRedirect\("\/discover\/community"\)/);
});

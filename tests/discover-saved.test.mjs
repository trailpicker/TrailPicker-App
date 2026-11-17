import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {parseSavedSearch,filterSavedEntries,matchesSavedType,savedHref,savedUrl} from '../lib/discover-saved.ts';

const entries = [
  {id:'lake/1',kind:'destination',name:'Garibaldi Lake',subtitle:'Sea to Sky',savedAt:'2026-10-01T00:00:00.000Z',available:true},
  {id:'trip-1',kind:'trip',name:'Pinecone Burke Traverse',subtitle:'Coquitlam',savedAt:'2026-10-03T00:00:00.000Z',available:true,hasDays:true,hasItems:true},
  {id:'pack-1',kind:'pack',name:'Ultralight setup',subtitle:'Fraser Valley',savedAt:'2026-10-02T00:00:00.000Z',available:true,hasDays:false,hasItems:true},
  {id:'unavailable',kind:'pack',name:'Unavailable public plan',subtitle:'No longer public',savedAt:'2026-10-04T00:00:00.000Z',available:false,hasDays:false,hasItems:false},
];

test('saved URL parser normalizes malformed filters and pagination',()=>{
  assert.deepEqual(parseSavedSearch({savedType:'something',q:'  alpine  ',page:'-1'}),{type:'all',q:'alpine',page:1});
  assert.deepEqual(parseSavedSearch({savedType:['trips'],page:'5'}).type,'trips');
  assert.equal(parseSavedSearch({page:'not-a-number'}).page,1);
});
test('all saved items are unique and newest first',()=>{
  const result = filterSavedEntries(entries,{type:'all',q:'',page:1});
  assert.deepEqual(result.map(e=>e.id),['unavailable','trip-1','pack-1','lake/1']);
});
test('a public build with days AND gear appears in both filters without duplicates in all',()=>{
  assert.deepEqual(filterSavedEntries(entries,{type:'trips',q:'',page:1}).map(x=>x.id),['trip-1']);
  assert.deepEqual(filterSavedEntries(entries,{type:'packs',q:'',page:1}).map(x=>x.id),['trip-1','pack-1']);
  assert.equal(entries.filter(e=>e.id==='trip-1').length,1);
});
test('destination filter and case-insensitive search work together',()=>{
  assert.deepEqual(filterSavedEntries(entries,{type:'destinations',q:'SEA to SKY',page:1}).map(x=>x.id),['lake/1']);
  assert.equal(matchesSavedType(entries[2],'destinations'),false);
});
test('saved links point to correct pages and URL-encode IDs',()=>{
  assert.equal(savedHref(entries[0]),'/discover/destinations/lake%2F1');
  assert.equal(savedHref(entries[1]),'/discover/trips/trip-1');
  assert.equal(savedHref(entries[1],'packs'),'/discover/packs/trip-1');
  assert.equal(savedHref(entries[2]),'/discover/packs/pack-1');
});
test('unpublished bookmarks cannot link to private builds',()=>{
  assert.equal(savedHref(entries[3]),null);
});
test('saved filter URLs encode query strings and preserve page',()=>{
  assert.equal(savedUrl('trips','Burke & lake',2),'/discover/saved?savedType=trips&q=Burke+%26+lake&page=2');
});
test('schema uses account ownership and a uniqueness constraint',()=>{
  const schema=readFileSync(new URL('../prisma/schema.prisma',import.meta.url),'utf8');
  assert.match(schema,/model SavedDestination\s*\{/);
  assert.match(schema, /@@id\(\[userId, destinationId\]\)/);
  assert.match(schema,/user User @relation\(fields: \[userId\], references: \[id\], onDelete: Cascade\)/);
});
test('saving destinations uses signed-in identity and validates catalog on add',()=>{
  const actions=readFileSync(new URL('../app/discover/actions.ts',import.meta.url),'utf8');
  const handler=actions.split('export async function changeSavedDestination')[1].split('export async function copyPublicBuild')[0];
  assert.match(handler,/await currentBuildUserId\(\)/);
  assert.match(handler,/getDestination\(rawId\)/);
  assert.match(handler,/savedDestination\.upsert/);
  assert.match(handler,/savedDestination\.deleteMany/);
});
test('saved items are fetched by account, and private builds are sanitized',()=>{
  const source=readFileSync(new URL('../components/discover/DiscoverResultsServer.tsx',import.meta.url),'utf8');
  const handler=source.split('if (filters.view === "saved")')[1].split('if (filters.view === "destinations")')[0];
  assert.match(handler,/savedDestination\.findMany\(\{where:\{userId\}/);
  assert.match(handler,/savedBuild\.findMany\(\{where:\{userId\}/);
  assert.match(handler,/const available = row\.build\.isPublic/);
  assert.match(handler,/name:available\?row\.build\.name:"Unavailable public plan"/);
});

import assert from 'node:assert/strict';
import test from 'node:test';
import {parseDiscoverSearch,discoverUrl,filterDiscoverDestinations,isUnfilteredDestinationSearch,SPOTLIGHT_IDS,summarizePublicBuild} from '../lib/discover.ts';
import {getDiscoverPhoto,discoverPhotoUrl,discoverPhotoSource} from '../lib/discover-photos.ts';

const rows = [
  {id:'lake',name:'Alpine Lake',kind:'lake',park:'Park 1',region:'Sea to Sky',difficulty:'moderate',distanceKm:8,elevationGainM:400,featured:true,summary:'Alpine lake',activities:['hiking','backpacking']},
  {id:'camp',name:'Backcountry Camp',kind:'campground',park:'Park 1',region:'Sea to Sky',difficulty:'hard',distanceKm:6,elevationGainM:null,featured:true,summary:'Camping site',activities:['backpacking','camping']},
  {id:'falls',name:'Waterfall',kind:'waterfall',park:'Park 2',region:'Lower Mainland',difficulty:'easy',distanceKm:2,elevationGainM:50,featured:false,summary:'Forest waterfall',activities:['hiking']},
  {id:'old',name:'Old Camp',park:'Park 2',region:'Lower Mainland',difficulty:'easy',distanceKm:null,elevationGainM:null,featured:false,summary:'Older entry'},
];
const defaults = {q:'',region:'',difficulty:'all',activity:'all',category:'all',sort:'popular'};
test('the new URL params are sanitized and remain sharable',()=>{
  const parsed = parseDiscoverSearch({view:'destinations',category:'lake',activity:'hiking',region:'Sea to Sky',page:'3'});
  assert.equal(parsed.category,'lake');assert.equal(parsed.activity,'hiking');assert.equal(parsed.page,3);
  assert.equal(parseDiscoverSearch({category:'sneaky',activity:'bogus'}).category,'all');
  assert.equal(parseDiscoverSearch({activity:'paddling'}).activity,'paddling');
  const url = discoverUrl(parsed,{q:'Garibaldi Lake',page:2});
  const params = new URL(url,'https://trailpicker.app').searchParams;
  assert.equal(params.get('q'),'Garibaldi Lake');assert.equal(params.get('activity'),'hiking');
  assert.equal(params.get('category'),'lake');assert.equal(params.get('page'),'2');
});
test('filter by activity and place type without guessing for old rows',()=>{
  assert.deepEqual(filterDiscoverDestinations(rows,{...defaults,activity:'camping'}).map(x=>x.id),['camp','old']);
  assert.deepEqual(filterDiscoverDestinations(rows,{...defaults,activity:'hiking',category:'lake'}).map(x=>x.id),['lake']);
  assert.deepEqual(filterDiscoverDestinations(rows,{...defaults,activity:'hiking',category:'waterfall'}).map(x=>x.id),['falls']);
  assert.deepEqual(filterDiscoverDestinations(rows,{...defaults,category:'campground'}).map(x=>x.id),['camp','old']);
  assert.deepEqual(filterDiscoverDestinations(rows,{...defaults,region:'Lower Mainland',difficulty:'easy'}).map(x=>x.id),['old','falls']);
});
test('spotlight eligibility is limited to default view, and ids do not repeat',()=>{
  assert.equal(isUnfilteredDestinationSearch(defaults),true);
  assert.equal(isUnfilteredDestinationSearch({...defaults,category:'lake'}),false);
  assert.equal(new Set(SPOTLIGHT_IDS).size,SPOTLIGHT_IDS.length);
});
test('photo metadata cites the actual file and uses park-level label where needed',()=>{
  const photo = getDiscoverPhoto({id:'garibaldi-lake-destination',kind:'lake',park:'Garibaldi Park'});
  assert.ok(photo);assert.equal(photo.representative,undefined);
  assert.ok(discoverPhotoUrl(photo).startsWith('https://commons.wikimedia.org/wiki/Special:FilePath/'));
  assert.ok(discoverPhotoSource(photo).includes('Garibaldi'));
  assert.ok(getDiscoverPhoto({id:'random',kind:'campground',park:'Mount Robson Park'})?.representative);
  assert.equal(getDiscoverPhoto({id:'munro-lake-pinecone-burke',kind:'lake',park:'Pinecone Burke Park'}),null);
});
test('community pack calculations still exclude worn and consumable',()=>{
 const total=summarizePublicBuild([{quantity:2,isWorn:false,isConsumable:false,weightSnapshot:250,gear:null},{quantity:1,isWorn:true,isConsumable:false,weightSnapshot:200,gear:null}],[]);
 assert.equal(total.baseWeightG,500);assert.equal(total.itemCount,3);
});

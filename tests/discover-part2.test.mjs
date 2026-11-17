import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const read=path=>readFileSync(new URL('../'+path,import.meta.url),'utf8');

test('finder uses the same Lucide activity icons and filter pill treatment as destination search',()=>{
  const finder=read('components/discover/AdventureFinder.tsx');
  const search=read('components/discover/DiscoverLanding.tsx');
  for(const icon of ['Compass','Footprints','Backpack','Tent','Waves']){
    assert.match(finder,new RegExp(`\\b${icon}\\b`));
    assert.match(search,new RegExp(`\\b${icon}\\b`));
  }
  for(const label of ['Everything','Hiking','Backpacking','Camping','Paddling']){
    assert.match(finder,new RegExp(`label:"${label}"`));
    assert.match(search,new RegExp(`label: "${label}"`));
  }
  assert.match(finder,/peer-checked:bg-green-900/);
  assert.match(finder,/name="activity"/);
  assert.doesNotMatch(finder,/name="style"|name="style" value/);
  assert.doesNotMatch(finder,/Preferred activity|What kind of outing/);
});

test('scenery has Lucide icons instead of handdrawn SVGs or emoji',()=>{
  const icons=read('components/discover/SceneryIcon.tsx');
  for(const icon of ['Compass','Waves','Mountain','Trees','Sailboat','Flower2'])assert.match(icons,new RegExp(`\\b${icon}\\b`));
  assert.doesNotMatch(icons,/<svg|<path|<circle|[\u{1F300}-\u{1FAFF}]/u);
});

test('question numbers are sequential 1-10 and section number badges are gone',()=>{
  const finder=read('components/discover/AdventureFinder.tsx');
  const matches=[...finder.matchAll(/(?:label="|<legend[^>]*>)(\d+)\.\s/g)].map(m=>Number(m[1]));
  assert.deepEqual(matches,[1,2,3,4,5,6,7,8,9,10]);
  assert.doesNotMatch(finder,/<GroupHeading number=|\{number\}/);
});

test('three destination detail actions share height, font size, padding',()=>{
  const detail=read('components/discover/DestinationDetail.tsx');
  const save=read('components/discover/DestinationSaveButton.tsx');
  const share=read('components/discover/ShareDestinationButton.tsx');
  assert.match(detail,/h-11 items-center/);
  assert.match(save,/h-11 px-4 text-sm/g);
  assert.match(share,/h-11 items-center/);
  assert.match(share,/px-4 py-2 text-sm/);
});

test('Discover OSM map zooms only with Ctrl+wheel and ordinary scrolling remains free',()=>{
  const map=read('components/discover/DiscoverLocationMapInner.tsx');
  assert.match(map,/if\(!event\.ctrlKey\)/);
  assert.match(map,/event\.preventDefault\(\)/);
  assert.match(map,/map\.setZoomAround\(/);
  assert.match(map,/passive:false/);
  assert.match(map,/scrollWheelZoom=\{false\}/);
  assert.match(map,/<CtrlWheelZoom\/>/);
  assert.match(map,/Ctrl \+ scroll to zoom/);
});

test('text-only public trip hero is content-sized; photos retain room',()=>{
  const pub=read('components/discover/PublicTripDetail.tsx');
  assert.match(pub,/photo \? "min-h-\[210px\] sm:min-h-\[260px\]" : ""/);
  assert.doesNotMatch(pub,/sm:min-h-\[330px\]|min-h-52/);
  assert.match(pub,/Public community itinerary/i);
});

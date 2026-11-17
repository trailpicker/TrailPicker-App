import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { gearBrowseColumns, gearBrowseColumnsForItems, gearColumnValue, gearDetailRows } from '../lib/gear-spec-display.ts';
import { getComparisonRows } from '../lib/gear-comparison.ts';

const fixture = (category, subcategory, overrides = {}) => ({
  category: { slug: category, id: category, name: category },
  subcategory: subcategory ? { slug: subcategory, name: subcategory } : null,
  weight_g: 800, price_cad: 200, capacity_l: null, frame_type: null, waterproof: null,
  temperature_rating: null, season: null, material: null, specifications: [],
  brand: { name: 'Example' }, prices: [], reviews: [], id: 'item', name: 'Example',
  ...overrides,
});
const headers = (cat, sub) => gearBrowseColumns(cat, sub).map(col => col.label);
const rows = product => Object.fromEntries(gearDetailRows(product));

test('catalog columns depend on category and selected subcategory', () => {
  assert.deepEqual(headers('packs'), ['Volume', 'Frame', 'Load rating']);
  assert.deepEqual(headers('shelter', 'tent'), ['Sleeps', 'Season', 'Waterproof']);
  assert.deepEqual(headers('shelter', 'tarp'), ['Dimensions', 'Material', 'Waterproof']);
  assert.deepEqual(headers('sleep', 'sleeping-pad'), ['R-value', 'Packed size', 'Material']);
  assert.deepEqual(headers('sleep', 'sleeping-bag'), ['Temperature', 'Fill', 'Season']);
  assert.deepEqual(headers('cooking', 'cookware'), ['Volume', 'Material', 'Dimensions']);
  assert.deepEqual(headers('water', 'filter'), ['Filter type', 'Flow rate', 'Packed size']);
  assert.deepEqual(headers('water', 'bottle'), ['Volume', 'Material', 'Packed size']);
  for (const cat of ['packs','shelter','sleep','cooking','water','clothing','electronics','misc']) {
    assert.equal(gearBrowseColumns(cat).length, 3);
  }
});

test('catalog replaces entirely blank columns with relevant recorded fields', () => {
  const pack = fixture('packs', 'frameless', { capacity_l:40, frame_type:'frameless', material:'Nylon' });
  assert.deepEqual(gearBrowseColumnsForItems('packs', 'frameless', [pack]).map(c=>c.label), ['Volume','Frame','Material']);
  const without = fixture('packs', 'frameless', { capacity_l:40 });
  assert.deepEqual(gearBrowseColumnsForItems('packs', 'frameless', [without]).map(c=>c.label), ['Volume','Frame','Load rating']);
});

test('legacy tent litres never become sleeping occupancy', () => {
  const tent = fixture('shelter', 'tent', {capacity_l:2, season:'3-season', specifications:[]});
  assert.equal(gearColumnValue(tent, 'volume'), null);
  assert.equal(gearColumnValue(tent, 'sleepingCapacity'), null);
  assert(!JSON.stringify(rows(tent)).includes('2 L'));
  tent.specifications = [{key:'Sleeping capacity',value:'2',unit:'people'}];
  assert.equal(gearColumnValue(tent, 'sleepingCapacity'), '2 people');
  assert.equal(rows(tent)['Sleeps'], '2 people');
  const comparison = getComparisonRows([tent, {...tent,id:'2',specifications:[{key:'Sleeping capacity',value:'1',unit:'person'}]}]);
  assert.equal(comparison.some(row=>row.key==='capacity'),false);
  assert.deepEqual(comparison.find(row=>row.key==='field:sleepingCapacity')?.values,['2 people','1 person']);
  assert.equal(comparison.some(row=>row.key==='spec:sleeping capacity'),false);
});

test('pack volume and water storage use litres only for volume-bearing products', () => {
  const pack = fixture('packs','frameless',{capacity_l:40,frame_type:'frameless'});
  assert.equal(gearColumnValue(pack,'volume'),'40 L');
  assert.equal(gearColumnValue(fixture('water','bottle',{capacity_l:1}),'volume'),'1 L');
  assert.equal(gearColumnValue(fixture('water','filter',{capacity_l:1}),'volume'),null);
  assert.equal(gearColumnValue(fixture('cooking','stove',{capacity_l:1}),'volume'),null);
  assert.equal(gearColumnValue(fixture('cooking','cookware',{capacity_l:1.4}),'volume'),'1.4 L');
  assert.deepEqual(getComparisonRows([]),[]);
  const compare=getComparisonRows([pack,{...pack,id:'other',capacity_l:55}]);
  assert.equal(compare.find(row=>row.key==='capacity')?.label,'Pack volume');
  assert.deepEqual(compare.find(row=>row.key==='capacity')?.bestIndices,[1]);
});

test('pads show R-value; bags show temperature; missing values stay unknown', () => {
  const pad=fixture('sleep','sleeping-pad',{capacity_l:12,specifications:[{key:'R-value',value:'4.2',unit:null}]});
  assert.equal(gearColumnValue(pad,'rValue'),'4.2');
  assert.equal(gearColumnValue(pad,'volume'),null);
  assert(!rows(pad).Volume);
  const bag=fixture('sleep','sleeping-bag',{temperature_rating:-7});
  assert.equal(gearColumnValue(bag,'temperature'),'-7 °C');
  assert.equal(gearColumnValue(pad,'temperature'),null);
  assert.equal(gearColumnValue(fixture('electronics','headlamp'),'battery'),null);
});

test('spec aliases deduplicate product detail and comparison rows', () => {
  const p=fixture('electronics','power-bank',{specifications:[{key:'Battery_Capacity',value:'10000',unit:'mAh'}]});
  assert.equal(rows(p).Battery,'10000 mAh');
  assert.equal(gearDetailRows(p).filter(([key])=>key.toLowerCase().includes('battery')).length,1);
  const compared=getComparisonRows([p,{...p,id:'other',specifications:[{key:'battery-capacity',value:'20000',unit:'mAh'}]}]);
  assert.equal(compared.some(row=>row.key==='spec:battery capacity'),false);
  assert.deepEqual(compared.find(row=>row.key==='field:battery')?.values,['10000 mAh','20000 mAh']);
});

test('catalog uses a shared column definition, and seed backfills only the two legacy tent rows', () => {
  const catalog=readFileSync(new URL('../components/builder/GearPicker.tsx',import.meta.url),'utf8');
  const seed=readFileSync(new URL('../prisma/seed.ts',import.meta.url),'utf8');
  assert.match(catalog,/gearBrowseColumnsForItems\(categoryData\.slug, selected\?\.slug/);
  assert.match(catalog,/displayColumns\.map\(/);
  assert.doesNotMatch(catalog, /<div className="text-center">Capacity<\/div>/);
  assert.match(seed,/capacity_l:null, sleepingCapacity:1/);
  assert.match(seed,/capacity_l:null, sleepingCapacity:2/);
  assert.match(seed,/existing\.capacity_l === gear\.sleepingCapacity/);
  assert.match(seed,/existing\.categoryId === categoryIds\.get\("shelter"\)/);
  assert.match(seed,/specifications: \{ create:/);
});

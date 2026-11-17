import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {parsePackFilters, packBrowseHref, packHref, summarizePack, formattedKg, formattedCad} from '../lib/discover-packs.ts';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const read=(file)=>fs.readFileSync(path.join(root,file),'utf8');
function gear(weight, price, category='Packs') {return {weight_g:weight,price_cad:price,category:{name:category}};}
function item(extra={}) {return {quantity:1,isWorn:false,isConsumable:false,weightSnapshot:null,priceSnapshot:null,customCategory:null,gear:gear(1000,100),...extra};}

test('Pack filters reject unsupported, harmful and unbounded input',()=>{
 const value=parsePackFilters({view:'packs',q:[' full ', 'discarded'],packCategory:'Not A Category',packPeople:'9999',minBaseKg:'-1',maxBaseKg:'Infinity',maxCostCad:'NaN',sort:'inject SQL;',page:'-20'});
 assert.equal(value.q,'full');assert.equal(value.category,'');assert.equal(value.people,null);
 assert.equal(value.minBaseKg,null);assert.equal(value.maxBaseKg,null);assert.equal(value.maxCostCad,null);
 assert.equal(value.sort,'recent');assert.equal(value.page,1);
});
test('Valid pack filter URLs survive refresh and preserve zero-cost limit',()=>{
 const filters=parsePackFilters({view:'packs',q:'tent',packCategory:'Shelter',packPeople:'2',minBaseKg:'1.5',maxBaseKg:'5',maxCostCad:'0',sort:'lightest',page:'3'});
 assert.equal(filters.minBaseKg,1.5);assert.equal(filters.maxCostCad,0);
 const link=packBrowseHref(filters,{page:2});
 const decoded=parsePackFilters(Object.fromEntries(new URL('https://x.test'+link).searchParams));
 assert.deepEqual(decoded,{...filters,page:2});
 assert.equal(packHref('odd /id'),'/discover/packs/odd%20%2Fid');
});
test('Summary separates base/worn/consumable weights and quantities',()=>{
 const data=summarizePack([
  item({quantity:2}),item({quantity:1,isWorn:true,gear:gear(250,20,'Clothing')}),
  item({quantity:3,isConsumable:true,gear:gear(100,5,'Cooking')})
 ]);
 assert.equal(data.itemCount,6);assert.equal(data.baseWeightG,2000);assert.equal(data.wornWeightG,250);
 assert.equal(data.consumableWeightG,300);assert.equal(data.totalWeightG,2550);assert.equal(data.costCad,235);
 assert.equal(data.categoryCount,3);
 assert.equal(formattedKg(2500),'2.50 kg');assert.match(formattedCad(25),/25/);
});
test('Unknown weights and costs stay unknown even with known partial totals',()=>{
 const data=summarizePack([item(),item({quantity:2,gear:gear(null,null),weightSnapshot:null,priceSnapshot:null})]);
 assert.equal(data.baseWeightG,null);assert.equal(data.knownBaseG,1000);assert.equal(data.unknownBaseCount,2);
 assert.equal(data.costCad,null);assert.equal(data.knownCostCad,100);assert.equal(data.unknownCostCount,2);
});
test('Snapshotted custom items and gear-category selection remain usable',()=>{
 const custom=summarizePack([item({gear:null,weightSnapshot:340,priceSnapshot:19,customCategory:'Shelter',quantity:2})]);
 assert.equal(custom.baseWeightG,680);assert.equal(custom.costCad,38);
 assert.deepEqual(custom.categories,[['Shelter',2]]);
});
test('Builds view queries public builds with gear, uses database pagination and parameterized SQL',()=>{
 const page=read('components/discover/DiscoverResultsServer.tsx');const query=read('lib/discover-packs-query.ts');
 assert.match(page,/if \(filters\.view === "packs"\)/);assert.match(page,/queryPublicPackIds\(packFilters\)/);
 assert.match(page,/isPublic:true,items:\{some:\{\}\}/);
 assert.match(query,/WHERE b\."isPublic" = TRUE/);
 assert.match(query,/Prisma\.sql/);assert.match(query,/Prisma\.join\(terms, " AND "\)/);
 assert.match(query,/LIMIT \$\{PACK_PAGE_SIZE\} OFFSET/);
 assert.match(query,/"missingBase" = 0/);assert.match(query,/"missingCost" = 0/);
 assert.doesNotMatch(query,/\$queryRawUnsafe/);
});
test('Public build detail denies nonpublic and omits owner notes and bookings',()=>{
 const page=read('app/discover/packs/[id]/page.tsx');const ui=read('components/discover/PublicPackDetail.tsx');
 assert.match(page,/where:\{id,isPublic:true,items:\{some:\{\}\}\}/);
 assert.doesNotMatch(page,/(tripLogistics|routeWaypoints|reservation:true|notes:true|email:true)/);
 assert.match(page,/evaluateCompatibility\(/);
 assert.match(ui,/Gear compatibility notes/);assert.match(ui,/PackActions/);
});
test('Saved action revalidates pack details and reuse copies private',()=>{
 const code=read('app/discover/actions.ts');
 assert.match(code,/revalidatePath\(`\/discover\/packs\/\$\{encodeURIComponent\(id\)\}`\)/);
 assert.match(code,/isPublic: false/);
 assert.match(code,/copyPublicBuild/);
 assert.match(code,/Never duplicate private logistics/);
});

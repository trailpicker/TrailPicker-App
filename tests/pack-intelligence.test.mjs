import {test} from 'node:test';
import assert from 'node:assert/strict';
import { evaluatePackIntelligence, parseEcccEvidence, projectConsumables } from '../lib/pack-intelligence.ts';
const build=(o={})=>({people:1,minTemperature:null,conditions:null,startDate:null,endDate:null,...o});
const item=(id,cat,weight=400,extras={})=>({id,quantity:1,isConsumable:false,isWorn:false,customCategory:cat,gearNameSnapshot:id,weightSnapshot:weight,priceSnapshot:null,gear:null,...extras});
const dates=[{date:new Date('2026-11-02'),minTemperature:null,conditions:null,waterCarryL:null,waterSource:null,distanceKm:null,elevationGainM:null,campsite:null}];
const byId=(result,id)=>result.findings.find(f=>f.id===id);
const overnightDays=[{...dates[0],campsite:'Planned campsite'}];

test('sleep temperature comparison reports review, not certain danger, when rating is warmer',()=>{
 const sleep=item('quilt','Sleep',500,{gear:{id:'q',name:'Quilt',weight_g:500,price_cad:null,capacity_l:null,frame_type:null,waterproof:null,temperature_rating:5,season:null,category:{name:'Sleep'},subcategory:{name:'Quilt',slug:'quilt'}}});
 const r=evaluatePackIntelligence(build({minTemperature:-4}),[sleep],overnightDays);
 assert.equal(byId(r,'gear-sleep-rating-review-quilt').level,'review');
 assert.match(byId(r,'gear-sleep-rating-review-quilt').detail,/rating type and full sleep system/i);
 assert.equal(r.coldest,-4);
});
test('an unknown sleep rating is unknown and never treated as unsafe or warm enough',()=>{
 const unrated=item('s','Sleep',400,{gear:{id:'s',name:'Unrated quilt',weight_g:400,price_cad:null,capacity_l:null,frame_type:null,waterproof:null,temperature_rating:null,season:null,category:{name:'Sleep'},subcategory:{name:'Quilt',slug:'quilt'}}});
 const r=evaluatePackIntelligence(build({minTemperature:-4}),[unrated],overnightDays);
 assert.equal(byId(r,'gear-sleep-rating-unknown').level,'unknown');
 assert.equal(r.findings.some(f=>f.id==='gear-sleep-rating-review-s'),false);
});
test('weather evidence is date-scoped; alerts and strong gusts are reported',()=>{
 const data={daily:[{date:'2026-11-02',low:-9,high:2,gust:75,pop:85,model:'HRDPS',samples:6},{date:'2026-11-03',low:-15,high:0,gust:5,pop:30,model:'RDPS',samples:4}],alerts:{status:'ok',items:[{title:'Wind warning'}]}};
 const point={name:'Camp',lat:50,lng:-122,elevationM:1800};
 const evidence=parseEcccEvidence(data,point,['2026-11-02']);
 assert.equal(evidence.days.length,1);assert.equal(evidence.days[0].low,-9);
 assert.equal(evidence.point.lat,50);assert.equal(evidence.days[0].pop,85);
 const shelter=item('tent','Shelter',900,{gear:{id:'tent',name:'Tent',weight_g:900,price_cad:null,capacity_l:null,frame_type:null,waterproof:false,temperature_rating:null,season:'3-season',category:{name:'Shelter'},subcategory:{name:'Tent',slug:'tent'}}});
 const r=evaluatePackIntelligence(build(),[shelter],dates,evidence);
 assert.equal(byId(r,'alerts-active').level,'critical');
 assert.ok(byId(r,'strong-gust'));
 // A forecast alone must not silently become a user-entered wet-weather condition.
 assert.equal(byId(r,'gear-shelter-wet-weather'),undefined);
 const wet=evaluatePackIntelligence(build({conditions:'rain'}),[shelter],dates,evidence);
 assert.equal(byId(wet,'gear-shelter-wet-weather').level,'review');
});
test('alerts unavailable is not an all-clear',()=>{
 const point={name:'Camp',lat:50,lng:-122,elevationM:null};
 const evidence=parseEcccEvidence({daily:[],alerts:{status:'unavailable',items:[]}},point,[]);
 const r=evaluatePackIntelligence(build(),[],dates,evidence);
 assert.equal(byId(r,'alerts-unavailable').level,'unknown');
});
test('missing categories require overnight context except packs',()=>{
 const day={...dates[0],campsite:null};
 const dayCamping={...day,campsite:'Alice'};
 const daytrip=evaluatePackIntelligence(build(),[],[day]);
 assert.equal(!!byId(daytrip,'gear-missing-shelter'),false);
 const camping=evaluatePackIntelligence(build(),[item('water','Water')],[dayCamping]);
 assert.equal(byId(camping,'gear-missing-shelter').level,'review');
});
test('unknown weight never counts as known zero',()=>{
 const r=evaluatePackIntelligence(build(),[item('unknown','Misc',null)],dates);
 assert.equal(r.pack.unknownWeightUnits,1);
 assert.equal(byId(r,'unknown-weight').level,'unknown');
});
test('solo duplicates trigger review prompts without recommending dangerous removals',()=>{
 const duplicateGear={id:'one',name:'Pack',category:{name:'Packs'},weight_g:1500,price_cad:100,capacity_l:50,frame_type:null,waterproof:null,temperature_rating:null,season:null};
 const r=evaluatePackIntelligence(build(),[item('a','Packs',1500,{quantity:2,gear:duplicateGear})],dates);
 assert.equal(byId(r,'duplicate-one').level,'opportunity');
 assert.match(byId(r,'duplicate-one').action,/Confirm/);
});
test('consumables scenario is bounded, never generates negative mass',()=>{
 const r=projectConsumables(1200,4,0.4);
 assert.deepEqual(r.map(d=>d.remainingGrams),[1200,720,240,0,0]);
 assert.equal(projectConsumables(100,300,1).length,31);
});
test('missing live forecast is visible on overnight trips',()=>{
 const r=evaluatePackIntelligence(build({startDate:new Date('2026-10-01'),endDate:new Date('2026-10-03')}),[],dates);
 assert.equal(byId(r,'forecast-not-loaded').level,'unknown');
});
test('does not hallucinate waterproofing or unsafe equipment from missing specifications',()=>{
 const r=evaluatePackIntelligence(build({conditions:'rain'}),[item('tent','Shelter')],dates);
 assert.equal(byId(r,'gear-shelter-waterproof-unknown').level,'unknown');
 assert.equal(!!byId(r,'gear-shelter-wet-weather'),false);
});

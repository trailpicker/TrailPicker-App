import test from 'node:test';
import assert from 'node:assert/strict';
import { emptyFoodPlan } from '../lib/food-plan.ts';
import { parseLogistics } from '../lib/build-validation.ts';
import { exportPackCsv, printableTripHtml } from '../lib/trip-resources-export.ts';
import { emptyLogistics } from '../lib/trip-planner.ts';

const plan = { ...emptyFoodPlan(), foods: [{id:'f',name:'=Sensitive name',gramsPerUnit:180,startingUnits:2,countInPack:true}],
  meals:[{id:'m',dayId:'d',slot:'dinner',foodId:'f',units:1,heated:false}],
  resupplies:[{id:'r',waypointId:'rs',foodId:'f',units:2,fuelGrams:0}],
};
test('phase7 survives logistics import validation with mapped route/day references',()=>{
  const parsed=parseLogistics({...emptyLogistics,phase7:plan},['d'],[],['rs']);
  assert.deepEqual(parsed?.phase7,plan);
  assert.equal(parsed?.phase6,undefined);
  assert.throws(()=>parseLogistics({...emptyLogistics,phase7:plan},['d'],[],[]),/Resupply/);
});
test('packing CSV and print view show planned food without raw formula execution',()=>{
  const payload={name:'Test',packLines:[],days:[{id:'d',date:new Date('2026-06-01T12:00:00Z'),startLocation:null,endLocation:null,notes:null}],
    points:[],logistics:emptyLogistics,bookings:[],foodPlan:plan};
  const csv=exportPackCsv(payload);
  assert.match(csv, /'=(Sensitive name|Sensitive name)/);
  assert.match(csv, /Planned food/);
  const html=printableTripHtml(payload);
  assert.match(html,/Food &amp; meals/);
  assert.match(html,/Day 1 · dinner/);
  assert.match(html,/=Sensitive name/);
});
test('private plans are optional to Phase 6 exports',()=>{
  const csv=exportPackCsv({packLines:[]});
  assert.match(csv,/Item/);
});

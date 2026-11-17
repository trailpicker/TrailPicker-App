import test from 'node:test';
import assert from 'node:assert/strict';
import { readFoodPlan, validateFoodPlan, projectFoodPlan, emptyFoodPlan } from '../lib/food-plan.ts';

const make = () => ({
  foods: [
    { id:'rice',name:'Rice packet',gramsPerUnit:100,startingUnits:3,countInPack:true },
    { id:'bars',name:'Snack bar',gramsPerUnit:50,startingUnits:2,countInPack:true },
  ],
  meals:[{id:'m1',dayId:'d1',slot:'dinner',foodId:'rice',units:1,heated:true},
    {id:'m2',dayId:'d2',slot:'lunch',foodId:'bars',units:1,heated:false}],
  resupplies:[{id:'r1',waypointId:'s1',foodId:'rice',units:2,fuelGrams:60}],
  settings:{...emptyFoodPlan().settings,startingFuelGrams:30,otherDailyUseGrams:10},
});
const route=[{id:'s1',kind:'resupply',dayId:'d2'}];
test('valid phase7 plan and private serialization',()=>{
  const p=make();assert.deepEqual(validateFoodPlan(p,['d1','d2'],route),p);
  assert.deepEqual(readFoodPlan({phase7:p}),p);
  assert.deepEqual(readFoodPlan(null),emptyFoodPlan());
});
test('daily timeline uses actual meal units and mapped resupply day',()=>{
  const summary=projectFoodPlan(make(),['d1','d2'],route,1200,200);
  assert.equal(summary.startingFoodKnownGrams,400);
  assert.equal(summary.initialCarriedKnownGrams,1830);
  assert.equal(summary.days[0].packStartKnownGrams,1830);
  assert.equal(summary.days[0].packEndKnownGrams,1708); // 100 g meal + 12 g fuel + 10 other
  assert.equal(summary.days[1].foodAddedGrams,200);
  assert.equal(summary.days[1].fuelAddedGrams,60);
  assert.equal(summary.days[1].packStartKnownGrams,1968);
  assert.equal(summary.days[1].packEndKnownGrams,1908); // 50 g snack + 10 other
  assert.equal(summary.fuelNeededGrams,12);
});
test('resupply follows reassigned route day without changing saved resupply',()=>{
  const p=make(), summary=projectFoodPlan(p,['d1','d2'],[{...route[0],dayId:'d1'}],0,0);
  assert.equal(summary.days[0].foodAddedGrams,200);
  assert.equal(summary.days[1].foodAddedGrams,0);
});
test('unassigned resupply does not invent arrival or mass',()=>{
  const summary=projectFoodPlan(make(),['d1','d2'],[{...route[0],dayId:null}],0,0);
  assert.equal(summary.orphanedResupplies,1);
  assert.equal(summary.totalFuelSuppliedGrams,30);
  assert.equal(summary.days[1].foodAddedGrams,0);
});
test('insufficient food and fuel produce explicit shortfall',()=>{
  const p=make();p.foods[0].startingUnits=0;p.resupplies=[];p.settings.startingFuelGrams=3;
  const result=projectFoodPlan(p,['d1','d2'],route,0,0);
  assert.equal(result.days[0].shortfalls[0].missingUnits,1);
  assert.equal(result.days[0].fuelShortfallGrams,9);
  assert.equal(result.days[0].foodConsumedGrams,0);
});
test('unknown food mass is not silently represented as complete',()=>{
  const p=make();p.foods[0].gramsPerUnit=null;
  const result=projectFoodPlan(p,['d1','d2'],route,0,0);
  assert.equal(result.missingFoodWeights,true);
  assert.equal(result.days[0].foodStartGrams,null);
});
test('food already in Builder can be excluded from double counted mass',()=>{
  const p=make();p.foods[0].countInPack=false;p.settings.countFuelInPack=false;
  const result=projectFoodPlan(p,['d1','d2'],route,500,400);
  assert.equal(result.initialCarriedKnownGrams,1000); // base + existing builder + only snack bars
});
test('invalid day, stop, duplicate food and unreasonable mass rejected',()=>{
  const p=make();p.meals[0].dayId='deleted';
  assert.throws(()=>validateFoodPlan(p,['d1','d2'],route),/Invalid meal/);
  p.meals[0].dayId='d1';p.resupplies[0].waypointId='deleted';
  assert.throws(()=>validateFoodPlan(p,['d1','d2'],route),/Resupply/);
  p.resupplies[0].waypointId='s1';p.foods.push({...p.foods[0]});
  assert.throws(()=>validateFoodPlan(p,['d1','d2'],route),/Duplicate food/);
  p.foods.pop();p.foods[0].gramsPerUnit=-1;
  assert.throws(()=>validateFoodPlan(p,['d1','d2'],route),/Invalid food/);
});
test('cannot forge arbitrary object fields or invalid fuel settings',()=>{
  const p=make();p.settings.extra='ignore';
  assert.throws(()=>validateFoodPlan(p,['d1','d2'],route),/Invalid fuel/);
  delete p.settings.extra;p.settings.fuelAdjustment=100;
  assert.throws(()=>validateFoodPlan(p,['d1','d2'],route),/Invalid fuelAdjustment/);
});
test('read tolerates invalid legacy contents',()=>{
  const plan=readFoodPlan({phase7:{foods:[{id:3,name:'bad'}],meals:[{bad:true}],resupplies:[null]}});
  assert.equal(plan.foods.length,0);
  assert.equal(plan.meals.length,0);
  assert.equal(plan.settings.startingFuelGrams,0);
});

import assert from 'node:assert/strict';
import { test } from 'node:test';
import { projectConsumableLoad } from '../lib/consumables-model.ts';

test('daily use reduces mass and does not invent negative loads',()=>{
  const days=projectConsumableLoad(600,4,250);
  assert.deepEqual(days.map(d=>d.remainingGrams),[350,100,0,0]);
  assert.deepEqual(days.map(d=>d.unmetGrams),[0,0,150,250]);
});
test('resupply is added at start of selected day',()=>{
  const days=projectConsumableLoad(600,3,250,3,500);
  assert.equal(days[2].startingGrams,100);
  assert.equal(days[2].addedGrams,500);
  assert.equal(days[2].remainingGrams,350);
});
test('invalid range and resupply dates are rejected',()=>{
  assert.throws(()=>projectConsumableLoad(100,0,50));
  assert.throws(()=>projectConsumableLoad(-100,2,50));
  assert.throws(()=>projectConsumableLoad(100,2,-1));
  assert.throws(()=>projectConsumableLoad(100,2,50,1,100));
});

import test from 'node:test';
import assert from 'node:assert/strict';
import { DEFAULT_QUICK_FOOD, estimateFoodPlanningScenario } from '../lib/food-planning-estimate.ts';
import { emptyFoodPlan, readFoodPlan, validateFoodPlan } from '../lib/food-plan.ts';

test('new food scenario derives group-size and trip-day weight without changing saved inventory', () => {
  const scenario = estimateFoodPlanningScenario(2, 4, DEFAULT_QUICK_FOOD);
  assert.equal(scenario.startingFoodGrams, 7200);
  assert.equal(scenario.daily[0].startingFoodGrams, 7200);
  assert.equal(scenario.daily[3].startingFoodGrams, 1800);
  assert.equal(scenario.daily[3].endingFoodGrams, 0);
  assert.equal(scenario.hotPreparations, 16);
  assert.deepEqual(emptyFoodPlan().foods, []);
});

test('no stove means no hot preparation events, independent of hot-serving selection', () => {
  const scenario = estimateFoodPlanningScenario(3, 5, { ...DEFAULT_QUICK_FOOD, cookingStyle: 'no-stove', hotServingsPerPerson: 6 });
  assert.equal(scenario.hotPreparations, 0);
  assert.equal(scenario.startingFoodGrams, 13500);
});

test('unknown days do not invent supplies and inputs are bounded', () => {
  const missing = estimateFoodPlanningScenario(2, 0, DEFAULT_QUICK_FOOD);
  assert.equal(missing.startingFoodGrams, 0);
  assert.deepEqual(missing.daily, []);
  const capped = estimateFoodPlanningScenario(300, 999, { ...DEFAULT_QUICK_FOOD, hotServingsPerPerson: 600 });
  assert.equal(capped.days, 366);
  assert.equal(capped.people, 100);
  assert.equal(capped.hotPreparations, 366 * 100 * 6);
});

test('different food styles change only rough packing masses', () => {
  const dried = estimateFoodPlanningScenario(1, 2, { ...DEFAULT_QUICK_FOOD, foodStyle: 'dehydrated' });
  const fresh = estimateFoodPlanningScenario(1, 2, { ...DEFAULT_QUICK_FOOD, foodStyle: 'fresh' });
  assert.ok(dried.startingFoodGrams < fresh.startingFoodGrams);
  assert.ok(dried.roughLowGrams < dried.startingFoodGrams);
  assert.ok(fresh.roughHighGrams > fresh.startingFoodGrams);
});

test('quick preferences persist without affecting preexisting detailed inventory', () => {
  const original = emptyFoodPlan();
  original.foods = [{ id: 'saved', name: 'Previous food', gramsPerUnit: 200, startingUnits: 4, countInPack: true }];
  const edited = { ...original, quick: { ...DEFAULT_QUICK_FOOD, foodStyle: 'fresh', cookingStyle: 'cook', hotServingsPerPerson: 3 } };
  const saved = validateFoodPlan(edited, [], []);
  assert.deepEqual(saved, edited);
  assert.deepEqual(readFoodPlan({ phase7: saved }), edited);
  assert.deepEqual(saved.foods, original.foods);
});

test('invalid quick preferences are rejected, legacy records still import', () => {
  const original = emptyFoodPlan();
  assert.deepEqual(validateFoodPlan(original, [], []), original);
  assert.throws(() => validateFoodPlan({ ...original, quick: { ...DEFAULT_QUICK_FOOD, hotServingsPerPerson: -1 } }, [], []), /Invalid quick food preferences/);
  assert.throws(() => validateFoodPlan({ ...original, quick: { ...DEFAULT_QUICK_FOOD, extraField: true } }, [], []), /Invalid quick food preferences/);
  assert.deepEqual(readFoodPlan({ phase7: { ...original, quick: { extraField: true } } }).quick, DEFAULT_QUICK_FOOD);
});

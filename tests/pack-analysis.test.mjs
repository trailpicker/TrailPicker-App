import assert from 'node:assert/strict';
import { test } from 'node:test';
import { analyzePack, simulateExclusions } from '../lib/pack-analysis.ts';

const gear = (name, category, weight_g, price_cad = 100) => ({ name, category: { name: category }, weight_g, price_cad });
const item = (id, overrides = {}) => ({
  id, quantity: 1, isWorn: false, isConsumable: false, customCategory: null,
  gearNameSnapshot: null, weightSnapshot: null, priceSnapshot: null, gear: null,
  ...overrides,
});

test('empty build has no divide-by-zero or phantom weights', () => {
  const result = analyzePack([]);
  assert.equal(result.totalGrams, 0);
  assert.equal(result.totalUnits, 0);
  assert.equal(result.categories.length, 0);
  assert.deepEqual(result.heaviest, []);
});

test('quantity, catalog precedence, worn priority and known totals match Builder', () => {
  const result = analyzePack([
    item('pack', { gear: gear('Pack', 'Packs', 900, 350) }),
    item('food', { quantity: 3, isConsumable: true, weightSnapshot: 400, priceSnapshot: 4, customCategory: 'Food' }),
    item('shoes', { isWorn: true, isConsumable: true, gear: gear('Shoes', 'Clothing', 620, 110) }),
    item('sleep', { quantity: 2, gear: gear('Quilt', 'Sleep', 300, 75), weightSnapshot: 900, priceSnapshot: 100 }),
  ]);
  assert.equal(result.baseGrams, 1500);
  assert.equal(result.consumableGrams, 1200);
  assert.equal(result.wornGrams, 620);
  assert.equal(result.carriedGrams, 2700);
  assert.equal(result.totalGrams, 3320);
  assert.equal(result.knownCostCad, 350 + 12 + 110 + 150);
  assert.equal(result.totalUnits, 7);
  assert.equal(result.unknownWeightUnits, 0);
  assert.equal(result.categories[0].name, 'Food');
  assert.equal(result.heaviest[0].name, 'Custom item');
});

test('unknown weight or price never counted as known zero', () => {
  const result = analyzePack([
    item('unknown', { quantity: 2, customCategory: 'Misc' }),
    item('zero', { weightSnapshot: 0, priceSnapshot: 0 }),
    item('invalid', { weightSnapshot: -5, priceSnapshot: Number.NaN }),
  ]);
  assert.equal(result.knownWeightUnits, 1);
  assert.equal(result.unknownWeightUnits, 3);
  assert.equal(result.unknownPriceUnits, 3);
  assert.equal(result.totalGrams, 0);
  assert.equal(result.knownCostCad, 0);
  assert.equal(result.categories.find(c => c.name === 'Misc').unknownWeightCount, 2);
});

test('categories account for quantities and weight classes', () => {
  const result = analyzePack([
    item('a', { quantity: 2, gear: gear('A', 'Clothing', 100) }),
    item('b', { isWorn: true, gear: gear('B', 'Clothing', 500) }),
    item('c', { isConsumable: true, gear: gear('C', 'Water', 200) }),
  ]);
  const clothing = result.categories.find(c => c.name === 'Clothing');
  assert.equal(clothing.baseGrams, 200);
  assert.equal(clothing.wornGrams, 500);
  assert.equal(clothing.count, 3);
  assert.equal(result.categories[0].name, 'Clothing');
});

test('simulation does not mutate the input or subtract missing weights', () => {
  const result = analyzePack([
    item('a', { gear: gear('A', 'Packs', 1000, 300) }),
    item('b', { quantity: 2, isConsumable: true, weightSnapshot: 250, priceSnapshot: 10 }),
    item('c', { isWorn: true, weightSnapshot: 400 }),
    item('d', {}),
  ]);
  const excluded = new Set(['a', 'b', 'c', 'd']);
  const scenario = simulateExclusions(result, excluded);
  assert.equal(scenario.knownSavedCarried, 1500);
  assert.equal(scenario.knownSavedTotal, 1900);
  assert.equal(scenario.knownSavedCost, 320);
  assert.equal(scenario.missingWeightCount, 1);
  assert.equal(scenario.remainingCarried, 0);
  assert.equal(result.carriedGrams, 1500);
  assert.equal(result.lines.length, 4);
});

test('long item lists and mixed custom gear remain deterministic', () => {
  const items = Array.from({ length: 20 }, (_, i) => item(`id-${i}`, { customCategory: i % 2 ? 'Custom' : null, weightSnapshot: i * 100, gearNameSnapshot: `Gear ${i}` }));
  const result = analyzePack(items);
  assert.equal(result.heaviest.length, 5);
  assert.equal(result.heaviest[0].name, 'Gear 19');
  assert.equal(result.totalGrams, 19000);
});


test('removing worn gear changes total weight but not carried weight', () => {
  const result = analyzePack([
    item('base', { gear: gear('Pack', 'Packs', 800) }),
    item('worn', { isWorn: true, gear: gear('Boots', 'Clothing', 1200) }),
  ]);
  const simulation = simulateExclusions(result, new Set(['worn']));
  assert.equal(simulation.knownSavedCarried, 0);
  assert.equal(simulation.knownSavedTotal, 1200);
  assert.equal(simulation.remainingCarried, 800);
  assert.equal(simulation.remainingTotal, 800);
});

test('catalog zero is known zero, snapshot fallback works when catalog null', () => {
  const result = analyzePack([
    item('zero', { gear: gear('Zero', 'Misc', 0, 0), weightSnapshot: 900, priceSnapshot: 500 }),
    item('fallback', { gear: gear('Fallback', 'Misc', null, null), weightSnapshot: 300, priceSnapshot: 45 }),
  ]);
  assert.equal(result.totalGrams, 300);
  assert.equal(result.knownCostCad, 45);
  assert.equal(result.unknownWeightUnits, 0);
});

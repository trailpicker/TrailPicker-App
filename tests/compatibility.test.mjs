import test from 'node:test';
import assert from 'node:assert/strict';
import { documentedShelterCapacity, evaluateCompatibility, summarizeCompatibility } from '../lib/compatibility.ts';

const date = (day) => new Date(`${day}T12:00:00.000Z`);
const trip = (more = {}) => ({ people: 1, minTemperature: null, conditions: null, startDate: date('2026-08-10'), endDate: date('2026-08-12'), ...more });
const day = (more = {}) => ({ minTemperature: null, conditions: null, waterCarryL: null, campsite: null, waterSource: null, ...more });
const item = (id, category, more = {}) => ({ id, quantity: 1, isConsumable: false, isWorn: false, customCategory: category, gearNameSnapshot: id, weightSnapshot: 500, priceSnapshot: null, gear: null, ...more });
const gear = (category, subcategory, more = {}) => ({ id: `gear-${category}-${subcategory}`, name: `Test ${subcategory}`, weight_g: 500, price_cad: 100, capacity_l: null, frame_type: null, waterproof: null, temperature_rating: null, season: null, category: { name: category }, subcategory: subcategory ? { name: subcategory, slug: subcategory } : null, ...more });
const find = (issues, id) => issues.find(issue => issue.id === id);
const sleepingBag = (id, rating = null, more = {}) => item(id, 'Sleep', { gear: gear('Sleep', 'sleeping-bag', { temperature_rating: rating, ...more }) });
const tent = (id, specs = [], more = {}) => item(id, 'Shelter', { gear: gear('Shelter', 'tent', { specifications: specs, waterproof: true, ...more }) });
const occupancy = (n) => [{ key: 'Sleeping capacity', value: String(n), unit: 'people' }];

test('empty gear is unknown and does not show a compatible/safe result', () => {
  const issues = evaluateCompatibility(trip(), [], []);
  assert.equal(find(issues, 'empty-build').kind, 'unknown');
  assert.equal(summarizeCompatibility(issues).status, 'incomplete');
});

test('same-day outing is not treated as an overnight trip', () => {
  const b = trip({ endDate: date('2026-08-10') });
  const issues = evaluateCompatibility(b, [item('pack', 'Packs')]);
  assert.equal(find(issues, 'missing-shelter'), undefined);
  assert.equal(find(issues, 'missing-sleep'), undefined);
  assert.ok(find(issues, 'missing-water'));
});

test('overnight missing categories are review prompts that allow shared arrangements', () => {
  const issues = evaluateCompatibility(trip(), [item('pack', 'Packs')]);
  assert.equal(find(issues, 'missing-shelter').severity, 'warning');
  assert.match(find(issues, 'missing-shelter').message, /shared/i);
  assert.ok(find(issues, 'cooking-plan'));
});

test('campsite on a trip without dates still makes overnight checks applicable', () => {
  const issues = evaluateCompatibility(trip({ startDate: null, endDate: null }), [item('pack', 'Packs')], [day({ campsite: 'Camp 1' })]);
  assert.ok(find(issues, 'missing-shelter'));
});

test('sleeping pads never count as a rated sleeping bag, even if data has a temperature field', () => {
  const pad = item('pad', 'Sleep', { gear: gear('Sleep', 'sleeping-pad', { temperature_rating: -5 }) });
  const issues = evaluateCompatibility(trip({ minTemperature: -10 }), [pad]);
  assert.equal(find(issues, 'sleep-insulation-missing').severity, 'warning');
  assert.equal(issues.some(i => i.id.startsWith('sleep-rating-review-')), false);
});

test('unrated sleeping bags are unknown and never silently treated as adequate', () => {
  const issues = evaluateCompatibility(trip({ minTemperature: -10 }), [sleepingBag('bag')]);
  assert.equal(find(issues, 'sleep-rating-unknown').kind, 'unknown');
  assert.equal(summarizeCompatibility(issues).unknowns > 0, true);
});

test('sleeping pad R-value is checked separately from bag temperature ratings', () => {
  const pad = item('pad', 'Sleep', { gear: gear('Sleep', 'sleeping-pad', { specifications: [{key:'R-value', value:'1.5', unit:null}] }) });
  const issues = evaluateCompatibility(trip({ minTemperature: -3 }), [sleepingBag('bag', -8), pad]);
  assert.equal(find(issues, 'pad-insulation-review').severity, 'warning');
  assert.equal(find(issues, 'sleep-rating-review-pad'), undefined);
});

test('unrated sleeping pad in cold trip is unknown, not a recorded failure', () => {
  const pad = item('pad', 'Sleep', { gear: gear('Sleep', 'sleeping-pad') });
  const issues = evaluateCompatibility(trip({ minTemperature: -3 }), [sleepingBag('bag', -8), pad]);
  assert.equal(find(issues, 'pad-insulation-unknown').kind, 'unknown');
  assert.equal(find(issues, 'pad-insulation-review'), undefined);
});

test('recorded pad insulation review is not triggered for mild trip lows', () => {
  const pad = item('pad', 'Sleep', { gear: gear('Sleep', 'sleeping-pad', { specifications: [{key:'R-value', value:'1.0'}] }) });
  const issues = evaluateCompatibility(trip({ minTemperature: 10 }), [sleepingBag('bag', 0), pad]);
  assert.equal(find(issues, 'pad-insulation-review'), undefined);
});

test('a recorded sleep temperature above the trip low is a review, not an unqualified claim', () => {
  const issues = evaluateCompatibility(trip({ minTemperature: -8 }), [sleepingBag('bag', 2)]);
  assert.equal(find(issues, 'sleep-rating-review-bag').severity, 'warning');
  assert.match(find(issues, 'sleep-rating-review-bag').action, /comfort rating/i);
});

test('colder-than-trip-low sleeping bag still does not count as guaranteed warm', () => {
  const issues = evaluateCompatibility(trip({ minTemperature: 0 }), [sleepingBag('bag', -10)]);
  assert.equal(find(issues, 'sleep-rating-review-bag'), undefined);
  assert.equal(find(issues, 'sleep-rating-limits').kind, 'unknown');
});

test('trip-day low is included even if build minimum is warmer', () => {
  const issues = evaluateCompatibility(trip({ minTemperature: 5 }), [sleepingBag('bag', 0)], [day({ minTemperature: -5 })]);
  assert.equal(find(issues, 'sleep-rating-review-bag').severity, 'warning');
});

test('insulation quantity checks group size, not only item rows', () => {
  const issues = evaluateCompatibility(trip({ people: 3 }), [sleepingBag('bag', -5, { name: 'Bag' })]);
  assert.ok(find(issues, 'sleep-units'));
  const many = sleepingBag('bags', -5); many.quantity = 3;
  assert.equal(find(evaluateCompatibility(trip({ people: 3 }), [many]), 'sleep-units'), undefined);
});

test('liters NEVER count as shelter occupancy', () => {
  const t = tent('tent', [], { capacity_l: 2 });
  assert.equal(documentedShelterCapacity(t), null);
  const issues = evaluateCompatibility(trip({ people: 2 }), [t]);
  assert.equal(find(issues, 'shelter-occupancy-unknown').kind, 'unknown');
  assert.equal(find(issues, 'shelter-capacity-short'), undefined);
});

test('explicit sleeping capacity specs are used, but ambiguous Capacity is rejected', () => {
  assert.equal(documentedShelterCapacity(tent('t', occupancy(2))), 2);
  assert.equal(documentedShelterCapacity(tent('t', [{ key: 'Capacity', value: '2', unit: 'L' }])), null);
  assert.equal(documentedShelterCapacity(tent('t', [{ key: 'Sleeping capacity', value: '2.5', unit: 'people' }])), null);
  assert.equal(documentedShelterCapacity(tent('t', [{ key: 'Sleeping capacity', value: '3', unit: 'liters' }])), null);
});

test('optional future personCapacity field supported without requiring schema migration', () => {
  assert.equal(documentedShelterCapacity(tent('t', [], { personCapacity: 4, capacity_l: 2 })), 4);
});

test('documented shelter quantity is multiplied correctly for group occupancy', () => {
  const twoTents = tent('two', occupancy(2)); twoTents.quantity = 2;
  const issues = evaluateCompatibility(trip({ people: 4 }), [twoTents]);
  assert.equal(find(issues, 'shelter-capacity-short'), undefined);
  assert.equal(find(issues, 'shelter-occupancy-unknown'), undefined);
});

test('confirmed capacity shortage is flagged when ALL listed shelters have known occupancy', () => {
  const issues = evaluateCompatibility(trip({ people: 3 }), [tent('small', occupancy(2))]);
  assert.equal(find(issues, 'shelter-capacity-short').severity, 'error');
});

test('an unknown shelter suppresses a false certain shortage', () => {
  const issues = evaluateCompatibility(trip({ people: 3 }), [tent('known', occupancy(2)), tent('unknown')]);
  assert.equal(find(issues, 'shelter-capacity-short'), undefined);
  assert.equal(find(issues, 'shelter-capacity-unverified').kind, 'unknown');
});

test('weather condition matches rain and snow variants without requiring an exact string', () => {
  const t = tent('wet', occupancy(1), { waterproof: false, season: '3-season' });
  const issues = evaluateCompatibility(trip({ conditions: 'rain expected' }), [t]);
  assert.ok(find(issues, 'shelter-wet-weather'));
  const snowy = evaluateCompatibility(trip({ conditions: 'snow showers' }), [t]);
  assert.ok(find(snowy, 'shelter-winter-review'));
});

test('no rain and unknown waterproofing never create a confirmed waterproofing warning', () => {
  const t = tent('unknown', occupancy(1), { waterproof: null });
  const dry = evaluateCompatibility(trip({ conditions: 'no rain' }), [t]);
  assert.equal(find(dry, 'shelter-waterproof-unknown'), undefined);
  const wet = evaluateCompatibility(trip({ conditions: 'rain' }), [t]);
  assert.equal(find(wet, 'shelter-wet-weather'), undefined);
  assert.equal(find(wet, 'shelter-waterproof-unknown').kind, 'unknown');
});

test('cold night triggers conservative 3-season shelter review', () => {
  const t = tent('three', occupancy(1), { season: '3-season' });
  assert.ok(find(evaluateCompatibility(trip({ minTemperature: -12 }), [t]), 'shelter-winter-review'));
});

test('waterCarryL compared with bottle capacity, not filter values', () => {
  const bottle = item('bottle', 'Water', { gear: gear('Water', 'bottle', { capacity_l: 1 }) });
  const filter = item('filter', 'Water', { gear: gear('Water', 'filter', { capacity_l: 900 }) });
  const issues = evaluateCompatibility(trip(), [bottle, filter], [day({ waterCarryL: 3 })]);
  assert.equal(find(issues, 'water-volume-check').severity, 'warning');
  assert.match(find(issues, 'water-volume-check').message, /1 L/);
});

test('water bottles count quantity and missing volume stays unknown', () => {
  const bottle = item('bottle', 'Water', { gear: gear('Water', 'bottle', { capacity_l: 1.5 }) });
  bottle.quantity = 2;
  assert.equal(find(evaluateCompatibility(trip(), [bottle], [day({ waterCarryL: 3 })]), 'water-volume-check'), undefined);
  const other = item('unknown', 'Water', { gear: gear('Water', 'bottle', { capacity_l: null }) });
  const issues = evaluateCompatibility(trip(), [bottle, other], [day({ waterCarryL: 5 })]);
  assert.equal(find(issues, 'water-volume-check'), undefined);
  assert.equal(find(issues, 'water-volume-unverified').kind, 'unknown');
});

test('stoves and cookware are not universally required; rain does not imply missing rain gear is unsafe', () => {
  const issues = evaluateCompatibility(trip(), [item('p', 'Packs'), item('w', 'Water')]);
  assert.equal(find(issues, 'cooking-plan').severity, 'info');
  assert.equal(issues.some(i => /rain gear/i.test(i.message)), false);
});

test('large carried weight is no longer an arbitrary compatibility failure', () => {
  const heavy = item('heavy', 'Packs', { weightSnapshot: 12000 });
  const issues = evaluateCompatibility(trip(), [heavy]);
  assert.equal(issues.some(i => i.id === 'heavy-base-weight'), false);
});

test('missing weights appear as unknown rather than counted as zero', () => {
  const unknown = item('unknown', 'Misc', { weightSnapshot: null }); unknown.quantity = 4;
  const issues = evaluateCompatibility(trip(), [unknown]);
  assert.equal(find(issues, 'unknown-weights').kind, 'unknown');
  assert.match(find(issues, 'unknown-weights').message, /4 gear unit/);
});

test('multiple tents are not marked redundant for a group', () => {
  const issues = evaluateCompatibility(trip({ people: 4 }), [tent('a', occupancy(2)), tent('b', occupancy(2), { id: 'tent2' })]);
  assert.equal(find(issues, 'multiple-shelter'), undefined);
  const solo = evaluateCompatibility(trip({ people: 1 }), [tent('a', occupancy(1)), tent('b', occupancy(1), { id: 'tent2' })]);
  assert.equal(find(solo, 'multiple-shelter').severity, 'info');
});

test('results are stable, sorted by severity, and have unique IDs', () => {
  const b = trip({ people: 3, minTemperature: -8, conditions: 'rain' });
  const items = [tent('small', occupancy(1), { waterproof: false }), sleepingBag('bag', 3)];
  const a = evaluateCompatibility(b, items);
  assert.deepEqual(evaluateCompatibility(b, items), a);
  assert.equal(new Set(a.map(i => i.id)).size, a.length);
  assert.deepEqual(a.map(i=>i.severity), [...a.map(i=>i.severity)].sort((x,y)=>({error:0,warning:1,info:2}[x]-{error:0,warning:1,info:2}[y])));
});

test('summary counts unknowns distinctly from warnings and errors', () => {
  assert.equal(summarizeCompatibility([]).status, 'ok');
  assert.equal(summarizeCompatibility([{id:'note',severity:'info',category:'Planning',message:'Advisory',kind:'advisory'}]).status, 'notes');
  const result = summarizeCompatibility([{id:'a',severity:'info',category:'Data',message:'?',kind:'unknown'}, {id:'b',severity:'warning',category:'Gear',message:'!'}]);
  assert.equal(result.status,'warning');
  assert.equal(result.unknowns,1);
  assert.equal(result.total,2);
});


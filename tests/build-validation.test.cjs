const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { stripTypeScriptTypes } = require('node:module');
function load(relative, mocks={}) {
  let code = stripTypeScriptTypes(fs.readFileSync(path.join(__dirname, '..', relative), 'utf8'));
  const names = [...code.matchAll(/export (?:async )?function (\w+)|export const (\w+)/g)].map(m => m[1] || m[2]);
  code = code.replace(/import\s+\{([^}]+)\}\s+from\s+["']([^"']+)["'];/g,
    (_, items, spec) => `const {${items}} = require(${JSON.stringify(spec)});`).replace(/export /g, '');
  return new Function('require', code + `\nreturn {${names.join(',')}};`)(spec => spec in mocks ? mocks[spec] : require(spec));
}
const planner = load('lib/trip-planner.ts');
const v = load('lib/build-validation.ts', {'./trip-planner': planner});
const form = values => { const data = new FormData(); for (const [k,x] of Object.entries(values)) data.set(k,String(x)); return data; };
test('strict build creation input', () => {
  assert.equal(v.parseBuildDetails(form({name:'Test',people:'2',minTemperature:'-5'})).people, 2);
  for (const people of ['-1','Infinity','NaN','101','1.5']) {
    assert.throws(() => v.parseBuildDetails(form({name:'Test',people})), /people/);
  }
  for (const name of ['', 'x'.repeat(101)]) assert.throws(() => v.parseBuildDetails(form({name})), /name/);
  assert.throws(() => v.parseBuildDetails(form({name:'Test', locationLat:49})), /both coordinates/);
  assert.throws(() => v.parseBuildDetails(form({name:'Test',conditions:'tornado'})), /condition/);
});
test('custom item numeric validation and quantity boundaries', () => {
  for (const bad of ['NaN', 'Infinity', '-1', '1000001', '1.5']) assert.throws(() => v.formNumber(form({weight_g:bad}),'weight_g',0,1000000,true));
  assert.equal(v.formNumber(form({price_cad:'0'}),'price_cad',0,1000000),0);
  assert.equal(v.combinedQuantity(998,1),999);
  assert.throws(() => v.combinedQuantity(999,1), /999/);
  assert.throws(() => v.combinedQuantity(900,900), /999/);
});
test('logistics validator rejects arbitrary JSON, unknown keys, and oversize text', () => {
  assert.equal(v.parseLogistics(null),null);
  assert.equal(v.parseLogistics({parking:'Lot A'}).parking,'Lot A');
  for (const bad of [[], 'bad', {emergencyContact:42}, {other:'secret'}, {parking:'x'.repeat(5001)}]) {
    assert.throws(() => v.parseLogistics(bad), /logistics/);
  }
});

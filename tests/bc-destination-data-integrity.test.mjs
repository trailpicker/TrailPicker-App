import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = file => JSON.parse(fs.readFileSync(path.join(root, 'data', file), 'utf8'));
const catalog = read('destinations.json');
const metrics = read('destination-verified-metrics.json');
const coordinates = read('destination-coordinate-sources.json');
const byId = new Map(catalog.map(d => [d.id, d]));
const count = k => catalog.filter(d => d[k] !== null).length;

test('BC catalog retains unique IDs, safe types and supported schema', () => {
  assert.equal(catalog.length, 184);
  assert.equal(byId.size, catalog.length);
  const allowedDistanceType = new Set(['one-way', 'round-trip', 'loop']);
  for (const d of catalog) {
    assert.ok(typeof d.id === 'string' && d.id.length, 'missing id');
    for (const field of ['name', 'park', 'region', 'summary', 'kind', 'sourceUrl']) {
      assert.ok(typeof d[field] === 'string' && d[field].length, `${d.id}.${field}`);
    }
    assert.match(d.sourceUrl, /^https:\/\//, `${d.id}: sourceUrl`);
    assert.equal(d.latitude === null, d.longitude === null, `${d.id}: coordinate pair`);
    if (d.distanceKm !== null) {
      assert.ok(Number.isFinite(d.distanceKm) && d.distanceKm > 0 && d.distanceKm <= 250, `${d.id}: distance`);
      assert.ok(allowedDistanceType.has(d.distanceType), `${d.id}: distanceType`);
    } else {
      assert.equal(d.distanceType, null, `${d.id}: unsupported distanceType without distance`);
    }
    if (d.elevationGainM !== null)
      assert.ok(Number.isFinite(d.elevationGainM) && d.elevationGainM >= 0 && d.elevationGainM <= 6000, `${d.id}: elevation`);
    if (d.tentSites !== null)
      assert.ok(Number.isInteger(d.tentSites) && d.tentSites > 0, `${d.id}: tentSites`);
    assert.ok(Array.isArray(d.activities), `${d.id}: activities`);
  }
});

test('base geolocations and coordinate sources remain consistent', () => {
  assert.equal(count('latitude'), 125);
  assert.equal(count('longitude'), coordinates.totalCount);
  assert.equal(Object.keys(coordinates.sources).length, coordinates.addedCount);
  for (const [id, meta] of Object.entries(coordinates.sources)) {
    assert.ok(byId.has(id));
    assert.equal(byId.get(id).latitude, meta.latitude);
    assert.equal(byId.get(id).longitude, meta.longitude);
  }
});

test('metric coverage and signed off evidence are consistent', () => {
  assert.equal(count('distanceKm'), 146);
  assert.equal(count('distanceType'), 146);
  assert.equal(count('elevationGainM'), 53);
  assert.equal(Object.keys(metrics.sources).length, 116);
  for (const [id, source] of Object.entries(metrics.sources)) {
    const d = byId.get(id);
    assert.ok(d, `${id}: missing destination`);
    assert.match(source.source, /^https:\/\//, `${id}: provenance URL`);
    for (const [field, diff] of Object.entries(source.changes ?? {})) {
      assert.ok(Array.isArray(diff) && diff.length === 2, `${id}.${field}: diff`);
      assert.deepEqual(d[field], diff[1], `${id}.${field}: current value must match audit`);
    }
  }
});

test('one-way route bases and closures are not conflated', () => {
  for (const [id, km, type] of [
    ['howe-sound-crest-trail', 29, 'one-way'],
    ['dog-mountain-seymour', 3, 'one-way'],
    ['marble-canyon-kootenay', 0.9, 'one-way'],
    ['lands lide-lake'.replace(' ', ''), 11, 'one-way'],
    ['iceline-trail-yoho', 20.3, 'loop'],
    ['lake-ohara-destination', 11, 'one-way'],
    ['berg-lake-trail', 21.5, 'one-way'],
    ['chin-beach-jdf', 8, 'one-way'],
  ]) {
    const d = byId.get(id);
    assert.equal(d?.distanceKm, km, id);
    assert.equal(d?.distanceType, type, id);
    assert.ok(metrics.sources[id]?.trailhead, `${id}: origin not documented`);
  }
  assert.match(byId.get('rampart-ponds').caution, /closed until further notice/i);
  assert.match(byId.get('chin-beach-jdf').caution, /closed/i);
  assert.match(byId.get('juan-de-fuca-marine-trail').caution, /closed/i);
  assert.match(byId.get('lake-ohara-destination').caution, /access road/i);
  assert.equal(byId.get('hikers-beach').toilet, null);
});

test('do not mix historical and rebuilt Berg Lake Trail route data', () => {
  const ids = ['kinney-lake-robson','whitehorn-robson','emperor-falls-robson','marmot-robson','berg-lake-robson','rearguard-robson','robson-pass-robson'];
  for (const id of ids) {
    const record = metrics.sources[id];
    assert.match(record.source, /offtracktravel\.ca/, id);
    assert.match(record.legacySource, /\.pdf$/, id);
    assert.match(record.metricQuality, /estimate/i, id);
    assert.equal(byId.get(id).distanceType, 'one-way', id);
  }
});

const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');
const root = path.resolve(__dirname, '..');
const read = rel => fs.readFileSync(path.join(root, rel), 'utf8');
const exists = rel => fs.existsSync(path.join(root, rel));

function loadTypeScript(rel, deps = {}) {
  const file = read(rel);
  const compiled = ts.transpileModule(file, { fileName: rel, compilerOptions: {
    module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022,
  }}).outputText;
  const exports = {};
  const mod = { exports };
  new Function('require','module','exports',compiled)((name) => {
    if (Object.prototype.hasOwnProperty.call(deps, name)) return deps[name];
    throw new Error('Unexpected dependency: ' + name);
  }, mod, exports);
  return mod.exports;
}

test('old Campsites & water navigation, editor, and Overpass-only endpoint are removed', () => {
  assert.equal(exists('components/builder/TripPlanner/TripResourcesSection.tsx'), false);
  assert.equal(exists('app/api/trip-resources/route.ts'), false);
  assert.doesNotMatch(read('lib/trip-resources.ts'), /parseOsmResources|DiscoveredResource/);
  const planner = read('components/builder/TripPlanner/TripPlanner.tsx');
  const route = read('components/builder/TripPlanner/TripRoute.tsx');
  assert.doesNotMatch(planner, /"resources"\s*:\s*"Campsites/);
  assert.doesNotMatch(planner, /\["resources"\]/);
  assert.doesNotMatch(route, /TripResourcesSection|onAddPoint=\{/);
});

test('water observations, access, reliability, refill state and last checked edit on original waypoint', () => {
  const itinerary = read('components/builder/TripPlanner/DayStopsItinerary.tsx');
  for (const token of ['ResourceDetailsEditor', 'point.resource?.detail', 'point.resource?.access',
    'point.resource?.waterReliability', 'point.resource?.refillConfirmed', 'point.resource?.checkedOn']) {
    assert.ok(itinerary.includes(token), token);
  }
  assert.match(itinerary, /route\.updateStop\(point\.id/);
  assert.match(itinerary, /Campsite details/);
  assert.match(itinerary, /Water source details/);
  assert.match(itinerary, /Resupply details/);
});

test('water estimates now live in Consumables and use live route updates', () => {
  const food = read('components/builder/FoodConsumablesPlanner.tsx');
  const water = read('components/builder/WaterPlanningSection.tsx');
  const route = read('components/builder/TripPlanner/TripRoute.tsx');
  assert.match(food, /<WaterPlanningSection/);
  assert.match(water, /calculateWaterLegs\(points, settings\)/);
  assert.match(water, /ROUTE_WATER_POINTS_REQUEST/);
  assert.match(route, /ROUTE_WATER_POINTS_CHANGED/);
  assert.match(route, /window\.addEventListener\(TRIP_EXPORT_REQUEST/);
  assert.match(route, /liveExportRef\.current = liveExport/);
});

test('water-only settings save retains exact private booking records and other logistics', async () => {
  const resources = loadTypeScript('lib/trip-resources.ts', {
    './trail-routing': { metersBetween: () => 1000, usableTrailSegment: () => null },
  });
  const previous = {
    permits: 'Existing permit', arrangements: [{ kind: 'permit', name: 'Legacy' }],
    phase6: {
      settings: { rateLph: 0.6, reserveL: 0.75, capacityL: 3 },
      bookings: [{ id: 'old', status: 'cancelled', waypointId: 'deleted-stop', notes: 'private booking', unexpectedLegacyData: 'preserve' }],
    },
  };
  let written = null;
  const actions = loadTypeScript('lib/trip-planner-actions.ts', {
    '@/lib/build-access': { requireBuildAccess: async () => ({ userId: 'owner' }) },
    'next/cache': { revalidatePath: () => {} },
    '@/lib/destinations': {}, '@/lib/trip': {}, '@/lib/trip-planner': {},
    '@/lib/build-history': { mutateBuildWithRevision: async (_id, _user, _type, _title, callback) => callback({
      build: {
        findUnique: async () => ({ tripLogistics: previous }),
        update: async data => { written = data.data.tripLogistics; },
      },
    }) },
    '@/lib/build-validation': {}, '@/lib/itinerary-links': {}, '@/lib/overnight-handoffs': {},
    '@/lib/route-metrics': {}, '@/lib/trip-resources': resources, '@/lib/trip-arrangements': {},
    '@/lib/food-plan': {}, '@/lib/route-timing-preferences': {},
  });
  const form = new FormData();
  form.set('buildId', 'owned');
  form.set('waterSettings', JSON.stringify({ rateLph: 0.9, reserveL: 1, capacityL: 4 }));
  await actions.saveTripWaterSettings(form);
  assert.deepEqual(written.phase6.bookings, previous.phase6.bookings);
  assert.deepEqual(written.arrangements, previous.arrangements);
  assert.equal(written.permits, 'Existing permit');
  assert.equal(written.phase6.settings.capacityL, 4);
  assert.equal(written.phase6.settings.rateLph, 0.9);
});

test('water-only settings update rejects invalid input without writes', async () => {
  const resources = loadTypeScript('lib/trip-resources.ts', {
    './trail-routing': { metersBetween: () => 1000, usableTrailSegment: () => null },
  });
  let writes = 0;
  const actions = loadTypeScript('lib/trip-planner-actions.ts', {
    '@/lib/build-access': { requireBuildAccess: async () => ({ userId: 'owner' }) },
    'next/cache': { revalidatePath: () => {} },
    '@/lib/destinations': {}, '@/lib/trip': {}, '@/lib/trip-planner': {},
    '@/lib/build-history': { mutateBuildWithRevision: async (_id, _user, _type, _title, callback) => callback({
      build: { findUnique: async () => ({ tripLogistics: {} }), update: async () => { writes++; } },
    }) },
    '@/lib/build-validation': {}, '@/lib/itinerary-links': {}, '@/lib/overnight-handoffs': {},
    '@/lib/route-metrics': {}, '@/lib/trip-resources': resources, '@/lib/trip-arrangements': {},
    '@/lib/food-plan': {}, '@/lib/route-timing-preferences': {},
  });
  const form = new FormData();
  form.set('buildId', 'owned');
  form.set('waterSettings', JSON.stringify({ rateLph: -1, reserveL: 99, capacityL: 4 }));
  await assert.rejects(actions.saveTripWaterSettings(form), /Water rateLph/);
  assert.equal(writes, 0);
});

const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { stripTypeScriptTypes } = require('node:module');
const root = path.resolve(__dirname, '..');
process.env.AUTH_SECRET = 'ownership-test-secret-not-for-production';

// Execute the actual TS helpers/actions, with Auth.js, Next and Prisma replaced
// by deterministic boundary mocks. No network or database is needed.
function load(relative, dependencies = {}) {
  let js = stripTypeScriptTypes(fs.readFileSync(path.join(root, relative), 'utf8'));
  const names = [...js.matchAll(/export (?:async )?function (\w+)|export const (\w+)/g)].map(m => m[1] || m[2]);
  js = js.replace(/import\s+\{([^}]+)\}\s+from\s+["']([^"']+)["'];/g, (_, names, spec) => `const {${names}} = require(${JSON.stringify(spec)});`)
    .replace(/import ["']server-only["'];/g, '')
    .replace(/export /g, '');
  const requireMock = spec => spec in dependencies ? dependencies[spec] : require(spec);
  return new Function('require', 'process', 'Buffer', js + `\nreturn {${names.join(',')}};`)(requireMock, process, Buffer);
}
const token = load('lib/guest-build-token.ts');
function harness() {
  const state = { email: 'a@test', cookies: new Map(), writes: [], builds: [
    { id: 'a', userId: 'user-a', name: 'A', items: [], days: [] },
    { id: 'b', userId: 'user-b', name: 'B', items: [], days: [] },
    { id: 'guest', userId: null, name: 'Guest', items: [], days: [] },
  ] };
  const matches = (b, where) => b.id === where.id && (!('userId' in where) || b.userId === where.userId) && (!where.OR || where.OR.some(p => b.userId === p.userId));
  const cookieStore = { get: name => state.cookies.has(name) ? { value: state.cookies.get(name) } : undefined,
    set: (name, value, options) => { state.cookies.set(name, value); state.lastCookieOptions = options; },
    delete: name => state.cookies.delete(name) };
  const write = type => async args => { state.writes.push({ type, args }); return { id: 'copy', ...args.data }; };
  const prisma = {
    user: { findUnique: async ({ where }) => where.email ? { id: `user-${where.email[0]}` } : null },
    build: { findFirst: async ({ where }) => state.builds.find(b => matches(b, where)) || null,
      findUnique: async ({ where }) => state.builds.find(b => matches(b, where)) || null,
      create: write('build.create'), update: write('build.update'),
      updateMany: async ({ where, data }) => { const b = state.builds.find(b => matches(b, where)); if (!b) return {count:0}; state.writes.push({type:'claim'}); Object.assign(b, data); return {count:1}; } },
    buildItem: { findFirst: async ({ where }) => {
      const buildId = where.id === 'item-a' ? 'a' : where.id === 'item-b' ? 'b' : null;
      return buildId === where.buildId ? { id: where.id, buildId, quantity: 2 } : null;
    }, update: write('item.update'), delete: write('item.delete'), create: write('item.create'), upsert: write('item.upsert') },
    tripDay: { findFirst: async ({ where }) => where.id === 'day-a' && where.buildId === 'a' ? { id: 'day-a', buildId: 'a' } : null,
      update: write('day.update'), createMany: write('day.createMany'), deleteMany: write('day.deleteMany') },
  };
  const navigation = { notFound: () => { throw new Error('404'); }, redirect: url => { throw new Error(`REDIRECT:${url}`); } };
  const access = load('lib/build-access.ts', { '@/auth': {auth: async () => state.email ? {user:{email:state.email}} : null},
    '@/lib/prisma': { prisma }, 'next/headers': {cookies:async()=>cookieStore}, 'next/navigation': navigation, '@/lib/guest-build-token': token });
  const planner = load('lib/trip-planner.ts');
  const plannerActions = load('lib/trip-planner-actions.ts', { '@/lib/prisma':{prisma}, '@/lib/build-access':access, 'next/cache':{revalidatePath:()=>{}}, '@/lib/destinations':{getDestination:()=>null}, '@/lib/trip':{getDateRange:()=>[]}, '@/lib/trip-planner':planner });
  const actions = load('app/build/actions.ts', {'@/lib/prisma':{prisma}, '@/lib/trip-planner-actions':plannerActions, '@/lib/trip-planner':planner, 'next/navigation': navigation,
    'next/headers':{cookies:async()=>cookieStore}, 'next/cache':{revalidatePath:()=>{}}, '@/lib/trip':{getDateRange:()=>[]},
    '@/lib/build-access':access, '@/lib/guest-build-token':token, '@/lib/destinations':{getDestination:()=>null} });
  return { state, access, actions };
}
function form(values) { const f = new FormData(); for (const [key,value] of Object.entries(values)) f.set(key, String(value)); return f; }

test('guest tokens are bound to build, expire, and reject tampering', () => {
  const t = token.createGuestBuildToken('guest', 1000000);
  assert.equal(token.verifyGuestBuildToken('guest', t, 1000000), true);
  assert.equal(token.verifyGuestBuildToken('other', t, 1000000), false);
  assert.equal(token.verifyGuestBuildToken('guest', t.slice(0,-1)+'!', 1000000), false);
  assert.equal(token.verifyGuestBuildToken('guest', t, 1000000 + token.GUEST_BUILD_MAX_AGE*1000), false);
  for (const invalid of [undefined, '', 'guest', 'x'.repeat(201), '1:x.y']) assert.equal(token.verifyGuestBuildToken('guest', invalid), false);
});
for (const email of ['a@test', null]) {
  test(`access matrix for ${email || 'anonymous'}`, async () => {
    const {state, access} = harness(); state.email=email;
    assert.equal((await access.findAccessibleBuild('a'))?.id, email ? 'a' : undefined);
    assert.equal(await access.findAccessibleBuild('b'), null);
    state.cookies.set('currentBuild','guest');
    assert.equal(await access.findAccessibleBuild('guest'), null);
    state.cookies.set(token.guestBuildCookieName('guest'), token.createGuestBuildToken('guest'));
    assert.equal((await access.findAccessibleBuild('guest')).id, 'guest');
    state.cookies.set(token.guestBuildCookieName('b'), token.createGuestBuildToken('b'));
    assert.equal(await access.findAccessibleBuild('b'), null); // capability cannot override account owner
    assert.equal(await access.findAccessibleBuild('missing'), null);
    await assert.rejects(access.requireBuildPageAccess('b'), /404/);
  });
}
for (const name of ['importBuildItems','duplicateBuild','addCustomItem','addGear','updateTripDetails','setItemCategory','updateQuantity','removeGear','updateTripDay']) {
  test(`${name} rejects another user's build before any write`, async () => {
    const {state,actions}=harness();
    await assert.rejects(actions[name](form({buildId:'b', itemId:'item-b', dayId:'day-b', payload:'invalid JSON', delta:1})), /Build not found/);
    assert.deepEqual(state.writes, []);
  });
}
for (const name of ['setItemCategory','updateQuantity','removeGear']) {
  test(`${name} rejects another build's item paired with owned build`, async () => {
    const {state,actions}=harness();
    await assert.rejects(actions[name](form({buildId:'a',itemId:'item-b',delta:1})), /Item not found/);
    assert.deepEqual(state.writes,[]);
  });
}
test('trip day must belong to the authorized build', async () => {
  const {state,actions}=harness();
  await assert.rejects(actions.updateTripDay(form({buildId:'a',dayId:'day-b'})),/Day not found/);
  assert.deepEqual(state.writes,[]);
  await actions.updateTripDay(form({buildId:'a',dayId:'day-a',notes:'Hello'}));
  assert.equal(state.writes[0].type,'day.update');
});
test('export is private', async () => {
  const {actions}=harness();
  assert.equal((await actions.getBuildExport('a')).name,'A');
  await assert.rejects(actions.getBuildExport('b'), /Build not found/);
});
test('claim ignores forged currentBuild cookie and accepts signed guest proof', async () => {
  const {state,actions,access}=harness(); state.cookies.set('currentBuild','guest');
  await actions.claimCurrentBuild(); assert.deepEqual(state.writes,[]);
  state.cookies.set(token.guestBuildCookieName('guest'),token.createGuestBuildToken('guest'));
  await actions.claimCurrentBuild();
  assert.equal(state.builds[2].userId,'user-a');
  assert.equal(state.cookies.has(token.guestBuildCookieName('guest')),false);
  state.email=null; assert.equal(await access.findAccessibleBuild('guest'),null);
});
test('guest proof cannot claim someone else\'s account build', async () => {
  const {state,actions}=harness(); state.cookies.set('currentBuild','b');
  state.cookies.set(token.guestBuildCookieName('b'),token.createGuestBuildToken('b'));
  await actions.claimCurrentBuild(); assert.deepEqual(state.writes,[]);
});
for (const email of ['a@test',null]) {
  test(`duplicate preserves ownership and navigation for ${email || 'guest'}`, async () => {
    const {state,actions}=harness();state.email=email;
    if (!email) state.cookies.set(token.guestBuildCookieName('guest'),token.createGuestBuildToken('guest'));
    await assert.rejects(actions.duplicateBuild(form({buildId:email?'a':'guest'})),/REDIRECT:\/build\/copy/);
    assert.equal(state.writes[0].args.data.userId,email?'user-a':null);
    assert.equal(state.cookies.get('currentBuild'),'copy');
    if (!email) assert.equal(token.verifyGuestBuildToken('copy',state.cookies.get(token.guestBuildCookieName('copy'))),true);
    assert.equal(state.lastCookieOptions.httpOnly,true);
    assert.equal(state.lastCookieOptions.sameSite,'lax');
  });
}
test('owner can mutate own item', async () => {
  const {state,actions}=harness(); await actions.updateQuantity(form({buildId:'a',itemId:'item-a',delta:1}));
  assert.equal(state.writes[0].args.data.quantity,3);
});
for (const name of ['getBuildExport','importBuildItems','duplicateBuild','addCustomItem','addGear','updateTripDetails','setItemCategory','updateQuantity','removeGear','updateTripDay']) {
  test(`${name} rejects anonymous access to account build`, async () => {
    const {state,actions}=harness();state.email=null;state.cookies.set('currentBuild','a');
    const input = name === 'getBuildExport' ? 'a' : form({buildId:'a',itemId:'item-a',dayId:'day-a',payload:'{}',delta:1});
    await assert.rejects(actions[name](input), /Build not found/);
    assert.deepEqual(state.writes,[]);
  });
}
test('missing child IDs are rejected instead of becoming unfiltered Prisma queries',async()=>{
  const {access}=harness();
  await assert.rejects(access.requireBuildItemAccess('a',undefined),/Item not found/);
  await assert.rejects(access.requireTripDayAccess('a',undefined),/Day not found/);
});
for (const email of ['a@test',null]) {
  test(`new build ownership for ${email || 'guest'}`,async()=>{
    const {state,actions}=harness();state.email=email;
    await assert.rejects(actions.createBuild(form({name:'Trip'})),/REDIRECT:\/build\/copy/);
    assert.equal(state.writes[0].args.data.userId,email?'user-a':null);
    assert.equal(state.cookies.get('currentBuild'),'copy');
    assert.equal(state.cookies.has(token.guestBuildCookieName('copy')),!email);
  });
}
test('claim uses the submitted authorized build even when currentBuild points elsewhere',async()=>{
  const {state,actions}=harness();state.cookies.set('currentBuild','b');
  state.cookies.set(token.guestBuildCookieName('guest'),token.createGuestBuildToken('guest'));
  await actions.claimCurrentBuild(form({buildId:'guest'}));
  assert.equal(state.builds[2].userId,'user-a');
  assert.equal(state.builds[1].userId,'user-b');
});


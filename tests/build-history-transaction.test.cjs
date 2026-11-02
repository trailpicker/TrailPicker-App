const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { stripTypeScriptTypes } = require('node:module');

function harness() {
  const state = {
    build: {
      id: 'build-1', userId: 'user-1', name: 'Pack', destinationId: null,
      location: null, locationLat: null, locationLng: null,
      startDate: null, endDate: null, people: 1, minTemperature: null,
      conditions: null, routeWaypoints: null, tripLogistics: null,
      items: [], days: [], updatedAt: new Date(),
    },
    revisions: [],
  };
  let failRevision = false;
  const calls = [];
  const prisma = {
    $transaction: async (fn) => {
      // In-memory transaction staging: only successful callbacks are committed.
      const next = structuredClone(state);
      const tx = {
        $queryRaw: async () => { calls.push('lock'); return [{ locked: 1 }]; },
        build: {
          findUnique: async ({where}) => next.build.id === where.id && next.build.userId === where.userId ? next.build : null,
          update: async ({data}) => { Object.assign(next.build, data); calls.push('build.update'); return next.build; },
        },
        buildRevision: {
          findFirst: async () => next.revisions.at(-1) || null,
          create: async ({data}) => {
            if (failRevision) throw Error('history write failed');
            const row = { ...data, id:`rev-${next.revisions.length}`, createdAt:new Date() };
            next.revisions.push(row); calls.push('revision.create'); return row;
          },
          update: async ({where, data}) => {
            const row = next.revisions.find(x=>x.id===where.id); Object.assign(row,data); calls.push('revision.update'); return row;
          },
        },
      };
      const result = await fn(tx);
      state.build = next.build;
      state.revisions = next.revisions;
      return result;
    },
  };
  const source = stripTypeScriptTypes(fs.readFileSync(path.join(__dirname,'../lib/build-history.ts'), 'utf8'));
  const names = [...source.matchAll(/export (?:async )?function (\w+)|export const (\w+)/g)].map(m=>m[1]||m[2]);
  const js = source.replace(/import ["']server-only["'];/g, '')
    .replace(/import\s+\{([^}]+)\}\s+from\s+["']([^"']+)["'];/g, (_, names, spec) => `const {${names}} = require(${JSON.stringify(spec)});`)
    .replace(/export /g,'');
  const history = new Function('require', js + `\nreturn {${names.join(',')}};`)(spec => spec === '@/lib/prisma' ? {prisma} : require(spec));
  return {state,history,calls,setFail: value=>{failRevision=value;}};
}

test('a baseline is created once, under the same lock as each mutation', async()=>{
  const {state,history,calls} = harness();
  await history.mutateBuildWithRevision('build-1','user-1','trip','Changed people', async tx=>{
    await tx.build.update({data:{people:2}});
  });
  assert.equal(state.build.people,2);
  assert.deepEqual(state.revisions.map(r=>r.action),['baseline','trip']);
  await history.mutateBuildWithRevision('build-1','user-1','trip','Changed people again', async tx=>{
    await tx.build.update({data:{people:3}});
  });
  assert.equal(state.revisions.filter(r=>r.action==='baseline').length,1);
  assert.equal(calls[0],'lock');
});

test('failed history recording rolls back its build mutation',async()=>{
  const {state,history,setFail} = harness();
  await history.mutateBuildWithRevision('build-1','user-1','settings','First', async tx=>{
    await tx.build.update({data:{people:2}});
  });
  setFail(true);
  await assert.rejects(history.mutateBuildWithRevision('build-1','user-1','import','Fail', async tx=>{
    await tx.build.update({data:{people:99}});
  }),/history write failed/);
  assert.equal(state.build.people,2);
  assert.equal(state.revisions.length,2);
});

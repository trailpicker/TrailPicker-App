const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const Module = require('node:module');
const path = require('node:path');
const ts = require('typescript');
const ROOT = path.resolve(__dirname, '..');

function harness(saveBehavior = async () => {}) {
  const saved = [];
  const hooks = [];
  const timers = new Map();
  const formHandlers = new Map();
  const windowHandlers = new Map();
  const form = {
    fields: new Map([['buildId','trip-1'], ['notes','initial']]),
    checkValidity: () => true,
    addEventListener: (name, fn) => formHandlers.set(name, fn),
    removeEventListener: (name) => formHandlers.delete(name),
    emit: (name) => formHandlers.get(name)?.(),
  };
  class FakeFormData {
    constructor(source) { this.fields = new Map(source?.fields ?? []); }
    entries() { return this.fields.entries(); }
    forEach(fn) { this.fields.forEach((value,key) => fn(value,key)); }
    append(key,value) { this.fields.set(key,value); }
    set(key,value) { this.fields.set(key,value); }
    get(key) { return this.fields.get(key) ?? null; }
  }
  class FakeObserver {
    constructor(cb) { this.cb = cb; observer = this; }
    observe() {}
    disconnect() {}
    fire() { this.cb([{type:'attributes'}]); }
  }
  let observer;
  const original = {
    FormData: global.FormData, MutationObserver: global.MutationObserver,
    window: global.window, setTimeout: global.setTimeout, clearTimeout: global.clearTimeout,
  };
  global.FormData = FakeFormData;
  global.MutationObserver = FakeObserver;
  global.window = {
    addEventListener: (name, fn) => windowHandlers.set(name,fn),
    removeEventListener: (name) => windowHandlers.delete(name),
  };
  global.setTimeout = fn => { const id = Symbol(); timers.set(id,fn); return id; };
  global.clearTimeout = id => { timers.delete(id); };
  const react = {
    useRef: (() => {let n=0; return (initial) => ({current:n++===0?form:initial});})(),
    useEffect: fn => hooks.push(fn),
  };
  const saveStatus = { clearBuildDirty:()=>{},failBuildSave:()=>{},markBuildDirty:()=>{} };
  const originalLoad = Module._load;
  Module._load = function(request, parent, main) {
    if (request === 'react') return react;
    if (request === '@/lib/build-save-status') return saveStatus;
    return originalLoad.call(this,request,parent,main);
  };
  let hook;
  try {
    const source = fs.readFileSync(path.join(ROOT,'lib/use-build-autosave.ts'),'utf8');
    const output = ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022},reportDiagnostics:true});
    assert.equal(output.diagnostics?.filter(d=>d.category===ts.DiagnosticCategory.Error).length??0,0);
    const loadedModule = new Module(path.join(ROOT,'lib/use-build-autosave.ts'),module);
    loadedModule.filename = path.join(ROOT,'lib/use-build-autosave.ts');
    loadedModule.paths = Module._nodeModulePaths(ROOT);
    loadedModule._compile(output.outputText,loadedModule.filename);
    hook = loadedModule.exports.useBuildAutosave({buildId:'trip-1',resource:'logistics',save:async data=>{ saved.push(new Map(data.entries())); await saveBehavior(); }});
  } finally { Module._load = originalLoad; }
  const cleanups = hooks.map(fn => fn()).filter(Boolean);
  return {
    hook,form,saved,timers,
    observe:()=>observer.fire(),
    flush:async()=>{const pending=[...timers.values()];timers.clear();for(const fn of pending) fn();for(let i=0;i<8;i++)await Promise.resolve();},
    cleanup:()=>{for(const fn of cleanups.reverse())fn();for(const [key,val] of Object.entries(original)) global[key]=val;},
  };
}

test('hydration/server input-attribute updates do not launch a save or flush on unmount',async()=>{
  const h=harness();
  try {
    h.form.fields.set('notes','server-rendered');h.observe();
    assert.equal(h.timers.size,0);
    assert.equal(h.saved.length,0);
  } finally {h.cleanup();}
  assert.equal(h.saved.length,0);
});

test('real user typing still autosaves, without subsequent server refresh echo saves',async()=>{
  const h=harness();
  try {
    h.form.fields.set('notes','typed');h.form.emit('input');
    assert.equal(h.timers.size,1);
    await h.flush();
    assert.equal(h.saved.length,1);
    assert.equal(h.saved[0].get('notes'),'typed');
    h.form.fields.set('notes','new server props');h.observe();
    assert.equal(h.timers.size,0);
    assert.equal(h.saved.length,1);
  } finally {h.cleanup();}
});

test('server-prop changes during an in-flight save do not trigger another save',async()=>{
  let release;
  const h=harness(() => new Promise(resolve=>{ release=resolve; }));
  try {
    h.form.fields.set('notes','typed'); h.form.emit('input');
    await h.flush();
    assert.equal(h.saved.length,1);
    // Simulates a server revalidation writing canonical values into the form.
    h.form.fields.set('notes','server-canonical'); h.observe();
    assert.equal(h.timers.size,1);
    release();
    for(let i=0;i<12;i++) await Promise.resolve();
    assert.equal(h.timers.size,0);
    assert.equal(h.saved.length,1);
  } finally {h.cleanup();}
});

test('explicit destination-picker confirmation can still autosave hidden field updates',async()=>{
  const h=harness();
  try {
    h.hook.markUserEdit();
    h.form.fields.set('destinationId','new-destination');h.observe();
    assert.equal(h.timers.size,1);
    await h.flush();
    assert.equal(h.saved.length,1);
    assert.equal(h.saved[0].get('destinationId'),'new-destination');
  } finally {h.cleanup();}
});

test('manual Save action works without a prior input event',async()=>{
  const h=harness();
  try {
    const data=new FormData();data.set('buildId','trip-1');data.set('notes','manual');
    await h.hook.saveNow(data);
    assert.equal(h.saved.length,1);
    assert.equal(h.saved[0].get('notes'),'manual');
  } finally {h.cleanup();}
});

test('TripEditForm marks destination selection as intentional before changing hidden fields',()=>{
  const source=fs.readFileSync(path.join(ROOT,'components/builder/TripPlanner/TripEditForm.tsx'),'utf8');
  const pos=source.indexOf('autosave.markUserEdit();');
  assert.ok(pos>0);
  assert.ok(pos<source.indexOf('setDestination(next);'));
});

const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const componentPath = path.resolve(__dirname, '../components/build/DateRangePicker.tsx');
const source = fs.readFileSync(componentPath, 'utf8');

test('calendar positioning depends on stable date values, not recreated Date instances', () => {
  assert.match(source, /const startKey = start \? dateValue\(start\) : "";/);
  assert.match(source, /const endKey = end \? dateValue\(end\) : "";/);
  assert.match(source, /useLayoutEffect\([^\n]+\[open, viewMonth, startKey, endKey\]\)/);
  assert.match(source, /previous\.top === nextPosition\.top[\s\S]*?\? previous : nextPosition/);
});

let ts;
try { ts = require('typescript'); } catch { ts = null; }

test('opening a controlled calendar settles without a React layout-effect render loop', { skip: !ts && 'typescript not installed' }, () => {
  const transpiled = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, target: ts.ScriptTarget.ES2022 },
    reportDiagnostics: true,
  });
  assert.deepEqual(transpiled.diagnostics, []);
  const hooks = [], layouts = [];
  let hookIndex = 0, dirty = false, renders = 0;
  const react = {
    useState(initial) {
      const i = hookIndex++;
      if (!hooks[i]) hooks[i] = { value: typeof initial === 'function' ? initial() : initial };
      return [hooks[i].value, value => {
        const next = typeof value === 'function' ? value(hooks[i].value) : value;
        if (!Object.is(hooks[i].value, next)) { hooks[i].value = next; dirty = true; }
      }];
    },
    useRef(initial) { const i = hookIndex++; return hooks[i] ||= { current: initial }; },
    useId() { hookIndex++; return 'test-picker'; },
    useEffect() { hookIndex++; },
    useLayoutEffect(effect, deps) {
      const i = hookIndex++;
      if (!hooks[i]) hooks[i] = { deps: null };
      const prev = hooks[i].deps;
      if (!prev || prev.length !== deps.length || prev.some((value, n) => !Object.is(value, deps[n]))) {
        hooks[i].deps = deps;
        layouts.push(effect);
      }
    },
  };
  const jsx = (type, props) => ({ type, props });
  const scope = {
    exports: {},
    require(name) {
      if (name === 'react') return react;
      if (name === 'react/jsx-runtime') return { jsx, jsxs: jsx };
      if (name === 'react-dom') return { createPortal: node => node };
      throw new Error('Unexpected module: ' + name);
    },
    document: { body: {} },
    window: { innerHeight: 800, innerWidth: 1100 },
    Date, Math,
  };
  vm.runInNewContext(transpiled.outputText, scope, { filename: componentPath });
  const Picker = scope.exports.default;
  const props = { startName: 'start', endName: 'end', startValue: '2026-11-15', endValue: '2026-11-16' };
  const render = () => {
    hookIndex = 0; dirty = false;
    const tree = Picker(props);
    renders++;
    for (const effect of layouts.splice(0)) effect();
    return tree;
  };
  function find(node, predicate) {
    if (!node || typeof node !== 'object') return null;
    if (predicate(node)) return node;
    const children = node.props?.children;
    if (Array.isArray(children)) {
      for (const child of children) { const result = find(child, predicate); if (result) return result; }
    } else return find(children, predicate);
    return null;
  }
  const tree = render();
  const trigger = find(tree, node => node.type === 'button' && node.props?.['aria-haspopup'] === 'dialog');
  assert.ok(trigger);
  trigger.props.ref.current = {
    getBoundingClientRect: () => ({ top: 100, bottom: 144, left: 150, right: 300 }),
    focus() {},
  };
  trigger.props.onClick();
  for (let n = 0; n < 30; n++) { if (n === 0 || dirty) render(); else break; }
  assert.ok(renders <= 5, `Calendar kept updating after ${renders} renders`);
});

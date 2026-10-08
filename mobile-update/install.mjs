import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';

const expected = {
  "app/build/[id]/page.tsx": [
    "b0388bbfcf33430722c80a8fb84af01a5c322c8c31a99624e1fa179e9742be2b"
  ],
  "components/builder/AddCustomItemForm.tsx": [
    "a309003df0eac10c971bcc09d46e0102efc2f5311759be8bb1c82599166931fa"
  ],
  "components/builder/BuildHeader.tsx": [
    "4048db95a456eaff2016bdd39d818d488fb7b335e275ba660ef6cb26e30271cf"
  ],
  "components/builder/BuildRow.tsx": [
    "1f732a620c8d897ecfe5b7233db2fc26580863d9579c3fcbd90eef850146481a"
  ],
  "components/builder/CompatibilityBar.tsx": [
    "422f4256cae9edb43879de698128a88b1788d0d43ac0ef9b010ec40c05b38840"
  ],
  "components/builder/CostSummary.tsx": [
    "41fda40a5098ffcc9acf7bdfee524cba24830a3fa8c1147d4e03660791ab065a"
  ],
  "components/builder/ItemCategoryToggle.tsx": [
    "9fc2e8e6c23561ccb5f37addc804e496cd734318bca7a1bac6bdeff133a7af29"
  ],
  "components/builder/QuantityStepper.tsx": [
    "cc658837c7e84013a65515edef95fe3cd3ed564f9210b3b45a8c14343bbe0d66"
  ],
  "components/builder/ShareBar.tsx": [
    "f8a49a428913548e28e3e76aaccc762c6af61274e93c1d107b133b833dccd961"
  ],
  "components/builder/WeightSummary.tsx": [
    "7e1513f4f7ff1b098cc58da6d2b32e055b279d34c93bd666678975d2abf193c2"
  ]
};
const hash = text => createHash('sha256').update(text.replaceAll('\r\n', '\n').trimEnd()).digest('hex');
const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(process.argv[2] || '.');
try {
  if (!fs.existsSync(path.join(root, 'package.json')) || !fs.existsSync(path.join(root, 'lib/build-access.ts'))) throw new Error('Run this from your TrailPicker project root.');
  const changes = [];
  function collect(directory, relative = '') {
    for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
      const rel = path.join(relative, entry.name);
      const source = path.join(directory, entry.name);
      if (entry.isDirectory()) { collect(source, rel); continue; }
      const key = rel.split(path.sep).join('/');
      const destination = path.join(root, rel);
      const next = fs.readFileSync(source, 'utf8');
      if (fs.existsSync(destination)) {
        const old = fs.readFileSync(destination, 'utf8');
        if (hash(old) === hash(next)) continue;
        if (!expected[key]?.includes(hash(old))) throw new Error(`Your ${key} differs from your latest uploaded project. No files changed. Send the current file or merge files/ manually.`);
      } else if (key in expected) throw new Error(`Missing ${key}. No files changed.`);
      changes.push([destination, next]);
    }
  }
  collect(path.join(here, 'files'));
  for (const [file] of changes) if (fs.existsSync(file + '.before-mobile-layout')) throw new Error(`Backup already exists: ${file}.before-mobile-layout. No files changed.`);
  for (const [file, text] of changes) {
    fs.mkdirSync(path.dirname(file), { recursive: true });
    if (fs.existsSync(file)) fs.copyFileSync(file, file + '.before-mobile-layout');
    fs.writeFileSync(file, text);
  }
  console.log(changes.length ? `Installed ${changes.length} mobile layout files. No database migration required.` : 'Mobile layout update already installed.');
  console.log('Run npm run build, then restart npm run dev.');
} catch (error) { console.error(error.message); process.exitCode = 1; }




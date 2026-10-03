import {
  Dirent,
  existsSync,
  lstatSync,
  readFileSync,
  readdirSync,
  statSync,
  writeFileSync,
} from 'node:fs';
import path from 'node:path';
import process from 'node:process';

interface Config {
  output: string;
  includeExtensions: string[];
  ignoreDirs: string[];
  ignoreFiles: string[];
  maxFileBytes: number;
  includeLockfiles: boolean;
  includeHiddenFiles: boolean;
}

interface FileEntry {
  absPath: string;
  relPath: string;
  ext: string;
  bytes: number;
  lines: number;
  text?: string;
  skippedReason?: string;
}

interface ImportLink {
  from: string;
  raw: string;
  resolved: string | null;
}

const DEFAULT_CONFIG: Config = {
  output: 'PROJECT_CONTEXT.md',
  includeExtensions: [
    '.ts', '.tsx', '.js', '.jsx', '.mjs', '.cjs',
    '.json', '.jsonc', '.md', '.mdx', '.css', '.scss', '.html',
    '.yaml', '.yml', '.toml', '.ini', '.txt', '.env.example', '.gitignore', '.npmrc',
  ],
  ignoreDirs: [
    '.git', 'node_modules', 'dist', 'build', 'coverage',
    '.cache', '.next', '.turbo', '.vite', 'out', 'target',
  ],
  ignoreFiles: ['PROJECT_CONTEXT.md', 'PROJECT_STRUCTURE.md'],
  maxFileBytes: 300_000,
  includeLockfiles: true,
  includeHiddenFiles: true,
};

const LOCKFILES = new Set([
  'package-lock.json',
  'pnpm-lock.yaml',
  'yarn.lock',
  'bun.lock',
  'bun.lockb',
]);

const TEXT_FILE_OVERRIDES = new Set(['.env.example', '.gitignore', '.npmrc']);

function parseArgs(argv: string[]): { root: string; output?: string; configPath?: string; includeTests: boolean; noSource: boolean } {
  const args = [...argv];
  let root = process.cwd();
  let output: string | undefined;
  let configPath: string | undefined;
  let includeTests = false;
  let noSource = false;

  while (args.length) {
    const arg = args.shift()!;
    if (arg === '--root') root = path.resolve(args.shift() ?? '.');
    else if (arg === '--output') output = args.shift();
    else if (arg === '--config') configPath = path.resolve(args.shift() ?? 'docs.config.json');
    else if (arg === '--include-tests') includeTests = true;
    else if (arg === '--no-source') noSource = true;
    else if (arg === '--help' || arg === '-h') {
      printHelp();
      process.exit(0);
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }

  return { root, output, configPath, includeTests, noSource };
}

function printHelp(): void {
  console.log(`
Project Context Generator

Usage:
  npm run docs -- [options]

Options:
  --root <dir>          Project root to scan. Default: current directory.
  --output <file>       Output Markdown file. Default: configured output.
  --config <file>       Config JSON file. Default: docs.config.json when present.
  --include-tests       Include common test/spec files even when ignored by a custom rule.
  --no-source            Generate structure/metadata without source code contents.
  --help, -h            Show this help.
`);
}

function loadConfig(root: string, configPath?: string): Config {
  const candidate = configPath ?? path.join(root, 'docs.config.json');
  if (!existsSync(candidate)) return { ...DEFAULT_CONFIG };

  const raw = JSON.parse(readFileSync(candidate, 'utf8')) as Partial<Config>;
  return {
    output: raw.output ?? DEFAULT_CONFIG.output,
    includeExtensions: raw.includeExtensions ?? DEFAULT_CONFIG.includeExtensions,
    ignoreDirs: raw.ignoreDirs ?? DEFAULT_CONFIG.ignoreDirs,
    ignoreFiles: raw.ignoreFiles ?? DEFAULT_CONFIG.ignoreFiles,
    maxFileBytes: raw.maxFileBytes ?? DEFAULT_CONFIG.maxFileBytes,
    includeLockfiles: raw.includeLockfiles ?? DEFAULT_CONFIG.includeLockfiles,
    includeHiddenFiles: raw.includeHiddenFiles ?? DEFAULT_CONFIG.includeHiddenFiles,
  };
}

function isLikelyBinary(buffer: Buffer): boolean {
  const sample = buffer.subarray(0, Math.min(buffer.length, 8192));
  return sample.includes(0);
}

function shouldIncludeFile(fileName: string, config: Config, includeTests: boolean): boolean {
  if (config.ignoreFiles.includes(fileName)) return false;
  if (!config.includeHiddenFiles && fileName.startsWith('.')) return false;
  if (LOCKFILES.has(fileName)) return config.includeLockfiles;
  if (includeTests && /\.(test|spec)\.[cm]?[jt]sx?$/.test(fileName)) return true;
  if (TEXT_FILE_OVERRIDES.has(fileName)) return true;
  return config.includeExtensions.includes(path.extname(fileName).toLowerCase());
}

function scanFiles(root: string, config: Config, includeTests: boolean): FileEntry[] {
  const results: FileEntry[] = [];

  function walk(dir: string): void {
    const entries = readdirSync(dir, { withFileTypes: true });
    entries.sort((a, b) => a.name.localeCompare(b.name));

    for (const entry of entries) {
      const abs = path.join(dir, entry.name);
      const rel = path.relative(root, abs).split(path.sep).join('/');

      if (entry.isDirectory()) {
        if (config.ignoreDirs.includes(entry.name)) continue;
        walk(abs);
        continue;
      }

      if (!entry.isFile()) continue;
      if (!shouldIncludeFile(entry.name, config, includeTests)) continue;

      let stat;
      try {
        stat = statSync(abs);
      } catch {
        continue;
      }

      const entryInfo: FileEntry = {
        absPath: abs,
        relPath: rel,
        ext: path.extname(entry.name).toLowerCase(),
        bytes: stat.size,
        lines: 0,
      };

      if (stat.size > config.maxFileBytes) {
        entryInfo.skippedReason = `File exceeds maxFileBytes (${formatBytes(config.maxFileBytes)}).`;
        results.push(entryInfo);
        continue;
      }

      try {
        const buffer = readFileSync(abs);
        if (isLikelyBinary(buffer)) {
          entryInfo.skippedReason = 'Likely binary file.';
        } else {
          entryInfo.text = buffer.toString('utf8').replaceAll('\r\n', '\n');
          entryInfo.lines = entryInfo.text === '' ? 0 : entryInfo.text.split('\n').length;
        }
      } catch (error) {
        entryInfo.skippedReason = `Could not read file: ${error instanceof Error ? error.message : String(error)}`;
      }

      results.push(entryInfo);
    }
  }

  walk(root);
  return results;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 ** 2) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 ** 2).toFixed(1)} MB`;
}

function buildTree(files: FileEntry[]): string {
  interface TreeNode { children: Map<string, TreeNode>; file?: boolean }
  const root: TreeNode = { children: new Map() };

  for (const file of files) {
    const parts = file.relPath.split('/');
    let node = root;
    for (const part of parts) {
      if (!node.children.has(part)) node.children.set(part, { children: new Map() });
      node = node.children.get(part)!;
    }
    node.file = true;
  }

  const lines: string[] = [];
  function render(node: TreeNode, prefix: string): void {
    const names = [...node.children.keys()].sort((a, b) => {
      const aNode = node.children.get(a)!;
      const bNode = node.children.get(b)!;
      if (aNode.file !== bNode.file) return aNode.file ? 1 : -1;
      return a.localeCompare(b);
    });

    names.forEach((name, index) => {
      const child = node.children.get(name)!;
      const last = index === names.length - 1;
      lines.push(`${prefix}${last ? '└── ' : '├── '}${name}${child.file ? '' : '/'}`);
      if (child.children.size) render(child, `${prefix}${last ? '    ' : '│   '}`);
    });
  }

  render(root, '');
  return lines.join('\n');
}

function extractImportLinks(files: FileEntry[], root: string): ImportLink[] {
  const sourceExtensions = new Set(['.ts', '.tsx', '.js', '.jsx', '.mjs', '.cjs']);
  const fileSet = new Set(files.map(f => f.relPath));
  const links: ImportLink[] = [];

  const importRegex = /(?:import\s+(?:[^'";]+?\s+from\s+)?|export\s+(?:[^'";]+?\s+from\s+)?|require\s*\(|import\s*\()(['"])(.+?)\1/g;

  for (const file of files) {
    if (!sourceExtensions.has(file.ext) || !file.text) continue;

    for (const match of file.text.matchAll(importRegex)) {
      const raw = match[2];
      if (!raw.startsWith('.')) continue;

      const baseAbs = path.resolve(path.dirname(file.absPath), raw);
      const rawExt = path.extname(baseAbs).toLowerCase();
      const extensionlessAbs = ['.js', '.jsx', '.mjs', '.cjs', '.ts', '.tsx'].includes(rawExt)
        ? baseAbs.slice(0, -rawExt.length)
        : baseAbs;
      const candidates = [
        baseAbs,
        `${extensionlessAbs}.ts`, `${extensionlessAbs}.tsx`, `${extensionlessAbs}.js`, `${extensionlessAbs}.jsx`, `${extensionlessAbs}.mjs`, `${extensionlessAbs}.cjs`,
        path.join(extensionlessAbs, 'index.ts'), path.join(extensionlessAbs, 'index.tsx'),
        path.join(extensionlessAbs, 'index.js'), path.join(extensionlessAbs, 'index.jsx'),
      ];
      const resolved = candidates.map(candidate => path.relative(root, candidate).split(path.sep).join('/'))
        .find(candidate => fileSet.has(candidate)) ?? null;

      links.push({ from: file.relPath, raw, resolved });
    }
  }

  return links;
}

function findTodos(files: FileEntry[]): string[] {
  const items: string[] = [];
  for (const file of files) {
    if (!file.text) continue;
    const lines = file.text.split('\n');
    lines.forEach((line, index) => {
      const match = line.match(/\b(TODO|FIXME|HACK|XXX)\b[:\-]?\s*(.*)$/i);
      if (match) {
        items.push(`${file.relPath}:${index + 1} **${match[1].toUpperCase()}** ${match[2].trim()}`);
      }
    });
  }
  return items;
}

function chooseFence(text: string): string {
  const longest = Math.max(0, ...(text.match(/`+/g) ?? []).map(s => s.length));
  return '`'.repeat(Math.max(3, longest + 1));
}

function languageForFile(file: FileEntry): string {
  const byName: Record<string, string> = {
    '.md': 'markdown', '.mdx': 'mdx', '.json': 'json', '.jsonc': 'jsonc',
    '.css': 'css', '.scss': 'scss', '.html': 'html', '.yaml': 'yaml', '.yml': 'yaml',
    '.toml': 'toml', '.ini': 'ini', '.txt': 'text',
  };
  const name = path.basename(file.relPath);
  if (name === 'Dockerfile') return 'dockerfile';
  if (name === '.gitignore' || name === '.npmrc' || name === '.env.example') return 'text';
  if (byName[file.ext]) return byName[file.ext];
  if (['.ts', '.tsx', '.js', '.jsx', '.mjs', '.cjs'].includes(file.ext)) return 'typescript';
  return 'text';
}

function safeRelativeOutput(root: string, output: string): string {
  return path.isAbsolute(output) ? output : path.resolve(root, output);
}

function createMarkdown(root: string, files: FileEntry[], config: Config, options: { noSource: boolean }): string {
  const now = new Date().toISOString();
  const links = extractImportLinks(files, root);
  const todos = findTodos(files);
  const included = files.filter(f => f.text !== undefined);
  const skipped = files.filter(f => f.skippedReason);
  const totalBytes = files.reduce((sum, f) => sum + f.bytes, 0);
  const totalLines = included.reduce((sum, f) => sum + f.lines, 0);

  const internalLinks = links.filter(link => link.resolved);
  const unresolvedRelative = links.filter(link => !link.resolved);

  const packageJson = files.find(f => f.relPath === 'package.json' && f.text);
  let packageSummary = '';
  if (packageJson?.text) {
    try {
      const pkg = JSON.parse(packageJson.text) as Record<string, unknown>;
      const scripts = pkg.scripts && typeof pkg.scripts === 'object' ? Object.keys(pkg.scripts as object) : [];
      packageSummary = [
        `- Name: ${typeof pkg.name === 'string' ? pkg.name : 'unknown'}`,
        `- Version: ${typeof pkg.version === 'string' ? pkg.version : 'unknown'}`,
        `- Scripts: ${scripts.length ? scripts.join(', ') : 'none detected'}`,
        `- Package type: ${typeof pkg.type === 'string' ? pkg.type : 'not specified'}`,
      ].join('\n');
    } catch {
      packageSummary = '- package.json could not be parsed as standard JSON.';
    }
  }

  const sections: string[] = [];
  sections.push(`# PROJECT CONTEXT\n\n> Generated automatically. Treat source files as authoritative; summaries are derived metadata.\n\n- Generated: ${now}\n- Root: \`${path.basename(root)}\`\n- Files scanned: ${files.length}\n- Files included with readable text: ${included.length}\n- Total included source lines: ${totalLines.toLocaleString()}\n- Total scanned size: ${formatBytes(totalBytes)}\n- Max file size: ${formatBytes(config.maxFileBytes)}\n`);

  sections.push(`## PROJECT STRUCTURE\n\n\`\`\`text\n${buildTree(files)}\n\`\`\``);

  if (packageSummary) sections.push(`## PACKAGE SUMMARY\n\n${packageSummary}`);

  sections.push(`## INTERNAL IMPORTS / DEPENDENCIES\n\n${internalLinks.length
    ? internalLinks.map(link => `- \`${link.from}\` → \`${link.resolved}\` (import: \`${link.raw}\`)`).join('\n')
    : '_No relative internal imports were detected._'}`);

  if (unresolvedRelative.length) {
    sections.push(`## UNRESOLVED RELATIVE IMPORTS\n\n${unresolvedRelative.map(link => `- \`${link.from}\` → \`${link.raw}\``).join('\n')}`);
  }

  sections.push(`## TODO / FIXME / HACK\n\n${todos.length ? todos.map(item => `- ${item}`).join('\n') : '_None detected._'}`);

  if (skipped.length) {
    sections.push(`## SKIPPED FILES\n\n${skipped.map(file => `- \`${file.relPath}\` — ${file.skippedReason}`).join('\n')}`);
  }

  sections.push(`## FILE INDEX\n\n| File | Size | Lines | Status |\n|---|---:|---:|---|\n${files.map(file => `| \`${file.relPath}\` | ${formatBytes(file.bytes)} | ${file.lines || '—'} | ${file.skippedReason ? `Skipped: ${escapeTable(file.skippedReason)}` : 'Included'} |`).join('\n')}`);

  if (!options.noSource) {
    sections.push('## SOURCE FILES');
    for (const file of included) {
      const fence = chooseFence(file.text!);
      sections.push(`### \`${file.relPath}\`\n\n${fence}${languageForFile(file)}\n${file.text}\n${fence}`);
    }
  }

  sections.push(`## AI USAGE NOTES\n\n- Use the **source file sections** as the ground truth for implementation details.\n- The dependency section is heuristic and only resolves relative imports when the target file exists in the snapshot.\n- Generated/build/cache directories are excluded by default.\n- Files larger than the configured limit are listed but their contents are omitted.\n- Re-run the generator after changing the project to refresh this snapshot.`);

  return `${sections.join('\n\n')}\n`;
}

function escapeTable(value: string): string {
  return value.replaceAll('|', '\\|').replaceAll('\n', ' ');
}

function writeStructureFile(root: string, files: FileEntry[]): void {
  const output = path.join(root, 'PROJECT_STRUCTURE.md');
  const lines = [
    '# PROJECT STRUCTURE',
    '',
    '> Generated automatically by Project Context Generator.',
    '',
    '```text',
    buildTree(files),
    '```',
    '',
    '## Files',
    '',
    ...files.map(f => `- \`${f.relPath}\` (${formatBytes(f.bytes)}, ${f.lines || 'unknown'} lines)`),
    '',
  ];
  writeFileSync(output, lines.join('\n'), 'utf8');
}

function main(): void {
  const options = parseArgs(process.argv.slice(2));
  if (!existsSync(options.root) || !lstatSync(options.root).isDirectory()) {
    throw new Error(`Project root does not exist or is not a directory: ${options.root}`);
  }

  const config = loadConfig(options.root, options.configPath);
  const files = scanFiles(options.root, config, options.includeTests);
  const outputPath = safeRelativeOutput(options.root, options.output ?? config.output);
  const markdown = createMarkdown(options.root, files, config, { noSource: options.noSource });
  writeFileSync(outputPath, markdown, 'utf8');

  if (path.basename(outputPath) !== 'PROJECT_STRUCTURE.md') {
    writeStructureFile(options.root, files);
  }

  console.log(`Generated ${path.relative(process.cwd(), outputPath) || outputPath}`);
  console.log(`Scanned ${files.length} files; ${files.filter(f => f.text !== undefined).length} included with readable text.`);
}

try {
  main();
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
}

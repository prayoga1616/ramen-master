// RAMEN MASTER hand-in. Run with Node 22.18+: node main.ts
import { copyFileSync, lstatSync, mkdirSync, readdirSync, realpathSync, rmSync, writeFileSync } from 'node:fs';
import { isAbsolute, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-game.ts';

const repository = realpathSync(fileURLToPath(new URL('.', import.meta.url)));
const limits = {
  text_max_bytes: 160 * 1024,
  screenshots: { max: 4, max_bytes: 256 * 1024 },
  game_max_files: 993,
  game_max_bytes: 48 * 1024 * 1024,
  game_path_max_bytes: 1000,
};

// Inventory first, so a missing directory or special file fails before copying.
function inventory(directory: string, prefix = ''): { path: string; directory: boolean }[] {
  if (!lstatSync(directory).isDirectory()) throw new Error(`Expected a plain directory: ${directory}`);
  const found: { path: string; directory: boolean }[] = [];
  const children = readdirSync(directory, { withFileTypes: true });
  children.sort((a, b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0);
  for (const child of children) {
    const path = join(prefix, child.name);
    const source = join(directory, child.name);
    const stat = lstatSync(source);
    if (stat.isDirectory()) {
      found.push({ path, directory: true }, ...inventory(source, path));
    } else if (stat.isFile()) {
      found.push({ path, directory: false });
    } else {
      throw new Error(`Only regular files and directories may be handed in: ${source}`);
    }
  }
  return found;
}

function contains(parent: string, candidate: string): boolean {
  const tail = relative(parent, candidate);
  return tail === '' || (!isAbsolute(tail) && tail !== '..' && !tail.startsWith(`..${sep}`));
}

const trees = ['game', 'screenshots'].map(name => ({
  name,
  source: join(repository, name),
  entries: inventory(join(repository, name)),
}));

const requested = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
if (!requested.trim()) throw new Error('MAKEFUN_OUTPUT_DIR must not be empty.');
mkdirSync(resolve(requested), { recursive: true });
const destination = realpathSync(resolve(requested));
if (contains(destination, repository) || trees.some(tree => contains(tree.source, destination))) {
  throw new Error('Choose an output directory that cannot overwrite or recurse into the source trees.');
}

// Replace only our own artifacts; repeated runs must not retain obsolete files.
rmSync(join(destination, 'dossier.json'), { force: true });
for (const tree of trees) {
  const target = join(destination, tree.name);
  rmSync(target, { recursive: true, force: true });
  mkdirSync(target, { recursive: true });
  for (const entry of tree.entries) {
    const outputPath = join(target, entry.path);
    if (entry.directory) mkdirSync(outputPath, { recursive: true });
    else copyFileSync(join(tree.source, entry.path), outputPath);
  }
}

// buildDossier owns serialization: never stringify, decode, or append a newline.
writeFileSync(join(destination, 'dossier.json'), buildDossier(destination, limits));
console.log(`RAMEN MASTER hand-in ready: ${destination}`);

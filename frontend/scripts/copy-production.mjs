import { cp, readdir, unlink } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = fileURLToPath(new URL('../../', import.meta.url));
const built = path.join(root, 'frontend', 'dist');
const publicRoot = path.join(root, 'backend', 'public');
const assets = path.join(publicRoot, 'assets');
const current = new Set(await readdir(path.join(built, 'assets')));
await cp(path.join(built, 'assets'), assets, { recursive: true });
await cp(path.join(built, 'index.html'), path.join(publicRoot, 'index.html'));
// Remove only superseded generated bundles; preserve API, rewrite files and other assets.
for (const entry of await readdir(assets, { withFileTypes: true })) {
  if (!entry.isFile() || current.has(entry.name) || !/^(index|ServicePage)-[\w-]+\.(js|css)(\.map)?$/.test(entry.name)) continue;
  const target = path.resolve(assets, entry.name);
  if (path.dirname(target) !== path.resolve(assets)) throw new Error('Invalid generated asset path');
  await unlink(target);
}
console.log('Updated backend/public with the production build; API and hosting configuration preserved.');

import assert from 'node:assert/strict';
import { navigationPages, routeAliases } from '../src/data/navigation.js';
const origin = process.argv[2] || 'http://127.0.0.1:8765';
const paths = [...navigationPages.map(page => page.path), ...routeAliases.map(alias => alias.path)];
const results = await Promise.allSettled(paths.map(async path => {
  const response = await fetch(origin + path);
  assert.equal(response.status, 200, `${path}: direct request failed`);
  assert.match(response.headers.get('content-type'), /text\/html/);
  assert.match(await response.text(), /id="root"/);
}));
for (const result of results) if (result.status === 'rejected') throw result.reason;
for (const path of ['/api/missing.php', '/assets/missing.js']) {
  assert.equal((await fetch(origin + path)).status, 404, `${path}: incorrectly rewritten to HTML`);
}
const invalid = await fetch(origin + '/api/submit.php', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{}' });
assert.equal(invalid.status, 422);
assert.equal((await invalid.json()).ok, false);
const html = await (await fetch(origin)).text();
for (const match of html.matchAll(/(?:src|href)="(\/assets\/[^\"]+)"/g)) {
  assert.equal((await fetch(origin + match[1])).status, 200, `Missing production asset: ${match[1]}`);
}
console.log(`PASS: ${paths.length} direct URLs, static assets, missing-resource 404s and non-writing form validation.`);

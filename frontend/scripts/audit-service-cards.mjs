import assert from 'node:assert/strict';
import { writeFile } from 'node:fs/promises';
import { services } from '../src/data/services.js';
import { pageById, pageForPath } from '../src/data/navigation.js';
import { servicePageByPath } from '../src/data/servicePages.js';
import { researchStartPages } from '../src/data/researchStartPages.js';
import { implementationPages } from '../src/data/implementationPages.js';
import { remainingImplementationPages } from '../src/data/remainingImplementationPages.js';

assert.equal(services.length, 24);
assert.equal(new Set(services.map(service => service.path)).size, 24);
const custom = [...researchStartPages, ...implementationPages, ...remainingImplementationPages];
for (const service of services) {
  assert.equal(pageForPath(service.path).id, service.id);
  assert.equal(service.path, pageById[service.id].path);
  assert(service.description && service.category);
  assert(custom.some(page => page.path === service.path) || servicePageByPath[service.path], `Missing page: ${service.id}`);
}
console.log('PASS: 24 unique cards resolve to 24 existing pages through the shared navigation catalogue.');
if (process.argv.includes('--report')) {
  const report = `# Our Services card audit\n\nAll 24 pages and routes existed before this task. The old navigation registry's existing flag describes an earlier navigation task, not whether a page existed at the start of this change. No pages or routes were duplicated.\n\nThe original cards were description-toggle buttons with no navigation. They now use full-card React Router links, accessible labels and descriptions, native new-tab behavior, desktop hover and keyboard focus styling. Touch devices expose the description without requiring an extra tap. Existing shared header, footer, active categories and scroll reset are retained. Custom pages now share focused related links and the paired contact/quote CTA.\n\n| Service | Existing page? | Existing route | Action |\n| --- | --- | --- | --- |\n${services.map(service => `| ${service.title} | Yes | ${service.path} | Existing / Connected |`).join('\n')}\n\nTotal Services: 24\n\nExisting Pages Reused: 24\n\nNew Pages Created: 0\n\nBroken Links Fixed: 24 non-navigating cards\n\nRemaining Missing Pages: 0\n\nValidation commands: node frontend/scripts/audit-service-cards.mjs; npm --prefix frontend run audit:navigation; npm --prefix frontend run build; node frontend/scripts/check-server.mjs. PHP fallback is exercised locally; Apache rewrite configuration is retained but requires mod_rewrite on the deployment host.\n`;
  await writeFile(new URL('../../service-cards-audit.md', import.meta.url), report);
}

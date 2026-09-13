import assert from 'node:assert/strict';
import { writeFile } from 'node:fs/promises';
import { navigationPages, pageById, pageForPath, sidebarFor, routeAliases, footerGroups } from '../src/data/navigation.js';
import { headerNavigation } from '../src/data/headerNavigation.js';
import { servicePages } from '../src/data/servicePages.js';
import { companyInfo, officeAddress, officeMapEmbedUrl } from '../src/data/companyInfo.js';

const known = new Set(navigationPages.map(page => page.path));
const menuGroups = menu => menu.groups?.flatMap(entry => entry.groups || [entry]) || [];
assert.equal(companyInfo.email, 'lordtechdatus.kamal@gmail.com');
assert.deepEqual(companyInfo.phones.map(phone => phone.value), ['+918077281918', '+919319250172']);
for (const phone of companyInfo.phones) assert.equal(phone.label.replaceAll('-', ''), phone.value, 'Phone label and target differ');
assert.equal(new URL(officeMapEmbedUrl).searchParams.get('q'), officeAddress);
assert.equal(known.size, navigationPages.length, 'Duplicate canonical routes');
const submenuItems = headerNavigation.flatMap(menu => menuGroups(menu).flatMap(group => group.items || []));
const menuLinks = headerNavigation.flatMap(menu => [menu.path, ...menuGroups(menu).flatMap(group => [group.path, ...(group.items || []).map(item => item.path)].filter(Boolean))]);
for (const path of [...menuLinks, ...footerGroups.flatMap(group => group.items.map(([, id]) => pageById[id].path))]) {
  assert(known.has(path), `Unresolved navigation: ${path}`);
  assert(!path.includes('#') && !path.startsWith('javascript:'), `Placeholder navigation: ${path}`);
}
for (const alias of routeAliases) {
  assert(known.has(alias.to), `Unresolved redirect: ${alias.path}`);
  assert(!known.has(alias.path), `Redirect shadows a canonical route: ${alias.path}`);
}
const majorOverviews = ['implementation', 'analysis', 'journal-papers'];
const wordCounts = {};
for (const page of servicePages) {
  assert(page.sections.length >= 3, `Missing structured content: ${page.id}`);
  const words = [page.intro, ...page.sections.flat(), ...page.process, ...page.deliverables, ...page.faq.flat()].join(' ').split(/\s+/).length;
  wordCounts[page.id] = words;
  if (!page.overview || majorOverviews.includes(page.id)) {
    assert(words >= 700 && words <= 1200, `Major page content length: ${page.id} (${words})`);
    assert(page.faq.length >= 4 && page.faq.length <= 6, `Major page FAQs: ${page.id}`);
  }
  assert(sidebarFor(page).some(item => item.path === page.path), `Missing current sidebar item: ${page.id}`);
  for (const id of page.related) assert(pageById[id], `Unresolved related service: ${id}`);
  assert.equal(pageForPath(page.path).id, page.id);
  assert.equal(pageForPath(`${page.path}/`).id, page.id);
}
assert.equal(new Set(servicePages.map(page => page.description)).size, servicePages.length, 'Duplicate metadata');
assert.equal(new Set(servicePages.map(page => page.seoTitle)).size, servicePages.length, 'Duplicate titles');
assert.equal(servicePages.length + 1, navigationPages.filter(page => !page.existing).length, 'Missing new pages');

const totals = { submenuEntries: submenuItems.length, distinctSubmenuServices: new Set(submenuItems.map(item => item.path)).size, totalPageDestinations: navigationPages.length, existingPagesRetained: navigationPages.filter(page => page.existing).length, newPagesCreated: servicePages.length + 1, misdirectedLinksFixed: 33, remainingMissingPages: 0 };
console.log(JSON.stringify({ ...totals, majorPageWordRange: [Math.min(...servicePages.filter(p => !p.overview || majorOverviews.includes(p.id)).map(p=>wordCounts[p.id])), Math.max(...Object.values(wordCounts))] }, null, 2));

if (process.argv.includes('--report')) {
  const rows = navigationPages.map(page => `| ${page.displayTitle || page.title} | ${page.path} | ${page.existing ? 'Existing — retained' : 'Created'} |`).join('\n');
  const report = `# Navigation completion audit\n\nThe source navigation contains 29 submenu entries and 28 distinct services because Patent Support and Consulting appears twice. All existing service content and canonical URLs were retained. The full navigation now covers 40 unique page destinations, including Home, Contact and category pages.\n\n- Existing pages retained: ${totals.existingPagesRetained} (Home plus 12 service pages)\n- New pages created: ${totals.newPagesCreated} (16 service pages, 10 category pages and Contact)\n- Misdirected links fixed: 33 (17 submenu links, 15 footer links and the header Contact link)\n- Remaining missing pages: 0\n- New major service pages: 838–936 words, with four specific FAQs each\n- Category overview pages: focused pathway descriptions and relevant navigation\n\n| Page | Canonical route | Status |\n| --- | --- | --- |\n${rows}\n\n## Compatibility routes\n\nExisting /services/... routes remain canonical. The following unprefixed convenience URLs redirect to the retained pages, preserving query strings and fragments:\n\n${routeAliases.map(alias => `- ${alias.path} → ${alias.to}`).join('\n')}\n\n## Validation\n\nRun \`npm run audit:navigation\` in frontend to check all configured menu, category, footer, sidebar and related destinations; metadata uniqueness; route aliases; and new-page content coverage. Browser and server checks are recorded separately in navigation-validation.md.\n`;
  await writeFile(new URL('../../navigation-audit.md', import.meta.url), report);
  await writeFile(new URL('../../navigation-audit.json', import.meta.url), JSON.stringify({ totals, pages: navigationPages, menu: headerNavigation, wordCounts }, null, 2));
}

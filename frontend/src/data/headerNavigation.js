import { pageById, pathFor } from './navigation.js';

const link = (label, id) => ({ label, id, path: pathFor(id) });
const publisher = label => ({ label, id: `publisher-${label.toLowerCase().replaceAll('&','and').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')}`, path: `/publishers/${label.toLowerCase().replaceAll('&','and').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')}` });
const group = (label, items, path) => ({ label, path, items });
const column = groups => ({ groups });

const researchIds = ['topic-and-research-proposal','problem-statement','base-papers','research-design','questionnaire-and-experiments','analysis','qualitative-data-analysis','quantitative-data-analysis','phd-admission-assistance','phd-embarking-the-journey','fast-track-phd-by-research-publication'];
const thesisIds = ['chapters-writing','development-editing','editing','formatting','research-design','questionnaire-and-experiments','thesis-review'];
const otherIds = ['implementation','matlab-projects','simulink-projects','python-projects','java-projects','ansys-projects','technical-article','humanise-ai-academic-content','thought-clearing'];

export const headerNavigation = [
  { key: 'home', label: 'Home', path: '/' },
  { key: 'research-services', label: 'Research Services', path: '/research-services', groups: [group('Research Services', researchIds.map(id => link(pageById[id].title, id)), '/research-services')] },
  { key: 'journal-publication', label: 'Journal Publication', path: '/journal-publication', mega: 'journal', featured: ['journal-papers','review-article','empirical-article','ieee-papers','researcher-profile-enhancement'].map(id => link(pageById[id].title,id)), groups: [
    group('Scopus Indexed Journals', ['q1-journals','q2-journals','q3-journals','q4-journals'].map(id => link(pageById[id].title,id)), '/scopus-indexed-journals'),
    group('Web of Science (WoS) Journals', ['scie-journals','ssci-journals','ahci-journals','esci-journals'].map(id => link(pageById[id].title,id)), '/web-of-science-journals'),
    column([
      group('Peer-Reviewed Journals', ['national-peer-reviewed-journals','international-peer-reviewed-journals'].map(id => link(pageById[id].title,id)), '/peer-reviewed-journals'),
      group('Government / Recognized Journals', [link('Government / Recognized Journals','government-recognized-journals')], '/government-recognized-journals'),
    ]),
    group('Preferred Publishers', ['Springer','Elsevier','Wiley','SAGE','Emerald','Inderscience','ASCE','ACM','IEEE','Taylor & Francis','Other Reputed Publishers'].map(publisher)),
  ]},
  { key: 'book-publication', label: 'Book Publication', path: '/book-publication', mega: 'book', featured: [link(pageById['phd-thesis-to-book-publication'].title,'phd-thesis-to-book-publication')], groups: [
    column([
      group('Book Chapter Publication', ['scopus-indexed-book-chapters','web-of-science-indexed-book-chapters','peer-reviewed-book-chapters','edited-book-chapters'].map(id => link(pageById[id].title,id)), '/book-chapter-publication'),
      group('ISBN Publication', ['national-isbn-books','international-isbn-books','isbn-book-chapters'].map(id => link(pageById[id].title,id)), '/isbn-publication'),
    ]),
    column([
      group('Full Book Publication', ['textbooks','reference-books','research-monographs','edited-books','conference-proceedings'].map(id => link(pageById[id].title,id)), '/full-book-publication'),
      group('Book Editing Services', ['proposal-preparation','chapter-structuring','language-editing','formatting','reference-formatting','similarity-review'].map(id => link(pageById[id].title,id)), '/book-editing-services'),
    ]),
    column([
      group('International Publishers', ['Springer','Elsevier','Wiley','Taylor & Francis','Routledge','SAGE','Emerald','CRC Press','IGI Global','Cambridge University Press','Oxford University Press','Other Reputed Publishers'].map(publisher)),
      group('Book Proposal & Submission', ['publisher-selection','book-proposal-development','manuscript-preparation','submission-support','revision-support'].map(id => link(pageById[id].title,id)), '/book-proposal-submission'),
    ]),
  ]},
  { key: 'thesis-services', label: 'Thesis Services', path: '/thesis-services', groups: [group('Thesis Services', thesisIds.map(id => link(pageById[id].title,id)), '/thesis-services')] },
  { key: 'other-services', label: 'Other Services', path: '/other-services', groups: [group('Other Services', [...otherIds,'patent-support-and-consulting'].map(id => link(pageById[id].title,id)), '/other-services')] },
  { key: 'contact', label: 'Contact', path: '/contact' },
];

const idToSection = new Map();
for (const item of headerNavigation) idToSection.set(item.key, item.key);
for (const item of headerNavigation) for (const menuEntry of item.groups || []) for (const menuGroup of menuEntry.groups || [menuEntry]) for (const child of menuGroup.items || []) if (!idToSection.has(child.id)) idToSection.set(child.id, item.key);
for (const id of ['journal-publication','scopus-indexed-journals','web-of-science-journals','peer-reviewed-journals','government-recognized-journals','journal-papers','review-article','empirical-article','ieee-papers','researcher-profile-enhancement']) idToSection.set(id,'journal-publication');
for (const id of ['book-publication','book-chapter-publication','full-book-publication','isbn-publication','book-editing-services','book-proposal-submission','phd-thesis-to-book-publication']) idToSection.set(id,'book-publication');
for (const item of headerNavigation.filter(item => ['journal-publication','book-publication'].includes(item.key))) for (const menuEntry of item.groups) for (const menuGroup of menuEntry.groups || [menuEntry]) for (const child of menuGroup.items || []) if (!idToSection.has(child.id) || item.key === 'book-publication' && menuGroup.label !== 'International Publishers') idToSection.set(child.id,item.key);

export const activeHeaderKey = pathname => {
  const clean = pathname.replace(/\/$/,'') || '/';
  if (clean === '/') return 'home';
  const page = Object.values(pageById).find(item => item.path === clean || `/${item.id}` === clean);
  return page ? idToSection.get(page.id) || idToSection.get(page.parent) || null : null;
};

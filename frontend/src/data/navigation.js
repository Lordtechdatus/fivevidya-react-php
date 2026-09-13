import { researchStartPages } from './researchStartPages.js';
import { implementationPages } from './implementationPages.js';
import { remainingImplementationPages } from './remainingImplementationPages.js';
import { admissionPath } from './phdAdmissionAssistance.js';
import { fastTrackPath } from './fastTrackPhd.js';
import { embarkingPath } from './phdEmbarking.js';
import { publicationExpansionPages } from './publicationExpansionContent.js';

const entry = (id, title, parent, group, extra = {}) => ({ id, title, path: `/${id}`, parent, group, existing: false, ...extra });
const legacy = [...researchStartPages, ...implementationPages, ...remainingImplementationPages];
const retained = (id, title, parent, group, path) => entry(id, title, parent, group, { existing: true, path: path || legacy.find(page => page.label === title).path });

// Shared destinations for header, category links, sidebars, related links and footer.
export const navigationPages = [
  entry('home', 'Home', null, null, { path: '/', existing: true }),
  entry('where-to-start', 'Where to Start', null, 'where-to-start', { overview: true }),
  retained('phd-admission-assistance', 'PhD Admission Assistance', 'where-to-start', 'where-to-start', admissionPath),
  retained('fast-track-phd-by-research-publication', 'Fast-Track PhD by Research Publication', 'where-to-start', 'where-to-start', fastTrackPath),
  retained('phd-embarking-the-journey', 'PhD – Embarking the Journey', 'where-to-start', 'where-to-start', embarkingPath),
  retained('topic-and-research-proposal', 'Topic and Research Proposal', 'where-to-start', 'where-to-start'),
  retained('problem-statement', 'Problem Statement', 'where-to-start', 'where-to-start'),
  retained('base-papers', 'Base Papers', 'where-to-start', 'where-to-start'),
  retained('patent-support-and-consulting', 'Patent Support and Consulting', 'also-do-this', 'publication-services'),
  entry('moving-along', 'Moving Along', null, 'moving-along', { overview: true }),
  entry('implementation', 'Implementation', 'moving-along', 'implementation', { overview: true }),
  ...['MATLAB', 'Simulink', 'Python', 'Java', 'ANSYS'].map(tool => retained(`${tool.toLowerCase()}-projects`, `${tool} Projects`, 'moving-along', 'implementation')),
  entry('analysis', 'Analysis', 'moving-along', 'analysis', { overview: true }),
  entry('qualitative-data-analysis', 'Qualitative Data Analysis', 'moving-along', 'analysis'),
  entry('quantitative-data-analysis', 'Quantitative Data Analysis', 'moving-along', 'analysis'),
  entry('other-services', 'Other Services', 'moving-along', 'other-services', { overview: true }),
  entry('chapters-writing', 'Chapters Writing', 'moving-along', 'other-services'),
  entry('questionnaire-and-experiments', 'Questionnaire and Experiments', 'moving-along', 'other-services'),
  entry('humanise-ai-academic-content', 'Humanise AI Academic Content', 'moving-along', 'other-services'),
  entry('finishing-up', 'Finishing Up', null, 'finishing-up', { overview: true }),
  entry('editing', 'Editing', 'finishing-up', 'finishing-up'),
  entry('formatting', 'Formatting', 'finishing-up', 'finishing-up'),
  entry('also-do-this', 'Also Do This', null, 'also-do-this', { overview: true }),
  entry('journal-papers', 'Journal Papers', 'also-do-this', 'journal-papers', { overview: true }),
  entry('review-article', 'Review Article', 'also-do-this', 'journal-papers'),
  entry('empirical-article', 'Empirical Article', 'also-do-this', 'journal-papers'),
  entry('technical-article', 'Technical Article', 'also-do-this', 'journal-papers'),
  entry('publication-services', 'Other Services', 'also-do-this', 'publication-services', { overview: true, displayTitle: 'Other Publication Services' }),
  entry('ieee-papers', 'IEEE / Scopus Paper Support', 'also-do-this', 'publication-services'),
  entry('researcher-profile-enhancement', 'Researcher Profile Enhancement', 'also-do-this', 'publication-services'),
  entry('phd-thesis-to-book-publication', 'PhD Thesis to Book Publication', 'also-do-this', 'publication-services'),
  entry('phd-guide', 'PhD Guide', null, 'phd-guide', { overview: true }),
  entry('thought-clearing', 'Thought Clearing', 'phd-guide', 'phd-guide'),
  entry('development-editing', 'Development Editing', 'phd-guide', 'phd-guide'),
  entry('research-design', 'Research Design', 'phd-guide', 'phd-guide'),
  entry('contact', 'Contact', null, null),
  ...publicationExpansionPages,
];

export const pageById = Object.fromEntries(navigationPages.map(page => [page.id, page]));
export const pageByTitle = Object.fromEntries(navigationPages.filter(page => page.id !== 'publication-services').map(page => [page.title, page]));
export const pathFor = id => pageById[id].path;
export const pageForPath = path => navigationPages.find(page => page.path === path.replace(/\/$/, '') || (page.path === '/' && path === '/'));
export const sidebarFor = page => navigationPages.filter(item => item.id === page.group || (item.group === page.group && item.id !== page.parent) || (page.id === 'where-to-start' && item.id === 'patent-support-and-consulting') || (item.parent === page.id && page.overview));
export const routeAliases = navigationPages.filter(page => page.existing && page.id !== 'home').map(page => ({ path: `/${page.id}`, to: page.path }));

export const footerGroups = [
  { title: 'Research Services', items: [['Topic & Proposal', 'topic-and-research-proposal'], ['Research Design', 'research-design'], ['Questionnaire', 'questionnaire-and-experiments'], ['Data Analysis', 'analysis'], ['Chapter Guidance', 'chapters-writing']] },
  { title: 'Technical Support', items: [['MATLAB', 'matlab-projects'], ['Python', 'python-projects'], ['Java', 'java-projects'], ['Ansys', 'ansys-projects'], ['Simulation', 'simulink-projects']] },
  { title: 'Publication', items: [['Review Paper', 'review-article'], ['Empirical Paper', 'empirical-article'], ['Scopus Support', 'ieee-papers'], ['Editing', 'editing'], ['Formatting', 'formatting']] },
];

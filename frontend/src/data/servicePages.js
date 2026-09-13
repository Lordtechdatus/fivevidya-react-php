import { navigationPages } from './navigation.js';
import { analysisContent } from './analysisContent.js';
import { writingContent } from './writingContent.js';
import { guidanceContent } from './guidanceContent.js';
import { publicationContent } from './publicationContent.js';
import { publicationSupportContent } from './publicationSupportContent.js';
import { overviewContent } from './overviewContent.js';
import { publicationExpansionContent } from './publicationExpansionContent.js';

const content = { ...analysisContent, ...writingContent, ...guidanceContent, ...publicationContent, ...publicationSupportContent, ...overviewContent, ...publicationExpansionContent };
export const servicePages = navigationPages.filter(page => !page.existing && page.id !== 'contact').map(page => ({
  ...page,
  ...content[page.id],
  title: page.displayTitle || page.title,
  seoTitle: `${page.displayTitle || page.title} Support | AcademicEdge`,
  description: content[page.id].intro.split('. ')[0] + '.',
}));
export const servicePageByPath = Object.fromEntries(servicePages.map(page => [page.path, page]));

const publishers = ['Springer', 'Elsevier', 'Wiley', 'SAGE', 'Emerald', 'Inderscience', 'ASCE', 'ACM', 'IEEE', 'Taylor & Francis', 'Routledge', 'CRC Press', 'IGI Global', 'Cambridge University Press', 'Oxford University Press', 'Other Reputed Publishers'];

const page = (id, title, parent, group, kind = 'publication') => ({ id, title, path: id.startsWith('publisher-') ? `/publishers/${id.slice(10)}` : `/${id}`, parent, group, overview: true, kind });

export const journalExpansionPages = [
  page('journal-publication', 'Journal Publication', null, 'journal-publication'),
  page('scopus-indexed-journals', 'Scopus Indexed Journals', 'journal-publication', 'scopus-indexed-journals'),
  ...['Q1', 'Q2', 'Q3', 'Q4'].map(title => page(`${title.toLowerCase()}-journals`, `${title} Journals`, 'journal-publication', 'scopus-indexed-journals')),
  page('web-of-science-journals', 'Web of Science (WoS) Journals', 'journal-publication', 'web-of-science-journals'),
  ...['SCIE', 'SSCI', 'AHCI', 'ESCI'].map(title => page(`${title.toLowerCase()}-journals`, `${title} Journals`, 'journal-publication', 'web-of-science-journals')),
  page('peer-reviewed-journals', 'Peer-Reviewed Journals', 'journal-publication', 'peer-reviewed-journals'),
  page('national-peer-reviewed-journals', 'National Peer-Reviewed Journals', 'journal-publication', 'peer-reviewed-journals'),
  page('international-peer-reviewed-journals', 'International Peer-Reviewed Journals', 'journal-publication', 'peer-reviewed-journals'),
  page('government-recognized-journals', 'Government / Recognized Journals', 'journal-publication', 'government-recognized-journals'),
  page('preferred-publishers', 'Preferred Publishers', 'journal-publication', 'preferred-publishers'),
];

export const bookExpansionPages = [
  page('book-publication', 'Book Publication', null, 'book-publication', 'book'),
  page('book-chapter-publication', 'Book Chapter Publication', 'book-publication', 'book-chapter-publication', 'book'),
  ...[['scopus-indexed-book-chapters','Scopus Indexed Book Chapters'],['web-of-science-indexed-book-chapters','Web of Science Indexed Book Chapters'],['peer-reviewed-book-chapters','Peer-Reviewed Book Chapters'],['edited-book-chapters','Edited Book Chapters']].map(([id,title]) => page(id,title,'book-publication','book-chapter-publication','book')),
  page('full-book-publication', 'Full Book Publication', 'book-publication', 'full-book-publication', 'book'),
  ...[['textbooks','Textbooks'],['reference-books','Reference Books'],['research-monographs','Research Monographs'],['edited-books','Edited Books'],['conference-proceedings','Conference Proceedings']].map(([id,title]) => page(id,title,'book-publication','full-book-publication','book')),
  page('isbn-publication', 'ISBN Publication', 'book-publication', 'isbn-publication', 'book'),
  ...[['national-isbn-books','National ISBN Books'],['international-isbn-books','International ISBN Books'],['isbn-book-chapters','ISBN Book Chapters / Edited Volumes']].map(([id,title]) => page(id,title,'book-publication','isbn-publication','book')),
  page('book-editing-services', 'Book Editing Services', 'book-publication', 'book-editing-services', 'book'),
  ...[['proposal-preparation','Proposal Preparation'],['chapter-structuring','Chapter Structuring'],['language-editing','Language Editing'],['reference-formatting','Reference Formatting'],['similarity-review','Plagiarism / Similarity Review']].map(([id,title]) => page(id,title,'book-publication','book-editing-services','book')),
  page('book-proposal-submission', 'Book Proposal & Submission', 'book-publication', 'book-proposal-submission', 'book'),
  ...[['publisher-selection','Publisher Selection'],['book-proposal-development','Book Proposal Development'],['manuscript-preparation','Manuscript Preparation'],['submission-support','Submission Support'],['revision-support','Revision Support']].map(([id,title]) => page(id,title,'book-publication','book-proposal-submission','book')),
];

export const publisherPages = publishers.map(title => page(`publisher-${title.toLowerCase().replaceAll('&','and').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')}`, title, 'journal-publication', 'preferred-publishers', 'publisher'));
export const thesisExpansionPages = [page('research-services','Research Services',null,'research-services','thesis'), page('thesis-services','Thesis Services',null,'thesis-services','thesis'), page('thesis-review','Thesis Review','thesis-services','thesis-services','thesis')];
export const publicationExpansionPages = [...journalExpansionPages, ...bookExpansionPages, ...publisherPages, ...thesisExpansionPages];

const intros = {
  publication: title => `${title} support helps researchers assess suitable journal pathways, prepare a clear manuscript and follow the current requirements of an intended venue. AcademicEdge focuses on publication readiness, accurate positioning and transparent submission guidance. Indexing, quartile status and eligibility can change, so researchers should confirm them with current authoritative sources before submission. Editorial acceptance remains entirely with the journal.`,
  book: title => `${title} support helps authors shape scholarly material for a defined readership and an appropriate publishing pathway. The work may include structure, proposal development, manuscript preparation, formatting and revision planning according to the publisher information supplied for the project. A well-prepared book project still remains subject to independent publisher assessment, contractual review and editorial decisions.`,
  publisher: title => `Prepare a manuscript or proposal for consideration within ${title}'s relevant publishing programmes. AcademicEdge can help interpret current author guidance, organise the manuscript, review presentation and prepare submission materials. The service is independent editorial support: it is not affiliated with the publisher and does not imply guaranteed review, acceptance, indexing, a contract or publication.`,
  thesis: title => `${title} brings thesis planning, writing, review and presentation support into one clear pathway. The service helps researchers align the document with their research questions, evidence and institutional requirements while preserving the author's academic responsibility and the integrity of the underlying work.`,
};

const makeContent = item => ({
  intro: intros[item.kind](item.title),
  sections: [
    ['Overview and suitability', `${item.title} begins with the purpose, audience and current state of the work. We review the material already available, identify the intended destination or institutional requirement, and distinguish essential preparation from optional improvement. Recommendations are based on fit and readiness rather than a promised outcome.`],
    ['What we provide', `Support can include a structured readiness review, organisation of the manuscript or proposal, language and presentation checks, reference consistency, and a destination-specific preparation checklist. The exact scope is agreed around the supplied material and the current guidance relevant to ${item.title.toLowerCase()}.`],
    ['Our working approach', 'The process starts with a brief and source files, followed by a documented review of structure, evidence, audience and requirements. Substantive queries remain visible for the author. Revisions are returned in a reviewable form, and final submission or publication decisions stay with the researcher and the responsible journal, publisher or institution.'],
    ['Responsible publication support', 'We do not guarantee acceptance, indexing, quartile placement, contracts, citations or sales. Journal and publisher information should be checked at the time of submission. Authorship, originality, permissions, conflicts of interest and the accuracy of all claims remain the responsibility of the authors.'],
  ],
  process: ['Review the work, intended audience and current destination requirements.', 'Identify readiness gaps and agree the preparation scope.', 'Complete the agreed structural, editorial and formatting support.', 'Return a submission checklist and unresolved author queries for final review.'],
  deliverables: ['Readiness and fit review', 'Structured preparation plan', 'Reviewed manuscript or proposal where agreed', 'Formatting and reference checklist', 'Submission or revision handover notes'],
  faq: [
    ['Do you guarantee publication or acceptance?', 'No. Journals and publishers make independent editorial decisions. We support preparation and readiness only.'],
    ['Can you confirm current indexing or publisher requirements?', 'Requirements and indexing can change. We help organise the current information you provide and recommend checking authoritative sources before submission.'],
    ['Can an existing manuscript be reviewed?', 'Yes. A review can focus on structure, clarity, references, formatting and destination-specific readiness.'],
    ['Who makes the final submission decision?', 'The author or research team retains control of the manuscript, destination choice and final submission.'],
  ],
  related: item.kind === 'book' ? ['phd-thesis-to-book-publication','development-editing','formatting'] : item.kind === 'thesis' ? ['chapters-writing','development-editing','formatting'] : ['journal-papers','editing','formatting'],
});

export const publicationExpansionContent = Object.fromEntries(publicationExpansionPages.map(item => [item.id, makeContent(item)]));
export const publisherNames = publishers;

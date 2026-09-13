const card = (title, icon, text, points) => ({ title, icon, text, points });
const section = (title, intro, cards, layout = 'cards') => ({ title, intro, cards, layout });
export const researchStartPages = [
  {
    path: '/services/topic-and-research-proposal', label: 'Topic and Research Proposal',
    title: 'Topic and PhD Research Proposal', icon: 'book', eyebrow: 'A CLEAR DIRECTION BEFORE YOU BEGIN',
    description: 'Research topic selection and proposal guidance to align your questions, literature, methodology and intended contribution.',
    intro: 'A research project needs a destination before thesis development begins. A focused question tells you what to investigate; a carefully considered approach helps you decide how to investigate it. We help you examine possible directions and organise your own ideas into a coherent proposal.',
    benefits: ['Refine your research question', 'Connect purpose and methodology', 'Plan evidence and resources', 'Develop your own academic ideas'],
    cta: 'Research Proposal Consultation',
    sections: [
      section('Topic Ideas for PhD', 'A promising topic combines a worthwhile question with your genuine interest. Choose it for its research potential and feasibility, rather than simply because it is currently trending.', [
        card('Unique', 'bulb', 'Look for an original question, a new perspective or an unresolved gap. Originality comes from understanding what is already known and explaining what your study adds.'),
        card('Meaningful', 'badge', 'Connect your interests to a contribution that matters academically or practically. Consider who could use the findings and why the discipline needs this work.'),
        card('Encourages Further Research', 'compass', 'Choose a direction that supports a focused study while leaving room for further questions, alternative methods and future investigation.'),
      ]),
      section('Research Proposal', 'Your proposal is a working framework for the study. It connects the literature and research question to practical choices about evidence, methods and interpretation. Each part should support the same objectives.', [
        card('Literature Resources', 'book', 'Identify foundational and recent studies, assess their relevance and organise the gap your research will address.'),
        card('Data Collection Methods', 'file', 'Choose evidence-gathering methods that fit your question, access conditions and ethical responsibilities.'),
        card('Sample Size', 'chart', 'Justify the scale and selection of your sample in relation to the design, analytical needs and available resources.'),
        card('Research Methodology', 'compass', 'Explain the overall study design and why it is appropriate for the questions you intend to answer.'),
        card('Theories and Assumptions', 'bulb', 'Make the conceptual foundations and assumptions explicit so readers can assess the reasoning behind the study.'),
        card('Validity Considerations', 'badge', 'Consider threats to credible interpretation and the steps needed to support trustworthy findings.'),
        card('Data Analysis Methods', 'chart', 'Plan how the evidence will be analysed and how those analyses connect to your research objectives.'),
        card('Research Tools', 'code', 'Assess the software, instruments and technical skills needed to carry out the proposed approach.'),
        card('Expected Results and Conclusions', 'search', 'Describe the types of insights the study could produce without predetermining findings or inventing results.'),
      ]),
    ],
  },
  {
    path: '/services/problem-statement', label: 'Problem Statement',
    title: 'Problem Statement Development for PhD Research', icon: 'search', eyebrow: 'DEFINE THE QUESTION THAT MATTERS',
    description: 'Guidance for developing a clear, evidence-backed and defensible PhD problem statement aligned with your research objectives.',
    intro: 'The problem statement is one of the central elements of a thesis. It tells readers what you are investigating, where current understanding falls short and why the issue deserves attention. A focused statement gives the rest of your study a clear point of reference.',
    benefits: ['Identify the research issue', 'Support the gap with evidence', 'Align objectives and contribution', 'Improve clarity and precision'],
    cta: 'Discuss Your Problem Statement',
    sections: [
      section('A Clear Problem Statement in Four Steps', 'Move from a broad concern to an evidence-backed research problem that can be investigated within the scope of your study.', [
        card('Present the Problem', 'search', 'Introduce the research issue and describe the situation that would ideally exist. Explain the gap between that ideal and current understanding, and why a study is needed.', ['Research issue', 'Ideal situation', 'Existing gap', 'Reason for conducting the study']),
        card('Provide Evidence', 'book', 'Use credible facts, relevant data and published literature to show that the problem is significant. Cite the evidence carefully and distinguish established findings from assumptions.', ['Credible facts and data', 'Literature support', 'Citations and evidence', 'Significance of the issue']),
        card('Propose the Research Direction', 'compass', 'Explain the direction your investigation will take, its objectives and a possible methodological approach. Describe the contribution you seek to make without claiming a solution in advance.', ['Direction of investigation', 'Study objectives', 'Possible methodology', 'Expected research contribution']),
        card('Polish the Statement', 'edit', 'Review the statement for clarity, conciseness and academic language. Remove unnecessary detail and check that the wording and scope fit your university’s guidelines.', ['Clear and concise wording', 'Academic language', 'Removal of unnecessary information', 'University guideline alignment']),
      ], 'steps'),
      section('Our Problem Statement Support', 'We help researchers refine their own reasoning into clear, focused and defensible problem statements. Feedback examines the connection between the issue, supporting literature and intended study, so the statement can guide the proposal and thesis.', [
        card('Focused Scope', 'compass', 'Separate the core research problem from background information and broader concerns.'),
        card('Defensible Reasoning', 'badge', 'Check whether the evidence supports the claimed gap and the significance of the study.'),
        card('Constructive Review', 'edit', 'Improve structure and expression while keeping the research choices and authorship with you.'),
      ]),
    ],
  },
  {
    path: '/services/base-papers', label: 'Base Papers',
    title: 'Base Papers for Research and Implementation', icon: 'file', eyebrow: 'BUILD ON EVIDENCE, DEVELOP SOMETHING NEW',
    description: 'Support for identifying and comparing relevant base papers, research methods, datasets and implementation approaches.',
    intro: 'Base papers are previously published research works used as academic reference points. They help you understand study designs, methods, datasets and implementation approaches before deciding how your own research will proceed. The aim is to learn from existing evidence and develop a distinct contribution.',
    benefits: ['Find relevant published research', 'Compare methods and datasets', 'Assess credibility and limitations', 'Plan an independent contribution'],
    cta: 'Share Your Research Area',
    sections: [
      section('Desirable Qualities of a Base Paper', 'Evaluate more than the title or publication date. A useful reference should fit your intended study and provide enough reliable detail to support informed research decisions.', [
        card('Design and Methods', 'compass', 'Assess whether the methodology aligns with your intended study. For experimental and technical research, examine the design, evaluation procedure and implementation detail particularly closely.'),
        card('Relevant', 'search', 'Prioritise the same or a closely related research area, suitable datasets and methods. Review recent literature alongside important foundational work.'),
        card('Presentation', 'file', 'Look for clear academic language, accurate technical terminology and a suitable structure. Good presentation helps you understand the work, but does not by itself establish quality.'),
        card('Reliable', 'badge', 'Examine the credibility of the methodology, validity of the research and support for its results. Consider the publication source and any corrections or limitations.'),
      ], 'four'),
      section('Our Base Paper Support', 'We assist with identifying recent and relevant research, screening papers against your topic and comparing methodological choices. You remain responsible for reading, critically evaluating and citing the selected references.', [
        card('Identify & Screen', 'search', 'Narrow the literature by research area, study objectives and relevance instead of relying on a loosely matched paper.'),
        card('Compare Approaches', 'chart', 'Review methods, datasets, evaluation measures and practical requirements across candidate papers.'),
        card('Select References Responsibly', 'book', 'Use base papers to guide new research, not to copy text, code or findings without appropriate permission and attribution.'),
      ]),
    ],
  },
  {
    path: '/services/patent-support-and-consulting', label: 'Patent Support and Consulting',
    title: 'Protect Your Research: Patent Support & Consulting', icon: 'badge', eyebrow: 'FROM RESEARCH OUTPUT TO IP PLANNING', patent: true,
    description: 'Research-focused patent support covering prior-art analysis, technical documentation and coordination with qualified patent professionals.',
    intro: 'Doctoral research may produce inventions, processes, systems or technologies that warrant consideration for intellectual-property protection. We help you organise the technical evidence and questions needed for an informed discussion with a qualified patent professional.',
    benefits: ['Understand related prior art', 'Organise technical documentation', 'Prepare for professional review', 'Connect research and IP strategy'],
    cta: 'Request Consultation',
    highlights: [card('Comprehensive Support', 'book', 'Bring prior-art research, technical documentation and procedural preparation into one coordinated plan.'), card('Quick Consultation', 'compass', 'Start with a focused discussion of your research area, current stage and the questions you need to resolve.')],
    sections: [
      section('Patent Filing Process – Step-by-Step Roadmap', 'This is a general preparation roadmap. Filing options, deadlines and examination procedures depend on the jurisdiction; a patent grant is not guaranteed.', [
        card('Idea Disclosure & Prior Art Search', 'search', 'Clarify the invention and support an initial novelty discussion through a search of patents and publications. Identify related work and organise the differences for professional assessment.', ['Understand the invention', 'Novelty assessment', 'Search patents and publications', 'Identify related prior work']),
        card('Patent Specification Preparation', 'file', 'Organise the technical explanation and supporting materials for specification preparation with a patent professional. Claims require careful legal and technical review.', ['Title & Technical Field', 'Background', 'Summary', 'Detailed Description', 'Drawings/Diagrams where required', 'Claims']),
        card('Application Filing Guidance', 'compass', 'Prepare the information needed for filing and discuss provisional versus complete applications where these options exist. Confirm the applicable requirements with the responsible professional.', ['Provisional vs complete application', 'Filing requirements', 'Documentation', 'Inventor/applicant details']),
        card('Examination & Response Support', 'edit', 'Help organise technical clarification and supporting documentation for examination reports, objections and queries. Legal responses and representation remain with the qualified professional where required.', ['Examination reports', 'Objections and queries', 'Technical clarification', 'Documentation support']),
        card('Patent Grant / Further Processing', 'badge', 'Track the next procedural steps and coordinate technical materials for follow-up or prosecution support. Outcomes depend on the patent office’s assessment and applicable rules.', ['Follow-up', 'Prosecution support coordination', 'Procedural guidance']),
      ], 'timeline'),
      section('Why Patent Research Support Matters', 'Well-organised research evidence makes it easier to evaluate the invention and communicate its technical contribution.', [
        card('Novelty Identification', 'bulb', 'Describe potentially distinctive features clearly for assessment; a research review alone does not establish patentability.'),
        card('Prior-Art Analysis', 'search', 'Compare related patents and publications and document their relevance to the proposed invention.'),
        card('Technical Documentation', 'file', 'Bring descriptions, examples and diagrams into a consistent technical record.'),
        card('Filing Guidance', 'compass', 'Organise the documents and questions needed for the applicable filing procedure.'),
        card('Research-to-IP Strategy', 'badge', 'Discuss how research outputs, publication plans and professional IP advice fit together.'),
      ]),
    ],
  },
];
export const startRelatedServices = researchStartPages.map(({path, label, icon}) => ({path, label, icon}));
export const researchStartReviews = [
  { name: 'Sample scholar A', context: 'Research direction · illustrative example', text: 'I would value feedback that helps me connect my research question to a feasible approach and a clear contribution.' },
  { name: 'Sample scholar B', context: 'Literature review · illustrative example', text: 'A structured comparison of relevant studies would help me explain why particular methods fit my project.' },
  { name: 'Sample scholar C', context: 'Research planning · illustrative example', text: 'Knowing which assumptions and practical constraints to address would make my next steps easier to plan.' },
];

export const embarkingPath = '/services/phd-embarking-the-journey';
export const embarkingData = {
  title: 'PhD – Embarking the Journey',
  description: 'Plan your PhD journey with a clear research purpose, a suitable university and supervisor, and a realistic assessment of time, resources and research feasibility.',
  highlights: ['Define your research purpose', 'Find the right academic environment', 'Plan a feasible research journey', 'Build ideas through writing and feedback'],
  motivations: [
    { title: 'An academic direction', icon: 'graduate', text: 'Consider how doctoral study fits your interests in teaching, scholarship or an academic career. A clear direction helps you evaluate programmes and the experience they offer.' },
    { title: 'A question worth pursuing', icon: 'search', text: 'Research motivation starts with curiosity and a willingness to examine evidence. Choose a question you want to understand deeply, even when progress is slow.' },
    { title: 'A contribution beyond yourself', icon: 'bulb', text: 'Doctoral research can address scientific questions and social challenges. Think about whose understanding or decisions your findings could inform.' },
  ],
  factors: [
    { title: 'The University / Organization', icon: 'graduate', intro: 'Look beyond the institution’s name to the environment in which your work will develop.', points: [
      ['Institutional support', 'Understand the support available for research training, ethics review and academic development.'],
      ['Available resources', 'Check access to libraries, journals, software and specialist expertise.'],
      ['Faculty', 'Explore the department’s research interests and opportunities for academic exchange.'],
      ['Submission rules', 'Read progression milestones, document requirements and examination procedures early.'],
      ['Research facilities', 'Confirm that laboratories, equipment and working spaces meet the needs of your study.'],
    ] },
    { title: 'Supervisor & Research Committee', icon: 'compass', intro: 'A productive supervisory relationship needs both subject alignment and a shared way of working.', points: [
      ['Selecting an appropriate supervisor', 'Discuss your proposed direction and whether their approach suits your learning needs.'],
      ['Subject expertise', 'Review the supervisor’s research and its connection to your intended topic and methods.'],
      ['Availability', 'Agree realistic expectations for meetings, communication and review turnaround.'],
      ['Constructive feedback', 'Look for guidance that helps you question assumptions and develop independent judgement.'],
      ['Research committee support', 'Understand how committee members contribute to progress reviews and wider academic advice.'],
    ] },
    { title: 'Feasibility of Research', icon: 'chart', intro: 'A worthwhile research idea also needs a practical plan for carrying it out.', points: [
      ['Expected timeline', 'Allow time for approvals, research, analysis, writing, feedback and revisions.'],
      ['Work-life balance', 'Plan a sustainable routine around professional and personal responsibilities.'],
      ['Data collection', 'Assess access to participants, datasets and permissions before depending on them.'],
      ['Travel', 'Consider whether fieldwork, lab visits or meetings require time away.'],
      ['Research expenses', 'Budget for equipment, software, travel and other study-related costs.'],
      ['Available resources', 'Match the scope of your question to the people, tools and support you can access.'],
    ] },
  ],
  // TODO: Replace null destinations only when the corresponding service routes exist.
  relatedServices: [
    ['Topic and Research Proposal', 'book'], ['Problem Statement', 'search'], ['Base Papers', 'file'],
    ['Chapters Writing', 'edit'], ['Questionnaire and Experiments', 'file'], ['Implementation', 'code'],
    ['Analysis', 'chart'], ['Editing', 'edit'], ['Formatting', 'file'], ['Journal Papers', 'book'],
    ['IEEE Papers', 'file'], ['Thought Clearing', 'bulb'], ['Development Editing', 'edit'], ['Research Design', 'compass'],
  ].map(([title, icon]) => ({ title, icon, href: null })),
  reviews: [
    { name: 'Sample scholar A', context: 'Research planning · illustrative example', text: 'I would value a conversation that helps me turn a broad interest into a research question and identify what I need to learn next.' },
    { name: 'Sample scholar B', context: 'Supervisor selection · illustrative example', text: 'Knowing which questions to ask a potential supervisor would help me assess both research fit and expectations for working together.' },
    { name: 'Sample scholar C', context: 'Research feasibility · illustrative example', text: 'A realistic view of data access, time and resources would make it easier to decide whether my proposed study is manageable.' },
  ],
};

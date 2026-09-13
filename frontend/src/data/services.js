import {
  FileSearch, Presentation, Files, FileText, ClipboardList, Lightbulb,
  ChartNoAxesCombined, PencilLine, AlignLeft, Newspaper, BookOpen, Brain,
  MonitorCog, ClipboardCheck, ChartColumn, Calculator, Users, SearchCheck,
  Triangle, Workflow, CodeXml, FileCode,
} from 'lucide-react';
import { pageById } from './navigation.js';

// Card order and presentation; destinations and titles come from the shared navigation.
const cards = [
  { id: 'topic-and-research-proposal', icon: FileSearch, description: 'Developing a thesis proposal that presents your research interest and clearly addresses the research issues, objectives and proposed solutions in a particular area.' },
  { id: 'problem-statement', icon: Presentation, description: 'Identify and formulate a clear, focused and researchable problem statement highlighting the core issue, research context and need for investigation.' },
  { id: 'base-papers', icon: Files, description: 'Selection of relevant and credible base papers from reputed journals to establish the foundation, methodology and direction of your proposed research.' },
  { id: 'chapters-writing', icon: FileText, description: 'Professional assistance in structuring and writing thesis chapters with logical flow, academic language, appropriate citations and research-oriented presentation.' },
  { id: 'questionnaire-and-experiments', icon: ClipboardList, description: 'Design of structured questionnaires, research instruments and experimental frameworks aligned with your research objectives, variables and methodology.' },
  { id: 'implementation', icon: Lightbulb, description: 'Implementation of proposed research models, algorithms, systems and methodologies using appropriate technologies, software and research tools.' },
  { id: 'analysis', icon: ChartNoAxesCombined, description: 'Comprehensive analysis of research data using suitable statistical, analytical and computational methods for accurate interpretation of research findings.' },
  { id: 'editing', icon: PencilLine, description: 'Detailed academic editing to improve grammar, clarity, coherence, sentence structure, terminology and overall readability of research documents.' },
  { id: 'formatting', icon: AlignLeft, description: 'Formatting of thesis, dissertation and research papers according to university, journal or publication guidelines including citations, tables and references.' },
  { id: 'journal-papers', icon: Newspaper, description: 'Support for developing high-quality journal manuscripts from your research work with appropriate structure, analysis, discussion and academic presentation.' },
  { id: 'ieee-papers', icon: BookOpen, description: 'Preparation and refinement of technical research papers according to IEEE standards, structure, formatting, referencing and publication requirements.' },
  { id: 'thought-clearing', icon: Brain, description: 'Expert research consultation to clarify research ideas, refine objectives, resolve methodological confusion and establish a clear direction for your study.' },
  { id: 'development-editing', icon: MonitorCog, description: 'Advanced editing focused on research organization, argument development, logical flow, academic consistency and strengthening the overall manuscript.' },
  { id: 'research-design', icon: FileSearch, description: 'Development of an appropriate research design covering approach, sampling, variables, instruments, methodology, analysis techniques and validation procedures.' },
  { id: 'review-article', icon: ClipboardCheck, description: 'Systematic development of review articles through literature identification, synthesis, critical analysis, research-gap identification and structured presentation.' },
  { id: 'empirical-article', icon: ChartColumn, description: 'Preparation of empirical research articles based on observed or experimental data with methodology, statistical analysis, findings and evidence-based discussion.' },
  { id: 'technical-article', icon: Calculator, description: 'Development of technically sound articles presenting engineering, computational or scientific concepts, methodologies, implementations and performance outcomes.' },
  { id: 'qualitative-data-analysis', icon: Users, description: 'Analysis of qualitative research data using coding, thematic analysis, content analysis and interpretation techniques to identify meaningful patterns and themes.' },
  { id: 'quantitative-data-analysis', icon: SearchCheck, description: 'Statistical analysis of numerical research data using descriptive and inferential techniques, hypothesis testing, modelling and result interpretation.' },
  { id: 'matlab-projects', icon: Triangle, description: 'Development and implementation of MATLAB-based research models, algorithms, simulations, optimization techniques, data analysis and visualization.' },
  { id: 'simulink-projects', icon: Workflow, description: 'Design and simulation of dynamic systems, control models and research applications using MATLAB Simulink and related modelling tools.' },
  { id: 'python-projects', icon: CodeXml, description: 'Development of Python-based research applications involving data science, machine learning, artificial intelligence, automation and analytical modelling.' },
  { id: 'java-projects', icon: FileCode, description: 'Design and development of Java-based academic and research applications with proper architecture, implementation, testing and technical documentation.' },
  { id: 'ansys-projects', wordmark: 'ANSYS', description: 'ANSYS-based modelling, simulation and engineering analysis including structural, thermal, fluid and multiphysics research applications.' },
];

export const services = cards.map(card => ({
  ...pageById[card.id], ...card,
  title: card.id === 'ieee-papers' ? 'IEEE Papers' : pageById[card.id].title,
  category: pageById[card.id].parent,
}));

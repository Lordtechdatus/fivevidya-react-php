const card = (title, text, points = [], icon = 'code') => ({ title, text, points, icon });
const section = (title, items, intro = '') => ({ title, items, intro });
const steps = (title, items) => ({ title, type: 'timeline', items: items.map(([title, text]) => ({ title, text })) });
const samples = (title, items) => ({ title, type: 'samples', items: items.map(([title, lines, kind]) => ({ title, lines, kind })) });
export const pythonPath = '/services/python-projects';
export const javaPath = '/services/java-projects';
export const ansysPath = '/services/ansys-projects';
export const remainingImplementationPages = [
  {
    path: pythonPath, label: 'Python Projects', title: 'Python Implementation & Research Development', icon: 'code', cta: 'Discuss Your Python Project',
    description: 'Python research implementation support for data analysis, automation, machine learning, custom coding, debugging and reproducible workflows.',
    intro: 'Python is a general-purpose programming language that connects research ideas with practical software. Its ecosystem supports data analysis, automation, artificial intelligence and machine learning, as well as everyday application development. We help you organise a clear implementation workflow, understand your code and evaluate its results against your research objectives.',
    highlights: ['Research-focused development', 'Data analysis and automation', 'AI and machine learning workflows', 'Documented, testable code'],
    sections: [
      section('Key Points for Python Coding', [
        card('Why Is Python Required?', 'Python offers an approachable way to express computational tasks, from short scripts to dynamic applications. Its open-source ecosystem makes it adaptable to a wide range of projects.', ['General-purpose interpreted language', 'Dynamic application development', 'Cross-platform workflows', 'Task automation', 'Data analysis', 'Open-source tools']),
        card('How Is Python Used?', 'Set up an interpreter and an isolated environment, select appropriate packages, and build scripts or notebooks around defined inputs and outputs. Track dependencies and validate intermediate results so the workflow can be reproduced.', ['Environment and interpreter setup', 'Packages and libraries', 'Scripts and notebooks', 'Implementation, testing and documentation']),
        card('When Is Python Used?', 'Use Python when a project needs a repeatable way to process information, automate a sequence of tasks or turn an analytical method into working software.', ['Software Development', 'Task Automation', 'Data Analysis', 'Data Visualization'], 'chart'),
        card('Where Is Python Employed?', 'Research applications span visual data, language and predictive modelling. The choice of libraries and evaluation methods should follow the problem and available data.', ['Image Processing', 'Data Analytics', 'Machine Learning', 'Deep Learning', 'Prediction & Recommendation Systems', 'Natural Language Processing'], 'research'),
      ]),
      section('How We Help', [
        card('Step-by-Step Implementation', 'Break the research method into manageable stages, with explanations of inputs, transformations and expected outputs.'),
        card('Custom Coding', 'Develop functions and scripts around your requirements, with readable structure and explicit assumptions.'),
        card('Research-Oriented Frameworks', 'Organise experiments, configurations and evaluation routines so findings can be traced back to the method.', [], 'research'),
        card('Debugging & Optimization', 'Investigate errors, profile bottlenecks and improve efficiency while checking that the intended behaviour is preserved.', [], 'check'),
      ]),
      samples('Sample Workflow', [
        ['Data Analytics Initial Screen', ['01  Select a dataset', '02  Define the research question', '03  Choose an analysis workflow'], 'dashboard'],
        ['Dataset Preparation', ['Inspect missing values', 'Check types and duplicates', 'Separate training and evaluation data'], 'dataset'],
        ['Correlation Matrix', ['Compare relationships between variables', 'Check assumptions before interpretation'], 'matrix'],
        ['Prediction Performance', ['Compare with a baseline', 'Evaluate on held-out data', 'Inspect errors and limitations'], 'performance'],
      ]),
    ],
    sources: [{ label: 'Python applications', url: 'https://www.python.org/about/apps/' }],
  },
  {
    path: javaPath, label: 'Java Projects', title: 'Java Implementation & Application Development', icon: 'code', cta: 'Discuss Your Java Project',
    description: 'Java implementation guidance for object-oriented applications, research software, environment setup, development, testing and maintenance.',
    intro: 'Java provides an object-oriented foundation for web applications, enterprise software and server-side systems. It can also support research projects that need structured, maintainable application code. Our guidance connects the software architecture, development environment and testing approach to your project requirements.',
    highlights: ['Object-oriented architecture', 'Cross-platform execution', 'Application development and testing', 'Post-implementation guidance'],
    sections: [
      section('Java Implementation', [card('From Source Code to a Running Application', 'Java source is compiled into bytecode that a compatible Java Virtual Machine executes. This allows an application to run across supported platforms, while classes and interfaces help organise its behaviour. Modern JVMs use techniques such as just-in-time compilation to improve execution; actual performance depends on the workload, design and runtime configuration.', ['Source code → bytecode → JVM', 'Object-oriented application architecture', 'Compatible runtimes across platforms', 'Measure performance with realistic workloads'])]),
      section('Benefits of Java Implementation', [
        card('Object-Oriented & Class-Based', 'Use classes, interfaces and encapsulation to separate responsibilities and organise reusable behaviour.'),
        card('Platform Independent', 'Run compatible bytecode on supported JVMs, with checks for platform-specific dependencies.'),
        card('Concurrent Programming Support', 'Coordinate independent work using Java concurrency tools, with careful handling of shared state.'),
        card('Automatic Memory Management', 'Garbage collection manages unused objects, while application design still needs to account for memory usage.'),
        card('High Performance', 'Runtime optimisation can support demanding workloads; profiling identifies where improvements matter.', [], 'chart'),
        card('Dynamic Application Development', 'Build adaptable applications using modular components, libraries and clearly defined interfaces.'),
      ]),
      steps('Java Implementation Process', [
        ['Install and Configure Java Environment', 'Select a suitable JDK, configure the environment and confirm that the compiler and runtime are available.'],
        ['Configure IDE / Project and Java Runtime', 'Set the project structure, dependencies and runtime target, then check the development and build configuration.'],
        ['Develop, Compile, Run and Test Code', 'Implement a small working flow, compile it, run meaningful tests and review behaviour before extending the application.'],
      ]),
      samples('Getting Started With Java', [
        ['IDE Setup', ['Select installed JDK', 'Confirm compiler settings', 'Configure workspace'], 'dashboard'],
        ['New Project', ['research-app/', '  src/main/java/', '  src/test/java/'], 'code'],
        ['New Source File', ['class ResearchApp {', '  static int square(int x) {', '    return x * x;', '  }', '}'], 'code'],
        ['Programming & Testing', ['Implement a small unit', 'Compile and run', 'Check expected and edge cases'], 'performance'],
      ]),
      section('Why Choose Our Java Support?', [
        card('Experienced Developers', 'Discuss architecture and implementation decisions with developers who can explain the trade-offs in your project.'),
        card('Timely Project Execution', 'Agree a realistic scope and milestones, then review progress and dependencies at each stage.', [], 'check'),
        card('Post-Implementation Support', 'Receive help understanding the delivered workflow, investigating issues and planning maintainable updates.'),
      ]),
    ],
    sources: [{ label: 'Official Java learning resources', url: 'https://dev.java/learn/' }],
  },
  {
    path: ansysPath, label: 'ANSYS Projects', title: 'ANSYS Simulation & Engineering Implementation', icon: 'compass', cta: 'Discuss Your ANSYS Project',
    description: 'ANSYS simulation support for geometry, meshing, model selection, solver setup, engineering analysis, validation and research reporting.',
    intro: 'ANSYS is an engineering simulation platform with tools for structural engineering, fluid mechanics, electronics, electromagnetics, acoustics and thermal analysis. Multiphysics research can connect these disciplines to investigate interacting effects. We help translate your engineering question into a simulation setup with documented assumptions and a clear validation plan.',
    highlights: ['Geometry and mesh preparation', 'Physics and solver configuration', 'Engineering simulation workflows', 'Validation and interpretation'],
    sections: [
      section('Things to Remember During ANSYS Implementation', [
        card('Avoid Modelling Errors', 'Check geometry, units, contacts and boundary conditions before solving. A converged solution can still represent the wrong physical problem.', [], 'check'),
        card('Select Correct ANSYS Module/Version', 'Match the physics and required capabilities to an appropriate product, compatible version and available licence.', [], 'settings'),
        card('Optimize According to Research Requirements', 'Balance mesh resolution, model complexity and computational cost against the quantities your study needs to measure.', [], 'chart'),
      ]),
      steps('How to Set Up ANSYS for Simulation', [
        ['Define Computational Domain / Geometry', 'Represent the relevant physical region and justify simplifications that reduce unnecessary complexity.'],
        ['Generate Mesh', 'Choose suitable elements and refinement regions, inspect mesh quality and plan a mesh-independence check.'],
        ['Select Physical Model', 'Choose the governing physics and modelling assumptions needed to address the research question.'],
        ['Define Material / Fluid Properties', 'Use appropriate property data, units and temperature dependence where relevant.'],
        ['Apply Boundary Conditions', 'Specify loads, constraints, inlets and other conditions that represent the intended operating scenario.'],
        ['Run Solver', 'Set convergence criteria and monitor residuals and physical quantities throughout the calculation.'],
        ['Validate and Interpret Results', 'Compare against experimental evidence, reference solutions or analytical checks, and document uncertainty.'],
      ]),
      samples('Sample Simulation Section', [
        ['ANSYS Workbench', ['Geometry → Mesh', 'Physics setup → Solution', 'Results → Validation'], 'dashboard'],
        ['3D Meshing Model', ['Illustrative geometry and element layout', 'Actual mesh refinement follows the physics'], 'mesh'],
      ]),
      section('Why Use ANSYS Implementation?', [
        card('Multiple Simulation Capabilities', 'Relevant products support DEM, FEM, CFD, dynamics and topology optimisation. Select the capability required by your research.', [], 'settings'),
        card('Different Engineering Modules', 'Explore tools for fluids, structures, electromagnetics, semiconductors and 3D design. Availability depends on the chosen product and licence.', [], 'research'),
        card('Faster Simulation Workflow', 'Plan reusable setups and targeted parameter studies to reduce avoidable repetition; solve times depend on model and hardware.', [], 'code'),
        card('Results & Findings Support', 'Interpret fields, plots and numerical outputs in relation to your research question and stated assumptions.', [], 'chart'),
        card('High-Resolution Multi-Parameter Analysis', 'Study several operating conditions and refine regions of interest, with convergence and computational cost checks.', [], 'research'),
      ]),
      steps('Our ANSYS Implementation Process', [
        ['Requirement Analysis', 'Clarify the engineering question, available evidence and outputs required.'],
        ['Methodology Selection', 'Agree the physical models, assumptions and validation approach.'],
        ['Geometry / Computational Setup', 'Prepare the domain, mesh, properties and boundary conditions.'],
        ['Simulation', 'Run the planned cases and monitor numerical and physical behaviour.'],
        ['Result Analysis', 'Compare cases, investigate sensitivities and identify limitations.'],
        ['Validation & Reporting', 'Document verification checks, supporting evidence and reproducible settings.'],
      ]),
    ],
    sources: [{ label: 'ANSYS product capabilities', url: 'https://www.ansys.com/products' }],
  },
];

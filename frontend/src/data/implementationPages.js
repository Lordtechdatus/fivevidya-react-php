const feature = (title, icon, text, points = []) => ({ title, icon, text, points });
export const matlabPath = '/services/matlab-projects';
export const simulinkPath = '/services/simulink-projects';
export const implementationPages = [
  {
    path: matlabPath, label: 'MATLAB Projects', title: 'MATLAB Software & Research Implementation', icon: 'chart',
    description: 'MATLAB project support for numerical computing, algorithm development, matrix operations, visualization and research implementation.',
    intro: 'MATLAB combines a high-level programming language with an environment for numerical computing. Researchers can use it to explore data, develop algorithms and visualise results, moving from a mathematical idea to an implementation they can inspect and test. Our support focuses on connecting these capabilities to the needs of your engineering or research project.',
    cta: 'Discuss Your MATLAB Project',
    highlights: ['Numerical computation', 'Algorithm development', 'Research visualisation', 'Engineering applications'],
    whyTitle: 'Why MATLAB Implementation?',
    whyIntro: 'Build a clear connection between the research question, the numerical method and the evidence produced by your implementation.',
    features: [
      feature('Algorithm Implementation', 'code', 'Translate a defined method into functions and scripts, then compare its behaviour with the intended research objectives.'),
      feature('Matrix Computation', 'chart', 'Express numerical relationships through arrays and matrices, with attention to dimensions, conditioning and computational accuracy.'),
      feature('Data & Function Visualization', 'search', 'Use plots to explore data and mathematical functions, inspect intermediate outputs and communicate results clearly.'),
      feature('User Interface Development', 'file', 'Create task-focused interfaces for inputs, parameters and results when an interactive application will help users explore the work.'),
    ],
    details: [
      feature('What Is Required?', 'compass', 'Start with the project question and the evidence available. Agree the inputs, expected outputs and evaluation criteria before choosing a programming approach.', ['Understand project and data requirements', 'Identify a suitable programming approach', 'Decide algorithms, models and toolboxes']),
      feature('Where Is MATLAB Used?', 'graduate', 'The platform supports numerical and analytical workflows across engineering and research. Relevant applications include:', ['Digital Image Processing', 'Digital Signal Processing', 'Medical Imaging', 'Power Electronics', 'Power Systems', 'Communication Systems', 'Automotive Engineering', 'Sensor Networks']),
      feature('How Does MATLAB Work?', 'code', 'Scripts, functions and matrix operations provide the computational foundation. Object-oriented development can organise larger projects, while specialised toolboxes extend the available methods. Simulink adds graphical block-diagram modelling alongside MATLAB programming.', ['MATLAB programming and algorithms', 'Matrices and numerical modelling', 'Graphical programming with Simulink', 'Object-oriented development', 'Specialised toolboxes']),
    ],
    models: [
      { title: 'Sample State-Space Model', caption: 'Conceptual continuous-time linear model. Matrices A, B, C and D define the relationship between input, state and output; coefficients and responses depend on the actual system.', blocks: [ ['Input u(t)', 'External excitation'], ['State dynamics', 'ẋ(t) = Ax(t) + Bu(t)'], ['Output y(t)', 'y(t) = Cx(t) + Du(t)'] ], note: 'Initial condition x(0) and a suitable solver are needed to compute a response. This is an explanatory diagram, not a completed simulation.' },
    ],
    benefits: [
      feature('Step-by-Step Implementation Guidance', 'compass', 'Work through requirements, method selection, coding and validation with explanations that help you understand each decision.'),
      feature('Customized Coding', 'code', 'Develop or adapt code to the agreed data, algorithm and research workflow, with clear structure and documented assumptions.'),
      feature('Technical Suggestions & Optimization', 'bulb', 'Review implementation choices, investigate bottlenecks and suggest improvements that can be checked against meaningful performance measures.'),
    ],
    sources: [{ label: 'MATLAB capabilities', url: 'https://www.mathworks.com/products/matlab.html' }, { label: 'Programming with MATLAB', url: 'https://www.mathworks.com/products/matlab/programming-with-matlab.html' }],
  },
  {
    path: simulinkPath, label: 'Simulink Projects', title: 'Simulink Implementation & Model Development', icon: 'compass',
    description: 'Simulink model-development support for block diagrams, dynamic simulation, algorithms, solver selection and performance validation.',
    intro: 'Simulink works with MATLAB to combine graphical programming and block-diagram modelling with numerical analysis. It helps you represent dynamic behaviour, explore interactions across multiple domains and assess a system before physical implementation. We support engineering and research projects with a considered model structure, suitable simulation settings and a clear validation plan.',
    cta: 'Discuss Your Simulink Project',
    highlights: ['Block-diagram modelling', 'Dynamic system simulation', 'Multidomain research models', 'Testing and validation'],
    whyTitle: 'Why Is MATLAB Simulink Used?',
    whyIntro: 'Simulink supports applications in engineering, computational sciences, signal processing, automotive control and technical research. The model and product selection should follow the system you need to investigate.',
    features: [
      feature('Non-linear Model Development', 'chart', 'Represent nonlinear relationships and operating conditions when a linear approximation is insufficient.'),
      feature('Hierarchical Block Diagrams', 'file', 'Organise components into subsystems so the overall model remains understandable as its complexity grows.'),
      feature('HDL/Code-Generation Capabilities', 'code', 'Supported models can target code-generation workflows using appropriate add-on products, such as Simulink Coder or HDL Coder. Compatibility and licensing must be checked.'),
      feature('Fixed-step and Variable-step ODE Solvers', 'compass', 'Choose solver settings suited to system dynamics, accuracy needs and deployment constraints; compare their effect on the results.'),
      feature('Dynamic Simulation', 'chart', 'Study how signals and states evolve over time under defined inputs and test scenarios.'),
      feature('Control-system Modelling', 'search', 'Connect controllers and plant models to evaluate response, stability-related behaviour and performance against project criteria.'),
    ],
    models: [
      { title: 'Engine Model for Speech Control', caption: 'Original concept placeholder interpreting speech control as spoken commands to an engine-control simulation. The actual project specification should define the intended behaviour.', blocks: [['Speech input', 'Command signal'], ['Command logic', 'Interpret & constrain'], ['Engine model', 'Simulated response']], note: 'Concept illustration only. It is not a validated automotive control design or a claim of completed project work.' },
      { title: 'Fuel Economy Model', caption: 'A conceptual workflow for studying fuel use over a defined driving scenario. Vehicle parameters and fuel-rate estimates would need calibration and validation.', blocks: [['Drive cycle', 'Speed & time'], ['Vehicle model', 'Load & power demand'], ['Fuel estimate', 'Consumption metrics']], note: 'Illustrative architecture only; no measured fuel-economy results are shown.' },
    ],
    benefits: [
      feature('Overall Technical Knowledge', 'book', 'Review the software environment and model architecture before implementation.', ['Software and toolbox selection', 'Model architecture', 'Updated implementation practices']),
      feature('Algorithm & Code Development', 'code', 'Match the implementation to requirements, using custom code only where the model needs it.', ['Requirement-based algorithms', 'Custom code only where needed', 'Efficient implementation']),
      feature('Testing & Maintenance', 'badge', 'Inspect model behaviour and document the checks needed for reliable ongoing use.', ['Model testing', 'Performance validation', 'Debugging', 'Agreed post-implementation support']),
    ],
    process: [
      feature('Understand Requirements & Plan Model', 'compass', 'Define system boundaries, inputs, outputs and acceptance criteria. Map the intended model before adding detail.'),
      feature('Develop Algorithms and Required Code', 'code', 'Build the necessary logic and numerical methods, adding code where it contributes to the model requirements.'),
      feature('Select Suitable Add-ons / Toolboxes', 'book', 'Consider Stateflow for decision logic and state machines, SimEvents for discrete-event modelling, and other modules only where the project requires them. Confirm product availability.'),
      feature('Test Model Performance & Validate Results', 'badge', 'Check behaviour against expected cases, examine solver sensitivity and compare outputs with suitable reference evidence.'),
    ],
    sources: [{ label: 'Simulink capabilities', url: 'https://www.mathworks.com/products/simulink.html' }, { label: 'Choosing a solver', url: 'https://www.mathworks.com/help/simulink/ug/choose-a-solver.html' }, { label: 'Stateflow', url: 'https://www.mathworks.com/products/stateflow.html' }, { label: 'SimEvents', url: 'https://www.mathworks.com/products/simevents.html' }],
  },
];
export const implementationReviews = [
  { name: 'Sample researcher A', context: 'Algorithm development · illustrative example', text: 'I would value clear explanations of the implementation decisions and how each output connects to the research question.' },
  { name: 'Sample researcher B', context: 'Model planning · illustrative example', text: 'A well-organised model and a sensible testing plan would help me investigate changes without losing sight of the original requirements.' },
  { name: 'Sample researcher C', context: 'Technical review · illustrative example', text: 'Documented assumptions and practical suggestions would make it easier to understand the limitations of my results.' },
];

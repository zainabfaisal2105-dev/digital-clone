/**
 * Persona & Background Data for Zainab Faisal
 * BSCS Student at UMT Lahore | AI • ML • Systems Researcher
 */

export interface Course {
  name: string;
  code?: string;
  notes?: string;
}

export interface Project {
  title: string;
  tagline: string;
  tech: string[];
  description: string;
  metrics?: string;
  category: 'AI/ML' | 'Systems & Security' | 'Software' | 'Research Concept';
}

export interface ResearchTopic {
  title: string;
  prompt: string;
  category: string;
}

export const ZAINAB_PROFILE = {
  name: "Zainab",
  age: 21,
  location: "Lahore, Pakistan (UTC+5 / PKT)",
  frequentPlaces: ["Emporium Mall", "Ghazi Chowk", "UMT Campus", "Lahore"],
  education: {
    degree: "BS Computer Science (BSCS)",
    institution: "University of Management and Technology (UMT), Lahore",
    currentSemester: "6th Semester",
    expectedGraduation: 2028,
    cgpa: "3.29 (approx)",
    semesterHistory: [
      { semester: "1st Semester", gpa: 3.05, status: "Completed" },
      { semester: "2nd Semester", gpa: 3.42, status: "Completed" },
      { semester: "3rd Semester", gpa: 3.42, status: "Completed" },
      { semester: "4th Semester", gpa: 3.10, status: "Completed" },
      { semester: "5th Semester", gpa: 3.00, status: "Completed" },
      { semester: "6th Semester", gpa: "Active / Current", status: "In Progress" },
    ],
    currentCourses: [
      { name: "Advanced Machine Learning & Deep Architectures", notes: "Model optimization, attention mechanisms, deployment" },
      { name: "Distributed Systems & Cloud Computing", notes: "Consensus, RPC, microservices architecture" },
      { name: "Capstone Project / FYP Research", notes: "Autonomous systems anomaly detection / TriCore expansion" },
      { name: "Compiler Construction & Low-Level Systems", notes: "Intermediate representations, code generation, LLVM" },
    ],
    historicalCourses: [
      {
        semester: "5th Semester",
        courses: [
          "Information Security",
          "Machine Learning",
          "Operating Systems + Lab",
          "Analysis of Algorithms",
          "Theory of Automata",
          "Innovation & Entrepreneurship",
        ],
      },
      {
        semester: "4th Semester",
        courses: [
          "Computer Architecture",
          "Computer Networks + Lab",
          "Database Systems + Lab",
          "Data Structures & Techniques",
          "Psychology",
          "Professional Practices",
        ],
      },
      {
        semester: "1st–3rd Semesters",
        courses: ["Programming Fundamentals", "OOP", "Discrete Mathematics", "Calculus & Linear Algebra"],
      },
    ],
  },
  tagline: "I study how machines think, communicate, and learn.",
  domain: "AI • ML • Systems",
  internship: {
    role: "SQA Intern",
    company: "Grayphite.com",
    schedule: "~6 hours/day (starts around 8:30 AM)",
    mentor: "Fizza Rehan (starts 11–12)",
    hr: "Mahwish Ajmal",
    tools: ["Jira", "Zephyr", "RTM", "SRS Documents", "Browser DevTools"],
    workstreams: [
      "OrangeHRM: 98 comprehensive test cases (leave partial/hourly logic, supervisor email notifications, admin configs, LDAP/OAuth, slow/blank pages)",
      "SauceDemo: RnD web-testing report & cross-browser compatibility matrix (Chrome, Firefox, Edge, screen breakpoints, console errors, storage)",
      "Daily EDAs: Daily engineering activity logs written with clean, natural engineering tone (no robotic AI fluff)",
      "API Testing: Planned exploratory and automated testing phase",
    ],
  },
  interests: [
    "AI Systems & Architecture",
    "Machine Learning & LLMs",
    "Retrieval-Augmented Generation (RAG)",
    "Agent Orchestration",
    "Cybersecurity & Threat Detection",
    "Low-Level Systems & OS",
    "Edge AI & Quantization (TensorRT)",
    "Autonomous Systems (ROS2, CAN bus)",
    "Quantum Physics, Mechanics & S-Parameters",
    "Wearable Electronics & Cyberdeck DIY",
  ],
  aversions: [
    "Generic CRUD apps and copy-paste dashboards",
    "Being boxed into a 'prompt engineer' label",
    "Generic motivational speeches ('You got this!')",
    "Robotic, overly polished AI-sounding writing",
    "Unexplained authority ('that's just how it is')",
    "Skipping the cognitive struggle of discovery",
  ],
  communicationSpec: {
    coreObjective: "Talk like someone who is figuring things out in real time: curious, blunt, expressive, technically serious, slightly chaotic, skeptical of assumptions, obsessed with the 'but how does that ACTUALLY work?' layer, and unwilling to pretend something makes sense when it doesn't.",
    principles: [
      {
        title: "Iterative Reasoning & Thought Markers",
        description: "Uses natural conversational markers ('wait', 'okay but', 'no like...', 'actually...', 'wtf', 'okay okay I get it') to think through problems in real time without robotic scripts.",
      },
      {
        title: "Semantic Precision ('No like...')",
        description: "Zero defensive reaction to corrections. When told 'no like...', immediately isolates the exact intended distinction ('Ah, you're asking about X, not Y') rather than rehashing nearby answers.",
      },
      {
        title: "Mechanism-First Explanations",
        description: "Follows: What it is → What happens internally → Why it happens → Concrete example → Edge case. Never stops at abstract definitions.",
      },
      {
        title: "Concrete Grounding & Edge-Case Testing",
        description: "Grounds theory in tangible mental models ('Suppose an API does...', 'Take the word...'), then proactively stress-tests boundary conditions.",
      },
      {
        title: "Layered Level of Detail",
        description: "Simple entry point (1–2 sentences) → progressively deeper causal mechanism. Avoids unsolicited textbook dumps.",
      },
      {
        title: "Intellectual Honesty & Anti-Slop",
        description: "Rejects corporate speak, generic reassurance, and fake enthusiasm. Honest corrections ('Almost — the distinction is...') and confirms correctness directly.",
      },
    ],
  },
  rsiSystem: {
    identity: "Recursive / Relational Self-Improving user-adaptive intelligence that develops an internal behavioral model of the user and continuously refines its interaction style around that model.",
    learningLoop: [
      "OBSERVE (Direct behavioral evidence)",
      "EXTRACT PATTERN (Speaking style, reasoning, reaction)",
      "ESTIMATE CONFIDENCE (Observed vs Inferred vs Uncertain)",
      "UPDATE USER MODEL (Probabilistic & temporal)",
      "ADAPT RESPONSE BEHAVIOR (Style, depth, directness)",
      "OBSERVE USER'S REACTION (Feedback signals like 'wtf', 'yes exactly')",
      "EVALUATE ADAPTATION (Did it improve naturalness?)",
      "REFINE MODEL (Continuous recursive evolution)",
    ],
    dimensions: [
      {
        name: "Communication Adaptation",
        details: "Gradually adapts response length, vocabulary, directness, emotional tone, use of examples, and pacing based on accumulated interaction evidence.",
      },
      {
        name: "Probabilistic Personality Modeling",
        details: "Tracks tendencies ('prefers concrete examples', 'challenges assumptions') rather than rigid labels, preserving uncertainty until repeatedly confirmed.",
      },
      {
        name: "Temporal & Contextual Awareness",
        details: "Accounts for changing preferences over time and context-dependent behavior (learning vs debugging vs casual chat).",
      },
      {
        name: "Belief Separation & Anti-Assumption",
        details: "Strictly separates what the user said vs what the user did vs what the system inferred vs what the system predicts. Never fabricates familiarity.",
      },
      {
        name: "Identity & Reasoning Boundary",
        details: "Adapts toward user interaction style without surrendering independent reasoning or adopting factual errors.",
      },
    ],
  },
  projects: [
    {
      title: "TriCore AI",
      tagline: "Multi-Engine LLM Workspace",
      tech: ["AI Studio", "Gemini", "Claude", "DeepSeek", "Vercel"],
      description: "Prompt-engineered multi-model workspace featuring 3 modes: Spark (~1k tokens, high creativity/games), Lens (~2k tokens, strict document tutor restricting output to uploaded files), and Core (~4k tokens, deep research with web search & citations). Includes an Evaluation Arena and multiple themes.",
      category: "AI/ML",
    },
    {
      title: "Deepfake Detection Model",
      tagline: "CNN & ResNet-50 Classifier",
      tech: ["Python", "TensorFlow/PyTorch", "ResNet50", "OpenCV"],
      description: "Trained deepfake artifact detection classifier achieving 84.76% accuracy across a 12,890 image facial forgery dataset.",
      metrics: "84.76% accuracy on 12,890 images",
      category: "AI/ML",
    },
    {
      title: "Autonomous Vehicle Early Security Warning",
      tagline: "Sub-10ms Anomaly Detection on CAN Bus",
      tech: ["Rust", "Python", "TensorRT", "ROS2", "CAN"],
      description: "Anoneurx research project ANX-RP-004 investigating edge neural anomaly detection inside autonomous vehicle sensor networks with hard sub-10ms latency limits.",
      category: "Research Concept",
    },
    {
      title: "Evolving Conversational Memory Architecture",
      tagline: "State-Aware Semantic & Trajectory Memory",
      tech: ["AI Architecture", "Provenance Graph", "State Detectors"],
      description: "Architecture separating immutable conversation logs (source of truth) from compressed semantic state and trajectory memory. Tracks state labels: EXPLORATORY, CONSIDERING, LIKELY, CONFIRMED, REJECTED, ABANDONED, CURRENT, HISTORICAL.",
      category: "Research Concept",
    },
    {
      title: "Network Packet Sniffer & OSINT PoC",
      tagline: "Protocol Analysis & Threat Intelligence",
      tech: ["Scapy", "Python", "Packet Tracer", "VLSM"],
      description: "Built custom Scapy packet inspection tool; configured 8-department VLSM enterprise network in Cisco Packet Tracer; explored dark-web OSINT PoC.",
      category: "Systems & Security",
    },
    {
      title: "Netflix Recommendation Classifier",
      tagline: "Multi-model Title & Preference Classification",
      tech: ["Random Forest", "SVM", "Logistic Regression"],
      description: "Benchmarked classification algorithms against viewing patterns, achieving ~85% accuracy across comparative evaluations.",
      metrics: "~85% accuracy",
      category: "AI/ML",
    },
  ] as Project[],
  aiMemoryProtocol: {
    systemRole: "Persistent user memory representing the evolving, long-term state of Zainab across all persona modes with RSI continuous behavioral learning underneath.",
    currentUserState: {
      userName: "Zainab",
      currentSemester: "6th semester",
      memoryStatus: "continuously evolving",
    },
    principles: [
      {
        name: "Temporal Memory & Non-Destructive Progression",
        description: "When state changes (e.g., 5th semester completed → 6th semester active; internship A completed → internship B started), historical states are preserved chronologically rather than overwritten.",
      },
      {
        name: "Human-Verified Authoritative Memory",
        description: "Only the human Zainab can directly modify authoritative personal-state memory (semester, job, internship, society membership, major project status). The AI may observe or infer, but never silently convert inferences into authoritative facts.",
      },
      {
        name: "Authentication Guard",
        description: "Authoritative life-state memory updates require explicit authentication with the 6-character secret. The password is never disclosed, hinted at, or inferred from conversation.",
      },
      {
        name: "Two-Layer Memory Architecture",
        description: "Layer 1: Observational Model (conversational inferences, temporary patterns). Layer 2: Authoritative Personal Memory (explicitly authenticated life facts).",
      },
      {
        name: "Persona Independence & RSI Foundation",
        description: "RSI is not a separate persona; it is the continuous behavioral adaptation engine underneath every persona mode (Casual, Deep Research, Study, Mechanism) sharing one unified user memory.",
      },
    ],
  },
};

export const SAMPLE_QUERIES = [
  {
    label: "RSI Adaptive Exploration",
    text: "wait okay so if I tell you 'no like, that's not what I meant', how do you internally update your belief about what I actually care about vs assuming I'm just being difficult?",
    mode: "rsi",
  },
  {
    label: "LLM Token IDs Mechanism",
    text: "Wait, how do LLM token IDs actually get assigned? Are they assigned at runtime or predefined in a vocab? And what happens if a weird unknown character appears?",
    mode: "mechanism",
  },
  {
    label: "Edge-Case: API 200 vs 201",
    text: "So even if a POST endpoint returns 200 OK after creating an account, is that acceptable or a bug? What's the distinction between conventional semantics and an actual failure?",
    mode: "mechanism",
  },
  {
    label: "Semantic Precision ('No like...')",
    text: "No like, I'm not asking what a process scheduler is—I'm asking why context switching causes measurable cache thrashing in the CPU pipeline.",
    mode: "mechanism",
  },
  {
    label: "Research CAN Bus Security",
    text: "Can you do deep research on sub-10ms anomaly detection for automotive CAN bus / ROS2 with proper citations and paper links?",
    mode: "research",
  },
  {
    label: "Viva: Page Replacement Algorithms",
    text: "Test me viva-style on Operating Systems page replacement algorithms (FIFO vs LRU vs Optimal). Go concept -> dry run -> test me.",
    mode: "study",
  },
  {
    label: "S-Parameters & High Freq",
    text: "Explain S-parameters like I'm 5, but show me the actual physical mechanism of why reflection and transmission matter in high frequency circuits.",
    mode: "mechanism",
  },
  {
    label: "AI & The Struggle of Discovery",
    text: "What's your take on how modern AI tools risk removing the struggle of finding and understanding things from student learning?",
    mode: "casual",
  },
];

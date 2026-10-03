export interface FaqItem {
  question: string;
  answer: string;
  group: "approach" | "ai" | "programs" | "companies";
}

export const faqs: FaqItem[] = [
  {
    group: "approach",
    question: "Is this an English course?",
    answer:
      "Not in the traditional sense. The program focuses on professional communication and the situations where English performance matters most.",
  },
  {
    group: "approach",
    question: "Do I need advanced English?",
    answer:
      "No specific level should be assumed. The program is designed particularly for professionals who already use English or need to operate professionally in English. Your assessment determines where we start.",
  },
  {
    group: "approach",
    question: "How is this different from conversation classes or a language app?",
    answer:
      "Classes and apps are organized around language topics and levels. This work is organized around your real situations — the specific meeting, presentation or negotiation — and is measured by how you communicate in them, not by hours attended.",
  },
  {
    group: "approach",
    question: "Will my grammar and pronunciation be corrected?",
    answer:
      "Yes, where it affects how you are understood or perceived. Accuracy matters, but it is addressed in service of clarity, credibility and impact rather than as an end in itself.",
  },
  {
    group: "ai",
    question: "Is AI replacing the coach?",
    answer:
      "No. AI expands the amount of practice available between sessions. Human coaching remains responsible for strategy, interpretation and high-value feedback.",
  },
  {
    group: "ai",
    question: "Is the AI coach available now?",
    answer:
      "The AI communication platform is currently under development. Early-access clients will be invited as functionality becomes available.",
  },
  {
    group: "ai",
    question: "What will happen to my practice recordings and data?",
    answer:
      "Data handling will be documented in our privacy policy before any recording features launch. Practice data will be used to provide feedback to you and your coach — never sold.",
  },
  {
    group: "programs",
    question: "How long is the Executive Performance Program?",
    answer:
      "Twelve weeks. It combines private coaching, structured practice between sessions and progress assessments at key milestones.",
  },
  {
    group: "programs",
    question: "Can you help me prepare for a specific event?",
    answer:
      "Yes. Many clients come to us with a defined moment in mind — a board presentation, an interview, a negotiation or a conference. Preparation for that moment becomes part of the plan.",
  },
  {
    group: "programs",
    question: "Do you guarantee specific results?",
    answer:
      "No. We commit to a rigorous process: a clear assessment, a personalized plan, deliberate practice and expert feedback. How you apply it in your role is yours — and that is where the work is aimed.",
  },
  {
    group: "companies",
    question: "Can companies enroll multiple employees?",
    answer:
      "Yes. Companies can start with a pilot for one team or enroll cohorts of roughly 10–50 people in an annual program.",
  },
  {
    group: "companies",
    question: "Can the program be customized to our industry?",
    answer: "Yes. Scenarios can be designed around the company's real communication needs.",
  },
  {
    group: "companies",
    question: "What reporting do companies receive?",
    answer:
      "Participation and progress dashboards, plus quarterly reports summarizing development themes across the cohort. Individual coaching conversations remain confidential.",
  },
];

/**
 * Structured marketing copy. Kept out of components so it can later move to
 * a CMS without touching layout code.
 */
import type { MetricKey, ScenarioCategory } from "@/lib/types";

export const audiences = [
  "CEOs",
  "Founders",
  "Directors & VPs",
  "Sales leaders",
  "Senior engineers",
  "Consultants",
  "Lawyers",
  "Finance professionals",
];

export const pressureSituations = [
  { title: "Presenting to senior leadership", detail: "When the room is deciding, not just listening." },
  { title: "Defending a proposal", detail: "Holding your position when it is challenged." },
  { title: "Negotiating", detail: "Choosing words that protect value and relationships." },
  { title: "Answering unexpected questions", detail: "Thinking and speaking at the same time." },
  { title: "Explaining technical concepts", detail: "Making complexity simple for non-specialists." },
  { title: "Disagreeing diplomatically", detail: "Being direct without being abrupt." },
  { title: "Speaking spontaneously", detail: "No script, no slides, no time to translate." },
  { title: "Communicating under pressure", detail: "When stakes are high and attention is on you." },
];

export const comparison = {
  traditional: {
    label: "Traditional English training",
    flow: ["Learn English", "Attend classes", "Complete exercises"],
    traits: [
      "Organized around levels and textbooks",
      "Measured in hours attended",
      "Generic topics and vocabulary lists",
      "Practice limited to class time",
    ],
  },
  performance: {
    label: "Executive English Performance",
    flow: [
      "Identify the situations that matter",
      "Practice those situations",
      "Receive AI feedback",
      "Receive expert coaching",
      "Measure improvement",
      "Perform in the real world",
    ],
    traits: [
      "Organized around your real professional situations",
      "Focused on communication performance, not hours",
      "Scenarios built from your role and industry",
      "Practice available between coaching sessions",
    ],
  },
};

export const processSteps = [
  {
    number: "01",
    title: "Assess",
    body: "Understand your current communication ability, goals, role and the professional situations you face.",
  },
  {
    number: "02",
    title: "Personalize",
    body: "Build a communication development plan based on your real-world responsibilities.",
  },
  {
    number: "03",
    title: "Practice",
    body: "Use AI-assisted simulations and targeted exercises between coaching sessions.",
  },
  {
    number: "04",
    title: "Perform",
    body: "Apply the improvements to actual meetings, presentations, negotiations and professional situations.",
  },
];

export const journey = ["Assessment", "Personalization", "AI Practice", "Expert Coaching", "Real-world Performance"];

export const humanAiModel = [
  {
    actor: "AI",
    role: "Practice",
    body: "Realistic simulations and immediate feedback, available whenever you have twenty minutes.",
  },
  {
    actor: "Expert",
    role: "Coach",
    body: "Strategy, interpretation and the judgment that turns repetitions into real improvement.",
  },
  {
    actor: "You",
    role: "Perform",
    body: "Walk into the meeting, the presentation or the negotiation prepared.",
  },
];

export const practiceSituations: { label: string; category: ScenarioCategory }[] = [
  { label: "Executive meetings", category: "meetings" },
  { label: "Presentations", category: "presentations" },
  { label: "Negotiations", category: "negotiations" },
  { label: "Sales conversations", category: "sales" },
  { label: "Interviews", category: "interviews" },
  { label: "Difficult conversations", category: "difficult" },
  { label: "Technical explanations", category: "technical" },
  { label: "Networking", category: "networking" },
  { label: "Client calls", category: "client" },
  { label: "Q&A sessions", category: "presentations" },
];

export const feedbackAreas = [
  "Clarity",
  "Vocabulary",
  "Grammar",
  "Pronunciation",
  "Conciseness",
  "Confidence",
  "Response quality",
  "Communication patterns",
];

export const metricLabels: Record<MetricKey, string> = {
  clarity: "Clarity",
  vocabulary: "Vocabulary",
  grammar: "Grammar",
  pronunciation: "Pronunciation",
  responseQuality: "Response quality",
  confidence: "Confidence",
};

export const categoryLabels: Record<ScenarioCategory, string> = {
  leadership: "Leadership",
  meetings: "Meetings",
  presentations: "Presentations",
  negotiations: "Negotiations",
  sales: "Sales",
  client: "Client communication",
  interviews: "Interviews",
  networking: "Networking",
  technical: "Technical communication",
  difficult: "Difficult conversations",
};

export const executiveOutcomes = [
  "Speak clearly in high-stakes meetings",
  "Present confidently to international leadership",
  "Negotiate effectively",
  "Explain complex ideas simply",
  "Handle difficult questions",
  "Communicate naturally with international clients",
  "Strengthen executive presence in English",
  "Write sharper professional emails and messages",
];

export const preparationMoments = [
  "Interviews for international roles",
  "Board and leadership presentations",
  "Conferences and keynotes",
  "Contract and pricing negotiations",
  "Quarterly business reviews",
  "Critical client meetings",
];

export const corporateNeeds = [
  "International clients",
  "US or European headquarters",
  "International teams",
  "Sales",
  "Negotiations",
  "Presentations",
  "Leadership meetings",
  "Technical discussions",
  "Cross-border collaboration",
  "Executive communication",
];

export const corporateBuyers = ["HR directors", "L&D managers", "Talent development", "CEOs", "Country managers", "Department heads"];

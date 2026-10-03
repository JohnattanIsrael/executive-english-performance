import type { AssessmentQuestion, ProfileDimensionKey } from "@/lib/types";

/**
 * Self-assessment questionnaire. Each option carries weights per profile
 * dimension; the scorer in AssessmentService turns answers into 1–5 bands.
 * This is a structured self-reflection, not a validated language test.
 */
export const assessmentQuestions: AssessmentQuestion[] = [
  {
    id: "frequency",
    prompt: "How often do you use English professionally?",
    kind: "single",
    options: [
      { value: "daily", label: "Every day — it is my main working language", weights: { meetings: 2, vocabulary: 2, spontaneous: 1 } },
      { value: "weekly", label: "Several times a week", weights: { meetings: 1, vocabulary: 1 } },
      { value: "monthly", label: "A few times a month, often for important moments", weights: { meetings: 0, vocabulary: 0 } },
      { value: "rarely", label: "Rarely today, but my role is changing", weights: { meetings: -1, vocabulary: -1, spontaneous: -1 } },
    ],
  },
  {
    id: "difficult",
    prompt: "Which situations are most difficult for you?",
    help: "Choose up to three.",
    kind: "multi",
    max: 3,
    options: [
      { value: "presenting", label: "Presenting to senior leadership", weights: { presentation: -2, presence: -1 } },
      { value: "questions", label: "Answering unexpected questions", weights: { spontaneous: -2, precision: -1 } },
      { value: "negotiating", label: "Negotiating", weights: { precision: -2, presence: -1 } },
      { value: "disagreeing", label: "Disagreeing diplomatically", weights: { meetings: -1, precision: -1 } },
      { value: "technical", label: "Explaining technical or complex topics", weights: { clarity: -2 } },
      { value: "smalltalk", label: "Small talk and networking", weights: { spontaneous: -1, vocabulary: -1 } },
      { value: "writing", label: "Writing important emails and messages", weights: { precision: -1, clarity: -1 } },
      { value: "meetings", label: "Contributing in fast-moving meetings", weights: { meetings: -2, spontaneous: -1 } },
    ],
  },
  {
    id: "presenting",
    prompt: "How confident are you when presenting in English?",
    kind: "scale",
    options: [
      { value: "1", label: "I avoid it when I can", weights: { presentation: -2, presence: -2 } },
      { value: "2", label: "I can do it, but I over-prepare and still feel exposed", weights: { presentation: -1, presence: -1 } },
      { value: "3", label: "Comfortable with prepared content", weights: { presentation: 1 } },
      { value: "4", label: "Confident, but I want more impact", weights: { presentation: 2, presence: 1 } },
      { value: "5", label: "Very confident — I want executive-level polish", weights: { presentation: 3, presence: 2 } },
    ],
  },
  {
    id: "spontaneous",
    prompt: "How comfortable are you with spontaneous questions?",
    kind: "scale",
    options: [
      { value: "1", label: "I freeze or translate in my head", weights: { spontaneous: -2, clarity: -1 } },
      { value: "2", label: "I answer, but not the way I would in my own language", weights: { spontaneous: -1, precision: -1 } },
      { value: "3", label: "Usually fine, sometimes I ramble", weights: { spontaneous: 1, clarity: -1 } },
      { value: "4", label: "Comfortable, I want sharper answers", weights: { spontaneous: 2, precision: 1 } },
      { value: "5", label: "Very comfortable under pressure", weights: { spontaneous: 3, presence: 1 } },
    ],
  },
  {
    id: "vocabulary",
    prompt: "How precisely can you express nuanced business ideas?",
    kind: "scale",
    options: [
      { value: "1", label: "I often lack the right words", weights: { vocabulary: -2, precision: -2 } },
      { value: "2", label: "I get my point across, but it sounds simpler than I mean", weights: { vocabulary: -1, precision: -1 } },
      { value: "3", label: "Mostly precise, with occasional gaps", weights: { vocabulary: 1, precision: 1 } },
      { value: "4", label: "Precise, I want a more executive register", weights: { vocabulary: 2, precision: 2 } },
      { value: "5", label: "Very precise in most contexts", weights: { vocabulary: 3, precision: 2 } },
    ],
  },
  {
    id: "priorities",
    prompt: "What professional situations matter most to you right now?",
    help: "Choose up to three.",
    kind: "multi",
    max: 3,
    options: [
      { value: "leadership_meetings", label: "Leadership and board meetings" },
      { value: "presentations", label: "Presentations and quarterly reviews" },
      { value: "negotiations", label: "Negotiations and pricing conversations" },
      { value: "clients", label: "International client relationships" },
      { value: "interviews", label: "Interviews for international roles" },
      { value: "teams", label: "Leading international teams" },
      { value: "technical", label: "Technical discussions and incident reviews" },
      { value: "conferences", label: "Conferences and networking" },
    ],
  },
];

export const dimensionLabels: Record<ProfileDimensionKey, string> = {
  presentation: "Presentation Communication",
  meetings: "Meeting Communication",
  spontaneous: "Spontaneous Speaking",
  vocabulary: "Business Vocabulary",
  clarity: "Clarity",
  precision: "Precision",
  presence: "Executive Presence",
};

export const bandLabels: Record<1 | 2 | 3 | 4 | 5, string> = {
  1: "Priority focus",
  2: "Developing",
  3: "Solid base",
  4: "Strong",
  5: "Distinctive",
};

export const dimensionSummaries: Record<ProfileDimensionKey, Record<"low" | "mid" | "high", string>> = {
  presentation: {
    low: "Structure and delivery of prepared content is a clear opportunity.",
    mid: "A reliable base; the next step is impact and audience control.",
    high: "Strong delivery; refine executive framing and Q&A handling.",
  },
  meetings: {
    low: "Contributing at the right moment in fast discussions needs attention.",
    mid: "You participate well; work on influence and timing.",
    high: "Comfortable in meetings; focus on leading and closing discussions.",
  },
  spontaneous: {
    low: "Unscripted moments are where practice will pay off most.",
    mid: "You cope well; aim for shorter, more structured answers.",
    high: "Comfortable thinking on your feet; sharpen precision under pressure.",
  },
  vocabulary: {
    low: "Expanding functional business language will unlock nuance.",
    mid: "Good working range; build a more executive register.",
    high: "Wide range; refine word choice for tone and diplomacy.",
  },
  clarity: {
    low: "Simplifying complex ideas for mixed audiences is a priority.",
    mid: "Generally clear; tighten structure and lead with the point.",
    high: "Clear communicator; keep messages concise as stakes rise.",
  },
  precision: {
    low: "Expressing exact meaning — especially in disagreement — needs work.",
    mid: "Usually precise; strengthen diplomatic and negotiation language.",
    high: "Precise and nuanced; focus on persuasion and framing.",
  },
  presence: {
    low: "Projecting authority in English is a key development area.",
    mid: "Credible presence; build composure in high-pressure moments.",
    high: "Strong presence; polish for senior and board-level audiences.",
  },
};

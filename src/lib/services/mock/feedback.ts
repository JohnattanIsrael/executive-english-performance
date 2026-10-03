import { coachInsights } from "@/mocks/client";
import { scenarios } from "@/mocks/scenarios";
import type { Conversation, FeedbackObservation, FeedbackReport } from "@/lib/types";
import type { FeedbackService } from "../contracts";
import { uid } from "@/lib/utils";

const HEDGES = /\b(i think|maybe|perhaps|just|kind of|sort of|a little bit|i guess|probably|i feel like|possibly|somehow)\b/gi;
const FILLERS = /\b(um+|uh+|you know|basically|actually|honestly|literally)\b/gi;
const APOLOGIES = /\b(sorry|apologi[sz]e|apologies)\b/gi;

const words = (text: string) => text.trim().split(/\s+/).filter(Boolean);
const sentences = (text: string) => text.split(/(?<=[.!?])\s+/).map((s) => s.trim()).filter(Boolean);

/**
 * Rule-based text signals for the preview simulation. These are transparent
 * heuristics (length, softeners, fillers, structure) — not an AI evaluation.
 * The future AI FeedbackService replaces this with model-based analysis of
 * transcripts and audio.
 */
export function analyzeTranscript(conversation: Conversation): FeedbackReport {
  const responses = conversation.turns.filter((t) => t.speaker === "user").map((t) => t.text);
  const allText = responses.join(" ");
  const wordCounts = responses.map((r) => words(r).length);
  const allSentences = responses.flatMap(sentences);
  const avgWords = wordCounts.length ? Math.round(wordCounts.reduce((a, b) => a + b, 0) / wordCounts.length) : 0;
  const avgSentence = allSentences.length
    ? Math.round(allSentences.reduce((a, s) => a + words(s).length, 0) / allSentences.length)
    : 0;
  const hedges = allText.match(HEDGES) ?? [];
  const fillers = allText.match(FILLERS) ?? [];
  const apologies = allText.match(APOLOGIES) ?? [];
  const firstSentence = responses[0] ? sentences(responses[0])[0] ?? "" : "";
  const longestSentence = [...allSentences].sort((a, b) => words(b).length - words(a).length)[0];

  const observations: FeedbackObservation[] = [];
  const add = (o: Omit<FeedbackObservation, "id">) => observations.push({ id: uid("obs"), ...o });

  if (firstSentence && words(firstSentence).length <= 20) {
    add({
      area: "structure",
      tone: "strength",
      title: "You opened with a short, direct sentence",
      detail: "A concise first sentence gives senior listeners the point before the detail.",
      example: firstSentence,
    });
  } else if (firstSentence) {
    add({
      area: "structure",
      tone: "focus",
      title: "Lead with the point",
      detail: "Your first sentence was long. Try stating the conclusion or answer in under 20 words, then support it.",
      example: firstSentence,
    });
  }

  if (avgWords > 120) {
    add({
      area: "concision",
      tone: "focus",
      title: "Answers are running long",
      detail: `Your responses averaged ${avgWords} words. For spoken executive answers, aim for roughly 60–100 words, then let the other person ask for more.`,
    });
  } else if (avgWords >= 25) {
    add({
      area: "concision",
      tone: "strength",
      title: "Response length is in a good range",
      detail: `Your responses averaged ${avgWords} words — enough substance without losing the listener.`,
    });
  } else if (avgWords > 0) {
    add({
      area: "responseQuality",
      tone: "focus",
      title: "Add one supporting reason",
      detail: `Your responses averaged ${avgWords} words. Short is good, but add a reason, a number or an example so the answer carries weight.`,
    });
  }

  if (avgSentence > 25 && longestSentence) {
    add({
      area: "clarity",
      tone: "focus",
      title: "Break up long sentences",
      detail: `Average sentence length was ${avgSentence} words. Shorter sentences are easier to follow when listening.`,
      example: longestSentence,
    });
  }

  if (hedges.length >= 3) {
    const unique = [...new Set(hedges.map((h) => h.toLowerCase()))].slice(0, 4).join("”, “");
    add({
      area: "confidence",
      tone: "focus",
      title: "Reduce softeners",
      detail: `You used ${hedges.length} softening phrases (“${unique}”). One can be diplomatic; several can sound uncertain.`,
    });
  } else if (responses.length) {
    add({
      area: "confidence",
      tone: "strength",
      title: "Direct, confident wording",
      detail: "Few softening phrases — your position comes through clearly.",
    });
  }

  if (fillers.length >= 2) {
    add({
      area: "vocabulary",
      tone: "focus",
      title: "Watch filler words",
      detail: `${fillers.length} filler words detected. In speech, a short pause is more powerful than a filler.`,
    });
  }

  if (apologies.length >= 2) {
    add({
      area: "confidence",
      tone: "focus",
      title: "Acknowledge once, then move to action",
      detail: `You apologized ${apologies.length} times. One clear acknowledgement followed by ownership and next steps reads as stronger.`,
    });
  }

  const scenario = scenarios.find((s) => s.id === conversation.scenarioId);
  const nextPractice = scenarios
    .filter((s) => s.status === "published" && s.id !== scenario?.id && (s.category === scenario?.category || s.skills.some((k) => scenario?.skills.includes(k))))
    .slice(0, 2)
    .map((s) => s.id);

  return {
    id: uid("fb"),
    conversationId: conversation.id,
    method: "heuristic",
    generatedAt: new Date().toISOString(),
    signals: [
      { label: "Responses", value: String(responses.length) },
      { label: "Avg. words per response", value: String(avgWords), hint: "Spoken target ≈ 60–100" },
      { label: "Avg. sentence length", value: `${avgSentence} words`, hint: "Listening target ≤ 20" },
      { label: "Softeners", value: String(hedges.length), hint: "maybe, I think, just…" },
      { label: "Filler words", value: String(fillers.length) },
    ],
    observations,
    nextPractice,
  };
}

export const mockFeedbackService: FeedbackService = {
  async analyze(conversation) {
    return analyzeTranscript(conversation);
  },
  async identifyPatterns() {
    return coachInsights.map((pattern, i) => ({ pattern, occurrences: 6 - i * 2 }));
  },
};

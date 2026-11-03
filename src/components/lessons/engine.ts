import type { Exercise, Lesson, Option } from "@/content/lessons";
import type { Locale } from "@/i18n/config";

/**
 * Pure lesson logic: deterministic shuffling (seeded, so rendering stays pure),
 * the practice queue and answer checking.
 */

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hash(text: string) {
  let h = 2166136261;
  for (let i = 0; i < text.length; i++) h = Math.imul(h ^ text.charCodeAt(i), 16777619);
  return h >>> 0;
}

export function shuffle<T>(items: readonly T[], seed: number): T[] {
  const rand = mulberry32(seed);
  const out = [...items];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/** An exercise ready to play: options and tiles in their display order. */
export type QueueItem = {
  key: string;
  /** Index in the lesson's exercise list. */
  index: number;
  retry: boolean;
  exercise: Exercise;
  /** choice/listen: options in display order, with the correct one's new index. */
  options?: Option[];
  answer?: number;
  /** order: tiles in display order. */
  tiles?: string[];
  /** match: right-hand column in display order. */
  right?: { label: string; option: Option; pair: number }[];
};

export function prepare(exercise: Exercise, index: number, seed: number, retry = false): QueueItem {
  const s = seed + index * 7919 + (retry ? 104729 : 0);
  const item: QueueItem = { key: `${index}-${retry ? "r" : "a"}-${seed}`, index, retry, exercise };
  if (exercise.kind === "choice" || exercise.kind === "listen") {
    const order = shuffle(
      exercise.options.map((_, i) => i),
      s,
    );
    item.options = order.map((i) => exercise.options[i]);
    item.answer = order.indexOf(exercise.answer);
  } else if (exercise.kind === "order") {
    const tiles = [...exercise.words, ...(exercise.extra ?? [])];
    let shuffled = shuffle(tiles, s);
    // Never start with the sentence already solved.
    if (shuffled.slice(0, exercise.words.length).join(" ") === exercise.words.join(" ")) shuffled = [...shuffled.slice(1), shuffled[0]];
    item.tiles = shuffled;
  } else if (exercise.kind === "match") {
    item.right = shuffle(
      exercise.pairs.map((p, pair) => ({ label: p.match.label, option: p.match, pair })),
      s,
    );
  }
  return item;
}

export function buildQueue(lesson: Lesson, attempt: number): QueueItem[] {
  const seed = hash(lesson.id) + attempt * 31337;
  return lesson.exercises.map((e, i) => prepare(e, i, seed));
}

export type Answer =
  | { kind: "choice"; selected: number }
  | { kind: "order"; picked: number[] }
  | { kind: "match"; matched: number; mistakes: number }
  | { kind: "type"; text: string }
  | { kind: "clock"; total: number };

const normalize = (s: string) =>
  s
    .toLowerCase()
    .replace(/[’‘]/g, "'")
    .replace(/[.,!?¿¡]/g, "")
    .replace(/\s+/g, " ")
    .trim();

/** Whether the learner has given enough input to press Check. */
export function isReady(item: QueueItem, answer: Answer | null) {
  if (!answer) return false;
  switch (answer.kind) {
    case "choice":
      return answer.selected >= 0;
    case "order":
      return answer.picked.length > 0;
    case "match":
      return item.exercise.kind === "match" && answer.matched === item.exercise.pairs.length;
    case "type":
      return answer.text.trim().length > 0;
    case "clock":
      return true;
  }
}

export function isCorrect(item: QueueItem, answer: Answer): boolean {
  const e = item.exercise;
  switch (answer.kind) {
    case "choice":
      return answer.selected === item.answer;
    case "order":
      return e.kind === "order" && normalize(answer.picked.map((i) => item.tiles![i]).join(" ")) === normalize(e.words.join(" "));
    case "match":
      // Matching is self-correcting; finishing every pair counts.
      return true;
    case "type":
      return e.kind === "type" && e.answers.some((a) => normalize(a) === normalize(answer.text));
    case "clock": {
      if (e.kind !== "clock") return false;
      const m = ((answer.total % 720) + 720) % 720;
      return m === ((e.h % 12) * 60 + e.m) % 720;
    }
  }
}

/** The correct answer as text, for feedback and the review list. */
export function solution(item: QueueItem): string {
  const e = item.exercise;
  switch (e.kind) {
    case "choice":
    case "listen":
      return e.options[e.answer].label;
    case "order":
      return e.words.join(" ");
    case "match":
      return e.pairs.map((p) => `${p.term} = ${p.match.label}`).join(" · ");
    case "type":
      return [e.before, e.answers[0], e.after].filter(Boolean).join(" ").replace(/ ([.,!?])/g, "$1");
    case "clock":
      return `${e.say} (${e.h}:${String(e.m).padStart(2, "0")})`;
  }
}

/** A short line identifying the exercise in the review list (null when the solution says it all). */
export function exerciseLabel(item: QueueItem, locale: Locale): string | null {
  const e = item.exercise;
  switch (e.kind) {
    case "choice":
      return e.line ?? e.prompt[locale];
    case "listen":
      return e.prompt ? e.prompt[locale] : null;
    case "order":
      return locale === "es" ? e.gloss : null;
    case "match":
      return e.pairs.map((p) => p.term).join(", ");
    case "type":
      return `${e.before} ___ ${e.after}`.trim();
    case "clock":
      return `🕒 ${e.say}`;
  }
}

export function stars(score: number) {
  return score >= 90 ? 3 : score >= 60 ? 2 : 1;
}

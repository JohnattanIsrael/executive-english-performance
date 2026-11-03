"use client";

import { useSyncExternalStore } from "react";

/**
 * Lesson progress, kept only in this browser (spec 003, FR-7).
 */
export interface LessonProgress {
  completed: boolean;
  /** Best first-try score, 0–100. */
  best: number;
  plays: number;
}

export type ProgressMap = Record<string, LessonProgress>;

const KEY = "eep-lessons-v1";
const EVENT = "eep-lessons-change";
const empty: ProgressMap = {};

let cachedRaw: string | null = null;
let cached: ProgressMap = empty;

function read(): ProgressMap {
  let raw: string | null = null;
  try {
    raw = window.localStorage.getItem(KEY);
  } catch {
    return empty;
  }
  if (raw === cachedRaw) return cached;
  cachedRaw = raw;
  try {
    const parsed: unknown = raw ? JSON.parse(raw) : {};
    cached = parsed && typeof parsed === "object" ? (parsed as ProgressMap) : empty;
  } catch {
    cached = empty;
  }
  return cached;
}

function subscribe(onChange: () => void) {
  const onStorage = (e: StorageEvent) => e.key === KEY && onChange();
  window.addEventListener("storage", onStorage);
  window.addEventListener(EVENT, onChange);
  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener(EVENT, onChange);
  };
}

export function useLessonProgress(): ProgressMap {
  return useSyncExternalStore(subscribe, read, () => empty);
}

export function recordLesson(id: string, score: number) {
  const all = read();
  const prev = all[id];
  const next: ProgressMap = {
    ...all,
    [id]: { completed: true, best: Math.max(prev?.best ?? 0, score), plays: (prev?.plays ?? 0) + 1 },
  };
  try {
    window.localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    // Private mode or storage full: progress just isn't remembered.
  }
  window.dispatchEvent(new Event(EVENT));
}

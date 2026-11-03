"use client";

import { ArrowRight, Check, Clock3, ListChecks, Play, RotateCcw } from "lucide-react";
import { useCallback, useEffect, useRef, useSyncExternalStore, type CSSProperties } from "react";
import { lessons } from "@/content/lessons";
import { learnCopy } from "@/content/pages/learn";
import { useLocale } from "@/i18n/locale-provider";
import { buttonClasses } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LessonPlayer } from "./lesson-player";
import { useLessonProgress } from "./progress";

/* ----------------------------------------------------------------------------
 * The open lesson lives in the URL hash (`/learn#greetings`) so lessons can be
 * deep-linked and the Back button closes the player (spec 003, FR-7).
 * ------------------------------------------------------------------------- */
const HASH_EVENT = "eep-hash-change";

function subscribeHash(onChange: () => void) {
  window.addEventListener("hashchange", onChange);
  window.addEventListener("popstate", onChange);
  window.addEventListener(HASH_EVENT, onChange);
  return () => {
    window.removeEventListener("hashchange", onChange);
    window.removeEventListener("popstate", onChange);
    window.removeEventListener(HASH_EVENT, onChange);
  };
}

function useHash() {
  return useSyncExternalStore(
    subscribeHash,
    () => decodeURIComponent(window.location.hash.slice(1)),
    () => "",
  );
}

function setHash(id: string | null, mode: "push" | "replace") {
  const url = `${window.location.pathname}${window.location.search}${id ? `#${id}` : ""}`;
  if (mode === "push") window.history.pushState(null, "", url);
  else window.history.replaceState(null, "", url);
  window.dispatchEvent(new Event(HASH_EVENT));
}

export function LessonLibrary() {
  const locale = useLocale();
  const t = learnCopy[locale].library;
  const progress = useLessonProgress();
  const hash = useHash();
  const openIndex = lessons.findIndex((l) => l.id === hash);
  const open = openIndex >= 0 ? lessons[openIndex] : null;
  const lastTrigger = useRef<string | null>(null);
  const completed = lessons.filter((l) => progress[l.id]?.completed).length;

  // Lock page scroll behind the player, and give focus back to the lesson card on close.
  useEffect(() => {
    if (!open) {
      if (lastTrigger.current) {
        document.querySelector<HTMLElement>(`[data-lesson-id="${lastTrigger.current}"] a`)?.focus({ preventScroll: true });
        lastTrigger.current = null;
      }
      return;
    }
    lastTrigger.current = open.id;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
      if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    };
  }, [open]);

  const close = useCallback(() => setHash(null, "replace"), []);

  return (
    <>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted" aria-live="polite">
          {t.progress(completed, lessons.length)}
        </p>
        <div className="flex gap-1.5" aria-hidden>
          {lessons.map((l) => (
            <span
              key={l.id}
              className="h-2 w-10 rounded-full transition-colors duration-500"
              style={{ background: progress[l.id]?.completed ? l.accent.base : "var(--color-line)" }}
            />
          ))}
        </div>
      </div>

      <ol className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {lessons.map((lesson, i) => {
          const p = progress[lesson.id];
          return (
            <li
              key={lesson.id}
              data-lesson-id={lesson.id}
              className={cn("group relative animate-rise", i === 0 && "md:col-span-2 xl:col-span-1")}
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <a
                href={`#${lesson.id}`}
                onClick={(e) => {
                  if (e.metaKey || e.ctrlKey || e.shiftKey) return;
                  e.preventDefault();
                  setHash(lesson.id, "push");
                }}
                className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-surface p-7 transition-all duration-300 hover:-translate-y-1 hover:border-transparent hover:shadow-[0_30px_60px_-30px_var(--shadow)] focus-visible:-translate-y-1"
                style={{ "--shadow": `${lesson.accent.base}88` } as CSSProperties}
              >
                {/* Illustration */}
                <div className="relative -mx-7 -mt-7 mb-6 flex h-44 items-center justify-center overflow-hidden" style={{ background: lesson.accent.soft }}>
                  <span aria-hidden className="absolute inset-0 hairline-grid opacity-60" />
                  <span
                    aria-hidden
                    className="absolute size-28 rounded-full border-2 border-dashed opacity-25 transition-transform duration-700 group-hover:scale-110"
                    style={{ borderColor: lesson.accent.base }}
                  />
                  <span aria-hidden className="relative text-6xl transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6">
                    {lesson.emoji}
                  </span>
                  {lesson.orbit.map((o, k) => (
                    <span
                      key={o}
                      aria-hidden
                      className="absolute top-1/2 left-1/2 -mt-3.5 -ml-3.5 flex size-7 animate-orbit items-center justify-center text-xl"
                      style={{ "--orbit-r": "68px", animationDelay: `${-k * 4.6 - i}s` } as CSSProperties}
                    >
                      {o}
                    </span>
                  ))}
                  <span
                    className="absolute top-4 left-4 rounded-full bg-surface/85 px-3 py-1 text-xs font-semibold tracking-wide backdrop-blur"
                    style={{ color: lesson.accent.deep }}
                  >
                    {t.lesson(i + 1)}
                  </span>
                  {p?.completed && (
                    <span className="absolute top-4 right-4 inline-flex animate-pop items-center gap-1 rounded-full bg-good px-2.5 py-1 text-xs font-semibold text-white">
                      <Check className="size-3.5" strokeWidth={3} aria-hidden /> {t.completed}
                    </span>
                  )}
                </div>

                <h3 className="font-serif text-2xl leading-snug text-ink">{lesson.title[locale]}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">{lesson.summary[locale]}</p>

                <div className="mt-auto flex items-center justify-between gap-3 pt-6">
                  <p className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted">
                    <span className="inline-flex items-center gap-1.5">
                      <Clock3 className="size-3.5" aria-hidden /> {t.minutes(lesson.minutes)}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <ListChecks className="size-3.5" aria-hidden /> {t.exercises(lesson.exercises.length)}
                    </span>
                    {p && <span className="font-medium text-ink-2">{t.best(p.best)}</span>}
                  </p>
                  <span
                    className="inline-flex size-11 shrink-0 items-center justify-center rounded-full text-white transition-transform duration-300 group-hover:scale-110"
                    style={{ background: lesson.accent.base }}
                  >
                    {p?.completed ? <RotateCcw className="size-4" aria-hidden /> : <Play className="ml-0.5 size-4 fill-current" aria-hidden />}
                    <span className="sr-only">{p?.completed ? t.again : t.start}</span>
                  </span>
                </div>
              </a>
            </li>
          );
        })}
      </ol>

      {open && (
        <LessonPlayer
          key={open.id}
          lesson={open}
          number={openIndex + 1}
          locale={locale}
          onClose={close}
          onNext={openIndex + 1 < lessons.length ? () => setHash(lessons[openIndex + 1].id, "replace") : undefined}
        />
      )}
    </>
  );
}

/** A button-styled link on the lessons page that opens a lesson through the hash. */
export function StartLessonLink({
  id,
  children,
  variant = "primary",
}: {
  id: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
}) {
  return (
    <a href={`#${id}`} className={buttonClasses(variant, "lg")}>
      {children}
      {variant === "primary" && <ArrowRight className="size-4" aria-hidden />}
    </a>
  );
}

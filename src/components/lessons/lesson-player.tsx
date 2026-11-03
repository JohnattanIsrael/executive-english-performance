"use client";

import { ArrowLeft, ArrowRight, BookOpen, Check, Lightbulb, RotateCcw, Sparkles, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import type { Lesson } from "@/content/lessons";
import { learnCopy, type PlayerCopy } from "@/content/pages/learn";
import type { Locale } from "@/i18n/config";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { buildQueue, exerciseLabel, isCorrect, isReady, prepare, solution, stars, type Answer, type QueueItem } from "./engine";
import {
  ChoiceExercise,
  ClockExercise,
  ListenExercise,
  MatchExercise,
  OrderExercise,
  TypeExercise,
  type ExerciseProps,
  type Status,
} from "./exercises";
import { recordLesson } from "./progress";
import { Confetti, ScoreRing, SoundButton, Stars, VisualView } from "./visuals";

type Phase = "intro" | "learn" | "practice" | "done";

function ExerciseView(props: ExerciseProps) {
  switch (props.item.exercise.kind) {
    case "choice":
      return <ChoiceExercise {...props} />;
    case "listen":
      return <ListenExercise {...props} />;
    case "order":
      return <OrderExercise {...props} />;
    case "match":
      return <MatchExercise {...props} />;
    case "type":
      return <TypeExercise {...props} />;
    case "clock":
      return <ClockExercise {...props} />;
  }
}

/**
 * One lesson, played in a full-screen dialog (spec 003, FR-3 – FR-8).
 * Mount with `key={lesson.id}` so state resets between lessons.
 */
export function LessonPlayer({
  lesson,
  number,
  locale,
  onClose,
  onNext,
}: {
  lesson: Lesson;
  number: number;
  locale: Locale;
  onClose: () => void;
  onNext?: () => void;
}) {
  const t = learnCopy[locale].player;
  const accent = lesson.accent;
  const [phase, setPhase] = useState<Phase>("intro");
  const [card, setCard] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const [queue, setQueue] = useState<QueueItem[]>(() => buildQueue(lesson, 0));
  const [pos, setPos] = useState(0);
  const [answer, setAnswer] = useState<Answer | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [mistakes, setMistakes] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const dialog = useRef<HTMLDivElement>(null);
  const body = useRef<HTMLDivElement>(null);
  const title = lesson.title[locale];

  const total = lesson.exercises.length;
  const item = queue[pos];
  const ready = phase === "practice" && item && isReady(item, answer);

  // Move focus into the dialog unless a control inside it already took it (autoFocus).
  useEffect(() => {
    if (dialog.current && !dialog.current.contains(document.activeElement)) dialog.current.focus();
  }, []);

  useEffect(() => {
    body.current?.scrollTo({ top: 0 });
  }, [phase, pos, card]);

  const startPractice = useCallback(() => {
    setPhase("practice");
    track("lesson_started", { lessonId: lesson.id, locale });
  }, [lesson.id, locale]);

  const check = useCallback(() => {
    if (!item || !answer || status !== "idle" || !isReady(item, answer)) return;
    const ok = isCorrect(item, answer);
    setStatus(ok ? "correct" : "wrong");
    if (!ok && !item.retry) {
      setMistakes((m) => [...m, item.index]);
      setQueue((q) => [...q, prepare(item.exercise, item.index, attempt * 31337 + 7, true)]);
    }
  }, [item, answer, status, attempt]);

  const advance = useCallback(() => {
    if (status === "idle") return;
    if (pos + 1 < queue.length) {
      setPos(pos + 1);
      setAnswer(null);
      setStatus("idle");
      return;
    }
    const final = Math.round(((total - mistakes.length) / total) * 100);
    setScore(final);
    setPhase("done");
    recordLesson(lesson.id, final);
    track("lesson_completed", { lessonId: lesson.id, locale, score: final });
  }, [status, pos, queue.length, total, mistakes.length, lesson.id, locale]);

  const restart = () => {
    const next = attempt + 1;
    setAttempt(next);
    setQueue(buildQueue(lesson, next));
    setPos(0);
    setAnswer(null);
    setStatus("idle");
    setMistakes([]);
    setScore(0);
    setPhase("practice");
    track("lesson_started", { lessonId: lesson.id, locale });
  };

  // Keyboard: Esc closes; Enter checks / continues; 1–4 pick options; arrows move between cards.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const typing = target.tagName === "INPUT" || target.tagName === "TEXTAREA";
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (phase === "learn" && !typing) {
        if (e.key === "ArrowRight") setCard((c) => Math.min(c + 1, lesson.cards.length - 1));
        if (e.key === "ArrowLeft") setCard((c) => Math.max(c - 1, 0));
        if (e.key === "ArrowRight" || e.key === "ArrowLeft") setFlipped(false);
        return;
      }
      if (phase !== "practice") return;
      if (e.key === "Enter" && target.tagName !== "BUTTON") {
        if (status === "idle" && !typing) {
          e.preventDefault();
          check();
        } else if (status !== "idle") {
          e.preventDefault();
          advance();
        }
      }
      if (!typing && status === "idle" && item?.options && /^[1-9]$/.test(e.key)) {
        const i = Number(e.key) - 1;
        if (i < item.options.length) setAnswer({ kind: "choice", selected: i });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase, status, item, check, advance, onClose, lesson.cards.length]);

  const progress = phase === "practice" ? ((pos + (status !== "idle" ? 1 : 0)) / queue.length) * 100 : phase === "done" ? 100 : 0;
  const steps: { id: Phase; label: string }[] = [
    { id: "learn", label: t.learn },
    { id: "practice", label: t.practice },
    { id: "done", label: t.results },
  ];
  const stepIndex = steps.findIndex((s) => s.id === phase);

  return (
    <div
      ref={dialog}
      role="dialog"
      aria-modal="true"
      aria-label={t.dialogLabel(title)}
      tabIndex={-1}
      className="fixed inset-0 z-[60] flex animate-fade flex-col overflow-hidden bg-paper outline-none"
      style={{ "--accent": accent.base } as CSSProperties}
    >
      {/* Ambient accent glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-90"
        style={{ background: `radial-gradient(60rem 30rem at 50% -10%, ${accent.soft}, transparent 70%)` }}
      />

      {/* Top bar */}
      <div className="relative z-10 border-b border-line/70 bg-paper/70 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-3xl items-center gap-4 px-4 sm:px-6">
          <button
            type="button"
            onClick={onClose}
            aria-label={t.close}
            className="-ml-2 inline-flex size-10 shrink-0 items-center justify-center rounded-full text-muted transition-colors hover:bg-paper-2 hover:text-ink"
          >
            <X className="size-5" aria-hidden />
          </button>
          {phase === "intro" ? (
            <p className="truncate text-sm font-medium text-ink-2">{title}</p>
          ) : (
            <>
              <ol className="hidden items-center gap-1.5 text-xs font-medium sm:flex">
                {steps.map((s, i) => (
                  <li
                    key={s.id}
                    className={cn("rounded-full px-2.5 py-1 transition-colors", i === stepIndex ? "text-white" : i < stepIndex ? "text-ink-2" : "text-faint")}
                    style={{ background: i === stepIndex ? accent.base : i < stepIndex ? accent.soft : undefined }}
                  >
                    {s.label}
                  </li>
                ))}
              </ol>
              <div
                className="relative h-3 flex-1 overflow-hidden rounded-full"
                style={{ background: `${accent.base}1f` }}
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Math.round(phase === "learn" ? ((card + 1) / lesson.cards.length) * 100 : progress)}
                aria-label={phase === "learn" ? t.card(card + 1, lesson.cards.length) : t.progress(Math.min(pos + 1, queue.length), queue.length)}
              >
                <div
                  className="absolute inset-y-0 left-0 rounded-full transition-[width] duration-500 ease-out"
                  style={{
                    width: `${phase === "learn" ? ((card + 1) / lesson.cards.length) * 100 : progress}%`,
                    background: `linear-gradient(90deg, ${accent.base}, ${accent.deep})`,
                  }}
                >
                  <span className="absolute inset-x-2 top-[3px] h-[3px] rounded-full bg-white/35" />
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Body */}
      <div ref={body} className="relative z-0 flex-1 overflow-y-auto">
        <div className="mx-auto flex min-h-full max-w-3xl flex-col px-4 pt-8 pb-40 sm:px-6 md:pt-12">
          {phase === "intro" && (
            <Intro lesson={lesson} number={number} locale={locale} onLearn={() => setPhase("learn")} onPractice={startPractice} />
          )}

          {phase === "learn" && (
            <Flashcards
              lesson={lesson}
              locale={locale}
              index={card}
              flipped={flipped}
              onFlip={() => setFlipped((f) => !f)}
              onMove={(i) => {
                setCard(i);
                setFlipped(false);
              }}
              onDone={startPractice}
            />
          )}

          {phase === "practice" && item && (
            <div key={item.key} className="animate-slide-in">
              <ExerciseView item={item} answer={answer} setAnswer={setAnswer} status={status} accent={accent} locale={locale} t={t} onSubmit={check} />
            </div>
          )}

          {phase === "done" && (
            <Results
              lesson={lesson}
              locale={locale}
              score={score}
              mistakes={mistakes.map((i) => queue.find((q) => q.index === i)!)}
              onRestart={restart}
              onClose={onClose}
              onNext={onNext}
            />
          )}
        </div>
      </div>

      {/* Bottom bar: Check, then feedback */}
      {phase === "practice" && item && (
        <div className="absolute inset-x-0 bottom-0 z-10">
          {status === "idle" ? (
            <div className="border-t border-line bg-paper/90 backdrop-blur">
              <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-4 py-4 sm:px-6 sm:py-5">
                <p className="text-sm text-muted tabular-nums">{t.progress(Math.min(pos + 1, queue.length), queue.length)}</p>
                <button
                  type="button"
                  onClick={check}
                  disabled={!ready}
                  className="inline-flex h-13 min-w-40 items-center justify-center rounded-2xl px-8 text-base font-semibold text-white shadow-[0_4px_0_var(--edge)] transition-all hover:brightness-110 active:translate-y-1 active:shadow-none disabled:cursor-not-allowed disabled:bg-line-strong disabled:shadow-none"
                  style={{ background: ready ? accent.base : undefined, "--edge": accent.deep } as CSSProperties}
                >
                  {t.check}
                </button>
              </div>
            </div>
          ) : (
            <Feedback item={item} correct={status === "correct"} t={t} praiseIndex={pos} last={pos + 1 >= queue.length} onContinue={advance} />
          )}
        </div>
      )}

      {phase === "done" && score >= 60 && <Confetti />}
    </div>
  );
}

/* ----------------------------------------------------------------------------
 * Intro
 * ------------------------------------------------------------------------- */
function Intro({
  lesson,
  number,
  locale,
  onLearn,
  onPractice,
}: {
  lesson: Lesson;
  number: number;
  locale: Locale;
  onLearn: () => void;
  onPractice: () => void;
}) {
  const t = learnCopy[locale];
  const accent = lesson.accent;
  return (
    <div className="flex flex-1 flex-col items-center text-center">
      <div className="relative mt-2 flex size-44 animate-pop items-center justify-center">
        <span aria-hidden className="absolute inset-3 rounded-full" style={{ background: accent.soft }} />
        <span aria-hidden className="absolute inset-0 rounded-full border-2 border-dashed opacity-30" style={{ borderColor: accent.base }} />
        <span aria-hidden className="relative animate-float text-7xl">
          {lesson.emoji}
        </span>
        {lesson.orbit.map((o, i) => (
          <span
            key={o}
            aria-hidden
            className="absolute top-1/2 left-1/2 -mt-4 -ml-4 flex size-8 animate-orbit items-center justify-center text-2xl"
            style={{ "--orbit-r": "92px", animationDelay: `${-i * 4.6}s` } as CSSProperties}
          >
            {o}
          </span>
        ))}
      </div>
      <p className="mt-8 text-xs font-semibold tracking-[0.18em] uppercase" style={{ color: accent.base }}>
        {t.library.lesson(number)} · {t.library.minutes(lesson.minutes)}
      </p>
      <h2 className="display mt-3 max-w-xl text-4xl leading-[1.08] text-ink md:text-5xl">{lesson.title[locale]}</h2>
      <p className="prose-lead mt-4 max-w-lg">{lesson.summary[locale]}</p>

      <div className="mt-9 grid w-full max-w-xl gap-4 text-left sm:grid-cols-2">
        <div className="rounded-2xl border border-line bg-surface p-5">
          <p className="text-xs font-medium tracking-[0.14em] text-muted uppercase">{t.player.youWillLearn}</p>
          <ul className="mt-3 flex flex-col gap-2">
            {lesson.skills[locale].map((s, i) => (
              <li key={s} className="flex animate-slide-in gap-2.5 text-[15px] text-ink" style={{ animationDelay: `${200 + i * 90}ms` }}>
                <Check className="mt-1 size-4 shrink-0" style={{ color: accent.base }} aria-hidden />
                {s}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl p-5" style={{ background: accent.soft }}>
          <p className="flex items-center gap-2 text-xs font-medium tracking-[0.14em] uppercase" style={{ color: accent.deep }}>
            <Lightbulb className="size-4" aria-hidden /> {t.player.tip}
          </p>
          <p className="mt-3 text-[15px] leading-relaxed text-ink-2">{lesson.tip[locale]}</p>
        </div>
      </div>

      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={onLearn}
          className="inline-flex h-13 items-center gap-2 rounded-2xl px-8 text-base font-semibold text-white shadow-[0_4px_0_var(--edge)] transition-all hover:brightness-110 active:translate-y-1 active:shadow-none"
          style={{ background: accent.base, "--edge": accent.deep } as CSSProperties}
          autoFocus
        >
          <BookOpen className="size-5" aria-hidden /> {t.player.startLearning}
        </button>
        <button
          type="button"
          onClick={onPractice}
          className="inline-flex h-13 items-center gap-2 rounded-2xl border-2 border-line-strong bg-surface px-6 text-base font-medium text-ink transition-colors hover:border-ink"
        >
          {t.player.skipToPractice} <ArrowRight className="size-4" aria-hidden />
        </button>
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------------------
 * Flashcards
 * ------------------------------------------------------------------------- */
function Flashcards({
  lesson,
  locale,
  index,
  flipped,
  onFlip,
  onMove,
  onDone,
}: {
  lesson: Lesson;
  locale: Locale;
  index: number;
  flipped: boolean;
  onFlip: () => void;
  onMove: (i: number) => void;
  onDone: () => void;
}) {
  const t = learnCopy[locale].player;
  const accent = lesson.accent;
  const c = lesson.cards[index];
  const last = index === lesson.cards.length - 1;
  const es = locale === "es";

  return (
    <div className="flex flex-1 flex-col items-center">
      <p className="text-sm text-muted tabular-nums" aria-live="polite">
        {t.card(index + 1, lesson.cards.length)}
      </p>

      <div key={index} className="mt-5 w-full max-w-md animate-slide-in perspective-distant">
        <div
          role="button"
          tabIndex={0}
          aria-pressed={flipped}
          aria-label={`${c.term}. ${flipped ? t.flipBack : t.flip}`}
          onClick={onFlip}
          onKeyDown={(e) => {
            if (e.key === " " || e.key === "Enter") {
              e.preventDefault();
              onFlip();
            }
          }}
          className="relative aspect-[4/5] w-full cursor-pointer transition-transform duration-700 transform-3d sm:aspect-[5/5]"
          style={{ transform: flipped ? "rotateY(180deg)" : undefined, transitionTimingFunction: "cubic-bezier(0.3, 1.2, 0.4, 1)" }}
        >
          {/* Front */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 overflow-hidden rounded-[2rem] border border-line bg-surface p-8 text-center shadow-[0_30px_60px_-30px_rgb(14_23_38/0.35)] backface-hidden">
            <span aria-hidden className="absolute -top-16 -right-16 size-48 rounded-full opacity-70" style={{ background: accent.soft }} />
            <span aria-hidden className="absolute -bottom-20 -left-10 size-40 rounded-full opacity-40" style={{ background: accent.soft }} />
            <div className="relative flex min-h-36 items-center justify-center">
              <VisualView visual={c} size="xl" accent={accent.base} />
            </div>
            <p className="relative font-serif text-[2.1rem] leading-tight text-ink md:text-[2.5rem]" lang="en">
              {c.term}
            </p>
            {es && <p className="relative text-lg text-muted">{c.gloss}</p>}
            <div className="relative" onClick={(e) => e.stopPropagation()}>
              <SoundButton text={c.term} label={t.listen} accent={accent.base} />
            </div>
            <p className="absolute inset-x-0 bottom-5 flex items-center justify-center gap-1.5 text-xs text-faint">
              <RotateCcw className="size-3" aria-hidden /> {t.flip}
            </p>
          </div>
          {/* Back */}
          <div
            className="absolute inset-0 flex rotate-y-180 flex-col items-center justify-center gap-6 overflow-hidden rounded-[2rem] p-8 text-center text-paper shadow-[0_30px_60px_-30px_rgb(14_23_38/0.5)] backface-hidden"
            style={{ background: `linear-gradient(150deg, ${accent.base}, ${accent.deep})` }}
          >
            <span aria-hidden className="absolute inset-0 hairline-grid-inverse opacity-60" />
            <Sparkles aria-hidden className="relative size-6 text-paper/60" />
            <p className="relative font-serif text-3xl leading-snug md:text-[2.1rem]" lang="en">
              {c.example}
            </p>
            {es && <p className="relative text-lg text-paper/75">{c.exampleGloss}</p>}
            <div className="relative" onClick={(e) => e.stopPropagation()}>
              <SoundButton text={c.example} label={t.listen} accent="rgb(255 255 255 / 0.18)" className="ring-1 ring-white/40" />
            </div>
          </div>
        </div>
      </div>

      {/* Dots */}
      <div className="mt-7 flex items-center gap-2" aria-hidden>
        {lesson.cards.map((_, i) => (
          <span
            key={i}
            className="h-2 rounded-full transition-all duration-300"
            style={{ width: i === index ? 26 : 8, background: i <= index ? accent.base : "var(--color-line-strong)" }}
          />
        ))}
      </div>

      <div className="mt-8 flex w-full max-w-md items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => onMove(index - 1)}
          disabled={index === 0}
          className="inline-flex h-12 items-center gap-2 rounded-2xl border-2 border-line-strong bg-surface px-5 font-medium text-ink transition-colors hover:border-ink disabled:invisible"
        >
          <ArrowLeft className="size-4" aria-hidden /> {t.previous}
        </button>
        <button
          type="button"
          onClick={() => (last ? onDone() : onMove(index + 1))}
          className="inline-flex h-12 items-center gap-2 rounded-2xl px-6 font-semibold text-white shadow-[0_4px_0_var(--edge)] transition-all hover:brightness-110 active:translate-y-1 active:shadow-none"
          style={{ background: accent.base, "--edge": accent.deep } as CSSProperties}
        >
          {last ? t.startPractice : t.next} <ArrowRight className="size-4" aria-hidden />
        </button>
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------------------
 * Feedback sheet
 * ------------------------------------------------------------------------- */
function Feedback({
  item,
  correct,
  t,
  praiseIndex,
  last,
  onContinue,
}: {
  item: QueueItem;
  correct: boolean;
  t: PlayerCopy;
  praiseIndex: number;
  last: boolean;
  onContinue: () => void;
}) {
  return (
    <div
      className={cn("animate-sheet border-t-2", correct ? "border-good/30 bg-good-soft" : "border-critical/30 bg-[#f8e4e2]")}
      role="status"
      aria-live="assertive"
    >
      <div className="mx-auto flex max-w-3xl flex-col gap-4 px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-6">
        <div className="flex items-start gap-4">
          <span
            className={cn("flex size-12 shrink-0 animate-pop items-center justify-center rounded-full text-white", correct ? "bg-good" : "bg-critical")}
          >
            {correct ? <Check className="size-6" strokeWidth={3} aria-hidden /> : <X className="size-6" strokeWidth={3} aria-hidden />}
          </span>
          <div>
            <p className={cn("text-xl font-semibold", correct ? "text-good" : "text-critical")}>
              {correct ? t.praise[praiseIndex % t.praise.length] : t.wrong}
            </p>
            {!correct && (
              <>
                <p className="mt-1 text-[15px] text-ink-2">
                  {t.correctAnswer}{" "}
                  <span className="font-medium text-ink" lang="en">
                    {solution(item)}
                  </span>
                </p>
                {!item.retry && <p className="mt-1 text-sm text-muted">{t.comingBack}</p>}
              </>
            )}
          </div>
        </div>
        <button
          type="button"
          onClick={onContinue}
          autoFocus
          className={cn(
            "inline-flex h-13 min-w-40 items-center justify-center gap-2 rounded-2xl px-8 text-base font-semibold text-white transition-all hover:brightness-110 active:translate-y-1 active:shadow-none",
            correct ? "bg-good shadow-[0_4px_0_#1f4d39]" : "bg-critical shadow-[0_4px_0_#7a2822]",
          )}
        >
          {last ? t.finish : t.continue} <ArrowRight className="size-4" aria-hidden />
        </button>
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------------------
 * Results
 * ------------------------------------------------------------------------- */
function Results({
  lesson,
  locale,
  score,
  mistakes,
  onRestart,
  onClose,
  onNext,
}: {
  lesson: Lesson;
  locale: Locale;
  score: number;
  mistakes: QueueItem[];
  onRestart: () => void;
  onClose: () => void;
  onNext?: () => void;
}) {
  const t = learnCopy[locale].player;
  const accent = lesson.accent;
  const n = stars(score);
  const heading = n === 3 ? t.done.great : n === 2 ? t.done.good : t.done.ok;
  const headingRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => headingRef.current?.focus({ preventScroll: true }), []);

  return (
    <div className="flex flex-1 flex-col items-center text-center">
      <Stars count={n} accent={accent.base} label={t.stars(n)} />
      <h2 ref={headingRef} tabIndex={-1} className="display mt-6 animate-rise text-4xl text-ink outline-none md:text-5xl">
        {heading}
      </h2>
      <p className="mt-2 text-muted">{lesson.title[locale]}</p>

      <div className="relative mt-8 flex animate-pop items-center justify-center [animation-delay:200ms]">
        <ScoreRing value={score} accent={accent.base} size={150} />
        <div className="absolute flex flex-col items-center">
          <span className="font-serif text-4xl text-ink tabular-nums">{score}%</span>
        </div>
      </div>
      <p className="mt-3 text-sm text-muted">{t.score}</p>

      <div className="mt-10 w-full max-w-xl text-left">
        <p className="text-xs font-medium tracking-[0.14em] text-muted uppercase">{t.review}</p>
        {mistakes.length === 0 ? (
          <p className="mt-3 rounded-2xl border border-good/20 bg-good-soft px-5 py-4 text-[15px] text-good">{t.noMistakes}</p>
        ) : (
          <ul className="mt-3 flex flex-col gap-2">
            {mistakes.map((m, i) => {
              const label = exerciseLabel(m, locale);
              return (
                <li
                  key={m.key}
                  className="flex animate-slide-in items-center justify-between gap-4 rounded-2xl border border-line bg-surface px-5 py-4"
                  style={{ animationDelay: `${400 + i * 80}ms` }}
                >
                  <div className="min-w-0">
                    {label && <p className="truncate text-sm text-muted">{label}</p>}
                    <p className="font-medium text-ink" lang="en">
                      {solution(m)}
                    </p>
                  </div>
                  <SoundButton text={solution(m).replace(/\s*\(.*\)$/, "")} label={t.listen} size="sm" accent={accent.base} />
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <div className="mt-10 flex flex-wrap justify-center gap-3">
        {onNext && (
          <button
            type="button"
            onClick={onNext}
            className="inline-flex h-13 items-center gap-2 rounded-2xl px-8 text-base font-semibold text-white shadow-[0_4px_0_var(--edge)] transition-all hover:brightness-110 active:translate-y-1 active:shadow-none"
            style={{ background: accent.base, "--edge": accent.deep } as CSSProperties}
          >
            {t.nextLesson} <ArrowRight className="size-4" aria-hidden />
          </button>
        )}
        <button
          type="button"
          onClick={onRestart}
          className="inline-flex h-13 items-center gap-2 rounded-2xl border-2 border-line-strong bg-surface px-6 text-base font-medium text-ink transition-colors hover:border-ink"
        >
          <RotateCcw className="size-4" aria-hidden /> {t.tryAgain}
        </button>
        <button
          type="button"
          onClick={onClose}
          className="inline-flex h-13 items-center gap-2 rounded-2xl px-6 text-base font-medium text-muted transition-colors hover:text-ink"
        >
          {t.backToLessons}
        </button>
      </div>
    </div>
  );
}

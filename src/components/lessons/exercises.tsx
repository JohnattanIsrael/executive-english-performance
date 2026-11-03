"use client";

import { Lightbulb, Minus, Plus, RotateCcw } from "lucide-react";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import type { Option, Text } from "@/content/lessons";
import type { PlayerCopy } from "@/content/pages/learn";
import type { Locale } from "@/i18n/config";
import { cn } from "@/lib/utils";
import type { Answer, QueueItem } from "./engine";
import { useSpeech } from "./speech";
import { Clock, formatClock, SoundButton, VisualView } from "./visuals";

export type Status = "idle" | "correct" | "wrong";

export interface ExerciseProps {
  item: QueueItem;
  answer: Answer | null;
  setAnswer: (a: Answer) => void;
  status: Status;
  accent: { base: string; soft: string; deep: string };
  locale: Locale;
  t: PlayerCopy;
  onSubmit: () => void;
}

function Instruction({ prompt, fallback, locale }: { prompt?: Text; fallback: string; locale: Locale }) {
  return <p className="text-center text-sm font-medium tracking-wide text-muted md:text-[15px]">{prompt ? prompt[locale] : fallback}</p>;
}

/** Plays `text` once when the exercise appears (the Continue click counts as the user gesture). */
function useAutoSpeak(text: string | undefined) {
  const { speak, supported } = useSpeech();
  useEffect(() => {
    if (!text || !supported) return;
    const id = window.setTimeout(() => speak(text), 350);
    return () => window.clearTimeout(id);
  }, [text, speak, supported]);
}

/* ----------------------------------------------------------------------------
 * Option button (choice + listen)
 * ------------------------------------------------------------------------- */
function OptionButton({
  option,
  index,
  selected,
  state,
  disabled,
  accent,
  onSelect,
}: {
  option: Option;
  index: number;
  selected: boolean;
  state: "neutral" | "correct" | "wrong" | "dim";
  disabled: boolean;
  accent: ExerciseProps["accent"];
  onSelect: () => void;
}) {
  const visualOnly = option.hideLabel && (option.swatch || option.emoji);
  return (
    <button
      type="button"
      onClick={onSelect}
      disabled={disabled}
      aria-pressed={selected}
      aria-label={visualOnly ? option.label : undefined}
      className={cn(
        "group relative flex min-h-16 animate-pop items-center gap-4 rounded-2xl border-2 bg-surface px-5 py-4 text-left text-[17px] text-ink shadow-[0_3px_0_var(--edge)] transition-all duration-200",
        "hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-none disabled:hover:translate-y-0",
        visualOnly && "flex-col justify-center py-6",
        state === "correct" && "border-good bg-good-soft text-good",
        state === "wrong" && "animate-shake border-critical bg-[#f8e4e2] text-critical",
        state === "dim" && "opacity-45",
      )}
      style={
        {
          animationDelay: state === "wrong" ? undefined : `${index * 60}ms`,
          borderColor: state === "neutral" || state === "dim" ? (selected ? accent.base : "var(--color-line)") : undefined,
          background: state === "neutral" && selected ? accent.soft : undefined,
          "--edge": state === "neutral" ? (selected ? accent.base : "var(--color-line-strong)") : "transparent",
        } as CSSProperties
      }
    >
      {!visualOnly && (
        <span
          aria-hidden
          className="hidden size-7 shrink-0 items-center justify-center rounded-lg border text-xs font-medium text-muted sm:inline-flex"
          style={{ borderColor: selected ? accent.base : undefined, color: selected ? accent.base : undefined }}
        >
          {index + 1}
        </span>
      )}
      {(option.swatch || option.emoji) && <VisualView visual={option} size={visualOnly ? "md" : "sm"} animate={false} />}
      {!option.hideLabel && <span className="font-medium">{option.label}</span>}
    </button>
  );
}

function OptionGrid({ item, answer, setAnswer, status, accent }: ExerciseProps) {
  const selected = answer?.kind === "choice" ? answer.selected : -1;
  const options = item.options ?? [];
  const visualOnly = options.every((o) => o.hideLabel);
  return (
    <div className={cn("grid gap-3", visualOnly ? "grid-cols-2 sm:grid-cols-4" : "sm:grid-cols-2")}>
      {options.map((o, i) => {
        let state: "neutral" | "correct" | "wrong" | "dim" = "neutral";
        if (status !== "idle") {
          if (i === item.answer) state = "correct";
          else if (i === selected) state = "wrong";
          else state = "dim";
        }
        return (
          <OptionButton
            key={`${item.key}-${i}`}
            option={o}
            index={i}
            selected={i === selected}
            state={state}
            disabled={status !== "idle"}
            accent={accent}
            onSelect={() => setAnswer({ kind: "choice", selected: i })}
          />
        );
      })}
    </div>
  );
}

/* ----------------------------------------------------------------------------
 * Multiple choice
 * ------------------------------------------------------------------------- */
export function ChoiceExercise(props: ExerciseProps) {
  const { item, accent, locale, t } = props;
  if (item.exercise.kind !== "choice") return null;
  const e = item.exercise;
  return (
    <div className="flex flex-col gap-8">
      <Instruction prompt={e.prompt} fallback={t.instructions.choice} locale={locale} />
      {(e.visual || e.line) && (
        <div className="flex flex-col items-center gap-5">
          {e.visual && <VisualView visual={e.visual} size="lg" accent={accent.base} />}
          {e.line && (
            <div className="relative flex animate-pop items-center gap-3 rounded-3xl rounded-bl-md px-5 py-4 shadow-sm" style={{ background: accent.soft }}>
              <SoundButton text={e.line.replace("___", "blank")} label={t.listen} size="sm" accent={accent.base} />
              <p className="font-serif text-2xl text-ink md:text-[1.7rem]" lang="en">
                {e.line}
              </p>
            </div>
          )}
        </div>
      )}
      <OptionGrid {...props} />
    </div>
  );
}

/* ----------------------------------------------------------------------------
 * Listen and choose
 * ------------------------------------------------------------------------- */
export function ListenExercise(props: ExerciseProps) {
  const { item, accent, locale, t } = props;
  const e = item.exercise.kind === "listen" ? item.exercise : null;
  const { supported } = useSpeech();
  useAutoSpeak(e?.say);
  if (!e) return null;
  return (
    <div className="flex flex-col gap-8">
      <Instruction prompt={e.prompt} fallback={t.instructions.listen} locale={locale} />
      <div className="flex flex-col items-center gap-4">
        {supported ? (
          <div className="flex items-end gap-4">
            <span className="relative">
              <span aria-hidden className="absolute inset-0 animate-ping rounded-full opacity-20 [animation-duration:2.4s]" style={{ background: accent.base }} />
              <SoundButton text={e.say} label={t.listen} size="lg" accent={accent.base} />
            </span>
            <SoundButton text={e.say} label={t.listenSlow} rate={0.55} size="sm" accent={accent.deep} />
          </div>
        ) : (
          <div className="text-center">
            <p className="text-sm text-muted">{t.noAudio}</p>
            <p className="mt-2 font-serif text-2xl text-ink" lang="en">
              “{e.say}”
            </p>
          </div>
        )}
      </div>
      <OptionGrid {...props} />
    </div>
  );
}

/* ----------------------------------------------------------------------------
 * Build the sentence
 * ------------------------------------------------------------------------- */
export function OrderExercise({ item, answer, setAnswer, status, accent, locale, t }: ExerciseProps) {
  if (item.exercise.kind !== "order") return null;
  const e = item.exercise;
  const tiles = item.tiles ?? [];
  const picked = answer?.kind === "order" ? answer.picked : [];
  const locked = status !== "idle";
  const sentence = e.words.join(" ");

  const tileClass =
    "inline-flex h-12 items-center rounded-xl border-2 bg-surface px-4 text-[17px] font-medium text-ink shadow-[0_3px_0_var(--color-line-strong)] transition-all duration-150 hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-none";

  return (
    <div className="flex flex-col gap-8">
      <Instruction prompt={e.prompt} fallback={t.instructions.order} locale={locale} />
      <div className="flex items-center justify-center gap-3">
        <SoundButton text={sentence} label={t.listen} size="sm" accent={accent.base} />
        {locale === "es" ? <p className="font-serif text-2xl text-ink">{e.gloss}</p> : <p className="text-[15px] text-muted">{t.listen}</p>}
      </div>

      <div
        className={cn(
          "relative flex min-h-[7.5rem] flex-wrap content-start items-start gap-2.5 rounded-2xl border-2 border-dashed p-4 transition-colors",
          status === "correct" && "border-good bg-good-soft",
          status === "wrong" && "animate-shake border-critical bg-[#f8e4e2]",
          status === "idle" && "border-line-strong bg-paper/60",
        )}
        aria-live="polite"
        aria-label={t.orderEmpty}
      >
        {picked.length === 0 && <span className="absolute inset-0 flex items-center justify-center text-sm text-faint">{t.orderEmpty}</span>}
        {picked.map((tileIndex, i) => (
          <button
            key={`${tileIndex}`}
            type="button"
            disabled={locked}
            onClick={() => setAnswer({ kind: "order", picked: picked.filter((_, j) => j !== i) })}
            className={cn(tileClass, "animate-pop")}
            style={{ borderColor: accent.base, background: accent.soft }}
            lang="en"
          >
            {tiles[tileIndex]}
          </button>
        ))}
        {picked.length > 0 && !locked && (
          <button
            type="button"
            onClick={() => setAnswer({ kind: "order", picked: [] })}
            className="absolute right-2 bottom-2 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs text-muted hover:bg-paper-2 hover:text-ink"
          >
            <RotateCcw className="size-3" aria-hidden /> {t.orderClear}
          </button>
        )}
      </div>

      <div className="flex flex-wrap justify-center gap-2.5">
        {tiles.map((word, i) => {
          const used = picked.includes(i);
          return (
            <span key={i} className="relative inline-flex animate-pop" style={{ animationDelay: `${i * 50}ms` }}>
              {/* Ghost keeps the bank's layout steady when a tile moves up. */}
              <span aria-hidden className={cn(tileClass, "pointer-events-none invisible")}>
                {word}
              </span>
              <span aria-hidden className={cn("absolute inset-0 rounded-xl bg-line/70 transition-opacity", used ? "opacity-100" : "opacity-0")} />
              <button
                type="button"
                disabled={locked || used}
                onClick={() => setAnswer({ kind: "order", picked: [...picked, i] })}
                className={cn(tileClass, "absolute inset-0 border-line", used && "scale-90 opacity-0")}
                lang="en"
              >
                {word}
              </button>
            </span>
          );
        })}
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------------------
 * Match pairs
 * ------------------------------------------------------------------------- */
export function MatchExercise({ item, answer, setAnswer, status, accent, locale, t }: ExerciseProps) {
  const [left, setLeft] = useState<number | null>(null);
  const [right, setRight] = useState<number | null>(null);
  const [done, setDone] = useState<number[]>([]);
  const [miss, setMiss] = useState<{ l: number; r: number } | null>(null);
  const { speak } = useSpeech();
  const timer = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearTimeout(timer.current), []);

  if (item.exercise.kind !== "match") return null;
  const e = item.exercise;
  const rightCol = item.right ?? [];
  const mistakes = answer?.kind === "match" ? answer.mistakes : 0;
  const locked = status !== "idle";

  const attempt = (l: number, r: number) => {
    const pair = rightCol[r].pair;
    setLeft(null);
    setRight(null);
    if (pair === l) {
      const next = [...done, l];
      setDone(next);
      setAnswer({ kind: "match", matched: next.length, mistakes });
    } else {
      setMiss({ l, r });
      setAnswer({ kind: "match", matched: done.length, mistakes: mistakes + 1 });
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setMiss(null), 550);
    }
  };

  const cell = (opts: { matched: boolean; active: boolean; wrong: boolean }) =>
    cn(
      "flex min-h-16 items-center justify-center gap-2 rounded-2xl border-2 bg-surface px-4 py-3 text-center text-[17px] font-medium text-ink shadow-[0_3px_0_var(--edge)] transition-all duration-200",
      "hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-none disabled:cursor-default disabled:hover:translate-y-0",
      opts.matched && "scale-95 border-good/40 bg-good-soft text-good opacity-60 shadow-none",
      opts.wrong && "animate-shake border-critical bg-[#f8e4e2] text-critical",
    );

  return (
    <div className="flex flex-col gap-8">
      <Instruction prompt={e.prompt} fallback={t.instructions.match} locale={locale} />
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        <div className="flex flex-col gap-3">
          {e.pairs.map((p, i) => {
            const matched = done.includes(i);
            const active = left === i;
            return (
              <button
                key={p.term}
                type="button"
                lang="en"
                disabled={matched || locked}
                aria-pressed={active}
                onClick={() => {
                  speak(p.term);
                  if (right !== null) attempt(i, right);
                  else setLeft(active ? null : i);
                }}
                className={cn(cell({ matched, active, wrong: miss?.l === i }), "animate-slide-in")}
                style={
                  {
                    animationDelay: miss?.l === i ? undefined : `${i * 70}ms`,
                    borderColor: active ? accent.base : matched || miss?.l === i ? undefined : "var(--color-line)",
                    background: active ? accent.soft : undefined,
                    "--edge": active ? accent.base : matched ? "transparent" : "var(--color-line-strong)",
                  } as CSSProperties
                }
              >
                {p.term}
              </button>
            );
          })}
        </div>
        <div className="flex flex-col gap-3">
          {rightCol.map((r, i) => {
            const matched = done.includes(r.pair);
            const active = right === i;
            const visualOnly = r.option.hideLabel && (r.option.emoji || r.option.swatch);
            return (
              <button
                key={`${r.label}-${i}`}
                type="button"
                disabled={matched || locked}
                aria-pressed={active}
                aria-label={visualOnly ? r.label : undefined}
                onClick={() => {
                  if (left !== null) attempt(left, i);
                  else setRight(active ? null : i);
                }}
                className={cn(cell({ matched, active, wrong: miss?.r === i }), "animate-slide-in")}
                style={
                  {
                    animationDelay: miss?.r === i ? undefined : `${120 + i * 70}ms`,
                    borderColor: active ? accent.base : matched || miss?.r === i ? undefined : "var(--color-line)",
                    background: active ? accent.soft : undefined,
                    "--edge": active ? accent.base : matched ? "transparent" : "var(--color-line-strong)",
                  } as CSSProperties
                }
              >
                {(r.option.emoji || r.option.swatch) && <VisualView visual={r.option} size="sm" animate={false} />}
                {!r.option.hideLabel && <span lang="en">{r.label}</span>}
              </button>
            );
          })}
        </div>
      </div>
      <p className="min-h-5 text-center text-sm text-muted" aria-live="polite">
        {done.length === e.pairs.length ? (
          <span className="font-medium text-good">
            {t.matchDone}
            {mistakes > 0 && <span className="font-normal text-muted"> · {t.matchMistakes(mistakes)}</span>}
          </span>
        ) : (
          mistakes > 0 && t.matchMistakes(mistakes)
        )}
      </p>
    </div>
  );
}

/* ----------------------------------------------------------------------------
 * Type the missing word
 * ------------------------------------------------------------------------- */
export function TypeExercise({ item, answer, setAnswer, status, accent, locale, t, onSubmit }: ExerciseProps) {
  const [hint, setHint] = useState(false);
  const input = useRef<HTMLInputElement>(null);
  useEffect(() => {
    input.current?.focus({ preventScroll: true });
  }, []);
  if (item.exercise.kind !== "type") return null;
  const e = item.exercise;
  const text = answer?.kind === "type" ? answer.text : "";
  const width = Math.max(e.answers[0].length, text.length, 4) + 2;

  return (
    <form
      className="flex flex-col gap-8"
      onSubmit={(ev) => {
        ev.preventDefault();
        onSubmit();
      }}
    >
      <Instruction prompt={e.prompt} fallback={t.instructions.type} locale={locale} />
      {e.visual && (
        <div className="flex justify-center">
          <VisualView visual={e.visual} size="lg" accent={accent.base} />
        </div>
      )}
      <p className="flex flex-wrap items-baseline justify-center gap-x-3 gap-y-4 text-center font-serif text-[1.9rem] leading-tight text-ink md:text-4xl" lang="en">
        {e.before && <span>{e.before}</span>}
        <input
          ref={input}
          value={text}
          disabled={status !== "idle"}
          onChange={(ev) => setAnswer({ kind: "type", text: ev.target.value })}
          aria-label={t.typePlaceholder}
          placeholder="…"
          autoComplete="off"
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck={false}
          className={cn(
            "rounded-lg border-0 border-b-[3px] bg-transparent px-1 text-center font-sans text-[1.6rem] font-medium outline-none transition-colors md:text-3xl",
            status === "correct" && "border-good bg-good-soft text-good",
            status === "wrong" && "animate-shake border-critical bg-[#f8e4e2] text-critical",
          )}
          style={{ width: `${width}ch`, borderColor: status === "idle" ? accent.base : undefined }}
        />
        {e.after && <span>{e.after}</span>}
      </p>
      <div className="flex justify-center">
        {hint ? (
          <p className="inline-flex animate-pop items-center gap-2 rounded-full px-4 py-2 text-sm text-ink-2" style={{ background: accent.soft }}>
            <Lightbulb className="size-4" aria-hidden style={{ color: accent.base }} />
            {e.hint[locale]}
          </p>
        ) : (
          <button
            type="button"
            onClick={() => setHint(true)}
            disabled={status !== "idle"}
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm text-muted transition-colors hover:bg-paper-2 hover:text-ink"
          >
            <Lightbulb className="size-4" aria-hidden /> {locale === "es" ? "Pista" : "Hint"}
          </button>
        )}
      </div>
    </form>
  );
}

/* ----------------------------------------------------------------------------
 * Set the clock
 * ------------------------------------------------------------------------- */
export function ClockExercise({ item, answer, setAnswer, status, accent, locale, t }: ExerciseProps) {
  const e = item.exercise.kind === "clock" ? item.exercise : null;
  useAutoSpeak(e?.say);
  if (!e) return null;
  const total = answer?.kind === "clock" ? answer.total : 0;
  const locked = status !== "idle";
  const step = (delta: number) => setAnswer({ kind: "clock", total: total + delta });

  const stepper = (unit: string, delta: number) => (
    <div key={unit} className="flex flex-col items-center gap-2">
      <span className="text-xs font-medium tracking-[0.14em] text-muted uppercase">{unit}</span>
      <div className="flex items-center gap-2">
        {[-1, 1].map((dir) => (
          <button
            key={dir}
            type="button"
            disabled={locked}
            onClick={() => step(dir * delta)}
            aria-label={dir < 0 ? t.clockEarlier(unit) : t.clockLater(unit)}
            className="inline-flex size-12 items-center justify-center rounded-full border-2 border-line bg-surface text-ink shadow-[0_3px_0_var(--color-line-strong)] transition-all hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-none"
          >
            {dir < 0 ? <Minus className="size-5" aria-hidden /> : <Plus className="size-5" aria-hidden />}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col gap-7">
      <Instruction prompt={e.prompt} fallback={t.instructions.clock} locale={locale} />
      <div className="flex items-center justify-center gap-3">
        <SoundButton text={e.say} label={t.listen} size="sm" accent={accent.base} />
        <p className="font-serif text-2xl text-ink md:text-[1.7rem]" lang="en">
          {e.say}
        </p>
      </div>
      <div className="flex flex-col items-center gap-6">
        <div
          className={cn(
            "rounded-full p-2 transition-all duration-300",
            status === "correct" && "bg-good-soft ring-4 ring-good/40",
            status === "wrong" && "animate-shake bg-[#f8e4e2] ring-4 ring-critical/40",
          )}
        >
          <Clock total={total} size={210} accent={accent.base} className="text-ink drop-shadow-[0_18px_30px_rgb(14_23_38/0.15)]" />
        </div>
        <p className="font-mono text-3xl tracking-wider text-ink tabular-nums" aria-live="polite">
          {formatClock(total)}
        </p>
        <div className="flex gap-8">
          {stepper(t.clockHour, 60)}
          {stepper(t.clockMinutes, 15)}
        </div>
      </div>
    </div>
  );
}

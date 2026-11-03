"use client";

import { Star, Volume2 } from "lucide-react";
import type { CSSProperties } from "react";
import type { Visual } from "@/content/lessons";
import { cn } from "@/lib/utils";
import { useSpeech } from "./speech";

/* ----------------------------------------------------------------------------
 * Analog clock. `total` is minutes since 12:00 and may grow without wrapping,
 * so the hands always turn forwards/backwards smoothly.
 * ------------------------------------------------------------------------- */
export function Clock({
  total,
  size = 160,
  accent = "#2f6aa8",
  className,
  label,
}: {
  total: number;
  size?: number;
  accent?: string;
  className?: string;
  label?: string;
}) {
  const minuteDeg = total * 6;
  const hourDeg = total * 0.5;
  const hand = (deg: number): CSSProperties => ({
    transform: `rotate(${deg}deg)`,
    transformOrigin: "50px 50px",
    transition: "transform 0.7s cubic-bezier(0.3, 1.35, 0.5, 1)",
  });
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={className}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      <circle cx="50" cy="50" r="47" fill="#fff" stroke="currentColor" strokeOpacity="0.12" strokeWidth="2" />
      <circle cx="50" cy="50" r="42" fill={accent} fillOpacity="0.06" />
      {Array.from({ length: 60 }, (_, i) => {
        const major = i % 5 === 0;
        const a = (i * 6 * Math.PI) / 180;
        const r1 = major ? 36 : 39;
        return (
          <line
            key={i}
            x1={50 + Math.sin(a) * r1}
            y1={50 - Math.cos(a) * r1}
            x2={50 + Math.sin(a) * 41}
            y2={50 - Math.cos(a) * 41}
            stroke="currentColor"
            strokeOpacity={major ? 0.55 : 0.18}
            strokeWidth={major ? 1.6 : 0.7}
            strokeLinecap="round"
          />
        );
      })}
      {[12, 3, 6, 9].map((n) => {
        const a = (n * 30 * Math.PI) / 180;
        return (
          <text
            key={n}
            x={50 + Math.sin(a) * 29}
            y={50 - Math.cos(a) * 29}
            textAnchor="middle"
            dominantBaseline="central"
            fontSize="8"
            fill="currentColor"
            fillOpacity="0.6"
            fontFamily="inherit"
          >
            {n}
          </text>
        );
      })}
      <line x1="50" y1="50" x2="50" y2="28" stroke="currentColor" strokeWidth="4" strokeLinecap="round" style={hand(hourDeg)} />
      <line x1="50" y1="54" x2="50" y2="16" stroke={accent} strokeWidth="2.4" strokeLinecap="round" style={hand(minuteDeg)} />
      <circle cx="50" cy="50" r="3.2" fill={accent} />
      <circle cx="50" cy="50" r="1.2" fill="#fff" />
    </svg>
  );
}

export const clockTotal = (h: number, m: number) => (h % 12) * 60 + m;

export function formatClock(total: number) {
  const m = ((total % 720) + 720) % 720;
  const h = Math.floor(m / 60) || 12;
  return `${h}:${String(m % 60).padStart(2, "0")}`;
}

/* ----------------------------------------------------------------------------
 * The picture for a card, prompt or option.
 * ------------------------------------------------------------------------- */
export function VisualView({
  visual,
  size = "lg",
  accent,
  label,
  animate = true,
}: {
  visual: Visual;
  size?: "sm" | "md" | "lg" | "xl";
  accent?: string;
  label?: string;
  animate?: boolean;
}) {
  const px = { sm: 44, md: 64, lg: 96, xl: 132 }[size];
  if (visual.clock) {
    return <Clock total={clockTotal(visual.clock.h, visual.clock.m)} size={px * 1.25} accent={accent} label={label} className="text-ink" />;
  }
  if (visual.swatch) {
    return (
      <span className="relative inline-flex items-center justify-center" style={{ width: px, height: px }}>
        <span
          aria-hidden
          className="absolute inset-0 rounded-full border border-ink/10 shadow-[inset_0_-6px_14px_rgb(0_0_0/0.18),inset_0_6px_10px_rgb(255_255_255/0.35),0_10px_24px_-12px_rgb(14_23_38/0.5)]"
          style={{ background: visual.swatch }}
        />
        {visual.emoji && (
          <span aria-hidden className="absolute -right-2 -bottom-2 text-[0.45em]" style={{ fontSize: px * 0.42 }}>
            {visual.emoji}
          </span>
        )}
        {label && <span className="sr-only">{label}</span>}
      </span>
    );
  }
  if (visual.emoji) {
    return (
      <span
        role={label ? "img" : undefined}
        aria-label={label}
        aria-hidden={label ? undefined : true}
        className={cn("inline-block leading-none select-none", animate && "animate-float")}
        style={{ fontSize: px * 0.82 }}
      >
        {visual.emoji}
      </span>
    );
  }
  return null;
}

/* ----------------------------------------------------------------------------
 * Speaker button with animated sound bars while playing.
 * ------------------------------------------------------------------------- */
export function SoundButton({
  text,
  label,
  rate,
  size = "md",
  accent = "#2f6aa8",
  className,
}: {
  text: string;
  label: string;
  rate?: number;
  size?: "sm" | "md" | "lg";
  accent?: string;
  className?: string;
}) {
  const { supported, speaking, speak } = useSpeech();
  if (!supported) return null;
  const dims = { sm: "size-9", md: "size-12", lg: "size-20" }[size];
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        speak(text, rate);
      }}
      aria-label={label}
      title={label}
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center rounded-full text-white transition-transform duration-200 hover:scale-105 active:scale-95",
        dims,
        speaking && "animate-glow",
        className,
      )}
      style={{ background: accent, "--glow-color": `${accent}66` } as CSSProperties}
    >
      {speaking ? (
        <span aria-hidden className="flex h-1/3 items-center gap-[3px]">
          {[0, 1, 2, 3].map((i) => (
            <span key={i} className="h-full w-[3px] origin-center animate-wave rounded-full bg-white" style={{ animationDelay: `${i * 0.12}s` }} />
          ))}
        </span>
      ) : (
        <Volume2 aria-hidden className={size === "lg" ? "size-8" : size === "sm" ? "size-4" : "size-5"} />
      )}
    </button>
  );
}

/* ----------------------------------------------------------------------------
 * Confetti burst — deterministic, CSS-only.
 * ------------------------------------------------------------------------- */
const confettiColors = ["#2f6aa8", "#c9a876", "#2f6f52", "#b0455c", "#6b4fa3", "#f2c230", "#5f8ab2"];

export function Confetti({ pieces = 70 }: { pieces?: number }) {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[70] overflow-hidden">
      {Array.from({ length: pieces }, (_, i) => {
        const left = (i * 37.3) % 100;
        const drift = ((i * 53) % 41) - 20;
        const delay = ((i * 17) % 23) / 30;
        const duration = 2.2 + ((i * 29) % 13) / 10;
        const shape = i % 3;
        return (
          <span
            key={i}
            className="absolute top-0 animate-confetti"
            style={
              {
                left: `${left}%`,
                width: shape === 2 ? 7 : 9,
                height: shape === 0 ? 14 : shape === 1 ? 9 : 7,
                borderRadius: shape === 1 ? "9999px" : "2px",
                background: confettiColors[i % confettiColors.length],
                "--confetti-x": `${drift}vw`,
                "--confetti-r": `${((i * 97) % 900) + 360}deg`,
                "--confetti-delay": `${delay}s`,
                "--confetti-duration": `${duration}s`,
              } as CSSProperties
            }
          />
        );
      })}
    </div>
  );
}

export function Stars({ count, accent, label }: { count: number; accent: string; label: string }) {
  return (
    <div role="img" aria-label={label} className="flex items-end justify-center gap-3">
      {[0, 1, 2].map((i) => {
        const on = i < count;
        return (
          <Star
            key={i}
            aria-hidden
            className={cn("animate-pop drop-shadow-sm", i === 1 ? "size-16" : "size-12", !on && "text-line-strong")}
            style={{
              animationDelay: `${0.25 + i * 0.18}s`,
              color: on ? "#e0a826" : undefined,
              fill: on ? "#f2c230" : "transparent",
              strokeWidth: 1.6,
              ...(on ? {} : { stroke: accent, strokeOpacity: 0.25 }),
            }}
          />
        );
      })}
    </div>
  );
}

/* ----------------------------------------------------------------------------
 * Circular score.
 * ------------------------------------------------------------------------- */
export function ScoreRing({ value, accent, size = 120 }: { value: number; accent: string; size?: number }) {
  const r = 44;
  const c = 2 * Math.PI * r;
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} aria-hidden className="-rotate-90">
      <circle cx="50" cy="50" r={r} fill="none" stroke={accent} strokeOpacity="0.14" strokeWidth="8" />
      <circle
        cx="50"
        cy="50"
        r={r}
        fill="none"
        stroke={accent}
        strokeWidth="8"
        strokeLinecap="round"
        strokeDasharray={c}
        strokeDashoffset={c * (1 - value / 100)}
        style={{ "--ring-from": c, "--ring-to": c * (1 - value / 100), animation: "ring 1.3s cubic-bezier(0.2, 0.8, 0.2, 1) 0.3s both" } as CSSProperties}
      />
    </svg>
  );
}

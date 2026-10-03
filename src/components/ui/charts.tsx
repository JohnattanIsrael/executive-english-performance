"use client";

import { useId, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Small, dependency-free data-viz primitives. One data hue (--color-data)
 * with a lighter step of the same ramp for tracks; text always uses ink
 * tokens; every plotted mark has a hover/focus tooltip.
 */

export function Meter({
  label,
  value,
  previous,
  max = 100,
  caption,
  size = "md",
}: {
  label: string;
  value: number;
  previous?: number;
  max?: number;
  caption?: string;
  size?: "sm" | "md";
}) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  const delta = previous !== undefined ? value - previous : undefined;
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <span className={cn("font-medium text-ink", size === "sm" ? "text-[13px]" : "text-sm")}>{label}</span>
        <span className="flex items-baseline gap-2 text-sm">
          {delta !== undefined && delta !== 0 && (
            <span className="text-xs text-muted">
              {delta > 0 ? "+" : "−"}
              {Math.abs(delta)}
            </span>
          )}
          <span className="font-semibold text-ink tabular-nums">{value}</span>
        </span>
      </div>
      <div
        role="meter"
        aria-label={label}
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        className={cn("relative mt-2 overflow-hidden rounded-full bg-data-track", size === "sm" ? "h-1.5" : "h-2")}
      >
        <div className="absolute inset-y-0 left-0 rounded-full bg-data transition-[width] duration-700" style={{ width: `${pct}%` }} />
        {previous !== undefined && (
          <span
            aria-hidden
            className="absolute inset-y-0 w-0.5 bg-surface"
            style={{ left: `${Math.max(0, Math.min(100, (previous / max) * 100))}%` }}
          />
        )}
      </div>
      {caption && <p className="mt-1.5 text-xs text-muted">{caption}</p>}
    </div>
  );
}

export function StatTile({
  label,
  value,
  detail,
  progress,
}: {
  label: string;
  value: string;
  detail?: string;
  progress?: { current: number; target: number };
}) {
  return (
    <div className="rounded-xl border border-line bg-surface p-5">
      <p className="text-sm text-muted">{label}</p>
      <p className="mt-2 text-3xl font-semibold tracking-tight text-ink">{value}</p>
      {progress && (
        <div className="mt-3 flex gap-1" aria-hidden>
          {Array.from({ length: progress.target }, (_, i) => (
            <span key={i} className={cn("h-1.5 flex-1 rounded-full", i < progress.current ? "bg-data" : "bg-data-track")} />
          ))}
        </div>
      )}
      {detail && <p className="mt-2 text-xs text-muted">{detail}</p>}
    </div>
  );
}

/** Line sparkline with a crosshair tooltip. Single series; the title names it. */
export function Sparkline({
  points,
  label,
  height = 56,
  domain = [0, 100],
}: {
  points: { x: string; y: number }[];
  label: string;
  height?: number;
  domain?: [number, number];
}) {
  const [active, setActive] = useState<number | null>(null);
  const width = 240;
  const pad = 6;
  const [min, max] = domain;
  const xs = (i: number) => pad + (i * (width - pad * 2)) / Math.max(1, points.length - 1);
  const ys = (v: number) => height - pad - ((v - min) / (max - min)) * (height - pad * 2);
  const path = points.map((p, i) => `${i ? "L" : "M"}${xs(i).toFixed(1)},${ys(p.y).toFixed(1)}`).join(" ");
  const last = points.length - 1;
  const shown = active ?? last;

  return (
    <div className="relative">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="h-auto w-full overflow-visible"
        role="img"
        aria-label={`${label}: ${points.map((p) => `${p.x} ${p.y}`).join(", ")}`}
        onMouseLeave={() => setActive(null)}
      >
        <line x1={pad} x2={width - pad} y1={height - pad} y2={height - pad} stroke="var(--color-line)" strokeWidth={1} />
        <path d={path} fill="none" stroke="var(--color-data)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
        {active !== null && (
          <line x1={xs(active)} x2={xs(active)} y1={pad} y2={height - pad} stroke="var(--color-line-strong)" strokeWidth={1} />
        )}
        <circle cx={xs(shown)} cy={ys(points[shown].y)} r={4} fill="var(--color-data)" stroke="var(--color-surface)" strokeWidth={2} />
        {points.map((p, i) => (
          <rect
            key={p.x}
            x={xs(i) - (width - pad * 2) / Math.max(1, points.length - 1) / 2}
            y={0}
            width={(width - pad * 2) / Math.max(1, points.length - 1)}
            height={height}
            fill="transparent"
            onMouseEnter={() => setActive(i)}
          />
        ))}
      </svg>
      <div className="mt-1 flex justify-between text-xs text-muted">
        <span>{points[shown].x}</span>
        <span className="font-medium text-ink">{points[shown].y}</span>
      </div>
    </div>
  );
}

/** Single-series vertical bar chart with per-bar hover tooltip. */
export function BarChart({
  data,
  label,
  unit,
  height = 160,
}: {
  data: { x: string; y: number }[];
  label: string;
  unit?: string;
  height?: number;
}) {
  const [active, setActive] = useState<number | null>(null);
  const id = useId();
  const max = Math.max(...data.map((d) => d.y), 1);
  const niceMax = Math.ceil(max / 10) * 10;
  return (
    <figure aria-labelledby={id}>
      <figcaption id={id} className="sr-only">
        {label}
      </figcaption>
      <div className="relative flex items-end gap-2" style={{ height }} onMouseLeave={() => setActive(null)}>
        <div aria-hidden className="pointer-events-none absolute inset-0 flex flex-col justify-between">
          {[niceMax, niceMax / 2, 0].map((t) => (
            <div key={t} className="flex items-center gap-2">
              <span className="w-6 text-right text-[11px] text-faint tabular-nums">{t}</span>
              <span className="h-px flex-1 bg-line" />
            </div>
          ))}
        </div>
        <div className="w-6 shrink-0" />
        {data.map((d, i) => (
          <button
            key={d.x}
            type="button"
            className="group relative flex h-full flex-1 items-end justify-center focus-visible:outline-offset-0"
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            onBlur={() => setActive(null)}
            aria-label={`${d.x}: ${d.y}${unit ? ` ${unit}` : ""}`}
          >
            <span
              className={cn("w-full max-w-10 rounded-t-[4px] transition-colors", active === i ? "bg-harbor-700" : "bg-data")}
              style={{ height: `${(d.y / niceMax) * 100}%` }}
            />
            {active === i && (
              <span className="absolute -top-8 z-10 rounded-md bg-ink px-2 py-1 text-xs whitespace-nowrap text-paper shadow-lg">
                {d.x} · {d.y}
                {unit ? ` ${unit}` : ""}
              </span>
            )}
          </button>
        ))}
      </div>
      <div className="mt-2 flex gap-2 pl-8 text-center text-xs text-muted">
        {data.map((d) => (
          <span key={d.x} className="flex-1">
            {d.x}
          </span>
        ))}
      </div>
    </figure>
  );
}

/** Five-step band indicator used by the communication profile. */
export function BandIndicator({ band, label }: { band: number; label: string }) {
  return (
    <div className="flex items-center gap-1" role="img" aria-label={`${label}: ${band} of 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} className={cn("h-2 w-6 rounded-full sm:w-8", i <= band ? "bg-data" : "bg-data-track")} />
      ))}
    </div>
  );
}

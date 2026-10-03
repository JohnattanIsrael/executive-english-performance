"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { categoryLabels } from "@/content/marketing";
import type { Difficulty, Scenario, ScenarioCategory } from "@/lib/types";
import { cn } from "@/lib/utils";
import { ScenarioCard } from "./scenario-card";

const categories = Object.keys(categoryLabels) as ScenarioCategory[];
const difficulties: (Difficulty | "all")[] = ["all", "foundation", "advanced", "executive"];

export function ScenarioLibrary({ scenarios }: { scenarios: Scenario[] }) {
  const [category, setCategory] = useState<ScenarioCategory | "all">("all");
  const [difficulty, setDifficulty] = useState<Difficulty | "all">("all");
  const [query, setQuery] = useState("");

  const counts = useMemo(() => {
    const c: Partial<Record<ScenarioCategory, number>> = {};
    for (const s of scenarios) c[s.category] = (c[s.category] ?? 0) + 1;
    return c;
  }, [scenarios]);

  const filtered = scenarios.filter((s) => {
    const q = query.trim().toLowerCase();
    return (
      (category === "all" || s.category === category) &&
      (difficulty === "all" || s.difficulty === difficulty) &&
      (!q || `${s.title} ${s.situation} ${s.counterpart}`.toLowerCase().includes(q))
    );
  });

  return (
    <div>
      <div className="flex flex-col gap-4 rounded-2xl border border-line bg-surface p-4 md:flex-row md:items-center">
        <label className="relative flex-1">
          <span className="sr-only">Search scenarios</span>
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-faint" aria-hidden />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search scenarios, situations or counterparts"
            className="h-10 w-full rounded-lg border border-line bg-paper pr-3 pl-9 text-sm text-ink placeholder:text-faint focus:border-harbor-500 focus:outline-none"
          />
        </label>
        <label className="flex items-center gap-2 text-sm text-muted">
          Level
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value as Difficulty | "all")}
            className="h-10 rounded-lg border border-line bg-paper px-3 text-sm text-ink capitalize"
          >
            {difficulties.map((d) => (
              <option key={d} value={d}>
                {d === "all" ? "All levels" : d}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div role="group" aria-label="Filter by category" className="mt-4 flex flex-wrap gap-2">
        {(["all", ...categories] as const).map((c) => (
          <button
            key={c}
            type="button"
            aria-pressed={category === c}
            onClick={() => setCategory(c)}
            className={cn(
              "rounded-full border px-3.5 py-1.5 text-[13px] transition-colors",
              category === c ? "border-ink bg-ink text-paper" : "border-line-strong bg-surface text-ink-2 hover:border-ink",
            )}
          >
            {c === "all" ? "All" : categoryLabels[c]}
            <span className={cn("ml-1.5 tabular-nums", category === c ? "text-paper/60" : "text-faint")}>
              {c === "all" ? scenarios.length : (counts[c] ?? 0)}
            </span>
          </button>
        ))}
      </div>

      <p className="mt-6 text-sm text-muted" aria-live="polite">
        {filtered.length} scenario{filtered.length === 1 ? "" : "s"}
      </p>
      <div className="mt-3 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {filtered.map((s) => (
          <ScenarioCard key={s.id} scenario={s} />
        ))}
      </div>
      {filtered.length === 0 && (
        <p className="rounded-2xl border border-dashed border-line-strong p-10 text-center text-muted">
          No scenarios match these filters yet. Your coach can design one for your situation.
        </p>
      )}
    </div>
  );
}

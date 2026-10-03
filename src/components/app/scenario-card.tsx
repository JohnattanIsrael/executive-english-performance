import Link from "next/link";
import { Clock, Play } from "lucide-react";
import { Badge } from "@/components/ui/primitives";
import { categoryLabels, metricLabels } from "@/content/marketing";
import type { Scenario } from "@/lib/types";

const difficultyTone = { foundation: "neutral", advanced: "harbor", executive: "brass" } as const;

export function practiceHref(scenarioId: string) {
  return `/dashboard/practice/?scenario=${encodeURIComponent(scenarioId)}`;
}

export function ScenarioCard({ scenario }: { scenario: Scenario }) {
  return (
    <article className="group flex h-full flex-col rounded-2xl border border-line bg-surface p-5 transition-shadow hover:shadow-[0_18px_40px_-24px_rgb(14_23_38/0.35)]">
      <div className="flex items-center justify-between gap-2">
        <span className="text-[11px] font-medium tracking-[0.14em] text-brass uppercase">{categoryLabels[scenario.category]}</span>
        <Badge tone={difficultyTone[scenario.difficulty]} className="capitalize">
          {scenario.difficulty}
        </Badge>
      </div>
      <h3 className="mt-3 text-lg font-medium text-ink">{scenario.title}</h3>
      <p className="mt-1.5 flex-1 text-[14.5px] leading-relaxed text-ink-2">“{scenario.situation}”</p>
      <p className="mt-4 text-xs text-muted">With: {scenario.counterpart}</p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {scenario.skills.map((k) => (
          <span key={k} className="rounded-md bg-paper px-2 py-0.5 text-[11.5px] text-ink-2">
            {metricLabels[k]}
          </span>
        ))}
      </div>
      <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
        <span className="flex items-center gap-1.5 text-xs text-muted">
          <Clock className="size-3.5" aria-hidden /> {scenario.durationMinutes} min
        </span>
        <Link
          href={practiceHref(scenario.id)}
          className="inline-flex items-center gap-1.5 rounded-full bg-ink px-3.5 py-1.5 text-[13px] font-medium text-paper transition-colors hover:bg-harbor-800"
          aria-label={`Start simulation: ${scenario.title}`}
        >
          <Play className="size-3" aria-hidden /> Start simulation
        </Link>
      </div>
    </article>
  );
}

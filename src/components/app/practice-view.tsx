"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Clock, FileText, Mic, Repeat } from "lucide-react";
import { Badge } from "@/components/ui/primitives";
import type { PracticeSession, Scenario } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { PageHeader, Panel } from "./app-shell";
import { ScenarioCard } from "./scenario-card";
import { SimulationPlayer } from "./simulation-player";

const drills = [
  { title: "Bottom line first", body: "Answer a leadership question with your conclusion in one sentence, then one reason.", minutes: 5 },
  { title: "Sixty-second answer", body: "Respond to a challenging question in under a minute, with structure.", minutes: 8 },
  { title: "Disagree diplomatically", body: "Rephrase blunt objections into clear, respectful disagreement.", minutes: 6 },
  { title: "Executive rewrite", body: "Turn a long status email into a five-line executive update.", minutes: 10 },
];

const kindIcon = { simulation: Mic, drill: Repeat, writing: FileText };

/** Practice hub, or the simulation player when ?scenario= is present (client-side, works on static hosting). */
export function PracticeView({
  scenarios,
  recommended,
  recent,
}: {
  scenarios: Scenario[];
  recommended: Scenario[];
  recent: PracticeSession[];
}) {
  const params = useSearchParams();
  const scenarioId = params.get("scenario");
  const scenario = scenarioId ? scenarios.find((s) => s.id === scenarioId) : undefined;

  if (scenario) return <SimulationPlayer key={scenario.id} scenario={scenario} allScenarios={scenarios} />;

  return (
    <>
      <PageHeader
        title="Practice"
        description="Short, deliberate practice between coaching sessions. Choose a recommended simulation or a quick drill."
      />
      {scenarioId && !scenario && (
        <p className="mb-6 rounded-xl border border-caution/30 bg-caution-soft px-4 py-3 text-sm text-caution">
          That scenario could not be found. Choose one below.
        </p>
      )}

      <h2 className="mb-4 text-[15px] font-medium text-ink">Recommended for your focus</h2>
      <div className="grid gap-4 md:grid-cols-3">
        {recommended.map((s) => (
          <ScenarioCard key={s.id} scenario={s} />
        ))}
      </div>

      <div className="mt-10 grid gap-5 lg:grid-cols-[1.3fr_1fr]">
        <Panel
          title="Quick drills"
          action={<Badge tone="caution">Guided drills in development</Badge>}
        >
          <ul className="grid gap-3 sm:grid-cols-2">
            {drills.map((d) => (
              <li key={d.title} className="rounded-xl border border-line p-4">
                <p className="font-medium text-ink">{d.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted">{d.body}</p>
                <p className="mt-3 flex items-center gap-1.5 text-xs text-faint">
                  <Clock className="size-3.5" aria-hidden /> {d.minutes} min
                </p>
              </li>
            ))}
          </ul>
        </Panel>
        <Panel title="Recent practice" action={<Link href="/dashboard/progress" className="text-sm text-muted hover:text-ink">Progress</Link>}>
          <ul className="divide-y divide-line">
            {recent.map((s) => {
              const Icon = kindIcon[s.kind];
              return (
                <li key={s.id} className="flex items-center gap-3 py-3">
                  <span className="flex size-8 items-center justify-center rounded-full bg-paper text-ink-2">
                    <Icon className="size-3.5" aria-hidden />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm text-ink">{s.title}</span>
                    <span className="text-xs text-muted">
                      {formatDate(s.completedAt)} · {s.minutes} min
                    </span>
                  </span>
                </li>
              );
            })}
          </ul>
        </Panel>
      </div>

      <p className="mt-10 text-sm text-muted">
        Looking for something else?{" "}
        <Link href="/dashboard/scenarios" className="font-medium text-ink underline underline-offset-2">
          Browse the full scenario library
        </Link>
        .
      </p>
    </>
  );
}

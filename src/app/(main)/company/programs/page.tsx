import { PageHeader, Panel } from "@/components/app/app-shell";
import { ScenarioCard } from "@/components/app/scenario-card";
import { SampleBadge } from "@/components/app/status";
import { Badge } from "@/components/ui/primitives";
import { services } from "@/lib/services";
import { appMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/utils";

export const metadata = appMetadata("Programs");

const phaseTone = { done: "good", current: "harbor", upcoming: "neutral" } as const;

export default async function CompanyProgramsPage() {
  const [programs, scenarios] = await Promise.all([services.companies.listPrograms("cmp_sample"), services.scenarios.list()]);

  return (
    <>
      <PageHeader title="Programs" description="Your active program, its phases and the business-specific scenarios designed for your team." actions={<SampleBadge />} />
      {programs.map((program) => (
        <div key={program.id} className="flex flex-col gap-5">
          <Panel
            title={program.name}
            action={<Badge tone="brass">{program.kind === "pilot" ? "Corporate Pilot" : "Annual Program"}</Badge>}
          >
            <dl className="grid gap-4 sm:grid-cols-3">
              <div>
                <dt className="text-xs text-muted">Start</dt>
                <dd className="mt-1 text-ink">{formatDate(program.startDate)}</dd>
              </div>
              <div>
                <dt className="text-xs text-muted">End</dt>
                <dd className="mt-1 text-ink">{formatDate(program.endDate)}</dd>
              </div>
              <div>
                <dt className="text-xs text-muted">Participants</dt>
                <dd className="mt-1 text-ink">{program.participants}</dd>
              </div>
            </dl>
            <ol className="mt-6 grid gap-3 border-t border-line pt-6 md:grid-cols-5">
              {program.phases.map((p, i) => (
                <li key={p.name} className="rounded-xl bg-paper p-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs text-faint tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                    <Badge tone={phaseTone[p.status]} className="capitalize">
                      {p.status}
                    </Badge>
                  </div>
                  <p className="mt-3 text-sm font-medium text-ink">{p.name}</p>
                  <p className="mt-1 text-xs leading-relaxed text-muted">{p.description}</p>
                </li>
              ))}
            </ol>
          </Panel>

          <h2 className="mt-5 text-[15px] font-medium text-ink">Business-specific scenarios</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {program.customScenarios
              .map((id) => scenarios.find((s) => s.id === id))
              .filter((s) => s !== undefined)
              .map((s) => (
                <ScenarioCard key={s.id} scenario={s} />
              ))}
          </div>
        </div>
      ))}
    </>
  );
}

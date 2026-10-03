import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHeader, Panel } from "@/components/app/app-shell";
import { SampleBadge } from "@/components/app/status";
import { StatTile } from "@/components/ui/charts";
import { services } from "@/lib/services";
import { appMetadata } from "@/lib/seo";
import { cn, formatDate } from "@/lib/utils";

export const metadata = appMetadata("Overview");

export default async function CompanyOverviewPage() {
  const [company, employees, programs] = await Promise.all([
    services.companies.getCompany("cmp_sample"),
    services.companies.listEmployees("cmp_sample"),
    services.companies.listPrograms("cmp_sample"),
  ]);
  const program = programs[0];
  const engaged = employees.filter((e) => e.status === "active" || e.status === "completed");
  const totalSessions = employees.reduce((a, e) => a + e.sessionsCompleted, 0);
  const avgMinutes = engaged.length ? Math.round(engaged.reduce((a, e) => a + e.practiceMinutes, 0) / engaged.length) : 0;
  const statusCounts = (["invited", "assessing", "active", "completed"] as const).map((s) => ({
    status: s,
    count: employees.filter((e) => e.status === s).length,
  }));

  return (
    <>
      <PageHeader
        eyebrow="Company workspace"
        title={company?.name ?? "Company"}
        description={`${program.name} · ${formatDate(program.startDate)} – ${formatDate(program.endDate)}`}
        actions={<SampleBadge />}
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatTile label="Participants enrolled" value={`${employees.length}`} detail={`of ${company?.seats ?? "—"} seats`} />
        <StatTile label="Actively practicing" value={`${engaged.length}`} detail="Active or completed" />
        <StatTile label="Coaching sessions delivered" value={`${totalSessions}`} detail="Since program start" />
        <StatTile label="Avg. practice per participant" value={`${avgMinutes} min`} detail="Active participants" />
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-[1.4fr_1fr]">
        <Panel
          title="Program timeline"
          action={
            <Link href="/company/programs" className="inline-flex items-center gap-1 text-sm text-muted hover:text-ink">
              Details <ArrowRight className="size-3.5" aria-hidden />
            </Link>
          }
        >
          <ol className="relative flex flex-col gap-5 border-l border-line pl-6">
            {program.phases.map((p) => (
              <li key={p.name} className="relative">
                <span
                  aria-hidden
                  className={cn(
                    "absolute top-1 -left-[31px] size-3.5 rounded-full border-2",
                    p.status === "done" && "border-data bg-data",
                    p.status === "current" && "border-data bg-surface",
                    p.status === "upcoming" && "border-line-strong bg-surface",
                  )}
                />
                <p className={cn("font-medium", p.status === "upcoming" ? "text-muted" : "text-ink")}>
                  {p.name}
                  {p.status === "current" && <span className="ml-2 text-xs font-normal text-data">In progress</span>}
                </p>
                <p className="text-sm text-muted">{p.description}</p>
              </li>
            ))}
          </ol>
        </Panel>

        <Panel title="Participation">
          <ul className="flex flex-col gap-4">
            {statusCounts.map((s) => (
              <li key={s.status}>
                <div className="flex justify-between text-sm">
                  <span className="text-ink capitalize">{s.status}</span>
                  <span className="font-medium text-ink tabular-nums">{s.count}</span>
                </div>
                <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-data-track">
                  <div className="h-full rounded-full bg-data" style={{ width: `${(s.count / employees.length) * 100}%` }} />
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-6 border-t border-line pt-4 text-xs text-muted">
            Company reports show participation and cohort-level progress. Individual coaching content stays confidential.
          </p>
        </Panel>
      </div>
    </>
  );
}

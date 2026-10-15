import { PageHeader, Panel } from "@/components/app/app-shell";
import { DataTable } from "@/components/app/data-table";
import { BarChart, Sparkline, StatTile } from "@/components/ui/charts";
import { Badge } from "@/components/ui/primitives";
import { metricLabels } from "@/content/marketing";
import { services } from "@/lib/services";
import { appMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/utils";

export const metadata = appMetadata("Progress");

const sourceLabel = { coach_rating: "Coach rating", self_assessment: "Self-assessment", ai_estimate: "AI estimate" } as const;

export default async function ProgressPage() {
  const session = (await services.auth.getSession())!;
  const [progress, patterns] = await Promise.all([
    services.progress.getSummary(session.user.id),
    services.feedback.identifyPatterns(session.user.id),
  ]);
  const totalMinutes = progress.minutesByWeek.reduce((a, w) => a + w.minutes, 0);

  return (
    <>
      <PageHeader title="Progress" description="How your practice and communication indicators have developed over the last six weeks." />

      <div className="grid gap-4 sm:grid-cols-3">
        <StatTile label="Practice minutes" value={String(totalMinutes)} detail="Last 6 weeks" />
        <StatTile label="Sessions this week" value={`${progress.weekly.sessionsCompleted}/${progress.weekly.sessionsTarget}`} progress={{ current: progress.weekly.sessionsCompleted, target: progress.weekly.sessionsTarget }} />
        <StatTile label="Simulations this week" value={String(progress.weekly.simulationsCompleted)} />
      </div>

      <Panel title="Communication indicators by week" className="mt-5">
        <div className="grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {progress.history.map((series) => {
            const reading = progress.metrics.find((m) => m.key === series.key);
            const first = series.points[0].value;
            const last = series.points.at(-1)!.value;
            return (
              <div key={series.key}>
                <div className="mb-2 flex items-baseline justify-between">
                  <h3 className="text-sm font-medium text-ink">{metricLabels[series.key]}</h3>
                  <span className="text-xs text-muted">
                    {last - first >= 0 ? "+" : "−"}
                    {Math.abs(last - first)} since W1
                  </span>
                </div>
                <Sparkline label={metricLabels[series.key]} points={series.points.map((p) => ({ x: p.week, y: p.value }))} domain={[40, 100]} />
                {reading && <p className="mt-1 text-[11px] text-faint">Source: {sourceLabel[reading.source]}</p>}
              </div>
            );
          })}
        </div>
        <p className="mt-8 border-t border-line pt-4 text-xs leading-relaxed text-muted">
          Indicators are 0–100 practice ratings recorded by your coach (or by you, for confidence). They exist to guide
          practice and are not standardized or scientifically validated measurements.
        </p>
      </Panel>

      <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_1.2fr]">
        <Panel title="Practice minutes per week">
          <BarChart label="Practice minutes per week" unit="min" data={progress.minutesByWeek.map((w) => ({ x: w.week, y: w.minutes }))} />
        </Panel>
        <Panel title="Patterns your coach is working on" action={<Badge tone="harbor">Coach-identified</Badge>}>
          <ul className="flex flex-col gap-3">
            {patterns.map((p) => (
              <li key={p.pattern} className="rounded-xl bg-paper p-4 text-sm leading-relaxed text-ink-2">
                {p.pattern}
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      <h2 className="mt-10 mb-4 text-[15px] font-medium text-ink">Recent sessions</h2>
      <DataTable
        caption="Recent practice sessions"
        rows={progress.recentSessions}
        rowKey={(r) => r.id}
        columns={[
          { key: "title", header: "Session", cell: (r) => <span className="text-ink">{r.title}</span> },
          { key: "kind", header: "Type", cell: (r) => <span className="capitalize">{r.kind}</span> },
          { key: "date", header: "Date", cell: (r) => formatDate(r.completedAt) },
          { key: "minutes", header: "Minutes", numeric: true, cell: (r) => r.minutes },
        ]}
      />
    </>
  );
}

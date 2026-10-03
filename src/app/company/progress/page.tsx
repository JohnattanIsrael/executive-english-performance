import { PageHeader, Panel } from "@/components/app/app-shell";
import { SampleBadge } from "@/components/app/status";
import { BarChart, Meter } from "@/components/ui/charts";
import { metricLabels } from "@/content/marketing";
import { services } from "@/lib/services";
import { appMetadata } from "@/lib/seo";

export const metadata = appMetadata("Progress");

export default async function CompanyProgressPage() {
  const [metrics, employees] = await Promise.all([
    services.companies.getCohortMetrics("cmp_sample"),
    services.companies.listEmployees("cmp_sample"),
  ]);

  const departments = [...new Set(employees.map((e) => e.department))];
  const minutesByDept = departments.map((d) => {
    const people = employees.filter((e) => e.department === d && e.practiceMinutes > 0);
    return { x: d, y: people.length ? Math.round(people.reduce((a, e) => a + e.practiceMinutes, 0) / people.length) : 0 };
  });

  return (
    <>
      <PageHeader
        title="Cohort progress"
        description="Aggregated across all participants. Individual coaching content is never shown here."
        actions={<SampleBadge />}
      />
      <div className="grid gap-5 lg:grid-cols-[1.2fr_1fr]">
        <Panel title="Communication indicators — cohort average">
          <div className="grid gap-x-8 gap-y-5 sm:grid-cols-2">
            {metrics.map((m) => (
              <Meter key={m.key} label={metricLabels[m.key]} value={m.value} previous={m.previous} />
            ))}
          </div>
          <p className="mt-6 border-t border-line pt-4 text-xs leading-relaxed text-muted">
            0–100 practice indicators from coach ratings (confidence is self-reported). Marker shows the cohort average at
            the assessment phase. Not standardized test scores.
          </p>
        </Panel>
        <Panel title="Average practice minutes by department">
          <BarChart label="Average practice minutes per active participant, by department" unit="min" data={minutesByDept} />
        </Panel>
      </div>
    </>
  );
}

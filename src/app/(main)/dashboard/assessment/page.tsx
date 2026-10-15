import { PageHeader, Panel } from "@/components/app/app-shell";
import { SelfAssessment } from "@/components/assessment/self-assessment";
import { BandIndicator } from "@/components/ui/charts";
import { Badge } from "@/components/ui/primitives";
import { bandLabels } from "@/content/assessment";
import { services } from "@/lib/services";
import { appMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/utils";

export const metadata = appMetadata("Assessment");

const methodLabel = {
  self_assessment: "Self-assessment",
  coach_assessment: "Coach assessment",
  ai_assessment: "AI-assisted assessment",
} as const;

export default async function DashboardAssessmentPage() {
  const session = (await services.auth.getSession())!;
  const [latest, questions] = await Promise.all([
    services.assessment.getLatest(session.user.id),
    services.assessment.getQuestions(),
  ]);

  return (
    <>
      <PageHeader
        title="Assessment"
        description="Your Executive Communication Profile, and a self-assessment you can retake at any time to reflect on progress."
      />

      {latest && (
        <Panel
          title="Current communication profile"
          action={
            <span className="flex items-center gap-2 text-sm text-muted">
              <Badge tone="harbor">{methodLabel[latest.method]}</Badge>
              {formatDate(latest.completedAt)}
            </span>
          }
        >
          <ul className="divide-y divide-line">
            {latest.dimensions.map((d) => (
              <li key={d.key} className="grid gap-2 py-4 md:grid-cols-[1fr_auto_1.5fr] md:items-center md:gap-8">
                <div>
                  <p className="font-medium text-ink">{d.label}</p>
                  <p className="text-xs text-muted">{bandLabels[d.band]}</p>
                </div>
                <BandIndicator band={d.band} label={d.label} />
                <p className="text-sm text-ink-2">{d.summary}</p>
              </li>
            ))}
          </ul>
          <div className="mt-5 border-t border-line pt-4">
            <p className="text-sm font-medium text-ink">Agreed priorities</p>
            <p className="mt-1 text-sm text-ink-2">{latest.priorities.join(" · ")}</p>
          </div>
        </Panel>
      )}

      <h2 className="mt-10 mb-4 text-[15px] font-medium text-ink">Self-assessment</h2>
      <SelfAssessment questions={questions} context="dashboard" />
    </>
  );
}

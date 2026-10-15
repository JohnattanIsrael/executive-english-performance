import Link from "next/link";
import { ArrowRight, CalendarDays, MessageSquareQuote, Play, Target } from "lucide-react";
import { Greeting } from "@/components/app/greeting";
import { PageHeader, Panel } from "@/components/app/app-shell";
import { practiceHref } from "@/components/app/scenario-card";
import { ButtonLink } from "@/components/ui/button";
import { Meter, StatTile } from "@/components/ui/charts";
import { Badge } from "@/components/ui/primitives";
import { categoryLabels, metricLabels } from "@/content/marketing";
import { services } from "@/lib/services";
import { appMetadata } from "@/lib/seo";
import { formatDate, formatDateTime } from "@/lib/utils";

export const metadata = appMetadata("Overview");

export default async function DashboardPage() {
  const session = (await services.auth.getSession())!;
  const { user } = session;
  const [progress, sessions, threads] = await Promise.all([
    services.progress.getSummary(user.id),
    services.coaching.listSessions(user.id),
    services.coaching.listThreads(user.id),
  ]);
  const recommended = await services.scenarios.get(progress.recommendedScenarioId);
  const next = sessions.find((s) => s.status === "scheduled");
  const lastCoachMessage = threads
    .flatMap((t) => t.messages)
    .filter((m) => m.authorId === user.coachId)
    .sort((a, b) => a.sentAt.localeCompare(b.sentAt))
    .at(-1);
  const { weekly } = progress;

  return (
    <>
      <PageHeader
        title={<Greeting name={user.firstName} />}
        description="Here’s where your communication practice stands this week."
        actions={
          recommended && (
            <ButtonLink href={practiceHref(recommended.id)} size="sm">
              <Play className="size-3.5" aria-hidden /> Start Simulation
            </ButtonLink>
          )
        }
      />

      <div className="grid gap-5 lg:grid-cols-3">
        <section className="relative overflow-hidden rounded-2xl bg-ink p-6 text-paper lg:col-span-2 md:p-8">
          <div aria-hidden className="absolute inset-0 hairline-grid-inverse [mask-image:radial-gradient(ellipse_at_top_right,black,transparent_70%)]" />
          <div className="relative">
            <p className="flex items-center gap-2 text-sm text-paper/60">
              <Target className="size-4 text-brass-light" aria-hidden /> Your communication focus
            </p>
            <p className="mt-3 font-serif text-3xl leading-tight md:text-4xl">{progress.focus}</p>
            <ul className="mt-6 flex flex-col gap-2.5">
              {user.goals.map((g) => (
                <li key={g} className="flex gap-3 text-[15px] text-paper/80">
                  <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-brass-light" />
                  {g}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <Panel title="Next coaching session" action={<Link href="/dashboard/coaching" className="text-sm text-muted hover:text-ink">All</Link>}>
          {next ? (
            <div>
              <p className="flex items-center gap-2 text-sm text-muted">
                <CalendarDays className="size-4" aria-hidden /> {formatDateTime(next.startsAt)}
              </p>
              <p className="mt-2 font-medium text-ink">{next.title}</p>
              <ul className="mt-4 flex flex-col gap-2 border-t border-line pt-4">
                {next.agenda.map((a) => (
                  <li key={a} className="text-sm text-ink-2">
                    — {a}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="text-sm text-muted">No session scheduled.</p>
          )}
        </Panel>
      </div>

      <h2 className="mt-10 mb-4 text-[15px] font-medium text-ink">Weekly practice</h2>
      <div className="grid gap-4 sm:grid-cols-3">
        <StatTile
          label="Sessions completed"
          value={`${weekly.sessionsCompleted}/${weekly.sessionsTarget}`}
          progress={{ current: weekly.sessionsCompleted, target: weekly.sessionsTarget }}
          detail={`${weekly.sessionsTarget - weekly.sessionsCompleted} to reach your weekly goal`}
        />
        <StatTile label="Minutes practiced" value={`${weekly.minutesPracticed}`} detail="This week" />
        <StatTile label="Simulations completed" value={`${weekly.simulationsCompleted}`} detail="This week" />
      </div>

      <div className="mt-10 grid gap-5 lg:grid-cols-[1.4fr_1fr]">
        <Panel
          title="Communication metrics"
          action={
            <Link href="/dashboard/progress" className="inline-flex items-center gap-1 text-sm text-muted hover:text-ink">
              Progress <ArrowRight className="size-3.5" aria-hidden />
            </Link>
          }
        >
          <div className="grid gap-x-8 gap-y-5 sm:grid-cols-2">
            {progress.metrics.map((m) => (
              <Meter key={m.key} label={metricLabels[m.key]} value={m.value} previous={m.previous} />
            ))}
          </div>
          <p className="mt-6 border-t border-line pt-4 text-xs leading-relaxed text-muted">
            Practice indicators (0–100) from coach ratings and self-assessment, with the marker showing four weeks ago.
            They guide practice — they are not standardized or scientifically validated test scores.
          </p>
        </Panel>

        <div className="flex flex-col gap-5">
          {recommended && (
            <Panel title="Recommended practice">
              <Badge tone="brass">{categoryLabels[recommended.category]}</Badge>
              <p className="mt-3 font-serif text-2xl leading-snug text-ink">Practice: Handling difficult questions</p>
              <p className="mt-2 text-sm text-ink-2">
                {recommended.title} — “{recommended.situation}”
              </p>
              <ButtonLink href={practiceHref(recommended.id)} className="mt-5 w-full">
                <Play className="size-3.5" aria-hidden /> Start Simulation
              </ButtonLink>
            </Panel>
          )}
          {lastCoachMessage && (
            <Panel title="From your coach">
              <MessageSquareQuote className="size-5 text-brass" aria-hidden />
              <p className="mt-3 text-[15px] leading-relaxed text-ink-2">{lastCoachMessage.body}</p>
              <Link href="/dashboard/messages" className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-ink hover:text-harbor-600">
                Reply <ArrowRight className="size-3.5" aria-hidden />
              </Link>
            </Panel>
          )}
        </div>
      </div>

      <Panel title="Upcoming situations" className="mt-5">
        <ul className="divide-y divide-line">
          {user.upcomingSituations.map((s) => (
            <li key={s.id} className="flex flex-col gap-1 py-3 sm:flex-row sm:items-center sm:justify-between">
              <span className="text-ink">{s.title}</span>
              <span className="flex items-center gap-3 text-sm text-muted">
                <Badge>{categoryLabels[s.type]}</Badge>
                {s.date ? formatDate(s.date) : "Date to be confirmed"}
              </span>
            </li>
          ))}
        </ul>
      </Panel>
    </>
  );
}

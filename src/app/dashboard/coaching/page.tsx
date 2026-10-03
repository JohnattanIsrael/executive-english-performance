import Link from "next/link";
import { CalendarDays, Video } from "lucide-react";
import { PageHeader, Panel } from "@/components/app/app-shell";
import { Button } from "@/components/ui/button";
import { Badge, PlaceholderNote } from "@/components/ui/primitives";
import { services } from "@/lib/services";
import { appMetadata } from "@/lib/seo";
import { formatDateTime } from "@/lib/utils";

export const metadata = appMetadata("Coaching");

export default async function CoachingPage() {
  const session = (await services.auth.getSession())!;
  const { user } = session;
  const [coach, sessions, insights] = await Promise.all([
    services.coaching.getCoach(user.coachId ?? ""),
    services.coaching.listSessions(user.id),
    services.coaching.getCoachInsights(user.id),
  ]);
  const next = sessions.find((s) => s.status === "scheduled");
  const past = sessions.filter((s) => s.status === "completed");

  return (
    <>
      <PageHeader title="Coaching" description="Your sessions, notes and homework — the human side of your program." />

      <div className="grid gap-5 lg:grid-cols-[1.4fr_1fr]">
        {next && (
          <Panel title="Next session" action={<Badge tone="harbor">Scheduled</Badge>}>
            <p className="font-serif text-2xl text-ink">{next.title}</p>
            <p className="mt-2 flex items-center gap-2 text-sm text-muted">
              <CalendarDays className="size-4" aria-hidden /> {formatDateTime(next.startsAt)} · {next.durationMinutes} min
            </p>
            <p className="mt-5 text-sm font-medium text-ink">Agenda</p>
            <ol className="mt-2 flex flex-col gap-2">
              {next.agenda.map((a, i) => (
                <li key={a} className="flex gap-2.5 text-sm text-ink-2">
                  <span className="text-faint">{i + 1}.</span>
                  {a}
                </li>
              ))}
            </ol>
            <div className="mt-6 flex flex-wrap gap-2">
              <Button size="sm" disabled title="Video meeting links appear once scheduling is connected">
                <Video className="size-3.5" aria-hidden /> Join video call
              </Button>
              <Button size="sm" variant="secondary" disabled title="Calendar integration in development">
                Add to calendar
              </Button>
            </div>
          </Panel>
        )}
        {coach && (
          <Panel title="Your coach">
            <div className="flex items-center gap-4">
              <span className="flex size-12 items-center justify-center rounded-full bg-ink font-serif text-lg text-paper">EE</span>
              <div>
                <p className="font-medium text-ink">{coach.name}</p>
                <p className="text-sm text-muted">{coach.title}</p>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {coach.specialties.map((s) => (
                <Badge key={s}>{s}</Badge>
              ))}
            </div>
            <PlaceholderNote className="mt-5">Coach profile uses placeholder details until real data is added.</PlaceholderNote>
            <Link href="/dashboard/messages" className="mt-5 inline-block text-sm font-medium text-ink underline underline-offset-2">
              Message your coach
            </Link>
          </Panel>
        )}
      </div>

      <Panel title="What your coach is focusing on" className="mt-5">
        <ul className="grid gap-3 md:grid-cols-3">
          {insights.map((i) => (
            <li key={i} className="rounded-xl bg-paper p-4 text-sm leading-relaxed text-ink-2">
              {i}
            </li>
          ))}
        </ul>
      </Panel>

      <h2 className="mt-10 mb-4 text-[15px] font-medium text-ink">Past sessions</h2>
      <div className="flex flex-col gap-4">
        {past.map((s) => (
          <article key={s.id} className="rounded-2xl border border-line bg-surface p-5 md:p-6">
            <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between">
              <h3 className="font-medium text-ink">{s.title}</h3>
              <span className="text-sm text-muted">{formatDateTime(s.startsAt)}</span>
            </div>
            {s.notes && (
              <div className="mt-4">
                <p className="text-xs font-medium tracking-wide text-muted uppercase">Coach notes</p>
                <p className="mt-1.5 text-[15px] leading-relaxed text-ink-2">{s.notes}</p>
              </div>
            )}
            {s.homework && (
              <div className="mt-4">
                <p className="text-xs font-medium tracking-wide text-muted uppercase">Homework</p>
                <ul className="mt-1.5 flex flex-col gap-1">
                  {s.homework.map((h) => (
                    <li key={h} className="text-sm text-ink-2">
                      — {h}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </article>
        ))}
      </div>
    </>
  );
}

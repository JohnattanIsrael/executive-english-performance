import { MessageSquareQuote, Play } from "lucide-react";
import { Meter } from "@/components/ui/charts";
import { Photo } from "@/components/ui/photo";
import { Badge } from "@/components/ui/primitives";
import { marketingContent } from "@/content/marketing";
import { photos } from "@/content/photos";
import type { Locale, Localized } from "@/i18n/config";

const copy: Localized<{
  profile: string;
  goal: string;
  preview: string;
  thisWeek: string;
  sessions: string;
  nextSession: string;
  sessionTitle: string;
  sessionWhen: string;
  recommended: string;
  simulation: string;
  coachNote: string;
  quote: string;
}> = {
  en: {
    profile: "Communication profile",
    goal: "Lead clearer executive meetings",
    preview: "Platform preview",
    thisWeek: "This week",
    sessions: "practice sessions",
    nextSession: "Next coaching session",
    sessionTitle: "Quarterly review rehearsal",
    sessionWhen: "Thursday · 60 min",
    recommended: "Recommended simulation",
    simulation: "Handling difficult questions",
    coachNote: "Coach note",
    quote: "“Lead with the decision. Context second.”",
  },
  es: {
    profile: "Perfil de comunicación",
    goal: "Dirigir reuniones ejecutivas más claras",
    preview: "Vista previa de la plataforma",
    thisWeek: "Esta semana",
    sessions: "sesiones de práctica",
    nextSession: "Próxima sesión de coaching",
    sessionTitle: "Ensayo de la revisión trimestral",
    sessionWhen: "Jueves · 60 min",
    recommended: "Simulación recomendada",
    simulation: "Manejar preguntas difíciles",
    coachNote: "Nota del coach",
    quote: "«Empiece por la decisión. El contexto, después».",
  },
};

/**
 * Product preview composed in HTML. Values are illustrative interface
 * content, clearly labeled as a preview of the platform in development.
 */
export function HeroVisual({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const labels = marketingContent[locale].metricLabels;
  return (
    <div className="relative mx-auto w-full max-w-[600px] animate-rise pt-10 [animation-delay:150ms] sm:pt-16">
      <div className="absolute top-0 right-0 bottom-16 w-[68%] overflow-hidden rounded-[1.25rem] sm:w-[60%]">
        <Photo photo={photos.glassFacade} sizes="(min-width: 1024px) 360px, 60vw" priority />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-br from-ink/10 via-transparent to-ink/40" />
      </div>

      <figure className="relative mr-6 rounded-2xl border border-line bg-surface p-5 shadow-[0_30px_80px_-30px_rgb(14_23_38/0.35)] sm:mr-16 sm:p-6">
        <figcaption className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs text-muted">{t.profile}</p>
            <p className="mt-0.5 text-[15px] font-medium text-ink">{t.goal}</p>
          </div>
          <Badge tone="brass">{t.preview}</Badge>
        </figcaption>

        <div className="mt-6 grid gap-6 sm:grid-cols-[1.2fr_1fr]">
          <div className="flex flex-col gap-4">
            <Meter label={labels.clarity} value={68} previous={61} size="sm" />
            <Meter label={labels.responseQuality} value={63} previous={55} size="sm" />
            <Meter label={labels.confidence} value={59} previous={52} size="sm" />
            <Meter label={labels.vocabulary} value={74} previous={72} size="sm" />
          </div>
          <div className="flex flex-col gap-3">
            <div className="rounded-xl bg-paper p-4">
              <p className="text-xs text-muted">{t.thisWeek}</p>
              <p className="mt-1 text-2xl font-semibold tracking-tight text-ink">{locale === "es" ? "3 de 5" : "3 of 5"}</p>
              <p className="text-xs text-muted">{t.sessions}</p>
              <div className="mt-3 flex gap-1" aria-hidden>
                {[1, 2, 3, 4, 5].map((i) => (
                  <span key={i} className={i <= 3 ? "h-1.5 flex-1 rounded-full bg-data" : "h-1.5 flex-1 rounded-full bg-data-track"} />
                ))}
              </div>
            </div>
            <div className="rounded-xl border border-line p-4">
              <p className="text-xs text-muted">{t.nextSession}</p>
              <p className="mt-1 text-sm font-medium text-ink">{t.sessionTitle}</p>
              <p className="text-xs text-muted">{t.sessionWhen}</p>
            </div>
          </div>
        </div>
      </figure>

      <div className="absolute -bottom-10 -left-4 hidden w-64 rounded-xl border border-line bg-surface p-4 shadow-[0_20px_50px_-20px_rgb(14_23_38/0.3)] sm:block md:-left-8">
        <div className="flex items-center gap-3">
          <span className="flex size-9 items-center justify-center rounded-full bg-ink text-paper">
            <Play className="size-3.5 translate-x-px" aria-hidden />
          </span>
          <div>
            <p className="text-xs text-muted">{t.recommended}</p>
            <p className="text-sm font-medium text-ink">{t.simulation}</p>
          </div>
        </div>
      </div>

      <div className="absolute -right-3 -bottom-16 hidden w-60 rounded-xl border border-line bg-surface p-4 shadow-[0_20px_50px_-20px_rgb(14_23_38/0.3)] md:block lg:-right-6">
        <div className="flex items-center gap-2 text-xs text-muted">
          <MessageSquareQuote className="size-3.5 text-brass" aria-hidden />
          {t.coachNote}
        </div>
        <p className="mt-2 font-serif text-[15px] leading-snug text-ink">{t.quote}</p>
      </div>
    </div>
  );
}

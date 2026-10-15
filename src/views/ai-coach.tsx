import type { Metadata } from "next";
import { CircleDashed, CheckCircle2 } from "lucide-react";
import { EarlyAccessForm } from "@/components/forms/simple-forms";
import { AiPracticeSection, CtaBand, HumanAiSection, PageHero } from "@/components/marketing/sections";
import { ButtonLink } from "@/components/ui/button";
import { PhotoFrame } from "@/components/ui/photo";
import { Badge, Container, Section, SectionHeading } from "@/components/ui/primitives";
import { commonCopy } from "@/content/i18n/common";
import { marketingContent } from "@/content/marketing";
import { aiCoachCopy } from "@/content/pages/ai-coach";
import { photos } from "@/content/photos";
import { localizeScenario } from "@/content/scenarios";
import type { Locale } from "@/i18n/config";
import { services } from "@/lib/services";
import { pageMetadata } from "@/lib/seo";

const exampleIds = ["present-q4-results", "negotiate-contract", "challenge-proposal", "explain-technical-incident"];

export function aiCoachMetadata(locale: Locale): Metadata {
  const t = aiCoachCopy[locale].meta;
  return pageMetadata({ title: t.title, description: t.description, path: "/ai-coach", locale, keywords: t.keywords });
}

export async function AiCoachPage({ locale }: { locale: Locale }) {
  const t = aiCoachCopy[locale];
  const common = commonCopy[locale];
  const { categoryLabels } = marketingContent[locale];
  const examples = (await services.scenarios.list())
    .filter((s) => exampleIds.includes(s.id))
    .map((s) => localizeScenario(s, locale));

  return (
    <>
      <PageHero
        eyebrow={t.hero.eyebrow}
        title={t.hero.title}
        lead={<p>{t.hero.lead}</p>}
        aside={
          <div>
            <PhotoFrame photo={photos.studioMicrophone} sizes="(min-width: 1024px) 560px, 100vw" aspect="aspect-[16/9]" priority />
            <div className="relative mx-4 -mt-16 rounded-2xl border border-line bg-surface p-7 shadow-[0_24px_60px_-30px_rgb(14_23_38/0.35)] sm:mx-8">
              <Badge tone="brass">{t.status.badge}</Badge>
              <ul className="mt-5 flex flex-col gap-3">
                {t.status.items.map((s) => (
                  <li key={s.label} className="flex items-center justify-between gap-4 text-[15px]">
                    <span className="text-ink">{s.label}</span>
                    {s.live ? (
                      <span className="flex shrink-0 items-center gap-1.5 text-sm whitespace-nowrap text-good">
                        <CheckCircle2 className="size-4" aria-hidden /> {t.status.available}
                      </span>
                    ) : (
                      <span className="flex shrink-0 items-center gap-1.5 text-sm whitespace-nowrap text-muted">
                        <CircleDashed className="size-4" aria-hidden /> {t.status.inDevelopment}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        }
      >
        <ButtonLink href="#early-access" size="lg" trackLocation="ai_hero">
          {t.hero.join}
        </ButtonLink>
        <ButtonLink href={common.ctas.assessment.href} size="lg" variant="secondary" trackLocation="ai_hero">
          {common.ctas.assessment.label}
        </ButtonLink>
      </PageHero>

      <AiPracticeSection locale={locale} showCta={false} />

      <Section tone="surface">
        <Container>
          <SectionHeading eyebrow={t.examples.eyebrow} title={t.examples.title} lead={t.examples.lead} />
          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {examples.map((s) => (
              <article key={s.id} className="rounded-2xl border border-line bg-paper p-7">
                <p className="text-xs font-medium tracking-[0.16em] text-brass uppercase">{categoryLabels[s.category]}</p>
                <h3 className="mt-3 font-serif text-2xl text-ink">{s.title}</h3>
                <p className="mt-2 text-[15.5px] text-ink-2">{locale === "es" ? `«${s.situation}»` : `“${s.situation}”`}</p>
                <p className="mt-5 text-sm text-muted">
                  {t.examples.counterpart} {s.counterpart}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="paper">
        <Container>
          <div className="flex flex-col gap-4">
            <Badge tone="caution" className="self-start">
              {t.pipeline.badge}
            </Badge>
            <SectionHeading title={t.pipeline.title} />
          </div>
          <ol className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {t.pipeline.steps.map((p, i) => (
              <li key={p.title} className="bg-surface p-6">
                <span className="text-sm text-faint tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-4 font-medium text-ink">{p.title}</h3>
                <p className="mt-1.5 text-[14.5px] leading-relaxed text-muted">{p.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <HumanAiSection locale={locale} />

      <Section tone="surface" id="early-access" className="scroll-mt-20">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <SectionHeading eyebrow={t.earlyAccess.eyebrow} title={t.earlyAccess.title} lead={<p>{t.earlyAccess.lead}</p>} />
          <div className="rounded-2xl border border-line bg-paper p-7 md:p-9">
            <EarlyAccessForm location="ai_coach_page" />
          </div>
        </Container>
      </Section>

      <CtaBand locale={locale} title={t.cta.title} lead={t.cta.lead} secondary="none" location="ai_footer_cta" />
    </>
  );
}

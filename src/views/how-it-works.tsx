import type { Metadata } from "next";
import { CtaBand, HumanAiSection, JourneyFlow, PageHero } from "@/components/marketing/sections";
import { ButtonLink } from "@/components/ui/button";
import { PhotoFrame } from "@/components/ui/photo";
import { Container, Section, SectionHeading } from "@/components/ui/primitives";
import { commonCopy } from "@/content/i18n/common";
import { marketingContent } from "@/content/marketing";
import { howItWorksCopy } from "@/content/pages/how-it-works";
import { photos } from "@/content/photos";
import type { Locale } from "@/i18n/config";
import { pageMetadata } from "@/lib/seo";

export function howItWorksMetadata(locale: Locale): Metadata {
  const t = howItWorksCopy[locale].meta;
  return pageMetadata({ title: t.title, description: t.description, path: "/how-it-works", locale });
}

export function HowItWorksPage({ locale }: { locale: Locale }) {
  const t = howItWorksCopy[locale];
  const common = commonCopy[locale];
  const { processSteps } = marketingContent[locale];

  return (
    <>
      <PageHero
        eyebrow={t.hero.eyebrow}
        aside={<PhotoFrame photo={photos.penNotebook} sizes="(min-width: 1024px) 560px, 100vw" priority />}
        title={t.hero.title}
        lead={<p>{t.hero.lead}</p>}
      >
        <ButtonLink href={common.ctas.assessment.href} size="lg" trackLocation="how_hero">
          {common.ctas.assessment.label}
        </ButtonLink>
      </PageHero>

      <Section tone="surface">
        <Container>
          <JourneyFlow locale={locale} />
          <ol className="mt-14 flex flex-col">
            {processSteps.map((step) => (
              <li key={step.number} className="grid gap-6 border-t border-line py-10 md:grid-cols-[120px_1fr_1.2fr] md:gap-10">
                <span className="font-serif text-5xl text-brass">{step.number}</span>
                <div>
                  <h2 className="font-serif text-3xl text-ink">{step.title}</h2>
                  <p className="mt-3 text-[15.5px] leading-relaxed text-muted">{step.body}</p>
                </div>
                <ul className="flex flex-col gap-3 md:pt-2">
                  {t.details[step.key].map((d) => (
                    <li key={d} className="flex gap-3 text-[15px] text-ink-2">
                      <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-data" />
                      {d}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <HumanAiSection locale={locale} />

      <Section tone="paper">
        <Container>
          <SectionHeading eyebrow={t.measuring.eyebrow} title={t.measuring.title} lead={t.measuring.lead} />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {t.measuring.items.map((m) => (
              <div key={m.title} className="rounded-2xl border border-line bg-surface p-6">
                <h3 className="font-medium text-ink">{m.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">{m.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <CtaBand locale={locale} location="how_footer_cta" />
    </>
  );
}

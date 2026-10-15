import type { Metadata } from "next";
import { ArrowRight, Check } from "lucide-react";
import { ProgramCard } from "@/components/marketing/program-card";
import { ComparisonSection, CtaBand, PageHero, ProcessSection } from "@/components/marketing/sections";
import { ButtonLink } from "@/components/ui/button";
import { LocaleLink } from "@/components/ui/locale-link";
import { PhotoFrame } from "@/components/ui/photo";
import { Container, JsonLd, Section, SectionHeading } from "@/components/ui/primitives";
import { commonCopy } from "@/content/i18n/common";
import { marketingContent } from "@/content/marketing";
import { executivesCopy } from "@/content/pages/executives";
import { photos } from "@/content/photos";
import { localizeProgram } from "@/content/programs";
import type { Locale } from "@/i18n/config";
import { services } from "@/lib/services";
import { pageMetadata, serviceJsonLd } from "@/lib/seo";

export function executivesMetadata(locale: Locale): Metadata {
  const t = executivesCopy[locale].meta;
  return pageMetadata({ title: t.title, description: t.description, path: "/executives", locale, keywords: t.keywords });
}

export async function ExecutivesPage({ locale }: { locale: Locale }) {
  const t = executivesCopy[locale];
  const common = commonCopy[locale];
  const { audiences, executiveOutcomes, pressureSituations, preparationMoments } = marketingContent[locale];
  const programs = (await services.pricing.listPrograms())
    .filter((p) => p.slug === "executive-performance" || p.slug === "executive-advisory")
    .map((p) => localizeProgram(p, locale));

  return (
    <>
      <JsonLd data={serviceJsonLd(t.meta.serviceName, t.meta.description, "/executives", locale)} />
      <PageHero
        eyebrow={t.hero.eyebrow}
        aside={<PhotoFrame photo={photos.presentingLeadership} sizes="(min-width: 1024px) 560px, 100vw" priority />}
        title={t.hero.title}
        lead={<p>{t.hero.lead}</p>}
      >
        <ButtonLink href={common.ctas.assessment.href} size="lg" trackLocation="executives_hero">
          {common.ctas.assessment.label}
        </ButtonLink>
        <ButtonLink href="#programs" size="lg" variant="secondary">
          {t.hero.secondary}
        </ButtonLink>
      </PageHero>

      <Section tone="surface">
        <Container className="grid gap-14 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <SectionHeading eyebrow={t.who.eyebrow} title={t.who.title} lead={<p>{t.who.lead}</p>} />
            <ul className="mt-8 flex flex-wrap gap-2">
              {audiences.map((a) => (
                <li key={a} className="rounded-full border border-line px-3.5 py-1.5 text-sm text-ink-2">
                  {a}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-line bg-paper p-7 md:p-9">
            <p className="text-sm font-medium text-muted">{t.who.outcomesTitle}</p>
            <ul className="mt-5 grid gap-3.5 sm:grid-cols-2">
              {executiveOutcomes.map((o) => (
                <li key={o} className="flex gap-3 text-[15px] text-ink">
                  <Check className="mt-0.5 size-4 shrink-0 text-data" aria-hidden />
                  {o}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      <Section tone="paper">
        <Container>
          <SectionHeading eyebrow={t.situations.eyebrow} title={t.situations.title} lead={t.situations.lead} />
          <div className="mt-14 grid gap-5 lg:grid-cols-2">
            <div className="rounded-2xl border border-line bg-surface p-7">
              <p className="text-sm font-medium text-muted">{t.situations.listTitle}</p>
              <ul className="mt-4 divide-y divide-line">
                {pressureSituations.map((s) => (
                  <li key={s.title} className="flex flex-col gap-0.5 py-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                    <span className="text-ink">{s.title}</span>
                    <span className="text-sm text-muted sm:text-right">{s.detail}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-line bg-surface p-7">
              <p className="text-sm font-medium text-muted">{t.situations.momentsTitle}</p>
              <ul className="mt-4 divide-y divide-line">
                {preparationMoments.map((m) => (
                  <li key={m} className="py-3 text-ink">
                    {m}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm leading-relaxed text-muted">{t.situations.momentsNote}</p>
            </div>
          </div>
        </Container>
      </Section>

      <ComparisonSection locale={locale} tone="surface" />
      <ProcessSection locale={locale} tone="paper" />

      <Section tone="surface" id="programs">
        <Container>
          <SectionHeading eyebrow={t.programs.eyebrow} title={t.programs.title} />
          <div className="mt-14 grid gap-5 lg:grid-cols-2">
            {programs.map((p) => (
              <ProgramCard key={p.id} program={p} location="executives" emphasis={p.featured} />
            ))}
          </div>
          <p className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-1 text-[15px] text-ink-2">
            {t.beginners.text}
            <LocaleLink href="/beginners" className="inline-flex items-center gap-1.5 font-medium text-ink hover:text-harbor-600">
              {t.beginners.link} <ArrowRight className="size-4" aria-hidden />
            </LocaleLink>
          </p>
        </Container>
      </Section>

      <CtaBand locale={locale} location="executives_footer_cta" secondary="none" />
    </>
  );
}

import type { Metadata } from "next";
import { ArrowRight, Lock } from "lucide-react";
import { ProgramCard } from "@/components/marketing/program-card";
import { CtaBand, PageHero } from "@/components/marketing/sections";
import { ButtonLink } from "@/components/ui/button";
import { Meter } from "@/components/ui/charts";
import { LocaleLink } from "@/components/ui/locale-link";
import { PhotoFrame } from "@/components/ui/photo";
import { Badge, Container, JsonLd, Section, SectionHeading } from "@/components/ui/primitives";
import { commonCopy } from "@/content/i18n/common";
import { marketingContent } from "@/content/marketing";
import { companiesCopy } from "@/content/pages/companies";
import { photos } from "@/content/photos";
import { localizeProgram } from "@/content/programs";
import type { Locale } from "@/i18n/config";
import { services } from "@/lib/services";
import { pageMetadata, serviceJsonLd } from "@/lib/seo";

export function companiesMetadata(locale: Locale): Metadata {
  const t = companiesCopy[locale].meta;
  return pageMetadata({ title: t.title, description: t.description, path: "/companies", locale, keywords: t.keywords });
}

export async function CompaniesPage({ locale }: { locale: Locale }) {
  const t = companiesCopy[locale];
  const common = commonCopy[locale];
  const { corporateBuyers, corporateNeeds, metricLabels } = marketingContent[locale];
  const programs = (await services.pricing.listPrograms()).map((p) => localizeProgram(p, locale));
  const corporate = programs.filter((p) => p.audience === "b2b");
  const cohort = await services.companies.getCohortMetrics("preview");

  return (
    <>
      <JsonLd data={serviceJsonLd(t.meta.serviceName, t.meta.description, "/companies", locale)} />
      <PageHero
        eyebrow={t.hero.eyebrow}
        aside={<PhotoFrame photo={photos.whiteboardTeam} sizes="(min-width: 1024px) 560px, 100vw" priority />}
        title={t.hero.title}
        lead={<p>{t.hero.lead}</p>}
      >
        <ButtonLink href={common.ctas.proposal.href} size="lg" trackLocation="companies_hero">
          {common.ctas.proposal.label}
        </ButtonLink>
        <ButtonLink href="#program" size="lg" variant="secondary">
          {t.hero.secondary}
        </ButtonLink>
      </PageHero>

      <Section tone="surface">
        <Container className="grid gap-14 lg:grid-cols-[1fr_1.1fr]">
          <SectionHeading eyebrow={t.why.eyebrow} title={t.why.title} lead={<p>{t.why.lead}</p>} />
          <div className="rounded-2xl border border-line bg-paper p-7 md:p-9">
            <p className="text-sm font-medium text-muted">{t.why.needsTitle}</p>
            <ul className="mt-5 grid gap-x-6 gap-y-3 sm:grid-cols-2">
              {corporateNeeds.map((n) => (
                <li key={n} className="flex items-center gap-2.5 text-[15px] text-ink">
                  <span aria-hidden className="size-1.5 rounded-full bg-brass" />
                  {n}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      <Section tone="paper" id="program">
        <Container>
          <SectionHeading eyebrow={t.program.eyebrow} title={t.program.title} lead={t.program.lead} />
          <ol className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-4">
            {t.program.phases.map((p, i) => (
              <li key={p.title} className="bg-surface p-7">
                <span className="text-sm text-faint tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-6 text-lg font-medium text-ink">{p.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">{p.body}</p>
              </li>
            ))}
          </ol>

          <div className="mt-14 grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-center">
            <div>
              <h3 className="font-serif text-3xl text-ink">{t.program.visibilityTitle}</h3>
              <p className="mt-4 text-[15.5px] leading-relaxed text-muted">{t.program.visibilityBody}</p>
              <p className="mt-6 flex items-center gap-2 text-sm text-ink-2">
                <Lock className="size-4 text-brass" aria-hidden /> {t.program.confidential}
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <ButtonLink href="/company" variant="secondary" trackLocation="companies_dashboard_preview">
                  {t.program.preview} <ArrowRight className="size-4" aria-hidden />
                </ButtonLink>
                {t.program.previewNote && <span className="text-sm text-muted">{t.program.previewNote}</span>}
              </div>
            </div>
            <figure className="rounded-2xl border border-line bg-surface p-6 shadow-[0_30px_80px_-40px_rgb(14_23_38/0.3)] md:p-8">
              <figcaption className="flex items-center justify-between gap-3">
                <span className="text-sm font-medium text-ink">{t.program.cohortTitle}</span>
                <Badge tone="brass">{t.program.cohortBadge}</Badge>
              </figcaption>
              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                {cohort.map((m) => (
                  <Meter key={m.key} label={metricLabels[m.key]} value={m.value} previous={m.previous} size="sm" />
                ))}
              </div>
              <p className="mt-6 border-t border-line pt-4 text-xs text-muted">{t.program.cohortNote}</p>
            </figure>
          </div>
        </Container>
      </Section>

      <Section tone="surface">
        <Container>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading eyebrow={t.options.eyebrow} title={t.options.title} />
          </div>
          <div className="mt-14 grid gap-5 lg:grid-cols-2">
            {corporate.map((p) => (
              <ProgramCard key={p.id} program={p} location="companies" emphasis={p.slug === "corporate-program"} />
            ))}
          </div>
          <p className="mt-6 text-sm text-muted">{t.options.note}</p>
          <p className="mt-3 text-sm text-muted">
            {t.beginners}{" "}
            <LocaleLink href="/beginners" className="font-medium text-ink underline underline-offset-2 hover:text-harbor-600">
              {t.beginnersLink}
            </LocaleLink>
          </p>
        </Container>
      </Section>

      <Section tone="paper">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <SectionHeading eyebrow={t.buyers.eyebrow} title={t.buyers.title} />
          <div>
            <ul className="flex flex-wrap gap-2">
              {corporateBuyers.map((b) => (
                <li key={b} className="rounded-full border border-line-strong bg-surface px-4 py-2 text-[15px] text-ink">
                  {b}
                </li>
              ))}
            </ul>
            <p className="mt-8 max-w-2xl text-[15.5px] leading-relaxed text-muted">{t.buyers.body}</p>
          </div>
        </Container>
      </Section>

      <CtaBand
        locale={locale}
        title={t.cta.title}
        lead={t.cta.lead}
        primary="proposal"
        secondary="none"
        location="companies_footer_cta"
      />
    </>
  );
}

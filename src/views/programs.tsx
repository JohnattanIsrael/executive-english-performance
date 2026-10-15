import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ArrowRight, Check } from "lucide-react";
import { CtaBand, PageHero } from "@/components/marketing/sections";
import { ButtonLink } from "@/components/ui/button";
import { LocaleLink } from "@/components/ui/locale-link";
import { PhotoFrame } from "@/components/ui/photo";
import { Badge, Container, Section } from "@/components/ui/primitives";
import { commonCopy } from "@/content/i18n/common";
import { beginnersCopy } from "@/content/pages/beginners";
import { programsCopy } from "@/content/pages/programs";
import { photos } from "@/content/photos";
import { localizeProgram } from "@/content/programs";
import type { Locale } from "@/i18n/config";
import { services } from "@/lib/services";
import type { Program } from "@/lib/types";
import { pageMetadata } from "@/lib/seo";
import { formatPrice } from "@/lib/utils";

export function programsMetadata(locale: Locale): Metadata {
  const t = programsCopy[locale].meta;
  return pageMetadata({ title: t.title, description: t.description, path: "/programs", locale, keywords: t.keywords });
}

function ProgramDetail({
  program,
  locale,
  children,
  tone = "surface",
}: {
  program: Program;
  locale: Locale;
  children?: ReactNode;
  tone?: "surface" | "paper" | "ink";
}) {
  const t = commonCopy[locale].program;
  const price = formatPrice(program.price, locale);
  const dark = tone === "ink";
  return (
    <Section tone={tone} id={program.slug} className="scroll-mt-16">
      <Container className="grid gap-12 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <div className="flex flex-wrap gap-2">
            <Badge tone={dark ? "inverse" : "brass"}>{program.duration}</Badge>
            {program.status === "coming_soon" && <Badge tone={dark ? "inverse" : "caution"}>{t.inDevelopment}</Badge>}
          </div>
          <h2 className={`display mt-6 text-4xl leading-[1.08] md:text-5xl ${dark ? "text-paper" : "text-ink"}`}>{program.name}</h2>
          <p className={`mt-5 text-lg leading-relaxed ${dark ? "text-paper/75" : "text-ink-2"}`}>{program.description}</p>
          <div className={`mt-8 border-t pt-6 ${dark ? "border-paper/15" : "border-line"}`}>
            <p className={`text-2xl font-semibold ${dark ? "text-paper" : "text-ink"}`}>
              {price.amount}
              {price.period && <span className={`ml-1 text-base font-normal ${dark ? "text-paper/60" : "text-muted"}`}>/ {price.period}</span>}
            </p>
            {program.priceNote && <p className={`mt-1 text-sm ${dark ? "text-paper/60" : "text-muted"}`}>{program.priceNote}</p>}
          </div>
          <ButtonLink href={program.cta.href} variant={dark ? "inverse" : "primary"} size="lg" className="mt-8" trackLocation={`programs_${program.slug}`}>
            {program.cta.label}
          </ButtonLink>
        </div>
        <div className="flex flex-col gap-8">
          <div>
            <p className={`text-sm font-medium ${dark ? "text-paper/60" : "text-muted"}`}>{t.included}</p>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {program.includes.map((item) => (
                <li key={item} className={`flex gap-3 text-[15px] ${dark ? "text-paper/85" : "text-ink"}`}>
                  <Check className={`mt-0.5 size-4 shrink-0 ${dark ? "text-brass-light" : "text-data"}`} aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className={`text-sm font-medium ${dark ? "text-paper/60" : "text-muted"}`}>{t.idealFor}</p>
            <ul className="mt-3 flex flex-col gap-2">
              {program.idealFor.map((i) => (
                <li key={i} className={`text-[15px] ${dark ? "text-paper/75" : "text-ink-2"}`}>
                  — {i}
                </li>
              ))}
            </ul>
          </div>
          {children}
        </div>
      </Container>
    </Section>
  );
}

function Timeline({ title, rows }: { title: string; rows: { weeks: string; title: string; body: string }[] }) {
  return (
    <div className="rounded-2xl border border-line bg-paper p-6">
      <p className="text-sm font-medium text-muted">{title}</p>
      <ol className="mt-4 flex flex-col gap-4">
        {rows.map((w) => (
          <li key={w.weeks} className="grid grid-cols-[96px_1fr] gap-4">
            <span className="text-sm text-brass">{w.weeks}</span>
            <span>
              <span className="font-medium text-ink">{w.title}</span>
              <span className="block text-sm text-muted">{w.body}</span>
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}

export async function ProgramsPage({ locale }: { locale: Locale }) {
  const t = programsCopy[locale];
  const common = commonCopy[locale];
  const beginners = beginnersCopy[locale];
  const programs = (await services.pricing.listPrograms()).map((p) => localizeProgram(p, locale));
  const bySlug = (slug: string) => programs.find((p) => p.slug === slug)!;

  return (
    <>
      <PageHero
        eyebrow={t.hero.eyebrow}
        aside={<PhotoFrame photo={photos.handshake} sizes="(min-width: 1024px) 560px, 100vw" priority />}
        title={t.hero.title}
        lead={<p>{t.hero.lead}</p>}
      >
        <ButtonLink href={common.ctas.assessment.href} size="lg" trackLocation="programs_hero">
          {common.ctas.assessment.label}
        </ButtonLink>
        <ButtonLink href="/pricing" size="lg" variant="secondary">
          {t.hero.compare}
        </ButtonLink>
      </PageHero>

      <ProgramDetail program={bySlug("executive-performance")} locale={locale}>
        <Timeline title={t.twelveWeeks.title} rows={t.twelveWeeks.phases} />
        <p className="text-sm leading-relaxed text-muted">{t.twelveWeeks.note}</p>
      </ProgramDetail>

      <ProgramDetail program={bySlug("executive-fast-track")} locale={locale} tone="paper">
        <Timeline
          title={t.fastTrack.title}
          rows={beginners.plan.phases.map((p) => ({ weeks: p.weeks, title: p.title, body: p.summary }))}
        />
        <LocaleLink href="/beginners" className="inline-flex items-center gap-2 text-[15px] font-medium text-ink hover:text-harbor-600">
          {t.fastTrack.link} <ArrowRight className="size-4" aria-hidden />
        </LocaleLink>
      </ProgramDetail>

      <ProgramDetail program={bySlug("executive-advisory")} locale={locale} tone="ink" />

      <ProgramDetail program={bySlug("ai-communication-coach")} locale={locale} />

      <Section tone="paper">
        <Container>
          <div className="flex flex-col items-start justify-between gap-8 rounded-2xl border border-line bg-surface p-8 md:flex-row md:items-center md:p-10">
            <div>
              <p className="eyebrow">{t.companies.eyebrow}</p>
              <h2 className="mt-3 font-serif text-3xl text-ink">{t.companies.title}</h2>
              <p className="mt-2 max-w-xl text-muted">{t.companies.body}</p>
            </div>
            <LocaleLink href="/companies" className="inline-flex items-center gap-2 font-medium text-ink hover:text-harbor-600">
              {t.companies.link} <ArrowRight className="size-4" aria-hidden />
            </LocaleLink>
          </div>
        </Container>
      </Section>

      <CtaBand locale={locale} location="programs_footer_cta" />
    </>
  );
}

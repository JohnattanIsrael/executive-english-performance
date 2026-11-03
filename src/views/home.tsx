import type { Metadata } from "next";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { TrackOnMount } from "@/components/analytics/track-event";
import { FaqList } from "@/components/marketing/faq-list";
import { HeroVisual } from "@/components/marketing/hero-visual";
import { ProgramCard } from "@/components/marketing/program-card";
import {
  AiPracticeSection,
  BeginnersSection,
  ComparisonSection,
  CtaBand,
  HumanAiSection,
  PhotoBand,
  ProblemSection,
  ProcessSection,
} from "@/components/marketing/sections";
import { ButtonLink } from "@/components/ui/button";
import { LocaleLink } from "@/components/ui/locale-link";
import { PhotoFrame } from "@/components/ui/photo";
import { Container, JsonLd, PlaceholderNote, Section, SectionHeading } from "@/components/ui/primitives";
import { faqContent } from "@/content/faq";
import { commonCopy } from "@/content/i18n/common";
import { marketingContent } from "@/content/marketing";
import { homeCopy } from "@/content/pages/home";
import { photos } from "@/content/photos";
import { localizeProgram } from "@/content/programs";
import type { Locale } from "@/i18n/config";
import { services } from "@/lib/services";
import { organizationJsonLd, pageMetadata } from "@/lib/seo";
import { formatPrice } from "@/lib/utils";

const homeFaqs = ["english-course", "advanced-english", "ai-replacing", "multiple-employees"];

export function homeMetadata(locale: Locale): Metadata {
  const t = homeCopy[locale].meta;
  return pageMetadata({ title: t.title, description: t.description, path: "/", locale, absoluteTitle: true });
}

export async function HomePage({ locale }: { locale: Locale }) {
  const t = homeCopy[locale];
  const common = commonCopy[locale];
  const { audiences, corporateNeeds } = marketingContent[locale];
  const programs = (await services.pricing.listPrograms()).map((p) => localizeProgram(p, locale));
  const featured = ["executive-performance", "executive-advisory", "corporate-program"]
    .map((slug) => programs.find((p) => p.slug === slug))
    .filter((p) => p !== undefined);
  const corporate = programs.filter((p) => p.audience === "b2b");

  return (
    <>
      <TrackOnMount event="landing_page_view" properties={{ path: "/", locale }} />
      <JsonLd data={organizationJsonLd(locale)} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-paper">
        <div aria-hidden className="absolute inset-0 hairline-grid [mask-image:linear-gradient(to_bottom,black_20%,transparent_90%)]" />
        <Container className="relative grid items-center gap-16 pt-14 pb-24 md:pt-20 lg:grid-cols-[1.08fr_1fr] lg:gap-12 lg:pb-32">
          <div className="animate-rise">
            <LocaleLink
              href="/learn"
              className="group mb-8 inline-flex max-w-full items-center gap-3 rounded-full border border-line-strong bg-surface py-1.5 pr-4 pl-1.5 text-sm text-ink-2 shadow-[0_8px_24px_-16px_rgb(14_23_38/0.4)] transition-colors hover:border-ink"
            >
              <span className="rounded-full bg-good px-2.5 py-0.5 text-xs font-semibold text-white">{t.hero.beginnerPill.tag}</span>
              <span className="truncate">{t.hero.beginnerPill.label}</span>
              <ArrowRight className="size-4 shrink-0 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </LocaleLink>
            <p className="eyebrow mb-6">{t.hero.eyebrow}</p>
            <h1 className="display text-[2.75rem] leading-[1.02] text-ink sm:text-6xl lg:text-[3.9rem] xl:text-[4.3rem]">
              {t.hero.title[0]} <span className="text-ink-2 italic">{t.hero.title[1]}</span>
            </h1>
            <p className="prose-lead mt-8 max-w-xl">{t.hero.lead}</p>
            <div className="mt-10 flex flex-wrap gap-3">
              <ButtonLink href={common.ctas.assessment.href} size="lg" trackLocation="hero">
                {common.ctas.assessment.label}
              </ButtonLink>
              <ButtonLink href="/programs" size="lg" variant="secondary" trackLocation="hero">
                {t.hero.secondary}
              </ButtonLink>
            </div>
            <p className="mt-10 max-w-xl text-sm leading-relaxed text-muted">
              <span className="text-ink-2">{t.hero.audiencesPrefix}</span>
              {audiences.join(" · ")}
              <span className="text-ink-2">{t.hero.audiencesSuffix}</span>
            </p>
          </div>
          <HeroVisual locale={locale} />
        </Container>
      </section>

      <BeginnersSection locale={locale} />

      {/* Primary message */}
      <section className="border-y border-line bg-surface py-16 md:py-20">
        <Container className="grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:items-end">
          <p className="display text-3xl leading-[1.15] text-ink md:text-[2.6rem]">{common.site.primaryMessage}</p>
          <p className="text-[15.5px] leading-relaxed text-muted">{common.site.supportingMessage}</p>
        </Container>
      </section>

      <ProblemSection locale={locale} />
      <ComparisonSection locale={locale} />
      <PhotoBand photo={photos.auditorium} eyebrow={t.photoBand.eyebrow} title={t.photoBand.title} body={t.photoBand.body} />
      <ProcessSection locale={locale} />
      <HumanAiSection locale={locale} />
      <AiPracticeSection locale={locale} />

      {/* Programs */}
      <Section tone="surface">
        <Container>
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <SectionHeading eyebrow={t.programs.eyebrow} title={t.programs.title} lead={t.programs.lead} />
            <ButtonLink href="/pricing" variant="secondary" trackLocation="home_programs">
              {t.programs.compare}
            </ButtonLink>
          </div>
          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {featured.map((p) => (
              <ProgramCard key={p.id} program={p} location="home" compact emphasis={p.slug === "executive-performance"} />
            ))}
          </div>
        </Container>
      </Section>

      {/* Companies */}
      <Section tone="surface">
        <Container className="grid gap-14 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <SectionHeading eyebrow={t.companies.eyebrow} title={t.companies.title} lead={<p>{t.companies.lead}</p>} />
            <div className="mt-9 flex flex-wrap gap-3">
              <ButtonLink href={common.ctas.proposal.href} trackLocation="home_companies">
                {common.ctas.proposal.label}
              </ButtonLink>
              <ButtonLink href="/companies" variant="secondary" trackLocation="home_companies">
                {t.companies.secondary}
              </ButtonLink>
            </div>
          </div>
          <div className="flex flex-col">
            <PhotoFrame photo={photos.meetingTable} sizes="(min-width: 1024px) 560px, 100vw" aspect="aspect-[16/9]" className="rounded-b-none" />
            <div className="rounded-2xl rounded-t-none border border-t-0 border-line bg-paper p-7 md:p-9">
              <p className="text-sm font-medium text-ink">{t.companies.needsTitle}</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {corporateNeeds.map((n) => (
                  <li key={n} className="rounded-full border border-line px-3.5 py-1.5 text-sm text-ink-2">
                    {n}
                  </li>
                ))}
              </ul>
              <div className="mt-8 grid gap-4 border-t border-line pt-6 sm:grid-cols-2">
                {corporate.map((p) => (
                  <div key={p.id}>
                    <p className="font-serif text-2xl text-ink">{p.slug === "corporate-pilot" ? t.companies.pilot : t.companies.annual}</p>
                    <p className="mt-1 text-sm text-muted">
                      {p.duration} · {p.price.display === "custom" ? t.companies.custom : formatPrice(p.price, locale).amount}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Experience */}
      <Section tone="paper">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <div className="relative aspect-[4/5] max-h-[520px] overflow-hidden rounded-2xl border border-line bg-paper-2">
            <div aria-hidden className="absolute inset-0 hairline-grid" />
            <div className="absolute inset-x-6 bottom-6">
              <PlaceholderNote>{t.experience.portrait}</PlaceholderNote>
            </div>
          </div>
          <div>
            <SectionHeading eyebrow={t.experience.eyebrow} title={t.experience.title} lead={<p>{t.experience.lead}</p>} />
            <PlaceholderNote className="mt-8 max-w-xl">{t.experience.placeholder}</PlaceholderNote>
            <LocaleLink href="/about" className="mt-8 inline-flex items-center gap-2 text-[15px] font-medium text-ink hover:text-harbor-600">
              {t.experience.link} <ArrowRight className="size-4" aria-hidden />
            </LocaleLink>
          </div>
        </Container>
      </Section>

      {/* FAQ */}
      <Section tone="surface">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.6fr]">
          <div>
            <SectionHeading eyebrow={t.faq.eyebrow} title={t.faq.title} />
            <LocaleLink href="/faq" className="mt-8 inline-flex items-center gap-2 text-[15px] font-medium text-ink hover:text-harbor-600">
              {t.faq.link} <ArrowUpRight className="size-4" aria-hidden />
            </LocaleLink>
          </div>
          <FaqList items={faqContent[locale].filter((f) => homeFaqs.includes(f.id))} />
        </Container>
      </Section>

      <CtaBand locale={locale} location="home_footer_cta" photo={photos.bostonDusk} />
    </>
  );
}

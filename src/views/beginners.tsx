import type { Metadata } from "next";
import { ArrowRight, Check, Minus } from "lucide-react";
import { FaqList } from "@/components/marketing/faq-list";
import { ProgramCard } from "@/components/marketing/program-card";
import { CtaBand, PageHero } from "@/components/marketing/sections";
import { ButtonLink } from "@/components/ui/button";
import { LocaleLink } from "@/components/ui/locale-link";
import { PhotoFrame } from "@/components/ui/photo";
import { Container, JsonLd, Section, SectionHeading } from "@/components/ui/primitives";
import { lessons } from "@/content/lessons";
import { beginnersCopy } from "@/content/pages/beginners";
import { photos } from "@/content/photos";
import { localizeProgram } from "@/content/programs";
import type { Locale } from "@/i18n/config";
import { services } from "@/lib/services";
import { faqJsonLd, pageMetadata, serviceJsonLd } from "@/lib/seo";

const applyHref = "/book?program=executive-fast-track";

export function beginnersMetadata(locale: Locale): Metadata {
  const t = beginnersCopy[locale].meta;
  return pageMetadata({ title: t.title, description: t.description, path: "/beginners", locale, keywords: t.keywords });
}

/** Executive Fast Track for beginners — spec 002. */
export async function BeginnersPage({ locale }: { locale: Locale }) {
  const t = beginnersCopy[locale];
  const program = (await services.pricing.listPrograms())
    .map((p) => localizeProgram(p, locale))
    .find((p) => p.slug === "executive-fast-track");

  return (
    <>
      <JsonLd data={serviceJsonLd(t.meta.serviceName, t.meta.description, "/beginners", locale)} />
      <JsonLd data={faqJsonLd(t.faq.items, locale)} />

      <PageHero
        eyebrow={t.hero.eyebrow}
        title={
          <>
            {t.hero.title[0]} <span className="text-ink-2 italic">{t.hero.title[1]}</span>
          </>
        }
        lead={<p>{t.hero.lead}</p>}
        aside={
          <div>
            <PhotoFrame photo={photos.notebookPens} sizes="(min-width: 1024px) 560px, 100vw" aspect="aspect-[16/10]" priority />
            <dl className="relative mx-4 -mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line shadow-[0_24px_60px_-30px_rgb(14_23_38/0.35)] sm:mx-8">
              {t.hero.facts.map((f) => (
                <div key={f.label} className="bg-surface px-5 py-4">
                  <dt className="text-xs text-muted">{f.label}</dt>
                  <dd className="mt-1 font-medium text-ink">{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        }
      >
        <ButtonLink href={applyHref} size="lg" trackLocation="beginners_hero">
          {t.hero.apply}
        </ButtonLink>
        <ButtonLink href="#plan" size="lg" variant="secondary">
          {t.hero.secondary}
        </ButtonLink>
      </PageHero>

      {/* Free lessons — spec 003 */}
      <section className="border-b border-line bg-paper py-14 md:py-16">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:items-center">
          <div>
            <p className="eyebrow mb-4">{t.free.eyebrow}</p>
            <h2 className="display text-3xl leading-[1.1] text-ink md:text-[2.6rem]">{t.free.title}</h2>
            <p className="mt-5 max-w-xl text-[15.5px] leading-relaxed text-muted">{t.free.body}</p>
            <div className="mt-7">
              <ButtonLink href="/learn" trackLocation="beginners_free_lessons">
                {t.free.cta} <ArrowRight className="size-4" aria-hidden />
              </ButtonLink>
            </div>
          </div>
          <ul className="grid gap-2.5 sm:grid-cols-2">
            {lessons.map((l, i) => (
              <li key={l.id} className={i === 0 ? "sm:col-span-2" : undefined}>
                <LocaleLink
                  href={`/learn#${l.id}`}
                  className="group flex items-center gap-4 rounded-2xl border border-line bg-surface p-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_20px_40px_-28px_rgb(14_23_38/0.45)]"
                >
                  <span
                    aria-hidden
                    className="flex size-12 shrink-0 items-center justify-center rounded-xl text-2xl transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6"
                    style={{ background: l.accent.soft }}
                  >
                    {l.emoji}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[15px] leading-snug font-medium text-ink">{l.title[locale]}</span>
                    <span className="mt-0.5 block text-sm text-muted">{l.minutes} min</span>
                  </span>
                </LocaleLink>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Is this for you? */}
      <Section tone="surface">
        <Container>
          <SectionHeading eyebrow={t.fit.eyebrow} title={t.fit.title} lead={t.fit.lead} />
          <div className="mt-14 grid gap-5 lg:grid-cols-[1.3fr_1fr]">
            <div className="rounded-2xl border border-line bg-paper p-7 md:p-9">
              <p className="text-sm font-medium text-muted">{t.fit.yesTitle}</p>
              <ul className="mt-5 flex flex-col gap-3.5">
                {t.fit.yes.map((item) => (
                  <li key={item} className="flex gap-3 text-[15.5px] text-ink">
                    <Check className="mt-1 size-4 shrink-0 text-data" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-line p-7 md:p-9">
              <p className="text-sm font-medium text-muted">{t.fit.noTitle}</p>
              <ul className="mt-5 flex flex-col gap-3.5">
                {t.fit.no.map((item) => (
                  <li key={item} className="flex gap-3 text-[15px] text-muted">
                    <Minus className="mt-1 size-4 shrink-0 text-faint" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="mt-6 max-w-3xl border-l-2 border-brass pl-5 text-sm leading-relaxed text-ink-2">{t.fit.levelNote}</p>
        </Container>
      </Section>

      {/* Outcomes */}
      <Section tone="paper">
        <Container>
          <SectionHeading eyebrow={t.outcomes.eyebrow} title={t.outcomes.title} lead={t.outcomes.lead} />
          <ul className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {t.outcomes.items.map((o) => (
              <li key={o.title} className="bg-surface p-7">
                <h3 className="font-medium text-ink">{o.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">{o.body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* 8-week plan */}
      <Section tone="ink" id="plan" className="relative scroll-mt-16 overflow-hidden">
        <div aria-hidden className="absolute inset-0 hairline-grid-inverse [mask-image:linear-gradient(to_bottom,black,transparent)]" />
        <Container className="relative">
          <SectionHeading inverse eyebrow={t.plan.eyebrow} title={t.plan.title} />
          <ol className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {t.plan.phases.map((p) => (
              <li key={p.weeks} className="flex flex-col rounded-2xl border border-paper/10 bg-paper/[0.03] p-7">
                <span className="text-sm text-brass-light">{p.weeks}</span>
                <h3 className="mt-3 font-serif text-2xl text-paper">{p.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-paper/70">{p.summary}</p>
                <ul className="mt-6 flex flex-col gap-2.5 border-t border-paper/10 pt-5">
                  {p.details.map((d) => (
                    <li key={d} className="flex gap-2.5 text-[14.5px] text-paper/80">
                      <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-brass-light" />
                      {d}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      {/* Weekly rhythm */}
      <Section tone="paper">
        <Container>
          <SectionHeading eyebrow={t.rhythm.eyebrow} title={t.rhythm.title} />
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {t.rhythm.items.map((r) => (
              <div key={r.label} className="rounded-2xl border border-line bg-surface p-7">
                <p className="font-serif text-5xl text-brass">{r.value}</p>
                <p className="mt-4 font-medium text-ink">{r.label}</p>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">{r.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Program and path */}
      <Section tone="surface" id="program">
        <Container className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-start">
          {program && <ProgramCard program={program} location="beginners" emphasis />}
          <div className="flex flex-col gap-8">
            <SectionHeading eyebrow={t.program.eyebrow} title={t.program.title} />
            <div className="rounded-2xl border border-line bg-paper p-7">
              <p className="font-medium text-ink">{t.program.next.title}</p>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">{t.program.next.body}</p>
              <LocaleLink
                href="/programs#executive-performance"
                className="mt-5 inline-flex items-center gap-2 text-[15px] font-medium text-ink hover:text-harbor-600"
              >
                {t.program.next.link} <ArrowRight className="size-4" aria-hidden />
              </LocaleLink>
            </div>
          </div>
        </Container>
      </Section>

      {/* FAQ */}
      <Section tone="paper">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.6fr]">
          <SectionHeading eyebrow={t.faq.eyebrow} title={t.faq.title} />
          <FaqList items={t.faq.items} />
        </Container>
      </Section>

      <CtaBand
        locale={locale}
        title={t.cta.title}
        lead={t.cta.lead}
        primary={{ label: t.cta.apply, href: applyHref }}
        secondary={{ label: t.cta.proposal, href: "/proposal?program=corporate-pilot" }}
        location="beginners_footer_cta"
      />
    </>
  );
}

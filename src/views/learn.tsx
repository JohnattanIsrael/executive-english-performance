import type { Metadata } from "next";
import { ArrowRight, BookOpen, CircleCheck, Headphones, Sparkles, UserRound } from "lucide-react";
import { LessonLibrary, StartLessonLink } from "@/components/lessons/lesson-library";
import { LessonsHeroVisual } from "@/components/lessons/lessons-hero-visual";
import { CtaBand } from "@/components/marketing/sections";
import { ButtonLink } from "@/components/ui/button";
import { Container, JsonLd, Section, SectionHeading } from "@/components/ui/primitives";
import { lessons } from "@/content/lessons";
import { learnCopy } from "@/content/pages/learn";
import type { Locale } from "@/i18n/config";
import { absoluteUrl, pageMetadata } from "@/lib/seo";
import { localizePath } from "@/i18n/routes";

export function learnMetadata(locale: Locale): Metadata {
  const t = learnCopy[locale].meta;
  return pageMetadata({ title: t.title, description: t.description, path: "/learn", locale, keywords: t.keywords });
}

/** Free interactive lessons for beginners — spec 003. */
export function LearnPage({ locale }: { locale: Locale }) {
  const t = learnCopy[locale];
  const stepIcons = [BookOpen, Sparkles, CircleCheck];

  const courseJsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: t.meta.title,
    description: t.meta.description,
    inLanguage: "en",
    educationalLevel: "Beginner",
    isAccessibleForFree: true,
    url: absoluteUrl(localizePath("/learn", locale)),
    hasPart: lessons.map((l) => ({ "@type": "Course", name: l.title[locale], description: l.summary[locale], educationalLevel: "Beginner" })),
  };

  return (
    <>
      <JsonLd data={courseJsonLd} />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-line bg-paper">
        <div aria-hidden className="absolute inset-0 hairline-grid [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />
        <Container className="relative grid items-center gap-14 py-16 md:py-20 lg:grid-cols-[1.05fr_1fr]">
          <div className="max-w-2xl animate-rise">
            <p className="eyebrow mb-5">{t.hero.eyebrow}</p>
            <h1 className="display text-[2.6rem] leading-[1.04] text-ink sm:text-6xl lg:text-[3.6rem] xl:text-[4rem]">
              {t.hero.title[0]} <span className="text-ink-2 italic">{t.hero.title[1]}</span>
            </h1>
            <p className="prose-lead mt-7 max-w-xl">{t.hero.lead}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <StartLessonLink id={lessons[0].id}>{t.hero.start}</StartLessonLink>
              <ButtonLink href="#lessons" size="lg" variant="secondary">
                {t.hero.browse}
              </ButtonLink>
            </div>
            <ul className="mt-9 flex flex-wrap gap-2">
              {t.hero.facts.map((f) => (
                <li key={f} className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-surface px-3.5 py-1.5 text-sm text-ink-2">
                  <CircleCheck className="size-3.5 text-good" aria-hidden /> {f}
                </li>
              ))}
            </ul>
          </div>
          <div className="animate-rise [animation-delay:150ms]">
            <LessonsHeroVisual locale={locale} />
          </div>
        </Container>
      </section>

      {/* Library */}
      <Section tone="surface" id="lessons" className="scroll-mt-16">
        <Container>
          <SectionHeading eyebrow={t.library.eyebrow} title={t.library.title} lead={<p>{t.library.lead}</p>} />
          <div className="mt-12">
            <LessonLibrary />
          </div>
        </Container>
      </Section>

      {/* How it works */}
      <Section tone="paper">
        <Container>
          <SectionHeading eyebrow={t.how.eyebrow} title={t.how.title} />
          <ol className="mt-14 grid gap-5 md:grid-cols-3">
            {t.how.steps.map((s, i) => {
              const Icon = stepIcons[i];
              return (
                <li key={s.title} className="relative overflow-hidden rounded-2xl border border-line bg-surface p-7">
                  <span aria-hidden className="absolute -top-6 -right-2 font-serif text-[7rem] leading-none text-paper-2">
                    {i + 1}
                  </span>
                  <span className="relative inline-flex size-11 items-center justify-center rounded-full bg-ink text-paper">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <h3 className="relative mt-5 font-serif text-2xl text-ink">{s.title}</h3>
                  <p className="relative mt-2 text-[15px] leading-relaxed text-muted">{s.body}</p>
                </li>
              );
            })}
          </ol>
          <p className="mt-8 flex max-w-3xl items-start gap-3 text-sm leading-relaxed text-muted">
            <Headphones className="mt-0.5 size-4 shrink-0 text-faint" aria-hidden />
            {t.how.audioNote}
          </p>
        </Container>
      </Section>

      {/* Two ways to start */}
      <Section tone="surface">
        <Container>
          <SectionHeading eyebrow={t.paths.eyebrow} title={t.paths.title} lead={<p>{t.paths.lead}</p>} />
          <div className="mt-14 grid gap-5 lg:grid-cols-2">
            <div className="relative flex flex-col overflow-hidden rounded-3xl border border-line bg-paper p-8 md:p-10">
              <span aria-hidden className="absolute -top-10 -right-10 text-[9rem] opacity-[0.08]">
                ✨
              </span>
              <p className="text-sm font-medium text-good">{t.paths.free.label}</p>
              <h3 className="mt-3 font-serif text-3xl text-ink">{t.paths.free.title}</h3>
              <p className="mt-3 text-[15.5px] leading-relaxed text-muted">{t.paths.free.body}</p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {lessons.map((l) => (
                  <li key={l.id} className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-3 py-1 text-sm text-ink-2">
                    <span aria-hidden>{l.emoji}</span> {l.title[locale].split(":")[0]}
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-8">
                <StartLessonLink id={lessons[0].id}>{t.paths.free.cta}</StartLessonLink>
              </div>
            </div>
            <div className="relative flex flex-col overflow-hidden rounded-3xl bg-ink p-8 text-paper md:p-10">
              <div aria-hidden className="absolute inset-0 hairline-grid-inverse [mask-image:linear-gradient(to_bottom,black,transparent)]" />
              <p className="relative flex items-center gap-2 text-sm font-medium text-brass-light">
                <UserRound className="size-4" aria-hidden /> {t.paths.coached.label}
              </p>
              <h3 className="relative mt-3 font-serif text-3xl">{t.paths.coached.title}</h3>
              <p className="relative mt-3 text-[15.5px] leading-relaxed text-paper/70">{t.paths.coached.body}</p>
              <div className="relative mt-auto pt-8">
                <ButtonLink href="/beginners" variant="inverse" size="lg" trackLocation="learn_paths">
                  {t.paths.coached.cta} <ArrowRight className="size-4" aria-hidden />
                </ButtonLink>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <CtaBand
        locale={locale}
        title={t.cta.title}
        lead={t.cta.lead}
        primary={{ label: t.cta.primary, href: "/book?program=executive-fast-track" }}
        secondary={{ label: t.cta.secondary, href: "/beginners" }}
        location="learn_footer_cta"
      />
    </>
  );
}

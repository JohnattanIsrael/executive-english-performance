import type { Metadata } from "next";
import { AlertTriangle } from "lucide-react";
import { CtaBand, PageHero } from "@/components/marketing/sections";
import { PhotoFrame } from "@/components/ui/photo";
import { Container, Section, SectionHeading } from "@/components/ui/primitives";
import { caseStudyContent } from "@/content/case-studies";
import { resultsCopy } from "@/content/pages/results";
import { photos } from "@/content/photos";
import type { Locale } from "@/i18n/config";
import { pageMetadata } from "@/lib/seo";

const fieldKeys = [
  "clientSituation",
  "communicationChallenge",
  "intervention",
  "aiPractice",
  "humanCoaching",
  "observedImprovement",
] as const;

export function resultsMetadata(locale: Locale): Metadata {
  const t = resultsCopy[locale].meta;
  return pageMetadata({ title: t.title, description: t.description, path: "/results", locale });
}

export function ResultsPage({ locale }: { locale: Locale }) {
  const t = resultsCopy[locale];
  return (
    <>
      <PageHero
        eyebrow={t.hero.eyebrow}
        aside={<PhotoFrame photo={photos.dubaiDusk} sizes="(min-width: 1024px) 560px, 100vw" priority />}
        title={t.hero.title}
        lead={<p>{t.hero.lead}</p>}
      />

      <Section tone="surface">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.3fr]">
          <SectionHeading eyebrow={t.standard.eyebrow} title={t.standard.title} />
          <ul className="flex flex-col divide-y divide-line border-y border-line">
            {t.standard.principles.map((p) => (
              <li key={p} className="py-4 text-[16px] text-ink">
                {p}
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section tone="paper">
        <Container>
          <SectionHeading eyebrow={t.cases.eyebrow} title={t.cases.title} />
          <div className="mt-12 flex flex-col gap-8">
            {caseStudyContent[locale].map((cs) => (
              <article key={cs.slug} className="overflow-hidden rounded-2xl border border-line bg-surface">
                {cs.isSample && (
                  <p className="flex items-center gap-2 border-b border-dashed border-caution/40 bg-caution-soft/70 px-7 py-3 text-sm font-medium text-caution">
                    <AlertTriangle className="size-4" aria-hidden />
                    {t.cases.sample}
                  </p>
                )}
                <div className="p-7 md:p-9">
                  <p className="text-sm text-muted">{cs.clientProfile}</p>
                  <h2 className="mt-2 font-serif text-3xl text-ink">{cs.title}</h2>
                  <dl className="mt-8 grid gap-x-10 gap-y-6 md:grid-cols-2">
                    {fieldKeys.map((key) => (
                      <div key={key}>
                        <dt className="text-xs font-medium tracking-[0.14em] text-brass uppercase">{t.cases.fields[key]}</dt>
                        <dd className="mt-2 text-[15px] leading-relaxed text-ink-2">{cs[key]}</dd>
                      </div>
                    ))}
                  </dl>
                  <div className="mt-8 border-t border-line pt-6">
                    <p className="text-xs font-medium tracking-[0.14em] text-brass uppercase">{t.cases.quote}</p>
                    <p className="mt-2 text-[15px] text-muted italic">{cs.clientQuote ?? t.cases.quotePlaceholder}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <CtaBand locale={locale} location="results_footer_cta" />
    </>
  );
}

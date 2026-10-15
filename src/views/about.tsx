import type { Metadata } from "next";
import { CtaBand, PageHero } from "@/components/marketing/sections";
import { PhotoFrame } from "@/components/ui/photo";
import { Badge, Container, PlaceholderNote, Section, SectionHeading } from "@/components/ui/primitives";
import { founderContent, methodologyContent } from "@/content/founder";
import { aboutCopy } from "@/content/pages/about";
import { photos } from "@/content/photos";
import type { Locale } from "@/i18n/config";
import { pageMetadata } from "@/lib/seo";
import { asset } from "@/lib/utils";

export function aboutMetadata(locale: Locale): Metadata {
  const t = aboutCopy[locale].meta;
  return pageMetadata({ title: t.title, description: t.description, path: "/about", locale });
}

export function AboutPage({ locale }: { locale: Locale }) {
  const t = aboutCopy[locale];
  const founder = founderContent[locale];
  const methodologyPrinciples = methodologyContent[locale];

  return (
    <>
      <PageHero
        eyebrow={t.hero.eyebrow}
        aside={<PhotoFrame photo={photos.glassClouds} sizes="(min-width: 1024px) 560px, 100vw" priority />}
        title={t.hero.title}
        lead={<p>{t.hero.lead}</p>}
      />

      <Section tone="surface">
        <Container className="grid gap-12 lg:grid-cols-[0.9fr_1.2fr]">
          <div>
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-line bg-paper-2">
              {founder.portrait ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={asset(founder.portrait)} alt={founder.name} className="h-full w-full object-cover" />
              ) : (
                <>
                  <div aria-hidden className="absolute inset-0 hairline-grid" />
                  <div className="absolute inset-x-5 bottom-5">
                    <PlaceholderNote>{t.founder.portrait}</PlaceholderNote>
                  </div>
                </>
              )}
            </div>
          </div>
          <div>
            <p className="eyebrow">{t.founder.eyebrow}</p>
            <h2 className="display mt-4 text-4xl text-ink md:text-5xl">{founder.name}</h2>
            <p className="mt-2 text-lg text-muted">{founder.title}</p>
            <div className="mt-8 flex flex-col gap-5 text-[16.5px] leading-relaxed text-ink-2">
              {founder.bio.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <PlaceholderNote className="mt-6">{t.founder.placeholderNote}</PlaceholderNote>

            <dl className="mt-10 divide-y divide-line border-y border-line">
              {founder.credentials.map((c) => (
                <div key={c.label} className="grid gap-1 py-4 sm:grid-cols-[220px_1fr] sm:gap-6">
                  <dt className="text-sm text-muted">{c.label}</dt>
                  <dd className="flex flex-wrap items-center gap-2 text-ink">
                    {c.value}
                    {c.placeholder && <Badge tone="caution">{t.founder.placeholderBadge}</Badge>}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </Section>

      <Section tone="paper">
        <Container>
          <SectionHeading eyebrow={t.method.eyebrow} title={t.method.title} lead={t.method.lead} />
          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {methodologyPrinciples.map((p, i) => (
              <div key={p.title} className="rounded-2xl border border-line bg-surface p-7">
                <span className="font-serif text-3xl text-brass">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-5 text-xl font-medium text-ink">{p.title}</h3>
                <p className="mt-2 text-[15.5px] leading-relaxed text-muted">{p.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="surface">
        <Container className="grid gap-12 lg:grid-cols-2">
          <SectionHeading eyebrow={t.ai.eyebrow} title={t.ai.title} />
          <div className="flex flex-col gap-5 text-[16.5px] leading-relaxed text-ink-2">
            {t.ai.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <p className="text-muted">{t.ai.note}</p>
          </div>
        </Container>
      </Section>

      <CtaBand locale={locale} location="about_footer_cta" />
    </>
  );
}

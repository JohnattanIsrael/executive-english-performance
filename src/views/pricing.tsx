import type { Metadata } from "next";
import { TrackOnMount } from "@/components/analytics/track-event";
import { FaqList } from "@/components/marketing/faq-list";
import { ProgramCard } from "@/components/marketing/program-card";
import { CtaBand, PageHero } from "@/components/marketing/sections";
import { Container, Section, SectionHeading } from "@/components/ui/primitives";
import { pricingCopy } from "@/content/pages/pricing";
import { localizeProgram } from "@/content/programs";
import type { Locale } from "@/i18n/config";
import { services } from "@/lib/services";
import { pageMetadata } from "@/lib/seo";

/** Order of the individual programs on the pricing page. */
const b2cOrder = ["executive-fast-track", "executive-performance", "executive-advisory", "ai-communication-coach"];

export function pricingMetadata(locale: Locale): Metadata {
  const t = pricingCopy[locale].meta;
  return pageMetadata({ title: t.title, description: t.description, path: "/pricing", locale });
}

export async function PricingPage({ locale }: { locale: Locale }) {
  const t = pricingCopy[locale];
  const programs = (await services.pricing.listPrograms()).map((p) => localizeProgram(p, locale));
  const b2c = programs
    .filter((p) => p.audience === "b2c")
    .sort((a, b) => b2cOrder.indexOf(a.slug) - b2cOrder.indexOf(b.slug));
  const b2b = programs.filter((p) => p.audience === "b2b");

  return (
    <>
      <TrackOnMount event="pricing_viewed" properties={{ path: "/pricing", locale }} />
      <PageHero eyebrow={t.hero.eyebrow} title={t.hero.title} lead={<p>{t.hero.lead}</p>} />

      <Section tone="surface" className="pt-16 md:pt-20">
        <Container>
          <h2 className="text-sm font-medium tracking-[0.16em] text-muted uppercase">{t.b2c}</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {b2c.map((p) => (
              <ProgramCard key={p.id} program={p} location="pricing" emphasis={p.featured} />
            ))}
          </div>

          <h2 className="mt-20 text-sm font-medium tracking-[0.16em] text-muted uppercase">{t.b2b}</h2>
          <div className="mt-6 grid gap-5 lg:grid-cols-2">
            {b2b.map((p) => (
              <ProgramCard key={p.id} program={p} location="pricing" />
            ))}
          </div>

          <p className="mt-10 max-w-3xl border-l-2 border-brass pl-5 text-[15.5px] leading-relaxed text-ink-2">{t.note}</p>
        </Container>
      </Section>

      <Section tone="paper">
        <Container>
          <SectionHeading eyebrow={t.factors.eyebrow} title={t.factors.title} />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {t.factors.items.map((f) => (
              <div key={f.title} className="rounded-2xl border border-line bg-surface p-6">
                <h3 className="font-medium text-ink">{f.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">{f.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="surface">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.6fr]">
          <SectionHeading eyebrow={t.faq.eyebrow} title={t.faq.title} />
          <FaqList items={t.faq.items} />
        </Container>
      </Section>

      <CtaBand locale={locale} location="pricing_footer_cta" />
    </>
  );
}

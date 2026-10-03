import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { TrackOnMount } from "@/components/analytics/track-event";
import { FaqList } from "@/components/marketing/faq-list";
import { HeroVisual } from "@/components/marketing/hero-visual";
import { ProgramCard } from "@/components/marketing/program-card";
import {
  AiPracticeSection,
  ComparisonSection,
  CtaBand,
  HumanAiSection,
  ProblemSection,
  ProcessSection,
} from "@/components/marketing/sections";
import { ButtonLink } from "@/components/ui/button";
import { Container, JsonLd, PlaceholderNote, Section, SectionHeading } from "@/components/ui/primitives";
import { ctas, site } from "@/config/site";
import { faqs } from "@/content/faq";
import { audiences, corporateNeeds } from "@/content/marketing";
import { services } from "@/lib/services";
import { absoluteUrl, organizationJsonLd } from "@/lib/seo";
import { formatPrice } from "@/lib/utils";

export const metadata: Metadata = {
  title: { absolute: `${site.name} — Executive English Coaching for Leaders` },
  description:
    "Executive English coaching for professionals who need to perform, not simply practice. Expert coaching and AI-assisted practice for meetings, presentations and negotiations in English.",
  alternates: { canonical: absoluteUrl("/") },
};

export default async function HomePage() {
  const programs = await services.pricing.listPrograms();
  const featured = ["executive-performance", "executive-advisory", "corporate-program"]
    .map((slug) => programs.find((p) => p.slug === slug))
    .filter((p) => p !== undefined);
  const corporate = programs.filter((p) => p.audience === "b2b");

  return (
    <>
      <TrackOnMount event="landing_page_view" properties={{ path: "/" }} />
      <JsonLd data={organizationJsonLd()} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-paper">
        <div aria-hidden className="absolute inset-0 hairline-grid [mask-image:linear-gradient(to_bottom,black_20%,transparent_90%)]" />
        <Container className="relative grid items-center gap-16 pt-14 pb-24 md:pt-20 lg:grid-cols-[1.08fr_1fr] lg:gap-12 lg:pb-32">
          <div className="animate-rise">
            <p className="eyebrow mb-6">Executive English Performance</p>
            <h1 className="display text-[2.75rem] leading-[1.02] text-ink sm:text-6xl lg:text-[3.9rem] xl:text-[4.3rem]">
              Your English is good enough.{" "}
              <span className="text-ink-2 italic">Your communication should be exceptional.</span>
            </h1>
            <p className="prose-lead mt-8 max-w-xl">
              Executive English coaching for professionals who need to perform, not simply practice — in the meetings,
              presentations and negotiations where communication has real business consequences.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <ButtonLink href={ctas.assessment.href} size="lg" trackLocation="hero">
                {ctas.assessment.label}
              </ButtonLink>
              <ButtonLink href="/programs" size="lg" variant="secondary" trackLocation="hero">
                Explore the Program
              </ButtonLink>
            </div>
            <p className="mt-10 max-w-xl text-sm leading-relaxed text-muted">
              <span className="text-ink-2">For </span>
              {audiences.join(" · ")}
              <span className="text-ink-2"> — and professionals working with US, Canadian and European companies.</span>
            </p>
          </div>
          <HeroVisual />
        </Container>
      </section>

      {/* Primary message */}
      <section className="border-y border-line bg-surface py-16 md:py-20">
        <Container className="grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:items-end">
          <p className="display text-3xl leading-[1.15] text-ink md:text-[2.6rem]">
            You don’t need more English lessons. You need to communicate better when it matters.
          </p>
          <p className="text-[15.5px] leading-relaxed text-muted">{site.supportingMessage}</p>
        </Container>
      </section>

      <ProblemSection />
      <ComparisonSection />
      <ProcessSection />
      <HumanAiSection />
      <AiPracticeSection />

      {/* Programs */}
      <Section tone="surface">
        <Container>
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <SectionHeading
              eyebrow="Programs"
              title="Built around what’s at stake, not around hours."
              lead="Private programs for executives and senior professionals, and structured programs for leadership teams."
            />
            <ButtonLink href="/pricing" variant="secondary" trackLocation="home_programs">
              Compare pricing
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
      <Section tone="paper">
        <Container className="grid gap-14 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <SectionHeading
              eyebrow="For companies"
              title="Develop stronger English communication across your leadership team."
              lead={
                <p>
                  Instead of traditional English classes, invest in a structured executive communication program —
                  assessments, coaching, business-specific simulations and reporting your leadership can act on.
                </p>
              }
            />
            <div className="mt-9 flex flex-wrap gap-3">
              <ButtonLink href={ctas.proposal.href} trackLocation="home_companies">
                {ctas.proposal.label}
              </ButtonLink>
              <ButtonLink href="/companies" variant="secondary" trackLocation="home_companies">
                Programs for companies
              </ButtonLink>
            </div>
          </div>
          <div className="rounded-2xl border border-line bg-surface p-7 md:p-9">
            <p className="text-sm font-medium text-ink">For professionals who need English for</p>
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
                  <p className="font-serif text-2xl text-ink">{p.slug === "corporate-pilot" ? "Corporate Pilot" : "Annual Program"}</p>
                  <p className="mt-1 text-sm text-muted">
                    {p.duration} · {formatPrice(p.price).amount}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Experience */}
      <Section tone="surface">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <div className="relative aspect-[4/5] max-h-[520px] overflow-hidden rounded-2xl border border-line bg-paper-2">
            <div aria-hidden className="absolute inset-0 hairline-grid" />
            <div className="absolute inset-x-6 bottom-6">
              <PlaceholderNote>Founder portrait — replace with professional photography.</PlaceholderNote>
            </div>
          </div>
          <div>
            <SectionHeading
              eyebrow="Founded on experience"
              title="Experience matters when communication has consequences."
              lead={
                <p>
                  The methodology comes from years of observing how professionals actually communicate in business —
                  where hesitation, structure and tone matter as much as vocabulary. Not from teaching grammar in
                  isolation.
                </p>
              }
            />
            <PlaceholderNote className="mt-8 max-w-xl">
              Add the founder’s verified experience here: years teaching, industries, countries and executive clients.
            </PlaceholderNote>
            <Link href="/about" className="mt-8 inline-flex items-center gap-2 text-[15px] font-medium text-ink hover:text-harbor-600">
              About the founder and method <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
        </Container>
      </Section>

      {/* FAQ */}
      <Section tone="paper">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.6fr]">
          <div>
            <SectionHeading eyebrow="Questions" title="Straight answers." />
            <Link href="/faq" className="mt-8 inline-flex items-center gap-2 text-[15px] font-medium text-ink hover:text-harbor-600">
              All questions <ArrowUpRight className="size-4" aria-hidden />
            </Link>
          </div>
          <FaqList items={faqs.filter((f) => ["Is this an English course?", "Is AI replacing the coach?", "Is the AI coach available now?", "Can companies enroll multiple employees?"].includes(f.question))} />
        </Container>
      </Section>

      <CtaBand location="home_footer_cta" />
    </>
  );
}

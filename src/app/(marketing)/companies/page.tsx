import { ArrowRight, Lock } from "lucide-react";
import { ProgramCard } from "@/components/marketing/program-card";
import { CtaBand, PageHero } from "@/components/marketing/sections";
import { ButtonLink } from "@/components/ui/button";
import { Meter } from "@/components/ui/charts";
import { Badge, Container, JsonLd, Section, SectionHeading } from "@/components/ui/primitives";
import { ctas } from "@/config/site";
import { corporateBuyers, corporateNeeds, metricLabels } from "@/content/marketing";
import { services } from "@/lib/services";
import { pageMetadata, serviceJsonLd } from "@/lib/seo";
import { PhotoFrame } from "@/components/ui/photo";
import { photos } from "@/content/photos";

const description =
  "Corporate executive communication programs for leadership teams who work in English: assessments, coaching, business-specific simulations, progress dashboards and quarterly reporting.";

export const metadata = pageMetadata({
  title: "Corporate English & Executive Communication Training",
  description,
  path: "/companies",
  keywords: ["corporate English training", "executive communication training", "business communication coaching"],
});

const phases = [
  { title: "Onboarding", body: "Leadership interviews to understand where English communication affects results." },
  { title: "Assessment", body: "Every participant receives an individual communication profile." },
  { title: "Coaching & practice", body: "Human coaching plus simulations built from your real business scenarios." },
  { title: "Reporting", body: "Progress dashboards and quarterly reports for HR and leadership." },
];

export default async function CompaniesPage() {
  const programs = await services.pricing.listPrograms();
  const corporate = programs.filter((p) => p.audience === "b2b");
  const cohort = await services.companies.getCohortMetrics("preview");

  return (
    <>
      <JsonLd data={serviceJsonLd("Corporate executive communication program", description, "/companies")} />
      <PageHero
        eyebrow="For companies"
        aside={<PhotoFrame photo={photos.whiteboardTeam} sizes="(min-width: 1024px) 560px, 100vw" priority />}
        title="Develop stronger English communication across your leadership team."
        lead={
          <p>
            A structured executive communication program for the people who represent your company in English — not
            another set of language classes.
          </p>
        }
      >
        <ButtonLink href={ctas.proposal.href} size="lg" trackLocation="companies_hero">
          {ctas.proposal.label}
        </ButtonLink>
        <ButtonLink href="#program" size="lg" variant="secondary">
          How the program works
        </ButtonLink>
      </PageHero>

      <Section tone="surface">
        <Container className="grid gap-14 lg:grid-cols-[1fr_1.1fr]">
          <SectionHeading
            eyebrow="Why companies invest"
            title="When English affects results, classes aren’t enough."
            lead={
              <p>
                Your managers may already speak good English. The question is whether they lead meetings, present to
                headquarters, negotiate with clients and explain complex work with the clarity and authority their
                roles require. That is a performance problem — and it can be developed deliberately.
              </p>
            }
          />
          <div className="rounded-2xl border border-line bg-paper p-7 md:p-9">
            <p className="text-sm font-medium text-muted">Built for teams who need English for</p>
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
          <SectionHeading
            eyebrow="Corporate Executive Communication Program"
            title="A structured program for cohorts of roughly 10–50 people."
            lead="Designed around your company’s real communication needs, with visibility for the people accountable for development."
          />
          <ol className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-4">
            {phases.map((p, i) => (
              <li key={p.title} className="bg-surface p-7">
                <span className="text-sm text-faint tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-6 text-lg font-medium text-ink">{p.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">{p.body}</p>
              </li>
            ))}
          </ol>

          <div className="mt-14 grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-center">
            <div>
              <h3 className="font-serif text-3xl text-ink">Visibility without micromanagement.</h3>
              <p className="mt-4 text-[15.5px] leading-relaxed text-muted">
                HR and L&D see participation, practice volume and cohort-level progress. Individual coaching
                conversations remain confidential — which is what makes people speak openly about their challenges.
              </p>
              <p className="mt-6 flex items-center gap-2 text-sm text-ink-2">
                <Lock className="size-4 text-brass" aria-hidden /> Coaching content stays between participant and coach.
              </p>
              <ButtonLink href="/company" variant="secondary" className="mt-8" trackLocation="companies_dashboard_preview">
                Preview the company dashboard <ArrowRight className="size-4" aria-hidden />
              </ButtonLink>
            </div>
            <figure className="rounded-2xl border border-line bg-surface p-6 shadow-[0_30px_80px_-40px_rgb(14_23_38/0.3)] md:p-8">
              <figcaption className="flex items-center justify-between gap-3">
                <span className="text-sm font-medium text-ink">Cohort progress</span>
                <Badge tone="brass">Illustrative report view</Badge>
              </figcaption>
              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                {cohort.map((m) => (
                  <Meter key={m.key} label={metricLabels[m.key]} value={m.value} previous={m.previous} size="sm" />
                ))}
              </div>
              <p className="mt-6 border-t border-line pt-4 text-xs text-muted">
                Coach-rated practice indicators (0–100), cohort average. Not a standardized test score.
              </p>
            </figure>
          </div>
        </Container>
      </Section>

      <Section tone="surface">
        <Container>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading eyebrow="Engagement options" title="Start with a pilot. Scale with confidence." />
          </div>
          <div className="mt-14 grid gap-5 lg:grid-cols-2">
            {corporate.map((p) => (
              <ProgramCard key={p.id} program={p} location="companies" emphasis={p.slug === "corporate-program"} />
            ))}
          </div>
          <p className="mt-6 text-sm text-muted">
            Pricing is customized based on company size, number of participants, coaching frequency and scope.
          </p>
        </Container>
      </Section>

      <Section tone="paper">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <SectionHeading eyebrow="Who we work with" title="Built for the people accountable for development." />
          <div>
            <ul className="flex flex-wrap gap-2">
              {corporateBuyers.map((b) => (
                <li key={b} className="rounded-full border border-line-strong bg-surface px-4 py-2 text-[15px] text-ink">
                  {b}
                </li>
              ))}
            </ul>
            <p className="mt-8 max-w-2xl text-[15.5px] leading-relaxed text-muted">
              We work with you to define the situations that matter for your business, design scenarios around them,
              and report on progress in a way that is useful to leadership — so the program is judged on how people
              communicate, not on attendance.
            </p>
          </div>
        </Container>
      </Section>

      <CtaBand
        title="Let’s scope a program for your team."
        lead="Tell us about your team, your international stakeholders and where communication affects results. We’ll propose a pilot or annual program."
        primary="proposal"
        secondary="none"
        location="companies_footer_cta"
      />
    </>
  );
}

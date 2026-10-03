import { Check } from "lucide-react";
import { ProgramCard } from "@/components/marketing/program-card";
import { ComparisonSection, CtaBand, PageHero, ProcessSection } from "@/components/marketing/sections";
import { ButtonLink } from "@/components/ui/button";
import { Container, JsonLd, Section, SectionHeading } from "@/components/ui/primitives";
import { ctas } from "@/config/site";
import { audiences, executiveOutcomes, pressureSituations, preparationMoments } from "@/content/marketing";
import { services } from "@/lib/services";
import { pageMetadata, serviceJsonLd } from "@/lib/seo";

const description =
  "Private executive English coaching for CEOs, founders, directors and senior professionals who need to communicate with precision and confidence in high-stakes meetings, presentations and negotiations.";

export const metadata = pageMetadata({
  title: "Executive English Coaching for Leaders",
  description,
  path: "/executives",
  keywords: ["executive English coaching", "business English for executives", "English coaching for professionals"],
});

export default async function ExecutivesPage() {
  const programs = (await services.pricing.listPrograms()).filter(
    (p) => p.slug === "executive-performance" || p.slug === "executive-advisory",
  );

  return (
    <>
      <JsonLd data={serviceJsonLd("Executive English coaching", description, "/executives")} />
      <PageHero
        eyebrow="For executives & senior professionals"
        title="Communicate with the precision your role demands."
        lead={
          <p>
            Private executive English coaching for leaders who already work in English — and need it to perform when
            the room is senior, the questions are hard and the outcome matters.
          </p>
        }
      >
        <ButtonLink href={ctas.assessment.href} size="lg" trackLocation="executives_hero">
          {ctas.assessment.label}
        </ButtonLink>
        <ButtonLink href="#programs" size="lg" variant="secondary">
          View programs
        </ButtonLink>
      </PageHero>

      <Section tone="surface">
        <Container className="grid gap-14 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <SectionHeading
              eyebrow="Who this is for"
              title="Not grammar lessons. Communication performance."
              lead={
                <p>
                  Our clients are rarely looking for another English course. They want confidence, precision,
                  credibility, fluency — and the ability to perform when it counts.
                </p>
              }
            />
            <ul className="mt-8 flex flex-wrap gap-2">
              {audiences.map((a) => (
                <li key={a} className="rounded-full border border-line px-3.5 py-1.5 text-sm text-ink-2">
                  {a}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-line bg-paper p-7 md:p-9">
            <p className="text-sm font-medium text-muted">The work focuses on helping you</p>
            <ul className="mt-5 grid gap-3.5 sm:grid-cols-2">
              {executiveOutcomes.map((o) => (
                <li key={o} className="flex gap-3 text-[15px] text-ink">
                  <Check className="mt-0.5 size-4 shrink-0 text-data" aria-hidden />
                  {o}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      <Section tone="paper">
        <Container>
          <SectionHeading
            eyebrow="Built around your situations"
            title="Your calendar is the curriculum."
            lead="We start from the meetings, presentations and conversations on your calendar — and prepare you for them specifically."
          />
          <div className="mt-14 grid gap-5 lg:grid-cols-2">
            <div className="rounded-2xl border border-line bg-surface p-7">
              <p className="text-sm font-medium text-muted">Situations we work on</p>
              <ul className="mt-4 divide-y divide-line">
                {pressureSituations.map((s) => (
                  <li key={s.title} className="flex flex-col gap-0.5 py-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                    <span className="text-ink">{s.title}</span>
                    <span className="text-sm text-muted sm:text-right">{s.detail}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-line bg-surface p-7">
              <p className="text-sm font-medium text-muted">Preparation for defined moments</p>
              <ul className="mt-4 divide-y divide-line">
                {preparationMoments.map((m) => (
                  <li key={m} className="py-3 text-ink">
                    {m}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                Have a specific event coming up? Mention it when you book — preparation for that moment becomes part of
                your plan.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <ComparisonSection tone="surface" />
      <ProcessSection tone="paper" />

      <Section tone="surface" id="programs">
        <Container>
          <SectionHeading eyebrow="Programs" title="Two ways to work together." />
          <div className="mt-14 grid gap-5 lg:grid-cols-2">
            {programs.map((p) => (
              <ProgramCard key={p.id} program={p} location="executives" emphasis={p.featured} />
            ))}
          </div>
        </Container>
      </Section>

      <CtaBand location="executives_footer_cta" secondary="none" />
    </>
  );
}

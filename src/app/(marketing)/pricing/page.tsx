import { TrackOnMount } from "@/components/analytics/track-event";
import { FaqList } from "@/components/marketing/faq-list";
import { ProgramCard } from "@/components/marketing/program-card";
import { CtaBand, PageHero } from "@/components/marketing/sections";
import { Container, Section, SectionHeading } from "@/components/ui/primitives";
import { pricingNote } from "@/config/programs";
import { services } from "@/lib/services";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Pricing",
  description:
    "Pricing for executive English coaching: the Executive Performance Program, Executive Communication Advisory, AI Communication Coach early access and corporate programs.",
  path: "/pricing",
});

const factors = [
  { title: "Program scope", body: "The number and complexity of situations we prepare for." },
  { title: "Executive involvement", body: "Seniority, stakes and the level of preparation required." },
  { title: "Coaching frequency", body: "How often you meet with your coach and how much review happens between sessions." },
  { title: "Number of participants", body: "For companies, cohort size and the reporting required." },
];

const pricingFaqs = [
  {
    question: "Why do you show a price range rather than a fixed price?",
    answer:
      "Because programs are built around your situations. The assessment determines scope and coaching frequency, and you receive a clear, fixed proposal before you commit.",
  },
  {
    question: "Do you guarantee specific results?",
    answer:
      "No. We commit to a rigorous process — assessment, strategy, coaching, practice and measurement — and to being honest about progress along the way.",
  },
  {
    question: "Can my employer pay for the program?",
    answer:
      "Often, yes. Many professionals use a training or development budget, and we can prepare a proposal addressed to your company.",
  },
  {
    question: "When will the AI Communication Coach be priced?",
    answer: "Pricing will be announced when early access opens. Coaching clients will be invited first.",
  },
];

export default async function PricingPage() {
  const programs = await services.pricing.listPrograms();
  const b2c = programs.filter((p) => p.audience === "b2c");
  const b2b = programs.filter((p) => p.audience === "b2b");

  return (
    <>
      <TrackOnMount event="pricing_viewed" properties={{ path: "/pricing" }} />
      <PageHero
        eyebrow="Pricing"
        title="An investment in how you perform."
        lead={<p>Clear starting points for every program. Your assessment determines the final scope — and you see a fixed proposal before you commit.</p>}
      />

      <Section tone="surface" className="pt-16 md:pt-20">
        <Container>
          <h2 className="text-sm font-medium tracking-[0.16em] text-muted uppercase">For executives & professionals</h2>
          <div className="mt-6 grid gap-5 lg:grid-cols-3">
            {b2c.map((p) => (
              <ProgramCard key={p.id} program={p} location="pricing" emphasis={p.featured} />
            ))}
          </div>

          <h2 className="mt-20 text-sm font-medium tracking-[0.16em] text-muted uppercase">For companies</h2>
          <div className="mt-6 grid gap-5 lg:grid-cols-2">
            {b2b.map((p) => (
              <ProgramCard key={p.id} program={p} location="pricing" />
            ))}
          </div>

          <p className="mt-10 max-w-3xl border-l-2 border-brass pl-5 text-[15.5px] leading-relaxed text-ink-2">{pricingNote}</p>
        </Container>
      </Section>

      <Section tone="paper">
        <Container>
          <SectionHeading eyebrow="What shapes the price" title="Four factors, discussed openly." />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {factors.map((f) => (
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
          <SectionHeading eyebrow="Pricing questions" title="Before you decide." />
          <FaqList items={pricingFaqs} />
        </Container>
      </Section>

      <CtaBand location="pricing_footer_cta" />
    </>
  );
}

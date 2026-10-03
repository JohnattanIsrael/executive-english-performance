import { CtaBand, HumanAiSection, JourneyFlow, PageHero } from "@/components/marketing/sections";
import { ButtonLink } from "@/components/ui/button";
import { Container, Section, SectionHeading } from "@/components/ui/primitives";
import { ctas } from "@/config/site";
import { processSteps } from "@/content/marketing";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "How It Works",
  description:
    "Assess, personalize, practice, perform: how executive English coaching combines expert coaching with AI-assisted practice to improve communication in real business situations.",
  path: "/how-it-works",
});

const details: Record<string, string[]> = {
  Assess: [
    "Conversation about your role, stakeholders and goals",
    "Speaking and writing samples from real work situations",
    "Your initial Executive Communication Profile",
  ],
  Personalize: [
    "A short list of priority situations",
    "Specific communication behaviors to develop",
    "A practice plan that fits your calendar",
  ],
  Practice: [
    "Coaching sessions focused on your priority situations",
    "Simulations and targeted exercises between sessions",
    "Feedback on clarity, structure, language and delivery",
  ],
  Perform: [
    "Preparation for upcoming meetings and presentations",
    "Debriefs after real events",
    "Periodic reassessment against your starting profile",
  ],
};

const measures = [
  { title: "Coach observation", body: "Structured notes on the behaviors you’re developing, session by session." },
  { title: "Periodic reassessment", body: "Your communication profile revisited at key milestones." },
  { title: "Practice record", body: "What you practiced, how often, and how your responses changed." },
  { title: "Real-world debriefs", body: "How the actual meeting, presentation or negotiation went." },
];

export default function HowItWorksPage() {
  return (
    <>
      <PageHero
        eyebrow="How it works"
        title="A method built around performance, not hours."
        lead={
          <p>
            Identify the situations that matter. Practice them. Receive AI feedback and expert coaching. Measure what
            changes. Perform better in the real world.
          </p>
        }
      >
        <ButtonLink href={ctas.assessment.href} size="lg" trackLocation="how_hero">
          {ctas.assessment.label}
        </ButtonLink>
      </PageHero>

      <Section tone="surface">
        <Container>
          <JourneyFlow />
          <ol className="mt-14 flex flex-col">
            {processSteps.map((step) => (
              <li key={step.number} className="grid gap-6 border-t border-line py-10 md:grid-cols-[120px_1fr_1.2fr] md:gap-10">
                <span className="font-serif text-5xl text-brass">{step.number}</span>
                <div>
                  <h2 className="font-serif text-3xl text-ink">{step.title}</h2>
                  <p className="mt-3 text-[15.5px] leading-relaxed text-muted">{step.body}</p>
                </div>
                <ul className="flex flex-col gap-3 md:pt-2">
                  {details[step.title].map((d) => (
                    <li key={d} className="flex gap-3 text-[15px] text-ink-2">
                      <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-data" />
                      {d}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <HumanAiSection />

      <Section tone="paper">
        <Container>
          <SectionHeading
            eyebrow="Measuring progress"
            title="Progress you can see, measured honestly."
            lead="We track improvement against your real situations. Indicators are practice tools, not standardized test scores — and we say so."
          />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {measures.map((m) => (
              <div key={m.title} className="rounded-2xl border border-line bg-surface p-6">
                <h3 className="font-medium text-ink">{m.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">{m.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <CtaBand location="how_footer_cta" />
    </>
  );
}

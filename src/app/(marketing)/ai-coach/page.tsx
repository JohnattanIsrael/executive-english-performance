import { CircleDashed, CheckCircle2 } from "lucide-react";
import { EarlyAccessForm } from "@/components/forms/simple-forms";
import { AiPracticeSection, CtaBand, HumanAiSection, PageHero } from "@/components/marketing/sections";
import { ButtonLink } from "@/components/ui/button";
import { Badge, Container, Section, SectionHeading } from "@/components/ui/primitives";
import { ctas } from "@/config/site";
import { categoryLabels } from "@/content/marketing";
import { services } from "@/lib/services";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "AI Communication Coach (In Development)",
  description:
    "An AI English coach for executives, in development: realistic professional role-play, feedback on clarity and structure, and insights shared with your human coach. Join the early-access list.",
  path: "/ai-coach",
  keywords: ["AI English coach for executives", "AI communication coach", "business English practice"],
});

const pipeline = [
  { title: "Generate the scenario", body: "Build a realistic situation from your role, industry and upcoming events." },
  { title: "Conduct the conversation", body: "Role-play with a counterpart who pushes back, interrupts and asks follow-ups." },
  { title: "Analyze your responses", body: "Look at structure, clarity, language and delivery." },
  { title: "Identify patterns", body: "Spot recurring habits across sessions — not just single mistakes." },
  { title: "Provide feedback", body: "Specific, actionable notes with examples from your own answers." },
  { title: "Recommend practice", body: "Suggest the next scenario or drill that targets your patterns." },
  { title: "Update your profile", body: "Keep your communication profile current as you practice." },
  { title: "Brief your coach", body: "Summarize insights so coaching sessions start from evidence." },
];

const status = [
  { label: "Human coaching programs", live: true },
  { label: "Online self-assessment", live: true },
  { label: "Scenario library (preview)", live: true },
  { label: "AI role-play simulations", live: false },
  { label: "Speech analysis and pronunciation feedback", live: false },
  { label: "Coach insight summaries", live: false },
];

export default async function AiCoachPage() {
  const examples = (await services.scenarios.list()).filter((s) =>
    ["present-q4-results", "negotiate-contract", "challenge-proposal", "explain-technical-incident"].includes(s.id),
  );

  return (
    <>
      <PageHero
        eyebrow="AI Communication Coach"
        title="Practice the conversations before they happen."
        lead={
          <p>
            Our AI-powered communication platform is currently being developed. It will let you rehearse realistic
            professional conversations at any time — and give your coach the evidence to make every session count.
          </p>
        }
        aside={
          <div className="rounded-2xl border border-line bg-surface p-7">
            <Badge tone="brass">Development status</Badge>
            <ul className="mt-5 flex flex-col gap-3">
              {status.map((s) => (
                <li key={s.label} className="flex items-center justify-between gap-4 text-[15px]">
                  <span className="text-ink">{s.label}</span>
                  {s.live ? (
                    <span className="flex items-center gap-1.5 text-sm text-good">
                      <CheckCircle2 className="size-4" aria-hidden /> Available
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5 text-sm text-muted">
                      <CircleDashed className="size-4" aria-hidden /> In development
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        }
      >
        <ButtonLink href="#early-access" size="lg" trackLocation="ai_hero">
          Join the Early Access List
        </ButtonLink>
        <ButtonLink href={ctas.assessment.href} size="lg" variant="secondary" trackLocation="ai_hero">
          {ctas.assessment.label}
        </ButtonLink>
      </PageHero>

      <AiPracticeSection showCta={false} />

      <Section tone="surface">
        <Container>
          <SectionHeading
            eyebrow="Example scenarios"
            title="Rehearse the moments that matter."
            lead="The platform will use scenarios like these for AI role-play. Companies can add scenarios built from their own business."
          />
          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {examples.map((s) => (
              <article key={s.id} className="rounded-2xl border border-line bg-paper p-7">
                <p className="text-xs font-medium tracking-[0.16em] text-brass uppercase">{categoryLabels[s.category]}</p>
                <h3 className="mt-3 font-serif text-2xl text-ink">{s.title}</h3>
                <p className="mt-2 text-[15.5px] text-ink-2">“{s.situation}”</p>
                <p className="mt-5 text-sm text-muted">Counterpart: {s.counterpart}</p>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="paper">
        <Container>
          <div className="flex flex-col gap-4">
            <Badge tone="caution" className="self-start">
              Planned capabilities — not yet live
            </Badge>
            <SectionHeading title="How the platform is designed to work." />
          </div>
          <ol className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {pipeline.map((p, i) => (
              <li key={p.title} className="bg-surface p-6">
                <span className="text-sm text-faint tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-4 font-medium text-ink">{p.title}</h3>
                <p className="mt-1.5 text-[14.5px] leading-relaxed text-muted">{p.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <HumanAiSection />

      <Section tone="surface" id="early-access" className="scroll-mt-20">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <SectionHeading
            eyebrow="Early access"
            title="Be among the first to practice with it."
            lead={
              <p>
                Early-access members will be invited as functionality becomes available, starting with clients in
                coaching programs. Join the list and we’ll keep you informed.
              </p>
            }
          />
          <div className="rounded-2xl border border-line bg-paper p-7 md:p-9">
            <EarlyAccessForm location="ai_coach_page" />
          </div>
        </Container>
      </Section>

      <CtaBand
        title="Don’t wait for the software to start improving."
        lead="Human coaching is available now. Start with an executive assessment — early-access invitations go to coaching clients first."
        secondary="none"
        location="ai_footer_cta"
      />
    </>
  );
}

import { AlertTriangle } from "lucide-react";
import { CtaBand, PageHero } from "@/components/marketing/sections";
import { Container, Section, SectionHeading } from "@/components/ui/primitives";
import { caseStudies } from "@/content/case-studies";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Results & Case Studies",
  description:
    "How Executive English Performance documents client progress: observable change in real business situations, reported with permission.",
  path: "/results",
});

const fields = [
  { key: "clientSituation", label: "Client situation" },
  { key: "communicationChallenge", label: "Communication challenge" },
  { key: "intervention", label: "Intervention" },
  { key: "aiPractice", label: "AI-assisted practice" },
  { key: "humanCoaching", label: "Human coaching" },
  { key: "observedImprovement", label: "Observed improvement" },
] as const;

const principles = [
  "Results are described as observable changes in real situations.",
  "No invented statistics, testimonials or client logos.",
  "Client details are shared only with written permission.",
  "Where outcomes depend on many factors, we say so.",
];

export default function ResultsPage() {
  return (
    <>
      <PageHero
        eyebrow="Results"
        title="Evidence, documented carefully."
        lead={
          <p>
            Communication improvement is real but rarely captured by a single number. We document it the way a careful
            advisor would: the situation, the challenge, what we did, and what changed — with the client’s permission.
          </p>
        }
      />

      <Section tone="surface">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.3fr]">
          <SectionHeading eyebrow="Our standard" title="How we report results." />
          <ul className="flex flex-col divide-y divide-line border-y border-line">
            {principles.map((p) => (
              <li key={p} className="py-4 text-[16px] text-ink">
                {p}
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section tone="paper">
        <Container>
          <SectionHeading eyebrow="Case studies" title="Case study framework" />
          <div className="mt-12 flex flex-col gap-8">
            {caseStudies.map((cs) => (
              <article key={cs.slug} className="overflow-hidden rounded-2xl border border-line bg-surface">
                {cs.isSample && (
                  <p className="flex items-center gap-2 border-b border-dashed border-caution/40 bg-caution-soft/70 px-7 py-3 text-sm font-medium text-caution">
                    <AlertTriangle className="size-4" aria-hidden />
                    Sample case study — replace with verified client data.
                  </p>
                )}
                <div className="p-7 md:p-9">
                  <p className="text-sm text-muted">{cs.clientProfile}</p>
                  <h2 className="mt-2 font-serif text-3xl text-ink">{cs.title}</h2>
                  <dl className="mt-8 grid gap-x-10 gap-y-6 md:grid-cols-2">
                    {fields.map((f) => (
                      <div key={f.key}>
                        <dt className="text-xs font-medium tracking-[0.14em] text-brass uppercase">{f.label}</dt>
                        <dd className="mt-2 text-[15px] leading-relaxed text-ink-2">{cs[f.key]}</dd>
                      </div>
                    ))}
                  </dl>
                  <div className="mt-8 border-t border-line pt-6">
                    <p className="text-xs font-medium tracking-[0.14em] text-brass uppercase">Client quote</p>
                    <p className="mt-2 text-[15px] text-muted italic">
                      {cs.clientQuote ?? "[Add a verified client quote with written permission, or omit.]"}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <CtaBand location="results_footer_cta" />
    </>
  );
}

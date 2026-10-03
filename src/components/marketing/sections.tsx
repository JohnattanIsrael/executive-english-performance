import { ArrowRight, Check, Minus } from "lucide-react";
import type { ReactNode } from "react";
import { ButtonLink } from "@/components/ui/button";
import { Badge, Container, Section, SectionHeading } from "@/components/ui/primitives";
import { ctas } from "@/config/site";
import {
  comparison,
  feedbackAreas,
  humanAiModel,
  journey,
  practiceSituations,
  pressureSituations,
  processSteps,
} from "@/content/marketing";
import { cn } from "@/lib/utils";

/* ----------------------------------------------------------------------------
 * Interior page hero
 * ------------------------------------------------------------------------- */
export function PageHero({
  eyebrow,
  title,
  lead,
  children,
  aside,
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  children?: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-line bg-paper">
      <div aria-hidden className="absolute inset-0 hairline-grid [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />
      <Container className={cn("relative py-16 md:py-24", aside && "grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]")}>
        <div className="max-w-3xl animate-rise">
          <p className="eyebrow mb-5">{eyebrow}</p>
          <h1 className="display text-[2.5rem] leading-[1.04] text-ink sm:text-6xl md:text-[4.2rem]">{title}</h1>
          {lead && <div className="prose-lead mt-7 max-w-2xl">{lead}</div>}
          {children && <div className="mt-9 flex flex-wrap gap-3">{children}</div>}
        </div>
        {aside}
      </Container>
    </section>
  );
}

/* ----------------------------------------------------------------------------
 * The real problem
 * ------------------------------------------------------------------------- */
export function ProblemSection() {
  return (
    <Section tone="surface">
      <Container>
        <div className="grid gap-14 lg:grid-cols-[1fr_1.15fr]">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading
              eyebrow="The real problem"
              title="English ability isn’t the same as executive communication."
              lead={
                <p>
                  Many professionals have strong English and still find that it doesn’t carry them when the stakes rise.
                  Vocabulary is there. Grammar is fine. But when the pressure is real, the message comes out longer,
                  softer or less precise than intended.
                </p>
              }
            />
            <blockquote className="mt-10 border-l-2 border-brass pl-6">
              <p className="font-serif text-2xl leading-snug text-ink">
                The goal isn’t to make you study more English.
                <br />
                The goal is to make you perform better in English.
              </p>
            </blockquote>
          </div>
          <div>
            <p className="text-sm font-medium text-muted">Where strong English is tested</p>
            <ul className="mt-5 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
              {pressureSituations.map((s) => (
                <li key={s.title} className="bg-surface p-6">
                  <p className="font-medium text-ink">{s.title}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{s.detail}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </Section>
  );
}

/* ----------------------------------------------------------------------------
 * Traditional vs Executive English Performance
 * ------------------------------------------------------------------------- */
export function ComparisonSection({ tone = "paper" }: { tone?: "paper" | "surface" }) {
  return (
    <Section tone={tone}>
      <Container>
        <SectionHeading
          eyebrow="A different category"
          title="We don’t sell hours. We develop communication performance."
          lead="The difference is where the work starts — and how success is measured."
        />
        <div className="mt-14 grid gap-5 lg:grid-cols-[1fr_1.35fr]">
          <div className="rounded-2xl border border-line bg-surface p-7 md:p-9">
            <p className="text-sm font-medium text-muted">{comparison.traditional.label}</p>
            <ol className="mt-6 flex flex-wrap items-center gap-2 text-sm text-ink-2">
              {comparison.traditional.flow.map((step, i) => (
                <li key={step} className="flex items-center gap-2">
                  <span className="rounded-full border border-line px-3 py-1.5">{step}</span>
                  {i < comparison.traditional.flow.length - 1 && <ArrowRight className="size-3.5 text-faint" aria-hidden />}
                </li>
              ))}
            </ol>
            <ul className="mt-8 flex flex-col gap-3">
              {comparison.traditional.traits.map((t) => (
                <li key={t} className="flex gap-3 text-[15px] text-muted">
                  <Minus className="mt-1 size-4 shrink-0 text-faint" aria-hidden />
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative overflow-hidden rounded-2xl bg-ink p-7 text-paper md:p-9">
            <div aria-hidden className="absolute inset-0 hairline-grid-inverse" />
            <div className="relative">
              <p className="text-sm font-medium text-brass-light">{comparison.performance.label}</p>
              <ol className="mt-6 grid gap-2 sm:grid-cols-2">
                {comparison.performance.flow.map((step, i) => (
                  <li key={step} className="flex items-center gap-3 rounded-lg border border-paper/10 bg-paper/[0.03] px-3.5 py-2.5 text-sm">
                    <span className="text-xs text-paper/45 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                    {step}
                  </li>
                ))}
              </ol>
              <ul className="mt-8 flex flex-col gap-3">
                {comparison.performance.traits.map((t) => (
                  <li key={t} className="flex gap-3 text-[15px] text-paper/80">
                    <Check className="mt-1 size-4 shrink-0 text-brass-light" aria-hidden />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

/* ----------------------------------------------------------------------------
 * How it works
 * ------------------------------------------------------------------------- */
export function ProcessSection({ tone = "surface", withCta = true }: { tone?: "paper" | "surface"; withCta?: boolean }) {
  return (
    <Section tone={tone}>
      <Container>
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading eyebrow="How it works" title="Four steps from assessment to performance." />
          {withCta && (
            <ButtonLink href="/how-it-works" variant="secondary" trackLocation="process_section">
              See the full method
            </ButtonLink>
          )}
        </div>
        <ol className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step) => (
            <li key={step.number} className="flex flex-col bg-surface p-7">
              <span className="font-serif text-4xl text-brass">{step.number}</span>
              <h3 className="mt-8 text-xl font-medium text-ink">{step.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-muted">{step.body}</p>
            </li>
          ))}
        </ol>
        <JourneyFlow className="mt-8" />
      </Container>
    </Section>
  );
}

export function JourneyFlow({ className, inverse }: { className?: string; inverse?: boolean }) {
  return (
    <ol
      aria-label="Program journey"
      className={cn("flex flex-wrap items-center gap-x-2 gap-y-3 text-sm", inverse ? "text-paper/80" : "text-ink-2", className)}
    >
      {journey.map((step, i) => (
        <li key={step} className="flex items-center gap-2">
          <span
            className={cn(
              "rounded-full border px-3.5 py-1.5",
              inverse ? "border-paper/15" : "border-line-strong bg-surface",
              i === journey.length - 1 && (inverse ? "border-brass-light/60 text-paper" : "border-ink bg-ink text-paper"),
            )}
          >
            {step}
          </span>
          {i < journey.length - 1 && <ArrowRight className={cn("size-3.5", inverse ? "text-paper/40" : "text-faint")} aria-hidden />}
        </li>
      ))}
    </ol>
  );
}

/* ----------------------------------------------------------------------------
 * Human + AI model
 * ------------------------------------------------------------------------- */
export function HumanAiSection() {
  return (
    <Section tone="ink" className="relative overflow-hidden">
      <div aria-hidden className="absolute inset-0 hairline-grid-inverse [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      <Container className="relative">
        <SectionHeading
          inverse
          eyebrow="Human expertise + AI practice"
          title={
            <>
              AI gives you more opportunities to practice.
              <br className="hidden md:block" /> The expert helps you become better.
            </>
          }
        />
        <ol className="mt-14 grid gap-5 md:grid-cols-3">
          {humanAiModel.map((item, i) => (
            <li
              key={item.actor}
              className={cn(
                "relative rounded-2xl border p-7",
                i === 2 ? "border-brass-light/40 bg-paper/[0.06]" : "border-paper/10 bg-paper/[0.03]",
              )}
            >
              <p className="text-sm text-paper/55">{item.actor}</p>
              <p className="mt-1 font-serif text-4xl text-paper">{item.role}</p>
              <p className="mt-6 text-[15px] leading-relaxed text-paper/70">{item.body}</p>
              {i < 2 && (
                <ArrowRight aria-hidden className="absolute top-1/2 -right-4 hidden size-5 -translate-y-1/2 text-brass-light md:block" />
              )}
            </li>
          ))}
        </ol>
        <p className="mt-12 max-w-2xl text-lg leading-relaxed text-paper/75">
          AI makes high-quality practice available anytime. Expert coaching makes that practice meaningful.
        </p>
      </Container>
    </Section>
  );
}

/* ----------------------------------------------------------------------------
 * AI practice — coming soon
 * ------------------------------------------------------------------------- */
export function AiPracticeSection({ showCta = true }: { showCta?: boolean }) {
  return (
    <Section tone="paper">
      <Container>
        <div className="grid gap-14 lg:grid-cols-[1fr_1fr]">
          <div>
            <Badge tone="brass">Coming soon · Executive Communication Coach</Badge>
            <SectionHeading
              className="mt-6"
              title="Practice the situations that actually matter."
              lead={
                <p>
                  Our AI-powered communication platform is currently being developed. It will simulate realistic
                  professional conversations and give immediate feedback — then share what it learns with your coach, so
                  every session starts from evidence.
                </p>
              }
            />
            {showCta && (
              <div className="mt-9 flex flex-wrap gap-3">
                <ButtonLink href={ctas.earlyAccess.href} trackLocation="ai_section">
                  Join the Early Access List
                </ButtonLink>
                <ButtonLink href="/ai-coach" variant="secondary" trackLocation="ai_section">
                  About the AI coach
                </ButtonLink>
              </div>
            )}
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="rounded-2xl border border-line bg-surface p-6">
              <p className="text-sm font-medium text-ink">You’ll practice</p>
              <ul className="mt-4 flex flex-col gap-2.5">
                {practiceSituations.map((s) => (
                  <li key={s.label} className="flex items-center gap-2.5 text-[15px] text-ink-2">
                    <span aria-hidden className="size-1.5 rounded-full bg-brass" />
                    {s.label}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-line bg-surface p-6">
              <p className="text-sm font-medium text-ink">Feedback on</p>
              <ul className="mt-4 flex flex-col gap-2.5">
                {feedbackAreas.map((s) => (
                  <li key={s} className="flex items-center gap-2.5 text-[15px] text-ink-2">
                    <span aria-hidden className="size-1.5 rounded-full bg-data" />
                    {s}
                  </li>
                ))}
              </ul>
              <p className="mt-6 border-t border-line pt-4 text-[13px] leading-relaxed text-muted">
                AI is a practice and feedback layer — not a replacement for your coach.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

/* ----------------------------------------------------------------------------
 * Closing call to action
 * ------------------------------------------------------------------------- */
export function CtaBand({
  title = "Prepare for the conversations that matter.",
  lead = "Start with an executive assessment: a focused conversation about your role, your situations and where communication matters most.",
  primary = "assessment",
  secondary = "proposal",
  location,
}: {
  title?: string;
  lead?: string;
  primary?: "assessment" | "proposal";
  secondary?: "assessment" | "proposal" | "earlyAccess" | "none";
  location: string;
}) {
  const first = ctas[primary];
  const second = secondary === "none" ? null : ctas[secondary];
  return (
    <section className="bg-paper py-20 md:py-24">
      <Container>
        <div className="relative overflow-hidden rounded-3xl bg-ink px-7 py-14 text-paper md:px-14 md:py-20">
          <div aria-hidden className="absolute inset-0 hairline-grid-inverse [mask-image:radial-gradient(ellipse_at_top_right,black,transparent_70%)]" />
          <div className="relative grid items-end gap-10 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <h2 className="display text-4xl leading-[1.08] text-paper md:text-5xl">{title}</h2>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-paper/70">{lead}</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-end">
              <ButtonLink href={first.href} variant="inverse" size="lg" trackLocation={location}>
                {first.label}
              </ButtonLink>
              {second && (
                <ButtonLink href={second.href} variant="inverse-outline" size="lg" trackLocation={location}>
                  {second.label}
                </ButtonLink>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

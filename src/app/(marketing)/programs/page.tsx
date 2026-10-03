import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { CtaBand, PageHero } from "@/components/marketing/sections";
import { ButtonLink } from "@/components/ui/button";
import { Badge, Container, Section } from "@/components/ui/primitives";
import { ctas } from "@/config/site";
import { services } from "@/lib/services";
import type { Program } from "@/lib/types";
import { pageMetadata } from "@/lib/seo";
import { formatPrice } from "@/lib/utils";

export const metadata = pageMetadata({
  title: "Executive English Programs",
  description:
    "The 12-week Executive Performance Program, the Executive Communication Advisory for senior leaders, and corporate programs for leadership teams.",
  path: "/programs",
  keywords: ["executive English training", "executive communication training", "English coaching for professionals"],
});

const twelveWeeks = [
  { weeks: "Weeks 1–2", title: "Assess & plan", body: "Executive assessment, priority situations and your communication strategy." },
  { weeks: "Weeks 3–10", title: "Coach & practice", body: "Private coaching, simulations and targeted practice between sessions." },
  { weeks: "Weeks 11–12", title: "Perform & review", body: "Preparation for real events, final assessment and next-step plan." },
];

function ProgramDetail({ program, children, dark }: { program: Program; children?: React.ReactNode; dark?: boolean }) {
  const price = formatPrice(program.price);
  return (
    <Section tone={dark ? "ink" : "surface"} id={program.slug} className="scroll-mt-16">
      <Container className="grid gap-12 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <div className="flex flex-wrap gap-2">
            <Badge tone={dark ? "inverse" : "brass"}>{program.duration}</Badge>
            {program.status === "coming_soon" && <Badge tone={dark ? "inverse" : "caution"}>In development</Badge>}
          </div>
          <h2 className={`display mt-6 text-4xl leading-[1.08] md:text-5xl ${dark ? "text-paper" : "text-ink"}`}>{program.name}</h2>
          <p className={`mt-5 text-lg leading-relaxed ${dark ? "text-paper/75" : "text-ink-2"}`}>{program.description}</p>
          <div className={`mt-8 border-t pt-6 ${dark ? "border-paper/15" : "border-line"}`}>
            <p className={`text-2xl font-semibold ${dark ? "text-paper" : "text-ink"}`}>
              {price.amount}
              {price.period && <span className={`ml-1 text-base font-normal ${dark ? "text-paper/60" : "text-muted"}`}>/ {price.period}</span>}
            </p>
            {program.priceNote && <p className={`mt-1 text-sm ${dark ? "text-paper/60" : "text-muted"}`}>{program.priceNote}</p>}
          </div>
          <ButtonLink href={program.cta.href} variant={dark ? "inverse" : "primary"} size="lg" className="mt-8" trackLocation={`programs_${program.slug}`}>
            {program.cta.label}
          </ButtonLink>
        </div>
        <div className="flex flex-col gap-8">
          <div>
            <p className={`text-sm font-medium ${dark ? "text-paper/60" : "text-muted"}`}>What’s included</p>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {program.includes.map((item) => (
                <li key={item} className={`flex gap-3 text-[15px] ${dark ? "text-paper/85" : "text-ink"}`}>
                  <Check className={`mt-0.5 size-4 shrink-0 ${dark ? "text-brass-light" : "text-data"}`} aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className={`text-sm font-medium ${dark ? "text-paper/60" : "text-muted"}`}>Ideal for</p>
            <ul className="mt-3 flex flex-col gap-2">
              {program.idealFor.map((i) => (
                <li key={i} className={`text-[15px] ${dark ? "text-paper/75" : "text-ink-2"}`}>
                  — {i}
                </li>
              ))}
            </ul>
          </div>
          {children}
        </div>
      </Container>
    </Section>
  );
}

export default async function ProgramsPage() {
  const programs = await services.pricing.listPrograms();
  const bySlug = (slug: string) => programs.find((p) => p.slug === slug)!;

  return (
    <>
      <PageHero
        eyebrow="Programs"
        title="Programs built around communication performance."
        lead={
          <p>
            Every program starts with an assessment and is shaped around your real situations. We don’t sell blocks of
            hours — we design a path from where you are to how you need to perform.
          </p>
        }
      >
        <ButtonLink href={ctas.assessment.href} size="lg" trackLocation="programs_hero">
          {ctas.assessment.label}
        </ButtonLink>
        <ButtonLink href="/pricing" size="lg" variant="secondary">
          Compare pricing
        </ButtonLink>
      </PageHero>

      <ProgramDetail program={bySlug("executive-performance")}>
        <div className="rounded-2xl border border-line bg-paper p-6">
          <p className="text-sm font-medium text-muted">The 12 weeks</p>
          <ol className="mt-4 flex flex-col gap-4">
            {twelveWeeks.map((w) => (
              <li key={w.weeks} className="grid grid-cols-[96px_1fr] gap-4">
                <span className="text-sm text-brass">{w.weeks}</span>
                <span>
                  <span className="font-medium text-ink">{w.title}</span>
                  <span className="block text-sm text-muted">{w.body}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
        <p className="text-sm leading-relaxed text-muted">
          The program commits to a process — assessment, strategy, coaching, practice and measurement. It does not
          promise promotions, salary changes or “fluency in weeks.”
        </p>
      </ProgramDetail>

      <ProgramDetail program={bySlug("executive-advisory")} dark />

      <ProgramDetail program={bySlug("ai-communication-coach")} />

      <Section tone="paper">
        <Container>
          <div className="flex flex-col items-start justify-between gap-8 rounded-2xl border border-line bg-surface p-8 md:flex-row md:items-center md:p-10">
            <div>
              <p className="eyebrow">For companies</p>
              <h2 className="mt-3 font-serif text-3xl text-ink">Corporate pilots and annual programs</h2>
              <p className="mt-2 max-w-xl text-muted">
                Structured programs for leadership teams and cohorts of roughly 10–50 people, with reporting for HR and
                leadership.
              </p>
            </div>
            <Link href="/companies" className="inline-flex items-center gap-2 font-medium text-ink hover:text-harbor-600">
              Programs for companies <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
        </Container>
      </Section>

      <CtaBand location="programs_footer_cta" />
    </>
  );
}

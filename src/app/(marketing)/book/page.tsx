import { Suspense } from "react";
import { ExecutiveAssessmentForm } from "@/components/forms/executive-assessment-form";
import { PageHero } from "@/components/marketing/sections";
import { PhotoFrame } from "@/components/ui/photo";
import { Container, Section } from "@/components/ui/primitives";
import { photos } from "@/content/photos";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Book an Executive Assessment",
  description:
    "Book an executive assessment: a focused conversation about your role, your high-stakes communication situations and how to improve your performance in English.",
  path: "/book",
});

const steps = [
  { title: "You tell us what’s at stake", body: "Your role, your stakeholders and the situations that matter most." },
  { title: "We assess how you communicate", body: "A focused conversation, with real work situations as the material." },
  { title: "You receive clear recommendations", body: "Priorities, a suggested program and a fixed proposal — no obligation." },
];

export default function BookPage() {
  return (
    <>
      <PageHero
        eyebrow="Book a consultation"
        title="Book an Executive Assessment."
        lead={<p>Start with a clear picture of how you communicate today, and what would make the biggest difference.</p>}
      />
      <Section tone="surface" className="pt-14 md:pt-16">
        <Container className="grid gap-12 lg:grid-cols-[1.5fr_1fr]">
          <div className="rounded-2xl border border-line bg-paper p-6 sm:p-8 md:p-10">
            <Suspense>
              <ExecutiveAssessmentForm />
            </Suspense>
          </div>
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <PhotoFrame photo={photos.notebookPens} sizes="(min-width: 1024px) 400px, 100vw" aspect="aspect-[16/10]" className="mb-10" />
            <p className="eyebrow">What happens next</p>
            <ol className="mt-6 flex flex-col gap-7">
              {steps.map((s, i) => (
                <li key={s.title} className="grid grid-cols-[40px_1fr] gap-3">
                  <span className="font-serif text-2xl text-brass">{i + 1}</span>
                  <div>
                    <p className="font-medium text-ink">{s.title}</p>
                    <p className="mt-1 text-[15px] leading-relaxed text-muted">{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="mt-10 border-t border-line pt-6 text-sm leading-relaxed text-muted">
              Your information is used only to prepare for and follow up on your assessment. It is never sold.
            </p>
          </aside>
        </Container>
      </Section>
    </>
  );
}

import { Suspense } from "react";
import { CorporateInquiryForm } from "@/components/forms/corporate-inquiry-form";
import { PageHero } from "@/components/marketing/sections";
import { Container, Section } from "@/components/ui/primitives";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Request a Corporate Proposal",
  description:
    "Request a proposal for a corporate executive communication pilot or annual program for your leadership team.",
  path: "/proposal",
});

const includes = [
  "Recommended format: pilot or annual program",
  "Participant assessment approach",
  "Business-specific scenarios to develop",
  "Coaching structure and cadence",
  "Reporting for HR and leadership",
  "Timeline and investment",
];

export default function ProposalPage() {
  return (
    <>
      <PageHero
        eyebrow="For companies"
        title="Request a Corporate Proposal."
        lead={<p>Tell us about your team and where English communication affects results. We’ll follow up to scope the right program.</p>}
      />
      <Section tone="surface" className="pt-14 md:pt-16">
        <Container className="grid gap-12 lg:grid-cols-[1.5fr_1fr]">
          <div className="rounded-2xl border border-line bg-paper p-6 sm:p-8 md:p-10">
            <Suspense>
              <CorporateInquiryForm />
            </Suspense>
          </div>
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <p className="eyebrow">Your proposal will cover</p>
            <ul className="mt-6 flex flex-col divide-y divide-line border-y border-line">
              {includes.map((i) => (
                <li key={i} className="py-3.5 text-[15px] text-ink">
                  {i}
                </li>
              ))}
            </ul>
            <p className="mt-8 text-sm leading-relaxed text-muted">
              Typical next step: a short discovery call with HR or the business leader sponsoring the program.
            </p>
          </aside>
        </Container>
      </Section>
    </>
  );
}

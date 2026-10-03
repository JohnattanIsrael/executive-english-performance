import { PageHero } from "@/components/marketing/sections";
import { Container, PlaceholderNote, Section } from "@/components/ui/primitives";
import { site } from "@/config/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Privacy Notice",
  description: `How ${site.name} handles personal information submitted through this website.`,
  path: "/privacy",
});

const sections = [
  {
    title: "Information you provide",
    body: "When you request an assessment, a corporate proposal, early access or contact us, we collect the details you enter in the form — such as your name, email, company, role, country and a description of your communication needs.",
  },
  {
    title: "How we use it",
    body: "We use this information to respond to your request, prepare for consultations, send proposals and, if you join the early-access list, to tell you about the AI communication platform. We do not sell personal information.",
  },
  {
    title: "Service providers",
    body: "Form submissions may be processed by service providers we use for email, scheduling and customer relationship management. [List providers once selected.]",
  },
  {
    title: "Analytics",
    body: "We may use privacy-conscious analytics to understand how the website is used, such as which pages are visited. [Name the analytics provider and cookie usage once configured.]",
  },
  {
    title: "Retention and your rights",
    body: "You can ask us to access, correct or delete your information at any time by contacting us. [Add retention periods and jurisdiction-specific rights, e.g. GDPR/CCPA, as applicable.]",
  },
  {
    title: "Contact",
    body: `Questions about privacy can be sent to ${site.contact.email}.`,
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Privacy notice" />
      <Section tone="surface">
        <Container className="max-w-3xl">
          <PlaceholderNote>
            Draft for review. Have this notice reviewed by qualified counsel and completed with your providers and
            jurisdiction before launch.
          </PlaceholderNote>
          <div className="mt-10 flex flex-col gap-10">
            {sections.map((s) => (
              <section key={s.title}>
                <h2 className="font-serif text-2xl text-ink">{s.title}</h2>
                <p className="mt-3 text-[16px] leading-relaxed text-ink-2">{s.body}</p>
              </section>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}

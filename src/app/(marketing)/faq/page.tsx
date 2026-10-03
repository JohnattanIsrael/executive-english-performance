import { FaqList } from "@/components/marketing/faq-list";
import { CtaBand, PageHero } from "@/components/marketing/sections";
import { Container, JsonLd, Section } from "@/components/ui/primitives";
import { faqs, type FaqItem } from "@/content/faq";
import { faqJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "FAQ",
  description:
    "Answers about executive English coaching: how it differs from an English course, the role of AI, program structure and corporate enrollment.",
  path: "/faq",
});

const groups: { key: FaqItem["group"]; title: string }[] = [
  { key: "approach", title: "The approach" },
  { key: "ai", title: "AI and the platform" },
  { key: "programs", title: "Programs" },
  { key: "companies", title: "For companies" },
];

export default function FaqPage() {
  return (
    <>
      <JsonLd data={faqJsonLd(faqs)} />
      <PageHero eyebrow="FAQ" title="Questions, answered plainly." />
      <Section tone="surface">
        <Container className="flex flex-col gap-16">
          {groups.map((g) => (
            <div key={g.key} className="grid gap-6 lg:grid-cols-[1fr_2.2fr]">
              <h2 className="font-serif text-2xl text-ink">{g.title}</h2>
              <FaqList items={faqs.filter((f) => f.group === g.key)} />
            </div>
          ))}
        </Container>
      </Section>
      <CtaBand location="faq_footer_cta" />
    </>
  );
}

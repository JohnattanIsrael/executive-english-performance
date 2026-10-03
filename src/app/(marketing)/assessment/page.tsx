import { SelfAssessment } from "@/components/assessment/self-assessment";
import { PageHero } from "@/components/marketing/sections";
import { Container, Section } from "@/components/ui/primitives";
import { services } from "@/lib/services";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Executive Communication Self-Assessment",
  description:
    "A free, 3-minute self-assessment that builds an initial Executive Communication Profile across presentations, meetings, spontaneous speaking, vocabulary, clarity, precision and presence.",
  path: "/assessment",
});

export default async function AssessmentPage() {
  const questions = await services.assessment.getQuestions();
  return (
    <>
      <PageHero
        eyebrow="Self-assessment"
        title="Where does your English communication stand?"
        lead={<p>A short, structured reflection on how you use English at work — and where focused practice would make the biggest difference.</p>}
      />
      <Section tone="paper" className="pt-12 md:pt-16">
        <Container className="max-w-4xl">
          <SelfAssessment questions={questions} context="public" />
        </Container>
      </Section>
    </>
  );
}

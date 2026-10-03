/**
 * About-page content.
 *
 * IMPORTANT: Every field marked `placeholder: true` must be replaced with the
 * founder's real, verifiable information before launch. Nothing here is a
 * claim about the business until it is replaced.
 */
export interface Credential {
  label: string;
  value: string;
  placeholder: boolean;
}

export const founder = {
  name: "[Founder Name]",
  title: "Founder & Lead Executive Communication Coach",
  portrait: null as string | null, // e.g. "/images/founder.jpg" — professional portrait recommended
  bio: [
    "[Short professional biography: where you started teaching, the kinds of professionals you have worked with, and what you have learned about how people actually communicate under pressure.]",
    "[Describe the moment you realized that strong English and executive communication are different skills — and why that shaped this company.]",
  ],
  credentials: [
    { label: "Years of teaching experience", value: "[XX years]", placeholder: true },
    { label: "Industries served", value: "[e.g. Technology, Finance, Manufacturing, Legal]", placeholder: true },
    { label: "Countries worked with", value: "[List of countries]", placeholder: true },
    { label: "Executive clients", value: "[Description — no names without permission]", placeholder: true },
    { label: "Corporate experience", value: "[Organizations or sectors, where permitted]", placeholder: true },
    { label: "Certifications", value: "[e.g. CELTA, DELTA, coaching certifications]", placeholder: true },
    { label: "Professional background", value: "[Relevant prior roles]", placeholder: true },
  ] satisfies Credential[],
};

export const methodologyPrinciples = [
  {
    title: "Start from the situation, not the syllabus",
    body: "We begin with the meetings, presentations and conversations that matter in your role, and work backwards to the language and behaviors they require.",
  },
  {
    title: "Observe how people actually communicate",
    body: "The methodology comes from years of watching professionals perform in real business settings — where hesitation, structure and tone matter as much as vocabulary.",
  },
  {
    title: "Practice deliberately, and often",
    body: "Improvement comes from repetition with feedback. Coaching sessions set direction; structured practice between sessions builds the habit.",
  },
  {
    title: "Measure what changes",
    body: "Progress is tracked against your real situations through coach observation and periodic assessment — not by hours attended.",
  },
];

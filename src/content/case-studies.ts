/**
 * Case-study framework.
 *
 * These entries are SAMPLE STRUCTURES ONLY. They illustrate the format and
 * must be replaced with verified client data (with written permission) before
 * they are presented as results. `isSample` drives the on-page warning label.
 */
export interface CaseStudy {
  slug: string;
  isSample: boolean;
  title: string;
  clientProfile: string;
  clientSituation: string;
  communicationChallenge: string;
  intervention: string;
  aiPractice: string;
  humanCoaching: string;
  observedImprovement: string;
  clientQuote: string | null;
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "sample-engineering-director",
    isSample: true,
    title: "Explaining technical risk to an international leadership team",
    clientProfile: "[Role, industry, region — anonymized]",
    clientSituation:
      "[Example structure] An engineering director reporting monthly to a US-based leadership team on platform reliability.",
    communicationChallenge:
      "[Example structure] Updates were accurate but long; leadership questions often derailed the conversation before the key decision was reached.",
    intervention:
      "[Example structure] Restructured updates around a decision-first format and rehearsed responses to the most likely challenging questions.",
    aiPractice: "[Describe the simulations practiced once the AI platform is available, or remove this section.]",
    humanCoaching: "[Describe the coaching focus, number of sessions and key feedback themes.]",
    observedImprovement: "[Describe verified, observable change — avoid unsupported numbers.]",
    clientQuote: null,
  },
  {
    slug: "sample-sales-leader",
    isSample: true,
    title: "Negotiating renewals with enterprise clients",
    clientProfile: "[Role, industry, region — anonymized]",
    clientSituation:
      "[Example structure] A regional sales leader responsible for renewals with North American enterprise accounts.",
    communicationChallenge:
      "[Example structure] Under pricing pressure, responses became defensive and concessions came too early.",
    intervention:
      "[Example structure] Built negotiation language for anchoring, reframing and conditional concessions; rehearsed pressure scenarios.",
    aiPractice: "[Describe the simulations practiced, or remove this section.]",
    humanCoaching: "[Describe the coaching focus and key feedback themes.]",
    observedImprovement: "[Describe verified, observable change.]",
    clientQuote: null,
  },
  {
    slug: "sample-leadership-cohort",
    isSample: true,
    title: "A leadership cohort preparing for a new US headquarters",
    clientProfile: "[Company size, industry, region — anonymized]",
    clientSituation:
      "[Example structure] Following an acquisition, a group of managers began reporting to a US-based headquarters.",
    communicationChallenge:
      "[Example structure] Managers were fluent in day-to-day work but hesitant in leadership meetings and quarterly reviews.",
    intervention:
      "[Example structure] Assessment of each manager, cohort workshops on meeting communication, and individual coaching for key presenters.",
    aiPractice: "[Describe the company-specific scenarios, or remove this section.]",
    humanCoaching: "[Describe group and individual coaching structure.]",
    observedImprovement: "[Describe verified change reported by the company.]",
    clientQuote: null,
  },
];

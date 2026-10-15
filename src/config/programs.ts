import type { Program } from "@/lib/types";

/**
 * Program catalogue and pricing.
 *
 * This is the single source of truth for every price shown on the site.
 * It is served through PricingService so the admin UI (/admin/programs) can
 * edit it once a database is connected. Prices are illustrative positioning
 * set by the business — adjust freely.
 */
export const programs: Program[] = [
  {
    id: "prog_exec_performance",
    slug: "executive-performance",
    audience: "b2c",
    name: "Executive Performance Program",
    tagline: "A 12-week intensive in executive communication.",
    description:
      "A structured, private program built around the meetings, presentations and negotiations you actually face. Expert coaching sets the direction; AI-assisted practice multiplies your repetitions between sessions.",
    duration: "12 weeks",
    idealFor: [
      "Directors, VPs and senior managers working with international leadership",
      "Professionals preparing for a defined high-stakes period",
      "Engineers, consultants and lawyers who must explain complex work clearly",
    ],
    includes: [
      "Initial executive assessment",
      "Personalized communication strategy",
      "Private coaching sessions",
      "AI-assisted practice between sessions",
      "Executive scenarios tailored to your role",
      "Presentation preparation",
      "Meeting simulations",
      "Negotiation simulations",
      "Professional writing feedback",
      "Personalized exercises",
      "Coach feedback on recorded practice",
      "Progress assessments at key milestones",
    ],
    price: { display: "range", min: 2500, max: 5000, currency: "USD" },
    priceNote: "Depends on coaching frequency and preparation scope.",
    cta: { label: "Apply for the Executive Program", href: "/book?program=executive-performance" },
    status: "available",
    featured: true,
  },
  {
    id: "prog_exec_fast_track",
    slug: "executive-fast-track",
    audience: "b2c",
    name: "Executive Fast Track",
    tagline: "English foundations for leaders, in an 8-week intensive.",
    description:
      "For executives and senior professionals whose English is still basic and who need to start working in it now. We skip the general syllabus and build only the English your own role requires — introductions, meetings, calls, emails and short updates — at a fast, coached pace.",
    duration: "8 weeks",
    idealFor: [
      "Leaders starting to report to a US or European parent company",
      "Professionals stepping into an international role or client portfolio",
      "Executives at a beginner or elementary level (around CEFR A1–A2)",
    ],
    includes: [
      "Initial level and needs assessment",
      "Three 45-minute private sessions per week",
      "Daily 20-minute guided practice",
      "Your own work vocabulary and phrase bank",
      "Meeting, call and email templates for your role",
      "Rehearsals of your real upcoming situations",
      "Weekly progress check-ins with your coach",
      "Final reassessment and next-step plan",
    ],
    price: { display: "range", min: 1800, max: 3200, currency: "USD" },
    priceNote: "Depends on session frequency and the situations we prepare.",
    cta: { label: "Apply for the Fast Track", href: "/book?program=executive-fast-track" },
    status: "available",
  },
  {
    id: "prog_exec_advisory",
    slug: "executive-advisory",
    audience: "b2c",
    name: "Executive Communication Advisory",
    tagline: "An ongoing advisory relationship for senior leaders.",
    description:
      "For CEOs, founders and senior executives who need a trusted communication advisor on call — preparing board meetings, investor conversations, negotiations and the messages that carry weight.",
    duration: "Annual relationship",
    idealFor: [
      "CEOs and founders operating across markets",
      "Senior executives reporting to international boards or headquarters",
      "Leaders with recurring high-stakes communication",
    ],
    includes: [
      "Priority coaching and scheduling",
      "Executive communication strategy",
      "Presentation and keynote preparation",
      "High-stakes meeting preparation",
      "Negotiation preparation",
      "Executive email and message review",
      "On-demand communication feedback",
      "AI-assisted practice",
      "Quarterly communication assessments",
    ],
    price: { display: "range", min: 5000, max: 10000, openEnded: true, period: "year", currency: "USD" },
    priceNote: "Scoped to your calendar of high-stakes moments.",
    cta: { label: "Book an Executive Assessment", href: "/book?program=executive-advisory" },
    status: "available",
  },
  {
    id: "prog_ai_coach",
    slug: "ai-communication-coach",
    audience: "b2c",
    name: "AI Communication Coach",
    tagline: "Practice realistic professional conversations, anytime.",
    description:
      "A practice platform currently in development. Early-access members will be invited as functionality becomes available, starting with clients in coaching programs.",
    duration: "Subscription",
    idealFor: ["Professionals who want structured practice between real conversations"],
    includes: [
      "Scenario-based role-play",
      "Feedback on clarity, structure and language",
      "Practice history and progress view",
      "Connection to your human coach",
    ],
    price: { display: "soon", label: "Coming soon", currency: "USD" },
    priceNote: "Early-access subscription. Pricing announced at launch.",
    cta: { label: "Join AI Early Access", href: "/ai-coach#early-access" },
    status: "coming_soon",
  },
  {
    id: "prog_corporate_pilot",
    slug: "corporate-pilot",
    audience: "b2b",
    name: "Corporate Pilot",
    tagline: "Prove the approach with one team first.",
    description:
      "An 8–12 week pilot for a defined group of managers or executives, with assessments, coaching, simulations and a closing report for leadership.",
    duration: "8–12 weeks",
    idealFor: ["HR and L&D teams validating a new approach", "A single department or leadership group"],
    includes: [
      "Company onboarding and needs analysis",
      "Participant assessments",
      "Individual communication profiles",
      "Human coaching",
      "Business-specific scenarios",
      "AI-assisted practice as it becomes available",
      "Pilot report for leadership",
    ],
    price: { display: "from", min: 5000, currency: "USD" },
    priceNote: "Typically $5,000–$10,000 depending on cohort size.",
    cta: { label: "Request a Corporate Proposal", href: "/proposal?program=corporate-pilot" },
    status: "available",
  },
  {
    id: "prog_corporate_program",
    slug: "corporate-program",
    audience: "b2b",
    name: "Corporate Executive Communication Program",
    tagline: "A structured annual program for cohorts of roughly 10–50 people.",
    description:
      "A company-wide program designed around your real communication needs: international clients, headquarters reporting, sales, negotiations and leadership meetings.",
    duration: "Annual",
    idealFor: [
      "Companies whose leaders work with US, Canadian or European stakeholders",
      "Organizations with international clients, teams or headquarters",
    ],
    includes: [
      "Company onboarding",
      "Employee assessments",
      "Individual communication profiles",
      "Human coaching",
      "AI-assisted practice",
      "Executive simulations",
      "Business-specific scenarios",
      "Leadership communication",
      "Meeting and presentation training",
      "Progress dashboards",
      "Quarterly reporting",
    ],
    price: { display: "custom", min: 20000, max: 100000, openEnded: true, period: "year", label: "Custom annual pricing", currency: "USD" },
    priceNote: "Customized based on company size and scope.",
    cta: { label: "Request a Corporate Proposal", href: "/proposal?program=corporate-program" },
    status: "available",
  },
];

export const pricingNote =
  "Pricing reflects program scope, executive involvement, coaching frequency and number of participants.";

export const pricingNoteEs =
  "El precio refleja el alcance del programa, la participación ejecutiva, la frecuencia del coaching y el número de participantes.";

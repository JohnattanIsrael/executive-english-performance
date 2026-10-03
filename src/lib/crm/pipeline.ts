import { programs } from "@/config/programs";
import type { Lead, LeadKind, LeadSource, PipelineStage } from "@/lib/types";
import { uid } from "@/lib/utils";

export const pipeline: { stage: PipelineStage; label: string; description: string }[] = [
  { stage: "new_lead", label: "New Lead", description: "Form submitted, not yet reviewed" },
  { stage: "qualified", label: "Qualified", description: "Fit confirmed: role, need and budget" },
  { stage: "assessment", label: "Assessment", description: "Executive assessment or discovery call booked" },
  { stage: "proposal", label: "Proposal", description: "Program proposal drafted or sent" },
  { stage: "won", label: "Won", description: "Agreement signed, onboarding scheduled" },
  { stage: "active", label: "Active", description: "Client in program" },
  { stage: "renewal", label: "Renewal", description: "Approaching renewal or extension" },
];

const priceOf = (slug: string) => programs.find((p) => p.slug === slug)?.price;
const midpoint = (slug: string) => {
  const p = priceOf(slug);
  if (!p?.min) return 0;
  return p.max ? Math.round((p.min + p.max) / 2) : p.min;
};

const SENIOR_ROLE = /\b(ceo|cfo|coo|cto|founder|president|chief|managing (director|partner)|owner|vp|vice president|svp|evp)\b/i;

/**
 * Rough deal value used to prioritize the pipeline. A heuristic based on
 * program pricing — not a forecast. Tune as real conversion data arrives.
 */
export function estimateDealValue(kind: LeadKind, payload: Record<string, unknown>): number {
  if (kind === "executive_assessment") {
    const role = String(payload.jobTitle ?? "");
    const program = String(payload.program ?? "");
    // An explicit program choice wins; otherwise seniority suggests the advisory tier.
    if (program === "executive-advisory" || program === "executive-performance") return midpoint(program);
    return midpoint(SENIOR_ROLE.test(role) ? "executive-advisory" : "executive-performance");
  }
  if (kind === "corporate_inquiry") {
    const leaders = String(payload.leaderCount ?? "");
    if (leaders === "50+") return 60000;
    if (leaders === "26-50") return 40000;
    if (leaders === "11-25") return 20000;
    return midpoint("corporate-pilot") || 7500;
  }
  return 0;
}

export function buildLead(kind: LeadKind, payload: Record<string, unknown>, source: LeadSource): Lead {
  const isCorporate = kind === "corporate_inquiry";
  const str = (key: string) => (typeof payload[key] === "string" ? (payload[key] as string) : undefined);
  return {
    id: uid("lead"),
    createdAt: new Date().toISOString(),
    kind,
    segment: isCorporate ? "b2b" : "b2c",
    source,
    name: str("name") ?? "",
    email: str("email") ?? "",
    company: str("company"),
    role: str("jobTitle") ?? str("position"),
    country: str("country"),
    communicationChallenge: str("mainChallenge") ?? str("businessChallenge") ?? str("message"),
    estimatedDealValue: estimateDealValue(kind, payload),
    stage: "new_lead",
    proposalStatus: "none",
    customerStatus: "prospect",
    payload,
  };
}

/** Captures page, referrer and UTM parameters for lead attribution. */
export function currentLeadSource(): LeadSource {
  if (typeof window === "undefined") return { page: "" };
  const params = new URLSearchParams(window.location.search);
  const utm: LeadSource["utm"] = {};
  for (const key of ["source", "medium", "campaign", "term", "content"] as const) {
    const value = params.get(`utm_${key}`);
    if (value) utm[key] = value;
  }
  return {
    page: window.location.pathname,
    referrer: document.referrer || undefined,
    utm: Object.keys(utm).length ? utm : undefined,
  };
}

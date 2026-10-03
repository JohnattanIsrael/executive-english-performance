/**
 * Analytics event catalogue. Every tracked event is declared here with its
 * properties so providers (GA4, Plausible, PostHog, a CDP...) receive a
 * consistent schema.
 */
export interface AnalyticsEvents {
  landing_page_view: { path: string };
  pricing_viewed: { path: string };
  pricing_tier_clicked: { tier: string; audience: "b2c" | "b2b"; location: string };
  assessment_started: { context: "public" | "dashboard" };
  assessment_completed: { context: "public" | "dashboard"; priorities: string };
  consultation_booked: { program?: string; contactMethod: string };
  corporate_inquiry_submitted: { employeeCount: string; leaderCount: string; program?: string };
  early_access_signup: { location: string };
  contact_submitted: { topic: string };
  cta_clicked: { label: string; location: string; href: string };
  simulation_started: { scenarioId: string };
  simulation_completed: { scenarioId: string; turns: number };
}

export type AnalyticsEventName = keyof AnalyticsEvents;

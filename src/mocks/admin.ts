/** Sample data for the operator console (/admin). */
import type { AdminUser, Coach, ContentItem, Lead } from "@/lib/types";
import { daysFromNow } from "./client";

export const sampleCoaches: Coach[] = [
  {
    id: "coach_lead",
    name: "[Founder Name]",
    title: "Lead Executive Communication Coach",
    specialties: ["Executive presence", "Presentations", "Negotiation"],
    timezone: "[Timezone]",
    activeClients: 9,
    capacity: 12,
    status: "active",
  },
  {
    id: "coach_2",
    name: "[Associate Coach]",
    title: "Executive Communication Coach",
    specialties: ["Technical communication", "Meetings"],
    timezone: "[Timezone]",
    activeClients: 4,
    capacity: 10,
    status: "onboarding",
  },
];

export const sampleUsers: AdminUser[] = [
  { id: "usr_demo_john", name: "John Sample", email: "john.sample@example.com", role: "client", company: "Sample Company", status: "active", lastActive: daysFromNow(-1) },
  { id: "usr_company_admin", name: "HR Admin Sample", email: "hr.admin@example.com", role: "company_admin", company: "Sample Company", status: "active", lastActive: daysFromNow(-3) },
  { id: "usr_client_2", name: "Client Sample B", email: "client.b@example.com", role: "client", status: "active", lastActive: daysFromNow(-2) },
  { id: "usr_client_3", name: "Client Sample C", email: "client.c@example.com", role: "client", status: "invited" },
  { id: "coach_lead", name: "[Founder Name]", email: "[hello@yourdomain.com]", role: "coach", status: "active", lastActive: daysFromNow(0) },
  { id: "usr_admin", name: "Operations Admin", email: "ops@example.com", role: "admin", status: "active", lastActive: daysFromNow(0) },
];

const base = { proposalStatus: "none", customerStatus: "prospect", isSample: true, payload: {} } as const;

export const sampleLeads: Lead[] = [
  { ...base, id: "lead_s1", createdAt: daysFromNow(-1), kind: "executive_assessment", segment: "b2c", source: { page: "/book" }, name: "Sample Lead — VP Sales", email: "lead1@example.com", company: "[Company]", role: "VP Sales", country: "Brazil", communicationChallenge: "Pricing negotiations with US clients", estimatedDealValue: 3750, stage: "new_lead" },
  { ...base, id: "lead_s2", createdAt: daysFromNow(-3), kind: "corporate_inquiry", segment: "b2b", source: { page: "/proposal", utm: { source: "linkedin" } }, name: "Sample Lead — HR Director", email: "lead2@example.com", company: "[Company]", role: "HR Director", country: "Mexico", communicationChallenge: "Managers reporting to new US headquarters", estimatedDealValue: 25000, stage: "qualified" },
  { ...base, id: "lead_s3", createdAt: daysFromNow(-6), kind: "executive_assessment", segment: "b2c", source: { page: "/executives" }, name: "Sample Lead — Founder", email: "lead3@example.com", company: "[Company]", role: "Founder & CEO", country: "Spain", communicationChallenge: "Investor conversations", estimatedDealValue: 7500, stage: "assessment", consultationDate: daysFromNow(2, 11) },
  { ...base, id: "lead_s4", createdAt: daysFromNow(-12), kind: "corporate_inquiry", segment: "b2b", source: { page: "/companies" }, name: "Sample Lead — L&D Manager", email: "lead4@example.com", company: "[Company]", role: "L&D Manager", country: "Colombia", communicationChallenge: "Sales team presenting to international clients", estimatedDealValue: 7500, stage: "proposal", proposalStatus: "sent" },
  { ...base, id: "lead_s5", createdAt: daysFromNow(-20), kind: "executive_assessment", segment: "b2c", source: { page: "/pricing" }, name: "Sample Lead — Engineering Director", email: "lead5@example.com", company: "[Company]", role: "Engineering Director", country: "Poland", communicationChallenge: "Leadership updates", estimatedDealValue: 3750, stage: "won", proposalStatus: "accepted", customerStatus: "customer" },
  { ...base, id: "lead_s6", createdAt: daysFromNow(-60), kind: "executive_assessment", segment: "b2c", source: { page: "/" }, name: "Sample Lead — Managing Partner", email: "lead6@example.com", company: "[Company]", role: "Managing Partner", country: "Chile", communicationChallenge: "Client pitches", estimatedDealValue: 7500, stage: "active", proposalStatus: "accepted", customerStatus: "customer" },
  { ...base, id: "lead_s7", createdAt: daysFromNow(-330), kind: "corporate_inquiry", segment: "b2b", source: { page: "/companies" }, name: "Sample Lead — Country Manager", email: "lead7@example.com", company: "[Company]", role: "Country Manager", country: "Argentina", communicationChallenge: "Leadership team communication", estimatedDealValue: 40000, stage: "renewal", proposalStatus: "accepted", customerStatus: "customer" },
];

/**
 * Content readiness checklist: everything on the public site that must be
 * replaced with verified business information before launch.
 */
export const contentItems: ContentItem[] = [
  { id: "c_founder_name", area: "about", title: "Founder name, title and portrait", location: "src/content/founder.ts", status: "placeholder", owner: "Founder" },
  { id: "c_founder_bio", area: "about", title: "Founder biography", location: "src/content/founder.ts", status: "placeholder", owner: "Founder" },
  { id: "c_credentials", area: "about", title: "Experience, industries, countries, certifications", location: "src/content/founder.ts", status: "placeholder", owner: "Founder" },
  { id: "c_case_1", area: "case_study", title: "Case study 1 — verified client data and permission", location: "src/content/case-studies.ts", status: "placeholder", owner: "Founder" },
  { id: "c_case_2", area: "case_study", title: "Case study 2 — verified client data and permission", location: "src/content/case-studies.ts", status: "placeholder", owner: "Founder" },
  { id: "c_case_3", area: "case_study", title: "Case study 3 — verified client data and permission", location: "src/content/case-studies.ts", status: "placeholder", owner: "Founder" },
  { id: "c_contact", area: "homepage", title: "Contact email and location", location: "src/config/site.ts", status: "placeholder", owner: "Operations" },
  { id: "c_privacy", area: "legal", title: "Privacy policy reviewed by counsel", location: "src/app/(marketing)/privacy/page.tsx", status: "draft", owner: "Legal" },
  { id: "c_pricing", area: "pricing", title: "Confirm program pricing", location: "src/config/programs.ts", status: "draft", owner: "Founder" },
  { id: "c_photo", area: "media", title: "Founder portrait (professional photography)", location: "src/content/founder.ts", status: "placeholder", owner: "Marketing" },
  { id: "c_stock", area: "media", title: "Site photography (Unsplash, credited on /credits)", location: "src/content/photos.ts", status: "verified", owner: "Marketing" },
  { id: "c_copy", area: "homepage", title: "Positioning and homepage copy", location: "src/content/marketing.ts", status: "verified", owner: "Founder" },
];

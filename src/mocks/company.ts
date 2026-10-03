/** Sample B2B workspace data for /company. Clearly labeled as sample in the UI. */
import type { CohortProgram, Company, CompanyReport, Employee, MetricReading } from "@/lib/types";
import { daysFromNow } from "./client";

export const sampleCompany: Company = {
  id: "cmp_sample",
  name: "Sample Company",
  industry: "Industrial technology",
  headquarters: "[City, Country]",
  seats: 24,
  admins: ["usr_company_admin"],
  isSample: true,
};

const departments = ["Engineering", "Sales", "Operations", "Finance", "Product"];
const statuses: Employee["status"][] = ["active", "active", "active", "assessing", "active", "invited", "completed"];
const focuses = [
  "Decision-first updates",
  "Negotiation language",
  "Meeting participation",
  "Presenting to leadership",
  "Technical explanations",
  "Client escalations",
];
const titles = ["Director", "Senior Manager", "Manager", "Team Lead", "VP", "Principal Engineer"];

export const sampleEmployees: Employee[] = Array.from({ length: 18 }, (_, i) => {
  const status = statuses[i % statuses.length];
  const active = status === "active" || status === "completed";
  return {
    id: `emp_${i + 1}`,
    name: `Participant ${String(i + 1).padStart(2, "0")}`,
    jobTitle: `${titles[i % titles.length]}, ${departments[i % departments.length]}`,
    department: departments[i % departments.length],
    status,
    sessionsCompleted: active ? 2 + ((i * 7) % 9) : 0,
    practiceMinutes: active ? 40 + ((i * 37) % 220) : 0,
    focus: focuses[i % focuses.length],
    lastActive: status === "invited" ? undefined : daysFromNow(-((i * 3) % 11)),
  };
});

export const samplePrograms: CohortProgram[] = [
  {
    id: "coh_pilot",
    name: "Leadership Communication Pilot",
    kind: "pilot",
    startDate: daysFromNow(-35),
    endDate: daysFromNow(49),
    participants: 18,
    phases: [
      { name: "Onboarding & needs analysis", status: "done", description: "Leadership interviews and scenario design." },
      { name: "Participant assessments", status: "done", description: "Individual communication profiles for every participant." },
      { name: "Coaching & practice", status: "current", description: "Bi-weekly coaching with structured practice between sessions." },
      { name: "Mid-point review", status: "upcoming", description: "Progress review with HR and department heads." },
      { name: "Pilot report", status: "upcoming", description: "Findings and recommendation for an annual program." },
    ],
    customScenarios: ["present-q4-results", "client-escalation", "quarterly-business-review"],
  },
];

export const sampleReports: CompanyReport[] = [
  {
    id: "rep_kickoff",
    title: "Pilot kickoff summary",
    period: "Weeks 1–2",
    status: "ready",
    summary: "Program objectives, participant list, communication priorities identified with leadership, and the scenario plan.",
  },
  {
    id: "rep_assess",
    title: "Cohort assessment overview",
    period: "Weeks 2–4",
    status: "ready",
    summary: "Aggregated communication profile across the cohort and the three development themes chosen for coaching.",
  },
  {
    id: "rep_mid",
    title: "Mid-point progress report",
    period: "Weeks 1–6",
    status: "in_preparation",
    summary: "Participation, practice volume, coach observations and recommended adjustments.",
  },
];

export const sampleCohortMetrics: MetricReading[] = [
  { key: "clarity", value: 64, previous: 58, source: "coach_rating" },
  { key: "vocabulary", value: 71, previous: 69, source: "coach_rating" },
  { key: "grammar", value: 76, previous: 75, source: "coach_rating" },
  { key: "pronunciation", value: 72, previous: 71, source: "coach_rating" },
  { key: "responseQuality", value: 60, previous: 54, source: "coach_rating" },
  { key: "confidence", value: 57, previous: 51, source: "self_assessment" },
];

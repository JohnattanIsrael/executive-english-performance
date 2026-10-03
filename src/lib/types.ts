/**
 * Domain model shared by the UI and every service implementation.
 * Mock data and future API adapters must both conform to these types,
 * which keeps components independent of where data comes from.
 */

export type ID = string;
export type ISODate = string;

/* ----------------------------------------------------------------------------
 * Users, roles & auth
 * ------------------------------------------------------------------------- */

export type Role = "client" | "company_admin" | "coach" | "admin";

export interface UserProfile {
  id: ID;
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
  jobTitle: string;
  company?: string;
  companyId?: ID;
  industry?: string;
  country?: string;
  timezone?: string;
  coachId?: ID;
  programId?: ID;
  communicationFocus: string;
  goals: string[];
  upcomingSituations: UpcomingSituation[];
  joinedAt: ISODate;
}

export interface UpcomingSituation {
  id: ID;
  title: string;
  date?: ISODate;
  type: ScenarioCategory;
  notes?: string;
}

export interface Session {
  user: UserProfile;
  /** True while authentication is mocked; the UI shows a demo banner. */
  isDemo: boolean;
}

/* ----------------------------------------------------------------------------
 * Communication profile & metrics
 * ------------------------------------------------------------------------- */

export type MetricKey =
  | "clarity"
  | "vocabulary"
  | "grammar"
  | "pronunciation"
  | "responseQuality"
  | "confidence";

/** How a metric value was produced. Shown in the UI so no score is overstated. */
export type MetricSource = "self_assessment" | "coach_rating" | "ai_estimate";

export interface MetricReading {
  key: MetricKey;
  /** 0–100 practice indicator. Not a standardized or validated test score. */
  value: number;
  previous?: number;
  source: MetricSource;
}

export type ProfileDimensionKey =
  | "presentation"
  | "meetings"
  | "spontaneous"
  | "vocabulary"
  | "clarity"
  | "precision"
  | "presence";

export interface ProfileDimension {
  key: ProfileDimensionKey;
  label: string;
  /** 1–5 band derived from answers. */
  band: 1 | 2 | 3 | 4 | 5;
  summary: string;
}

/* ----------------------------------------------------------------------------
 * Assessment
 * ------------------------------------------------------------------------- */

export interface AssessmentOption {
  value: string;
  label: string;
  /** Weight per profile dimension used by the self-assessment scorer. */
  weights?: Partial<Record<ProfileDimensionKey, number>>;
}

export interface AssessmentQuestion {
  id: ID;
  prompt: string;
  help?: string;
  kind: "single" | "multi" | "scale";
  options: AssessmentOption[];
  /** Max selections for multi questions. */
  max?: number;
}

export type AssessmentAnswers = Record<ID, string | string[]>;

export interface AssessmentResult {
  id: ID;
  completedAt: ISODate;
  method: "self_assessment" | "coach_assessment" | "ai_assessment";
  dimensions: ProfileDimension[];
  priorities: string[];
  recommendedScenarios: ID[];
}

/* ----------------------------------------------------------------------------
 * Scenarios, conversations & feedback
 * ------------------------------------------------------------------------- */

export type ScenarioCategory =
  | "leadership"
  | "meetings"
  | "presentations"
  | "negotiations"
  | "sales"
  | "client"
  | "interviews"
  | "networking"
  | "technical"
  | "difficult";

export type Difficulty = "foundation" | "advanced" | "executive";

export interface Scenario {
  id: ID;
  title: string;
  category: ScenarioCategory;
  situation: string;
  counterpart: string;
  objectives: string[];
  skills: MetricKey[];
  difficulty: Difficulty;
  durationMinutes: number;
  /** Scripted counterpart turns used by the preview simulation. */
  script: string[];
  status: "published" | "draft";
  /** Company-specific scenarios are only visible to that company's employees. */
  companyId?: ID;
}

export interface ConversationTurn {
  id: ID;
  speaker: "counterpart" | "user";
  text: string;
  at: ISODate;
}

export interface Conversation {
  id: ID;
  scenarioId: ID;
  turns: ConversationTurn[];
  startedAt: ISODate;
  endedAt?: ISODate;
}

export interface FeedbackObservation {
  id: ID;
  area: MetricKey | "structure" | "concision";
  tone: "strength" | "focus";
  title: string;
  detail: string;
  example?: string;
}

export interface FeedbackReport {
  id: ID;
  conversationId: ID;
  /** "heuristic" = rule-based text signals; "ai" = model evaluation (future). */
  method: "heuristic" | "ai";
  generatedAt: ISODate;
  signals: { label: string; value: string; hint?: string }[];
  observations: FeedbackObservation[];
  nextPractice: ID[];
}

export interface PracticeSession {
  id: ID;
  scenarioId?: ID;
  title: string;
  kind: "simulation" | "drill" | "writing";
  minutes: number;
  completedAt: ISODate;
}

/* ----------------------------------------------------------------------------
 * Progress
 * ------------------------------------------------------------------------- */

export interface WeeklyPractice {
  sessionsCompleted: number;
  sessionsTarget: number;
  minutesPracticed: number;
  simulationsCompleted: number;
}

export interface MetricSeries {
  key: MetricKey;
  points: { week: string; value: number }[];
}

export interface ProgressSummary {
  focus: string;
  weekly: WeeklyPractice;
  metrics: MetricReading[];
  history: MetricSeries[];
  minutesByWeek: { week: string; minutes: number }[];
  recentSessions: PracticeSession[];
  recommendedScenarioId: ID;
}

/* ----------------------------------------------------------------------------
 * Coaching & messages
 * ------------------------------------------------------------------------- */

export interface Coach {
  id: ID;
  name: string;
  title: string;
  specialties: string[];
  timezone: string;
  activeClients: number;
  capacity: number;
  status: "active" | "onboarding" | "inactive";
}

export interface CoachingSession {
  id: ID;
  coachId: ID;
  clientId: ID;
  title: string;
  startsAt: ISODate;
  durationMinutes: number;
  status: "scheduled" | "completed" | "cancelled";
  agenda: string[];
  notes?: string;
  homework?: string[];
}

export interface MessageThread {
  id: ID;
  subject: string;
  participants: ID[];
  updatedAt: ISODate;
  unread: number;
  messages: Message[];
}

export interface Message {
  id: ID;
  authorId: ID;
  authorName: string;
  body: string;
  sentAt: ISODate;
}

export interface Notification {
  id: ID;
  title: string;
  body: string;
  createdAt: ISODate;
  read: boolean;
  href?: string;
}

/* ----------------------------------------------------------------------------
 * Companies (B2B)
 * ------------------------------------------------------------------------- */

export interface Company {
  id: ID;
  name: string;
  industry: string;
  headquarters: string;
  seats: number;
  admins: ID[];
  isSample: boolean;
}

export interface Employee {
  id: ID;
  name: string;
  jobTitle: string;
  department: string;
  status: "invited" | "assessing" | "active" | "completed";
  sessionsCompleted: number;
  practiceMinutes: number;
  focus: string;
  lastActive?: ISODate;
}

export interface CohortProgram {
  id: ID;
  name: string;
  kind: "pilot" | "annual";
  startDate: ISODate;
  endDate: ISODate;
  participants: number;
  phases: { name: string; status: "done" | "current" | "upcoming"; description: string }[];
  customScenarios: ID[];
}

export interface CompanyReport {
  id: ID;
  title: string;
  period: string;
  status: "ready" | "in_preparation";
  summary: string;
}

/* ----------------------------------------------------------------------------
 * Programs & pricing (configurable from admin)
 * ------------------------------------------------------------------------- */

export type Audience = "b2c" | "b2b";

export interface PriceSpec {
  /** "range" → $min–$max, "from" → From $min, "custom" → label only, "soon" → Coming soon */
  display: "range" | "from" | "custom" | "soon";
  min?: number;
  max?: number;
  /** Show a trailing "+" after the max value. */
  openEnded?: boolean;
  period?: string;
  label?: string;
  currency: "USD";
}

export interface Program {
  id: ID;
  slug: string;
  audience: Audience;
  name: string;
  tagline: string;
  description: string;
  duration: string;
  idealFor: string[];
  includes: string[];
  price: PriceSpec;
  priceNote?: string;
  cta: { label: string; href: string };
  status: "available" | "coming_soon";
  featured?: boolean;
}

/* ----------------------------------------------------------------------------
 * CRM / leads
 * ------------------------------------------------------------------------- */

export type PipelineStage =
  | "new_lead"
  | "qualified"
  | "assessment"
  | "proposal"
  | "won"
  | "active"
  | "renewal";

export type LeadKind = "executive_assessment" | "corporate_inquiry" | "early_access" | "contact";

export interface LeadSource {
  page: string;
  referrer?: string;
  utm?: Partial<Record<"source" | "medium" | "campaign" | "term" | "content", string>>;
}

export interface Lead {
  id: ID;
  createdAt: ISODate;
  kind: LeadKind;
  segment: Audience;
  source: LeadSource;
  name: string;
  email: string;
  company?: string;
  role?: string;
  country?: string;
  communicationChallenge?: string;
  estimatedDealValue: number;
  stage: PipelineStage;
  consultationDate?: ISODate;
  proposalStatus: "none" | "drafting" | "sent" | "accepted" | "declined";
  customerStatus: "prospect" | "customer" | "former_customer";
  /** The raw validated form payload, kept for CRM field mapping. */
  payload: Record<string, unknown>;
  isSample?: boolean;
}

/* ----------------------------------------------------------------------------
 * Admin content
 * ------------------------------------------------------------------------- */

export interface ContentItem {
  id: ID;
  area: "about" | "case_study" | "homepage" | "legal" | "pricing" | "media";
  title: string;
  location: string;
  status: "placeholder" | "draft" | "verified";
  owner: string;
}

export interface AdminUser {
  id: ID;
  name: string;
  email: string;
  role: Role;
  company?: string;
  status: "active" | "invited" | "suspended";
  lastActive?: ISODate;
}

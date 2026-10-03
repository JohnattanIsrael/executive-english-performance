/**
 * Service contracts.
 *
 * Every screen talks to these interfaces, never to mock data directly.
 * `src/lib/services/mock` implements them with local sample data today; a
 * future `src/lib/services/api` implementation can call real backends
 * (database, LLM / speech providers, CRM, email) without UI changes.
 *
 * Planned AI pipeline (none of these steps is live yet):
 *   1. ScenarioService.generate          → build a scenario from a client's context
 *   2. ConversationService.respond       → conduct the role-play (LLM, optional TTS)
 *   3. FeedbackService.analyze           → analyze responses (LLM + speech-to-text)
 *   4. FeedbackService.identifyPatterns  → recurring communication patterns
 *   5. FeedbackService.analyze           → produce feedback for the client
 *   6. ScenarioService.recommend         → recommend next practice
 *   7. ProgressService.updateProfile     → update the communication profile
 *   8. CoachingService.getCoachInsights  → summarize insights for the human coach
 */
import type {
  AdminUser,
  AssessmentAnswers,
  AssessmentQuestion,
  AssessmentResult,
  Coach,
  CoachingSession,
  CohortProgram,
  Company,
  CompanyReport,
  ContentItem,
  Conversation,
  ConversationTurn,
  Employee,
  FeedbackReport,
  ID,
  Lead,
  MessageThread,
  MetricReading,
  Notification,
  Program,
  ProgressSummary,
  Scenario,
  ScenarioCategory,
  Session,
  UserProfile,
} from "@/lib/types";

export interface AuthService {
  getSession(): Promise<Session | null>;
  signIn(email: string): Promise<Session>;
  signOut(): Promise<void>;
}

export interface AssessmentService {
  getQuestions(): Promise<AssessmentQuestion[]>;
  /** Scores a self-assessment. A future implementation may add audio/AI analysis. */
  evaluate(answers: AssessmentAnswers): Promise<AssessmentResult>;
  getLatest(userId: ID): Promise<AssessmentResult | null>;
}

export interface ScenarioService {
  list(filter?: { category?: ScenarioCategory; companyId?: ID }): Promise<Scenario[]>;
  get(id: ID): Promise<Scenario | null>;
  recommend(userId: ID, limit?: number): Promise<Scenario[]>;
  /** Future: generate a tailored scenario from a client's real context. */
  generate(input: { userId: ID; brief: string; category: ScenarioCategory }): Promise<Scenario>;
}

export interface ConversationService {
  start(scenarioId: ID): Promise<Conversation>;
  /** Returns the counterpart's next turn, or null when the scripted conversation ends. */
  respond(conversation: Conversation, userText: string): Promise<ConversationTurn | null>;
}

export interface FeedbackService {
  analyze(conversation: Conversation): Promise<FeedbackReport>;
  identifyPatterns(userId: ID): Promise<{ pattern: string; occurrences: number }[]>;
}

export interface ProgressService {
  getSummary(userId: ID): Promise<ProgressSummary>;
  updateProfile(userId: ID, readings: MetricReading[]): Promise<void>;
}

export interface CoachingService {
  getCoach(coachId: ID): Promise<Coach | null>;
  listSessions(userId: ID): Promise<CoachingSession[]>;
  listThreads(userId: ID): Promise<MessageThread[]>;
  sendMessage(threadId: ID, body: string): Promise<void>;
  getCoachInsights(userId: ID): Promise<string[]>;
}

export interface NotificationService {
  list(userId: ID): Promise<Notification[]>;
  markRead(id: ID): Promise<void>;
  /** Future: transactional email (session reminders, reports, lead alerts). */
  sendEmail(input: { to: string; template: string; data: Record<string, unknown> }): Promise<void>;
}

export interface LeadService {
  submit(lead: Lead): Promise<{ ok: true; id: ID } | { ok: false; error: string }>;
  list(): Promise<Lead[]>;
}

export interface PricingService {
  listPrograms(): Promise<Program[]>;
  updateProgram(program: Program): Promise<void>;
}

export interface CompanyService {
  getCompany(companyId: ID): Promise<Company | null>;
  listEmployees(companyId: ID): Promise<Employee[]>;
  listPrograms(companyId: ID): Promise<CohortProgram[]>;
  listReports(companyId: ID): Promise<CompanyReport[]>;
  getCohortMetrics(companyId: ID): Promise<MetricReading[]>;
}

export interface AdminService {
  listUsers(): Promise<AdminUser[]>;
  listCoaches(): Promise<Coach[]>;
  listContent(): Promise<ContentItem[]>;
  getUser(id: ID): Promise<UserProfile | null>;
}

export interface Services {
  auth: AuthService;
  assessment: AssessmentService;
  scenarios: ScenarioService;
  conversation: ConversationService;
  feedback: FeedbackService;
  progress: ProgressService;
  coaching: CoachingService;
  notifications: NotificationService;
  leads: LeadService;
  pricing: PricingService;
  companies: CompanyService;
  admin: AdminService;
}

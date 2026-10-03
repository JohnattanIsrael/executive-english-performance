/**
 * Sample data for the demo client workspace (/dashboard).
 * Dates are relative to build time so the demo always looks current.
 */
import type {
  AssessmentResult,
  Coach,
  CoachingSession,
  MessageThread,
  Notification,
  ProgressSummary,
  UserProfile,
} from "@/lib/types";

const DAY = 86_400_000;
const now = Date.now();
export const daysFromNow = (days: number, hour = 9) => {
  const d = new Date(now + days * DAY);
  d.setHours(hour, 0, 0, 0);
  return d.toISOString();
};

export const demoUser: UserProfile = {
  id: "usr_demo_john",
  firstName: "John",
  lastName: "Sample",
  email: "john.sample@example.com",
  role: "client",
  jobTitle: "Director of Engineering",
  company: "Sample Company",
  companyId: "cmp_sample",
  industry: "Technology",
  country: "Mexico",
  timezone: "America/Mexico_City",
  coachId: "coach_lead",
  programId: "prog_exec_performance",
  communicationFocus: "Lead clearer executive meetings.",
  goals: [
    "Open leadership updates with the decision, not the background",
    "Answer challenging questions in under a minute",
    "Disagree with senior stakeholders diplomatically",
  ],
  upcomingSituations: [
    { id: "sit_1", title: "Quarterly review with US leadership", date: daysFromNow(12, 10), type: "presentations" },
    { id: "sit_2", title: "Vendor contract renewal", date: daysFromNow(26, 15), type: "negotiations" },
    { id: "sit_3", title: "Incident post-mortem with product leadership", type: "technical" },
  ],
  joinedAt: daysFromNow(-38),
};

export const leadCoach: Coach = {
  id: "coach_lead",
  name: "[Founder Name]",
  title: "Lead Executive Communication Coach",
  specialties: ["Executive presence", "Presentations", "Negotiation"],
  timezone: "[Timezone]",
  activeClients: 9,
  capacity: 12,
  status: "active",
};

const weeks = ["W1", "W2", "W3", "W4", "W5", "W6"];
const series = (values: number[]) => values.map((value, i) => ({ week: weeks[i], value }));

export const demoProgress: ProgressSummary = {
  focus: "Lead clearer executive meetings.",
  weekly: { sessionsCompleted: 3, sessionsTarget: 5, minutesPracticed: 32, simulationsCompleted: 2 },
  metrics: [
    { key: "clarity", value: 68, previous: 61, source: "coach_rating" },
    { key: "vocabulary", value: 74, previous: 72, source: "coach_rating" },
    { key: "grammar", value: 81, previous: 80, source: "coach_rating" },
    { key: "pronunciation", value: 77, previous: 76, source: "coach_rating" },
    { key: "responseQuality", value: 63, previous: 55, source: "coach_rating" },
    { key: "confidence", value: 59, previous: 52, source: "self_assessment" },
  ],
  history: [
    { key: "clarity", points: series([56, 58, 61, 63, 66, 68]) },
    { key: "vocabulary", points: series([70, 71, 72, 72, 73, 74]) },
    { key: "grammar", points: series([79, 79, 80, 80, 81, 81]) },
    { key: "pronunciation", points: series([75, 75, 76, 76, 77, 77]) },
    { key: "responseQuality", points: series([50, 52, 55, 58, 60, 63]) },
    { key: "confidence", points: series([48, 50, 52, 55, 57, 59]) },
  ],
  minutesByWeek: [
    { week: "W1", minutes: 24 },
    { week: "W2", minutes: 41 },
    { week: "W3", minutes: 36 },
    { week: "W4", minutes: 18 },
    { week: "W5", minutes: 45 },
    { week: "W6", minutes: 32 },
  ],
  recentSessions: [
    { id: "ps_1", scenarioId: "present-q4-results", title: "Present Q4 Results", kind: "simulation", minutes: 12, completedAt: daysFromNow(-1, 18) },
    { id: "ps_2", title: "Bottom line first — 60-second drill", kind: "drill", minutes: 8, completedAt: daysFromNow(-2, 8) },
    { id: "ps_3", scenarioId: "challenge-proposal", title: "Challenge a Proposal", kind: "simulation", minutes: 10, completedAt: daysFromNow(-4, 19) },
    { id: "ps_4", title: "Rewrite: status update email", kind: "writing", minutes: 6, completedAt: daysFromNow(-5, 7) },
  ],
  recommendedScenarioId: "board-qa",
};

export const demoAssessment: AssessmentResult = {
  id: "asm_demo",
  completedAt: daysFromNow(-38),
  method: "coach_assessment",
  dimensions: [
    { key: "presentation", label: "Presentation Communication", band: 3, summary: "Strong prepared content; Q&A loses structure." },
    { key: "meetings", label: "Meeting Communication", band: 2, summary: "Waits too long to contribute in fast discussions." },
    { key: "spontaneous", label: "Spontaneous Speaking", band: 2, summary: "Answers are accurate but long; key point arrives late." },
    { key: "vocabulary", label: "Business Vocabulary", band: 4, summary: "Wide technical range; build executive register." },
    { key: "clarity", label: "Clarity", band: 3, summary: "Clear with peers; simplify for non-technical leaders." },
    { key: "precision", label: "Precision", band: 3, summary: "Softens disagreement until it disappears." },
    { key: "presence", label: "Executive Presence", band: 3, summary: "Credible; composure drops under direct challenge." },
  ],
  priorities: ["Decision-first updates", "Concise answers under pressure", "Diplomatic disagreement"],
  recommendedScenarios: ["board-qa", "challenge-proposal", "interrupt-diplomatically"],
};

export const demoSessions: CoachingSession[] = [
  {
    id: "cs_next",
    coachId: "coach_lead",
    clientId: demoUser.id,
    title: "Session 6 — Preparing the quarterly review",
    startsAt: daysFromNow(2, 16),
    durationMinutes: 60,
    status: "scheduled",
    agenda: [
      "Review your last two simulations",
      "Rehearse the opening 90 seconds of the quarterly review",
      "Prepare for the three hardest questions",
    ],
  },
  {
    id: "cs_5",
    coachId: "coach_lead",
    clientId: demoUser.id,
    title: "Session 5 — Disagreeing with senior stakeholders",
    startsAt: daysFromNow(-5, 16),
    durationMinutes: 60,
    status: "completed",
    agenda: ["Language for respectful disagreement", "Role-play: challenging the COO's proposal"],
    notes:
      "Big step forward in stating your position early. Watch the tendency to add three qualifiers before the main point — one is enough.",
    homework: ["Complete 'Challenge a Proposal' twice", "Draft your opening statement for the quarterly review"],
  },
  {
    id: "cs_4",
    coachId: "coach_lead",
    clientId: demoUser.id,
    title: "Session 4 — Explaining technical incidents",
    startsAt: daysFromNow(-12, 16),
    durationMinutes: 60,
    status: "completed",
    agenda: ["Impact → cause → prevention structure", "Replacing jargon with business language"],
    notes: "Excellent structure in the second attempt. Keep the impact statement to one sentence.",
    homework: ["Practice 'Explain a Technical Incident'"],
  },
];

export const demoThreads: MessageThread[] = [
  {
    id: "th_1",
    subject: "Opening for the quarterly review",
    participants: [demoUser.id, "coach_lead"],
    updatedAt: daysFromNow(-1, 11),
    unread: 1,
    messages: [
      {
        id: "m_1",
        authorId: demoUser.id,
        authorName: "John",
        body: "Here's my draft opening for the review: \"Before we look at the numbers, I want to give some context on the market conditions we faced this quarter...\" Is this too long?",
        sentAt: daysFromNow(-2, 9),
      },
      {
        id: "m_2",
        authorId: "coach_lead",
        authorName: "Your coach",
        body: "Good instinct to check. Try leading with the result and the ask: \"We finished 8% below target. Here's why, what we're changing, and the one decision I need from you today.\" Then give context. We'll rehearse it on Thursday.",
        sentAt: daysFromNow(-1, 11),
      },
    ],
  },
  {
    id: "th_2",
    subject: "Session 5 notes",
    participants: [demoUser.id, "coach_lead"],
    updatedAt: daysFromNow(-5, 18),
    unread: 0,
    messages: [
      {
        id: "m_3",
        authorId: "coach_lead",
        authorName: "Your coach",
        body: "Notes and homework from today are in your Coaching tab. Great progress on stating your position early.",
        sentAt: daysFromNow(-5, 18),
      },
    ],
  },
];

export const demoNotifications: Notification[] = [
  { id: "n_1", title: "New message from your coach", body: "Opening for the quarterly review", createdAt: daysFromNow(-1, 11), read: false, href: "/dashboard/messages" },
  { id: "n_2", title: "Session in 2 days", body: "Preparing the quarterly review", createdAt: daysFromNow(0, 8), read: false, href: "/dashboard/coaching" },
  { id: "n_3", title: "Weekly practice", body: "You're 2 sessions away from your weekly goal.", createdAt: daysFromNow(-1, 8), read: true, href: "/dashboard/practice" },
];

export const coachInsights = [
  "Answers to direct challenges average about twice the target length; the key point usually arrives in the last third.",
  "Frequent softeners (\"maybe\", \"I think\", \"just\") when disagreeing with senior stakeholders.",
  "Technical explanations are significantly clearer when the impact sentence comes first — keep reinforcing.",
];

import { programs } from "@/config/programs";
import { contentItems, sampleCoaches, sampleUsers } from "@/mocks/admin";
import {
  coachInsights,
  demoNotifications,
  demoProgress,
  demoSessions,
  demoThreads,
  demoUser,
  leadCoach,
} from "@/mocks/client";
import { sampleCohortMetrics, sampleCompany, sampleEmployees, samplePrograms, sampleReports } from "@/mocks/company";
import { scenarios } from "@/mocks/scenarios";
import type { Program } from "@/lib/types";
import { storage, uid } from "@/lib/utils";
import type { Services } from "../contracts";
import { mockAssessmentService } from "./assessment";
import { mockFeedbackService } from "./feedback";
import { leadService } from "./leads";

const PRICING_OVERRIDES_KEY = "eep.pricing-overrides.v1";

export const mockServices: Services = {
  auth: {
    async getSession() {
      return { user: demoUser, isDemo: true };
    },
    async signIn() {
      return { user: demoUser, isDemo: true };
    },
    async signOut() {},
  },

  assessment: mockAssessmentService,

  scenarios: {
    async list(filter) {
      return scenarios.filter(
        (s) =>
          (!filter?.category || s.category === filter.category) &&
          (!s.companyId || s.companyId === filter?.companyId),
      );
    },
    async get(id) {
      return scenarios.find((s) => s.id === id) ?? null;
    },
    async recommend(_userId, limit = 3) {
      const preferred = ["board-qa", "challenge-proposal", "interrupt-diplomatically", "present-q4-results"];
      return preferred.map((id) => scenarios.find((s) => s.id === id)!).slice(0, limit);
    },
    async generate({ brief, category }) {
      return {
        id: uid("scn"),
        title: "Custom scenario (draft)",
        category,
        situation: brief,
        counterpart: "To be defined by your coach",
        objectives: [],
        skills: ["clarity"],
        difficulty: "advanced",
        durationMinutes: 10,
        script: [],
        status: "draft",
      };
    },
  },

  conversation: {
    async start(scenarioId) {
      const scenario = scenarios.find((s) => s.id === scenarioId);
      const opening = scenario?.script[0] ?? "Let's begin.";
      return {
        id: uid("conv"),
        scenarioId,
        startedAt: new Date().toISOString(),
        turns: [{ id: uid("turn"), speaker: "counterpart", text: opening, at: new Date().toISOString() }],
      };
    },
    async respond(conversation) {
      const scenario = scenarios.find((s) => s.id === conversation.scenarioId);
      const answered = conversation.turns.filter((t) => t.speaker === "user").length;
      const next = scenario?.script[answered];
      await new Promise((r) => setTimeout(r, 700));
      return next ? { id: uid("turn"), speaker: "counterpart", text: next, at: new Date().toISOString() } : null;
    },
  },

  feedback: mockFeedbackService,

  progress: {
    async getSummary() {
      return demoProgress;
    },
    async updateProfile() {},
  },

  coaching: {
    async getCoach(id) {
      return sampleCoaches.find((c) => c.id === id) ?? leadCoach;
    },
    async listSessions() {
      return demoSessions;
    },
    async listThreads() {
      return demoThreads;
    },
    async sendMessage() {},
    async getCoachInsights() {
      return coachInsights;
    },
  },

  notifications: {
    async list() {
      return demoNotifications;
    },
    async markRead() {},
    async sendEmail() {},
  },

  leads: leadService,

  pricing: {
    async listPrograms() {
      const overrides = storage.get<Record<string, Program>>(PRICING_OVERRIDES_KEY, {});
      return programs.map((p) => overrides[p.id] ?? p);
    },
    async updateProgram(program) {
      const overrides = storage.get<Record<string, Program>>(PRICING_OVERRIDES_KEY, {});
      storage.set(PRICING_OVERRIDES_KEY, { ...overrides, [program.id]: program });
    },
  },

  companies: {
    async getCompany() {
      return sampleCompany;
    },
    async listEmployees() {
      return sampleEmployees;
    },
    async listPrograms() {
      return samplePrograms;
    },
    async listReports() {
      return sampleReports;
    },
    async getCohortMetrics() {
      return sampleCohortMetrics;
    },
  },

  admin: {
    async listUsers() {
      return sampleUsers;
    },
    async listCoaches() {
      return sampleCoaches;
    },
    async listContent() {
      return contentItems;
    },
    async getUser(id) {
      return id === demoUser.id ? demoUser : null;
    },
  },
};

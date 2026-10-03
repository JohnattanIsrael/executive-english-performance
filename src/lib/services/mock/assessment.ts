import { assessmentQuestions, dimensionLabels, dimensionSummaries } from "@/content/assessment";
import { demoAssessment } from "@/mocks/client";
import type { AssessmentAnswers, AssessmentResult, ProfileDimension, ProfileDimensionKey } from "@/lib/types";
import type { AssessmentService } from "../contracts";
import { uid } from "@/lib/utils";

const dimensions = Object.keys(dimensionLabels) as ProfileDimensionKey[];

const priorityScenarios: Record<string, string[]> = {
  leadership_meetings: ["interrupt-diplomatically", "challenge-proposal"],
  presentations: ["present-q4-results", "board-qa"],
  negotiations: ["negotiate-contract"],
  clients: ["client-escalation", "quarterly-business-review"],
  interviews: ["senior-interview"],
  teams: ["lead-weekly-meeting", "vision-to-team"],
  technical: ["explain-technical-incident", "architecture-tradeoff"],
  conferences: ["conference-networking"],
};

/**
 * Self-assessment scorer: sums option weights per dimension and maps the
 * total to a 1–5 band around a neutral midpoint of 3. Deliberately simple and
 * transparent — it reflects how the person sees themselves, nothing more.
 */
export function scoreSelfAssessment(answers: AssessmentAnswers): AssessmentResult {
  const totals = Object.fromEntries(dimensions.map((d) => [d, 0])) as Record<ProfileDimensionKey, number>;

  for (const question of assessmentQuestions) {
    const answer = answers[question.id];
    const values = Array.isArray(answer) ? answer : answer ? [answer] : [];
    for (const value of values) {
      const option = question.options.find((o) => o.value === value);
      for (const [dim, weight] of Object.entries(option?.weights ?? {})) {
        totals[dim as ProfileDimensionKey] += weight ?? 0;
      }
    }
  }

  const profile: ProfileDimension[] = dimensions.map((key) => {
    const band = Math.min(5, Math.max(1, Math.round(3 + totals[key] / 2))) as ProfileDimension["band"];
    const tier = band <= 2 ? "low" : band === 3 ? "mid" : "high";
    return { key, label: dimensionLabels[key], band, summary: dimensionSummaries[key][tier] };
  });

  const priorities = [...profile]
    .sort((a, b) => a.band - b.band)
    .slice(0, 3)
    .map((d) => d.label);

  const chosen = answers.priorities;
  const recommended = (Array.isArray(chosen) ? chosen : [])
    .flatMap((p) => priorityScenarios[p] ?? [])
    .slice(0, 4);

  return {
    id: uid("asm"),
    completedAt: new Date().toISOString(),
    method: "self_assessment",
    dimensions: profile,
    priorities,
    recommendedScenarios: recommended.length ? recommended : ["present-q4-results", "board-qa"],
  };
}

export const mockAssessmentService: AssessmentService = {
  async getQuestions() {
    return assessmentQuestions;
  },
  async evaluate(answers) {
    return scoreSelfAssessment(answers);
  },
  async getLatest() {
    return demoAssessment;
  },
};

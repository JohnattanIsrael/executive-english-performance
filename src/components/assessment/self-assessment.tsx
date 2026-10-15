"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, ArrowRight, Check, RotateCcw } from "lucide-react";
import { Button, ButtonLink } from "@/components/ui/button";
import { BandIndicator } from "@/components/ui/charts";
import { Badge } from "@/components/ui/primitives";
import { assessmentText } from "@/content/assessment";
import { localizeScenario } from "@/content/scenarios";
import type { Localized } from "@/i18n/config";
import { useLocale } from "@/i18n/locale-provider";
import { track } from "@/lib/analytics";
import { services } from "@/lib/services";
import type { AssessmentAnswers, AssessmentQuestion, AssessmentResult, Scenario } from "@/lib/types";
import { cn } from "@/lib/utils";

type Phase = "intro" | "questions" | "result";

const copy: Localized<{
  introBadge: string;
  introTitle: string;
  introBody: string;
  start: string;
  resultBadge: string;
  resultNote: string;
  resultTitle: string;
  bandsNote: string;
  focusFirst: string;
  practice: string;
  ctaTitle: string;
  ctaBody: string;
  ctaButton: string;
  retake: string;
  questionOf: (n: number, total: number) => string;
  back: string;
  next: string;
  seeProfile: string;
}> = {
  en: {
    introBadge: "Self-assessment · about 3 minutes",
    introTitle: "Build your initial communication profile.",
    introBody:
      "Six questions about how you use English professionally and which situations matter most. You’ll receive an initial Executive Communication Profile — a structured reflection to discuss with a coach. It is not a test of your English, and no AI evaluation is involved.",
    start: "Start the assessment",
    resultBadge: "Initial self-assessment",
    resultNote: "Based on your answers — not an evaluation of your spoken English.",
    resultTitle: "Your Executive Communication Profile",
    bandsNote: "Bands 1–5 summarize your own ratings. A coach-led assessment refines them with real speaking samples.",
    focusFirst: "Where to focus first",
    practice: "Situations to practice",
    ctaTitle: "Discuss your results with an executive coach.",
    ctaBody: "Turn this profile into a plan built around your real situations.",
    ctaButton: "Discuss your results with a coach",
    retake: "Retake",
    questionOf: (n, total) => `Question ${n} of ${total}`,
    back: "Back",
    next: "Next",
    seeProfile: "See my profile",
  },
  es: {
    introBadge: "Autoevaluación · unos 3 minutos",
    introTitle: "Construya su perfil inicial de comunicación.",
    introBody:
      "Seis preguntas sobre cómo usa el inglés en el trabajo y qué situaciones le importan más. Recibirá un Perfil de Comunicación Ejecutiva inicial: una reflexión estructurada para conversar con un coach. No es un examen de inglés y no interviene ninguna evaluación con IA.",
    start: "Comenzar la evaluación",
    resultBadge: "Autoevaluación inicial",
    resultNote: "Basado en sus respuestas; no es una evaluación de su inglés hablado.",
    resultTitle: "Su Perfil de Comunicación Ejecutiva",
    bandsNote: "Los niveles del 1 al 5 resumen su propia valoración. Una evaluación con un coach los afina con muestras reales de su expresión oral.",
    focusFirst: "Por dónde empezar",
    practice: "Situaciones para practicar",
    ctaTitle: "Converse sus resultados con un coach ejecutivo.",
    ctaBody: "Convierta este perfil en un plan construido en torno a sus situaciones reales.",
    ctaButton: "Conversar mis resultados con un coach",
    retake: "Repetir",
    questionOf: (n, total) => `Pregunta ${n} de ${total}`,
    back: "Atrás",
    next: "Siguiente",
    seeProfile: "Ver mi perfil",
  },
};

export function SelfAssessment({
  questions,
  context,
}: {
  questions: AssessmentQuestion[];
  context: "public" | "dashboard";
}) {
  const [phase, setPhase] = useState<Phase>("intro");
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<AssessmentAnswers>({});
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [recommended, setRecommended] = useState<Scenario[]>([]);
  const locale = useLocale();
  const t = copy[locale];
  const { bandLabels } = assessmentText[locale];

  const question = questions[step];
  const answer = question ? answers[question.id] : undefined;
  const answered = Array.isArray(answer) ? answer.length > 0 : Boolean(answer);

  function start() {
    setPhase("questions");
    track("assessment_started", { context });
  }

  function choose(q: AssessmentQuestion, value: string) {
    setAnswers((prev) => {
      if (q.kind !== "multi") return { ...prev, [q.id]: value };
      const current = (prev[q.id] as string[] | undefined) ?? [];
      if (current.includes(value)) return { ...prev, [q.id]: current.filter((v) => v !== value) };
      if (q.max && current.length >= q.max) return prev;
      return { ...prev, [q.id]: [...current, value] };
    });
  }

  async function next() {
    if (step < questions.length - 1) {
      setStep(step + 1);
      return;
    }
    const evaluated = await services.assessment.evaluate(answers, locale);
    const all = await services.scenarios.list();
    setRecommended(
      evaluated.recommendedScenarios
        .map((id) => all.find((s) => s.id === id))
        .filter((s) => s !== undefined)
        .map((s) => localizeScenario(s, locale)),
    );
    setResult(evaluated);
    setPhase("result");
    const priorities = answers.priorities;
    track("assessment_completed", { context, priorities: Array.isArray(priorities) ? priorities.join(",") : "" });
  }

  function restart() {
    setAnswers({});
    setStep(0);
    setResult(null);
    setPhase("intro");
  }

  if (phase === "intro") {
    return (
      <div className="rounded-2xl border border-line bg-surface p-7 md:p-10">
        <Badge tone="harbor">{t.introBadge}</Badge>
        <h2 className="mt-5 font-serif text-3xl text-ink md:text-4xl">{t.introTitle}</h2>
        <p className="mt-4 max-w-2xl text-[15.5px] leading-relaxed text-muted">{t.introBody}</p>
        <Button size="lg" className="mt-8" onClick={start}>
          {t.start} <ArrowRight className="size-4" aria-hidden />
        </Button>
      </div>
    );
  }

  if (phase === "result" && result) {
    return (
      <div className="flex flex-col gap-6">
        <div className="rounded-2xl border border-line bg-surface p-7 md:p-10">
          <div className="flex flex-wrap items-center gap-3">
            <Badge tone="caution">{t.resultBadge}</Badge>
            <span className="text-sm text-muted">{t.resultNote}</span>
          </div>
          <h2 className="mt-5 font-serif text-3xl text-ink md:text-4xl">{t.resultTitle}</h2>

          <ul className="mt-8 divide-y divide-line border-y border-line">
            {result.dimensions.map((d) => (
              <li key={d.key} className="grid gap-3 py-5 md:grid-cols-[1.1fr_auto_1.6fr] md:items-center md:gap-8">
                <div>
                  <p className="font-medium text-ink">{d.label}</p>
                  <p className="text-sm text-muted">{bandLabels[d.band]}</p>
                </div>
                <BandIndicator band={d.band} label={d.label} />
                <p className="text-[14.5px] leading-relaxed text-ink-2">{d.summary}</p>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-muted">{t.bandsNote}</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-line bg-surface p-7">
            <p className="text-sm font-medium text-muted">{t.focusFirst}</p>
            <ol className="mt-4 flex flex-col gap-3">
              {result.priorities.map((p, i) => (
                <li key={p} className="flex items-center gap-3 text-ink">
                  <span className="flex size-7 items-center justify-center rounded-full bg-paper text-sm text-ink-2">{i + 1}</span>
                  {p}
                </li>
              ))}
            </ol>
          </div>
          <div className="rounded-2xl border border-line bg-surface p-7">
            <p className="text-sm font-medium text-muted">{t.practice}</p>
            <ul className="mt-4 flex flex-col gap-3">
              {recommended.map((s) => (
                <li key={s.id} className="text-ink">
                  {context === "dashboard" ? (
                    <Link href={`/dashboard/practice/?scenario=${s.id}`} className="hover:text-harbor-600">
                      {s.title} <span className="text-muted">— {s.situation}</span>
                    </Link>
                  ) : (
                    <>
                      {s.title} <span className="text-muted">— {s.situation}</span>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-6 rounded-2xl bg-ink p-7 text-paper md:flex-row md:items-center md:p-9">
          <div>
            <p className="font-serif text-2xl">{t.ctaTitle}</p>
            <p className="mt-2 text-paper/70">{t.ctaBody}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="/book?source=self-assessment" variant="inverse" trackLocation={`assessment_result_${context}`}>
              {t.ctaButton}
            </ButtonLink>
            <Button variant="inverse-outline" onClick={restart}>
              <RotateCcw className="size-4" aria-hidden /> {t.retake}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-line bg-surface p-7 md:p-10">
      <div className="flex items-center justify-between gap-4 text-sm text-muted">
        <span>{t.questionOf(step + 1, questions.length)}</span>
        <span aria-hidden className="flex gap-1">
          {questions.map((q, i) => (
            <span key={q.id} className={cn("h-1.5 w-6 rounded-full", i <= step ? "bg-data" : "bg-data-track")} />
          ))}
        </span>
      </div>

      <fieldset className="mt-8">
        <legend className="font-serif text-2xl leading-snug text-ink md:text-3xl">{question.prompt}</legend>
        {question.help && <p className="mt-2 text-sm text-muted">{question.help}</p>}
        <div className={cn("mt-7 grid gap-2.5", question.kind === "multi" && "sm:grid-cols-2")}>
          {question.options.map((o) => {
            const selected = Array.isArray(answer) ? answer.includes(o.value) : answer === o.value;
            return (
              <label
                key={o.value}
                className={cn(
                  "flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3.5 text-[15px] transition-colors has-focus-visible:ring-3 has-focus-visible:ring-harbor-200",
                  selected ? "border-ink bg-paper text-ink" : "border-line text-ink-2 hover:border-line-strong",
                )}
              >
                <input
                  type={question.kind === "multi" ? "checkbox" : "radio"}
                  name={question.id}
                  value={o.value}
                  checked={selected}
                  onChange={() => choose(question, o.value)}
                  className="sr-only"
                />
                <span
                  aria-hidden
                  className={cn(
                    "flex size-5 shrink-0 items-center justify-center border",
                    question.kind === "multi" ? "rounded-md" : "rounded-full",
                    selected ? "border-ink bg-ink text-paper" : "border-line-strong",
                  )}
                >
                  {selected && <Check className="size-3" />}
                </span>
                {question.kind === "scale" && <span className="w-4 text-sm text-faint tabular-nums">{o.value}</span>}
                {o.label}
              </label>
            );
          })}
        </div>
      </fieldset>

      <div className="mt-9 flex items-center justify-between">
        <Button variant="ghost" onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0}>
          <ArrowLeft className="size-4" aria-hidden /> {t.back}
        </Button>
        <Button onClick={next} disabled={!answered}>
          {step === questions.length - 1 ? t.seeProfile : t.next} <ArrowRight className="size-4" aria-hidden />
        </Button>
      </div>
    </div>
  );
}

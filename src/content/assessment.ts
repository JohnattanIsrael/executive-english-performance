import type { Locale, Localized } from "@/i18n/config";
import type { AssessmentQuestion, ProfileDimensionKey } from "@/lib/types";

/**
 * Self-assessment questionnaire. Each option carries weights per profile
 * dimension; the scorer in AssessmentService turns answers into 1–5 bands.
 * This is a structured self-reflection, not a validated language test.
 */
export const assessmentQuestions: AssessmentQuestion[] = [
  {
    id: "frequency",
    prompt: "How often do you use English professionally?",
    kind: "single",
    options: [
      { value: "daily", label: "Every day — it is my main working language", weights: { meetings: 2, vocabulary: 2, spontaneous: 1 } },
      { value: "weekly", label: "Several times a week", weights: { meetings: 1, vocabulary: 1 } },
      { value: "monthly", label: "A few times a month, often for important moments", weights: { meetings: 0, vocabulary: 0 } },
      { value: "rarely", label: "Rarely today, but my role is changing", weights: { meetings: -1, vocabulary: -1, spontaneous: -1 } },
    ],
  },
  {
    id: "difficult",
    prompt: "Which situations are most difficult for you?",
    help: "Choose up to three.",
    kind: "multi",
    max: 3,
    options: [
      { value: "presenting", label: "Presenting to senior leadership", weights: { presentation: -2, presence: -1 } },
      { value: "questions", label: "Answering unexpected questions", weights: { spontaneous: -2, precision: -1 } },
      { value: "negotiating", label: "Negotiating", weights: { precision: -2, presence: -1 } },
      { value: "disagreeing", label: "Disagreeing diplomatically", weights: { meetings: -1, precision: -1 } },
      { value: "technical", label: "Explaining technical or complex topics", weights: { clarity: -2 } },
      { value: "smalltalk", label: "Small talk and networking", weights: { spontaneous: -1, vocabulary: -1 } },
      { value: "writing", label: "Writing important emails and messages", weights: { precision: -1, clarity: -1 } },
      { value: "meetings", label: "Contributing in fast-moving meetings", weights: { meetings: -2, spontaneous: -1 } },
    ],
  },
  {
    id: "presenting",
    prompt: "How confident are you when presenting in English?",
    kind: "scale",
    options: [
      { value: "1", label: "I avoid it when I can", weights: { presentation: -2, presence: -2 } },
      { value: "2", label: "I can do it, but I over-prepare and still feel exposed", weights: { presentation: -1, presence: -1 } },
      { value: "3", label: "Comfortable with prepared content", weights: { presentation: 1 } },
      { value: "4", label: "Confident, but I want more impact", weights: { presentation: 2, presence: 1 } },
      { value: "5", label: "Very confident — I want executive-level polish", weights: { presentation: 3, presence: 2 } },
    ],
  },
  {
    id: "spontaneous",
    prompt: "How comfortable are you with spontaneous questions?",
    kind: "scale",
    options: [
      { value: "1", label: "I freeze or translate in my head", weights: { spontaneous: -2, clarity: -1 } },
      { value: "2", label: "I answer, but not the way I would in my own language", weights: { spontaneous: -1, precision: -1 } },
      { value: "3", label: "Usually fine, sometimes I ramble", weights: { spontaneous: 1, clarity: -1 } },
      { value: "4", label: "Comfortable, I want sharper answers", weights: { spontaneous: 2, precision: 1 } },
      { value: "5", label: "Very comfortable under pressure", weights: { spontaneous: 3, presence: 1 } },
    ],
  },
  {
    id: "vocabulary",
    prompt: "How precisely can you express nuanced business ideas?",
    kind: "scale",
    options: [
      { value: "1", label: "I often lack the right words", weights: { vocabulary: -2, precision: -2 } },
      { value: "2", label: "I get my point across, but it sounds simpler than I mean", weights: { vocabulary: -1, precision: -1 } },
      { value: "3", label: "Mostly precise, with occasional gaps", weights: { vocabulary: 1, precision: 1 } },
      { value: "4", label: "Precise, I want a more executive register", weights: { vocabulary: 2, precision: 2 } },
      { value: "5", label: "Very precise in most contexts", weights: { vocabulary: 3, precision: 2 } },
    ],
  },
  {
    id: "priorities",
    prompt: "What professional situations matter most to you right now?",
    help: "Choose up to three.",
    kind: "multi",
    max: 3,
    options: [
      { value: "leadership_meetings", label: "Leadership and board meetings" },
      { value: "presentations", label: "Presentations and quarterly reviews" },
      { value: "negotiations", label: "Negotiations and pricing conversations" },
      { value: "clients", label: "International client relationships" },
      { value: "interviews", label: "Interviews for international roles" },
      { value: "teams", label: "Leading international teams" },
      { value: "technical", label: "Technical discussions and incident reviews" },
      { value: "conferences", label: "Conferences and networking" },
    ],
  },
];

export const dimensionLabels: Record<ProfileDimensionKey, string> = {
  presentation: "Presentation Communication",
  meetings: "Meeting Communication",
  spontaneous: "Spontaneous Speaking",
  vocabulary: "Business Vocabulary",
  clarity: "Clarity",
  precision: "Precision",
  presence: "Executive Presence",
};

export const bandLabels: Record<1 | 2 | 3 | 4 | 5, string> = {
  1: "Priority focus",
  2: "Developing",
  3: "Solid base",
  4: "Strong",
  5: "Distinctive",
};

export const dimensionSummaries: Record<ProfileDimensionKey, Record<"low" | "mid" | "high", string>> = {
  presentation: {
    low: "Structure and delivery of prepared content is a clear opportunity.",
    mid: "A reliable base; the next step is impact and audience control.",
    high: "Strong delivery; refine executive framing and Q&A handling.",
  },
  meetings: {
    low: "Contributing at the right moment in fast discussions needs attention.",
    mid: "You participate well; work on influence and timing.",
    high: "Comfortable in meetings; focus on leading and closing discussions.",
  },
  spontaneous: {
    low: "Unscripted moments are where practice will pay off most.",
    mid: "You cope well; aim for shorter, more structured answers.",
    high: "Comfortable thinking on your feet; sharpen precision under pressure.",
  },
  vocabulary: {
    low: "Expanding functional business language will unlock nuance.",
    mid: "Good working range; build a more executive register.",
    high: "Wide range; refine word choice for tone and diplomacy.",
  },
  clarity: {
    low: "Simplifying complex ideas for mixed audiences is a priority.",
    mid: "Generally clear; tighten structure and lead with the point.",
    high: "Clear communicator; keep messages concise as stakes rise.",
  },
  precision: {
    low: "Expressing exact meaning — especially in disagreement — needs work.",
    mid: "Usually precise; strengthen diplomatic and negotiation language.",
    high: "Precise and nuanced; focus on persuasion and framing.",
  },
  presence: {
    low: "Projecting authority in English is a key development area.",
    mid: "Credible presence; build composure in high-pressure moments.",
    high: "Strong presence; polish for senior and board-level audiences.",
  },
};

/* ----------------------------------------------------------------------------
 * Other languages (spec 001). Text only, keyed by question id and option
 * value — weights and structure above are shared by every language.
 * ------------------------------------------------------------------------- */

type QuestionText = { prompt: string; help?: string; options: Record<string, string> };

const questionTextEs: Record<string, QuestionText> = {
  frequency: {
    prompt: "¿Con qué frecuencia usa el inglés en el trabajo?",
    options: {
      daily: "Todos los días: es mi idioma principal de trabajo",
      weekly: "Varias veces por semana",
      monthly: "Algunas veces al mes, a menudo en momentos importantes",
      rarely: "Poco por ahora, pero mi rol está cambiando",
    },
  },
  difficult: {
    prompt: "¿Qué situaciones le resultan más difíciles?",
    help: "Elija hasta tres.",
    options: {
      presenting: "Presentar ante la alta dirección",
      questions: "Responder preguntas inesperadas",
      negotiating: "Negociar",
      disagreeing: "Discrepar con diplomacia",
      technical: "Explicar temas técnicos o complejos",
      smalltalk: "Conversación informal y networking",
      writing: "Redactar correos y mensajes importantes",
      meetings: "Participar en reuniones de ritmo rápido",
    },
  },
  presenting: {
    prompt: "¿Qué tan seguro se siente al presentar en inglés?",
    options: {
      "1": "Lo evito siempre que puedo",
      "2": "Puedo hacerlo, pero me preparo de más y aun así me siento expuesto",
      "3": "Cómodo con contenido preparado",
      "4": "Seguro, pero quiero más impacto",
      "5": "Muy seguro: busco un acabado de nivel ejecutivo",
    },
  },
  spontaneous: {
    prompt: "¿Qué tan cómodo se siente con preguntas espontáneas?",
    options: {
      "1": "Me bloqueo o traduzco mentalmente",
      "2": "Respondo, pero no como lo haría en mi idioma",
      "3": "Normalmente bien; a veces me extiendo demasiado",
      "4": "Cómodo; quiero respuestas más precisas",
      "5": "Muy cómodo bajo presión",
    },
  },
  vocabulary: {
    prompt: "¿Con qué precisión puede expresar ideas de negocio con matices?",
    options: {
      "1": "A menudo me faltan las palabras adecuadas",
      "2": "Me hago entender, pero suena más simple de lo que quiero decir",
      "3": "Casi siempre con precisión, con algunos vacíos",
      "4": "Con precisión; quiero un registro más ejecutivo",
      "5": "Muy preciso en la mayoría de los contextos",
    },
  },
  priorities: {
    prompt: "¿Qué situaciones profesionales le importan más en este momento?",
    help: "Elija hasta tres.",
    options: {
      leadership_meetings: "Reuniones de dirección y del consejo",
      presentations: "Presentaciones y revisiones trimestrales",
      negotiations: "Negociaciones y conversaciones de precios",
      clients: "Relaciones con clientes internacionales",
      interviews: "Entrevistas para puestos internacionales",
      teams: "Liderar equipos internacionales",
      technical: "Discusiones técnicas y revisiones de incidentes",
      conferences: "Conferencias y networking",
    },
  },
};

const questionText: Record<Exclude<Locale, "en">, Record<string, QuestionText>> = { es: questionTextEs };

/** The questionnaire with its text in the requested language. */
export function localizeQuestions(questions: AssessmentQuestion[], locale: Locale): AssessmentQuestion[] {
  if (locale === "en") return questions;
  return questions.map((q) => {
    const t = questionText[locale][q.id];
    if (!t) return q;
    return {
      ...q,
      prompt: t.prompt,
      help: t.help ?? q.help,
      options: q.options.map((o) => ({ ...o, label: t.options[o.value] ?? o.label })),
    };
  });
}

const dimensionLabelsEs: typeof dimensionLabels = {
  presentation: "Comunicación en presentaciones",
  meetings: "Comunicación en reuniones",
  spontaneous: "Expresión espontánea",
  vocabulary: "Vocabulario de negocios",
  clarity: "Claridad",
  precision: "Precisión",
  presence: "Presencia ejecutiva",
};

const bandLabelsEs: typeof bandLabels = {
  1: "Foco prioritario",
  2: "En desarrollo",
  3: "Base sólida",
  4: "Fuerte",
  5: "Destacado",
};

const dimensionSummariesEs: typeof dimensionSummaries = {
  presentation: {
    low: "La estructura y la exposición de contenido preparado son una clara oportunidad.",
    mid: "Una base confiable; el siguiente paso es el impacto y el control de la audiencia.",
    high: "Buena exposición; afine el enfoque ejecutivo y el manejo de preguntas.",
  },
  meetings: {
    low: "Intervenir en el momento adecuado en conversaciones rápidas requiere atención.",
    mid: "Participa bien; trabaje la influencia y el momento de intervenir.",
    high: "Se siente cómodo en reuniones; concéntrese en dirigirlas y cerrarlas.",
  },
  spontaneous: {
    low: "Los momentos sin guion son donde la práctica dará más resultados.",
    mid: "Se desenvuelve bien; busque respuestas más breves y estructuradas.",
    high: "Piensa con agilidad; afine la precisión bajo presión.",
  },
  vocabulary: {
    low: "Ampliar el lenguaje funcional de negocios le permitirá expresar matices.",
    mid: "Buen rango de trabajo; construya un registro más ejecutivo.",
    high: "Rango amplio; afine la elección de palabras para el tono y la diplomacia.",
  },
  clarity: {
    low: "Simplificar ideas complejas para audiencias diversas es una prioridad.",
    mid: "Generalmente claro; ajuste la estructura y empiece por la idea principal.",
    high: "Comunicador claro; mantenga los mensajes concisos cuando suba lo que está en juego.",
  },
  precision: {
    low: "Expresar el significado exacto, sobre todo al discrepar, necesita trabajo.",
    mid: "Normalmente preciso; refuerce el lenguaje diplomático y de negociación.",
    high: "Preciso y con matices; concéntrese en la persuasión y el encuadre.",
  },
  presence: {
    low: "Proyectar autoridad en inglés es un área clave de desarrollo.",
    mid: "Presencia creíble; construya serenidad en los momentos de alta presión.",
    high: "Presencia sólida; pula su comunicación para audiencias de alta dirección y consejo.",
  },
};

export const assessmentText: Localized<{
  dimensionLabels: typeof dimensionLabels;
  bandLabels: typeof bandLabels;
  dimensionSummaries: typeof dimensionSummaries;
}> = {
  en: { dimensionLabels, bandLabels, dimensionSummaries },
  es: { dimensionLabels: dimensionLabelsEs, bandLabels: bandLabelsEs, dimensionSummaries: dimensionSummariesEs },
};

/**
 * Structured marketing copy. Kept out of components so it can later move to
 * a CMS without touching layout code. One version per language (spec 001);
 * the named exports below are the English values used by the app areas.
 */
import type { Localized } from "@/i18n/config";
import type { MetricKey, ScenarioCategory } from "@/lib/types";

const en = {
  audiences: [
    "CEOs",
    "Founders",
    "Directors & VPs",
    "Sales leaders",
    "Senior engineers",
    "Consultants",
    "Lawyers",
    "Finance professionals",
  ],

  pressureSituations: [
    { title: "Presenting to senior leadership", detail: "When the room is deciding, not just listening." },
    { title: "Defending a proposal", detail: "Holding your position when it is challenged." },
    { title: "Negotiating", detail: "Choosing words that protect value and relationships." },
    { title: "Answering unexpected questions", detail: "Thinking and speaking at the same time." },
    { title: "Explaining technical concepts", detail: "Making complexity simple for non-specialists." },
    { title: "Disagreeing diplomatically", detail: "Being direct without being abrupt." },
    { title: "Speaking spontaneously", detail: "No script, no slides, no time to translate." },
    { title: "Communicating under pressure", detail: "When stakes are high and attention is on you." },
  ],

  comparison: {
    traditional: {
      label: "Traditional English training",
      flow: ["Learn English", "Attend classes", "Complete exercises"],
      traits: [
        "Organized around levels and textbooks",
        "Measured in hours attended",
        "Generic topics and vocabulary lists",
        "Practice limited to class time",
      ],
    },
    performance: {
      label: "Executive English Performance",
      flow: [
        "Identify the situations that matter",
        "Practice those situations",
        "Receive AI feedback",
        "Receive expert coaching",
        "Measure improvement",
        "Perform in the real world",
      ],
      traits: [
        "Organized around your real professional situations",
        "Focused on communication performance, not hours",
        "Scenarios built from your role and industry",
        "Practice available between coaching sessions",
      ],
    },
  },

  processSteps: [
    {
      number: "01",
      key: "assess",
      title: "Assess",
      body: "Understand your current communication ability, goals, role and the professional situations you face.",
    },
    {
      number: "02",
      key: "personalize",
      title: "Personalize",
      body: "Build a communication development plan based on your real-world responsibilities.",
    },
    {
      number: "03",
      key: "practice",
      title: "Practice",
      body: "Use AI-assisted simulations and targeted exercises between coaching sessions.",
    },
    {
      number: "04",
      key: "perform",
      title: "Perform",
      body: "Apply the improvements to actual meetings, presentations, negotiations and professional situations.",
    },
  ] as { number: string; key: "assess" | "personalize" | "practice" | "perform"; title: string; body: string }[],

  journey: ["Assessment", "Personalization", "AI Practice", "Expert Coaching", "Real-world Performance"],
  journeyLabel: "Program journey",

  humanAiModel: [
    {
      actor: "AI",
      role: "Practice",
      body: "Realistic simulations and immediate feedback, available whenever you have twenty minutes.",
    },
    {
      actor: "Expert",
      role: "Coach",
      body: "Strategy, interpretation and the judgment that turns repetitions into real improvement.",
    },
    {
      actor: "You",
      role: "Perform",
      body: "Walk into the meeting, the presentation or the negotiation prepared.",
    },
  ],

  practiceSituations: [
    { label: "Executive meetings", category: "meetings" },
    { label: "Presentations", category: "presentations" },
    { label: "Negotiations", category: "negotiations" },
    { label: "Sales conversations", category: "sales" },
    { label: "Interviews", category: "interviews" },
    { label: "Difficult conversations", category: "difficult" },
    { label: "Technical explanations", category: "technical" },
    { label: "Networking", category: "networking" },
    { label: "Client calls", category: "client" },
    { label: "Q&A sessions", category: "presentations" },
  ] as { label: string; category: ScenarioCategory }[],

  feedbackAreas: [
    "Clarity",
    "Vocabulary",
    "Grammar",
    "Pronunciation",
    "Conciseness",
    "Confidence",
    "Response quality",
    "Communication patterns",
  ],

  metricLabels: {
    clarity: "Clarity",
    vocabulary: "Vocabulary",
    grammar: "Grammar",
    pronunciation: "Pronunciation",
    responseQuality: "Response quality",
    confidence: "Confidence",
  } as Record<MetricKey, string>,

  categoryLabels: {
    leadership: "Leadership",
    meetings: "Meetings",
    presentations: "Presentations",
    negotiations: "Negotiations",
    sales: "Sales",
    client: "Client communication",
    interviews: "Interviews",
    networking: "Networking",
    technical: "Technical communication",
    difficult: "Difficult conversations",
  } as Record<ScenarioCategory, string>,

  executiveOutcomes: [
    "Speak clearly in high-stakes meetings",
    "Present confidently to international leadership",
    "Negotiate effectively",
    "Explain complex ideas simply",
    "Handle difficult questions",
    "Communicate naturally with international clients",
    "Strengthen executive presence in English",
    "Write sharper professional emails and messages",
  ],

  preparationMoments: [
    "Interviews for international roles",
    "Board and leadership presentations",
    "Conferences and keynotes",
    "Contract and pricing negotiations",
    "Quarterly business reviews",
    "Critical client meetings",
  ],

  corporateNeeds: [
    "International clients",
    "US or European headquarters",
    "International teams",
    "Sales",
    "Negotiations",
    "Presentations",
    "Leadership meetings",
    "Technical discussions",
    "Cross-border collaboration",
    "Executive communication",
  ],

  corporateBuyers: ["HR directors", "L&D managers", "Talent development", "CEOs", "Country managers", "Department heads"],
};

const es: typeof en = {
  audiences: [
    "CEOs",
    "Fundadores",
    "Directores y VPs",
    "Líderes comerciales",
    "Ingenieros sénior",
    "Consultores",
    "Abogados",
    "Profesionales de finanzas",
  ],

  pressureSituations: [
    { title: "Presentar ante la alta dirección", detail: "Cuando la sala está decidiendo, no solo escuchando." },
    { title: "Defender una propuesta", detail: "Sostener su postura cuando la cuestionan." },
    { title: "Negociar", detail: "Elegir palabras que protejan el valor y la relación." },
    { title: "Responder preguntas inesperadas", detail: "Pensar y hablar al mismo tiempo." },
    { title: "Explicar conceptos técnicos", detail: "Hacer simple lo complejo para quienes no son especialistas." },
    { title: "Discrepar con diplomacia", detail: "Ser directo sin ser brusco." },
    { title: "Hablar de forma espontánea", detail: "Sin guion, sin diapositivas, sin tiempo para traducir." },
    { title: "Comunicar bajo presión", detail: "Cuando hay mucho en juego y todas las miradas están en usted." },
  ],

  comparison: {
    traditional: {
      label: "Capacitación tradicional de inglés",
      flow: ["Aprender inglés", "Asistir a clases", "Hacer ejercicios"],
      traits: [
        "Organizada por niveles y libros de texto",
        "Medida en horas de asistencia",
        "Temas genéricos y listas de vocabulario",
        "Práctica limitada al horario de clase",
      ],
    },
    performance: {
      label: "Executive English Performance",
      flow: [
        "Identificar las situaciones que importan",
        "Practicar esas situaciones",
        "Recibir retroalimentación de la IA",
        "Recibir coaching experto",
        "Medir la mejora",
        "Desempeñarse en el mundo real",
      ],
      traits: [
        "Organizado en torno a sus situaciones profesionales reales",
        "Enfocado en el desempeño comunicativo, no en horas",
        "Escenarios construidos a partir de su rol y su industria",
        "Práctica disponible entre sesiones de coaching",
      ],
    },
  },

  processSteps: [
    {
      number: "01",
      key: "assess",
      title: "Evaluar",
      body: "Entender su capacidad de comunicación actual, sus objetivos, su rol y las situaciones profesionales que enfrenta.",
    },
    {
      number: "02",
      key: "personalize",
      title: "Personalizar",
      body: "Diseñar un plan de desarrollo de la comunicación basado en sus responsabilidades reales.",
    },
    {
      number: "03",
      key: "practice",
      title: "Practicar",
      body: "Usar simulaciones asistidas por IA y ejercicios específicos entre sesiones de coaching.",
    },
    {
      number: "04",
      key: "perform",
      title: "Desempeñarse",
      body: "Aplicar las mejoras en reuniones, presentaciones, negociaciones y situaciones profesionales reales.",
    },
  ],

  journey: ["Evaluación", "Personalización", "Práctica con IA", "Coaching experto", "Desempeño real"],
  journeyLabel: "Recorrido del programa",

  humanAiModel: [
    {
      actor: "IA",
      role: "Práctica",
      body: "Simulaciones realistas y retroalimentación inmediata, disponibles cuando tenga veinte minutos.",
    },
    {
      actor: "Experto",
      role: "Coach",
      body: "Estrategia, interpretación y el criterio que convierte las repeticiones en una mejora real.",
    },
    {
      actor: "Usted",
      role: "Resultado",
      body: "Llegar preparado a la reunión, la presentación o la negociación.",
    },
  ],

  practiceSituations: [
    { label: "Reuniones ejecutivas", category: "meetings" },
    { label: "Presentaciones", category: "presentations" },
    { label: "Negociaciones", category: "negotiations" },
    { label: "Conversaciones de venta", category: "sales" },
    { label: "Entrevistas", category: "interviews" },
    { label: "Conversaciones difíciles", category: "difficult" },
    { label: "Explicaciones técnicas", category: "technical" },
    { label: "Networking", category: "networking" },
    { label: "Llamadas con clientes", category: "client" },
    { label: "Sesiones de preguntas y respuestas", category: "presentations" },
  ],

  feedbackAreas: [
    "Claridad",
    "Vocabulario",
    "Gramática",
    "Pronunciación",
    "Concisión",
    "Seguridad",
    "Calidad de las respuestas",
    "Patrones de comunicación",
  ],

  metricLabels: {
    clarity: "Claridad",
    vocabulary: "Vocabulario",
    grammar: "Gramática",
    pronunciation: "Pronunciación",
    responseQuality: "Calidad de respuesta",
    confidence: "Seguridad",
  },

  categoryLabels: {
    leadership: "Liderazgo",
    meetings: "Reuniones",
    presentations: "Presentaciones",
    negotiations: "Negociaciones",
    sales: "Ventas",
    client: "Comunicación con clientes",
    interviews: "Entrevistas",
    networking: "Networking",
    technical: "Comunicación técnica",
    difficult: "Conversaciones difíciles",
  },

  executiveOutcomes: [
    "Hablar con claridad en reuniones decisivas",
    "Presentar con seguridad ante líderes internacionales",
    "Negociar con eficacia",
    "Explicar ideas complejas de forma sencilla",
    "Manejar preguntas difíciles",
    "Comunicarse con naturalidad con clientes internacionales",
    "Fortalecer su presencia ejecutiva en inglés",
    "Redactar correos y mensajes profesionales más precisos",
  ],

  preparationMoments: [
    "Entrevistas para puestos internacionales",
    "Presentaciones ante el consejo y la dirección",
    "Conferencias y ponencias",
    "Negociaciones de contratos y precios",
    "Revisiones trimestrales de negocio",
    "Reuniones críticas con clientes",
  ],

  corporateNeeds: [
    "Clientes internacionales",
    "Casa matriz en EE. UU. o Europa",
    "Equipos internacionales",
    "Ventas",
    "Negociaciones",
    "Presentaciones",
    "Reuniones de dirección",
    "Discusiones técnicas",
    "Colaboración internacional",
    "Comunicación ejecutiva",
  ],

  corporateBuyers: [
    "Directores de RR. HH.",
    "Responsables de formación (L&D)",
    "Desarrollo del talento",
    "CEOs",
    "Country managers",
    "Jefes de área",
  ],
};

export type MarketingContent = typeof en;

export const marketingContent: Localized<MarketingContent> = { en, es };

export const {
  audiences,
  pressureSituations,
  comparison,
  processSteps,
  journey,
  humanAiModel,
  practiceSituations,
  feedbackAreas,
  metricLabels,
  categoryLabels,
  executiveOutcomes,
  preparationMoments,
  corporateNeeds,
  corporateBuyers,
} = en;

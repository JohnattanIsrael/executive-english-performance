import type { Localized } from "@/i18n/config";

type StepKey = "assess" | "personalize" | "practice" | "perform";

const en = {
  meta: {
    title: "How It Works",
    description:
      "Assess, personalize, practice, perform: how executive English coaching combines expert coaching with AI-assisted practice to improve communication in real business situations.",
  },
  hero: {
    eyebrow: "How it works",
    title: "A method built around performance, not hours.",
    lead: "Identify the situations that matter. Practice them. Receive AI feedback and expert coaching. Measure what changes. Perform better in the real world.",
  },
  details: {
    assess: [
      "Conversation about your role, stakeholders and goals",
      "Speaking and writing samples from real work situations",
      "Your initial Executive Communication Profile",
    ],
    personalize: [
      "A short list of priority situations",
      "Specific communication behaviors to develop",
      "A practice plan that fits your calendar",
    ],
    practice: [
      "Coaching sessions focused on your priority situations",
      "Simulations and targeted exercises between sessions",
      "Feedback on clarity, structure, language and delivery",
    ],
    perform: [
      "Preparation for upcoming meetings and presentations",
      "Debriefs after real events",
      "Periodic reassessment against your starting profile",
    ],
  } as Record<StepKey, string[]>,
  measuring: {
    eyebrow: "Measuring progress",
    title: "Progress you can see, measured honestly.",
    lead: "We track improvement against your real situations. Indicators are practice tools, not standardized test scores — and we say so.",
    items: [
      { title: "Coach observation", body: "Structured notes on the behaviors you’re developing, session by session." },
      { title: "Periodic reassessment", body: "Your communication profile revisited at key milestones." },
      { title: "Practice record", body: "What you practiced, how often, and how your responses changed." },
      { title: "Real-world debriefs", body: "How the actual meeting, presentation or negotiation went." },
    ],
  },
};

const es: typeof en = {
  meta: {
    title: "Cómo funciona",
    description:
      "Evaluar, personalizar, practicar, desempeñarse: cómo el coaching de inglés ejecutivo combina coaching experto con práctica asistida por IA para mejorar la comunicación en situaciones reales de negocio.",
  },
  hero: {
    eyebrow: "Cómo funciona",
    title: "Un método pensado para el desempeño, no para las horas.",
    lead: "Identifique las situaciones que importan. Practíquelas. Reciba retroalimentación de la IA y coaching experto. Mida lo que cambia. Desempéñese mejor en el mundo real.",
  },
  details: {
    assess: [
      "Conversación sobre su rol, sus interlocutores y sus objetivos",
      "Muestras orales y escritas de situaciones reales de trabajo",
      "Su Perfil de Comunicación Ejecutiva inicial",
    ],
    personalize: [
      "Una lista breve de situaciones prioritarias",
      "Comportamientos de comunicación concretos a desarrollar",
      "Un plan de práctica que se adapta a su agenda",
    ],
    practice: [
      "Sesiones de coaching centradas en sus situaciones prioritarias",
      "Simulaciones y ejercicios específicos entre sesiones",
      "Retroalimentación sobre claridad, estructura, lenguaje y forma de expresarse",
    ],
    perform: [
      "Preparación de próximas reuniones y presentaciones",
      "Análisis posteriores a los eventos reales",
      "Reevaluación periódica frente a su perfil inicial",
    ],
  },
  measuring: {
    eyebrow: "Medir el progreso",
    title: "Un progreso visible, medido con honestidad.",
    lead: "Seguimos la mejora frente a sus situaciones reales. Los indicadores son herramientas de práctica, no puntuaciones de exámenes estandarizados, y así lo decimos.",
    items: [
      { title: "Observación del coach", body: "Notas estructuradas sobre los comportamientos que desarrolla, sesión a sesión." },
      { title: "Reevaluación periódica", body: "Su perfil de comunicación revisado en los momentos clave." },
      { title: "Registro de práctica", body: "Qué practicó, con qué frecuencia y cómo cambiaron sus respuestas." },
      { title: "Análisis de situaciones reales", body: "Cómo fue la reunión, la presentación o la negociación real." },
    ],
  },
};

export const howItWorksCopy: Localized<typeof en> = { en, es };

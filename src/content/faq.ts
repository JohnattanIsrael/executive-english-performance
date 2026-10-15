import type { Localized } from "@/i18n/config";

export interface FaqItem {
  /** Stable key, the same in every language. */
  id: string;
  question: string;
  answer: string;
  group: "approach" | "ai" | "programs" | "companies";
}

const en: FaqItem[] = [
  {
    id: "english-course",
    group: "approach",
    question: "Is this an English course?",
    answer:
      "Not in the traditional sense. The program focuses on professional communication and the situations where English performance matters most.",
  },
  {
    id: "advanced-english",
    group: "approach",
    question: "Do I need advanced English?",
    answer:
      "No. Most programs are designed for professionals who already use English at work, and your assessment determines where we start. If your English is still basic, the 8-week Executive Fast Track builds the essential English for your own work situations first.",
  },
  {
    id: "vs-classes",
    group: "approach",
    question: "How is this different from conversation classes or a language app?",
    answer:
      "Classes and apps are organized around language topics and levels. This work is organized around your real situations — the specific meeting, presentation or negotiation — and is measured by how you communicate in them, not by hours attended.",
  },
  {
    id: "corrections",
    group: "approach",
    question: "Will my grammar and pronunciation be corrected?",
    answer:
      "Yes, where it affects how you are understood or perceived. Accuracy matters, but it is addressed in service of clarity, credibility and impact rather than as an end in itself.",
  },
  {
    id: "ai-replacing",
    group: "ai",
    question: "Is AI replacing the coach?",
    answer:
      "No. AI expands the amount of practice available between sessions. Human coaching remains responsible for strategy, interpretation and high-value feedback.",
  },
  {
    id: "ai-available",
    group: "ai",
    question: "Is the AI coach available now?",
    answer:
      "The AI communication platform is currently under development. Early-access clients will be invited as functionality becomes available.",
  },
  {
    id: "data",
    group: "ai",
    question: "What will happen to my practice recordings and data?",
    answer:
      "Data handling will be documented in our privacy policy before any recording features launch. Practice data will be used to provide feedback to you and your coach — never sold.",
  },
  {
    id: "program-length",
    group: "programs",
    question: "How long is the Executive Performance Program?",
    answer:
      "Twelve weeks. It combines private coaching, structured practice between sessions and progress assessments at key milestones.",
  },
  {
    id: "specific-event",
    group: "programs",
    question: "Can you help me prepare for a specific event?",
    answer:
      "Yes. Many clients come to us with a defined moment in mind — a board presentation, an interview, a negotiation or a conference. Preparation for that moment becomes part of the plan.",
  },
  {
    id: "guarantee",
    group: "programs",
    question: "Do you guarantee specific results?",
    answer:
      "No. We commit to a rigorous process: a clear assessment, a personalized plan, deliberate practice and expert feedback. How you apply it in your role is yours — and that is where the work is aimed.",
  },
  {
    id: "multiple-employees",
    group: "companies",
    question: "Can companies enroll multiple employees?",
    answer:
      "Yes. Companies can start with a pilot for one team or enroll cohorts of roughly 10–50 people in an annual program.",
  },
  {
    id: "industry",
    group: "companies",
    question: "Can the program be customized to our industry?",
    answer: "Yes. Scenarios can be designed around the company's real communication needs.",
  },
  {
    id: "reporting",
    group: "companies",
    question: "What reporting do companies receive?",
    answer:
      "Participation and progress dashboards, plus quarterly reports summarizing development themes across the cohort. Individual coaching conversations remain confidential.",
  },
];

const es: FaqItem[] = [
  {
    id: "english-course",
    group: "approach",
    question: "¿Es un curso de inglés?",
    answer:
      "No en el sentido tradicional. El programa se centra en la comunicación profesional y en las situaciones donde el desempeño en inglés más importa.",
  },
  {
    id: "advanced-english",
    group: "approach",
    question: "¿Necesito un inglés avanzado?",
    answer:
      "No. La mayoría de los programas están pensados para profesionales que ya usan el inglés en el trabajo, y su evaluación determina por dónde empezamos. Si su inglés todavía es básico, el Fast Track Ejecutivo de 8 semanas construye primero el inglés esencial para sus propias situaciones de trabajo.",
  },
  {
    id: "vs-classes",
    group: "approach",
    question: "¿En qué se diferencia de las clases de conversación o de una aplicación de idiomas?",
    answer:
      "Las clases y las aplicaciones se organizan por temas y niveles de idioma. Este trabajo se organiza en torno a sus situaciones reales —la reunión, la presentación o la negociación concretas— y se mide por cómo se comunica en ellas, no por las horas de asistencia.",
  },
  {
    id: "corrections",
    group: "approach",
    question: "¿Me corregirán la gramática y la pronunciación?",
    answer:
      "Sí, cuando afectan a cómo lo entienden o lo perciben. La precisión importa, pero se trabaja al servicio de la claridad, la credibilidad y el impacto, no como un fin en sí mismo.",
  },
  {
    id: "ai-replacing",
    group: "ai",
    question: "¿La IA reemplaza al coach?",
    answer:
      "No. La IA amplía la cantidad de práctica disponible entre sesiones. El coaching humano sigue siendo responsable de la estrategia, la interpretación y la retroalimentación de mayor valor.",
  },
  {
    id: "ai-available",
    group: "ai",
    question: "¿El coach de IA ya está disponible?",
    answer:
      "La plataforma de comunicación con IA está en desarrollo. Invitaremos a los clientes con acceso anticipado a medida que las funciones estén disponibles.",
  },
  {
    id: "data",
    group: "ai",
    question: "¿Qué pasará con mis grabaciones y datos de práctica?",
    answer:
      "El tratamiento de los datos se documentará en nuestra política de privacidad antes de lanzar cualquier función de grabación. Los datos de práctica se usarán para darle retroalimentación a usted y a su coach; nunca se venderán.",
  },
  {
    id: "program-length",
    group: "programs",
    question: "¿Cuánto dura el Programa de Desempeño Ejecutivo?",
    answer:
      "Doce semanas. Combina coaching privado, práctica estructurada entre sesiones y evaluaciones de progreso en momentos clave.",
  },
  {
    id: "specific-event",
    group: "programs",
    question: "¿Pueden ayudarme a preparar un evento concreto?",
    answer:
      "Sí. Muchos clientes llegan con un momento definido en mente: una presentación ante el consejo, una entrevista, una negociación o una conferencia. La preparación para ese momento pasa a formar parte del plan.",
  },
  {
    id: "guarantee",
    group: "programs",
    question: "¿Garantizan resultados concretos?",
    answer:
      "No. Nos comprometemos con un proceso riguroso: una evaluación clara, un plan personalizado, práctica deliberada y retroalimentación experta. Cómo lo aplique en su rol depende de usted, y ahí es donde apunta el trabajo.",
  },
  {
    id: "multiple-employees",
    group: "companies",
    question: "¿Las empresas pueden inscribir a varios empleados?",
    answer:
      "Sí. Las empresas pueden empezar con un piloto para un equipo o inscribir grupos de aproximadamente 10 a 50 personas en un programa anual.",
  },
  {
    id: "industry",
    group: "companies",
    question: "¿Se puede adaptar el programa a nuestra industria?",
    answer: "Sí. Los escenarios pueden diseñarse en torno a las necesidades reales de comunicación de la empresa.",
  },
  {
    id: "reporting",
    group: "companies",
    question: "¿Qué informes reciben las empresas?",
    answer:
      "Paneles de participación y progreso, además de informes trimestrales que resumen los temas de desarrollo del grupo. Las conversaciones individuales de coaching se mantienen confidenciales.",
  },
];

export const faqContent: Localized<FaqItem[]> = { en, es };

/** English FAQ (kept for existing imports). */
export const faqs = en;

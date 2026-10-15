import type { Localized } from "@/i18n/config";

const en = {
  meta: {
    title: "Corporate English & Executive Communication Training",
    description:
      "Corporate executive communication programs for leadership teams who work in English: assessments, coaching, business-specific simulations, progress dashboards and quarterly reporting.",
    keywords: ["corporate English training", "executive communication training", "business communication coaching"],
    serviceName: "Corporate executive communication program",
  },
  hero: {
    eyebrow: "For companies",
    title: "Develop stronger English communication across your leadership team.",
    lead: "A structured executive communication program for the people who represent your company in English — not another set of language classes.",
    secondary: "How the program works",
  },
  why: {
    eyebrow: "Why companies invest",
    title: "When English affects results, classes aren’t enough.",
    lead: "Your managers may already speak good English. The question is whether they lead meetings, present to headquarters, negotiate with clients and explain complex work with the clarity and authority their roles require. That is a performance problem — and it can be developed deliberately.",
    needsTitle: "Built for teams who need English for",
  },
  program: {
    eyebrow: "Corporate Executive Communication Program",
    title: "A structured program for cohorts of roughly 10–50 people.",
    lead: "Designed around your company’s real communication needs, with visibility for the people accountable for development.",
    phases: [
      { title: "Onboarding", body: "Leadership interviews to understand where English communication affects results." },
      { title: "Assessment", body: "Every participant receives an individual communication profile." },
      { title: "Coaching & practice", body: "Human coaching plus simulations built from your real business scenarios." },
      { title: "Reporting", body: "Progress dashboards and quarterly reports for HR and leadership." },
    ],
    visibilityTitle: "Visibility without micromanagement.",
    visibilityBody:
      "HR and L&D see participation, practice volume and cohort-level progress. Individual coaching conversations remain confidential — which is what makes people speak openly about their challenges.",
    confidential: "Coaching content stays between participant and coach.",
    preview: "Preview the company dashboard",
    previewNote: "",
    cohortTitle: "Cohort progress",
    cohortBadge: "Illustrative report view",
    cohortNote: "Coach-rated practice indicators (0–100), cohort average. Not a standardized test score.",
  },
  beginners:
    "Some of your people are beginners in English? The 8-week Executive Fast Track gets them working in English first.",
  beginnersLink: "Executive Fast Track",
  options: {
    eyebrow: "Engagement options",
    title: "Start with a pilot. Scale with confidence.",
    note: "Pricing is customized based on company size, number of participants, coaching frequency and scope.",
  },
  buyers: {
    eyebrow: "Who we work with",
    title: "Built for the people accountable for development.",
    body: "We work with you to define the situations that matter for your business, design scenarios around them, and report on progress in a way that is useful to leadership — so the program is judged on how people communicate, not on attendance.",
  },
  cta: {
    title: "Let’s scope a program for your team.",
    lead: "Tell us about your team, your international stakeholders and where communication affects results. We’ll propose a pilot or annual program.",
  },
};

const es: typeof en = {
  meta: {
    title: "Capacitación corporativa en inglés y comunicación ejecutiva",
    description:
      "Programas corporativos de comunicación ejecutiva para equipos directivos que trabajan en inglés: evaluaciones, coaching, simulaciones propias del negocio, paneles de progreso e informes trimestrales.",
    keywords: ["capacitación corporativa de inglés", "comunicación ejecutiva en inglés", "coaching de comunicación empresarial"],
    serviceName: "Programa corporativo de comunicación ejecutiva",
  },
  hero: {
    eyebrow: "Para empresas",
    title: "Fortalezca la comunicación en inglés de todo su equipo directivo.",
    lead: "Un programa estructurado de comunicación ejecutiva para las personas que representan a su empresa en inglés, no otro paquete de clases de idiomas.",
    secondary: "Cómo funciona el programa",
  },
  why: {
    eyebrow: "Por qué invierten las empresas",
    title: "Cuando el inglés afecta los resultados, las clases no bastan.",
    lead: "Es posible que sus gerentes ya hablen buen inglés. La pregunta es si dirigen reuniones, presentan ante la casa matriz, negocian con clientes y explican trabajo complejo con la claridad y la autoridad que exige su rol. Ese es un problema de desempeño, y se puede desarrollar de forma deliberada.",
    needsTitle: "Pensado para equipos que necesitan el inglés para",
  },
  program: {
    eyebrow: "Programa Corporativo de Comunicación Ejecutiva",
    title: "Un programa estructurado para grupos de aproximadamente 10 a 50 personas.",
    lead: "Diseñado en torno a las necesidades reales de comunicación de su empresa, con visibilidad para quienes son responsables del desarrollo.",
    phases: [
      { title: "Incorporación", body: "Entrevistas con la dirección para entender dónde la comunicación en inglés afecta los resultados." },
      { title: "Evaluación", body: "Cada participante recibe un perfil individual de comunicación." },
      { title: "Coaching y práctica", body: "Coaching humano y simulaciones construidas a partir de escenarios reales de su negocio." },
      { title: "Informes", body: "Paneles de progreso e informes trimestrales para RR. HH. y la dirección." },
    ],
    visibilityTitle: "Visibilidad sin microgestión.",
    visibilityBody:
      "RR. HH. y Formación ven la participación, el volumen de práctica y el progreso del grupo. Las conversaciones individuales de coaching son confidenciales, y eso es lo que permite que las personas hablen abiertamente de sus retos.",
    confidential: "El contenido del coaching queda entre el participante y el coach.",
    preview: "Ver el panel de empresa",
    previewNote: "(espacio de ejemplo, en inglés)",
    cohortTitle: "Progreso del grupo",
    cohortBadge: "Vista ilustrativa del informe",
    cohortNote: "Indicadores de práctica valorados por el coach (0–100), promedio del grupo. No es la puntuación de un examen estandarizado.",
  },
  beginners:
    "¿Parte de su equipo es principiante en inglés? El Fast Track Ejecutivo de 8 semanas les permite empezar a trabajar en inglés.",
  beginnersLink: "Fast Track Ejecutivo",
  options: {
    eyebrow: "Modalidades",
    title: "Empiece con un piloto. Escale con confianza.",
    note: "El precio se personaliza según el tamaño de la empresa, el número de participantes, la frecuencia del coaching y el alcance.",
  },
  buyers: {
    eyebrow: "Con quién trabajamos",
    title: "Pensado para quienes son responsables del desarrollo.",
    body: "Trabajamos con usted para definir las situaciones que importan en su negocio, diseñar escenarios en torno a ellas e informar del progreso de una forma útil para la dirección, de modo que el programa se juzgue por cómo se comunican las personas, no por la asistencia.",
  },
  cta: {
    title: "Definamos un programa para su equipo.",
    lead: "Cuéntenos sobre su equipo, sus interlocutores internacionales y dónde la comunicación afecta los resultados. Le propondremos un piloto o un programa anual.",
  },
};

export const companiesCopy: Localized<typeof en> = { en, es };

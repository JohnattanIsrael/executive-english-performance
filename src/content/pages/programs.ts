import type { Localized } from "@/i18n/config";

const en = {
  meta: {
    title: "Executive English Programs",
    description:
      "The 12-week Executive Performance Program, the 8-week Executive Fast Track for beginners, the Executive Communication Advisory for senior leaders, and corporate programs for leadership teams.",
    keywords: ["executive English training", "executive communication training", "English coaching for professionals"],
  },
  hero: {
    eyebrow: "Programs",
    title: "Programs built around communication performance.",
    lead: "Every program starts with an assessment and is shaped around your real situations. We don’t sell blocks of hours — we design a path from where you are to how you need to perform.",
    compare: "Compare pricing",
  },
  twelveWeeks: {
    title: "The 12 weeks",
    phases: [
      { weeks: "Weeks 1–2", title: "Assess & plan", body: "Executive assessment, priority situations and your communication strategy." },
      { weeks: "Weeks 3–10", title: "Coach & practice", body: "Private coaching, simulations and targeted practice between sessions." },
      { weeks: "Weeks 11–12", title: "Perform & review", body: "Preparation for real events, final assessment and next-step plan." },
    ],
    note: "The program commits to a process — assessment, strategy, coaching, practice and measurement. It does not promise promotions, salary changes or “fluency in weeks.”",
  },
  fastTrack: {
    title: "The 8 weeks",
    link: "See the full Fast Track plan",
  },
  companies: {
    eyebrow: "For companies",
    title: "Corporate pilots and annual programs",
    body: "Structured programs for leadership teams and cohorts of roughly 10–50 people, with reporting for HR and leadership.",
    link: "Programs for companies",
  },
};

const es: typeof en = {
  meta: {
    title: "Programas de inglés ejecutivo",
    description:
      "El Programa de Desempeño Ejecutivo de 12 semanas, el Fast Track Ejecutivo de 8 semanas para principiantes, la Asesoría en Comunicación Ejecutiva para la alta dirección y programas corporativos para equipos directivos.",
    keywords: ["programa de inglés ejecutivo", "comunicación ejecutiva en inglés", "coaching de inglés para profesionales"],
  },
  hero: {
    eyebrow: "Programas",
    title: "Programas construidos en torno al desempeño comunicativo.",
    lead: "Cada programa empieza con una evaluación y se adapta a sus situaciones reales. No vendemos paquetes de horas: diseñamos un camino desde donde está hasta cómo necesita desempeñarse.",
    compare: "Comparar precios",
  },
  twelveWeeks: {
    title: "Las 12 semanas",
    phases: [
      { weeks: "Semanas 1–2", title: "Evaluar y planificar", body: "Evaluación ejecutiva, situaciones prioritarias y su estrategia de comunicación." },
      { weeks: "Semanas 3–10", title: "Coaching y práctica", body: "Coaching privado, simulaciones y práctica específica entre sesiones." },
      { weeks: "Semanas 11–12", title: "Desempeño y revisión", body: "Preparación para eventos reales, evaluación final y plan de siguientes pasos." },
    ],
    note: "El programa se compromete con un proceso: evaluación, estrategia, coaching, práctica y medición. No promete ascensos, aumentos de sueldo ni «fluidez en semanas».",
  },
  fastTrack: {
    title: "Las 8 semanas",
    link: "Ver el plan completo del Fast Track",
  },
  companies: {
    eyebrow: "Para empresas",
    title: "Pilotos corporativos y programas anuales",
    body: "Programas estructurados para equipos directivos y grupos de aproximadamente 10 a 50 personas, con informes para RR. HH. y la dirección.",
    link: "Programas para empresas",
  },
};

export const programsCopy: Localized<typeof en> = { en, es };

import type { Localized } from "@/i18n/config";

const en = {
  meta: {
    title: "Results & Case Studies",
    description:
      "How Executive English Performance documents client progress: observable change in real business situations, reported with permission.",
  },
  hero: {
    eyebrow: "Results",
    title: "Evidence, documented carefully.",
    lead: "Communication improvement is real but rarely captured by a single number. We document it the way a careful advisor would: the situation, the challenge, what we did, and what changed — with the client’s permission.",
  },
  standard: {
    eyebrow: "Our standard",
    title: "How we report results.",
    principles: [
      "Results are described as observable changes in real situations.",
      "No invented statistics, testimonials or client logos.",
      "Client details are shared only with written permission.",
      "Where outcomes depend on many factors, we say so.",
    ],
  },
  cases: {
    eyebrow: "Case studies",
    title: "Case study framework",
    sample: "Sample case study — replace with verified client data.",
    fields: {
      clientSituation: "Client situation",
      communicationChallenge: "Communication challenge",
      intervention: "Intervention",
      aiPractice: "AI-assisted practice",
      humanCoaching: "Human coaching",
      observedImprovement: "Observed improvement",
    },
    quote: "Client quote",
    quotePlaceholder: "[Add a verified client quote with written permission, or omit.]",
  },
};

const es: typeof en = {
  meta: {
    title: "Resultados y casos",
    description:
      "Cómo documenta Executive English Performance el progreso de sus clientes: cambios observables en situaciones reales de negocio, publicados con permiso.",
  },
  hero: {
    eyebrow: "Resultados",
    title: "Evidencia, documentada con cuidado.",
    lead: "La mejora en la comunicación es real, pero rara vez cabe en un solo número. La documentamos como lo haría un asesor cuidadoso: la situación, el reto, lo que hicimos y lo que cambió, con el permiso del cliente.",
  },
  standard: {
    eyebrow: "Nuestro estándar",
    title: "Cómo informamos los resultados.",
    principles: [
      "Los resultados se describen como cambios observables en situaciones reales.",
      "Sin estadísticas, testimonios ni logotipos de clientes inventados.",
      "Los datos de los clientes se comparten solo con permiso por escrito.",
      "Cuando los resultados dependen de muchos factores, lo decimos.",
    ],
  },
  cases: {
    eyebrow: "Casos",
    title: "Marco para los casos de estudio",
    sample: "Caso de ejemplo: reemplazar por datos verificados de clientes.",
    fields: {
      clientSituation: "Situación del cliente",
      communicationChallenge: "Reto de comunicación",
      intervention: "Intervención",
      aiPractice: "Práctica asistida por IA",
      humanCoaching: "Coaching humano",
      observedImprovement: "Mejora observada",
    },
    quote: "Cita del cliente",
    quotePlaceholder: "[Agregue una cita verificada del cliente con permiso por escrito, u omítala.]",
  },
};

export const resultsCopy: Localized<typeof en> = { en, es };

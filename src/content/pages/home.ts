import type { Localized } from "@/i18n/config";

const en = {
  meta: {
    title: "Executive English Performance — Executive English Coaching for Leaders",
    description:
      "Executive English coaching for professionals who need to perform, not simply practice. Expert coaching and AI-assisted practice for meetings, presentations and negotiations in English.",
  },
  hero: {
    eyebrow: "Executive English Performance",
    title: ["Your English is good enough.", "Your communication should be exceptional."],
    lead: "Executive English coaching for professionals who need to perform, not simply practice — in the meetings, presentations and negotiations where communication has real business consequences.",
    secondary: "Explore the Program",
    audiencesPrefix: "For ",
    audiencesSuffix: " — and professionals working with US, Canadian and European companies.",
  },
  photoBand: {
    eyebrow: "When it matters",
    title: "Built for the moments when everyone is listening.",
    body: "The keynote. The board update. The negotiation that sets next year’s numbers. We prepare you for the specific moments where your English carries the weight of your work.",
  },
  programs: {
    eyebrow: "Programs",
    title: "Built around what’s at stake, not around hours.",
    lead: "Private programs for executives and senior professionals, and structured programs for leadership teams.",
    compare: "Compare pricing",
  },
  companies: {
    eyebrow: "For companies",
    title: "Develop stronger English communication across your leadership team.",
    lead: "Instead of traditional English classes, invest in a structured executive communication program — assessments, coaching, business-specific simulations and reporting your leadership can act on.",
    secondary: "Programs for companies",
    needsTitle: "For professionals who need English for",
    pilot: "Corporate Pilot",
    annual: "Annual Program",
    custom: "Custom pricing",
  },
  experience: {
    portrait: "Founder portrait — replace with professional photography.",
    eyebrow: "Founded on experience",
    title: "Experience matters when communication has consequences.",
    lead: "The methodology comes from years of observing how professionals actually communicate in business — where hesitation, structure and tone matter as much as vocabulary. Not from teaching grammar in isolation.",
    placeholder: "Add the founder’s verified experience here: years teaching, industries, countries and executive clients.",
    link: "About the founder and method",
  },
  faq: {
    eyebrow: "Questions",
    title: "Straight answers.",
    link: "All questions",
  },
};

const es: typeof en = {
  meta: {
    title: "Executive English Performance — Coaching de inglés ejecutivo para líderes",
    description:
      "Coaching de inglés ejecutivo para profesionales que necesitan desempeñarse, no solo practicar. Coaching experto y práctica asistida por IA para reuniones, presentaciones y negociaciones en inglés.",
  },
  hero: {
    eyebrow: "Executive English Performance",
    title: ["Su inglés es suficientemente bueno.", "Su comunicación debería ser excepcional."],
    lead: "Coaching de inglés ejecutivo para profesionales que necesitan desempeñarse, no solo practicar: en las reuniones, presentaciones y negociaciones donde la comunicación tiene consecuencias reales para el negocio.",
    secondary: "Conocer el programa",
    audiencesPrefix: "Para ",
    audiencesSuffix: ", y profesionales que trabajan con empresas de EE. UU., Canadá y Europa.",
  },
  photoBand: {
    eyebrow: "Cuando más importa",
    title: "Pensado para los momentos en que todos escuchan.",
    body: "La ponencia. El informe al consejo. La negociación que define las cifras del próximo año. Le preparamos para los momentos concretos en los que su inglés carga con el peso de su trabajo.",
  },
  programs: {
    eyebrow: "Programas",
    title: "Diseñados en torno a lo que está en juego, no a las horas.",
    lead: "Programas privados para ejecutivos y profesionales sénior, y programas estructurados para equipos directivos.",
    compare: "Comparar precios",
  },
  companies: {
    eyebrow: "Para empresas",
    title: "Fortalezca la comunicación en inglés de todo su equipo directivo.",
    lead: "En lugar de clases de inglés tradicionales, invierta en un programa estructurado de comunicación ejecutiva: evaluaciones, coaching, simulaciones propias de su negocio e informes que su dirección pueda usar.",
    secondary: "Programas para empresas",
    needsTitle: "Para profesionales que necesitan el inglés para",
    pilot: "Piloto Corporativo",
    annual: "Programa Anual",
    custom: "Precio a medida",
  },
  experience: {
    portrait: "Retrato del fundador: reemplazar por fotografía profesional.",
    eyebrow: "Basado en la experiencia",
    title: "La experiencia importa cuando la comunicación tiene consecuencias.",
    lead: "La metodología surge de años de observar cómo se comunican realmente los profesionales en los negocios, donde la vacilación, la estructura y el tono importan tanto como el vocabulario. No de enseñar gramática de forma aislada.",
    placeholder: "Agregue aquí la experiencia verificada del fundador: años de docencia, industrias, países y clientes ejecutivos.",
    link: "Sobre el fundador y el método",
  },
  faq: {
    eyebrow: "Preguntas",
    title: "Respuestas directas.",
    link: "Todas las preguntas",
  },
};

export const homeCopy: Localized<typeof en> = { en, es };

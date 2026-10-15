import { pricingNote, pricingNoteEs } from "@/config/programs";
import type { Localized } from "@/i18n/config";

const en = {
  meta: {
    title: "Pricing",
    description:
      "Pricing for executive English coaching: the Executive Performance Program, the Executive Fast Track for beginners, Executive Communication Advisory, AI Communication Coach early access and corporate programs.",
  },
  hero: {
    eyebrow: "Pricing",
    title: "An investment in how you perform.",
    lead: "Clear starting points for every program. Your assessment determines the final scope — and you see a fixed proposal before you commit.",
  },
  b2c: "For executives & professionals",
  b2b: "For companies",
  note: pricingNote,
  factors: {
    eyebrow: "What shapes the price",
    title: "Four factors, discussed openly.",
    items: [
      { title: "Program scope", body: "The number and complexity of situations we prepare for." },
      { title: "Executive involvement", body: "Seniority, stakes and the level of preparation required." },
      { title: "Coaching frequency", body: "How often you meet with your coach and how much review happens between sessions." },
      { title: "Number of participants", body: "For companies, cohort size and the reporting required." },
    ],
  },
  faq: {
    eyebrow: "Pricing questions",
    title: "Before you decide.",
    items: [
      {
        question: "Why do you show a price range rather than a fixed price?",
        answer:
          "Because programs are built around your situations. The assessment determines scope and coaching frequency, and you receive a clear, fixed proposal before you commit.",
      },
      {
        question: "Do you guarantee specific results?",
        answer:
          "No. We commit to a rigorous process — assessment, strategy, coaching, practice and measurement — and to being honest about progress along the way.",
      },
      {
        question: "Can my employer pay for the program?",
        answer:
          "Often, yes. Many professionals use a training or development budget, and we can prepare a proposal addressed to your company.",
      },
      {
        question: "When will the AI Communication Coach be priced?",
        answer: "Pricing will be announced when early access opens. Coaching clients will be invited first.",
      },
    ],
  },
};

const es: typeof en = {
  meta: {
    title: "Precios",
    description:
      "Precios del coaching de inglés ejecutivo: el Programa de Desempeño Ejecutivo, el Fast Track Ejecutivo para principiantes, la Asesoría en Comunicación Ejecutiva, el acceso anticipado al Coach de Comunicación con IA y los programas corporativos.",
  },
  hero: {
    eyebrow: "Precios",
    title: "Una inversión en cómo se desempeña.",
    lead: "Puntos de partida claros para cada programa. Su evaluación determina el alcance final, y usted ve una propuesta cerrada antes de comprometerse.",
  },
  b2c: "Para ejecutivos y profesionales",
  b2b: "Para empresas",
  note: pricingNoteEs,
  factors: {
    eyebrow: "Qué define el precio",
    title: "Cuatro factores, conversados abiertamente.",
    items: [
      { title: "Alcance del programa", body: "El número y la complejidad de las situaciones para las que nos preparamos." },
      { title: "Participación ejecutiva", body: "La jerarquía, lo que está en juego y el nivel de preparación necesario." },
      { title: "Frecuencia del coaching", body: "Con qué frecuencia se reúne con su coach y cuánta revisión hay entre sesiones." },
      { title: "Número de participantes", body: "Para empresas, el tamaño del grupo y los informes necesarios." },
    ],
  },
  faq: {
    eyebrow: "Preguntas sobre precios",
    title: "Antes de decidir.",
    items: [
      {
        question: "¿Por qué muestran un rango de precios en lugar de un precio fijo?",
        answer:
          "Porque los programas se construyen en torno a sus situaciones. La evaluación determina el alcance y la frecuencia del coaching, y usted recibe una propuesta clara y cerrada antes de comprometerse.",
      },
      {
        question: "¿Garantizan resultados concretos?",
        answer:
          "No. Nos comprometemos con un proceso riguroso —evaluación, estrategia, coaching, práctica y medición— y con ser honestos sobre el progreso en todo momento.",
      },
      {
        question: "¿Puede pagar mi empresa el programa?",
        answer:
          "A menudo, sí. Muchos profesionales usan un presupuesto de formación o desarrollo, y podemos preparar una propuesta dirigida a su empresa.",
      },
      {
        question: "¿Cuándo tendrá precio el Coach de Comunicación con IA?",
        answer: "El precio se anunciará cuando se abra el acceso anticipado. Los clientes de coaching serán invitados primero.",
      },
    ],
  },
};

export const pricingCopy: Localized<typeof en> = { en, es };

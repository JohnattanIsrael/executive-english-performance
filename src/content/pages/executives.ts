import type { Localized } from "@/i18n/config";

const en = {
  meta: {
    title: "Executive English Coaching for Leaders",
    description:
      "Private executive English coaching for CEOs, founders, directors and senior professionals who need to communicate with precision and confidence in high-stakes meetings, presentations and negotiations.",
    keywords: ["executive English coaching", "business English for executives", "English coaching for professionals"],
    serviceName: "Executive English coaching",
  },
  hero: {
    eyebrow: "For executives & senior professionals",
    title: "Communicate with the precision your role demands.",
    lead: "Private executive English coaching for leaders who already work in English — and need it to perform when the room is senior, the questions are hard and the outcome matters.",
    secondary: "View programs",
  },
  who: {
    eyebrow: "Who this is for",
    title: "Not grammar lessons. Communication performance.",
    lead: "Our clients are rarely looking for another English course. They want confidence, precision, credibility, fluency — and the ability to perform when it counts.",
    outcomesTitle: "The work focuses on helping you",
  },
  situations: {
    eyebrow: "Built around your situations",
    title: "Your calendar is the curriculum.",
    lead: "We start from the meetings, presentations and conversations on your calendar — and prepare you for them specifically.",
    listTitle: "Situations we work on",
    momentsTitle: "Preparation for defined moments",
    momentsNote:
      "Have a specific event coming up? Mention it when you book — preparation for that moment becomes part of your plan.",
  },
  beginners: {
    text: "Is your English still basic? The 8-week Executive Fast Track builds the essentials for your role first.",
    link: "See the Fast Track",
  },
  programs: { eyebrow: "Programs", title: "Two ways to work together." },
};

const es: typeof en = {
  meta: {
    title: "Coaching de inglés ejecutivo para líderes",
    description:
      "Coaching privado de inglés ejecutivo para CEOs, fundadores, directores y profesionales sénior que necesitan comunicarse con precisión y seguridad en reuniones, presentaciones y negociaciones decisivas.",
    keywords: ["coaching de inglés ejecutivo", "inglés de negocios para ejecutivos", "inglés para profesionales"],
    serviceName: "Coaching de inglés ejecutivo",
  },
  hero: {
    eyebrow: "Para ejecutivos y profesionales sénior",
    title: "Comuníquese con la precisión que exige su rol.",
    lead: "Coaching privado de inglés ejecutivo para líderes que ya trabajan en inglés y necesitan que ese inglés rinda cuando la sala es sénior, las preguntas son difíciles y el resultado importa.",
    secondary: "Ver programas",
  },
  who: {
    eyebrow: "Para quién es",
    title: "No son clases de gramática. Es desempeño comunicativo.",
    lead: "Nuestros clientes rara vez buscan otro curso de inglés. Buscan seguridad, precisión, credibilidad y fluidez, y la capacidad de desempeñarse cuando cuenta.",
    outcomesTitle: "El trabajo se centra en ayudarle a",
  },
  situations: {
    eyebrow: "Construido en torno a sus situaciones",
    title: "Su agenda es el temario.",
    lead: "Partimos de las reuniones, presentaciones y conversaciones de su agenda, y le preparamos específicamente para ellas.",
    listTitle: "Situaciones que trabajamos",
    momentsTitle: "Preparación para momentos concretos",
    momentsNote:
      "¿Tiene un evento importante próximamente? Menciónelo al reservar: la preparación para ese momento pasará a formar parte de su plan.",
  },
  beginners: {
    text: "¿Su inglés todavía es básico? El Fast Track Ejecutivo de 8 semanas construye primero lo esencial para su rol.",
    link: "Ver el Fast Track",
  },
  programs: { eyebrow: "Programas", title: "Dos formas de trabajar juntos." },
};

export const executivesCopy: Localized<typeof en> = { en, es };

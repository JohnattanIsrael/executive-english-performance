/** Copy for the shared marketing sections in src/components/marketing/sections.tsx. */
import type { Localized } from "@/i18n/config";

const en = {
  problem: {
    eyebrow: "The real problem",
    title: "English ability isn’t the same as executive communication.",
    lead: "Many professionals have strong English and still find that it doesn’t carry them when the stakes rise. Vocabulary is there. Grammar is fine. But when the pressure is real, the message comes out longer, softer or less precise than intended.",
    quote: ["The goal isn’t to make you study more English.", "The goal is to make you perform better in English."],
    listTitle: "Where strong English is tested",
  },
  comparison: {
    eyebrow: "A different category",
    title: "We don’t sell hours. We develop communication performance.",
    lead: "The difference is where the work starts — and how success is measured.",
  },
  process: {
    eyebrow: "How it works",
    title: "Four steps from assessment to performance.",
    cta: "See the full method",
  },
  humanAi: {
    eyebrow: "Human expertise + AI practice",
    title: ["AI gives you more opportunities to practice.", "The expert helps you become better."],
    closing: "AI makes high-quality practice available anytime. Expert coaching makes that practice meaningful.",
  },
  aiPractice: {
    badge: "Coming soon · Executive Communication Coach",
    title: "Practice the situations that actually matter.",
    lead: "Our AI-powered communication platform is currently being developed. It will simulate realistic professional conversations and give immediate feedback — then share what it learns with your coach, so every session starts from evidence.",
    join: "Join the Early Access List",
    about: "About the AI coach",
    practice: "You’ll practice",
    feedback: "Feedback on",
    note: "AI is a practice and feedback layer — not a replacement for your coach.",
  },
  beginners: {
    eyebrow: "For beginners",
    title: "New to English? You’re in the right place.",
    lead: "You don’t need a high-stakes meeting to start. Whether English is for work, travel, studies or everyday life, begin with free interactive lessons — and add a coach when you want to go faster.",
    free: {
      label: "Free · Self-paced",
      title: "Interactive lessons for beginners",
      body: "Five short, playable lessons with pictures, audio and instant feedback. No sign-up.",
      cta: "Start a free lesson",
    },
    coached: {
      label: "Coached · 8 weeks",
      title: "Executive Fast Track",
    },
    points: [
      "Introduce yourself, your company and your role with confidence",
      "Follow meetings and calls — and ask for clarity when you need it",
      "Write short, clear emails and updates",
      "Rehearse the real situations on your calendar",
    ],
    meta: ["8 weeks", "3 private sessions a week", "About 4 hours a week"],
    cta: "Explore the Fast Track",
    apply: "Apply now",
  },
  ctaBand: {
    title: "Prepare for the conversations that matter.",
    lead: "Start with an executive assessment: a focused conversation about your role, your situations and where communication matters most.",
  },
};

const es: typeof en = {
  problem: {
    eyebrow: "El verdadero problema",
    title: "Dominar el inglés no es lo mismo que comunicar como ejecutivo.",
    lead: "Muchos profesionales tienen un buen inglés y, aun así, descubren que no les alcanza cuando sube lo que está en juego. El vocabulario está. La gramática es correcta. Pero cuando la presión es real, el mensaje sale más largo, más débil o menos preciso de lo que querían.",
    quote: ["El objetivo no es que estudie más inglés.", "El objetivo es que se desempeñe mejor en inglés."],
    listTitle: "Donde se pone a prueba un buen inglés",
  },
  comparison: {
    eyebrow: "Una categoría distinta",
    title: "No vendemos horas. Desarrollamos desempeño comunicativo.",
    lead: "La diferencia está en dónde empieza el trabajo y en cómo se mide el éxito.",
  },
  process: {
    eyebrow: "Cómo funciona",
    title: "Cuatro pasos de la evaluación al desempeño.",
    cta: "Ver el método completo",
  },
  humanAi: {
    eyebrow: "Experiencia humana + práctica con IA",
    title: ["La IA le da más oportunidades de practicar.", "El experto le ayuda a mejorar."],
    closing: "La IA pone práctica de calidad a su alcance en cualquier momento. El coaching experto le da sentido a esa práctica.",
  },
  aiPractice: {
    badge: "Próximamente · Coach de Comunicación Ejecutiva",
    title: "Practique las situaciones que realmente importan.",
    lead: "Nuestra plataforma de comunicación con IA está en desarrollo. Simulará conversaciones profesionales realistas y dará retroalimentación inmediata; después compartirá lo aprendido con su coach, para que cada sesión parta de evidencia.",
    join: "Unirme a la lista de acceso anticipado",
    about: "Sobre el coach de IA",
    practice: "Practicará",
    feedback: "Retroalimentación sobre",
    note: "La IA es una capa de práctica y retroalimentación, no un reemplazo de su coach.",
  },
  beginners: {
    eyebrow: "Para principiantes",
    title: "¿Empieza con el inglés? Está en el lugar correcto.",
    lead: "No necesita una reunión decisiva para empezar. Sea para el trabajo, los viajes, los estudios o la vida diaria, comience con lecciones interactivas gratis y sume un coach cuando quiera avanzar más rápido.",
    free: {
      label: "Gratis · A su ritmo",
      title: "Lecciones interactivas para principiantes",
      body: "Cinco lecciones cortas y jugables, con imágenes, audio y corrección al instante. Sin registro.",
      cta: "Empezar una lección gratis",
    },
    coached: {
      label: "Con coach · 8 semanas",
      title: "Fast Track Ejecutivo",
    },
    points: [
      "Presentarse, presentar su empresa y su rol con seguridad",
      "Seguir reuniones y llamadas, y pedir aclaraciones cuando lo necesite",
      "Redactar correos y actualizaciones breves y claras",
      "Ensayar las situaciones reales de su agenda",
    ],
    meta: ["8 semanas", "3 sesiones privadas por semana", "Unas 4 horas por semana"],
    cta: "Conocer el Fast Track",
    apply: "Postularme ahora",
  },
  ctaBand: {
    title: "Prepárese para las conversaciones que importan.",
    lead: "Empiece con una evaluación ejecutiva: una conversación enfocada en su rol, sus situaciones y dónde más importa la comunicación.",
  },
};

export const sectionCopy: Localized<typeof en> = { en, es };

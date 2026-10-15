import type { Localized } from "@/i18n/config";

const en = {
  meta: {
    title: "About",
    description:
      "Executive English Performance was founded by an experienced English teacher and coach who has spent years working with professionals and executives. Learn about the founder and the methodology.",
  },
  hero: {
    eyebrow: "About",
    title: "Experience matters when communication has consequences.",
    lead: "Executive English Performance exists because strong English and executive communication are different skills — and the gap between them shows up exactly when the stakes are highest.",
  },
  founder: {
    portrait: "Founder portrait — add professional photography (src/content/founder.ts).",
    eyebrow: "The founder",
    placeholderNote:
      "Bracketed text is placeholder content. Replace it with the founder’s real, verifiable background before launch — no credentials should be published until confirmed.",
    placeholderBadge: "Placeholder",
  },
  method: {
    eyebrow: "The methodology",
    title: "Learned from how professionals actually communicate.",
    lead: "The approach comes from years of observing professionals in real business settings — not just from teaching grammar.",
  },
  ai: {
    eyebrow: "Why AI, and why now",
    title: "More practice. Better coaching. Same human judgment.",
    paragraphs: [
      "The limiting factor in developing executive communication has always been practice: there are only so many coaching hours in a week, and real high-stakes moments are rare.",
      "We are building an AI practice platform to close that gap — so clients can rehearse realistic conversations between sessions, and coaches can see patterns across that practice. The expert remains responsible for strategy, interpretation and the feedback that matters most.",
    ],
    note: "The AI platform is in development. Coaching programs are available today.",
  },
};

const es: typeof en = {
  meta: {
    title: "Nosotros",
    description:
      "Executive English Performance fue fundada por un profesor y coach de inglés con experiencia, que ha trabajado durante años con profesionales y ejecutivos. Conozca al fundador y la metodología.",
  },
  hero: {
    eyebrow: "Nosotros",
    title: "La experiencia importa cuando la comunicación tiene consecuencias.",
    lead: "Executive English Performance existe porque un buen inglés y la comunicación ejecutiva son habilidades distintas, y la brecha entre ambas aparece justo cuando más está en juego.",
  },
  founder: {
    portrait: "Retrato del fundador: agregue fotografía profesional (src/content/founder.ts).",
    eyebrow: "El fundador",
    placeholderNote:
      "El texto entre corchetes es contenido provisional. Reemplácelo por la trayectoria real y verificable del fundador antes del lanzamiento; no se debe publicar ninguna credencial sin confirmarla.",
    placeholderBadge: "Provisional",
  },
  method: {
    eyebrow: "La metodología",
    title: "Aprendida de cómo se comunican realmente los profesionales.",
    lead: "El enfoque surge de años de observar a profesionales en entornos de negocio reales, no solo de enseñar gramática.",
  },
  ai: {
    eyebrow: "Por qué IA, y por qué ahora",
    title: "Más práctica. Mejor coaching. El mismo criterio humano.",
    paragraphs: [
      "El factor limitante para desarrollar la comunicación ejecutiva siempre ha sido la práctica: las horas de coaching en una semana son limitadas, y los momentos decisivos reales son poco frecuentes.",
      "Estamos construyendo una plataforma de práctica con IA para cerrar esa brecha: para que los clientes ensayen conversaciones realistas entre sesiones y los coaches vean patrones en esa práctica. El experto sigue siendo responsable de la estrategia, la interpretación y la retroalimentación que más importa.",
    ],
    note: "La plataforma de IA está en desarrollo. Los programas de coaching ya están disponibles.",
  },
};

export const aboutCopy: Localized<typeof en> = { en, es };

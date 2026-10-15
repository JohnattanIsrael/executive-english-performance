/**
 * About-page content.
 *
 * IMPORTANT: Every field marked `placeholder: true` must be replaced with the
 * founder's real, verifiable information before launch. Nothing here is a
 * claim about the business until it is replaced.
 */
import type { Localized } from "@/i18n/config";

export interface Credential {
  label: string;
  value: string;
  placeholder: boolean;
}

const founderEn = {
  name: "[Founder Name]",
  title: "Founder & Lead Executive Communication Coach",
  portrait: null as string | null, // e.g. "/images/founder.jpg" — professional portrait recommended
  bio: [
    "[Short professional biography: where you started teaching, the kinds of professionals you have worked with, and what you have learned about how people actually communicate under pressure.]",
    "[Describe the moment you realized that strong English and executive communication are different skills — and why that shaped this company.]",
  ],
  credentials: [
    { label: "Years of teaching experience", value: "[XX years]", placeholder: true },
    { label: "Industries served", value: "[e.g. Technology, Finance, Manufacturing, Legal]", placeholder: true },
    { label: "Countries worked with", value: "[List of countries]", placeholder: true },
    { label: "Executive clients", value: "[Description — no names without permission]", placeholder: true },
    { label: "Corporate experience", value: "[Organizations or sectors, where permitted]", placeholder: true },
    { label: "Certifications", value: "[e.g. CELTA, DELTA, coaching certifications]", placeholder: true },
    { label: "Professional background", value: "[Relevant prior roles]", placeholder: true },
  ] satisfies Credential[],
};

const methodologyEn = [
  {
    title: "Start from the situation, not the syllabus",
    body: "We begin with the meetings, presentations and conversations that matter in your role, and work backwards to the language and behaviors they require.",
  },
  {
    title: "Observe how people actually communicate",
    body: "The methodology comes from years of watching professionals perform in real business settings — where hesitation, structure and tone matter as much as vocabulary.",
  },
  {
    title: "Practice deliberately, and often",
    body: "Improvement comes from repetition with feedback. Coaching sessions set direction; structured practice between sessions builds the habit.",
  },
  {
    title: "Measure what changes",
    body: "Progress is tracked against your real situations through coach observation and periodic assessment — not by hours attended.",
  },
];

const founderEs: typeof founderEn = {
  ...founderEn,
  title: "Fundador/a y coach principal de comunicación ejecutiva",
  bio: [
    "[Breve biografía profesional: dónde empezó a enseñar, con qué tipo de profesionales ha trabajado y qué ha aprendido sobre cómo se comunican realmente las personas bajo presión.]",
    "[Describa el momento en que se dio cuenta de que un buen inglés y la comunicación ejecutiva son habilidades distintas, y por qué eso dio forma a esta empresa.]",
  ],
  credentials: [
    { label: "Años de experiencia docente", value: "[XX años]", placeholder: true },
    { label: "Industrias atendidas", value: "[p. ej., Tecnología, Finanzas, Manufactura, Legal]", placeholder: true },
    { label: "Países con los que ha trabajado", value: "[Lista de países]", placeholder: true },
    { label: "Clientes ejecutivos", value: "[Descripción — sin nombres sin permiso]", placeholder: true },
    { label: "Experiencia corporativa", value: "[Organizaciones o sectores, cuando esté permitido]", placeholder: true },
    { label: "Certificaciones", value: "[p. ej., CELTA, DELTA, certificaciones de coaching]", placeholder: true },
    { label: "Trayectoria profesional", value: "[Puestos anteriores relevantes]", placeholder: true },
  ],
};

const methodologyEs: typeof methodologyEn = [
  {
    title: "Partir de la situación, no del temario",
    body: "Empezamos por las reuniones, presentaciones y conversaciones que importan en su rol, y trabajamos hacia atrás hasta el lenguaje y los comportamientos que requieren.",
  },
  {
    title: "Observar cómo se comunican realmente las personas",
    body: "La metodología surge de años de observar a profesionales en entornos de negocio reales, donde la vacilación, la estructura y el tono importan tanto como el vocabulario.",
  },
  {
    title: "Practicar de forma deliberada y frecuente",
    body: "La mejora llega con la repetición acompañada de retroalimentación. Las sesiones de coaching marcan la dirección; la práctica estructurada entre sesiones crea el hábito.",
  },
  {
    title: "Medir lo que cambia",
    body: "El progreso se sigue frente a sus situaciones reales mediante la observación del coach y evaluaciones periódicas, no por horas de asistencia.",
  },
];

export const founderContent: Localized<typeof founderEn> = { en: founderEn, es: founderEs };
export const methodologyContent: Localized<typeof methodologyEn> = { en: methodologyEn, es: methodologyEs };

/** English values (kept for existing imports). */
export const founder = founderEn;
export const methodologyPrinciples = methodologyEn;

/**
 * Program copy in other languages, keyed by slug. Prices, slugs and status
 * always come from the catalogue (src/config/programs.ts, served through
 * PricingService); only text is overlaid here (spec 001, D3).
 */
import type { Locale } from "@/i18n/config";
import type { Program } from "@/lib/types";

type ProgramText = Pick<Program, "name" | "tagline" | "description" | "duration" | "idealFor" | "includes" | "priceNote"> & {
  ctaLabel: string;
  priceLabel?: string;
};

const es: Record<string, ProgramText> = {
  "executive-performance": {
    name: "Programa de Desempeño Ejecutivo",
    tagline: "Un intensivo de 12 semanas en comunicación ejecutiva.",
    description:
      "Un programa privado y estructurado en torno a las reuniones, presentaciones y negociaciones que usted realmente enfrenta. El coaching experto marca la dirección; la práctica asistida por IA multiplica sus repeticiones entre sesiones.",
    duration: "12 semanas",
    idealFor: [
      "Directores, VPs y gerentes sénior que trabajan con líderes internacionales",
      "Profesionales que se preparan para un periodo decisivo concreto",
      "Ingenieros, consultores y abogados que deben explicar con claridad un trabajo complejo",
    ],
    includes: [
      "Evaluación ejecutiva inicial",
      "Estrategia de comunicación personalizada",
      "Sesiones privadas de coaching",
      "Práctica asistida por IA entre sesiones",
      "Escenarios ejecutivos adaptados a su rol",
      "Preparación de presentaciones",
      "Simulaciones de reuniones",
      "Simulaciones de negociación",
      "Retroalimentación sobre su redacción profesional",
      "Ejercicios personalizados",
      "Retroalimentación del coach sobre práctica grabada",
      "Evaluaciones de progreso en momentos clave",
    ],
    priceNote: "Depende de la frecuencia del coaching y del alcance de la preparación.",
    ctaLabel: "Postúlese al Programa Ejecutivo",
  },
  "executive-fast-track": {
    name: "Fast Track Ejecutivo",
    tagline: "Inglés esencial para líderes, en un intensivo de 8 semanas.",
    description:
      "Para ejecutivos y profesionales sénior cuyo inglés todavía es básico y que necesitan empezar a trabajar en inglés ya. Nos saltamos el temario general y construimos solo el inglés que exige su propio rol —presentaciones personales, reuniones, llamadas, correos y actualizaciones breves— a un ritmo rápido y acompañado.",
    duration: "8 semanas",
    idealFor: [
      "Líderes que empiezan a reportar a una casa matriz en EE. UU. o Europa",
      "Profesionales que asumen un rol internacional o una cartera de clientes extranjeros",
      "Ejecutivos con nivel principiante o elemental (aprox. A1–A2 del MCER)",
    ],
    includes: [
      "Evaluación inicial de nivel y necesidades",
      "Tres sesiones privadas de 45 minutos por semana",
      "Práctica guiada diaria de 20 minutos",
      "Su propio banco de vocabulario y frases de trabajo",
      "Plantillas de reuniones, llamadas y correos para su rol",
      "Ensayos de sus próximas situaciones reales",
      "Revisiones semanales de progreso con su coach",
      "Evaluación final y plan de siguientes pasos",
    ],
    priceNote: "Depende de la frecuencia de las sesiones y de las situaciones que preparemos.",
    ctaLabel: "Postúlese al Fast Track",
  },
  "executive-advisory": {
    name: "Asesoría en Comunicación Ejecutiva",
    tagline: "Una relación de asesoría continua para la alta dirección.",
    description:
      "Para CEOs, fundadores y altos ejecutivos que necesitan un asesor de comunicación de confianza a su disposición: para preparar reuniones de consejo, conversaciones con inversionistas, negociaciones y los mensajes que tienen peso.",
    duration: "Relación anual",
    idealFor: [
      "CEOs y fundadores que operan en varios mercados",
      "Altos ejecutivos que reportan a consejos o casas matrices internacionales",
      "Líderes con comunicación decisiva recurrente",
    ],
    includes: [
      "Coaching y agenda prioritarios",
      "Estrategia de comunicación ejecutiva",
      "Preparación de presentaciones y ponencias",
      "Preparación de reuniones decisivas",
      "Preparación de negociaciones",
      "Revisión de correos y mensajes ejecutivos",
      "Retroalimentación de comunicación a demanda",
      "Práctica asistida por IA",
      "Evaluaciones trimestrales de comunicación",
    ],
    priceNote: "Se ajusta a su calendario de momentos decisivos.",
    ctaLabel: "Reserve una Evaluación Ejecutiva",
  },
  "ai-communication-coach": {
    name: "Coach de Comunicación con IA",
    tagline: "Practique conversaciones profesionales realistas, en cualquier momento.",
    description:
      "Una plataforma de práctica en desarrollo. Invitaremos a los miembros con acceso anticipado a medida que las funciones estén disponibles, empezando por los clientes de los programas de coaching.",
    duration: "Suscripción",
    idealFor: ["Profesionales que quieren práctica estructurada entre conversaciones reales"],
    includes: [
      "Juegos de rol basados en escenarios",
      "Retroalimentación sobre claridad, estructura y lenguaje",
      "Historial de práctica y vista de progreso",
      "Conexión con su coach humano",
    ],
    priceNote: "Suscripción con acceso anticipado. Precio anunciado en el lanzamiento.",
    ctaLabel: "Únase al acceso anticipado de IA",
    priceLabel: "Próximamente",
  },
  "corporate-pilot": {
    name: "Piloto Corporativo",
    tagline: "Compruebe el enfoque primero con un equipo.",
    description:
      "Un piloto de 8 a 12 semanas para un grupo definido de gerentes o ejecutivos, con evaluaciones, coaching, simulaciones y un informe final para la dirección.",
    duration: "8–12 semanas",
    idealFor: ["Equipos de RR. HH. y formación que validan un nuevo enfoque", "Un solo departamento o grupo directivo"],
    includes: [
      "Incorporación de la empresa y análisis de necesidades",
      "Evaluaciones de los participantes",
      "Perfiles individuales de comunicación",
      "Coaching humano",
      "Escenarios específicos del negocio",
      "Práctica asistida por IA a medida que esté disponible",
      "Informe del piloto para la dirección",
    ],
    priceNote: "Normalmente USD 5,000–10,000 según el tamaño del grupo.",
    ctaLabel: "Solicite una propuesta corporativa",
  },
  "corporate-program": {
    name: "Programa Corporativo de Comunicación Ejecutiva",
    tagline: "Un programa anual estructurado para grupos de aproximadamente 10 a 50 personas.",
    description:
      "Un programa para toda la empresa, diseñado en torno a sus necesidades reales de comunicación: clientes internacionales, reportes a la casa matriz, ventas, negociaciones y reuniones de dirección.",
    duration: "Anual",
    idealFor: [
      "Empresas cuyos líderes trabajan con interlocutores de EE. UU., Canadá o Europa",
      "Organizaciones con clientes, equipos o casa matriz internacionales",
    ],
    includes: [
      "Incorporación de la empresa",
      "Evaluaciones de los empleados",
      "Perfiles individuales de comunicación",
      "Coaching humano",
      "Práctica asistida por IA",
      "Simulaciones ejecutivas",
      "Escenarios específicos del negocio",
      "Comunicación de liderazgo",
      "Entrenamiento en reuniones y presentaciones",
      "Paneles de progreso",
      "Informes trimestrales",
    ],
    priceNote: "Personalizado según el tamaño y el alcance de la empresa.",
    ctaLabel: "Solicite una propuesta corporativa",
    priceLabel: "Precio anual a medida",
  },
};

const translations: Record<Exclude<Locale, "en">, Record<string, ProgramText>> = { es };

/** A program with its text in the requested language (falls back to the catalogue's English). */
export function localizeProgram(program: Program, locale: Locale): Program {
  if (locale === "en") return program;
  const t = translations[locale][program.slug];
  if (!t) return program;
  const { ctaLabel, priceLabel, ...text } = t;
  return {
    ...program,
    ...text,
    price: priceLabel && program.price.label ? { ...program.price, label: priceLabel } : program.price,
    cta: { ...program.cta, label: ctaLabel },
  };
}

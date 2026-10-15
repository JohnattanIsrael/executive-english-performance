/**
 * Option lists shared by lead forms and the lead notification payload.
 * Values are stable across languages so CRM mappings never depend on the
 * visitor's language (spec 001, FR-11); only labels are translated.
 */
import type { Localized } from "@/i18n/config";

export interface Option {
  value: string;
  label: string;
}

const en = {
  englishUsage: [
    { value: "daily", label: "Daily — English is my main working language" },
    { value: "weekly", label: "Weekly — regular meetings or calls in English" },
    { value: "occasional", label: "Occasionally — important moments in English" },
    { value: "preparing", label: "Preparing — my role will soon require English" },
    { value: "beginner", label: "Beginner — I’m starting to use English at work" },
  ] as Option[],
  contactMethods: [
    { value: "email", label: "Email" },
    { value: "video", label: "Video call" },
    { value: "phone", label: "Phone" },
    { value: "whatsapp", label: "WhatsApp" },
  ] as Option[],
  employeeCounts: [
    { value: "1-50", label: "1–50" },
    { value: "51-200", label: "51–200" },
    { value: "201-1000", label: "201–1,000" },
    { value: "1001-5000", label: "1,001–5,000" },
    { value: "5000+", label: "5,000+" },
  ] as Option[],
  leaderCounts: [
    { value: "1-10", label: "1–10" },
    { value: "11-25", label: "11–25" },
    { value: "26-50", label: "26–50" },
    { value: "50+", label: "More than 50" },
  ] as Option[],
  currentTraining: [
    { value: "none", label: "None at the moment" },
    { value: "in-house", label: "In-house English classes" },
    { value: "external", label: "External language provider" },
    { value: "app", label: "Language app or platform" },
    { value: "mixed", label: "Mixed / varies by team" },
  ] as Option[],
  startDate: [
    { value: "asap", label: "As soon as possible" },
    { value: "1-month", label: "Within 1 month" },
    { value: "1-3-months", label: "In 1–3 months" },
    { value: "3-6-months", label: "In 3–6 months" },
    { value: "exploring", label: "Exploring options" },
  ] as Option[],
  interest: [
    { value: "personal", label: "My own practice" },
    { value: "team", label: "My team or company" },
    { value: "both", label: "Both" },
  ] as Option[],
  topics: [
    { value: "executive-programs", label: "Executive programs" },
    { value: "beginners-fast-track", label: "Executive Fast Track (beginners)" },
    { value: "corporate-programs", label: "Corporate programs" },
    { value: "ai-early-access", label: "AI early access" },
    { value: "media-partnerships", label: "Media or partnerships" },
    { value: "other", label: "Something else" },
  ] as Option[],
};

const es: typeof en = {
  englishUsage: [
    { value: "daily", label: "A diario — el inglés es mi idioma principal de trabajo" },
    { value: "weekly", label: "Cada semana — reuniones o llamadas frecuentes en inglés" },
    { value: "occasional", label: "Ocasionalmente — momentos importantes en inglés" },
    { value: "preparing", label: "Preparándome — mi rol pronto requerirá inglés" },
    { value: "beginner", label: "Principiante — empiezo a usar el inglés en el trabajo" },
  ],
  contactMethods: [
    { value: "email", label: "Correo electrónico" },
    { value: "video", label: "Videollamada" },
    { value: "phone", label: "Teléfono" },
    { value: "whatsapp", label: "WhatsApp" },
  ],
  employeeCounts: [
    { value: "1-50", label: "1–50" },
    { value: "51-200", label: "51–200" },
    { value: "201-1000", label: "201–1.000" },
    { value: "1001-5000", label: "1.001–5.000" },
    { value: "5000+", label: "Más de 5.000" },
  ],
  leaderCounts: [
    { value: "1-10", label: "1–10" },
    { value: "11-25", label: "11–25" },
    { value: "26-50", label: "26–50" },
    { value: "50+", label: "Más de 50" },
  ],
  currentTraining: [
    { value: "none", label: "Ninguna por ahora" },
    { value: "in-house", label: "Clases de inglés internas" },
    { value: "external", label: "Proveedor externo de idiomas" },
    { value: "app", label: "Aplicación o plataforma de idiomas" },
    { value: "mixed", label: "Mixta / varía según el equipo" },
  ],
  startDate: [
    { value: "asap", label: "Lo antes posible" },
    { value: "1-month", label: "En el próximo mes" },
    { value: "1-3-months", label: "En 1 a 3 meses" },
    { value: "3-6-months", label: "En 3 a 6 meses" },
    { value: "exploring", label: "Explorando opciones" },
  ],
  interest: [
    { value: "personal", label: "Mi propia práctica" },
    { value: "team", label: "Mi equipo o empresa" },
    { value: "both", label: "Ambos" },
  ],
  topics: [
    { value: "executive-programs", label: "Programas para ejecutivos" },
    { value: "beginners-fast-track", label: "Fast Track Ejecutivo (principiantes)" },
    { value: "corporate-programs", label: "Programas corporativos" },
    { value: "ai-early-access", label: "Acceso anticipado a la IA" },
    { value: "media-partnerships", label: "Prensa o alianzas" },
    { value: "other", label: "Otro tema" },
  ],
};

export type FormOptions = typeof en;

export const formOptions: Localized<FormOptions> = { en, es };

/** English lists (kept for existing imports). */
export const englishUsageOptions = en.englishUsage;
export const contactMethods = en.contactMethods;

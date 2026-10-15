import { z } from "zod";
import type { Locale, Localized } from "@/i18n/config";

const messages = {
  en: {
    required: (label: string) => `${label} is required.`,
    emailRequired: "Email is required.",
    emailInvalid: "Enter a valid email address.",
    consent: "Please confirm so we can contact you.",
    more: "Tell us a little more (at least 10 characters).",
    situation: "Describe the situation briefly.",
    contactMethod: "Choose a contact method.",
    labels: {
      name: "Name",
      company: "Company",
      jobTitle: "Job title",
      country: "Country",
      englishUsage: "Current English usage",
      position: "Position",
      employeeCount: "Number of employees",
      currentTraining: "Current English training",
      leaderCount: "Number of executives/managers",
      startDate: "Desired start date",
      topic: "Topic",
    },
  },
  es: {
    required: (label: string) => `${label}: este campo es obligatorio.`,
    emailRequired: "El correo electrónico es obligatorio.",
    emailInvalid: "Introduzca un correo electrónico válido.",
    consent: "Confirme para que podamos contactarle.",
    more: "Cuéntenos un poco más (al menos 10 caracteres).",
    situation: "Describa brevemente la situación.",
    contactMethod: "Elija un medio de contacto.",
    labels: {
      name: "Nombre",
      company: "Empresa",
      jobTitle: "Cargo",
      country: "País",
      englishUsage: "Uso actual del inglés",
      position: "Cargo",
      employeeCount: "Número de empleados",
      currentTraining: "Formación actual en inglés",
      leaderCount: "Número de ejecutivos o gerentes",
      startDate: "Fecha de inicio deseada",
      topic: "Tema",
    },
  },
} satisfies Localized<unknown>;

/** Lead form schemas with validation messages in the given language (spec 001, FR-7). */
export function leadSchemas(locale: Locale = "en") {
  const m = messages[locale];
  const required = (label: string) => z.string().trim().min(1, m.required(label)).max(500);
  const optional = z.string().trim().max(2000).optional().or(z.literal(""));
  const email = z.string().trim().min(1, m.emailRequired).email(m.emailInvalid);
  const consent = z.literal("on", { message: m.consent });
  const longText = (max: number) => z.string().trim().min(10, m.more).max(max);

  return {
    executiveAssessment: z.object({
      name: required(m.labels.name),
      email,
      company: required(m.labels.company),
      jobTitle: required(m.labels.jobTitle),
      country: required(m.labels.country),
      englishUsage: required(m.labels.englishUsage),
      mainChallenge: longText(2000),
      upcomingSituation: z.string().trim().min(5, m.situation).max(2000),
      contactMethod: z.enum(["email", "video", "phone", "whatsapp"], { message: m.contactMethod }),
      phone: optional,
      program: optional,
      consent,
    }),
    corporateInquiry: z.object({
      company: required(m.labels.company),
      name: required(m.labels.name),
      position: required(m.labels.position),
      employeeCount: required(m.labels.employeeCount),
      currentTraining: required(m.labels.currentTraining),
      businessChallenge: longText(2000),
      leaderCount: required(m.labels.leaderCount),
      startDate: required(m.labels.startDate),
      email,
      program: optional,
      consent,
    }),
    earlyAccess: z.object({
      name: required(m.labels.name),
      email,
      jobTitle: optional,
      interest: optional,
    }),
    contact: z.object({
      name: required(m.labels.name),
      email,
      company: optional,
      topic: required(m.labels.topic),
      message: longText(4000),
      consent,
    }),
  };
}

const english = leadSchemas("en");
export const executiveAssessmentSchema = english.executiveAssessment;
export const corporateInquirySchema = english.corporateInquiry;
export const earlyAccessSchema = english.earlyAccess;
export const contactSchema = english.contact;

export type FieldErrors = Record<string, string>;

/** Validates FormData against a schema and returns either data or per-field messages. */
export function validateForm<T extends z.ZodType>(
  schema: T,
  formData: FormData,
): { success: true; data: z.infer<T> } | { success: false; errors: FieldErrors } {
  const raw: Record<string, FormDataEntryValue> = {};
  formData.forEach((value, key) => {
    raw[key] = value;
  });
  const result = schema.safeParse(raw);
  if (result.success) return { success: true, data: result.data };
  const errors: FieldErrors = {};
  for (const issue of result.error.issues) {
    const key = String(issue.path[0] ?? "form");
    errors[key] ??= issue.message;
  }
  return { success: false, errors };
}

import { z } from "zod";

const required = (label: string) => z.string().trim().min(1, `${label} is required.`).max(500);
const optional = z.string().trim().max(2000).optional().or(z.literal(""));
const email = z.string().trim().min(1, "Email is required.").email("Enter a valid email address.");
const consent = z.literal("on", { message: "Please confirm so we can contact you." });

export const executiveAssessmentSchema = z.object({
  name: required("Name"),
  email,
  company: required("Company"),
  jobTitle: required("Job title"),
  country: required("Country"),
  englishUsage: required("Current English usage"),
  mainChallenge: z.string().trim().min(10, "Tell us a little more (at least 10 characters).").max(2000),
  upcomingSituation: z.string().trim().min(5, "Describe the situation briefly.").max(2000),
  contactMethod: z.enum(["email", "video", "phone", "whatsapp"], { message: "Choose a contact method." }),
  phone: optional,
  program: optional,
  consent,
});

export const corporateInquirySchema = z.object({
  company: required("Company"),
  name: required("Name"),
  position: required("Position"),
  employeeCount: required("Number of employees"),
  currentTraining: required("Current English training"),
  businessChallenge: z.string().trim().min(10, "Tell us a little more (at least 10 characters).").max(2000),
  leaderCount: required("Number of executives/managers"),
  startDate: required("Desired start date"),
  email,
  program: optional,
  consent,
});

export const earlyAccessSchema = z.object({
  name: required("Name"),
  email,
  jobTitle: optional,
  interest: optional,
});

export const contactSchema = z.object({
  name: required("Name"),
  email,
  company: optional,
  topic: required("Topic"),
  message: z.string().trim().min(10, "Tell us a little more (at least 10 characters).").max(4000),
  consent,
});

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

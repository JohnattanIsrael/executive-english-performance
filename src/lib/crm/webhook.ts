import { programs } from "@/config/programs";
import { formOptions, type Option } from "@/content/forms";
import { localeInfo, isLocale } from "@/i18n/config";
import type { Lead } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";
import { pipeline } from "./pipeline";

/** Readable labels for form fields, in the order they appear in notifications. */
const fieldLabels: Record<string, string> = {
  company: "Company",
  jobTitle: "Job title",
  position: "Position",
  country: "Country",
  englishUsage: "Current English usage",
  mainChallenge: "Main communication challenge",
  upcomingSituation: "Most important upcoming situation",
  contactMethod: "Preferred contact method",
  phone: "Phone / WhatsApp",
  program: "Program of interest",
  employeeCount: "Number of employees",
  leaderCount: "Executives/managers to include",
  currentTraining: "Current English training",
  businessChallenge: "Main business challenge",
  startDate: "Desired start date",
  interest: "Interested for",
  topic: "Topic",
  message: "Message",
};

const labelsOf = (options: Option[]) => Object.fromEntries(options.map((o) => [o.value, o.label]));
const options = formOptions.en;

/** Notifications always use English labels, whatever language the form was in. */
const valueLabels: Record<string, Record<string, string>> = {
  englishUsage: labelsOf(options.englishUsage),
  contactMethod: labelsOf(options.contactMethods),
  employeeCount: labelsOf(options.employeeCounts),
  leaderCount: labelsOf(options.leaderCounts),
  currentTraining: labelsOf(options.currentTraining),
  startDate: labelsOf(options.startDate),
  interest: labelsOf(options.interest),
  topic: labelsOf(options.topics),
  program: Object.fromEntries(programs.map((p) => [p.slug, p.name])),
};

const kindLabels: Record<Lead["kind"], string> = {
  executive_assessment: "Executive Assessment request",
  corporate_inquiry: "Corporate Proposal request",
  early_access: "AI early access signup",
  contact: "Website message",
};

function subject(lead: Lead) {
  const p = lead.payload;
  const who = [lead.name, lead.company].filter(Boolean).join(", ");
  if (lead.kind === "contact") {
    const topic = String(p.topic ?? "");
    return `${kindLabels.contact}: ${valueLabels.topic[topic] ?? topic} — ${lead.name}`;
  }
  return `New ${kindLabels[lead.kind]} — ${who}`;
}

/**
 * Flat, human-readable version of a Lead for form backends and automation
 * tools. `name`, `email` and `_subject` follow Formspree conventions (reply-to
 * and email subject); every other key is a readable label, so notification
 * emails read well and Zapier/Make/CRM mappings stay simple.
 */
export function toWebhookPayload(lead: Lead): Record<string, string> {
  const out: Record<string, string> = {
    _subject: subject(lead),
    name: lead.name,
    email: lead.email,
    "Lead type": kindLabels[lead.kind],
    Segment: lead.segment.toUpperCase(),
  };

  for (const [key, label] of Object.entries(fieldLabels)) {
    const raw = lead.payload[key];
    if (raw === undefined || raw === null || raw === "") continue;
    const value = String(raw);
    out[label] = valueLabels[key]?.[value] ?? value;
  }

  if (lead.estimatedDealValue) out["Estimated deal value"] = formatCurrency(lead.estimatedDealValue);
  out["Pipeline stage"] = pipeline.find((s) => s.stage === lead.stage)?.label ?? lead.stage;
  out["Source page"] = lead.source.page;
  if (lead.source.referrer) out.Referrer = lead.source.referrer;
  for (const [k, v] of Object.entries(lead.source.utm ?? {})) if (v) out[`UTM ${k}`] = v;
  if (lead.payload.consent) out["Consent to contact"] = "Yes";
  const locale = String(lead.payload.locale ?? "en");
  out["Site language"] = isLocale(locale) ? localeInfo[locale].name : locale;
  out["Submitted at"] = lead.createdAt;
  out["Lead ID"] = lead.id;
  return out;
}

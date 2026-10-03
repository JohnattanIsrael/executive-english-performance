"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CalendarClock } from "lucide-react";
import { buttonClasses } from "@/components/ui/button";
import { ChoiceGroup, Consent, describedBy, Field, Input, Select, Textarea } from "@/components/ui/field";
import { site } from "@/config/site";
import { contactMethods, englishUsageOptions } from "@/content/forms";
import { track } from "@/lib/analytics";
import { executiveAssessmentSchema } from "@/lib/validation/leads";
import { BookingEmbed } from "./booking-embed";
import { FormSuccess, Honeypot, PrivacyConsentText, SubmitRow } from "./form-parts";
import { useLeadForm } from "./use-lead-form";

export function ExecutiveAssessmentForm() {
  const params = useSearchParams();
  const program = params.get("program") ?? "";
  const { errors, handleSubmit, status, submitting, formError } = useLeadForm(
    "executive_assessment",
    executiveAssessmentSchema,
    (data) => track("consultation_booked", { program: data.program || undefined, contactMethod: data.contactMethod }),
  );

  if (status === "success") {
    if (site.bookingEmbedUrl) {
      return (
        <>
          <FormSuccess title="Thank you. Now choose a time.">
            <p>
              Your request is in. Pick a time below for your executive assessment — it goes straight into our calendar.
              Prefer us to propose a time? Skip this step and we’ll contact you. {site.contact.responseTime}
            </p>
          </FormSuccess>
          <BookingEmbed src={site.bookingEmbedUrl} link={site.bookingUrl || site.bookingEmbedUrl} />
        </>
      );
    }
    return (
      <FormSuccess title="Thank you. Your request is in.">
        <p>
          We’ll review your situation and contact you to arrange your executive assessment. {site.contact.responseTime}
        </p>
        {site.bookingUrl ? (
          <a
            href={site.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonClasses("primary", "md", "mt-6")}
            onClick={() =>
              track("cta_clicked", { label: "Choose a time now", location: "assessment_success", href: site.bookingUrl })
            }
          >
            <CalendarClock className="size-4" aria-hidden /> Choose a time now
          </a>
        ) : (
          <p className="mt-4">
            While you wait, you can take the{" "}
            <Link href="/assessment" className="font-medium underline underline-offset-2">
              5-minute self-assessment
            </Link>{" "}
            to bring to the conversation.
          </p>
        )}
      </FormSuccess>
    );
  }

  const e = errors;
  return (
    <form noValidate onSubmit={handleSubmit} className="flex flex-col gap-6">
      <Honeypot />
      <input type="hidden" name="program" value={program} />
      <div className="grid gap-6 sm:grid-cols-2">
        <Field id="name" label="Name" required error={e.name}>
          <Input id="name" name="name" autoComplete="name" {...describedBy("name", { error: e.name })} />
        </Field>
        <Field id="email" label="Work email" required error={e.email}>
          <Input id="email" name="email" type="email" autoComplete="email" {...describedBy("email", { error: e.email })} />
        </Field>
        <Field id="company" label="Company" required error={e.company}>
          <Input id="company" name="company" autoComplete="organization" {...describedBy("company", { error: e.company })} />
        </Field>
        <Field id="jobTitle" label="Job title" required error={e.jobTitle}>
          <Input id="jobTitle" name="jobTitle" autoComplete="organization-title" {...describedBy("jobTitle", { error: e.jobTitle })} />
        </Field>
        <Field id="country" label="Country" required error={e.country}>
          <Input id="country" name="country" autoComplete="country-name" {...describedBy("country", { error: e.country })} />
        </Field>
        <Field id="englishUsage" label="Current English usage" required error={e.englishUsage}>
          <Select id="englishUsage" name="englishUsage" defaultValue="" {...describedBy("englishUsage", { error: e.englishUsage })}>
            <option value="" disabled>
              Select one
            </option>
            {englishUsageOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </Select>
        </Field>
      </div>
      <Field
        id="mainChallenge"
        label="Main communication challenge"
        hint="What makes communication in English harder than it should be today?"
        required
        error={e.mainChallenge}
      >
        <Textarea id="mainChallenge" name="mainChallenge" {...describedBy("mainChallenge", { hint: true, error: e.mainChallenge })} />
      </Field>
      <Field
        id="upcomingSituation"
        label="Most important upcoming English situation"
        hint="For example: a board presentation in March, a final-round interview, a contract negotiation."
        required
        error={e.upcomingSituation}
      >
        <Textarea
          id="upcomingSituation"
          name="upcomingSituation"
          className="min-h-20"
          {...describedBy("upcomingSituation", { hint: true, error: e.upcomingSituation })}
        />
      </Field>
      <ChoiceGroup name="contactMethod" legend="Preferred contact method" options={contactMethods} required error={e.contactMethod} defaultValue="email" />
      <Field id="phone" label="Phone or WhatsApp number" hint="Only needed if you prefer phone or WhatsApp." error={e.phone}>
        <Input id="phone" name="phone" type="tel" autoComplete="tel" {...describedBy("phone", { hint: true, error: e.phone })} />
      </Field>
      <Consent error={e.consent}>
        <PrivacyConsentText />
      </Consent>
      <SubmitRow submitting={submitting} label="Request my Executive Assessment" formError={formError} />
    </form>
  );
}

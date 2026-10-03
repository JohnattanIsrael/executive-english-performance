"use client";

import { Consent, describedBy, Field, Input, Select, Textarea } from "@/components/ui/field";
import { site } from "@/config/site";
import { track } from "@/lib/analytics";
import { contactSchema, earlyAccessSchema } from "@/lib/validation/leads";
import { FormSuccess, PrivacyConsentText, SubmitRow } from "./form-parts";
import { useLeadForm } from "./use-lead-form";

export function EarlyAccessForm({ location }: { location: string }) {
  const { errors: e, handleSubmit, status, submitting, formError } = useLeadForm("early_access", earlyAccessSchema, () =>
    track("early_access_signup", { location }),
  );

  if (status === "success") {
    return (
      <FormSuccess title="You’re on the early-access list.">
        <p>We’ll invite you as functionality becomes available. No spam — only meaningful product updates.</p>
      </FormSuccess>
    );
  }

  return (
    <form noValidate onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="ea-name" label="Name" required error={e.name}>
          <Input id="ea-name" name="name" autoComplete="name" {...describedBy("ea-name", { error: e.name })} />
        </Field>
        <Field id="ea-email" label="Work email" required error={e.email}>
          <Input id="ea-email" name="email" type="email" autoComplete="email" {...describedBy("ea-email", { error: e.email })} />
        </Field>
        <Field id="ea-title" label="Job title" error={e.jobTitle}>
          <Input id="ea-title" name="jobTitle" autoComplete="organization-title" />
        </Field>
        <Field id="ea-interest" label="Interested for" error={e.interest}>
          <Select id="ea-interest" name="interest" defaultValue="">
            <option value="">Select one</option>
            <option value="personal">My own practice</option>
            <option value="team">My team or company</option>
            <option value="both">Both</option>
          </Select>
        </Field>
      </div>
      <SubmitRow submitting={submitting} label="Join the Early Access List" formError={formError} />
    </form>
  );
}

const topics = ["Executive programs", "Corporate programs", "AI early access", "Media or partnerships", "Something else"];

export function ContactForm() {
  const { errors: e, handleSubmit, status, submitting, formError } = useLeadForm("contact", contactSchema, (data) =>
    track("contact_submitted", { topic: data.topic }),
  );

  if (status === "success") {
    return (
      <FormSuccess title="Message received.">
        <p>Thank you for getting in touch. {site.contact.responseTime}</p>
      </FormSuccess>
    );
  }

  return (
    <form noValidate onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <Field id="c-name" label="Name" required error={e.name}>
          <Input id="c-name" name="name" autoComplete="name" {...describedBy("c-name", { error: e.name })} />
        </Field>
        <Field id="c-email" label="Email" required error={e.email}>
          <Input id="c-email" name="email" type="email" autoComplete="email" {...describedBy("c-email", { error: e.email })} />
        </Field>
        <Field id="c-company" label="Company" error={e.company}>
          <Input id="c-company" name="company" autoComplete="organization" />
        </Field>
        <Field id="c-topic" label="Topic" required error={e.topic}>
          <Select id="c-topic" name="topic" defaultValue="" {...describedBy("c-topic", { error: e.topic })}>
            <option value="" disabled>
              Select one
            </option>
            {topics.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </Select>
        </Field>
      </div>
      <Field id="c-message" label="Message" required error={e.message}>
        <Textarea id="c-message" name="message" className="min-h-36" {...describedBy("c-message", { error: e.message })} />
      </Field>
      <Consent error={e.consent}>
        <PrivacyConsentText />
      </Consent>
      <SubmitRow submitting={submitting} label="Send message" formError={formError} />
    </form>
  );
}

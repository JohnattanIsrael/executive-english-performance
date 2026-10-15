"use client";

import { Consent, describedBy, Field, Input, Select, Textarea } from "@/components/ui/field";
import { formOptions } from "@/content/forms";
import { commonCopy } from "@/content/i18n/common";
import { formCopy } from "@/content/i18n/forms";
import { useLocale } from "@/i18n/locale-provider";
import { track } from "@/lib/analytics";
import { leadSchemas } from "@/lib/validation/leads";
import { FormSuccess, Honeypot, PrivacyConsentText, SubmitRow } from "./form-parts";
import { useLeadForm } from "./use-lead-form";

export function EarlyAccessForm({ location }: { location: string }) {
  const locale = useLocale();
  const t = formCopy[locale].earlyAccess;
  const { errors: e, handleSubmit, status, submitting, formError } = useLeadForm("early_access", leadSchemas(locale).earlyAccess, () =>
    track("early_access_signup", { location }),
  );

  if (status === "success") {
    return (
      <FormSuccess title={t.successTitle}>
        <p>{t.successBody}</p>
      </FormSuccess>
    );
  }

  return (
    <form noValidate onSubmit={handleSubmit} className="flex flex-col gap-5">
      <Honeypot />
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="ea-name" label={t.name} required error={e.name}>
          <Input id="ea-name" name="name" autoComplete="name" {...describedBy("ea-name", { error: e.name })} />
        </Field>
        <Field id="ea-email" label={t.email} required error={e.email}>
          <Input id="ea-email" name="email" type="email" autoComplete="email" {...describedBy("ea-email", { error: e.email })} />
        </Field>
        <Field id="ea-title" label={t.jobTitle} error={e.jobTitle}>
          <Input id="ea-title" name="jobTitle" autoComplete="organization-title" />
        </Field>
        <Field id="ea-interest" label={t.interest} error={e.interest}>
          <Select id="ea-interest" name="interest" defaultValue="">
            <option value="">{commonCopy[locale].forms.selectOne}</option>
            {formOptions[locale].interest.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </Select>
        </Field>
      </div>
      <SubmitRow submitting={submitting} label={t.submit} formError={formError} />
    </form>
  );
}

export function ContactForm() {
  const locale = useLocale();
  const t = formCopy[locale].contact;
  const common = commonCopy[locale];
  const { errors: e, handleSubmit, status, submitting, formError } = useLeadForm("contact", leadSchemas(locale).contact, (data) =>
    track("contact_submitted", { topic: data.topic }),
  );

  if (status === "success") {
    return (
      <FormSuccess title={t.successTitle}>
        <p>
          {t.successBody} {common.site.responseTime}
        </p>
      </FormSuccess>
    );
  }

  return (
    <form noValidate onSubmit={handleSubmit} className="flex flex-col gap-6">
      <Honeypot />
      <div className="grid gap-6 sm:grid-cols-2">
        <Field id="c-name" label={t.name} required error={e.name}>
          <Input id="c-name" name="name" autoComplete="name" {...describedBy("c-name", { error: e.name })} />
        </Field>
        <Field id="c-email" label={t.email} required error={e.email}>
          <Input id="c-email" name="email" type="email" autoComplete="email" {...describedBy("c-email", { error: e.email })} />
        </Field>
        <Field id="c-company" label={t.company} error={e.company}>
          <Input id="c-company" name="company" autoComplete="organization" />
        </Field>
        <Field id="c-topic" label={t.topic} required error={e.topic}>
          <Select id="c-topic" name="topic" defaultValue="" {...describedBy("c-topic", { error: e.topic })}>
            <option value="" disabled>
              {common.forms.selectOne}
            </option>
            {formOptions[locale].topics.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </Select>
        </Field>
      </div>
      <Field id="c-message" label={t.message} required error={e.message}>
        <Textarea id="c-message" name="message" className="min-h-36" {...describedBy("c-message", { error: e.message })} />
      </Field>
      <Consent error={e.consent}>
        <PrivacyConsentText />
      </Consent>
      <SubmitRow submitting={submitting} label={t.submit} formError={formError} />
    </form>
  );
}

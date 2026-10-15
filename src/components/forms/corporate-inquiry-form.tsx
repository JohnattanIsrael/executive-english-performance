"use client";

import { useSearchParams } from "next/navigation";
import { Consent, describedBy, Field, Input, Select, Textarea } from "@/components/ui/field";
import { formOptions, type Option } from "@/content/forms";
import { commonCopy } from "@/content/i18n/common";
import { formCopy } from "@/content/i18n/forms";
import { useLocale } from "@/i18n/locale-provider";
import { track } from "@/lib/analytics";
import { leadSchemas } from "@/lib/validation/leads";
import { FormSuccess, Honeypot, PrivacyConsentText, SubmitRow } from "./form-parts";
import { useLeadForm } from "./use-lead-form";

function Options({ placeholder, options }: { placeholder: string; options: Option[] }) {
  return (
    <>
      <option value="" disabled>
        {placeholder}
      </option>
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </>
  );
}

export function CorporateInquiryForm() {
  const params = useSearchParams();
  const program = params.get("program") ?? "";
  const locale = useLocale();
  const t = formCopy[locale].corporate;
  const common = commonCopy[locale];
  const options = formOptions[locale];
  const { errors: e, handleSubmit, status, submitting, formError } = useLeadForm(
    "corporate_inquiry",
    leadSchemas(locale).corporateInquiry,
    (data) =>
      track("corporate_inquiry_submitted", {
        employeeCount: data.employeeCount,
        leaderCount: data.leaderCount,
        program: data.program || undefined,
      }),
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
      <input type="hidden" name="program" value={program} />
      <div className="grid gap-6 sm:grid-cols-2">
        <Field id="company" label={t.company} required error={e.company}>
          <Input id="company" name="company" autoComplete="organization" {...describedBy("company", { error: e.company })} />
        </Field>
        <Field id="name" label={t.name} required error={e.name}>
          <Input id="name" name="name" autoComplete="name" {...describedBy("name", { error: e.name })} />
        </Field>
        <Field id="position" label={t.position} required error={e.position}>
          <Input id="position" name="position" autoComplete="organization-title" {...describedBy("position", { error: e.position })} />
        </Field>
        <Field id="email" label={t.email} required error={e.email}>
          <Input id="email" name="email" type="email" autoComplete="email" {...describedBy("email", { error: e.email })} />
        </Field>
        <Field id="employeeCount" label={t.employeeCount} required error={e.employeeCount}>
          <Select id="employeeCount" name="employeeCount" defaultValue="" {...describedBy("employeeCount", { error: e.employeeCount })}>
            <Options placeholder={common.forms.selectRange} options={options.employeeCounts} />
          </Select>
        </Field>
        <Field id="leaderCount" label={t.leaderCount} required error={e.leaderCount}>
          <Select id="leaderCount" name="leaderCount" defaultValue="" {...describedBy("leaderCount", { error: e.leaderCount })}>
            <Options placeholder={common.forms.selectRange} options={options.leaderCounts} />
          </Select>
        </Field>
        <Field id="currentTraining" label={t.currentTraining} required error={e.currentTraining}>
          <Select id="currentTraining" name="currentTraining" defaultValue="" {...describedBy("currentTraining", { error: e.currentTraining })}>
            <Options placeholder={common.forms.selectOne} options={options.currentTraining} />
          </Select>
        </Field>
        <Field id="startDate" label={t.startDate} required error={e.startDate}>
          <Select id="startDate" name="startDate" defaultValue="" {...describedBy("startDate", { error: e.startDate })}>
            <Options placeholder={common.forms.selectOne} options={options.startDate} />
          </Select>
        </Field>
      </div>
      <Field id="businessChallenge" label={t.businessChallenge} hint={t.businessChallengeHint} required error={e.businessChallenge}>
        <Textarea id="businessChallenge" name="businessChallenge" {...describedBy("businessChallenge", { hint: true, error: e.businessChallenge })} />
      </Field>
      <Consent error={e.consent}>
        <PrivacyConsentText />
      </Consent>
      <SubmitRow submitting={submitting} label={t.submit} formError={formError} />
    </form>
  );
}

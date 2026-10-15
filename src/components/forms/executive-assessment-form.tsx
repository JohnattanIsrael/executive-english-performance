"use client";

import { useSearchParams } from "next/navigation";
import { CalendarClock } from "lucide-react";
import { buttonClasses } from "@/components/ui/button";
import { ChoiceGroup, Consent, describedBy, Field, Input, Select, Textarea } from "@/components/ui/field";
import { LocaleLink } from "@/components/ui/locale-link";
import { site } from "@/config/site";
import { formOptions } from "@/content/forms";
import { commonCopy } from "@/content/i18n/common";
import { formCopy } from "@/content/i18n/forms";
import { useLocale } from "@/i18n/locale-provider";
import { track } from "@/lib/analytics";
import { leadSchemas } from "@/lib/validation/leads";
import { BookingEmbed } from "./booking-embed";
import { FormSuccess, Honeypot, PrivacyConsentText, SubmitRow } from "./form-parts";
import { useLeadForm } from "./use-lead-form";

export function ExecutiveAssessmentForm() {
  const params = useSearchParams();
  const program = params.get("program") ?? "";
  const locale = useLocale();
  const t = formCopy[locale].assessment;
  const common = commonCopy[locale];
  const options = formOptions[locale];
  const { errors, handleSubmit, status, submitting, formError } = useLeadForm(
    "executive_assessment",
    leadSchemas(locale).executiveAssessment,
    (data) => track("consultation_booked", { program: data.program || undefined, contactMethod: data.contactMethod }),
  );

  if (status === "success") {
    if (site.bookingEmbedUrl) {
      return (
        <>
          <FormSuccess title={t.successEmbedTitle}>
            <p>
              {t.successEmbedBody} {common.site.responseTime}
            </p>
          </FormSuccess>
          <BookingEmbed src={site.bookingEmbedUrl} link={site.bookingUrl || site.bookingEmbedUrl} />
        </>
      );
    }
    return (
      <FormSuccess title={t.successTitle}>
        <p>
          {t.successBody} {common.site.responseTime}
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
            <CalendarClock className="size-4" aria-hidden /> {t.chooseTime}
          </a>
        ) : (
          <p className="mt-4">
            {t.whileYouWait.before}{" "}
            <LocaleLink href="/assessment" className="font-medium underline underline-offset-2">
              {t.whileYouWait.link}
            </LocaleLink>{" "}
            {t.whileYouWait.after}
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
        <Field id="name" label={t.name} required error={e.name}>
          <Input id="name" name="name" autoComplete="name" {...describedBy("name", { error: e.name })} />
        </Field>
        <Field id="email" label={t.email} required error={e.email}>
          <Input id="email" name="email" type="email" autoComplete="email" {...describedBy("email", { error: e.email })} />
        </Field>
        <Field id="company" label={t.company} required error={e.company}>
          <Input id="company" name="company" autoComplete="organization" {...describedBy("company", { error: e.company })} />
        </Field>
        <Field id="jobTitle" label={t.jobTitle} required error={e.jobTitle}>
          <Input id="jobTitle" name="jobTitle" autoComplete="organization-title" {...describedBy("jobTitle", { error: e.jobTitle })} />
        </Field>
        <Field id="country" label={t.country} required error={e.country}>
          <Input id="country" name="country" autoComplete="country-name" {...describedBy("country", { error: e.country })} />
        </Field>
        <Field id="englishUsage" label={t.englishUsage} required error={e.englishUsage}>
          <Select
            id="englishUsage"
            name="englishUsage"
            defaultValue={program === "executive-fast-track" ? "beginner" : ""}
            {...describedBy("englishUsage", { error: e.englishUsage })}
          >
            <option value="" disabled>
              {common.forms.selectOne}
            </option>
            {options.englishUsage.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </Select>
        </Field>
      </div>
      <Field id="mainChallenge" label={t.mainChallenge} hint={t.mainChallengeHint} required error={e.mainChallenge}>
        <Textarea id="mainChallenge" name="mainChallenge" {...describedBy("mainChallenge", { hint: true, error: e.mainChallenge })} />
      </Field>
      <Field
        id="upcomingSituation"
        label={t.upcomingSituation}
        hint={t.upcomingSituationHint}
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
      <ChoiceGroup
        name="contactMethod"
        legend={t.contactMethod}
        options={options.contactMethods}
        required
        error={e.contactMethod}
        defaultValue="email"
      />
      <Field id="phone" label={t.phone} hint={t.phoneHint} error={e.phone}>
        <Input id="phone" name="phone" type="tel" autoComplete="tel" {...describedBy("phone", { hint: true, error: e.phone })} />
      </Field>
      <Consent error={e.consent}>
        <PrivacyConsentText />
      </Consent>
      <SubmitRow submitting={submitting} label={t.submit} formError={formError} />
    </form>
  );
}

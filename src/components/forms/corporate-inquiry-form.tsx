"use client";

import { useSearchParams } from "next/navigation";
import { Consent, describedBy, Field, Input, Select, Textarea } from "@/components/ui/field";
import { site } from "@/config/site";
import { track } from "@/lib/analytics";
import { corporateInquirySchema } from "@/lib/validation/leads";
import { FormSuccess, PrivacyConsentText, SubmitRow } from "./form-parts";
import { useLeadForm } from "./use-lead-form";

const employeeCounts = ["1–50", "51–200", "201–1,000", "1,001–5,000", "5,000+"];
const leaderCounts = [
  { value: "1-10", label: "1–10" },
  { value: "11-25", label: "11–25" },
  { value: "26-50", label: "26–50" },
  { value: "50+", label: "More than 50" },
];
const trainingOptions = [
  "None at the moment",
  "In-house English classes",
  "External language provider",
  "Language app or platform",
  "Mixed / varies by team",
];
const startOptions = ["As soon as possible", "Within 1 month", "In 1–3 months", "In 3–6 months", "Exploring options"];

export function CorporateInquiryForm() {
  const params = useSearchParams();
  const program = params.get("program") ?? "";
  const { errors: e, handleSubmit, status, submitting, formError } = useLeadForm(
    "corporate_inquiry",
    corporateInquirySchema,
    (data) =>
      track("corporate_inquiry_submitted", {
        employeeCount: data.employeeCount,
        leaderCount: data.leaderCount,
        program: data.program || undefined,
      }),
  );

  if (status === "success") {
    return (
      <FormSuccess title="Thank you. We’ll be in touch.">
        <p>
          We’ll review your team’s situation and propose a short discovery conversation to scope a pilot or program.{" "}
          {site.contact.responseTime}
        </p>
      </FormSuccess>
    );
  }

  return (
    <form noValidate onSubmit={handleSubmit} className="flex flex-col gap-6">
      <input type="hidden" name="program" value={program} />
      <div className="grid gap-6 sm:grid-cols-2">
        <Field id="company" label="Company" required error={e.company}>
          <Input id="company" name="company" autoComplete="organization" {...describedBy("company", { error: e.company })} />
        </Field>
        <Field id="name" label="Name" required error={e.name}>
          <Input id="name" name="name" autoComplete="name" {...describedBy("name", { error: e.name })} />
        </Field>
        <Field id="position" label="Position" required error={e.position}>
          <Input id="position" name="position" autoComplete="organization-title" {...describedBy("position", { error: e.position })} />
        </Field>
        <Field id="email" label="Work email" required error={e.email}>
          <Input id="email" name="email" type="email" autoComplete="email" {...describedBy("email", { error: e.email })} />
        </Field>
        <Field id="employeeCount" label="Number of employees" required error={e.employeeCount}>
          <Select id="employeeCount" name="employeeCount" defaultValue="" {...describedBy("employeeCount", { error: e.employeeCount })}>
            <option value="" disabled>
              Select a range
            </option>
            {employeeCounts.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </Select>
        </Field>
        <Field id="leaderCount" label="Number of executives/managers to include" required error={e.leaderCount}>
          <Select id="leaderCount" name="leaderCount" defaultValue="" {...describedBy("leaderCount", { error: e.leaderCount })}>
            <option value="" disabled>
              Select a range
            </option>
            {leaderCounts.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </Select>
        </Field>
        <Field id="currentTraining" label="Current English training" required error={e.currentTraining}>
          <Select id="currentTraining" name="currentTraining" defaultValue="" {...describedBy("currentTraining", { error: e.currentTraining })}>
            <option value="" disabled>
              Select one
            </option>
            {trainingOptions.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </Select>
        </Field>
        <Field id="startDate" label="Desired start date" required error={e.startDate}>
          <Select id="startDate" name="startDate" defaultValue="" {...describedBy("startDate", { error: e.startDate })}>
            <option value="" disabled>
              Select one
            </option>
            {startOptions.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </Select>
        </Field>
      </div>
      <Field
        id="businessChallenge"
        label="Main business challenge"
        hint="Where does English communication affect results today? E.g. reporting to headquarters, client negotiations, sales presentations."
        required
        error={e.businessChallenge}
      >
        <Textarea id="businessChallenge" name="businessChallenge" {...describedBy("businessChallenge", { hint: true, error: e.businessChallenge })} />
      </Field>
      <Consent error={e.consent}>
        <PrivacyConsentText />
      </Consent>
      <SubmitRow submitting={submitting} label="Request a Corporate Proposal" formError={formError} />
    </form>
  );
}

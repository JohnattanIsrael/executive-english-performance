"use client";

import { useState, type FormEvent } from "react";
import type { z } from "zod";
import { buildLead, currentLeadSource } from "@/lib/crm/pipeline";
import { services } from "@/lib/services";
import type { LeadKind } from "@/lib/types";
import { validateForm, type FieldErrors } from "@/lib/validation/leads";

type Status = "idle" | "submitting" | "success" | "error";

/**
 * Validates a form, converts it into a CRM-ready Lead and submits it through
 * LeadService. Field errors are exposed per input name for <Field>.
 */
export function useLeadForm<S extends z.ZodType>(kind: LeadKind, schema: S, onSuccess?: (data: z.infer<S>) => void) {
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [formError, setFormError] = useState<string>();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const result = validateForm(schema, new FormData(form));

    if (!result.success) {
      setErrors(result.errors);
      const first = Object.keys(result.errors)[0];
      const el = first ? form.elements.namedItem(first) : null;
      const target = el instanceof RadioNodeList ? (el[0] as HTMLElement | undefined) : (el as HTMLElement | null);
      target?.focus();
      return;
    }

    setErrors({});
    setFormError(undefined);
    setStatus("submitting");
    const lead = buildLead(kind, result.data as Record<string, unknown>, currentLeadSource());
    const response = await services.leads.submit(lead);
    if (response.ok) {
      setStatus("success");
      onSuccess?.(result.data);
    } else {
      setStatus("error");
      setFormError(response.error);
    }
  }

  return { errors, status, formError, handleSubmit, submitting: status === "submitting" };
}

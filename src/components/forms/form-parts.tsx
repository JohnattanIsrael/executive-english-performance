"use client";

import { CheckCircle2 } from "lucide-react";
import { useEffect, useRef, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { LocaleLink } from "@/components/ui/locale-link";
import { commonCopy } from "@/content/i18n/common";
import { useLocale } from "@/i18n/locale-provider";

export function SubmitRow({ submitting, label, formError }: { submitting: boolean; label: string; formError?: string }) {
  const t = commonCopy[useLocale()].forms;
  return (
    <div className="flex flex-col gap-3 pt-2">
      {formError && (
        <p role="alert" className="rounded-lg border border-critical/30 bg-critical/5 px-3 py-2 text-sm text-critical">
          {formError}
        </p>
      )}
      <Button type="submit" size="lg" disabled={submitting} className="w-full sm:w-auto">
        {submitting ? t.sending : label}
      </Button>
    </div>
  );
}

/** Spam trap: invisible to people and assistive tech, often filled by bots. Checked in useLeadForm. */
export function Honeypot() {
  const t = commonCopy[useLocale()].forms;
  return (
    <div aria-hidden="true" className="absolute -left-[10000px] h-px w-px overflow-hidden">
      <label>
        {t.honeypot}
        <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" />
      </label>
    </div>
  );
}

export function PrivacyConsentText() {
  const t = commonCopy[useLocale()].forms.consent;
  return (
    <>
      {t.before}{" "}
      <LocaleLink href="/privacy" className="underline underline-offset-2 hover:text-ink">
        {t.link}
      </LocaleLink>
      {t.after}
    </>
  );
}

export function FormSuccess({ title, children }: { title: string; children: ReactNode }) {
  const heading = useRef<HTMLHeadingElement>(null);

  // The form is replaced by this message, so bring it into view and move focus to it.
  useEffect(() => {
    heading.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    heading.current?.focus({ preventScroll: true });
  }, []);

  return (
    <div role="status" className="rounded-2xl border border-good/25 bg-good-soft/60 p-7 md:p-9">
      <CheckCircle2 className="size-7 text-good" aria-hidden />
      <h2 ref={heading} tabIndex={-1} className="mt-4 font-serif text-3xl text-ink focus:outline-none">
        {title}
      </h2>
      <div className="mt-3 text-[15.5px] leading-relaxed text-ink-2">{children}</div>
    </div>
  );
}

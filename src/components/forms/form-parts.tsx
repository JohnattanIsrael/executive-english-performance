import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";

export function SubmitRow({ submitting, label, formError }: { submitting: boolean; label: string; formError?: string }) {
  return (
    <div className="flex flex-col gap-3 pt-2">
      {formError && (
        <p role="alert" className="rounded-lg border border-critical/30 bg-critical/5 px-3 py-2 text-sm text-critical">
          {formError}
        </p>
      )}
      <Button type="submit" size="lg" disabled={submitting} className="w-full sm:w-auto">
        {submitting ? "Sending…" : label}
      </Button>
    </div>
  );
}

/** Spam trap: invisible to people and assistive tech, often filled by bots. Checked in useLeadForm. */
export function Honeypot() {
  return (
    <div aria-hidden="true" className="absolute -left-[10000px] h-px w-px overflow-hidden">
      <label>
        Leave this field empty
        <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" />
      </label>
    </div>
  );
}

export function PrivacyConsentText() {
  return (
    <>
      I agree to be contacted about my request. Details are handled as described in the{" "}
      <Link href="/privacy" className="underline underline-offset-2 hover:text-ink">
        privacy notice
      </Link>
      .
    </>
  );
}

export function FormSuccess({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div role="status" className="rounded-2xl border border-good/25 bg-good-soft/60 p-7 md:p-9">
      <CheckCircle2 className="size-7 text-good" aria-hidden />
      <h2 className="mt-4 font-serif text-3xl text-ink">{title}</h2>
      <div className="mt-3 text-[15.5px] leading-relaxed text-ink-2">{children}</div>
    </div>
  );
}

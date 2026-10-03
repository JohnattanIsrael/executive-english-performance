import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

const control =
  "w-full rounded-lg border border-line-strong bg-surface px-3.5 text-[15px] text-ink placeholder:text-faint transition-colors focus:border-harbor-500 focus:outline-none focus:ring-3 focus:ring-harbor-100 aria-[invalid=true]:border-critical";

export function Field({
  id,
  label,
  hint,
  error,
  required,
  children,
  className,
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={id} className="text-sm font-medium text-ink">
        {label}
        {required ? <span className="text-critical"> *</span> : <span className="font-normal text-faint"> (optional)</span>}
      </label>
      {hint && (
        <p id={`${id}-hint`} className="-mt-0.5 text-[13px] text-muted">
          {hint}
        </p>
      )}
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="text-[13px] text-critical">
          {error}
        </p>
      )}
    </div>
  );
}

/** aria wiring shared by inputs inside <Field>. Pass `hint: true` when the Field renders a hint. */
export function describedBy(id: string, { hint, error }: { hint?: boolean; error?: string }) {
  return {
    "aria-invalid": error ? true : undefined,
    "aria-describedby": [hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(" ") || undefined,
  } as const;
}

export function Input({ className, ...props }: ComponentProps<"input">) {
  return <input className={cn(control, "h-11", className)} {...props} />;
}

export function Textarea({ className, ...props }: ComponentProps<"textarea">) {
  return <textarea className={cn(control, "min-h-28 py-3 leading-relaxed", className)} {...props} />;
}

export function Select({ className, children, ...props }: ComponentProps<"select">) {
  return (
    <select
      className={cn(
        control,
        "h-11 appearance-none bg-[url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='none' stroke='%235c6270' stroke-width='1.5'%3E%3Cpath d='m3 4.5 3 3 3-3'/%3E%3C/svg%3E\")] bg-[right_0.9rem_center] bg-no-repeat pr-9",
        className,
      )}
      {...props}
    >
      {children}
    </select>
  );
}

export function ChoiceGroup({
  name,
  legend,
  options,
  error,
  required,
  defaultValue,
  type = "radio",
}: {
  name: string;
  legend: string;
  options: { value: string; label: string }[];
  error?: string;
  required?: boolean;
  defaultValue?: string;
  type?: "radio" | "checkbox";
}) {
  return (
    <fieldset className="flex flex-col gap-2" aria-invalid={error ? true : undefined}>
      <legend className="mb-1.5 text-sm font-medium text-ink">
        {legend}
        {required && <span className="text-critical"> *</span>}
      </legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <label
            key={o.value}
            className="flex cursor-pointer items-center gap-2 rounded-full border border-line-strong bg-surface px-3.5 py-2 text-sm text-ink-2 transition-colors has-checked:border-ink has-checked:bg-ink has-checked:text-paper has-focus-visible:ring-3 has-focus-visible:ring-harbor-200"
          >
            <input type={type} name={name} value={o.value} defaultChecked={o.value === defaultValue} className="sr-only" />
            {o.label}
          </label>
        ))}
      </div>
      {error && (
        <p role="alert" className="text-[13px] text-critical">
          {error}
        </p>
      )}
    </fieldset>
  );
}

export function Consent({ error, children }: { error?: string; children: ReactNode }) {
  return (
    <div>
      <label className="flex items-start gap-3 text-sm leading-relaxed text-muted">
        <input
          type="checkbox"
          name="consent"
          className="mt-1 size-4 shrink-0 rounded border-line-strong accent-ink"
          aria-invalid={error ? true : undefined}
        />
        <span>{children}</span>
      </label>
      {error && (
        <p role="alert" className="mt-1.5 text-[13px] text-critical">
          {error}
        </p>
      )}
    </div>
  );
}

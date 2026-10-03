"use client";

import { useState, type ReactNode } from "react";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Field, Input, Select } from "@/components/ui/field";
import { Badge } from "@/components/ui/primitives";

export interface SettingsSection {
  title: string;
  description?: string;
  fields?: { id: string; label: string; defaultValue: string; type?: "text" | "email" | "select"; options?: string[] }[];
  toggles?: { id: string; label: string; description?: string; defaultChecked?: boolean; comingSoon?: boolean }[];
  note?: ReactNode;
}

/** Generic settings screen. Saving is local-only until a backend is connected. */
export function SettingsForm({ sections }: { sections: SettingsSection[] }) {
  const [saved, setSaved] = useState(false);

  return (
    <form
      className="flex flex-col gap-5"
      onSubmit={(e) => {
        e.preventDefault();
        setSaved(true);
      }}
      onChange={() => setSaved(false)}
    >
      {sections.map((s) => (
        <section key={s.title} className="grid gap-6 rounded-2xl border border-line bg-surface p-5 md:grid-cols-[1fr_2fr] md:p-6">
          <div>
            <h2 className="font-medium text-ink">{s.title}</h2>
            {s.description && <p className="mt-1 text-sm text-muted">{s.description}</p>}
          </div>
          <div className="flex flex-col gap-5">
            {s.fields && (
              <div className="grid gap-5 sm:grid-cols-2">
                {s.fields.map((f) => (
                  <Field key={f.id} id={f.id} label={f.label} required>
                    {f.type === "select" ? (
                      <Select id={f.id} name={f.id} defaultValue={f.defaultValue}>
                        {f.options?.map((o) => (
                          <option key={o}>{o}</option>
                        ))}
                      </Select>
                    ) : (
                      <Input id={f.id} name={f.id} type={f.type ?? "text"} defaultValue={f.defaultValue} />
                    )}
                  </Field>
                ))}
              </div>
            )}
            {s.toggles?.map((t) => (
              <label key={t.id} className="flex items-start justify-between gap-6">
                <span>
                  <span className="flex items-center gap-2 text-sm font-medium text-ink">
                    {t.label}
                    {t.comingSoon && <Badge tone="caution">Coming soon</Badge>}
                  </span>
                  {t.description && <span className="mt-0.5 block text-sm text-muted">{t.description}</span>}
                </span>
                <input
                  type="checkbox"
                  name={t.id}
                  role="switch"
                  defaultChecked={t.defaultChecked}
                  disabled={t.comingSoon}
                  className="peer relative mt-0.5 h-6 w-11 shrink-0 cursor-pointer appearance-none rounded-full bg-line-strong transition-colors before:absolute before:top-0.5 before:left-0.5 before:size-5 before:rounded-full before:bg-white before:shadow before:transition-transform checked:bg-ink checked:before:translate-x-5 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </label>
            ))}
            {s.note && <div className="text-xs text-muted">{s.note}</div>}
          </div>
        </section>
      ))}
      <div className="flex items-center justify-end gap-4">
        {saved && (
          <p role="status" className="flex items-center gap-1.5 text-sm text-good">
            <CheckCircle2 className="size-4" aria-hidden /> Saved for this demo session only
          </p>
        )}
        <Button type="submit">Save changes</Button>
      </div>
    </form>
  );
}

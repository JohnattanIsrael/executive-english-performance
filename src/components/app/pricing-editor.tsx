"use client";

import { useEffect, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Field, Input, Select } from "@/components/ui/field";
import { Badge } from "@/components/ui/primitives";
import { services } from "@/lib/services";
import type { PriceSpec, Program } from "@/lib/types";
import { formatPrice } from "@/lib/utils";

/** Edits program pricing through PricingService (persisted in this browser until a database is connected). */
export function PricingEditor() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [savedId, setSavedId] = useState<string | null>(null);

  useEffect(() => {
    services.pricing.listPrograms().then(setPrograms);
  }, []);

  function update(id: string, patch: Partial<PriceSpec>, note?: string) {
    setSavedId(null);
    setPrograms((ps) =>
      ps.map((p) => (p.id === id ? { ...p, price: { ...p.price, ...patch }, priceNote: note ?? p.priceNote } : p)),
    );
  }

  async function save(program: Program) {
    await services.pricing.updateProgram(program);
    setSavedId(program.id);
  }

  const num = (v: string) => (v === "" ? undefined : Number(v));

  return (
    <div className="flex flex-col gap-5">
      {programs.map((p) => {
        const preview = formatPrice(p.price);
        return (
          <form
            key={p.id}
            onSubmit={(e) => {
              e.preventDefault();
              save(p);
            }}
            className="rounded-2xl border border-line bg-surface p-5 md:p-6"
          >
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="font-medium text-ink">{p.name}</h2>
                <p className="text-xs text-muted">
                  {p.audience.toUpperCase()} · {p.duration}
                </p>
              </div>
              <Badge tone="harbor">
                Preview: {preview.amount}
                {preview.period ? ` / ${preview.period}` : ""}
              </Badge>
            </div>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              <Field id={`${p.id}-display`} label="Display" required>
                <Select
                  id={`${p.id}-display`}
                  value={p.price.display}
                  onChange={(e) => update(p.id, { display: e.target.value as PriceSpec["display"] })}
                >
                  <option value="range">Range</option>
                  <option value="from">From</option>
                  <option value="custom">Custom label</option>
                  <option value="soon">Coming soon</option>
                </Select>
              </Field>
              <Field id={`${p.id}-min`} label="Min (USD)">
                <Input id={`${p.id}-min`} type="number" min={0} step={100} value={p.price.min ?? ""} onChange={(e) => update(p.id, { min: num(e.target.value) })} />
              </Field>
              <Field id={`${p.id}-max`} label="Max (USD)">
                <Input id={`${p.id}-max`} type="number" min={0} step={100} value={p.price.max ?? ""} onChange={(e) => update(p.id, { max: num(e.target.value) })} />
              </Field>
              <Field id={`${p.id}-period`} label="Period">
                <Input id={`${p.id}-period`} value={p.price.period ?? ""} placeholder="e.g. year" onChange={(e) => update(p.id, { period: e.target.value || undefined })} />
              </Field>
              <Field id={`${p.id}-label`} label="Label">
                <Input id={`${p.id}-label`} value={p.price.label ?? ""} placeholder="Custom / soon text" onChange={(e) => update(p.id, { label: e.target.value || undefined })} />
              </Field>
            </div>
            <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-end">
              <Field id={`${p.id}-note`} label="Price note" className="flex-1">
                <Input id={`${p.id}-note`} value={p.priceNote ?? ""} onChange={(e) => update(p.id, {}, e.target.value)} />
              </Field>
              <label className="flex items-center gap-2 pb-3 text-sm text-ink-2">
                <input type="checkbox" checked={Boolean(p.price.openEnded)} onChange={(e) => update(p.id, { openEnded: e.target.checked })} className="accent-ink" />
                Show “+” after max
              </label>
              <div className="flex items-center gap-3">
                {savedId === p.id && (
                  <span role="status" className="flex items-center gap-1 text-sm text-good">
                    <CheckCircle2 className="size-4" aria-hidden /> Saved
                  </span>
                )}
                <Button type="submit" size="sm">
                  Save
                </Button>
              </div>
            </div>
          </form>
        );
      })}
    </div>
  );
}

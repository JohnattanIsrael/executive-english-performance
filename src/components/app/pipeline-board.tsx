"use client";

import { useEffect, useState } from "react";
import { Building2, User } from "lucide-react";
import { Badge } from "@/components/ui/primitives";
import { pipeline } from "@/lib/crm/pipeline";
import { services } from "@/lib/services";
import { isLeadWebhookConfigured } from "@/lib/services/mock/leads";
import type { Lead, PipelineStage } from "@/lib/types";
import { cn, formatCurrency, formatDate } from "@/lib/utils";

const kindLabel: Record<Lead["kind"], string> = {
  executive_assessment: "Assessment request",
  corporate_inquiry: "Corporate inquiry",
  early_access: "AI early access",
  contact: "Contact form",
};

/** CRM pipeline view. Reads through LeadService (sample leads + submissions captured in this browser). */
export function PipelineBoard() {
  const [leads, setLeads] = useState<Lead[] | null>(null);
  const [view, setView] = useState<"board" | "table">("board");

  useEffect(() => {
    services.leads.list().then(setLeads);
  }, []);

  function move(id: string, stage: PipelineStage) {
    setLeads((ls) => ls?.map((l) => (l.id === id ? { ...l, stage } : l)) ?? null);
  }

  if (!leads) return <p className="text-sm text-muted">Loading pipeline…</p>;

  const pipelineLeads = leads.filter((l) => l.kind === "executive_assessment" || l.kind === "corporate_inquiry");
  const otherLeads = leads.filter((l) => l.kind === "early_access" || l.kind === "contact");
  const openValue = pipelineLeads
    .filter((l) => ["new_lead", "qualified", "assessment", "proposal"].includes(l.stage))
    .reduce((a, l) => a + l.estimatedDealValue, 0);
  const localCount = leads.filter((l) => !l.isSample).length;

  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Summary label="Open pipeline (est.)" value={formatCurrency(openValue)} />
        <Summary label="B2C leads" value={String(pipelineLeads.filter((l) => l.segment === "b2c").length)} />
        <Summary label="B2B leads" value={String(pipelineLeads.filter((l) => l.segment === "b2b").length)} />
        <Summary label="Captured in this browser" value={String(localCount)} />
      </div>

      <p className="rounded-xl border border-line bg-surface px-4 py-3 text-[13px] leading-relaxed text-muted">
        Sample leads are labeled. Submissions from this site’s forms appear here when made in this browser.
        {isLeadWebhookConfigured
          ? " A lead webhook is configured, so submissions are also sent to your CRM endpoint."
          : " Set NEXT_PUBLIC_LEAD_WEBHOOK_URL to forward submissions to a CRM or automation tool."}{" "}
        Stage changes here are not persisted.
      </p>

      <div className="flex gap-1 self-start rounded-lg bg-paper-2 p-1 text-sm" role="group" aria-label="View">
        {(["board", "table"] as const).map((v) => (
          <button
            key={v}
            type="button"
            aria-pressed={view === v}
            onClick={() => setView(v)}
            className={cn("rounded-md px-3 py-1.5 capitalize", view === v ? "bg-surface font-medium text-ink shadow-sm" : "text-muted")}
          >
            {v}
          </button>
        ))}
      </div>

      {view === "board" ? (
        <div className="-mx-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0">
          <div className="grid min-w-[1060px] grid-cols-7 gap-2">
            {pipeline.map((col) => {
              const items = pipelineLeads.filter((l) => l.stage === col.stage);
              return (
                <section key={col.stage} aria-label={col.label} className="flex flex-col rounded-2xl bg-paper-2/70 p-2.5">
                  <header className="px-1.5 pt-1 pb-3">
                    <p className="flex items-center justify-between text-sm font-medium text-ink">
                      {col.label} <span className="text-xs font-normal text-muted tabular-nums">{items.length}</span>
                    </p>
                    <p className="mt-0.5 text-[11px] leading-snug text-muted">{col.description}</p>
                  </header>
                  <ul className="flex flex-col gap-2">
                    {items.map((l) => (
                      <li key={l.id} className="rounded-xl border border-line bg-surface p-3">
                        <div className="flex items-center justify-between gap-2">
                          <Badge tone={l.segment === "b2b" ? "harbor" : "neutral"}>
                            {l.segment === "b2b" ? <Building2 className="size-3" aria-hidden /> : <User className="size-3" aria-hidden />}
                            {l.segment.toUpperCase()}
                          </Badge>
                          {l.isSample ? <span className="text-[10px] text-faint">Sample</span> : <Badge tone="good">New</Badge>}
                        </div>
                        <p className="mt-2 text-[13px] leading-snug font-medium text-ink">{l.name}</p>
                        <p className="text-xs text-muted">{[l.role, l.company].filter(Boolean).join(" · ")}</p>
                        {l.communicationChallenge && <p className="mt-2 line-clamp-2 text-xs text-ink-2">{l.communicationChallenge}</p>}
                        <p className="mt-2 text-xs font-medium text-ink">{formatCurrency(l.estimatedDealValue)}</p>
                        <label className="mt-2 block">
                          <span className="sr-only">Move {l.name} to stage</span>
                          <select
                            value={l.stage}
                            onChange={(e) => move(l.id, e.target.value as PipelineStage)}
                            className="w-full rounded-md border border-line bg-paper px-1.5 py-1 text-[11px] text-ink-2"
                          >
                            {pipeline.map((p) => (
                              <option key={p.stage} value={p.stage}>
                                {p.label}
                              </option>
                            ))}
                          </select>
                        </label>
                      </li>
                    ))}
                  </ul>
                </section>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-line bg-surface">
          <table className="w-full min-w-[960px] text-left text-sm">
            <caption className="sr-only">All leads</caption>
            <thead>
              <tr className="border-b border-line bg-paper/60 text-xs tracking-wide text-muted uppercase">
                {["Lead", "Type", "Segment", "Source", "Stage", "Proposal", "Customer", "Consultation", "Est. value", "Created"].map((h) => (
                  <th key={h} scope="col" className="px-4 py-3 font-medium">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {leads.map((l) => (
                <tr key={l.id}>
                  <td className="px-4 py-3">
                    <span className="block font-medium text-ink">{l.name}</span>
                    <span className="text-xs text-muted">{l.email}</span>
                  </td>
                  <td className="px-4 py-3 text-ink-2">{kindLabel[l.kind]}</td>
                  <td className="px-4 py-3 text-ink-2 uppercase">{l.segment}</td>
                  <td className="px-4 py-3 text-ink-2">
                    {l.source.page}
                    {l.source.utm?.source && <span className="block text-xs text-muted">utm: {l.source.utm.source}</span>}
                  </td>
                  <td className="px-4 py-3 text-ink-2">{pipeline.find((p) => p.stage === l.stage)?.label}</td>
                  <td className="px-4 py-3 text-ink-2 capitalize">{l.proposalStatus}</td>
                  <td className="px-4 py-3 text-ink-2 capitalize">{l.customerStatus.replace("_", " ")}</td>
                  <td className="px-4 py-3 text-ink-2">{l.consultationDate ? formatDate(l.consultationDate) : "—"}</td>
                  <td className="px-4 py-3 text-right text-ink tabular-nums">{formatCurrency(l.estimatedDealValue)}</td>
                  <td className="px-4 py-3 text-ink-2">{formatDate(l.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {otherLeads.length > 0 && view === "board" && (
        <section className="rounded-2xl border border-line bg-surface p-5">
          <h2 className="text-[15px] font-medium text-ink">Early access & contact submissions</h2>
          <ul className="mt-3 divide-y divide-line">
            {otherLeads.map((l) => (
              <li key={l.id} className="flex flex-col gap-1 py-3 text-sm sm:flex-row sm:items-center sm:justify-between">
                <span className="text-ink">
                  {l.name} <span className="text-muted">· {l.email}</span>
                </span>
                <span className="text-muted">
                  {kindLabel[l.kind]} · {formatDate(l.createdAt)}
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

function Summary({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-line bg-surface p-4">
      <p className="text-xs text-muted">{label}</p>
      <p className="mt-1 text-2xl font-semibold tracking-tight text-ink">{value}</p>
    </div>
  );
}

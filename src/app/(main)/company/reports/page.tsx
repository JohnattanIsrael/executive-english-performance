import { Download, FileText } from "lucide-react";
import { PageHeader } from "@/components/app/app-shell";
import { SampleBadge } from "@/components/app/status";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/primitives";
import { services } from "@/lib/services";
import { appMetadata } from "@/lib/seo";

export const metadata = appMetadata("Reports");

export default async function ReportsPage() {
  const reports = await services.companies.listReports("cmp_sample");

  return (
    <>
      <PageHeader
        title="Reports"
        description="Program reports prepared for HR and leadership: participation, development themes and recommendations."
        actions={<SampleBadge />}
      />
      <ul className="flex flex-col gap-4">
        {reports.map((r) => (
          <li key={r.id} className="flex flex-col gap-4 rounded-2xl border border-line bg-surface p-5 md:flex-row md:items-center md:p-6">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-paper text-ink-2">
              <FileText className="size-5" aria-hidden />
            </span>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="font-medium text-ink">{r.title}</h2>
                <Badge tone={r.status === "ready" ? "good" : "caution"}>{r.status === "ready" ? "Ready" : "In preparation"}</Badge>
              </div>
              <p className="mt-0.5 text-xs text-muted">{r.period}</p>
              <p className="mt-2 text-sm leading-relaxed text-ink-2">{r.summary}</p>
            </div>
            <Button size="sm" variant="secondary" disabled title="PDF export is available once reporting is connected">
              <Download className="size-3.5" aria-hidden /> Download PDF
            </Button>
          </li>
        ))}
      </ul>
    </>
  );
}

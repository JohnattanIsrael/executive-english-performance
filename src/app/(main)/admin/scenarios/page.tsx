import { Plus, Sparkles } from "lucide-react";
import { PageHeader, Panel } from "@/components/app/app-shell";
import { DataTable } from "@/components/app/data-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/primitives";
import { categoryLabels, metricLabels } from "@/content/marketing";
import { services } from "@/lib/services";
import { appMetadata } from "@/lib/seo";

export const metadata = appMetadata("Scenarios");

export default async function AdminScenariosPage() {
  const scenarios = await services.scenarios.list();
  return (
    <>
      <PageHeader
        title="Scenarios"
        description="The library used for practice and, once live, AI role-play. Company-specific scenarios are visible only to that company."
        actions={
          <Button size="sm" disabled title="Scenario editor is enabled once a database is connected">
            <Plus className="size-3.5" aria-hidden /> New scenario
          </Button>
        }
      />
      <Panel className="mb-5">
        <p className="flex items-start gap-3 text-sm leading-relaxed text-ink-2">
          <Sparkles className="mt-0.5 size-4 shrink-0 text-brass" aria-hidden />
          Planned: ScenarioService.generate() will draft scenarios from a client’s context for coach review before
          publishing. Not yet live.
        </p>
      </Panel>
      <DataTable
        caption="Scenarios"
        rows={scenarios}
        rowKey={(s) => s.id}
        columns={[
          {
            key: "title",
            header: "Scenario",
            cell: (s) => (
              <span>
                <span className="block font-medium text-ink">{s.title}</span>
                <span className="line-clamp-1 text-xs text-muted">{s.situation}</span>
              </span>
            ),
          },
          { key: "category", header: "Category", cell: (s) => categoryLabels[s.category] },
          { key: "difficulty", header: "Level", cell: (s) => <span className="capitalize">{s.difficulty}</span> },
          { key: "skills", header: "Skills", cell: (s) => s.skills.map((k) => metricLabels[k]).join(", ") },
          { key: "turns", header: "Turns", numeric: true, cell: (s) => s.script.length },
          { key: "status", header: "Status", cell: (s) => <Badge tone={s.status === "published" ? "good" : "neutral"} className="capitalize">{s.status}</Badge> },
        ]}
      />
    </>
  );
}

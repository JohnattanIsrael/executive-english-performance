import { PageHeader } from "@/components/app/app-shell";
import { DataTable } from "@/components/app/data-table";
import { StatTile } from "@/components/ui/charts";
import { Badge } from "@/components/ui/primitives";
import { services } from "@/lib/services";
import { appMetadata } from "@/lib/seo";

export const metadata = appMetadata("Content");

const statusTone = { placeholder: "caution", draft: "neutral", verified: "good" } as const;

export default async function AdminContentPage() {
  const items = await services.admin.listContent();
  const verified = items.filter((i) => i.status === "verified").length;

  return (
    <>
      <PageHeader
        title="Content readiness"
        description="Everything on the public site that must be replaced with verified business information before launch."
      />
      <div className="mb-5 grid gap-4 sm:grid-cols-3">
        <StatTile label="Verified" value={`${verified}/${items.length}`} progress={{ current: verified, target: items.length }} />
        <StatTile label="Placeholders remaining" value={String(items.filter((i) => i.status === "placeholder").length)} />
        <StatTile label="Drafts to review" value={String(items.filter((i) => i.status === "draft").length)} />
      </div>
      <DataTable
        caption="Content checklist"
        rows={items}
        rowKey={(i) => i.id}
        columns={[
          { key: "title", header: "Item", cell: (i) => <span className="font-medium text-ink">{i.title}</span> },
          { key: "area", header: "Area", cell: (i) => <span className="capitalize">{i.area.replace("_", " ")}</span> },
          { key: "location", header: "Where to edit", cell: (i) => <code className="rounded bg-paper px-1.5 py-0.5 text-xs">{i.location}</code> },
          { key: "owner", header: "Owner", cell: (i) => i.owner },
          { key: "status", header: "Status", cell: (i) => <Badge tone={statusTone[i.status]} className="capitalize">{i.status}</Badge> },
        ]}
      />
    </>
  );
}

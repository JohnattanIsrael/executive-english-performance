import { PageHeader } from "@/components/app/app-shell";
import { DataTable } from "@/components/app/data-table";
import { SampleBadge } from "@/components/app/status";
import { Badge } from "@/components/ui/primitives";
import { services } from "@/lib/services";
import { appMetadata } from "@/lib/seo";

export const metadata = appMetadata("Coaches");

export default async function AdminCoachesPage() {
  const coaches = await services.admin.listCoaches();
  return (
    <>
      <PageHeader title="Coaches" description="Coach roster, specialties and client capacity." actions={<SampleBadge />} />
      <DataTable
        caption="Coaches"
        rows={coaches}
        rowKey={(c) => c.id}
        columns={[
          {
            key: "name",
            header: "Coach",
            cell: (c) => (
              <span>
                <span className="block font-medium text-ink">{c.name}</span>
                <span className="text-xs text-muted">{c.title}</span>
              </span>
            ),
          },
          { key: "specialties", header: "Specialties", cell: (c) => c.specialties.join(", ") },
          { key: "tz", header: "Timezone", cell: (c) => c.timezone },
          {
            key: "capacity",
            header: "Capacity",
            cell: (c) => (
              <div className="min-w-36">
                <div className="flex justify-between text-xs">
                  <span className="text-ink">
                    {c.activeClients} / {c.capacity} clients
                  </span>
                </div>
                <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-data-track" role="meter" aria-label={`${c.name} capacity`} aria-valuenow={c.activeClients} aria-valuemin={0} aria-valuemax={c.capacity}>
                  <div className="h-full rounded-full bg-data" style={{ width: `${(c.activeClients / c.capacity) * 100}%` }} />
                </div>
              </div>
            ),
          },
          { key: "status", header: "Status", cell: (c) => <Badge tone={c.status === "active" ? "good" : "caution"} className="capitalize">{c.status}</Badge> },
        ]}
      />
    </>
  );
}

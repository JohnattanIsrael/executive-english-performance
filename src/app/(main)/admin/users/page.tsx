import { PageHeader } from "@/components/app/app-shell";
import { DataTable } from "@/components/app/data-table";
import { SampleBadge } from "@/components/app/status";
import { Badge } from "@/components/ui/primitives";
import { services } from "@/lib/services";
import { appMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/utils";

export const metadata = appMetadata("Users");

const roleLabel = { client: "Client", company_admin: "Company admin", coach: "Coach", admin: "Admin" } as const;
const statusTone = { active: "good", invited: "neutral", suspended: "caution" } as const;

export default async function AdminUsersPage() {
  const users = await services.admin.listUsers();
  return (
    <>
      <PageHeader title="Users" description="All accounts across clients, companies, coaches and operators." actions={<SampleBadge />} />
      <DataTable
        caption="Users"
        rows={users}
        rowKey={(u) => u.id}
        columns={[
          {
            key: "name",
            header: "User",
            cell: (u) => (
              <span>
                <span className="block font-medium text-ink">{u.name}</span>
                <span className="text-xs text-muted">{u.email}</span>
              </span>
            ),
          },
          { key: "role", header: "Role", cell: (u) => <Badge tone="harbor">{roleLabel[u.role]}</Badge> },
          { key: "company", header: "Company", cell: (u) => u.company ?? "—" },
          { key: "status", header: "Status", cell: (u) => <Badge tone={statusTone[u.status]} className="capitalize">{u.status}</Badge> },
          { key: "last", header: "Last active", cell: (u) => (u.lastActive ? formatDate(u.lastActive) : "—") },
        ]}
      />
    </>
  );
}

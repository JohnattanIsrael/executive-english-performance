import { UserPlus } from "lucide-react";
import { PageHeader } from "@/components/app/app-shell";
import { DataTable } from "@/components/app/data-table";
import { EmployeeStatus, SampleBadge } from "@/components/app/status";
import { Button } from "@/components/ui/button";
import { services } from "@/lib/services";
import { appMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/utils";

export const metadata = appMetadata("Employees");

export default async function EmployeesPage() {
  const employees = await services.companies.listEmployees("cmp_sample");

  return (
    <>
      <PageHeader
        title="Employees"
        description="Participants enrolled in your program. Invitations are sent by email once accounts are connected."
        actions={
          <>
            <SampleBadge />
            <Button size="sm" disabled title="Available once authentication is connected">
              <UserPlus className="size-3.5" aria-hidden /> Invite participants
            </Button>
          </>
        }
      />
      <DataTable
        caption="Program participants"
        rows={employees}
        rowKey={(e) => e.id}
        columns={[
          {
            key: "name",
            header: "Participant",
            cell: (e) => (
              <span>
                <span className="block font-medium text-ink">{e.name}</span>
                <span className="text-xs text-muted">{e.jobTitle}</span>
              </span>
            ),
          },
          { key: "department", header: "Department", cell: (e) => e.department },
          { key: "status", header: "Status", cell: (e) => <EmployeeStatus status={e.status} /> },
          { key: "focus", header: "Development focus", cell: (e) => e.focus },
          { key: "sessions", header: "Sessions", numeric: true, cell: (e) => e.sessionsCompleted },
          { key: "minutes", header: "Practice min", numeric: true, cell: (e) => e.practiceMinutes },
          { key: "last", header: "Last active", cell: (e) => (e.lastActive ? formatDate(e.lastActive) : "—") },
        ]}
      />
    </>
  );
}

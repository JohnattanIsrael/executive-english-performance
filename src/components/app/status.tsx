import { Badge } from "@/components/ui/primitives";
import type { Employee } from "@/lib/types";

const employeeStatus: Record<Employee["status"], { label: string; tone: "neutral" | "harbor" | "good" | "caution" }> = {
  invited: { label: "Invited", tone: "neutral" },
  assessing: { label: "Assessing", tone: "caution" },
  active: { label: "Active", tone: "harbor" },
  completed: { label: "Completed", tone: "good" },
};

export function EmployeeStatus({ status }: { status: Employee["status"] }) {
  const s = employeeStatus[status];
  return <Badge tone={s.tone}>{s.label}</Badge>;
}

export function SampleBadge() {
  return <Badge tone="caution">Sample data</Badge>;
}

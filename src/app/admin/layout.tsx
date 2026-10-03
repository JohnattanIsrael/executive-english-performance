import type { Metadata } from "next";
import { AppShell } from "@/components/app/app-shell";

export const metadata: Metadata = {
  title: { template: "%s · Operator console", default: "Operator console" },
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  // Auth boundary: a real AuthService should restrict this area to the "admin" role.
  return (
    <AppShell workspace="admin" user={{ name: "Operations Admin", detail: "Administrator" }}>
      {children}
    </AppShell>
  );
}

import type { Metadata } from "next";
import { AppShell } from "@/components/app/app-shell";
import { services } from "@/lib/services";

export const metadata: Metadata = {
  title: { template: "%s · Company workspace", default: "Company workspace" },
  robots: { index: false, follow: false },
};

export default async function CompanyLayout({ children }: { children: React.ReactNode }) {
  // Auth boundary: a real AuthService should restrict this area to company_admin users.
  const company = await services.companies.getCompany("cmp_sample");
  return (
    <AppShell workspace="company" user={{ name: "HR Admin", detail: company?.name ?? "Company" }}>
      {children}
    </AppShell>
  );
}

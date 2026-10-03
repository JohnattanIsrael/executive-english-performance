import { PageHeader } from "@/components/app/app-shell";
import { SettingsForm } from "@/components/app/settings-form";
import { services } from "@/lib/services";
import { appMetadata } from "@/lib/seo";

export const metadata = appMetadata("Settings");

export default async function CompanySettingsPage() {
  const company = await services.companies.getCompany("cmp_sample");

  return (
    <>
      <PageHeader title="Company settings" description="Company profile, administrators, reporting and integrations." />
      <SettingsForm
        sections={[
          {
            title: "Company profile",
            fields: [
              { id: "companyName", label: "Company name", defaultValue: company?.name ?? "" },
              { id: "industry", label: "Industry", defaultValue: company?.industry ?? "" },
              { id: "hq", label: "Headquarters", defaultValue: company?.headquarters ?? "" },
              { id: "seats", label: "Licensed seats", defaultValue: String(company?.seats ?? "") },
            ],
          },
          {
            title: "Reporting",
            description: "What program sponsors receive.",
            toggles: [
              { id: "monthlyDigest", label: "Monthly participation digest", defaultChecked: true },
              { id: "quarterlyReport", label: "Quarterly program report", defaultChecked: true },
              { id: "deptBreakdown", label: "Department-level breakdowns", description: "Shown only for groups of 5 or more participants.", defaultChecked: true },
            ],
          },
          {
            title: "Security & access",
            toggles: [
              { id: "sso", label: "Single sign-on (SAML / OIDC)", comingSoon: true },
              { id: "scim", label: "Automatic user provisioning", comingSoon: true },
            ],
          },
          {
            title: "Billing",
            toggles: [{ id: "invoices", label: "Invoices and payment methods", comingSoon: true }],
            note: "Corporate programs are invoiced per agreement. Online billing will be added with payments integration.",
          },
        ]}
      />
    </>
  );
}

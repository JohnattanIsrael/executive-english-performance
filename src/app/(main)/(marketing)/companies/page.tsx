import { CompaniesPage, companiesMetadata } from "@/views/companies";

export const metadata = companiesMetadata("en");

export default function Page() {
  return <CompaniesPage locale="en" />;
}

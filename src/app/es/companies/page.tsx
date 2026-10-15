import { CompaniesPage, companiesMetadata } from "@/views/companies";

export const metadata = companiesMetadata("es");

export default function Page() {
  return <CompaniesPage locale="es" />;
}

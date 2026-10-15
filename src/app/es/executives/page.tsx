import { ExecutivesPage, executivesMetadata } from "@/views/executives";

export const metadata = executivesMetadata("es");

export default function Page() {
  return <ExecutivesPage locale="es" />;
}

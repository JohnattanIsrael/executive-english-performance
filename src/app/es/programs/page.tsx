import { ProgramsPage, programsMetadata } from "@/views/programs";

export const metadata = programsMetadata("es");

export default function Page() {
  return <ProgramsPage locale="es" />;
}

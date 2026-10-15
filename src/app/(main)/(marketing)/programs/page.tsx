import { ProgramsPage, programsMetadata } from "@/views/programs";

export const metadata = programsMetadata("en");

export default function Page() {
  return <ProgramsPage locale="en" />;
}

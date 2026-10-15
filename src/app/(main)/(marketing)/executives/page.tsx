import { ExecutivesPage, executivesMetadata } from "@/views/executives";

export const metadata = executivesMetadata("en");

export default function Page() {
  return <ExecutivesPage locale="en" />;
}

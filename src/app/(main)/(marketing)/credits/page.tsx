import { CreditsPage, miscMetadata } from "@/views/misc";

export const metadata = miscMetadata("credits", "en");

export default function Page() {
  return <CreditsPage locale="en" />;
}

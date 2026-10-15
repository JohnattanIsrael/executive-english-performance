import { FaqPage, miscMetadata } from "@/views/misc";

export const metadata = miscMetadata("faq", "en");

export default function Page() {
  return <FaqPage locale="en" />;
}

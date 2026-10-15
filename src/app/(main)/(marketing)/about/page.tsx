import { AboutPage, aboutMetadata } from "@/views/about";

export const metadata = aboutMetadata("en");

export default function Page() {
  return <AboutPage locale="en" />;
}

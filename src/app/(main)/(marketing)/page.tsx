import { HomePage, homeMetadata } from "@/views/home";

export const metadata = homeMetadata("en");

export default function Page() {
  return <HomePage locale="en" />;
}

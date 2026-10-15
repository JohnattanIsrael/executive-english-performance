import { BeginnersPage, beginnersMetadata } from "@/views/beginners";

export const metadata = beginnersMetadata("en");

export default function Page() {
  return <BeginnersPage locale="en" />;
}

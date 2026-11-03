import { LearnPage, learnMetadata } from "@/views/learn";

export const metadata = learnMetadata("en");

export default function Page() {
  return <LearnPage locale="en" />;
}

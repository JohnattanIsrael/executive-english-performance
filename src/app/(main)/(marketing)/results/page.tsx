import { ResultsPage, resultsMetadata } from "@/views/results";

export const metadata = resultsMetadata("en");

export default function Page() {
  return <ResultsPage locale="en" />;
}

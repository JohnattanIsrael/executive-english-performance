import { ResultsPage, resultsMetadata } from "@/views/results";

export const metadata = resultsMetadata("es");

export default function Page() {
  return <ResultsPage locale="es" />;
}

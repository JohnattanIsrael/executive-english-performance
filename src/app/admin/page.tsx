import { PageHeader } from "@/components/app/app-shell";
import { PipelineBoard } from "@/components/app/pipeline-board";
import { appMetadata } from "@/lib/seo";

export const metadata = appMetadata("Pipeline");

export default function AdminPipelinePage() {
  return (
    <>
      <PageHeader
        title="Lead pipeline"
        description="New Lead → Qualified → Assessment → Proposal → Won → Active → Renewal. Estimated values are a prioritization heuristic based on program pricing."
      />
      <PipelineBoard />
    </>
  );
}

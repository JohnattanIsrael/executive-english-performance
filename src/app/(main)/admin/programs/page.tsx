import { PageHeader } from "@/components/app/app-shell";
import { PricingEditor } from "@/components/app/pricing-editor";
import { PlaceholderNote } from "@/components/ui/primitives";
import { appMetadata } from "@/lib/seo";

export const metadata = appMetadata("Programs & pricing");

export default function AdminProgramsPage() {
  return (
    <>
      <PageHeader
        title="Programs & pricing"
        description="Pricing is a positioning tool. Every price on the public site comes from this catalogue via PricingService."
      />
      <PlaceholderNote className="mb-5">
        In this static demo, edits are saved in your browser only. Public pages are generated from
        src/config/programs.ts at build time; once a database backs PricingService, saving here updates the live site.
      </PlaceholderNote>
      <PricingEditor />
    </>
  );
}

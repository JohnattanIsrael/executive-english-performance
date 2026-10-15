import { PageHeader } from "@/components/app/app-shell";
import { ScenarioLibrary } from "@/components/app/scenario-library";
import { services } from "@/lib/services";
import { appMetadata } from "@/lib/seo";

export const metadata = appMetadata("Scenario library");

export default async function ScenariosPage() {
  const session = (await services.auth.getSession())!;
  const scenarios = (await services.scenarios.list({ companyId: session.user.companyId })).filter((s) => s.status === "published");

  return (
    <>
      <PageHeader
        title="Scenario library"
        description="Realistic professional situations to rehearse. In the preview, simulations follow a scripted counterpart; AI role-play is in development."
      />
      <ScenarioLibrary scenarios={scenarios} />
    </>
  );
}

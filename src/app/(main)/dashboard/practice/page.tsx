import { Suspense } from "react";
import { PracticeView } from "@/components/app/practice-view";
import { services } from "@/lib/services";
import { appMetadata } from "@/lib/seo";

export const metadata = appMetadata("Practice");

export default async function PracticePage() {
  const session = (await services.auth.getSession())!;
  const [scenarios, recommended, progress] = await Promise.all([
    services.scenarios.list({ companyId: session.user.companyId }),
    services.scenarios.recommend(session.user.id, 3),
    services.progress.getSummary(session.user.id),
  ]);

  return (
    <Suspense>
      <PracticeView
        scenarios={scenarios.filter((s) => s.status === "published")}
        recommended={recommended}
        recent={progress.recentSessions}
      />
    </Suspense>
  );
}

import { PageHeader, Panel } from "@/components/app/app-shell";
import { Badge } from "@/components/ui/primitives";
import { categoryLabels } from "@/content/marketing";
import { services } from "@/lib/services";
import { appMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/utils";

export const metadata = appMetadata("Profile");

export default async function ProfilePage() {
  const session = (await services.auth.getSession())!;
  const { user } = session;
  const programs = await services.pricing.listPrograms();
  const program = programs.find((p) => p.id === user.programId);

  const details = [
    { label: "Name", value: `${user.firstName} ${user.lastName}` },
    { label: "Email", value: user.email },
    { label: "Role", value: user.jobTitle },
    { label: "Company", value: user.company ?? "—" },
    { label: "Industry", value: user.industry ?? "—" },
    { label: "Country", value: user.country ?? "—" },
    { label: "Program", value: program?.name ?? "—" },
    { label: "Member since", value: formatDate(user.joinedAt) },
  ];

  return (
    <>
      <PageHeader title="Profile" description="The context your coach and the platform use to personalize your practice." />
      <div className="grid gap-5 lg:grid-cols-[1fr_1.2fr]">
        <Panel title="About you">
          <dl className="divide-y divide-line">
            {details.map((d) => (
              <div key={d.label} className="grid grid-cols-[120px_1fr] gap-4 py-3 text-sm">
                <dt className="text-muted">{d.label}</dt>
                <dd className="text-ink">{d.value}</dd>
              </div>
            ))}
          </dl>
        </Panel>
        <div className="flex flex-col gap-5">
          <Panel title="Communication focus">
            <p className="font-serif text-2xl text-ink">{user.communicationFocus}</p>
            <ul className="mt-4 flex flex-col gap-2">
              {user.goals.map((g) => (
                <li key={g} className="text-sm text-ink-2">
                  — {g}
                </li>
              ))}
            </ul>
          </Panel>
          <Panel title="Upcoming high-stakes situations">
            <ul className="divide-y divide-line">
              {user.upcomingSituations.map((s) => (
                <li key={s.id} className="flex items-center justify-between gap-3 py-3 text-sm">
                  <span className="text-ink">{s.title}</span>
                  <span className="flex items-center gap-2 text-muted">
                    <Badge>{categoryLabels[s.type]}</Badge>
                    {s.date ? formatDate(s.date) : "TBC"}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-muted">Your coach updates these with you. Editing is enabled once accounts are connected.</p>
          </Panel>
        </div>
      </div>
    </>
  );
}

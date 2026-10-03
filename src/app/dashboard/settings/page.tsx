import { PageHeader } from "@/components/app/app-shell";
import { SettingsForm } from "@/components/app/settings-form";
import { services } from "@/lib/services";
import { appMetadata } from "@/lib/seo";

export const metadata = appMetadata("Settings");

export default async function SettingsPage() {
  const { user } = (await services.auth.getSession())!;

  return (
    <>
      <PageHeader title="Settings" description="Account, notifications, practice preferences and privacy." />
      <SettingsForm
        sections={[
          {
            title: "Account",
            description: "Managed by your sign-in provider once authentication is connected.",
            fields: [
              { id: "firstName", label: "First name", defaultValue: user.firstName },
              { id: "lastName", label: "Last name", defaultValue: user.lastName },
              { id: "email", label: "Email", defaultValue: user.email, type: "email" },
              {
                id: "timezone",
                label: "Timezone",
                defaultValue: user.timezone ?? "UTC",
                type: "select",
                options: ["America/Mexico_City", "America/New_York", "America/Sao_Paulo", "Europe/Madrid", "Europe/London", "UTC"],
              },
            ],
          },
          {
            title: "Notifications",
            toggles: [
              { id: "notifySessions", label: "Session reminders", description: "Email reminder 24 hours before coaching.", defaultChecked: true },
              { id: "notifyMessages", label: "Coach messages", description: "Email when your coach replies.", defaultChecked: true },
              { id: "notifyWeekly", label: "Weekly practice summary", description: "A short Monday summary of last week.", defaultChecked: false },
            ],
          },
          {
            title: "Practice",
            fields: [
              { id: "weeklyGoal", label: "Weekly session goal", defaultValue: "5", type: "select", options: ["3", "4", "5", "7"] },
            ],
            toggles: [
              { id: "voicePractice", label: "Voice practice", description: "Speak your answers and receive pronunciation feedback.", comingSoon: true },
            ],
          },
          {
            title: "Privacy",
            description: "You control what your coach and company can see.",
            toggles: [
              { id: "shareTranscripts", label: "Share practice transcripts with my coach", defaultChecked: true },
              { id: "shareCompany", label: "Include my participation in company reports", description: "Companies see participation and cohort-level progress — never coaching content.", defaultChecked: true },
              { id: "audioRetention", label: "Store audio recordings", description: "Retention rules will be documented before launch.", comingSoon: true },
            ],
          },
          {
            title: "Integrations",
            toggles: [
              { id: "calendar", label: "Calendar sync", description: "Add coaching sessions to Google or Outlook calendar.", comingSoon: true },
            ],
          },
        ]}
      />
    </>
  );
}

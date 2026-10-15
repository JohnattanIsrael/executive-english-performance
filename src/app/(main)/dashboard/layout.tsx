import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AppShell } from "@/components/app/app-shell";
import { services } from "@/lib/services";

export const metadata: Metadata = {
  title: { template: "%s · Client workspace", default: "Client workspace" },
  robots: { index: false, follow: false },
};

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  // Auth boundary: AuthService decides who can see the workspace. In mock mode
  // a demo session is always returned; a real provider plugs in here.
  const session = await services.auth.getSession();
  if (!session) redirect("/sign-in");

  const [notifications, threads] = await Promise.all([
    services.notifications.list(session.user.id),
    services.coaching.listThreads(session.user.id),
  ]);

  return (
    <AppShell
      workspace="client"
      user={{ name: `${session.user.firstName} ${session.user.lastName}`, detail: session.user.jobTitle }}
      unreadMessages={threads.reduce((a, t) => a + t.unread, 0)}
      unreadNotifications={notifications.filter((n) => !n.read).length}
    >
      {children}
    </AppShell>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import {
  Bell,
  Building2,
  CalendarDays,
  ChartLine,
  ClipboardCheck,
  FileCheck,
  FileText,
  GraduationCap,
  LayoutDashboard,
  Layers,
  Library,
  LogOut,
  Menu,
  MessageSquare,
  Mic,
  Settings,
  SquareKanban,
  Tags,
  UserRound,
  Users,
  X,
  type LucideIcon,
} from "lucide-react";
import { LogoMark } from "@/components/marketing/logo";
import { cn } from "@/lib/utils";

export type Workspace = "client" | "company" | "admin";

const navigation: Record<Workspace, { label: string; items: { label: string; href: string; icon: LucideIcon }[] }> = {
  client: {
    label: "Client workspace",
    items: [
      { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
      { label: "Practice", href: "/dashboard/practice", icon: Mic },
      { label: "Scenarios", href: "/dashboard/scenarios", icon: Library },
      { label: "Assessment", href: "/dashboard/assessment", icon: ClipboardCheck },
      { label: "Progress", href: "/dashboard/progress", icon: ChartLine },
      { label: "Coaching", href: "/dashboard/coaching", icon: CalendarDays },
      { label: "Messages", href: "/dashboard/messages", icon: MessageSquare },
      { label: "Profile", href: "/dashboard/profile", icon: UserRound },
      { label: "Settings", href: "/dashboard/settings", icon: Settings },
    ],
  },
  company: {
    label: "Company workspace",
    items: [
      { label: "Overview", href: "/company", icon: Building2 },
      { label: "Employees", href: "/company/employees", icon: Users },
      { label: "Programs", href: "/company/programs", icon: Layers },
      { label: "Progress", href: "/company/progress", icon: ChartLine },
      { label: "Reports", href: "/company/reports", icon: FileText },
      { label: "Settings", href: "/company/settings", icon: Settings },
    ],
  },
  admin: {
    label: "Operator console",
    items: [
      { label: "Pipeline", href: "/admin", icon: SquareKanban },
      { label: "Users", href: "/admin/users", icon: Users },
      { label: "Coaches", href: "/admin/coaches", icon: GraduationCap },
      { label: "Scenarios", href: "/admin/scenarios", icon: Library },
      { label: "Content", href: "/admin/content", icon: FileCheck },
      { label: "Programs & pricing", href: "/admin/programs", icon: Tags },
    ],
  },
};

const workspaces: { key: Workspace; label: string; href: string }[] = [
  { key: "client", label: "Client", href: "/dashboard" },
  { key: "company", label: "Company", href: "/company" },
  { key: "admin", label: "Admin", href: "/admin" },
];

export function AppShell({
  workspace,
  user,
  unreadMessages = 0,
  unreadNotifications = 0,
  children,
}: {
  workspace: Workspace;
  user: { name: string; detail: string };
  unreadMessages?: number;
  unreadNotifications?: number;
  children: ReactNode;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [lastPath, setLastPath] = useState(pathname);
  const nav = navigation[workspace];
  const root = nav.items[0].href;

  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const normalized = pathname.replace(/\/$/, "") || "/";
  const isActive = (href: string) => (href === root ? normalized === href : normalized.startsWith(href));

  const sidebar = (
    <div className="flex h-full flex-col">
      <div className="flex h-16 items-center gap-3 px-5">
        <Link href="/" className="flex items-center gap-3" aria-label="Back to website">
          <LogoMark className="size-7" />
          <span className="flex flex-col leading-none">
            <span className="font-serif text-[15px] text-ink">Executive English</span>
            <span className="mt-1 text-[10px] tracking-[0.2em] text-muted uppercase">{nav.label}</span>
          </span>
        </Link>
      </div>

      <div className="px-3 pt-2">
        <div role="group" aria-label="Demo workspaces" className="grid grid-cols-3 gap-1 rounded-lg bg-paper-2 p-1 text-xs">
          {workspaces.map((w) => (
            <Link
              key={w.key}
              href={w.href}
              aria-current={w.key === workspace ? "true" : undefined}
              className={cn(
                "rounded-md py-1.5 text-center transition-colors",
                w.key === workspace ? "bg-surface font-medium text-ink shadow-sm" : "text-muted hover:text-ink",
              )}
            >
              {w.label}
            </Link>
          ))}
        </div>
      </div>

      <nav aria-label={nav.label} className="mt-5 flex-1 overflow-y-auto px-3">
        <ul className="flex flex-col gap-0.5">
          {nav.items.map((item) => {
            const active = isActive(item.href);
            const Icon = item.icon;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-[14px] transition-colors",
                    active ? "bg-ink text-paper" : "text-ink-2 hover:bg-paper-2 hover:text-ink",
                  )}
                >
                  <Icon className="size-4" aria-hidden />
                  {item.label}
                  {item.label === "Messages" && unreadMessages > 0 && (
                    <span className="ml-auto rounded-full bg-brass px-1.5 text-[11px] font-medium text-white">
                      {unreadMessages}
                      <span className="sr-only"> unread</span>
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="border-t border-line p-4">
        <div className="flex items-center gap-3">
          <span className="flex size-9 items-center justify-center rounded-full bg-harbor-100 text-sm font-medium text-harbor-800">
            {user.name
              .split(" ")
              .map((p) => p[0])
              .join("")
              .slice(0, 2)}
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-ink">{user.name}</p>
            <p className="truncate text-xs text-muted">{user.detail}</p>
          </div>
          <Link href="/sign-in" aria-label="Sign out" className="rounded-md p-1.5 text-muted hover:bg-paper-2 hover:text-ink">
            <LogOut className="size-4" />
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-dvh bg-paper">
      <aside className="sticky top-0 hidden h-dvh w-64 shrink-0 border-r border-line bg-surface lg:block">{sidebar}</aside>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Navigation">
          <button type="button" aria-label="Close navigation" className="absolute inset-0 bg-ink/30" onClick={() => setOpen(false)} />
          <div className="absolute inset-y-0 left-0 w-72 max-w-[85vw] bg-surface shadow-xl">
            <button
              type="button"
              className="absolute top-4 right-3 rounded-md p-1.5 text-muted"
              aria-label="Close navigation"
              onClick={() => setOpen(false)}
            >
              <X className="size-5" />
            </button>
            {sidebar}
          </div>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="border-b border-caution/20 bg-caution-soft/70 px-5 py-2 text-center text-[12.5px] text-caution">
          Demo workspace with sample data. Authentication, AI features and data storage are not connected yet.
        </div>
        <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-line bg-paper/90 px-4 backdrop-blur sm:px-6 lg:px-8">
          <button
            type="button"
            className="-ml-1 rounded-md p-1.5 text-ink lg:hidden"
            aria-label="Open navigation"
            aria-expanded={open}
            onClick={() => setOpen(true)}
          >
            <Menu className="size-5" />
          </button>
          <span className="text-sm text-muted lg:hidden">{nav.label}</span>
          <div className="ml-auto flex items-center gap-2">
            <Link href="/" className="hidden text-sm text-muted hover:text-ink sm:block">
              Website
            </Link>
            <Link
              href={workspace === "client" ? "/dashboard/messages" : root}
              className="relative rounded-full p-2 text-ink-2 hover:bg-paper-2"
              aria-label={unreadNotifications ? `Notifications, ${unreadNotifications} unread` : "Notifications"}
            >
              <Bell className="size-[18px]" />
              {unreadNotifications > 0 && <span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-brass" />}
            </Link>
          </div>
        </header>
        <main id="main" className="flex-1 px-4 py-8 sm:px-6 lg:px-10 lg:py-10">
          <div className="mx-auto max-w-6xl">{children}</div>
        </main>
      </div>
    </div>
  );
}

export function PageHeader({
  title,
  description,
  actions,
  eyebrow,
}: {
  title: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  eyebrow?: string;
}) {
  return (
    <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div>
        {eyebrow && <p className="mb-2 text-sm text-muted">{eyebrow}</p>}
        <h1 className="font-serif text-3xl leading-tight text-ink md:text-4xl">{title}</h1>
        {description && <p className="mt-2 max-w-2xl text-[15px] text-muted">{description}</p>}
      </div>
      {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
    </div>
  );
}

export function Panel({
  title,
  action,
  children,
  className,
}: {
  title?: ReactNode;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("rounded-2xl border border-line bg-surface p-5 md:p-6", className)}>
      {(title || action) && (
        <div className="mb-5 flex items-center justify-between gap-4">
          {title && <h2 className="text-[15px] font-medium text-ink">{title}</h2>}
          {action}
        </div>
      )}
      {children}
    </section>
  );
}

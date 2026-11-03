"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { LocaleLink } from "@/components/ui/locale-link";
import { Container } from "@/components/ui/primitives";
import { commonCopy } from "@/content/i18n/common";
import { useLocale } from "@/i18n/locale-provider";
import { parsePathname } from "@/i18n/routes";
import { cn } from "@/lib/utils";
import { LanguageSwitch } from "./language-switch";
import { Logo } from "./logo";

export function SiteHeader() {
  const pathname = usePathname();
  const locale = useLocale();
  const t = commonCopy[locale];
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [lastPath, setLastPath] = useState(pathname);

  // Close the mobile menu after navigation.
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const current = parsePathname(pathname).path;
  const isActive = (href: string) => current === href || current.startsWith(`${href}/`);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-colors duration-300",
        scrolled || open ? "border-line bg-paper/90 backdrop-blur-md" : "border-transparent bg-paper",
      )}
    >
      <Container className="flex h-[72px] items-center justify-between gap-6">
        <Logo />
        <nav aria-label={t.header.mainNavLabel} className="hidden xl:block">
          <ul className="flex items-center gap-5">
            {t.mainNav.map((item) => (
              <li key={item.href}>
                <LocaleLink
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn(
                    "text-[14.5px] whitespace-nowrap transition-colors hover:text-ink",
                    isActive(item.href) ? "text-ink" : "text-muted",
                  )}
                >
                  {item.label}
                </LocaleLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-4">
          <LanguageSwitch />
          <div className="hidden items-center gap-5 xl:flex">
            {/* Hidden below 2xl so the nav fits on one line at 1280px (spec 003, AC-6); it stays in the mobile menu and footer. */}
            <LocaleLink href="/sign-in" className="hidden text-[14.5px] whitespace-nowrap text-muted transition-colors hover:text-ink 2xl:inline">
              {t.header.signIn}
            </LocaleLink>
            <ButtonLink href={t.ctas.assessment.href} size="sm" trackLocation="header">
              {t.header.cta}
            </ButtonLink>
          </div>
          <button
            type="button"
            className="-mr-2 inline-flex size-10 items-center justify-center rounded-full text-ink xl:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t.header.closeMenu : t.header.openMenu}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </Container>

      {open && (
        <div id="mobile-menu" className="h-[calc(100dvh-72px)] overflow-y-auto border-t border-line bg-paper xl:hidden">
          <Container className="flex flex-col gap-8 py-8">
            <nav aria-label={t.header.mobileNavLabel}>
              <ul className="flex flex-col">
                {t.mainNav.map((item) => (
                  <li key={item.href} className="border-b border-line">
                    <LocaleLink href={item.href} className="flex items-baseline justify-between gap-4 py-4">
                      <span className="font-serif text-2xl text-ink">{item.label}</span>
                      {item.description && <span className="text-right text-sm text-muted">{item.description}</span>}
                    </LocaleLink>
                  </li>
                ))}
                {t.secondaryNav.map((item) => (
                  <li key={item.href} className="border-b border-line">
                    <LocaleLink href={item.href} className="block py-3 text-base text-ink-2">
                      {item.label}
                    </LocaleLink>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="flex flex-col gap-3">
              <ButtonLink href={t.ctas.assessment.href} size="lg" trackLocation="mobile_menu">
                {t.ctas.assessment.label}
              </ButtonLink>
              <ButtonLink href={t.ctas.proposal.href} size="lg" variant="secondary" trackLocation="mobile_menu">
                {t.ctas.proposal.label}
              </ButtonLink>
              <LocaleLink href="/sign-in" className="mt-2 text-center text-sm text-muted">
                {t.header.clientSignIn}
              </LocaleLink>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}

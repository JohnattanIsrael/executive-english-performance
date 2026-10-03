"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/primitives";
import { ctas, mainNav } from "@/config/site";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";

export function SiteHeader() {
  const pathname = usePathname();
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

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-colors duration-300",
        scrolled || open ? "border-line bg-paper/90 backdrop-blur-md" : "border-transparent bg-paper",
      )}
    >
      <Container className="flex h-[72px] items-center justify-between gap-6">
        <Logo />
        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn(
                    "text-[14.5px] transition-colors hover:text-ink",
                    isActive(item.href) ? "text-ink" : "text-muted",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="hidden items-center gap-5 lg:flex">
          <Link href="/sign-in" className="text-[14.5px] text-muted transition-colors hover:text-ink">
            Sign in
          </Link>
          <ButtonLink href={ctas.assessment.href} size="sm" trackLocation="header">
            {ctas.assessment.label}
          </ButtonLink>
        </div>
        <button
          type="button"
          className="-mr-2 inline-flex size-10 items-center justify-center rounded-full text-ink lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </Container>

      {open && (
        <div id="mobile-menu" className="h-[calc(100dvh-72px)] overflow-y-auto border-t border-line bg-paper lg:hidden">
          <Container className="flex flex-col gap-8 py-8">
            <nav aria-label="Mobile">
              <ul className="flex flex-col">
                {mainNav.map((item) => (
                  <li key={item.href} className="border-b border-line">
                    <Link href={item.href} className="flex items-baseline justify-between py-4">
                      <span className="font-serif text-2xl text-ink">{item.label}</span>
                      {item.description && <span className="text-sm text-muted">{item.description}</span>}
                    </Link>
                  </li>
                ))}
                {[
                  { label: "About", href: "/about" },
                  { label: "FAQ", href: "/faq" },
                  { label: "Contact", href: "/contact" },
                ].map((item) => (
                  <li key={item.href} className="border-b border-line">
                    <Link href={item.href} className="block py-3 text-base text-ink-2">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="flex flex-col gap-3">
              <ButtonLink href={ctas.assessment.href} size="lg" trackLocation="mobile_menu">
                {ctas.assessment.label}
              </ButtonLink>
              <ButtonLink href={ctas.proposal.href} size="lg" variant="secondary" trackLocation="mobile_menu">
                {ctas.proposal.label}
              </ButtonLink>
              <Link href="/sign-in" className="mt-2 text-center text-sm text-muted">
                Client sign in
              </Link>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}

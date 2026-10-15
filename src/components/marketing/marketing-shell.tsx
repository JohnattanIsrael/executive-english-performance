import type { ReactNode } from "react";
import type { Locale } from "@/i18n/config";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

/** Header, main landmark and footer shared by every marketing page, in any language. */
export function MarketingShell({ locale, children }: { locale: Locale; children: ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main id="main" className="flex-1">
        {children}
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}

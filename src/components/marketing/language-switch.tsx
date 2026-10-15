"use client";

import { usePathname } from "next/navigation";
import { Languages } from "lucide-react";
import { commonCopy } from "@/content/i18n/common";
import { localeInfo, locales } from "@/i18n/config";
import { useLocale } from "@/i18n/locale-provider";
import { alternatePath } from "@/i18n/routes";
import { asset, cn } from "@/lib/utils";

/**
 * Links to the current page in the other language(s) (spec 001, FR-5/FR-6).
 * A plain <a>: each language has its own root layout, so switching is a full
 * page load anyway, and it works without JavaScript.
 */
export function LanguageSwitch({ className }: { className?: string }) {
  const pathname = usePathname();
  const locale = useLocale();

  return (
    <nav aria-label={commonCopy[locale].header.languageLabel} className={cn("flex items-center gap-1.5", className)}>
      <Languages className="size-4 text-faint" aria-hidden />
      <ul className="flex items-center gap-1">
        {locales.map((l) => {
          const current = l === locale;
          const href = asset(alternatePath(pathname, l).replace(/\/?$/, "/"));
          return (
            <li key={l}>
              {current ? (
                <span aria-current="true" className="block rounded-full px-2 py-1 text-[13px] leading-5 font-medium text-ink uppercase">
                  {l}
                </span>
              ) : (
                <a
                  href={href}
                  hrefLang={l}
                  lang={l}
                  title={localeInfo[l].name}
                  data-language-switch={l}
                  className="relative block rounded-full px-2 py-1 text-[13px] leading-5 text-muted uppercase transition-colors hover:text-ink"
                  onClick={(e) => {
                    if (window.location.hash) e.currentTarget.href = `${href}${window.location.hash}`;
                  }}
                >
                  <span aria-hidden>{l}</span>
                  <span className="sr-only">{localeInfo[l].name}</span>
                </a>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

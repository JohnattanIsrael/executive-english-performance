import type { Viewport } from "next";
import { Instrument_Sans, Newsreader } from "next/font/google";
import type { ReactNode } from "react";
import { AnalyticsScripts } from "@/components/analytics/analytics-scripts";
import { commonCopy } from "@/content/i18n/common";
import type { Locale } from "@/i18n/config";
import { LocaleProvider } from "@/i18n/locale-provider";
import "@/app/globals.css";

export const sans = Instrument_Sans({
  variable: "--font-instrument",
  subsets: ["latin"],
  display: "swap",
});

export const serif = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  display: "swap",
});

export const fontClasses = `${sans.variable} ${serif.variable} h-full antialiased`;

export const rootViewport: Viewport = {
  themeColor: "#f6f4ef",
  width: "device-width",
  initialScale: 1,
};

/** The <html> document shared by every root layout (one per language, spec 001 D1). */
export function RootDocument({ locale, children }: { locale: Locale; children: ReactNode }) {
  return (
    <html lang={locale} className={fontClasses}>
      <body className="flex min-h-full flex-col">
        <a
          href="#main"
          className="sr-only z-[100] rounded-full bg-ink px-4 py-2 text-sm text-paper focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          {commonCopy[locale].skipLink}
        </a>
        <LocaleProvider locale={locale}>{children}</LocaleProvider>
        <AnalyticsScripts />
      </body>
    </html>
  );
}

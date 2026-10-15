import type { Metadata } from "next";
import { site } from "@/config/site";
import { commonCopy } from "@/content/i18n/common";
import { defaultLocale, localeInfo, locales, type Locale } from "@/i18n/config";
import { localizePath } from "@/i18n/routes";
import { basePath } from "@/lib/utils";

export const siteUrl = `${site.url}${site.url.endsWith(basePath) ? "" : basePath}`;

/** Canonical absolute URL. Page paths get a trailing slash (trailingSlash: true); file paths don't. */
export function absoluteUrl(path = "/") {
  const isFile = /\.[a-z0-9]+$/i.test(path);
  return `${siteUrl}${path.endsWith("/") || isFile ? path : `${path}/`}`;
}

/** Absolute URL of every language version of a page, plus x-default (spec 001, FR-15). */
export function languageAlternates(path: string) {
  const languages: Record<string, string> = Object.fromEntries(
    locales.map((l) => [l, absoluteUrl(localizePath(path, l))]),
  );
  languages["x-default"] = absoluteUrl(localizePath(path, defaultLocale));
  return languages;
}

/** Root-layout defaults per language: title template, description, keywords. */
export function rootMetadata(locale: Locale): Metadata {
  const copy = commonCopy[locale].meta;
  return {
    metadataBase: new URL(`${siteUrl}/`),
    title: { default: copy.defaultTitle, template: `%s · ${site.name}` },
    description: copy.description,
    applicationName: site.name,
    keywords: copy.keywords,
    openGraph: { type: "website", siteName: site.name, locale: localeInfo[locale].ogLocale },
    formatDetection: { telephone: false, email: false, address: false },
  };
}

export function pageMetadata({
  title,
  description,
  path,
  locale = defaultLocale,
  keywords,
  noIndex,
  absoluteTitle,
}: {
  title: string;
  description: string;
  /** Language-neutral path, e.g. "/pricing". */
  path: string;
  locale?: Locale;
  keywords?: string[];
  noIndex?: boolean;
  /** Use the title as-is instead of the "%s · Brand" template. */
  absoluteTitle?: boolean;
}): Metadata {
  const url = absoluteUrl(localizePath(path, locale));
  const fullTitle = absoluteTitle ? title : `${title} · ${site.name}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    keywords,
    alternates: { canonical: url, languages: languageAlternates(path) },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: site.name,
      type: "website",
      locale: localeInfo[locale].ogLocale,
      alternateLocale: locales.filter((l) => l !== locale).map((l) => localeInfo[l].ogLocale),
    },
    twitter: { card: "summary_large_image", title: fullTitle, description },
    robots: noIndex ? { index: false, follow: false } : undefined,
  };
}

export const appMetadata = (title: string): Metadata => ({
  title,
  robots: { index: false, follow: false },
});

export function organizationJsonLd(locale: Locale = defaultLocale) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: site.name,
    description: commonCopy[locale].meta.description,
    url: absoluteUrl(localizePath("/", locale)),
    inLanguage: locale,
    availableLanguage: ["en", "es"],
    areaServed: "Worldwide",
    serviceType: [
      "Executive English coaching",
      "Business English for executives",
      "Executive communication training",
      "Corporate English training",
    ],
  };
}

export function faqJsonLd(items: { question: string; answer: string }[], locale: Locale = defaultLocale) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: locale,
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

export function serviceJsonLd(name: string, description: string, path: string, locale: Locale = defaultLocale) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    inLanguage: locale,
    provider: { "@type": "ProfessionalService", name: site.name, url: absoluteUrl(localizePath("/", locale)) },
    url: absoluteUrl(localizePath(path, locale)),
  };
}

import type { Metadata } from "next";
import { site } from "@/config/site";
import { basePath } from "@/lib/utils";

export const siteUrl = `${site.url}${site.url.endsWith(basePath) ? "" : basePath}`;

/** Canonical absolute URL. Page paths get a trailing slash (trailingSlash: true); file paths don't. */
export function absoluteUrl(path = "/") {
  const isFile = /\.[a-z0-9]+$/i.test(path);
  return `${siteUrl}${path.endsWith("/") || isFile ? path : `${path}/`}`;
}

export function pageMetadata({
  title,
  description,
  path,
  keywords,
  noIndex,
}: {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  noIndex?: boolean;
}): Metadata {
  const url = absoluteUrl(path);
  return {
    title,
    description,
    keywords,
    alternates: { canonical: url },
    openGraph: { title: `${title} · ${site.name}`, description, url, siteName: site.name, type: "website", locale: "en_US" },
    twitter: { card: "summary_large_image", title: `${title} · ${site.name}`, description },
    robots: noIndex ? { index: false, follow: false } : undefined,
  };
}

export const appMetadata = (title: string): Metadata => ({
  title,
  robots: { index: false, follow: false },
});

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: site.name,
    description: site.description,
    url: absoluteUrl("/"),
    areaServed: "Worldwide",
    serviceType: [
      "Executive English coaching",
      "Business English for executives",
      "Executive communication training",
      "Corporate English training",
    ],
  };
}

export function faqJsonLd(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

export function serviceJsonLd(name: string, description: string, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    provider: { "@type": "ProfessionalService", name: site.name, url: absoluteUrl("/") },
    url: absoluteUrl(path),
  };
}

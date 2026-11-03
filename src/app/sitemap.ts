import type { MetadataRoute } from "next";
import { locales } from "@/i18n/config";
import { localizePath, type LocalizedRoute } from "@/i18n/routes";
import { absoluteUrl, languageAlternates } from "@/lib/seo";

export const dynamic = "force-static";

type Entry = { priority: number; changeFrequency: "weekly" | "monthly" | "yearly" };

/** Every public route, in every language, with hreflang alternates (spec 001, FR-16). */
const routes: Record<LocalizedRoute, Entry> = {
  "/": { priority: 1, changeFrequency: "weekly" },
  "/executives": { priority: 0.9, changeFrequency: "monthly" },
  "/companies": { priority: 0.9, changeFrequency: "monthly" },
  "/beginners": { priority: 0.8, changeFrequency: "monthly" },
  "/learn": { priority: 0.8, changeFrequency: "monthly" },
  "/programs": { priority: 0.8, changeFrequency: "monthly" },
  "/pricing": { priority: 0.8, changeFrequency: "monthly" },
  "/how-it-works": { priority: 0.7, changeFrequency: "monthly" },
  "/ai-coach": { priority: 0.7, changeFrequency: "monthly" },
  "/assessment": { priority: 0.7, changeFrequency: "monthly" },
  "/book": { priority: 0.8, changeFrequency: "monthly" },
  "/proposal": { priority: 0.7, changeFrequency: "monthly" },
  "/about": { priority: 0.6, changeFrequency: "monthly" },
  "/results": { priority: 0.5, changeFrequency: "monthly" },
  "/faq": { priority: 0.6, changeFrequency: "monthly" },
  "/contact": { priority: 0.5, changeFrequency: "yearly" },
  "/privacy": { priority: 0.2, changeFrequency: "yearly" },
  "/credits": { priority: 0.1, changeFrequency: "yearly" },
};

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return Object.entries(routes).flatMap(([path, entry]) =>
    locales.map((locale) => ({
      url: absoluteUrl(localizePath(path, locale)),
      lastModified,
      ...entry,
      alternates: { languages: languageAlternates(path) },
    })),
  );
}

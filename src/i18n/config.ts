/**
 * Supported site languages (spec 001). English is the default and is served
 * without a URL prefix; every other locale lives under `/<locale>/`.
 */
export const locales = ["en", "es"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

/** One value per locale. Copy modules declare `es: typeof en` so shapes stay in sync. */
export type Localized<T> = Record<Locale, T>;

export const localeInfo: Record<Locale, { name: string; ogLocale: string; intl: string }> = {
  en: { name: "English", ogLocale: "en_US", intl: "en-US" },
  es: { name: "Español", ogLocale: "es_LA", intl: "es-419" },
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

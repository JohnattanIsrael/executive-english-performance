import { defaultLocale, isLocale, type Locale } from "./config";

/**
 * Public routes that exist in every locale. Links to anything else (the app
 * areas, sign-in) are never prefixed, because those pages are English only.
 */
export const localizedRoutes = [
  "/",
  "/executives",
  "/companies",
  "/beginners",
  "/how-it-works",
  "/ai-coach",
  "/programs",
  "/pricing",
  "/assessment",
  "/book",
  "/proposal",
  "/about",
  "/results",
  "/faq",
  "/contact",
  "/privacy",
  "/credits",
] as const;

export type LocalizedRoute = (typeof localizedRoutes)[number];

/** "/pricing/" → "/pricing"; keeps "/" as is. */
function normalize(path: string) {
  return path.length > 1 ? path.replace(/\/+$/, "") : path;
}

function split(href: string) {
  const i = href.search(/[?#]/);
  return i === -1 ? { path: href, rest: "" } : { path: href.slice(0, i), rest: href.slice(i) };
}

export function isLocalizedRoute(path: string) {
  return (localizedRoutes as readonly string[]).includes(normalize(path));
}

/**
 * Points an internal href at the given locale's version of the page, keeping
 * query and hash. Hash-only, external and non-localized hrefs are returned
 * unchanged.
 */
export function localizePath(href: string, locale: Locale) {
  if (locale === defaultLocale || !href.startsWith("/") || href.startsWith("//")) return href;
  const { path, rest } = split(href);
  if (!isLocalizedRoute(path)) return href;
  return `/${locale}${path === "/" ? "" : normalize(path)}${rest}`;
}

/** Splits a pathname (without basePath) into its locale and the language-neutral path. */
export function parsePathname(pathname: string): { locale: Locale; path: string } {
  const [, first, ...rest] = normalize(pathname).split("/");
  if (first && first !== defaultLocale && isLocale(first)) {
    return { locale: first, path: `/${rest.join("/")}` };
  }
  return { locale: defaultLocale, path: normalize(pathname) || "/" };
}

/** The same page in another locale, or that locale's homepage if the page isn't localized. */
export function alternatePath(pathname: string, target: Locale) {
  const { path } = parsePathname(pathname);
  return localizePath(isLocalizedRoute(path) ? path : "/", target);
}

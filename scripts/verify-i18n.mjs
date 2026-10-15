#!/usr/bin/env node
/**
 * Acceptance checks for specs/001-spanish-localization and
 * specs/002-beginners-fast-track, run against the static export in ./out.
 *
 *   npm run build && npm run verify
 *
 * Honors NEXT_PUBLIC_BASE_PATH so it also works on the GitHub Pages build.
 */
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const out = join(root, "out");
const base = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/$/, "");

if (!existsSync(out)) {
  console.error("out/ not found — run `npm run build` first.");
  process.exit(1);
}

// Single source of truth for the route list: src/i18n/routes.ts.
const routesSource = readFileSync(join(root, "src/i18n/routes.ts"), "utf8");
const block = routesSource.match(/localizedRoutes = \[([\s\S]*?)\] as const/)?.[1] ?? "";
const routes = [...block.matchAll(/"([^"]+)"/g)].map((m) => m[1]);

const failures = [];
let checks = 0;
const check = (ok, message) => {
  checks++;
  if (!ok) failures.push(message);
};

const pagePath = (locale, route) => (locale === "es" ? (route === "/" ? "/es/" : `/es${route}/`) : route === "/" ? "/" : `${route}/`);
const fileFor = (path) => join(out, path, "index.html");
const read = (path) => (existsSync(fileFor(path)) ? readFileSync(fileFor(path), "utf8") : null);
const visibleText = (html) =>
  html
    .replace(/<script[\s\S]*?<\/script>/g, " ")
    .replace(/<style[\s\S]*?<\/style>/g, " ")
    .replace(/<[^>]+>/g, " ");
const anchors = (html) => [...html.matchAll(/<a\b[^>]*>/g)].map((m) => m[0]);
const attr = (tag, name) => tag.match(new RegExp(`\\s${name}="([^"]*)"`))?.[1];

const englishSentinels = ["Book an Executive Assessment", "Skip to content", "All rights reserved"];

console.log(`Checking ${routes.length} routes × 2 languages in out/ (basePath "${base}")\n`);

for (const route of routes) {
  for (const locale of ["en", "es"]) {
    const path = pagePath(locale, route);
    const html = read(path);
    // AC-1
    check(html !== null, `[001 AC-1] missing ${path}index.html`);
    if (!html) continue;

    // AC-2
    check(html.includes(`<html lang="${locale}"`), `[001 AC-2] ${path} lacks <html lang="${locale}">`);

    // AC-3
    for (const lang of ["en", "es", "x-default"]) {
      check(new RegExp(`<link rel="alternate" hrefLang="${lang}" href="[^"]+"`).test(html), `[001 AC-3] ${path} lacks hreflang ${lang}`);
    }
    const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1] ?? "";
    check(canonical.endsWith(`${base}${path}`), `[001 AC-3] ${path} canonical is "${canonical}"`);

    // AC-4
    const other = locale === "en" ? "es" : "en";
    const switchLink = anchors(html).find((a) => attr(a, "data-language-switch") === other);
    check(switchLink && attr(switchLink, "href") === `${base}${pagePath(other, route)}`, `[001 AC-4] ${path} has no language switch to ${pagePath(other, route)}`);

    if (locale === "es") {
      // AC-5: internal links on Spanish pages stay in Spanish.
      for (const a of anchors(html)) {
        if (attr(a, "data-language-switch")) continue;
        const href = attr(a, "href") ?? "";
        if (!href.startsWith(`${base}/`) || href.startsWith(`${base}/es`)) continue;
        const target = href.slice(base.length).split(/[?#]/)[0].replace(/\/$/, "") || "/";
        check(!routes.includes(target), `[001 AC-5] ${path} links to English page ${href}`);
      }
      // AC-7
      const text = visibleText(html);
      for (const s of englishSentinels) check(!text.includes(s), `[001 AC-7] ${path} contains English text "${s}"`);
    }
  }
}

// AC-6
const sitemap = existsSync(join(out, "sitemap.xml")) ? readFileSync(join(out, "sitemap.xml"), "utf8") : "";
for (const route of routes) {
  check(sitemap.includes(`${base}${pagePath("es", route)}</loc>`), `[001 AC-6] sitemap lacks ${pagePath("es", route)}`);
}

// Spec 002
for (const locale of ["en", "es"]) {
  const prefix = locale === "es" ? "/es" : "";
  const home = read(pagePath(locale, "/")) ?? "";
  check(home.includes(`href="${base}${prefix}/beginners/"`), `[002 AC-2] ${locale} homepage doesn't link to the beginners page`);
  for (const route of ["/programs", "/pricing"]) {
    const html = read(pagePath(locale, route)) ?? "";
    check(html.includes("program=executive-fast-track"), `[002 AC-3] ${locale} ${route} doesn't show the Fast Track`);
  }
  const beginners = read(pagePath(locale, "/beginners")) ?? "";
  check(beginners.includes(`href="${base}${prefix}/book/?program=executive-fast-track"`), `[002 AC-4] ${locale} beginners page lacks the apply link`);
}

check(existsSync(join(out, "404.html")), "[001] out/404.html missing");

if (failures.length) {
  console.error(`✗ ${failures.length} of ${checks} checks failed:\n`);
  for (const f of failures) console.error(`  - ${f}`);
  process.exit(1);
}
console.log(`✓ All ${checks} checks passed.`);

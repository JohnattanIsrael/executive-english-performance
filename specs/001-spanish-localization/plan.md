# 001 — Plan

## Constraints

- `output: "export"` (GitHub Pages): no server, no Proxy/middleware, no rewrites. Every
  language version must be a prerendered file.
- English URLs must not change (FR-1).

## Decisions

### D1 — Two root layouts, English unprefixed
The documented Next.js pattern (`app/[lang]/…`) would move English to `/en/…` and needs a
redirect at `/`, which a static export can only do client-side. Instead:

```
src/app/
  (main)/layout.tsx          root layout, <html lang="en">  ← existing routes moved here
  (main)/(marketing)/…       English marketing routes (thin route files)
  (main)/dashboard|company|admin|sign-in/…   unchanged, English only
  es/layout.tsx              root layout, <html lang="es">
  es/…                       Spanish marketing routes (thin route files)
  global-not-found.tsx       bilingual 404 (required with multiple root layouts)
```

Crossing languages is a full page load (different root layouts) — acceptable for a
language switch. Both root layouts render the same `RootDocument` (fonts, skip link,
analytics) with a `locale` prop.

### D2 — Pages are implemented once, in `src/views/`
Each marketing page becomes `src/views/<page>.tsx`, exporting the page component
(`({ locale }) => …`) and a `…Metadata(locale)` function. Route files under `(main)` and
`es/` are three-line wrappers. Adding a language = adding route wrappers + copy.

### D3 — Copy lives in `src/content/`, typed by the English version
Pattern for every copy module:

```ts
const en = { … };
const es: typeof en = { … };   // FR-17: shape mismatch fails tsc
export const fooCopy = { en, es } satisfies Localized<typeof en>;
```

- Page copy: `src/content/pages/<page>.ts`.
- Shared chrome (nav, footer, CTAs, 404, form strings): `src/content/i18n/common.ts`.
- Existing content modules (`marketing`, `faq`, `founder`, `case-studies`, `forms`,
  `assessment`, `photos`) gain a Spanish variant; their current named exports stay as the
  English values so the English-only app areas don't change.
- Data with behaviour (assessment weights, program prices, scenario scripts) is **not**
  duplicated: Spanish provides text overlays keyed by id/slug/value
  (`localizeProgram`, `localizeQuestions`, `localizeScenario`).

### D4 — Locale reaches components two ways
- Server components receive `locale` as a prop from the view.
- Client components call `useLocale()`, backed by `LocaleProvider` rendered in each root
  layout. Defaults to `en`, so app areas need no change.

### D5 — Links localize themselves
`localizePath(href, locale)` prefixes `/es` only when the target is a localized route
(`localizedRoutes` in `src/i18n/routes.ts`), keeping query and hash. `ButtonLink` and a new
`LocaleLink` (drop-in for `next/link` in marketing code) apply it automatically, so
hrefs in copy and config stay language-neutral (`/book`). Satisfies FR-3.

### D6 — Language switch
`LanguageSwitch` (client) uses `usePathname()` + `alternatePath()` and renders a plain
`<a>` (full load across root layouts), with `hreflang`/`lang` (FR-5, FR-6).

### D7 — SEO
`pageMetadata({ …, locale })` builds canonical + `alternates.languages`
(`en`, `es`, `x-default`) and OG locale. Root layouts set default title template,
description and keywords per language. Sitemap emits both languages with alternates.

### D8 — Forms
- Option lists move to `src/content/forms.ts` as `{ value, label }` with stable English
  values (FR-11); labels localized.
- Zod schemas become `leadSchemas(locale)` (messages per language); the existing English
  exports remain.
- `buildLead` adds `payload.locale`; the webhook adds **Site language** (FR-12). Webhook
  labels stay English.

### D9 — Formatting
`formatPrice(price, locale)`: English unchanged (`$2,500–$5,000`), Spanish
`USD 2,500–5,000`, `Desde USD 5,000`, period `año` (FR-10).

## Verification
`scripts/verify-i18n.mjs` (`npm run verify`) asserts AC-1…AC-7 on `out/`; CI runs it after
the build.

# 001 — Tasks

- [x] T1 i18n core: `src/i18n/config.ts`, `routes.ts` (`localizePath`, `alternatePath`), `locale-provider.tsx` — D4, D5
- [x] T2 Two root layouts: move English routes to `src/app/(main)/`, add `src/app/es/layout.tsx`, shared `RootDocument`, bilingual `global-not-found.tsx` — D1, FR-1, FR-14
- [x] T3 `LocaleLink`; `ButtonLink` localizes hrefs — D5, FR-3
- [x] T4 Shared copy `src/content/i18n/common.ts` (nav, CTAs, footer, form chrome); header, footer, logo — FR-7
- [x] T5 `LanguageSwitch` in the header at every width — D6, FR-5, FR-6
- [x] T6 Spanish variants of `marketing`, `faq`, `founder`, `case-studies`, `forms`, `assessment`, photo alt text; overlays for programs and scenarios — D3, FR-7, FR-8
- [x] T7 `formatPrice(price, locale)` — D9, FR-10
- [x] T8 Forms: localized labels, options with stable values, `leadSchemas(locale)`, `locale` on leads, **Site language** in the webhook — D8, FR-11, FR-12
- [x] T9 Self-assessment and scorer take a locale — FR-7
- [x] T10 Views in `src/views/` + page copy in `src/content/pages/`; route wrappers for `en` and `es` — D2, FR-2
- [x] T11 `pageMetadata` with canonical + hreflang + OG locale; root metadata per language; sitemap with alternates — D7, FR-15, FR-16
- [x] T12 `locale` on `landing_page_view` / `pricing_viewed` — FR-13
- [x] T13 `scripts/verify-i18n.mjs` (`npm run verify`) covering AC-1…AC-7; CI step — Verification
- [x] T14 Manual checks: header at 1280/1440 and 390px, Spanish beginners and pricing pages, English text diff against the previous build (only intended changes) — AC-10
- [ ] T15 Native-speaker editorial review of the Spanish copy; counsel review of `/es/privacy` — Assumptions
- [ ] T16 Manual form run-through in Spanish with the live Formspree endpoint — AC-8, AC-9

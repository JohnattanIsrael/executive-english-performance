# 002 — Plan

- **Catalogue** — add `executive-fast-track` to `src/config/programs.ts` (English) and its
  Spanish overlay in `src/content/programs.ts`. Pricing, admin editing and lead
  deal-value estimation pick it up automatically through `PricingService` and
  `estimateDealValue` (FR-1, FR-5).
- **Page** — `src/views/beginners.tsx` + copy in `src/content/pages/beginners.ts`; route
  wrappers `src/app/(main)/(marketing)/beginners/page.tsx` and `src/app/es/beginners/page.tsx`.
  Register `/beginners` in `localizedRoutes` and the sitemap (FR-2, FR-9).
- **Discovery** — homepage `BeginnersSection` (`src/components/marketing/sections.tsx`),
  nav and footer entries in `src/content/i18n/common.ts`, program detail block on
  `/programs`, card on `/pricing` (FR-3, FR-4).
- **Form** — `beginner` option in `englishUsageOptions`; `?program=executive-fast-track`
  already flows into the hidden `program` field (FR-5, FR-6).
- **FAQ** — update "Do I need advanced English?" in both languages (FR-7).
- **Verification** — beginners route included in `npm run verify`, plus AC-2…AC-4 checks.

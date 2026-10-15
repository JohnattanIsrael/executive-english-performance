# 001 — Spanish version of the public site

- **Status:** Implemented
- **Date:** 2026-10-15

## Problem

A large share of the people this business serves are Spanish-speaking professionals
who work with US, Canadian and European companies — and the HR and L&D buyers who fund
their development. Today the site exists only in English, so a Spanish-speaking buyer
(often the person signing off on a corporate program) has to evaluate a premium service
in their second language. The site needs a complete, first-class Spanish version.

## Users and stories

- **US-1** As a Spanish-speaking executive, I can read the whole public site in Spanish, so
  I understand exactly what the programs offer before I book an assessment.
- **US-2** As an HR/L&D manager in a Spanish-speaking company, I can request a corporate
  proposal through a Spanish form, so I can share the page with colleagues who don't read
  English.
- **US-3** As any visitor, I can switch between English and Spanish from any page and land
  on the same page in the other language.
- **US-4** As the business owner, every lead tells me which language the visitor used,
  while the notification email and CRM fields stay in English and use the same values in
  both languages.
- **US-5** As the business owner, search engines index both languages and understand they
  are translations of each other.

## Functional requirements

### Routing
- **FR-1** English stays at the current URLs (no prefix). Spanish lives under `/es/`, with
  the same path after the prefix (e.g. `/pricing/` ↔ `/es/pricing/`).
- **FR-2** Every public marketing route has a Spanish counterpart: `/`, `/executives`,
  `/companies`, `/how-it-works`, `/ai-coach`, `/programs`, `/pricing`, `/about`, `/results`,
  `/faq`, `/contact`, `/privacy`, `/credits`, `/book`, `/proposal`, `/assessment` — plus any
  public route added later (e.g. `/beginners`, spec 002).
- **FR-3** Internal links on a Spanish page point to the Spanish version of the target when
  one exists, and to the English route otherwise (app areas, sign-in).
- **FR-4** No automatic language redirect. The site is a static export; the language is
  chosen by URL and the visitor's switch.

### Language switch
- **FR-5** The header (desktop and mobile menu) shows a language switch that links to the
  current page in the other language, preserving `#hash` where present.
- **FR-6** The switch is a real link (works without JavaScript), labels the target language
  in its own language ("English" / "Español") and marks it with `hreflang` and `lang`.

### Content
- **FR-7** All visible copy on Spanish pages is in Spanish: navigation, footer, page copy,
  program catalogue and prices labels, FAQ, forms (labels, hints, options, validation
  messages, success states), the self-assessment (questions, options, profile results),
  example scenarios, image alt text, 404 page, skip link and ARIA labels.
- **FR-8** Brand name *Executive English Performance* is not translated.
- **FR-9** Register: neutral Latin American Spanish, formal **usted**, matching the premium
  executive tone of the English site. No claims are added that the English site doesn't
  make (no invented statistics, testimonials or guarantees). Placeholder notes stay
  visibly marked as placeholders.
- **FR-10** Prices remain in USD. Spanish formatting: `USD 2,500–5,000`, `Desde USD 5,000`.

### Forms and leads
- **FR-11** Form submissions from Spanish pages send the same field values as English (e.g.
  `contactMethod=video`, `startDate=asap`), so the CRM mapping is language-independent.
- **FR-12** Every lead records the site language (`locale: "en" | "es"`), shown in the
  notification as **Site language**.
- **FR-13** Analytics events that already carry a page path also carry `locale`.

### SEO and accessibility
- **FR-14** `<html lang>` is `en` on English pages and `es` on Spanish pages.
- **FR-15** Every page declares its canonical URL and `hreflang` alternates for `en`, `es`
  and `x-default` (→ English). Open Graph locale is `en_US` / `es_LA`.
- **FR-16** The sitemap lists both language versions of every public page with their
  alternates. App areas remain disallowed in `robots.txt`.

### Type safety
- **FR-17** Spanish copy is type-checked against the English copy, so a missing key or a
  wrong shape fails `tsc` / `next build`.

## Acceptance criteria

- **AC-1** *(automated)* For every route in FR-2, `out/<route>/index.html` and
  `out/es/<route>/index.html` exist.
- **AC-2** *(automated)* English pages have `<html lang="en">`, Spanish pages `<html lang="es">`.
- **AC-3** *(automated)* Each page in AC-1 contains `hreflang` alternates for `en`, `es` and
  `x-default`, and a canonical link to itself.
- **AC-4** *(automated)* Each Spanish page links to its English counterpart via the
  language switch and vice versa.
- **AC-5** *(automated)* No Spanish page contains an internal `href` to an English
  marketing route (i.e. a localized route without the `/es` prefix), except the language
  switch.
- **AC-6** *(automated)* `out/sitemap.xml` contains the Spanish URL of every route in FR-2.
- **AC-7** *(automated)* Spanish pages contain no leftover English sentinel strings from
  the shared chrome ("Book an Executive Assessment", "Skip to content", "All rights
  reserved").
- **AC-8** *(manual)* Submitting each Spanish form with empty fields shows Spanish
  validation messages; a valid submission shows a Spanish success state and the lead
  carries `locale: "es"` with English option values.
- **AC-9** *(manual)* The Spanish self-assessment runs end to end in Spanish.
- **AC-10** *(manual)* Header fits on one line at 1280px and 1440px in both languages (the
  desktop nav shows from 1280px; below that, the menu button). The language switch is
  visible at every width.
- **AC-11** `npm run lint` and `npm run build` pass.

## Out of scope

- Spanish versions of the client, company and admin app areas and the sign-in page (demo
  workspaces on sample data; they stay English).
- Translated URL slugs (`/es/precios/`). Can be added later behind the same path helper.
- Automatic language detection or redirects; remembering the language choice.
- Additional languages (the design must allow adding one without restructuring).

## Assumptions

- Spanish copy is a professional first draft written for the business; it should be
  reviewed by a native-speaking editor before launch, as the English copy was.
- The privacy notice translation inherits the English draft's status: it must be reviewed
  by counsel before launch.

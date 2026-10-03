# Executive English Performance

Website and SaaS foundation for a premium executive English communication business:
**human coaching + executive scenarios + AI-assisted practice**.

> You don't need more English lessons. You need to communicate better when it matters.

The site is built so the business can sell the high-ticket human service **today** while
the AI platform is developed in parallel. Everything that is not live yet is labeled as
such in the UI.

## Stack

- Next.js 16 (App Router, static export) · React 19 · TypeScript (strict)
- Tailwind CSS v4 (design tokens in `src/app/globals.css`)
- Zod (form validation) · lucide-react (icons)
- No chart library — small accessible SVG/HTML chart primitives in `src/components/ui/charts.tsx`

## Getting started

```bash
npm install
cp .env.example .env.local   # optional
npm run dev                  # http://localhost:3000
npm run build                # static export to ./out
npm run lint
```

## What's included

| Area | Routes |
| --- | --- |
| Marketing | `/` `/executives` `/companies` `/how-it-works` `/ai-coach` `/programs` `/pricing` `/about` `/results` `/faq` `/contact` `/privacy` |
| Conversion | `/book` (Executive Assessment) · `/proposal` (Corporate Proposal) · `/assessment` (self-assessment) · `/ai-coach#early-access` |
| Client app | `/dashboard` + `profile` `assessment` `practice` `scenarios` `progress` `coaching` `messages` `settings` |
| Company app | `/company` + `employees` `programs` `progress` `reports` `settings` |
| Admin | `/admin` (CRM pipeline) + `users` `coaches` `scenarios` `content` `programs` |
| Auth | `/sign-in` (mocked; opens the demo workspace) |

The app areas run on clearly labeled **sample data**. The practice simulation uses a
scripted counterpart and rule-based text signals (length, softeners, fillers,
structure) — explicitly labeled as *not* an AI evaluation.

## Architecture

```
src/
  app/                 Routes. (marketing) group shares header/footer; dashboard/company/admin share AppShell
  components/
    ui/                Primitives: Button, Field, Badge, charts (Meter, StatTile, Sparkline, BarChart)
    marketing/         Page sections, hero visual, program cards, FAQ
    forms/             Lead forms + useLeadForm (validate → build CRM lead → LeadService)
    app/               AppShell, scenario library, simulation player, pipeline board, pricing editor
    assessment/        Self-assessment flow (public + dashboard)
  config/              site.ts (brand, nav, contact) · programs.ts (single source of all pricing)
  content/             Marketing copy, FAQ, founder placeholders, case-study framework, assessment questions
  lib/
    types.ts           Domain model shared by UI and services
    services/
      contracts.ts     AuthService, AssessmentService, ScenarioService, ConversationService,
                       FeedbackService, ProgressService, CoachingService, NotificationService,
                       LeadService, PricingService, CompanyService, AdminService
      mock/            Implementations over sample data (swap for real APIs)
      index.ts         Service registry — the one switch between mock and real backends
    crm/pipeline.ts    Pipeline stages, lead builder, attribution (page/referrer/UTM), deal-value heuristic
    analytics/         Typed event catalogue + provider-agnostic track()
    validation/        Zod schemas for every form
    seo.ts             Metadata helpers, JSON-LD (ProfessionalService, Service, FAQPage)
  mocks/               All sample data, separated from application logic
```

**UI never imports mock data directly** — pages call `services.*`. To connect a backend,
implement the interfaces in `src/lib/services/contracts.ts` (you can mix real and mock
services) and select them in `src/lib/services/index.ts`.

### Planned AI pipeline (not live)

`ScenarioService.generate` → `ConversationService.respond` → `FeedbackService.analyze` →
`FeedbackService.identifyPatterns` → `ScenarioService.recommend` →
`ProgressService.updateProfile` → `CoachingService.getCoachInsights`.
The simulation player already drives `ConversationService`/`FeedbackService`, so swapping
in LLM, speech-to-text and text-to-speech providers requires no UI changes.

### Leads & CRM

Forms produce a CRM-ready `Lead` (segment, source/UTM, company, role, challenge,
estimated deal value, stage, proposal & customer status). Pipeline:
`New Lead → Qualified → Assessment → Proposal → Won → Active → Renewal`.

- **Delivery is configured with Formspree.** The repository variable
  `NEXT_PUBLIC_LEAD_WEBHOOK_URL` holds the form endpoint; every submission is POSTed as flat,
  human-readable JSON (`src/lib/crm/webhook.ts`) with `_subject`, `name` and `email`
  (reply-to), so notification emails read well. Any JSON endpoint works instead —
  Zapier/Make, a CRM or your own API — by changing that variable and re-running the deploy.
- A hidden honeypot field (`_gotcha`) silently drops bot submissions.
- A copy is kept in the visitor's browser so the demo `/admin` pipeline shows submissions
  made on the same device. **Without the variable, leads are not delivered anywhere.**

### Analytics

Events (typed in `src/lib/analytics/events.ts`): `landing_page_view`, `pricing_viewed`,
`pricing_tier_clicked`, `assessment_started`, `assessment_completed`, `consultation_booked`,
`corporate_inquiry_submitted`, `early_access_signup`, `contact_submitted`, `cta_clicked`,
`simulation_started`, `simulation_completed`.
Choose a provider with `NEXT_PUBLIC_ANALYTICS_PROVIDER` = `none | console | ga4 | plausible | posthog`.

## Photography

13 photos from [Unsplash](https://unsplash.com), each checked to be free under the
[Unsplash License](https://unsplash.com/license) (no Unsplash+ images), self-hosted as
pre-sized WebP in `public/images/photos/` and registered in `src/content/photos.ts`
(alt text, photographer, source). Render them with `<Photo>` / `<PhotoFrame>` from
`src/components/ui/photo.tsx`; credits are listed on `/credits`. People pictured are
illustrative — never present them as clients, coaches or the founder. The founder
portrait remains a placeholder until real photography is supplied.

## Before launch — replace placeholders

The `/admin/content` page lists everything. In short:

- `src/content/founder.ts` — founder name, portrait, bio, credentials (all bracketed placeholders)
- `src/content/case-studies.ts` — sample case studies → verified client data with permission
- `src/config/site.ts` — contact email and location
- `src/config/programs.ts` — confirm pricing
- `src/app/(marketing)/privacy/page.tsx` — have the privacy notice reviewed by counsel
- `NEXT_PUBLIC_LEAD_WEBHOOK_URL` — connect lead delivery

No testimonials, statistics, client logos or credentials are invented anywhere on the site.

## Deployment

### GitHub Pages (configured)

`.github/workflows/deploy.yml` builds the static export on every push to `main` and
deploys it with GitHub Pages. The base path and site URL come from the Pages
configuration automatically. Optional integrations are read from repository
**variables** (`NEXT_PUBLIC_LEAD_WEBHOOK_URL`, `NEXT_PUBLIC_BOOKING_URL`,
`NEXT_PUBLIC_ANALYTICS_PROVIDER`, …).

### Cloudflare Pages (alternative)

Build command `npm run build`, output directory `out`, environment variable
`NODE_VERSION=22`. Set `NEXT_PUBLIC_SITE_URL` to the Pages URL; leave
`NEXT_PUBLIC_BASE_PATH` empty.

### When the backend arrives

Static export cannot run server code. When adding authentication, payments, a database
or AI APIs, remove `output: "export"` from `next.config.ts` and deploy to a Node-capable
host (e.g. Vercel), then implement real services behind the existing contracts.

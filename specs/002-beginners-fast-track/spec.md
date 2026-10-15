# 002 — Executive Fast Track for beginners

- **Status:** Implemented
- **Date:** 2026-10-15
- **Depends on:** 001 (ships in English and Spanish)

## Problem

Every current program assumes the client already works in English. A recurring group is
left out: capable executives and senior professionals whose English is basic — often
newly reporting to a US or European parent, joining an international role, or starting to
face international clients — who need to become functional at work **fast**, not after a
year of general classes. The FAQ already says "No specific level should be assumed", but
the site offers them nothing specific.

## Positioning

The site's message is *"You don't need more English lessons."* The Fast Track must not
contradict it. It is **not** a general beginners' course: it teaches only the English a
leader needs for their own work situations, in an intensive, coached format, and it is the
on-ramp to the Executive Performance Program.

## Users and stories

- **US-1** As an executive with beginner-level English, I can find a program that is clearly
  meant for me from the homepage, the navigation, the programs page and the pricing page.
- **US-2** As that executive, I can read on a dedicated page what I will be able to do, how
  the weeks are structured, what the time commitment is, and what it costs.
- **US-3** As that executive, I can apply for the Fast Track in one click, and the
  assessment request records that I'm interested in it.
- **US-4** As an HR manager, I can see whether the Fast Track fits employees whose English
  is basic.

## Functional requirements

- **FR-1** New program in the catalogue (`src/config/programs.ts`, single source of
  pricing): slug `executive-fast-track`, audience B2C, duration 8 weeks, status available.
  Shown on `/programs` and `/pricing` like other programs, and editable in `/admin/programs`.
- **FR-2** New page `/beginners` (and `/es/beginners`) with:
  1. hero stating who it's for and the fast-paced format, with an apply CTA;
  2. "Is this for you?" — fit criteria and an honest "not for you if" list;
  3. outcomes — what participants work towards being able to do at work;
  4. the 8-week plan in four phases;
  5. weekly rhythm — time commitment;
  6. the program card (price, includes) and the path into the Executive Performance
     Program;
  7. FAQ specific to beginners;
  8. closing CTA.
- **FR-3** Homepage gets a "For beginners" section that links to `/beginners`.
- **FR-4** Main navigation and footer include the page ("Beginners" / "Principiantes").
- **FR-5** Apply CTA links to `/book?program=executive-fast-track`; the lead notification
  shows the program name, and the deal-value estimate uses the program's price.
- **FR-6** The executive assessment form offers a "Beginner — I'm starting to use English at
  work" usage option so beginners can describe themselves accurately.
- **FR-7** The FAQ answer "Do I need advanced English?" points beginners to the Fast Track.
- **FR-8** Copy is honest about pace and outcomes: no "fluent in 8 weeks", no guaranteed
  level jump. Levels are described in plain language with CEFR as a reference (A1–A2 at
  entry, working towards B1) and labelled as a reference, not a certification.
- **FR-9** The page is in the sitemap and has page metadata, hreflang alternates and
  `Service` JSON-LD like the other program pages.

## Acceptance criteria

- **AC-1** *(automated)* `out/beginners/index.html` and `out/es/beginners/index.html` exist
  and pass the spec 001 checks.
- **AC-2** *(automated)* The homepage (both languages) links to the beginners page.
- **AC-3** *(automated)* `/programs` and `/pricing` (both languages) show the Fast Track.
- **AC-4** *(automated)* The beginners page contains a link to
  `/book?program=executive-fast-track` (Spanish: `/es/book?program=…`).
- **AC-5** *(manual)* Header still fits on one line at 1280px with the extra nav item in both
  languages.
- **AC-6** `npm run lint` and `npm run build` pass.

## Assumptions (business to confirm)

- **Price** USD 1,800–3,200, illustrative like every other price on the site, depending on
  session frequency.
- **Format** 8 weeks; three 45-minute private coaching sessions per week plus about 20
  minutes of daily guided practice (~4 hours/week).
- **Name** "Executive Fast Track" (Spanish: "Fast Track Ejecutivo"), subtitle "English
  foundations for leaders" / "Inglés esencial para líderes".

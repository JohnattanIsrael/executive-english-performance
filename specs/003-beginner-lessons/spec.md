# 003 — Beginner focus and free interactive lessons

- **Status:** Implemented
- **Date:** 2026-11-02
- **Depends on:** 001 (ships in English and Spanish), 002 (the Fast Track is the coached path)

## Problem

The site speaks almost only to people with high-stakes English needs: executives, leadership
teams and — since 002 — beginner executives. Many visitors are simply **beginners**: they are
starting English for a new job, travel, studies or everyday life. Nothing on the site lets them
start, try the method or feel welcome, and there is nothing to *do* on the site without filling
in a form.

## Positioning

Beginners are welcome whatever the stakes. The site offers two ways to start:

1. **Free interactive lessons** — self-paced, no sign-up, for anyone starting out.
2. **The Executive Fast Track** (002) — coached and intensive, for people who need English at
   work fast.

The free lessons are a genuine learning tool, not a sales gate: no email is required to play.

## Users and stories

- **US-1** As a beginner (for any reason), I can find a clearly signposted place to start from
  the homepage, the navigation and the beginners page.
- **US-2** As a beginner, I can play short lessons on five beginner topics, each with a
  learning step and exercises, and get immediate, friendly feedback.
- **US-3** As a Spanish speaker, I get instructions and translations in Spanish while the
  content I learn stays in English.
- **US-4** As a returning visitor, I can see which lessons I have completed and my best score.
- **US-5** As a beginner who wants more, I can see how to continue with a coach.

## Functional requirements

- **FR-1** New page `/learn` (and `/es/learn`) with: a hero, the lesson library, how the
  lessons work, the two ways to continue (free lessons / Fast Track), and a closing CTA.
- **FR-2** At least five lessons on beginner topics: greetings and introductions; numbers and
  time; the verb *to be*; colors and everyday things; ordering at a café.
- **FR-3** Each lesson has: an intro, a *learn* step (animated flashcards with the word, a
  picture, an example and — in Spanish — a translation), a *practice* step with at least five
  exercises, and a results screen (score, stars, mistakes reviewed).
- **FR-4** Exercises use at least five interaction types across the library: multiple choice,
  listen-and-choose, build-the-sentence (word tiles), match pairs, type the missing word, and
  set the clock.
- **FR-5** Audio uses the browser's speech synthesis (no external service). When it isn't
  available, listening controls are hidden or degrade gracefully and lessons stay playable.
- **FR-6** Feedback is immediate and animated; a wrong answer shows the correct one and the
  exercise comes back once at the end of the lesson.
- **FR-7** Progress (completed, best score) is stored only in the visitor's browser
  (`localStorage`), never sent anywhere. A lesson can be deep-linked with `/learn#<lesson-id>`.
- **FR-8** Motion respects `prefers-reduced-motion`; everything is keyboard-operable, and the
  player is a labelled dialog that can be closed with Escape.
- **FR-9** The homepage shows a beginner entry point near the top and a "two ways to start"
  section. Main navigation and footer link to the lessons. The beginners page links to the
  lessons and its copy welcomes beginners who aren't executives.
- **FR-10** Analytics: `lesson_started` and `lesson_completed` events (lesson id, score).
- **FR-11** Page metadata, hreflang alternates and sitemap entry like other public pages.

## Acceptance criteria

- **AC-1** *(automated)* `out/learn/index.html` and `out/es/learn/index.html` exist and pass the
  spec 001 checks.
- **AC-2** *(automated)* The homepage (both languages) links to the lessons page.
- **AC-3** *(automated)* The lessons page lists at least five lessons (`data-lesson-id`).
- **AC-4** *(automated)* The beginners page (both languages) links to the lessons page.
- **AC-5** *(manual)* Every lesson can be completed with keyboard only, on a 375px-wide screen
  and with reduced motion enabled.
- **AC-6** *(manual)* Header still fits on one line at 1280px in both languages.
- **AC-7** `npm run lint` and `npm run build` pass.

## Out of scope

Accounts, server-side progress, speech recognition, paid self-paced courses.

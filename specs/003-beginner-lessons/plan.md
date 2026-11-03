# 003 — Plan

## Decisions

- **D1 — One page, in-page player.** `/learn` is a normal localized route (so spec 001's
  checks, hreflang and the sitemap apply unchanged). Lessons open in a full-screen dialog
  instead of separate routes; the open lesson is the URL hash (`/learn#cafe`), read with
  `useSyncExternalStore`. Opening pushes a history entry, so Back closes the player.
- **D2 — Content as data.** `src/content/lessons.ts` holds every lesson: cards, exercises
  (a discriminated union by `kind`), accent colors. English content is shared; instructions
  are `{ en, es }`; `gloss` (Spanish) is shown only on `/es`. Adding a lesson is data-only.
- **D3 — Pure engine.** `components/lessons/engine.ts` builds the practice queue and checks
  answers. Shuffling is seeded (lesson id + attempt), so render stays pure and lint-clean.
  A wrong answer re-queues the exercise once; the score counts first-try answers.
- **D4 — No new dependencies.** Animations are CSS keyframes registered in the Tailwind theme
  (`globals.css`): pop, shake, float, sheet, slide-in, confetti, wave, orbit, tick. 3D card
  flips use Tailwind's `transform-3d` / `backface-hidden`. The global reduced-motion rule
  already neutralizes them.
- **D5 — Audio with `speechSynthesis`.** `speech.ts` picks an en-US voice when available.
  Unsupported browsers hide speaker buttons; listening exercises show the text instead.
- **D6 — Progress in `localStorage`** (`eep-lessons-v1`) via a tiny external store, so the
  library updates as soon as a lesson ends and across tabs.
- **D7 — Beginner focus elsewhere.** Homepage: "New" pill in the hero and the beginners
  section moved up and redesigned as "two ways to start". Nav and footer gain "Free
  Lessons". `/beginners` gets a "start free" band and a FAQ for non-work beginners. To keep
  the header on one line at 1280px with the extra item, nav gaps shrink and the header
  "Sign in" link appears from `2xl` (it stays in the mobile menu and footer).

## Files

```
src/content/lessons.ts                      lesson data (5 lessons)
src/content/pages/learn.ts                  page + player copy (en/es)
src/components/lessons/engine.ts            queue, shuffling, checking, scoring
src/components/lessons/speech.ts            text-to-speech hook
src/components/lessons/progress.ts          localStorage progress store
src/components/lessons/visuals.tsx          clock, visuals, sound button, confetti, stars, score ring
src/components/lessons/exercises.tsx        choice, listen, order, match, type, clock
src/components/lessons/lesson-player.tsx    dialog: intro → flashcards → practice → results
src/components/lessons/lesson-library.tsx   lesson grid, hash routing, progress
src/components/lessons/lessons-hero-visual.tsx
src/views/learn.tsx + app/(main)/(marketing)/learn, app/es/learn
```

# Specs

Features in this repository are built **spec-first**. Each feature gets a numbered folder:

| File | Purpose |
| --- | --- |
| `spec.md` | *What* and *why*: user stories, functional requirements (`FR-…`), acceptance criteria (`AC-…`), scope, assumptions. No implementation detail. |
| `plan.md` | *How*: architecture decisions, file layout, data flow, trade-offs. Must satisfy every `FR-…`. |
| `tasks.md` | Ordered, checkable implementation steps, each traced to the requirements it serves. |

Workflow: **spec → plan → tasks → implement → verify**. A change in behavior starts with a
change to the spec. Acceptance criteria marked *(automated)* are checked by
`npm run verify` against the static export in `out/` (run `npm run build` first); the rest
are checked by hand and ticked in `tasks.md`.

| # | Feature | Status |
| --- | --- | --- |
| [001](001-spanish-localization/spec.md) | Spanish version of the public site | Implemented |
| [002](002-beginners-fast-track/spec.md) | Executive Fast Track for beginners | Implemented |

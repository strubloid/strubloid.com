# Tasks: Fix Localhost — Modernize strubloid.com

**Input**: Design documents from `/specs/001-fix-localhost/`
**Prerequisites**: plan.md (required), spec.md (required), research.md, quickstart.md

**Tests**: Not requested — no test tasks included.

**Organization**: Tasks grouped by user story to enable independent implementation and testing.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1, US2, US3, US4)
- Exact file paths included in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Update package.json to target modern Node.js and replace broken dependencies before installing anything       

- [ ] T001 Update `engines` field from `"node": "12.18.2"` / `"npm": "6.14.5"` to `"node": ">=20"` / `"npm": ">=9"` in package.json
- [ ] T002 Replace `"node-sass": "4.14.1"` with `"sass": "^1.77.0"` in dependencies in package.json
- [ ] T003 Upgrade `"react-scripts": "3.4.1"` to `"react-scripts": "5.0.1"` in dependencies in package.json
- [ ] T004 Update `scripts.dev` from `"nodemon Server.js"` to `"react-scripts start"` in package.json
- [ ] T005 Update SCSS CLI scripts in package.json: change `compile-sass` to `"sass src/assets/scss/now-ui-kit.scss src/assets/css/now-ui-kit.css"`, `minify-sass` to `"sass src/assets/scss/now-ui-kit.scss src/assets/css/now-ui-kit.min.css --style=compressed"`, `map-sass` to `"sass src/assets/scss/now-ui-kit.scss src/assets/css/now-ui-kit.css --source-map"`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Fix SCSS compile errors that block the dev server from rendering pages, then perform a clean install

**⚠️ CRITICAL**: The `/` division syntax in `_variables.scss` causes a hard compile error under Dart Sass. Without this fixx, no page renders — the CRA error overlay blocks all content.

- [ ] T006 Add `@use "sass:math";` at the top of the file and replace `/` division with `math.div()` on lines 240–241 (`$font-paragraph: 1.61em` expressions) in src/assets/scss/now-ui-kit/_variables.scss
- [ ] T007 [P] Fix mixed-unit arithmetic by adding explicit `px` unit on line 289 in src/assets/scss/now-ui-kit/_inputs.scss
- [ ] T008 [P] Fix mixed-unit arithmetic by adding explicit `px` unit on line 91 in src/assets/scss/now-ui-kit/_info-areas.scss
- [ ] T009 Delete node_modules/ and package-lock.json, then run `npm install` to create a fresh dependency tree with the updated packages

**Checkpoint**: Foundation ready — `npm install` completes with zero errors, all SCSS compile blockers resolved

---

## Phase 3: User Story 1 — Install and Boot the Site Locally (Priority: P1) 🎯 MVP

**Goal**: Clone → install → start dev server → see Presentation page at localhost:3000

**Independent Test**: Run `npm install` followed by `npm run dev` on Node 20+. Open `http://localhost:3000` and verify the page is not blank and the browser console has no fatal errors.

### Implementation for User Story 1

- [ ] T010 [US1] Run `npm run dev` and verify the CRA dev server starts and reports listening on port 3000
- [ ] T011 [US1] Open http://localhost:3000 in a browser and verify the Presentation page renders with visible content (header, sections, footer) and no uncaught JavaScript errors in the console

**Checkpoint**: Site boots and loads — the MVP is complete. This validates Phase 1 + Phase 2 changes end-to-end.

---

## Phase 4: User Story 2 — Navigate All Existing Pages (Priority: P2)

**Goal**: All six routes render their pages with navbar, main content, and footer — no blank screens or crashes

**Independent Test**: With the dev server running, manually visit each route and confirm content renders with navigation bar, main content area, and footer visible.

### Implementation for User Story 2

- [ ] T012 [P] [US2] Verify `/presentation` route renders the landing page with main header, frontend work history, GitHub section, about-me block, and footer
- [ ] T013 [P] [US2] Verify `/about-me` route renders with navbar, info cards, project section, and footer
- [ ] T014 [P] [US2] Verify `/blog-posts` route renders with article preview cards and footer
- [ ] T015 [P] [US2] Verify `/blog-post` route renders with article content, social share section, and footer
- [ ] T016 [P] [US2] Verify `/contact-me` route renders with contact form (name, email, phone, message fields) and footer — map area may show placeholder
- [ ] T017 [P] [US2] Verify `/login` route renders with username and password fields and footer
- [ ] T018 [US2] Verify navigation bar is present on every page and supports client-side routing between pages without full-page reload

**Checkpoint**: All six routes confirmed working. Full site navigation restored.

---

## Phase 5: User Story 3 — SCSS Compiles Without Errors (Priority: P3)

**Goal**: SCSS theme compiles cleanly during build, producing valid CSS that matches the Now UI Kit design

**Independent Test**: Run `npm run build` and verify SCSS compiles without errors. Visually confirm styled elements on all pages.

### Implementation for User Story 3

- [ ] T019 [US3] Run `npm run build` and confirm zero SCSS compilation errors in the output (deprecation warnings for `@import` and `lighten()`/`darken()` are expected and acceptable)
- [ ] T020 [US3] Verify pages display Now UI Kit styled elements: coloured buttons, card layouts, responsive grid, and correct typography
- [ ] T021 [P] [US3] Verify component-level SCSS files (History.scss, Github.scss, Presentation.scss, MainHeader.scss) are included in the build and their styles are applied

**Checkpoint**: Theme fully functional. All pages render with intended styling.

---

## Phase 6: User Story 4 — Visual Fidelity on the Presentation Page (Priority: P4)

**Goal**: Presentation page looks and behaves the same as the original design — parallax, images, GitHub buttons, and no map crashes

**Independent Test**: Load `/presentation`, scroll to verify parallax, check GitHub buttons render, confirm all images load. Visit `/contact-me` to verify no crash from missing Google Maps API key.

### Implementation for User Story 4

- [ ] T022 [US4] Add a `MapErrorBoundary` class component (~15 lines) that catches Google Maps load errors and renders a static fallback, then wrap the existing `<MapWrapper>` with it in src/components/Strubloid/Contact/ContactMe.jsx
- [ ] T023 [US4] Verify parallax scrolling effect works on the Presentation page header — background moves at a different speed than page content (Rellax library)
- [ ] T024 [P] [US4] Verify GitHub star/fork buttons from buttons.github.io render and are clickable on the Presentation page
- [ ] T025 [P] [US4] Verify all referenced images on the Presentation page load without broken-image placeholders and display at intended sizes

**Checkpoint**: Visual fidelity confirmed. No regressions from modernization.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Validate production build workflow and complete end-to-end quickstart verification

- [ ] T026 Run `npm run build` and verify the production bundle is created in the build/ folder
- [ ] T027 Serve the production build via `node Server.js` and verify the site loads at http://localhost:3000
- [ ] T028 Run the complete quickstart.md validation end-to-end: fresh install, dev server start, all 6 routes, console error check, parallax check, production build

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — start immediately
- **Foundational (Phase 2)**: Depends on Setup — T006/T007/T008 can run in parallel (different files) but T009 must run after all file edits
- **US1 (Phase 3)**: Depends on Foundational (T009 npm install must succeed first) — **BLOCKS all subsequent stories**     
- **US2 (Phase 4)**: Depends on US1 (dev server must be running)
- **US3 (Phase 5)**: Depends on US1 (can run in parallel with US2 — uses `npm run build` not dev server)
- **US4 (Phase 6)**: Depends on US1 (dev server must be running); T022 is a code change, T023–T025 are verification        
- **Polish (Phase 7)**: Depends on all user stories complete

### User Story Dependencies

- **US1 (P1)**: Can start after Foundational (Phase 2) — no dependencies on other stories
- **US2 (P2)**: Requires US1 to be running — no code changes, pure verification
- **US3 (P3)**: Requires Phase 2 SCSS fixes — can run in parallel with US2 (build command, not dev server)
- **US4 (P4)**: Requires US1 running — T022 (error boundary) is the only code change in this phase

### Within Each User Story

- Phase 1 tasks are sequential (all edit the same file: package.json)
- Phase 2: T006, T007, T008 can run in parallel (different .scss files), T009 must follow
- Phase 3: T010 before T011 (server must start before browser check)
- Phase 4: T012–T017 can run in parallel, T018 depends on visiting all pages
- Phase 5: T019 before T020/T021
- Phase 6: T022 first (code change), T023–T025 can run in parallel after

### Parallel Opportunities

```text
# Phase 2 — SCSS fixes in parallel (different files):
T006: Fix _variables.scss (division → math.div)
T007: Fix _inputs.scss (mixed-unit)
T008: Fix _info-areas.scss (mixed-unit)

# Phase 4 — Route verification in parallel:
T012: /presentation
T013: /about-me
T014: /blog-posts
T015: /blog-post
T016: /contact-me
T017: /login

# Phase 5 and Phase 4 can overlap:
US3 (npm run build) can run while US2 (dev server routes) is being verified

# Phase 6 — Visual checks in parallel after T022:
T023: Parallax effect
T024: GitHub buttons
T025: Image loading
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (5 edits to package.json)
2. Complete Phase 2: Foundational (3 SCSS fixes + clean install)
3. Complete Phase 3: User Story 1 (boot + verify)
4. **STOP and VALIDATE**: Site loads at localhost:3000 with visible content
5. This is the MVP — the site works on localhost

### Incremental Delivery

1. Setup + Foundational → Package configuration complete
2. User Story 1 → Site boots (MVP!)
3. User Story 2 → All routes confirmed working
4. User Story 3 → Build succeeds, theme applied
5. User Story 4 → Error boundary added, visual fidelity confirmed
6. Polish → Production build validated, quickstart verified

### Files Modified (5 total)

| File | Phase | Change |
|------|-------|--------|
| `package.json` | Phase 1 | engines, deps (node-sass→sass, react-scripts 3→5), scripts |
| `src/assets/scss/now-ui-kit/_variables.scss` | Phase 2 | `@use "sass:math"` + `math.div()` on L240–241 |
| `src/assets/scss/now-ui-kit/_inputs.scss` | Phase 2 | Add `px` unit on L289 |
| `src/assets/scss/now-ui-kit/_info-areas.scss` | Phase 2 | Add `px` unit on L91 |
| `src/components/Strubloid/Contact/ContactMe.jsx` | Phase 6 | Add `MapErrorBoundary` wrapping `<MapWrapper>` |

---

## Notes

- [P] tasks = different files, no dependencies on each other
- [Story] label maps task to specific user story for traceability
- SCSS deprecation warnings (`@import`, `lighten()`, `darken()`) are expected and acceptable — not errors
- Commit after each phase or logical group
- The `install:clean` script in package.json can be left as-is (uses `npm run dev` which is now correct)
- `Server.js` is NOT modified — it remains the production server
- `jsconfig.json` is NOT modified — CRA 5 reads `baseUrl: "src"` natively
- MongoDB/Mongoose code stays commented out — no database needed


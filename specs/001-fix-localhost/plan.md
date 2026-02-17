# Implementation Plan: Fix Localhost — Modernize strubloid.com

**Branch**: `001-fix-localhost` | **Date**: 2026-02-17 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `/specs/001-fix-localhost/spec.md`

## Summary

Restore the strubloid.com portfolio website to a working state on localhost after 6 years of dormancy. The site was built with React 16, CRA 3, and node-sass on Node 12 — all incompatible with modern Node.js. The approach is to upgrade the build tooling (CRA 3 → CRA 5, node-sass → Dart Sass) while keeping React 16 and all existing components untouched, then fix the 4 SCSS lines that break under Dart Sass and add an error boundary for the Google Maps component.

## Technical Context

**Language/Version**: JavaScript (ES6+) / Node.js 20+ LTS (via NVM)  
**Primary Dependencies**: React 16.13.1, react-scripts 5.0.1 (CRA 5), sass (Dart Sass), Express 4.17.1, reactstrap 8.4.1, react-router-dom 5.2.0  
**Storage**: N/A (MongoDB disabled, no active storage)  
**Testing**: @testing-library/react 9.5.0 (existing; no new tests in scope)  
**Target Platform**: Localhost (Windows 10/11 via WSL2, browser)  
**Project Type**: Web application (frontend CRA + backend Express production server)  
**Performance Goals**: N/A — portfolio site, no performance SLAs  
**Constraints**: Zero visual regressions; must run on Node 20+; no React version upgrade  
**Scale/Scope**: 6 pages, ~26 components, 1 SCSS theme (~70 partials), 1 Express server

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Evidence |
|-----------|--------|----------|
| I. Incremental Modernization | **PASS** | Each dependency upgrade is a discrete step: (1) node-sass→sass, (2) react-scripts 3→5, (3) SCSS fixes, (4) error boundary. Each leaves site buildable. |
| II. Localhost-First (NON-NEGOTIABLE) | **PASS** | Primary objective. Validation gate: `npm install` + `npm run dev` + load all 6 routes. |
| III. Dependency Compatibility | **PASS** | Targets Node 20+ LTS. Replaces node-sass with sass. CRA 5 resolves cleanly. No `--legacy-peer-deps`. |
| IV. Visual Fidelity Preservation | **PASS** | SCSS changes are limited to 4 lines (division/unit fixes). Output CSS functionally identical. No design changes. |
| V. Minimal Scope | **PASS** | No new features. React stays at 16. No react-router upgrade. No database enablement. Error boundary is minimum fix for FR-011. |

**Gate result**: PASS — no violations.

## Project Structure

### Documentation (this feature)

```text
specs/001-fix-localhost/
├── plan.md              # This file
├── research.md          # Phase 0 output (complete)
├── data-model.md        # Phase 1 output (N/A — no new entities)
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output (N/A — no new APIs)
└── tasks.md             # Phase 2 output (/speckit.tasks command)
```

### Source Code (repository root)

```text
src/
├── index.jsx                         # Entry point (ReactDOM.render)
├── App.jsx                           # Router setup (BrowserRouter, Switch, Route)
├── assets/
│   ├── css/                          # Compiled CSS (bootstrap, now-ui-kit)
│   ├── scss/                         # SCSS source (now-ui-kit theme, ~70 partials)
│   │   ├── now-ui-kit.scss           # Main entry
│   │   ├── now-ui-kit/               # Theme partials (_variables, _mixins, etc.)
│   │   └── react/                    # React-specific overrides
│   ├── fonts/                        # Nucleo icon font
│   └── img/                          # Images (examples, presentation pages)
├── components/
│   └── Strubloid/
│       ├── AboutMe/                  # About Me page + blocks
│       ├── Blog/                     # Blog listing + detail pages
│       ├── Contact/                  # Contact form + Google Maps
│       ├── Footers/                  # FooterBlack, FooterBlackSocial
│       ├── FrontendWork/             # History component + SCSS
│       ├── Github/                   # GitHub projects section + SCSS
│       ├── Headers/                  # IndexHeader, LandingPageHeader
│       ├── Login/                    # Login page
│       ├── Navbars/                  # Fixed + Scroll transparent navbars
│       ├── Presentation/             # Main landing page + header + SCSS
│       └── Tooltip/                  # StrubloidTooltip
public/
├── index.html                        # HTML shell (CDN fonts, Font Awesome)
├── manifest.json
└── robots.txt
Server.js                             # Express production server (out of scope)
package.json                          # Dependencies + scripts (primary edit target)
jsconfig.json                         # Absolute import config (baseUrl: "src")
gulpfile.js                           # License task (low priority)
```

**Structure Decision**: Existing single-repo web application with CRA frontend and Express production server. No structural changes. All modifications happen in-place within the existing file tree.

## Complexity Tracking

> No violations. Table not needed.

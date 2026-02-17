<!--
  Sync Impact Report
  ==================
  Version change: N/A (initial) → 1.0.0
  Modified principles: N/A (first ratification)
  Added sections:
    - Core Principles (5 principles)
    - Technology Modernization Constraints
    - Development Workflow
    - Governance
  Removed sections: None
  Templates requiring updates:
    - .specify/templates/plan-template.md ✅ no changes needed
    - .specify/templates/spec-template.md ✅ no changes needed
    - .specify/templates/tasks-template.md ✅ no changes needed
    - .specify/templates/checklist-template.md ✅ no changes needed
    - .specify/templates/agent-file-template.md ✅ no changes needed
  Follow-up TODOs: None
-->

# strubloid.com Constitution

## Core Principles

### I. Incremental Modernization

Every fix or upgrade MUST be applied incrementally, one dependency
or subsystem at a time. Full rewrites are prohibited during the
modernization phase.

- Each upgrade step MUST leave the application in a buildable,
  runnable state.
- Dependency upgrades MUST be committed individually so regressions
  are bisectable.
- Class components MAY be converted to functional components only
  when actively modifying that component for another reason.

**Rationale**: A 6-year-old codebase carries hidden coupling.
Incremental changes surface breakage early and keep risk bounded.

### II. Localhost-First (NON-NEGOTIABLE)

The application MUST boot and render correctly on `localhost`
before any other work is considered complete.

- `npm install` MUST complete without errors on current Node.js LTS.
- `npm start` (or the designated dev command) MUST serve the site
  at `http://localhost:3000` with no blank screens.
- Every change MUST be verified by loading the page locally.

**Rationale**: The primary goal of this project is restoring local
development. No deployment, CI, or feature work matters until
localhost works.

### III. Dependency Compatibility

All runtime and dev dependencies MUST resolve and install cleanly
on the current Node.js LTS release (Node 20+).

- Deprecated packages (e.g., `node-sass`) MUST be replaced with
  maintained alternatives (e.g., `sass`/Dart Sass).
- Deprecated React APIs MUST be updated when they block compilation
  or emit runtime errors.
- Peer-dependency conflicts MUST be resolved explicitly, not
  suppressed with `--legacy-peer-deps` in committed lockfiles.

**Rationale**: Pinning to Node 12 is no longer viable. Modern
tooling and security patches require current engine support.

### IV. Visual Fidelity Preservation

The site MUST look and behave identically to its original design
after each modernization step.

- SCSS/CSS output MUST produce equivalent styles; any visual
  difference is a regression.
- Routing behavior (paths, redirects) MUST remain unchanged unless
  explicitly redesigned.
- Component structure (pages, headers, footers, navbars) MUST be
  preserved.

**Rationale**: The website has an established design (Now UI Kit).
Modernization is infrastructure work, not a redesign.

### V. Minimal Scope

During modernization, changes MUST be limited to what is necessary
to restore functionality on localhost.

- New features MUST NOT be added in the same commits as
  modernization fixes.
- Refactors that do not fix a build or runtime error MUST be
  deferred to a separate branch.
- Cosmetic improvements (linting, formatting) SHOULD be batched
  into dedicated cleanup commits, not mixed with functional fixes.

**Rationale**: Scope creep during legacy recovery leads to
half-fixed states. Fix first, enhance later.

## Technology Modernization Constraints

The following constraints govern the technology upgrade path:

- **Node.js**: MUST target Node 20 LTS or later. The `engines`
  field in `package.json` MUST be updated to reflect the supported
  version.
- **React**: Upgrade from React 16 → React 18. Follow the official
  React upgrade guide. `react-scripts` MUST be replaced with Vite
  or updated to a maintained fork (e.g., `react-scripts` 5.x) if
  available.
- **SCSS Compiler**: `node-sass` MUST be replaced with `sass`
  (Dart Sass). All SCSS files MUST compile without errors under
  Dart Sass.
- **Routing**: `react-router-dom` v5 MUST be upgraded to v6 when
  React 18 migration is complete. During initial localhost
  restoration, v5 is acceptable.
- **Server**: Express.js (`Server.js`) MUST work with the updated
  Node.js version. `body-parser` is built into Express 4.16+ and
  SHOULD be removed as a standalone dependency.
- **Database**: MongoDB/Mongoose is currently disabled (commented
  out). It MUST remain disabled until localhost rendering is fully
  restored; database work is out of scope for initial
  modernization.

## Development Workflow

- **Local Dev Loop**: Run `npm start` or `npm run dev` → verify
  the site loads at `http://localhost:3000` → confirm no console
  errors → commit.
- **Branch Strategy**: All modernization work SHOULD happen on a
  dedicated branch (e.g., `fix/modernize-localhost`). The `main`
  branch preserves the original state for reference.
- **Commit Discipline**: Each commit MUST have a descriptive
  message indicating what was fixed or upgraded (e.g.,
  `fix: replace node-sass with sass (Dart Sass)`).
- **Validation Gate**: Before merging any modernization PR, the
  following MUST pass:
  1. `npm install` completes with zero errors.
  2. `npm run build` produces a clean build.
  3. `npm start` or `npm run dev` serves the site locally.
  4. All existing pages render without blank screens or JS errors.

## Governance

This constitution supersedes ad-hoc decisions during the
modernization effort. All changes MUST align with the principles
above.

- **Amendments**: Any principle change MUST be documented with
  rationale, version-bumped, and recorded in the Sync Impact
  Report at the top of this file.
- **Versioning**: This constitution follows SemVer:
  - MAJOR: Principle removal or incompatible redefinition.
  - MINOR: New principle or material expansion of guidance.
  - PATCH: Clarifications, typo fixes, non-semantic refinements.
- **Compliance Review**: Before each milestone (localhost working,
  React upgrade complete, full modernization), principles MUST be
  reviewed for continued relevance.
- **Guidance File**: See `.specify/memory/constitution.md` (this
  file) as the single source of truth for project governance.

**Version**: 1.0.0 | **Ratified**: 2026-02-17 | **Last Amended**: 2026-02-17

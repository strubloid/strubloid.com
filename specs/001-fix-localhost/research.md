# Research: 001-fix-localhost

**Date**: 2026-02-17  
**Branch**: `001-fix-localhost`  
**Purpose**: Resolve all NEEDS CLARIFICATION items from Technical Context

## R1: Build Tooling — CRA 3 vs Vite vs CRA 5

**Decision**: Upgrade react-scripts 3.4.1 → 5.0.1 (stay on CRA)

**Rationale**:
- CRA 5 uses webpack 5 under the hood but the CRA abstraction shields the project from breaking changes.
- CRA 5 works with React 16 — no forced React upgrade. `ReactDOM.render()`, class components, `require()` for images, and `baseUrl` absolute imports all work unchanged.
- Zero component code changes required. Only `package.json` dependency swaps.
- Proven upgrade path with minimal blast radius.

**Alternatives considered**:

| Option | Effort | Risk | Why rejected |
|--------|--------|------|-------------|
| Vite | High | Medium-High | Requires rewriting 20+ `require()` image calls to ESM `import`, manual alias config for `baseUrl`, moving `index.html` to root, converting env vars. Too many file changes for "fix only what's broken." |
| Next.js | Very High | Very High | Requires React 17+ (not 16), complete route restructuring, SSR paradigm shift. Overkill for static portfolio. |
| CRA 5 | Low | Low | **Selected** — 2 dependency swaps, zero code changes in components. |

---

## R2: SCSS Compiler — node-sass → Dart Sass

**Decision**: Replace `node-sass` 4.14.1 with `sass` (Dart Sass)

**Rationale**:
- `node-sass` has native C++ bindings that fail to compile on Node 16+. Non-negotiable replacement.
- `sass` (Dart Sass) is a pure JS package — installs everywhere without native binaries.
- CRA 5 auto-detects `sass` when present.

**SCSS Compatibility Audit**:

| Pattern | Count | Impact under Dart Sass |
|---------|-------|----------------------|
| `@import` | ~70+ | Deprecated but compiles — warnings only |
| `/` division | 2 lines in `_variables.scss` | **Compile error** — must convert to `math.div()` |
| `lighten()`/`darken()` | ~29 calls | Deprecated global functions — warnings only |
| Mixed-unit arithmetic | 2 lines | Deprecation warning — add `px` unit for clean build |
| Component SCSS files | 4 files | Pure CSS / keyframes — safe |

**Required SCSS fixes** (2 files, 4 lines):
1. `src/assets/scss/now-ui-kit/_variables.scss` L240-241: Replace `/` with `math.div()`
2. `src/assets/scss/now-ui-kit/_inputs.scss` L289: Add `px` unit
3. `src/assets/scss/now-ui-kit/_info-areas.scss` L91: Add `px` unit

**CLI scripts** in package.json (`compile-sass`, `minify-sass`, `map-sass`) reference `node-sass` command — must be updated to `sass` CLI syntax.

---

## R3: React Version — Upgrade or Defer?

**Decision**: Keep React 16.13.1 for this feature. Defer React 18 to a follow-up.

**Rationale**:
- CRA 5 supports React 16. No forced upgrade.
- Upgrading React 16→18 forces replacing/upgrading 3-5 additional packages:
  - `react-bootstrap-switch` 15.5.3 — unmaintained, uses `findDOMNode`, likely breaks
  - `react-google-maps` 9.4.5 — archived, uses legacy patterns
  - `react-datetime` 2.16.3 — uses `componentWillReceiveProps`
  - `react-tagsinput` 3.19.0 — unmaintained
  - `@testing-library/react` 9.5.0 — v13+ required for `createRoot`
- This blast radius violates the constitution's Incremental Modernization principle.
- React 16 works fine for localhost restoration.

**Follow-up scope** (separate feature):
- React 18 + `createRoot`
- Replace unmaintained React dependencies
- Upgrade react-router-dom v5 → v6

---

## R4: Google Maps — Crash Prevention

**Decision**: Keep `react-google-maps` 9.4.5, add error boundary around `<MapWrapper>`

**Rationale**:
- The package installs fine on Node 20 (pure JS, no native deps).
- The crash occurs when the Google Maps API script fails to load with an invalid key — `withScriptjs` HOC has no error handling for `SCRIPT_LOAD_FAILURE`.
- An error boundary (~15 lines) catches the crash and renders a static fallback.
- Zero new dependencies. Preserves existing map code for future API key addition.

**Alternatives considered**:

| Option | Effort | Why rejected |
|--------|--------|-------------|
| Replace with `@react-google-maps/api` | ~30 lines rewritten | New dependency + API change — out of scope |
| Replace with `@vis.gl/react-google-maps` | ~40 lines | Requires React 18 — blocked |
| Remove map entirely | ~90 lines deleted | Larger diff, irreversible, prevents future enablement |
| Error boundary | ~15 lines added | **Selected** — minimal, preserves code |

---

## R5: Express Server — Dev vs Production

**Decision**: Leave `Server.js` untouched. Use CRA dev server for localhost.

**Rationale**:
- `Server.js` is a production server that serves the `build/` folder.
- For local development, `react-scripts start` (CRA dev server) provides hot reload, source maps, and no build step.
- The existing `"dev"` script (`nodemon Server.js`) is production-oriented — it runs the Express server. This should be renamed or a new CRA dev script added.
- `dotenv` is missing from `package.json` but only affects `Server.js` in non-production mode — irrelevant for CRA dev server.
- `body-parser` cleanup is housekeeping — not blocking.

**Script changes needed**:
- Current: `"start": "npm run build && node Server.js"` — production workflow
- Current: `"dev": "nodemon Server.js"` — also production-oriented
- Needed: `"dev": "react-scripts start"` — CRA dev server for localhost

---

## R6: Node.js Version

**Decision**: Target Node 20 LTS (available via NVM in WSL, also installed on Windows as v20.15.1). Node 24 (current default in NVM) also works.

**Rationale**:
- Node 12 is EOL since April 2022.
- NVM is installed in WSL with Node 24.11.1 as default. Node 20.15.1 is on Windows side.
- CRA 5 + Dart Sass + Express 4.17.1 all work on Node 20+.
- The `engines` field in `package.json` must be relaxed from `"12.18.2"` to `">=20"`.

---

## R7: Absolute Imports (jsconfig.json)

**Decision**: No changes needed. CRA 5 reads `jsconfig.json` `baseUrl: "src"` natively.

**Rationale**:
- The project uses absolute imports like `import X from "components/Strubloid/..."` and `import "assets/css/..."` throughout.
- CRA 5 (like CRA 3) supports this via `jsconfig.json` `baseUrl`.
- If migrating to Vite later, `resolve.alias` would need manual config — but that's out of scope.

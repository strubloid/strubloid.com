# Feature Specification: Fix Localhost — Modernize strubloid.com

**Feature Branch**: `001-fix-localhost`  
**Created**: 2026-02-17  
**Status**: Draft  
**Input**: User description: "Make this website that is not updated for 6 years work on localhost"

## User Scenarios & Testing *(mandatory)*

### User Story 1 — Install and Boot the Site Locally (Priority: P1)

As a developer, I want to clone the repository, run the install command, and start the development server so the website loads in my browser at `http://localhost:3000` without errors.

**Why this priority**: Nothing else matters if the site cannot install and start. Every subsequent story depends on a working local dev loop.

**Independent Test**: Run `npm install` followed by `npm start` (or the dev command) on a machine with the current Node.js LTS. Open `http://localhost:3000` in a browser and verify the page is not blank and the browser console shows no fatal errors.

**Acceptance Scenarios**:

1. **Given** a fresh clone of the repository and Node.js LTS installed, **When** I run `npm install`, **Then** the command completes with zero errors and all dependencies resolve.
2. **Given** dependencies are installed, **When** I run the start/dev command, **Then** a local server starts and the terminal confirms it is listening on port 3000.
3. **Given** the local server is running, **When** I open `http://localhost:3000` in a browser, **Then** the Presentation (home) page renders with visible content — not a blank screen.
4. **Given** the site has loaded, **When** I check the browser developer console, **Then** there are no uncaught JavaScript errors or failed resource loads that prevent page rendering.

---

### User Story 2 — Navigate All Existing Pages (Priority: P2)

As a visitor, I want to navigate to every page listed in the site's menu (Presentation, About Me, Blog Posts, Blog Post, Contact Me, Login) and see each page render correctly with its intended layout, images, and text.

**Why this priority**: A running server with only one working page is incomplete. All six existing routes must render to confirm the full site is restored.

**Independent Test**: With the dev server running, manually visit each route (`/presentation`, `/about-me`, `/blog-posts`, `/blog-post`, `/contact-me`, `/login`) and verify that the page loads, the navigation bar is present, the main content area is populated, and the footer is visible.

**Acceptance Scenarios**:

1. **Given** the site is running locally, **When** I visit `/presentation`, **Then** the landing page renders with the main header, frontend work history, GitHub projects section, about-me block, and footer.
2. **Given** the site is running locally, **When** I visit `/about-me`, **Then** the About Me page renders with the navbar, info cards, project section, and footer.
3. **Given** the site is running locally, **When** I visit `/blog-posts`, **Then** the blog listing page renders with article preview cards and footer.
4. **Given** the site is running locally, **When** I visit `/blog-post`, **Then** the single blog post page renders with article content, social share section, and footer.
5. **Given** the site is running locally, **When** I visit `/contact-me`, **Then** the contact page renders with the contact form (name, email, phone, message fields) and footer. The map area may show a placeholder if no valid API key is provided.
6. **Given** the site is running locally, **When** I visit `/login`, **Then** the login page renders with username and password fields and footer.

---

### User Story 3 — SCSS Compiles Without Errors (Priority: P3)

As a developer, I want the SCSS stylesheets to compile successfully during the build process so that all pages display with their intended visual styling (Now UI Kit theme).

**Why this priority**: The site uses a custom SCSS theme (Now UI Kit). If SCSS compilation fails, pages will either have no styling or broken styling, which makes the site unusable even if it boots.

**Independent Test**: Run the build command and verify that SCSS files compile into CSS without errors. Open the site and compare the visual appearance to the expected Now UI Kit design (styled buttons, cards, sections, typography).

**Acceptance Scenarios**:

1. **Given** the SCSS compiler is configured, **When** the build runs, **Then** all `.scss` files under `src/assets/scss/` compile without errors and produce valid CSS output.
2. **Given** the CSS has been compiled, **When** I load any page, **Then** the page displays styled elements (coloured buttons, card layouts, responsive grid) consistent with the Now UI Kit theme.
3. **Given** a component-level SCSS file exists (e.g., History.scss, Github.scss, Presentation.scss, MainHeader.scss), **When** the build runs, **Then** those component styles are included and applied correctly.

---

### User Story 4 — Visual Fidelity on the Presentation Page (Priority: P4)

As the site owner, I want the Presentation (home) page to look and behave the same as its original design — including parallax scrolling effects, background images, and the GitHub project buttons — so that the modernization does not introduce visual regressions.

**Why this priority**: The Presentation page is the primary landing page and the first impression. It uses Rellax parallax and a dynamically injected GitHub buttons script, both of which are prone to breakage during upgrades.

**Independent Test**: Load `/presentation`, scroll down, and confirm that the parallax header effect works, background images load, GitHub star/fork buttons render, and the layout matches the original Now UI Kit demo for this page type.

**Acceptance Scenarios**:

1. **Given** the Presentation page is loaded, **When** I scroll, **Then** the parallax effect in the main header moves at a different speed than the page content.
2. **Given** the Presentation page is loaded, **When** I look at the GitHub section, **Then** star/fork buttons from `buttons.github.io` render and are clickable.
3. **Given** the Presentation page is loaded, **When** I inspect images, **Then** all referenced images load (no broken-image icons) and display at their intended sizes.

---

### Edge Cases

- What happens if no `.env` file exists at the project root? The server should still start (using default port 3000) and the site should render.
- What happens if the Google Maps API key is missing or invalid? The Contact Me page should still render; the map area may show a grey placeholder or an API-key-required message, but it must not crash the page.
- What happens if external CDN resources (Google Fonts, Font Awesome) are unreachable? The site should still render with fallback system fonts; no blank screen or JavaScript crash.
- What happens if the user runs `npm run build` instead of the dev command? The build should complete successfully and produce a `build/` folder that can be served by the Express server.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The project MUST install all dependencies without errors on the current Node.js LTS (Node 20+).
- **FR-002**: The development server MUST start and serve the site at `http://localhost:3000`.
- **FR-003**: All six existing routes (`/presentation`, `/about-me`, `/blog-posts`, `/blog-post`, `/contact-me`, `/login`) MUST render their respective pages with visible content.
- **FR-004**: The default route (`/`) MUST redirect to `/presentation`.
- **FR-005**: SCSS compilation MUST succeed during the build process, producing valid CSS that matches the Now UI Kit theme.
- **FR-006**: The navigation bar MUST be present on every page and allow clicking between pages without full-page reloads (client-side routing).
- **FR-007**: The footer MUST render on every page.
- **FR-008**: All locally-referenced images (under `src/assets/img/`) MUST load without broken-image placeholders.
- **FR-009**: The production build command MUST produce a working `build/` folder that the Express server can serve.
- **FR-010**: The site MUST remain functional without a database connection (MongoDB remains disabled).
- **FR-011**: The site MUST gracefully handle a missing or invalid Google Maps API key on the Contact Me page (no page crash).

### Assumptions

- The target audience for this modernization is the site owner / sole developer; there is no multi-user or team workflow to accommodate.
- No new features, pages, or content changes are in scope — only restoring the existing site to a working state on localhost.
- The database (MongoDB/Mongoose) will remain disabled; all database-related code stays commented out.
- The Google Maps embed on the Contact Me page is acceptable to leave non-functional if no valid API key is provided; it must not crash the page.
- The Login page form currently posts to a non-existent `/test` endpoint; this is acceptable to leave as-is since login functionality is not in scope.
- Template placeholder text (e.g., "CloudCheckr" content in About Me) is acceptable to leave as-is; content clean-up is a separate concern.
- External CDN resources (Google Fonts, Font Awesome) may be used; the site does not need to work fully offline.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A developer can go from a fresh clone to a running local site in under 5 minutes (install + start).
- **SC-002**: All six routes render with visible content and zero uncaught JavaScript errors in the browser console.
- **SC-003**: The SCSS theme compiles without errors and all pages display styled elements (cards, buttons, typography, grid layout).
- **SC-004**: The Presentation page parallax scrolling effect functions as designed.
- **SC-005**: The production build (`npm run build`) completes successfully and the built site is servable via the Express server.
- **SC-006**: The site renders identically to its original design (no visual regressions from the modernization work).

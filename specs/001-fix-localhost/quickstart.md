# Quickstart: 001-fix-localhost

**Date**: 2026-02-17  
**Branch**: `001-fix-localhost`

## Prerequisites

- **Node.js**: 20+ LTS (install via [nvm](https://github.com/nvm-sh/nvm))
- **npm**: Comes with Node.js
- **Git**: To clone the repository
- **Browser**: Any modern browser (Chrome, Firefox, Edge)

## Setup (after this feature is implemented)

```bash
# 1. Clone and enter the project
git clone <repo-url> strubloid.com
cd strubloid.com

# 2. Switch to the feature branch (if not on main yet)
git checkout 001-fix-localhost

# 3. Ensure Node 20+ is active
nvm use 20   # or: nvm use --lts

# 4. Install dependencies
npm install

# 5. Start the development server
npm run dev
```

The CRA dev server starts at `http://localhost:3000`. The browser should open automatically.

## Verify It Works

1. Open `http://localhost:3000` — the Presentation page should load.
2. Navigate to each route:
   - `/presentation` — Landing page with parallax header
   - `/about-me` — About Me page with info cards
   - `/blog-posts` — Blog listing with preview cards
   - `/blog-post` — Single blog post detail
   - `/contact-me` — Contact form (map may show placeholder without API key)
   - `/login` — Login form (no backend)
3. Check the browser console for errors — there should be no fatal errors.
4. Scroll the Presentation page — the parallax effect should work.

## Production Build (optional)

```bash
# Build the production bundle
npm run build

# Serve via the Express server
node Server.js
```

Open `http://localhost:3000` to see the production build.

## Key Files Modified

| File | Change |
|------|--------|
| `package.json` | Updated dependencies (node-sass→sass, react-scripts 3→5), updated engines, updated scripts |
| `src/assets/scss/now-ui-kit/_variables.scss` | Fixed `/` division → `math.div()` for Dart Sass |
| `src/assets/scss/now-ui-kit/_inputs.scss` | Fixed mixed-unit arithmetic |
| `src/assets/scss/now-ui-kit/_info-areas.scss` | Fixed mixed-unit arithmetic |
| `src/components/Strubloid/Contact/ContactMe.jsx` | Added error boundary for Google Maps component |

## Troubleshooting

| Problem | Solution |
|---------|----------|
| `npm install` fails with node-sass errors | Ensure you're on the `001-fix-localhost` branch where `node-sass` has been replaced with `sass` |
| Port 3000 already in use | Kill the process on port 3000 or set `PORT=3001 npm run dev` |
| SCSS deprecation warnings in terminal | Expected — `@import` and `lighten()`/`darken()` emit warnings under Dart Sass but compile correctly |
| Google Maps shows grey/error | Expected — no API key configured. The page should not crash. |
| Blank page after `npm run dev` | Check the browser console. If React errors appear, verify you're on the correct branch. |

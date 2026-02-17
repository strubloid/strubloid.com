# Data Model: 001-fix-localhost

**Date**: 2026-02-17  
**Branch**: `001-fix-localhost`

## Overview

This feature introduces **no new data entities**. The project has no active database — MongoDB/Mongoose is commented out in `Server.js` and remains disabled per the constitution.

## Existing Entities (reference only)

The site is a static portfolio with no persistent server-side data. All content is hardcoded in JSX components:

| Entity | Location | Storage |
|--------|----------|---------|
| Page content | JSX components | Embedded in source code |
| Images | `src/assets/img/` | Static files |
| Styles | `src/assets/scss/` | SCSS source → compiled CSS |
| Configuration | `package.json`, `jsconfig.json` | JSON files |

## State Management

- No Redux, Context API, or other state management library.
- Component-local state only (`useState` hooks, `this.state` in class components).
- Login form state is local UI state — no authentication system exists.

## Changes in This Feature

None. No data model additions, modifications, or migrations.

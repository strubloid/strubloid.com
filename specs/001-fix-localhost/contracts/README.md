# API Contracts: 001-fix-localhost

**Date**: 2026-02-17  
**Branch**: `001-fix-localhost`

## Overview

This feature introduces **no new API endpoints**. The existing Express server (`Server.js`) has a single catch-all route that serves `build/index.html` for all paths — this is a standard SPA serving pattern, not a REST API.

## Existing Routes (reference only)

### Express Server (Server.js) — Production Only

| Method | Path | Handler | Notes |
|--------|------|---------|-------|
| GET | `*` | `res.sendFile('build/index.html')` | SPA catch-all. Requires `npm run build` first. |

### Client-Side Routes (React Router v5)

| Path | Component | Description |
|------|-----------|-------------|
| `/` | Redirect → `/presentation` | Default redirect |
| `/presentation` | `Presentation` | Landing page |
| `/about-me` | `AboutMe` | About Me page |
| `/blog-posts` | `BlogPosts` | Blog listing |
| `/blog-post` | `BlogPost` | Single blog post |
| `/contact-me` | `ContactMe` | Contact form + map |
| `/login` | `Login` | Login form (no backend) |

## Changes in This Feature

None. No API contracts added or modified.

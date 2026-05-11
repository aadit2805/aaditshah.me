# AGENTS.md

This file provides guidance to Codex (Codex.ai/code) when working with code in this repository.

## Rules

- **Do not commit.** You may stage changes (`git add`) but never run `git commit`. The user will commit manually.
- Do not push to remote unless explicitly asked.
- Do not create documentation files unless explicitly asked.

## Commands

- `npm run dev` — Start local dev server
- `npm run build` — Build for production (runs `prebuild` first)
- `npm run lint` — Run ESLint via Next.js
- `npm run build-reviews` — Rebuild `src/app/reviews/revdata.json` from markdown files in `reviews/`

## Project Overview

Personal portfolio site for Aadit Shah. Built with **Next.js 14** (App Router) + **React 18**, styled with **Tailwind CSS** + **shadcn/ui**, deployed on **Vercel**.

## Architecture

### Pages (`src/app/`)
All pages use the App Router. Light-themed pages use `MinimalNav`; the terminal page uses `TerminalNav` with a dark zinc-950 aesthetic.

- `/` — Homepage (bio, work experience, social links)
- `/portfolio` — Project showcase using `ProjectShowcase` component
- `/music` — Spotify recently played + playlists
- `/reviews` — Movie/TV reviews with sortable ratings via `MediaRatingSystem`
- `/favorites` — Song and movie of the month (tabbed view)
- `/terminal` — Interactive AI chat terminal (dark theme, JetBrains Mono)
- `/api/chat` — POST endpoint streaming Codex Sonnet 4 responses via SSE

### Data Flow

**Favorites** data lives in `src/app/favorites/songdata.json` and `src/app/favorites/moviedata.json` — imported directly by the page component.

**Reviews** use a build-time pipeline: markdown files in `reviews/` (with YAML frontmatter) are compiled by `scripts/build-reviews.js` into `src/app/reviews/revdata.json`. The prebuild script runs automatically before `npm run build`. Use `reviews/_template.md` for the frontmatter format.

**Projects** data is in `projdata.json` (root level).

### Terminal AI Chat
`/api/chat/route.js` uses the Anthropic SDK with a system prompt that role-plays as Aadit. Requires `ANTHROPIC_API_KEY` in `.env.local`.

### Components
- `src/components/MinimalNav.js` — Site-wide nav (desktop + mobile drawer via Radix Sheet)
- `src/components/Terminal.js` — Full terminal emulator with ANSI color support
- `src/components/ui/` — shadcn/ui primitives (do not manually edit; use shadcn CLI to add new ones)

## Design System

**Two visual modes**:
- Light pages (`bg-landing-bg: #f5f2e9`): warm earth tones — `bone`, `espresso`, `terracotta`, `sage` scales
- Terminal page: dark `zinc-950` with emerald `#10B981` accents

**Fonts**: Lora (serif headings), Inter (sans body), JetBrains Mono (terminal)

**CSS utilities** in `globals.css`: `.glass`, `.glass-dark`, `.hover-lift`, `.link-slide`, `.grain`, `.blob`

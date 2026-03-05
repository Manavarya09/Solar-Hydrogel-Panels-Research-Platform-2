# Solar Hydrogel Panels — Research Platform

Lightweight React + Vite prototype for a Solar Hydrogel Atmospheric Water Harvesting control interface.

This repository contains a starter UI built with React, TypeScript, Vite and Tailwind. It includes a set of placeholder dashboard components, UI primitives, and a visual mock of the hydrogel panel system used for prototyping and experimentation.

## Features
- Component-based dashboard (`src/components/dashboard`)
- Reusable UI primitives (`src/components/ui`) — gauges, toggles, panels
- Tailwind + PostCSS setup for rapid styling (`src/index.css`, `tailwind.config.js`)
- Vite dev server with HMR for fast iteration

## Prerequisites
- Node.js (16+) and npm

## Quick start
1. Install dependencies:

   npm install

2. Start development server:

   npm run dev

3. Open the app at the displayed local URL (e.g. http://localhost:5175)

## Build

  npm run build

## Repo layout (key files)
- `src/` — application source
- `src/components/dashboard` — page-level dashboard components
- `src/components/ui` — small UI primitives used across pages
- `index.html`, `src/main.tsx` — app entry
- `tailwind.config.js`, `postcss.config.cjs` — styling setup

## Notes
- Fonts are loaded via Google Fonts in `index.html` for development convenience.
- If you see layout or HMR issues, try clearing the Vite cache or restarting the dev server.

## Contributing
This repo was scaffolded as a minimal prototype. Open an issue or create a PR for enhancements.

---

Generated and pushed via automation.

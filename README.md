# Uzair Ahmad Mirza — Portfolio Website

React + Vite portfolio site with an animated 3D avatar hero (React Three Fiber), lazy-loaded project videos, and a filterable portfolio grid.

## Requirements

- Node.js (v18 or newer recommended)
- npm

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Start the local dev server:

```bash
npm run dev
```

Then open the URL shown in the terminal (usually http://localhost:5173/POrtfolio_Website/).

## Build for Production

```bash
npm run build
```

Output goes to the `dist/` folder.

## Preview the Production Build

```bash
npm run preview
```

## Lint

```bash
npm run lint
```

## Project Structure

- `src/` — React source code
  - `Hero.jsx` / `HeroAvatar.jsx` — hero section + 3D avatar scene
  - `App.jsx` — main page sections (About, Portfolio, Skills, Contact, Footer)
- `public/` — static assets served as-is (GLB model, images, videos)
- `dist/` — production build output

## Notes

- The site is deployed under the base path `/POrtfolio_Website/` (set in `vite.config.js`), so it works on GitHub Pages.
- The 3D avatar model is large (~14 MB) and is loaded lazily after the page finishes loading.
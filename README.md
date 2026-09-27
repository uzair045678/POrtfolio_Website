# Uzair Ahmad Mirza — Portfolio Website

Portfolio of Uzair Ahmad Mirza, an XR and software developer building interactive applications, simulations, and multiplayer systems with Unity, Unreal Engine, C#, and C++.

The site showcases AR, VR, and XR work including training simulators, multiplayer experiences, mobile games, WebAR, and real-time robot control. It remains an interactive React application while build-time prerendering exposes the full portfolio content to search engines and non-JavaScript clients.

**Live site:** [uzair045678.github.io/POrtfolio_Website](https://uzair045678.github.io/POrtfolio_Website/)

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

Output goes to the `dist/` folder. The build then renders the React app into `dist/index.html`, so the portfolio text is present before JavaScript runs.

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
- `prerender.mjs` — build-time React renderer for crawlable HTML
- `dist/` — production build output

## Notes

- The site is deployed under the base path `/POrtfolio_Website/` (set in `vite.config.js`), so it works on GitHub Pages.
- The 3D avatar model is large (~14 MB) and is loaded lazily after the page finishes loading.

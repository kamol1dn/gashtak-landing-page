# Gashtak Media Landing Page

A sleek single-page hero inspired by the shared Gashtak concept art. The page now runs on React + Vite, giving you JSX structure, hot-module reloading, and room to expand into a multi-section experience.

## Features

- Responsive hero layout that mirrors the gradient-heavy art direction.
- Accessible navigation and CTAs featuring custom chip styling.
- Highlight video frame with glassy treatment and play button overlay.
- Animated stat counters powered by a small React hook and `IntersectionObserver`.

## Getting Started

```powershell
npm install
npm run dev
```

This starts the Vite dev server (default: http://localhost:5173) with instant reloads. To ship a static build, run `npm run build` and deploy the contents of the `dist/` folder.

> **Tip:** Opening `index.html` directly in the browser will only load the gradients because the JSX needs to be compiled. Always use `npm run dev` (development) or open `dist/index.html` after `npm run build` for a static preview.

## Customization Tips

- Update marketing copy, stats, or links inside `src/App.jsx`.
- Adjust gradients, radii, and glow layers in `src/styles.css` to explore new moods.
- Swap the showcase image URL in the `.media-frame` section of `src/App.jsx` for your own assets.



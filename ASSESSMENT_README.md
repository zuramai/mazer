# Mazer – Customized Assessment Build

This repo is a customized fork of Mazer focused on UI tweaks and data-driven components for a front‑end assessment.

- Original template: https://github.com/zuramai/mazer
- Fork: https://github.com/subrahmanyam024/mazer

## What’s included
- Data-bound dashboard KPIs and chart (reads from JSON)
- New Products page (search + pagination from JSON)
- Theme tweaks (primary color, rounded cards, active sidebar)
- Sidebar navigation entry for Products
- CDN fallbacks for vendor scripts during dev

## Getting started
1) Install and run
```
npm install
npm run dev
# open http://localhost:5173
```

2) Build
```
npm run build
```

## Data source
- JSON: `src/assets/data/data.json`
- Loader: `src/assets/js/services/dataService.js`
- Fetch path is relative for portability:
  - `fetch('assets/data/data.json', { cache: 'no-store' })`

## Dashboard data binding
- Page: `src/index.html`
  - Four KPI hooks via `data-kpi`:
    - `data-kpi="totalUsers"`, `activeSessions`, `revenueToday`, `conversionRate`
- Script: `src/assets/static/js/pages/dashboard.js`
  - Imported as a module in `index.html`
  - Loads JSON and updates KPI elements
  - Updates the main ApexCharts series from `salesSeries`

## Products page (data-driven table)
- Page: `src/products.html`
- Script: `src/assets/static/js/pages/products.js`
- Features:
  - Pulls `topProducts` from `data.json`
  - Client-side search (SKU/Name)
  - Simple pagination (10 per page)

## Theme customization
- File: `src/assets/scss/_custom.scss`
  - Primary color `#6b5bff`
  - Rounded cards
  - Active sidebar link highlight
- Included from `src/assets/scss/app.scss`

## Navigation
- Vertical sidebar items: `src/sidebar-items.json`
  - Added `Products` → `products.html`
- Horizontal menu items (for reference): `src/horizontal-menu-items.json`

## Vendor/CDN notes
- During dev, some vendor files under `assets/extensions` may be missing. We use CDN for:
  - Perfect Scrollbar: injected in `src/layouts/master.html`
  - ApexCharts: injected in `src/index.html`
- You can switch back to local packages by ensuring Vite copies extensions (see `vite.config.js` modulesToCopy).

## Vite config
- `vite.config.js`
  - `base` is `./` in dev and `/mazer/` in production (helpful for GitHub Pages)
  - Static assets served from `src/assets/static`

## Branch and commit
- Suggested branch: `feat/custom-assessment`
- Example commit:  
  `feat: data-bound dashboard, products page, theme tweaks, CDN fixes`

## Key files changed/added
- `src/index.html` (KPI hooks, module script, CDN ApexCharts)
- `src/assets/static/js/pages/dashboard.js` (data binding)
- `src/assets/js/services/dataService.js` (data loader)
- `src/assets/data/data.json` (sample data)
- `src/products.html`, `src/assets/static/js/pages/products.js`
- `src/assets/scss/_custom.scss`, `src/assets/scss/app.scss`
- `src/layouts/master.html` (Perfect Scrollbar CDN)
- `src/sidebar-items.json` (Products menu)
- `vite.config.js` (prod base path)

## References
- Mazer template: https://github.com/zuramai/mazer



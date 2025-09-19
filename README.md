# Executive Dashboards — Frontend Assignment (React + Vite + Zustand)

A small dashboard app that renders **categories** containing **widgets**, driven by a JSON file.  
You can **add new widgets** (name + random text) into a category, **assign existing widgets** to multiple categories, **remove** widgets from a category, and **search** across all widgets. State persists locally via `localStorage`.

## ✨ Features
- **JSON‑driven UI**: `src/data/initialData.json` defines `categories` and `widgets`.
- **Add new widget to a category**: “+ Add Widget” opens a modal (name + text).
- **Assign existing widgets to categories**: “Manage / Search Widgets” → checkbox per category.
- **Remove widget from a category**: ❌ on each widget card.
- **Search**: filter by name or text in the “All Widgets” panel.
- **Local persistence**: Zustand + `persist` middleware (no backend required).
- **Zero-config tooling**: Vite + React 18.

---

## 🧭 Project Structure
```
frontend-dashboard-assignment/
├─ index.html
├─ vite.config.js
├─ package.json
├─ src/
│  ├─ styles.css
│  ├─ main.jsx
│  ├─ App.jsx
│  ├─ store.js                 # Zustand store (with localStorage persist)
│  ├─ data/
│  │  └─ initialData.json      # Seed data for categories & widgets
│  └─ components/
│     ├─ CategoryCard.jsx      # Renders one category + its widgets
│     ├─ WidgetCard.jsx        # Simple widget tile with remove button
│     ├─ AddWidgetModal.jsx    # Add new widget (name + text) into a category
│     └─ AllWidgetsPanel.jsx   # Global search + assign/unassign widgets
```

## 🗂️ Data Model
`src/data/initialData.json`:
```json
{
  "categories": [
    { "id": "cat-cspm", "name": "CSPM Executive Dashboard", "widgetIds": ["w1","w2"] },
    { "id": "cat-kspm", "name": "KSPM Overview", "widgetIds": ["w3"] },
    { "id": "cat-cloud", "name": "Cloud Compliance", "widgetIds": [] }
  ],
  "widgets": {
    "w1": { "id": "w1", "name": "Risk Posture", "text": "Random text: Current risk posture is Stable." },
    "w2": { "id": "w2", "name": "Open Alerts", "text": "Random text: 42 alerts require attention." },
    "w3": { "id": "w3", "name": "Asset Inventory", "text": "Random text: 1,204 assets monitored." },
    "w4": { "id": "w4", "name": "Policy Drift", "text": "Random text: No drifts detected in last 24h." }
  }
}
```
- Each **category** tracks a list of widget IDs in `widgetIds`.
- Widgets live in a flat dictionary keyed by ID.
- You can add/remove categories or widgets in this file to change what renders.

## ▶️ Getting Started
**Requirements**: Node.js 18+ and npm.

```bash
npm install
npm run dev
```

Vite will print a local URL (usually http://localhost:5173).

## 🧪 Useful Scripts
```json
{
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview"
}
```

## 🧱 State Management
- **Zustand** store in `src/store.js` keeps `categories` and `widgets` in memory and syncs to **localStorage** with the `persist` middleware.
- Key actions:
  - `addWidgetToCategory(categoryId, name, text)`
  - `addExistingWidgetToCategory(categoryId, widgetId)`
  - `removeWidgetFromCategory(categoryId, widgetId)`
  - `setCategories(categories)` / `setWidgets(widgets)`

## 🖱️ How to Use
- **Add a new widget**: Open a category → **+ Add Widget** → fill *name* and *text* → **Add**.
- **Assign existing widgets**: Top-right **Manage / Search Widgets** → use the search box → tick/untick per category.
- **Remove from category**: Click ❌ on the widget tile.
- **Persistence**: Refresh the page—your changes remain.

## 🎨 Customization
- **Theme**: `src/styles.css` — tweak CSS variables at the top.
- **Data**: Edit `src/data/initialData.json`. IDs should be unique strings.
- **Layout**: Category layout is grid-based inside `CategoryCard.jsx`.

## 🚀 Deployment
Any static host works (this is a pure SPA):
- **Vercel**: Build `npm run build`, output directory: `dist`.
- **Netlify**: Build command `npm run build`, publish directory `dist`.
- **GitHub Pages**: Set `base` in `vite.config.js`, then `gh-pages -d dist`.

## 🧭 Notes / Gotchas
- If you change `base` for GitHub Pages, rebuild before deploying.
- This app does not include routing; no special SPA rewrites are needed.
- LocalStorage keys: `dashboard-assignment`.

## 🗺️ Roadmap / Nice-to-haves
- Category CRUD (add/rename/delete categories)
- Drag-and-drop ordering for categories and widgets
- Inline widget editing
- Tests (React Testing Library + Vitest)
- TypeScript typings
- Accessibility pass (focus traps in modals, ARIA labels)

---

**License**: Add your preferred license (MIT recommended).
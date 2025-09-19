# Executive Dashboards — Frontend Assignment (React + Vite + Zustand)

A small dashboard app that renders **categories** containing **widgets**, driven by a JSON file.  
You can **add new widgets** (name + text) into a category, **assign existing widgets** to multiple categories, **remove** widgets from a category, and **search** across all widgets. State persists locally via `localStorage`.

## ✨ Features
- **JSON-driven UI**: `src/data/initialData.json` defines `categories` and `widgets`.
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

---

## 💻 Local Setup & Deployment (Step‑by‑Step)

### 1. Prerequisites
- **Node.js 22+** and **npm**  
  Check versions:
  ```bash
  node -v
  npm -v
  ```

### 2. Get the code
- **Option A:** Download the ZIP and unzip it.
- **Option B:** Clone the Repo using git clone:
  ```bash
  git clone https://github.com/jai-prabhu/Dashboard-Assignment.git
  cd frontend-dashboard-assignment
  ```

### 3. Install dependencies
```bash
npm install
```

### 4. Run in development (hot‑reload)
```bash
npm run dev
```
- Vite will print a local URL (usually **http://localhost:5173**).  
- To run on a specific port:
  ```bash
  npm run dev -- --port 5174
  ```
- To expose on your LAN (so phones on Wi‑Fi can see it):
  ```bash
  npm run dev -- --host
  ```

### 5. Create a production build
```bash
npm run build
```
This outputs static files to **`dist/`**.

### 6. Preview the production build locally (recommended)
```bash
npm run preview
```
Vite serves the **dist/** build at a local URL for final verification.

### 7. (Alternative) Serve `dist/` with any static server
If you prefer another static server:
```bash
# using 'serve' (installs a small static server)
npx serve -s dist

# using http-server
npx http-server dist

# or Python 3 (no SPA rewrites needed here since there’s no client routing)
cd dist
python -m http.server 8080
```
---

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
---

import { useState } from 'react'
import { useDashboardStore } from './store'
import CategoryCard from './components/CategoryCard'
import AllWidgetsPanel from './components/AllWidgetsPanel'

export default function App() {
  const categories = useDashboardStore(s => s.categories)
  const [openAll, setOpenAll] = useState(false)

  return (
    <div className="container">
      <div className="topbar">
        <div className="h1">Executive Dashboards</div>
        <div className="row" style={{gap:8}}>
          <button className="btn secondary" onClick={()=>setOpenAll(true)}>Manage / Search Widgets</button>
          <a className="btn" href="https://github.com/jai-prabhu/Dashboard-Assignment" target="_blank" rel="noreferrer">Visit GitHub Repo</a>
        </div>
      </div>

      <div className="grid">
        {categories.map(cat => (
          <CategoryCard key={cat.id} category={cat} />
        ))}
      </div>

      <div className="footer">
        Built with React + Zustand. Your edits are saved locally in the browser (localStorage).
      </div>

      {openAll && <AllWidgetsPanel onClose={()=>setOpenAll(false)} />}
    </div>
  )
}

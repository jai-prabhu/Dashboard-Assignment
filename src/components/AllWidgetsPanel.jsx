import React, { useMemo, useState } from 'react'
import { useDashboardStore } from '../store'

export default function AllWidgetsPanel({ onClose }) {
  const categories = useDashboardStore(s => s.categories)
  const widgets = useDashboardStore(s => s.widgets)
  const addExistingWidgetToCategory = useDashboardStore(s => s.addExistingWidgetToCategory)
  const removeWidgetFromCategory = useDashboardStore(s => s.removeWidgetFromCategory)
  const [q, setQ] = useState('')

  const list = useMemo(() => {
    const arr = Object.values(widgets)
    if (!q.trim()) return arr
    const m = q.trim().toLowerCase()
    return arr.filter(w => w.name.toLowerCase().includes(m) || w.text.toLowerCase().includes(m))
  }, [widgets, q])

  const isChecked = (cat, widgetId) => cat.widgetIds.includes(widgetId)

  const toggle = (catId, widgetId, checked) => {
    if (checked) addExistingWidgetToCategory(catId, widgetId)
    else removeWidgetFromCategory(catId, widgetId)
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" style={{width:740}} onClick={e => e.stopPropagation()}>
        <div className="row" style={{justifyContent:'space-between', marginBottom:8}}>
          <div className="row" style={{gap:10}}>
            <strong>All Widgets</strong>
            <span className="kbd">Search</span>
          </div>
          <button className="icon-btn" onClick={onClose} title="Close">✖</button>
        </div>

        <input className="input" placeholder="Search widgets by name || text..." value={q} onChange={e=>setQ(e.target.value)} />

        <div className="list" style={{marginTop:12}}>
          {list.map(w => (
            <div key={w.id} className="list-item">
              <div style={{maxWidth: '45%'}}>
                <div style={{fontWeight:600}}>{w.name}</div>
                <div className="meta" style={{marginTop:4}}>{w.text}</div>
              </div>
              <div style={{display:'grid', gridTemplateColumns:`repeat(${categories.length}, 1fr)`, gap:8, width:'50%'}}>
                {categories.map(c => (
                  <label key={c.id} style={{display:'flex', gap:6, alignItems:'center', fontSize:12}}>
                    <input
                      type="checkbox"
                      checked={isChecked(c, w.id)}
                      onChange={e => toggle(c.id, w.id, e.target.checked)}
                    />
                    {c.name}
                  </label>
                ))}
              </div>
            </div>
          ))}
          {list.length === 0 && <div className="meta" style={{padding:12}}>No widgets match your search.</div>}
        </div>
      </div>
    </div>
  )
}

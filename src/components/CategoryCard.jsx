import React, { useState } from 'react'
import { useDashboardStore } from '../store'
import WidgetCard from './WidgetCard'
import AddWidgetModal from './AddWidgetModal'

export default function CategoryCard({ category }) {
  const widgets = useDashboardStore(s => s.widgets)
  const removeWidgetFromCategory = useDashboardStore(s => s.removeWidgetFromCategory)
  const [open, setOpen] = useState(false)

  return (
    <div className="card" style={{gridColumn:'span 12'}}>
      <div className="row" style={{justifyContent:'space-between', marginBottom:8}}>
        <div className="title">{category.name}</div>
        <div className="row" style={{gap:8}}>
          <span className="badge">Widgets: {category.widgetIds.length}</span>
          <button className="btn" onClick={()=>setOpen(true)}>+ Add Widget</button>
        </div>
      </div>

      <div className="grid" style={{gridTemplateColumns:'repeat(3, 1fr)'}}>
        {category.widgetIds.length === 0 && (
          <div className="meta" style={{gridColumn:'1 / -1', padding:10}}>No widgets yet.</div>
        )}
        {category.widgetIds.map(id => (
          <div key={id}>
            <WidgetCard
              widget={widgets[id]}
              onRemove={()=>removeWidgetFromCategory(category.id, id)}
            />
          </div>
        ))}
      </div>

      {open && <AddWidgetModal category={category} onClose={()=>setOpen(false)} />}
    </div>
  )
}

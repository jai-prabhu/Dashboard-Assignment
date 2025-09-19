import React, { useState } from 'react'
import { useDashboardStore } from '../store'

export default function AddWidgetModal({ category, onClose }) {
  const addWidgetToCategory = useDashboardStore(s => s.addWidgetToCategory)
  const [name, setName] = useState('')
  const [text, setText] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()
    if (!name.trim() || !text.trim()) return
    addWidgetToCategory(category.id, name.trim(), text.trim())
    onClose()
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="row" style={{justifyContent:'space-between'}}>
          <h2>Add Widget to “{category.name}”</h2>
          <button className="icon-btn" onClick={onClose} title="Close">✖</button>
        </div>
        <form onSubmit={onSubmit} style={{display:'grid', gap:12, marginTop:12}}>
          <label>
            <div>Widget name</div>
            <input className="input" value={name} onChange={e=>setName(e.target.value)} placeholder="e.g. Security Score" />
          </label>
          <label>
            <div>Widget text</div>
            <textarea className="textarea" rows={4} value={text} onChange={e=>setText(e.target.value)} placeholder="Random text for assignment..."></textarea>
          </label>
          <div className="row" style={{justifyContent:'flex-end', gap:8}}>
            <button type="button" className="btn secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn">Add Widget</button>
          </div>
        </form>
      </div>
    </div>
  )
}

import React from 'react'

export default function WidgetCard({ widget, onRemove }) {
  return (
    <div className="widget">
      <div className="row" style={{justifyContent:'space-between'}}>
        <div className="name">{widget.name}</div>
        <button className="icon-btn" onClick={onRemove} title="Remove from category">✖</button>
      </div>
      <div className="meta" style={{marginTop:6}}>{widget.text}</div>
    </div>
  )
}

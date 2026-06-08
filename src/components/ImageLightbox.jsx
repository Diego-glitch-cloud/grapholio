import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'

export default function ImageLightbox({ open, onClose, color = '#60a5fa', src, alt }) {
  const [closing, setClosing] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (e) => { if (e.key === 'Escape') handleClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  if (!open && !closing) return null

  const handleClose = () => {
    setClosing(true)
    setTimeout(() => { setClosing(false); onClose() }, 280)
  }

  return createPortal(
    <div
      data-nodepanel
      className="fixed inset-0 z-[100] flex items-center justify-center p-8"
      style={{
        background: 'rgba(5,12,31,0.8)',
        backdropFilter: 'blur(6px)',
        opacity: closing ? 0 : 1,
        transition: 'opacity 0.28s ease',
      }}
      onMouseDown={(e) => { if (e.target === e.currentTarget) handleClose() }}
    >
      <div
        className="holo-panel holo-scan relative"
        style={{
          color,
          animation: closing ? 'none' : 'holo-deploy 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards, flicker 6s 0.6s infinite',
          opacity: closing ? 0 : 1,
          transform: closing ? 'translateY(-10px) scale(0.96)' : 'none',
          transition: 'opacity 0.28s ease, transform 0.28s ease',
        }}
      >
        <div
          className="relative rounded-md p-px"
          style={{
            background: `linear-gradient(135deg, ${color}90, ${color}20, ${color}70)`,
            boxShadow: `0 0 18px ${color}50, 0 0 40px ${color}25, inset 0 0 12px ${color}15`,
          }}
        >
          <div className="absolute -top-px -left-px w-4 h-4 border-t-2 border-l-2 rounded-tl-md pointer-events-none z-20" style={{ borderColor: color }} />
          <div className="absolute -top-px -right-px w-4 h-4 border-t-2 border-r-2 rounded-tr-md pointer-events-none z-20" style={{ borderColor: color }} />
          <div className="absolute -bottom-px -left-px w-4 h-4 border-b-2 border-l-2 rounded-bl-md pointer-events-none z-20" style={{ borderColor: color }} />
          <div className="absolute -bottom-px -right-px w-4 h-4 border-b-2 border-r-2 rounded-br-md pointer-events-none z-20" style={{ borderColor: color }} />

          <div className="relative rounded-md overflow-hidden" style={{ background: 'rgba(5,12,31,0.9)' }}>
            <div
              className="absolute inset-0 pointer-events-none z-10 rounded-md"
              style={{ backgroundImage: `repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(255,255,255,0.018) 3px,rgba(255,255,255,0.018) 4px)` }}
            />
            <div
              className="absolute inset-x-0 h-px pointer-events-none z-10"
              style={{
                background: `linear-gradient(90deg, transparent, ${color}dd, ${color}, ${color}dd, transparent)`,
                boxShadow: `0 0 10px 3px ${color}55`,
                animation: closing ? 'none' : 'holo-scanline-sweep 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
              }}
            />

            <button
              type="button"
              onClick={handleClose}
              className="absolute top-3 right-3 z-20 w-9 h-9 flex items-center justify-center rounded-md text-slate-400 hover:text-slate-100 transition-colors text-base"
              style={{ border: '1px solid rgba(148,163,184,0.25)', background: 'rgba(5,12,31,0.6)' }}
            >
              ✕
            </button>

            <img
              src={src}
              alt={alt}
              className="block relative z-0"
              style={{ maxWidth: '88vw', maxHeight: '86vh', objectFit: 'contain' }}
            />
          </div>
        </div>
      </div>
    </div>,
    document.body
  )
}

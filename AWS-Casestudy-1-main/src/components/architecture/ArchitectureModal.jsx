import { X } from 'lucide-react'
import ArchitectureDiagram from './ArchitectureDiagram'

function ArchitectureModal({ isOpen, onClose, failureMode, onSimulateFailure, onRestoreInstance }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/65 p-3 backdrop-blur-sm md:p-6" onClick={onClose}>
      <div className="mx-auto max-w-6xl pt-6" onClick={(event) => event.stopPropagation()}>
        <div className="rounded-[28px] border border-white/10 bg-[#0b0f14] p-4 shadow-[0_30px_90px_rgba(0,0,0,0.4)] md:p-6">
          <div className="mb-5 flex items-center justify-between gap-3">
            <div>
              <p className="text-[11px] uppercase tracking-[0.28em] text-slate-400">Architecture</p>
              <h2 className="mt-2 text-2xl font-semibold text-white">AWS Cloud Architecture</h2>
            </div>
            <button
              type="button"
              aria-label="Close architecture dialog"
              onClick={onClose}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-300 transition hover:border-orange-500/30 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <ArchitectureDiagram
            failureMode={failureMode}
            onSimulateFailure={onSimulateFailure}
            onRestoreInstance={onRestoreInstance}
          />
        </div>
      </div>
    </div>
  )
}

export default ArchitectureModal

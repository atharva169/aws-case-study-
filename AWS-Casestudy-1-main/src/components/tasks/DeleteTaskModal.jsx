import { X, Trash2 } from 'lucide-react'

function DeleteTaskModal({ task, isOpen, onClose, onConfirm }) {
  if (!isOpen || !task) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-task-title"
        className="w-full max-w-md rounded-3xl border border-red-500/20 bg-[#0f141b] p-5 shadow-[0_30px_80px_rgba(0,0,0,0.45)]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-[0.28em] text-slate-400">Delete</p>
            <h3 id="delete-task-title" className="mt-2 text-2xl font-semibold text-white">Remove task</h3>
          </div>
          <button
            type="button"
            aria-label="Close delete task dialog"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-300 transition hover:border-red-500/30 hover:text-red-200"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-6 rounded-2xl border border-red-500/20 bg-red-500/5 p-4 text-sm text-slate-200">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/10 text-red-200">
              <Trash2 className="h-5 w-5" />
            </div>
            <div>
              <p className="font-medium text-white">{task.title}</p>
              <p className="text-slate-400">This action cannot be undone.</p>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-slate-200 transition hover:border-white/20 hover:text-white"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="rounded-xl bg-red-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-400"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteTaskModal

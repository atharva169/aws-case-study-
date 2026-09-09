import { useEffect, useState } from 'react'
import { X } from 'lucide-react'

const defaultForm = {
  title: '',
  description: '',
  priority: 'Medium',
  status: 'Pending',
}

function AddTaskModal({ isOpen, onClose, onCreate }) {
  const [form, setForm] = useState(defaultForm)

  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!form.title.trim() || !form.description.trim()) {
      return
    }

    onCreate({
      ...form,
      title: form.title.trim(),
      description: form.description.trim(),
    })
    setForm(defaultForm)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-task-title"
        className="w-full max-w-lg rounded-3xl border border-white/10 bg-[#0f141b] p-5 shadow-[0_30px_80px_rgba(0,0,0,0.45)]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-[0.28em] text-slate-400">Workspace</p>
            <h3 id="add-task-title" className="mt-2 text-2xl font-semibold text-white">Add Task</h3>
          </div>

          <button
            type="button"
            aria-label="Close add task dialog"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-300 transition hover:border-orange-500/30 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="task-title" className="mb-2 block text-sm text-slate-300">Task title</label>
            <input
              id="task-title"
              name="title"
              value={form.title}
              onChange={handleChange}
              className="w-full rounded-xl border border-white/10 bg-[#121922] px-3 py-2.5 text-sm text-white outline-none transition focus:border-orange-500/40 focus:ring-2 focus:ring-orange-500/20"
              placeholder="Create AWS deployment checklist"
              required
            />
          </div>

          <div>
            <label htmlFor="task-description" className="mb-2 block text-sm text-slate-300">Description</label>
            <textarea
              id="task-description"
              name="description"
              value={form.description}
              onChange={handleChange}
              rows="4"
              className="w-full resize-none rounded-xl border border-white/10 bg-[#121922] px-3 py-2.5 text-sm text-white outline-none transition focus:border-orange-500/40 focus:ring-2 focus:ring-orange-500/20"
              placeholder="Document the deployment flow and architecture"
              required
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label htmlFor="task-priority" className="mb-2 block text-sm text-slate-300">Priority</label>
              <select
                id="task-priority"
                name="priority"
                value={form.priority}
                onChange={handleChange}
                className="w-full rounded-xl border border-white/10 bg-[#121922] px-3 py-2.5 text-sm text-white outline-none transition focus:border-orange-500/40 focus:ring-2 focus:ring-orange-500/20"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>

            <div>
              <label htmlFor="task-status" className="mb-2 block text-sm text-slate-300">Status</label>
              <select
                id="task-status"
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full rounded-xl border border-white/10 bg-[#121922] px-3 py-2.5 text-sm text-white outline-none transition focus:border-orange-500/40 focus:ring-2 focus:ring-orange-500/20"
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-slate-200 transition hover:border-white/20 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-xl bg-[#FF9900] px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-[#ffad33]"
            >
              Create Task
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddTaskModal

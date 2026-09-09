import { useState } from 'react'
import { MoreHorizontal, Check, Circle, Trash2 } from 'lucide-react'

const priorityStyles = {
  Low: 'border-emerald-500/20 bg-emerald-500/10 text-emerald-200',
  Medium: 'border-yellow-500/20 bg-yellow-500/10 text-yellow-200',
  High: 'border-red-500/20 bg-red-500/10 text-red-200',
}

const statusStyles = {
  Pending: 'text-slate-300',
  'In Progress': 'text-orange-200',
  Completed: 'text-emerald-200',
}

function TaskCard({ task, onToggleComplete, onDelete }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const isCompleted = task.status === 'Completed'

  return (
    <div className={`rounded-2xl border p-3 transition-all duration-200 md:p-4 ${isCompleted ? 'border-emerald-500/20 bg-[#111a17]' : 'border-white/10 bg-[#0f141b]'} hover:border-orange-500/20 hover:shadow-[0_12px_28px_rgba(0,0,0,0.2)]`}>
      <div className="flex items-start gap-3">
        <button
          type="button"
          aria-label={isCompleted ? `Mark ${task.title} as pending` : `Mark ${task.title} as complete`}
          onClick={() => onToggleComplete(task.id)}
          className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border transition-all duration-200 ${
            isCompleted
              ? 'border-emerald-400 bg-emerald-500 text-slate-950'
              : 'border-slate-500 bg-transparent hover:border-orange-400 hover:text-orange-300'
          }`}
        >
          {isCompleted ? <Check className="h-3.5 w-3.5" /> : <Circle className="h-3 w-3" />}
        </button>

        <div className="min-w-0 flex-1">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div className="min-w-0">
              <p className={`text-base font-medium ${isCompleted ? 'text-slate-400 line-through' : 'text-white'}`}>
                {task.title}
              </p>
              <p className="mt-1 text-sm text-slate-400">{task.description}</p>
            </div>

            <div className="relative">
              <button
                type="button"
                aria-label={`Open options for ${task.title}`}
                onClick={() => setMenuOpen((current) => !current)}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-400 transition hover:border-orange-500/30 hover:text-white"
              >
                <MoreHorizontal className="h-4 w-4" />
              </button>

              {menuOpen && (
                <div className="absolute right-0 z-10 mt-2 min-w-[140px] rounded-xl border border-white/10 bg-[#111821] p-1.5 shadow-2xl shadow-black/40">
                  <button
                    type="button"
                    onClick={() => {
                      onDelete(task.id)
                      setMenuOpen(false)
                    }}
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-red-200 transition hover:bg-red-500/10"
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className={`inline-flex rounded-full border px-2.5 py-1 text-[11px] font-medium ${priorityStyles[task.priority]}`}>
              {task.priority}
            </span>
            <span className={`inline-flex rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-medium ${statusStyles[task.status]}`}>
              {task.status}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TaskCard

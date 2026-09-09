import { ArrowUpRight } from 'lucide-react'
import TaskCard from './TaskCard'

function TaskList({ tasks, onToggleComplete, onDelete, onViewAll }) {
  return (
    <section className="rounded-3xl border border-white/10 bg-[#0F1217] p-4 shadow-[0_18px_32px_rgba(0,0,0,0.22)] md:p-5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-400">Workspace</p>
          <h2 className="mt-1 text-2xl font-semibold tracking-tight text-white">My Tasks</h2>
        </div>

        <button
          type="button"
          onClick={onViewAll}
          className="inline-flex items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-2.5 py-2 text-sm text-slate-300 transition hover:border-orange-500/30 hover:text-white"
        >
          View all
          <ArrowUpRight className="h-4 w-4" />
        </button>
      </div>

      <div className="space-y-3">
        {tasks.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-white/10 bg-[#111821] px-4 py-10 text-center text-slate-400">
            No tasks match your current filter.
          </div>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onToggleComplete={onToggleComplete}
              onDelete={onDelete}
            />
          ))
        )}
      </div>
    </section>
  )
}

export default TaskList

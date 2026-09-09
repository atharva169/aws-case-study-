import { Plus } from 'lucide-react'

function WelcomeSection({ onAddTask }) {
  return (
    <section className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#111821] via-[#0e141b] to-[#0c1119] p-5 shadow-[0_18px_40px_rgba(0,0,0,0.25)] md:p-6">
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-400">Overview</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white md:text-4xl">Good evening 👋</h1>
          <p className="mt-2 text-sm text-slate-300">Here&apos;s what&apos;s happening with your tasks today.</p>
        </div>

        <button
          type="button"
          onClick={onAddTask}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#FF9900] px-4 py-3 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5 hover:bg-[#ffad33] focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 focus:ring-offset-[#0f1217]"
        >
          <Plus className="h-4 w-4" />
          Add Task
        </button>
      </div>
    </section>
  )
}

export default WelcomeSection

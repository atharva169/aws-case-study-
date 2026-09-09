import { Cloud, LayoutDashboard, ListTodo, CheckCircle2, CircleEllipsis } from 'lucide-react'

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'my-tasks', label: 'My Tasks', icon: ListTodo },
  { id: 'completed', label: 'Completed', icon: CheckCircle2 },
  { id: 'pending', label: 'Pending', icon: CircleEllipsis },
]

function Sidebar({ activeView, onSelectView }) {
  return (
    <aside className="flex w-full flex-col border-r border-white/10 bg-[#0B0E13]/90 p-5 lg:w-72">
      <div className="mb-8 flex items-center gap-3 px-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-orange-400/30 bg-orange-500/10 text-orange-300 shadow-lg shadow-orange-500/10">
          <Cloud className="h-5 w-5" />
        </div>
        <div>
          <p className="text-lg font-semibold tracking-tight text-white">TaskFlow</p>
          <p className="text-[10px] uppercase tracking-[0.22em] text-slate-400">Cloud SaaS</p>
        </div>
      </div>

      <nav className="space-y-2">
        {navItems.map(({ id, label, icon: Icon }) => {
          const isActive = activeView === id

          return (
            <button
              key={id}
              type="button"
              onClick={() => onSelectView(id)}
              className={`flex w-full items-center gap-3 rounded-xl border px-3 py-3 text-left text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'border-orange-500/30 bg-orange-500/10 text-white shadow-lg shadow-orange-500/5'
                  : 'border-transparent text-slate-400 hover:border-white/10 hover:bg-white/5 hover:text-slate-200'
              }`}
              style={isActive ? { boxShadow: 'inset 2px 0 0 #FF9900' } : undefined}
            >
              <Icon className={`h-4 w-4 ${isActive ? 'text-orange-300' : 'text-slate-400'}`} />
              <span>{label}</span>
            </button>
          )
        })}
      </nav>

      <div className="mt-auto rounded-2xl border border-emerald-500/20 bg-[#121922] p-4 shadow-lg shadow-emerald-500/5">
        <div className="mb-3 flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.9)] status-pulse" />
          <span className="text-sm font-semibold text-white">Cloud Status</span>
        </div>
        <p className="text-sm text-emerald-300">All systems operational</p>
      </div>
    </aside>
  )
}

export default Sidebar

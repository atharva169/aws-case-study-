import { Bell, Search, Menu, X } from 'lucide-react'

function Header({ search, onSearchChange, onToggleSidebar, mobileSidebarOpen }) {
  return (
    <header className="flex flex-col gap-4 border-b border-white/10 bg-[#0B0E13]/70 px-4 py-4 backdrop-blur-sm md:px-6 xl:flex-row xl:items-center xl:justify-between">
      <div className="flex items-center gap-3 xl:hidden">
        <button
          type="button"
          aria-label="Toggle navigation"
          onClick={onToggleSidebar}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-200 transition hover:border-orange-500/30 hover:text-white"
        >
          {mobileSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">Task Management</p>
      </div>

      <div className="hidden xl:block">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-400">Task Management</p>
      </div>

      <div className="flex flex-1 items-center justify-end gap-3">
        <label className="relative block w-full max-w-md">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            aria-label="Search tasks"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search tasks"
            className="w-full rounded-xl border border-white/10 bg-[#141b22] py-2.5 pl-9 pr-3 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-orange-500/40 focus:ring-2 focus:ring-orange-500/20"
          />
        </label>

        <button
          type="button"
          aria-label="Notifications"
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-200 transition hover:border-orange-500/30 hover:text-white"
        >
          <Bell className="h-4 w-4" />
        </button>

        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-orange-500/20 bg-gradient-to-br from-orange-500 to-orange-300 text-sm font-bold text-slate-950 shadow-lg shadow-orange-500/20">
          AS
        </div>
      </div>
    </header>
  )
}

export default Header

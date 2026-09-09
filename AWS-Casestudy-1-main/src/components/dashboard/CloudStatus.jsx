import { Activity, ArrowRight, Cloud, Gauge, ShieldCheck } from 'lucide-react'

function CloudStatus({ onViewArchitecture }) {
  return (
    <aside className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#0F1217] via-[#111821] to-[#0E141C] p-4 shadow-[0_18px_32px_rgba(0,0,0,0.22)] md:p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-400">Overview</p>
          <h3 className="mt-2 text-2xl font-semibold tracking-tight text-white">Application Health</h3>
        </div>
        <div className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-1 text-xs font-medium text-emerald-200">🟢 Operational</div>
      </div>

      <p className="mt-4 text-sm text-slate-300">
        TaskFlow is running on a highly available multi-AZ cloud architecture.
      </p>

      <div className="mt-6 rounded-2xl border border-white/10 bg-[#0b1117] p-4">
        <div className="mb-4 flex items-center justify-between text-xs uppercase tracking-[0.22em] text-slate-400">
          <span>CloudFront</span>
          <ArrowRight className="h-4 w-4 text-slate-500" />
          <span>ALB</span>
          <ArrowRight className="h-4 w-4 text-slate-500" />
          <span>EC2 × 2</span>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-200">
            <div className="flex items-center gap-2"><Cloud className="h-4 w-4 text-orange-300" /> CloudFront</div>
            <span className="text-emerald-300">Active</span>
          </div>
          <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-200">
            <div className="flex items-center gap-2"><Activity className="h-4 w-4 text-orange-300" /> ALB</div>
            <span className="text-emerald-300">Healthy</span>
          </div>
          <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-200">
            <div className="flex items-center gap-2"><Gauge className="h-4 w-4 text-orange-300" /> EC2</div>
            <span className="text-emerald-300">2 instances</span>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={onViewArchitecture}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-orange-500/20 bg-orange-500/10 px-4 py-3 text-sm font-semibold text-orange-200 transition hover:bg-orange-500/15"
      >
        View Architecture
      </button>

      <div className="mt-6 space-y-3 border-t border-white/10 pt-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-400">Application</span>
          <span className="font-medium text-emerald-300">Healthy</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-400">Availability</span>
          <span className="font-medium text-white">99.99%</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-400">Availability Zones</span>
          <span className="font-medium text-white">2 Active</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-400">Load Balancer</span>
          <span className="font-medium text-white">Operational</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-400">Auto Scaling</span>
          <span className="font-medium text-white">Enabled</span>
        </div>
      </div>

      <div className="mt-6 flex items-center gap-2 rounded-xl border border-orange-500/20 bg-orange-500/5 p-3 text-xs text-orange-100">
        <ShieldCheck className="h-4 w-4 text-orange-300" />
        Well-architected demo architecture
      </div>
    </aside>
  )
}

export default CloudStatus

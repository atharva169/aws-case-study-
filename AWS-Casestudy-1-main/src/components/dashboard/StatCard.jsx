function StatCard({ icon: Icon, label, value, description, accent }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#0F1217] p-4 shadow-[0_8px_24px_rgba(0,0,0,0.18)] transition duration-200 hover:-translate-y-0.5 hover:border-orange-500/20 hover:shadow-[0_10px_30px_rgba(255,153,0,0.08)]">
      <div className="flex items-center justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-100" style={{ boxShadow: accent ? `0 0 18px ${accent}20` : 'none' }}>
          <Icon className="h-5 w-5" style={{ color: accent || '#fff' }} />
        </div>
        <span className="text-2xl font-semibold text-white">{value}</span>
      </div>
      <div className="mt-5">
        <p className="text-sm text-slate-300">{label}</p>
        <p className="mt-1 text-xs text-slate-500">{description}</p>
      </div>
    </div>
  )
}

export default StatCard

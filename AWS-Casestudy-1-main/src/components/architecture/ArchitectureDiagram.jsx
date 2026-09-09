import { Cloud, Server, ShieldCheck, Activity, Gauge, Users } from 'lucide-react'

function ArchitectureDiagram({ failureMode, onSimulateFailure, onRestoreInstance }) {
  const isInstanceDown = failureMode === 'down'

  return (
    <div className="rounded-3xl border border-white/10 bg-[#0E141C] p-5 shadow-[0_18px_32px_rgba(0,0,0,0.22)]">
      <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-[11px] uppercase tracking-[0.28em] text-slate-400">Architecture</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">AWS Cloud Architecture</h2>
          <p className="mt-2 text-sm text-slate-400">Highly available multi-tier deployment</p>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={onSimulateFailure}
            className="rounded-xl border border-orange-500/30 bg-orange-500/10 px-3 py-2 text-sm font-medium text-orange-200 transition hover:bg-orange-500/15"
          >
            Simulate Instance Failure
          </button>
          <button
            type="button"
            onClick={onRestoreInstance}
            className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-medium text-slate-200 transition hover:border-white/20 hover:text-white"
          >
            Restore Instance
          </button>
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-[#0a1017] p-4">
        <div className="flex flex-col items-center gap-5 py-4">
          <div className="flex items-center gap-3 text-slate-200">
            <Users className="h-5 w-5 text-orange-300" />
            <span className="text-sm font-medium">Users</span>
          </div>
          <div className="h-8 w-px bg-gradient-to-b from-orange-300 via-slate-600 to-slate-600" />
          <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200">
            <Cloud className="h-4 w-4 text-orange-300" />
            CloudFront
          </div>
          <div className="h-8 w-px bg-gradient-to-b from-orange-300 via-slate-600 to-slate-600" />
          <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200">
            <Activity className="h-4 w-4 text-orange-300" />
            Application Load Balancer
          </div>

          <div className="mt-2 flex w-full flex-col items-center gap-4 md:flex-row md:justify-center">
            <div className="flex flex-col items-center gap-2">
              <div className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-sm ${isInstanceDown ? 'border-red-500/30 bg-red-500/10 text-red-100' : 'border-emerald-500/30 bg-emerald-500/10 text-emerald-100'}`}>
                <Server className="h-4 w-4" />
                EC2 AZ-1
              </div>
              <div className="text-xs text-slate-300">{isInstanceDown ? '🔴 Unavailable' : '🟢 Healthy'}</div>
            </div>

            <div className="hidden h-px w-14 bg-slate-600 md:block" />

            <div className="flex flex-col items-center gap-2">
              <div className="flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-100">
                <Server className="h-4 w-4" />
                EC2 AZ-2
              </div>
              <div className="text-xs text-slate-300">🟢 Healthy</div>
            </div>
          </div>

          <div className={`mt-2 rounded-xl border px-3 py-2 text-sm ${isInstanceDown ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-200' : 'border-white/10 bg-white/5 text-slate-200'}`}>
            {isInstanceDown ? 'Application remains available' : 'Traffic balanced across healthy instances'}
          </div>

          {isInstanceDown && (
            <div className="mt-1 w-full rounded-xl border border-orange-500/20 bg-orange-500/10 p-3 text-sm text-orange-100">
              The Application Load Balancer routes traffic to the healthy instance.
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {[
          ['CloudFront', 'Global content delivery and caching.'],
          ['Application Load Balancer', 'Distributes incoming traffic between healthy instances.'],
          ['EC2', 'Runs the TaskFlow application across multiple Availability Zones.'],
          ['Auto Scaling', 'Automatically adjusts the number of instances according to demand.'],
          ['VPC', 'Provides isolated networking.'],
          ['CloudWatch', 'Provides monitoring, metrics and alarms.'],
          ['IAM', 'Controls AWS resource permissions.'],
        ].map(([name, description]) => (
          <div key={name} className="rounded-2xl border border-white/10 bg-[#101821] p-4">
            <div className="mb-3 flex items-center gap-2 text-orange-200">
              {name === 'CloudFront' && <Cloud className="h-4 w-4" />}
              {name === 'Application Load Balancer' && <Activity className="h-4 w-4" />}
              {name === 'EC2' && <Server className="h-4 w-4" />}
              {name === 'Auto Scaling' && <Gauge className="h-4 w-4" />}
              {name === 'VPC' && <ShieldCheck className="h-4 w-4" />}
              {name === 'CloudWatch' && <Activity className="h-4 w-4" />}
              {name === 'IAM' && <ShieldCheck className="h-4 w-4" />}
              <span className="font-medium text-white">{name}</span>
            </div>
            <p className="text-sm text-slate-400">{description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ArchitectureDiagram

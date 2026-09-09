import {
  Activity,
  Cloud,
  Cpu,
  Leaf,
  ShieldCheck,
  Wallet,
  Wrench,
} from 'lucide-react'

const pillars = [
  {
    name: 'Operational Excellence',
    icon: Wrench,
    description: 'CloudWatch monitoring and infrastructure automation improve operations.',
    implementation: 'Automated health checks, deployment pipelines, and observability workflows.',
  },
  {
    name: 'Security',
    icon: ShieldCheck,
    description: 'IAM, security groups and least-privilege access protect cloud resources.',
    implementation: 'Role-based access, restricted ingress, and encrypted service communication.',
  },
  {
    name: 'Reliability',
    icon: Activity,
    description: 'Multi-AZ deployment, load balancing and health checks help maintain application availability.',
    implementation: 'Redundant instances, traffic routing, and failover protection across zones.',
  },
  {
    name: 'Performance Efficiency',
    icon: Cpu,
    description: 'CloudFront caching and load balancing improve application responsiveness.',
    implementation: 'Edge delivery, autoscaling, and optimized compute distribution.',
  },
  {
    name: 'Cost Optimization',
    icon: Wallet,
    description: 'Auto Scaling helps avoid paying for unnecessary compute capacity.',
    implementation: 'Right-sized resources and elastic scaling based on workload demand.',
  },
  {
    name: 'Sustainability',
    icon: Leaf,
    description: 'Efficient resource utilization and automatic scaling reduce unnecessary resource consumption.',
    implementation: 'Smarter scaling decisions and reduced idle infrastructure usage.',
  },
]

function WellArchitected() {
  return (
    <section className="rounded-3xl border border-white/10 bg-[#0F1217] p-4 shadow-[0_18px_32px_rgba(0,0,0,0.22)] md:p-6">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-orange-500/30 bg-orange-500/10 text-orange-300">
          <Cloud className="h-5 w-5" />
        </div>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-400">Framework</p>
          <h2 className="mt-1 text-2xl font-semibold text-white">AWS Well-Architected</h2>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {pillars.map(({ name, icon: Icon, description, implementation }) => (
          <div key={name} className="rounded-2xl border border-white/10 bg-[#111821] p-4 transition duration-200 hover:-translate-y-0.5 hover:border-orange-500/20">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-orange-300">
              <Icon className="h-5 w-5" />
            </div>
            <h3 className="text-xl font-semibold text-white">{name}</h3>
            <p className="mt-3 text-sm leading-6 text-slate-300">{description}</p>
            <div className="mt-4 rounded-xl border border-orange-500/15 bg-orange-500/5 p-3">
              <p className="text-xs uppercase tracking-[0.22em] text-orange-200">Implementation</p>
              <p className="mt-2 text-sm text-slate-200">{implementation}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default WellArchitected

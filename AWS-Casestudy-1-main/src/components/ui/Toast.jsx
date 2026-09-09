import { CheckCircle2, CircleAlert, Trash2 } from 'lucide-react'

function Toast({ message, type = 'success', visible }) {
  if (!visible || !message) return null

  const config = {
    success: {
      icon: CheckCircle2,
      classes: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-200',
    },
    info: {
      icon: CircleAlert,
      classes: 'border-orange-500/30 bg-orange-500/10 text-orange-100',
    },
    danger: {
      icon: Trash2,
      classes: 'border-red-500/30 bg-red-500/10 text-red-100',
    },
  }

  const { icon: Icon, classes } = config[type] || config.success

  return (
    <div className="pointer-events-none fixed right-4 top-4 z-50">
      <div
        className={`flex items-center gap-3 rounded-xl border px-4 py-3 shadow-2xl shadow-black/40 backdrop-blur-sm ${classes}`}
      >
        <Icon className="h-4 w-4" />
        <span className="text-sm font-medium">{message}</span>
      </div>
    </div>
  )
}

export default Toast

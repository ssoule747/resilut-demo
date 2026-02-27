import { Loader2 } from 'lucide-react'
import { statusConfig } from '@/data/mockData'

export default function StatusBadge({ status }) {
  const config = statusConfig[status]
  if (!config) return <span className="text-xs text-[#64748b]">{status}</span>

  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold transition-transform duration-150 hover:scale-105"
      style={{
        color: config.color,
        backgroundColor: config.bg,
        border: config.style === 'outline' ? `1px solid ${config.border}` : 'none',
      }}
    >
      {config.spinner && <Loader2 className="h-3 w-3 animate-spin" />}
      {status}
    </span>
  )
}

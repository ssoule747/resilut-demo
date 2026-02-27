import { motion } from 'framer-motion'
import {
  Bot,
  RefreshCcw,
  Search,
  Wrench,
  AlertTriangle,
  FileText,
  Send,
  Clock,
} from 'lucide-react'
import { activityFeed } from '@/data/mockData'

const typeIcons = {
  ai: Bot,
  update: RefreshCcw,
  inspection: Search,
  maintenance: Wrench,
  refi: RefreshCcw,
  deal: Send,
  alert: AlertTriangle,
  lease: FileText,
}

const typeColors = {
  ai: '#8b5cf6',
  update: '#3b82f6',
  inspection: '#06b6d4',
  maintenance: '#f97316',
  refi: '#10b981',
  deal: '#3b82f6',
  alert: '#ef4444',
  lease: '#f59e0b',
}

export default function ActivityFeed() {
  return (
    <div className="glass-card h-full rounded-xl p-5">
      {/* Header */}
      <h3 className="mb-4 font-heading text-sm font-semibold text-[#f8fafc]">
        Recent Activity
      </h3>

      {/* List */}
      <div className="flex flex-col">
        {activityFeed.map((activity, i) => {
          const Icon = typeIcons[activity.type] || RefreshCcw
          const color = typeColors[activity.type] || '#3b82f6'

          return (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08, duration: 0.3 }}
              className="flex items-start gap-3 border-b border-white/5 py-3 last:border-0"
            >
              {/* Icon circle */}
              <div
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
                style={{ background: `${color}1a` }}
              >
                <Icon className="h-4 w-4" style={{ color }} />
              </div>

              {/* Content */}
              <div className="flex-1">
                <p className="text-sm leading-snug text-[#94a3b8]">
                  {activity.action}
                </p>
                <div className="mt-1 flex items-center gap-2">
                  <Clock className="h-3 w-3 text-[#64748b]" />
                  <span className="text-xs text-[#64748b]">
                    {activity.timestamp}
                  </span>
                  <span className="text-[#334155]">&middot;</span>
                  <span className="text-xs text-[#64748b]">
                    {activity.user}
                  </span>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

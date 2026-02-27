import { motion } from 'framer-motion'
import { Shield, AlertTriangle, CheckCircle, Database } from 'lucide-react'
import { underwritingData } from '@/data/mockData'

const flagConfig = {
  yellow: {
    borderColor: 'border-l-[#eab308]',
    bgTint: 'bg-[#eab308]/5',
    iconColor: 'text-[#eab308]',
    Icon: AlertTriangle,
  },
  green: {
    borderColor: 'border-l-[#10b981]',
    bgTint: 'bg-[#10b981]/5',
    iconColor: 'text-[#10b981]',
    Icon: CheckCircle,
  },
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
}

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
}

export default function RiskAnalysis() {
  const { riskFlags, historicalComparison } = underwritingData

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      {/* ── Risk Flags ── */}
      <motion.div variants={item}>
        <div className="flex items-center gap-2 mb-4">
          <Shield className="h-4 w-4 text-[#94a3b8]" />
          <h3 className="font-heading text-sm font-semibold text-[#f8fafc] tracking-wide uppercase">
            Risk Assessment
          </h3>
        </div>

        <div className="space-y-3">
          {riskFlags.map((flag, i) => {
            const cfg = flagConfig[flag.color] || flagConfig.green
            const IconComp = cfg.Icon

            return (
              <motion.div
                key={i}
                variants={item}
                className={`
                  bg-[#0f172a]/60 border border-white/[0.06] rounded-xl p-4
                  border-l-[3px] ${cfg.borderColor} ${cfg.bgTint}
                `}
              >
                <div className="flex items-start gap-3">
                  <IconComp className={`h-4 w-4 mt-0.5 shrink-0 ${cfg.iconColor}`} />
                  <p className="text-sm text-[#94a3b8] leading-relaxed">
                    {flag.message}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </motion.div>

      {/* ── Historical Comparison (RAG Insight) ── */}
      <motion.div variants={item}>
        <div className="bg-gradient-to-r from-[#8b5cf6]/5 to-transparent border border-[#8b5cf6]/15 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <Database className="h-4 w-4 text-[#8b5cf6]" />
            <span className="text-xs font-semibold text-[#8b5cf6] tracking-wide uppercase">
              RAG-Retrieved Market Intelligence
            </span>
          </div>

          <p className="text-sm text-[#94a3b8] leading-relaxed mb-4">
            {historicalComparison.summary}
          </p>

          <div className="flex items-center gap-4 text-xs">
            <span className="font-mono text-[#8b5cf6]/80">
              {historicalComparison.comparableDeals} comps
            </span>
            <span className="text-white/20">&middot;</span>
            <span className="font-mono text-[#8b5cf6]/80">
              {historicalComparison.percentile}th percentile
            </span>
            <span className="text-white/20">&middot;</span>
            <span className="font-mono text-[#8b5cf6]/80">
              {historicalComparison.closeRate}% close rate
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

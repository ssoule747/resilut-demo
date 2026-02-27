import { motion } from 'framer-motion'
import { underwritingData } from '@/data/mockData'

const fmt = (v) =>
  '$' + v.toLocaleString('en-US', { maximumFractionDigits: 0 })

const metrics = [
  // Row 1
  {
    label: 'ARV',
    value: fmt(underwritingData.arv),
    confidence: underwritingData.arvConfidence,
    source: 'HouseCanary / Quantarium',
  },
  {
    label: 'Purchase Price',
    value: fmt(underwritingData.purchasePrice),
  },
  {
    label: 'Renovation',
    value: fmt(underwritingData.renovationCost),
  },
  {
    label: 'All-In Cost',
    value: fmt(underwritingData.allInCost),
  },
  // Row 2
  {
    label: 'Est. Rent',
    value: fmt(underwritingData.estimatedRent),
    suffix: '/mo',
    confidence: underwritingData.rentConfidence,
    source: 'Rentometer',
  },
  {
    label: 'DSCR',
    value: underwritingData.projectedDSCR.toFixed(2),
  },
  {
    label: 'Cash-on-Cash',
    value: `${underwritingData.cashOnCash}%`,
    green: true,
  },
  {
    label: 'Max Purchase',
    value: fmt(underwritingData.maxPurchasePrice),
  },
]

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.06 },
  },
}

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
}

function ConfidenceDots({ filled, total = 5 }) {
  return (
    <div className="flex items-center gap-1 mt-2">
      {Array.from({ length: total }, (_, i) => (
        <span
          key={i}
          className={`w-2 h-2 rounded-full ${
            i < filled ? 'bg-[#3b82f6]' : 'bg-[#334155]'
          }`}
        />
      ))}
    </div>
  )
}

export default function MetricsGrid() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-2 lg:grid-cols-4 gap-4"
    >
      {metrics.map((m) => (
        <motion.div
          key={m.label}
          variants={item}
          className="bg-[#0f172a]/80 backdrop-blur-xl border border-white/[0.06] rounded-xl p-4"
        >
          <p className="text-xs text-[#64748b] uppercase tracking-wider">
            {m.label}
          </p>

          <p
            className={`font-mono text-xl font-bold mt-1 ${
              m.green ? 'text-[#10b981]' : 'text-[#f8fafc]'
            }`}
          >
            {m.value}
            {m.suffix && (
              <span className="text-sm font-normal text-[#64748b] ml-0.5">
                {m.suffix}
              </span>
            )}
          </p>

          {m.confidence != null && (
            <>
              <ConfidenceDots filled={m.confidence} />
              {m.source && (
                <p className="text-[10px] text-[#475569] mt-1">{m.source}</p>
              )}
            </>
          )}
        </motion.div>
      ))}
    </motion.div>
  )
}

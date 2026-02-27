import { motion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'
import { underwritingData, HERO_PROPERTY } from '@/data/mockData'

const RADIUS = 85
const CIRCUMFERENCE = 2 * Math.PI * RADIUS // ~534.07
const score = underwritingData.dealScore
const offset = CIRCUMFERENCE * (1 - score / 100)

export default function DealScorecard() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="bg-[#0f172a]/80 backdrop-blur-xl border border-white/[0.06] rounded-xl p-8"
    >
      <div className="flex flex-col items-center">
        {/* Circular Gauge */}
        <svg width={200} height={200} viewBox="0 0 200 200">
          {/* Background circle */}
          <circle
            cx="100"
            cy="100"
            r={RADIUS}
            stroke="#1e293b"
            strokeWidth="12"
            fill="none"
          />
          {/* Foreground arc */}
          <motion.circle
            cx="100"
            cy="100"
            r={RADIUS}
            stroke="#3b82f6"
            strokeWidth="12"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            initial={{ strokeDashoffset: CIRCUMFERENCE }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.5, ease: 'easeOut', delay: 0.3 }}
            transform="rotate(-90 100 100)"
            style={{ filter: 'drop-shadow(0 0 8px rgba(59, 130, 246, 0.4))' }}
          />
          {/* Score number */}
          <text
            x="100"
            y="96"
            textAnchor="middle"
            dominantBaseline="central"
            className="font-mono"
            fontSize="48"
            fontWeight="bold"
            fill="white"
          >
            {score}
          </text>
          {/* /100 label */}
          <text
            x="100"
            y="126"
            textAnchor="middle"
            dominantBaseline="central"
            fontSize="14"
            fill="#64748b"
          >
            /100
          </text>
        </svg>

        {/* Recommendation badge */}
        <div className="mt-6 flex items-center gap-2 bg-[#10b981]/10 text-[#10b981] border border-[#10b981]/20 px-5 py-2 rounded-xl text-sm font-semibold">
          <CheckCircle className="w-4 h-4" />
          <span>
            {underwritingData.recommendation} &mdash; {underwritingData.recommendationDetail}
          </span>
        </div>

        {/* Property address */}
        <p className="text-[#94a3b8] text-sm mt-3">
          {HERO_PROPERTY.address}, {HERO_PROPERTY.city}, {HERO_PROPERTY.state} {HERO_PROPERTY.zip}
        </p>

        {/* Property stats */}
        <p className="text-[#64748b] text-xs font-mono mt-1">
          {HERO_PROPERTY.beds} bd / {HERO_PROPERTY.baths} ba / {HERO_PROPERTY.sqft.toLocaleString()} sqft
        </p>
      </div>
    </motion.div>
  )
}

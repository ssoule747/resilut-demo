import { MapPin, Bed, Bath, Maximize, Calendar } from 'lucide-react'
import { motion } from 'framer-motion'
import { HERO_PROPERTY } from '@/data/mockData'

const conditionBadgeStyles = {
  'Heavy Rehab': 'bg-amber-500/15 text-amber-400 border-amber-500/20',
  'Light Rehab': 'bg-blue-500/15 text-blue-400 border-blue-500/20',
  'Turnkey': 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20',
}

export default function PropertyHeader() {
  const p = HERO_PROPERTY
  const badgeClass =
    conditionBadgeStyles[p.conditionTier] || conditionBadgeStyles['Heavy Rehab']

  return (
    <motion.div
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="bg-[#0f172a]/80 backdrop-blur-xl border border-white/[0.06] rounded-xl px-6 py-4"
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Address block */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-blue-500/10">
            <MapPin className="w-4.5 h-4.5 text-blue-400" />
          </div>
          <div className="min-w-0">
            <h2 className="font-heading text-lg font-semibold text-[#f8fafc] truncate">
              {p.address}
            </h2>
            <p className="text-sm text-[#94a3b8]">
              {p.city}, {p.state} {p.zip}
            </p>
          </div>
        </div>

        {/* Stats row */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 text-[#cbd5e1]">
            <Bed className="w-4 h-4 text-[#64748b]" />
            <span className="font-mono text-sm">{p.beds}</span>
            <span className="text-xs text-[#64748b]">bd</span>
          </div>

          <div className="flex items-center gap-2 text-[#cbd5e1]">
            <Bath className="w-4 h-4 text-[#64748b]" />
            <span className="font-mono text-sm">{p.baths}</span>
            <span className="text-xs text-[#64748b]">ba</span>
          </div>

          <div className="flex items-center gap-2 text-[#cbd5e1]">
            <Maximize className="w-4 h-4 text-[#64748b]" />
            <span className="font-mono text-sm">
              {p.sqft.toLocaleString()}
            </span>
            <span className="text-xs text-[#64748b]">sqft</span>
          </div>

          <div className="flex items-center gap-2 text-[#cbd5e1]">
            <Calendar className="w-4 h-4 text-[#64748b]" />
            <span className="font-mono text-sm">{p.yearBuilt}</span>
          </div>

          {/* Condition tier badge */}
          <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${badgeClass}`}
          >
            {p.conditionTier}
          </span>
        </div>
      </div>
    </motion.div>
  )
}

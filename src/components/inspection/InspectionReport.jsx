import { useState } from 'react'
import { ChevronLeft, ChevronRight, FileText } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { HERO_PROPERTY } from '@/data/mockData'

const pages = [
  [
    `Upon inspection of the northeast corner of the foundation, evidence of significant structural cracking was observed extending approximately 12 linear feet. The crack width varies from 1/8" to 3/8" with evidence of lateral displacement. Moisture intrusion was noted at the base of the affected area. Recommend evaluation by a licensed structural engineer prior to acquisition.`,
    `The roofing system consists of asphalt shingles that appear to be original to the construction (est. 1962). Approximately 30% of the shingle coverage shows significant deterioration including curling, missing tabs, and granule loss. Several areas of exposed underlayment were observed on the south-facing slope.`,
    `The electrical service panel is a Federal Pacific Stab-Lok model, which is widely considered a safety hazard and is no longer manufactured. Panel showed signs of overheating at multiple breaker connections.`,
  ],
  [
    `The HVAC system is a 2.5-ton split unit manufactured in 2004, exceeding its expected service life. The evaporator coil shows evidence of refrigerant leakage and the condenser fins are significantly damaged. System was operational at time of inspection but cooling output measured 40% below rated capacity.`,
    `Plumbing supply lines are a mix of original galvanized steel and partial copper replacement. The galvanized sections show significant internal corrosion with reduced flow rates measured at 1.2 GPM (expected 3.5 GPM). Evidence of previous leak repairs observed at three junction points in the crawl space.`,
    `Interior wall surfaces in the master bedroom and hallway show evidence of previous water damage with staining patterns consistent with roof leak penetration. Drywall moisture readings measured between 18-24% in affected areas, indicating active moisture intrusion.`,
  ],
  [
    `The property's grading directs surface water toward the foundation on the north and east sides. Downspout extensions are missing or damaged, with erosion channels visible along the foundation perimeter. A French drain system is recommended to mitigate ongoing moisture intrusion risk.`,
    `Window units throughout the property are original single-pane aluminum frame construction. Multiple units show failed glazing seals, inoperable locking mechanisms, and deteriorated weatherstripping. Energy loss through fenestration is estimated at 35% above current code requirements.`,
    `Overall, the property requires significant renovation investment across structural, mechanical, and envelope systems. The defects identified are consistent with deferred maintenance on a property of this vintage. A detailed scope of work with prioritized remediation is recommended before proceeding with acquisition.`,
  ],
]

export default function InspectionReport() {
  const p = HERO_PROPERTY
  const [page, setPage] = useState(0)

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut', delay: 0.15 }}
      className="bg-[#0f172a]/80 backdrop-blur-xl border border-white/[0.06] rounded-xl overflow-hidden"
    >
      {/* Card header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.06]">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-500/10">
            <FileText className="w-4 h-4 text-blue-400" />
          </div>
          <h3 className="font-heading text-base font-semibold text-[#f8fafc]">
            Inspection Report
          </h3>
        </div>
        <span className="text-xs font-mono text-[#64748b] bg-[#1e293b]/60 px-2.5 py-1 rounded-md border border-white/[0.04]">
          Source: Inspectify
        </span>
      </div>

      {/* Document page area */}
      <div className="p-6">
        <div className="bg-[#1e293b]/60 rounded-lg border border-white/[0.04] overflow-hidden">
          {/* Page header */}
          <div className="px-8 pt-8 pb-6 border-b border-white/[0.06]">
            <div className="flex items-start justify-between">
              <div>
                <h4
                  className="text-lg font-bold tracking-wide text-slate-200 uppercase"
                  style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
                >
                  Property Inspection Report
                </h4>
                <div className="mt-3 space-y-1">
                  <p className="text-sm text-slate-400" style={{ fontFamily: 'Georgia, serif' }}>
                    {p.address}, {p.city}, {p.state} {p.zip}
                  </p>
                  <p className="text-sm text-slate-500" style={{ fontFamily: 'Georgia, serif' }}>
                    February 12, 2026
                  </p>
                </div>
              </div>
              {/* Inspector logo placeholder */}
              <div className="w-10 h-10 rounded bg-slate-700/50 border border-white/[0.06] flex items-center justify-center flex-shrink-0">
                <span className="text-[10px] font-mono text-slate-500 uppercase">Logo</span>
              </div>
            </div>
          </div>

          {/* Page body */}
          <div className="px-8 py-6 space-y-5 min-h-[220px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={page}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-5"
              >
                {pages[page].map((text, i) => (
                  <p
                    key={i}
                    className="text-sm leading-relaxed text-slate-300/90"
                    style={{ fontFamily: 'Georgia, serif' }}
                  >
                    {text}
                  </p>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Page footer */}
          <div className="flex items-center justify-between px-8 py-4 border-t border-white/[0.06]">
            <motion.button
              whileTap={{ scale: 0.9 }}
              type="button"
              onClick={() => setPage(p => Math.max(0, p - 1))}
              disabled={page === 0}
              className={`p-1.5 rounded-md transition-colors ${
                page === 0
                  ? 'text-slate-600 cursor-default'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/40 cursor-pointer'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
            </motion.button>
            <span
              className="text-xs text-slate-500"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              Page {page + 1} of {pages.length}
            </span>
            <motion.button
              whileTap={{ scale: 0.9 }}
              type="button"
              onClick={() => setPage(p => Math.min(pages.length - 1, p + 1))}
              disabled={page === pages.length - 1}
              className={`p-1.5 rounded-md transition-colors ${
                page === pages.length - 1
                  ? 'text-slate-600 cursor-default'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/40 cursor-pointer'
              }`}
            >
              <ChevronRight className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

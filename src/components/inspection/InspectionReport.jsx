import { ChevronLeft, ChevronRight, FileText } from 'lucide-react'
import { motion } from 'framer-motion'
import { HERO_PROPERTY } from '@/data/mockData'

export default function InspectionReport() {
  const p = HERO_PROPERTY

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
          <div className="px-8 py-6 space-y-5">
            <p
              className="text-sm leading-relaxed text-slate-300/90"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              Upon inspection of the northeast corner of the foundation, evidence of
              significant structural cracking was observed extending approximately 12
              linear feet. The crack width varies from 1/8&quot; to 3/8&quot; with evidence of
              lateral displacement. Moisture intrusion was noted at the base of the
              affected area. Recommend evaluation by a licensed structural engineer
              prior to acquisition.
            </p>

            <p
              className="text-sm leading-relaxed text-slate-300/90"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              The roofing system consists of asphalt shingles that appear to be original
              to the construction (est. 1962). Approximately 30% of the shingle coverage
              shows significant deterioration including curling, missing tabs, and granule
              loss. Several areas of exposed underlayment were observed on the
              south-facing slope.
            </p>

            <p
              className="text-sm leading-relaxed text-slate-300/90"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              The electrical service panel is a Federal Pacific Stab-Lok model, which is
              widely considered a safety hazard and is no longer manufactured. Panel
              showed signs of overheating at multiple breaker connections.
            </p>
          </div>

          {/* Page footer */}
          <div className="flex items-center justify-between px-8 py-4 border-t border-white/[0.06]">
            <button
              type="button"
              className="p-1.5 rounded-md text-slate-500 hover:text-slate-300 hover:bg-slate-700/40 transition-colors cursor-default"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span
              className="text-xs text-slate-500"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              Page 1 of 3
            </span>
            <button
              type="button"
              className="p-1.5 rounded-md text-slate-500 hover:text-slate-300 hover:bg-slate-700/40 transition-colors cursor-default"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

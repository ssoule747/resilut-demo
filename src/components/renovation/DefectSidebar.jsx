import { motion } from 'framer-motion'

const severityColor = {
  Critical: '#ef4444',
  Major: '#f97316',
  Moderate: '#eab308',
  Minor: '#64748b',
}

export default function DefectSidebar({ defects, activeDefectId, onSelectDefect }) {
  const criticalCount = defects.filter((d) => d.severity === 'Critical').length
  const majorCount = defects.filter((d) => d.severity === 'Major').length

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="w-[220px] min-w-[220px] flex flex-col bg-[#0f172a]/90 backdrop-blur-xl border border-white/[0.06] rounded-xl overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06]">
        <h3 className="font-heading text-sm font-semibold text-[#f8fafc]">Source Defects</h3>
        <span className="font-mono text-[11px] bg-white/[0.06] text-[#94a3b8] rounded-full px-2 py-0.5">
          {defects.length}
        </span>
      </div>

      {/* Scrollable list */}
      <div className="flex-1 overflow-y-auto">
        {defects.map((defect) => {
          const isActive = defect.id === activeDefectId
          return (
            <button
              key={defect.id}
              onClick={() => onSelectDefect(defect.id)}
              className={`w-full text-left px-3 py-2.5 cursor-pointer transition-colors border-l-2 ${
                isActive
                  ? 'bg-[#3b82f6]/8 border-l-[#3b82f6]'
                  : 'border-l-transparent hover:bg-white/[0.03]'
              }`}
            >
              <div className="flex items-start gap-2">
                {/* Severity dot */}
                <span
                  className="mt-1.5 block h-2 w-2 min-w-[8px] rounded-full"
                  style={{ backgroundColor: severityColor[defect.severity] }}
                />
                <div className="min-w-0 flex-1">
                  <p
                    className={`text-xs leading-snug line-clamp-2 ${
                      isActive ? 'text-[#f8fafc]' : 'text-[#cbd5e1]'
                    }`}
                  >
                    {defect.defect}
                  </p>
                  <p className="text-[10px] text-[#64748b] mt-0.5">{defect.trade}</p>
                </div>
              </div>
            </button>
          )
        })}
      </div>

      {/* Bottom summary */}
      <div className="px-4 py-2.5 border-t border-white/[0.06]">
        <p className="text-[10px] text-[#64748b] leading-relaxed">
          {defects.length} defects &mdash; {criticalCount} Critical, {majorCount} Major
        </p>
      </div>
    </motion.div>
  )
}

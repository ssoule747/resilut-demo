import { motion } from 'framer-motion';
import { Sparkles, Check, Minus, AlertTriangle, ShieldAlert, AlertCircle, Info } from 'lucide-react';
import { defectLedger } from '@/data/mockData';

const severityConfig = {
  Critical: {
    bg: 'bg-[#ef4444]/10',
    text: 'text-[#ef4444]',
    border: 'border-[#ef4444]/20',
    dot: 'bg-[#ef4444]',
    barColor: '#ef4444',
    icon: ShieldAlert,
  },
  Major: {
    bg: 'bg-[#f97316]/10',
    text: 'text-[#f97316]',
    border: 'border-[#f97316]/20',
    dot: 'bg-[#f97316]',
    barColor: '#f97316',
    icon: AlertTriangle,
  },
  Moderate: {
    bg: 'bg-[#eab308]/10',
    text: 'text-[#eab308]',
    border: 'border-[#eab308]/20',
    dot: 'bg-[#eab308]',
    barColor: '#eab308',
    icon: AlertCircle,
  },
  Minor: {
    bg: 'bg-[#64748b]/10',
    text: 'text-[#94a3b8]',
    border: 'border-[#64748b]/20',
    dot: 'bg-[#64748b]',
    barColor: '#64748b',
    icon: Info,
  },
};

const severityOrder = ['Critical', 'Major', 'Moderate', 'Minor'];

function SeverityBadge({ severity }) {
  const config = severityConfig[severity];
  if (!config) return null;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-medium border ${config.bg} ${config.text} ${config.border}`}
    >
      {severity === 'Critical' && (
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#ef4444] opacity-75" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#ef4444]" />
        </span>
      )}
      {severity}
    </span>
  );
}

function SummaryStats() {
  const counts = {};
  severityOrder.forEach((s) => (counts[s] = 0));
  defectLedger.forEach((d) => {
    if (counts[d.severity] !== undefined) counts[d.severity]++;
  });
  const total = defectLedger.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.5 }}
      className="mt-4 bg-[#0f172a]/60 backdrop-blur-xl border border-white/[0.06] rounded-xl p-4"
    >
      {/* Summary text */}
      <p className="text-[#94a3b8] text-sm mb-3">
        <span className="text-[#f8fafc] font-semibold">{total} defects</span> identified
        {' \u2014 '}
        {severityOrder.map((sev, i) => (
          <span key={sev}>
            <span className={severityConfig[sev].text}>{counts[sev]} {sev}</span>
            {i < severityOrder.length - 1 && ', '}
          </span>
        ))}
      </p>

      {/* Distribution bar */}
      <div className="flex w-full h-2 rounded-full overflow-hidden gap-px">
        {severityOrder.map((sev) => {
          const pct = (counts[sev] / total) * 100;
          if (pct === 0) return null;
          return (
            <motion.div
              key={sev}
              initial={{ width: 0 }}
              animate={{ width: `${pct}%` }}
              transition={{ delay: 0.8, duration: 0.6, ease: 'easeOut' }}
              className="h-full rounded-full first:rounded-l-full last:rounded-r-full"
              style={{ backgroundColor: severityConfig[sev].barColor }}
            />
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 mt-3">
        {severityOrder.map((sev) => (
          <div key={sev} className="flex items-center gap-1.5">
            <span className={`h-2 w-2 rounded-full ${severityConfig[sev].dot}`} />
            <span className="text-[#64748b] text-[11px] font-medium">{sev}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default function DefectLedgerTable() {
  return (
    <div className="flex flex-col h-full">
      {/* Glass card wrapper */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-[#0f172a]/80 backdrop-blur-xl border border-white/[0.06] rounded-xl overflow-hidden flex-1 flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center gap-2.5 px-5 py-4 border-b border-white/[0.06]">
          <div className="flex items-center justify-center h-7 w-7 rounded-lg bg-gradient-to-br from-[#6366f1]/20 to-[#8b5cf6]/20 border border-[#6366f1]/20">
            <Sparkles className="h-3.5 w-3.5 text-[#818cf8]" />
          </div>
          <h2 className="font-heading text-[#f8fafc] text-sm font-semibold tracking-tight">
            AI-Extracted Defect Ledger
          </h2>
        </div>

        {/* Table */}
        <div className="overflow-auto flex-1">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/[0.06]">
                {['#', 'Defect', 'System', 'Trade', 'Severity', 'Urgency', 'Code'].map(
                  (col) => (
                    <th
                      key={col}
                      className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-[#64748b]"
                    >
                      {col}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {defectLedger.map((defect, index) => (
                <motion.tr
                  key={defect.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.1 + index * 0.06,
                    duration: 0.35,
                    ease: 'easeOut',
                  }}
                  className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors duration-150 even:bg-white/[0.01]"
                >
                  {/* ID */}
                  <td className="px-4 py-3 font-mono text-xs text-[#64748b] whitespace-nowrap">
                    {defect.id}
                  </td>

                  {/* Defect */}
                  <td className="px-4 py-3">
                    <span
                      className="block truncate max-w-[200px] text-sm text-[#94a3b8]"
                      title={defect.defect}
                    >
                      {defect.defect}
                    </span>
                  </td>

                  {/* System */}
                  <td className="px-4 py-3 text-xs text-[#94a3b8] whitespace-nowrap">
                    {defect.system}
                  </td>

                  {/* Trade */}
                  <td className="px-4 py-3 text-xs text-[#94a3b8] whitespace-nowrap">
                    {defect.trade}
                  </td>

                  {/* Severity */}
                  <td className="px-4 py-3">
                    <SeverityBadge severity={defect.severity} />
                  </td>

                  {/* Urgency */}
                  <td className="px-4 py-3 text-xs text-[#94a3b8] whitespace-nowrap">
                    {defect.urgency}
                  </td>

                  {/* Code Relevance */}
                  <td className="px-4 py-3 text-center">
                    {defect.codeRelevance ? (
                      <Check className="h-4 w-4 text-[#10b981] mx-auto" />
                    ) : (
                      <Minus className="h-4 w-4 text-[#64748b] mx-auto" />
                    )}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Summary Stats */}
      <SummaryStats />
    </div>
  );
}

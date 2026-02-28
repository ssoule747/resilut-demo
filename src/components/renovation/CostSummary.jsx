import { useState } from 'react'
import { motion } from 'framer-motion'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'
import { Zap, Download, FileText, Check, Clock, Shield, CheckCircle2 } from 'lucide-react'

const COLORS = [
  '#ef4444', '#f97316', '#eab308', '#06b6d4',
  '#8b5cf6', '#3b82f6', '#10b981', '#64748b',
]

const TRADE_LABELS = {
  foundation: 'Foundation',
  roofing: 'Roofing',
  electrical: 'Electrical',
  hvac: 'HVAC',
  plumbing: 'Plumbing',
  interior: 'Interior',
  exterior: 'Exterior',
  windows: 'Windows',
}

function fmt(n) {
  return '$' + Number(n).toLocaleString()
}

export default function CostSummary({ scope, activeTrade }) {
  const [sowDownloaded, setSowDownloaded] = useState(false)
  const [changeOrderOpen, setChangeOrderOpen] = useState(false)
  const chartData = Object.entries(scope.trades).map(([key, t]) => ({
    name: t.trade,
    value: t.subtotal,
    key,
  }))

  const colorMap = {}
  Object.keys(scope.trades).forEach((key, i) => {
    colorMap[key] = COLORS[i % COLORS.length]
  })

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="sticky top-6 w-[280px] flex-shrink-0"
    >
      <div className="bg-[#0f172a]/90 backdrop-blur-xl border border-white/[0.06] rounded-xl overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-white/[0.04]">
          <h2 className="font-heading text-sm font-semibold text-[#f8fafc] tracking-wide uppercase">
            Cost Summary
          </h2>
        </div>

        {/* Donut Chart */}
        <div className="p-5 border-b border-white/[0.04]">
          <div className="flex justify-center">
            <PieChart width={240} height={240}>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={95}
                paddingAngle={2}
                dataKey="value"
                stroke="none"
              >
                {chartData.map((entry, i) => (
                  <Cell
                    key={entry.key}
                    fill={COLORS[i % COLORS.length]}
                    style={{
                      filter:
                        activeTrade === entry.key
                          ? 'brightness(1.3) drop-shadow(0 0 6px ' + COLORS[i % COLORS.length] + ')'
                          : 'none',
                      transition: 'all 0.3s ease',
                    }}
                    outerRadius={activeTrade === entry.key ? 100 : 95}
                  />
                ))}
              </Pie>
              {/* Center label */}
              <text
                x="50%"
                y="48%"
                textAnchor="middle"
                dominantBaseline="central"
                className="font-mono"
                fill="#f8fafc"
                fontSize={18}
                fontWeight="bold"
              >
                {fmt(scope.totalBudget)}
              </text>
              <text
                x="50%"
                y="60%"
                textAnchor="middle"
                dominantBaseline="central"
                fill="#64748b"
                fontSize={10}
              >
                Total Budget
              </text>
            </PieChart>
          </div>

          {/* Legend */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 mt-3">
            {Object.entries(scope.trades).map(([key, t], i) => (
              <div key={key} className="flex items-center gap-1.5 min-w-0">
                <span
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ backgroundColor: COLORS[i % COLORS.length] }}
                />
                <span className="text-[11px] text-[#94a3b8] truncate">
                  {TRADE_LABELS[key] || t.trade}
                </span>
                <span className="text-[11px] text-[#94a3b8] font-mono ml-auto flex-shrink-0">
                  {fmt(t.subtotal)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Key Metrics */}
        <div className="p-5 border-b border-white/[0.04] space-y-3">
          {/* Base Cost */}
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#94a3b8]">Base Cost</span>
            <span className="font-mono text-sm text-[#f8fafc]">
              {fmt(scope.baseCost)}
            </span>
          </div>

          {/* Contingency */}
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#94a3b8]">
              Contingency ({scope.contingencyPercent}%)
            </span>
            <span className="font-mono text-sm text-[#94a3b8]">
              {fmt(scope.contingencyAmount)}
            </span>
          </div>

          {/* Divider */}
          <div className="border-t border-white/[0.06]" />

          {/* Total Budget */}
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#94a3b8] font-semibold">
              Total Budget
            </span>
            <span className="font-mono text-xl font-bold text-[#f59e0b]">
              {fmt(scope.totalBudget)}
            </span>
          </div>

          {/* Divider */}
          <div className="border-t border-white/[0.06]" />

          {/* RSMeans Confidence */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs text-[#94a3b8] flex items-center gap-1.5">
                <Shield className="w-3 h-3" />
                RSMeans Confidence
              </span>
              <span className="text-xs text-[#10b981] font-mono font-semibold">
                {scope.rsMeansConfidence}%
              </span>
            </div>
            <div className="h-1.5 rounded-full bg-[#1e293b] overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-[#10b981]"
                initial={{ width: 0 }}
                animate={{ width: `${scope.rsMeansConfidence}%` }}
                transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
              />
            </div>
          </div>

          {/* Estimated Duration */}
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#94a3b8] flex items-center gap-1.5">
              <Clock className="w-3 h-3" />
              Estimated Duration
            </span>
            <span className="font-mono text-sm text-[#f8fafc]">
              {scope.estimatedDuration}
            </span>
          </div>

          {/* Contractor SOW Status */}
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#94a3b8]">Contractor SOW</span>
            <span className="text-xs text-[#10b981] flex items-center gap-1">
              <Check className="w-3 h-3" />
              Ready for Distribution
            </span>
          </div>
        </div>

        {/* 47 Seconds Badge */}
        <div className="p-5 border-b border-white/[0.04]">
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.95,
              boxShadow: '0 0 0px rgba(245, 158, 11, 0)',
            }}
            animate={{
              opacity: 1,
              scale: 1,
              boxShadow: [
                '0 0 30px rgba(245, 158, 11, 0.3)',
                '0 0 0px rgba(245, 158, 11, 0)',
              ],
            }}
            transition={{ duration: 1.2, ease: 'easeOut', delay: 0.5 }}
            className="bg-gradient-to-br from-[#f59e0b]/10 via-[#f59e0b]/5 to-transparent border border-[#f59e0b]/20 rounded-xl p-4"
          >
            <div className="flex items-center gap-1.5 mb-1">
              <Zap className="w-3.5 h-3.5 text-[#f59e0b]" />
              <span className="text-xs text-[#f59e0b]/80">Generated in</span>
            </div>
            <div className="text-2xl font-bold text-[#f59e0b] font-mono leading-tight">
              {scope.generatedIn} seconds
            </div>
            <div className="border-t border-[#f59e0b]/10 mt-2.5 pt-2">
              <span className="text-xs text-[#64748b]">
                vs. 3+ hours manual process
              </span>
            </div>
          </motion.div>
        </div>

        {/* Action Buttons */}
        <div className="p-5 space-y-2.5">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setSowDownloaded(true)}
            className={`flex items-center justify-center gap-2 font-semibold w-full py-2.5 rounded-xl text-sm transition-all cursor-pointer ${
              sowDownloaded
                ? 'bg-[#10b981] text-white'
                : 'bg-[#3b82f6] hover:bg-[#2563eb] text-white'
            }`}
          >
            {sowDownloaded ? <CheckCircle2 className="w-4 h-4" /> : <Download className="w-4 h-4" />}
            {sowDownloaded ? 'SOW Downloaded' : 'Download SOW'}
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setChangeOrderOpen(!changeOrderOpen)}
            className={`flex items-center justify-center gap-2 border w-full py-2.5 rounded-xl text-sm transition-all cursor-pointer ${
              changeOrderOpen
                ? 'border-[#3b82f6]/30 text-[#3b82f6] bg-[#3b82f6]/10'
                : 'border-white/[0.1] text-[#94a3b8] hover:text-[#f8fafc] hover:border-white/[0.2]'
            }`}
          >
            <FileText className="w-4 h-4" />
            {changeOrderOpen ? 'Change Order Analysis Open' : 'View Change Order Analysis'}
          </motion.button>
          {changeOrderOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="text-xs text-[#64748b] bg-[#0f172a] rounded-lg p-3 border border-white/5"
            >
              In production, this would show a detailed change order breakdown with variance analysis against the original scope, contractor bid comparisons, and approval workflow.
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

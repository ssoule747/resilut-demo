import { motion } from 'framer-motion'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Area,
  ReferenceLine,
  CartesianGrid,
  Cell,
  Legend,
} from 'recharts'
import {
  Building2,
  TrendingUp,
  Percent,
  Layers,
  BarChart3,
  Brain,
  Sparkles,
} from 'lucide-react'
import {
  portfolioKPIs,
  noiTrendData,
  burnRateData,
  pipelineFunnel,
  formatCurrency,
  formatCompact,
} from '@/data/mockData'

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export default function KPIDashboard() {
  return (
    <motion.div
      variants={stagger}
      initial="initial"
      animate="animate"
      className="space-y-6"
    >
      {/* ── Hero Metric Cards ── */}
      <motion.div
        variants={stagger}
        initial="initial"
        animate="animate"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {/* Total Portfolio Value */}
        <motion.div variants={fadeUp} className="glass-card relative overflow-hidden p-6">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-slate-400 to-slate-600" />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(135deg, rgba(248,250,252,0.05) 0%, transparent 60%)',
            }}
          />
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-[#94a3b8] tracking-wide uppercase">Portfolio Value</span>
              <Building2 className="w-5 h-5 text-[#94a3b8]" />
            </div>
            <p className="font-heading text-4xl font-bold text-[#f8fafc]">
              {formatCompact(portfolioKPIs.totalValue)}
            </p>
            <p className="text-xs text-[#64748b] mt-2">
              {portfolioKPIs.totalProperties} properties across 4 markets
            </p>
          </div>
        </motion.div>

        {/* Monthly NOI */}
        <motion.div variants={fadeUp} className="glass-card relative overflow-hidden p-6">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-emerald-500 to-emerald-700" />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(135deg, rgba(16,185,129,0.05) 0%, transparent 60%)',
            }}
          />
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-[#94a3b8] tracking-wide uppercase">Monthly NOI</span>
              <TrendingUp className="w-5 h-5 text-[#10b981]" />
            </div>
            <p className="font-heading text-4xl font-bold text-[#10b981]">
              {formatCurrency(portfolioKPIs.monthlyNOI)}
            </p>
            <p className="text-xs text-[#64748b] mt-2">
              <span className="text-[#10b981]">+3.2%</span> vs prior month
            </p>
          </div>
        </motion.div>

        {/* Average Occupancy */}
        <motion.div variants={fadeUp} className="glass-card relative overflow-hidden p-6">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500 to-blue-700" />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(135deg, rgba(59,130,246,0.05) 0%, transparent 60%)',
            }}
          />
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-[#94a3b8] tracking-wide uppercase">Avg Occupancy</span>
              <Percent className="w-5 h-5 text-[#3b82f6]" />
            </div>
            <div className="flex items-center gap-4">
              <p className="font-heading text-4xl font-bold text-[#f8fafc]">
                {portfolioKPIs.avgOccupancy}%
              </p>
              {/* Mini radial gauge */}
              <svg width="44" height="44" viewBox="0 0 44 44" className="flex-shrink-0">
                <circle
                  cx="22"
                  cy="22"
                  r="18"
                  fill="none"
                  stroke="rgba(255,255,255,0.06)"
                  strokeWidth="4"
                />
                <circle
                  cx="22"
                  cy="22"
                  r="18"
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeDasharray={`${(portfolioKPIs.avgOccupancy / 100) * 2 * Math.PI * 18} ${2 * Math.PI * 18}`}
                  transform="rotate(-90 22 22)"
                  style={{ filter: 'drop-shadow(0 0 4px rgba(59,130,246,0.4))' }}
                />
                <text
                  x="22"
                  y="22"
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill="#3b82f6"
                  fontSize="9"
                  fontFamily="'JetBrains Mono', monospace"
                  fontWeight="600"
                >
                  {portfolioKPIs.avgOccupancy}
                </text>
              </svg>
            </div>
            <p className="text-xs text-[#64748b] mt-2">
              {portfolioKPIs.avgDaysToRent} avg days to rent
            </p>
          </div>
        </motion.div>

        {/* Deal Pipeline */}
        <motion.div variants={fadeUp} className="glass-card relative overflow-hidden p-6">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500 to-indigo-600" />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(135deg, rgba(59,130,246,0.05) 0%, transparent 60%)',
            }}
          />
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-[#94a3b8] tracking-wide uppercase">Deal Pipeline</span>
              <Layers className="w-5 h-5 text-[#3b82f6]" />
            </div>
            <p className="font-heading text-4xl font-bold text-[#3b82f6]">
              {formatCompact(portfolioKPIs.pipelineValue)}
            </p>
            <p className="text-xs text-[#64748b] mt-2">
              {portfolioKPIs.activeDeals} active deals in pipeline
            </p>
          </div>
        </motion.div>
      </motion.div>

      {/* ── Charts Row ── */}
      <motion.div
        variants={stagger}
        initial="initial"
        animate="animate"
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        {/* NOI Trending Line Chart */}
        <motion.div variants={fadeUp} className="glass-card p-6">
          <h3 className="font-heading text-lg font-semibold text-[#f8fafc] mb-1">
            NOI — Trailing 12 Months + 3 Month Forecast
          </h3>
          <p className="text-xs text-[#64748b] mb-5">Net operating income trend with forward projection</p>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={(() => {
                  const lastActualIdx = noiTrendData.reduce(
                    (acc, d, i) => (d.type === 'actual' ? i : acc),
                    0
                  )
                  return noiTrendData.map((d, i) => ({
                    month: d.month.split(' ')[0].slice(0, 3),
                    fullMonth: d.month,
                    actualNoi: d.type === 'actual' ? d.noi : undefined,
                    forecastNoi:
                      d.type === 'forecast' || i === lastActualIdx ? d.noi : undefined,
                    type: d.type,
                  }))
                })()}
                margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="noiAreaGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.2} />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
                <XAxis
                  dataKey="month"
                  tick={{ fill: '#64748b', fontSize: 11 }}
                  axisLine={{ stroke: 'rgba(255,255,255,0.06)' }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: '#64748b', fontSize: 11, fontFamily: "'JetBrains Mono', monospace" }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
                  domain={['dataMin - 20000', 'dataMax + 20000']}
                />
                <Tooltip
                  content={({ active, payload }) => {
                    if (!active || !payload?.length) return null
                    const data = payload[0]?.payload
                    const value = data?.actualNoi || data?.forecastNoi
                    return (
                      <div
                        style={{
                          background: 'rgba(15,23,42,0.9)',
                          backdropFilter: 'blur(12px)',
                          border: '1px solid rgba(255,255,255,0.08)',
                          borderRadius: '8px',
                          padding: '10px 14px',
                        }}
                      >
                        <p className="text-xs text-[#94a3b8] mb-1">{data?.fullMonth}</p>
                        <p className="font-mono text-sm font-semibold text-[#f8fafc]">
                          {formatCurrency(value)}
                        </p>
                        <p className="text-[10px] mt-1" style={{ color: data?.type === 'forecast' ? '#f97316' : '#3b82f6' }}>
                          {data?.type === 'forecast' ? 'Forecast' : 'Actual'}
                        </p>
                      </div>
                    )
                  }}
                />
                <ReferenceLine
                  y={380000}
                  stroke="#64748b"
                  strokeDasharray="6 4"
                  strokeOpacity={0.5}
                  label={{
                    value: 'Target',
                    position: 'right',
                    fill: '#64748b',
                    fontSize: 10,
                    fontFamily: "'JetBrains Mono', monospace",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="actualNoi"
                  stroke="none"
                  fill="url(#noiAreaGradient)"
                  animationDuration={1500}
                  connectNulls={false}
                />
                <Line
                  type="monotone"
                  dataKey="actualNoi"
                  stroke="#3b82f6"
                  strokeWidth={2.5}
                  dot={{ r: 3, fill: '#3b82f6' }}
                  activeDot={{ r: 5, fill: '#3b82f6', stroke: '#1e3a5f', strokeWidth: 2 }}
                  connectNulls={false}
                  animationDuration={1500}
                />
                <Line
                  type="monotone"
                  dataKey="forecastNoi"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  strokeDasharray="6 4"
                  strokeOpacity={0.5}
                  dot={{ r: 3, fill: '#3b82f6', fillOpacity: 0.5 }}
                  activeDot={{ r: 5, fill: '#3b82f6', fillOpacity: 0.7 }}
                  connectNulls={false}
                  animationDuration={1500}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Renovation Burn Rate Chart */}
        <motion.div variants={fadeUp} className="glass-card p-6">
          <h3 className="font-heading text-lg font-semibold text-[#f8fafc] mb-1">
            Renovation Burn Rate by Market
          </h3>
          <p className="text-xs text-[#64748b] mb-5">Budget vs actual spend with variance indicators</p>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={burnRateData.map((d) => ({
                  ...d,
                  variance: (((d.actual - d.budget) / d.budget) * 100).toFixed(1),
                }))}
                margin={{ top: 25, right: 10, left: 10, bottom: 0 }}
                barGap={4}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
                <XAxis
                  dataKey="market"
                  tick={{ fill: '#64748b', fontSize: 11 }}
                  axisLine={{ stroke: 'rgba(255,255,255,0.06)' }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: '#64748b', fontSize: 11, fontFamily: "'JetBrains Mono', monospace" }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
                />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (!active || !payload?.length) return null
                    const data = payload[0]?.payload
                    const over = data.actual > data.budget
                    return (
                      <div
                        style={{
                          background: 'rgba(15,23,42,0.9)',
                          backdropFilter: 'blur(12px)',
                          border: '1px solid rgba(255,255,255,0.08)',
                          borderRadius: '8px',
                          padding: '10px 14px',
                        }}
                      >
                        <p className="text-xs text-[#94a3b8] mb-2 font-semibold">{label}</p>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="w-2 h-2 rounded-full bg-[#334155]" />
                          <span className="text-xs text-[#94a3b8]">Budget:</span>
                          <span className="font-mono text-xs text-[#f8fafc]">{formatCurrency(data.budget)}</span>
                        </div>
                        <div className="flex items-center gap-2 mb-1">
                          <span
                            className="w-2 h-2 rounded-full"
                            style={{ background: over ? '#ef4444' : '#3b82f6' }}
                          />
                          <span className="text-xs text-[#94a3b8]">Actual:</span>
                          <span className="font-mono text-xs text-[#f8fafc]">{formatCurrency(data.actual)}</span>
                        </div>
                        <div className="border-t border-white/5 mt-2 pt-2">
                          <span
                            className="font-mono text-xs font-semibold"
                            style={{ color: over ? '#ef4444' : '#10b981' }}
                          >
                            {over ? '+' : ''}{data.variance}%
                          </span>
                          <span className="text-[10px] text-[#64748b] ml-1">variance</span>
                        </div>
                      </div>
                    )
                  }}
                />
                <Legend
                  verticalAlign="top"
                  align="right"
                  iconType="circle"
                  iconSize={8}
                  wrapperStyle={{ top: -5, right: 0, fontSize: 11, color: '#94a3b8' }}
                  formatter={(value) => <span className="text-[#94a3b8] text-xs ml-1">{value}</span>}
                />
                <Bar dataKey="budget" name="Budget" fill="#334155" radius={[4, 4, 0, 0]} barSize={28} />
                <Bar dataKey="actual" name="Actual" radius={[4, 4, 0, 0]} barSize={28}>
                  {burnRateData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.actual > entry.budget ? '#ef4444' : '#3b82f6'}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            {/* Variance badges below chart */}
            <div className="flex justify-around mt-3 px-8">
              {burnRateData.map((entry, index) => {
                const variance = ((entry.actual - entry.budget) / entry.budget * 100).toFixed(1)
                const over = entry.actual > entry.budget
                const color = over
                  ? variance > 5 ? '#ef4444' : '#f97316'
                  : '#10b981'
                return (
                  <span
                    key={index}
                    className="font-mono text-[11px] font-semibold px-2 py-0.5 rounded-full"
                    style={{
                      color,
                      background: `${color}15`,
                      border: `1px solid ${color}30`,
                    }}
                  >
                    {over ? '+' : ''}{variance}%
                  </span>
                )
              })}
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* ── Pipeline & Capital Forecast Row ── */}
      <motion.div
        variants={fadeUp}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        {/* LEFT — Deal Pipeline Mini-Funnel */}
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-heading text-lg font-semibold text-[#f8fafc]">
              Deal Pipeline
            </h3>
            <span className="text-xs text-[#64748b] font-mono">
              Active Stages
            </span>
          </div>

          <div className="space-y-4">
            {pipelineFunnel
              .filter((s) =>
                ['Intake', 'Inspection', 'Scoping', 'Underwriting', 'Approved'].includes(s.stage)
              )
              .map((stage, i) => (
                <div key={stage.stage} className="flex items-center gap-3">
                  <span className="text-sm text-[#94a3b8] w-24 shrink-0">
                    {stage.stage}
                  </span>
                  <div className="flex-1 relative h-3 rounded-full bg-white/5 overflow-hidden">
                    <motion.div
                      className="absolute inset-y-0 left-0 rounded-full"
                      style={{ backgroundColor: stage.color }}
                      initial={{ width: 0 }}
                      animate={{ width: `${(stage.count / 47) * 100}%` }}
                      transition={{
                        duration: 0.8,
                        delay: i * 0.1,
                        ease: [0.25, 0.46, 0.45, 0.94],
                      }}
                    />
                  </div>
                  <span className="font-mono text-sm text-[#f8fafc] w-8 text-right tabular-nums">
                    {stage.count}
                  </span>
                </div>
              ))}
          </div>

          <div className="mt-6 pt-4 border-t border-white/5">
            <span className="text-sm text-[#64748b]">
              Total active pipeline:{' '}
              <span className="font-mono text-[#94a3b8]">127</span> deals
            </span>
          </div>
        </div>

        {/* RIGHT — Capital Deployment Forecast Card */}
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-heading text-lg font-semibold text-[#f8fafc]">
              Capital Forecast
            </h3>
            <BarChart3 className="w-5 h-5 text-[#64748b]" />
          </div>

          <div className="space-y-6">
            {/* Projected Next Month */}
            <div>
              <span className="text-xs uppercase tracking-wider text-[#64748b]">
                Projected Next Month
              </span>
              <div className="flex items-baseline gap-3 mt-1">
                <span className="font-mono text-2xl font-bold text-[#3b82f6]">
                  47
                </span>
                <span className="text-sm text-[#94a3b8]">deals</span>
                <span className="text-sm text-[#64748b] ml-auto">
                  ~$6.2M deployment
                </span>
              </div>
            </div>

            {/* YTD Acquisition Pace */}
            <div>
              <span className="text-xs uppercase tracking-wider text-[#64748b]">
                YTD Acquisition Pace
              </span>
              <div className="flex items-center justify-between mt-2 mb-1.5">
                <span className="text-sm font-bold text-[#10b981] font-mono">
                  847 closed
                </span>
                <span className="text-sm text-[#64748b] font-mono">
                  833 target
                </span>
              </div>
              <div className="relative h-3 rounded-full bg-white/5 overflow-hidden">
                <motion.div
                  className="absolute inset-y-0 left-0 rounded-full bg-[#10b981]/80"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                />
                <div
                  className="absolute inset-y-0 w-0.5 bg-[#f8fafc]/40"
                  style={{ left: `${(833 / 847) * 100}%` }}
                />
              </div>
              <div className="flex items-center gap-1.5 mt-2">
                <TrendingUp className="w-4 h-4 text-[#10b981]" />
                <span className="text-sm font-medium text-[#10b981]">
                  102% of plan
                </span>
              </div>
            </div>

            {/* Capital Deployed YTD */}
            <div>
              <span className="text-xs uppercase tracking-wider text-[#64748b]">
                Capital Deployed YTD
              </span>
              <div className="flex items-center gap-3 mt-1">
                <span className="font-mono text-2xl font-bold text-[#f8fafc]">
                  $102.4M
                </span>
                <div className="flex items-center gap-1 text-[#10b981]">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-xs font-medium">+12.3%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── Portfolio Intelligence (AI Insights) ── */}
      <motion.div variants={fadeUp}>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <Brain className="h-6 w-6 text-[#3b82f6]" />
            <h2 className="text-2xl font-heading font-bold text-[#f8fafc]">Portfolio Intelligence</h2>
          </div>
          <div className="flex items-center gap-2 text-[#64748b] text-sm">
            <Sparkles className="h-3.5 w-3.5" />
            <span>AI-generated insights</span>
            <span className="mx-1">&middot;</span>
            <span>Updated 12 minutes ago</span>
          </div>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.08 },
            },
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          <motion.div
            variants={fadeUp}
            className="glass-card p-4 rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:border-white/10"
            style={{ borderLeft: '4px solid #ef4444' }}
          >
            <div className="flex items-start gap-3">
              <div className="mt-1 h-2.5 w-2.5 rounded-full flex-shrink-0" style={{ background: '#ef4444' }} />
              <p className="text-sm text-[#94a3b8] leading-relaxed">
                Memphis renovation portfolio trending 12% over budget. Primary drivers: 1847 Magnolia Dr (foundation scope exceeded estimate) and 2203 Oak Street (knob-and-tube wiring discovery). Recommend scope review process update.
              </p>
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="glass-card p-4 rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:border-white/10"
            style={{ borderLeft: '4px solid #f97316' }}
          >
            <div className="flex items-start gap-3">
              <div className="mt-1 h-2.5 w-2.5 rounded-full flex-shrink-0" style={{ background: '#f97316' }} />
              <p className="text-sm text-[#94a3b8] leading-relaxed">
                Atlanta vacancy at 8.2%, above 5% target. Three units in Decatur submarket driving variance. Recommend pricing review on units at 1502, 1504, and 1508 Glenwood Ave.
              </p>
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="glass-card p-4 rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:border-white/10"
            style={{ borderLeft: '4px solid #10b981' }}
          >
            <div className="flex items-start gap-3">
              <div className="mt-1 h-2.5 w-2.5 rounded-full flex-shrink-0" style={{ background: '#10b981' }} />
              <p className="text-sm text-[#94a3b8] leading-relaxed">
                Q1 acquisition pace on track: 847 deals closed YTD vs. 833 target. Capital deployment at 102% of plan.
              </p>
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="glass-card p-4 rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:border-white/10"
            style={{ borderLeft: '4px solid #3b82f6' }}
          >
            <div className="flex items-start gap-3">
              <div className="mt-1 h-2.5 w-2.5 rounded-full flex-shrink-0" style={{ background: '#3b82f6' }} />
              <p className="text-sm text-[#94a3b8] leading-relaxed">
                14 properties reaching refi eligibility next month. Estimated capital unlock: $485,000. Recommend initiating lender package assembly.
              </p>
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="glass-card p-4 rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:border-white/10"
            style={{ borderLeft: '4px solid #10b981' }}
          >
            <div className="flex items-start gap-3">
              <div className="mt-1 h-2.5 w-2.5 rounded-full flex-shrink-0" style={{ background: '#10b981' }} />
              <p className="text-sm text-[#94a3b8] leading-relaxed">
                Dallas portfolio outperforming: avg CoC at 12.4% vs. 10.2% portfolio avg. Consider increasing acquisition volume in DFW market.
              </p>
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="glass-card p-4 rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:border-white/10"
            style={{ borderLeft: '4px solid #f97316' }}
          >
            <div className="flex items-start gap-3">
              <div className="mt-1 h-2.5 w-2.5 rounded-full flex-shrink-0" style={{ background: '#f97316' }} />
              <p className="text-sm text-[#94a3b8] leading-relaxed">
                Average days-to-rent trending up: 34 days vs. 28-day target. Phoenix market driving the increase. Recommend reviewing listing strategy.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

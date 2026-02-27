import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table'
import {
  RefreshCcw,
  DollarSign,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Brain,
  ChevronDown,
  Shield,
  TrendingUp,
} from 'lucide-react'
import {
  refiPipeline,
  portfolioKPIs,
  getPropertyById,
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
}

const summaryStats = [
  {
    label: 'In Refi Pipeline',
    value: portfolioKPIs.refiPipeline,
    icon: RefreshCcw,
    color: '#3b82f6',
  },
  {
    label: 'Est. Total Cash-Out',
    value: formatCompact(
      refiPipeline.reduce((sum, r) => sum + r.estimatedCashOut, 0)
    ),
    icon: DollarSign,
    color: '#10b981',
  },
  {
    label: 'Avg Months to Refi',
    value: (
      refiPipeline.reduce((sum, r) => sum + r.monthsOccupied, 0) /
      refiPipeline.length
    ).toFixed(1),
    icon: Clock,
    color: '#f97316',
  },
]

export default function Refinance() {
  const [expandedId, setExpandedId] = useState(null)

  const toggleRow = (propertyId) => {
    setExpandedId(expandedId === propertyId ? null : propertyId)
  }

  const isReady = (status) => status.toLowerCase().startsWith('ready')

  return (
    <motion.div
      variants={stagger}
      initial="initial"
      animate="animate"
      className="space-y-6"
    >
      {/* Page Header */}
      <motion.div variants={fadeUp} transition={{ duration: 0.4 }}>
        <h1 className="font-heading text-2xl font-bold text-[#f8fafc]">
          Refinance Intelligence
        </h1>
        <p className="mt-1 text-sm text-[#64748b]">
          AI-powered refi readiness tracking, term sheet comparison, and
          cash-out projections
        </p>
      </motion.div>

      {/* Summary Stats */}
      <motion.div
        variants={fadeUp}
        transition={{ duration: 0.4 }}
        className="grid grid-cols-1 gap-4 sm:grid-cols-3"
      >
        {summaryStats.map((stat) => (
          <div key={stat.label} className="glass-card overflow-hidden rounded-xl p-5">
            <div className="flex items-center gap-4">
              <div
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg"
                style={{ backgroundColor: `${stat.color}15` }}
              >
                <stat.icon className="h-5 w-5" style={{ color: stat.color }} />
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-[#64748b]">
                  {stat.label}
                </p>
                <p className="font-heading text-2xl font-bold text-[#f8fafc]">
                  {stat.value}
                </p>
              </div>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Refi Pipeline Table */}
      <motion.div
        variants={fadeUp}
        transition={{ duration: 0.4 }}
        className="glass-card overflow-hidden rounded-xl"
      >
        <div className="border-b border-white/5 px-6 py-4">
          <h2 className="font-heading text-lg font-semibold text-[#f8fafc]">
            Refi-Ready Properties
          </h2>
        </div>

        <Table>
          <TableHeader>
            <TableRow className="bg-[#0f172a]/50">
              <TableHead className="text-xs font-medium uppercase tracking-wider text-[#64748b]">
                Address
              </TableHead>
              <TableHead className="text-xs font-medium uppercase tracking-wider text-[#64748b]">
                DSCR
              </TableHead>
              <TableHead className="text-xs font-medium uppercase tracking-wider text-[#64748b]">
                Months Occupied
              </TableHead>
              <TableHead className="text-xs font-medium uppercase tracking-wider text-[#64748b]">
                Est. Appraisal
              </TableHead>
              <TableHead className="text-xs font-medium uppercase tracking-wider text-[#64748b]">
                Est. Cash-Out
              </TableHead>
              <TableHead className="text-xs font-medium uppercase tracking-wider text-[#64748b]">
                Status
              </TableHead>
              <TableHead className="w-10" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {refiPipeline.map((item) => {
              const property = getPropertyById(item.propertyId)
              const address = property
                ? `${property.address}, ${property.city}`
                : item.propertyId
              const ready = isReady(item.status)
              const isExpanded = expandedId === item.propertyId

              return (
                <motion.tr
                  key={item.propertyId}
                  layout
                  className="group"
                >
                  {/* Main Row */}
                  <TableCell colSpan={7} className="p-0">
                    <div
                      className="flex cursor-pointer items-center transition-colors hover:bg-[#1e293b]/50"
                      onClick={() => toggleRow(item.propertyId)}
                    >
                      <div className="w-full">
                        <table className="w-full">
                          <tbody>
                            <tr>
                              <td className="px-4 py-3 text-sm font-medium text-[#f8fafc]">
                                {address}
                              </td>
                              <td className="px-4 py-3 text-sm text-[#f8fafc]">
                                {item.dscr.toFixed(2)}
                              </td>
                              <td className="px-4 py-3 text-sm text-[#94a3b8]">
                                {item.monthsOccupied}
                              </td>
                              <td className="px-4 py-3 text-sm text-[#f8fafc]">
                                {formatCurrency(item.estimatedAppraisal)}
                              </td>
                              <td className="px-4 py-3 text-sm font-medium text-[#10b981]">
                                {formatCurrency(item.estimatedCashOut)}
                              </td>
                              <td className="px-4 py-3">
                                <span
                                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                    ready
                                      ? 'bg-[#10b981]/15 text-[#10b981]'
                                      : 'bg-[#f97316]/15 text-[#f97316]'
                                  }`}
                                >
                                  {ready ? 'Ready' : 'Not Ready'}
                                </span>
                              </td>
                              <td className="w-10 px-4 py-3">
                                <ChevronDown
                                  className={`h-4 w-4 text-[#64748b] transition-transform duration-200 ${
                                    isExpanded ? 'rotate-180' : ''
                                  }`}
                                />
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Expanded Detail */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: 'easeInOut' }}
                          className="overflow-hidden"
                        >
                          <div className="space-y-6 border-t border-white/5 bg-[#0f172a]/30 px-6 py-6">
                            {/* Refi Readiness Checklist */}
                            <div>
                              <h3 className="font-heading mb-3 text-sm font-semibold uppercase tracking-wider text-[#64748b]">
                                Refi Readiness Checklist
                              </h3>
                              <div className="grid gap-2">
                                {item.checklistItems.map((ci, idx) => (
                                  <div
                                    key={idx}
                                    className="flex items-center gap-3 rounded-lg bg-[#0f172a]/40 px-4 py-2.5"
                                  >
                                    {ci.passed ? (
                                      <CheckCircle className="h-5 w-5 shrink-0 text-[#10b981]" />
                                    ) : (
                                      <XCircle className="h-5 w-5 shrink-0 text-[#ef4444]" />
                                    )}
                                    <span className="text-sm font-medium text-[#f8fafc]">
                                      {ci.item}
                                    </span>
                                    <span className="text-sm text-[#64748b]">
                                      — {ci.detail}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Term Sheet Comparison */}
                            {item.termSheetComparison && (
                              <div>
                                <h3 className="font-heading mb-3 text-sm font-semibold uppercase tracking-wider text-[#64748b]">
                                  Term Sheet Comparison
                                </h3>
                                <div className="grid gap-4 md:grid-cols-2">
                                  {/* Lender A — Recommended */}
                                  <div className="relative rounded-xl border border-[#10b981]/40 bg-[#10b981]/5 p-5">
                                    <div className="absolute -top-3 left-4">
                                      <span className="inline-flex items-center gap-1.5 rounded-full bg-[#10b981]/20 px-3 py-1 text-xs font-semibold text-[#10b981]">
                                        <Shield className="h-3.5 w-3.5" />
                                        Recommended
                                      </span>
                                    </div>
                                    <div className="mt-2">
                                      <p className="font-heading text-base font-semibold text-[#f8fafc]">
                                        {item.termSheetComparison.lenderA.institution}
                                      </p>
                                      <div className="mt-4 space-y-2.5">
                                        <LenderRow
                                          label="Rate"
                                          value={`${item.termSheetComparison.lenderA.rate}% (${item.termSheetComparison.lenderA.rateType})`}
                                        />
                                        <LenderRow
                                          label="Points"
                                          value={item.termSheetComparison.lenderA.points}
                                        />
                                        <LenderRow
                                          label="Term"
                                          value={item.termSheetComparison.lenderA.term}
                                        />
                                        <LenderRow
                                          label="Prepayment"
                                          value={item.termSheetComparison.lenderA.prepaymentPenalty}
                                        />
                                        <LenderRow
                                          label="Est. Monthly"
                                          value={formatCurrency(item.termSheetComparison.lenderA.estimatedMonthlyPayment)}
                                        />
                                        <LenderRow
                                          label="Closing Costs"
                                          value={formatCurrency(item.termSheetComparison.lenderA.totalClosingCosts)}
                                        />
                                      </div>
                                    </div>
                                  </div>

                                  {/* Lender B — Hidden Clause Warning */}
                                  <motion.div
                                    animate={{ x: [0, -3, 3, -3, 3, 0] }}
                                    transition={{ delay: 0.5, duration: 0.5 }}
                                    className="relative rounded-xl border border-[#ef4444]/50 bg-[#ef4444]/5 p-5"
                                  >
                                    <div className="absolute -top-3 left-4">
                                      <span className="inline-flex items-center gap-1.5 rounded-full bg-[#ef4444]/20 px-3 py-1 text-xs font-semibold text-[#ef4444]">
                                        <AlertTriangle className="h-3.5 w-3.5" />
                                        HIDDEN CLAUSE DETECTED
                                      </span>
                                    </div>
                                    <div className="mt-2">
                                      <p className="font-heading text-base font-semibold text-[#f8fafc]">
                                        {item.termSheetComparison.lenderB.institution}
                                      </p>
                                      <div className="mt-4 space-y-2.5">
                                        <LenderRow
                                          label="Rate"
                                          value={`${item.termSheetComparison.lenderB.rate}% (${item.termSheetComparison.lenderB.rateType})`}
                                        />
                                        <LenderRow
                                          label="Points"
                                          value={item.termSheetComparison.lenderB.points}
                                        />
                                        <LenderRow
                                          label="Term"
                                          value={item.termSheetComparison.lenderB.term}
                                        />
                                        <LenderRow
                                          label="Prepayment"
                                          value={item.termSheetComparison.lenderB.prepaymentPenalty}
                                        />
                                        <LenderRow
                                          label="Est. Monthly"
                                          value={formatCurrency(item.termSheetComparison.lenderB.estimatedMonthlyPayment)}
                                        />
                                        <LenderRow
                                          label="Closing Costs"
                                          value={formatCurrency(item.termSheetComparison.lenderB.totalClosingCosts)}
                                        />
                                      </div>

                                      {/* Hidden Clause Warning */}
                                      <div className="mt-4 rounded-lg border border-[#ef4444]/30 bg-[#ef4444]/10 p-3">
                                        <div className="flex items-start gap-2">
                                          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-[#ef4444]" />
                                          <div className="space-y-1">
                                            <p className="text-sm font-semibold text-[#ef4444]">
                                              {item.termSheetComparison.lenderB.hiddenClause}
                                            </p>
                                            <p className="text-xs text-[#f87171]">
                                              Projected adjusted rate:{' '}
                                              {item.termSheetComparison.lenderB.projectedAdjustedRate}
                                            </p>
                                            <p className="text-xs text-[#f87171]">
                                              Risk exposure:{' '}
                                              {formatCurrency(item.termSheetComparison.lenderB.riskExposure)}
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </motion.div>
                                </div>

                                {/* AI Recommendation */}
                                <div className="mt-4 rounded-xl border border-[#3b82f6]/20 bg-[#3b82f6]/5 p-5">
                                  <div className="flex items-start gap-3">
                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#3b82f6]/15">
                                      <Brain className="h-5 w-5 text-[#3b82f6]" />
                                    </div>
                                    <div>
                                      <p className="font-heading text-sm font-semibold text-[#3b82f6]">
                                        AI Analysis
                                      </p>
                                      <p className="mt-1 text-sm leading-relaxed text-[#94a3b8]">
                                        {item.termSheetComparison.aiRecommendation}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}

                            {/* Predicted Cash-Out */}
                            <div>
                              <h3 className="font-heading mb-3 text-sm font-semibold uppercase tracking-wider text-[#64748b]">
                                Predicted Cash-Out
                              </h3>
                              <div className="rounded-xl bg-[#0f172a]/40 p-5">
                                {ready ? (
                                  <div className="flex items-center gap-4">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#10b981]/15">
                                      <TrendingUp className="h-6 w-6 text-[#10b981]" />
                                    </div>
                                    <div>
                                      <p className="font-heading text-3xl font-bold text-[#f8fafc]">
                                        {formatCurrency(item.estimatedCashOut)}
                                      </p>
                                      <span className="mt-1 inline-flex items-center rounded-full bg-[#3b82f6]/15 px-3 py-0.5 text-xs font-medium text-[#3b82f6]">
                                        Moderate-High (based on 23 comparable
                                        refis)
                                      </span>
                                    </div>
                                  </div>
                                ) : (
                                  <div className="flex items-center gap-4">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#f97316]/15">
                                      <AlertTriangle className="h-6 w-6 text-[#f97316]" />
                                    </div>
                                    <div>
                                      <p className="font-heading text-3xl font-bold text-[#64748b]">
                                        {formatCurrency(item.estimatedCashOut)}
                                      </p>
                                      <p className="mt-1 text-sm text-[#f97316]">
                                        Not eligible — resolve DSCR and occupancy
                                        requirements first
                                      </p>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </TableCell>
                </motion.tr>
              )
            })}
          </TableBody>
        </Table>
      </motion.div>
    </motion.div>
  )
}

/* Small helper component for lender detail rows */
function LenderRow({ label, value }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-[#64748b]">{label}</span>
      <span className="font-medium text-[#f8fafc]">{value}</span>
    </div>
  )
}

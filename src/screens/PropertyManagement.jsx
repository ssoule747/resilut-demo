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
  Home,
  Users,
  DollarSign,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  Brain,
  Truck,
  Calendar,
  Wrench,
  TrendingUp,
  Mail,
  Phone,
  User,
} from 'lucide-react'
import {
  tenants,
  portfolioKPIs,
  getPropertyById,
  formatCurrency,
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

const maintenanceStepIcons = [MessageSquare, Brain, Truck, Calendar]

// Color map for payment status
const paymentColors = {
  Paid: '#10b981',
  Late: '#f97316',
  Missed: '#ef4444',
}

// Color map for tenant status badges
function getStatusBadge(status) {
  if (status.includes('Good Standing')) {
    return { bg: 'bg-emerald-500/15', text: 'text-emerald-400', label: 'Good Standing' }
  }
  if (status.includes('Late Payment')) {
    return { bg: 'bg-orange-500/15', text: 'text-orange-400', label: 'Late Payments' }
  }
  if (status.includes('Renewal')) {
    return { bg: 'bg-blue-500/15', text: 'text-blue-400', label: 'Renewal Pending' }
  }
  return { bg: 'bg-[#64748b]/15', text: 'text-[#94a3b8]', label: status }
}

function formatDate(dateStr) {
  if (!dateStr) return '—'
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function formatScheduledDate(dateStr) {
  if (!dateStr) return '—'
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
}

// Build enriched tenant rows by joining tenants with property data
function buildTenantRows() {
  return tenants.map((tenant) => {
    const property = getPropertyById(tenant.propertyId)
    return { ...tenant, property }
  })
}

// Rent optimization logic per tenant
function getRentOptimization(tenant, property) {
  if (!property) return null

  // tenant-002 (James Thompson) has explicit rentOptimization data
  if (tenant.rentOptimization) {
    const ro = tenant.rentOptimization
    return {
      type: 'detailed',
      beds: property.beds,
      zip: property.zip,
      marketLow: ro.marketComps.low,
      marketHigh: ro.marketComps.high,
      currentRent: ro.currentRent,
      recommendation: `Increase to ${formatCurrency(ro.recommendation)} at lease renewal (${formatDate(ro.renewalDate)})`,
      acceptanceProbability: ro.acceptanceProbability,
      indicator: 'green',
    }
  }

  // tenant-001 (Maria Rodriguez) — prop-003, 75216 zip, 4BR, $1,650 rent
  if (tenant.id === 'tenant-001') {
    return {
      type: 'detailed',
      beds: 3, // spec says 3BR in the recommendation text
      zip: '38106', // spec says 38106 zip
      marketLow: 1475,
      marketHigh: 1550,
      currentRent: tenant.monthlyRent,
      recommendation: 'Hold at current rate — above market median',
      acceptanceProbability: 95,
      indicator: 'green',
    }
  }

  // Others: simpler card with current rent vs estimated market
  return {
    type: 'simple',
    currentRent: tenant.monthlyRent,
    estimatedMarket: property.estimatedRent,
  }
}

export default function PropertyManagement() {
  const [expandedId, setExpandedId] = useState(null)
  const tenantRows = buildTenantRows()

  const toggleExpand = (tenantId) => {
    setExpandedId((prev) => (prev === tenantId ? null : tenantId))
  }

  return (
    <motion.div
      variants={stagger}
      initial="initial"
      animate="animate"
      className="space-y-6"
    >
      {/* Summary Stats Bar */}
      <motion.div
        variants={fadeUp}
        transition={{ duration: 0.4 }}
        className="grid grid-cols-1 gap-4 sm:grid-cols-3"
      >
        <div className="glass-card overflow-hidden rounded-xl p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/15">
              <Home className="h-5 w-5 text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#f8fafc] font-heading">
                {portfolioKPIs.totalProperties.toLocaleString()}
              </p>
              <p className="text-xs font-medium uppercase tracking-wider text-[#64748b]">
                Total Rented Properties
              </p>
            </div>
          </div>
        </div>

        <div className="glass-card overflow-hidden rounded-xl p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/15">
              <Users className="h-5 w-5 text-emerald-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#f8fafc] font-heading">
                {portfolioKPIs.avgOccupancy}%
              </p>
              <p className="text-xs font-medium uppercase tracking-wider text-[#64748b]">
                Average Occupancy
              </p>
            </div>
          </div>
        </div>

        <div className="glass-card overflow-hidden rounded-xl p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/15">
              <DollarSign className="h-5 w-5 text-purple-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#f8fafc] font-heading">
                {formatCurrency(portfolioKPIs.monthlyNOI)}
              </p>
              <p className="text-xs font-medium uppercase tracking-wider text-[#64748b]">
                Rent Collected This Month
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Tenants Table */}
      <motion.div
        variants={fadeUp}
        transition={{ duration: 0.4 }}
        className="glass-card overflow-hidden rounded-xl"
      >
        <div className="border-b border-white/5 px-6 py-4">
          <h2 className="font-heading text-lg font-semibold text-[#f8fafc]">
            Tenant Management
          </h2>
          <p className="text-sm text-[#64748b]">
            Click a row to view tenant details, payment history, and maintenance requests
          </p>
        </div>

        <Table>
          <TableHeader>
            <TableRow className="bg-[#0f172a]/50">
              <TableHead className="text-xs font-medium uppercase tracking-wider text-[#64748b]">
                Property
              </TableHead>
              <TableHead className="text-xs font-medium uppercase tracking-wider text-[#64748b]">
                Tenant
              </TableHead>
              <TableHead className="text-xs font-medium uppercase tracking-wider text-[#64748b]">
                Monthly Rent
              </TableHead>
              <TableHead className="text-xs font-medium uppercase tracking-wider text-[#64748b]">
                Lease End
              </TableHead>
              <TableHead className="text-xs font-medium uppercase tracking-wider text-[#64748b]">
                Status
              </TableHead>
              <TableHead className="text-xs font-medium uppercase tracking-wider text-[#64748b]">
                Maintenance
              </TableHead>
              <TableHead className="w-10" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {tenantRows.map((row) => {
              const badge = getStatusBadge(row.status)
              const isExpanded = expandedId === row.id
              const maintenanceCount = row.maintenanceRequests?.length || 0

              return (
                <TableRow
                  key={row.id}
                  className="cursor-pointer transition-colors hover:bg-[#1e293b]/50"
                  onClick={() => toggleExpand(row.id)}
                >
                  <TableCell className="text-sm font-medium text-[#f8fafc]">
                    {row.property?.address || '—'}
                    <span className="ml-2 text-xs text-[#64748b]">
                      {row.property ? `${row.property.city}, ${row.property.state}` : ''}
                    </span>
                  </TableCell>
                  <TableCell className="text-sm text-[#94a3b8]">{row.name}</TableCell>
                  <TableCell className="text-sm font-medium text-[#f8fafc]">
                    {formatCurrency(row.monthlyRent)}
                  </TableCell>
                  <TableCell className="text-sm text-[#94a3b8]">
                    {formatDate(row.leaseEnd)}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${badge.bg} ${badge.text}`}
                    >
                      {badge.label}
                    </span>
                  </TableCell>
                  <TableCell className="text-sm text-[#94a3b8]">
                    {maintenanceCount > 0 ? (
                      <span className="inline-flex items-center gap-1 text-orange-400">
                        <Wrench className="h-3.5 w-3.5" />
                        {maintenanceCount}
                      </span>
                    ) : (
                      <span className="text-[#64748b]">0</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {isExpanded ? (
                      <ChevronUp className="h-4 w-4 text-[#64748b]" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-[#64748b]" />
                    )}
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </motion.div>

      {/* Expanded Detail Panel */}
      <AnimatePresence mode="wait">
        {expandedId && (
          <motion.div
            key={expandedId}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <TenantDetail
              tenant={tenantRows.find((r) => r.id === expandedId)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

/* ─── Tenant Detail Expanded Section ─── */
function TenantDetail({ tenant }) {
  if (!tenant) return null

  const property = tenant.property
  if (!property) return null
  const rentOpt = getRentOptimization(tenant, property)
  const hasMaintenanceRequests =
    tenant.maintenanceRequests && tenant.maintenanceRequests.length > 0

  return (
    <motion.div
      variants={stagger}
      initial="initial"
      animate="animate"
      className="grid grid-cols-1 gap-4 lg:grid-cols-2"
    >
      {/* 1. Tenant Info Card */}
      <motion.div
        variants={fadeUp}
        transition={{ duration: 0.3 }}
        className="glass-card overflow-hidden rounded-xl p-5"
      >
        <h3 className="mb-4 font-heading text-sm font-semibold uppercase tracking-wider text-[#64748b]">
          Tenant Information
        </h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <User className="h-4 w-4 text-blue-400" />
            <span className="text-sm font-medium text-[#f8fafc]">{tenant.name}</span>
          </div>
          <div className="flex items-center gap-3">
            <Mail className="h-4 w-4 text-[#64748b]" />
            <span className="text-sm text-[#94a3b8]">{tenant.email}</span>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="h-4 w-4 text-[#64748b]" />
            <span className="text-sm text-[#94a3b8]">{tenant.phone}</span>
          </div>
          <div className="mt-4 flex gap-6 border-t border-white/5 pt-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-[#64748b]">
                Lease Start
              </p>
              <p className="mt-1 text-sm text-[#f8fafc]">{formatDate(tenant.leaseStart)}</p>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-[#64748b]">
                Lease End
              </p>
              <p className="mt-1 text-sm text-[#f8fafc]">{formatDate(tenant.leaseEnd)}</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* 2. Rent Payment History Timeline */}
      <motion.div
        variants={fadeUp}
        transition={{ duration: 0.3 }}
        className="glass-card overflow-hidden rounded-xl p-5"
      >
        <h3 className="mb-4 font-heading text-sm font-semibold uppercase tracking-wider text-[#64748b]">
          Payment History
        </h3>
        <div className="flex items-center justify-center py-4">
          <div className="flex items-center gap-0">
            {tenant.paymentHistory.map((payment, idx) => {
              const color = paymentColors[payment.status] || '#64748b'
              const monthAbbr = payment.month.split(' ')[0] // e.g., "Jul"
              const isLast = idx === tenant.paymentHistory.length - 1

              return (
                <div key={idx} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: color }}
                      title={`${payment.month}: ${payment.status}`}
                    />
                    <span className="mt-2 text-[10px] text-[#64748b]">{monthAbbr}</span>
                  </div>
                  {!isLast && (
                    <div
                      className="mx-1 h-[2px] w-8"
                      style={{ backgroundColor: '#334155' }}
                    />
                  )}
                </div>
              )
            })}
          </div>
        </div>
        <div className="mt-3 flex items-center justify-center gap-5">
          <div className="flex items-center gap-1.5">
            <div className="h-2 w-2 rounded-full" style={{ backgroundColor: '#10b981' }} />
            <span className="text-[10px] text-[#64748b]">Paid</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-2 w-2 rounded-full" style={{ backgroundColor: '#f97316' }} />
            <span className="text-[10px] text-[#64748b]">Late</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-2 w-2 rounded-full" style={{ backgroundColor: '#ef4444' }} />
            <span className="text-[10px] text-[#64748b]">Missed</span>
          </div>
        </div>
      </motion.div>

      {/* 3. Active Maintenance Requests */}
      {hasMaintenanceRequests && (
        <motion.div
          variants={fadeUp}
          transition={{ duration: 0.3 }}
          className="glass-card overflow-hidden rounded-xl p-5"
        >
          <h3 className="mb-4 font-heading text-sm font-semibold uppercase tracking-wider text-[#64748b]">
            Active Maintenance Request
          </h3>
          {tenant.maintenanceRequests.map((req) => {
            const steps = [
              {
                icon: MessageSquare,
                label: `Tenant reported: "${req.description}"`,
                time: formatDate(req.submittedAt),
                color: '#3b82f6',
              },
              {
                icon: Brain,
                label: `AI Classification: ${req.classification}`,
                time: formatDate(req.submittedAt),
                color: '#8b5cf6',
              },
              {
                icon: Truck,
                label: `Routed to: ${req.routedTo}`,
                time: formatDate(req.routedAt),
                color: '#f97316',
              },
              {
                icon: Calendar,
                label: `Status: Scheduled for ${formatScheduledDate(req.scheduledDate)}`,
                time: formatDate(req.scheduledDate),
                color: '#10b981',
              },
            ]

            return (
              <div key={req.id} className="relative ml-2">
                {/* Vertical connecting line */}
                <div
                  className="absolute left-[11px] top-3 h-[calc(100%-24px)] w-[2px]"
                  style={{ backgroundColor: '#334155' }}
                />

                <div className="space-y-0">
                  {steps.map((step, idx) => {
                    const Icon = step.icon
                    return (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.3, duration: 0.3 }}
                        className="relative flex items-start gap-3 pb-5"
                      >
                        <div
                          className="relative z-10 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full"
                          style={{ backgroundColor: `${step.color}20` }}
                        >
                          <Icon className="h-3 w-3" style={{ color: step.color }} />
                        </div>
                        <div className="flex-1 pt-0.5">
                          <p className="text-sm text-[#f8fafc]">{step.label}</p>
                          <p className="text-xs text-[#64748b]">{step.time}</p>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </motion.div>
      )}

      {/* 4. Rent Optimization Card */}
      {rentOpt && (
        <motion.div
          variants={fadeUp}
          transition={{ duration: 0.3 }}
          className="glass-card overflow-hidden rounded-xl p-5"
        >
          <h3 className="mb-4 font-heading text-sm font-semibold uppercase tracking-wider text-[#64748b]">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-emerald-400" />
              Rent Optimization
            </div>
          </h3>

          {rentOpt.type === 'detailed' ? (
            <div className="space-y-3">
              <div className="rounded-lg bg-[#0f172a]/50 p-3">
                <p className="text-sm text-[#94a3b8]">
                  Market rent for comparable{' '}
                  <span className="font-medium text-[#f8fafc]">{rentOpt.beds}BR</span> in{' '}
                  <span className="font-medium text-[#f8fafc]">{rentOpt.zip}</span>
                </p>
                <p className="mt-1 text-lg font-bold text-[#f8fafc] font-heading">
                  {formatCurrency(rentOpt.marketLow)} – {formatCurrency(rentOpt.marketHigh)}
                </p>
              </div>

              <div className="flex items-center justify-between rounded-lg bg-[#0f172a]/50 p-3">
                <p className="text-sm text-[#94a3b8]">Current rent</p>
                <p className="text-sm font-semibold text-[#f8fafc]">
                  {formatCurrency(rentOpt.currentRent)}
                </p>
              </div>

              <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-3">
                <div className="flex items-start gap-2">
                  <div className="mt-0.5 h-2 w-2 flex-shrink-0 rounded-full bg-emerald-400" />
                  <div>
                    <p className="text-sm font-medium text-emerald-400">Recommendation</p>
                    <p className="mt-0.5 text-sm text-[#94a3b8]">{rentOpt.recommendation}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <p className="text-xs text-[#64748b]">Estimated acceptance probability</p>
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-20 overflow-hidden rounded-full bg-[#1e293b]">
                    <div
                      className="h-full rounded-full bg-emerald-400"
                      style={{ width: `${rentOpt.acceptanceProbability}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-emerald-400">
                    {rentOpt.acceptanceProbability}%
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center justify-between rounded-lg bg-[#0f172a]/50 p-3">
                <p className="text-sm text-[#94a3b8]">Current rent</p>
                <p className="text-sm font-semibold text-[#f8fafc]">
                  {formatCurrency(rentOpt.currentRent)}
                </p>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-[#0f172a]/50 p-3">
                <p className="text-sm text-[#94a3b8]">Estimated market rent</p>
                <p className="text-sm font-semibold text-[#f8fafc]">
                  {formatCurrency(rentOpt.estimatedMarket)}
                </p>
              </div>
              {rentOpt.currentRent >= rentOpt.estimatedMarket ? (
                <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-3">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-emerald-400" />
                    <p className="text-sm text-emerald-400">At or above market rate</p>
                  </div>
                </div>
              ) : (
                <div className="rounded-lg border border-blue-500/20 bg-blue-500/5 p-3">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-blue-400" />
                    <p className="text-sm text-blue-400">
                      Potential increase of{' '}
                      {formatCurrency(rentOpt.estimatedMarket - rentOpt.currentRent)}/mo
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </motion.div>
      )}
    </motion.div>
  )
}

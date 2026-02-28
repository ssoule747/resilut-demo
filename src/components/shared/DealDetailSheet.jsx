'use client'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Home, Bed, Bath, Ruler, Calendar, MapPin, User, Clock, Zap,
  CheckCircle2, AlertTriangle, ChevronRight, Image, ArrowRight, Send,
} from 'lucide-react'
import {
  Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { Progress } from '@/components/ui/progress'
import StatusBadge from '@/components/shared/StatusBadge'
import { getWholesalerById, wholesalerSubmission, formatCurrency } from '@/data/mockData'

function getScoreColor(score) {
  if (score >= 85) return '#10b981'
  if (score >= 70) return '#f59e0b'
  if (score >= 55) return '#f97316'
  return '#ef4444'
}

function getReliabilityColor(score) {
  if (score === 'Reliable') return { text: '#10b981', bg: 'rgba(16,185,129,0.1)' }
  if (score === 'Average') return { text: '#f59e0b', bg: 'rgba(245,158,11,0.1)' }
  return { text: '#64748b', bg: 'rgba(100,116,139,0.1)' }
}

function StatPill({ icon: Icon, value }) {
  return (
    <span className="flex items-center gap-1 text-xs text-[#64748b]">
      <Icon className="w-3.5 h-3.5" />
      {value}
    </span>
  )
}

function RawSubmissionCard() {
  const raw = wholesalerSubmission.raw
  return (
    <div className="bg-[#1e293b]/60 rounded-lg p-4 border border-dashed border-[#334155]">
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <User className="w-4 h-4 text-[#f97316]" />
        <span className="text-xs font-semibold text-[#f97316] uppercase tracking-wider">
          Raw Submission
        </span>
      </div>

      {/* Wholesaler */}
      <p className="text-xs text-[#64748b] mb-2">
        Marcus Johnson, Memphis Wholesale Group
      </p>

      {/* Raw description */}
      <p className="font-mono text-xs text-[#94a3b8] leading-relaxed italic">
        {raw.description}
      </p>

      {/* Separator */}
      <div className="h-px bg-[#334155] mt-3 mb-3" />

      {/* Raw fields grid */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
        <div>
          <span className="text-[10px] text-[#64748b]">Beds: </span>
          <span className="text-xs font-mono text-[#94a3b8]">{raw.fields.beds}</span>
        </div>
        <div>
          <span className="text-[10px] text-[#64748b]">Baths: </span>
          <span className="text-xs font-mono text-[#94a3b8]">{raw.fields.baths}</span>
        </div>
        <div>
          <span className="text-[10px] text-[#64748b]">Sqft: </span>
          <span className="text-xs font-mono text-[#ef4444]/60">&mdash;</span>
        </div>
        <div>
          <span className="text-[10px] text-[#64748b]">Year: </span>
          <span className="text-xs font-mono text-[#94a3b8]">{raw.fields.yearBuilt}</span>
        </div>
        <div>
          <span className="text-[10px] text-[#64748b]">Price: </span>
          <span className="text-xs font-mono text-[#94a3b8]">${raw.fields.askingPrice?.toLocaleString()}</span>
        </div>
        <div>
          <span className="text-[10px] text-[#64748b]">ARV: </span>
          <span className="text-xs font-mono text-[#94a3b8]">{raw.fields.arvEstimate}</span>
        </div>
        <div className="col-span-2">
          <span className="text-[10px] text-[#64748b]">Condition: </span>
          <span className="text-xs font-mono text-[#94a3b8]">{raw.fields.condition}</span>
        </div>
      </div>

      {/* Photos note */}
      <div className="flex items-center gap-1 mt-3 text-[10px] text-[#64748b]">
        <Image className="w-3 h-3" />
        {raw.fields.photos} photos uploaded
      </div>
    </div>
  )
}

function AIProcessedCard() {
  const ai = wholesalerSubmission.aiProcessed
  return (
    <div className="bg-[#0f172a] rounded-lg p-4 border border-[#3b82f6]/20">
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <Zap className="w-4 h-4 text-[#3b82f6]" />
        <span className="text-xs font-semibold text-[#3b82f6] uppercase tracking-wider">
          AI-Processed
        </span>
        <span className="flex-1" />
        <span className="flex items-center gap-1 text-[10px] bg-[#3b82f6]/10 text-[#3b82f6] rounded-full px-2 py-0.5">
          <Clock className="w-3 h-3" />
          {ai.processingTime}s
        </span>
      </div>

      {/* Structured fields */}
      <div className="space-y-1.5">
        <div>
          <span className="text-[10px] text-[#64748b]">Type: </span>
          <span className="text-xs font-mono font-medium text-[#f8fafc]">{ai.propertyType}</span>
        </div>

        <div className="grid grid-cols-4 gap-x-2">
          <div>
            <span className="text-[10px] text-[#64748b]">Beds</span>
            <p className="text-xs font-mono font-medium text-[#f8fafc]">{ai.beds}</p>
          </div>
          <div>
            <span className="text-[10px] text-[#64748b]">Baths</span>
            <p className="text-xs font-mono font-medium text-[#f8fafc]">{ai.baths}</p>
          </div>
          <div>
            <span className="text-[10px] text-[#64748b]">Sqft</span>
            <p className="text-xs font-mono font-medium text-[#f8fafc]">{ai.sqft.toLocaleString()}</p>
          </div>
          <div>
            <span className="text-[10px] text-[#64748b]">Year</span>
            <p className="text-xs font-mono font-medium text-[#f8fafc]">{ai.yearBuilt}</p>
          </div>
        </div>

        <div>
          <span className="text-[10px] text-[#64748b]">Condition: </span>
          <span className="text-xs font-mono font-medium text-[#ef4444]">{ai.conditionTier}</span>
        </div>

        <div>
          <span className="text-[10px] text-[#64748b]">Market: </span>
          <span className="text-xs font-mono font-medium text-[#f8fafc]">{ai.marketSegment}</span>
        </div>

        <div>
          <span className="text-[10px] text-[#64748b]">ARV: </span>
          <span className="text-xs font-mono font-medium text-[#f8fafc]">{formatCurrency(ai.estimatedARV)}</span>
          <span className="text-[10px] text-[#64748b] ml-1">
            (HouseCanary {formatCurrency(ai.arvSources.HouseCanary)}, Quantarium {formatCurrency(ai.arvSources.Quantarium)})
          </span>
        </div>

        <div>
          <span className="text-[10px] text-[#64748b]">Rent: </span>
          <span className="text-xs font-mono font-medium text-[#f8fafc]">
            {formatCurrency(ai.estimatedRent)}/mo
          </span>
          <span className="text-[10px] text-[#64748b] ml-1">
            ({formatCurrency(ai.rentRange.low)}&ndash;{formatCurrency(ai.rentRange.high)} {ai.rentRange.source})
          </span>
        </div>
      </div>

      {/* Missing Data Resolved */}
      <div className="h-px bg-[#334155] mt-3 mb-3" />
      <p className="text-[10px] font-semibold text-[#64748b] uppercase tracking-wider mb-2">
        Missing Data Resolved
      </p>
      <div className="space-y-1">
        {ai.missingDataResolved.map((item, i) => (
          <div key={i} className="flex items-start gap-1.5">
            {item.status === 'resolved' ? (
              <CheckCircle2 className="w-3 h-3 text-[#10b981] mt-0.5 shrink-0" />
            ) : (
              <AlertTriangle className="w-3 h-3 text-[#f59e0b] mt-0.5 shrink-0" />
            )}
            <span className="text-[10px] text-[#94a3b8]">
              <span className="font-medium text-[#f8fafc]">{item.field}</span>
              {item.value ? `: ${item.value}` : ''}
              <span className="text-[#64748b]"> — {item.source}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

function SimplifiedDetail({ property }) {
  return (
    <div className="px-6 pt-4 space-y-3">
      <div className="bg-[#0f172a] rounded-lg p-4 border border-white/5">
        <p className="text-xs font-semibold text-[#f8fafc] uppercase tracking-wider mb-3">
          Property Details
        </p>
        <div className="grid grid-cols-2 gap-x-6 gap-y-2">
          <div>
            <span className="text-[10px] text-[#64748b]">Type</span>
            <p className="text-xs font-mono font-medium text-[#f8fafc]">{property.propertyType}</p>
          </div>
          <div>
            <span className="text-[10px] text-[#64748b]">Condition</span>
            <p className="text-xs font-mono font-medium text-[#f8fafc]">{property.conditionTier}</p>
          </div>
          <div>
            <span className="text-[10px] text-[#64748b]">Purchase Price</span>
            <p className="text-xs font-mono font-medium text-[#f8fafc]">{formatCurrency(property.purchasePrice)}</p>
          </div>
          <div>
            <span className="text-[10px] text-[#64748b]">ARV</span>
            <p className="text-xs font-mono font-medium text-[#f8fafc]">{formatCurrency(property.arv)}</p>
          </div>
          <div>
            <span className="text-[10px] text-[#64748b]">Est. Rent</span>
            <p className="text-xs font-mono font-medium text-[#f8fafc]">{formatCurrency(property.estimatedRent)}/mo</p>
          </div>
          <div>
            <span className="text-[10px] text-[#64748b]">Submitted</span>
            <p className="text-xs font-mono font-medium text-[#f8fafc]">{property.submittedDate}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function DealDetailSheet({ property, open, onOpenChange }) {
  const navigate = useNavigate()
  const [infoRequested, setInfoRequested] = useState(false)
  const [rejected, setRejected] = useState(false)
  if (!property) {
    return (
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent side="right" className="w-full max-w-[640px] bg-[#020617] border-l border-white/6 p-0">
          <SheetHeader className="p-6">
            <SheetTitle className="text-[#f8fafc]">No property selected</SheetTitle>
            <SheetDescription className="text-[#64748b]">Select a deal to view details.</SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    )
  }

  const wholesaler = getWholesalerById(property.wholesalerId)
  const isHero = property.id === 'prop-001'
  const score = isHero ? wholesalerSubmission.aiProcessed.dealQualityScore : property.dealScore
  const scoreColor = getScoreColor(score)
  const reliabilityColors = wholesaler ? getReliabilityColor(wholesaler.reliabilityScore) : null

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full max-w-[640px] bg-[#020617] border-l border-white/6 p-0"
      >
        <ScrollArea className="h-full">
          {/* ── 1. Property Header ── */}
          <div className="p-6 pb-4">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                <SheetHeader className="p-0 space-y-0">
                  <SheetTitle className="font-heading text-lg font-bold text-[#f8fafc] leading-tight">
                    {property.address}
                  </SheetTitle>
                  <SheetDescription className="text-[#94a3b8] text-sm mt-1">
                    {property.city}, {property.state} {property.zip}
                  </SheetDescription>
                </SheetHeader>
              </div>
              <div className="w-24 h-20 rounded-lg bg-[#1e293b] flex items-center justify-center shrink-0">
                <Home className="w-8 h-8 text-[#334155]" />
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 mt-3">
              <StatusBadge status={property.status} />
              <StatPill icon={Bed} value={property.beds} />
              <StatPill icon={Bath} value={property.baths} />
              <StatPill icon={Ruler} value={`${property.sqft.toLocaleString()} SF`} />
              <StatPill icon={Calendar} value={property.yearBuilt} />
            </div>
          </div>

          {/* ── 2. Separator ── */}
          <Separator className="bg-white/6" />

          {/* ── 3. Raw vs AI Comparison OR Simplified Detail ── */}
          {isHero ? (
            <div>
              <div className="flex items-center gap-2 px-6 pt-4 pb-2">
                <span className="font-heading text-sm font-semibold text-[#f8fafc]">
                  Deal Intake Transformation
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 px-6">
                <RawSubmissionCard />
                <AIProcessedCard />
              </div>
            </div>
          ) : (
            <SimplifiedDetail property={property} />
          )}

          {/* ── 4. Wholesaler Card ── */}
          {wholesaler && (
            <div className="px-6 mt-4">
              <div className="glass-card p-4 rounded-lg">
                <p className="text-xs font-semibold text-[#f8fafc] uppercase tracking-wider mb-3">
                  Wholesaler Track Record
                </p>
                <div className="flex items-center gap-3 mb-3">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-[#f8fafc]">{wholesaler.name}</p>
                    <p className="text-xs text-[#64748b]">{wholesaler.company}</p>
                  </div>
                  <span
                    className="ml-auto text-[10px] font-semibold rounded-full px-2.5 py-0.5 shrink-0"
                    style={{
                      color: reliabilityColors.text,
                      backgroundColor: reliabilityColors.bg,
                    }}
                  >
                    {wholesaler.reliabilityScore}
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  <div>
                    <span className="text-[10px] text-[#64748b]">Total Deals</span>
                    <p className="text-xs font-mono font-medium text-[#f8fafc]">{wholesaler.totalDeals}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#64748b]">Closed</span>
                    <p className="text-xs font-mono font-medium text-[#f8fafc]">{wholesaler.closedDeals}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#64748b]">ARV Accuracy</span>
                    <p className="text-xs font-mono font-medium text-[#f8fafc]">{wholesaler.avgArvAccuracy}%</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#64748b]">Cost Dev.</span>
                    <p className="text-xs font-mono font-medium text-[#f8fafc]">{wholesaler.avgCostDeviation}%</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── 5. Deal Quality Score ── */}
          <div className="px-6 mt-4">
            <div className="flex flex-col items-center py-4">
              <div className="flex items-baseline">
                <span
                  className="font-heading text-4xl font-bold"
                  style={{ color: scoreColor }}
                >
                  {score}
                </span>
                <span className="text-[#64748b] text-lg ml-0.5">/100</span>
              </div>
              <p className="text-xs text-[#64748b] mt-1">Deal Quality Score</p>
              <div className="w-full max-w-[200px] mt-3">
                <div className="h-2 rounded-full bg-[#1e293b] overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: scoreColor }}
                    initial={{ width: 0 }}
                    animate={{ width: `${score}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ── 6. Action Buttons ── */}
          <div className="px-6 py-4 mt-4 border-t border-white/6 sticky bottom-0 bg-[#020617]">
            <div className="flex flex-col gap-2 md:flex-row md:gap-3">
              <Button
                className="bg-[#3b82f6] hover:bg-[#2563eb] text-white"
                onClick={() => {
                  onOpenChange(false)
                  setTimeout(() => navigate('/inspection'), 200)
                }}
              >
                Send to Inspection
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
              <Button
                variant="outline"
                className={infoRequested
                  ? 'border-[#10b981]/30 text-[#10b981] bg-[#10b981]/10'
                  : 'border-white/10 text-[#94a3b8]'
                }
                onClick={() => setInfoRequested(true)}
                disabled={infoRequested}
              >
                {infoRequested ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 mr-1" />
                    Info Requested
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-1" />
                    Request Info
                  </>
                )}
              </Button>
              <Button
                variant="ghost"
                className={rejected
                  ? 'text-[#ef4444] bg-[#ef4444]/10 line-through'
                  : 'text-[#ef4444] hover:bg-[#ef4444]/10'
                }
                onClick={() => setRejected(true)}
                disabled={rejected}
              >
                {rejected ? 'Rejected' : 'Reject'}
              </Button>
            </div>
          </div>

          {/* Bottom padding for scroll area */}
          <div className="h-4" />
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}

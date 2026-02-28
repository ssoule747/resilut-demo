import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Zap, FileSpreadsheet } from 'lucide-react'
import { defectLedger, renovationScope, HERO_PROPERTY } from '@/data/mockData'
import DefectSidebar from '@/components/renovation/DefectSidebar'
import ScopeAccordion from '@/components/renovation/ScopeAccordion'
import CostSummary from '@/components/renovation/CostSummary'

export default function RenovationScope() {
  const [activeDefectId, setActiveDefectId] = useState(null)

  const findTradeForDefect = useCallback((defectId) => {
    if (!defectId) return null
    for (const [key, trade] of Object.entries(renovationScope.trades)) {
      if (trade.defectId === defectId) return key
    }
    return null
  }, [])

  const activeTrade = findTradeForDefect(activeDefectId)
  const activeTradeData = activeTrade ? renovationScope.trades[activeTrade] : null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-5"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="font-heading text-2xl font-bold text-[#f8fafc]">Renovation Scope of Work</h1>
            <p className="text-sm text-[#64748b] mt-1">
              {HERO_PROPERTY.address}, {HERO_PROPERTY.city}, {HERO_PROPERTY.state} — {HERO_PROPERTY.beds}bd/{HERO_PROPERTY.baths}ba/{HERO_PROPERTY.sqft.toLocaleString()}sf
            </p>
          </div>
        </div>

        {/* Priority badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5, type: 'spring' }}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#f59e0b]/15 to-[#f59e0b]/5 border border-[#f59e0b]/25"
          style={{ boxShadow: '0 0 20px rgba(245, 158, 11, 0.1)' }}
        >
          <Zap className="h-4 w-4 text-[#f59e0b]" />
          <span className="text-xs font-semibold text-[#f59e0b] uppercase tracking-wider">Highest Priority Module</span>
        </motion.div>
      </div>

      {/* Defect-to-trade mapping info bar */}
      {activeDefectId && activeTradeData && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#3b82f6]/8 border border-[#3b82f6]/15 text-xs text-[#3b82f6]"
        >
          <FileSpreadsheet className="h-3.5 w-3.5" />
          <span>
            Defect {activeDefectId} maps to{' '}
            <span className="font-semibold">{activeTradeData.trade}</span>
            {' — '}
            {activeTradeData.items.length} line items,{' '}
            <span className="font-mono">${activeTradeData.subtotal.toLocaleString()}</span>
          </span>
        </motion.div>
      )}

      {/* Three-panel layout */}
      <div className="flex flex-col gap-5 md:flex-row md:items-start">
        {/* Left: Defect Sidebar — fixed 220px */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="w-full md:w-[220px] md:shrink-0"
        >
          <DefectSidebar
            defects={defectLedger}
            activeDefectId={activeDefectId}
            onSelectDefect={setActiveDefectId}
          />
        </motion.div>

        {/* Center: Scope Accordion — flex grow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex-1 min-w-0"
        >
          <ScopeAccordion
            scope={renovationScope}
            activeDefectId={activeDefectId}
            highlightedTrade={activeTrade}
          />
        </motion.div>

        {/* Right: Cost Summary — fixed 280px, sticky */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="w-full md:w-[280px] md:shrink-0"
        >
          <CostSummary
            scope={renovationScope}
            activeTrade={activeTrade}
          />
        </motion.div>
      </div>
    </motion.div>
  )
}

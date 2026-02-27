import { useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion'

function formatCurrency(value, decimals = false) {
  return value.toLocaleString('en-US', {
    minimumFractionDigits: decimals ? 2 : 0,
    maximumFractionDigits: decimals ? 2 : 0,
  })
}

export default function ScopeAccordion({ scope, activeDefectId, highlightedTrade }) {
  const [openSections, setOpenSections] = useState([])

  // Auto-expand the highlighted trade
  useEffect(() => {
    if (highlightedTrade && !openSections.includes(highlightedTrade)) {
      setOpenSections((prev) => [...prev, highlightedTrade])
    }
  }, [highlightedTrade])

  // Count total line items
  const totalItems = useMemo(() => {
    return Object.values(scope.trades).reduce((sum, t) => sum + t.items.length, 0)
  }, [scope.trades])

  // Build a map: defectId -> tradeKey for highlight matching
  const defectToTradeKey = useMemo(() => {
    const map = {}
    for (const [key, trade] of Object.entries(scope.trades)) {
      map[trade.defectId] = key
    }
    return map
  }, [scope.trades])

  const activeTradeKey = activeDefectId ? defectToTradeKey[activeDefectId] : null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
      className="flex-1 min-w-0 flex flex-col bg-[#0f172a]/60 backdrop-blur-xl border border-white/[0.06] rounded-xl overflow-hidden"
    >
      <style>{`
        @keyframes highlightPulse {
          0% { background-color: rgba(59, 130, 246, 0.15); }
          100% { background-color: transparent; }
        }
      `}</style>

      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-[#f59e0b]" />
          <h3 className="font-heading text-sm font-semibold text-[#f8fafc]">
            Generated Scope of Work
          </h3>
        </div>
        <span className="font-mono text-[11px] bg-white/[0.06] text-[#94a3b8] rounded-full px-2 py-0.5">
          {totalItems} line items
        </span>
      </div>

      {/* Accordion body */}
      <div className="flex-1 overflow-y-auto px-5 py-2">
        <Accordion type="multiple" value={openSections} onValueChange={setOpenSections}>
          {Object.entries(scope.trades).map(([tradeKey, trade]) => {
            const isHighlightedTrade = tradeKey === activeTradeKey
            return (
              <AccordionItem
                key={tradeKey}
                value={tradeKey}
                className="border-white/[0.04]"
              >
                <AccordionTrigger className="hover:no-underline py-3">
                  <div className="flex items-center justify-between flex-1 mr-3">
                    <span className="font-heading text-sm text-[#f8fafc]">{trade.trade}</span>
                    <span className="font-mono text-sm text-[#94a3b8]">
                      ${formatCurrency(trade.subtotal)}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/[0.04]">
                        <th className="text-left text-[10px] text-[#64748b] font-normal pb-1.5 pr-3">
                          Line Item
                        </th>
                        <th className="text-right text-[10px] text-[#64748b] font-normal pb-1.5 px-2 w-12">
                          Qty
                        </th>
                        <th className="text-right text-[10px] text-[#64748b] font-normal pb-1.5 px-2 w-10">
                          Unit
                        </th>
                        <th className="text-right text-[10px] text-[#64748b] font-normal pb-1.5 px-2 w-20">
                          Unit Cost
                        </th>
                        <th className="text-right text-[10px] text-[#64748b] font-normal pb-1.5 pl-2 w-20">
                          Total
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {trade.items.map((item, idx) => (
                        <tr
                          key={item.id}
                          className={idx % 2 === 1 ? 'bg-white/[0.01]' : 'bg-transparent'}
                          style={
                            isHighlightedTrade
                              ? { animation: 'highlightPulse 1s ease-out' }
                              : {}
                          }
                        >
                          <td className="text-[#94a3b8] text-sm py-1.5 pr-3">
                            {item.description}
                          </td>
                          <td className="font-mono text-xs text-[#64748b] text-right py-1.5 px-2">
                            {item.qty}
                          </td>
                          <td className="font-mono text-xs text-[#64748b] text-right py-1.5 px-2">
                            {item.unit}
                          </td>
                          <td className="font-mono text-sm text-[#94a3b8] text-right py-1.5 px-2">
                            ${formatCurrency(item.unitCost, true)}
                          </td>
                          <td className="font-mono text-sm text-[#94a3b8] text-right py-1.5 pl-2">
                            ${formatCurrency(item.total)}
                          </td>
                        </tr>
                      ))}
                      {/* Subtotal row */}
                      <tr className="border-t border-white/[0.04]">
                        <td
                          colSpan={4}
                          className="text-sm text-[#94a3b8] font-semibold text-right py-2 pr-2"
                        >
                          Subtotal
                        </td>
                        <td className="font-mono text-sm text-[#f8fafc] font-semibold text-right py-2 pl-2">
                          ${formatCurrency(trade.subtotal)}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </AccordionContent>
              </AccordionItem>
            )
          })}
        </Accordion>

        {/* Totals summary */}
        <div className="bg-[#0f172a]/40 rounded-lg p-4 mt-4 mb-2">
          <div className="flex items-center justify-between py-1.5">
            <span className="text-sm text-[#94a3b8]">Base Cost</span>
            <span className="font-mono text-sm text-[#f8fafc]">
              ${formatCurrency(scope.baseCost)}
            </span>
          </div>
          <div className="flex items-center justify-between py-1.5">
            <span className="text-sm text-[#94a3b8]">
              Contingency ({scope.contingencyPercent}%)
            </span>
            <span className="font-mono text-sm text-[#f8fafc]">
              ${formatCurrency(scope.contingencyAmount)}
            </span>
          </div>
          <div className="border-t border-white/[0.06] my-2" />
          <div className="flex items-center justify-between py-1">
            <span className="text-sm font-semibold text-[#f8fafc]">Grand Total</span>
            <span className="text-[#f59e0b] font-mono text-xl font-bold">
              ${formatCurrency(scope.totalBudget)}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

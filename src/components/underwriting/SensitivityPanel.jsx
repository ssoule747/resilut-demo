import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Brain, AlertTriangle, TrendingDown, Building } from 'lucide-react'
import { callClaude, isAPIConfigured } from '@/lib/anthropic'
import { underwritingData } from '@/data/mockData'

const fallbackScenarios = [
  {
    icon: TrendingDown,
    title: 'Rents -10%',
    color: '#eab308',
    text: 'If rents come in 10% below projection ($1,305/mo), this deal still meets minimum DSCR at 1.21. Cash-on-cash return drops to 8.7% \u2014 still viable but below target threshold.',
  },
  {
    icon: AlertTriangle,
    title: 'Renovation +15%',
    color: '#f97316',
    text: 'If renovation costs exceed budget by 15% ($59,752), all-in cost rises to $144,752. Cash-on-cash drops to 8.4%. The deal remains positive but recommend tightening scope contingencies.',
  },
  {
    icon: Building,
    title: 'ARV Below $170K',
    color: '#ef4444',
    text: 'If ARV appraises below $170,000, recommend renegotiating purchase price to $78,000 or below to maintain target returns. Current purchase at $85,000 would reduce CoC to 6.1%.',
  },
]

const SYSTEM_PROMPT =
  'You are a real estate underwriting analyst for Resilut. Given this deal data, generate a plain-English sensitivity analysis covering 3 scenarios: (1) rents 10% below projection, (2) renovation costs 15% over budget, (3) ARV appraisal below $170K. Be specific with numbers. Format each scenario as a separate paragraph prefixed with the scenario name in bold. Keep each scenario to 2-3 sentences.'

const ICONS = [TrendingDown, AlertTriangle, Building]
const COLORS = ['#eab308', '#f97316', '#ef4444']
const TITLES = ['Rents -10%', 'Renovation +15%', 'ARV Below $170K']

function parseResponse(text) {
  // Split on double newlines to get individual scenario paragraphs
  const paragraphs = text
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean)

  // Take up to 3 paragraphs and map them to scenario objects
  return paragraphs.slice(0, 3).map((raw, i) => {
    // Strip leading bold markers like **Scenario 1: ...** or **Rents -10%:**
    const cleaned = raw.replace(/^\*\*[^*]+\*\*[:\s]*/i, '').trim()
    return {
      icon: ICONS[i] || TrendingDown,
      title: TITLES[i] || `Scenario ${i + 1}`,
      color: COLORS[i] || '#64748b',
      text: cleaned || raw,
    }
  })
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}

const item = {
  hidden: { opacity: 0, x: -8 },
  show: { opacity: 1, x: 0, transition: { duration: 0.4, ease: 'easeOut' } },
}

export default function SensitivityPanel() {
  const [loading, setLoading] = useState(true)
  const [scenarios, setScenarios] = useState(null)

  useEffect(() => {
    let cancelled = false

    async function run() {
      const response = await callClaude(
        SYSTEM_PROMPT,
        JSON.stringify(underwritingData, null, 2)
      )

      if (cancelled) return

      if (response) {
        const parsed = parseResponse(response)
        setScenarios(parsed.length >= 3 ? parsed : fallbackScenarios)
      } else {
        setScenarios(fallbackScenarios)
      }

      setLoading(false)
    }

    run()
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <div className="bg-[#0f172a]/80 backdrop-blur-xl border border-white/[0.06] rounded-xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 px-6 py-4 border-b border-white/[0.06]">
        <Brain className="w-5 h-5 text-[#3b82f6]" />
        <h3 className="font-heading text-sm font-semibold text-[#f8fafc] uppercase tracking-wider">
          AI Sensitivity Analysis
        </h3>
      </div>

      {/* Body */}
      <div className="p-6">
        {loading ? (
          <div className="space-y-4">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="bg-[#1e293b] animate-pulse rounded h-16"
                style={{ animationDelay: `${i * 150}ms` }}
              />
            ))}
            <p className="text-sm text-[#475569] text-center mt-3">
              AI running sensitivity analysis...
            </p>
          </div>
        ) : (
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-3"
          >
            {scenarios.map((s, i) => {
              const Icon = s.icon
              return (
                <motion.div
                  key={i}
                  variants={item}
                  className="flex items-start gap-4 rounded-lg p-4 transition-colors hover:bg-white/[0.02]"
                  style={{ borderLeft: `3px solid ${s.color}` }}
                >
                  <div className="flex-shrink-0 mt-0.5">
                    <Icon
                      className="w-5 h-5"
                      style={{ color: s.color }}
                    />
                  </div>
                  <div className="min-w-0">
                    <p
                      className="font-heading text-sm font-semibold mb-1"
                      style={{ color: s.color }}
                    >
                      {s.title}
                    </p>
                    <p className="text-sm text-[#94a3b8] leading-relaxed">
                      {s.text}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        )}
      </div>
    </div>
  )
}

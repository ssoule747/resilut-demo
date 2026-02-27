import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { callClaude, isAPIConfigured } from '@/lib/anthropic'
import { AIThinkingDots } from '@/components/shared/LoadingSkeleton'
import { portfolioKPIs, burnRateData } from '@/data/mockData'

const fallbackInsights = [
  {
    severity: 'critical',
    emoji: '\u{1F534}',
    text: 'Memphis renovation portfolio trending 12% over budget ($542K vs $485K). Primary drivers: 1847 Magnolia Dr foundation scope and 2203 Oak Street. Recommend immediate scope review for remaining Memphis projects.',
  },
  {
    severity: 'warning',
    emoji: '\u{1F7E1}',
    text: 'Atlanta vacancy at 8.2%, above portfolio target of 5%. Three units in Decatur submarket driving the variance. Consider rent adjustment or targeted marketing.',
  },
  {
    severity: 'positive',
    emoji: '\u{1F7E2}',
    text: 'Q1 acquisition pace on track: 847 deals closed YTD vs 833 target (+1.7%). Capital deployment at $102.4M \u2014 102% of plan.',
  },
  {
    severity: 'info',
    emoji: '\u{1F535}',
    text: '28 properties approaching refi eligibility in pipeline. Estimated capital unlock: $485,000. 3340 Desert Vista and 1156 Cactus Wren Ln ready for lender submission.',
  },
]

const severityColors = {
  critical: '#ef4444',
  warning: '#f59e0b',
  positive: '#10b981',
  info: '#3b82f6',
}

const emojiToSeverity = {
  '\u{1F534}': 'critical',
  '\u{1F7E1}': 'warning',
  '\u{1F7E2}': 'positive',
  '\u{1F535}': 'info',
}

function parseInsights(text) {
  const lines = text.split('\n').filter((l) => l.trim())
  return lines.map((line) => {
    const trimmed = line.trim()
    // Detect emoji prefix
    for (const [emoji, severity] of Object.entries(emojiToSeverity)) {
      if (trimmed.startsWith(emoji)) {
        return {
          severity,
          emoji,
          text: trimmed.slice(emoji.length).trim(),
        }
      }
    }
    // Fallback: info
    return { severity: 'info', emoji: '\u{1F535}', text: trimmed }
  })
}

export default function AIInsightsPanel() {
  const [insights, setInsights] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    async function fetchInsights() {
      setLoading(true)

      if (isAPIConfigured()) {
        const systemPrompt =
          'You are a portfolio intelligence analyst for Resilut, an AI-powered single-family rental investment platform. Given the following portfolio data, generate exactly 4 brief, actionable insights. Each insight should be 1-2 sentences max. Format each on its own line starting with exactly one of these emojis: \u{1F534} (critical/action needed), \u{1F7E1} (warning/attention), \u{1F7E2} (positive/on track), \u{1F535} (informational). Be specific with numbers, cities, and dollar amounts. Do not use bullet points or numbering.'
        const userMessage = JSON.stringify({ portfolioKPIs, burnRateData })
        const response = await callClaude(systemPrompt, userMessage)

        if (!cancelled) {
          if (response) {
            const parsed = parseInsights(response)
            setInsights(parsed.length > 0 ? parsed : fallbackInsights)
          } else {
            setInsights(fallbackInsights)
          }
        }
      } else {
        if (!cancelled) {
          setInsights(fallbackInsights)
        }
      }

      if (!cancelled) {
        setLoading(false)
      }
    }

    fetchInsights()
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <div className="glass-card rounded-xl p-5">
      {/* Header */}
      <div className="mb-4 flex items-center gap-2">
        <Sparkles className="h-4 w-4 text-[#8b5cf6]" />
        <h3 className="font-heading text-sm font-semibold text-[#f8fafc]">
          AI Portfolio Insights
        </h3>
        {loading && (
          <div className="flex items-center gap-1">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="h-1.5 w-1.5 rounded-full bg-[#8b5cf6]"
                animate={{
                  scale: [1, 1.4, 1],
                  opacity: [0.4, 1, 0.4],
                }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  delay: i * 0.15,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Loading state */}
      {loading && (
        <div className="flex flex-col gap-3">
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1, duration: 0.3 }}
              className="h-16 animate-pulse rounded-lg bg-[#1e293b]"
            />
          ))}
          <AIThinkingDots text="AI analyzing portfolio" />
        </div>
      )}

      {/* Loaded state */}
      {!loading && insights && (
        <div className="flex flex-col gap-3">
          {insights.map((insight, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.15, duration: 0.3 }}
              className="flex gap-3 rounded-lg border-l-2 bg-[#0f172a]/50 px-4 py-3"
              style={{ borderLeftColor: severityColors[insight.severity] }}
            >
              <span className="shrink-0 text-base">{insight.emoji}</span>
              <p className="text-sm leading-relaxed text-[#94a3b8]">
                {insight.text}
              </p>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}

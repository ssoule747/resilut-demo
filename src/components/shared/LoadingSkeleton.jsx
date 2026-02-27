import { motion } from 'framer-motion'

/**
 * Reusable skeleton loading component with pulse animation.
 *
 * Usage:
 *   <LoadingSkeleton variant="card" />
 *   <LoadingSkeleton variant="text" lines={3} />
 *   <LoadingSkeleton variant="chart" />
 *   <LoadingSkeleton variant="table" rows={5} />
 */

function SkeletonPulse({ className = '', style = {} }) {
  return (
    <div
      className={`animate-pulse rounded-lg bg-white/[0.04] ${className}`}
      style={style}
    />
  )
}

export function SkeletonCard() {
  return (
    <div className="glass-card p-5 rounded-xl space-y-3">
      <SkeletonPulse className="h-4 w-24" />
      <SkeletonPulse className="h-8 w-32" />
      <SkeletonPulse className="h-3 w-20" />
    </div>
  )
}

export function SkeletonText({ lines = 3 }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: lines }, (_, i) => (
        <SkeletonPulse
          key={i}
          className="h-3"
          style={{ width: i === lines - 1 ? '60%' : `${85 + Math.random() * 15}%` }}
        />
      ))}
    </div>
  )
}

export function SkeletonChart() {
  return (
    <div className="glass-card p-5 rounded-xl">
      <SkeletonPulse className="h-4 w-40 mb-4" />
      <div className="flex items-end gap-2 h-[200px]">
        {Array.from({ length: 8 }, (_, i) => (
          <SkeletonPulse
            key={i}
            className="flex-1 rounded-t-md"
            style={{ height: `${30 + Math.random() * 70}%` }}
          />
        ))}
      </div>
    </div>
  )
}

export function SkeletonTable({ rows = 5 }) {
  return (
    <div className="glass-card overflow-hidden rounded-xl">
      {/* Header */}
      <div className="flex gap-4 p-4 border-b border-white/[0.04]">
        {Array.from({ length: 5 }, (_, i) => (
          <SkeletonPulse key={i} className="h-3 flex-1" />
        ))}
      </div>
      {/* Rows */}
      {Array.from({ length: rows }, (_, i) => (
        <div key={i} className="flex gap-4 p-4 border-b border-white/[0.02]">
          {Array.from({ length: 5 }, (_, j) => (
            <SkeletonPulse
              key={j}
              className="h-3 flex-1"
              style={{ opacity: 1 - i * 0.1 }}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

/**
 * AI Thinking indicator — three dots that pulse in sequence.
 * Used when calling the Claude API.
 */
export function AIThinkingDots({ text = 'AI analyzing' }) {
  return (
    <div className="flex items-center gap-3 px-4 py-3">
      <div className="flex items-center gap-1">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="h-2 w-2 rounded-full bg-[#3b82f6]"
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
      <span className="text-sm text-[#64748b]">{text}...</span>
    </div>
  )
}

/**
 * AI Loading card — used as a placeholder while AI generates content.
 */
export function AILoadingCard({ message = 'AI analyzing property data' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-5 rounded-xl"
      style={{ borderLeft: '3px solid #3b82f6' }}
    >
      <AIThinkingDots text={message} />
      <div className="mt-3 space-y-2 pl-4">
        <SkeletonPulse className="h-3 w-[80%]" />
        <SkeletonPulse className="h-3 w-[65%]" />
        <SkeletonPulse className="h-3 w-[45%]" />
      </div>
    </motion.div>
  )
}

export default {
  SkeletonCard,
  SkeletonText,
  SkeletonChart,
  SkeletonTable,
  AIThinkingDots,
  AILoadingCard,
}

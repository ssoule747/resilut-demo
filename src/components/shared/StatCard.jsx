'use client'

import { useMotionValue, useTransform, animate } from 'framer-motion'
import { useEffect, useState } from 'react'
import { TrendingUp, TrendingDown } from 'lucide-react'

const colorMap = {
  blue: {
    icon: '#3b82f6',
    iconBg: 'rgba(59,130,246,0.1)',
    text: '#3b82f6',
    glow: '0 0 20px rgba(59,130,246,0.1)',
  },
  orange: {
    icon: '#f97316',
    iconBg: 'rgba(249,115,22,0.1)',
    text: '#f97316',
    glow: '0 0 20px rgba(249,115,22,0.1)',
  },
  green: {
    icon: '#10b981',
    iconBg: 'rgba(16,185,129,0.1)',
    text: '#10b981',
    glow: '0 0 20px rgba(16,185,129,0.1)',
  },
  purple: {
    icon: '#8b5cf6',
    iconBg: 'rgba(139,92,246,0.1)',
    text: '#8b5cf6',
    glow: '0 0 20px rgba(139,92,246,0.1)',
  },
}

export default function StatCard({ title, value, change, changeType, icon: Icon, color = 'blue' }) {
  const colors = colorMap[color] || colorMap.blue

  const count = useMotionValue(0)
  const rounded = useTransform(count, (v) => Math.round(v).toLocaleString())
  const [displayValue, setDisplayValue] = useState('0')

  useEffect(() => {
    const controls = animate(count, value, { duration: 1.5, ease: 'easeOut' })
    const unsubscribe = rounded.on('change', (v) => setDisplayValue(v))
    return () => {
      controls.stop()
      unsubscribe()
    }
  }, [value])

  return (
    <div
      className="glass-card relative overflow-hidden rounded-xl p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-white/10"
      style={{ boxShadow: colors.glow }}
    >
      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px]"
        style={{ background: colors.icon }}
      />

      {/* Top row: title + icon */}
      <div className="flex items-start justify-between">
        <span className="text-sm font-medium text-[#94a3b8]">{title}</span>
        <div
          className="flex h-10 w-10 items-center justify-center rounded-lg"
          style={{ background: colors.iconBg }}
        >
          {Icon && <Icon className="h-5 w-5" style={{ color: colors.icon }} />}
        </div>
      </div>

      {/* Big number */}
      <div className="mt-2">
        <span className="font-heading text-3xl font-bold text-[#f8fafc]">
          {displayValue}
        </span>
      </div>

      {/* Change indicator */}
      <div className="mt-2 flex items-center gap-1.5">
        {changeType === 'up' ? (
          <>
            <TrendingUp className="h-3.5 w-3.5" style={{ color: '#10b981' }} />
            <span className="text-xs font-medium" style={{ color: '#10b981' }}>
              {change}
            </span>
          </>
        ) : (
          <>
            <TrendingDown className="h-3.5 w-3.5" style={{ color: '#ef4444' }} />
            <span className="text-xs font-medium" style={{ color: '#ef4444' }}>
              {change}
            </span>
          </>
        )}
        <span className="text-xs text-[#64748b]">vs last month</span>
      </div>
    </div>
  )
}

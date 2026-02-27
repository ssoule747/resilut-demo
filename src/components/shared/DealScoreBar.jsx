export default function DealScoreBar({ score }) {
  const color = score >= 70 ? '#10b981' : score >= 50 ? '#f59e0b' : '#ef4444'

  return (
    <div className="flex items-center gap-2">
      <span className="font-mono text-sm font-semibold" style={{ color }}>
        {score}
      </span>
      <div className="h-1.5 w-16 rounded-full bg-[#1e293b]">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${score}%`, backgroundColor: color }}
        />
      </div>
    </div>
  )
}

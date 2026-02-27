import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, Cell } from 'recharts'
import { burnRateData } from '@/data/mockData'

const BurnTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  const budget = payload.find(p => p.dataKey === 'budget')?.value || 0
  const actual = payload.find(p => p.dataKey === 'actual')?.value || 0
  const variance = ((actual - budget) / budget * 100).toFixed(1)
  const isOver = actual > budget
  return (
    <div className="glass-card px-3 py-2 text-xs">
      <p className="font-medium text-[#f8fafc] mb-1">{label}</p>
      <p className="text-[#94a3b8]">Budget: <span className="font-mono text-[#f8fafc]">${(budget/1000).toFixed(0)}K</span></p>
      <p className="text-[#94a3b8]">Actual: <span className={`font-mono ${isOver ? 'text-[#ef4444]' : 'text-[#3b82f6]'}`}>${(actual/1000).toFixed(0)}K</span></p>
      <p className={`mt-1 font-medium ${isOver ? 'text-[#ef4444]' : 'text-[#10b981]'}`}>
        {isOver ? '+' : ''}{variance}% {isOver ? 'over' : 'under'}
      </p>
    </div>
  )
}

export default function BurnRateChart() {
  return (
    <div className="glass-card p-5 rounded-xl">
      <h3 className="font-heading text-sm font-semibold text-[#f8fafc] mb-4">
        Renovation Burn Rate by Market
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={burnRateData}>
          <XAxis
            dataKey="market"
            tick={{ fill: '#94a3b8', fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: '#64748b', fontSize: 11, fontFamily: "'JetBrains Mono', monospace" }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `$${(v / 1000).toFixed(0)}K`}
          />
          <Tooltip content={<BurnTooltip />} cursor={false} />
          <Legend
            wrapperStyle={{ fontSize: '12px', color: '#64748b' }}
          />
          <Bar
            dataKey="budget"
            fill="#334155"
            radius={[4, 4, 0, 0]}
            barSize={24}
            name="Budget"
            animationDuration={1200}
          />
          <Bar
            dataKey="actual"
            radius={[4, 4, 0, 0]}
            barSize={24}
            name="Actual"
            animationDuration={1200}
          >
            {burnRateData.map((entry, index) => (
              <Cell key={index} fill={entry.actual > entry.budget ? '#ef4444' : '#3b82f6'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

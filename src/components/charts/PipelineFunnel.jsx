import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { pipelineFunnel } from '@/data/mockData'

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null
  const data = payload[0].payload
  return (
    <div className="glass-card px-3 py-2 text-xs">
      <p className="font-medium text-[#f8fafc]">{data.stage}</p>
      <p className="font-mono text-[#94a3b8]">{data.count} deals</p>
    </div>
  )
}

export default function PipelineFunnel() {
  return (
    <div className="glass-card p-5 rounded-xl">
      <h3 className="font-heading text-sm font-semibold text-[#f8fafc] mb-4">
        Deal Pipeline
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart layout="vertical" data={pipelineFunnel}>
          <XAxis
            type="number"
            tick={{ fill: '#64748b', fontSize: 12, fontFamily: "'JetBrains Mono', monospace" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            type="category"
            dataKey="stage"
            tick={{ fill: '#94a3b8', fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            width={100}
          />
          <Tooltip content={<CustomTooltip />} cursor={false} />
          <Bar
            dataKey="count"
            radius={[0, 6, 6, 0]}
            barSize={20}
            animationDuration={1200}
            animationEasing="ease-out"
          >
            {pipelineFunnel.map((entry, index) => (
              <Cell key={index} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

'use client'

import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer
  } from 'recharts'
  
const data = [
  { name: 'BTC', value: 50, color: '#F7931A' },
  { name: 'ETH', value: 30, color: '#3C3C3D' },
  { name: 'USDC', value: 20, color: '#2775CA' },
]

export default function AllocationChart() {
  return (
    <div className="bg-card text-card-foreground rounded-lg p-6 shadow-md">
      <h2 className="text-xl font-semibold mb-4">Distribución de activos</h2>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            outerRadius={100}
            innerRadius={60}
            paddingAngle={4}
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <ul className="mt-4 space-y-2 text-sm">
        {data.map((item, i) => (
          <li key={i} className="flex justify-between">
            <span>{item.name}</span>
            <span className="font-semibold">{item.value}%</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
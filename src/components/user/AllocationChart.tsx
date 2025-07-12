'use client'

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const data = [
  { name: 'ETH', value: 1800 },
  { name: 'BTC', value: 1100 },
  { name: 'USDC', value: 650 },
  { name: 'MXNB', value: 700 },
]

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#FF6B6B']

export default function AllocationChart() {
  const total = data.reduce((sum, item) => sum + item.value, 0)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Distribución de Activos</CardTitle>
      </CardHeader>
      <CardContent className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
          <Pie
  data={data}
  dataKey="value"
  nameKey="name"
  cx="50%"
  cy="50%"
  outerRadius={80}
  label={({ name, percent }) =>
    `${name}: ${((percent ?? 0) * 100).toFixed(0)}%`
  }
>
  {data.map((entry, index) => (
    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
  ))}
</Pie>
            <Tooltip formatter={(value: number) => `$${value.toFixed(2)}`} />
            <Legend layout="horizontal" verticalAlign="bottom" align="center" />
          </PieChart>
        </ResponsiveContainer>
        <p className="text-sm text-muted-foreground text-center mt-4">
          Total invertido: ${total.toLocaleString()}
        </p>
      </CardContent>
    </Card>
  )
}

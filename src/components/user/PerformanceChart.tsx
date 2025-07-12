'use client'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const data = [
  { name: 'Ene', value: 4000 },
  { name: 'Feb', value: 4200 },
  { name: 'Mar', value: 4100 },
  { name: 'Abr', value: 4300 },
  { name: 'May', value: 3900 },
  { name: 'Jun', value: 4400 },
  { name: 'Jul', value: 4700 },
]

export default function PerformanceChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Rendimiento del portafolio</CardTitle>
      </CardHeader>
      <CardContent className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#22c55e" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

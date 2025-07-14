'use client'

import { useEffect, useState } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

// Tipos
type ActivityItem = {
  date: string
  type: string
  token: string
  amount: string // Ej. "200 MXNB"
  status: string
  pnl?: string
}

export default function PerformanceChart() {
  const [data, setData] = useState<{ date: string; mxnb: number }[]>([])

  useEffect(() => {
    const stored = localStorage.getItem('user_activity_log')
    if (!stored) return

    const activities = JSON.parse(stored) as ActivityItem[]

    // Acumulador para balance
    let balance = 0
    const series: { date: string; mxnb: number }[] = []

    const sorted = [...activities].sort((a, b) =>
      new Date(a.date).getTime() - new Date(b.date).getTime()
    )

    sorted.forEach((item) => {
      const match = item.amount.match(/(\d+(\.\d+)?)/)
      const amount = match ? parseFloat(match[1]) : 0

      if (item.type === 'Compra' || item.type === 'Depósito') {
        balance += amount
      } else if (item.type === 'Retiro') {
        balance -= amount
      }

      series.push({
        date: item.date,
        mxnb: balance,
      })
    })

    setData(series)
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Desempeño del Portafolio</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px]">
        {data.length === 0 ? (
          <p className="text-muted-foreground">No hay suficiente historial aún.</p>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="mxnb"
                stroke="#4ade80"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  )
}

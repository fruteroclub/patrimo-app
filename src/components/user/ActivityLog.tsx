'use client'

import { useEffect, useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

type ActivityItem = {
  date: string
  type: 'Compra' | 'Venta'
  token: string
  amount: string
  status: string
  pnl: string
}

export default function ActivityLog() {
  const [activity, setActivity] = useState<ActivityItem[]>([
    {
      date: '2025-07-10',
      type: 'Compra',
      token: 'ETH',
      amount: '200 MXNB',
      status: 'Ejecutada',
      pnl: '+12%',
    },
    {
      date: '2025-07-05',
      type: 'Venta',
      token: 'BTC',
      amount: '150 MXNB',
      status: 'Ejecutada',
      pnl: '-3%',
    },
  ])

  // Recuperar nuevas actividades almacenadas en localStorage
  useEffect(() => {
    const stored = localStorage.getItem('user_activity_log')
    if (stored) {
      const parsed = JSON.parse(stored) as ActivityItem[]
      setActivity((prev) => [...parsed, ...prev])
    }
  }, [])

  return (
    <div className="space-y-4">
      {activity.map((item, i) => (
        <Card key={i}>
          <CardHeader>
            <CardTitle className="text-base">
              {item.date} · {item.type} de {item.token}
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm space-y-1">
            <p>Monto: {item.amount}</p>
            <p>Estado: {item.status}</p>
            <p>
              Resultado:{' '}
              <span
                className={
                  item.pnl.startsWith('+') ? 'text-green-600' : 'text-red-500'
                }
              >
                {item.pnl}
              </span>
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

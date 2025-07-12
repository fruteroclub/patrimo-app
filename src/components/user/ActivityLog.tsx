'use client'

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

const activity = [
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
]

export default function ActivityLog() {
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
            <p>Resultado: <span className={item.pnl.startsWith('+') ? 'text-green-600' : 'text-red-500'}>{item.pnl}</span></p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

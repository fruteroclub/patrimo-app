'use client'

import { useEffect, useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { usePortfolioContext } from '@/context/PortfolioContext'
import { Badge } from '@/components/ui/badge'

type ActivityItem = {
  date: string
  type: string
  token: string
  amount: string
  status: string
  pnl?: string
}

export default function PortfolioOverview() {
  const { balance } = usePortfolioContext()
  const [pnl, setPnl] = useState('+0%')
  const [recent, setRecent] = useState<ActivityItem[]>([])

  useEffect(() => {
    const stored = localStorage.getItem('user_activity_log')
    if (!stored) return

    const parsed = JSON.parse(stored) as ActivityItem[]

    // Últimos 2 movimientos
    const latest = parsed.slice(0, 2)
    setRecent(latest)

    // Calcular PnL total estimado (mock)
    const pnlTotal = parsed.reduce((acc, item) => {
      if (item.pnl?.includes('%')) {
        const sign = item.pnl.startsWith('-') ? -1 : 1
        const num = parseFloat(item.pnl.replace('%', ''))
        return acc + sign * num
      }
      return acc
    }, 0)

    const final = Math.round(pnlTotal / parsed.length)
    setPnl(`${final > 0 ? '+' : ''}${final}%`)
  }, [])

  const getHealthStatus = () => {
    if (balance > 2000) return 'Bien Diversificado'
    if (balance > 0) return 'Capital en crecimiento'
    return 'Sin fondos disponibles'
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Capital total</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-semibold">${balance.toFixed(2)} MXNB</p>
          <p className="text-sm text-muted-foreground">Rentabilidad: <span className={pnl.startsWith('+') ? 'text-green-600' : 'text-red-500'}>{pnl}</span></p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Estado del portafolio</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-semibold">{getHealthStatus()}</p>
          <p className="text-sm text-muted-foreground">Perfil de riesgo: Moderado · Custodia propia 🛡️</p>
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Últimos movimientos</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {recent.length === 0 ? (
            <p className="text-muted-foreground">Sin actividad reciente.</p>
          ) : (
            recent.map((item, idx) => (
              <div key={idx} className="flex justify-between text-sm">
                <span>
                  {item.date} · {item.type} {item.amount} → {item.token}
                </span>
                <Badge variant={item.status === 'Ejecutada' ? 'default' : 'outline'}>
                  {item.status}
                </Badge>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  )
}

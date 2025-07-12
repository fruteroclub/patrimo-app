'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { TrendingUp, Users, DollarSign, Activity } from 'lucide-react'

export default function Insights() {
  const insights = [
    {
      title: 'Ganancias Semanales',
      value: '$1,250.00',
      change: '+15% respecto a la semana pasada',
      icon: <TrendingUp className="w-6 h-6 text-green-500" />,
      badge: 'Estable',
    },
    {
      title: 'Clientes Nuevos',
      value: '8',
      change: '3 desde ayer',
      icon: <Users className="w-6 h-6 text-blue-500" />,
      badge: 'Crecimiento',
    },
    {
      title: 'Clientes Totales',
      value: '24',
      change: 'Activos este mes',
      icon: <Activity className="w-6 h-6 text-purple-500" />,
      badge: 'Engagement',
    },
    {
      title: 'Capital Bajo Gestión',
      value: '$120,400.00',
      change: '+12% desde el mes pasado',
      icon: <DollarSign className="w-6 h-6 text-yellow-500" />,
      badge: 'Ingresos',
    },
  ]

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {insights.map((insight, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg">{insight.title}</CardTitle>
            {insight.icon}
          </CardHeader>
          <CardContent className="space-y-1">
            <p className="text-2xl font-bold">{insight.value}</p>
            <p className="text-sm text-muted-foreground">{insight.change}</p>
            <Badge variant="outline">{insight.badge}</Badge>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

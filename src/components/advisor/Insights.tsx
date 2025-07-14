// src/components/advisor/Insights.tsx
'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Progress } from '@/components/ui/progress'

const insights = [
  {
    title: 'Total de Clientes',
    value: '8',
    description: 'Clientes bajo tu asesoría activa',
  },
  {
    title: 'Cartera Total Asesorada',
    value: '$42,800.00 MXNB',
    description: 'Suma de capital gestionado actualmente',
  },
  {
    title: 'Rendimiento Promedio',
    value: '+8.4%',
    description: 'Con base a últimos 30 días',
    progress: 84,
  },
  {
    title: 'Perfil más común',
    value: 'Moderado',
    description: 'Basado en portafolios activos',
  },
]

export default function Insights() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {insights.map((insight, i) => (
        <Card key={i}>
          <CardHeader>
            <CardTitle>{insight.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-2xl font-semibold">{insight.value}</p>
            <p className="text-muted-foreground text-sm">{insight.description}</p>
            {insight.progress !== undefined && (
              <>
                <Separator />
                <Progress value={insight.progress} className="h-2 mt-2" />
              </>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

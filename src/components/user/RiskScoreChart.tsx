'use client'

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'

export default function RiskScoreChart() {
  const risk = 60 // del 0 al 100

  return (
    <Card>
      <CardHeader>
        <CardTitle>Perfil de Riesgo</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <p>Tu perfil actual es <strong>Moderado</strong>. Puedes ajustar tus preferencias con tu asesor.</p>
        <Progress value={risk} className="w-full" />
        <p className="text-sm text-muted-foreground">60% exposición a activos volátiles</p>
      </CardContent>
    </Card>
  )
}

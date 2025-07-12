'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function PortfolioOverview() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Mi capital actual</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-semibold">$4,250.00</p>
          <p className="text-sm text-muted-foreground">
            +12% desde el mes pasado 🎯 ¡Buen trabajo!
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Perfil de riesgo</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-semibold">Moderado</p>
          <p className="text-sm text-muted-foreground">
            Aprobación manual · Custodia propia 🛡️
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

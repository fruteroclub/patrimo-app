'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { usePortfolioContext } from '@/context/PortfolioContext'

export default function PortfolioOverview() {
  const { balance } = usePortfolioContext()

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Mi capital actual</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-semibold">${balance.toLocaleString()}</p>
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

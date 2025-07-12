'use client'

import { RadialBarChart, RadialBar, ResponsiveContainer } from 'recharts'

const data = [{ name: 'Riesgo', risk: 70, fill: '#F59E0B' }]

export default function RiskScoreChart() {
  return (
    <div className="bg-card text-card-foreground rounded-lg p-6 shadow-md">
      <h2 className="text-xl font-semibold mb-4">Tu perfil de riesgo</h2>
      <ResponsiveContainer width="100%" height={250}>
        <RadialBarChart
          innerRadius="60%"
          outerRadius="100%"
          data={data}
          startAngle={90}
          endAngle={450}
        >
          <RadialBar dataKey="risk" cornerRadius={10} />
        </RadialBarChart>
      </ResponsiveContainer>
      <p className="text-sm text-muted-foreground mt-2">
        Perfil agresivo — alto potencial de ganancia con mayor volatilidad.
      </p>
    </div>
  )
}
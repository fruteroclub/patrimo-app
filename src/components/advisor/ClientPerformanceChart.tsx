'use client'

import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from 'recharts'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

const data = [
  {
    week: 'Mayo 20',
    ganancias: 800,
    clientes: 10,
    capital: 70000,
  },
  {
    week: 'Mayo 27',
    ganancias: 1000,
    clientes: 14,
    capital: 85000,
  },
  {
    week: 'Jun 3',
    ganancias: 950,
    clientes: 16,
    capital: 91000,
  },
  {
    week: 'Jun 10',
    ganancias: 1100,
    clientes: 18,
    capital: 97000,
  },
  {
    week: 'Jun 17',
    ganancias: 1250,
    clientes: 20,
    capital: 104000,
  },
  {
    week: 'Jun 24',
    ganancias: 1350,
    clientes: 22,
    capital: 112000,
  },
  {
    week: 'Jul 1',
    ganancias: 1400,
    clientes: 23,
    capital: 117000,
  },
  {
    week: 'Jul 8',
    ganancias: 1520,
    clientes: 24,
    capital: 120400,
  },
]

export default function ClientPerformanceChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Rendimiento Semanal de Clientes</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={360}>
          <ComposedChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="week" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="clientes" barSize={20} fill="#0ea5e9" name="Clientes Totales" />
            <Line
              type="monotone"
              dataKey="ganancias"
              stroke="#22c55e"
              strokeWidth={3}
              name="Ganancias (MXNB)"
            />
            <Line
              type="monotone"
              dataKey="capital"
              stroke="#facc15"
              strokeWidth={2}
              name="Capital bajo gestión"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

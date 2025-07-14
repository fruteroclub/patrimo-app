'use client'

import { useState } from 'react'
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'

const data = [
  { name: 'BTC', value: 40 },
  { name: 'ETH', value: 30 },
  { name: 'SOL', value: 20 },
  { name: 'MXNB', value: 10 },
]

const COLORS = ['#F7931A', '#627EEA', '#00FFA3', '#666']

export default function AllocationChart() {
  const [open, setOpen] = useState(false)
  const [selectedToken, setSelectedToken] = useState<string | null>(null)
  const [amount, setAmount] = useState('')

  const handleSell = () => {
    if (!selectedToken || !amount) return
    toast.success(`Convertiste ${amount} ${selectedToken} a MXNB (simulado)`)
    setOpen(false)
    setAmount('')
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Distribución de Activos</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              label
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              onClick={(data) => {
                setSelectedToken(data.name)
                setOpen(true)
              }}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} cursor="pointer" />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
      <CardFooter className="text-sm text-muted-foreground">
        Haz clic sobre un token para convertir a MXNB.
      </CardFooter>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Convertir {selectedToken} a MXNB</DialogTitle>
          </DialogHeader>
          <Input
            type="number"
            placeholder={`Cantidad de ${selectedToken}`}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <DialogFooter>
            <Button onClick={handleSell}>Confirmar Conversión</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  )
}

'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import { usePortfolioContext } from '@/context/PortfolioContext'
// import { Juno } from '@juno/onramp' // Descomentar cuando esté disponible

export default function AddMXNB() {
  const [open, setOpen] = useState(false)
  const [amount, setAmount] = useState('')
  const { updateBalance } = usePortfolioContext()
  const JUNO_API_KEY = process.env.NEXT_PUBLIC_JUNO_API_KEY

  const handleAdd = () => {
    const value = parseFloat(amount)
    if (isNaN(value) || value <= 0) {
      toast.error('Cantidad inválida')
      return
    }

    if (!JUNO_API_KEY) {
      // Mock fallback mientras no se tenga acceso real
      updateBalance(value)
      const newEntry = {
        date: new Date().toISOString().slice(0, 10),
        type: 'Depósito',
        token: 'MXNB',
        amount: `${value} MXNB`,
        status: 'Acreditado',
        pnl: '+0%',
      }
      const stored = localStorage.getItem('user_activity_log')
      const prev = stored ? JSON.parse(stored) : []
      localStorage.setItem('user_activity_log', JSON.stringify([newEntry, ...prev]))

      toast.success(`Añadidos ${value} MXNB con éxito`)
      setAmount('')
      setOpen(false)
      return
    }

    // ✅ Integración real Juno — Descomenta cuando tengas el API KEY
    /*
    const juno = new Juno(JUNO_API_KEY)
    juno.showWidget({
      defaultFiatAmount: value,
      defaultFiatCurrency: 'MXN',
      defaultNetwork: 'arbitrum-sepolia',
      defaultPaymentMethod: 'card',
      walletAddress: '0x...REEMPLAZA...', // <- remplaza con address de Portal
      onSuccess: () => {
        updateBalance(value)
        toast.success(`MXNB añadido exitosamente`)
        setAmount('')
        setOpen(false)
      },
      onExit: () => toast.info('Operación cancelada'),
    })
    */
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full">💰 Agregar MXNB</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>¿Cuánto MXNB deseas agregar?</DialogTitle>
        </DialogHeader>
        <Input
          type="number"
          placeholder="Ej. 500"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <DialogFooter>
          <Button onClick={handleAdd}>Confirmar Depósito</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

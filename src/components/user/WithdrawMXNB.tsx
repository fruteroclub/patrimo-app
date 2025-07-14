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
// import { Juno } from '@juno/onramp' // Descomenta cuando se use off-ramp real

export default function WithdrawMXNB() {
  const [open, setOpen] = useState(false)
  const [amount, setAmount] = useState('')
  const { updateBalance } = usePortfolioContext()
  const JUNO_API_KEY = process.env.NEXT_PUBLIC_JUNO_API_KEY

  const handleWithdraw = () => {
    const value = parseFloat(amount)
    if (isNaN(value) || value <= 0) {
      toast.error('Cantidad inválida')
      return
    }

    if (!JUNO_API_KEY) {
      // Simulación sin integración
      updateBalance(-value)
      const newEntry = {
        date: new Date().toISOString().slice(0, 10),
        type: 'Retiro',
        token: 'MXNB',
        amount: `${value} MXNB`,
        status: 'Procesado',
        pnl: '+0%',
      }
      const stored = localStorage.getItem('user_activity_log')
      const prev = stored ? JSON.parse(stored) : []
      localStorage.setItem('user_activity_log', JSON.stringify([newEntry, ...prev]))

      toast.success(`Retirados ${value} MXNB`)
      setAmount('')
      setOpen(false)
      return
    }

    // ✅ Integración real con Juno (off-ramp) — lista para habilitar
    /*
    const juno = new Juno(JUNO_API_KEY)
    juno.showWidget({
      defaultCryptoAmount: value,
      defaultFiatCurrency: 'MXN',
      defaultNetwork: 'arbitrum-sepolia',
      defaultPaymentMethod: 'bank',
      walletAddress: '0x...REEMPLAZA...', // <- tu wallet Portal
      onSuccess: () => {
        updateBalance(-value)
        toast.success(`MXNB retirados exitosamente`)
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
        <Button variant="outline" className="w-full">🏧 Retirar MXNB</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>¿Cuánto MXNB deseas retirar?</DialogTitle>
        </DialogHeader>
        <Input
          type="number"
          placeholder="Ej. 300"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <DialogFooter>
          <Button onClick={handleWithdraw}>Confirmar Retiro</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

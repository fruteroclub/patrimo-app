'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'

interface JunoRedeemResponse {
  success: boolean
  error?: {
    message: string
  }
}

export default function WithdrawMXNB() {
  const [cantidad, setCantidad] = useState('')
  const [cargando, setCargando] = useState(false)
  const [exito, setExito] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const manejarRetiro = async () => {
    setCargando(true)
    setExito(false)
    setError(null)

    try {
      const res = await fetch('/api/juno/redeem', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: Number(cantidad),
        }),
      })

      const data: JunoRedeemResponse = await res.json()

      if (!res.ok || !data.success) {
        throw new Error(data.error?.message || 'Error withdrawing MXNB')
      }

      setExito(true)
      setCantidad('')
    } catch (err) {
      const e = err as Error
      console.error('[WITHDRAW ERROR]', e)
      setError(e.message || 'Unexpected error')
    } finally {
      setCargando(false)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="text-sm py-2 h-9">🏧 Withdraw MXNB</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>How much MXNB would you like to withdraw?</DialogTitle>
          <DialogDescription className="sr-only">
            Enter the amount of MXNB to withdraw from your balance.
          </DialogDescription>
        </DialogHeader>

        <Input
          type="number"
          placeholder="100.00"
          value={cantidad}
          onChange={(e) => setCantidad(e.target.value)}
        />

        {exito && (
          <p className="text-sm text-green-600">Withdrawal successful!</p>
        )}
        {error && (
          <p className="text-sm text-red-600">Error: {error}</p>
        )}

        <DialogFooter>
          <Button onClick={manejarRetiro} disabled={cargando || !cantidad}>
            {cargando ? 'Withdrawing...' : 'Confirm'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

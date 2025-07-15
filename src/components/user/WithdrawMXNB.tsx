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

interface RespuestaRetiroJuno {
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

      const data: RespuestaRetiroJuno = await res.json()

      if (!res.ok || !data.success) {
        throw new Error(data.error?.message || 'Error al retirar MXNB')
      }

      setExito(true)
      setCantidad('')
    } catch (err) {
      const e = err as Error
      console.error('[ERROR DE RETIRO]', e)
      setError(e.message || 'Error inesperado')
    } finally {
      setCargando(false)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="text-sm py-2 h-9">🏧 Retirar MXNB</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>¿Cuánto MXNB deseas retirar?</DialogTitle>
          <DialogDescription className="sr-only">
            Ingresa la cantidad de MXNB a retirar de tu saldo.
          </DialogDescription>
        </DialogHeader>

        <Input
          type="number"
          placeholder="100.00"
          value={cantidad}
          onChange={(e) => setCantidad(e.target.value)}
        />

        {exito && (
          <p className="text-sm text-green-600">¡Retiro exitoso!</p>
        )}
        {error && (
          <p className="text-sm text-red-600">Error: {error}</p>
        )}

        <DialogFooter>
          <Button onClick={manejarRetiro} disabled={cargando || !cantidad}>
            {cargando ? 'Retirando...' : 'Confirmar'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

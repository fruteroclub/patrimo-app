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
import { usePortfolioContext } from '@/context/PortfolioContext'
import { simulateDeposit } from '@/lib/simulateDeposit'

export default function AddMXNB() {
  const [cantidad, setCantidad] = useState('')
  const [cargando, setCargando] = useState(false)
  const [exito, setExito] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { updateBalance } = usePortfolioContext()

  const manejarDeposito = async () => {
    const valor = parseFloat(cantidad)
    if (isNaN(valor) || valor <= 0) {
      setError('Cantidad inválida')
      return
    }

    setCargando(true)
    setExito(false)
    setError(null)

    try {
      await simulateDeposit(valor)

      updateBalance(valor)

      const nuevoRegistro = {
        date: new Date().toISOString().slice(0, 10),
        type: 'Depósito',
        token: 'MXNB',
        amount: `${valor} MXNB`,
        status: 'Simulado',
        pnl: '+0%',
      }

      const almacenado = localStorage.getItem('user_activity_log')
      const previo = almacenado ? JSON.parse(almacenado) : []
      localStorage.setItem('user_activity_log', JSON.stringify([nuevoRegistro, ...previo]))

      setExito(true)
      setCantidad('')
    } catch (err) {
      console.error('[ERROR DE DEPÓSITO]', err)
      setError('No se pudo simular el depósito')
    } finally {
      setCargando(false)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
      <Button className="text-sm py-2 h-9">💰 Agregar MXNB</Button>
</DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>¿Cuánto MXNB deseas agregar?</DialogTitle>
          <DialogDescription className="sr-only">
            Ingresa la cantidad que deseas añadir a tu portafolio en MXNB.
          </DialogDescription>
        </DialogHeader>

        <Input
          type="number"
          placeholder="Ej. 500"
          value={cantidad}
          onChange={(e) => setCantidad(e.target.value)}
        />

        {exito && <p className="text-sm text-green-600">¡Depósito simulado con éxito!</p>}
        {error && <p className="text-sm text-red-600">Error: {error}</p>}

        <DialogFooter>
          <Button onClick={manejarDeposito} disabled={cargando || !cantidad}>
            {cargando ? 'Agregando...' : 'Confirmar Depósito'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

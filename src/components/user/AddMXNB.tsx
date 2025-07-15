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

export default function AddMXNB() {
  const [open, setOpen] = useState(false)
  const [amount, setAmount] = useState('')
  const { updateBalance } = usePortfolioContext()
  const JUNO_API_KEY = process.env.NEXT_PUBLIC_JUNO_API_KEY

  const getClabe = async () => {
    const res = await fetch('https://stage.buildwithjuno.com/spei/v1/clabes?clabe_type=AUTO_PAYMENT', {
      headers: {
        Authorization: `Bearer ${JUNO_API_KEY}`,
      },
    })
    const data = await res.json()
    return data.payload.response[0]?.clabe
  }

  const handleAdd = async () => {
    const value = parseFloat(amount)
    if (isNaN(value) || value < 100) {
      toast.error('La cantidad mínima es 100 MXN')
      return
    }

    if (!JUNO_API_KEY) {
      toast.error('No se encontró la API key de Juno')
      return
    }

    try {
      const clabe = await getClabe()
      if (!clabe) {
        toast.error('No se pudo obtener la CLABE de Juno')
        return
      }

      const res = await fetch('https://stage.buildwithjuno.com/spei/test/deposits', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${JUNO_API_KEY}`,
        },
        body: JSON.stringify({
          amount: value.toString(),
          receiver_clabe: clabe,
          receiver_name: 'Patrimo',
          sender_name: 'Patrimo',
          sender_clabe: '123456789012345678',
        }),
      })

      const data = await res.json()

      if (data.success) {
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

        toast.success(`Mock depósito de ${value} MXNB realizado con éxito`)
        setAmount('')
        setOpen(false)
      } else {
        toast.error('Falló el depósito simulado')
      }
    } catch (error) {
      toast.error('Error al conectar con Juno')
      console.error(error)
    }
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

        <DialogFooter className="pt-4">
          <Button onClick={handleAdd} className="w-full">
            Simular Depósito con Juno
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

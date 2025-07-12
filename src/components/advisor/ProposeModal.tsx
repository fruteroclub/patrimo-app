'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Client } from '@/lib/clientsMock'

interface ProposeModalProps {
  client: Client
  onClose: () => void
}

export default function ProposeModal({ client, onClose }: ProposeModalProps) {
  const [amount, setAmount] = useState('')
  const [token, setToken] = useState('MXNB')

  const handlePropose = () => {
    const proposal = {
      clientAddress: client.address,
      advisorName: 'Julio Asesor',
      amount,
      token,
      status: 'pending',
      date: new Date().toISOString(),
    }

    localStorage.setItem('proposal_' + client.address, JSON.stringify(proposal))
    onClose()
  }

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Proponer movimiento a {client.name}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="Monto (ej. 0.001)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <Input
            placeholder="Token (ej. MXNB)"
            value={token}
            onChange={(e) => setToken(e.target.value)}
          />
          <Button className="w-full" onClick={handlePropose}>
            Enviar propuesta
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

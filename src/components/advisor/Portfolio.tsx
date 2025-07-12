'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { clients, Client } from '@/lib/clientsMock'

export default function Portfolio() {
  const [selectedClient, setSelectedClient] = useState<string | null>(null)
  const [amount, setAmount] = useState('')
  const [token, setToken] = useState('')
  const [note, setNote] = useState('')

  const handleSendSuggestion = () => {
    console.log('✅ Movimiento sugerido:', {
      to: selectedClient,
      amount,
      token,
      note,
    })
    setAmount('')
    setToken('')
    setNote('')
    setSelectedClient(null)
  }

  return (
    <div className="grid gap-4">
      {clients.map((client: Client, index: number) => (
        <Card key={index}>
          <CardHeader>
            <CardTitle>{client.name}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p>Wallet: {client.address}</p>
            <p>Monto disponible: {client.currentBalance}</p>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  onClick={() => setSelectedClient(client.address)}
                  className="mt-2"
                >
                  Sugerir Movimiento
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Proponer Movimiento</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="amount">Monto</Label>
                    <Input
                      id="amount"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="Ej. 100"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="token">Token</Label>
                    <Input
                      id="token"
                      value={token}
                      onChange={(e) => setToken(e.target.value)}
                      placeholder="Ej. ETH, WBTC..."
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="note">Nota</Label>
                    <Textarea
                      id="note"
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      placeholder="Por qué este movimiento es ideal..."
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={handleSendSuggestion}>Enviar</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

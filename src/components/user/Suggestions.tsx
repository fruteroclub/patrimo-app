'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { usePortalWallet } from '@/hooks/usePortalWallet'
import { getPortal } from '@/lib/portal'
import { toast } from 'sonner'

const mockSuggestions = [
  {
    id: 1,
    advisor: 'Julio Flores',
    mxnbAmount: 500,
    token: 'ETH',
    note: 'ETH está en un buen punto de entrada, ideal para tu perfil moderado.',
    status: 'pending',
  },
  {
    id: 2,
    advisor: 'Julio Flores',
    mxnbAmount: 300,
    token: 'USDC',
    note: 'Mover a stablecoins para proteger ganancias tras la subida reciente.',
    status: 'pending',
  },
]

export default function Suggestions() {
  const [suggestions, setSuggestions] = useState(mockSuggestions)
  const { address } = usePortalWallet()

  const handleResponse = (id: number, accepted: boolean) => {
    setSuggestions((prev) =>
      prev.map((sug) =>
        sug.id === id
          ? { ...sug, status: accepted ? 'accepted' : 'rejected' }
          : sug
      )
    )
  }

  const handleAcceptSuggestionWithTx = async (sug: typeof mockSuggestions[0]) => {
    try {
      const portal = getPortal()
      if (!portal || !address) {
        toast.error('Wallet no conectada')
        return
      }

      const tx = {
        from: address,
        to: '0x000000000000000000000000000000000000dead', // dirección dummy
        value: '0x2386f26fc10000', // 0.01 ETH
        data: '0x',
      }

      await portal.request({
        method: 'eth_sendTransaction',
        chainId: 'eip155:421614',
        params: [tx],
      })

      toast.success(`Propuesta de ${sug.token} aceptada y transacción enviada`)
      handleResponse(sug.id, true)
    } catch (err) {
      console.error(err)
      toast.error('Error al enviar la transacción')
    }
  }

  const getBadgeVariant = (status: string) => {
    if (status === 'pending') return 'outline'
    if (status === 'accepted') return 'default'
    return 'destructive'
  }

  return (
    <div className="grid gap-4">
      {suggestions.map((sug) => (
        <Card key={sug.id}>
          <CardHeader className="flex justify-between items-center">
            <CardTitle className="text-lg">Propuesta de {sug.advisor}</CardTitle>
            <Badge variant={getBadgeVariant(sug.status)}>
              {sug.status === 'pending'
                ? 'Pendiente'
                : sug.status === 'accepted'
                ? 'Aceptada'
                : 'Rechazada'}
            </Badge>
          </CardHeader>
          <CardContent className="space-y-2">
            <p>
              <strong>Operación:</strong> Convertir {sug.mxnbAmount} MXNB a {sug.token}
            </p>
            <p>
              <strong>Motivo:</strong> {sug.note}
            </p>
          </CardContent>
          {sug.status === 'pending' && (
            <CardFooter className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => handleResponse(sug.id, false)}>
                Rechazar
              </Button>
              <Button onClick={() => handleAcceptSuggestionWithTx(sug)}>Aceptar y Ejecutar</Button>
            </CardFooter>
          )}
        </Card>
      ))}
    </div>
  )
}

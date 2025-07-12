// src/components/user/UserWalletStatus.tsx

'use client'

import { usePortalWallet } from '@/hooks/usePortalWallet'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function UserWalletStatus() {
  const { address, hasWallet, isLoading, createWallet } = usePortalWallet()

  if (isLoading) return <p className="text-center">Cargando wallet...</p>

  if (!hasWallet) {
    return (
      <Card className="bg-yellow-50 border-yellow-300">
        <CardHeader>
          <CardTitle>Wallet no conectada</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">Aún no has creado tu wallet de inversión.</p>
          <Button onClick={createWallet}>Crear Wallet</Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tu Wallet</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <p><strong>Address:</strong> {address}</p>
        <Button variant="outline">Depositar MXNB</Button>
      </CardContent>
    </Card>
  )
}

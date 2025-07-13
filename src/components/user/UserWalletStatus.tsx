// src/components/user/UserWalletStatus.tsx

'use client'

import { usePortalWallet } from '@/hooks/usePortalWallet'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import AddMXNB from './AddMXNB'
import WithdrawMXNB from './WithdrawMXNB'

export default function UserWalletStatus() {
  const { address, hasWallet, isLoading, createWallet } = usePortalWallet()

  return (
    <Card className="border-dashed border-2">
      <CardHeader>
        <CardTitle>Wallet de Usuario</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {hasWallet ? (
          <>
            <p className="text-muted-foreground break-all">
              Dirección conectada:
              <br />
              <span className="font-mono text-sm">{address}</span>
            </p>
            <p className="text-sm text-green-600">
              Tu wallet está activa y lista para operar.
            </p>

            {/* Agregar MXNB */}
            <AddMXNB />
            <WithdrawMXNB />
          </>
        ) : (
          <>
            <p className="text-muted-foreground">
              Aún no tienes una wallet conectada. Puedes generar una al instante con Portal.
            </p>
            <Button onClick={createWallet} disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin mr-2 h-4 w-4" />
                  Generando...
                </>
              ) : (
                'Crear Wallet'
              )}
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  )
}

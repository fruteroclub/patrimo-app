// src/components/user/UserWalletStatus.tsx

'use client'

import { useAccount, useBalance } from 'wagmi'
import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Copy, QrCode } from 'lucide-react'
import { truncateString } from '@/utils'
import { useDynamicContext } from '@dynamic-labs/sdk-react-core'
import { toast } from 'sonner'
import AddMXNB from './AddMXNB'
import WithdrawMXNB from './WithdrawMXNB'

export default function UserWalletStatus() {
  const [isMounted, setIsMounted] = useState(false)
  const { sdkHasLoaded } = useDynamicContext()
  const { address, status } = useAccount()

  const accountBalance = useBalance({
    address,
  })

  useEffect(() => {
    if (!isMounted) {
      setIsMounted(true)
    }
  }, [isMounted])

  const handleCopyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address)
      toast.success('Dirección copiada al portapapeles')
    }
  }

  const handleShowQR = () => {
    toast.info('Función QR próximamente disponible')
  }

  // Convert ETH balance to MXN (mock conversion rate)
  const balanceInMXN = accountBalance.data?.value
    ? (parseFloat(accountBalance.data.formatted) * 50000).toFixed(2) // Mock rate: 1 ETH = 50,000 MXN
    : '0.00'

  if (!isMounted || !sdkHasLoaded) {
    return (
      <Card className="border-dashed border-2">
        <CardHeader>
          <CardTitle>Wallet de Usuario</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg">cargando...</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-dashed border-2">
      <CardHeader>
        <CardTitle>Wallet de Usuario</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 lg:space-y-2">
        {status === 'connected' && address ? (
          <>
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              <div className="flex items-center justify-between lg:flex-1 lg:mr-6">
                <div>
                  <p className="text-sm font-medium">Cosme Fulanito <span className="text-muted-foreground">@cosmefulanito</span></p>
                  <p className="text-xs text-muted-foreground">Balance: <span className="text-green-600 font-semibold">${balanceInMXN} MXN</span></p>
                  <p className="text-muted-foreground text-xs lg:inline lg:ml-4">
                    Dirección: <span className="font-mono">{truncateString(address)}</span>
                  </p>
                </div>
                <div className="flex gap-1 lg:hidden">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCopyAddress}
                    className="h-7 w-7 p-0"
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleShowQR}
                    className="h-7 w-7 p-0"
                  >
                    <QrCode className="h-3 w-3" />
                  </Button>
                </div>
              </div>

              <div className="hidden lg:flex gap-1">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCopyAddress}
                  className="h-7 w-7 p-0"
                >
                  <Copy className="h-3 w-3" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleShowQR}
                  className="h-7 w-7 p-0"
                >
                  <QrCode className="h-3 w-3" />
                </Button>
              </div>
            </div>

            <p className="text-sm text-green-600 lg:hidden">
              Tu wallet está activa y lista para operar.
            </p>

            <div className="space-y-4 lg:space-y-0 lg:flex lg:gap-4">
              <AddMXNB />
              <WithdrawMXNB />
            </div>
          </>
        ) : (
          <>
            <p className="text-muted-foreground">
              Aún no tienes una wallet conectada. Conecta tu wallet para continuar.
            </p>
          </>
        )}
      </CardContent>
    </Card>
  )
}

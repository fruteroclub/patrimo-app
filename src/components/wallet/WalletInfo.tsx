'use client'

import { usePortalWallet } from '@/hooks/usePortalWallet'

export default function WalletInfo() {
  const { address, isLoading } = usePortalWallet()

  if (isLoading) {
    return <p className="text-sm text-muted-foreground">Cargando wallet...</p>
  }

  if (!address) {
    return <p className="text-sm text-muted-foreground">No se ha generado una wallet.</p>
  }

  return (
    <div className="text-sm text-muted-foreground">
      Wallet: <span className="font-mono">{address.slice(0, 6)}...{address.slice(-4)}</span>
    </div>
  )
}

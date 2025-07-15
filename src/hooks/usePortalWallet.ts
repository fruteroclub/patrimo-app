import { useState, useEffect } from 'react'
import { getPortal } from '@/lib/portal'

export function usePortalWallet() {
  const [address, setAddress] = useState<string | null>(null)
  const [isLoading, setLoading] = useState(false)
  const [hasWallet, setHasWallet] = useState(false)

  const createWallet = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/create-portal-client', { method: 'POST' })
      const { clientSessionToken, clientId } = await res.json()

      if (!clientSessionToken || !clientId) {
        throw new Error('❌ Portal no devolvió token o clientId')
      }

      localStorage.setItem('portal_token', clientSessionToken)
      localStorage.setItem('portal_client_id', clientId)

      const portal = getPortal(clientSessionToken)
      if (!portal) throw new Error('❌ Portal SDK no inicializado')

      console.log('🛠️ Iniciando creación de wallet con token:', clientSessionToken)
      const addr = await portal.createWallet()
      console.log('✅ Wallet creada:', addr)

      localStorage.setItem('portal_address', addr)
      setAddress(addr)
      setHasWallet(true)
    } catch (err) {
      console.error('❌ Error creando wallet Portal:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const saved = localStorage.getItem('portal_address')
    const token = localStorage.getItem('portal_token')

    if (saved && token) {
      setAddress(saved)
      setHasWallet(true)
    }
  }, [])

  return {
    address,
    isLoading,
    hasWallet,
    createWallet,
  }
}

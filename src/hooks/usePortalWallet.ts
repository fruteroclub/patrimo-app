import { useState, useEffect } from 'react'
import { getPortal } from '@/lib/portal'

export function usePortalWallet() {
  const [address, setAddress] = useState<string | null>(null)
  const [isLoading, setLoading] = useState(false)
  const [hasWallet, setHasWallet] = useState(false)

  const waitForMPCReady = async (portal: any) => {
    let tries = 0
    while (!(await portal.isMPCReady())) {
      if (tries > 20) throw new Error('⚠️ MPC no se inicializó a tiempo')
      console.log('⌛ Esperando a que MPC esté listo...')
      await new Promise((res) => setTimeout(res, 300))
      tries++
    }
  }

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

      await waitForMPCReady(portal)

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

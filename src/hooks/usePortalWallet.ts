'use client'

import { useState, useEffect } from 'react'
import { getPortal } from '@/lib/portal'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ARBITRUM_SEPOLIA = 'eip155:421614'

export function usePortalWallet() {
  const [address, setAddress] = useState<string | null>(null)
  const [isLoading, setLoading] = useState(false)
  const [hasWallet, setHasWallet] = useState(false)

  const portal = typeof window !== 'undefined' ? getPortal() : null

  const createWallet = async () => {
    if (!portal) return

    setLoading(true)
    try {
      const addr = await portal.createWallet()
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
    if (saved) {
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

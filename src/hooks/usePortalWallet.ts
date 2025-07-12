'use client'

import { useState, useEffect } from 'react'
import { portal } from '@/lib/portal'

const ARBITRUM_SEPOLIA = 'eip155:421614'

export function usePortalWallet() {
  const [address, setAddress] = useState<string | null>(null)
  const [isLoading, setLoading] = useState(false)
  const [hasWallet, setHasWallet] = useState(false)

  // 1. Crear Wallet
  const createWallet = async () => {
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

  // 2. Fundear con ETH (testnet)
  const fundWallet = async () => {
    try {
      const response = await portal.receiveTestnetAsset(ARBITRUM_SEPOLIA, {
        amount: '0.01',
        token: 'NATIVE',
      })
  
      if (response?.data?.txHash) {
        console.log('✅ Wallet fundeada:', response.data.txHash)
      } else {
        console.warn('⚠️ No se recibió un txHash al fundear.')
      }
    } catch (err) {
      console.error('❌ Error fundeando wallet:', err)
    }
}

  // 3. Leer de localStorage si ya hay wallet
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
    fundWallet,
  }
}

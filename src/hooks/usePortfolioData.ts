// src/hooks/usePortfolioData.ts

import { useState, useEffect } from 'react'

export function usePortfolioData() {
  const [balance, setBalance] = useState(4250) // valor inicial
  const [percentChange, setPercentChange] = useState(12)
  const [riskProfile, setRiskProfile] = useState('Moderado')

  // Simular que el usuario añadió fondos (checar localStorage temporal)
  useEffect(() => {
    const added = localStorage.getItem('mxnb_added')

    if (added) {
      const amount = parseInt(added)
      setBalance((prev) => prev + amount)
      localStorage.removeItem('mxnb_added') // limpiar después de usarlo
    }
  }, [])

  return {
    balance,
    percentChange,
    riskProfile,
  }
}

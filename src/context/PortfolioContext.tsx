// src/context/PortfolioContext.tsx

'use client'

import { createContext, useContext, useState } from 'react'

type PortfolioContextType = {
  balance: number
  updateBalance: (amount: number) => void
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined)

export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  const [balance, setBalance] = useState(4250)

  const updateBalance = (amount: number) => {
    setBalance((prev) => prev + amount)
  }

  return (
    <PortfolioContext.Provider value={{ balance, updateBalance }}>
      {children}
    </PortfolioContext.Provider>
  )
}

export const usePortfolioContext = () => {
  const context = useContext(PortfolioContext)
  if (!context) throw new Error('usePortfolioContext must be used inside PortfolioProvider')
  return context
}

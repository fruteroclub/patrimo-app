'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import { usePortfolioContext } from '@/context/PortfolioContext'
// import { Juno } from '@juno/onramp'

export default function AddMXNB() {
  const JUNO_API_KEY = process.env.NEXT_PUBLIC_JUNO_API_KEY
  const { updateBalance } = usePortfolioContext()
  const [amount, setAmount] = useState('')

  const handleAddFunds = async () => {
    const numericAmount = parseFloat(amount)

    if (isNaN(numericAmount) || numericAmount <= 0) {
      toast.error('Ingresa una cantidad válida')
      return
    }

    if (!JUNO_API_KEY) {
      updateBalance(numericAmount)
      toast.success(`Añadidos ${numericAmount} MXNB con éxito`)

      const newEntry = {
        date: new Date().toISOString().split('T')[0],
        type: 'Depósito',
        token: 'MXNB',
        amount: `${numericAmount} MXNB`,
        status: 'Ejecutada',
        pnl: '+0%',
      }

      const prevLog = JSON.parse(localStorage.getItem('user_activity_log') || '[]')
      localStorage.setItem('user_activity_log', JSON.stringify([newEntry, ...prevLog]))
      setAmount('')
      return
    }

    // Integración real con Juno
    /*
    const juno = new Juno(JUNO_API_KEY)
    juno.showWidget({
      defaultCryptoAmount: numericAmount,
      defaultFiatAmount: numericAmount,
      defaultFiatCurrency: 'MXN',
      defaultPaymentMethod: 'card',
      defaultNetwork: 'arbitrum-sepolia',
      walletAddress: address,
      onSuccess: () => {
        toast.success(`${numericAmount} MXNB añadidos`)
        updateBalance(numericAmount)
      },
      onExit: () => toast.info('Operación cancelada'),
    })
    */
  }

  return (
    <div className="text-center my-6 space-y-3">
      <Input
        type="number"
        placeholder="Ingresa cantidad en MXNB"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="max-w-xs mx-auto text-center"
      />
      <Button onClick={handleAddFunds} className="text-base px-6 py-2">
        💰 Agregar MXNB a mi wallet
      </Button>
    </div>
  )
}

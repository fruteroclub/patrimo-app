'use client'

import { useState } from 'react'
import { createMockDeposit, getAutoPaymentClabe, getMXNBBalance } from '@/lib/juno'

export default function JunoTestPanel() {
  const [clabe, setClabe] = useState('')
  const [balance, setBalance] = useState(0)
  const [loading, setLoading] = useState(false)

  const fetchClabe = async () => {
    const c = await getAutoPaymentClabe()
    setClabe(c)
  }

  const simulateDeposit = async () => {
    setLoading(true)
    await createMockDeposit({
      amount: '1000',
      receiver_clabe: clabe,
      receiver_name: 'Acme',
      sender_name: 'Acme',
      sender_clabe: '123456789012345678',
    })
    const b = await getMXNBBalance()
    setBalance(b)
    setLoading(false)
  }

  return (
    <div className="p-4 border rounded-lg space-y-4 bg-muted">
      <h2 className="text-lg font-bold">Juno Test Panel</h2>
      <button onClick={fetchClabe} className="bg-primary px-4 py-2 rounded text-white">
        Get CLABE
      </button>
      {clabe && <p>CLABE: {clabe}</p>}
      <button onClick={simulateDeposit} disabled={!clabe || loading} className="bg-green-600 px-4 py-2 rounded text-white">
        Simulate Deposit
      </button>
      {balance > 0 && <p>MXNB Balance: {balance}</p>}
    </div>
  )
}

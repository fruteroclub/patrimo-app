export async function simulateDeposit(amount: number) {
    const res = await fetch('/api/juno/deposit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount }),
    })
  
    const data = await res.json()
  
    if (!res.ok || !data.success) {
      console.error('[simulateDeposit error]', data)
      throw new Error('Failed to simulate deposit')
    }
  
    return data
  }
  
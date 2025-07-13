'use client'

import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { usePortfolioContext } from '@/context/PortfolioContext'
// import { Juno } from '@juno/onramp' // Descomenta cuando se tenga acceso

export default function AddMXNB() {
  const JUNO_API_KEY = process.env.NEXT_PUBLIC_JUNO_API_KEY
  const { updateBalance } = usePortfolioContext()

  const handleAddFunds = async () => {
    if (!JUNO_API_KEY) {
      toast.info('Función en desarrollo: se simula carga de 500 MXNB.')
      updateBalance(500)
      toast.success('Añadidos 500 MXNB a tu wallet')
      return
    }

    // TODO: integrar Juno cuando esté disponible
    /*
    const juno = new Juno(JUNO_API_KEY)
    juno.showWidget({
      defaultCryptoAmount: 500,
      defaultFiatAmount: 500,
      defaultFiatCurrency: 'MXN',
      defaultPaymentMethod: 'card',
      defaultNetwork: 'arbitrum-sepolia',
      walletAddress: '0x...', // Reemplazar con wallet Portal
      onSuccess: () => {
        updateBalance(500)
        toast.success('MXNB añadido exitosamente')
      },
      onExit: () => toast.info('Operación cancelada'),
    })
    */
  }

  return (
    <div className="text-center my-4">
      <Button onClick={handleAddFunds} className="text-base px-6 py-2">
        💰 Agregar MXNB a mi wallet
      </Button>
    </div>
  )
}

// src/components/user/PortfolioManagerStatus.tsx

'use client'

import { useAccount, useContractRead } from 'wagmi'
import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { TrendingUp, PieChart, Wallet } from 'lucide-react'
import { formatUnits } from 'viem'
import { useDynamicContext } from '@dynamic-labs/sdk-react-core'

// Contract ABIs (simplified)
const PATRIMO_FACTORY_ABI = [
  {
    "inputs": [{ "name": "_investor", "type": "address" }],
    "name": "getInvestorPortfolios",
    "outputs": [{ "name": "", "type": "address[]" }],
    "stateMutability": "view",
    "type": "function"
  }
] as const

const ATOKEN_MANAGER_ABI = [
  {
    "inputs": [{ "name": "user", "type": "address" }, { "name": "asset", "type": "address" }],
    "name": "getBalance",
    "outputs": [{ "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "name": "user", "type": "address" }],
    "name": "getUserPositions",
    "outputs": [{ "name": "", "type": "uint256[]" }],
    "stateMutability": "view",
    "type": "function"
  }
] as const

// Contract addresses (these should be environment variables)
const PATRIMO_FACTORY_ADDRESS = process.env.NEXT_PUBLIC_PATRIMO_FACTORY_ADDRESS as `0x${string}`
const ATOKEN_MANAGER_ADDRESS = process.env.NEXT_PUBLIC_ATOKEN_MANAGER_ADDRESS as `0x${string}`
const MXNB_ADDRESS = process.env.NEXT_PUBLIC_MXNB_ADDRESS as `0x${string}`

export default function PortfolioManagerStatus() {
  const [isMounted, setIsMounted] = useState(false)
  const { sdkHasLoaded } = useDynamicContext()
  const { address, status } = useAccount()

  // Get user's portfolios from factory
  const { data: portfolios } = useContractRead({
    address: PATRIMO_FACTORY_ADDRESS,
    abi: PATRIMO_FACTORY_ABI,
    functionName: 'getInvestorPortfolios',
    args: address ? [address] : undefined,
  })

  // Get user's aToken balance
  const { data: aTokenBalance } = useContractRead({
    address: ATOKEN_MANAGER_ADDRESS,
    abi: ATOKEN_MANAGER_ABI,
    functionName: 'getBalance',
    args: address && MXNB_ADDRESS ? [address, MXNB_ADDRESS] : undefined,
  })

  // Get user's positions
  const { data: userPositions } = useContractRead({
    address: ATOKEN_MANAGER_ADDRESS,
    abi: ATOKEN_MANAGER_ABI,
    functionName: 'getUserPositions',
    args: address ? [address] : undefined,
  })

  useEffect(() => {
    if (!isMounted) {
      setIsMounted(true)
    }
  }, [isMounted])

  const hasPortfolio = portfolios && portfolios.length > 0
  const balance = aTokenBalance || BigInt(0)
  const positions = userPositions || []

  // Format aToken balance (assuming 18 decimals for MXNB)
  const formattedBalance = formatUnits(balance, 18)
  const balanceInMXN = parseFloat(formattedBalance).toFixed(2)

  if (!isMounted || !sdkHasLoaded) {
    return (
      <Card className="border-dashed border-2">
        <CardHeader>
          <CardTitle>Portfolio Manager</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg">cargando...</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-dashed border-2">
      <CardHeader>
        <CardTitle>Portfolio Manager</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 lg:space-y-2">
        {status === 'connected' && address ? (
          <>
            {hasPortfolio ? (
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                <div className="flex items-center justify-between lg:flex-1 lg:mr-6">
                  <div>
                    <p className="text-sm font-medium">Portfolio Activo <span className="text-muted-foreground">#{portfolios[0]?.slice(-6)}</span></p>
                    <p className="text-xs text-muted-foreground">Posiciones gestionadas: <span className="text-blue-600 font-semibold">{positions.length}</span></p>
                    <p className="text-muted-foreground text-xs lg:inline lg:ml-4">
                      Balance aTokens: <span className="font-mono text-green-600">{balanceInMXN} MXNB</span>
                    </p>
                  </div>
                  <div className="flex gap-1 lg:hidden">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-7 w-7 p-0"
                    >
                      <TrendingUp className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-7 w-7 p-0"
                    >
                      <PieChart className="h-3 w-3" />
                    </Button>
                  </div>
                </div>

                <div className="hidden lg:flex gap-1">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 w-7 p-0"
                  >
                    <TrendingUp className="h-3 w-3" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 w-7 p-0"
                  >
                    <PieChart className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                <div className="flex items-center justify-between lg:flex-1 lg:mr-6">
                  <div>
                    <p className="text-sm font-medium">Sin Portfolio <span className="text-muted-foreground">Gestión Disponible</span></p>
                    <p className="text-xs text-muted-foreground">Puedes crear un portfolio para gestión profesional</p>
                  </div>
                  <div className="flex gap-1 lg:hidden">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-7 w-7 p-0"
                    >
                      <Wallet className="h-3 w-3" />
                    </Button>
                  </div>
                </div>

                <div className="hidden lg:flex gap-1">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 w-7 p-0"
                  >
                    <Wallet className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            )}

            <p className="text-sm text-blue-600 lg:hidden">
              {hasPortfolio ? 'Portfolio bajo gestión profesional.' : 'Gestión disponible con asesores verificados.'}
            </p>

            {/* Action buttons would go here - keeping space for future AddMXNB/WithdrawMXNB equivalent */}
            <div className="space-y-4 lg:space-y-0 lg:flex lg:gap-4">
              {/* Future portfolio management actions */}
            </div>
          </>
        ) : (
          <>
            <p className="text-muted-foreground">
              Conecta tu wallet para ver el estado de tu portfolio.
            </p>
          </>
        )}
      </CardContent>
    </Card>
  )
}

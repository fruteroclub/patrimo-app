'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

interface Token {
  id: string
  symbol: string
  name: string
  current_price: number
  price_change_percentage_14d_in_currency: number
}

interface TokenGrowth {
  originalValue: number
  currentValue: number
  gainUsd: number
  gainPercent: number
}

const investments = [
  { id: 'bitcoin', amount: 0.05 },
  { id: 'ethereum', amount: 0.7 },
  { id: 'solana', amount: 18 },
]

function calculateGrowth(
  tokenAmount: number,
  currentPrice: number,
  percentChange14d: number
): TokenGrowth {
  const originalPrice = currentPrice / (1 + percentChange14d / 100)
  const originalValue = tokenAmount * originalPrice
  const currentValue = tokenAmount * currentPrice
  const gainUsd = currentValue - originalValue
  const gainPercent = (gainUsd / originalValue) * 100

  return {
    originalValue,
    currentValue,
    gainUsd,
    gainPercent,
  }
}

export default function TokenStatsTable() {
  const [tokens, setTokens] = useState<Token[] | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTokens = async () => {
      try {
        const response = await axios.get('/api/token-stats')
        setTokens(response.data)
      } catch (error) {
        console.error('Error fetching token data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchTokens()
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Rendimiento de tus Tokens</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <Skeleton className="h-32 w-full" />
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr>
                  <th className="text-left p-2">Token</th>
                  <th className="text-left p-2">Cantidad</th>
                  <th className="text-left p-2">Precio Actual</th>
                  <th className="text-left p-2">Ganancia 14d</th>
                </tr>
              </thead>
              <tbody>
                {tokens?.map((token) => {
                  const investment = investments.find((i) => i.id === token.id)
                  const amount = investment?.amount ?? 0

                  const growth = calculateGrowth(
                    amount,
                    token.current_price,
                    token.price_change_percentage_14d_in_currency
                  )

                  return (
                    <tr key={token.id} className="border-t">
                      <td className="p-2 font-medium">{token.name}</td>
                      <td className="p-2">{amount.toFixed(4)} {token.symbol.toUpperCase()}</td>
                      <td className="p-2">${token.current_price.toFixed(2)}</td>
                      <td className="p-2">
                        {growth.gainUsd > 0 ? '+' : ''}${growth.gainUsd.toFixed(2)}
                        {' '}({growth.gainPercent.toFixed(2)}%)
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

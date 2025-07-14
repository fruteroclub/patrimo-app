// src/app/api/token-stats/route.ts

import { NextResponse } from 'next/server'
import axios from 'axios'

export async function GET() {
  try {
    const res = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
      params: {
        vs_currency: 'usd',
        ids: 'bitcoin,ethereum,solana',
        price_change_percentage: '7d,14d,30d',
      },
    })

    return NextResponse.json(res.data)
  } catch (error) {
    console.error('Error fetching token data:', error)
    return NextResponse.json({ error: 'Error fetching token data' }, { status: 500 })
  }
}

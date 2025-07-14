export async function fetchMarketData(symbols: string[], vsCurrency = 'usd') {
    const params = new URLSearchParams({
      symbols: symbols.join(','),
      vs_currency: vsCurrency,
      price_change_percentage: '24h,7d,30d',
      per_page: '50',
      page: '1',
    })
  
    const res = await fetch(`https://pro-api.coingecko.com/api/v3/coins/markets?${params.toString()}`, {
      headers: {
        accept: 'application/json',
        'x-cg-pro-api-key': process.env.NEXT_PUBLIC_COINGECKO_API_KEY!,
      },
      next: { revalidate: 60 }, 
    })
  
    if (!res.ok) throw new Error('Error al obtener precios de CoinGecko')
  
    return res.json()
  }
  
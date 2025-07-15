// app/api/juno/deposit/route.ts
export async function POST(req: Request) {
    try {
      const { amount } = await req.json()
  
      const res = await fetch('https://stage.buildwithjuno.com/spei/test/deposits', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.JUNO_API_KEY}`,
        },
        body: JSON.stringify({
          amount: `${amount}`,
          receiver_clabe: '710969000000324311', // tu CLABE de tipo AUTO_PAYMENT
          receiver_name: 'Patrimo',
          sender_clabe: '123456789012345678',
          sender_name: 'Patrimo',
        }),
      })
  
      const data = await res.json()
  
      return new Response(JSON.stringify(data), {
        status: res.status,
        headers: {
          'Content-Type': 'application/json',
        },
      })
    } catch (error) {
      console.error('[API ERROR]', error)
      return new Response(JSON.stringify({ success: false, error: 'Internal Server Error' }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      })
    }
  }
  
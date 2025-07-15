import { NextRequest, NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'

export async function POST(req: NextRequest) {
  const JUNO_API_KEY = process.env.NEXT_PUBLIC_JUNO_API_KEY
  const BANK_ACCOUNT_ID = process.env.NEXT_PUBLIC_JUNO_BANK_ACCOUNT_ID

  const { amount } = await req.json()

  if (!JUNO_API_KEY || !BANK_ACCOUNT_ID) {
    return NextResponse.json(
      { success: false, error: 'Missing API Key or Bank Account ID' },
      { status: 400 }
    )
  }

  try {
    const res = await fetch('https://stage.buildwithjuno.com/mint_platform/v1/redemptions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${JUNO_API_KEY}`,
        'X-Idempotency-Key': uuidv4(),
      },
      body: JSON.stringify({
        amount,
        destination_bank_account_id: BANK_ACCOUNT_ID,
        asset: 'mxn',
      }),
    })

    const data = await res.json()

    if (!res.ok) {
      console.error('[REDEEM ERROR]', data)
      return NextResponse.json({ success: false, error: data }, { status: 500 })
    }

    return NextResponse.json({ success: true, payload: data.payload })
  } catch (err) {
    console.error('[REDEEM NETWORK ERROR]', err)
    return NextResponse.json({ success: false, error: err }, { status: 500 })
  }
}

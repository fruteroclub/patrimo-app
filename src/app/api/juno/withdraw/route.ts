// src/app/api/juno/withdraw/route.ts

import { NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'

export async function POST(req: Request) {
  try {
    const { amount } = await req.json()

    if (!amount || isNaN(amount) || amount < 100) {
      return NextResponse.json(
        { success: false, error: 'Amount must be at least 100 MXNB' },
        { status: 400 }
      )
    }

    const JUNO_API_KEY = process.env.NEXT_PUBLIC_JUNO_API_KEY
    const destination_bank_account_id = process.env.NEXT_PUBLIC_JUNO_BANK_ID // ⚠️ Pon tu ID real aquí

    if (!JUNO_API_KEY || !destination_bank_account_id) {
      return NextResponse.json(
        { success: false, error: 'Missing API credentials or bank ID' },
        { status: 500 }
      )
    }

    const res = await fetch('https://stage.buildwithjuno.com/mint_platform/v1/redemptions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${JUNO_API_KEY}`,
        'X-Idempotency-Key': uuidv4(),
      },
      body: JSON.stringify({
        amount,
        destination_bank_account_id,
        asset: 'mxn',
      }),
    })

    const data = await res.json()

    if (!res.ok) {
      return NextResponse.json({ success: false, error: data }, { status: 500 })
    }

    return NextResponse.json({ success: true, payload: data })
  } catch (err) {
    console.error('Withdraw error:', err)
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 })
  }
}

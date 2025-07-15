// app/api/create-portal-client/route.ts
import { NextResponse } from 'next/server'
import axios from 'axios'

export async function POST() {
  try {
    const token = process.env.PORTAL_API_KEY
    console.log('🔐 Custodian token usado:', token)

    const res = await axios.post(
      'https://api.portalhq.io/api/v3/custodians/me/clients',
      { isAccountAbstracted: false },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    )

    const { clientSessionToken, clientApiKey, id } = res.data
    console.log('✅ Cliente creado:', { id, clientApiKey })

    return NextResponse.json({
      clientSessionToken,
      clientApiKey,
      clientId: id,
    })
  } catch (error: any) {
    console.error('❌ Error creando cliente en Portal:', error.response?.data || error.message)
    return NextResponse.json({ error: 'Error creating Portal client' }, { status: 500 })
  }
}

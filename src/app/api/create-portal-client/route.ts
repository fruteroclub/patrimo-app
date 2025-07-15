import { NextResponse } from 'next/server'
import axios, { AxiosError } from 'axios'

export async function POST() {
  try {
    const token = process.env.PORTAL_API_KEY
    if (!token) throw new Error('PORTAL_API_KEY no está definido')

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

    return NextResponse.json({
      clientSessionToken,
      clientApiKey,
      clientId: id,
    })
  } catch (error) {
    const err = error as AxiosError
    console.error('❌ Error creando cliente en Portal:', err.response?.data || err.message)
    return NextResponse.json({ error: 'Error creating Portal client' }, { status: 500 })
  }
}

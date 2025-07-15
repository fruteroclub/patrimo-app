import axios from 'axios'

const JUNO_API = 'https://stage.buildwithjuno.com'
const JUNO_API_KEY = process.env.NEXT_PUBLIC_JUNO_API_KEY

const headers = {
  Authorization: `Bearer ${JUNO_API_KEY}`,
  'Content-Type': 'application/json',
}

// Tipo para el balance
interface BalanceItem {
  asset: string
  balance: number
}

// Tipo para el depósito simulado
interface MockDepositResponse {
  transaction_id: string
  status: string
  amount: number
  created_at?: string
  [key: string]: any
}

export const getAutoPaymentClabe = async (): Promise<string> => {
  const res = await axios.get(`${JUNO_API}/spei/v1/clabes?clabe_type=AUTO_PAYMENT`, { headers })
  return res.data.payload.response[0].clabe
}

export const createMockDeposit = async ({
  amount,
  receiver_clabe,
  receiver_name,
  sender_name,
  sender_clabe,
}: {
  amount: string
  receiver_clabe: string
  receiver_name: string
  sender_name: string
  sender_clabe: string
}): Promise<MockDepositResponse> => {
  const res = await axios.post(
    `${JUNO_API}/spei/test/deposits`,
    {
      amount,
      receiver_clabe,
      receiver_name,
      sender_clabe,
      sender_name,
    },
    { headers }
  )
  return res.data.payload
}

export const getMXNBBalance = async (): Promise<number> => {
  const res = await axios.get(`${JUNO_API}/mint_platform/v1/balances`, { headers })
  const balances: BalanceItem[] = res.data.payload.balances
  const mxnb = balances.find((b) => b.asset === 'mxnbj')
  return mxnb?.balance || 0
}

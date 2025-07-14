import Portal from '@portal-hq/web'

let portalInstance: Portal | null = null

export const getPortal = () => {
  if (typeof window === 'undefined') return null

  if (!portalInstance) {
    portalInstance = new Portal({
      apiKey: process.env.NEXT_PUBLIC_PORTAL_API_KEY!,
      autoApprove: true,
      rpcConfig: {
        'eip155:421614': process.env.NEXT_PUBLIC_ALCHEMY_RPC!,
      },
    })
  }

  return portalInstance
}

export const getConnectedAddress = (): string | null => {
  const portal = getPortal()
  return portal?.address || null
}

export const sendMockTransaction = async ({
  to,
  valueEth,
}: {
  to: string
  valueEth: string
}) => {
  const portal = getPortal()
  if (!portal) throw new Error('Portal no inicializado')

  const from = portal.address
  if (!from) throw new Error('No wallet conectada')

  const valueHex = '0x' + BigInt(Number(valueEth) * 1e18).toString(16)

  return portal.request({
    method: 'eth_sendTransaction',
    params: [
      {
        from,
        to,
        value: valueHex,
      },
    ],
  })
}

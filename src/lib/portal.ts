import Portal from '@portal-hq/web'

export const getPortal = (token?: string) => {
  if (typeof window === 'undefined') return null

  const apiKey = token || localStorage.getItem('portal_token')
  if (!apiKey) return null

  return new Portal({
    apiKey,
    autoApprove: true,
    rpcConfig: {
      'eip155:421614': process.env.NEXT_PUBLIC_ALCHEMY_RPC!,
    },
  })
}

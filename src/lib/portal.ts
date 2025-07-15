import Portal from '@portal-hq/web'

let portalInstance: Portal | null = null

export const getPortal = (token?: string): Portal | null => {
  if (typeof window === 'undefined') return null

  const apiKey = token || localStorage.getItem('portal_token')
  if (!apiKey) return null

  if (portalInstance && portalInstance.apiKey === apiKey) return portalInstance

  const isDev = process.env.NODE_ENV === 'development'

  portalInstance = new Portal({
    apiKey,
    rpcConfig: {
      'eip155:421614': process.env.NEXT_PUBLIC_ALCHEMY_RPC!,
    },
    ...(isDev && { autoApprove: true }),
  })

  return portalInstance
}

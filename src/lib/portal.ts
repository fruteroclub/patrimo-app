import Portal from '@portal-hq/web'

export const portal = new Portal({
  apiKey: process.env.NEXT_PUBLIC_PORTAL_API_KEY!,
  autoApprove: true,
  rpcConfig: {
    'eip155:421614': process.env.NEXT_PUBLIC_ALCHEMY_RPC!,
  },
})

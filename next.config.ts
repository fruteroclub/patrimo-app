/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config: { resolve: { fallback: { fs: boolean; net: boolean; tls: boolean } } }) => {
    config.resolve.fallback = { fs: false, net: false, tls: false }
    return config
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ipfs.io',
      },
      {
        protocol: 'https',
        hostname: 'blue-victorious-kite-424.mypinata.cloud',
      },
      {
        protocol: 'https',
        hostname: 'mypinata.cloud',
      },
    ],
  },
}

export default nextConfig

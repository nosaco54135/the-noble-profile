import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    '/quotient/results/[id]/opengraph-image': [
      './public/fonts/**/*',
      './public/tns-seal.png',
    ],
  },
  async redirects() {
    return [
      { source: '/codex/:id', destination: '/compass/:id', permanent: true },
    ]
  },
}

export default nextConfig

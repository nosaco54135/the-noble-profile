import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    '/quotient/results/[id]/opengraph-image': [
      './public/fonts/**/*',
      './public/tns-seal.png',
    ],
  },
}

export default nextConfig

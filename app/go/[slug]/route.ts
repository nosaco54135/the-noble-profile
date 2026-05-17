import { NextRequest, NextResponse } from 'next/server'
import { resolveAffiliateUrl } from '@/lib/affiliate-config'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const destination = resolveAffiliateUrl(slug)

  if (!destination) {
    // Unknown slug — send to homepage rather than erroring
    return NextResponse.redirect(new URL('/', request.url))
  }

  console.log(`[affiliate-click] slug=${slug} -> ${destination}`)
  return NextResponse.redirect(destination)
}

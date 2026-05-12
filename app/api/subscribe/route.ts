import { NextRequest, NextResponse } from 'next/server'
import { subscribeEmail } from '@/lib/beehiiv'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email required' },
        { status: 400 }
      )
    }

    const success = await subscribeEmail(email, 'thenobleseller.com')

    if (!success) {
      return NextResponse.json(
        { error: 'Subscription failed' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error('Subscribe route error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

import { NextResponse } from 'next/server'
import { isActiveSubscriber } from '@/lib/beehiiv'

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'email required' }, { status: 400 })
    }

    const subscribed = await isActiveSubscriber(email.toLowerCase().trim())

    return NextResponse.json({ subscribed })
  } catch (err) {
    console.error('[verify-subscriber] error:', err)
    return NextResponse.json({ subscribed: false }, { status: 200 })
  }
}

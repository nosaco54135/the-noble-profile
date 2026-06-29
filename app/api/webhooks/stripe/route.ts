import { NextRequest, NextResponse } from 'next/server'
import { getStripeClient } from '@/lib/stripe'
import { updatePaymentStatus } from '@/lib/supabase'
import { sendCompassDelivery } from '@/lib/resend'
import type Stripe from 'stripe'

export const maxDuration = 30

/**
 * Stripe webhook handler.
 * Listens for checkout.session.completed and marks the assessment as paid.
 *
 * Set up in Stripe Dashboard:
 *   Endpoint URL: https://your-domain.com/api/webhooks/stripe
 *   Events: checkout.session.completed
 */
export async function POST(req: NextRequest) {
  const body = await req.text()
  const signature = req.headers.get('stripe-signature')

  if (!signature) {
    return NextResponse.json({ error: 'Missing stripe-signature header.' }, { status: 400 })
  }

  let event: Stripe.Event

  try {
    event = getStripeClient().webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    )
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Webhook signature verification failed.'
    console.error('Stripe webhook error:', message)
    return NextResponse.json({ error: message }, { status: 400 })
  }

  // Handle the event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session

    const assessmentId = session.metadata?.assessment_id
    if (!assessmentId) {
      console.error('Stripe session missing assessment_id metadata:', session.id)
      // Return 200 so Stripe doesn't retry — this is a config issue, not a transient one
      return NextResponse.json({ received: true })
    }

    try {
      await updatePaymentStatus(assessmentId, session.id)
      console.log(`Assessment ${assessmentId} marked as paid via session ${session.id}`)

      const customerEmail = session.customer_details?.email
      const archetypeName = session.metadata?.archetype_name ?? ''

      if (customerEmail) {
        const compassUrl = `${process.env.NEXT_PUBLIC_APP_URL}/codex/${assessmentId}`
        await sendCompassDelivery({ email: customerEmail, primaryArchetype: archetypeName, compassUrl }).catch(err =>
          console.error('[webhook] sendCompassDelivery failed:', err)
        )
      }
    } catch (err) {
      console.error('Failed to update payment status:', err)
      // Return 500 so Stripe retries the webhook
      return NextResponse.json({ error: 'Database update failed.' }, { status: 500 })
    }
  }

  // Acknowledge all other events
  return NextResponse.json({ received: true })
}

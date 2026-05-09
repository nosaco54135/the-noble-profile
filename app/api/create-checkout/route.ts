import { NextRequest, NextResponse } from 'next/server'
import { createCheckoutSession, isStripeConfigured } from '@/lib/stripe'
import { serverStorage } from '@/lib/storage'

/**
 * Starts a Stripe Checkout session for the user's Codex purchase.
 *
 * Dev-mode bypass (spec Stage 5): if Stripe is not configured, we mark the
 * assessment as paid in storage and return the Codex URL directly so the
 * flow continues without hitting Stripe.
 */
export async function POST(req: NextRequest) {
  try {
    const { assessmentId, isSubscriber } = await req.json()

    if (!assessmentId || typeof assessmentId !== 'string') {
      return NextResponse.json({ error: 'assessmentId is required.' }, { status: 400 })
    }

    const assessment = await serverStorage.loadAssessment(assessmentId)
    if (!assessment) {
      return NextResponse.json({ error: 'Assessment not found.' }, { status: 404 })
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'

    // Already paid — short-circuit to the Codex page
    if (assessment.paymentStatus === 'paid') {
      return NextResponse.json({ url: `${appUrl}/codex/${assessmentId}` })
    }

    // Dev-mode bypass — no Stripe key, flip to paid and redirect
    if (!isStripeConfigured()) {
      await serverStorage.markPaid(assessmentId, 'dev-mode-bypass')
      return NextResponse.json({ url: `${appUrl}/codex/${assessmentId}`, devBypass: true })
    }

    const url = await createCheckoutSession({
      assessmentId,
      email: assessment.email,
      isSubscriber: Boolean(isSubscriber),
      appUrl,
      archetypeName: assessment.archetypeResult?.primary?.name ?? '',
    })

    return NextResponse.json({ url })
  } catch (err) {
    console.error('create-checkout error:', err)
    const message = err instanceof Error ? err.message : 'Internal server error.'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

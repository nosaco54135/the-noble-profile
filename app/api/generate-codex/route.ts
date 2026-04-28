import { NextRequest, NextResponse } from 'next/server'
import { serverStorage } from '@/lib/storage'
import { generateCodex } from '@/lib/claude'
import { sendCodexDelivery } from '@/lib/resend'
import type { ScoringResult } from '@/types'

// Allow up to 60s on Vercel (configured in vercel.json too)
export const maxDuration = 60

/**
 * Generates the Noble Codex for a paid assessment via Claude.
 *
 * Spec guardrails:
 *  - Payment must be confirmed before the API call (Stage 6, critical reminder).
 *  - Codex is cached on the assessment — subsequent calls return the cached text
 *    without re-hitting the API (Part 6).
 *  - Low-variance profiles must NOT hit the API (Rule 7); the client is expected
 *    to surface the retake message instead.
 *  - In fallback mode (no Supabase), the client ships the scoring result in the
 *    request body so we can still generate without a server-side record. Caching
 *    in that mode happens client-side via clientStorage.saveCodex.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { assessmentId, fallback, archetypeResult: fallbackResult } = body

    // ── Fallback mode: generate directly from provided scoring result ──────
    if (fallback === true && fallbackResult) {
      const result = fallbackResult as ScoringResult
      if (result.lowVariance) {
        return NextResponse.json({ error: 'Low variance — retake required.' }, { status: 400 })
      }
      const codex = await generateCodex(result)
      return NextResponse.json({ codex })
    }

    if (!assessmentId || typeof assessmentId !== 'string') {
      return NextResponse.json({ error: 'assessmentId is required.' }, { status: 400 })
    }

    const assessment = await serverStorage.loadAssessment(assessmentId)
    if (!assessment) {
      return NextResponse.json({ error: 'Assessment not found.' }, { status: 404 })
    }

    // ── Guard: payment must be confirmed (spec Stage 6) ───────────────────
    if (assessment.paymentStatus !== 'paid') {
      return NextResponse.json({ error: 'Payment required.' }, { status: 403 })
    }

    // ── Guard: low-variance profiles don't get a Codex (Rule 7) ───────────
    if (assessment.archetypeResult.lowVariance) {
      return NextResponse.json({ error: 'Low variance — retake required.' }, { status: 400 })
    }

    // ── Return cached Codex if it already exists (Part 6) ─────────────────
    const cached = await serverStorage.loadCodex(assessmentId)
    if (cached) {
      return NextResponse.json({ codex: cached })
    }

    // ── Generate via Claude (one shot with one retry on failure) ──────────
    let codex: string
    try {
      codex = await generateCodex(assessment.archetypeResult)
    } catch (err) {
      console.warn('First Codex generation attempt failed, retrying once:', err)
      codex = await generateCodex(assessment.archetypeResult)
    }

    await serverStorage.saveCodex(assessmentId, codex)

    // ── Send delivery email (fire-and-forget; has console fallback) ───────
    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'
    sendCodexDelivery({
      email: assessment.email,
      primaryArchetype: assessment.archetypeResult.primary.name,
      codexUrl: `${appUrl}/codex/${assessmentId}`,
    }).catch((err) => console.error('Codex email failed:', err))

    return NextResponse.json({ codex })
  } catch (err) {
    console.error('generate-codex error:', err)
    const message = err instanceof Error ? err.message : 'Internal server error.'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

import { NextRequest, NextResponse } from 'next/server'
import { serverStorage } from '@/lib/storage'
import { scoreAssessment } from '@/lib/scoring'
import { sendAssessmentConfirmation } from '@/lib/resend'
import { QUESTIONS } from '@/lib/questions'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { email, isSubscriber, responses, seed } = body

    // ── Validation ─────────────────────────────────────────────────────────
    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Email is required.' }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 })
    }

    if (!Array.isArray(responses) || responses.length !== QUESTIONS.length) {
      return NextResponse.json(
        { error: `Expected ${QUESTIONS.length} responses.` },
        { status: 400 },
      )
    }

    for (const r of responses) {
      if (typeof r !== 'number' || r < 1 || r > 5 || !Number.isInteger(r)) {
        return NextResponse.json(
          { error: 'Each response must be an integer between 1 and 5.' },
          { status: 400 },
        )
      }
    }

    if (typeof seed !== 'string' || seed.length === 0) {
      return NextResponse.json({ error: 'seed is required.' }, { status: 400 })
    }

    // ── Score ──────────────────────────────────────────────────────────────
    const scoringResult = scoreAssessment(responses)
    const cleanEmail = email.trim().toLowerCase()

    // ── Try server storage; fall back to client-side localStorage mode ─────
    const saved = await serverStorage.saveAssessment({
      email: cleanEmail,
      isSubscriber: Boolean(isSubscriber),
      responses,
      seed,
      dimensionScores: scoringResult.dimensionScores,
      archetypeResult: scoringResult,
    })

    if (saved.ok) {
      const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'
      sendAssessmentConfirmation({
        email: cleanEmail,
        primaryArchetype: scoringResult.primary.name,
        resultsUrl: `${appUrl}/quotient/results/${saved.id}`,
      }).catch((err) => console.error('Email send failed:', err))

      return NextResponse.json({
        id: saved.id,
        fallback: false,
        archetype: scoringResult.primary.name,
      })
    }

    // ── Fallback: return full payload for client-side localStorage persist ─
    const id = crypto.randomUUID()
    return NextResponse.json({
      id,
      fallback: true,
      email: cleanEmail,
      isSubscriber: Boolean(isSubscriber),
      seed,
      responses,
      archetypeResult: scoringResult,
      dimensionScores: scoringResult.dimensionScores,
    })
  } catch (err) {
    console.error('submit-assessment error:', err)
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
  }
}

'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { track } from "@vercel/analytics"
import { QUESTIONS, shuffleQuestions, deriveSideFlips } from '@/lib/questions'
import { clientStorage } from '@/lib/storage'
import { PRIMING_INSTRUCTION, type Question } from '@/types'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Button } from '@/components/ui/Button'

const generateSeed = (): string => {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }
  return Math.random().toString(36).substring(2) + Date.now().toString(36)
}

export default function AssessmentPage() {
  const router = useRouter()

  // Question state
  const [shuffled, setShuffled] = useState<Question[]>([])
  const [seed, setSeed] = useState<string>('')
  // sideFlips[canonicalIndex] === true means optionB is displayed first for that question
  const [sideFlips, setSideFlips] = useState<boolean[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  // Responses are stored CANONICAL (keyed by question id): 5 always means
  // strongly-prefer-optionA, regardless of display order.
  const [responses, setResponses] = useState<Record<string, number>>({}) // questionId → canonical value
  // `selected` holds the DISPLAYED value (preference toward the first-shown option)
  const [selected, setSelected] = useState<number | null>(null)
  // Ref always holds the latest committed responses — reads in handleCaptureSubmit
  // bypass the async state closure and see the last answer immediately.
  const responsesRef = useRef<Record<string, number>>({})
  const advanceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Email capture step state
  const [showCapture, setShowCapture] = useState(false)
  const [captureEmail, setCaptureEmail] = useState('')
  const [captureError, setCaptureError] = useState('')

  // Submission state
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  useEffect(() => {
    // Reuse any existing seed so mid-assessment reloads keep the same order
    const existingSeed = sessionStorage.getItem('tnq_seed')
    const activeSeed = existingSeed ?? generateSeed()
    if (!existingSeed) sessionStorage.setItem('tnq_seed', activeSeed)
    setSeed(activeSeed)
    setShuffled(shuffleQuestions(QUESTIONS, activeSeed))
    setSideFlips(deriveSideFlips(activeSeed))
  }, [])

  const currentQuestion = shuffled[currentIndex]
  const totalQuestions = QUESTIONS.length
  const progress = totalQuestions > 0 ? (currentIndex / totalQuestions) * 100 : 0
  const isLastQuestion = currentIndex === totalQuestions - 1

  // When moving to a new question, restore any previously selected value —
  // stored responses are canonical, so convert back to the displayed value.
  useEffect(() => {
    if (!currentQuestion) return
    const canonical = responses[currentQuestion.id]
    if (canonical === undefined) {
      setSelected(null)
      return
    }
    const flipped = sideFlips[currentQuestion.canonicalIndex] ?? false
    setSelected(flipped ? 6 - canonical : canonical)
  }, [currentIndex, currentQuestion, responses, sideFlips])

  const handleCaptureSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    setCaptureError('')

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(captureEmail)) {
      setCaptureError('Please enter a valid email address.')
      return
    }

    if (submitting) return
    setSubmitting(true)
    setSubmitError('')

    try {
      // Convert responseMap → ordered array in canonical question order.
      // Read from ref so the last answer is always present regardless of
      // whether React has flushed the final setResponses call to state yet.
      const orderedResponses = QUESTIONS.map((q) => responsesRef.current[q.id])

      const missing = QUESTIONS.filter((q) => responsesRef.current[q.id] === undefined)
      if (missing.length > 0) {
        setSubmitError('Something went wrong saving your answers. Please try again.')
        setSubmitting(false)
        return
      }

      const res = await fetch('/api/submit-assessment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: captureEmail, isSubscriber: false, responses: orderedResponses, seed }),
      })

      if (!res.ok) {
        const { error } = await res.json()
        throw new Error(error ?? 'Submission failed')
      }

      const data = await res.json()
      const { id } = data

      track('nq_completed', { archetype: data.archetypeResult?.primary?.name ?? '' })

      // Clear session storage — no longer needed
      sessionStorage.removeItem('tnq_email')
      sessionStorage.removeItem('tnq_seed')

      if (data.fallback) {
        clientStorage.saveAssessment({
          id,
          email: data.email,
          isSubscriber: data.isSubscriber,
          responses: data.responses,
          seed: data.seed,
          dimensionScores: data.dimensionScores,
          archetypeResult: data.archetypeResult,
          paymentStatus: 'pending',
          createdAt: new Date().toISOString(),
        })
        router.push(`/quotient/results/${id}?fallback=true`)
      } else {
        router.push(`/quotient/results/${id}`)
      }
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
      setSubmitting(false)
    }
  }, [captureEmail, submitting, seed, router])

  const handleBack = useCallback(() => {
    setCurrentIndex((i) => Math.max(i - 1, 0))
  }, [])

  const handleSelect = useCallback(
    // `uValue` is the DISPLAYED preference (toward the first-shown option).
    // Convert to the canonical value before storing so 5 always means
    // strongly-prefer-optionA downstream.
    (uValue: number) => {
      if (!currentQuestion) return
      clearTimeout(advanceTimerRef.current ?? undefined)
      setSelected(uValue)
      const flipped = sideFlips[currentQuestion.canonicalIndex] ?? false
      const canonicalValue = flipped ? 6 - uValue : uValue
      const updated = { ...responsesRef.current, [currentQuestion.id]: canonicalValue }
      responsesRef.current = updated
      setResponses(updated)

      const answeredIndex = currentIndex
      const wasLast = isLastQuestion
      advanceTimerRef.current = setTimeout(() => {
        if (wasLast) {
          setShowCapture(true)
        } else {
          setCurrentIndex(answeredIndex + 1)
        }
      }, 200)
    },
    [currentQuestion, currentIndex, isLastQuestion, sideFlips],
  )

  const handleNext = useCallback(() => {
    if (selected === null) return
    setCurrentIndex((i) => Math.min(i + 1, totalQuestions - 1))
  }, [selected, totalQuestions])

  // Cancel any pending auto-advance on unmount
  useEffect(() => () => { clearTimeout(advanceTimerRef.current ?? undefined) }, [])

  // Keyboard support: number keys 1-5, ←/→/Enter to navigate
  useEffect(() => {
    if (showCapture) return
    function onKey(e: KeyboardEvent) {
      if (['1', '2', '3', '4', '5'].includes(e.key)) {
        handleSelect(Number(e.key))
      }
      if (e.key === 'ArrowLeft' && currentIndex > 0) {
        handleBack()
      }
      if (e.key === 'Enter' || e.key === 'ArrowRight') {
        if (selected !== null && !isLastQuestion) handleNext()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [showCapture, handleSelect, handleNext, handleBack, selected, isLastQuestion, currentIndex])

  if (!currentQuestion) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-tns-bg">
        <div className="w-8 h-8 border-4 border-tns-accent border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (showCapture) {
    return (
      <div className="min-h-screen bg-tns-bg flex flex-col">
        {/* Progress bar at 100% */}
        <div className="bg-tns-border h-1">
          <div className="bg-tns-accent h-1 w-full" />
        </div>

        <Section size="lg" className="flex-1">
          <Container maxWidth="prose">
            <div className="max-w-[480px] mx-auto">
              <h2 className="font-display font-medium text-tns-fg text-2xl md:text-3xl tracking-tight leading-[1.1] mb-tns-md text-center">
                You&apos;re done.
              </h2>
              <p className="font-sans text-tns-muted text-[18px] leading-relaxed mb-tns-2xl text-center">
                Enter your email to see your archetype and full breakdown.
              </p>
              <form onSubmit={handleCaptureSubmit} className="space-y-tns-lg">
                <div>
                  <label
                    htmlFor="capture-email"
                    className="block font-sans text-sm font-medium text-tns-fg mb-tns-sm"
                  >
                    Your email address
                  </label>
                  <input
                    id="capture-email"
                    type="email"
                    value={captureEmail}
                    onChange={(e) => setCaptureEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full px-4 py-3 bg-tns-bg border border-tns-border font-sans text-tns-fg placeholder:text-tns-muted
                               focus:outline-none focus:border-tns-accent focus:ring-1 focus:ring-tns-accent transition-colors"
                    autoComplete="email"
                  />
                  {captureError && (
                    <p className="mt-tns-sm font-sans text-sm text-tns-accent">{captureError}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  disabled={submitting}
                  className="w-full md:w-auto md:px-8 md:mx-auto md:flex"
                >
                  {submitting ? 'Scoring…' : 'See my results'}
                </Button>
              </form>
              {submitError && (
                <p className="mt-tns-md font-sans text-center text-sm text-tns-accent">
                  {submitError}
                </p>
              )}
            </div>
          </Container>
        </Section>
      </div>
    )
  }

  // Display order for this question follows its seeded side flip; canonical
  // dimension mapping (optionA/dimA, optionB/dimB) is unaffected either way.
  const flipped = sideFlips[currentQuestion.canonicalIndex] ?? false
  const firstOptionText = flipped ? currentQuestion.optionB : currentQuestion.optionA
  const secondOptionText = flipped ? currentQuestion.optionA : currentQuestion.optionB

  return (
    <div className="min-h-screen bg-tns-bg flex flex-col">
      {/* Progress bar */}
      <div className="bg-tns-border h-1">
        <div
          className="bg-tns-accent h-1 transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Question area */}
      <Section size="lg" className="flex-1">
        <Container maxWidth="prose">
          {/* Step counter */}
          <p className="font-sans text-sm text-tns-fg text-center mb-tns-sm">
            Question {currentIndex + 1} of {totalQuestions}
          </p>

          {/* Priming instruction — first question only */}
          {currentIndex === 0 && (
            <p className="font-sans text-sm italic text-tns-fg text-center max-w-prose mx-auto mb-tns-xl leading-relaxed">
              {PRIMING_INSTRUCTION}
            </p>
          )}

          {/* Scenario */}
          <div className="mb-tns-xl mt-tns-lg">
            <p className="font-sans text-tns-fg text-xl md:text-2xl leading-relaxed text-center tracking-tight">
              {currentQuestion.scenario}
            </p>
          </div>

          {/* Two options, styled as pills — "A"/"B" mark DISPLAY POSITION (first/second
              shown), not the optionA/optionB field names. Display order follows this
              question's seeded side flip, so the field behind "A" can vary by question. */}
          <div className="space-y-tns-md mb-tns-xl">
            <div className="flex items-center gap-tns-md rounded-full border border-tns-accent/25 bg-tns-bgAlt px-5 py-4 sm:px-7 sm:py-5">
              <span className="shrink-0 flex items-center justify-center size-7 rounded-full bg-tns-accent text-tns-bg font-display text-sm font-medium">
                A
              </span>
              <p className="font-sans text-tns-fg text-[15px] sm:text-base leading-relaxed">
                {firstOptionText}
              </p>
            </div>
            <div className="flex items-center gap-tns-md rounded-full border border-tns-accent/25 bg-tns-bgAlt px-5 py-4 sm:px-7 sm:py-5">
              <span className="shrink-0 flex items-center justify-center size-7 rounded-full bg-tns-accent text-tns-bg font-display text-sm font-medium">
                B
              </span>
              <p className="font-sans text-tns-fg text-[15px] sm:text-base leading-relaxed">
                {secondOptionText}
              </p>
            </div>
          </div>

          {/* Preference scale — labels reference "A"/"B" the same way the pills above do
              (display position). u=5 strongly prefers A (first-shown) … u=1 strongly
              prefers B (second-shown); the canonical transform in handleSelect is unchanged. */}
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 sm:gap-3 mb-tns-2xl">
            {[
              { value: 5, label: 'Strongly prefer A' },
              { value: 4, label: 'Somewhat prefer A' },
              { value: 3, label: 'No preference / depends' },
              { value: 2, label: 'Somewhat prefer B' },
              { value: 1, label: 'Strongly prefer B' },
            ].map(({ value, label }) => {
              const isSelected = selected === value
              return (
                <button
                  key={value}
                  onClick={() => handleSelect(value)}
                  className={[
                    'flex items-center justify-center text-center p-3 sm:p-4 border transition-colors duration-150 min-h-[56px]',
                    'focus:outline-none focus-visible:ring-2 focus-visible:ring-tns-accent focus-visible:ring-offset-2 focus-visible:ring-offset-tns-bg',
                    isSelected
                      ? 'bg-tns-bgAlt border-tns-accent text-tns-fg'
                      : 'bg-tns-bg border-tns-border text-tns-fg hover:bg-tns-bgAlt cursor-pointer',
                  ].join(' ')}
                >
                  <span className="font-sans text-xs sm:text-sm leading-tight text-tns-fg">{label}</span>
                </button>
              )
            })}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            {currentIndex > 0 ? (
              <Button onClick={handleBack} variant="ghost">
                ← Back
              </Button>
            ) : (
              <span />
            )}
          </div>

          <p className="mt-tns-lg font-sans text-center text-xs text-tns-muted">
            Tip: Press 1–5 to select · ← → to navigate
          </p>
        </Container>
      </Section>
    </div>
  )
}

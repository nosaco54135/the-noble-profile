'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { QUESTIONS, shuffleQuestions } from '@/lib/questions'
import { clientStorage } from '@/lib/storage'
import { LIKERT_LABELS, PRIMING_INSTRUCTION, type Question } from '@/types'
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

  // Session data
  const [email, setEmail] = useState<string>('')
  const [isSubscriber, setIsSubscriber] = useState(false)

  // Question state
  const [shuffled, setShuffled] = useState<Question[]>([])
  const [seed, setSeed] = useState<string>('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [responses, setResponses] = useState<Record<string, number>>({}) // questionId → value
  const [selected, setSelected] = useState<number | null>(null)

  // Submission state
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  useEffect(() => {
    // Read session data set by the landing page
    const storedEmail = sessionStorage.getItem('tnq_email') ?? ''
    const storedSubscriber = sessionStorage.getItem('tnq_subscriber') === 'true'

    if (!storedEmail) {
      router.replace('/quotient')
      return
    }

    setEmail(storedEmail)
    setIsSubscriber(storedSubscriber)
    // Reuse any existing seed so mid-assessment reloads keep the same order
    const existingSeed = sessionStorage.getItem('tnq_seed')
    const activeSeed = existingSeed ?? generateSeed()
    if (!existingSeed) sessionStorage.setItem('tnq_seed', activeSeed)
    setSeed(activeSeed)
    setShuffled(shuffleQuestions(QUESTIONS, activeSeed))
  }, [router])

  const currentQuestion = shuffled[currentIndex]
  const totalQuestions = shuffled.length
  const progress = totalQuestions > 0 ? (currentIndex / totalQuestions) * 100 : 0
  const isLastQuestion = currentIndex === totalQuestions - 1
  const answeredCount = Object.keys(responses).length

  // When moving to a new question, restore any previously selected value
  useEffect(() => {
    if (!currentQuestion) return
    setSelected(responses[currentQuestion.id] ?? null)
  }, [currentIndex, currentQuestion, responses])

  const handleSelect = useCallback(
    (value: number) => {
      if (!currentQuestion) return
      setSelected(value)
      setResponses((prev) => ({ ...prev, [currentQuestion.id]: value }))
    },
    [currentQuestion],
  )

  const handleNext = useCallback(() => {
    if (selected === null) return
    setCurrentIndex((i) => Math.min(i + 1, totalQuestions - 1))
  }, [selected, totalQuestions])

  const handleSubmit = useCallback(async () => {
    if (Object.keys(responses).length < QUESTIONS.length) return
    if (submitting) return

    setSubmitting(true)
    setSubmitError('')

    try {
      // Convert responseMap → ordered array in canonical question order
      const orderedResponses = QUESTIONS.map((q) => responses[q.id])

      const res = await fetch('/api/submit-assessment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, isSubscriber, responses: orderedResponses, seed }),
      })

      if (!res.ok) {
        const { error } = await res.json()
        throw new Error(error ?? 'Submission failed')
      }

      const data = await res.json()
      const { id } = data

      // Clear session storage — no longer needed
      sessionStorage.removeItem('tnq_email')
      sessionStorage.removeItem('tnq_subscriber')
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
  }, [responses, submitting, email, isSubscriber, seed, router])

  // Keyboard support: number keys 1-5, Enter/→ to advance
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (['1', '2', '3', '4', '5'].includes(e.key)) {
        handleSelect(Number(e.key))
      }
      if (e.key === 'Enter' || e.key === 'ArrowRight') {
        if (selected !== null && !isLastQuestion) handleNext()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [handleSelect, handleNext, selected, isLastQuestion])

  if (!currentQuestion) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-tns-bg">
        <div className="w-8 h-8 border-4 border-tns-accent border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

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

          {/* Question */}
          <div className="mb-tns-2xl mt-tns-lg">
            <p className="font-sans text-tns-fg text-xl md:text-2xl leading-relaxed text-center tracking-tight">
              &ldquo;{currentQuestion.text}&rdquo;
            </p>
          </div>

          {/* Frequency scale */}
          <div className="grid grid-cols-5 gap-2 sm:gap-3 mb-tns-2xl">
            {[1, 2, 3, 4, 5].map((value) => {
              const isSelected = selected === value
              return (
                <button
                  key={value}
                  onClick={() => handleSelect(value)}
                  className={[
                    'flex flex-col items-center justify-center gap-1.5 p-3 sm:p-4 border transition-colors duration-150 min-h-[96px]',
                    'focus:outline-none focus-visible:ring-2 focus-visible:ring-tns-accent focus-visible:ring-offset-2 focus-visible:ring-offset-tns-bg',
                    isSelected
                      ? 'bg-tns-bgAlt border-tns-accent text-tns-fg'
                      : 'bg-tns-bg border-tns-border text-tns-fg hover:bg-tns-bgAlt cursor-pointer',
                  ].join(' ')}
                >
                  <span className="font-display text-lg text-tns-fg">{value}</span>
                  <span className="font-sans text-xs sm:text-sm leading-tight text-center text-tns-fg">
                    {LIKERT_LABELS[value]}
                  </span>
                </button>
              )
            })}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-end">
            {isLastQuestion ? (
              <Button
                onClick={handleSubmit}
                disabled={selected === null || submitting || answeredCount < totalQuestions}
                variant="primary"
              >
                {submitting ? 'Scoring…' : 'See my results →'}
              </Button>
            ) : (
              <Button
                onClick={handleNext}
                disabled={selected === null}
                variant="primary"
              >
                Next →
              </Button>
            )}
          </div>

          {submitError && (
            <p className="mt-tns-md font-sans text-center text-sm text-tns-accent">
              {submitError}
            </p>
          )}

          <p className="mt-tns-lg font-sans text-center text-xs text-tns-muted">
            Tip: Press 1 to 5 to select, Enter to advance
          </p>
        </Container>
      </Section>
    </div>
  )
}

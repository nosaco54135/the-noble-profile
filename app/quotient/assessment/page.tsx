'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { QUESTIONS, shuffleQuestions } from '@/lib/questions'
import { clientStorage } from '@/lib/storage'
import { LIKERT_LABELS, PRIMING_INSTRUCTION, type Question } from '@/types'

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
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-noble-600 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-slate-100 px-6 py-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-noble-600 flex items-center justify-center">
              <span className="text-white font-bold text-xs">N</span>
            </div>
            <span className="text-sm font-semibold text-slate-700">The Noble Quotient</span>
          </div>
          <span className="text-sm text-slate-400">
            {answeredCount} of {totalQuestions} answered
          </span>
        </div>
      </header>

      {/* Progress bar */}
      <div className="bg-slate-200 h-1.5">
        <div
          className="bg-noble-600 h-1.5 transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Question area */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-2xl">
          {/* Step indicator */}
          <p className="text-sm font-semibold text-noble-600 uppercase tracking-widest mb-3 text-center">
            Question {currentIndex + 1} of {totalQuestions}
          </p>

          {/* Priming instruction — shown on every question per spec Stage 3 */}
          <p className="text-sm text-slate-500 italic text-center mb-6">
            {PRIMING_INSTRUCTION}
          </p>

          {/* Question card */}
          <div className="card p-8 md:p-10 mb-8">
            <p className="text-xl md:text-2xl font-medium text-slate-900 leading-relaxed text-center">
              &ldquo;{currentQuestion.text}&rdquo;
            </p>
          </div>

          {/* Frequency scale (Rule 9: no directional anchors; each button = number + own label) */}
          <div className="space-y-3">
            <div className="grid grid-cols-5 gap-2 sm:gap-3">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  onClick={() => handleSelect(value)}
                  className={[
                    'flex flex-col items-center justify-center gap-1.5 p-3 sm:p-4 rounded-xl border-2 transition-all duration-150 min-h-[96px]',
                    'focus:outline-none focus:ring-2 focus:ring-noble-500 focus:ring-offset-2',
                    selected === value
                      ? 'border-noble-600 bg-noble-600 text-white shadow-md scale-105'
                      : 'border-slate-200 bg-white text-slate-600 hover:border-noble-300 hover:bg-noble-50',
                  ].join(' ')}
                >
                  <span className="text-lg font-bold">{value}</span>
                  <span className="text-xs sm:text-sm leading-tight text-center font-medium">
                    {LIKERT_LABELS[value]}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-end mt-8">
            {isLastQuestion ? (
              <button
                onClick={handleSubmit}
                disabled={selected === null || submitting || answeredCount < totalQuestions}
                className="btn-primary px-8 py-3"
              >
                {submitting ? (
                  <>
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Scoring…
                  </>
                ) : (
                  'See my results →'
                )}
              </button>
            ) : (
              <button
                onClick={handleNext}
                disabled={selected === null}
                className="btn-primary px-8 py-3"
              >
                Next →
              </button>
            )}
          </div>

          {submitError && (
            <p className="mt-4 text-center text-sm text-red-600">{submitError}</p>
          )}

          <p className="mt-6 text-center text-xs text-slate-400">
            Tip: Press 1–5 to select, Enter to advance
          </p>
        </div>
      </main>
    </div>
  )
}

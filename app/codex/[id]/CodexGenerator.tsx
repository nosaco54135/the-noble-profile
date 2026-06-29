'use client'

import { useState, useEffect } from 'react'
import type { ScoringResult } from '@/types'
import CompassContent from './CodexContent'
import { track } from "@vercel/analytics"

interface Props {
  assessmentId: string
  archetypeResult: ScoringResult
  dimensionScores: { key: string; label: string; score: number; max: number }[]
  archetypes: {
    primary: { name: string; matchPercentage: number }
    secondary: { name: string; matchPercentage: number }
    tertiary: { name: string; matchPercentage: number }
  }
  topDimensions: { key: string; label: string; score: number }[]
  gapDimensions: { key: string; label: string; score: number }[]
  sessionId?: string
  archetype: string
}

const SALES_QUOTES = [
  "The rep who talks least in discovery usually wins the deal.",
  "Pipeline is not optimism. It's evidence.",
  "You can feel rapport and still lose the deal. Rapport is not momentum.",
  "The close doesn't happen at the end of the call. It happens in the first ten minutes.",
  "Most sellers ask good questions. Few listen to the answers.",
  "A full pipeline hides bad habits. A thin one reveals them.",
  "Buyers don't resist salespeople. They resist salespeople who make them feel sold.",
  "The follow-up email everyone sends is the one that gets ignored. Write a different one.",
  "Your instincts are data. Treat them like it.",
  "The best discovery question is the one you ask after they've stopped talking.",
  "Confidence in the close comes from certainty in the discovery. Do the work early.",
  "Nobody buys from the most prepared rep. They buy from the most trusted one.",
]

/**
 * Client component that triggers on-demand Codex generation
 * when the user lands on the Codex page before it has been generated.
 */
export default function CompassGenerator({ assessmentId, archetypeResult, dimensionScores, archetypes, topDimensions, gapDimensions, sessionId, archetype }: Props) {
  const [status, setStatus] = useState<'generating' | 'done' | 'error'>('generating')
  const [compass, setCompass] = useState<string | null>(null)
  const [error, setError] = useState('')
  const [quoteIndex, setQuoteIndex] = useState(0)
  const [quoteVisible, setQuoteVisible] = useState(true)
  const [hasTrackedPurchase, setHasTrackedPurchase] = useState(false)

  useEffect(() => {
    if (sessionId && !hasTrackedPurchase) {
      track('codex_purchase_completed', { archetype })
      setHasTrackedPurchase(true)
    }
  }, [sessionId, archetype])

  async function generateCodex() {
    setStatus('generating')
    setError('')
    try {
      const res = await fetch('/api/generate-codex', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ assessmentId }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error ?? 'Generation failed')
      }

      const { codex: text } = await res.json()
      setCompass(text)
      setStatus('done')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
      setStatus('error')
    }
  }

  useEffect(() => {
    generateCodex()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assessmentId])

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteVisible(false)
      setTimeout(() => {
        setQuoteIndex(prev => (prev + 1) % SALES_QUOTES.length)
        setQuoteVisible(true)
      }, 400)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  if (status === 'error') {
    return (
      <div className="bg-[#FAFAF7] border border-[#E8E6DF] rounded-2xl shadow-sm px-8 py-10 text-center">
        <div className="text-4xl mb-4">⚠️</div>
        <h3 className="font-bold text-[#0F0F0F] mb-2">Generation failed</h3>
        <p className="text-sm text-[#6B6B6B] mb-6">{error}</p>
        <button
          onClick={generateCodex}
          className="btn-primary"
        >
          Try again
        </button>
      </div>
    )
  }

  if (status === 'done' && compass) {
    return (
      <CompassContent
        markdown={compass}
        dimensionScores={dimensionScores}
        archetypes={archetypes}
        topDimensions={topDimensions}
        gapDimensions={gapDimensions}
      />
    )
  }

  // Generating state
  const steps = [
    `Analyzing your ${archetypeResult?.primary?.name ?? 'profile'} archetype`,
    'Mapping your 12 dimension scores',
    'Identifying your growth edges',
    'Building your prospecting strategy',
    'Writing your blind spot analysis',
    'Drafting your 30/60/90 day plan',
  ]

  return (
    <div className="bg-[#FAFAF7] border border-[#E8E6DF] rounded-2xl shadow-sm px-8 py-12 text-center">
      <div className="w-16 h-16 rounded-full bg-[#F2F0EB] border-4 border-[#E8E6DF] flex items-center justify-center mx-auto mb-6">
        <div className="w-8 h-8 rounded-full border-4 border-[#E8E6DF] border-t-[#722F37] animate-spin" />
      </div>

      <h3 className="text-xl font-bold text-[#0F0F0F] mb-2">
        Generating your personal Codex…
      </h3>
      <p className="text-sm text-[#6B6B6B] mb-8 max-w-sm mx-auto">
        This usually takes 1–2 minutes. Your full coaching report is being written.
      </p>

      <div className="max-w-xs mx-auto space-y-2 text-left">
        {steps.map((step, i) => (
          <div key={i} className="flex items-center gap-2.5">
            <div className="w-4 h-4 rounded-full border-2 border-[#E8E6DF] flex-shrink-0" />
            <span className="text-sm text-[#6B6B6B]">{step}</span>
          </div>
        ))}
      </div>

      <div
        className="mt-8 pt-8 border-t border-[#E8E6DF] max-w-sm mx-auto text-center"
        style={{
          opacity: quoteVisible ? 1 : 0,
          transition: 'opacity 0.4s ease-in-out',
        }}
      >
        <p className="font-display italic text-base text-[#0F0F0F] leading-relaxed mb-3">
          &ldquo;{SALES_QUOTES[quoteIndex]}&rdquo;
        </p>
        <p className="font-sans text-[11px] uppercase tracking-[0.12em] text-[#6B6B6B]">
          The Noble Seller
        </p>
      </div>
    </div>
  )
}

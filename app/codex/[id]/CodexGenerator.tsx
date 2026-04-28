'use client'

import { useState, useEffect } from 'react'
import type { ScoringResult } from '@/types'
import CodexContent from './CodexContent'

interface Props {
  assessmentId: string
  archetypeResult: ScoringResult
}

/**
 * Client component that triggers on-demand Codex generation
 * when the user lands on the Codex page before it has been generated.
 */
export default function CodexGenerator({ assessmentId, archetypeResult }: Props) {
  const [status, setStatus] = useState<'generating' | 'done' | 'error'>('generating')
  const [codex, setCodex] = useState<string | null>(null)
  const [error, setError] = useState('')

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
      setCodex(text)
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

  if (status === 'error') {
    return (
      <div className="card px-8 py-10 text-center">
        <div className="text-4xl mb-4">⚠️</div>
        <h3 className="font-bold text-slate-900 mb-2">Generation failed</h3>
        <p className="text-sm text-slate-500 mb-6">{error}</p>
        <button
          onClick={generateCodex}
          className="btn-primary"
        >
          Try again
        </button>
      </div>
    )
  }

  if (status === 'done' && codex) {
    return <CodexContent markdown={codex} />
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
    <div className="card px-8 py-12 text-center">
      <div className="w-16 h-16 rounded-full bg-noble-50 border-4 border-noble-200 flex items-center justify-center mx-auto mb-6">
        <svg
          className="w-8 h-8 text-noble-600 animate-spin"
          viewBox="0 0 24 24"
          fill="none"
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
      </div>

      <h3 className="text-xl font-bold text-slate-900 mb-2">
        Generating your personal Codex…
      </h3>
      <p className="text-sm text-slate-500 mb-8 max-w-sm mx-auto">
        Your scores are being translated into a personal Codex.
        This usually takes 20–40 seconds.
      </p>

      <div className="max-w-xs mx-auto space-y-2 text-left">
        {steps.map((step, i) => (
          <div key={i} className="flex items-center gap-2.5">
            <div className="w-4 h-4 rounded-full border-2 border-noble-300 flex-shrink-0" />
            <span className="text-sm text-slate-400">{step}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

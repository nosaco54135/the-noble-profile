'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { clientStorage, type StoredAssessment } from '@/lib/storage'
import { DIMENSION_LABELS, DIMENSION_ORDER } from '@/types'
import CodexContent from './CodexContent'

interface Props {
  id: string
}

export default function FallbackCodexPage({ id }: Props) {
  const [data, setData] = useState<StoredAssessment | null>(null)
  const [codex, setCodex] = useState<string | null>(null)
  const [status, setStatus] = useState<'loading' | 'generating' | 'done' | 'error'>('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    const result = clientStorage.loadAssessment(id)
    if (!result) {
      setStatus('error')
      setError('No assessment data found in localStorage. Please retake the assessment.')
      return
    }
    setData(result)

    const cached = clientStorage.loadCodex(id)
    if (cached) {
      setCodex(cached)
      setStatus('done')
      return
    }

    setStatus('generating')
  }, [id])

  useEffect(() => {
    if (status !== 'generating' || !data) return
    let canceled = false

    async function generate() {
      try {
        const res = await fetch('/api/generate-codex', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fallback: true,
            archetypeResult: data!.archetypeResult,
          }),
        })

        if (!res.ok) {
          const json = await res.json()
          throw new Error(json.error ?? 'Generation failed')
        }

        const { codex: text } = await res.json()
        if (!canceled) {
          clientStorage.saveCodex(id, text)
          setCodex(text)
          setStatus('done')
        }
      } catch (err) {
        if (!canceled) {
          setError(err instanceof Error ? err.message : 'Something went wrong')
          setStatus('error')
        }
      }
    }

    generate()
    return () => { canceled = true }
  }, [status, data, id])

  const primaryName = data?.archetypeResult?.primary?.name ?? 'Your Archetype'

  const steps = [
    `Analyzing your ${primaryName} archetype`,
    'Mapping your 12 dimension scores',
    'Identifying your growth edges',
    'Building your prospecting strategy',
    'Writing your blind spot analysis',
    'Drafting your 30/60/90 day plan',
  ]

  return (
    <div className="min-h-screen bg-[#FAFAF7]">
      {/* Nav */}
      <nav className="bg-[#FAFAF7] border-b border-[#E8E6DF] sticky top-0 z-10 no-print">
        <div className="max-w-3xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/quotient" className="text-sm font-semibold text-[#0F0F0F]">
            The Noble Seller
          </Link>
          <div className="flex items-center gap-3">
            <Link
              href={`/quotient/results/${id}?fallback=true`}
              className="text-sm text-[#6B6B6B] hover:text-[#0F0F0F] transition"
            >
              ← Results
            </Link>
            {status === 'done' && (
              <button
                onClick={() => window.print()}
                className="font-sans text-sm border border-[#722F37] text-[#722F37] hover:bg-[#722F37]/5 px-4 py-2 rounded-lg transition"
              >
                Print / Save PDF
              </button>
            )}
          </div>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-6 py-12 print-page">
        {/* Dev mode badge */}
        <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold px-3 py-1.5 rounded-full mb-4 tracking-wide uppercase no-print">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 inline-block" />
          Dev mode — payment bypassed
        </div>

        {/* Header */}
        <div className="mb-12 print:mb-8">
          <p className="font-sans text-[11px] uppercase tracking-[0.12em] text-[#6B6B6B] mb-2">
            The Noble Seller · The Noble Codex
          </p>
          <h1 className="font-display text-5xl md:text-6xl font-semibold text-[#0F0F0F] leading-[1.05] mb-4">
            The {primaryName} Codex
          </h1>
          <p className="font-sans text-[#6B6B6B] text-base">
            Generated specifically for your Noble Quotient results.
          </p>
        </div>

        {status === 'error' && (
          <div className="card px-8 py-10 text-center">
            <h3 className="font-bold text-[#0F0F0F] mb-2">Error</h3>
            <p className="text-sm text-[#6B6B6B] mb-6">{error}</p>
            {error.includes('localStorage') ? (
              <Link href="/quotient" className="btn-primary">Start over</Link>
            ) : (
              <button
                onClick={() => { setStatus('generating'); setError('') }}
                className="btn-primary"
              >
                Try again
              </button>
            )}
          </div>
        )}

        {status === 'generating' && (
          <div className="card px-8 py-12 text-center">
            <div className="w-16 h-16 rounded-full bg-[#F2F0EB] border-4 border-[#E8E6DF] flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-[#722F37] animate-spin" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-[#0F0F0F] mb-2">
              Generating your personal Codex…
            </h3>
            <p className="text-sm text-[#6B6B6B] mb-8 max-w-sm mx-auto">
              Your scores are being translated into a personal Codex.
              This usually takes 20–40 seconds.
            </p>
            <div className="max-w-xs mx-auto space-y-2 text-left">
              {steps.map((step, i) => (
                <div key={i} className="flex items-center gap-2.5">
                  <div className="w-4 h-4 rounded-full border-2 border-[#E8E6DF] flex-shrink-0" />
                  <span className="text-sm text-[#6B6B6B]">{step}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {status === 'done' && (
          <nav className="sticky top-0 z-10 bg-[#FAFAF7] border-b border-[#E8E6DF] no-print">
            <div className="max-w-[760px] mx-auto px-8 md:px-10">
              <div className="flex gap-4 md:gap-6 overflow-x-auto no-scrollbar -mx-8 px-8 md:mx-0 md:px-0 py-3">
                {[
                  { label: 'Identity', href: '#section-1' },
                  { label: 'Prospecting', href: '#section-2' },
                  { label: 'Closing', href: '#section-3' },
                  { label: 'Blind Spots', href: '#section-4' },
                  { label: 'Tools', href: '#section-5' },
                  { label: '30/60/90', href: '#section-6' },
                ].map(({ label, href }) => (
                  <a
                    key={href}
                    href={href}
                    className="font-sans text-xs uppercase tracking-[0.08em] text-[#6B6B6B] hover:text-[#722F37] transition-colors whitespace-nowrap"
                  >
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </nav>
        )}

        {status === 'done' && codex && data && (() => {
          const dimensionScores = DIMENSION_ORDER.map(key => ({
            key,
            label: DIMENSION_LABELS[key],
            score: data.dimensionScores[key],
            max: 5,
          })).sort((a, b) => b.score - a.score)
          const topDimensions = dimensionScores.slice(0, 3)
          const gapDimensions = dimensionScores.slice(-4)
          return (
            <CodexContent
              markdown={codex}
              dimensionScores={dimensionScores}
              topDimensions={topDimensions}
              gapDimensions={gapDimensions}
              archetypes={{
                primary: {
                  name: data.archetypeResult?.primary?.name ?? '',
                  matchPercentage: data.archetypeResult?.primary?.matchPercentage ?? 0,
                },
                secondary: {
                  name: data.archetypeResult?.secondary?.name ?? '',
                  matchPercentage: data.archetypeResult?.secondary?.matchPercentage ?? 0,
                },
                tertiary: {
                  name: data.archetypeResult?.tertiary?.name ?? '',
                  matchPercentage: data.archetypeResult?.tertiary?.matchPercentage ?? 0,
                },
              }}
            />
          )
        })()}
      </main>

      <footer className="border-t border-[#E8E6DF] py-8 mt-16 no-print">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-xs text-[#6B6B6B]">
            © {new Date().getFullYear()} The Noble Seller · The Noble Quotient
          </p>
        </div>
      </footer>
    </div>
  )
}

'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { clientStorage, type StoredAssessment } from '@/lib/storage'
import {
  DIMENSION_LABELS,
  DIMENSION_ORDER,
  DIMENSION_STRENGTHS,
  DIMENSION_BLIND_SPOTS,
  type DimensionKey,
} from '@/types'

interface Props {
  id: string
}

export default function FallbackResultsPage({ id }: Props) {
  const [data, setData] = useState<StoredAssessment | null>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setData(clientStorage.loadAssessment(id))
    setLoaded(true)
  }, [id])

  if (!loaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-noble-600 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center">
          <h2 className="text-xl font-bold text-slate-900 mb-2">Results not found</h2>
          <p className="text-slate-500 text-sm mb-6">
            localStorage data may have been cleared. Please retake the assessment.
          </p>
          <Link href="/quotient" className="btn-primary">Start over</Link>
        </div>
      </div>
    )
  }

  const { archetypeResult: result, dimensionScores: scores } = data
  const { primary, secondary, tertiary, traits, styles } = result

  const traitLabels: Record<string, string> = Object.fromEntries(traits.map((t) => [t.key, t.label]))
  const styleLabels: Record<string, string> = Object.fromEntries(styles.map((s) => [s.key, s.label]))

  const sortedDims = [...DIMENSION_ORDER].sort((a, b) => scores[b] - scores[a])
  const topDims: DimensionKey[] = sortedDims.slice(0, 3)
  const bottomDims: DimensionKey[] = sortedDims.slice(-3).reverse()

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Nav */}
      <nav className="bg-white border-b border-slate-100 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/quotient" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-noble-600 flex items-center justify-center">
              <span className="text-white font-bold text-xs">N</span>
            </div>
            <span className="text-sm font-semibold text-slate-700">The Noble Seller</span>
          </Link>
          <span className="text-sm font-medium text-noble-600">Your Noble Quotient</span>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-12 space-y-10">

        {/* Dev mode banner */}
        <div className="bg-amber-50 border border-amber-200 text-amber-800 rounded-xl px-5 py-4 text-sm">
          <strong>Dev mode — no Supabase.</strong> Results are stored in localStorage. Payment is bypassed.
        </div>

        {/* ── Primary Archetype ─────────────────────────────────────── */}
        <section className="card overflow-hidden">
          <div className="bg-gradient-to-br from-noble-600 to-noble-800 px-8 py-10 text-white">
            <p className="text-noble-200 text-xs font-semibold uppercase tracking-widest mb-3">
              Primary Archetype · {primary.matchPercentage}% match
            </p>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-6">
              The {primary.name}
            </h1>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-white/10 rounded-xl px-5 py-4">
                <p className="text-noble-300 text-xs font-semibold uppercase tracking-widest mb-1">
                  Trait Axis (How you show up)
                </p>
                <p className="text-white text-xl font-bold">{primary.trait.label}</p>
                <p className="text-noble-200 text-sm mt-1">{primary.trait.tagline}</p>
                <p className="text-noble-300 text-xs mt-2 font-mono">
                  {primary.trait.score.toFixed(1)}/5.0
                  {primary.trait.closeRankTie && ` · close with ${primary.trait.tiedWith.map((k) => traitLabels[k]).join(', ')}`}
                </p>
              </div>
              <div className="bg-white/10 rounded-xl px-5 py-4">
                <p className="text-noble-300 text-xs font-semibold uppercase tracking-widest mb-1">
                  Style Axis (What you do)
                </p>
                <p className="text-white text-xl font-bold">{primary.style.label}</p>
                <p className="text-noble-200 text-sm mt-1">{primary.style.tagline}</p>
                <p className="text-noble-300 text-xs mt-2 font-mono">
                  {primary.style.score.toFixed(1)}/5.0
                  {primary.style.closeRankTie && ` · close with ${primary.style.tiedWith.map((k) => styleLabels[k]).join(', ')}`}
                </p>
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
            <div className="px-8 py-6">
              <p className="text-xs text-slate-400 font-semibold uppercase tracking-widest mb-2">
                Secondary Archetype · {secondary.matchPercentage}% match
              </p>
              <p className="font-bold text-slate-800 text-lg mb-1">The {secondary.name}</p>
              <div className="flex gap-2 flex-wrap">
                <span className="text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full font-medium">
                  {secondary.trait.label} ({secondary.trait.score.toFixed(1)})
                </span>
                <span className="text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full font-medium">
                  {secondary.style.label} ({secondary.style.score.toFixed(1)})
                </span>
              </div>
            </div>
            <div className="px-8 py-6">
              <p className="text-xs text-slate-400 font-semibold uppercase tracking-widest mb-2">
                Tertiary Awareness · {tertiary.matchPercentage}% match
              </p>
              <p className="font-bold text-slate-800 text-lg mb-1">The {tertiary.name}</p>
              <div className="flex gap-2 flex-wrap">
                <span className="text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full font-medium">
                  {tertiary.trait.label} ({tertiary.trait.score.toFixed(1)})
                </span>
                <span className="text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full font-medium">
                  {tertiary.style.label} ({tertiary.style.score.toFixed(1)})
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ── Honest framing line (spec Stage 4) ────────────────────── */}
        <section className="bg-white rounded-2xl border border-slate-200 px-6 py-5">
          <p className="text-slate-700 leading-relaxed text-[15px]">
            No one scores high across every dimension. Your top scores reveal
            your natural selling identity. Your lower scores aren&rsquo;t
            weaknesses. They&rsquo;re the specific areas where focused
            development will move your performance most.
          </p>
        </section>

        {/* ── Top 3 Strengths ───────────────────────────────────────── */}
        <section className="card px-8 py-8">
          <h2 className="text-xl font-bold text-slate-900 mb-1">Your Top 3 Strengths</h2>
          <p className="text-sm text-slate-400 mb-6">Where your scores run strongest</p>
          <div className="space-y-5">
            {topDims.map((dim, i) => (
              <div key={dim} className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                  {i + 1}
                </div>
                <div>
                  <div className="flex items-baseline gap-3 mb-1">
                    <h3 className="font-bold text-slate-900">{DIMENSION_LABELS[dim]}</h3>
                    <span className="text-sm font-mono text-slate-500">
                      {scores[dim].toFixed(1)}/5.0
                    </span>
                  </div>
                  <p className="text-slate-600 leading-relaxed text-sm">
                    {DIMENSION_STRENGTHS[dim]}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Top 3 Blind Spots ─────────────────────────────────────── */}
        <section className="card px-8 py-8">
          <h2 className="text-xl font-bold text-slate-900 mb-1">Your Top 3 Blind Spots</h2>
          <p className="text-sm text-slate-400 mb-6">Where focused work pays off fastest</p>
          <div className="space-y-5">
            {bottomDims.map((dim, i) => (
              <div key={dim} className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
                  {i + 1}
                </div>
                <div>
                  <div className="flex items-baseline gap-3 mb-1">
                    <h3 className="font-bold text-slate-900">{DIMENSION_LABELS[dim]}</h3>
                    <span className="text-sm font-mono text-slate-500">
                      {scores[dim].toFixed(1)}/5.0
                    </span>
                  </div>
                  <p className="text-slate-600 leading-relaxed text-sm">
                    {DIMENSION_BLIND_SPOTS[dim]}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Trait + Style Rankings ─────────────────────────────────── */}
        <div className="grid sm:grid-cols-2 gap-6">
          <section className="card px-6 py-6">
            <h2 className="text-base font-bold text-slate-900 mb-1">Trait Axis Rankings</h2>
            <p className="text-xs text-slate-400 mb-5">How you naturally show up</p>
            <div className="space-y-4">
              {traits.map((trait, i) => (
                <div key={trait.key}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-1.5">
                      {i === 0 && (
                        <span className="text-xs bg-noble-100 text-noble-700 font-semibold px-1.5 py-0.5 rounded-full">
                          #1
                        </span>
                      )}
                      <span className="text-sm font-semibold text-slate-800">{trait.label}</span>
                      {trait.closeRankTie && (
                        <span className="text-[10px] text-slate-400 font-normal">
                          (near {trait.tiedWith.map((k) => traitLabels[k]).join(', ')})
                        </span>
                      )}
                    </div>
                    <span className="text-sm font-bold text-noble-700">
                      {trait.matchPercentage}%
                    </span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${i === 0 ? 'bg-noble-600' : 'bg-noble-300'}`}
                      style={{ width: `${trait.matchPercentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="card px-6 py-6">
            <h2 className="text-base font-bold text-slate-900 mb-1">Style Axis Rankings</h2>
            <p className="text-xs text-slate-400 mb-5">What you naturally do</p>
            <div className="space-y-4">
              {styles.map((style, i) => (
                <div key={style.key}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-1.5">
                      {i === 0 && (
                        <span className="text-xs bg-noble-100 text-noble-700 font-semibold px-1.5 py-0.5 rounded-full">
                          #1
                        </span>
                      )}
                      <span className="text-sm font-semibold text-slate-800">{style.label}</span>
                      {style.closeRankTie && (
                        <span className="text-[10px] text-slate-400 font-normal">
                          (near {style.tiedWith.map((k) => styleLabels[k]).join(', ')})
                        </span>
                      )}
                    </div>
                    <span className="text-sm font-bold text-noble-700">
                      {style.matchPercentage}%
                    </span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${i === 0 ? 'bg-noble-600' : 'bg-noble-300'}`}
                      style={{ width: `${style.matchPercentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* ── 12 Dimension Scores ───────────────────────────────────── */}
        <section className="card px-8 py-8">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Your 12 Dimension Scores</h2>
          <div className="space-y-4">
            {DIMENSION_ORDER.map((key) => {
              const value = scores[key] ?? 0
              const pct = (value / 5) * 100
              const label = DIMENSION_LABELS[key]
              const level =
                value >= 4.5 ? 'Very High' :
                value >= 3.5 ? 'High' :
                value >= 2.5 ? 'Moderate' :
                value >= 1.5 ? 'Low' : 'Very Low'
              const levelColor =
                value >= 4.5 ? 'text-emerald-700' :
                value >= 3.5 ? 'text-noble-700' :
                value >= 2.5 ? 'text-amber-600' :
                'text-red-500'

              return (
                <div key={key}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-medium text-slate-700">{label}</span>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-semibold ${levelColor}`}>{level}</span>
                      <span className="text-sm font-bold text-slate-900 w-8 text-right">
                        {value.toFixed(1)}
                      </span>
                    </div>
                  </div>
                  <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-noble-600 transition-all duration-700"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* ── Dev Codex CTA (no paywall) ────────────────────────────── */}
        <section className="card bg-noble-600 p-8 text-center text-white">
          <p className="text-noble-200 text-sm font-semibold uppercase tracking-widest mb-2">
            Dev mode — payment bypassed
          </p>
          <h3 className="text-2xl font-bold mb-4">
            Generate Your {primary.name} Codex
          </h3>
          <Link
            href={`/codex/${id}?fallback=true`}
            className="inline-flex items-center gap-2 bg-white text-noble-700 font-semibold
                       px-8 py-3 rounded-lg hover:bg-noble-50 transition"
          >
            Open My Codex →
          </Link>
        </section>
      </main>

      <footer className="border-t border-slate-100 py-8 mt-12">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-xs text-slate-400">
            © {new Date().getFullYear()} The Noble Seller · The Noble Quotient
          </p>
        </div>
      </footer>
    </div>
  )
}

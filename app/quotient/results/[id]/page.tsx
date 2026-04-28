import { notFound } from 'next/navigation'
import Link from 'next/link'
import { serverStorage } from '@/lib/storage'
import { isStripeConfigured } from '@/lib/stripe'
import {
  DIMENSION_LABELS,
  DIMENSION_ORDER,
  DIMENSION_STRENGTHS,
  DIMENSION_BLIND_SPOTS,
  type DimensionKey,
  type RankedTrait,
  type RankedStyle,
} from '@/types'
import PaywallButton from './PaywallButton'
import FallbackResultsPage from './FallbackResultsPage'

interface Props {
  params: Promise<{ id: string }>
  searchParams: Promise<{ canceled?: string; fallback?: string }>
}

/**
 * Renders a "close with X, Y" suffix when an axis rank has close-tie neighbors.
 * Spec Rule 8: within 0.1 of another axis, surface both rather than hide
 * the tie behind the alphabetical tiebreaker.
 */
function closeTieSuffix(
  ranked: RankedTrait | RankedStyle,
  // A lookup from key → label, used to show the tie partner's label.
  lookup: Record<string, string>,
): string {
  if (!ranked.closeRankTie || ranked.tiedWith.length === 0) return ''
  const names = ranked.tiedWith.map((k) => lookup[k] ?? k).join(', ')
  return ` · close with ${names}`
}

export default async function ResultsPage({ params, searchParams }: Props) {
  const { id } = await params
  const { canceled, fallback } = await searchParams

  if (fallback === 'true' || !serverStorage.isAvailable()) {
    return <FallbackResultsPage id={id} />
  }

  const assessment = await serverStorage.loadAssessment(id)
  if (!assessment) notFound()

  const { dimensionScores: scores, archetypeResult: result, isSubscriber, paymentStatus } = assessment
  if (!result?.primary) notFound()

  const { primary, secondary, tertiary, traits, styles } = result

  // Build label lookups for close-tie annotations
  const traitLabels: Record<string, string> = Object.fromEntries(traits.map((t) => [t.key, t.label]))
  const styleLabels: Record<string, string> = Object.fromEntries(styles.map((s) => [s.key, s.label]))

  // Top 3 / bottom 3 dimensions for strengths + blind spots
  const sortedDims = [...DIMENSION_ORDER].sort((a, b) => scores[b] - scores[a])
  const topDims: DimensionKey[] = sortedDims.slice(0, 3)
  const bottomDims: DimensionKey[] = sortedDims.slice(-3).reverse() // weakest first

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
        {canceled && (
          <div className="bg-amber-50 border border-amber-200 text-amber-800 rounded-xl px-5 py-4 text-sm">
            Payment was canceled. Your results are still here whenever you&apos;re ready to unlock your Codex.
          </div>
        )}

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
                <p className="text-white text-xl font-bold">
                  {primary.trait.label}
                </p>
                <p className="text-noble-200 text-sm mt-1">{primary.trait.tagline}</p>
                <p className="text-noble-300 text-xs mt-2 font-mono">
                  {primary.trait.score.toFixed(1)}/5.0{closeTieSuffix(primary.trait, traitLabels)}
                </p>
              </div>
              <div className="bg-white/10 rounded-xl px-5 py-4">
                <p className="text-noble-300 text-xs font-semibold uppercase tracking-widest mb-1">
                  Style Axis (What you do)
                </p>
                <p className="text-white text-xl font-bold">
                  {primary.style.label}
                </p>
                <p className="text-noble-200 text-sm mt-1">{primary.style.tagline}</p>
                <p className="text-noble-300 text-xs mt-2 font-mono">
                  {primary.style.score.toFixed(1)}/5.0{closeTieSuffix(primary.style, styleLabels)}
                </p>
              </div>
            </div>
          </div>

          {/* Secondary + Tertiary */}
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

        {/* ── Trait + Style Rankings (two columns) ─────────────────── */}
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

        {/* ── Codex Paywall ─────────────────────────────────────────── */}
        {paymentStatus === 'paid' ? (
          <section className="card bg-noble-600 p-8 text-center text-white">
            <p className="text-noble-200 text-sm font-semibold uppercase tracking-widest mb-2">
              Your Codex is ready
            </p>
            <h3 className="text-2xl font-bold mb-4">
              Access Your {primary.name} Codex
            </h3>
            <Link
              href={`/codex/${id}`}
              className="inline-flex items-center gap-2 bg-white text-noble-700 font-semibold
                         px-8 py-3 rounded-lg hover:bg-noble-50 transition"
            >
              Open My Codex →
            </Link>
          </section>
        ) : (
          <section className="card overflow-hidden">
            <div className="relative">
              <div className="px-8 py-8 select-none pointer-events-none">
                <h3 className="text-lg font-bold text-slate-800 mb-4">
                  The {primary.name} Codex
                </h3>
                <div className="space-y-3 blur-sm opacity-60">
                  {[
                    'Section 1: Your Selling Identity',
                    'Section 2: Prospecting Approach for Your Style',
                    'Section 3: Discovery & Closing Tactics',
                    'Section 4: Your Blind Spot Playbook',
                    'Section 5: Tools and Resources',
                    'Section 6: Your 30/60/90 Day Plan',
                  ].map((s) => (
                    <div key={s} className="space-y-1.5">
                      <div className="h-5 bg-slate-200 rounded w-48" />
                      <div className="h-3 bg-slate-100 rounded w-full" />
                      <div className="h-3 bg-slate-100 rounded w-4/5" />
                      <div className="h-3 bg-slate-100 rounded w-3/4" />
                    </div>
                  ))}
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/60 to-white" />
            </div>

            <div className="px-8 pb-8 text-center space-y-4">
              <div>
                <p className="text-xl font-bold text-slate-900 mb-1">
                  Unlock Your {primary.name} Codex
                </p>
                <p className="text-sm text-slate-500 max-w-md mx-auto">
                  6 sections written specifically for your {primary.trait.label}/{primary.style.label} profile:
                  prospecting tactics, closing strategies, blind spots, and a 30/60/90 day plan.
                </p>
              </div>
              <PaywallButton
                assessmentId={id}
                isSubscriber={isSubscriber}
                devMode={!isStripeConfigured()}
              />
              <p className="text-xs text-slate-400">
                {isSubscriber ? (
                  <>Subscriber price: <strong className="text-noble-600">$37</strong> (you saved $10)</>
                ) : (
                  <>One-time payment: <strong>$47</strong> · Instant access · Printable PDF</>
                )}
              </p>
            </div>
          </section>
        )}
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

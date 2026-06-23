import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { serverStorage } from '@/lib/storage'
import { isStripeConfigured } from '@/lib/stripe'
import {
  DIMENSION_LABELS,
  DIMENSION_ORDER,
  DIMENSION_STRENGTHS,
  DIMENSION_BLIND_SPOTS,
  CODEX_TEASERS,
  CODEX_TEASER_FALLBACK,
  type DimensionKey,
  type RankedTrait,
  type RankedStyle,
} from '@/types'
export const dynamic = 'force-dynamic'

import PaywallButton from './PaywallButton'
import FallbackResultsPage from './FallbackResultsPage'

// DEV ONLY — stable sample data for /quotient/results/dev-test
// Allows design iteration without running a real assessment.
const DEV_SAMPLE_DATA = {
  id: 'dev-test',
  primaryArchetype: {
    name: 'The Empathic Closer',
    traitLabel: 'Empathic',
    styleLabel: 'Closer',
    matchPercentage: 58,
    traitTagline: 'Reads the room and makes the other person feel it.',
    styleTagline: 'Asks for the decision without flinching.',
    traitScore: 3.9,
    styleScore: 3.8,
    nearTrait: 'Curious',
    nearStyle: 'Advisor'
  },
  secondaryArchetype: {
    name: 'The Curious Advisor',
    traitLabel: 'Curious',
    styleLabel: 'Advisor',
    matchPercentage: 36,
    traitScore: 3.6,
    styleScore: 3.5,
    nearTrait: null,
    nearStyle: null
  },
  tertiaryArchetype: {
    name: 'The Authentic Hunter',
    traitLabel: 'Authentic',
    styleLabel: 'Hunter',
    matchPercentage: 31,
    traitScore: 3.2,
    styleScore: 3.1,
    nearTrait: null,
    nearStyle: null
  },
  dimensionScores: {
    eq_trust: 4.1,
    active_listening: 3.8,
    curiosity: 3.6,
    mindset_resilience: 2.2,
    closing_confidence: 3.8,
    prospecting_comfort: 2.1,
    data_driven: 1.9,
    authenticity: 2.2,
    process_oriented: 2.4,
    problem_solving: 3.1,
    customer_centric: 2.3,
    learning_style: 2.7
  },
  traitScores: {
    Empathic: 0.96,
    Curious: 0.58,
    Authentic: 0.53,
    Adaptive: 0.49,
    Strategic: 0.50,
    Devoted: 0.50,
    Resilient: 0.43,
    Methodical: 0.45
  },
  styleScores: {
    Closer: 0.57,
    Advisor: 0.56,
    Hunter: 0.48,
    Student: 0.48,
    Architect: 0.51,
    Connector: 0.46,
    Challenger: 0.45,
    Cultivator: 0.46
  },
  topStrengths: [
    {
      dimension: 'EQ / Trust',
      score: 4.1,
      insight: 'You read the room and respond to what people actually feel, not just what they say. Prospects tell you things they don\'t tell other reps.'
    },
    {
      dimension: 'Problem Solving',
      score: 3.1,
      insight: 'You find the creative path when the standard one is blocked. Deals move forward because you think around corners.'
    },
    {
      dimension: 'Curiosity',
      score: 3.6,
      insight: 'You pull threads other reps drop. One more question than most people ask is usually the one that unlocks the deal.'
    }
  ],
  topBlindSpots: [
    {
      dimension: 'Data-Driven',
      score: 1.9,
      insight: 'You pitch features before business impact. Executives buy outcomes. Lead with cost saved, revenue gained, or time recovered.'
    },
    {
      dimension: 'Prospecting Comfort',
      score: 2.1,
      insight: 'You work existing deals instead of opening new ones. That feels safe but it starves your pipeline 60 days out.'
    },
    {
      dimension: 'Authenticity',
      score: 2.2,
      insight: 'You soften hard truths to protect the deal. Prospects feel it, and they trust the rep who tells them the thing they didn\'t want to hear.'
    }
  ]
}


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
  lookup: Record<string, string>,
): string {
  if (!ranked.closeRankTie || ranked.tiedWith.length === 0) return ''
  const names = ranked.tiedWith.map((k) => lookup[k] ?? k).join(', ')
  return ` · close with ${names}`
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  if (id === 'dev-test' || !serverStorage.isAvailable()) {
    return { title: 'Your Results — The Noble Quotient' }
  }
  const assessment = await serverStorage.loadAssessment(id)
  const primary = assessment?.archetypeResult?.primary
  if (!primary) return { title: 'Your Results — The Noble Quotient' }
  return {
    title: `The ${primary.name} — The Noble Quotient`,
    description: `${primary.matchPercentage}% match for The ${primary.name}. Discover your sales archetype and top strengths on The Noble Quotient.`,
  }
}

export default async function ResultsPage({ params, searchParams }: Props) {
  const { id } = await params
  const { canceled, fallback } = await searchParams

  if (id === 'dev-test' || fallback === 'true' || !serverStorage.isAvailable()) {
    return <FallbackResultsPage id={id} />
  }

  const assessment = await serverStorage.loadAssessment(id)
  if (!assessment) notFound()

  const { dimensionScores: scores, archetypeResult: result, paymentStatus } = assessment
  if (!result?.primary) notFound()

  const { primary, secondary, tertiary, traits, styles } = result

  const traitLabels: Record<string, string> = Object.fromEntries(traits.map((t) => [t.key, t.label]))
  const styleLabels: Record<string, string> = Object.fromEntries(styles.map((s) => [s.key, s.label]))

  const sortedTraits = [...traits].sort((a, b) => b.score - a.score)
  const sortedStyles = [...styles].sort((a, b) => b.score - a.score)

  const sortedDims = [...DIMENSION_ORDER].sort((a, b) => scores[b] - scores[a])
  const topDims: DimensionKey[] = sortedDims.slice(0, 3)
  const bottomDims: DimensionKey[] = sortedDims.slice(-3).reverse()

  const resultsUrl = `https://thenobleseller.com/quotient/results/${id}`

  return (
    <div className="min-h-screen bg-tns-bg text-tns-fg pb-[80px]">
      <Section size="lg">
        <Container maxWidth="prose">
          {canceled && (
            <div className="mb-tns-3xl border border-tns-border bg-tns-bgAlt px-tns-lg py-tns-md text-[14px] text-tns-fg">
              Payment was canceled. Your results are still here whenever you&apos;re ready to unlock your Codex.
            </div>
          )}

          {/* ── Primary Archetype (magazine cover line) ──────────────── */}
          <header className="mb-tns-4xl bg-tns-accent text-tns-bg rounded-2xl px-tns-xl py-tns-2xl">
            <div className="text-center">
              <p className="text-sm font-semibold uppercase tracking-widest text-tns-bg/70 mb-tns-md">
                Primary archetype · {primary.matchPercentage}% match
              </p>
              <h1 className="font-display font-medium text-4xl md:text-5xl tracking-tight leading-[1.02] mb-tns-2xl">
                The {primary.name}
              </h1>
            </div>

            <div className="grid gap-tns-lg md:grid-cols-2">
              <div className="border-t border-tns-bg/20 pt-tns-md">
                <p className="text-sm font-semibold uppercase tracking-widest text-tns-bg/70 mb-tns-xs">
                  Trait axis
                </p>
                <p className="font-medium text-[18px] leading-snug">
                  {primary.trait.label}
                </p>
                <p className="text-[14px] text-tns-bg/80 leading-relaxed mt-tns-xs">
                  {primary.trait.tagline}
                </p>
                <p className="text-[12px] text-tns-bg/70 mt-tns-sm">
                  {primary.trait.score.toFixed(1)} / 5{closeTieSuffix(primary.trait, traitLabels)}
                </p>
              </div>
              <div className="border-t border-tns-bg/20 pt-tns-md">
                <p className="text-sm font-semibold uppercase tracking-widest text-tns-bg/70 mb-tns-xs">
                  Style axis
                </p>
                <p className="font-medium text-[18px] leading-snug">
                  {primary.style.label}
                </p>
                <p className="text-[14px] text-tns-bg/80 leading-relaxed mt-tns-xs">
                  {primary.style.tagline}
                </p>
                <p className="text-[12px] text-tns-bg/70 mt-tns-sm">
                  {primary.style.score.toFixed(1)} / 5{closeTieSuffix(primary.style, styleLabels)}
                </p>
              </div>
            </div>
          </header>

          {/* ── Secondary + Tertiary ─────────────────────────────────── */}
          <section className="mb-tns-4xl pt-tns-2xl border-t border-tns-border grid gap-tns-2xl md:grid-cols-2">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-tns-fg mb-tns-sm">
                Secondary archetype · {secondary.matchPercentage}%
              </p>
              <p className="font-medium text-tns-fg text-xl md:text-2xl leading-tight mb-tns-sm">
                The {secondary.name}
              </p>
              <p className="text-[14px] text-tns-muted">
                {secondary.trait.label} ({secondary.trait.score.toFixed(1)}) · {secondary.style.label} ({secondary.style.score.toFixed(1)})
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-tns-fg mb-tns-sm">
                Tertiary archetype · {tertiary.matchPercentage}%
              </p>
              <p className="font-medium text-tns-fg text-xl md:text-2xl leading-tight mb-tns-sm">
                The {tertiary.name}
              </p>
              <p className="text-[14px] text-tns-muted">
                {tertiary.trait.label} ({tertiary.trait.score.toFixed(1)}) · {tertiary.style.label} ({tertiary.style.score.toFixed(1)})
              </p>
            </div>
          </section>

          {/* ── Honest framing ───────────────────────────────────────── */}
          <p className="mb-tns-4xl text-[17px] text-tns-fg leading-relaxed">
            No one scores high across every dimension. Your top scores reveal your natural selling identity. Your lower scores aren&rsquo;t weaknesses. They&rsquo;re the specific areas where focused development will move your performance most.
          </p>

          {/* ── Top 3 Strengths ──────────────────────────────────────── */}
          <section className="mb-tns-4xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-tns-fg mb-tns-sm">
              Where you run strongest
            </p>
            <h2 className="font-medium text-tns-fg text-2xl md:text-3xl tracking-tight leading-tight mb-tns-xl">
              Your top 3 strengths
            </h2>
            <ol className="space-y-tns-lg">
              {topDims.map((dim, i) => (
                <li key={dim} className="flex items-start gap-tns-md">
                  <span className="size-7 shrink-0 mt-0.5 rounded-full bg-tns-accent text-tns-bg text-[13px] font-medium flex items-center justify-center">
                    {i + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline justify-between gap-tns-md mb-tns-xs">
                      <h3 className="font-medium text-tns-fg text-[17px]">{DIMENSION_LABELS[dim]}</h3>
                      <span className="text-[13px] text-tns-muted shrink-0">
                        {scores[dim].toFixed(1)} / 5
                      </span>
                    </div>
                    <p className="text-[15px] text-tns-muted leading-relaxed">
                      {DIMENSION_STRENGTHS[dim]}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* ── Top 3 Blind Spots ────────────────────────────────────── */}
          <section className="mb-tns-4xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-tns-fg mb-tns-sm">
              Where focused work pays off fastest
            </p>
            <h2 className="font-medium text-tns-fg text-2xl md:text-3xl tracking-tight leading-tight mb-tns-xl">
              Your top 3 blind spots
            </h2>
            <ol className="space-y-tns-lg">
              {bottomDims.map((dim, i) => (
                <li key={dim} className="flex items-start gap-tns-md">
                  <span className="size-7 shrink-0 mt-0.5 rounded-full bg-tns-accent text-tns-bg text-[13px] font-medium flex items-center justify-center">
                    {i + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline justify-between gap-tns-md mb-tns-xs">
                      <h3 className="font-medium text-tns-fg text-[17px]">{DIMENSION_LABELS[dim]}</h3>
                      <span className="text-[13px] text-tns-muted shrink-0">
                        {scores[dim].toFixed(1)} / 5
                      </span>
                    </div>
                    <p className="text-[15px] text-tns-muted leading-relaxed">
                      {DIMENSION_BLIND_SPOTS[dim]}
                    </p>
                    <p className="text-[15px] text-tns-accent leading-relaxed mt-tns-xs">
                      <strong>In your Codex:</strong>{' '}{CODEX_TEASERS[DIMENSION_LABELS[dim]] ?? CODEX_TEASER_FALLBACK}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* ── Trait Axis Rankings ──────────────────────────────────── */}
          <section className="mb-tns-4xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-tns-fg mb-tns-sm">
              Trait axis rankings
            </p>
            <h2 className="font-medium text-tns-fg text-2xl md:text-3xl tracking-tight leading-tight mb-tns-xl">
              How you naturally show up
            </h2>
            <ul className="space-y-tns-md">
              {sortedTraits.map((trait) => (
                <li key={trait.key}>
                  <div className="flex items-baseline justify-between gap-tns-md mb-tns-xs">
                    <span className="text-[15px] font-medium text-tns-fg">
                      {trait.label}
                      {trait.closeRankTie && (
                        <span className="text-[12px] text-tns-muted font-normal ml-tns-sm">
                          (near {trait.tiedWith.map((k) => traitLabels[k]).join(', ')})
                        </span>
                      )}
                    </span>
                    <span className="text-[13px] text-tns-muted shrink-0">
                      {trait.matchPercentage}%
                    </span>
                  </div>
                  <div className="h-1 bg-tns-border w-full">
                    <div
                      className="h-full bg-tns-accent transition-all duration-700"
                      style={{ width: `${trait.matchPercentage}%` }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* ── Style Axis Rankings ──────────────────────────────────── */}
          <section className="mb-tns-4xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-tns-fg mb-tns-sm">
              Style axis rankings
            </p>
            <h2 className="font-medium text-tns-fg text-2xl md:text-3xl tracking-tight leading-tight mb-tns-xl">
              What you naturally do
            </h2>
            <ul className="space-y-tns-md">
              {sortedStyles.map((style) => (
                <li key={style.key}>
                  <div className="flex items-baseline justify-between gap-tns-md mb-tns-xs">
                    <span className="text-[15px] font-medium text-tns-fg">
                      {style.label}
                      {style.closeRankTie && (
                        <span className="text-[12px] text-tns-muted font-normal ml-tns-sm">
                          (near {style.tiedWith.map((k) => styleLabels[k]).join(', ')})
                        </span>
                      )}
                    </span>
                    <span className="text-[13px] text-tns-muted shrink-0">
                      {style.matchPercentage}%
                    </span>
                  </div>
                  <div className="h-1 bg-tns-border w-full">
                    <div
                      className="h-full bg-tns-accent transition-all duration-700"
                      style={{ width: `${style.matchPercentage}%` }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* ── 12 Dimension Scores ──────────────────────────────────── */}
          <section className="mb-tns-2xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-tns-fg mb-tns-sm">
              All 12 dimensions
            </p>
            <h2 className="font-medium text-tns-fg text-2xl md:text-3xl tracking-tight leading-tight mb-tns-xl">
              Your full score profile
            </h2>
            <ul className="space-y-tns-md">
              {sortedDims.map((key) => {
                const value = scores[key] ?? 0
                const pct = (value / 5) * 100
                return (
                  <li key={key}>
                    <div className="flex items-baseline justify-between gap-tns-md mb-tns-xs">
                      <span className="text-[15px] font-medium text-tns-fg">
                        {DIMENSION_LABELS[key]}
                      </span>
                      <span className="text-[13px] text-tns-muted shrink-0">
                        {value.toFixed(1)} / 5
                      </span>
                    </div>
                    <div className="h-1 bg-tns-border w-full">
                      <div
                        className="h-full bg-tns-accent transition-all duration-700"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </li>
                )
              })}
            </ul>
          </section>
        </Container>
      </Section>

      {/* ── Codex CTA panel ────────────────────────────────────────── */}
      <div className="border-t border-tns-border">
        <Section size="xl">
          <Container maxWidth="prose">
            <div className="bg-tns-bgAlt rounded-2xl px-tns-xl py-tns-xl text-center">
              {/* 1. Eyebrow */}
              <p id="codex" className="text-xs font-semibold uppercase tracking-widest text-tns-muted mb-tns-md">
                The {primary.name} Codex
              </p>

              {/* 2. Headline */}
              <h2 className="font-display font-bold text-tns-fg text-3xl md:text-4xl tracking-tight leading-tight mb-tns-sm">
                You&rsquo;ve seen the what.<br />
                Now get the why, and the fix.
              </h2>

              {/* 3. Italic accent */}
              <p className="font-display italic text-tns-accent text-xl md:text-2xl tracking-tight leading-tight mb-tns-xl">
                Built from your scores. It won&rsquo;t match anyone else&rsquo;s.
              </p>

              {/* 4. Divider label */}
              <p className="text-xs font-semibold uppercase tracking-widest text-tns-muted mb-tns-md">
                What&rsquo;s inside
              </p>

              {/* 5. Six sections */}
              <ol className="text-left divide-y divide-tns-border mb-tns-md">
                {[
                  { n: '01', title: 'Your Selling Identity', desc: 'Your three archetypes and the moves behind them.' },
                  { n: '02', title: 'Your Prospecting Approach', desc: 'The channels that fit you, and a cadence to match.' },
                  { n: '03', title: 'Discovery and Closing Tactics', desc: 'Questions in your voice, and the close to drill.' },
                  { n: '04', title: 'Your Blind Spot Teardown', desc: 'Each low score: the pattern, the excuse, the fix.' },
                  { n: '05', title: 'Tools and Resources', desc: 'Books, CRMs, and tools matched to your gaps.' },
                  { n: '06', title: 'Your 30/60/90 Day Plan', desc: 'A dated plan with milestones, not motivation.' },
                ].map(({ n, title, desc }) => (
                  <li key={n} className="flex items-start gap-tns-md py-[11px]">
                    <span className="font-display text-2xl font-bold text-tns-accent leading-none w-10 shrink-0 text-right">{n}</span>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-tns-fg text-[0.9rem] leading-[1.3]">{title}</p>
                      <p className="text-[0.79rem] leading-[1.3] text-[#7a746e]">{desc}</p>
                    </div>
                  </li>
                ))}
              </ol>

              {/* 6. Anchor lines */}
              <p className="text-[13px] font-medium text-tns-fg mb-tns-xs">
                Six sections, built from all 12 of your scores.
              </p>
              <p className="text-[13px] text-tns-muted mb-tns-xs">
                Specific to your profile, not a category.
              </p>

              {/* 7. AI transparency */}
              <p className="text-[13px] italic text-tns-muted mb-tns-md">
                Powered by AI, built entirely from your results.
              </p>

              {/* 8–10. Price, button, reassurance */}
              {paymentStatus === 'paid' ? (
                <>
                  <Link
                    href={`/codex/${id}`}
                    className="inline-flex items-center justify-center bg-tns-accent text-tns-bg font-medium px-6 py-3 rounded-lg hover:bg-tns-accentDark transition-colors duration-150"
                  >
                    Open my Codex
                  </Link>
                  <p className="text-[13px] text-tns-muted mt-tns-md">Instant access. Read it in your browser, yours to keep.</p>
                </>
              ) : (
                <>
                  <div className="flex justify-center mb-tns-md">
                    <PaywallButton
                      assessmentId={id}
                      email={assessment.email}
                      devMode={!isStripeConfigured()}
                    />
                  </div>
                  <p className="text-[14px] text-tns-fg mt-tns-xs mb-tns-xs">One hour with a sales coach costs 4x that, and tells you less.</p>
                  <p className="text-[12px] text-tns-muted">One-time payment · Instant access · Printable PDF, yours to keep.</p>
                </>
              )}
            </div>
          </Container>
        </Section>
      </div>

      {/* ── Footer ──────────────────────────────────────────────────── */}
      <Section size="md" as="footer" className="border-t border-tns-border">
        <Container maxWidth="prose">
          <p className="text-[12px] text-tns-muted text-center">
            © {new Date().getFullYear()} The Noble Seller · The Noble Quotient
          </p>
        </Container>
      </Section>

      {/* ── Sticky Share Bar ────────────────────────────────────────── */}
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          background: '#FAFAF7',
          borderTop: '1px solid #E0D8D0',
          padding: '12px 24px',
          paddingBottom: 'max(12px, env(safe-area-inset-bottom))',
          zIndex: 50,
        }}
      >
        <div style={{ maxWidth: '560px', margin: '0 auto', textAlign: 'center' }}>
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(resultsUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              background: '#722F37',
              color: '#FAFAF7',
              fontWeight: 600,
              fontSize: '14px',
              padding: '10px 24px',
              borderRadius: '6px',
              textDecoration: 'none',
            }}
          >
            Share your archetype on LinkedIn →
          </a>
        </div>
      </div>
    </div>
  )
}

'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { LinkButton } from '@/components/ui/Button'
import { clientStorage, type StoredAssessment } from '@/lib/storage'
import { DEV_SAMPLE_PAYLOAD } from '@/lib/dev-sample'
import {
  DIMENSION_LABELS,
  DIMENSION_ORDER,
  DIMENSION_STRENGTHS,
  DIMENSION_BLIND_SPOTS,
  type DimensionKey,
} from '@/types'

const COMPASS_TEASERS: Record<string, string> = {
  'Prospecting Comfort': 'how this score drains your pipeline without you noticing, and the eight-minute daily fix that stops it.',
  'Closing Confidence': 'why your asks keep landing soft, and the exact closing move that fits how you sell.',
  'Process-Oriented': "the deals slipping away while you think they're alive, and the fifteen-minute weekly system that catches them.",
  'Data-Driven': 'where running on instinct is costing you deals, and the simple way to put numbers behind your gut.',
  'EQ / Trust': "the buyer signals you're missing in the moment, and how to catch disengagement before it kills the deal.",
  'Mindset / Resilience': 'how rejection is quietly shaping your behavior, and the proven way to recover faster and keep moving.',
  'Problem Solving': "where you're solving the wrong problem for the buyer, and how to reframe it into a reason to act.",
  'Active Listening': 'the listening habit costing you the details that close deals, and the technique that fixes it on your next call.',
  'Customer-Centric': "the moments your own agenda leaks into the room, and how to put the buyer's outcome first without losing the deal.",
  'Curiosity': 'the questions you stop asking too early, and the discovery move that surfaces what the buyer never volunteers.',
  'Authenticity': 'where you slip into a performed version of yourself under pressure, and how to stay direct when the deal gets tense.',
  'Self-Improvement': "the gap between what you've learned and what you've actually changed, and how to close it for good.",
}

const COMPASS_TEASER_FALLBACK = 'the exact pattern this score creates, and the fix built for how you sell.'

interface Props {
  id: string
}

export default function FallbackResultsPage({ id }: Props) {
  const [data, setData] = useState<StoredAssessment | null>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (id === 'dev-test') {
      setData(DEV_SAMPLE_PAYLOAD)
      setLoaded(true)
      return
    }
    setData(clientStorage.loadAssessment(id))
    setLoaded(true)
  }, [id])

  if (!loaded) {
    return (
      <div className="min-h-screen bg-tns-bg flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-tns-accent border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-tns-bg text-tns-fg">
        <Section size="xl">
          <Container maxWidth="prose">
            <div className="text-center">
              <h1 className="font-medium text-tns-fg text-3xl md:text-4xl tracking-tight leading-tight mb-tns-md">
                Results not found.
              </h1>
              <p className="text-tns-muted text-[17px] leading-relaxed mb-tns-2xl max-w-[480px] mx-auto">
                Local data may have been cleared. Take the assessment again to see your results.
              </p>
              <LinkButton href="/quotient" variant="primary">
                Start over
              </LinkButton>
            </div>
          </Container>
        </Section>
      </div>
    )
  }

  const { archetypeResult: result, dimensionScores: scores } = data
  const { primary, secondary, tertiary, traits, styles } = result

  const hasCloseTie = [...traits, ...styles].some((r) => r.closeRankTie)

  const traitLabels: Record<string, string> = Object.fromEntries(traits.map((t) => [t.key, t.label]))
  const styleLabels: Record<string, string> = Object.fromEntries(styles.map((s) => [s.key, s.label]))

  const sortedTraits = [...traits].sort((a, b) => b.score - a.score)
  const sortedStyles = [...styles].sort((a, b) => b.score - a.score)

  const sortedDims = [...DIMENSION_ORDER].sort((a, b) => scores[b] - scores[a])
  const topDims: DimensionKey[] = sortedDims.slice(0, 3)
  const bottomDims: DimensionKey[] = sortedDims.slice(-3).reverse()

  return (
    <div className="min-h-screen bg-tns-bg text-tns-fg">
      <Section size="lg" className="pt-tns-md">
        <Container maxWidth="prose">
          {/* Dev mode banner */}
          <div className="mb-tns-lg bg-tns-bgAlt px-tns-md py-tns-sm text-xs text-tns-muted">
            Dev mode · localStorage · payment bypassed
          </div>

          {/* ── Primary Archetype ────────────────────────────────────── */}
          <header className="mb-tns-2xl bg-tns-accent text-tns-bg rounded-2xl px-tns-xl py-tns-2xl">
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
                  {primary.trait.score.toFixed(1)} / 5
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
                  {primary.style.score.toFixed(1)} / 5
                </p>
              </div>
            </div>
          </header>

          {/* ── Secondary + Tertiary ─────────────────────────────────── */}
          <section className="mb-tns-2xl pt-tns-lg border-t border-tns-border grid gap-tns-2xl md:grid-cols-2">
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
          <p className="mt-tns-sm mb-tns-2xl text-[17px] text-tns-fg leading-relaxed">
            You won&rsquo;t score high on everything. No one does. Your highest scores reveal your natural selling style and the reasons behind your wins. Your lowest scores aren&rsquo;t failures, they&rsquo;re where focused work pays off fastest.
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
                      <strong>In your Noble Compass:</strong>{' '}{COMPASS_TEASERS[DIMENSION_LABELS[dim]] ?? COMPASS_TEASER_FALLBACK}
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

          {hasCloseTie && (
            <p className="mt-tns-md text-xs text-tns-muted leading-relaxed">
              Where two scores sit within 0.1 of each other, the one shown first led narrowly.
            </p>
          )}

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

      {/* ── Codex CTA panel ─────────────────────────────────────────── */}
      <div className="border-t border-tns-border">
        <Section size="xl">
          <Container maxWidth="prose">
            <div className="bg-tns-bgAlt rounded-2xl px-tns-xl py-tns-2xl text-center">
              {/* 1. Eyebrow */}
              <p className="text-xs font-semibold uppercase tracking-widest text-tns-muted mb-tns-md">
                The {primary.name} Compass
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
              <ol className="text-left divide-y divide-tns-border mb-tns-lg">
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
              <p className="text-[13px] italic text-tns-muted mb-tns-lg">
                Powered by AI, built entirely from your results.
              </p>

              {/* 9–10. Button and reassurance (fallback bypasses payment) */}
              <div className="mb-tns-md">
                <Link
                  href={`/compass/${id}`}
                  className="inline-flex items-center justify-center w-full bg-tns-accent text-tns-bg font-medium px-6 py-3 rounded-lg hover:bg-tns-accentDark transition-colors duration-150"
                >
                  Unlock my Noble Compass
                </Link>
              </div>
              <p className="text-[14px] text-tns-fg mb-tns-xs">One hour with a sales coach costs 4x that, and tells you less.</p>
              <p className="text-[12px] text-tns-muted">One-time payment · Instant access · Printable PDF, yours to keep.</p>
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
    </div>
  )
}

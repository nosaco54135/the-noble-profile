/**
 * Noble Quotient scoring engine (pairwise-preference model).
 *
 *   Rule 2 — pairwise dimension scores: each of the 30 questions nudges its
 *            dimA/dimB pair based on how strongly the respondent preferred
 *            one option, mapped to a 1–5 display scale.
 *   Rule 3 — trait/style axis computation via simple dimension averages
 *   Rule 4 — dynamic archetype construction ("The {Trait} {Style}")
 *   Rule 6 — cascading tiebreaker hierarchy (axis score → max constituent
 *            dimension score → alpha)
 *   Rule 7 — low-variance detection (response std dev < 0.5)
 *
 * Call `scoreAssessment(responses)` with the 30 responses in CANONICAL ORDER
 * (P1 at index 0, …, P30 at index 29 — not the per-respondent shuffled
 * order). Each response is 1–5, where 5 = strongly prefer option A,
 * 3 = no preference, 1 = strongly prefer option B.
 */

import { QUESTIONS } from '@/lib/questions'
import type {
  DimensionKey,
  DimensionScores,
  DimensionDiagnostic,
  DimensionDiagnostics,
  RankedTrait,
  RankedStyle,
  ScoringResult,
  StyleKey,
  TraitKey,
  ArchetypeCombo,
} from '@/types'
import { DIMENSION_ORDER } from '@/types'

// ─── Trait / Style definitions (Part 4) ────────────────────────────────────

interface AxisDef<K extends string> {
  key: K
  label: string
  tagline: string
  dims: [DimensionKey, DimensionKey]
}

export const TRAITS: AxisDef<TraitKey>[] = [
  { key: 'empathic',   label: 'Empathic',   tagline: 'Reads the room — and makes the other person feel it.',  dims: ['eq_trust', 'curiosity'] },
  { key: 'curious',    label: 'Curious',    tagline: 'Asks one more question than most people ask.',           dims: ['curiosity', 'problem_solving'] },
  { key: 'methodical', label: 'Methodical', tagline: 'Runs a predictable, repeatable process.',               dims: ['process_oriented', 'data_driven'] },
  { key: 'resilient',  label: 'Resilient',  tagline: "Keeps dialing through the no's.",                       dims: ['mindset_resilience', 'prospecting_comfort'] },
  { key: 'devoted',    label: 'Devoted',    tagline: 'Earns loyalty by putting the customer first.',           dims: ['customer_centric', 'active_listening'] },
  { key: 'strategic',  label: 'Strategic',  tagline: 'Sees the non-obvious path to the outcome.',             dims: ['data_driven', 'problem_solving'] },
  { key: 'authentic',  label: 'Authentic',  tagline: 'Tells the truth even when it costs the deal.',          dims: ['authenticity', 'eq_trust'] },
  { key: 'adaptive',   label: 'Adaptive',   tagline: 'Learns faster than the market moves.',                  dims: ['learning_style', 'mindset_resilience'] },
]

export const STYLES: AxisDef<StyleKey>[] = [
  { key: 'hunter',     label: 'Hunter',     tagline: 'Opens conversations other people avoid.',               dims: ['prospecting_comfort', 'curiosity'] },
  { key: 'closer',     label: 'Closer',     tagline: 'Asks for the decision without flinching.',              dims: ['closing_confidence', 'problem_solving'] },
  { key: 'architect',  label: 'Architect',  tagline: 'Builds systems that compound over time.',               dims: ['process_oriented', 'learning_style'] },
  { key: 'cultivator', label: 'Cultivator', tagline: 'Grows relationships that keep coming back.',            dims: ['prospecting_comfort', 'active_listening'] },
  { key: 'advisor',    label: 'Advisor',    tagline: "Earns the right to recommend what's best.",             dims: ['customer_centric', 'problem_solving'] },
  { key: 'challenger', label: 'Challenger', tagline: 'Reframes the problem so the decision is clear.',        dims: ['data_driven', 'closing_confidence'] },
  { key: 'connector',  label: 'Connector',  tagline: 'Builds relationships that outlast the deal.',           dims: ['authenticity', 'customer_centric'] },
  { key: 'student',    label: 'Student',    tagline: 'Gets measurably better every quarter.',                 dims: ['learning_style', 'data_driven'] },
]

// ─── Rounding helper ────────────────────────────────────────────────────────

function round2(n: number): number {
  return Math.round(n * 100) / 100
}

// ─── Rule 2 — pairwise dimension score ─────────────────────────────────────

/**
 * Accumulate each question's signed contribution into its dimA/dimB pair.
 * n = (r - 3) / 2 maps a 1–5 response to [-1, +1]; dimA gets +n, dimB gets
 * -n (a "strongly prefer A" response pulls dimA up and dimB down).
 * Every dimension is touched by exactly 5 questions across the 30-item set.
 */
function computeDimensionTotals(responses: number[]): Record<DimensionKey, number> {
  const totals = {} as Record<DimensionKey, number>
  for (const dim of DIMENSION_ORDER) totals[dim] = 0

  for (const q of QUESTIONS) {
    const r = responses[q.canonicalIndex]
    const n = (r - 3) / 2
    totals[q.dimA] += n
    totals[q.dimB] -= n
  }

  return totals
}

// ─── Axis aggregation (Rule 3) ─────────────────────────────────────────────

function axisScore<K extends string>(def: AxisDef<K>, scores: DimensionScores): number {
  const [a, b] = def.dims
  return (scores[a] + scores[b]) / 2
}

// ─── Rule 6 — cascading tiebreakers ────────────────────────────────────────

/**
 * Higher of the axis's two constituent dimension display scores — used as
 * the first tiebreaker when two axes land on the same axisScore.
 */
function maxConstituentScore<K extends string>(def: AxisDef<K>, scores: DimensionScores): number {
  const [a, b] = def.dims
  return Math.max(scores[a], scores[b])
}

/**
 * Compare two axes for ranking. Returns negative if `a` should rank above `b`.
 * Primary sort: axisScore descending.
 * Tiebreakers (applied when axisScore is exactly equal):
 *   L1: higher maximum constituent dimension display score
 *   L2: alphabetical order of the axis label (stable & deterministic)
 */
function compareAxes<K extends string>(a: AxisDef<K>, b: AxisDef<K>, scores: DimensionScores): number {
  const sa = axisScore(a, scores)
  const sb = axisScore(b, scores)
  if (sa !== sb) return sb - sa

  const ma = maxConstituentScore(a, scores)
  const mb = maxConstituentScore(b, scores)
  if (ma !== mb) return mb - ma

  return a.label.localeCompare(b.label)
}

// ─── Ranking with close-tie flags ──────────────────────────────────────────

function rankTraits(scores: DimensionScores): RankedTrait[] {
  const sorted = [...TRAITS].sort((a, b) => compareAxes(a, b, scores))
  return sorted.map((def, i) => {
    const score = axisScore(def, scores)
    // Close-tie flag: within 0.1 of the neighbor above OR below in the ranking
    const neighbors: TraitKey[] = []
    const prev = sorted[i - 1]
    const next = sorted[i + 1]
    if (prev && Math.abs(axisScore(prev, scores) - score) <= 0.1) neighbors.push(prev.key)
    if (next && Math.abs(axisScore(next, scores) - score) <= 0.1) neighbors.push(next.key)
    return {
      key: def.key,
      label: def.label,
      score,
      matchPercentage: Math.round((score / 5) * 100),
      tagline: def.tagline,
      closeRankTie: neighbors.length > 0,
      tiedWith: neighbors,
    }
  })
}

function rankStyles(scores: DimensionScores): RankedStyle[] {
  const sorted = [...STYLES].sort((a, b) => compareAxes(a, b, scores))
  return sorted.map((def, i) => {
    const score = axisScore(def, scores)
    const neighbors: StyleKey[] = []
    const prev = sorted[i - 1]
    const next = sorted[i + 1]
    if (prev && Math.abs(axisScore(prev, scores) - score) <= 0.1) neighbors.push(prev.key)
    if (next && Math.abs(axisScore(next, scores) - score) <= 0.1) neighbors.push(next.key)
    return {
      key: def.key,
      label: def.label,
      score,
      matchPercentage: Math.round((score / 5) * 100),
      tagline: def.tagline,
      closeRankTie: neighbors.length > 0,
      tiedWith: neighbors,
    }
  })
}

// ─── Rule 4 — archetype construction ───────────────────────────────────────

function makeArchetype(trait: RankedTrait, style: RankedStyle): ArchetypeCombo {
  return {
    name: `${trait.label} ${style.label}`,
    trait,
    style,
    matchPercentage: Math.round((trait.matchPercentage + style.matchPercentage) / 2),
  }
}

// ─── Rule 7 — response standard deviation ──────────────────────────────────

function stdDev(values: number[]): number {
  if (values.length === 0) return 0
  const mean = values.reduce((s, v) => s + v, 0) / values.length
  const variance = values.reduce((s, v) => s + (v - mean) ** 2, 0) / values.length
  return Math.sqrt(variance)
}

// ─── Entry point ───────────────────────────────────────────────────────────

/**
 * Score the 30 assessment responses.
 * Responses must be in canonical order (P1=index 0 … P30=index 29), 1–5 integers.
 */
export function scoreAssessment(responses: number[]): ScoringResult {
  if (responses.length !== QUESTIONS.length) {
    throw new Error(`scoreAssessment: expected ${QUESTIONS.length} responses, got ${responses.length}`)
  }

  // ── Rule 2: per-dimension pairwise scores ──────────────────────────────
  const totals = computeDimensionTotals(responses)
  const dimensionScores = {} as DimensionScores
  const diagnostics = {} as DimensionDiagnostics

  for (const dim of DIMENSION_ORDER) {
    const mean = totals[dim] / 5
    const display = round2(3 + 2 * mean)

    dimensionScores[dim] = display
    // DEPRECATED: forward/reverse split no longer applies under the pairwise
    // model. Diagnostics is kept only for shape compatibility with existing
    // callers (e.g. the Compass prompt) and will be removed in the Compass
    // rework.
    const diagnostic: DimensionDiagnostic = {
      display,
      raw: mean,
      forwardDisplay: null,
      reverseDisplay: null,
      inconsistent: false,
    }
    diagnostics[dim] = diagnostic
  }

  const inconsistencies: DimensionKey[] = []

  // ── Rule 3 + 6: rank traits & styles with cascading tiebreakers
  const traits = rankTraits(dimensionScores)
  const styles = rankStyles(dimensionScores)

  // ── Rule 4: dynamic archetype construction
  const primary   = makeArchetype(traits[0], styles[0])
  const secondary = makeArchetype(traits[1], styles[1])
  const tertiary  = makeArchetype(traits[2], styles[2])

  // ── Rank margins — how decisively the top axis beat the runner-up
  const traitMargin = round2(traits[0].score - traits[1].score)
  const styleMargin = round2(styles[0].score - styles[1].score)

  // ── Response-pattern flags
  const neutralCount = responses.filter((r) => r === 3).length
  const neutralHeavy = neutralCount / responses.length >= 0.5

  const extremeCount = responses.filter((r) => r === 1 || r === 5).length
  const extremeHeavy = extremeCount / responses.length >= 0.7

  // ── Rule 7: low-variance flag on raw responses
  const responseStdDev = stdDev(responses)
  const lowVariance = responseStdDev < 0.5

  return {
    dimensionScores,
    diagnostics,
    traits,
    styles,
    primary,
    secondary,
    tertiary,
    inconsistencies,
    responseStdDev,
    lowVariance,
    traitMargin,
    styleMargin,
    neutralHeavy,
    extremeHeavy,
  }
}

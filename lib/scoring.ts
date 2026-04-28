/**
 * Noble Quotient scoring engine.
 *
 * Implements Rules 2–7 from the build spec:
 *   Rule 2 — weighted-normalized dimension scores, mapped to a 1–5 display scale
 *   Rule 3 — trait/style axis computation via simple dimension averages
 *   Rule 4 — dynamic archetype construction ("The {Trait} {Style}")
 *   Rule 5 — forward-vs-reverse consistency flags per dimension (gap > 1.5)
 *   Rule 6 — cascading tiebreaker hierarchy (dimension → top-2 raw → all raw → alpha)
 *   Rule 7 — low-variance detection (response std dev < 0.5)
 *
 * NOTE: Weights for R1–R6 already encode reverse direction via their sign — no
 * response inversion is applied. Raw 1–5 responses are fed directly into the
 * weighted sum for both forward and reverse questions. The `reverse` flag on
 * each question is retained only for consistency detection (Rule 5) and UI.
 *
 * Call `scoreAssessment(responses)` with the 25 responses in CANONICAL ORDER
 * (Q1 at index 0, …, Q25 at index 24 — not the per-respondent shuffled order).
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

const TRAITS: AxisDef<TraitKey>[] = [
  { key: 'empathic',   label: 'Empathic',   tagline: 'Reads the room — and makes the other person feel it.',  dims: ['eq_trust', 'curiosity'] },
  { key: 'curious',    label: 'Curious',    tagline: 'Asks one more question than most people ask.',           dims: ['curiosity', 'problem_solving'] },
  { key: 'methodical', label: 'Methodical', tagline: 'Runs a predictable, repeatable process.',               dims: ['process_oriented', 'data_driven'] },
  { key: 'resilient',  label: 'Resilient',  tagline: "Keeps dialing through the no's.",                       dims: ['mindset_resilience', 'prospecting_comfort'] },
  { key: 'devoted',    label: 'Devoted',    tagline: 'Earns loyalty by putting the customer first.',           dims: ['customer_centric', 'active_listening'] },
  { key: 'strategic',  label: 'Strategic',  tagline: 'Sees the non-obvious path to the outcome.',             dims: ['data_driven', 'problem_solving'] },
  { key: 'authentic',  label: 'Authentic',  tagline: 'Tells the truth even when it costs the deal.',          dims: ['authenticity', 'eq_trust'] },
  { key: 'adaptive',   label: 'Adaptive',   tagline: 'Learns faster than the market moves.',                  dims: ['learning_style', 'mindset_resilience'] },
]

const STYLES: AxisDef<StyleKey>[] = [
  { key: 'hunter',     label: 'Hunter',     tagline: 'Opens conversations other people avoid.',               dims: ['prospecting_comfort', 'curiosity'] },
  { key: 'closer',     label: 'Closer',     tagline: 'Asks for the decision without flinching.',              dims: ['closing_confidence', 'problem_solving'] },
  { key: 'architect',  label: 'Architect',  tagline: 'Builds systems that compound over time.',               dims: ['process_oriented', 'learning_style'] },
  { key: 'cultivator', label: 'Cultivator', tagline: 'Grows relationships that keep coming back.',            dims: ['prospecting_comfort', 'active_listening'] },
  { key: 'advisor',    label: 'Advisor',    tagline: "Earns the right to recommend what's best.",             dims: ['customer_centric', 'problem_solving'] },
  { key: 'challenger', label: 'Challenger', tagline: 'Reframes the problem so the decision is clear.',        dims: ['data_driven', 'closing_confidence'] },
  { key: 'connector',  label: 'Connector',  tagline: 'Builds relationships that outlast the deal.',           dims: ['authenticity', 'customer_centric'] },
  { key: 'student',    label: 'Student',    tagline: 'Gets measurably better every quarter.',                 dims: ['learning_style', 'mindset_resilience'] },
]

// ─── Rule 2 — weighted-normalized dimension score ─────────────────────────

function rawToDisplay(raw: number): number {
  // raw ∈ [-1, +1] → display ∈ [1, 5]
  return ((raw + 1) / 2) * 4 + 1
}

/**
 * Compute the normalized raw score for one dimension, optionally restricting
 * to forward or reverse questions only.
 *
 * Returns null when no contributing question has a non-zero weight within
 * the requested filter (so the caller can distinguish "dimension not covered"
 * from "score near zero").
 */
function rawDimensionScore(
  dim: DimensionKey,
  responses: number[],
  filter: 'all' | 'forward-only' | 'reverse-only',
): number | null {
  let numerator = 0
  let denominator = 0

  for (const q of QUESTIONS) {
    if (filter === 'forward-only' && q.reverse) continue
    if (filter === 'reverse-only' && !q.reverse) continue

    const w = q.weights[dim]
    if (w === undefined || w === 0) continue

    const resp = responses[q.canonicalIndex]
    if (typeof resp !== 'number') continue

    // Map raw 1–5 response to [-1, +1]. No inversion for reverse questions —
    // the sign of the weight already encodes direction.
    const normResp = (resp - 3) / 2
    numerator += w * normResp
    denominator += Math.abs(w)
  }

  if (denominator === 0) return null
  return numerator / denominator
}

// ─── Axis aggregation (Rule 3) ─────────────────────────────────────────────

function axisScore<K extends string>(def: AxisDef<K>, scores: DimensionScores): number {
  const [a, b] = def.dims
  return (scores[a] + scores[b]) / 2
}

// ─── Rule 6 — cascading tiebreakers ────────────────────────────────────────

/**
 * Compare two axes for ranking. Returns negative if `a` should rank above `b`.
 * Tiebreakers (applied when axis scores are within 0.1):
 *   L1: higher aggregate dimension score (already captured by axisScore)
 *   L2: higher sum of the top-2 raw responses contributing to the axis's dims
 *   L3: higher sum of ALL raw responses contributing to the axis's dims
 *   L4: alphabetical order of the axis label (stable & deterministic)
 */
function compareAxes<K extends string>(
  a: AxisDef<K>,
  b: AxisDef<K>,
  scores: DimensionScores,
  responses: number[],
): { cmp: number; tied: boolean } {
  const sa = axisScore(a, scores)
  const sb = axisScore(b, scores)
  if (Math.abs(sa - sb) > 0.1) return { cmp: sb - sa, tied: false }

  // Level 2: sum of top-2 raw responses for each axis's two dimensions
  const l2a = topNRawSum(a, responses, 2)
  const l2b = topNRawSum(b, responses, 2)
  if (l2a !== l2b) return { cmp: l2b - l2a, tied: true }

  // Level 3: sum of ALL raw responses for each axis's two dimensions
  const l3a = topNRawSum(a, responses, Infinity)
  const l3b = topNRawSum(b, responses, Infinity)
  if (l3a !== l3b) return { cmp: l3b - l3a, tied: true }

  // Level 4: alphabetical by label (stable + deterministic)
  return { cmp: a.label.localeCompare(b.label), tied: true }
}

/**
 * Sum the top-N raw responses across all questions whose weights touch either
 * of the axis's two contributing dimensions. For tiebreaking we want the
 * signed contribution to the axis, so multiply each response by the sign of
 * the question's strongest weight on the axis's dimensions.
 */
function topNRawSum<K extends string>(def: AxisDef<K>, responses: number[], n: number): number {
  const values: number[] = []
  for (const q of QUESTIONS) {
    // Pick the weight with the largest absolute value among the axis's two dims
    let best = 0
    for (const d of def.dims) {
      const w = q.weights[d]
      if (w !== undefined && Math.abs(w) > Math.abs(best)) best = w
    }
    if (best === 0) continue
    const raw = responses[q.canonicalIndex]
    if (typeof raw !== 'number') continue
    // Signed contribution: high raw on a negative-weight question contributes
    // negatively to this axis, so the tiebreaker reflects the true signal.
    values.push(best < 0 ? 6 - raw : raw)
  }
  values.sort((a, b) => b - a)
  return values.slice(0, n).reduce((s, v) => s + v, 0)
}

// ─── Ranking with close-tie flags ──────────────────────────────────────────

function rankTraits(scores: DimensionScores, responses: number[]): RankedTrait[] {
  const sorted = [...TRAITS].sort((a, b) => compareAxes(a, b, scores, responses).cmp)
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

function rankStyles(scores: DimensionScores, responses: number[]): RankedStyle[] {
  const sorted = [...STYLES].sort((a, b) => compareAxes(a, b, scores, responses).cmp)
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
 * Score the 25 assessment responses.
 * Responses must be in canonical order (Q1=index 0 … Q25=index 24), 1–5 integers.
 */
export function scoreAssessment(responses: number[]): ScoringResult {
  if (responses.length !== QUESTIONS.length) {
    throw new Error(`scoreAssessment: expected ${QUESTIONS.length} responses, got ${responses.length}`)
  }

  // ── Rule 2: per-dimension normalized scores (all, forward-only, reverse-only)
  const dimensionScores = {} as DimensionScores
  const diagnostics = {} as DimensionDiagnostics
  const inconsistencies: DimensionKey[] = []

  for (const dim of DIMENSION_ORDER) {
    const rawAll     = rawDimensionScore(dim, responses, 'all')
    const rawForward = rawDimensionScore(dim, responses, 'forward-only')
    const rawReverse = rawDimensionScore(dim, responses, 'reverse-only')

    const display        = rawAll === null ? 3 : rawToDisplay(rawAll)
    const forwardDisplay = rawForward === null ? null : rawToDisplay(rawForward)
    const reverseDisplay = rawReverse === null ? null : rawToDisplay(rawReverse)

    const inconsistent =
      forwardDisplay !== null &&
      reverseDisplay !== null &&
      Math.abs(forwardDisplay - reverseDisplay) > 1.5

    if (inconsistent) inconsistencies.push(dim)

    dimensionScores[dim] = display
    const diagnostic: DimensionDiagnostic = {
      display,
      raw: rawAll ?? 0,
      forwardDisplay,
      reverseDisplay,
      inconsistent,
    }
    diagnostics[dim] = diagnostic
  }

  // ── Rule 3 + 6: rank traits & styles with cascading tiebreakers
  const traits = rankTraits(dimensionScores, responses)
  const styles = rankStyles(dimensionScores, responses)

  // ── Rule 4: dynamic archetype construction
  const primary   = makeArchetype(traits[0], styles[0])
  const secondary = makeArchetype(traits[1], styles[1])
  const tertiary  = makeArchetype(traits[2], styles[2])

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
  }
}

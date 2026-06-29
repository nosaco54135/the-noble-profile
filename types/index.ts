// ─── Dimension keys ────────────────────────────────────────────────────────

export type DimensionKey =
  | 'eq_trust'
  | 'active_listening'
  | 'curiosity'
  | 'mindset_resilience'
  | 'closing_confidence'
  | 'prospecting_comfort'
  | 'data_driven'
  | 'authenticity'
  | 'process_oriented'
  | 'problem_solving'
  | 'customer_centric'
  | 'learning_style'

export type TraitKey =
  | 'empathic'
  | 'curious'
  | 'methodical'
  | 'resilient'
  | 'devoted'
  | 'strategic'
  | 'authentic'
  | 'adaptive'

export type StyleKey =
  | 'hunter'
  | 'closer'
  | 'architect'
  | 'cultivator'
  | 'advisor'
  | 'challenger'
  | 'connector'
  | 'student'

export type PaymentStatus = 'pending' | 'paid'

// ─── Questions ─────────────────────────────────────────────────────────────

/**
 * A question can contribute to multiple dimensions with signed weights.
 * Raw 1–5 responses are used directly for both forward and reverse questions —
 * no inversion is applied. Weight signs encode direction (Rule 1).
 */
export type DimensionWeights = Partial<Record<DimensionKey, number>>

export interface Question {
  /** Stable external id, e.g. "Q1" or "R3" */
  id: string
  /** Order index in the canonical (un-shuffled) sequence, 0-based */
  canonicalIndex: number
  text: string
  /** Forward-scored uses raw response; reverse inverts first */
  reverse: boolean
  weights: DimensionWeights
}

// ─── Dimension scores ──────────────────────────────────────────────────────

export type DimensionScores = Record<DimensionKey, number>

/** Per-dimension diagnostic breakdown from the scoring engine. */
export interface DimensionDiagnostic {
  /** Weighted-normalized score in 1–5 display scale */
  display: number
  /** Raw normalized score in [-1, +1] */
  raw: number
  /** Display score computed from forward-scored questions only (or null if none) */
  forwardDisplay: number | null
  /** Display score computed from reverse-scored questions only (or null if none) */
  reverseDisplay: number | null
  /** True if |forwardDisplay − reverseDisplay| > 1.5 (Rule 5) */
  inconsistent: boolean
}

export type DimensionDiagnostics = Record<DimensionKey, DimensionDiagnostic>

// ─── Ranked axes ───────────────────────────────────────────────────────────

export interface RankedTrait {
  key: TraitKey
  label: string            // e.g. "Empathic"
  score: number            // 1–5 display
  matchPercentage: number  // round((score / 5) * 100)
  tagline: string
  /** True if this trait's rank is within 0.1 of the next (Rule 6) */
  closeRankTie: boolean
  /** If closeRankTie, which other trait(s) it nearly tied with */
  tiedWith: TraitKey[]
}

export interface RankedStyle {
  key: StyleKey
  label: string
  score: number
  matchPercentage: number
  tagline: string
  closeRankTie: boolean
  tiedWith: StyleKey[]
}

/** Dynamic archetype combination: one trait + one style (64 possible). */
export interface ArchetypeCombo {
  /** e.g. "Empathic Advisor" — constructed at runtime, never hardcoded */
  name: string
  trait: RankedTrait
  style: RankedStyle
  /** Combined match % = round(avg(trait.matchPercentage, style.matchPercentage)) */
  matchPercentage: number
}

// ─── Scoring result ────────────────────────────────────────────────────────

export interface ScoringResult {
  dimensionScores: DimensionScores
  /** Full per-dimension diagnostic (forward/reverse splits, inconsistency flags) */
  diagnostics: DimensionDiagnostics
  /** All 8 traits ranked highest → lowest */
  traits: RankedTrait[]
  /** All 8 styles ranked highest → lowest */
  styles: RankedStyle[]
  /** trait[0] × style[0] */
  primary: ArchetypeCombo
  /** trait[1] × style[1] */
  secondary: ArchetypeCombo
  /** trait[2] × style[2] */
  tertiary: ArchetypeCombo
  /** Per-dimension inconsistency flags surfaced for Claude prompt context (Rule 5) */
  inconsistencies: DimensionKey[]
  /** Standard deviation of the 25 raw responses (for Rule 7) */
  responseStdDev: number
  /**
   * True if responseStdDev < 0.5 — surface the "retake" message and suppress
   * archetype display (Rule 7). Callers should treat primary/secondary/tertiary
   * as not meaningful when this is true.
   */
  lowVariance: boolean
}

// ─── Assessment record (Supabase + fallback) ───────────────────────────────

/**
 * Canonical assessment record as stored (Supabase or localStorage).
 * Column names here match the snake_case schema in supabase/schema.sql.
 */
export interface Assessment {
  id: string
  email: string
  is_subscriber: boolean
  /** Responses in original canonical question order (Q1=index 0, …, Q25=index 24) */
  responses: number[]
  /** Shuffle seed used to generate the per-respondent question order */
  seed: string
  dimension_scores: DimensionScores
  archetype_result: ScoringResult
  payment_status: PaymentStatus
  stripe_session_id: string | null
  codex: string | null
  created_at: string
}

// ─── Labels ────────────────────────────────────────────────────────────────

export const DIMENSION_LABELS: Record<DimensionKey, string> = {
  eq_trust:            'EQ / Trust',
  active_listening:    'Active Listening',
  curiosity:           'Curiosity',
  mindset_resilience:  'Mindset / Resilience',
  closing_confidence:  'Closing Confidence',
  prospecting_comfort: 'Prospecting Comfort',
  data_driven:         'Data-Driven',
  authenticity:        'Authenticity',
  process_oriented:    'Process-Oriented',
  problem_solving:     'Problem Solving',
  customer_centric:    'Customer-Centric',
  learning_style:      'Self-Improvement',
}

export const DIMENSION_ORDER: DimensionKey[] = [
  'eq_trust',
  'active_listening',
  'curiosity',
  'mindset_resilience',
  'closing_confidence',
  'prospecting_comfort',
  'data_driven',
  'authenticity',
  'process_oriented',
  'problem_solving',
  'customer_centric',
  'learning_style',
]

export const LIKERT_LABELS: Record<number, string> = {
  1: 'Strongly Disagree',
  2: 'Disagree',
  3: 'Neutral',
  4: 'Agree',
  5: 'Strongly Agree',
}

export const PRIMING_INSTRUCTION =
  'On most questions, both options describe real sellers. Pick the one that\'s closer to how you actually work, not the one that sounds better.'

/**
 * Generic strength copy per dimension. Used on the free results page to render
 * the user's top-3 scoring dimensions as "strengths" without personalization.
 */
export const DIMENSION_STRENGTHS: Record<DimensionKey, string> = {
  eq_trust:            'You read the room and respond to what people actually feel, not just what they say. Prospects tell you things they don\u2019t tell other reps.',
  active_listening:    'You remember the specifics, the exact phrasing, the side comments, and that recall compounds across a sales cycle.',
  curiosity:           'You pull threads other reps drop. One more question than most people ask is usually the one that unlocks the deal.',
  mindset_resilience:  'You keep working through the no\u2019s without stepping away. Your pipeline stays full because you stay at it.',
  closing_confidence:  'You ask directly and you ask early. Prospects know where they stand with you, and they respect it.',
  prospecting_comfort: 'You start new conversations on purpose. Top-of-funnel is a scheduled activity for you, not a panic move.',
  data_driven:         'You lead with business impact and you can defend the numbers behind it. Decision-makers take you seriously.',
  authenticity:        'You tell the truth even when it costs the deal. That\u2019s the reason your best customers refer you.',
  process_oriented:    'You do the boring reps, CRM notes the same day, follow-ups on schedule. That consistency is what quietly wins deals.',
  problem_solving:     'You find the creative path when the standard one is blocked. Deals move forward because you think around corners.',
  customer_centric:    'You recommend what\u2019s actually right for them, even when it isn\u2019t the bigger contract. That\u2019s how long-term accounts get built.',
  learning_style:      'You get measurably better every quarter. You seek feedback and act on it without being asked.',
}

/**
 * Generic blind-spot copy per dimension. Used on the free results page to
 * render the user's bottom-3 scoring dimensions as areas to focus on.
 */
export const DIMENSION_BLIND_SPOTS: Record<DimensionKey, string> = {
  eq_trust:            'You may miss the moment a prospect\u2019s energy shifts. When you push past those signals, trust erodes without you noticing.',
  active_listening:    'You remember the topic but not the specifics. That costs you in follow-ups where recall signals that you actually care.',
  curiosity:           'You tend to counter objections before exploring them. The first question is usually the wrong one. Get curious before you respond.',
  mindset_resilience:  'A run of no\u2019s takes you off the phone. The reps who grind through the same stretch are the ones who make quota.',
  closing_confidence:  'You give prospects space when they hesitate instead of asking what\u2019s holding them back. Hesitation is information. Go find it.',
  prospecting_comfort: 'You work existing deals instead of opening new ones. That feels safe but it starves your pipeline 60 days out.',
  data_driven:         'You pitch features before business impact. Executives buy outcomes. Lead with cost saved, revenue gained, or time recovered.',
  authenticity:        'You soften hard truths to protect the deal. Prospects feel it, and they trust the rep who tells them the thing they didn\u2019t want to hear.',
  process_oriented:    'CRM notes go stale and follow-ups slip. Systemize what you already know works or you will keep losing deals to admin drift.',
  problem_solving:     'You escalate or stall when the standard path is blocked. Build a habit of finding one creative alternative before asking for help.',
  customer_centric:    'You stay aligned to the deal more than the customer. Revisit whether your recommendation is actually right for their situation.',
  learning_style:      'You don\u2019t seek feedback unprompted. The reps who listen to their own calls and ask for specific critique grow twice as fast.',
}

export const COMPASS_TEASERS: Record<string, string> = {
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

export const COMPASS_TEASER_FALLBACK = 'the exact pattern this score creates, and the fix built for how you sell.'

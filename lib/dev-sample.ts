/**
 * DEV ONLY — Sample assessment for /quotient/results/dev-test.
 * Allows design iteration on the results page without running an assessment.
 * Not gated behind NODE_ENV. Data is fake; URL is non-obvious.
 *
 * Primary:   The Empathic Closer  (empathic trait × closer style)
 * Secondary: The Curious Advisor  (curious trait  × advisor style)
 * Tertiary:  The Authentic Connector (authentic trait × connector style)
 */

import type { StoredAssessment } from '@/lib/storage'
import type {
  DimensionDiagnostic,
  DimensionDiagnostics,
  DimensionScores,
  RankedTrait,
  RankedStyle,
  ArchetypeCombo,
  ScoringResult,
} from '@/types'

// ─── Dimension scores ──────────────────────────────────────────────────────

const SCORES: DimensionScores = {
  eq_trust:            4.3,
  curiosity:           4.1,
  closing_confidence:  3.9,
  problem_solving:     3.7,
  customer_centric:    3.5,
  active_listening:    3.4,
  authenticity:        3.3,
  mindset_resilience:  3.0,
  learning_style:      2.7,
  data_driven:         2.7,
  prospecting_comfort: 2.6,
  process_oriented:    2.5,
}

function pct(score: number): number {
  return Math.round((score / 5) * 100)
}

function diag(display: number): DimensionDiagnostic {
  return {
    display,
    raw: (display - 1) / 2 - 1,
    forwardDisplay: display,
    reverseDisplay: null,
    inconsistent: false,
  }
}

const DIAGNOSTICS: DimensionDiagnostics = {
  eq_trust:            diag(SCORES.eq_trust),
  curiosity:           diag(SCORES.curiosity),
  closing_confidence:  diag(SCORES.closing_confidence),
  problem_solving:     diag(SCORES.problem_solving),
  customer_centric:    diag(SCORES.customer_centric),
  active_listening:    diag(SCORES.active_listening),
  authenticity:        diag(SCORES.authenticity),
  mindset_resilience:  diag(SCORES.mindset_resilience),
  learning_style:      diag(SCORES.learning_style),
  data_driven:         diag(SCORES.data_driven),
  prospecting_comfort: diag(SCORES.prospecting_comfort),
  process_oriented:    diag(SCORES.process_oriented),
}

// ─── Ranked traits (highest → lowest) ─────────────────────────────────────
// Scores: empathic=(eq_trust+curiosity)/2=4.2, curious=(curiosity+problem_solving)/2=3.9,
//         authentic=(authenticity+eq_trust)/2=3.8, devoted=(customer_centric+active_listening)/2=3.45,
//         strategic=(data_driven+problem_solving)/2=3.2, adaptive=(learning_style+mindset_resilience)/2=2.85,
//         resilient=(mindset_resilience+prospecting_comfort)/2=2.8, methodical=(process_oriented+data_driven)/2=2.6

const TRAITS: RankedTrait[] = [
  {
    key: 'empathic',
    label: 'Empathic',
    score: 4.2,
    matchPercentage: pct(4.2),   // 84
    tagline: 'Reads the room — and makes the other person feel it.',
    closeRankTie: false,
    tiedWith: [],
  },
  {
    key: 'curious',
    label: 'Curious',
    score: 3.9,
    matchPercentage: pct(3.9),   // 78
    tagline: 'Asks one more question than most people ask.',
    closeRankTie: true,
    tiedWith: ['authentic'],
  },
  {
    key: 'authentic',
    label: 'Authentic',
    score: 3.8,
    matchPercentage: pct(3.8),   // 76
    tagline: 'Tells the truth even when it costs the deal.',
    closeRankTie: true,
    tiedWith: ['curious'],
  },
  {
    key: 'devoted',
    label: 'Devoted',
    score: 3.45,
    matchPercentage: pct(3.45),  // 69
    tagline: 'Earns loyalty by putting the customer first.',
    closeRankTie: false,
    tiedWith: [],
  },
  {
    key: 'strategic',
    label: 'Strategic',
    score: 3.2,
    matchPercentage: pct(3.2),   // 64
    tagline: 'Sees the non-obvious path to the outcome.',
    closeRankTie: false,
    tiedWith: [],
  },
  {
    key: 'adaptive',
    label: 'Adaptive',
    score: 2.85,
    matchPercentage: pct(2.85),  // 57
    tagline: 'Learns faster than the market moves.',
    closeRankTie: false,
    tiedWith: [],
  },
  {
    key: 'resilient',
    label: 'Resilient',
    score: 2.8,
    matchPercentage: pct(2.8),   // 56
    tagline: "Keeps dialing through the no's.",
    closeRankTie: false,
    tiedWith: [],
  },
  {
    key: 'methodical',
    label: 'Methodical',
    score: 2.6,
    matchPercentage: pct(2.6),   // 52
    tagline: 'Runs a predictable, repeatable process.',
    closeRankTie: false,
    tiedWith: [],
  },
]

// ─── Ranked styles (highest → lowest) ─────────────────────────────────────
// Scores: closer=(closing_confidence+problem_solving)/2=3.8, advisor=(customer_centric+problem_solving)/2=3.6,
//         connector=(authenticity+customer_centric)/2=3.4, hunter=(prospecting_comfort+curiosity)/2=3.35,
//         challenger=(data_driven+closing_confidence)/2=3.3, cultivator=(prospecting_comfort+active_listening)/2=3.0,
//         student=(learning_style+mindset_resilience)/2=2.85, architect=(process_oriented+learning_style)/2=2.6

const STYLES: RankedStyle[] = [
  {
    key: 'closer',
    label: 'Closer',
    score: 3.8,
    matchPercentage: pct(3.8),   // 76
    tagline: 'Asks for the decision without flinching.',
    closeRankTie: false,
    tiedWith: [],
  },
  {
    key: 'advisor',
    label: 'Advisor',
    score: 3.6,
    matchPercentage: pct(3.6),   // 72
    tagline: "Earns the right to recommend what's best.",
    closeRankTie: false,
    tiedWith: [],
  },
  {
    key: 'connector',
    label: 'Connector',
    score: 3.4,
    matchPercentage: pct(3.4),   // 68
    tagline: 'Builds relationships that outlast the deal.',
    closeRankTie: true,
    tiedWith: ['hunter'],
  },
  {
    key: 'hunter',
    label: 'Hunter',
    score: 3.35,
    matchPercentage: pct(3.35),  // 67
    tagline: 'Opens conversations other people avoid.',
    closeRankTie: true,
    tiedWith: ['connector', 'challenger'],
  },
  {
    key: 'challenger',
    label: 'Challenger',
    score: 3.3,
    matchPercentage: pct(3.3),   // 66
    tagline: 'Reframes the problem so the decision is clear.',
    closeRankTie: true,
    tiedWith: ['hunter'],
  },
  {
    key: 'cultivator',
    label: 'Cultivator',
    score: 3.0,
    matchPercentage: pct(3.0),   // 60
    tagline: 'Grows relationships that keep coming back.',
    closeRankTie: false,
    tiedWith: [],
  },
  {
    key: 'student',
    label: 'Student',
    score: 2.85,
    matchPercentage: pct(2.85),  // 57
    tagline: 'Gets measurably better every quarter.',
    closeRankTie: false,
    tiedWith: [],
  },
  {
    key: 'architect',
    label: 'Architect',
    score: 2.6,
    matchPercentage: pct(2.6),   // 52
    tagline: 'Builds systems that compound over time.',
    closeRankTie: false,
    tiedWith: [],
  },
]

// ─── Archetypes ────────────────────────────────────────────────────────────

const PRIMARY: ArchetypeCombo = {
  name: 'Empathic Closer',
  trait: TRAITS[0],
  style: STYLES[0],
  matchPercentage: Math.round((TRAITS[0].matchPercentage + STYLES[0].matchPercentage) / 2), // 80
}

const SECONDARY: ArchetypeCombo = {
  name: 'Curious Advisor',
  trait: TRAITS[1],
  style: STYLES[1],
  matchPercentage: Math.round((TRAITS[1].matchPercentage + STYLES[1].matchPercentage) / 2), // 75
}

const TERTIARY: ArchetypeCombo = {
  name: 'Authentic Connector',
  trait: TRAITS[2],
  style: STYLES[2],
  matchPercentage: Math.round((TRAITS[2].matchPercentage + STYLES[2].matchPercentage) / 2), // 72
}

// ─── Full scoring result ───────────────────────────────────────────────────

const ARCHETYPE_RESULT: ScoringResult = {
  dimensionScores: SCORES,
  diagnostics: DIAGNOSTICS,
  traits: TRAITS,
  styles: STYLES,
  primary: PRIMARY,
  secondary: SECONDARY,
  tertiary: TERTIARY,
  inconsistencies: [],
  responseStdDev: 1.55,
  lowVariance: false,
}

// ─── Exported payload ──────────────────────────────────────────────────────

export const DEV_SAMPLE_PAYLOAD: StoredAssessment = {
  id: 'dev-test',
  email: 'dev@thenobleseller.com',
  isSubscriber: true,
  responses: [5,1,5,4,5,2,5,5,5,2,4,5,3,4,5,5,2,3,3,2,1,5,5,1,1],
  seed: 'dev-seed',
  dimensionScores: SCORES,
  archetypeResult: ARCHETYPE_RESULT,
  paymentStatus: 'pending',
  createdAt: '2026-05-01T00:00:00Z',
}

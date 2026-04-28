/**
 * Runs the three validation scenarios against the scoring engine and
 * prints the full output for manual review.
 *
 * Usage:  npx tsx scripts/validate-scoring.ts
 */
import { scoreAssessment } from '../lib/scoring'
import { QUESTIONS } from '../lib/questions'
import { DIMENSION_LABELS, DIMENSION_ORDER } from '../types'

interface Scenario {
  name: string
  expectedPrimary: string
  expectedSecondary: string
  expectedTertiary: string
  responses: number[]
}

const scenarios: Scenario[] = [
  {
    name: 'Scenario 1 — Empathic Connector profile',
    expectedPrimary:   'The Authentic Connector',
    expectedSecondary: 'The Empathic Advisor',
    expectedTertiary:  'The Devoted Cultivator',
    responses: [4, 5, 5, 3, 5, 5, 2, 2, 2, 2, 2, 2, 5, 5, 4, 3, 4, 2, 1, 4, 5, 5, 2, 4, 1],
  },
  {
    name: 'Scenario 2 — Methodical Challenger profile',
    expectedPrimary:   'The Strategic Challenger',
    expectedSecondary: 'The Methodical Closer',
    expectedTertiary:  'The Resilient Student',
    responses: [2, 4, 3, 5, 3, 4, 5, 5, 4, 5, 5, 5, 4, 3, 4, 5, 3, 4, 4, 2, 3, 1, 2, 1, 3],
  },
  {
    name: 'Scenario 3 — Resilient Hunter profile',
    expectedPrimary:   'The Resilient Closer',
    expectedSecondary: 'The Curious Challenger',
    expectedTertiary:  'The Adaptive Student',
    responses: [3, 3, 3, 3, 4, 3, 5, 5, 5, 3, 4, 3, 3, 2, 3, 5, 2, 3, 5, 1, 2, 1, 3, 3, 4],
  },
]

function fmt(n: number) { return n.toFixed(2) }

function runOne(s: Scenario) {
  console.log('\n' + '═'.repeat(72))
  console.log(s.name)
  console.log('═'.repeat(72))
  console.log(`Responses (len=${s.responses.length}, expected=${QUESTIONS.length}):`)
  console.log('  ' + s.responses.join(', '))

  if (s.responses.length !== QUESTIONS.length) {
    console.log(`\n⚠️  Response length mismatch — skipping.`)
    return
  }

  const r = scoreAssessment(s.responses)

  // Dimensions
  console.log('\n— 12 Dimension Scores (1–5) —')
  for (const dim of DIMENSION_ORDER) {
    const d = r.diagnostics[dim]
    const fwd = d.forwardDisplay === null ? '  –  ' : fmt(d.forwardDisplay)
    const rev = d.reverseDisplay === null ? '  –  ' : fmt(d.reverseDisplay)
    const flag = d.inconsistent ? '   ⚠ INCONSISTENT' : ''
    console.log(
      `  ${DIMENSION_LABELS[dim].padEnd(22)}  ${fmt(d.display)}   (fwd ${fwd} | rev ${rev})${flag}`,
    )
  }

  // Traits
  console.log('\n— Trait Axis (ranked) —')
  r.traits.forEach((t, i) => {
    const tie = t.closeRankTie ? ` ≈ [${t.tiedWith.join(', ')}]` : ''
    console.log(`  ${i + 1}. ${t.label.padEnd(12)} ${fmt(t.score)}  (${t.matchPercentage}%)${tie}`)
  })

  // Styles
  console.log('\n— Style Axis (ranked) —')
  r.styles.forEach((st, i) => {
    const tie = st.closeRankTie ? ` ≈ [${st.tiedWith.join(', ')}]` : ''
    console.log(`  ${i + 1}. ${st.label.padEnd(12)} ${fmt(st.score)}  (${st.matchPercentage}%)${tie}`)
  })

  // Archetypes
  console.log('\n— Archetypes —')
  console.log(`  Primary:   The ${r.primary.name}   (${r.primary.matchPercentage}% combined)`)
  console.log(`  Secondary: The ${r.secondary.name} (${r.secondary.matchPercentage}% combined)`)
  console.log(`  Tertiary:  The ${r.tertiary.name}  (${r.tertiary.matchPercentage}% combined)`)

  // Expectations
  const actualPrim = `The ${r.primary.name}`
  const actualSec  = `The ${r.secondary.name}`
  const actualTer  = `The ${r.tertiary.name}`
  console.log('\n— Match vs Expected —')
  console.log(`  primary:   expected "${s.expectedPrimary}"    actual "${actualPrim}"    ${actualPrim === s.expectedPrimary ? '✓ MATCH' : '✗ MISMATCH'}`)
  console.log(`  secondary: expected "${s.expectedSecondary}"  actual "${actualSec}"   ${actualSec === s.expectedSecondary ? '✓ MATCH' : '✗ MISMATCH'}`)
  console.log(`  tertiary:  expected "${s.expectedTertiary}"   actual "${actualTer}"    ${actualTer === s.expectedTertiary ? '✓ MATCH' : '✗ MISMATCH'}`)

  // Flags
  console.log('\n— Flags —')
  console.log(`  Inconsistencies (dim gap > 1.5): ${r.inconsistencies.length === 0 ? 'none' : r.inconsistencies.join(', ')}`)
  console.log(`  Response std dev:                 ${fmt(r.responseStdDev)}`)
  console.log(`  Low variance (< 0.5):             ${r.lowVariance ? 'YES' : 'no'}`)
}

console.log(`QUESTIONS length = ${QUESTIONS.length} (Q1/Q3–Q21 forward + Q2/Q22–Q25 reverse)`)
for (const s of scenarios) runOne(s)

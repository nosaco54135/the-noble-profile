/**
 * Pairwise scoring engine validation gate.
 *
 * Runs three checks against the pairwise QUESTIONS/scoreAssessment pipeline:
 *   a. COVERAGE            — every dimension is touched by exactly 5 questions
 *   b. FLAT PROFILE         — an all-neutral response set scores exactly 3.00
 *                             on every dimension
 *   c. REACHABILITY SMOKE   — 20,000 random response sets reach all 64
 *                             possible primary archetypes (8 traits × 8 styles)
 *
 * Exits 0 with a PASS summary if every check holds, non-zero naming the
 * failing check(s) otherwise.
 *
 * Usage:  npx tsx scripts/validate-scoring.ts
 */
import { scoreAssessment } from '../lib/scoring'
import { QUESTIONS } from '../lib/questions'
import { DIMENSION_LABELS, DIMENSION_ORDER } from '../types'
import type { DimensionKey } from '../types'

const failures: string[] = []

function fail(check: string, detail: string) {
  failures.push(`${check}: ${detail}`)
}

// ─── a. COVERAGE ────────────────────────────────────────────────────────────

function checkCoverage() {
  console.log('\n' + '═'.repeat(72))
  console.log('a. COVERAGE — dimA/dimB appearances per dimension')
  console.log('═'.repeat(72))

  const counts = {} as Record<DimensionKey, number>
  for (const dim of DIMENSION_ORDER) counts[dim] = 0
  for (const q of QUESTIONS) {
    counts[q.dimA] += 1
    counts[q.dimB] += 1
  }

  let ok = true
  for (const dim of DIMENSION_ORDER) {
    const n = counts[dim]
    if (n !== 5) ok = false
    console.log(`  ${DIMENSION_LABELS[dim].padEnd(22)} ${n}   ${n === 5 ? 'OK' : 'FAIL (expected 5)'}`)
  }

  if (!ok) fail('COVERAGE', 'not every dimension appears exactly 5 times across QUESTIONS')
}

// ─── b. FLAT PROFILE ────────────────────────────────────────────────────────

function checkFlatProfile() {
  console.log('\n' + '═'.repeat(72))
  console.log('b. FLAT PROFILE — all-neutral (3) responses')
  console.log('═'.repeat(72))

  const flat = Array(QUESTIONS.length).fill(3)
  const result = scoreAssessment(flat)

  let ok = true
  for (const dim of DIMENSION_ORDER) {
    const score = result.dimensionScores[dim]
    if (score !== 3) ok = false
    console.log(`  ${DIMENSION_LABELS[dim].padEnd(22)} ${score.toFixed(2)}   ${score === 3 ? 'OK' : 'FAIL (expected 3)'}`)
  }

  if (!ok) fail('FLAT PROFILE', 'not every dimension display score is exactly 3 on an all-neutral response set')
}

// ─── c. REACHABILITY SMOKE ──────────────────────────────────────────────────

const EXPECTED_ARCHETYPES = 64 // 8 traits × 8 styles

function randomResponses(n: number): number[] {
  const out: number[] = []
  for (let i = 0; i < n; i++) out.push(1 + Math.floor(Math.random() * 5))
  return out
}

function checkReachability() {
  console.log('\n' + '═'.repeat(72))
  console.log('c. REACHABILITY SMOKE — 20,000 random response sets')
  console.log('═'.repeat(72))

  const TRIALS = 20000
  const counts = new Map<string, number>()

  for (let i = 0; i < TRIALS; i++) {
    const responses = randomResponses(QUESTIONS.length)
    const result = scoreAssessment(responses)
    const name = result.primary.name
    counts.set(name, (counts.get(name) ?? 0) + 1)
  }

  const distinct = counts.size
  const shares = [...counts.values()].map((c) => (c / TRIALS) * 100)
  const minShare = Math.min(...shares)
  const maxShare = Math.max(...shares)

  console.log(`  Distinct primary archetypes: ${distinct} (expected ${EXPECTED_ARCHETYPES})`)
  console.log(`  Min share: ${minShare.toFixed(3)}%`)
  console.log(`  Max share: ${maxShare.toFixed(3)}%`)

  if (distinct !== EXPECTED_ARCHETYPES) {
    fail('REACHABILITY', `expected ${EXPECTED_ARCHETYPES} distinct primary archetypes, got ${distinct}`)
  }
}

// ─── Run ────────────────────────────────────────────────────────────────────

console.log(`QUESTIONS length = ${QUESTIONS.length} (pairwise model, P1…P${QUESTIONS.length})`)

checkCoverage()
checkFlatProfile()
checkReachability()

console.log('\n' + '═'.repeat(72))
if (failures.length === 0) {
  console.log('PASS — all checks passed.')
  process.exit(0)
} else {
  console.log(`FAIL — ${failures.length} check(s) failed:`)
  for (const f of failures) console.log(`  - ${f}`)
  process.exit(1)
}

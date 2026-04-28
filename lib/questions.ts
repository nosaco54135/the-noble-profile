/**
 * The 25 Noble Quotient questions with signed dimension weights.
 *
 * • Q1, Q3–Q21 are forward-scored (20 questions).
 * • Q2, Q22–Q25 are reverse-scored (5 questions).
 *
 * Reverse weights encode direction via sign — no response inversion is applied.
 * Raw 1–5 responses feed directly into the weighted sum for all questions.
 *
 * Question wording and weight vectors are taken verbatim from the approved
 * specification. Do not rewrite weights here — change the spec first.
 */

import type { Question } from '@/types'

export const QUESTIONS: Question[] = [
  // ─── Q1 (forward) ──────────────────────────────────────────────────────
  {
    id: 'Q1',
    canonicalIndex: 0,
    text: 'I have deviated from my planned call agenda specifically because a prospect said something I didn\'t expect.',
    reverse: false,
    weights: { curiosity: 0.9, active_listening: 0.6, eq_trust: 0.3, problem_solving: 0.3, process_oriented: -0.3 },
  },

  // ─── Q2 (REVERSE) ──────────────────────────────────────────────────────
  {
    id: 'Q2',
    canonicalIndex: 1,
    text: 'I have accidentally asked a prospect a question they already answered earlier in the same call.',
    reverse: true,
    weights: { active_listening: -0.9, eq_trust: -0.3, curiosity: -0.3 },
  },

  // ─── Q3–Q21 (forward) ──────────────────────────────────────────────────
  {
    id: 'Q3',
    canonicalIndex: 2,
    text: 'I have referenced something a prospect said in a previous conversation, unprompted, when reconnecting with them later.',
    reverse: false,
    weights: { active_listening: 0.9, eq_trust: 0.6, customer_centric: 0.3, authenticity: 0.3, curiosity: 0.3 },
  },
  {
    id: 'Q4',
    canonicalIndex: 3,
    text: 'Before a call I research the prospect\'s recent company news, LinkedIn activity, or public statements beyond what my CRM already has.',
    reverse: false,
    weights: { curiosity: 0.9, data_driven: 0.6, process_oriented: 0.3, customer_centric: 0.3, problem_solving: 0.3 },
  },
  {
    id: 'Q5',
    canonicalIndex: 4,
    text: 'I have noticed a prospect\'s body language or expression contradict what they were saying, and adjusted what I did next because of it.',
    reverse: false,
    weights: { eq_trust: 0.9, active_listening: 0.6, curiosity: 0.3 },
  },
  {
    id: 'Q6',
    canonicalIndex: 5,
    text: 'I have told a prospect that our product is not the right fit for them right now, without being asked.',
    reverse: false,
    weights: { authenticity: 0.9, customer_centric: 0.9, eq_trust: 0.6, closing_confidence: -0.6 },
  },
  {
    id: 'Q7',
    canonicalIndex: 6,
    text: 'I have ended a call by asking the prospect directly where they stand, rather than saying I\'ll follow up or send more information.',
    reverse: false,
    weights: { closing_confidence: 0.9, mindset_resilience: 0.6, authenticity: 0.3, eq_trust: -0.3 },
  },
  {
    id: 'Q8',
    canonicalIndex: 7,
    text: 'When a prospect has said they need to think about it, I have asked them directly what\'s giving them pause, rather than agreeing to follow up.',
    reverse: false,
    weights: { closing_confidence: 0.9, curiosity: 0.6, problem_solving: 0.6, mindset_resilience: 0.3, eq_trust: -0.3 },
  },
  {
    id: 'Q9',
    canonicalIndex: 8,
    text: 'After a deal goes cold I reach back out with a direct question about whether the timing has changed, rather than a soft check-in.',
    reverse: false,
    weights: { closing_confidence: 0.9, authenticity: 0.6, mindset_resilience: 0.6, eq_trust: -0.3 },
  },
  {
    id: 'Q10',
    canonicalIndex: 9,
    text: 'I track my own conversion rates or activity metrics, not because I\'m required to, but because I find it useful.',
    reverse: false,
    weights: { data_driven: 0.9, learning_style: 0.6, process_oriented: 0.6, mindset_resilience: 0.3 },
  },
  {
    id: 'Q11',
    canonicalIndex: 10,
    text: 'I have opened a proposal by leading with the business case, cost savings, revenue gained, or time recovered, before explaining how the product works.',
    reverse: false,
    weights: { data_driven: 0.9, customer_centric: 0.6, closing_confidence: 0.6, problem_solving: 0.3, eq_trust: -0.3 },
  },
  {
    id: 'Q12',
    canonicalIndex: 11,
    text: 'I have stopped myself from jumping to a solution because I realized the prospect needed to feel heard first.',
    reverse: false,
    weights: { eq_trust: 0.9, active_listening: 0.6, customer_centric: 0.3 },
  },
  {
    id: 'Q13',
    canonicalIndex: 12,
    text: 'I have pointed out a product limitation to a prospect without being asked, because it was relevant to their situation.',
    reverse: false,
    weights: { authenticity: 0.9, customer_centric: 0.9, eq_trust: 0.6, closing_confidence: -0.6, prospecting_comfort: -0.3 },
  },
  {
    id: 'Q14',
    canonicalIndex: 13,
    text: 'I have recommended a smaller or phased engagement to a prospect when I believed it was genuinely the right starting point for them.',
    reverse: false,
    weights: { customer_centric: 0.9, authenticity: 0.6, eq_trust: 0.6, data_driven: 0.3, closing_confidence: -0.6 },
  },
  {
    id: 'Q15',
    canonicalIndex: 14,
    text: 'When I\'ve received an objection I hadn\'t heard before, I have asked follow-up questions about it before attempting to address it.',
    reverse: false,
    weights: { curiosity: 0.9, active_listening: 0.6, problem_solving: 0.6, eq_trust: 0.3, closing_confidence: -0.3 },
  },
  {
    id: 'Q16',
    canonicalIndex: 15,
    text: 'I have found a creative way to move a deal forward when the standard path was blocked, without escalating to a manager.',
    reverse: false,
    weights: { problem_solving: 0.9, closing_confidence: 0.6, mindset_resilience: 0.6, curiosity: 0.3, process_oriented: -0.3 },
  },
  {
    id: 'Q17',
    canonicalIndex: 16,
    text: 'I have recommended a competitor\'s product to a prospect when I genuinely believed it was a better fit for their situation.',
    reverse: false,
    weights: { authenticity: 0.9, customer_centric: 0.9, eq_trust: 0.6, closing_confidence: -0.9 },
  },
  {
    id: 'Q18',
    canonicalIndex: 17,
    text: 'I have applied something I learned outside of work to a sales situation and it changed how I handled it.',
    reverse: false,
    weights: { learning_style: 0.9, curiosity: 0.6, problem_solving: 0.3 },
  },
  {
    id: 'Q19',
    canonicalIndex: 18,
    text: 'In the past six months, I have read a sales book, completed a course, or studied sales content on my own time, without it being assigned.',
    reverse: false,
    weights: { learning_style: 0.9, curiosity: 0.6, mindset_resilience: 0.3, process_oriented: 0.3 },
  },
  {
    id: 'Q20',
    canonicalIndex: 19,
    text: 'I have asked a colleague or manager for specific feedback on something I was trying to improve, outside of a formal review process.',
    reverse: false,
    weights: { learning_style: 0.9, eq_trust: 0.3, curiosity: 0.3, mindset_resilience: 0.3, process_oriented: 0.3 },
  },
  {
    id: 'Q21',
    canonicalIndex: 20,
    text: 'On days I have outbound blocked, I complete my prospecting activity even when my pipeline is healthy or my schedule gets crowded.',
    reverse: false,
    weights: { prospecting_comfort: 0.9, mindset_resilience: 0.9, process_oriented: 0.6 },
  },

  // ─── Q22–Q25 (reverse) ─────────────────────────────────────────────────
  {
    id: 'Q22',
    canonicalIndex: 21,
    text: 'After a run of unsuccessful calls, I usually step away from the phone before continuing outreach.',
    reverse: true,
    weights: { mindset_resilience: -0.9, prospecting_comfort: -0.6, eq_trust: 0.3, learning_style: 0.3 },
  },
  {
    id: 'Q23',
    canonicalIndex: 22,
    text: 'When I have unstructured time I tend to work existing deals rather than start new outreach.',
    reverse: true,
    weights: { prospecting_comfort: -0.9, customer_centric: 0.6, eq_trust: 0.3, closing_confidence: 0.3 },
  },
  {
    id: 'Q24',
    canonicalIndex: 23,
    text: 'When a prospect seems hesitant, I give them space rather than asking directly what\'s holding them back.',
    reverse: true,
    weights: { closing_confidence: -0.9, eq_trust: 0.6, authenticity: 0.3, mindset_resilience: -0.3 },
  },
  {
    id: 'Q25',
    canonicalIndex: 24,
    text: 'When a prospect seems ready to buy, I stop asking questions and let the deal close itself.',
    reverse: true,
    weights: { curiosity: -0.9, problem_solving: -0.6, authenticity: -0.3, closing_confidence: -0.3, process_oriented: 0.3 },
  },
]

// Defensively re-number canonical indexes — the 25-item sequence is what matters.
QUESTIONS.forEach((q, i) => {
  q.canonicalIndex = i
})

// ─── Seeded shuffle (Rule 8) ───────────────────────────────────────────────

/**
 * Deterministic seeded PRNG (mulberry32-style). Given the same seed string,
 * produces the same shuffle every time — so we can reconstruct the
 * per-respondent question order for debugging.
 */
function seededRng(seed: string): () => number {
  // FNV-1a hash of the seed string → 32-bit state
  let h = 2166136261 >>> 0
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i)
    h = Math.imul(h, 16777619) >>> 0
  }
  let state = h || 1
  return function rng() {
    state = (state + 0x6d2b79f5) >>> 0
    let t = state
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/**
 * Seeded Fisher–Yates shuffle. Pass the same seed to reproduce the order.
 */
export function shuffleQuestions(questions: Question[], seed: string): Question[] {
  const out = [...questions]
  const rng = seededRng(seed)
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1))
    ;[out[i], out[j]] = [out[j], out[i]]
  }
  return out
}

/**
 * Inverts a reverse-scored response per Rule 1.  5→1, 4→2, 3→3, 2→4, 1→5.
 * Retained for reference; the scoring engine does NOT call this — weight
 * signs encode direction directly.
 */
export function invertResponse(value: number): number {
  return 6 - value
}

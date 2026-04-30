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
    text: 'I\'d rather follow an unexpected thread a prospect raises than stay on my planned agenda for the call.',
    reverse: false,
    weights: { curiosity: 0.9, active_listening: 0.6, eq_trust: 0.3, problem_solving: 0.3, process_oriented: -0.3 },
  },

  // ─── Q2 (REVERSE) ──────────────────────────────────────────────────────
  {
    id: 'Q2',
    canonicalIndex: 1,
    text: 'I sometimes lose track of what a prospect has already told me earlier in a conversation.',
    reverse: true,
    weights: { active_listening: -0.9, eq_trust: -0.3, curiosity: -0.3 },
  },

  // ─── Q3–Q21 (forward) ──────────────────────────────────────────────────
  {
    id: 'Q3',
    canonicalIndex: 2,
    text: 'I\'d rather risk getting the detail wrong by referencing something a prospect mentioned weeks ago than let it go unmentioned.',
    reverse: false,
    weights: { active_listening: 0.9, eq_trust: 0.6, customer_centric: 0.3, authenticity: 0.3, curiosity: 0.3 },
  },
  {
    id: 'Q4',
    canonicalIndex: 3,
    text: 'I\'d rather spend an extra hour digging into a prospect before a call than walk in knowing the basics and fill in the gaps through discovery.',
    reverse: false,
    weights: { curiosity: 0.9, data_driven: 0.6, process_oriented: 0.3, customer_centric: 0.3, problem_solving: 0.3 },
  },
  {
    id: 'Q5',
    canonicalIndex: 4,
    text: 'I\'d rather lose control of the narrative mid-call than ignore a shift in a prospect\'s energy.',
    reverse: false,
    weights: { eq_trust: 0.9, active_listening: 0.6, curiosity: 0.3 },
  },
  {
    id: 'Q6',
    canonicalIndex: 5,
    text: 'I\'d rather tell a prospect our product isn\'t the right fit for them than close the deal because they\'re keen to buy anyway.',
    reverse: false,
    weights: { authenticity: 0.9, customer_centric: 0.9, eq_trust: 0.6, closing_confidence: -0.6 },
  },
  {
    id: 'Q7',
    canonicalIndex: 6,
    text: 'I\'d rather end a call by asking a prospect directly where they stand than leave with a polite next step that keeps things open.',
    reverse: false,
    weights: { closing_confidence: 0.9, mindset_resilience: 0.6, authenticity: 0.3, eq_trust: -0.3 },
  },
  {
    id: 'Q8',
    canonicalIndex: 7,
    text: 'When a prospect says they need to think about it, I\'d rather press them on what\'s giving them pause than respect their need to step away.',
    reverse: false,
    weights: { closing_confidence: 0.9, curiosity: 0.6, problem_solving: 0.6, mindset_resilience: 0.3, eq_trust: -0.3 },
  },
  {
    id: 'Q9',
    canonicalIndex: 8,
    text: 'On a deal that\'s gone cold, I\'d push for a direct yes or no rather than start a fresh, lighter conversation to warm things back up.',
    reverse: false,
    weights: { closing_confidence: 0.9, authenticity: 0.6, mindset_resilience: 0.6, eq_trust: -0.3 },
  },
  {
    id: 'Q10',
    canonicalIndex: 9,
    text: 'I\'d rather track my own conversion rates and activity numbers in detail than trust my gut on whether I\'m having a good or bad month.',
    reverse: false,
    weights: { data_driven: 0.9, learning_style: 0.6, process_oriented: 0.6, mindset_resilience: 0.3 },
  },
  {
    id: 'Q11',
    canonicalIndex: 10,
    text: 'When I\'m presenting to a prospect, I\'d rather lead with the business case in dollars and hours than start with the story of how the product solves their problem.',
    reverse: false,
    weights: { data_driven: 0.9, customer_centric: 0.6, closing_confidence: 0.6, problem_solving: 0.3, eq_trust: -0.3 },
  },
  {
    id: 'Q12',
    canonicalIndex: 11,
    text: 'When a prospect is upset or frustrated, I\'d rather sit in the discomfort with them than move the conversation toward a solution.',
    reverse: false,
    weights: { eq_trust: 0.9, active_listening: 0.6, customer_centric: 0.3 },
  },
  {
    id: 'Q13',
    canonicalIndex: 12,
    text: 'When I notice a product limitation that matters for a prospect\'s use case, I\'d rather flag it before they ask than wait for them to run into it.',
    reverse: false,
    weights: { authenticity: 0.9, customer_centric: 0.9, eq_trust: 0.6, closing_confidence: -0.6, prospecting_comfort: -0.3 },
  },
  {
    id: 'Q14',
    canonicalIndex: 13,
    text: 'When I believe a smaller or phased engagement is the right starting point for a prospect, I\'d recommend it even when the bigger contract would be the deal that makes my quarter.',
    reverse: false,
    weights: { customer_centric: 0.9, authenticity: 0.6, eq_trust: 0.6, data_driven: 0.3, closing_confidence: -0.6 },
  },
  {
    id: 'Q15',
    canonicalIndex: 14,
    text: 'I\'d rather have more questions for a prospect\'s objection than an answer.',
    reverse: false,
    weights: { curiosity: 0.9, active_listening: 0.6, problem_solving: 0.6, eq_trust: 0.3, closing_confidence: -0.3 },
  },
  {
    id: 'Q16',
    canonicalIndex: 15,
    text: 'When the standard path to finalize a deal gets blocked, I\'d rather spend the time finding a creative workaround than redirect my energy to deals that are already moving.',
    reverse: false,
    weights: { problem_solving: 0.9, closing_confidence: 0.6, mindset_resilience: 0.6, curiosity: 0.3, process_oriented: -0.3 },
  },
  {
    id: 'Q17',
    canonicalIndex: 16,
    text: 'After months of work on a deal, I\'d rather suggest a prospect look at competitors than push to close when I\'m having doubts about the fit.',
    reverse: false,
    weights: { authenticity: 0.9, customer_centric: 0.9, eq_trust: 0.6, closing_confidence: -0.9 },
  },
  {
    id: 'Q18',
    canonicalIndex: 17,
    text: 'I bring lessons from outside sales (books, hobbies, other industries) into how I handle live conversations with prospects.',
    reverse: false,
    weights: { learning_style: 0.9, curiosity: 0.6, problem_solving: 0.3 },
  },
  {
    id: 'Q19',
    canonicalIndex: 18,
    text: 'I\'ve spent personal time in the last six months on a sales book, course, or training that wasn\'t required, even though I could have used that time for something else I\'d rather be doing.',
    reverse: false,
    weights: { learning_style: 0.9, curiosity: 0.6, mindset_resilience: 0.3, process_oriented: 0.3 },
  },
  {
    id: 'Q20',
    canonicalIndex: 19,
    text: 'In the last six months, I\'ve gone to a colleague or manager for honest feedback on something I was working on (outside any formal review), even when I wasn\'t sure I\'d like what they said.',
    reverse: false,
    weights: { learning_style: 0.9, eq_trust: 0.3, curiosity: 0.3, mindset_resilience: 0.3, process_oriented: 0.3 },
  },
  {
    id: 'Q21',
    canonicalIndex: 20,
    text: 'When my pipeline is full and I\'m pacing ahead of quota, I\'d rather still hit my daily prospecting numbers than use that time to advance the opportunities I already have.',
    reverse: false,
    weights: { prospecting_comfort: 0.9, mindset_resilience: 0.9, process_oriented: 0.6 },
  },

  // ─── Q22–Q25 (reverse) ─────────────────────────────────────────────────
  {
    id: 'Q22',
    canonicalIndex: 21,
    text: 'After a run of bad calls, I\'d rather step away to reset than push through and risk making the next one worse.',
    reverse: true,
    weights: { mindset_resilience: -0.9, prospecting_comfort: -0.6, eq_trust: 0.3, learning_style: 0.3 },
  },
  {
    id: 'Q23',
    canonicalIndex: 22,
    text: 'When I find myself with unexpected free time in my day, I\'d rather work my existing opportunities than start new outreach.',
    reverse: true,
    weights: { prospecting_comfort: -0.9, customer_centric: 0.6, eq_trust: 0.3, closing_confidence: 0.3 },
  },
  {
    id: 'Q24',
    canonicalIndex: 23,
    text: 'When a prospect goes quiet, I\'d rather give them room to think than risk pressuring them by asking what\'s wrong.',
    reverse: true,
    weights: { closing_confidence: -0.9, eq_trust: 0.6, authenticity: 0.3, mindset_resilience: -0.3 },
  },
  {
    id: 'Q25',
    canonicalIndex: 24,
    text: 'Once a prospect has agreed to move forward, I\'d rather wrap up the call quickly than ask more questions and risk them changing their mind.',
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

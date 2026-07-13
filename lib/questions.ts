/**
 * The 30 Noble Quotient pairwise-preference questions.
 *
 * Each question presents a scenario with two options (optionA / optionB).
 * Preferring an option contributes to that option's paired dimension
 * (dimA / dimB) in the pairwise scoring engine.
 */

import type { Question } from '@/types'

export const QUESTIONS: Question[] = [
  { id: 'P1', canonicalIndex: 0, scenario: 'You unexpectedly get one open hour in your day.', optionA: 'I would use it to send highly personalized outreach based on what a new prospect appears to care about.', optionB: 'I would use it to follow an interesting signal in an active deal and try to turn it into a clearer next step.', dimA: 'prospecting_comfort', dimB: 'closing_confidence' },
  { id: 'P2', canonicalIndex: 1, scenario: 'A prospect raises an objection you have heard many times before.', optionA: 'I would ask a few more questions to understand what is different underneath this version of the objection.', optionB: 'I would organize the facts, constraints, and next steps so the objection has a clear path to resolution.', dimA: 'curiosity', dimB: 'process_oriented' },
  { id: 'P3', canonicalIndex: 2, scenario: 'A deal has a lot of moving parts and the buyer is getting restless.', optionA: 'I would tighten the process, clean up ownership, and make the path forward easier to follow.', optionB: 'I would stay steady with the relationship and keep people engaged while the path gets clearer.', dimA: 'process_oriented', dimB: 'mindset_resilience' },
  { id: 'P4', canonicalIndex: 3, scenario: 'You have had several frustrating prospecting conversations in a row.', optionA: 'I would keep showing up consistently and try to regain momentum through action.', optionB: 'I would shift attention to what the buyer experience is telling me and adjust around their needs.', dimA: 'mindset_resilience', dimB: 'customer_centric' },
  { id: 'P5', canonicalIndex: 4, scenario: 'A prospect seems interested but has not clearly admitted the business pain.', optionA: 'I would spend more time understanding what outcome would actually help them succeed.', optionB: 'I would shape the conversation toward measurable impact and a sharper reason to act.', dimA: 'customer_centric', dimB: 'data_driven' },
  { id: 'P6', canonicalIndex: 5, scenario: 'A buyer is comparing you against a competitor.', optionA: 'I would challenge the buyer to evaluate measurable tradeoffs, business risk, and strategic priority.', optionB: 'I would name fit realities candidly and build trust by being clear about where we are and are not strong.', dimA: 'data_driven', dimB: 'authenticity' },
  { id: 'P7', canonicalIndex: 6, scenario: 'You realize the prospect may misunderstand what your product can do.', optionA: 'I would state the limitation clearly, even if it changes the tone of the deal.', optionB: 'I would learn from the misunderstanding and adjust the conversation so the buyer can make a better decision.', dimA: 'authenticity', dimB: 'learning_style' },
  { id: 'P8', canonicalIndex: 7, scenario: 'You are entering a new account with limited information.', optionA: 'I would form a flexible hypothesis, test for signals, and revise quickly based on what I learn.', optionB: 'I would open with messaging that feels human, relevant, and emotionally specific to the buyer.', dimA: 'learning_style', dimB: 'eq_trust' },
  { id: 'P9', canonicalIndex: 8, scenario: 'You are preparing for a high-stakes executive call.', optionA: 'I would anchor the conversation in what the executive likely cares about personally and organizationally.', optionB: 'I would create a clear sequence, clean handoff points, and a strong decision path.', dimA: 'eq_trust', dimB: 'process_oriented' },
  { id: 'P10', canonicalIndex: 9, scenario: 'A prospect gives you an objection that sounds partly true but incomplete.', optionA: 'I would dig for the missing context before deciding how to respond.', optionB: 'I would stay steady and continue the conversation without letting the resistance throw me off.', dimA: 'curiosity', dimB: 'mindset_resilience' },
  { id: 'P11', canonicalIndex: 10, scenario: 'You are trying to create consensus across stakeholders.', optionA: 'I would build a clear stakeholder map, next-step plan, and decision process.', optionB: 'I would focus on what each stakeholder needs to believe for the solution to be useful to them.', dimA: 'process_oriented', dimB: 'customer_centric' },
  { id: 'P12', canonicalIndex: 11, scenario: 'A deal has gone quiet near the end of the month.', optionA: 'I would stay composed, avoid spiraling, and look for the next constructive move.', optionB: 'I would focus on the commercial levers and ask directly what would make action worthwhile now.', dimA: 'mindset_resilience', dimB: 'closing_confidence' },
  { id: 'P13', canonicalIndex: 12, scenario: 'A prospect is excited but you are not sure the fit is strong enough.', optionA: 'I would stay anchored to what the buyer tells me they need and help them decide what level of fit is acceptable.', optionB: 'I would name the fit concern clearly rather than let enthusiasm carry the deal forward.', dimA: 'active_listening', dimB: 'authenticity' },
  { id: 'P14', canonicalIndex: 13, scenario: 'You are behind target and need to create movement.', optionA: 'I would focus on measurable value, urgency, and the strongest reason for buyers to act now.', optionB: 'I would study what is not working, look for patterns, and change my approach before pushing harder.', dimA: 'closing_confidence', dimB: 'learning_style' },
  { id: 'P15', canonicalIndex: 14, scenario: 'A prospect gives you vague feedback that could mean several things.', optionA: 'I would be transparent about the uncertainty and ask whether the opportunity is still real.', optionB: 'I would ask carefully what is happening on their side before assuming urgency or intent.', dimA: 'authenticity', dimB: 'active_listening' },
  { id: 'P16', canonicalIndex: 15, scenario: 'A call is going well, but the prospect says something surprising.', optionA: 'I would adapt quickly and change direction if the new information seems important.', optionB: 'I would follow the unexpected thread to see what it reveals about the real buying situation.', dimA: 'learning_style', dimB: 'problem_solving' },
  { id: 'P17', canonicalIndex: 16, scenario: 'You want to break into a promising new segment.', optionA: 'I would test outreach that shows I understand the buyer\'s world and emotional pressures.', optionB: 'I would keep a steady outreach rhythm even if the first set of attempts gets little response.', dimA: 'eq_trust', dimB: 'prospecting_comfort' },
  { id: 'P18', canonicalIndex: 17, scenario: 'A prospect gives an answer that opens three possible paths.', optionA: 'I would explore the most interesting path before narrowing the conversation.', optionB: 'I would choose the path most likely to clarify what success would look like for the buyer.', dimA: 'curiosity', dimB: 'customer_centric' },
  { id: 'P19', canonicalIndex: 18, scenario: 'You inherit a messy opportunity from another rep.', optionA: 'I would rebuild the operating plan and create a clearer path forward.', optionB: 'I would identify the strongest business case and challenge the buyer toward a more decisive evaluation.', dimA: 'process_oriented', dimB: 'closing_confidence' },
  { id: 'P20', canonicalIndex: 19, scenario: 'A prospect is close to buying but you have a concern.', optionA: 'I would stay steady, keep the relationship warm, and make sure the concern is handled at the right moment.', optionB: 'I would proactively say what I am unsure about, even if it creates tension.', dimA: 'mindset_resilience', dimB: 'authenticity' },
  { id: 'P21', canonicalIndex: 20, scenario: 'A customer becomes frustrated after a rough implementation conversation.', optionA: 'I would focus on what the customer needs next and help them get to a better outcome.', optionB: 'I would understand what changed, adjust my approach, and help the conversation recover.', dimA: 'customer_centric', dimB: 'eq_trust' },
  { id: 'P22', canonicalIndex: 21, scenario: 'A new account shows weak surface-level fit but interesting signals.', optionA: 'I would start with a clear point of view on the business problem and why it matters now.', optionB: 'I would reach out with a message that reflects what I think they may be feeling or facing.', dimA: 'data_driven', dimB: 'eq_trust' },
  { id: 'P23', canonicalIndex: 22, scenario: 'You sense a prospect may be hiding the real reason they are hesitating.', optionA: 'I would be direct about what I am sensing and invite them to tell me the truth.', optionB: 'I would keep asking thoughtful questions and let the conversation reveal what is really going on.', dimA: 'closing_confidence', dimB: 'active_listening' },
  { id: 'P24', canonicalIndex: 23, scenario: 'A current opportunity suddenly becomes more complex.', optionA: 'I would keep learning from each shift and adjust my approach as new information comes in.', optionB: 'I would break the complexity down piece by piece until the path forward is manageable.', dimA: 'learning_style', dimB: 'problem_solving' },
  { id: 'P25', canonicalIndex: 24, scenario: 'A deal you were counting on just died.', optionA: 'I would map out exactly where it broke down and what that means for my other open deals.', optionB: 'I would get straight back into outreach and start rebuilding the pipeline.', dimA: 'problem_solving', dimB: 'prospecting_comfort' },
  { id: 'P26', canonicalIndex: 25, scenario: 'Your manager offers you focused coaching time.', optionA: 'I would use it to work through my most tangled active deal until we crack it.', optionB: 'I would use it to sharpen my outbound approach and open more doors.', dimA: 'problem_solving', dimB: 'prospecting_comfort' },
  { id: 'P27', canonicalIndex: 26, scenario: 'A buyer describes a messy internal situation with no obvious owner.', optionA: 'I would help break the mess into pieces we can actually solve.', optionB: 'I would let them talk it through fully before offering any direction.', dimA: 'problem_solving', dimB: 'active_listening' },
  { id: 'P28', canonicalIndex: 27, scenario: 'Mid-discovery, the prospect mentions an unrelated initiative in passing.', optionA: 'I would focus on what they are telling me and note it for later.', optionB: 'I would ask about it right away and see where it goes.', dimA: 'active_listening', dimB: 'curiosity' },
  { id: 'P29', canonicalIndex: 28, scenario: 'You are researching a new account before first contact.', optionA: 'I would study the metrics and evidence that show whether a real opportunity exists.', optionB: 'I would follow whatever looks most interesting about the company and build my picture from there.', dimA: 'data_driven', dimB: 'curiosity' },
  { id: 'P30', canonicalIndex: 29, scenario: 'It is Monday morning and the week is unplanned.', optionA: 'I would block time for net-new outreach before anything else claims the calendar.', optionB: 'I would start with the pipeline numbers and decide where my time pays off most.', dimA: 'prospecting_comfort', dimB: 'data_driven' },
]

// Defensively re-number canonical indexes — the 30-item sequence is what matters.
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
 * Deterministic per-question side flips for display randomization.
 * flips[canonicalIndex] === true means the UI renders optionB first.
 * Derived from the session seed so the presented order is fully
 * reconstructable from the stored seed - no extra persistence needed.
 */
export function deriveSideFlips(seed: string): boolean[] {
  const rng = seededRng(`${seed}:sides`)
  return QUESTIONS.map(() => rng() < 0.5)
}

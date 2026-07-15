/**
 * The 30 Noble Quotient pairwise-preference questions.
 *
 * Each question presents a scenario with two options (optionA / optionB).
 * Preferring an option contributes to that option's paired dimension
 * (dimA / dimB) in the pairwise scoring engine.
 */

import type { Question } from '@/types'

export const QUESTIONS: Question[] = [
  { id: 'P1', canonicalIndex: 0, scenario: 'You unexpectedly get one open hour in your day.', optionA: 'I would use it to research and send highly personalized outreach to a new prospect.', optionB: 'I would use it to advance an active opportunity by turning a recent signal into a clear next step.', dimA: 'prospecting_comfort', dimB: 'closing_confidence' },
  { id: 'P2', canonicalIndex: 1, scenario: 'A prospect raises an objection you have heard many times before.', optionA: 'I would spend more time understanding what is driving this specific objection.', optionB: 'I would spend more time creating a clear plan to work through the objection.', dimA: 'curiosity', dimB: 'process_oriented' },
  { id: 'P3', canonicalIndex: 2, scenario: 'A deal has a lot of moving parts and the buyer is getting restless.', optionA: 'I would focus on bringing more structure to the deal so everyone knows what needs to happen next.', optionB: 'I would focus on keeping momentum and confidence high while working through the uncertainty.', dimA: 'process_oriented', dimB: 'mindset_resilience' },
  { id: 'P4', canonicalIndex: 3, scenario: 'You have had several frustrating prospecting conversations in a row.', optionA: 'I would stay consistent with my outreach and trust my approach rather than overreact to the setbacks.', optionB: 'I would spend more time understanding what buyers are looking for and adjust my approach around that.', dimA: 'mindset_resilience', dimB: 'customer_centric' },
  { id: 'P5', canonicalIndex: 4, scenario: 'A prospect agrees there is a problem, but it is still unclear why they would act now.', optionA: 'I would focus on understanding what success looks like for them and why it matters.', optionB: 'I would focus on quantifying the business impact of the problem and the value of solving it.', dimA: 'customer_centric', dimB: 'data_driven' },
  { id: 'P6', canonicalIndex: 5, scenario: 'A buyer is comparing your solution against a competitor.', optionA: 'I would focus on helping the buyer evaluate the measurable differences in business impact, risk, and value.', optionB: 'I would be transparent about where our solution is a strong fit and where it may fall short.', dimA: 'data_driven', dimB: 'authenticity' },
  { id: 'P7', canonicalIndex: 6, scenario: 'You realize the prospect may misunderstand what your product can do.', optionA: 'I would clarify the limitation directly, even if it makes the opportunity harder to win.', optionB: 'I would try to understand what created the misunderstanding and adjust my approach accordingly.', dimA: 'authenticity', dimB: 'learning_style' },
  { id: 'P8', canonicalIndex: 7, scenario: 'You are entering a new account with limited information.', optionA: 'I would begin with a hypothesis about what may matter most and adjust it based on what I learn.', optionB: 'I would focus on establishing trust by demonstrating an understanding of the buyer\'s situation and priorities.', dimA: 'learning_style', dimB: 'eq_trust' },
  { id: 'P9', canonicalIndex: 8, scenario: 'You are preparing for a high-stakes executive call.', optionA: 'I would focus on what matters most to the executive and how they are likely to evaluate the conversation.', optionB: 'I would focus on ensuring the conversation has a clear purpose, next steps, and path to decision.', dimA: 'eq_trust', dimB: 'process_oriented' },
  { id: 'P10', canonicalIndex: 9, scenario: 'A prospect gives you an objection that sounds partly true but incomplete.', optionA: 'I would dig deeper to understand what is really driving the objection before deciding how to respond.', optionB: 'I would stay composed and keep the conversation moving without letting the objection derail me.', dimA: 'curiosity', dimB: 'mindset_resilience' },
  { id: 'P11', canonicalIndex: 10, scenario: 'You are trying to create consensus across stakeholders.', optionA: 'I would focus on building a clear stakeholder map, decision process, and next-step plan.', optionB: 'I would focus on understanding the priorities and concerns of each stakeholder.', dimA: 'process_oriented', dimB: 'customer_centric' },
  { id: 'P12', canonicalIndex: 11, scenario: 'A deal has gone quiet near the end of the month.', optionA: 'I would focus on staying consistent and not letting the silence change how I approach the opportunity.', optionB: 'I would directly address the lack of progress and ask whether the buyer is prepared to move forward.', dimA: 'mindset_resilience', dimB: 'closing_confidence' },
  { id: 'P13', canonicalIndex: 12, scenario: 'A prospect is excited to do business together, but you are not sure the fit is strong enough.', optionA: 'I would spend more time validating my understanding of what the buyer actually needs before drawing a conclusion.', optionB: 'I would clearly share my concern about the fit rather than let enthusiasm carry the deal forward.', dimA: 'active_listening', dimB: 'authenticity' },
  { id: 'P14', canonicalIndex: 13, scenario: 'You are behind target and trying to regain momentum.', optionA: 'I would focus on creating more movement in active opportunities by asking for stronger commitments.', optionB: 'I would focus on understanding what is not working and changing my approach before pushing harder.', dimA: 'closing_confidence', dimB: 'learning_style' },
  { id: 'P15', canonicalIndex: 14, scenario: 'A prospect says something that leaves you unsure about their level of interest or commitment.', optionA: 'I would directly address the uncertainty and share the concern I have.', optionB: 'I would ask a few more questions to better understand what they mean.', dimA: 'authenticity', dimB: 'active_listening' },
  { id: 'P16', canonicalIndex: 15, scenario: 'A call is going well, but the prospect introduces information you did not expect.', optionA: 'I would adjust my approach if the new information changes my assumptions.', optionB: 'I would focus on understanding what the new information means for the situation and next steps.', dimA: 'learning_style', dimB: 'problem_solving' },
  { id: 'P17', canonicalIndex: 16, scenario: 'You are prospecting into a new segment that looks promising.', optionA: 'I would tailor my outreach around the specific challenges and pressures those buyers are likely facing.', optionB: 'I would focus on starting conversations quickly and letting the market tell me what works.', dimA: 'eq_trust', dimB: 'prospecting_comfort' },
  { id: 'P18', canonicalIndex: 17, scenario: 'A prospect\'s answer creates several directions the conversation could go.', optionA: 'I would follow the path that seems most likely to uncover something new.', optionB: 'I would follow the path that seems most relevant to the buyer\'s goals and priorities.', dimA: 'curiosity', dimB: 'customer_centric' },
  { id: 'P19', canonicalIndex: 18, scenario: 'You inherit an opportunity that lacks a clear path to a decision.', optionA: 'I would rebuild the plan and create a clearer path forward.', optionB: 'I would focus on the strongest business rationale and drive a clearer decision conversation.', dimA: 'process_oriented', dimB: 'closing_confidence' },
  { id: 'P20', canonicalIndex: 19, scenario: 'A prospect is close to buying, but you are not fully confident the fit is right.', optionA: 'I would stay composed and work through the uncertainty before changing the direction of the deal.', optionB: 'I would proactively share my concern, even if it creates tension in the conversation.', dimA: 'mindset_resilience', dimB: 'authenticity' },
  { id: 'P21', canonicalIndex: 20, scenario: 'A customer becomes frustrated after a difficult implementation conversation.', optionA: 'I would focus on helping the customer get back on track and achieve the outcome they are looking for.', optionB: 'I would focus on understanding what is driving their frustration and rebuilding confidence in the relationship.', dimA: 'customer_centric', dimB: 'eq_trust' },
  { id: 'P22', canonicalIndex: 21, scenario: 'A new account does not appear to be an ideal fit, but there are signs it may still be worth pursuing.', optionA: 'I would lead with the business case and evidence that suggest change may be worthwhile.', optionB: 'I would lead with an understanding of what the buyer may be experiencing or trying to accomplish.', dimA: 'data_driven', dimB: 'eq_trust' },
  { id: 'P23', canonicalIndex: 22, scenario: 'You sense a prospect may not be sharing the real reason they are hesitating.', optionA: 'I would address my concern directly and invite them to clarify what is really holding them back.', optionB: 'I would continue asking thoughtful questions until the real concern becomes clearer.', dimA: 'closing_confidence', dimB: 'active_listening' },
  { id: 'P24', canonicalIndex: 23, scenario: 'A current opportunity suddenly becomes more complex.', optionA: 'I would stay flexible and adapt my approach as I learn more about what is changing.', optionB: 'I would break the complexity into smaller parts until the best path forward becomes clear.', dimA: 'learning_style', dimB: 'problem_solving' },
  { id: 'P25', canonicalIndex: 24, scenario: 'A deal you were counting on just died.', optionA: 'I would spend time figuring out where the deal broke down before moving on.', optionB: 'I would start reaching out to new prospects rather than dwell on the loss.', dimA: 'problem_solving', dimB: 'prospecting_comfort' },
  { id: 'P26', canonicalIndex: 25, scenario: 'Your manager offers you focused coaching time.', optionA: 'I would use it to work through the most complex opportunity in my pipeline.', optionB: 'I would use it to strengthen my outbound approach and create more opportunities.', dimA: 'problem_solving', dimB: 'prospecting_comfort' },
  { id: 'P27', canonicalIndex: 26, scenario: 'A buyer describes a messy internal situation with no obvious owner.', optionA: 'I would start organizing the problem into manageable pieces we can work through.', optionB: 'I would spend more time understanding the situation before suggesting a path forward.', dimA: 'problem_solving', dimB: 'active_listening' },
  { id: 'P28', canonicalIndex: 27, scenario: 'A prospect casually mentions another initiative during a discovery conversation.', optionA: 'I would stay focused on the topic they are discussing and return to the initiative later if needed.', optionB: 'I would explore the initiative to see what it might reveal about their priorities or challenges.', dimA: 'active_listening', dimB: 'curiosity' },
  { id: 'P29', canonicalIndex: 28, scenario: 'You are researching a new account before first contact.', optionA: 'I would start with the data and indicators that suggest where the greatest business impact may exist.', optionB: 'I would start with the questions the account raises and explore where they lead.', dimA: 'data_driven', dimB: 'curiosity' },
  { id: 'P30', canonicalIndex: 29, scenario: 'It\'s Monday morning and your week is still largely unplanned.', optionA: 'I would schedule time for prospecting first, then build the rest of my week around it.', optionB: 'I would start by reviewing the numbers and prioritizing the opportunities with the greatest potential impact.', dimA: 'prospecting_comfort', dimB: 'data_driven' },
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

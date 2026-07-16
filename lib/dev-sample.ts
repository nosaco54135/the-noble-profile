/**
 * DEV ONLY — Sample assessment for /quotient/results/dev-test.
 * Allows design iteration on the results page without running an assessment.
 * Not gated behind NODE_ENV. Data is fake; URL is non-obvious.
 *
 * Primary:   Curious Closer       (curious trait × closer style)
 * Secondary: Strategic Challenger (strategic trait × challenger style)
 * Tertiary:  Analytical Hunter    (methodical trait × hunter style)
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
  eq_trust:            3.2,
  active_listening:    4.5,
  curiosity:           4.7,
  mindset_resilience:  3.8,
  closing_confidence:  3.9,
  prospecting_comfort: 3.6,
  data_driven:         4.5,
  authenticity:        3.4,
  process_oriented:    3.4,
  problem_solving:     4.8,
  customer_centric:    4.0,
  learning_style:      3.8,
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
// Scores: curious=(curiosity+problem_solving)/2=4.75, strategic=(data_driven+problem_solving)/2=4.65,
//         devoted=(customer_centric+active_listening)/2=4.25, empathic=(eq_trust+curiosity)/2=3.95,
//         methodical=(process_oriented+data_driven)/2=3.95, adaptive=(learning_style+mindset_resilience)/2=3.8,
//         resilient=(mindset_resilience+prospecting_comfort)/2=3.7, authentic=(authenticity+eq_trust)/2=3.3

const TRAITS: RankedTrait[] = [
  {
    key: 'curious',
    label: 'Curious',
    score: 4.7,
    matchPercentage: pct(4.7),   // 94
    tagline: 'Hears what others miss — and asks for the business anyway.',
    closeRankTie: false,
    tiedWith: [],
  },
  {
    key: 'strategic',
    label: 'Strategic',
    score: 4.65,
    matchPercentage: pct(4.65),  // 93
    tagline: 'Sees the non-obvious path to the outcome.',
    closeRankTie: false,
    tiedWith: [],
  },
  {
    key: 'devoted',
    label: 'Devoted',
    score: 4.25,
    matchPercentage: pct(4.25),  // 85
    tagline: 'Earns loyalty by putting the customer first.',
    closeRankTie: false,
    tiedWith: [],
  },
  {
    key: 'empathic',
    label: 'Empathic',
    score: 3.95,
    matchPercentage: pct(3.95),  // 79
    tagline: 'Reads the room — and makes the other person feel it.',
    closeRankTie: true,
    tiedWith: ['methodical'],
  },
  {
    key: 'methodical',
    label: 'Methodical',
    score: 3.95,
    matchPercentage: pct(3.95),  // 79
    tagline: 'Runs a predictable, repeatable process.',
    closeRankTie: true,
    tiedWith: ['empathic'],
  },
  {
    key: 'adaptive',
    label: 'Adaptive',
    score: 3.8,
    matchPercentage: pct(3.8),   // 76
    tagline: 'Learns faster than the market moves.',
    closeRankTie: false,
    tiedWith: [],
  },
  {
    key: 'resilient',
    label: 'Resilient',
    score: 3.7,
    matchPercentage: pct(3.7),   // 74
    tagline: "Keeps dialing through the no's.",
    closeRankTie: false,
    tiedWith: [],
  },
  {
    key: 'authentic',
    label: 'Authentic',
    score: 3.3,
    matchPercentage: pct(3.3),   // 66
    tagline: 'Tells the truth even when it costs the deal.',
    closeRankTie: false,
    tiedWith: [],
  },
]

// ─── Ranked styles (highest → lowest) ─────────────────────────────────────
// Scores: advisor=(customer_centric+problem_solving)/2=4.4, closer=(closing_confidence+problem_solving)/2=4.35,
//         challenger=(data_driven+closing_confidence)/2=4.2, hunter=(prospecting_comfort+curiosity)/2=4.15,
//         cultivator=(prospecting_comfort+active_listening)/2=4.05, student=(learning_style+mindset_resilience)/2=3.8,
//         connector=(authenticity+customer_centric)/2=3.7, architect=(process_oriented+learning_style)/2=3.6

const STYLES: RankedStyle[] = [
  {
    key: 'advisor',
    label: 'Advisor',
    score: 4.4,
    matchPercentage: pct(4.4),   // 88
    tagline: "Earns the right to recommend what's best.",
    closeRankTie: false,
    tiedWith: [],
  },
  {
    key: 'closer',
    label: 'Closer',
    score: 3.9,
    matchPercentage: pct(3.9),   // 78
    tagline: 'Asks for the decision without flinching.',
    closeRankTie: false,
    tiedWith: [],
  },
  {
    key: 'challenger',
    label: 'Challenger',
    score: 4.2,
    matchPercentage: pct(4.2),   // 84
    tagline: 'Reframes the problem so the decision is clear.',
    closeRankTie: false,
    tiedWith: [],
  },
  {
    key: 'hunter',
    label: 'Hunter',
    score: 4.15,
    matchPercentage: pct(4.15),  // 83
    tagline: 'Opens conversations other people avoid.',
    closeRankTie: false,
    tiedWith: [],
  },
  {
    key: 'cultivator',
    label: 'Cultivator',
    score: 4.05,
    matchPercentage: pct(4.05),  // 81
    tagline: 'Grows relationships that keep coming back.',
    closeRankTie: false,
    tiedWith: [],
  },
  {
    key: 'student',
    label: 'Student',
    score: 3.8,
    matchPercentage: pct(3.8),   // 76
    tagline: 'Gets measurably better every quarter.',
    closeRankTie: false,
    tiedWith: [],
  },
  {
    key: 'connector',
    label: 'Connector',
    score: 3.7,
    matchPercentage: pct(3.7),   // 74
    tagline: 'Builds relationships that outlast the deal.',
    closeRankTie: false,
    tiedWith: [],
  },
  {
    key: 'architect',
    label: 'Architect',
    score: 3.6,
    matchPercentage: pct(3.6),   // 72
    tagline: 'Builds systems that compound over time.',
    closeRankTie: false,
    tiedWith: [],
  },
]

// ─── Archetypes ────────────────────────────────────────────────────────────

const PRIMARY: ArchetypeCombo = {
  name: 'Curious Closer',
  trait: TRAITS[0],  // curious
  style: STYLES[1],  // closer
  matchPercentage: 92,
}

const SECONDARY: ArchetypeCombo = {
  name: 'Strategic Challenger',
  trait: TRAITS[1],  // strategic
  style: STYLES[2],  // challenger
  matchPercentage: 81,
}

const TERTIARY: ArchetypeCombo = {
  name: 'Analytical Hunter',
  trait: TRAITS[4],  // methodical
  style: STYLES[3],  // hunter
  matchPercentage: 73,
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
  inconsistencies: ['data_driven', 'learning_style'],
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

export const DEV_CODEX_PAYLOAD = {
  archetypeName: 'Curious Closer',
  sections: [
    {
      title: 'Your Selling Identity',
      content: `You are a Curious Closer, and that combination is rarer than it sounds. Curiosity at 4.7 and Closing Confidence at 3.9 do not always live in the same person. Most sellers trend one direction or the other. They are either genuinely interested in understanding the prospect and hesitate to push for commitment, or they are aggressive closers who ask surface questions and miss what is actually driving the decision. You are wired to do both. You go deep on the problem and you ask for the business without flinching.

What this looks like in practice: you walk into a discovery call with more preparation than the prospect expects. Your Curiosity score paired with Active Listening at 4.5 means you are not just asking questions, you are retaining the answers and threading them back into the conversation in ways that make buyers feel genuinely understood. Then, when the moment arrives, you close. You do not wait for permission.

Your Problem Solving score of 4.8 is the hidden engine here. It is your highest single dimension. You synthesize what you hear into non-obvious solution paths. That is what separates a Curious Closer from a curious talker. The insight lands, and then you ask for the decision.

[PULLQUOTE]Most sellers either go deep or close hard. You are wired to do both, and that is rare.[/PULLQUOTE]

Your secondary archetype, the Strategic Challenger, sharpens this further. Your Data-Driven score of 4.5 means you are not just gathering information for its own sake, you are synthesizing it into commercial implications. You see angles other sellers miss because you stayed curious long enough to find them, and you have the analytical instinct to translate those insights into business cases.

Your signature moves: the incisive follow-up question, the unexpected reframe, and the clean direct ask. Used together, they are formidable. Better sellers will recognize these as advantages because they are. The first signature move is the question others would not have asked, the one that surfaces the real problem. The second is the reframe that helps the buyer see their situation differently. The third is the close itself, asked plainly, without the hedging that defines weaker closers. Play this game. Do not water it down.`,
    },
    {
      title: 'Prospecting Approach for My Style',
      content: `Your Hunter style at 4.1 means you can open conversations others avoid. But your Prospecting Comfort at 3.6 tells a more specific story. You are capable of cold outreach. You do not necessarily love it as a standalone activity. That gap matters. It means you are at your best prospecting when there is intellectual content attached, a reason to reach out that is not just checking in or quota-filling.

Build your outreach around insight. Your Data-Driven score of 4.5 gives you a real edge here. You can construct a cold email or LinkedIn message around a specific metric, a pattern you noticed in their industry, or a problem their competitors are publicly struggling with. That is not a trick. That is your Curiosity and Strategic wiring doing what they do naturally.

Channel recommendations:
- LinkedIn (Best Fit): Rewards preparation, lets you reference their content, plays to your insight-led wiring
- Personalized video (Best Fit): Your Active Listening at 4.5 means you remember specifics from research, and a 90-second Loom referencing those specifics outperforms text every time
- Mass email sequences (Avoid): Generic touches will feel flat to you and perform accordingly. Your profile is an insight engine, not a volume machine

[PULLQUOTE]Your edge is not how many people you reach. It is what you reached out about.[/PULLQUOTE]

Cadence recommendation: 8 to 10 touches over 18 to 25 business days as a baseline. Front-load the effort. Your strongest touches are first and third. Lead with a sharp insight, follow up with a reframe. Do not coast on generic check-ins in touches 4 through 8. Each message should contain something you actually learned or noticed. Note that complex or high-ticket sales often warrant 15-20+ touches over 30-40+ business days, and the right cadence depends on deal type and ICP. A breakup message is optional, not mandatory. Use it when the relationship feels stalled and you want closure. Skip it when there is real reason to keep nurturing.

One discipline to build: initiate outreach before you feel fully ready. Your profile suggests you may over-research before reaching out. Set a timer. Twenty minutes of research per prospect, then send. Enough is enough. Schedule three 45-minute prospecting blocks per week and protect them. Outreach work, not pipeline review or admin. New names only.`,
    },
    {
      title: 'Discovery and Closing Tactics',
      content: `Discovery is where your profile reaches its peak performance. Curiosity at 4.7, Active Listening at 4.5, Problem Solving at 4.8. This is your zone. The questions you should be asking are not the standard "what keeps you up at night" variety. They are the second and third questions that follow an interesting answer.

A framework that fits your natural wiring: Hear, Repeat, Go Deeper. When a prospect says something that sounds like a real problem, repeat their exact words back, not a paraphrase, then ask what is underneath it. "You said you're losing deals in the final stage. What does that actually look like when it happens?" Your 4.5 Active Listening score means you will catch the specific language they use. Use it. Buyers trust people who remember what they said.

Four discovery questions written in your voice:
- "You mentioned timing earlier. What would have to be true in the next 30 days for this to become a priority?"
- "Walk me through the last time you tried to solve this. What worked and what fell apart?"
- "If we could only fix one thing in the next quarter, where would the highest-impact change be?"
- "What's the most expensive version of this problem if it stays unresolved?"

[PULLQUOTE]Your closing problem is not aggression. It is treating discovery like the destination instead of the on-ramp.[/PULLQUOTE]

Your Challenger style at 4.2 and Strategic trait at 4.6 mean you are capable of reframing the problem in ways the buyer has not considered. Do this in discovery, not just in pitching. "It sounds like the real issue isn't X, it's Y. Is that closer to it?" That move builds authority fast. SPIN Selling fits your profile precisely. Rackham's Implication and Need-Payoff question types are the structured version of what your Curiosity and Problem Solving scores already do naturally. Read it.

On closing: your Closing Confidence at 3.9 is solid, but do not let the depth of your discovery become an excuse to delay the ask. When you have done good discovery, you have earned the close. A direct, clean ask fits your identity. "Based on everything we've talked about, does this solve the problem?" Then stop talking. Use your data orientation to make the close feel inevitable. Build a simple ROI calculation during discovery and reference it when you ask. "You told me this is costing you 40K a quarter. We've agreed this addresses the root cause. What's the hesitation?" The closing behavior your scores predict you avoid is silence after the ask. Practice it. Ask the question, then say nothing for a full ten seconds. Whoever talks first loses.`,
    },
    {
      title: 'My Blind Spot Compass',
      content: `EQ and Trust at 3.2 is your most significant gap, and it is particularly important given your overall profile. You ask great questions and you analyze well, but your score suggests you may miss the emotional subtext of what a prospect is communicating. A buyer who is verbally engaged but internally resistant will fool you if you are focused on the content of their answers rather than the tone, the pause, the slight hedge.

The behavioral pattern: a discovery call where the prospect answers all your questions thoughtfully, agrees the problem is real, says the timing is good, and then ghosts you for three weeks. You walked out of that call feeling great. You missed two hedges, one false agreement, and a moment of visible discomfort that you read past because the conversation was going well intellectually. The fix is not to become someone who over-emotes. It is to build one specific habit. After a prospect answers a question, ask yourself what they did not say before you respond. Watch for the hedge words: probably, we'll see, that makes sense, kind of. They signal something unresolved.

Authenticity at 3.4 is your second gap. Your score suggests you may shade toward advancing the deal rather than volunteering information that complicates it. The behavioral pattern: late in a sales cycle, a prospect asks a question that has an honest answer that hurts your case. You answer it accurately but minimize. Or you redirect to a strength. The short-term cost of telling a prospect when the fit is imperfect is one deal. The long-term cost of not telling them is your reputation. Build the habit of naming one limitation of your solution in every late-stage conversation. "One thing to know is that this won't solve Y for you, that's out of scope. What it will do is X."

[PULLQUOTE]The deal you talk a buyer into is the customer who churns in nine months and tells everyone why.[/PULLQUOTE]

Process-Oriented at 3.4 is your lowest score, and it is flagged for inconsistency. This means how you answered forward and reverse questions about your process diverged significantly. Your self-image around process may be more generous than your actual behavior. You probably have a loose cadence and a CRM that is inconsistently updated. The symptom: deals that quietly stall because no one moved them. The behavioral pattern: it's Friday at 4:47 PM, you have not updated HubSpot since Tuesday, and three deals have aged past where they should be. The fix is not a complex system. Pick one non-negotiable: a 15-minute end-of-day pipeline review, every day. Measure your adherence to it for 30 days. Consistency on one thing beats ambitious systems you abandon.

Learning Style at 3.8 is also flagged for inconsistency. You likely think of yourself as someone who learns continuously, but the behavioral evidence may be patchier. Your learning probably spikes when something fails or a new challenge appears, and drops off when things are going well. The fix: schedule a fixed learning block, 20 minutes, twice a week, independent of whether you are struggling. Do not wait for pain to trigger growth.`,
    },
    {
      title: 'Recommended Tools and Resources',
      content: `1. SPIN Selling by Neil Rackham
Built directly for your profile. Rackham's Implication and Need-Payoff question types are the structured version of what your Curiosity and Problem Solving scores already do naturally. Reading this will give you language and architecture for the intuition you already have, making it repeatable rather than situational. Action this week: read the chapter on Implication questions and write five Implication questions for your three most active deals. Bring them into your next discovery call.

2. The Challenger Sale by Dixon and Adamson
Your Challenger style scores 4.2 and your Strategic trait scores 4.6. This book is the field manual for that combination. It will sharpen how you construct a reframe and help you use your Data-Driven score of 4.5 to teach prospects something they did not know before the conversation, which is where your authority comes from. Action this week: identify one industry insight relevant to your top three prospects and write a one-paragraph teaching pitch for each.

3. Gong.io Call Review (Self-Review Practice)
Not a book, a behavior. Pull two of your own recorded calls per week and listen specifically for two things: how long you talk after a prospect answers a question, and whether you caught the hedges and pauses. This directly addresses your EQ and Trust gap of 3.2 with evidence-based self-correction. You are Data-Driven enough to do this well if you build the habit. Action this week: book two 30-minute review blocks on your calendar. Not optional.

[PULLQUOTE]Tools do not change you. The deliberate practice you do with them does.[/PULLQUOTE]

4. Never Split the Difference by Chris Voss
Targeted directly at your EQ and Trust gap. Voss's tactical empathy techniques, particularly mirroring and labeling, are behavioral tools, not soft-skills philosophy. They will give your 3.2 EQ score a concrete set of moves to execute when you sense something is off in a conversation but do not have the language to surface it. Action this week: practice mirroring on three calls. Repeat the prospect's last three words as a question and see what comes back.

5. Lavender (Email Coaching Tool)
Addresses your Prospecting Comfort gap of 3.6 by giving you real-time feedback on outbound email quality. It scores your messages on length, readability, and personalization, which fits your insight-led approach to prospecting. Your Data-Driven wiring will appreciate the metrics. Action this week: install it, run your last five outbound emails through it, and rewrite anything below 80.`,
    },
    {
      title: 'My 30/60/90 Day Plan',
      content: `Days 1 through 30: Diagnose and Anchor
Theme: Build the foundation. Primary gap targeted: Process-Oriented (3.4).

Week 1: Run a pipeline audit. Go through every open opportunity and identify which ones have stalled because no explicit next step was committed to. For every stalled deal, send one direct re-engagement message with a specific ask. Not "checking in" but "I want to understand if this is still a priority for you. Can we talk Thursday at 2?"

Week 2: Start the daily pipeline review ritual. Fifteen minutes, end of day, every day. Review three things: what moved today, what is next on every active deal, and what you avoided. Track your adherence. Not your outcomes. Your adherence.

Week 3: Pull three of your recent recorded calls and score yourself on EQ signals missed. Specifically: did you catch the hedges? Did you pause after their answer or fill the silence? Write down two observations per call.

Week 4: Identify your five highest-value cold prospects and build insight-led outreach for each. Use your Data-Driven score of 4.5 to find a metric or pattern specific to each company. One message per prospect, written from scratch.

Day 30 milestone: Pipeline is structured and visible. Daily review habit is locked. You have written EQ observations from your own calls. You have launched five insight-led outreach attempts.

[PULLQUOTE]Day 90 you will not be a different type of seller. You will be a more complete version of the type you already are.[/PULLQUOTE]

Days 31 through 60: Build the Reps
Theme: Apply under pressure. Primary gap targeted: EQ and Trust (3.2).

Week 5: Add one Authenticity moment to every late-stage deal. Before each closing conversation, identify one limitation of your solution that is relevant to this specific buyer and name it in the meeting. Track whether this increases or decreases trust. You will find it increases it.

Week 6: Implement the Hear, Repeat, Go Deeper framework in every discovery call. After each call, write down three specific things the prospect said verbatim that you threaded back into the conversation. If you cannot remember three, your Active Listening score is not converting to closed deals the way it should.

Week 7: Schedule two fixed 20-minute learning blocks per week. No agenda required initially. Read from SPIN Selling or Never Split the Difference, or review a call. The goal for this phase is establishing the habit independent of urgency.

Week 8: Run one deliberate EQ test per week. Pick one conversation where you intentionally pause after the prospect answers and ask yourself: what aren't they saying? Then ask one question about it. "It sounds like there might be something else going on here. What am I missing?"

Day 60 milestone: You have named limitations in at least eight late-stage deals. You can document specific Active Listening callbacks from every discovery call. Two learning blocks per week is a habit.

Days 61 through 90: Compound and Measure
Theme: Convert insight into evidence. Primary gap targeted: Data-Driven (3.4 actual behavior despite 4.5 score).

Week 9: Measure your pipeline conversion rate at each stage and identify one specific stage where deals consistently stall. Use your Data-Driven score on yourself. Build a hypothesis about why deals stall there and test one change to your approach in that stage over the final 30 days.

Week 10: Close a deal where you named a limitation and tracked its effect on trust. Document what you said, how the prospect responded, and whether it accelerated or complicated the close. This is your Authenticity score being actively developed through evidence, not intention.

Week 11: Deliver one insight-led cold outreach sequence from start to first meeting. Measure how many touches it took and what the response rate was on your research-heavy first touch versus the later, more generic ones.

Week 12: Record yourself running a full discovery call, then review it against the SPIN framework. Count your Situation, Problem, Implication, and Need-Payoff questions. Identify which type you use least and build three examples of that question type for your next call.

Day 90 milestone: One quantified insight about your own selling. One trust-building Authenticity moment with a documented outcome. One full insight-led prospecting cycle measured. One discovery call analyzed against a named framework.

Reflection questions to ask honestly at day 30, day 60, and day 90:
- Where did I fill silence I should have left empty?
- Which deal did I advance this month that I should have disqualified?
- When was the last time I said something honest to a prospect that hurt my case in the short term?
- What did I learn this month that I am actually applying versus just collecting?
- Am I closing deals because the buyer is convinced, or because I am persistent?`,
    },
  ],
}

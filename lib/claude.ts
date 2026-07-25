import Anthropic from '@anthropic-ai/sdk'
import type { ScoringResult, DimensionScores, DimensionKey } from '@/types'
import { DIMENSION_LABELS, DIMENSION_ORDER } from '@/types'

function getClient() {
  return new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! })
}

/**
 * Dimension definitions quoted verbatim from spec Part 1. These are passed to
 * Claude so it understands what each numeric score represents behaviorally.
 */
const DIMENSION_DEFINITIONS: Record<DimensionKey, string> = {
  eq_trust:
    'Perceives and responds to the emotional subtext of a sales interaction. Notices hesitation, discomfort, enthusiasm, or defensiveness in a prospect’s words, tone, or behavior, and adjusts communication in real time based on what they observe rather than what was planned.',
  active_listening:
    'Retains the specific content of what a prospect says, their exact words, repeated phrases, stated priorities, and expressed concerns, and demonstrates that retention by referencing it accurately later in the same conversation or in subsequent interactions without being prompted.',
  curiosity:
    'Actively seeks information about a prospect’s business, industry, challenges, or situation beyond what is minimally required to advance the sale, whether through pre-call research, mid-call exploration, or follow-up investigation, driven by genuine interest in understanding more completely rather than by requirement or habit.',
  mindset_resilience:
    'Maintains consistent sales activity levels, outreach volume, follow-up cadence, pipeline progression, across periods of low conversion, rejection, or setback, without requiring external intervention or motivational support to sustain the behavior.',
  closing_confidence:
    'Initiates explicit commitment requests during sales conversations — asking directly for a decision, a next step, or a clear yes or no — without hedging, softening, or waiting for the prospect to volunteer forward movement.',
  prospecting_comfort:
    'Initiates contact with people who have not expressed interest and have no prior relationship with the seller — cold calls, cold emails, cold LinkedIn outreach — as a regular, self-directed activity rather than something done only under quota pressure or managerial instruction.',
  data_driven:
    'Uses quantitative information, metrics, conversion rates, revenue impact figures, activity data, to make sales decisions, build business cases for prospects, and evaluate their own performance, rather than relying primarily on intuition, relationship feel, or qualitative signals.',
  authenticity:
    'Prioritizes honest representation of the product, the fit, and the situation over advancing the sale — specifically, volunteers information that could reduce the likelihood of closing when that information is relevant to the prospect making a good decision.',
  process_oriented:
    'Applies predetermined, repeatable sequences to sales activities, call structures, follow-up cadences, pipeline review rhythms, CRM hygiene routines, consistently and self-directedly, independent of whether outcomes in any given period are good or bad.',
  problem_solving:
    'Synthesizes information gathered during a sales interaction into a novel solution path — identifying non-obvious connections between the prospect’s stated problem and available solutions, generating creative approaches to objections, or finding workarounds when standard paths are blocked.',
  customer_centric:
    'Orients sales decisions and recommendations around the prospect’s measurable long-term outcome rather than the immediate transaction — specifically, takes actions during the sale that serve the customer’s success even when those actions reduce the size or speed of the deal.',
  learning_style:
    'Takes ownership of improving their own sales performance through self-directed means — whether consuming educational content, reviewing their own calls, seeking feedback, observing peers, or structured reflection — and demonstrably applies what they learn to change specific behaviors, without waiting for a formal review process or managerial instruction to initiate that development.',
}

// ─── System prompt (fixed) ─────────────────────────────────────────────────

const SYSTEM_PROMPT = `You are a senior sales coach writing a personal coaching guide called The Noble Compass for a specific sales professional. This is a paid product. It must feel worth every dollar.

HOW TO READ THE SCORES — THIS GOVERNS EVERYTHING BELOW:
These scores measure preference, not skill. A high score is a move this seller reaches for first and often. A low score is the move they turn to last — NOT a thing they are bad at. Never describe a low score as a weakness, a deficiency, or something they "struggle with" or "fail at." A great closer who simply prefers other moves will score low on prospecting; this report must never tell them they are bad at prospecting. The honest read of a low score: "this is what you turn to last, and here is the situation where reaching for it late costs you." Use preference language throughout: "leans toward," "reaches for first," "turns to last," "under-uses." Never "strong at" / "weak at."

WRITING STANDARDS — NON-NEGOTIABLE:
- Every claim must reference a specific dimension score. Never write "your curiosity is strong" — write "your Curiosity score of 4.7 means this is a move you reach for first..."
- When referencing dimension scores in body copy, ALWAYS use the human-readable label (e.g. 'EQ / Trust', 'Active Listening', 'Self-Improvement') — NEVER the raw key (e.g. 'eq_trust', 'active_listening', 'learning_style'). The raw keys are for internal use only and must never appear in generated text.
- Every section must contain at least one named framework, methodology, or book reference tied directly to the person's scores
- Every recommendation must be behavioral and specific — not "improve your follow-up" but "send a Loom video follow-up within 2 hours of every discovery call where you heard an unresolved objection"
- Tone: direct, confident, coach-to-athlete — not therapist, not cheerleader, not corporate trainer
- Length: 380-480 words per section minimum. Dense. No padding.
- Each section must contain one pull-quote-worthy sentence — a single sharp, memorable line that captures the section's core insight. Mark it with [PULLQUOTE] tags so it can be extracted.
- Banned words and phrases: crucial, pivotal, vital, highlight, underscore, showcase, landscape, testament, tapestry, vibrant, intricate, additionally, align with, foster, garner, enhance, delve, serves as, stands as, game-changer, leverage (as verb), synergy, journey, empower, unlock, supercharge
- No em dashes in paragraph copy. Use periods or commas.
- When writing example prospect dialogue or closing avoidance examples, use first-person prospect voice correctly. Example: "I'll send the proposal — let me know if you have questions" not "let you know"
- No generic openers. Never start a section with "As a [archetype]..." or "Your profile shows..."
- Write in second person (you/your) throughout

SECTION STRUCTURE — follow this exactly for all 6 sections:

Section 1: Your Selling Identity
Open with the single most important behavioral truth about this person's selling profile — the thing that explains most of what comes naturally to them and most of what they leave on the table by reaching for it last. Then explain how their primary archetype combination (trait + style) creates a specific competitive edge. Reference the secondary and tertiary archetypes and what they add or complicate. Close with 3 specific "signature moves" — concrete behaviors this person exhibits that better sellers recognize as advantages.
If a CLOSE-LEAD flag is present in the data, name the runner-up explicitly: "you lead as a [primary], with a strong undercurrent of [runner-up]." If no flag is present, commit fully to the primary archetype without hedging.

Section 2: Prospecting Approach for Your Style
Open by naming the specific tension in this person's prospecting profile — the gap between their natural wiring and what most prospecting advice demands. Give 3 specific channel recommendations (e.g. LinkedIn, cold email, cold call, referral, video outreach) rated explicitly as Best Fit / Workable / Avoid for this profile with one sentence of reasoning each. Recommend a specific cadence structure (number of touches, timing). Frame the cadence as a baseline minimum. Note explicitly that complex or high-ticket sales warrant 15-20+ touches over 30-40 business days, and that the right length depends on deal type and ICP. If including a breakup message as a cadence touch, flag it as optional — not all selling contexts or seller styles call for it. Name one prospecting discipline this person must build that doesn't come naturally, and give a concrete weekly implementation.

Section 3: Discovery and Closing Tactics
Open by identifying where in the sales process this person is strongest and where they lose momentum. Give one named discovery framework that fits their scores (SPIN, Challenger, MEDDIC, etc.) and explain specifically why it fits. List 4 discovery questions written in this person's voice — questions they would actually ask, not generic templates. Address closing directly: name the specific closing behavior their scores predict they avoid, and give one concrete closing technique to practice.

Section 4: My Blind Spot Compass
Open with one line defining what a blind spot means in this report: a blind spot is a move this seller turns to last — and because they rarely reach for it, they may not notice the moments that call for it. Cover the bottom 3-4 dimension scores this way. For each:
- Name the dimension and score, and state plainly that a low score means "reaches for this last," not "bad at this"
- Describe the specific situation where under-reaching for this move costs them — give a scene, not an abstraction
- Give one concrete fix that takes less than 10 minutes per day, framed as building a move they can reach for on purpose, not repairing a defect

Section 5: Recommended Tools and Resources
Recommend exactly 5 resources drawn primarily from the RESOURCE POOL matching the seller's primary trait (listed below). You may draw 1 resource from outside the pool if it directly addresses the seller's single lowest scoring dimension and is not already covered by the pool.

For each resource:
- Name it
- Explain in 2-3 sentences exactly why it fits this specific profile and scores
- Give one concrete action: how to use it this week, not someday
- Flag whether it builds an under-reached move or reinforces a natural lean

Never recommend a resource that does not appear in the pool for this trait type unless it addresses the single lowest scoring dimension and adds something the pool does not cover.
Never recommend enterprise-only tools that require team purchase: Gong, Chorus, Salesloft, Outreach, ZoomInfo, Seismic, Highspot. When a sequencing tool is needed, recommend Instantly.ai ($37/mo) or Lemlist ($59/mo) — never Outreach or Salesloft. When a call recording tool is needed, recommend Fathom (free) — never Gong or Chorus.
Never recommend the same resource twice in a single Compass.

RESOURCE POOLS BY PRIMARY TRAIT:

Curious trait:
- SPIN Selling by Neil Rackham (structures natural question instinct — strength amplifier)
- The Challenger Sale by Dixon and Adamson (channels insight into commercial reframes — strength amplifier)
- Fathom (free AI call recorder — turns curiosity into self-correction data, zero friction — gap: process)
- Predictable Revenue by Ross and Tyler (adds systematic outreach to insight-led wiring — gap: prospecting)
- Clay (research automation at $149/mo, flag as growth-stage investment — strength amplifier)

Empathic trait:
- Never Split the Difference by Chris Voss (gives tactical moves to an emotionally fluent seller — gap: closing)
- The Trusted Advisor by Maister and Green (codifies the relationship-to-revenue path — strength amplifier)
- Loom (free tier — amplifies personal connection in async follow-up — strength amplifier)
- Fanatical Prospecting by Jeb Blount (volume discipline counterweight for a relationship-first seller — gap: prospecting)
- LinkedIn Sales Navigator at $99/mo individual (turns relationship instinct into a scalable network system — strength amplifier)

Authentic trait:
- To Sell Is Human by Daniel Pink (validates and sharpens consultative instinct — strength amplifier)
- The Sales Development Playbook by Trish Bertuzzi (builds structure without compromising voice — gap: process)
- Lavender at $29/mo (keeps outreach authentic while improving response rates — gap: prospecting)
- Extreme Ownership by Willink and Babin (accountability framework for sellers who over-serve at expense of pipeline — gap: mindset)
- HubSpot Sales Hub (free CRM tier available — supports relationship tracking without feeling like a spreadsheet — gap: process)

Strategic trait:
- The Challenger Sale by Dixon and Adamson (field manual for analytical insight-led selling — strength amplifier)
- Thinking Fast and Slow by Daniel Kahneman (sharpens analytical edge and adds behavioral read of buyers — strength amplifier)
- Apollo.io (free tier plus $49/mo individual — data-driven prospecting infrastructure — gap: prospecting)
- Fathom (free call recorder — quantifies what is working — strength amplifier)
- Meddicc by Andy Walker (deal qualification framework that matches analytical wiring — gap: process)

Mindful trait:
- The Inner Game of Tennis by Timothy Gallwey (mental performance under pressure — strength amplifier)
- Extreme Ownership by Willink and Babin (converts resilience into accountability — strength amplifier)
- Atomic Habits by James Clear (behavior-change framework for building new disciplines — gap: process)
- Lemlist at $59/mo (converts learning style into measurable outreach experiments — gap: prospecting)
- The Sales Development Playbook by Trish Bertuzzi (systematic approach matching disciplined mindset — gap: process)

Challenger trait:
- The Challenger Sale by Dixon and Adamson (primary text for this exact profile — strength amplifier)
- Gap Selling by Keenan (commercial tension framework matching direct closing style — strength amplifier)
- Meddicc by Andy Walker (deal qualification for sellers who close hard but need to qualify harder — gap: process)
- Fathom (free call recorder — validates whether the challenge is landing or alienating — gap: EQ)
- Never Split the Difference by Chris Voss (adds negotiation nuance to a pressure-forward closer — gap: EQ)

Process trait:
- Predictable Revenue by Aaron Ross and Marylou Tyler (foundational text for systematic pipeline building — strength amplifier)
- HubSpot Sales Hub (free CRM designed for process-oriented sellers — strength amplifier)
- The Sales Development Playbook by Trish Bertuzzi (cadence architecture for structured sellers — strength amplifier)
- Atomic Habits by James Clear (habit reinforcement for building new behaviors — strength amplifier)
- Instantly.ai at $37/mo (sequence infrastructure matching process wiring — strength amplifier)

Prospector trait:
- Fanatical Prospecting by Jeb Blount (core text — validates and extends natural outreach instinct — strength amplifier)
- Gap Selling by Keenan (adds commercial framing to high-volume outreach — strength amplifier)
- Apollo.io (free tier plus $49/mo — scales what the Prospector already does well — strength amplifier)
- LinkedIn Sales Navigator at $99/mo individual (expands top of funnel systematically — strength amplifier)
- The Psychology of Selling by Brian Tracy (mindset reinforcement for high-activity sellers — strength amplifier)

Section 6: My 30/60/90 Day Plan
Structure as three distinct phases. Each phase must have:
- A theme (3-4 words)
- The primary under-reached move it targets
- 4 specific weekly commitments written as action items (not goals — actions)
- A milestone: what measurably changes by the end of this phase

Close the plan with 5 end-of-month reflection questions written specifically for this archetype — questions that will be uncomfortable to answer honestly.

OUTPUT FORMAT:
Return the 6 sections as plain text with ## headers. No markdown tables. No bullet points in the body copy — use dashes only for lists inside sections. Mark pull quotes with [PULLQUOTE]your quote here[/PULLQUOTE].`

// ─── User prompt (dynamic) ─────────────────────────────────────────────────

function buildUserPrompt(data: {
  primaryName: string
  primaryTrait: string
  primaryStyle: string
  primaryTagline: string
  secondaryName: string
  tertiaryName: string
  dimensionScores: Record<string, number>
  topDimensions: { key: string; label: string; score: number }[]
  gapDimensions: { key: string; label: string; score: number }[]
  traitRankings: { name: string; score: number; tagline: string }[]
  styleRankings: { name: string; score: number; tagline: string }[]
  traitMargin?: number
  styleMargin?: number
  neutralHeavy?: boolean
  extremeHeavy?: boolean
}): string {
  const scoreLines = Object.entries(data.dimensionScores)
    .map(([key, score]) => `  ${DIMENSION_LABELS[key as DimensionKey]}: ${score.toFixed(1)}/5.0`)
    .join('\n')

  const topLines = data.topDimensions
    .map(d => `  ${d.label}: ${d.score.toFixed(1)}/5.0`)
    .join('\n')

  const gapLines = data.gapDimensions
    .map(d => `  ${d.label}: ${d.score.toFixed(1)}/5.0`)
    .join('\n')

  const closeLead: string[] = []
  if (data.traitMargin !== undefined && data.traitMargin < 0.10) closeLead.push(`trait (lead over runner-up is only ${data.traitMargin.toFixed(2)})`)
  if (data.styleMargin !== undefined && data.styleMargin < 0.10) closeLead.push(`style (lead over runner-up is only ${data.styleMargin.toFixed(2)})`)

  const signalParts: string[] = []
  if (closeLead.length > 0) signalParts.push(`CLOSE-LEAD: ${closeLead.join(' and ')}. Name the runner-up as a strong undercurrent rather than claiming a decisive primary.`)
  if (data.neutralHeavy) signalParts.push(`This seller answered "no preference" on many questions, so the leans are gently drawn. Describe tendencies, not certainties.`)
  if (data.extremeHeavy) signalParts.push(`This seller answered at the extremes on most questions, so the leans are sharply drawn and can be described with confidence.`)
  const signalNote = signalParts.length > 0 ? signalParts.join('\n\n') : 'Answer pattern is balanced; read the leans at face value.'

  return `Write The Noble Compass for this seller.

ARCHETYPE:
- Primary: ${data.primaryName} (${data.primaryTrait} trait / ${data.primaryStyle} style)
- Tagline: ${data.primaryTagline}
- Secondary: ${data.secondaryName}
- Tertiary: ${data.tertiaryName}

ALL 12 DIMENSION SCORES (1.0–5.0 scale):
${scoreLines}

TOP 3 MOVES THIS SELLER REACHES FOR FIRST (highest preference):
${topLines}

BOTTOM 3 MOVES THIS SELLER REACHES FOR LAST (lowest preference — NOT weaknesses):
${gapLines}

${signalNote}

PRIMARY TRAIT (for resource pool selection): ${data.primaryTrait}

TRAIT AXIS RANKINGS (all 8, ranked):
${data.traitRankings.map((t, i) => `  ${i + 1}. ${t.name}: ${t.score.toFixed(1)} — ${t.tagline}`).join('\n')}

STYLE AXIS RANKINGS (all 8, ranked):
${data.styleRankings.map((s, i) => `  ${i + 1}. ${s.name}: ${s.score.toFixed(1)} — ${s.tagline}`).join('\n')}

Write all 6 sections now. Each section 380-480 words minimum. Follow all instructions in the system prompt exactly.`
}

// ─── Entry point ───────────────────────────────────────────────────────────

/**
 * Generates a personalized 6-section Compass via Claude Sonnet.
 * Uses streaming internally and returns the complete text.
 */
export async function generateCodex(result: ScoringResult): Promise<string> {
  // Derive top/least-reached dimensions by sorting dimension scores
  const sortedDims = (DIMENSION_ORDER as DimensionKey[])
    .map(key => ({ key, label: DIMENSION_LABELS[key], score: result.dimensionScores[key] }))
    .sort((a, b) => b.score - a.score)
  const topDimensions = sortedDims.slice(0, 3)
  const leastReachedDimensions = sortedDims.slice(-3)

  const stream = getClient().messages.stream({
    model: 'claude-sonnet-4-6',
    max_tokens: 12000,
    system: SYSTEM_PROMPT,
    messages: [{
      role: 'user',
      content: buildUserPrompt({
        primaryName: result.primary.name,
        primaryTrait: result.primary.trait.label,
        primaryStyle: result.primary.style.label,
        primaryTagline: result.primary.trait.tagline,
        secondaryName: result.secondary.name,
        tertiaryName: result.tertiary.name,
        dimensionScores: result.dimensionScores,
        topDimensions,
        gapDimensions: leastReachedDimensions,
        traitRankings: result.traits.map(t => ({ name: t.label, score: t.score, tagline: t.tagline })),
        styleRankings: result.styles.map(s => ({ name: s.label, score: s.score, tagline: s.tagline })),
        traitMargin: result.traitMargin,
        styleMargin: result.styleMargin,
        neutralHeavy: result.neutralHeavy,
        extremeHeavy: result.extremeHeavy,
      }),
    }],
  })

  const message = await stream.finalMessage()

  const textBlock = message.content.find((b) => b.type === 'text')
  if (!textBlock || textBlock.type !== 'text') {
    throw new Error('Claude returned no text content')
  }

  return textBlock.text
}

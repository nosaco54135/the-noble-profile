import Anthropic from '@anthropic-ai/sdk'
import type { ScoringResult, DimensionScores, DimensionKey } from '@/types'
import { DIMENSION_LABELS } from '@/types'

function getClient() {
  return new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! })
}

/**
 * Dimension definitions quoted verbatim from spec Part 1. These are passed to
 * Claude so it understands what each numeric score represents behaviorally.
 */
const DIMENSION_DEFINITIONS: Record<DimensionKey, string> = {
  eq_trust:
    'Perceives and responds to the emotional subtext of a sales interaction. Notices hesitation, discomfort, enthusiasm, or defensiveness in a prospect\u2019s words, tone, or behavior, and adjusts communication in real time based on what they observe rather than what was planned.',
  active_listening:
    'Retains the specific content of what a prospect says, their exact words, repeated phrases, stated priorities, and expressed concerns, and demonstrates that retention by referencing it accurately later in the same conversation or in subsequent interactions without being prompted.',
  curiosity:
    'Actively seeks information about a prospect\u2019s business, industry, challenges, or situation beyond what is minimally required to advance the sale, whether through pre-call research, mid-call exploration, or follow-up investigation, driven by genuine interest in understanding more completely rather than by requirement or habit.',
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
    'Synthesizes information gathered during a sales interaction into a novel solution path — identifying non-obvious connections between the prospect\u2019s stated problem and available solutions, generating creative approaches to objections, or finding workarounds when standard paths are blocked.',
  customer_centric:
    'Orients sales decisions and recommendations around the prospect\u2019s measurable long-term outcome rather than the immediate transaction — specifically, takes actions during the sale that serve the customer\u2019s success even when those actions reduce the size or speed of the deal.',
  learning_style:
    'Takes ownership of improving their own sales performance through self-directed means — whether consuming educational content, reviewing their own calls, seeking feedback, observing peers, or structured reflection — and demonstrably applies what they learn to change specific behaviors, without waiting for a formal review process or managerial instruction to initiate that development.',
}

function formatDimensionScores(scores: DimensionScores): string {
  return Object.entries(scores)
    .map(([key, value]) => {
      const label = DIMENSION_LABELS[key as keyof typeof DIMENSION_LABELS] ?? key
      const bar = '█'.repeat(Math.round(value)) + '░'.repeat(5 - Math.round(value))
      const level =
        value >= 4.5 ? 'Very High' :
        value >= 3.5 ? 'High' :
        value >= 2.5 ? 'Moderate' :
        value >= 1.5 ? 'Low' : 'Very Low'
      return `• ${label}: ${value.toFixed(1)}/5.0 [${bar}] (${level})`
    })
    .join('\n')
}

function buildSystemPrompt(result: ScoringResult): string {
  const traitRanking = result.traits
    .map((t, i) => `${i + 1}. ${t.label} — ${t.score.toFixed(1)}/5.0 (${t.matchPercentage}%) · "${t.tagline}"`)
    .join('\n')

  const styleRanking = result.styles
    .map((s, i) => `${i + 1}. ${s.label} — ${s.score.toFixed(1)}/5.0 (${s.matchPercentage}%) · "${s.tagline}"`)
    .join('\n')

  const dimensionDefinitions = Object.entries(DIMENSION_DEFINITIONS)
    .map(
      ([key, def]) =>
        `• ${DIMENSION_LABELS[key as DimensionKey]}: ${def}`,
    )
    .join('\n\n')

  const consistencyBlock =
    result.inconsistencies.length === 0
      ? 'No dimensions flagged inconsistent. Responses to forward and reverse questions align on every dimension.'
      : `Flagged inconsistencies: ${result.inconsistencies
          .map((k) => DIMENSION_LABELS[k])
          .join(
            ', ',
          )}. On these dimensions, the user\u2019s responses to forward and reverse questions diverge by more than 1.5 points. Treat these dimensions as tensions in the profile, places where self-perception may not match behavior. Do not surface the flags as flags; use them to write with more nuance.`

  return `You are a sharp, experienced sales coach at The Noble Seller. Your task is to write a custom 6-section Codex for a salesperson based on their Noble Quotient assessment results.

BRAND VOICE: Write as a sharp, experienced sales coach. Avoid AI-style writing patterns — no "in today's fast-paced world," no "imagine if you could," no "unlock your potential." Direct, specific, behaviorally grounded. Use the exact dimension scores by name and number when relevant.

IMPORTANT: Their archetype is dynamically generated from two independent axes: a trait adjective and a style noun. These are NOT pre-defined character types. You must write specifically about the combination of THEIR top trait and THEIR top style as it applies to their individual scores.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
THEIR NOBLE QUOTIENT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PRIMARY ARCHETYPE: The ${result.primary.name}
  Trait component:  ${result.primary.trait.label} (${result.primary.trait.score.toFixed(1)}/5.0)
  Style component:  ${result.primary.style.label} (${result.primary.style.score.toFixed(1)}/5.0)
  Combined match:   ${result.primary.matchPercentage}%

SECONDARY ARCHETYPE: The ${result.secondary.name}
  Trait: ${result.secondary.trait.label} (${result.secondary.trait.score.toFixed(1)}/5.0)
  Style: ${result.secondary.style.label} (${result.secondary.style.score.toFixed(1)}/5.0)

TERTIARY ARCHETYPE: The ${result.tertiary.name}
  Trait: ${result.tertiary.trait.label} (${result.tertiary.trait.score.toFixed(1)}/5.0)
  Style: ${result.tertiary.style.label} (${result.tertiary.style.score.toFixed(1)}/5.0)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TRAIT AXIS — All 8 traits ranked:
${traitRanking}

STYLE AXIS — All 8 styles ranked:
${styleRanking}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
12 DIMENSION SCORES (underlying data):
${formatDimensionScores(result.dimensionScores)}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
DIMENSION DEFINITIONS (what each score measures behaviorally):

${dimensionDefinitions}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CONSISTENCY FLAGS:
${consistencyBlock}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

WRITING INSTRUCTIONS:
- Reference their specific archetype name ("The ${result.primary.name}") and explain what that particular trait+style combination means in practice.
- Note the gap between their top-ranked trait/style and the lower-ranked ones. That gap reveals both strengths and blind spots.
- Be specific. Reference exact dimension scores and what they mean for this person.
- Be direct and bold. This is a performance coach speaking, not a corporate HR report.
- Use "you". Write as if speaking directly to them.
- Each section should be 150–250 words, substantive and action-oriented.
- Do not use generic sales advice. Every sentence must follow from their actual scores.
- Format each section with a clear header using ##`
}

function buildUserPrompt(primaryName: string): string {
  return `Write my complete 6-section Noble Codex based on my assessment results.

## Section 1: Your Selling Identity
Who I am as a salesperson — my natural wiring as a ${primaryName}, what this specific trait+style combination means in practice, and the signature moves that make me effective.

## Section 2: Prospecting Approach for My Style
How I should approach outreach and pipeline generation given my specific profile. What channels, cadences, and language patterns fit me best.

## Section 3: Discovery & Closing Tactics
The discovery questions and closing approaches that match my natural style. How to use my strengths in the moments that matter most.

## Section 4: My Blind Spot Codex
The specific dimensions where my scores reveal I may be leaving deals on the table, and concrete tactical ways to compensate without trying to be someone I'm not.

## Section 5: Recommended Tools & Resources
3–5 specific book, course, or practice recommendations precisely matched to my score profile and growth areas.

## Section 6: My 30/60/90 Day Plan
A concrete three-phase action plan. Each phase should have 3–4 specific, measurable commitments tied directly to my scores.`
}

/**
 * Generates a personalized 6-section Codex via Claude Sonnet.
 * Uses streaming internally and returns the complete text.
 */
export async function generateCodex(result: ScoringResult): Promise<string> {
  const stream = getClient().messages.stream({
    model: 'claude-sonnet-4-6',
    max_tokens: 12000,
    system: buildSystemPrompt(result),
    messages: [{ role: 'user', content: buildUserPrompt(result.primary.name) }],
  })

  const message = await stream.finalMessage()

  const textBlock = message.content.find((b) => b.type === 'text')
  if (!textBlock || textBlock.type !== 'text') {
    throw new Error('Claude returned no text content')
  }

  return textBlock.text
}

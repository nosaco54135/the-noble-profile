/**
 * Archetype duplicate-copy quality check.
 *
 * Read-only. Scans every archetype object in lib/archetypes.ts for repeated
 * or near-repeated prose across DIFFERENT archetypes, so copy drift (the
 * same sentence, or something close to it, pasted into two archetypes) gets
 * caught before it ships.
 *
 * This script never writes to any file. It only reads lib/archetypes.ts and
 * prints a report to stdout.
 *
 * Usage:  npm run dup-check
 *         node --experimental-strip-types scripts/archetype-dup-check.ts
 */

import { readFileSync } from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ARCHETYPES_PATH = path.resolve(__dirname, '../lib/archetypes.ts')

// ─── Shape of what we read out of lib/archetypes.ts ───────────────────────

interface ArchetypeLike {
  slug: string
  intro: string[]
  strengths: string[]
  blindSpots: string[]
  inTheDeal: string
  sellsBestTo: string
  growthEdge: string
  tension?: string
  mistakenFor?: { slug: string; name: string; tell: string }
}

// ─── Step 1: load the archetype array ───────────────────────────────────────
//
// Primary path: import the real module. Path aliases like "@/lib/archetypes"
// only resolve under Next.js's bundler/tsconfig "paths" mapping, not under
// plain `node --experimental-strip-types`, so lib/archetypes.ts is loaded by
// a direct relative/file-URL import here (no "@/" alias involved) and this
// path is expected to succeed. The text-extraction fallback below exists for
// resilience if that ever stops being true (e.g. the file moves, or its
// module graph pulls in something Node can't load standalone).

type LoadResult = { archetypes: ArchetypeLike[]; method: 'import' | 'fallback-text' }

async function loadViaImport(): Promise<ArchetypeLike[]> {
  const mod = (await import(pathToFileURL(ARCHETYPES_PATH).href)) as {
    archetypes: ArchetypeLike[]
  }
  if (!Array.isArray(mod.archetypes)) {
    throw new Error('imported module has no `archetypes` array export')
  }
  return mod.archetypes
}

// ─── Fallback: regex-based text extraction ─────────────────────────────────
//
// Only used if the import above throws. Parses the file as text and pulls
// out each archetype object by its known formatting (two-space-indented
// `{` / `},` at the array's top level; fields using the Archetype interface
// names). This is approximate — it depends on the file's current formatting
// conventions — which is exactly why it's the fallback, not the primary path.

function unescapeQuoted(raw: string): string {
  return raw.replace(/\\(['"])/g, '$1')
}

/** Match a single quoted string literal: 'like this' or "like this", with escapes. */
const QUOTED = /(['"])((?:\\.|(?!\1)[\s\S])*)\1/g

function extractQuotedLiterals(segment: string): string[] {
  const out: string[] = []
  let m: RegExpExecArray | null
  const re = new RegExp(QUOTED)
  while ((m = re.exec(segment))) {
    out.push(unescapeQuoted(m[2]))
  }
  return out
}

function extractScalarField(block: string, field: string): string | undefined {
  const re = new RegExp(`${field}:\\s*\\n?\\s*(['"])((?:\\\\.|(?!\\1)[\\s\\S])*?)\\1,`)
  const m = re.exec(block)
  return m ? unescapeQuoted(m[2]) : undefined
}

function extractArrayField(block: string, field: string): string[] {
  const re = new RegExp(`${field}:\\s*\\[([\\s\\S]*?)\\n\\s{4}\\],`)
  const m = re.exec(block)
  if (!m) return []
  return extractQuotedLiterals(m[1])
}

function extractMistakenForTell(block: string): string | undefined {
  const mistakenForBlock = /mistakenFor:\s*\{([\s\S]*?)\n\s{4}\},/.exec(block)
  if (!mistakenForBlock) return undefined
  return extractScalarField(mistakenForBlock[1], 'tell')
}

function loadViaTextFallback(): ArchetypeLike[] {
  const text = readFileSync(ARCHETYPES_PATH, 'utf8')
  const blockRe = /\{\n\s{4}slug: '([a-z0-9-]+)',[\s\S]*?\n\s{2}\},/g
  const archetypes: ArchetypeLike[] = []
  let m: RegExpExecArray | null
  while ((m = blockRe.exec(text))) {
    const slug = m[1]
    const block = m[0]
    archetypes.push({
      slug,
      intro: extractArrayField(block, 'intro'),
      strengths: extractArrayField(block, 'strengths'),
      blindSpots: extractArrayField(block, 'blindSpots'),
      inTheDeal: extractScalarField(block, 'inTheDeal') ?? '',
      sellsBestTo: extractScalarField(block, 'sellsBestTo') ?? '',
      growthEdge: extractScalarField(block, 'growthEdge') ?? '',
      tension: extractScalarField(block, 'tension'),
      mistakenFor: extractMistakenForTell(block)
        ? { slug: '', name: '', tell: extractMistakenForTell(block)! }
        : undefined,
    })
  }
  if (archetypes.length === 0) {
    throw new Error('text-extraction fallback found zero archetype blocks')
  }
  return archetypes
}

async function load(): Promise<LoadResult> {
  try {
    const archetypes = await loadViaImport()
    return { archetypes, method: 'import' }
  } catch (importErr) {
    console.error(`[archetype-dup-check] direct import failed (${(importErr as Error).message}); falling back to text extraction.`)
    const archetypes = loadViaTextFallback()
    return { archetypes, method: 'fallback-text' }
  }
}

// ─── Step 2: gather source strings ──────────────────────────────────────────
//
// Included: intro[], strengths[], blindSpots[], inTheDeal, sellsBestTo,
// growthEdge, tension, mistakenFor.tell — every prose field on the
// Archetype interface.
// Excluded per spec: slug, name, and any field that is an array of slugs
// (adjacent, mistakenFor.slug). trait/style/tagline/metaDescription are also
// excluded — they're identifiers/short labels, not the prose this check is
// scanning for echoed sentences, and were not part of the original script's
// field set (see VALIDATION BASELINE note in the report below).

interface SourceEntry {
  slug: string
  field: string
  text: string
}

function gatherSources(archetypes: ArchetypeLike[]): SourceEntry[] {
  const sources: SourceEntry[] = []
  for (const a of archetypes) {
    for (const t of a.intro) sources.push({ slug: a.slug, field: 'intro', text: t })
    for (const t of a.strengths) sources.push({ slug: a.slug, field: 'strengths', text: t })
    for (const t of a.blindSpots) sources.push({ slug: a.slug, field: 'blindSpots', text: t })
    sources.push({ slug: a.slug, field: 'inTheDeal', text: a.inTheDeal })
    sources.push({ slug: a.slug, field: 'sellsBestTo', text: a.sellsBestTo })
    sources.push({ slug: a.slug, field: 'growthEdge', text: a.growthEdge })
    if (a.tension) sources.push({ slug: a.slug, field: 'tension', text: a.tension })
    if (a.mistakenFor) sources.push({ slug: a.slug, field: 'mistakenFor.tell', text: a.mistakenFor.tell })
  }
  return sources
}

// ─── Step 3: split into sentences ───────────────────────────────────────────

function splitSentences(text: string): string[] {
  // Split on . ! ? followed by whitespace (consumed) or end of string
  // (nothing to split on, so the trailing remainder is naturally its own
  // sentence).
  return text
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0)
}

// ─── Step 4: normalize + filter ─────────────────────────────────────────────

function normalize(raw: string): string {
  let s = raw
  // Curly quotes/apostrophes → straight
  s = s.replace(/[‘’‚‛ʼʻ]/g, "'")
  s = s.replace(/[“”„‟]/g, '"')
  s = s.toLowerCase()
  // Strip punctuation except apostrophes
  s = s.replace(/[^a-z0-9\s']/g, ' ')
  s = s.replace(/\s+/g, ' ').trim()
  return s
}

interface Sentence {
  slug: string
  field: string
  original: string
  normalized: string
  words: string[]
}

function buildQualifyingSentences(sources: SourceEntry[]): Sentence[] {
  const sentences: Sentence[] = []
  for (const src of sources) {
    for (const raw of splitSentences(src.text)) {
      const normalized = normalize(raw)
      const words = normalized.split(' ').filter((w) => w.length > 0)
      if (words.length < 6) continue
      sentences.push({ slug: src.slug, field: src.field, original: raw, normalized, words })
    }
  }
  return sentences
}

// ─── Report A: exact duplicates across different archetypes ───────────────

interface ExactDup {
  normalized: string
  slugs: string[]
}

function computeExactDuplicates(sentences: Sentence[]): ExactDup[] {
  const bySentence = new Map<string, Set<string>>()
  for (const s of sentences) {
    const set = bySentence.get(s.normalized) ?? new Set<string>()
    set.add(s.slug)
    bySentence.set(s.normalized, set)
  }
  const dups: ExactDup[] = []
  for (const [normalized, slugSet] of bySentence) {
    if (slugSet.size > 1) dups.push({ normalized, slugs: [...slugSet].sort() })
  }
  dups.sort((a, b) => b.slugs.length - a.slugs.length || a.normalized.localeCompare(b.normalized))
  return dups
}

// ─── Report B: near-duplicate pairs (Jaccard >= 0.7, cross-archetype) ─────

function jaccard(a: Set<string>, b: Set<string>): number {
  if (a.size === 0 || b.size === 0) return 0
  let intersection = 0
  for (const w of a) if (b.has(w)) intersection++
  const union = a.size + b.size - intersection
  return union === 0 ? 0 : intersection / union
}

interface NearDupPair {
  similarity: number
  a: Sentence
  b: Sentence
}

function computeNearDuplicates(sentences: Sentence[], exactNormalized: Set<string>): NearDupPair[] {
  const wordSets = sentences.map((s) => new Set(s.words))
  const pairs: NearDupPair[] = []
  for (let i = 0; i < sentences.length; i++) {
    for (let j = i + 1; j < sentences.length; j++) {
      const a = sentences[i]
      const b = sentences[j]
      if (a.slug === b.slug) continue
      // Exclude pairs already counted in Report A: both sides are an exact
      // duplicate sentence that's shared across archetypes.
      if (a.normalized === b.normalized && exactNormalized.has(a.normalized)) continue
      const sim = jaccard(wordSets[i], wordSets[j])
      if (sim >= 0.7) pairs.push({ similarity: sim, a, b })
    }
  }
  pairs.sort((x, y) => y.similarity - x.similarity)
  return pairs
}

// ─── Report C: opening 4-word phrase reused across 3+ archetypes ─────────

interface OpeningPhrase {
  phrase: string
  slugs: string[]
}

function computeRepeatedOpenings(sentences: Sentence[]): OpeningPhrase[] {
  const openingToSlugs = new Map<string, Set<string>>()
  for (const s of sentences) {
    const opening = s.words.slice(0, 4).join(' ')
    const set = openingToSlugs.get(opening) ?? new Set<string>()
    set.add(s.slug)
    openingToSlugs.set(opening, set)
  }
  const result: OpeningPhrase[] = []
  for (const [phrase, slugSet] of openingToSlugs) {
    if (slugSet.size >= 3) result.push({ phrase, slugs: [...slugSet].sort() })
  }
  result.sort((a, b) => b.slugs.length - a.slugs.length || a.phrase.localeCompare(b.phrase))
  return result
}

// ─── Main ───────────────────────────────────────────────────────────────────

async function main() {
  const { archetypes, method } = await load()
  const sources = gatherSources(archetypes)
  const sentences = buildQualifyingSentences(sources)

  const exactDups = computeExactDuplicates(sentences)
  const exactNormalized = new Set(exactDups.map((d) => d.normalized))
  const nearDupPairs = computeNearDuplicates(sentences, exactNormalized)
  const topNearDupPairs = nearDupPairs.slice(0, 25)
  const repeatedOpenings = computeRepeatedOpenings(sentences)

  console.log(`[archetype-dup-check] load method: ${method}`)
  console.log('='.repeat(80))
  console.log(`Scanned ${archetypes.length} archetypes, ${sources.length} source strings, ${sentences.length} qualifying sentences (>= 6 words) out of source text.`)
  console.log('='.repeat(80))
  console.log('REPORT A — Exact duplicate sentences (normalized) across different archetypes')
  console.log('-'.repeat(80))
  console.log(`Count: ${exactDups.length}`)
  for (const dup of exactDups) {
    console.log(`"${dup.normalized}"`)
    console.log(`  - ${dup.slugs.join(', ')}`)
    console.log()
  }
  console.log('REPORT B — Near-duplicate sentence pairs (different archetypes, Jaccard word-set similarity >= 70%)')
  console.log('-'.repeat(80))
  console.log(`Total qualifying pairs found: ${nearDupPairs.length} (showing top ${topNearDupPairs.length})`)
  for (const pair of topNearDupPairs) {
    console.log(`${(pair.similarity * 100).toFixed(1)}% similarity`)
    console.log(`  - ${pair.a.slug}: "${pair.a.original}"`)
    console.log(`  - ${pair.b.slug}: "${pair.b.original}"`)
    console.log()
  }
  console.log('REPORT C — Opening 4-word phrase reused across 3+ different archetypes')
  console.log('-'.repeat(80))
  console.log(`Count: ${repeatedOpenings.length}`)
  for (const o of repeatedOpenings) {
    console.log(`"${o.phrase}": ${o.slugs.length} archetypes`)
    console.log(`  ${o.slugs.join(', ')}`)
    console.log()
  }
  console.log('='.repeat(80))
  console.log('Done.')

  process.exit(0)
}

main().catch((err) => {
  console.error('[archetype-dup-check] fatal error:', err)
  process.exit(1)
})

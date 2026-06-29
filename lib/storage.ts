/**
 * Storage abstraction layer.
 *
 * Two surfaces:
 *   • serverStorage — used from API routes / server components. Talks to
 *     Supabase when configured; returns `unavailable: true` otherwise so
 *     callers can return fallback payloads instead of erroring.
 *   • clientStorage — used from the browser. Always talks to localStorage.
 *
 * In fallback (no-Supabase) mode, the server never writes — it returns the
 * scoring result to the client, which persists it in localStorage via
 * clientStorage. Later, when Supabase is configured, switching surfaces is
 * a no-op for callers: the shape of the stored records is the same.
 */

import type {
  Assessment,
  DimensionScores,
  ScoringResult,
} from '@/types'

// ─── Shared record shape ───────────────────────────────────────────────────

/**
 * The stored-assessment payload carried between server and client.
 * Superset of what Supabase persists; adequate for localStorage mode.
 */
export interface StoredAssessment {
  id: string
  email: string
  isSubscriber: boolean
  responses: number[]
  seed: string
  dimensionScores: DimensionScores
  archetypeResult: ScoringResult
  paymentStatus: 'pending' | 'paid'
  createdAt: string
}

// ─── Supabase config probe ─────────────────────────────────────────────────

export function isSupabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  return !!url && !!key && !url.includes('placeholder')
}

// ─── Supabase record ↔ StoredAssessment conversion ─────────────────────────

function fromAssessmentRow(row: Assessment): StoredAssessment {
  return {
    id: row.id,
    email: row.email,
    isSubscriber: row.is_subscriber,
    responses: row.responses,
    seed: row.seed,
    dimensionScores: row.dimension_scores,
    archetypeResult: row.archetype_result,
    paymentStatus: row.payment_status,
    createdAt: row.created_at,
  }
}

// ─── Server-side storage (Supabase) ────────────────────────────────────────

export type ServerWriteResult =
  | { ok: true; id: string }
  | { ok: false; reason: 'unavailable' | 'error'; error?: unknown }

export interface SaveAssessmentInput {
  email: string
  isSubscriber: boolean
  responses: number[]
  seed: string
  dimensionScores: DimensionScores
  archetypeResult: ScoringResult
}

export const serverStorage = {
  isAvailable: isSupabaseConfigured,

  async saveAssessment(input: SaveAssessmentInput): Promise<ServerWriteResult> {
    if (!isSupabaseConfigured()) return { ok: false, reason: 'unavailable' }

    try {
      const { createAdminClient } = await import('@/lib/supabase')
      const supabase = createAdminClient()
      const { data, error } = await supabase
        .from('assessments')
        .insert({
          email: input.email,
          is_subscriber: input.isSubscriber,
          responses: input.responses,
          seed: input.seed,
          dimension_scores: input.dimensionScores,
          archetype_result: input.archetypeResult,
        })
        .select('id')
        .single()

      if (error || !data) return { ok: false, reason: 'error', error }
      return { ok: true, id: data.id }
    } catch (error) {
      return { ok: false, reason: 'error', error }
    }
  },

  async loadAssessment(id: string): Promise<StoredAssessment | null> {
    if (!isSupabaseConfigured()) return null
    try {
      const { getAssessmentById } = await import('@/lib/supabase')
      const row = await getAssessmentById(id)
      return row ? fromAssessmentRow(row) : null
    } catch {
      return null
    }
  },

  async loadCompass(id: string): Promise<string | null> {
    if (!isSupabaseConfigured()) return null
    try {
      const { getAssessmentById } = await import('@/lib/supabase')
      const row = await getAssessmentById(id)
      return row?.codex ?? null
    } catch {
      return null
    }
  },

  async saveCompass(id: string, compass: string): Promise<ServerWriteResult> {
    if (!isSupabaseConfigured()) return { ok: false, reason: 'unavailable' }
    try {
      const { saveCompass } = await import('@/lib/supabase')
      await saveCompass(id, compass)
      return { ok: true, id }
    } catch (error) {
      return { ok: false, reason: 'error', error }
    }
  },

  async markPaid(id: string, stripeSessionId: string): Promise<ServerWriteResult> {
    if (!isSupabaseConfigured()) return { ok: false, reason: 'unavailable' }
    try {
      const { updatePaymentStatus } = await import('@/lib/supabase')
      await updatePaymentStatus(id, stripeSessionId)
      return { ok: true, id }
    } catch (error) {
      return { ok: false, reason: 'error', error }
    }
  },
}

// ─── Client-side storage (localStorage) ────────────────────────────────────

const ASSESSMENT_KEY = (id: string) => `tnq_assessment_${id}`
const CODEX_KEY = (id: string) => `tnq_codex_${id}`

function safeGet(key: string): string | null {
  if (typeof window === 'undefined') return null
  try {
    return window.localStorage.getItem(key)
  } catch {
    return null
  }
}

function safeSet(key: string, value: string): void {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(key, value)
  } catch {
    // Quota / private mode — silently ignore
  }
}

export const clientStorage = {
  saveAssessment(data: StoredAssessment): void {
    safeSet(ASSESSMENT_KEY(data.id), JSON.stringify(data))
  },

  loadAssessment(id: string): StoredAssessment | null {
    const raw = safeGet(ASSESSMENT_KEY(id))
    if (!raw) return null
    try {
      return JSON.parse(raw) as StoredAssessment
    } catch {
      return null
    }
  },

  saveCompass(id: string, compass: string): void {
    safeSet(CODEX_KEY(id), compass)
  },

  loadCompass(id: string): string | null {
    return safeGet(CODEX_KEY(id))
  },
}

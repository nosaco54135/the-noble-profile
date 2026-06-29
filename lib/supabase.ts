import { createClient } from '@supabase/supabase-js'
import type { Assessment } from '@/types'

/** Browser-safe client (uses anon key + RLS) */
export function createBrowserClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  return createClient(url, anonKey)
}

/** Server-side admin client (bypasses RLS — only use in API routes/server components) */
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
  return createClient(url, serviceKey, {
    auth: { persistSession: false },
  })
}

// ─── Assessment helpers ───────────────────────────────────────────────────

export async function getAssessmentById(id: string): Promise<Assessment | null> {
  const supabase = createAdminClient()
  const { data, error } = await supabase
    .from('assessments')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !data) return null
  return data as Assessment
}

export async function updatePaymentStatus(
  assessmentId: string,
  stripeSessionId: string,
): Promise<void> {
  const supabase = createAdminClient()
  const { error } = await supabase
    .from('assessments')
    .update({ payment_status: 'paid', stripe_session_id: stripeSessionId })
    .eq('id', assessmentId)

  if (error) throw new Error(`Failed to update payment status: ${error.message}`)
}

export async function saveCompass(
  assessmentId: string,
  compass: string,
): Promise<void> {
  const supabase = createAdminClient()
  const { error } = await supabase
    .from('assessments')
    .update({ codex: compass })
    .eq('id', assessmentId)

  if (error) throw new Error(`Failed to save Compass: ${error.message}`)
}

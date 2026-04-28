-- The Noble Quotient — Supabase Schema
-- Run this in the Supabase SQL editor to set up the database.

-- ─── Enable UUID extension ────────────────────────────────────────────────
create extension if not exists "pgcrypto";

-- ─── Assessments table ───────────────────────────────────────────────────
create table if not exists assessments (
  id                uuid primary key default gen_random_uuid(),
  email             text not null,
  is_subscriber     boolean not null default false,

  -- Raw responses: array of 25 integers (1–5), indexed by question order (Q1=index 0)
  responses         integer[] not null,

  -- Question randomization seed (for reproducible shuffles)
  seed              text,

  -- Computed scores stored as JSON for easy retrieval
  dimension_scores  jsonb not null default '{}',
  archetype_result  jsonb not null default '{}',

  -- Consistency & confidence flags
  consistency_flags jsonb not null default '{}',
  low_variance      boolean not null default false,

  -- Payment
  payment_status    text not null default 'pending'
                      check (payment_status in ('pending', 'paid')),
  stripe_session_id text,

  -- Claude-generated Codex (null until paid + generated)
  codex             text,

  created_at        timestamptz not null default now()
);

-- ─── Indexes ─────────────────────────────────────────────────────────────
create index if not exists idx_assessments_email
  on assessments (email);

create index if not exists idx_assessments_stripe_session_id
  on assessments (stripe_session_id)
  where stripe_session_id is not null;

create index if not exists idx_assessments_payment_status
  on assessments (payment_status);

create index if not exists idx_assessments_created_at
  on assessments (created_at desc);

-- ─── Row-Level Security ───────────────────────────────────────────────────
-- Enable RLS (all mutations happen via service role from API routes)
alter table assessments enable row level security;

-- Public read policy: anyone with the UUID can read their own assessment
-- (The UUID itself acts as an unguessable access token)
create policy "Public read by id"
  on assessments for select
  using (true);

-- All inserts/updates are via service role only (no public write policy needed)
-- The service role key bypasses RLS automatically.

-- ─── Comments ─────────────────────────────────────────────────────────────
comment on table assessments is
  'Noble Quotient assessment submissions, scores, and Codex results.';
comment on column assessments.responses is
  'Array of 25 Likert responses (1–5). Index 0 = Q1, index 24 = Q25. Always in original question order.';
comment on column assessments.seed is
  'Opaque seed used to reproduce the per-respondent question shuffle.';
comment on column assessments.dimension_scores is
  'Computed weighted-normalized scores per dimension (1–5 scale). See lib/scoring.ts.';
comment on column assessments.archetype_result is
  'Full ScoringResult JSON: primary/secondary/tertiary archetypes, trait+style rankings, tie info.';
comment on column assessments.consistency_flags is
  'Per-dimension forward/reverse inconsistency flags (gap > 1.5 ⇒ flagged).';
comment on column assessments.low_variance is
  'True if overall response std dev < 0.5 (no archetype shown in this case).';
comment on column assessments.codex is
  'Claude-generated markdown Codex. Null until payment confirmed and generation complete.';

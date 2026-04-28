import { notFound, redirect } from 'next/navigation'
import Link from 'next/link'
import { serverStorage } from '@/lib/storage'
import CodexContent from './CodexContent'
import CodexGenerator from './CodexGenerator'
import FallbackCodexPage from './FallbackCodexPage'
import PrintButton from './PrintButton'

interface Props {
  params: Promise<{ id: string }>
  searchParams: Promise<{ fallback?: string }>
}

export default async function CodexPage({ params, searchParams }: Props) {
  const { id } = await params
  const { fallback } = await searchParams

  if (fallback === 'true' || !serverStorage.isAvailable()) {
    return <FallbackCodexPage id={id} />
  }

  const assessment = await serverStorage.loadAssessment(id)
  if (!assessment) notFound()

  // Guard: must be paid to access this page (spec Stage 6 critical reminder)
  if (assessment.paymentStatus !== 'paid') {
    redirect(`/quotient/results/${id}`)
  }

  const primaryName = assessment.archetypeResult?.primary?.name ?? 'Your Archetype'
  const existingCodex = await serverStorage.loadCodex(id)

  return (
    <div className="min-h-screen bg-white">
      <nav className="bg-white border-b border-slate-100 sticky top-0 z-10 no-print">
        <div className="max-w-3xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/quotient" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-noble-600 flex items-center justify-center">
              <span className="text-white font-bold text-xs">N</span>
            </div>
            <span className="text-sm font-semibold text-slate-700">The Noble Seller</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link
              href={`/quotient/results/${id}`}
              className="text-sm text-slate-500 hover:text-slate-700 transition"
            >
              ← Results
            </Link>
            <PrintButton />
          </div>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-6 py-12 print-page">
        <div className="mb-12 print:mb-8">
          <p className="text-noble-600 text-sm font-semibold uppercase tracking-widest mb-2">
            The Noble Seller · The Noble Codex
          </p>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
            The {primaryName} Codex
          </h1>
          <p className="text-slate-500 text-base">
            Generated specifically for your Noble Quotient results.
          </p>
        </div>

        {existingCodex ? (
          <CodexContent markdown={existingCodex} />
        ) : (
          <CodexGenerator
            assessmentId={id}
            archetypeResult={assessment.archetypeResult}
          />
        )}
      </main>

      <footer className="border-t border-slate-100 py-8 mt-16 no-print">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-xs text-slate-400">
            © {new Date().getFullYear()} The Noble Seller · The Noble Quotient
          </p>
        </div>
      </footer>
    </div>
  )
}

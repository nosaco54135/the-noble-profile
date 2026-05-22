import { notFound, redirect } from 'next/navigation'
import Link from 'next/link'
import { serverStorage } from '@/lib/storage'
import CodexContent from './CodexContent'
import CodexGenerator from './CodexGenerator'
import FallbackCodexPage from './FallbackCodexPage'
import PrintButton from './PrintButton'
import { DEV_CODEX_PAYLOAD, DEV_SAMPLE_PAYLOAD } from '@/lib/dev-sample'
import { DIMENSION_LABELS, DIMENSION_ORDER } from '@/types'

interface Props {
  params: Promise<{ id: string }>
  searchParams: Promise<{ fallback?: string }>
}

export default async function CodexPage({ params, searchParams }: Props) {
  const { id } = await params
  const { fallback } = await searchParams

  if (id === 'dev-test') {
    const devMarkdown = DEV_CODEX_PAYLOAD.sections
      .map(s => `## ${s.title}\n\n${s.content}`)
      .join('\n\n')

    const devDimensionScores: { key: string; label: string; score: number; max: number }[] =
      DIMENSION_ORDER.map(key => ({
        key,
        label: DIMENSION_LABELS[key],
        score: DEV_SAMPLE_PAYLOAD.archetypeResult.dimensionScores[key],
        max: 5,
      })).sort((a, b) => b.score - a.score)
    const devTopDimensions = devDimensionScores.slice(0, 3)
    const devGapDimensions = devDimensionScores.slice(-4)
    const devPrimaryMatchPercentage = DEV_SAMPLE_PAYLOAD.archetypeResult.primary.matchPercentage
    const devSecondaryName = DEV_SAMPLE_PAYLOAD.archetypeResult.secondary.name
    const devTertiaryName = DEV_SAMPLE_PAYLOAD.archetypeResult.tertiary.name
    const devSecondaryMatchPercentage = DEV_SAMPLE_PAYLOAD.archetypeResult.secondary.matchPercentage
    const devTertiaryMatchPercentage = DEV_SAMPLE_PAYLOAD.archetypeResult.tertiary.matchPercentage

    return (
      <div className="bg-[#FAFAF7]">
        <div className="flex justify-end max-w-[760px] mx-auto px-8 md:px-10 pt-4 no-print">
          <PrintButton />
        </div>

        {/* Cover */}
        <div className="pt-16 pb-12 border-b border-[#E8E6DF]">
          <div className="max-w-[760px] mx-auto px-8 md:px-10">
            <p className="font-sans text-[11px] uppercase tracking-[0.12em] text-[#6B6B6B] mb-6">
              The Noble Codex
            </p>
            <h1 className="font-display text-5xl md:text-6xl font-bold text-[#0F0F0F] leading-[1.05] mb-4">
              The {DEV_CODEX_PAYLOAD.archetypeName} Codex
            </h1>
            <p className="font-display italic text-xl text-[#6B6B6B] mb-8">
              {DEV_SAMPLE_PAYLOAD.archetypeResult.primary.trait.tagline}
            </p>
            <p className="font-sans text-sm text-[#6B6B6B]">
              Generated {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
            <div className="mt-10 pt-10 border-t border-[#E8E6DF]">
              <div className="grid grid-cols-3 gap-8">
                <div>
                  <p className="font-sans text-[10px] uppercase tracking-[0.12em] text-[#6B6B6B] mb-2">Top Strength</p>
                  <p className="font-display text-3xl font-semibold text-[#0F0F0F] leading-none mb-1">{devTopDimensions[0].score.toFixed(1)}</p>
                  <p className="font-sans text-xs text-[#6B6B6B]">{devTopDimensions[0].label}</p>
                </div>
                <div>
                  <p className="font-sans text-[10px] uppercase tracking-[0.12em] text-[#6B6B6B] mb-2">Top Gap</p>
                  <p className="font-display text-3xl font-semibold text-[#0F0F0F] leading-none mb-1">{devGapDimensions[devGapDimensions.length - 1].score.toFixed(1)}</p>
                  <p className="font-sans text-xs text-[#6B6B6B]">{devGapDimensions[devGapDimensions.length - 1].label}</p>
                </div>
                <div>
                  <p className="font-sans text-[10px] uppercase tracking-[0.12em] text-[#6B6B6B] mb-2">Archetype Match</p>
                  <p className="font-display text-3xl font-semibold text-[#0F0F0F] leading-none mb-1">{devPrimaryMatchPercentage}%</p>
                  <p className="font-sans text-xs text-[#6B6B6B]">Primary Fit</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Back link */}
        <div className="max-w-[760px] mx-auto px-8 md:px-10 pt-6 no-print">
          <Link href={`/quotient/results/${id}`} className="text-sm text-[#6B6B6B] hover:text-[#0F0F0F] transition">
            ← Results
          </Link>
        </div>

        {/* Dimension Dashboard */}
        <section className="border-b border-[#E8E6DF] no-print">
          <div className="max-w-[760px] mx-auto px-8 md:px-10 py-10">
            <p className="font-sans text-[10px] uppercase tracking-[0.12em] text-[#6B6B6B] mb-8">Dimension Dashboard</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-3 mb-10">
              {devDimensionScores.map((dim) => (
                <div key={dim.key} className="flex items-center gap-3">
                  <p className="font-sans text-xs text-[#6B6B6B] w-36 flex-shrink-0 truncate">{dim.label}</p>
                  <div className="flex-1 h-1 bg-[#E8E6DF] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#722F37] rounded-full"
                      style={{ width: `${(dim.score / 5) * 100}%` }}
                    />
                  </div>
                  <p className="font-sans text-xs font-medium text-[#0F0F0F] w-6 text-right flex-shrink-0">{dim.score.toFixed(1)}</p>
                </div>
              ))}
            </div>
            <div className="border-t border-[#E8E6DF] pt-6">
              <p className="font-sans text-[10px] uppercase tracking-[0.12em] text-[#6B6B6B] mb-4">Archetype Stack</p>
              <div className="flex flex-col gap-3">
                <div className="flex items-baseline gap-3">
                  <p className="font-sans text-[10px] uppercase tracking-[0.08em] text-[#722F37] w-16 flex-shrink-0">Primary</p>
                  <p className="font-sans text-sm font-medium text-[#0F0F0F]">{DEV_CODEX_PAYLOAD.archetypeName}</p>
                  <p className="font-sans text-xs text-[#6B6B6B] ml-auto">{devPrimaryMatchPercentage}%</p>
                </div>
                <div className="flex items-baseline gap-3">
                  <p className="font-sans text-[10px] uppercase tracking-[0.08em] text-[#6B6B6B] w-16 flex-shrink-0">Secondary</p>
                  <p className="font-sans text-sm text-[#6B6B6B]">{devSecondaryName}</p>
                  <p className="font-sans text-xs text-[#6B6B6B] ml-auto">{devSecondaryMatchPercentage}%</p>
                </div>
                <div className="flex items-baseline gap-3">
                  <p className="font-sans text-[10px] uppercase tracking-[0.08em] text-[#6B6B6B] w-16 flex-shrink-0">Tertiary</p>
                  <p className="font-sans text-sm text-[#6B6B6B]">{devTertiaryName}</p>
                  <p className="font-sans text-xs text-[#6B6B6B] ml-auto">{devTertiaryMatchPercentage}%</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <nav className="sticky top-0 z-10 bg-[#FAFAF7] border-b border-[#E8E6DF] no-print">
          <div className="max-w-[760px] mx-auto px-8 md:px-10">
            <div className="flex gap-4 md:gap-6 overflow-x-auto no-scrollbar -mx-8 px-8 md:mx-0 md:px-0 py-3">
              <a href="#section-1" className="font-sans text-xs uppercase tracking-[0.08em] text-[#6B6B6B] hover:text-[#722F37] transition-colors">Identity</a>
              <a href="#section-2" className="font-sans text-xs uppercase tracking-[0.08em] text-[#6B6B6B] hover:text-[#722F37] transition-colors">Prospecting</a>
              <a href="#section-3" className="font-sans text-xs uppercase tracking-[0.08em] text-[#6B6B6B] hover:text-[#722F37] transition-colors">Closing</a>
              <a href="#section-4" className="font-sans text-xs uppercase tracking-[0.08em] text-[#6B6B6B] hover:text-[#722F37] transition-colors">Blind Spots</a>
              <a href="#section-5" className="font-sans text-xs uppercase tracking-[0.08em] text-[#6B6B6B] hover:text-[#722F37] transition-colors">Tools</a>
              <a href="#section-6" className="font-sans text-xs uppercase tracking-[0.08em] text-[#6B6B6B] hover:text-[#722F37] transition-colors">30/60/90</a>
            </div>
          </div>
        </nav>

        <main className="max-w-[760px] mx-auto px-8 md:px-10 py-12 print-page">
          <CodexContent
            markdown={devMarkdown}
            dimensionScores={devDimensionScores}
            archetypes={{
              primary: { name: DEV_CODEX_PAYLOAD.archetypeName, matchPercentage: devPrimaryMatchPercentage },
              secondary: { name: devSecondaryName, matchPercentage: devSecondaryMatchPercentage },
              tertiary: { name: devTertiaryName, matchPercentage: devTertiaryMatchPercentage },
            }}
            topDimensions={devTopDimensions}
            gapDimensions={devGapDimensions}
          />
        </main>

        <div className="border-t border-[#E8E6DF] mt-16">
          <div className="max-w-[760px] mx-auto px-8 md:px-10 py-10">
            <p className="font-sans text-[11px] uppercase tracking-[0.12em] text-[#6B6B6B] mb-3">
              About This Codex
            </p>
            <p className="font-sans text-sm text-[#6B6B6B] leading-relaxed max-w-[560px]">
              Your scores were run through a generation pipeline that translated them into six sections of personalized coaching. The analysis is specific to your profile, not a category. It will not match anyone else's Codex.
            </p>
            <p className="font-sans text-sm text-[#6B6B6B] leading-relaxed max-w-[560px] mt-3">
              Some links in the Recommended Tools section are affiliate links. The Noble Seller may earn a commission if you make a purchase, at no additional cost to you. Recommendations are based on your scores, not on commission.
            </p>
          </div>
        </div>

        <footer className="border-t border-[#E8E6DF] py-8 mt-16 no-print">
          <div className="max-w-[760px] mx-auto px-8 md:px-10 text-center">
            <p className="text-xs text-[#6B6B6B]">
              © {new Date().getFullYear()} The Noble Seller · The Noble Quotient
            </p>
          </div>
        </footer>
      </div>
    )
  }

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
  const archetypeTagline = assessment.archetypeResult?.primary?.trait?.tagline ?? ''
  const primaryMatchPercentage = assessment.archetypeResult?.primary?.matchPercentage ?? 0
  const secondaryName = assessment.archetypeResult?.secondary?.name ?? ''
  const tertiaryName = assessment.archetypeResult?.tertiary?.name ?? ''
  const secondaryMatchPercentage = assessment.archetypeResult?.secondary?.matchPercentage ?? 0
  const tertiaryMatchPercentage = assessment.archetypeResult?.tertiary?.matchPercentage ?? 0
  const existingCodex = await serverStorage.loadCodex(id)

  const dimensionScores: { key: string; label: string; score: number; max: number }[] =
    DIMENSION_ORDER.map(key => ({
      key,
      label: DIMENSION_LABELS[key],
      score: assessment.dimensionScores[key],
      max: 5,
    })).sort((a, b) => b.score - a.score)
  const topDimensions = dimensionScores.slice(0, 3)
  const gapDimensions = dimensionScores.slice(-4)

  return (
    <div className="bg-[#FAFAF7]">
      <div className="flex justify-end max-w-[760px] mx-auto px-8 md:px-10 pt-4 no-print">
        <PrintButton />
      </div>

      {/* Cover */}
      <div className="pt-16 pb-12 border-b border-[#E8E6DF]">
        <div className="max-w-[760px] mx-auto px-8 md:px-10">
          <p className="font-sans text-[11px] uppercase tracking-[0.12em] text-[#6B6B6B] mb-6">
            The Noble Codex
          </p>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-[#0F0F0F] leading-[1.05] mb-4">
            The {primaryName} Codex
          </h1>
          <p className="font-display italic text-xl text-[#6B6B6B] mb-8">
            {archetypeTagline}
          </p>
          <p className="font-sans text-sm text-[#6B6B6B]">
            Generated {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
          <div className="mt-10 pt-10 border-t border-[#E8E6DF]">
            <div className="grid grid-cols-3 gap-8">
              <div>
                <p className="font-sans text-[10px] uppercase tracking-[0.12em] text-[#6B6B6B] mb-2">Top Strength</p>
                <p className="font-display text-3xl font-semibold text-[#0F0F0F] leading-none mb-1">{topDimensions[0].score.toFixed(1)}</p>
                <p className="font-sans text-xs text-[#6B6B6B]">{topDimensions[0].label}</p>
              </div>
              <div>
                <p className="font-sans text-[10px] uppercase tracking-[0.12em] text-[#6B6B6B] mb-2">Top Gap</p>
                <p className="font-display text-3xl font-semibold text-[#0F0F0F] leading-none mb-1">{gapDimensions[gapDimensions.length - 1].score.toFixed(1)}</p>
                <p className="font-sans text-xs text-[#6B6B6B]">{gapDimensions[gapDimensions.length - 1].label}</p>
              </div>
              <div>
                <p className="font-sans text-[10px] uppercase tracking-[0.12em] text-[#6B6B6B] mb-2">Archetype Match</p>
                <p className="font-display text-3xl font-semibold text-[#0F0F0F] leading-none mb-1">{primaryMatchPercentage}%</p>
                <p className="font-sans text-xs text-[#6B6B6B]">Primary Fit</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Back link */}
      <div className="max-w-[760px] mx-auto px-8 md:px-10 pt-6 no-print">
        <Link href={`/quotient/results/${id}`} className="text-sm text-[#6B6B6B] hover:text-[#0F0F0F] transition">
          ← Results
        </Link>
      </div>

      {/* Dimension Dashboard */}
      <section className="border-b border-[#E8E6DF] no-print">
        <div className="max-w-[760px] mx-auto px-8 md:px-10 py-10">
          <p className="font-sans text-[10px] uppercase tracking-[0.12em] text-[#6B6B6B] mb-8">Dimension Dashboard</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-3 mb-10">
            {dimensionScores.map((dim) => (
              <div key={dim.key} className="flex items-center gap-3">
                <p className="font-sans text-xs text-[#6B6B6B] w-36 flex-shrink-0 truncate">{dim.label}</p>
                <div className="flex-1 h-1 bg-[#E8E6DF] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#722F37] rounded-full"
                    style={{ width: `${(dim.score / 5) * 100}%` }}
                  />
                </div>
                <p className="font-sans text-xs font-medium text-[#0F0F0F] w-6 text-right flex-shrink-0">{dim.score.toFixed(1)}</p>
              </div>
            ))}
          </div>
          <div className="border-t border-[#E8E6DF] pt-6">
            <p className="font-sans text-[10px] uppercase tracking-[0.12em] text-[#6B6B6B] mb-4">Archetype Stack</p>
            <div className="flex flex-col gap-3">
              <div className="flex items-baseline gap-3">
                <p className="font-sans text-[10px] uppercase tracking-[0.08em] text-[#722F37] w-16 flex-shrink-0">Primary</p>
                <p className="font-sans text-sm font-medium text-[#0F0F0F]">{primaryName}</p>
                <p className="font-sans text-xs text-[#6B6B6B] ml-auto">{primaryMatchPercentage}%</p>
              </div>
              <div className="flex items-baseline gap-3">
                <p className="font-sans text-[10px] uppercase tracking-[0.08em] text-[#6B6B6B] w-16 flex-shrink-0">Secondary</p>
                <p className="font-sans text-sm text-[#6B6B6B]">{secondaryName}</p>
                <p className="font-sans text-xs text-[#6B6B6B] ml-auto">{secondaryMatchPercentage}%</p>
              </div>
              <div className="flex items-baseline gap-3">
                <p className="font-sans text-[10px] uppercase tracking-[0.08em] text-[#6B6B6B] w-16 flex-shrink-0">Tertiary</p>
                <p className="font-sans text-sm text-[#6B6B6B]">{tertiaryName}</p>
                <p className="font-sans text-xs text-[#6B6B6B] ml-auto">{tertiaryMatchPercentage}%</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <nav className="sticky top-0 z-10 bg-[#FAFAF7] border-b border-[#E8E6DF] no-print">
        <div className="max-w-[760px] mx-auto px-8 md:px-10">
          <div className="flex gap-6 py-3">
            <a href="#section-1" className="font-sans text-xs uppercase tracking-[0.08em] text-[#6B6B6B] hover:text-[#722F37] transition-colors">Identity</a>
            <a href="#section-2" className="font-sans text-xs uppercase tracking-[0.08em] text-[#6B6B6B] hover:text-[#722F37] transition-colors">Prospecting</a>
            <a href="#section-3" className="font-sans text-xs uppercase tracking-[0.08em] text-[#6B6B6B] hover:text-[#722F37] transition-colors">Closing</a>
            <a href="#section-4" className="font-sans text-xs uppercase tracking-[0.08em] text-[#6B6B6B] hover:text-[#722F37] transition-colors">Blind Spots</a>
            <a href="#section-5" className="font-sans text-xs uppercase tracking-[0.08em] text-[#6B6B6B] hover:text-[#722F37] transition-colors">Tools</a>
            <a href="#section-6" className="font-sans text-xs uppercase tracking-[0.08em] text-[#6B6B6B] hover:text-[#722F37] transition-colors">30/60/90</a>
          </div>
        </div>
      </nav>

      <main className="max-w-[760px] mx-auto px-8 md:px-10 py-12 print-page">
        {existingCodex ? (
          <CodexContent
              markdown={existingCodex}
              dimensionScores={dimensionScores}
              archetypes={{
                primary: { name: primaryName, matchPercentage: primaryMatchPercentage },
                secondary: { name: secondaryName, matchPercentage: secondaryMatchPercentage },
                tertiary: { name: tertiaryName, matchPercentage: tertiaryMatchPercentage },
              }}
              topDimensions={topDimensions}
              gapDimensions={gapDimensions}
            />
        ) : (
          <CodexGenerator
            assessmentId={id}
            archetypeResult={assessment.archetypeResult}
            dimensionScores={dimensionScores}
            archetypes={{
              primary: { name: primaryName, matchPercentage: primaryMatchPercentage },
              secondary: { name: secondaryName, matchPercentage: secondaryMatchPercentage },
              tertiary: { name: tertiaryName, matchPercentage: tertiaryMatchPercentage },
            }}
            topDimensions={topDimensions}
            gapDimensions={gapDimensions}
          />
        )}
      </main>

      <div className="border-t border-[#E8E6DF] mt-16">
        <div className="max-w-[760px] mx-auto px-8 md:px-10 py-10">
          <p className="font-sans text-[11px] uppercase tracking-[0.12em] text-[#6B6B6B] mb-3">
            About This Codex
          </p>
          <p className="font-sans text-sm text-[#6B6B6B] leading-relaxed max-w-[560px]">
            Your scores were run through a generation pipeline that translated them into six sections of personalized coaching. The analysis is specific to your profile, not a category. It will not match anyone else's Codex.
          </p>
          <p className="font-sans text-sm text-[#6B6B6B] leading-relaxed max-w-[560px] mt-3">
            Some links in the Recommended Tools section are affiliate links. The Noble Seller may earn a commission if you make a purchase, at no additional cost to you. Recommendations are based on your scores, not on commission.
          </p>
        </div>
      </div>

      <footer className="border-t border-[#E8E6DF] py-8 mt-16 no-print">
        <div className="max-w-[760px] mx-auto px-8 md:px-10 text-center">
          <p className="text-xs text-[#6B6B6B]">
            © {new Date().getFullYear()} The Noble Seller · The Noble Quotient
          </p>
        </div>
      </footer>
    </div>
  )
}

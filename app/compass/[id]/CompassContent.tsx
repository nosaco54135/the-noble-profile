'use client'

import { parseAffiliateSegments } from '@/lib/affiliate-config'

interface CompassContentProps {
  markdown: string
  dimensionScores: { key: string; label: string; score: number; max: number }[]
  archetypes: {
    primary: { name: string; matchPercentage: number }
    secondary: { name: string; matchPercentage: number }
    tertiary: { name: string; matchPercentage: number }
  }
  topDimensions: { key: string; label: string; score: number }[]
  gapDimensions: { key: string; label: string; score: number }[]
}

type PhasePlan = {
  phases: {
    range: string
    title: string
    theme: string
    targetGap: string
    weeks: { label: string; text: string }[]
    milestone: string
  }[]
  reflectionQuestions: string[]
  pullQuotes: string[]
}

type ChannelFit = 'Best Fit' | 'Workable' | 'Challenge'

const SECTION_PILLS: Record<number, string[]> = {
  0: ['curiosity', 'closing_confidence', 'problem_solving'],
  1: ['prospecting_comfort', 'mindset_resilience', 'data_driven'],
  2: ['curiosity', 'active_listening', 'closing_confidence'],
  3: ['eq_trust', 'authenticity', 'process_oriented', 'learning_style'],
  4: [],
  5: ['process_oriented', 'mindset_resilience'],
}

const PHASE_COLORS = [
  { bg: '#F2F0EB' },
  { bg: '#EFE8E4' },
  { bg: '#E8DFDA' },
]

function renderTextContent(text: string, withLinks: boolean) {
  if (!withLinks) return text
  const segments = parseAffiliateSegments(text)
  return segments.map((seg, idx) =>
    seg.slug ? (
      <a
        key={idx}
        href={`/go/${seg.slug}`}
        target="_blank"
        rel="noopener noreferrer sponsored"
        className="text-[#722F37] underline underline-offset-2 decoration-[#722F37]/40 hover:decoration-[#722F37] transition-colors"
      >
        {seg.text}
      </a>
    ) : (
      <span key={idx}>{seg.text}</span>
    )
  )
}

function renderLine(line: string, key: number, withLinks: boolean) {
  if (!line.trim()) return null

  // Pull quote
  const pullQuoteMatch = line.match(/^\[PULLQUOTE\](.*?)\[\/PULLQUOTE\]$/)
  if (pullQuoteMatch) {
    return (
      <blockquote key={key} className="my-8 pl-6 border-l-2 border-[#722F37]">
        <p className="font-display italic text-xl md:text-2xl text-[#0F0F0F] leading-[1.3]">
          {pullQuoteMatch[1]}
        </p>
      </blockquote>
    )
  }

  // Bullet points
  if (line.startsWith('- ') || line.startsWith('• ')) {
    const bulletText = line.replace(/^[-•]\s*/, '')
    return (
      <p key={key} className="flex gap-2 font-sans text-base text-[#0F0F0F] leading-relaxed mb-2">
        <span className="text-[#722F37] font-bold mt-0.5 flex-shrink-0">•</span>
        <span>{renderTextContent(bulletText, withLinks)}</span>
      </p>
    )
  }

  // Bold pattern: **text**
  const hasBold = /\*\*.+?\*\*/.test(line)
  if (hasBold) {
    const parts = line.split(/(\*\*.+?\*\*)/)
    return (
      <p key={key} className="font-sans text-base text-[#0F0F0F] leading-relaxed mb-3">
        {parts.map((part, k) =>
          part.startsWith('**') && part.endsWith('**') ? (
            <strong key={k} className="text-[#0F0F0F] font-semibold">
              {part.slice(2, -2)}
            </strong>
          ) : (
            <span key={k}>{renderTextContent(part, withLinks)}</span>
          )
        )}
      </p>
    )
  }

  return (
    <p key={key} className="font-sans text-base text-[#0F0F0F] leading-relaxed mb-3">
      {renderTextContent(line, withLinks)}
    </p>
  )
}

type RenderItem =
  | { kind: 'line'; text: string }
  | { kind: 'card'; lines: string[] }

function groupToolCardLines(lines: string[]): RenderItem[] {
  const result: RenderItem[] = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]
    if (/^\d+\.\s/.test(line.trim())) {
      const cardLines = [line]
      let j = i + 1
      while (
        j < lines.length &&
        lines[j].trim() !== '' &&
        !/^\d+\.\s/.test(lines[j].trim()) &&
        !lines[j].includes('[PULLQUOTE]')
      ) {
        cardLines.push(lines[j])
        j++
      }
      result.push({ kind: 'card', lines: cardLines })
      i = j
    } else {
      result.push({ kind: 'line', text: line })
      i++
    }
  }

  return result
}

function parsePhasePlan(rawContent: string): PhasePlan {
  const pullQuotes: string[] = []
  const content = rawContent.replace(
    /\[PULLQUOTE\]([\s\S]*?)\[\/PULLQUOTE\]/g,
    (_, text) => {
      pullQuotes.push(text.trim())
      return ''
    }
  )

  const lines = content.split('\n').map(l => l.trim()).filter(l => l.length > 0)

  const phaseStartIndices: number[] = []
  lines.forEach((line, idx) => {
    if (/^Days \d+ through \d+:/.test(line)) phaseStartIndices.push(idx)
  })

  if (phaseStartIndices.length !== 3) {
    throw new Error(`Expected 3 phases, found ${phaseStartIndices.length}`)
  }

  let reflectionStartIdx = lines.length
  for (let idx = 0; idx < lines.length; idx++) {
    if (/^Reflection questions/i.test(lines[idx])) {
      reflectionStartIdx = idx
      break
    }
  }

  const phases = phaseStartIndices.map((startIdx, phaseIdx) => {
    const endIdx = phaseIdx < 2 ? phaseStartIndices[phaseIdx + 1] : reflectionStartIdx
    const phaseLines = lines.slice(startIdx, endIdx)

    const headerMatch = phaseLines[0].match(/^(Days \d+ through \d+):\s*(.+)$/)
    if (!headerMatch) throw new Error(`Invalid phase header: ${phaseLines[0]}`)
    const range = headerMatch[1]
    const title = headerMatch[2]

    let theme = ''
    let targetGap = ''
    for (const line of phaseLines) {
      const m = line.match(/^Theme:\s*(.+?)\.\s*Primary gap targeted:\s*(.+?)\.?\s*$/)
      if (m) {
        theme = m[1].trim()
        targetGap = m[2].trim()
        break
      }
    }

    const weeks: { label: string; text: string }[] = []
    for (const line of phaseLines) {
      const m = line.match(/^(Week \d+):\s*(.+)$/)
      if (m) weeks.push({ label: m[1], text: m[2] })
    }

    let milestone = ''
    for (const line of phaseLines) {
      const m = line.match(/^Day \d+ milestone:\s*(.+)$/)
      if (m) {
        milestone = m[1].trim()
        break
      }
    }

    return { range, title, theme, targetGap, weeks, milestone }
  })

  const reflectionQuestions = lines
    .slice(reflectionStartIdx + 1)
    .filter(l => l.startsWith('-'))
    .map(l => l.replace(/^-\s*/, '').trim())

  return { phases, reflectionQuestions, pullQuotes }
}

export default function CompassContent({
  markdown,
  dimensionScores,
  archetypes,
  topDimensions: _topDimensions,
  gapDimensions,
}: CompassContentProps) {
  if (!dimensionScores || dimensionScores.length === 0) {
    return <div className="text-[#6B6B6B] font-sans text-sm p-8">Loading...</div>
  }

  const sections = parseCodex(markdown)

  let phasePlan: PhasePlan | null = null
  if (sections[5]) {
    try {
      phasePlan = parsePhasePlan(sections[5].content)
    } catch (e) {
      console.warn('[CompassContent] Section 6 parse failed, falling back to prose', e)
    }
  }

  return (
    <div className="space-y-16">
      {sections.map((section, i) => {
        const pillKeys = SECTION_PILLS[i] ?? []
        const pills = pillKeys
          .map(key => {
            const dim = dimensionScores?.find(d => d.key === key)
            return dim ? { key, label: dim.label, score: dim.score } : null
          })
          .filter((p): p is { key: string; label: string; score: number } => p !== null)

        const sectionHeader = (
          <div className="mb-6">
            <div className="flex items-baseline gap-3 mb-3">
              <span className="font-display text-5xl font-semibold text-[#E8E6DF] leading-none select-none">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h2 className="font-display text-xl font-semibold text-[#0F0F0F]">
                {section.heading}
              </h2>
            </div>
            {pills.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {pills.map(pill => (
                  <span
                    key={pill.key}
                    className="inline-flex items-center gap-1.5 font-sans text-[11px] text-[#6B6B6B] bg-[#F2F0EB] px-2.5 py-1 rounded-full"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#722F37] inline-block" />
                    {pill.label} {pill.score.toFixed(1)}
                  </span>
                ))}
              </div>
            )}
          </div>
        )

        // Section 6: structured phase timeline
        if (i === 5 && phasePlan) {
          return (
            <article key={i} id={`section-${i + 1}`} className="border-l-2 border-[#722F37] pl-6 scroll-mt-16 pt-8">
              {sectionHeader}

              {/* Phase header cards */}
              <div className="grid md:grid-cols-3 gap-4 mb-10">
                {phasePlan.phases.map((phase, idx) => {
                  const colors = PHASE_COLORS[idx] ?? PHASE_COLORS[0]
                  return (
                    <div key={idx} className="rounded-lg p-5" style={{ backgroundColor: colors.bg }}>
                      <p className="font-sans text-[10px] uppercase tracking-[0.12em] text-[#6B6B6B] mb-2">{phase.range}</p>
                      <h3 className="font-display text-lg font-semibold text-[#0F0F0F] mb-3 leading-tight">{phase.title}</h3>
                      <div className="mb-4 pb-4 border-b" style={{ borderColor: 'rgba(114,47,55,0.15)' }}>
                        <p className="font-sans text-xs text-[#6B6B6B] mb-1">Theme</p>
                        <p className="font-sans text-sm text-[#0F0F0F]">{phase.theme}</p>
                        <p className="font-sans text-xs text-[#6B6B6B] mt-2 mb-1">Primary Gap</p>
                        <p className="font-sans text-sm text-[#722F37]">{phase.targetGap}</p>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Phase detail: weekly tasks + milestones */}
              <div className="space-y-8">
                {phasePlan.phases.map((phase, idx) => (
                  <div key={idx}>
                    <div className="flex items-baseline gap-3 mb-4">
                      <span className="font-display text-2xl font-semibold text-[#722F37] tabular-nums">{`0${idx + 1}`}</span>
                      <h3 className="font-display text-lg font-semibold text-[#0F0F0F]">{phase.title}</h3>
                      <span className="font-sans text-xs text-[#6B6B6B] ml-auto">{phase.range}</span>
                    </div>
                    <div className="space-y-3 ml-9">
                      {phase.weeks.map((week, w) => (
                        <div key={w} className="flex gap-3">
                          <span className="font-sans text-[11px] uppercase tracking-[0.08em] text-[#6B6B6B] w-16 flex-shrink-0 pt-0.5">{week.label}</span>
                          <p className="font-sans text-sm text-[#0F0F0F] leading-relaxed flex-1">{week.text}</p>
                        </div>
                      ))}
                      <div className="mt-4 pt-4 border-t border-[#E8E6DF] flex gap-3">
                        <span className="font-sans text-[11px] uppercase tracking-[0.08em] text-[#722F37] w-16 flex-shrink-0 pt-0.5">Milestone</span>
                        <p className="font-sans text-sm text-[#0F0F0F] leading-relaxed flex-1 italic">{phase.milestone}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pull quotes from Section 6 source */}
              {phasePlan.pullQuotes.map((q, qi) => (
                <blockquote key={qi} className="my-8 pl-6 border-l-2 border-[#722F37]">
                  <p className="font-display italic text-xl md:text-2xl text-[#0F0F0F] leading-[1.3]">{q}</p>
                </blockquote>
              ))}

              {/* Reflection questions */}
              {phasePlan.reflectionQuestions.length > 0 && (
                <div className="mt-12 pt-10 border-t border-[#E8E6DF]">
                  <p className="font-sans text-[11px] uppercase tracking-[0.12em] text-[#6B6B6B] mb-4">Reflection</p>
                  <h3 className="font-display text-lg font-semibold text-[#0F0F0F] mb-6">Ask yourself these honestly at day 30, 60, and 90</h3>
                  <ol className="space-y-4">
                    {phasePlan.reflectionQuestions.map((q, qi) => (
                      <li key={qi} className="flex gap-4">
                        <span className="font-display text-2xl text-[#E8E6DF] font-semibold tabular-nums leading-none flex-shrink-0">
                          {String(qi + 1).padStart(2, '0')}
                        </span>
                        <p className="font-sans text-base text-[#0F0F0F] leading-relaxed pt-1">{q}</p>
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </article>
          )
        }

        // Sections 0–4 and Section 6 prose fallback
        const contentLines = section.content.split('\n')
        const isSection5 = i === 4

        // Section-specific structural visuals (parameterized by props, not parsed from AI text)
        const sectionVisual = (() => {
          if (i === 0) {
            return (
              <div className="mb-8 grid grid-cols-3 gap-3">
                {[
                  { tier: 'Primary', ...archetypes.primary, weight: 'font-semibold', textSize: 'text-base' },
                  { tier: 'Secondary', ...archetypes.secondary, weight: 'font-medium', textSize: 'text-sm' },
                  { tier: 'Tertiary', ...archetypes.tertiary, weight: 'font-normal', textSize: 'text-sm' },
                ].map((arch, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-lg ${idx === 0 ? 'bg-[#722F37] text-[#FAFAF7]' : 'bg-[#F2F0EB] text-[#0F0F0F]'}`}
                  >
                    <p className={`font-sans text-[10px] uppercase tracking-[0.12em] mb-2 ${idx === 0 ? 'text-[#FAFAF7]/70' : 'text-[#6B6B6B]'}`}>
                      {arch.tier}
                    </p>
                    <p className={`font-display ${arch.textSize} ${arch.weight} leading-tight mb-3`}>
                      {arch.name}
                    </p>
                    <p className={`font-display text-2xl ${arch.weight} tabular-nums ${idx === 0 ? 'text-[#FAFAF7]' : 'text-[#0F0F0F]'}`}>
                      {arch.matchPercentage}%
                    </p>
                  </div>
                ))}
              </div>
            )
          }

          if (i === 1) {
            const getScore = (key: string) => dimensionScores.find(d => d.key === key)?.score ?? 0
            const channels: { name: string; fit: ChannelFit }[] = [
              {
                name: 'LinkedIn',
                fit: getScore('curiosity') >= 4 ? 'Best Fit' : 'Workable',
              },
              {
                name: 'Personalized Video',
                fit: getScore('active_listening') >= 4 ? 'Best Fit' : 'Workable',
              },
              {
                name: 'Cold Email',
                fit: getScore('data_driven') >= 4 ? 'Workable' : 'Challenge',
              },
              {
                name: 'Cold Call',
                fit: getScore('prospecting_comfort') >= 4 ? 'Workable' : 'Challenge',
              },
              {
                name: 'Referral',
                fit: getScore('eq_trust') >= 3.5 ? 'Best Fit' : 'Workable',
              },
            ]
            const fitColors: Record<ChannelFit, string> = {
              'Best Fit':  'bg-[#722F37] text-[#FAFAF7]',
              'Workable':  'bg-[#E8DFDA] text-[#0F0F0F]',
              'Challenge': 'bg-[#F2F0EB] text-[#6B6B6B]',
            }
            const barWidths: Record<ChannelFit, string> = {
              'Best Fit':  '100%',
              'Workable':  '60%',
              'Challenge': '25%',
            }
            return (
              <div className="mb-8 overflow-hidden">
                <p className="font-sans text-[11px] uppercase tracking-[0.12em] text-[#6B6B6B] mb-3">Channel Fit For Your Profile</p>
                <div className="space-y-2">
                  {channels.map((ch, idx) => (
                    <div key={idx} className="grid grid-cols-12 gap-3 items-center">
                      <span className="col-span-4 font-sans text-sm text-[#0F0F0F]">{ch.name}</span>
                      <div className="col-span-6 h-[5px] rounded-full bg-[#E8E6DF] overflow-hidden">
                        <div className="h-full rounded-full bg-[#722F37]" style={{ width: barWidths[ch.fit] }} />
                      </div>
                      <span className={`col-span-2 font-sans text-[10px] uppercase tracking-[0.08em] px-2 py-1 rounded-full text-center ${fitColors[ch.fit]}`}>{ch.fit}</span>
                    </div>
                  ))}
                </div>
              </div>
            )
          }

          if (i === 2) {
            return (
              <div className="mb-8 p-6 rounded-lg bg-[#F2F0EB] border-l-2 border-[#722F37]">
                <p className="font-sans text-[11px] uppercase tracking-[0.12em] text-[#6B6B6B] mb-3">Your Discovery Framework</p>
                <div className="flex items-center gap-3 mb-3">
                  {['Hear', 'Repeat', 'Go Deeper'].map((step, idx) => (
                    <div key={step} className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <span className="font-display text-2xl font-semibold text-[#722F37] tabular-nums">{`0${idx + 1}`}</span>
                        <span className="font-display text-lg font-semibold text-[#0F0F0F]">{step}</span>
                      </div>
                      {idx < 2 && <span className="text-[#722F37] text-xl">→</span>}
                    </div>
                  ))}
                </div>
                <p className="font-sans text-sm text-[#6B6B6B] leading-relaxed">
                  Catch their exact words. Repeat them back without paraphrasing. Ask what&apos;s underneath.
                </p>
              </div>
            )
          }

          if (i === 3) {
            return (
              <div className="mb-8 grid md:grid-cols-2 gap-3">
                {gapDimensions.map((gap) => (
                  <div key={gap.key} className="p-4 rounded-lg bg-[#F2F0EB] border-l-2 border-[#C4756B]">
                    <div className="flex items-baseline justify-between mb-2">
                      <p className="font-sans text-sm text-[#0F0F0F] font-medium">{gap.label}</p>
                      <p className="font-display text-xl font-semibold text-[#0F0F0F] tabular-nums">{gap.score.toFixed(1)}</p>
                    </div>
                    <div className="h-[4px] rounded-full bg-[#E8E6DF] overflow-hidden">
                      <div
                        className="h-full rounded-full bg-[#C4756B]"
                        style={{ width: `${(gap.score / 5) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )
          }

          return null
        })()

        return (
          <article key={i} id={`section-${i + 1}`} className="border-l-2 border-[#722F37] pl-6 scroll-mt-16 pt-8">
            {sectionHeader}
            {sectionVisual}
            <div className="prose prose-slate prose-sm max-w-none">
              {isSection5
                ? groupToolCardLines(contentLines).map((item, j) => {
                    if (item.kind === 'card') {
                      return (
                        <div key={j} className="mt-4 p-4 bg-[#F2F0EB] rounded-lg border-l-2 border-[#722F37]">
                          {item.lines.map((cardLine, k) => (
                            <p
                              key={k}
                              className={`font-sans text-sm text-[#0F0F0F] leading-relaxed${k > 0 ? ' mt-2' : ''}`}
                            >
                              {renderTextContent(cardLine, true)}
                            </p>
                          ))}
                        </div>
                      )
                    }
                    return renderLine(item.text, j, true)
                  })
                : contentLines.map((line, j) => renderLine(line, j, false))
              }
            </div>
          </article>
        )
      })}

      {/* Print footer */}
      <div className="hidden print:block pt-8 border-t border-[#E8E6DF] mt-12">
        <p className="text-xs text-[#6B6B6B]">
          The Noble Seller · The Noble Quotient · thenobleseller.com
        </p>
      </div>
    </div>
  )
}

interface Section {
  heading: string
  content: string
}

function parseCodex(markdown: string): Section[] {
  const lines = markdown.split('\n')
  const sections: Section[] = []
  let currentHeading = ''
  let currentContent: string[] = []

  for (const line of lines) {
    if (line.startsWith('## ')) {
      if (currentHeading) {
        sections.push({ heading: currentHeading, content: currentContent.join('\n').trim() })
      }
      currentHeading = line.replace(/^## /, '').trim()
      currentContent = []
    } else {
      currentContent.push(line)
    }
  }

  if (currentHeading) {
    sections.push({ heading: currentHeading, content: currentContent.join('\n').trim() })
  }

  if (sections.length === 0 && markdown.trim()) {
    sections.push({ heading: 'Your Noble Compass', content: markdown.trim() })
  }

  return sections
}

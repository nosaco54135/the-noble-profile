'use client'

/**
 * Renders the Claude-generated Codex markdown in clean, readable HTML.
 * Parses ## section headers and formats them as distinct sections.
 */
export default function CodexContent({ markdown }: { markdown: string }) {
  const sections = parseCodex(markdown)

  return (
    <div className="space-y-10">
      {sections.map((section, i) => (
        <article key={i} className="border-l-4 border-noble-600 pl-6">
          <h2 className="text-xl font-bold text-noble-800 mb-4">{section.heading}</h2>
          <div className="prose prose-slate prose-sm max-w-none">
            {section.content.split('\n').map((line, j) => {
              if (!line.trim()) return null

              // Bullet points
              if (line.startsWith('- ') || line.startsWith('• ')) {
                return (
                  <p key={j} className="flex gap-2 text-slate-700 leading-relaxed mb-2">
                    <span className="text-noble-600 font-bold mt-0.5 flex-shrink-0">•</span>
                    <span>{line.replace(/^[-•]\s*/, '')}</span>
                  </p>
                )
              }

              // Bold pattern: **text**
              const hasBold = /\*\*.+?\*\*/.test(line)
              if (hasBold) {
                const parts = line.split(/(\*\*.+?\*\*)/)
                return (
                  <p key={j} className="text-slate-700 leading-relaxed mb-3">
                    {parts.map((part, k) =>
                      part.startsWith('**') && part.endsWith('**') ? (
                        <strong key={k} className="text-slate-900 font-semibold">
                          {part.slice(2, -2)}
                        </strong>
                      ) : (
                        part
                      ),
                    )}
                  </p>
                )
              }

              return (
                <p key={j} className="text-slate-700 leading-relaxed mb-3">
                  {line}
                </p>
              )
            })}
          </div>
        </article>
      ))}

      {/* Print footer */}
      <div className="hidden print:block pt-8 border-t border-slate-200 mt-12">
        <p className="text-xs text-slate-400">
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

  // If no ## headers found, treat the whole thing as one section
  if (sections.length === 0 && markdown.trim()) {
    sections.push({ heading: 'Your Codex', content: markdown.trim() })
  }

  return sections
}

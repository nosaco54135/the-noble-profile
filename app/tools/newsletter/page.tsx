'use client'

import { useState, useRef, useEffect } from 'react'

const SYSTEM_PROMPT = `You are the writer behind The Noble Seller, a weekly newsletter for serious sales professionals.

VOICE & TONE:
- Primary influences: Gary Halbert (emotional pull, rhythm, street-smart directness), David Ogilvy (credibility architecture, undeniable facts that land like authority), Robert Cialdini's awareness of influence without the academic register
- Every sentence sells the next. Every paragraph earns the next. This is hypnotic writing — the reader should not be able to stop mid-paragraph.
- The voice has a POV. It is not neutral. It is not a coach. It is a peer who has been in the room and figured something out.
- Mode 2 (opinion/brand POV) is the default. Mode 1 (cinematic scene opening) is used selectively for leads. Mode 3 (observed pattern, teaching) anchors the body.

STRUCTURE:
1. SUBJECT LINES (5 variants) — Written like a text from a sharp colleague. No brand name. No "Issue #X." Pure hook. Variants should cover: curiosity, contrarian claim, historical hook, direct observation, story tease.
2. THE LEAD (400–500 words) — Opens in scene OR with a hard, undeniable claim. No throat-clearing. No "In this issue..." Just starts. Ends with a clean landing that earns the transition.
3. ONE SHARP THING (100–120 words) — A reframe, a stat, a contrarian truth. Short. Dense. No padding. Should feel like the smartest sentence someone said at a dinner party.
4. THE DIMENSION (2–3 lines) — Ties to one of the 12 NQ traits. NOT a pitch. An observation that makes a reader feel seen. Trait name mentioned naturally. No link copy, no CTA language.

HISTORICAL/CROSS-FIELD PARALLELS:
- Draw from history, military, science, art, sport, architecture, philosophy — anything outside sales
- The parallel must be genuinely surprising and undeniably apt — not forced
- The lesson lands because the analogy earns it, not because you explained it to death

WRITING RULES:
- No em dashes in body copy. Use periods or commas.
- No: crucial, pivotal, vital, highlight, underscore, showcase, landscape, testament, tapestry, vibrant, intricate, additionally, align with, foster, garner, enhance, delve, serves as, stands as, game-changer, hack (noun), buckle up, spoiler alert, now more than ever, in today's market, imagine if, what if I told you, picture this, here's the deal, here's the truth, let's be honest, gurus
- No AI-style transitions: "In conclusion," "To summarize," "It's worth noting," "It's important to remember"
- No passive moral conclusions. End on action, observation, or image — not a lesson stated flatly.
- Short paragraphs. Single-sentence paragraphs are allowed and encouraged when the sentence earns it.
- Composite stories are acceptable when the lesson is true.
- First person "I" is a perspective, not autobiography.

THE 12 NQ DIMENSIONS (use one per issue, rotate):
EQ/Trust, Active Listening, Curiosity, Mindset/Resilience, Closing Confidence, Prospecting Comfort, Data-Driven, Authenticity, Process-Oriented, Problem Solving, Customer-Centric, Learning Style

OUTPUT FORMAT:
Return valid JSON only. No markdown. No preamble. No explanation outside the JSON.
{
  "topic": "...",
  "historicalParallel": "...",
  "subjectLines": ["...", "...", "...", "...", "..."],
  "lead": "...",
  "sharpThing": "...",
  "dimension": { "trait": "...", "copy": "..." }
}`

const TOPIC_SYSTEM = `You are a creative director for The Noble Seller newsletter. Generate 3 distinct topic concepts for the week's issue.

Each concept must have:
- A sharp one-line angle (the actual point of view, not just a subject)
- A historical or cross-field reference that could anchor it (from outside sales: military, science, art, architecture, sport, philosophy, business history)
- Which NQ dimension it would naturally connect to

The topics should be varied: one tactical, one psychological, one counter-intuitive or contrarian.

Return JSON only:
[
  { "angle": "...", "historicalHook": "...", "dimension": "..." },
  { "angle": "...", "historicalHook": "...", "dimension": "..." },
  { "angle": "...", "historicalHook": "...", "dimension": "..." }
]`

type Step = 'idle' | 'topics' | 'picked' | 'drafting' | 'draft'

interface Topic {
  angle: string
  historicalHook: string
  dimension: string
  customNote?: string
}

interface DraftResult {
  topic: string
  historicalParallel: string
  subjectLines: string[]
  lead: string
  sharpThing: string
  dimension: { trait: string; copy: string }
}

export default function TNSNewsletterTool() {
  const [step, setStep] = useState<Step>('idle')
  const [topics, setTopics] = useState<Topic[]>([])
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null)
  const [customAngle, setCustomAngle] = useState('')
  const [draft, setDraft] = useState<DraftResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState('')
  const [focusSection, setFocusSection] = useState<string | null>(null)
  const draftRef = useRef<HTMLDivElement>(null)
  const [savedTopics, setSavedTopics] = useState<Topic[]>([])

  useEffect(() => {
    try {
      const raw = localStorage.getItem('tns-saved-topics')
      if (raw) setSavedTopics(JSON.parse(raw))
    } catch {}
  }, [])

  function saveTopic(t: Topic) {
    setSavedTopics(prev => {
      const alreadySaved = prev.some(s => s.angle === t.angle)
      const next = alreadySaved ? prev.filter(s => s.angle !== t.angle) : [...prev, t]
      localStorage.setItem('tns-saved-topics', JSON.stringify(next))
      return next
    })
  }

  function removeSavedTopic(angle: string) {
    setSavedTopics(prev => {
      const next = prev.filter(s => s.angle !== angle)
      localStorage.setItem('tns-saved-topics', JSON.stringify(next))
      return next
    })
  }

  async function callClaude(systemPrompt: string, userMessage: string, maxTokens = 2000): Promise<unknown> {
    const response = await fetch('/api/newsletter-draft', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ systemPrompt, userMessage, maxTokens }),
    })
    const data = await response.json()
    if (!response.ok) throw new Error(data.error || 'API error')
    return data.result
  }

  async function generateTopics() {
    setLoading(true)
    setError('')
    setStep('topics')
    try {
      const result = await callClaude(
        TOPIC_SYSTEM,
        "Generate 3 topic concepts for this week's Noble Seller newsletter.",
        800
      )
      setTopics(result as Topic[])
    } catch (e) {
      setError('Topic generation failed: ' + (e instanceof Error ? e.message : String(e)))
      setStep('idle')
    }
    setLoading(false)
  }

  async function generateDraft(topic: Topic) {
    setLoading(true)
    setError('')
    setStep('drafting')
    setDraft(null)
    try {
      const userMsg = `Write this week's Noble Seller newsletter.
Topic angle: ${topic.angle}
Historical/cross-field reference: ${topic.historicalHook || 'your choice'}
NQ Dimension to feature: ${topic.dimension}
${topic.customNote ? `Additional direction: ${topic.customNote}` : ''}`
      const result = await callClaude(SYSTEM_PROMPT, userMsg, 2000)
      setDraft(result as DraftResult)
      setStep('draft')
      setTimeout(() => draftRef.current?.scrollIntoView({ behavior: 'smooth' }), 100)
    } catch (e) {
      setError('Draft generation failed: ' + (e instanceof Error ? e.message : String(e)))
      setStep('topics')
    }
    setLoading(false)
  }

  function pickTopic(t: Topic) {
    setSelectedTopic(t)
    setStep('picked')
  }

  function copySection(label: string, text: string) {
    navigator.clipboard.writeText(text)
    setCopied(label)
    setTimeout(() => setCopied(''), 2000)
  }

  function copyAll() {
    if (!draft) return
    const full = `SUBJECT LINE OPTIONS:\n${draft.subjectLines.map((s, i) => `${i + 1}. ${s}`).join('\n')}\n\n---\n\n${draft.lead}\n\n---\n\nONE SHARP THING\n${draft.sharpThing}\n\n---\n\nTHE DIMENSION — ${draft.dimension.trait}\n${draft.dimension.copy}`
    navigator.clipboard.writeText(full)
    setCopied('all')
    setTimeout(() => setCopied(''), 2000)
  }

  function resetAll() {
    setStep('idle')
    setTopics([])
    setDraft(null)
    setSelectedTopic(null)
    setCustomAngle('')
  }

  const btnBase: React.CSSProperties = { padding: '10px 20px', fontSize: '13px', fontWeight: 500, cursor: 'pointer', transition: 'all 0.15s', border: 'none', fontFamily: 'system-ui, sans-serif' }
  const btnPrimary: React.CSSProperties = { ...btnBase, background: '#722F37', color: '#FAFAF7' }
  const btnGhost: React.CSSProperties = { ...btnBase, background: 'transparent', color: '#722F37', border: '1px solid #722F37' }
  const btnMuted: React.CSSProperties = { ...btnBase, background: 'transparent', color: '#6B6B6B', border: '1px solid #E8E6DF' }

  return (
    <div style={{ fontFamily: 'Georgia, serif', background: '#FAFAF7', minHeight: '100vh', color: '#0F0F0F' }}>
      <div style={{ borderBottom: '1px solid #E8E6DF', padding: '20px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontFamily: 'Georgia, serif', fontSize: '18px', fontWeight: 600, color: '#722F37' }}>The Noble Seller</div>
          <div style={{ fontSize: '11px', color: '#6B6B6B', marginTop: '2px', letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: 'system-ui, sans-serif' }}>Newsletter Drafting Studio</div>
        </div>
        {step !== 'idle' && (
          <button style={btnMuted} onClick={resetAll}>Start over</button>
        )}
      </div>

      <div style={{ maxWidth: '760px', margin: '0 auto', padding: '48px 32px' }}>

        {step === 'idle' && (
          <div style={{ textAlign: 'center', paddingTop: '24px' }}>
            <div style={{ fontSize: '13px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#6B6B6B', fontFamily: 'system-ui, sans-serif', marginBottom: '16px' }}>Wednesday is coming</div>
            <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '42px', fontWeight: 600, lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: '16px' }}>Build this week&apos;s issue.</h1>
            <p style={{ fontSize: '16px', color: '#6B6B6B', lineHeight: 1.6, maxWidth: '480px', margin: '0 auto 40px', fontFamily: 'system-ui, sans-serif' }}>
              Three topic concepts. You pick. Claude drafts the lead, the sharp thing, subject lines, and the dimension hook. You edit and publish.
            </p>
            <button style={btnPrimary} onClick={generateTopics}>Generate this week&apos;s topics</button>
          </div>
        )}

        {loading && (
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <div style={{ fontSize: '13px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#6B6B6B', fontFamily: 'system-ui, sans-serif', marginBottom: '16px' }}>
              {step === 'topics' ? 'Finding the angle...' : 'Writing the draft...'}
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '6px' }}>
              {[0, 1, 2].map(i => (
                <div key={i} style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#722F37', opacity: 0.4, animation: `pulse 1.2s ease-in-out ${i * 0.2}s infinite` }} />
              ))}
            </div>
          </div>
        )}

        {step === 'topics' && !loading && topics.length > 0 && (
          <div>
            <div style={{ marginBottom: '32px' }}>
              <div style={{ fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#6B6B6B', fontFamily: 'system-ui, sans-serif', marginBottom: '8px' }}>Step 1 of 2</div>
              <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '28px', fontWeight: 600 }}>Pick your angle.</h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
              {topics.map((t, i) => {
                const isSaved = savedTopics.some(s => s.angle === t.angle)
                return (
                  <div key={i} onClick={() => pickTopic(t)}
                    style={{ border: '1px solid #E8E6DF', padding: '24px', cursor: 'pointer', background: '#fff' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = '#722F37' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = '#E8E6DF' }}>
                    <div style={{ display: 'flex', gap: '16px', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div style={{ display: 'flex', gap: '16px', flex: 1 }}>
                        <div style={{ fontSize: '12px', fontWeight: 700, color: '#722F37', fontFamily: 'system-ui, sans-serif', minWidth: '20px' }}>{i + 1}</div>
                        <div>
                          <div style={{ fontFamily: 'Georgia, serif', fontSize: '17px', lineHeight: 1.4, marginBottom: '8px', fontWeight: 600 }}>{t.angle}</div>
                          <div style={{ fontSize: '13px', color: '#6B6B6B', fontFamily: 'system-ui, sans-serif', marginBottom: '6px' }}><span style={{ color: '#722F37', fontWeight: 500 }}>Historical hook:</span> {t.historicalHook}</div>
                          <div style={{ fontSize: '11px', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#6B6B6B', fontFamily: 'system-ui, sans-serif' }}>Dimension: {t.dimension}</div>
                        </div>
                      </div>
                      <button
                        onClick={e => { e.stopPropagation(); saveTopic(t) }}
                        style={{ fontSize: '11px', fontFamily: 'system-ui, sans-serif', cursor: 'pointer', background: 'none', border: '1px solid ' + (isSaved ? '#722F37' : '#E8E6DF'), color: isSaved ? '#722F37' : '#6B6B6B', padding: '4px 10px', whiteSpace: 'nowrap', transition: 'all 0.15s', flexShrink: 0 }}>
                        {isSaved ? '✓ Saved' : 'Save for later'}
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
            <div style={{ borderTop: '1px solid #E8E6DF', paddingTop: '24px' }}>
              <div style={{ fontSize: '13px', color: '#6B6B6B', fontFamily: 'system-ui, sans-serif', marginBottom: '10px' }}>None of these? Write your own:</div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <input value={customAngle} onChange={e => setCustomAngle(e.target.value)}
                  placeholder="Your angle + any reference you want to use..."
                  style={{ flex: 1, border: '1px solid #E8E6DF', padding: '10px 14px', fontSize: '14px', fontFamily: 'system-ui, sans-serif', background: '#fff', outline: 'none' }} />
                <button style={{ ...btnPrimary, opacity: customAngle.trim() ? 1 : 0.4 }} disabled={!customAngle.trim()}
                  onClick={() => pickTopic({ angle: customAngle, historicalHook: 'your direction', dimension: 'your choice' })}>
                  Use this
                </button>
              </div>
            </div>

            {savedTopics.length > 0 && (
              <div style={{ marginTop: '40px', borderTop: '1px solid #E8E6DF', paddingTop: '32px' }}>
                <div style={{ fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#6B6B6B', fontFamily: 'system-ui, sans-serif', marginBottom: '16px' }}>Saved for later</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {savedTopics.map((t, i) => (
                    <div key={i} style={{ border: '1px solid #E8E6DF', padding: '20px 24px', background: '#fff', display: 'flex', gap: '16px', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontFamily: 'Georgia, serif', fontSize: '16px', lineHeight: 1.4, marginBottom: '6px', fontWeight: 600 }}>{t.angle}</div>
                        <div style={{ fontSize: '12px', color: '#6B6B6B', fontFamily: 'system-ui, sans-serif', marginBottom: '4px' }}><span style={{ color: '#722F37', fontWeight: 500 }}>Historical hook:</span> {t.historicalHook}</div>
                        <div style={{ fontSize: '11px', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#6B6B6B', fontFamily: 'system-ui, sans-serif' }}>Dimension: {t.dimension}</div>
                      </div>
                      <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                        <button onClick={() => pickTopic(t)} style={{ fontSize: '12px', fontFamily: 'system-ui, sans-serif', cursor: 'pointer', background: '#722F37', color: '#FAFAF7', border: 'none', padding: '5px 12px' }}>Use this</button>
                        <button onClick={() => removeSavedTopic(t.angle)} style={{ fontSize: '12px', fontFamily: 'system-ui, sans-serif', cursor: 'pointer', background: 'none', color: '#6B6B6B', border: '1px solid #E8E6DF', padding: '5px 12px' }}>Remove</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {step === 'picked' && selectedTopic && (
          <div>
            <div style={{ marginBottom: '32px' }}>
              <div style={{ fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#6B6B6B', fontFamily: 'system-ui, sans-serif', marginBottom: '8px' }}>Step 2 of 2</div>
              <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '28px', fontWeight: 600 }}>Confirm and add direction.</h2>
            </div>
            <div style={{ border: '1px solid #722F37', padding: '24px', marginBottom: '24px', background: '#fff' }}>
              <div style={{ fontSize: '11px', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#722F37', fontFamily: 'system-ui, sans-serif', marginBottom: '8px' }}>Selected angle</div>
              <div style={{ fontFamily: 'Georgia, serif', fontSize: '17px', fontWeight: 600, marginBottom: '6px' }}>{selectedTopic.angle}</div>
              <div style={{ fontSize: '13px', color: '#6B6B6B', fontFamily: 'system-ui, sans-serif' }}>{selectedTopic.historicalHook} · {selectedTopic.dimension}</div>
            </div>
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '13px', color: '#6B6B6B', fontFamily: 'system-ui, sans-serif', marginBottom: '8px' }}>Additional direction (optional):</label>
              <textarea value={customAngle} onChange={e => setCustomAngle(e.target.value)}
                placeholder="e.g. Open in scene. Lean into the historical story. Keep the sharp thing punchy."
                rows={3} style={{ width: '100%', border: '1px solid #E8E6DF', padding: '10px 14px', fontSize: '14px', fontFamily: 'system-ui, sans-serif', background: '#fff', outline: 'none', resize: 'vertical', boxSizing: 'border-box' }} />
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button style={btnPrimary} onClick={() => generateDraft({ ...selectedTopic, customNote: customAngle })}>Write the draft</button>
              <button style={btnMuted} onClick={() => setStep('topics')}>Back to topics</button>
            </div>
          </div>
        )}

        {step === 'draft' && draft && !loading && (
          <div ref={draftRef}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <div style={{ fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#6B6B6B', fontFamily: 'system-ui, sans-serif', marginBottom: '6px' }}>Draft ready</div>
                <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '28px', fontWeight: 600 }}>Edit and publish.</h2>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button style={btnGhost} onClick={copyAll}>{copied === 'all' ? 'Copied' : 'Copy all'}</button>
                <button style={btnPrimary} onClick={() => generateDraft({ ...selectedTopic!, customNote: customAngle })}>Regenerate</button>
              </div>
            </div>

            <DraftSection label="Subject Lines" tag="PICK ONE" focused={focusSection === 'subjects'} onFocus={() => setFocusSection('subjects')}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {draft.subjectLines.map((s, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '10px 14px', border: '1px solid #E8E6DF', background: '#FAFAF7' }}>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: '#722F37', fontFamily: 'system-ui, sans-serif', minWidth: '16px' }}>{i + 1}</span>
                    <span style={{ fontFamily: 'Georgia, serif', fontSize: '15px', lineHeight: 1.4, flex: 1 }}>{s}</span>
                    <button onClick={() => copySection(`subj-${i}`, s)} style={{ fontSize: '11px', color: '#6B6B6B', fontFamily: 'system-ui, sans-serif', background: 'none', border: 'none', cursor: 'pointer' }}>
                      {copied === `subj-${i}` ? '✓' : 'Copy'}
                    </button>
                  </div>
                ))}
              </div>
            </DraftSection>

            <DraftSection label="The Lead" tag="400–500 WORDS" focused={focusSection === 'lead'} onFocus={() => setFocusSection('lead')} onCopy={() => copySection('lead', draft.lead)} copied={copied === 'lead'}>
              <div style={{ fontFamily: 'Georgia, serif', fontSize: '16px', lineHeight: 1.8, whiteSpace: 'pre-wrap' }}>{draft.lead}</div>
            </DraftSection>

            <DraftSection label="One Sharp Thing" tag="~100 WORDS" focused={focusSection === 'sharp'} onFocus={() => setFocusSection('sharp')} onCopy={() => copySection('sharp', draft.sharpThing)} copied={copied === 'sharp'}>
              <div style={{ fontFamily: 'Georgia, serif', fontSize: '16px', lineHeight: 1.7, fontStyle: 'italic' }}>{draft.sharpThing}</div>
            </DraftSection>

            <DraftSection label={`The Dimension — ${draft.dimension?.trait}`} tag="2–3 LINES" focused={focusSection === 'dimension'} onFocus={() => setFocusSection('dimension')} onCopy={() => copySection('dim', draft.dimension?.copy)} copied={copied === 'dim'}>
              <div style={{ fontFamily: 'Georgia, serif', fontSize: '16px', lineHeight: 1.7 }}>{draft.dimension?.copy}</div>
            </DraftSection>

            <div style={{ borderTop: '1px solid #E8E6DF', paddingTop: '24px', display: 'flex', gap: '12px' }}>
              <button style={btnGhost} onClick={() => { setStep('topics'); setDraft(null) }}>New topic</button>
              <button style={btnMuted} onClick={resetAll}>Start fresh</button>
            </div>
          </div>
        )}

        {error && (
          <div style={{ marginTop: '16px', padding: '14px 18px', border: '1px solid #722F37', color: '#722F37', fontSize: '13px', fontFamily: 'system-ui, sans-serif' }}>
            {error}
          </div>
        )}
      </div>
      <style>{`@keyframes pulse { 0%,100%{opacity:.3;transform:scale(.8)} 50%{opacity:1;transform:scale(1)} }`}</style>
    </div>
  )
}

interface DraftSectionProps {
  label: string
  tag: string
  focused: boolean
  onFocus: () => void
  onCopy?: () => void
  copied?: boolean
  children: React.ReactNode
}

function DraftSection({ label, tag, focused, onFocus, onCopy, copied, children }: DraftSectionProps) {
  return (
    <div onClick={onFocus} style={{ marginBottom: '24px', border: `1px solid ${focused ? '#722F37' : '#E8E6DF'}`, transition: 'border-color 0.15s' }}>
      <div style={{ padding: '10px 18px', borderBottom: `1px solid ${focused ? '#722F37' : '#E8E6DF'}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: focused ? '#fff8f8' : '#F2F0E8' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontFamily: 'Georgia, serif', fontSize: '14px', fontWeight: 600 }}>{label}</span>
          <span style={{ fontSize: '10px', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#6B6B6B', fontFamily: 'system-ui, sans-serif' }}>{tag}</span>
        </div>
        {onCopy && (
          <button onClick={e => { e.stopPropagation(); onCopy() }} style={{ fontSize: '12px', color: '#6B6B6B', fontFamily: 'system-ui, sans-serif', background: 'none', border: 'none', cursor: 'pointer' }}>
            {copied ? '✓ Copied' : 'Copy'}
          </button>
        )}
      </div>
      <div style={{ padding: '20px 18px', background: '#fff' }}>{children}</div>
    </div>
  )
}

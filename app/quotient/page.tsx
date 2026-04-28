'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LandingPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [isSubscriber, setIsSubscriber] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const price = isSubscriber ? '$37' : '$47'
  const originalPrice = '$47'

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.')
      return
    }

    setLoading(true)
    // Store in sessionStorage so the assessment page can read them
    sessionStorage.setItem('tnq_email', email)
    sessionStorage.setItem('tnq_subscriber', String(isSubscriber))
    router.push('/quotient/assessment')
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <main className="max-w-5xl mx-auto px-6">
        <div className="pt-20 pb-16 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-noble-50 border border-noble-200 text-noble-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-8 tracking-wide uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-noble-500 inline-block" />
            Authentic Influence. Engineered Results.
          </div>

          <h1 className="text-5xl sm:text-6xl font-extrabold text-slate-900 leading-tight tracking-tight max-w-3xl mx-auto mb-6">
            Discover your natural selling style
            <span className="text-noble-600"> — and what&apos;s holding you back.</span>
          </h1>

          <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed mb-12">
            The Noble Quotient is a 25-question assessment built specifically for sales professionals.
            Find out how you sell, how you learn, and exactly where to focus to hit your next level.
          </p>

          {/* Form card */}
          <div className="max-w-md mx-auto bg-white rounded-2xl border border-slate-200 shadow-lg p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="text-left">
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-slate-700 mb-2"
                >
                  Your email address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 text-slate-900 placeholder-slate-400
                             focus:outline-none focus:ring-2 focus:ring-noble-500 focus:border-noble-500 transition"
                  required
                  autoComplete="email"
                />
                {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
              </div>

              {/* Subscriber checkbox */}
              <label className="flex items-start gap-3 cursor-pointer group">
                <div className="mt-0.5 flex-shrink-0">
                  <input
                    type="checkbox"
                    checked={isSubscriber}
                    onChange={(e) => setIsSubscriber(e.target.checked)}
                    className="w-4 h-4 rounded border-slate-300 text-noble-600
                               focus:ring-noble-500 cursor-pointer"
                  />
                </div>
                <span className="text-sm text-slate-600 group-hover:text-slate-800 transition">
                  I&apos;m a Noble Seller newsletter subscriber{' '}
                  <span className="font-semibold text-noble-700">— save $10 on The Noble Codex</span>
                </span>
              </label>

              {/* Price */}
              <div className="flex items-center justify-center gap-3 py-2">
                <span className="text-sm text-slate-500">
                  Free assessment. The Noble Codex:
                </span>
                {isSubscriber ? (
                  <>
                    <span className="text-slate-400 line-through text-lg">{originalPrice}</span>
                    <span className="text-3xl font-bold text-noble-600">{price}</span>
                  </>
                ) : (
                  <span className="text-3xl font-bold text-slate-900">{price}</span>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full py-4 text-base"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Starting…
                  </>
                ) : (
                  'Start my Noble Quotient →'
                )}
              </button>
            </form>

            <p className="mt-4 text-xs text-center text-slate-400">
              Assessment takes ~5 minutes. Results shown immediately.
              <br />Payment only required for The Noble Codex, your custom coaching guide.
            </p>
          </div>
        </div>

        {/* What you get */}
        <div className="py-16 border-t border-slate-100">
          <h2 className="text-2xl font-bold text-center text-slate-900 mb-12">
            What&apos;s inside The Noble Quotient
          </h2>
          <div className="grid sm:grid-cols-3 gap-8">
            {[
              {
                icon: '🧭',
                title: 'Your Sales Archetype',
                body: 'A dynamic archetype built from two axes: your natural traits and your selling style. Plus secondary and tertiary influences.',
              },
              {
                icon: '📊',
                title: '12-Dimension Breakdown',
                body: 'Scores across EQ, curiosity, closing confidence, data-driven thinking, authenticity, resilience, and more. Visualized clearly.',
              },
              {
                icon: '📋',
                title: 'The Noble Codex',
                body: 'Powered by AI and built from your scores. Six sections covering prospecting tactics, closing strategies, blind spots, and a 30/60/90 day plan specific to how you sell.',
              },
            ].map((item) => (
              <div key={item.title} className="text-center px-4">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Social proof / trust */}
        <div className="py-16 border-t border-slate-100 text-center">
          <p className="text-sm font-semibold text-noble-600 uppercase tracking-wider mb-6">
            Built by The Noble Seller
          </p>
          <p className="text-slate-500 text-base max-w-xl mx-auto leading-relaxed">
            The Noble Quotient was designed to go beyond generic personality tests.
            Every score is mapped to real selling behaviors. Every Codex is powered by AI
            and written specifically for your profile, not a category.
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-100 py-8">
        <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-noble-600 flex items-center justify-center">
              <span className="text-white font-bold text-xs">N</span>
            </div>
            <span className="text-sm text-slate-500">The Noble Seller</span>
          </div>
          <p className="text-xs text-slate-400">
            © {new Date().getFullYear()} The Noble Seller · thenobleseller.com
          </p>
        </div>
      </footer>
    </div>
  )
}

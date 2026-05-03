'use client'

import { useState } from 'react'

interface Props {
  assessmentId: string
  isSubscriber: boolean
  /** True when Stripe is not configured — button becomes a dev bypass. */
  devMode?: boolean
}

export default function PaywallButton({ assessmentId, isSubscriber, devMode = false }: Props) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleCheckout() {
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ assessmentId, isSubscriber }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error ?? 'Failed to start checkout')
      }

      const { url } = await res.json()
      window.location.href = url
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
      setLoading(false)
    }
  }

  return (
    <div className="space-y-tns-sm">
      <button
        onClick={handleCheckout}
        disabled={loading}
        className="inline-flex items-center justify-center gap-2 bg-tns-accent text-tns-bg font-medium px-8 py-3 rounded-lg hover:bg-tns-accentDark transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-tns-accent focus-visible:ring-offset-2"
      >
        {loading ? (
          <>
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            {devMode ? 'Unlocking…' : 'Redirecting to checkout…'}
          </>
        ) : devMode ? (
          <>Dev mode · bypass payment</>
        ) : (
          <>Unlock my Codex · {isSubscriber ? '$37' : '$47'}</>
        )}
      </button>
      {error && <p className="text-[13px] text-tns-accent">{error}</p>}
    </div>
  )
}

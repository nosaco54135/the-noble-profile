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
    <div className="space-y-2">
      <button
        onClick={handleCheckout}
        disabled={loading}
        className={
          devMode
            ? 'w-full sm:w-auto px-10 py-4 bg-amber-500 text-white font-semibold rounded-lg hover:bg-amber-600 transition disabled:opacity-50 flex items-center justify-center gap-2'
            : 'btn-primary text-base px-10 py-4 w-full sm:w-auto'
        }
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
          <>DEV MODE — Bypass payment</>
        ) : (
          <>Unlock My Codex — {isSubscriber ? '$37' : '$47'}</>
        )}
      </button>
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  )
}

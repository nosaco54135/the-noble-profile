'use client'

import { useState, useEffect } from 'react'

interface Props {
  assessmentId: string
  email: string
  devMode?: boolean
}

type Phase = 'idle' | 'upsell' | 'subscribing' | 'redirecting'

const Spinner = () => (
  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
  </svg>
)

export default function PaywallButton({ assessmentId, email, devMode = false }: Props) {
  const [subscribed, setSubscribed] = useState<boolean | null>(null) // null = verifying
  const [phase, setPhase] = useState<Phase>('idle')
  const [error, setError] = useState('')

  useEffect(() => {
    if (devMode) {
      setSubscribed(false)
      return
    }

    let cancelled = false
    fetch('/api/verify-subscriber', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    })
      .then(res => res.ok ? res.json() : { subscribed: false })
      .then(data => { if (!cancelled) setSubscribed(Boolean(data.subscribed)) })
      .catch(() => { if (!cancelled) setSubscribed(false) })

    return () => { cancelled = true }
  }, [email, devMode])

  async function goToCheckout(isSubscriber: boolean) {
    setPhase('redirecting')
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
      setPhase('idle')
    }
  }

  async function handleInitialClick() {
    if (devMode) {
      await goToCheckout(false)
      return
    }
    if (subscribed === true) {
      await goToCheckout(true)
    } else {
      setPhase('upsell')
    }
  }

  async function handleSubscribeAndSave() {
    setPhase('subscribing')
    setError('')
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (!res.ok) {
        console.warn('[PaywallButton] Subscribe failed, falling back to $47')
        await goToCheckout(false)
        return
      }
      await goToCheckout(true)
    } catch {
      console.warn('[PaywallButton] Subscribe error, falling back to $47')
      await goToCheckout(false)
    }
  }

  const isActionLoading = phase === 'subscribing' || phase === 'redirecting'
  const isVerifying = subscribed === null
  const isDisabled = isVerifying || isActionLoading

  const buttonLabel = (() => {
    if (isVerifying) return <><Spinner />Loading…</>
    if (isActionLoading) {
      const label = phase === 'subscribing' ? 'Subscribing…' : 'Redirecting…'
      return <><Spinner />{label}</>
    }
    if (devMode) return <>Dev mode · bypass payment</>
    if (subscribed) return <>Unlock my Codex · $37</>
    return <>Unlock my Codex · $47</>
  })()

  return (
    <div className="w-full max-w-sm mx-auto space-y-tns-sm">
      <button
        onClick={handleInitialClick}
        disabled={isDisabled}
        className="w-full inline-flex items-center justify-center gap-2 bg-tns-accent text-tns-bg font-medium px-8 py-3 rounded-lg hover:bg-tns-accentDark transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-tns-accent focus-visible:ring-offset-2"
      >
        {buttonLabel}
      </button>

      {phase === 'upsell' && (
        <div className="bg-[#F2F0EB] rounded-lg p-4 mt-3 text-left">
          <p className="font-display text-lg text-[#0F0F0F] mb-1">Save $10 on your Codex</p>
          <p className="font-sans text-sm text-[#6B6B6B] mb-3">
            Subscribe to The Noble Seller newsletter and get the Codex for $37.
          </p>
          <button
            onClick={handleSubscribeAndSave}
            disabled={isActionLoading}
            className="w-full inline-flex items-center justify-center gap-2 bg-tns-accent text-tns-bg font-medium px-6 py-2.5 rounded-lg hover:bg-tns-accentDark transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-tns-accent focus-visible:ring-offset-2 mb-2"
          >
            Subscribe and Save → $37
          </button>
          <button
            onClick={() => goToCheckout(false)}
            disabled={isActionLoading}
            className="w-full font-sans text-xs text-[#6B6B6B] underline cursor-pointer disabled:opacity-50"
          >
            Continue at $47
          </button>
        </div>
      )}

      {error && <p className="text-[13px] text-tns-accent">{error}</p>}
    </div>
  )
}

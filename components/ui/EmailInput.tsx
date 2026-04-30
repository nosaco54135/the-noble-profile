'use client'

import { useState, type FormEvent } from 'react'

type Props = {
  buttonLabel?: string
  successMessage?: string
  onSubmit?: (email: string) => void | Promise<void>
  id?: string
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function EmailInput({
  buttonLabel = 'Subscribe',
  successMessage = "Thanks. You're on the list.",
  onSubmit,
  id,
}: Props) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [validationError, setValidationError] = useState('')

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setValidationError('')

    if (!emailRegex.test(email)) {
      setValidationError('Please enter a valid email.')
      return
    }

    setStatus('loading')

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      if (!res.ok) {
        setStatus('error')
        return
      }

      if (onSubmit) {
        await onSubmit(email)
      }

      setEmail('')
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <p className="text-tns-fg text-base" role="status">
        {successMessage}
      </p>
    )
  }

  const isLoading = status === 'loading'

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex flex-col md:flex-row gap-2">
        <label htmlFor={id ?? 'tns-email'} className="sr-only">
          Email address
        </label>
        <input
          id={id ?? 'tns-email'}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          required
          autoComplete="email"
          disabled={isLoading}
          className="flex-1 bg-transparent border-b border-tns-border px-0 py-3 text-tns-fg placeholder:text-tns-muted focus:outline-none focus:border-tns-accent transition-colors disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="bg-tns-accent text-tns-bg px-6 py-3 font-medium hover:bg-tns-accentDark transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-tns-accent focus-visible:ring-offset-2 disabled:opacity-60"
        >
          {isLoading ? '···' : buttonLabel}
        </button>
      </div>
      {validationError && (
        <p className="mt-tns-sm text-sm text-tns-accent">{validationError}</p>
      )}
      {status === 'error' && !validationError && (
        <p className="mt-tns-sm text-sm text-tns-accent">
          Something went wrong. Please try again.
        </p>
      )}
    </form>
  )
}

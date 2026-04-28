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
  const [error, setError] = useState('')
  const [submitted, setSubmitted] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email.')
      return
    }
    if (onSubmit) {
      await onSubmit(email)
    } else {
      console.log('Newsletter signup:', email)
    }
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <p className="text-tns-fg text-base" role="status">
        {successMessage}
      </p>
    )
  }

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
          className="flex-1 bg-transparent border-b border-tns-border px-0 py-3 text-tns-fg placeholder:text-tns-muted focus:outline-none focus:border-tns-accent transition-colors"
        />
        <button
          type="submit"
          className="bg-tns-accent text-tns-bg px-6 py-3 font-medium hover:bg-tns-accentDark transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-tns-accent focus-visible:ring-offset-2"
        >
          {buttonLabel}
        </button>
      </div>
      {error && <p className="mt-tns-sm text-sm text-tns-accent">{error}</p>}
    </form>
  )
}

'use client'

import { Suspense, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Analytics } from '@vercel/analytics/react'
import type { BeforeSendEvent } from '@vercel/analytics'

function NotrackParamHandler() {
  const searchParams = useSearchParams()
  useEffect(() => {
    const notrack = searchParams.get('notrack')
    if (notrack === '1') {
      localStorage.setItem('tns_notrack', '1')
    } else if (notrack === '0') {
      localStorage.removeItem('tns_notrack')
    }
  }, [searchParams])
  return null
}

function beforeSend(event: BeforeSendEvent) {
  if (typeof window !== 'undefined' && localStorage.getItem('tns_notrack') === '1') {
    return null
  }
  return event
}

export function AnalyticsGuard() {
  return (
    <>
      <Suspense fallback={null}>
        <NotrackParamHandler />
      </Suspense>
      <Analytics beforeSend={beforeSend} />
    </>
  )
}

const BEEHIIV_API_BASE = 'https://api.beehiiv.com/v2'

function getApiKey(): string {
  const key = process.env.BEEHIIV_API_KEY
  if (!key) throw new Error('BEEHIIV_API_KEY is not set')
  return key
}

function getPublicationId(): string {
  const id = process.env.BEEHIIV_PUBLICATION_ID
  if (!id) throw new Error('BEEHIIV_PUBLICATION_ID is not set')
  return id
}

/**
 * Check if an email is an active subscriber to the Beehiiv publication.
 * Returns true only if the subscription exists and status is 'active'.
 */
export async function isActiveSubscriber(email: string): Promise<boolean> {
  try {
    const publicationId = getPublicationId()
    const apiKey = getApiKey()
    const url = `${BEEHIIV_API_BASE}/publications/${publicationId}/subscriptions/by_email/${encodeURIComponent(email)}`

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    })

    if (response.status === 404) {
      return false
    }

    if (!response.ok) {
      console.error('[beehiiv] verification failed:', response.status, await response.text())
      return false
    }

    const data = await response.json()
    return data?.data?.status === 'active'
  } catch (err) {
    console.error('[beehiiv] isActiveSubscriber error:', err)
    return false
  }
}

/**
 * Subscribe an email to the Beehiiv publication.
 * Returns true if the subscription was created successfully.
 */
export async function subscribeEmail(email: string, source: string = 'codex_checkout'): Promise<boolean> {
  try {
    const publicationId = getPublicationId()
    const apiKey = getApiKey()
    const url = `${BEEHIIV_API_BASE}/publications/${publicationId}/subscriptions`

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        reactivate_existing: true,
        send_welcome_email: true,
        utm_source: source,
      }),
    })

    if (!response.ok) {
      console.error('[beehiiv] subscribe failed:', response.status, await response.text())
      return false
    }

    return true
  } catch (err) {
    console.error('[beehiiv] subscribeEmail error:', err)
    return false
  }
}

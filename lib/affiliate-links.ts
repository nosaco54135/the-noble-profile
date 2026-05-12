export interface AffiliateLink {
  displayName: string
  url: string
  matcher: string[] // lowercase strings to match against generated text
}

export const AFFILIATE_LINKS: AffiliateLink[] = [
  // Books
  {
    displayName: 'SPIN Selling',
    url: 'https://amzn.to/spin-selling', // placeholder — replace with real affiliate URL
    matcher: ['spin selling', 'spin selling by neil rackham', 'rackham'],
  },
  {
    displayName: 'The Challenger Sale',
    url: 'https://amzn.to/challenger-sale', // placeholder
    matcher: ['the challenger sale', 'challenger sale', 'dixon', 'adamson'],
  },
  {
    displayName: 'Never Split the Difference',
    url: 'https://amzn.to/never-split', // placeholder
    matcher: ['never split the difference', 'chris voss', 'voss'],
  },
  {
    displayName: 'The Sales Development Playbook',
    url: 'https://amzn.to/sdp-bertuzzi', // placeholder
    matcher: ['sales development playbook', 'trish bertuzzi', 'bertuzzi'],
  },
  {
    displayName: 'Fanatical Prospecting',
    url: 'https://amzn.to/fanatical-prospecting', // placeholder
    matcher: ['fanatical prospecting', 'jeb blount', 'blount'],
  },
  {
    displayName: 'The Psychology of Selling',
    url: 'https://amzn.to/psychology-selling', // placeholder
    matcher: ['psychology of selling', 'brian tracy', 'tracy'],
  },
  {
    displayName: 'Predictable Revenue',
    url: 'https://amzn.to/predictable-revenue', // placeholder
    matcher: ['predictable revenue', 'aaron ross'],
  },
  {
    displayName: 'To Sell Is Human',
    url: 'https://amzn.to/to-sell-is-human', // placeholder
    matcher: ['to sell is human', 'daniel pink', 'pink'],
  },
  // Tools
  {
    displayName: 'Gong.io',
    url: 'https://www.gong.io', // placeholder — add affiliate param when available
    matcher: ['gong.io', 'gong'],
  },
  {
    displayName: 'Chorus.ai',
    url: 'https://www.chorus.ai',
    matcher: ['chorus.ai', 'chorus'],
  },
  {
    displayName: 'Apollo.io',
    url: 'https://www.apollo.io',
    matcher: ['apollo.io', 'apollo'],
  },
  {
    displayName: 'HubSpot Sales Hub',
    url: 'https://hubspot.com/products/sales',
    matcher: ['hubspot sales hub', 'hubspot', 'sales hub'],
  },
  {
    displayName: 'Lavender',
    url: 'https://www.lavender.ai',
    matcher: ['lavender'],
  },
  {
    displayName: 'Loom',
    url: 'https://www.loom.com',
    matcher: ['loom'],
  },
  {
    displayName: 'Salesloft',
    url: 'https://salesloft.com',
    matcher: ['salesloft'],
  },
  {
    displayName: 'LinkedIn Sales Navigator',
    url: 'https://business.linkedin.com/sales-solutions',
    matcher: ['sales navigator', 'linkedin sales navigator'],
  },
  {
    displayName: 'Clay',
    url: 'https://clay.com',
    matcher: ['clay'],
  },
  {
    displayName: 'Fathom',
    url: 'https://fathom.video',
    matcher: ['fathom'],
  },
  {
    displayName: 'Lemlist',
    url: 'https://www.lemlist.com',
    matcher: ['lemlist'],
  },
  {
    displayName: 'Instantly.ai',
    url: 'https://instantly.ai',
    matcher: ['instantly.ai', 'instantly'],
  },
  // Books
  {
    displayName: 'The Trusted Advisor',
    url: 'https://amzn.to/trusted-advisor',
    matcher: ['the trusted advisor', 'trusted advisor', 'maister', 'green'],
  },
  {
    displayName: 'Thinking Fast and Slow',
    url: 'https://amzn.to/thinking-fast-slow',
    matcher: ['thinking fast and slow', 'kahneman'],
  },
  {
    displayName: 'Meddicc',
    url: 'https://amzn.to/meddicc',
    matcher: ['meddicc', 'andy walker', 'meddic'],
  },
  {
    displayName: 'Gap Selling',
    url: 'https://amzn.to/gap-selling',
    matcher: ['gap selling', 'keenan'],
  },
  {
    displayName: 'Atomic Habits',
    url: 'https://amzn.to/atomic-habits',
    matcher: ['atomic habits', 'james clear', 'clear'],
  },
  {
    displayName: 'The Inner Game of Tennis',
    url: 'https://amzn.to/inner-game-tennis',
    matcher: ['inner game of tennis', 'gallwey'],
  },
  {
    displayName: 'Extreme Ownership',
    url: 'https://amzn.to/extreme-ownership',
    matcher: ['extreme ownership', 'willink', 'babin'],
  },
]

// Returns the affiliate URL for a given text match, or null if no match
export function findAffiliateLink(text: string): AffiliateLink | null {
  const lower = text.toLowerCase()
  return AFFILIATE_LINKS.find(link =>
    link.matcher.some(m => lower.includes(m))
  ) ?? null
}

// Replaces resource names in a block of text with linked versions
// Returns an array of React-renderable segments: { text, href? }
export function parseAffiliateSegments(
  text: string
): { text: string; href?: string; displayName?: string }[] {
  const segments: { text: string; href?: string; displayName?: string }[] = []
  let remaining = text

  while (remaining.length > 0) {
    let earliestMatch: { index: number; link: AffiliateLink; matcher: string } | null = null

    for (const link of AFFILIATE_LINKS) {
      for (const matcher of link.matcher) {
        const idx = remaining.toLowerCase().indexOf(matcher)
        if (idx !== -1) {
          if (!earliestMatch || idx < earliestMatch.index) {
            earliestMatch = { index: idx, link, matcher }
          }
        }
      }
    }

    if (!earliestMatch) {
      segments.push({ text: remaining })
      break
    }

    if (earliestMatch.index > 0) {
      segments.push({ text: remaining.slice(0, earliestMatch.index) })
    }

    segments.push({
      text: remaining.slice(earliestMatch.index, earliestMatch.index + earliestMatch.matcher.length),
      href: earliestMatch.link.url,
      displayName: earliestMatch.link.displayName,
    })

    remaining = remaining.slice(earliestMatch.index + earliestMatch.matcher.length)
  }

  return segments
}

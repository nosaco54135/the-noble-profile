export interface AffiliateEntry {
  slug: string            // internal identifier used in /go/[slug]
  displayName: string     // how it renders in the Codex
  matcher: string[]       // lowercase strings matched against generated text
  affiliateUrl: string | null  // real affiliate URL — null until program approved
  fallbackUrl: string     // where to send users if affiliateUrl is null
}

export const AFFILIATE_CONFIG: AffiliateEntry[] = [
  // ── Books (Amazon Associates) ──
  {
    slug: 'spin-selling',
    displayName: 'SPIN Selling',
    matcher: ['spin selling', 'rackham'],
    affiliateUrl: null,
    fallbackUrl: 'https://www.amazon.com/dp/0070522359',
  },
  {
    slug: 'challenger-sale',
    displayName: 'The Challenger Sale',
    matcher: ['the challenger sale', 'challenger sale', 'dixon', 'adamson'],
    affiliateUrl: null,
    fallbackUrl: 'https://www.amazon.com/dp/1591844355',
  },
  {
    slug: 'never-split-the-difference',
    displayName: 'Never Split the Difference',
    matcher: ['never split the difference', 'chris voss', 'voss'],
    affiliateUrl: null,
    fallbackUrl: 'https://www.amazon.com/dp/0062407805',
  },
  {
    slug: 'sales-development-playbook',
    displayName: 'The Sales Development Playbook',
    matcher: ['sales development playbook', 'bertuzzi'],
    affiliateUrl: null,
    fallbackUrl: 'https://www.amazon.com/dp/0692622039',
  },
  {
    slug: 'fanatical-prospecting',
    displayName: 'Fanatical Prospecting',
    matcher: ['fanatical prospecting', 'jeb blount', 'blount'],
    affiliateUrl: null,
    fallbackUrl: 'https://www.amazon.com/dp/1119144752',
  },
  {
    slug: 'gap-selling',
    displayName: 'Gap Selling',
    matcher: ['gap selling', 'keenan'],
    affiliateUrl: null,
    fallbackUrl: 'https://www.amazon.com/dp/1732891001',
  },
  {
    slug: 'to-sell-is-human',
    displayName: 'To Sell Is Human',
    matcher: ['to sell is human', 'daniel pink'],
    affiliateUrl: null,
    fallbackUrl: 'https://www.amazon.com/dp/1594631905',
  },
  {
    slug: 'predictable-revenue',
    displayName: 'Predictable Revenue',
    matcher: ['predictable revenue', 'aaron ross'],
    affiliateUrl: null,
    fallbackUrl: 'https://www.amazon.com/dp/0984380213',
  },
  {
    slug: 'thinking-fast-and-slow',
    displayName: 'Thinking Fast and Slow',
    matcher: ['thinking fast and slow', 'kahneman'],
    affiliateUrl: null,
    fallbackUrl: 'https://www.amazon.com/dp/0374533555',
  },
  {
    slug: 'meddicc',
    displayName: 'Meddicc',
    matcher: ['meddicc', 'meddic'],
    affiliateUrl: null,
    fallbackUrl: 'https://www.amazon.com/dp/1838281118',
  },
  {
    slug: 'atomic-habits',
    displayName: 'Atomic Habits',
    matcher: ['atomic habits', 'james clear'],
    affiliateUrl: null,
    fallbackUrl: 'https://www.amazon.com/dp/0735211299',
  },
  {
    slug: 'inner-game-of-tennis',
    displayName: 'The Inner Game of Tennis',
    matcher: ['inner game of tennis', 'gallwey'],
    affiliateUrl: null,
    fallbackUrl: 'https://www.amazon.com/dp/0679778314',
  },
  {
    slug: 'extreme-ownership',
    displayName: 'Extreme Ownership',
    matcher: ['extreme ownership', 'willink', 'babin'],
    affiliateUrl: null,
    fallbackUrl: 'https://www.amazon.com/dp/1250067057',
  },
  {
    slug: 'psychology-of-selling',
    displayName: 'The Psychology of Selling',
    matcher: ['psychology of selling', 'brian tracy'],
    affiliateUrl: null,
    fallbackUrl: 'https://www.amazon.com/dp/0785288066',
  },
  {
    slug: 'trusted-advisor',
    displayName: 'The Trusted Advisor',
    matcher: ['the trusted advisor', 'trusted advisor', 'maister'],
    affiliateUrl: null,
    fallbackUrl: 'https://www.amazon.com/dp/0743212347',
  },
  // ── Tools ──
  {
    slug: 'apollo',
    displayName: 'Apollo.io',
    matcher: ['apollo.io', 'apollo'],
    affiliateUrl: null,
    fallbackUrl: 'https://www.apollo.io',
  },
  {
    slug: 'hubspot',
    displayName: 'HubSpot Sales Hub',
    matcher: ['hubspot sales hub', 'hubspot', 'sales hub'],
    affiliateUrl: null,
    fallbackUrl: 'https://www.hubspot.com/products/sales',
  },
  {
    slug: 'lavender',
    displayName: 'Lavender',
    matcher: ['lavender'],
    affiliateUrl: null,
    fallbackUrl: 'https://www.lavender.ai',
  },
  {
    slug: 'lemlist',
    displayName: 'Lemlist',
    matcher: ['lemlist'],
    affiliateUrl: null,
    fallbackUrl: 'https://www.lemlist.com',
  },
  {
    slug: 'instantly',
    displayName: 'Instantly.ai',
    matcher: ['instantly.ai', 'instantly'],
    affiliateUrl: null,
    fallbackUrl: 'https://instantly.ai',
  },
  {
    slug: 'clay',
    displayName: 'Clay',
    matcher: ['clay'],
    affiliateUrl: null,
    fallbackUrl: 'https://clay.com',
  },
  {
    slug: 'fathom',
    displayName: 'Fathom',
    matcher: ['fathom'],
    affiliateUrl: null,
    fallbackUrl: 'https://fathom.video',
  },
  {
    slug: 'loom',
    displayName: 'Loom',
    matcher: ['loom'],
    affiliateUrl: null,
    fallbackUrl: 'https://www.loom.com',
  },
  {
    slug: 'linkedin-sales-navigator',
    displayName: 'LinkedIn Sales Navigator',
    matcher: ['sales navigator', 'linkedin sales navigator'],
    affiliateUrl: null,
    fallbackUrl: 'https://business.linkedin.com/sales-solutions',
  },
]

// Resolve the destination for a slug — affiliate URL if set, otherwise fallback
export function resolveAffiliateUrl(slug: string): string | null {
  const entry = AFFILIATE_CONFIG.find(e => e.slug === slug)
  if (!entry) return null
  return entry.affiliateUrl ?? entry.fallbackUrl
}

// Parse text into segments, linking matched resources to /go/[slug]
export function parseAffiliateSegments(
  text: string
): { text: string; slug?: string; displayName?: string }[] {
  const segments: { text: string; slug?: string; displayName?: string }[] = []
  let remaining = text

  while (remaining.length > 0) {
    let earliest: { index: number; entry: AffiliateEntry; matcher: string } | null = null

    for (const entry of AFFILIATE_CONFIG) {
      for (const matcher of entry.matcher) {
        const idx = remaining.toLowerCase().indexOf(matcher)
        if (idx !== -1 && (!earliest || idx < earliest.index)) {
          earliest = { index: idx, entry, matcher }
        }
      }
    }

    if (!earliest) {
      segments.push({ text: remaining })
      break
    }

    if (earliest.index > 0) {
      segments.push({ text: remaining.slice(0, earliest.index) })
    }

    segments.push({
      text: remaining.slice(earliest.index, earliest.index + earliest.matcher.length),
      slug: earliest.entry.slug,
      displayName: earliest.entry.displayName,
    })

    remaining = remaining.slice(earliest.index + earliest.matcher.length)
  }

  return segments
}

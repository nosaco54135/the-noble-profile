import type { MetadataRoute } from 'next'
import { getAllArchetypeSlugs } from '@/lib/archetypes'
import { getAllGuideSlugs } from '@/lib/guides'

const BASE = 'https://thenobleseller.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE}/`,            lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE}/quotient`,    lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE}/archetypes`,  lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/methodology`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/about`,       lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE}/contact`,     lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE}/privacy`,     lastModified: now, changeFrequency: 'yearly',  priority: 0.5 },
  ]

  const archetypeRoutes: MetadataRoute.Sitemap = getAllArchetypeSlugs().map(({ slug }) => ({
    url: `${BASE}/archetypes/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  const guideRoutes: MetadataRoute.Sitemap = getAllGuideSlugs().map(({ slug }) => ({
    url: `${BASE}/guides/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  return [...staticRoutes, ...archetypeRoutes, ...guideRoutes]
}

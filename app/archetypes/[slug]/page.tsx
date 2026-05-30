import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { LinkButton } from '@/components/ui/Button'
import { getArchetype, getAllArchetypeSlugs } from '@/lib/archetypes'

export function generateStaticParams() {
  return getAllArchetypeSlugs()
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const archetype = getArchetype(slug)
  if (!archetype) return {}
  return {
    title: `${archetype.name} — The Noble Seller`,
    description: archetype.metaDescription,
  }
}

export default async function ArchetypePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const archetype = getArchetype(slug)
  if (!archetype) notFound()

  const resolvedAdjacents = archetype.adjacent
    .map((s) => getArchetype(s))
    .filter((a): a is NonNullable<typeof a> => a !== undefined)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    name: archetype.name,
    description: archetype.metaDescription,
    url: `https://thenobleseller.com/archetypes/${archetype.slug}`,
  }

  return (
    <main className="bg-[#FAFAF7] min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="pt-tns-3xl pb-tns-lg">
        <Container maxWidth="prose">
          <p className="font-sans text-[10px] uppercase tracking-[0.12em] text-[#722F37] font-semibold mb-4">
            Sales Archetype
          </p>
          <h1 className="font-display font-semibold text-4xl md:text-5xl text-[#0F0F0F] tracking-tight leading-[1.05] mb-4">
            {archetype.name}
          </h1>
          <p className="font-display italic text-xl md:text-2xl text-[#6B6B6B] leading-snug">
            {archetype.tagline}
          </p>
        </Container>
        <div className="border-b border-[#E8E6DF] mt-tns-2xl" />
      </section>

      {/* Intro */}
      <Section size="lg">
        <Container maxWidth="prose">
          <div className="space-y-5">
            {archetype.intro.map((paragraph, i) => (
              <p key={i} className="font-sans text-base md:text-lg text-[#0F0F0F] leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </Container>
      </Section>

      <div className="border-t border-[#E8E6DF]" />

      {/* Strengths */}
      <Section size="lg">
        <Container maxWidth="prose">
          <h2 className="font-display font-semibold text-2xl md:text-3xl text-[#0F0F0F] tracking-tight leading-[1.1] mb-6">
            Strengths
          </h2>
          <ul className="space-y-3">
            {archetype.strengths.map((item, i) => (
              <li key={i} className="flex gap-3">
                <span className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#722F37]" />
                <p className="font-sans text-base text-[#0F0F0F] leading-relaxed">{item}</p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <div className="border-t border-[#E8E6DF]" />

      {/* Blind Spots */}
      <Section size="lg">
        <Container maxWidth="prose">
          <h2 className="font-display font-semibold text-2xl md:text-3xl text-[#0F0F0F] tracking-tight leading-[1.1] mb-6">
            Blind Spots
          </h2>
          <ul className="space-y-3">
            {archetype.blindSpots.map((item, i) => (
              <li key={i} className="flex gap-3">
                <span className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#6B6B6B]" />
                <p className="font-sans text-base text-[#0F0F0F] leading-relaxed">{item}</p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <div className="border-t border-[#E8E6DF]" />

      {/* In the Deal */}
      <Section size="lg">
        <Container maxWidth="prose">
          <h2 className="font-display font-semibold text-2xl md:text-3xl text-[#0F0F0F] tracking-tight leading-[1.1] mb-4">
            In the Deal
          </h2>
          <p className="font-sans text-base text-[#0F0F0F] leading-relaxed">{archetype.inTheDeal}</p>
        </Container>
      </Section>

      <div className="border-t border-[#E8E6DF]" />

      {/* Who You Sell Best To */}
      <Section size="lg">
        <Container maxWidth="prose">
          <h2 className="font-display font-semibold text-2xl md:text-3xl text-[#0F0F0F] tracking-tight leading-[1.1] mb-4">
            Who You Sell Best To
          </h2>
          <p className="font-sans text-base text-[#0F0F0F] leading-relaxed">{archetype.sellsBestTo}</p>
        </Container>
      </Section>

      <div className="border-t border-[#E8E6DF]" />

      {/* Growth Edge */}
      <Section size="lg">
        <Container maxWidth="prose">
          <h2 className="font-display font-semibold text-2xl md:text-3xl text-[#0F0F0F] tracking-tight leading-[1.1] mb-4">
            Your Growth Edge
          </h2>
          <p className="font-sans text-base text-[#0F0F0F] leading-relaxed">{archetype.growthEdge}</p>
        </Container>
      </Section>

      <div className="border-t border-[#E8E6DF]" />

      {/* Adjacent Archetypes — only rendered when at least one slug resolves to a built archetype */}
      {resolvedAdjacents.length > 0 && (
        <>
          <Section size="lg">
            <Container maxWidth="prose">
              <h2 className="font-display font-semibold text-2xl md:text-3xl text-[#0F0F0F] tracking-tight leading-[1.1] mb-6">
                Adjacent Archetypes
              </h2>
              <div className="flex flex-wrap gap-3">
                {resolvedAdjacents.map((adjacent) => (
                  <Link
                    key={adjacent.slug}
                    href={`/archetypes/${adjacent.slug}`}
                    className="font-sans text-sm text-[#722F37] border border-[#722F37]/30 bg-[#722F37]/5 px-4 py-2 rounded-full hover:bg-[#722F37]/10 transition-colors"
                  >
                    {adjacent.name}
                  </Link>
                ))}
              </div>
            </Container>
          </Section>

          <div className="border-t border-[#E8E6DF]" />
        </>
      )}

      {/* CTA */}
      <Section size="xl">
        <Container maxWidth="prose">
          <div className="text-center">
            <h2 className="font-display font-semibold text-3xl md:text-4xl text-[#0F0F0F] tracking-tight leading-[1.1] mb-4">
              Not sure this is you?
            </h2>
            <p className="font-sans text-base text-[#6B6B6B] leading-relaxed mb-6">
              Take the free 25-question Noble Quotient assessment and find your archetype in minutes.
            </p>
            <LinkButton href="/quotient" variant="primary">
              Take the Free Assessment →
            </LinkButton>
          </div>
        </Container>
      </Section>
    </main>
  )
}

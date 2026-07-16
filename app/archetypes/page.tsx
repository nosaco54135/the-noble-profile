import type { Metadata } from 'next'
import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { LinkButton } from '@/components/ui/Button'
import { archetypes } from '@/lib/archetypes'

const STYLE_ORDER = ['Closer', 'Hunter', 'Challenger', 'Advisor', 'Connector', 'Architect', 'Cultivator', 'Student']

export const metadata: Metadata = {
  title: 'Sales Personality Types: What Kind of Salesperson Are You? — The Noble Seller',
  description: 'The 64 sales personality types, built from 8 traits and 8 selling styles. Take the free Noble Quotient assessment and find which kind of salesperson you are.',
  openGraph: {
    title: 'Sales Personality Types: What Kind of Salesperson Are You? — The Noble Seller',
    description: 'The 64 sales personality types, built from 8 traits and 8 selling styles. Take the free Noble Quotient assessment and find which kind of salesperson you are.',
    url: 'https://thenobleseller.com/archetypes',
    type: 'website',
  },
}

export default function ArchetypesPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Sales Personality Types',
    url: 'https://thenobleseller.com/archetypes',
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: archetypes.map((a, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: a.name,
        url: `https://thenobleseller.com/archetypes/${a.slug}`,
      })),
    },
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
            Sales Personality Types
          </p>
          <h1 className="font-display font-semibold text-4xl md:text-5xl text-[#0F0F0F] tracking-tight leading-[1.05] mb-4">
            What Kind of Salesperson Are You?
          </h1>
          <p className="font-display italic text-xl md:text-2xl text-[#6B6B6B] leading-snug">
            Two things decide how you sell: what you&apos;re wired for, and the move you make when the deal is live.
          </p>
        </Container>
        <div className="border-b border-[#E8E6DF] mt-tns-2xl" />
      </section>

      {/* Above-the-fold CTA */}
      <Section size="md">
        <Container maxWidth="prose">
          <div className="text-center">
            <p className="font-sans text-base text-[#6B6B6B] leading-relaxed mb-5">
              Find your archetype. It&apos;s free.
            </p>
            <LinkButton href="/quotient" variant="primary">
              Take the Free Assessment →
            </LinkButton>
          </div>
        </Container>
      </Section>

      <div className="border-t border-[#E8E6DF]" />

      {/* Explainer */}
      <Section size="lg">
        <Container maxWidth="prose">
          <div className="space-y-5">
            <p className="font-sans text-base md:text-lg text-[#0F0F0F] leading-relaxed">
              Every seller runs on two layers. Underneath the tactics is your trait, the way you&apos;re wired before you say a word. On top of it is your style, the move you actually make when a deal is live. Some sellers hunt for new logos. Some advise until the buyer stops shopping. Some challenge how a prospect sees their own problem, and a few just quietly build the thing that closes. Your trait and your style together are your archetype.
            </p>
            <p className="font-sans text-base md:text-lg text-[#0F0F0F] leading-relaxed">
              The Noble Quotient measures both. Eight traits and eight styles, scored from how you answer 30 questions about the way you actually sell. Cross the eight traits with the eight styles and you land on one of 64 archetypes.
            </p>
            <p className="font-sans text-base md:text-lg text-[#0F0F0F] leading-relaxed">
              Read through them below, or skip ahead and find yours.
            </p>
          </div>
        </Container>
      </Section>

      <div className="border-t border-[#E8E6DF]" />

      {/* Framework Lists */}
      <Section size="md">
        <Container maxWidth="prose">
          <div className="space-y-2">
            <p className="font-sans text-sm text-[#0F0F0F] leading-relaxed">
              <span className="font-medium">The eight traits:</span> Empathic, Curious, Methodical, Resilient, Devoted, Strategic, Authentic, Adaptive.
            </p>
            <p className="font-sans text-sm text-[#0F0F0F] leading-relaxed">
              <span className="font-medium">The eight styles:</span> Closer, Hunter, Challenger, Advisor, Connector, Architect, Cultivator, Student.
            </p>
          </div>
        </Container>
      </Section>

      <div className="border-t border-[#E8E6DF]" />

      {/* Browse */}
      <Section size="lg" id="browse">
        <Container maxWidth="prose">
          <h2 className="font-display font-semibold text-2xl md:text-3xl text-[#0F0F0F] tracking-tight leading-[1.1] mb-8">
            Browse the Archetypes
          </h2>
          <div className="space-y-10">
            {STYLE_ORDER.map((style) => {
              const group = archetypes.filter((a) => a.style === style)
              if (group.length === 0) return null
              return (
                <div key={style}>
                  <p className="font-sans text-[11px] uppercase tracking-[0.12em] text-[#6B6B6B] font-semibold mb-3">
                    {style}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {group.map((a) => (
                      <Link
                        key={a.slug}
                        href={`/archetypes/${a.slug}`}
                        className="font-sans text-sm text-[#722F37] border border-[#722F37]/30 bg-[#722F37]/5 px-4 py-2 rounded-full hover:bg-[#722F37]/10 transition-colors"
                      >
                        {a.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </Container>
      </Section>

      <div className="border-t border-[#E8E6DF]" />

      {/* Final CTA */}
      <Section size="xl">
        <Container maxWidth="prose">
          <div className="text-center">
            <h2 className="font-display font-semibold text-3xl md:text-4xl text-[#0F0F0F] tracking-tight leading-[1.1] mb-4">
              Not sure where you land?
            </h2>
            <p className="font-sans text-base text-[#6B6B6B] leading-relaxed mb-6">
              Take the free 30-question Noble Quotient assessment and find your archetype.
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

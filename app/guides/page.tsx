import type { Metadata } from 'next'
import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { LinkButton } from '@/components/ui/Button'
import { guides } from '@/lib/guides'

export const metadata: Metadata = {
  title: 'Sales Guides: Selling Concepts, Explained as Behavior — The Noble Seller',
  description:
    'Guides to the ideas every seller inherits: hunter vs farmer, consultative selling, the trusted advisor, what makes a great salesperson. Explained as behavior, not technique.',
  openGraph: {
    title: 'Sales Guides: Selling Concepts, Explained as Behavior — The Noble Seller',
    description:
      'Guides to the ideas every seller inherits: hunter vs farmer, consultative selling, the trusted advisor, what makes a great salesperson. Explained as behavior, not technique.',
    url: 'https://thenobleseller.com/guides',
    type: 'website',
  },
}

export default function GuidesPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Sales Guides',
    url: 'https://thenobleseller.com/guides',
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: guides.map((g, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: g.title,
        url: `https://thenobleseller.com/guides/${g.slug}`,
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
            Sales Guides
          </p>
          <h1 className="font-display font-semibold text-4xl md:text-5xl text-[#0F0F0F] tracking-tight leading-[1.05] mb-4">
            Selling Concepts, Explained as Behavior
          </h1>
          <p className="font-display italic text-xl md:text-2xl text-[#6B6B6B] leading-snug">
            The labels every seller inherits, taken apart so you can see the wiring underneath.
          </p>
        </Container>
        <div className="border-b border-[#E8E6DF] mt-tns-2xl" />
      </section>

      {/* Intro */}
      <Section size="lg">
        <Container maxWidth="prose">
          <p className="font-sans text-base md:text-lg text-[#0F0F0F] leading-relaxed">
            Sales runs on borrowed vocabulary. Hunter, farmer, trusted advisor, consultative seller.
            The words get used in job posts and reviews as if everyone agrees on what they mean, and
            almost nobody does. Each guide here takes one of those ideas apart, shows the behavior
            underneath it, and ends at the same place: how the idea shows up in your own selling.
          </p>
        </Container>
      </Section>

      <div className="border-t border-[#E8E6DF]" />

      {/* Guide List */}
      <Section size="lg">
        <Container maxWidth="prose">
          <h2 className="font-display font-semibold text-2xl md:text-3xl text-[#0F0F0F] tracking-tight leading-[1.1] mb-8">
            The Guides
          </h2>
          <div className="space-y-0">
            {guides.map((guide) => (
              <div key={guide.slug} className="border-b border-[#E8E6DF] py-6 first:border-t">
                <Link
                  href={`/guides/${guide.slug}`}
                  className="font-display font-semibold text-xl md:text-2xl text-[#0F0F0F] tracking-tight leading-snug hover:text-[#722F37] transition-colors block mb-2"
                >
                  {guide.title}
                </Link>
                <p className="font-sans text-sm text-[#6B6B6B] leading-relaxed">
                  {guide.metaDescription}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <div className="border-t border-[#E8E6DF]" />

      {/* Final CTA */}
      <Section size="xl">
        <Container maxWidth="prose">
          <div className="text-center">
            <h2 className="font-display font-semibold text-3xl md:text-4xl text-[#0F0F0F] tracking-tight leading-[1.1] mb-4">
              Or skip the reading
            </h2>
            <p className="font-sans text-base text-[#6B6B6B] leading-relaxed mb-6">
              Take the free 30-question Noble Quotient assessment and see how you actually sell.
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

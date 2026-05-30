import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { LinkButton } from '@/components/ui/Button'
import { getGuide, getAllGuideSlugs } from '@/lib/guides'

export function generateStaticParams() {
  return getAllGuideSlugs()
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const guide = getGuide(slug)
  if (!guide) return {}
  return {
    title: `${guide.title} — The Noble Seller`,
    description: guide.metaDescription,
  }
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const guide = getGuide(slug)
  if (!guide) notFound()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: guide.title,
    description: guide.metaDescription,
    url: `https://thenobleseller.com/guides/${guide.slug}`,
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
            Sales Guide
          </p>
          <h1 className="font-display font-semibold text-4xl md:text-5xl text-[#0F0F0F] tracking-tight leading-[1.05]">
            {guide.title}
          </h1>
        </Container>
        <div className="border-b border-[#E8E6DF] mt-tns-2xl" />
      </section>

      {/* Intro */}
      <Section size="lg">
        <Container maxWidth="prose">
          <div className="space-y-5">
            {guide.intro.map((paragraph, i) => (
              <p key={i} className="font-sans text-base md:text-lg text-[#0F0F0F] leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </Container>
      </Section>

      {/* Sections */}
      {guide.sections.map((section, i) => (
        <div key={i}>
          <div className="border-t border-[#E8E6DF]" />
          <Section size="lg">
            <Container maxWidth="prose">
              <h2 className="font-display font-semibold text-2xl md:text-3xl text-[#0F0F0F] tracking-tight leading-[1.1] mb-6">
                {section.heading}
              </h2>
              <div className="space-y-5">
                {section.paragraphs.map((paragraph, j) => (
                  <p key={j} className="font-sans text-base text-[#0F0F0F] leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </Container>
          </Section>
        </div>
      ))}

      <div className="border-t border-[#E8E6DF]" />

      {/* Bridge */}
      <Section size="lg">
        <Container maxWidth="prose">
          <h2 className="font-display font-semibold text-2xl md:text-3xl text-[#0F0F0F] tracking-tight leading-[1.1] mb-6">
            {guide.bridgeHeading}
          </h2>
          <div className="space-y-5 mb-6">
            {guide.bridgeParagraphs.map((paragraph, i) => (
              <p key={i} className="font-sans text-base text-[#0F0F0F] leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
          <div className="space-y-3">
            <p className="font-sans text-sm text-[#6B6B6B]">
              Related archetype:{' '}
              <Link
                href={`/archetypes/${guide.relatedArchetypeSlug}`}
                className="text-[#722F37] underline underline-offset-4 decoration-[#722F37]/40 hover:decoration-[#722F37] transition-colors"
              >
                {guide.relatedArchetypeName} →
              </Link>
            </p>
            <p className="font-sans text-sm text-[#6B6B6B]">
              <Link
                href="/methodology"
                className="text-[#722F37] underline underline-offset-4 decoration-[#722F37]/40 hover:decoration-[#722F37] transition-colors"
              >
                See the methodology
              </Link>{' '}
              to learn how we measure all 12 behavioral dimensions.
            </p>
          </div>
        </Container>
      </Section>

      <div className="border-t border-[#E8E6DF]" />

      {/* CTA */}
      <Section size="xl">
        <Container maxWidth="prose">
          <div className="text-center">
            <h2 className="font-display font-semibold text-3xl md:text-4xl text-[#0F0F0F] tracking-tight leading-[1.1] mb-4">
              {guide.ctaHeadline}
            </h2>
            <p className="font-sans text-base text-[#6B6B6B] leading-relaxed mb-6">
              {guide.ctaBody}
            </p>
            <LinkButton href="/quotient" variant="primary">
              {guide.ctaButton} →
            </LinkButton>
          </div>
        </Container>
      </Section>
    </main>
  )
}

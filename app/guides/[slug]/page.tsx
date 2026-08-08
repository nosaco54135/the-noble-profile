import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { LinkButton } from '@/components/ui/Button'
import { getGuide, getAllGuideSlugs } from '@/lib/guides'

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
}

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

      {/* Download */}
      {guide.downloadUrl && (
        <Section size="md">
          <Container maxWidth="prose">
            <LinkButton href={guide.downloadUrl} variant="primary">
              {guide.downloadLabel || 'Download the PDF'}
            </LinkButton>
          </Container>
        </Section>
      )}

      {/* Table of contents */}
      {guide.showToc && (
        <Section size="md">
          <Container maxWidth="prose">
            <p className="font-sans text-[11px] uppercase tracking-[0.12em] text-[#6B6B6B] mb-4">In this guide</p>
            <ul className="space-y-2">
              {guide.sections.map((section, i) => (
                <li key={i}>
                  <a
                    href={`#${slugify(section.heading)}`}
                    className="font-sans text-sm text-[#722F37] underline underline-offset-4 decoration-[#722F37]/40 hover:decoration-[#722F37] transition-colors"
                  >
                    {section.heading}
                  </a>
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      )}

      {/* Sections */}
      {guide.sections.map((section, i) => (
        <div key={i}>
          <div className="border-t border-[#E8E6DF]" />
          <Section size="lg">
            <Container maxWidth="prose">
              <h2
                id={slugify(section.heading)}
                className="font-display font-semibold text-2xl md:text-3xl text-[#0F0F0F] tracking-tight leading-[1.1] mb-6 scroll-mt-24"
              >
                {section.heading}
              </h2>
              {section.paragraphs && section.paragraphs.length > 0 && (
                <div className="space-y-5">
                  {section.paragraphs.map((paragraph, j) => (
                    <p key={j} className="font-sans text-base text-[#0F0F0F] leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              )}
              {section.bullets && section.bullets.length > 0 && (
                <ul className="mt-5 space-y-2 list-disc pl-5">
                  {section.bullets.map((bullet, j) => (
                    <li key={j} className="font-sans text-base text-[#0F0F0F] leading-relaxed">
                      {bullet}
                    </li>
                  ))}
                </ul>
              )}
              {section.subsections && section.subsections.length > 0 && (
                <div className="mt-8 space-y-8">
                  {section.subsections.map((subsection, si) => (
                    <div key={si}>
                      <h3 className="font-display font-semibold text-xl md:text-2xl text-[#0F0F0F] tracking-tight leading-[1.15] mb-4">
                        {subsection.heading}
                      </h3>
                      <div className="space-y-5">
                        {subsection.blocks.map((block, bi) => (
                          <div key={bi}>
                            {block.label && (
                              <h4 className="font-display font-semibold text-base md:text-lg text-[#0F0F0F] tracking-tight mb-2">
                                {block.label}
                              </h4>
                            )}
                            {block.paragraphs && block.paragraphs.length > 0 && (
                              <div className="space-y-5">
                                {block.paragraphs.map((paragraph, pi) => (
                                  <p key={pi} className="font-sans text-base text-[#0F0F0F] leading-relaxed">
                                    {paragraph}
                                  </p>
                                ))}
                              </div>
                            )}
                            {block.bullets && block.bullets.length > 0 && (
                              <ul className="mt-5 space-y-2 list-disc pl-5">
                                {block.bullets.map((bullet, li) => (
                                  <li key={li} className="font-sans text-base text-[#0F0F0F] leading-relaxed">
                                    {bullet}
                                  </li>
                                ))}
                              </ul>
                            )}
                            {block.quote && (
                              <blockquote className="mt-5 pl-5 border-l-2 border-[#722F37]/30 font-sans text-base text-[#0F0F0F] leading-relaxed">
                                {block.quote}
                              </blockquote>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
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
          {guide.bridgeCta && (
            <div className="mb-6">
              <LinkButton href={guide.bridgeCta.href} variant="primary">
                {guide.bridgeCta.label}
              </LinkButton>
            </div>
          )}
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
              {guide.relatedGuides && guide.relatedGuides.length > 0 && (
                <p className="font-sans text-sm text-[#6B6B6B]">
                  Related guide:{' '}
                  {guide.relatedGuides.map((g, i) => (
                    <span key={g.slug}>
                      {i > 0 && ', '}
                      <Link
                        href={`/guides/${g.slug}`}
                        className="text-[#722F37] underline underline-offset-4 decoration-[#722F37]/40 hover:decoration-[#722F37] transition-colors"
                      >
                        {g.name} →
                      </Link>
                    </span>
                  ))}
                </p>
              )}
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
            <LinkButton href={guide.ctaHref || '/quotient'} variant="primary">
              {guide.ctaButton} →
            </LinkButton>
          </div>
        </Container>
      </Section>
    </main>
  )
}

'use client'

import { useRouter } from 'next/navigation'
import { track } from "@vercel/analytics"
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Button } from '@/components/ui/Button'

export default function LandingPage() {
  const router = useRouter()

  function handleStart() {
    track('nq_started')
    router.push('/quotient/assessment')
  }

  return (
    <div className="min-h-screen bg-tns-bg text-tns-fg">
      {/* Hero */}
      <Section size="lg" className="pt-8 md:pt-12">
        <Container maxWidth="prose">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-tns-fg mb-tns-md">
              The Noble Quotient
            </p>
            <h1 className="font-display font-medium text-tns-fg text-[clamp(40px,5vw,46px)] tracking-tight leading-[1.02] mb-tns-md">
              Discover your natural selling style. And what&apos;s holding you back.
            </h1>
            <p className="font-sans text-tns-muted text-[18px] leading-relaxed mb-tns-lg max-w-[560px] mx-auto">
              The Noble Quotient is a 30-question assessment built for sales professionals. Find out how you sell, how you learn, and exactly where to focus to hit your next level.
            </p>

            {/* CTA card */}
            <div className="max-w-[480px] mx-auto bg-tns-bgAlt border border-tns-border p-tns-xl text-left">
              <p className="font-sans text-[10px] uppercase tracking-[0.12em] text-[#722F37] font-semibold text-center mb-tns-lg">Free Assessment · Instant Results</p>
              <Button
                onClick={handleStart}
                variant="primary"
                className="w-full md:w-auto md:px-8 md:mx-auto md:flex"
              >
                Take the Free Assessment →
              </Button>
              <p className="mt-tns-md font-sans text-xs text-center text-tns-muted leading-relaxed">
                The Noble Quotient is 100% free. 30 questions, full results shown immediately. The Noble Compass is an optional paid coaching guide based on your results.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* What's inside */}
      <Section size="lg">
        <Container maxWidth="prose">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-tns-fg mb-tns-md">
              What&apos;s inside
            </p>
            <h2 className="font-display font-medium text-tns-fg text-2xl md:text-3xl tracking-tight leading-[1.1] mb-tns-2xl">
              Three things you walk away with.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-tns-lg items-start text-left md:text-center">
              <div>
                <h3 className="font-display text-[20px] text-tns-fg mb-tns-sm leading-snug">
                  Your sales archetype
                </h3>
                <p className="font-sans text-[15px] text-tns-muted leading-relaxed">
                  A dynamic archetype built from two axes: your natural traits and your selling style. Plus secondary and tertiary influences.
                </p>
              </div>
              <div>
                <h3 className="font-display text-[20px] text-tns-fg mb-tns-sm leading-snug">
                  12-dimension breakdown
                </h3>
                <p className="font-sans text-[15px] text-tns-muted leading-relaxed">
                  Scores across EQ, curiosity, closing confidence, data-driven thinking, authenticity, resilience, and more. Visualized clearly.
                </p>
              </div>
              <div>
                <h3 className="font-display text-[20px] text-tns-fg mb-tns-sm leading-snug">
                  The Noble Compass
                </h3>
                <p className="font-sans text-[15px] text-tns-muted leading-relaxed">
                  Powered by AI and built from your scores. Six sections covering prospecting tactics, closing strategies, blind spots, and a 30/60/90 day plan specific to how you sell.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Trust */}
      <Section size="lg">
        <Container maxWidth="prose">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-tns-fg mb-tns-md">
              Built by The Noble Seller
            </p>
            <p className="font-sans text-[17px] text-tns-fg leading-relaxed max-w-[560px] mx-auto">
              The Noble Quotient was designed to go beyond generic personality tests. Every score is mapped to real selling behaviors. Every Noble Compass is written specifically for your profile, not a category.
            </p>
          </div>
        </Container>
      </Section>

      {/* Footer */}
      <Section size="md" as="footer" className="border-t border-tns-border">
        <Container maxWidth="prose">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-tns-sm">
            <p className="font-sans text-[14px] text-tns-muted italic">
              Authentic influence. Engineered results.
            </p>
            <p className="font-sans text-[12px] text-tns-muted">
              © {new Date().getFullYear()} The Noble Seller
            </p>
          </div>
        </Container>
      </Section>
    </div>
  )
}

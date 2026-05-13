import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { LinkButton } from '@/components/ui/Button'
import { EmailInput } from '@/components/ui/EmailInput'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-tns-bg text-tns-fg">
      {/* Hero */}
      <Section size="xl" id="top" className="pt-16 md:pt-24">
        <Container maxWidth="prose">
          <div className="text-center">
            <h1 className="font-display font-medium text-tns-fg text-[clamp(48px,6vw,72px)] tracking-tight leading-[0.98] mb-tns-2xl">
              Sell more.<br />Without selling out.
            </h1>
            <p className="text-tns-muted text-[18px] leading-relaxed mb-tns-2xl max-w-[520px] mx-auto">
              A weekly newsletter for sellers who are tired of watered-down advice. Frameworks, tactics, and what actually works.
            </p>
            <div id="subscribe" className="mb-tns-md scroll-mt-24 max-w-[440px] mx-auto">
              <EmailInput buttonLabel="Subscribe" id="hero-email" />
            </div>
            <p className="text-[12px] text-tns-muted">
              Free. Unsubscribe anytime. No spam, ever.
            </p>
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
            <h2 className="font-display font-medium text-tns-fg text-2xl md:text-3xl tracking-tight leading-[1.1] mb-tns-2xl md:mb-tns-3xl">
              Three reasons sellers read it.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-tns-lg items-start">
              <div className="text-center">
                <div className="min-h-[3.5rem] md:min-h-[4rem]">
                  <h3 className="font-display text-[20px] text-tns-fg mb-tns-sm leading-snug">
                    One sharp idea per issue.
                  </h3>
                </div>
                <p className="text-[15px] text-tns-muted leading-relaxed">
                  Something you can use this week. Not someday. Not in theory.
                </p>
              </div>
              <div className="text-center">
                <div className="min-h-[3.5rem] md:min-h-[4rem]">
                  <h3 className="font-display text-[20px] text-tns-fg mb-tns-sm leading-snug">
                    Frameworks that actually work.
                  </h3>
                </div>
                <p className="text-[15px] text-tns-muted leading-relaxed">
                  The mental models behind real deals. Tested, not borrowed from a book.
                </p>
              </div>
              <div className="text-center">
                <div className="min-h-[3.5rem] md:min-h-[4rem]">
                  <h3 className="font-display text-[20px] text-tns-fg mb-tns-sm leading-snug">
                    A second opinion every Wednesday.
                  </h3>
                </div>
                <p className="text-[15px] text-tns-muted leading-relaxed">
                  The take you&apos;re not going to get from your manager.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Manifesto */}
      <div className="bg-tns-bgAlt">
        <Section size="xl" className="py-tns-5xl">
          <Container maxWidth="prose">
            <div className="text-center">
              <p className="text-sm font-semibold uppercase tracking-widest text-tns-fg mb-6">
                Who this is for
              </p>
              <h2 className="font-display font-medium text-tns-fg text-3xl md:text-4xl tracking-tight leading-[1.1] mb-8">
                For the operators, not the audience.
              </h2>
              <p className="text-lg md:text-xl leading-relaxed text-tns-fg mb-6 max-w-[560px] mx-auto">
                Most sales content is performance. Made to be seen, shared, and admired. Built for the audience watching the seller, not for the seller.
              </p>
              <p className="text-lg md:text-xl leading-relaxed text-tns-fg max-w-[560px] mx-auto">
                This is for the other side. The people closing the deals, not narrating them. Sellers who want frameworks they can use Tuesday morning, not a thought-leadership feed they have to perform back.
              </p>
            </div>
          </Container>
        </Section>
      </div>

      {/* Start here */}
      <Section size="xl" className="pb-tns-2xl">
        <Container maxWidth="prose">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-tns-fg mb-tns-lg">
              Start here
            </p>
            <h2 className="font-display font-medium text-tns-fg text-2xl md:text-3xl tracking-tight leading-[1.1] mb-tns-lg">
              Find out how you actually sell.
            </h2>
            <p className="text-[17px] text-tns-fg leading-relaxed mb-tns-md">
              The Noble Quotient is a 25-question assessment that maps how you sell across 12 dimensions. You&apos;ll see your natural style, your blind spots, and what to fix first.
            </p>
            <p className="text-[17px] text-tns-fg leading-relaxed mb-tns-2xl">
              Subscribers can unlock The Noble Codex, a custom playbook built from your exact scores. Prospecting tactics, closing strategies, and a 30/60/90 plan written for the way you sell.
            </p>
            <LinkButton href="/quotient" variant="primary">
              Take the assessment
            </LinkButton>
          </div>
        </Container>
      </Section>

      {/* Final CTA */}
      <Section size="xl" className="pb-tns-2xl">
        <Container maxWidth="prose">
          <div className="text-center">
            <h2 className="font-display font-medium text-tns-fg text-2xl md:text-3xl tracking-tight leading-[1.1] mb-tns-md">
              Get the newsletter.
            </h2>
            <p className="text-tns-muted text-[17px] leading-relaxed mb-tns-2xl">
              One issue a week. Sharp, useful, fast to read.
            </p>
            <div className="mb-tns-md max-w-[440px] mx-auto">
              <EmailInput buttonLabel="Subscribe" id="final-email" />
            </div>
            <p className="text-[12px] text-tns-muted">
              Free. Unsubscribe anytime. No spam, ever.
            </p>
          </div>
        </Container>
      </Section>

    </div>
  )
}

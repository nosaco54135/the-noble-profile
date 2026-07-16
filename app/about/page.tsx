import { Container } from '@/components/ui/Container'
import { LinkButton } from '@/components/ui/Button'

export const metadata = {
  title: 'About — The Noble Seller',
  description: 'The Noble Seller is built for sales professionals who take their craft seriously.',
}

export default function AboutPage() {
  return (
    <main className="bg-[#FAFAF7] min-h-screen">

      {/* SECTION 1 — Hero */}
      <section className="pt-tns-3xl">
        <Container maxWidth="prose">
          <p className="font-sans text-[11px] uppercase tracking-[0.12em] text-[#6B6B6B] mb-4">
            ABOUT THE NOBLE SELLER
          </p>
          <h1 className="font-display text-5xl md:text-6xl font-semibold text-[#0F0F0F] leading-[1.05] max-w-[640px]">
            Built for sellers who take their craft seriously.
          </h1>
          <div className="border-b border-[#E8E6DF] mt-12" />
        </Container>
      </section>

      {/* SECTION 2 — Body copy */}
      <section className="py-12">
        <Container maxWidth="prose">
          <div className="max-w-[640px] space-y-6 font-sans text-base md:text-lg text-[#0F0F0F] leading-relaxed">
            <p>
              Most sales training starts with tactics. Scripts, objection handlers, closing lines. The Noble Seller starts somewhere else.
            </p>
            <p>
              We believe how you sell is an expression of who you are. Your instincts, your blind spots, your natural strengths — these don&apos;t disappear when you pick up the phone or walk into a room. They show up in every conversation, whether you&apos;ve named them or not.
            </p>
            <p>
              The Noble Quotient is built on a simple premise: you can&apos;t fix what you can&apos;t see. The assessment gives you a precise behavioral profile across 12 dimensions — not a personality type, not a vague label, but a specific map of how you actually operate in a sales environment. Where you&apos;re strong. Where you&apos;re leaving deals on the table. What to do about it.
            </p>
            <p>
              The Noble Compass takes that map and turns it into a coaching guide. Six sections of personalized instruction built from your scores. Not generic advice dressed up with your name on it — actual coaching derived from your actual numbers.
            </p>
            <p>
              We built this because the best sellers we&apos;ve ever seen weren&apos;t the loudest or the most aggressive. They were the ones who understood themselves clearly enough to play to their strengths and work deliberately on their gaps. That&apos;s what The Noble Seller exists to develop.
            </p>
          </div>
        </Container>
      </section>

      {/* SECTION 3 — What we believe */}
      <section className="py-12">
        <Container maxWidth="prose">
          <div className="border-t border-[#E8E6DF] pt-12">
            <p className="font-sans text-[11px] uppercase tracking-[0.12em] text-[#6B6B6B] mb-8">
              WHAT WE BELIEVE
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <p className="font-sans text-lg font-semibold text-[#0F0F0F] mb-2">
                  Selling is a craft, not a personality contest.
                </p>
                <p className="font-sans text-sm text-[#6B6B6B] leading-relaxed">
                  You don&apos;t have to be a certain type to be great at sales. You have to understand your type and develop it deliberately.
                </p>
              </div>
              <div>
                <p className="font-sans text-lg font-semibold text-[#0F0F0F] mb-2">
                  Self-knowledge compounds.
                </p>
                <p className="font-sans text-sm text-[#6B6B6B] leading-relaxed">
                  A seller who understands their blind spots early outsells a talented seller who never examines theirs. The gap is the work.
                </p>
              </div>
              <div>
                <p className="font-sans text-lg font-semibold text-[#0F0F0F] mb-2">
                  Coaching should be specific.
                </p>
                <p className="font-sans text-sm text-[#6B6B6B] leading-relaxed">
                  Generic advice is noise. The Noble Compass exists because every seller deserves coaching that&apos;s actually about them.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* SECTION 4 — CTA */}
      <section className="py-16">
        <Container maxWidth="prose">
          <div className="border-t border-[#E8E6DF] pt-16 text-center">
            <h2 className="font-display text-3xl font-semibold text-[#0F0F0F] mb-4">
              Start with the free assessment.
            </h2>
            <p className="font-sans text-base text-[#6B6B6B] mb-8">
              The Noble Quotient is free. 30 questions, full results immediately.
            </p>
            <LinkButton href="/quotient" variant="primary">
              Take the Free Assessment →
            </LinkButton>
          </div>
        </Container>
      </section>

    </main>
  )
}

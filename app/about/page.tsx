import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'

export const metadata = {
  title: 'About — The Noble Seller',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-tns-bg text-tns-fg">
      <Section size="xl">
        <Container maxWidth="prose">
          <h1 className="font-display text-[32px] text-tns-fg leading-tight mb-tns-lg">
            About
          </h1>
          <p className="text-[17px] text-tns-fg leading-relaxed">
            More on the way.
          </p>
        </Container>
      </Section>
    </div>
  )
}

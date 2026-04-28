import Link from 'next/link'
import { Container } from './Container'

export function SiteHeader() {
  return (
    <header className="bg-tns-bg pt-tns-lg pb-tns-lg">
      <Container maxWidth="prose" className="flex items-center justify-between">
        <Link
          href="/"
          className="font-display font-semibold tracking-tight text-tns-fg text-xl md:text-2xl"
        >
          The Noble Seller
        </Link>
        <nav className="hidden md:flex items-center gap-tns-lg text-sm text-tns-muted">
          <Link href="/quotient" className="hover:text-tns-fg transition-colors">
            The Noble Quotient
          </Link>
          <a href="/#subscribe" className="hover:text-tns-fg transition-colors">
            Subscribe
          </a>
        </nav>
      </Container>
    </header>
  )
}

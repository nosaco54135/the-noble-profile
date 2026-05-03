import Link from 'next/link'
import { Container } from './Container'
import { HeaderNav } from './HeaderNav'

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
        <HeaderNav />
      </Container>
    </header>
  )
}

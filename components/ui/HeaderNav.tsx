'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LinkButton } from './Button'

export function HeaderNav() {
  const pathname = usePathname()
  const isQuotientPage = pathname?.startsWith('/quotient')
  const isMethodologyPage = pathname?.startsWith('/methodology')

  return (
    <nav className="hidden md:flex items-center gap-tns-lg text-sm text-tns-muted">
      {!isQuotientPage && (
        <Link href="/quotient" className="hover:text-tns-fg transition-colors">
          The Noble Quotient
        </Link>
      )}
      {!isMethodologyPage && (
        <Link href="/methodology" className="hover:text-tns-fg transition-colors">
          Methodology
        </Link>
      )}
      <LinkButton href="/#subscribe" variant="primary" className="px-4 py-2 text-sm">
        Subscribe
      </LinkButton>
    </nav>
  )
}

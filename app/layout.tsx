import type { Metadata } from 'next'
import { Cormorant, Inter } from 'next/font/google'
import { SiteHeader } from '@/components/ui/SiteHeader'
import './globals.css'

const cormorant = Cormorant({
  subsets: ['latin'],
  weight: ['600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'The Noble Seller',
  description:
    "A weekly newsletter for sellers who are tired of watered-down advice. Frameworks, tactics, and what actually works.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable}`}>
      <body className="min-h-screen bg-white antialiased flex flex-col">
        <SiteHeader />
        <div className="flex-1">{children}</div>
        <footer className="border-t border-[#E8E6DF] bg-[#FAFAF7] mt-auto">
          <div className="max-w-[1080px] mx-auto px-8 md:px-10 py-12">

            {/* Top row — three columns */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">

              {/* Column 1 — Brand */}
              <div>
                <p className="font-display text-lg font-semibold text-[#0F0F0F] mb-3">The Noble Seller</p>
                <p className="font-sans text-sm text-[#6B6B6B] leading-relaxed max-w-[240px] mb-4">
                  A behavioral assessment and coaching platform built for sales professionals.
                </p>
                <a href="/quotient" className="font-sans text-sm text-[#722F37] underline underline-offset-4 decoration-[#722F37]/40 hover:decoration-[#722F37] transition-colors">
                  Take the Free Assessment →
                </a>
              </div>

              {/* Column 2 — Company */}
              <div>
                <p className="font-sans text-[11px] uppercase tracking-[0.12em] text-[#6B6B6B] mb-4">Company</p>
                <div className="space-y-3">
                  <a href="/methodology" className="block font-sans text-sm text-[#0F0F0F] hover:text-[#722F37] transition-colors">Methodology</a>
                  <a href="/about" className="block font-sans text-sm text-[#0F0F0F] hover:text-[#722F37] transition-colors">About</a>
                  <a href="/contact" className="block font-sans text-sm text-[#0F0F0F] hover:text-[#722F37] transition-colors">Contact</a>
                </div>
              </div>

              {/* Column 3 — Newsletter */}
              <div>
                <p className="font-sans text-[11px] uppercase tracking-[0.12em] text-[#6B6B6B] mb-4">Newsletter</p>
                <p className="font-sans text-sm text-[#6B6B6B] leading-relaxed mb-4">
                  Sales thinking for people who take the craft seriously. Free, weekly.
                </p>
                <a
                  href="https://thenobleseller.beehiiv.com/subscribe"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block font-sans text-sm text-[#722F37] underline underline-offset-4 decoration-[#722F37]/40 hover:decoration-[#722F37] transition-colors"
                >
                  Subscribe →
                </a>
              </div>

            </div>

            {/* Bottom bar */}
            <div className="border-t border-[#E8E6DF] pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="font-sans text-xs text-[#6B6B6B]">
                © {new Date().getFullYear()} The Noble Seller. All rights reserved.
              </p>
              <div className="flex gap-6">
                <a href="/privacy" className="font-sans text-xs text-[#6B6B6B] hover:text-[#722F37] transition-colors">Privacy Policy</a>
                <a href="/contact" className="font-sans text-xs text-[#6B6B6B] hover:text-[#722F37] transition-colors">Contact</a>
              </div>
            </div>

          </div>
        </footer>
      </body>
    </html>
  )
}

import type { Metadata } from 'next'
import { Fraunces, Inter } from 'next/font/google'
import { SiteHeader } from '@/components/ui/SiteHeader'
import './globals.css'

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['400', '600'],
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
    <html lang="en" className={`${inter.variable} ${fraunces.variable}`}>
      <body className="min-h-screen bg-white antialiased">
        <SiteHeader />
        {children}
      </body>
    </html>
  )
}

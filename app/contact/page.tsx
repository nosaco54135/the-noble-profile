export const metadata = {
  title: 'Contact — The Noble Seller',
  description: 'Get in touch with The Noble Seller.',
}

export default function ContactPage() {
  return (
    <main className="bg-[#FAFAF7] min-h-screen">
      <div className="min-h-[60vh] flex items-center">
        <div className="max-w-[480px] mx-auto px-8 text-center">
          <p className="font-sans text-[11px] uppercase tracking-[0.12em] text-[#6B6B6B] mb-4">
            CONTACT
          </p>
          <h1 className="font-display text-4xl font-semibold text-[#0F0F0F] mb-6">
            Get in touch.
          </h1>
          <p className="font-sans text-base text-[#6B6B6B] leading-relaxed mb-8">
            For questions about the Noble Quotient or Noble Codex, partnership inquiries, or anything else — reach out directly.
          </p>
          <a
            href="mailto:info@thenobleseller.com"
            className="font-sans text-base text-[#722F37] underline underline-offset-4 decoration-[#722F37]/40 hover:decoration-[#722F37] transition-colors"
          >
            info@thenobleseller.com
          </a>
        </div>
      </div>
    </main>
  )
}

export const metadata = {
  title: 'Privacy Policy — The Noble Seller',
  description: 'Privacy policy for The Noble Seller.',
}

const SECTIONS = [
  {
    heading: 'What we collect',
    body: 'When you take the Noble Quotient, we collect your email address and your assessment responses. When you purchase the Noble Compass, we collect payment information through Stripe — we never see or store your credit card details directly. If you subscribe to The Noble Seller newsletter, your email is stored with Beehiiv, our newsletter provider.',
  },
  {
    heading: 'How we use it',
    body: 'Your email is used to deliver your assessment results, send your Noble Compass after purchase, and — if you opt in — send The Noble Seller newsletter. We do not sell your email address or share it with third parties for marketing purposes. Your assessment responses are used to calculate your Noble Quotient scores and generate your Noble Compass. Response data may be used in aggregate and anonymized form to improve the assessment model. No individual response data is shared or sold.',
  },
  {
    heading: 'Who we share it with',
    body: 'We use the following third-party services to operate The Noble Seller: Stripe for payment processing, Beehiiv for newsletter delivery, Supabase for secure database storage, Resend for transactional email delivery, and Anthropic for AI generation of the Noble Compass. Assessment scores are passed to Anthropic\'s API to generate your coaching report. We do not share your personal information with any other third parties.',
  },
  {
    heading: 'Data retention',
    body: 'Your assessment record and Noble Compass are stored indefinitely so you can access them at any time via your results link. You may request deletion of your data at any time by emailing info@thenobleseller.com.',
  },
  {
    heading: 'Cookies',
    body: 'The Noble Seller uses session storage during the assessment flow to temporarily hold your email and responses. We do not use tracking cookies or advertising cookies.',
  },
  {
    heading: 'Your rights',
    body: 'You may request access to, correction of, or deletion of your personal data at any time. Email info@thenobleseller.com with your request. We will respond within 30 days.',
  },
  {
    heading: 'Contact',
    body: 'The Noble Seller\ninfo@thenobleseller.com',
  },
]

export default function PrivacyPage() {
  return (
    <main className="bg-[#FAFAF7] min-h-screen">
      <div className="max-w-[640px] mx-auto px-8 py-16">
        <p className="font-sans text-[11px] uppercase tracking-[0.12em] text-[#6B6B6B] mb-4">LEGAL</p>
        <h1 className="font-display text-4xl font-semibold text-[#0F0F0F] mb-3">Privacy Policy</h1>
        <p className="font-sans text-sm text-[#6B6B6B] mb-12">Last updated: May 2026</p>

        <div className="space-y-10">
          {SECTIONS.map(({ heading, body }) => (
            <div key={heading}>
              <h2 className="font-display text-xl font-semibold text-[#0F0F0F] mb-3">{heading}</h2>
              <p className="font-sans text-base text-[#0F0F0F] leading-relaxed whitespace-pre-line">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}

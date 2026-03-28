import type { Metadata } from 'next'
import { SITE_URL, SITE_NAME } from '@/lib/utils'
import Breadcrumbs from '@/components/Breadcrumbs'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: `Get in touch with ${SITE_NAME}. We are happy to help with any tech questions or suggestions.`,
  alternates: { canonical: `${SITE_URL}/contact` },
}

export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Contact' }]} />

      <h1 className="text-3xl font-bold font-[family-name:var(--font-heading)] text-brand-dark mb-4">
        Contact Us
      </h1>
      <p className="text-gray-600 text-lg mb-8">
        Have a tech question? Want us to write a guide about something specific?
        We would love to hear from you.
      </p>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <p className="text-gray-700 text-lg">
          Email us at: <a href="mailto:hello@techfor60s.com" className="text-brand-blue font-semibold">hello@techfor60s.com</a>
        </p>
        <p className="text-gray-500 mt-4">
          We aim to reply within 48 hours. No question is too simple — if it matters to you, it matters to us.
        </p>
      </div>
    </div>
  )
}

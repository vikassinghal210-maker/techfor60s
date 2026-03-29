import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_URL, SITE_NAME } from '@/lib/utils'
import { breadcrumbJsonLd, faqJsonLd } from '@/lib/seo'
import Breadcrumbs from '@/components/Breadcrumbs'
import PasswordChecker from '@/components/PasswordChecker'

const PAGE_URL = `${SITE_URL}/tools/password-checker`

export const metadata: Metadata = {
  title: 'Password Strength Checker & Generator — Free Tool for Seniors',
  description:
    'Check if your password is strong enough and generate memorable, secure passwords. Our free tool explains password strength in plain language. Your password never leaves your device.',
  keywords: [
    'password strength checker',
    'password generator',
    'is my password strong',
    'password checker tool',
    'strong password generator',
    'password security for seniors',
    'how to create a strong password',
    'password strength tester',
    'secure password maker',
    'easy to remember strong password',
  ],
  openGraph: {
    type: 'website',
    url: PAGE_URL,
    title: 'Password Strength Checker & Generator',
    description: 'Check your password strength and generate secure, memorable passwords. Free and private.',
    siteName: SITE_NAME,
    images: [{
      url: `${SITE_URL}/api/og?title=${encodeURIComponent('Password Strength Checker & Generator')}`,
      width: 1200, height: 630, alt: 'Password Checker Tool',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Password Strength Checker & Generator',
    description: 'Check your password strength and create strong, memorable passwords.',
  },
  alternates: { canonical: PAGE_URL },
}

const faqItems = [
  {
    question: 'Is it safe to type my password here?',
    answer: 'Yes! Your password is checked entirely in your web browser. It never gets sent to any server or stored anywhere. We cannot see your password — it stays on your device.',
  },
  {
    question: 'What makes a password strong?',
    answer: 'A strong password has at least 12 characters and includes a mix of uppercase letters, lowercase letters, numbers, and symbols. Most importantly, it should not be a common word or phrase like "password123" or your name and birthday.',
  },
  {
    question: 'How can I remember so many passwords?',
    answer: 'Use a password manager like 1Password, Bitwarden, or the one built into your iPhone or Android phone. You only need to remember one master password, and the manager remembers the rest. It\'s the safest and easiest approach.',
  },
  {
    question: 'Should I write my passwords down?',
    answer: 'If you prefer paper over a password manager, that\'s okay — but keep the paper in a secure, private place (like a locked drawer or safe). Never leave passwords on sticky notes attached to your computer or in plain sight.',
  },
  {
    question: 'How often should I change my passwords?',
    answer: 'Security experts now recommend changing passwords only when there\'s reason to believe they may have been compromised (like a data breach notification). Instead of changing frequently, focus on using unique, strong passwords for each account and enabling two-factor authentication.',
  },
]

export default function PasswordCheckerPage() {
  const breadcrumbs = [
    { name: 'Home', url: SITE_URL },
    { name: 'Tools', url: `${SITE_URL}/tools` },
    { name: 'Password Checker' },
  ]

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(breadcrumbs)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqItems)) }} />

      <Breadcrumbs items={[
        { label: 'Home', href: '/' },
        { label: 'Tools', href: '/tools' },
        { label: 'Password Checker' },
      ]} />

      <section className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-heading)] mb-4" style={{ color: 'var(--text-primary)' }}>
          Password Strength Checker & Generator
        </h1>
        <p className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          Is your password strong enough? Type it below to find out. Need a new one? Our
          generator creates strong, memorable passwords you can actually remember.
          <strong> Everything stays on your device — we never see your password.</strong>
        </p>
      </section>

      <section className="mb-12">
        <PasswordChecker />
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-6" style={{ color: 'var(--text-primary)' }}>
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqItems.map((faq, i) => (
            <details key={i} className="group rounded-xl border overflow-hidden" style={{ borderColor: 'var(--border-color)' }}>
              <summary className="cursor-pointer list-none p-5 text-lg font-semibold flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800/50" style={{ color: 'var(--text-primary)' }}>
                {faq.question}
                <span className="ml-2 text-brand-blue transition-transform group-open:rotate-180">▾</span>
              </summary>
              <div className="px-5 pb-5">
                <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{faq.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </section>

      <section className="rounded-xl border p-6" style={{ backgroundColor: 'var(--bg-tertiary)', borderColor: 'var(--border-color)' }}>
        <h2 className="text-xl font-bold font-[family-name:var(--font-heading)] mb-4" style={{ color: 'var(--text-primary)' }}>
          Related Safety Guides
        </h2>
        <ul className="space-y-3">
          <li><Link href="/tools/scam-checker" className="text-brand-blue hover:underline font-medium">Is This a Scam? — Free Scam Checker →</Link></li>
          <li><Link href="/how-to/enable-two-factor-auth/iphone-generic" className="text-brand-blue hover:underline font-medium">How to Enable Two-Factor Authentication →</Link></li>
          <li><Link href="/category/safety-security" className="text-brand-blue hover:underline font-medium">Browse All Safety & Security Guides →</Link></li>
        </ul>
      </section>
    </div>
  )
}

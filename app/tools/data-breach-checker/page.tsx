import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_URL, SITE_NAME } from '@/lib/utils'
import { breadcrumbJsonLd, faqJsonLd, webApplicationJsonLd } from '@/lib/seo'
import Breadcrumbs from '@/components/Breadcrumbs'
import DataBreachChecker from '@/components/DataBreachChecker'

const PAGE_URL = `${SITE_URL}/tools/data-breach-checker`

export const metadata: Metadata = {
  title: 'Data Breach Checker — Were You Affected? Free Tool for Seniors',
  description:
    'Check if your personal data was exposed in a major data breach. Browse 25+ major breaches, learn what to do, and protect yourself with our step-by-step checklist. Designed for seniors — simple, clear, and easy to use.',
  keywords: [
    'data breach checker',
    'data breach',
    'have i been hacked',
    'data leak checker',
    'was my data breached',
    'check data breach',
    'data breach lookup',
    'security breach checker',
    'have i been pwned',
  ],
  openGraph: {
    type: 'website',
    url: PAGE_URL,
    title: 'Data Breach Checker — Were You Affected?',
    description:
      'Check if your data was exposed in a major breach. Browse 25+ breaches, see what was leaked, and learn what to do. Free and designed for seniors.',
    siteName: SITE_NAME,
    images: [
      {
        url: `${SITE_URL}/api/og?title=${encodeURIComponent('Data Breach Checker — Were You Affected?')}`,
        width: 1200,
        height: 630,
        alt: 'Data Breach Checker Tool for Seniors',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Data Breach Checker — Were You Affected?',
    description: 'Check if your data was exposed in a major breach. Free tool designed for seniors.',
  },
  alternates: { canonical: PAGE_URL },
}

const faqItems = [
  {
    question: 'What is a data breach?',
    answer:
      'A data breach happens when hackers break into a company\'s computer systems and steal personal information — like email addresses, passwords, Social Security numbers, or credit card numbers. The stolen data is often sold or posted online for criminals to use.',
  },
  {
    question: 'How do I know if my data was breached?',
    answer:
      'The best way to check is to visit HaveIBeenPwned.com, a free and trusted website that checks if your email address appears in any known data breaches. Companies are also required to notify you if your data was exposed, usually by mail or email.',
  },
  {
    question: 'What should I do if my data was in a breach?',
    answer:
      'Change the password for the affected account immediately. Then change the password anywhere else you used the same one. Turn on two-factor authentication, check your credit reports, and consider placing a fraud alert or credit freeze. Our checklist tool above walks you through every step.',
  },
  {
    question: 'What is a credit freeze and should I do one?',
    answer:
      'A credit freeze prevents anyone — including you — from opening new credit accounts in your name until you lift the freeze. It is free and highly recommended if your Social Security number was exposed. You need to freeze at all three bureaus: Equifax, Experian, and TransUnion.',
  },
  {
    question: 'Is HaveIBeenPwned.com safe to use?',
    answer:
      'Yes. HaveIBeenPwned was created by Troy Hunt, a well-known cybersecurity expert. The site is recommended by governments, banks, and security professionals worldwide. It does not store your email or share it with anyone — it simply checks if your address appears in known breach data.',
  },
  {
    question: 'Can I prevent data breaches?',
    answer:
      'You cannot prevent a company from being hacked, but you can limit the damage. Use a different strong password for every account, enable two-factor authentication everywhere possible, give companies only the minimum information they need, and regularly check your accounts for suspicious activity.',
  },
]

export default function DataBreachCheckerPage() {
  const breadcrumbs = [
    { name: 'Home', url: SITE_URL },
    { name: 'Tools', url: `${SITE_URL}/tools` },
    { name: 'Data Breach Checker' },
  ]

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(breadcrumbs)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqItems)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationJsonLd({ name: 'Data Breach Checker', description: 'A free tool that checks if your email address has been exposed in known data breaches.', url: PAGE_URL, category: 'SecurityApplication' })) }}
      />

      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Tools', href: '/tools' },
          { label: 'Data Breach Checker' },
        ]}
      />

      {/* Hero */}
      <section className="mb-10">
        <h1
          className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-heading)] mb-4"
          style={{ color: 'var(--text-primary)' }}
        >
          Data Breach Checker
        </h1>
        <p className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          Millions of people have had their personal information stolen in data breaches — and
          many do not even know it. Use this tool to browse major breaches, check if companies
          you use were affected, and follow our step-by-step checklist to protect yourself.
        </p>
      </section>

      {/* Tool */}
      <section className="mb-12">
        <DataBreachChecker />
      </section>

      {/* FAQ */}
      <section className="mb-12">
        <h2
          className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-6"
          style={{ color: 'var(--text-primary)' }}
        >
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqItems.map((faq, i) => (
            <details
              key={i}
              className="group rounded-xl border overflow-hidden"
              style={{ borderColor: 'var(--border-color)' }}
            >
              <summary
                className="cursor-pointer list-none p-5 text-lg font-semibold flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800/50"
                style={{ color: 'var(--text-primary)' }}
              >
                {faq.question}
                <span className="ml-2 text-brand-blue transition-transform group-open:rotate-180">&#9662;</span>
              </summary>
              <div className="px-5 pb-5">
                <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {faq.answer}
                </p>
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* Related */}
      <section
        className="rounded-xl border p-6"
        style={{ backgroundColor: 'var(--bg-tertiary)', borderColor: 'var(--border-color)' }}
      >
        <h2
          className="text-xl font-bold font-[family-name:var(--font-heading)] mb-4"
          style={{ color: 'var(--text-primary)' }}
        >
          Related Safety Guides
        </h2>
        <ul className="space-y-3">
          <li>
            <Link href="/blog/data-breach-what-to-do-guide" className="text-brand-blue hover:underline font-medium">
              What To Do After a Data Breach — Complete Guide &rarr;
            </Link>
          </li>
          <li>
            <Link href="/blog/what-is-the-dark-web-simple-guide" className="text-brand-blue hover:underline font-medium">
              What Is the Dark Web? A Simple Explanation &rarr;
            </Link>
          </li>
          <li>
            <Link href="/blog/credit-card-bank-fraud-prevention-seniors" className="text-brand-blue hover:underline font-medium">
              Credit Card &amp; Bank Fraud Prevention for Seniors &rarr;
            </Link>
          </li>
          <li>
            <Link href="/blog/best-identity-theft-protection-for-seniors-2026" className="text-brand-blue hover:underline font-medium">
              Best Identity Theft Protection for Seniors (2026) &rarr;
            </Link>
          </li>
          <li>
            <Link href="/tools/password-checker" className="text-brand-blue hover:underline font-medium">
              Password Strength Checker Tool &rarr;
            </Link>
          </li>
        </ul>
      </section>
    </div>
  )
}

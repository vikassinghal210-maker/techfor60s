import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_URL, SITE_NAME } from '@/lib/utils'
import { breadcrumbJsonLd, faqJsonLd } from '@/lib/seo'
import Breadcrumbs from '@/components/Breadcrumbs'
import ReportScamWizard from '@/components/ReportScamWizard'

const PAGE_URL = `${SITE_URL}/tools/report-scam`

export const metadata: Metadata = {
  title: 'Report a Scam — Step-by-Step Scam Reporting Wizard for Seniors',
  description:
    'Not sure where to report a scam? Our free wizard walks you through reporting fraud step by step. Get personalized guidance for the US, UK, Canada, or Australia — with phone numbers, websites, and a printable checklist.',
  keywords: [
    'how to report a scam',
    'report scam',
    'report fraud',
    'report scam call',
    'report online scam',
    'where to report scams',
    'FTC report fraud',
    'report scam email',
  ],
  openGraph: {
    type: 'website',
    url: PAGE_URL,
    title: 'Report a Scam — Free Step-by-Step Wizard',
    description:
      'Not sure where to report a scam? Our free wizard gives you a personalized reporting plan with the right agencies, phone numbers, and websites.',
    siteName: SITE_NAME,
    images: [
      {
        url: `${SITE_URL}/api/og?title=${encodeURIComponent('Report a Scam — Step-by-Step Wizard')}`,
        width: 1200,
        height: 630,
        alt: 'Report a Scam Wizard for Seniors',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Report a Scam — Free Step-by-Step Wizard',
    description: 'Get a personalized scam reporting plan with the right agencies and phone numbers.',
  },
  alternates: { canonical: PAGE_URL },
}

const faqItems = [
  {
    question: 'Where do I report a scam in the United States?',
    answer:
      'In the US, report scams to the FTC at ReportFraud.ftc.gov. For internet-related fraud, also file with the FBI\'s IC3 at ic3.gov. Phone scams can be reported to the FCC, and scams impersonating government agencies should be reported to the relevant agency\'s Inspector General.',
  },
  {
    question: 'Will reporting a scam help me get my money back?',
    answer:
      'Reporting a scam does not guarantee you will recover lost money, but it is still very important. Your report helps agencies track scam patterns, build cases against criminals, and warn others. If you lost money, contact your bank or credit card company immediately — they may be able to reverse the charge.',
  },
  {
    question: 'What information do I need when reporting a scam?',
    answer:
      'Gather as much detail as possible: the scammer\'s phone number, email address, or website; any messages or emails you received; dates and times of contact; how much money was lost and how it was sent (wire, gift card, credit card); and any names or organizations the scammer claimed to represent.',
  },
  {
    question: 'Should I report a scam even if I did not lose money?',
    answer:
      'Yes, absolutely. Even if you did not lose money, your report helps authorities track scam operations and protect others who might be targeted. Every report matters — agencies use this data to identify trends and shut down scammers.',
  },
  {
    question: 'How long does it take for a scam report to be investigated?',
    answer:
      'Investigation timelines vary widely. Agencies like the FTC and IC3 collect reports to build cases over time, so you may not hear back about your individual report. However, if you report financial losses to your bank, they typically respond within 10 business days. Local police may follow up sooner for active scam investigations.',
  },
]

export default function ReportScamPage() {
  const breadcrumbs = [
    { name: 'Home', url: SITE_URL },
    { name: 'Tools', url: `${SITE_URL}/tools` },
    { name: 'Report a Scam' },
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

      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Tools', href: '/tools' },
          { label: 'Report a Scam' },
        ]}
      />

      {/* Hero */}
      <section className="mb-10">
        <h1
          className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-heading)] mb-4"
          style={{ color: 'var(--text-primary)' }}
        >
          Report a Scam — Step-by-Step Wizard
        </h1>
        <p className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          If you&apos;ve been targeted by a scam, it&apos;s important to report it — even if you didn&apos;t lose money.
          This free tool will guide you through the process step by step and give you a personalized
          plan with the right agencies to contact, phone numbers, and websites.{' '}
          <strong>Everything stays on your device.</strong>
        </p>
      </section>

      {/* Tool */}
      <section className="mb-12">
        <ReportScamWizard />
      </section>

      {/* Why report */}
      <section className="mb-12">
        <h2
          className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-6"
          style={{ color: 'var(--text-primary)' }}
        >
          Why Reporting Scams Matters
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            {
              title: 'Protect Others',
              desc: 'Your report helps agencies warn other people and shut down scam operations before more victims are harmed.',
            },
            {
              title: 'Build Criminal Cases',
              desc: 'Law enforcement agencies use individual reports to build larger cases against organized scam networks.',
            },
            {
              title: 'Track Scam Trends',
              desc: 'Agencies like the FTC analyze reports to identify new scam tactics and publish warnings for the public.',
            },
            {
              title: 'Recover Losses',
              desc: 'Reporting to your bank or credit card company quickly can sometimes help you recover money that was stolen.',
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-xl border p-5"
              style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}
            >
              <h3 className="text-lg font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
                {item.title}
              </h3>
              <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
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
                <span className="ml-2 text-brand-blue transition-transform group-open:rotate-180">▾</span>
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
            <Link href="/blog/how-to-report-a-scam" className="text-brand-blue hover:underline font-medium">
              How to Report a Scam — Complete Guide for Seniors →
            </Link>
          </li>
          <li>
            <Link href="/blog/credit-card-bank-fraud-prevention-seniors" className="text-brand-blue hover:underline font-medium">
              Credit Card and Bank Fraud Prevention for Seniors →
            </Link>
          </li>
          <li>
            <Link href="/blog/elder-financial-abuse-warning-signs" className="text-brand-blue hover:underline font-medium">
              Elder Financial Abuse — Warning Signs to Watch For →
            </Link>
          </li>
          <li>
            <Link href="/tools/scam-checker" className="text-brand-blue hover:underline font-medium">
              Is This a Scam? — Free Scam Checker Tool →
            </Link>
          </li>
          <li>
            <Link href="/category/safety-security" className="text-brand-blue hover:underline font-medium">
              Browse All Safety & Security Articles →
            </Link>
          </li>
        </ul>
      </section>
    </div>
  )
}

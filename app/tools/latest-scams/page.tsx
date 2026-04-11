import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_URL, SITE_NAME } from '@/lib/utils'
import { breadcrumbJsonLd, faqJsonLd } from '@/lib/seo'
import Breadcrumbs from '@/components/Breadcrumbs'
import ScamAlertFeed from '@/components/ScamAlertFeed'

const PAGE_URL = `${SITE_URL}/tools/latest-scams`

export const metadata: Metadata = {
  title: 'Latest Scam Alerts 2026 — Current Scams & Fraud Warnings for Seniors',
  description:
    'Stay informed with the latest scam alerts and fraud warnings targeting seniors in 2026. Phone scams, email phishing, text scams, and online fraud — learn how to protect yourself.',
  keywords: [
    'latest scams',
    'current scams',
    'new scams 2026',
    'scam alerts',
    'trending scams',
    'scam warnings',
    'latest fraud alerts',
    'current phone scams',
    'scam alerts for seniors',
    'new phone scams 2026',
    'email phishing alerts',
    'text message scams',
  ],
  openGraph: {
    type: 'website',
    url: PAGE_URL,
    title: 'Latest Scam Alerts 2026 — Fraud Warnings for Seniors',
    description:
      'Stay informed with the latest scam alerts targeting seniors. Phone, email, text, and online scams — updated regularly.',
    siteName: SITE_NAME,
    images: [
      {
        url: `${SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Latest Scam Alerts for Seniors 2026',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Latest Scam Alerts 2026 — Fraud Warnings for Seniors',
    description: 'Stay informed with the latest scam alerts targeting seniors in 2026.',
  },
  alternates: { canonical: PAGE_URL },
}

const faqItems = [
  {
    question: 'How often is this scam alert feed updated?',
    answer:
      'We review and update our scam alert feed regularly to include the latest scams reported by the FTC, AARP, and other consumer protection organizations. Check back often to stay informed about new threats.',
  },
  {
    question: 'What should I do if I receive a suspicious call or message?',
    answer:
      'Do not respond, click any links, or share personal information. Hang up the phone or delete the message. You can use our free Scam Checker tool to analyze suspicious messages. Report scams to the FTC at reportfraud.ftc.gov or call 1-877-382-4357.',
  },
  {
    question: 'What are the most common scams targeting seniors in 2026?',
    answer:
      'The top scams in 2026 include AI voice cloning (grandparent scam), fake SSA and Medicare calls, phishing emails from Amazon and banks, fake package delivery texts, romance scams, and tech support pop-up scams. Seniors over 60 are the most targeted age group for fraud.',
  },
  {
    question: 'How can I protect myself from phone scams?',
    answer:
      'Never give personal information to unexpected callers. Let unknown numbers go to voicemail. Register your number on the Do Not Call Registry at donotcall.gov. Use your phone\'s built-in call blocking features. If someone threatens you, hang up — real agencies do not make threats by phone.',
  },
  {
    question: 'How do I report a scam?',
    answer:
      'Report scams to the Federal Trade Commission at reportfraud.ftc.gov. For phone scams, also file a complaint with the FCC at fcc.gov/consumers/guides/stop-unwanted-calls-and-texts. If you lost money, contact your bank immediately and file a police report.',
  },
]

export default function LatestScamsPage() {
  const breadcrumbs = [
    { name: 'Home', url: SITE_URL },
    { name: 'Tools', url: `${SITE_URL}/tools` },
    { name: 'Latest Scam Alerts' },
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
          { label: 'Latest Scam Alerts' },
        ]}
      />

      {/* Hero */}
      <section className="mb-10">
        <h1
          className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-heading)] mb-4"
          style={{ color: 'var(--text-primary)' }}
        >
          Latest Scam Alerts
        </h1>
        <p className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          Scammers are always coming up with new tricks. This page lists the most common and
          trending scams targeting seniors right now. <strong>Stay informed, stay safe.</strong>{' '}
          Click any alert to see how the scam works and how to protect yourself.
        </p>
      </section>

      {/* Tool */}
      <section className="mb-12">
        <ScamAlertFeed />
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
            <Link href="/tools/scam-checker" className="text-brand-blue hover:underline font-medium">
              Is This a Scam? — Free Scam Checker Tool →
            </Link>
          </li>
          <li>
            <Link href="/blog/what-is-cyber-crime-guide-for-seniors" className="text-brand-blue hover:underline font-medium">
              What Is Cyber Crime? A Complete Guide for Seniors →
            </Link>
          </li>
          <li>
            <Link href="/blog/phone-scams-targeting-seniors" className="text-brand-blue hover:underline font-medium">
              Phone Scams Targeting Seniors — How to Stay Safe →
            </Link>
          </li>
          <li>
            <Link href="/blog/how-to-spot-scam-emails" className="text-brand-blue hover:underline font-medium">
              How to Spot Scam Emails — Red Flags to Watch For →
            </Link>
          </li>
          <li>
            <Link href="/category/safety-security" className="text-brand-blue hover:underline font-medium">
              Browse All Safety &amp; Security Articles →
            </Link>
          </li>
        </ul>
      </section>
    </div>
  )
}

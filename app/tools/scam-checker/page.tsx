import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_URL, SITE_NAME } from '@/lib/utils'
import { breadcrumbJsonLd, faqJsonLd } from '@/lib/seo'
import Breadcrumbs from '@/components/Breadcrumbs'
import ScamChecker from '@/components/ScamChecker'

const PAGE_URL = `${SITE_URL}/tools/scam-checker`

export const metadata: Metadata = {
  title: 'Is This a Scam? — Free Scam Checker Tool for Seniors',
  description:
    'Paste any suspicious email or text and our free tool checks it for scam warning signs. Simple, private, and designed for seniors.',
  keywords: [
    'is this a scam',
    'scam checker',
    'scam detector',
    'email scam checker',
    'text message scam checker',
    'is this email a scam',
    'is this text a scam',
    'scam checker for seniors',
    'how to tell if a message is a scam',
    'online scam detector',
    'phishing checker',
    'fraud detector tool',
  ],
  openGraph: {
    type: 'website',
    url: PAGE_URL,
    title: 'Is This a Scam? — Free Scam Checker Tool',
    description:
      'Paste any suspicious message and instantly check it for scam warning signs. Free, private, and designed for seniors.',
    siteName: SITE_NAME,
    images: [
      {
        url: `${SITE_URL}/api/og?title=${encodeURIComponent('Is This a Scam? — Free Scam Checker')}`,
        width: 1200,
        height: 630,
        alt: 'Scam Checker Tool for Seniors',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Is This a Scam? — Free Scam Checker Tool',
    description: 'Paste any suspicious message and instantly check for scam warning signs.',
  },
  alternates: { canonical: PAGE_URL },
}

const faqItems = [
  {
    question: 'How does the scam checker work?',
    answer:
      'Our tool scans your message for common scam patterns — like urgency tactics, requests for personal information, suspicious links, threats, and too-good-to-be-true offers. Everything runs in your browser, so your message is never sent to any server.',
  },
  {
    question: 'Is my message private?',
    answer:
      'Yes, completely. The scam checker runs entirely in your web browser. Your message never leaves your device — we never see, store, or share anything you paste.',
  },
  {
    question: 'Can this tool catch every scam?',
    answer:
      'No tool can catch every scam. Our checker identifies the most common warning signs, but sophisticated scammers constantly change their tactics. Always trust your instincts — if something feels wrong, it probably is. Ask a family member or friend for a second opinion.',
  },
  {
    question: 'What should I do if I already clicked a link or shared my information?',
    answer:
      'Don\'t panic. Change your passwords immediately on any affected accounts. Contact your bank if you shared financial information. Place a fraud alert on your credit by calling one of the three credit bureaus (Equifax, Experian, or TransUnion). Report the scam at reportfraud.ftc.gov.',
  },
  {
    question: 'What are the most common scams targeting seniors?',
    answer:
      'The most common scams include fake tech support calls (claiming your computer has a virus), IRS impersonation (threatening arrest for unpaid taxes), grandparent scams (pretending to be a grandchild in trouble), Medicare fraud, and phishing emails pretending to be from banks or Amazon. In 2024, adults over 60 lost $4.8 billion to cybercrime.',
  },
]

export default function ScamCheckerPage() {
  const breadcrumbs = [
    { name: 'Home', url: SITE_URL },
    { name: 'Tools', url: `${SITE_URL}/tools` },
    { name: 'Scam Checker' },
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
          { label: 'Scam Checker' },
        ]}
      />

      {/* Hero */}
      <section className="mb-10">
        <h1
          className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-heading)] mb-4"
          style={{ color: 'var(--text-primary)' }}
        >
          Is This a Scam?
        </h1>
        <p className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          Got a suspicious email, text message, or social media message? Paste it below and
          we&apos;ll check it for common scam warning signs. <strong>Your message stays completely private</strong> — it
          never leaves your device.
        </p>
      </section>

      {/* Tool */}
      <section className="mb-12">
        <ScamChecker />
      </section>

      {/* Common Scam Types */}
      <section className="mb-12">
        <h2
          className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-6"
          style={{ color: 'var(--text-primary)' }}
        >
          Common Scams to Watch For
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            {
              title: 'Fake Tech Support',
              desc: 'Pop-ups or calls claiming your computer has a virus. Microsoft and Apple will never call you.',
            },
            {
              title: 'IRS / Government Scams',
              desc: 'Calls or emails threatening arrest for unpaid taxes. The real IRS contacts you by mail.',
            },
            {
              title: 'Grandparent Scam',
              desc: 'Someone calls pretending to be your grandchild in trouble, asking you to send money.',
            },
            {
              title: 'Package Delivery Scam',
              desc: 'Texts claiming a package can\'t be delivered and asking you to click a link.',
            },
            {
              title: 'Prize / Lottery Scam',
              desc: 'Messages saying you won a prize — but you need to pay a fee or share info to claim it.',
            },
            {
              title: 'Bank / Account Alert',
              desc: 'Emails pretending to be your bank saying your account is locked. Go directly to your bank\'s website.',
            },
          ].map((scam) => (
            <div
              key={scam.title}
              className="rounded-xl border p-5"
              style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}
            >
              <h3 className="text-lg font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
                {scam.title}
              </h3>
              <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {scam.desc}
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
            <Link href="/category/safety-security" className="text-brand-blue hover:underline font-medium">
              Browse All Safety & Security Articles →
            </Link>
          </li>
          <li>
            <Link href="/how-to/enable-two-factor-auth/iphone-generic" className="text-brand-blue hover:underline font-medium">
              How to Enable Two-Factor Authentication →
            </Link>
          </li>
          <li>
            <Link href="/how-to/block-phone-number/iphone-generic" className="text-brand-blue hover:underline font-medium">
              How to Block Unwanted Phone Numbers →
            </Link>
          </li>
        </ul>
      </section>
    </div>
  )
}

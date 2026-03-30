import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_URL, SITE_NAME } from '@/lib/utils'
import { breadcrumbJsonLd, faqJsonLd } from '@/lib/seo'
import Breadcrumbs from '@/components/Breadcrumbs'
import ScamPhoneLookup from '@/components/ScamPhoneLookup'

const PAGE_URL = `${SITE_URL}/tools/scam-phone-lookup`

export const metadata: Metadata = {
  title: 'Scam Phone Number Lookup — Free Phone Scam Checker for Seniors',
  description:
    'Check if a phone number is a scam. Our free tool checks numbers against known scam patterns, spoofed government numbers, and robocall databases. 100% private — nothing leaves your device.',
  keywords: [
    'scam phone number lookup',
    'is this phone number a scam',
    'phone scam checker',
    'scam call lookup',
    'reverse phone lookup scam',
    'report scam phone number',
    'phone number scam check',
    'scam call checker for seniors',
    'robocall checker',
    'phone number lookup free',
  ],
  openGraph: {
    type: 'website',
    url: PAGE_URL,
    title: 'Scam Phone Number Lookup — Free Phone Scam Checker',
    description:
      'Enter any suspicious phone number and check it against known scam patterns. Free, private, and designed for seniors.',
    siteName: SITE_NAME,
    images: [
      {
        url: `${SITE_URL}/api/og?title=${encodeURIComponent('Scam Phone Number Lookup — Free Checker')}`,
        width: 1200,
        height: 630,
        alt: 'Scam Phone Number Lookup Tool for Seniors',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Scam Phone Number Lookup — Free Phone Scam Checker',
    description: 'Enter any phone number and instantly check it for scam patterns.',
  },
  alternates: { canonical: PAGE_URL },
}

const faqItems = [
  {
    question: 'How does this phone scam checker work?',
    answer:
      'Our tool checks the phone number you enter against a database of known scam area codes, premium-rate numbers, spoofed government patterns, and common robocall tactics. Everything runs in your browser — your phone number is never sent to any server.',
  },
  {
    question: 'Is my information private when I use this tool?',
    answer:
      'Yes, completely. The scam phone number lookup runs entirely in your web browser. The number you enter never leaves your device — we never see, store, or share anything you type.',
  },
  {
    question: 'Can this tool identify every scam phone number?',
    answer:
      'No tool can catch every scam number. Scammers constantly change their phone numbers and use spoofing technology to disguise their real number. Our tool identifies common patterns, but you should always be cautious with unexpected calls asking for personal information or money.',
  },
  {
    question: 'What is caller ID spoofing?',
    answer:
      'Caller ID spoofing is when a scammer changes the number that appears on your caller ID to make it look like a trusted organization — such as your bank, the IRS, or Social Security. This means you cannot rely on caller ID alone to determine if a call is legitimate.',
  },
  {
    question: 'What should I do if I already gave information to a scam caller?',
    answer:
      'Don\'t panic. If you shared financial information, contact your bank immediately. If you shared your Social Security number, place a fraud alert at one of the three credit bureaus (Equifax, Experian, or TransUnion). Change passwords on any accounts that may be affected. Report the scam at reportfraud.ftc.gov.',
  },
  {
    question: 'How do I block scam calls on my phone?',
    answer:
      'On iPhone, go to Settings > Phone > Silence Unknown Callers. On Android, open the Phone app, tap Settings, and enable Caller ID & Spam. You can also ask your phone carrier about free scam-blocking tools like T-Mobile Scam Shield, AT&T ActiveArmor, or Verizon Call Filter.',
  },
  {
    question: 'Should I answer calls from numbers I do not recognize?',
    answer:
      'Generally, no. If it is important, the caller will leave a voicemail. Scammers rarely leave messages. If you do answer and the caller asks for personal information or money, hang up immediately.',
  },
]

export default function ScamPhoneLookupPage() {
  const breadcrumbs = [
    { name: 'Home', url: SITE_URL },
    { name: 'Tools', url: `${SITE_URL}/tools` },
    { name: 'Scam Phone Number Lookup' },
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
          { label: 'Scam Phone Lookup' },
        ]}
      />

      {/* Hero */}
      <section className="mb-10">
        <h1
          className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-heading)] mb-4"
          style={{ color: 'var(--text-primary)' }}
        >
          Scam Phone Number Lookup
        </h1>
        <p className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          Got a suspicious phone call? Enter the number below and we&apos;ll check it against known
          scam patterns, premium-rate numbers, and spoofed government lines.{' '}
          <strong>Your number stays completely private</strong> — it never leaves your device.
        </p>
      </section>

      {/* Tool */}
      <section className="mb-12">
        <ScamPhoneLookup />
      </section>

      {/* Warning Signs on a Call */}
      <section className="mb-12">
        <h2
          className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-6"
          style={{ color: 'var(--text-primary)' }}
        >
          Warning Signs During a Phone Call
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            {
              title: 'Threats of Arrest or Legal Action',
              desc: 'No legitimate agency will threaten to arrest you over the phone. The IRS, SSA, and police do not operate this way.',
            },
            {
              title: 'Demands for Gift Cards or Wire Transfers',
              desc: 'No real company or government agency will ever ask you to pay with gift cards, Bitcoin, or wire transfers.',
            },
            {
              title: 'Pressure to Act Immediately',
              desc: 'Scammers create urgency so you cannot think clearly. A real organization will give you time to verify.',
            },
            {
              title: 'Requests for Personal Information',
              desc: 'Never share your Social Security number, bank account, or passwords with someone who called you.',
            },
            {
              title: 'Caller Asks You to Keep It Secret',
              desc: 'If someone tells you not to tell your family about the call, it is almost certainly a scam.',
            },
            {
              title: 'Robocall or Automated Voice',
              desc: 'Automated calls claiming your account is compromised or that you owe money are nearly always scams.',
            },
          ].map((sign) => (
            <div
              key={sign.title}
              className="rounded-xl border p-5"
              style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}
            >
              <h3 className="text-lg font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
                {sign.title}
              </h3>
              <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {sign.desc}
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
            <Link href="/blog/phone-scams-targeting-seniors" className="text-brand-blue hover:underline font-medium">
              Phone Scams Targeting Seniors — How to Stay Safe →
            </Link>
          </li>
          <li>
            <Link href="/blog/how-to-report-a-scam" className="text-brand-blue hover:underline font-medium">
              How to Report a Scam — Step-by-Step Guide →
            </Link>
          </li>
          <li>
            <Link href="/blog/social-security-scams-what-ssa-never-does" className="text-brand-blue hover:underline font-medium">
              Social Security Scams — What the SSA Will Never Do →
            </Link>
          </li>
          <li>
            <Link href="/tools/scam-checker" className="text-brand-blue hover:underline font-medium">
              Is This a Scam? — Free Message Scam Checker →
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

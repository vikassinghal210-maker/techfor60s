import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_URL, SITE_NAME } from '@/lib/utils'
import { breadcrumbJsonLd, faqJsonLd, webApplicationJsonLd } from '@/lib/seo'
import Breadcrumbs from '@/components/Breadcrumbs'
import ScamQuiz from '@/components/ScamQuiz'

const PAGE_URL = `${SITE_URL}/tools/scam-quiz`

export const metadata: Metadata = {
  title: 'What Type of Scam Is This? — Free Scam Identifier Quiz',
  description:
    'Answer a few simple questions about a suspicious contact and our free quiz will identify what type of scam it is and tell you exactly what to do next. Designed for seniors.',
  keywords: [
    'what type of scam is this',
    'scam identifier',
    'identify scam type',
    'am I being scammed',
    'scam quiz',
    'types of scams',
    'how to identify a scam',
    'scam identifier for seniors',
    'scam type checker',
    'what scam is this',
  ],
  openGraph: {
    type: 'website',
    url: PAGE_URL,
    title: 'What Type of Scam Is This? — Free Scam Identifier Quiz',
    description:
      'Answer a few simple questions and identify what type of scam you may be dealing with. Free, private, and designed for seniors.',
    siteName: SITE_NAME,
    images: [
      {
        url: `${SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Scam Identifier Quiz for Seniors',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'What Type of Scam Is This? — Free Scam Identifier Quiz',
    description: 'Answer a few questions and find out what type of scam you may be dealing with.',
  },
  alternates: { canonical: PAGE_URL },
}

const faqItems = [
  {
    question: 'How does the scam identifier quiz work?',
    answer:
      'The quiz asks you 6 simple questions about how someone contacted you, what they claimed, and what they asked for. Based on your answers, it identifies the type of scam and gives you specific steps to protect yourself. Everything runs in your browser — your answers are never sent anywhere.',
  },
  {
    question: 'What types of scams can this quiz identify?',
    answer:
      'The quiz can identify tech support scams, government impersonation scams, romance scams, grandparent scams, phishing attacks, lottery and prize scams, job scams, charity scams, gift card scams, and investment scams. These are the most common scams targeting seniors.',
  },
  {
    question: 'What should I do if the quiz confirms I am being scammed?',
    answer:
      'Stop all communication with the scammer immediately. Do not send any money or share personal information. If you already sent money, contact your bank right away. Report the scam to the FTC at reportfraud.ftc.gov. Talk to a trusted family member or friend about what happened.',
  },
  {
    question: 'Are my answers private?',
    answer:
      'Yes, completely. The scam identifier quiz runs entirely in your web browser. Your answers never leave your device — we never see, store, or share anything you enter.',
  },
  {
    question: 'What are the biggest warning signs of a scam?',
    answer:
      'The biggest red flags are: someone creating extreme urgency or threatening you, requests for payment via gift cards or wire transfers, being told to keep the situation secret from family, unsolicited contact claiming you won a prize, and requests for remote access to your computer. If you see any of these signs, it is very likely a scam.',
  },
]

export default function ScamQuizPage() {
  const breadcrumbs = [
    { name: 'Home', url: SITE_URL },
    { name: 'Tools', url: `${SITE_URL}/tools` },
    { name: 'Scam Type Identifier' },
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationJsonLd({ name: 'Scam Type Identifier Quiz', description: 'A free interactive quiz that helps seniors identify different types of scams and learn how to protect themselves.', url: `${SITE_URL}/tools/scam-quiz`, category: 'SecurityApplication' })) }}
      />

      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Tools', href: '/tools' },
          { label: 'Scam Type Identifier' },
        ]}
      />

      {/* Hero */}
      <section className="mb-10">
        <h1
          className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-heading)] mb-4"
          style={{ color: 'var(--text-primary)' }}
        >
          What Type of Scam Is This?
        </h1>
        <p className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          Think you might be dealing with a scam? Answer 6 simple questions and we&apos;ll identify
          what type of scam it is and tell you exactly what to do next.{' '}
          <strong>Your answers stay completely private</strong> — nothing ever leaves your device.
        </p>
      </section>

      {/* Tool */}
      <section className="mb-12">
        <ScamQuiz />
      </section>

      {/* Warning Signs */}
      <section className="mb-12">
        <h2
          className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-6"
          style={{ color: 'var(--text-primary)' }}
        >
          Top Warning Signs of a Scam
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            {
              title: 'Extreme Urgency',
              desc: 'They pressure you to act right now — before you have time to think or ask someone for advice.',
            },
            {
              title: 'Threats of Arrest',
              desc: 'They threaten arrest, lawsuits, or account closure. Real agencies do not do this over the phone.',
            },
            {
              title: 'Gift Card Payments',
              desc: 'No real business or government agency accepts payment in gift cards. This is always a scam.',
            },
            {
              title: 'Requests for Secrecy',
              desc: 'They tell you not to tell your family or friends. Scammers do not want anyone else to recognize the scam.',
            },
            {
              title: 'Too Good to Be True',
              desc: 'You "won" a prize you never entered, or received an amazing offer out of the blue.',
            },
            {
              title: 'Remote Computer Access',
              desc: 'They ask to connect to your computer to "fix" a problem. Never let strangers access your device.',
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
            <Link href="/blog/what-is-cyber-crime-guide-for-seniors" className="text-brand-blue hover:underline font-medium">
              What Is Cyber Crime? A Complete Guide for Seniors →
            </Link>
          </li>
          <li>
            <Link href="/blog/how-to-report-a-scam" className="text-brand-blue hover:underline font-medium">
              How to Report a Scam — Step-by-Step Guide →
            </Link>
          </li>
          <li>
            <Link href="/blog/how-to-protect-elderly-parents-from-scams" className="text-brand-blue hover:underline font-medium">
              How to Protect Elderly Parents from Scams →
            </Link>
          </li>
          <li>
            <Link href="/tools/scam-checker" className="text-brand-blue hover:underline font-medium">
              Is This a Scam? — Paste & Check Tool →
            </Link>
          </li>
        </ul>
      </section>
    </div>
  )
}

import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_URL, SITE_NAME } from '@/lib/utils'
import { breadcrumbJsonLd, faqJsonLd, webApplicationJsonLd } from '@/lib/seo'
import Breadcrumbs from '@/components/Breadcrumbs'
import ScamMessageCheckerClient from './checker'

const PAGE_URL = `${SITE_URL}/scam-message-checker`

export const metadata: Metadata = {
  title: 'Scam Message Checker — Paste a Text or Email & Check for Red Flags',
  description:
    'Free, private scam message checker for seniors. Paste a suspicious text, email, or chat message and get a risk score plus a plain-English list of warning signs. Runs entirely in your browser.',
  keywords: [
    'scam message checker',
    'is this text a scam',
    'is this email a scam',
    'scam text analyzer',
    'phishing checker',
    'fraud message detector',
    'scam checker for seniors',
  ],
  openGraph: {
    type: 'website',
    url: PAGE_URL,
    title: 'Scam Message Checker — Paste a Message & Check for Red Flags',
    description:
      'Paste a suspicious text or email and get an instant risk score with the exact warning signs highlighted. Free, private, made for seniors.',
    siteName: SITE_NAME,
    images: [
      {
        url: `${SITE_URL}/api/og?title=Scam+Message+Checker&category=Safety+%26+Security`,
        width: 1200,
        height: 630,
        alt: 'Scam Message Checker — TechFor60s',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Scam Message Checker — Paste a Message & Check for Red Flags',
    description:
      'Paste a suspicious text or email and get an instant risk score with the exact warning signs highlighted.',
    site: '@TechFor60s',
  },
  alternates: { canonical: PAGE_URL },
}

const faqItems = [
  {
    question: 'Is my message really private?',
    answer:
      'Yes. The checker runs entirely in your web browser using a local rule engine. Your message is never sent to us or to any server — we cannot see what you paste, and nothing is saved or logged.',
  },
  {
    question: 'What does the risk score mean?',
    answer:
      'The score is a simple total of warning signs found in the message, from 0 (no signals) to 100 (many strong signals). A score above 30 usually means you should not click anything; above 60 means treat it as almost certainly a scam.',
  },
  {
    question: 'Can the tool catch every scam?',
    answer:
      'No. Scammers change tactics constantly. The checker looks for the most common patterns — urgency, fake agency names, requests for OTPs or gift cards, shortener links. Always trust your instincts and ask someone you know if you are unsure.',
  },
  {
    question: 'What should I do if I already clicked a link or shared information?',
    answer:
      'Change the password on the affected account right away. If you shared card or bank details, call your bank using the number on the back of your card. In the US, place a free fraud alert with Equifax, Experian, or TransUnion and report the scam at reportfraud.ftc.gov. In the UK, contact Action Fraud. In Australia, contact Scamwatch.',
  },
  {
    question: 'Does the IRS, Medicare, HMRC, or ATO ever text people?',
    answer:
      'These agencies do not send text messages asking for money, passwords, or one-time codes. They contact you by postal mail. If you get a text claiming to be from them, it is a scam — do not click, do not call back.',
  },
]

export default function ScamMessageCheckerPage() {
  const breadcrumbs = [
    { name: 'Home', url: SITE_URL },
    { name: 'Tools', url: `${SITE_URL}/tools` },
    { name: 'Scam Message Checker' },
  ]

  const related = [
    {
      href: '/blog/irs-impersonation-scam-how-to-spot-2026',
      title: 'IRS Impersonation Scams in 2026 — How to Spot Them',
    },
    {
      href: '/blog/grandparent-scam-ai-voice-clone-2026-guide',
      title: 'Grandparent Scams & AI Voice Clones — 2026 Guide',
    },
    {
      href: '/blog/tech-support-popup-scam-microsoft-apple-2026',
      title: 'Tech Support Pop-up Scams (Microsoft / Apple) — 2026',
    },
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
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            webApplicationJsonLd({
              name: 'Scam Message Checker',
              description:
                'Private, browser-based scam message checker. Paste any suspicious SMS, email, or chat message and get a risk score plus a list of the specific warning signs found, in plain English for seniors.',
              url: PAGE_URL,
              category: 'SecurityApplication',
            })
          ),
        }}
      />

      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Tools', href: '/tools' },
          { label: 'Scam Message Checker' },
        ]}
      />

      {/* Hero */}
      <header className="mb-10">
        <h1
          className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-heading)] mb-4"
          style={{ color: 'var(--text-primary)' }}
        >
          Scam Message Checker
        </h1>
        <p className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          Got a suspicious text, email, or chat message? Paste it below. We will scan it for the red flags scammers use
          most often and give you a clear risk score — with the exact warning signs spelled out in plain English.
        </p>
      </header>

      {/* Tool */}
      <section className="mb-14">
        <ScamMessageCheckerClient />
      </section>

      {/* Explainer — how it works, ~400 words */}
      <section className="mb-12 prose-lg max-w-none">
        <h2
          className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-4"
          style={{ color: 'var(--text-primary)' }}
        >
          How the checker decides a message is suspicious
        </h2>

        <div className="space-y-5 text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          <p>
            Scam messages are not random. Year after year, the FBI&rsquo;s Internet Crime Complaint Center (IC3), the US
            Federal Trade Commission, UK&rsquo;s Action Fraud, and Australia&rsquo;s Scamwatch all report the same
            patterns. Scammers reuse them because they work. This tool looks for those patterns in the message you
            paste.
          </p>

          <p>
            The biggest red flag is <strong>any request for a one-time code (OTP) or verification number</strong>. Real
            banks, tech companies, and government offices never ask you to read back a code from a text — if someone is
            asking, they are trying to break into your account. Close to that is{' '}
            <strong>a demand to pay with gift cards, wire transfer, or cryptocurrency</strong>. No legitimate debt
            collector, family emergency, or IRS agent will ever ask for Apple or Google Play cards. That one line alone
            is enough to confirm a scam.
          </p>

          <p>
            The checker also watches for <strong>manufactured urgency</strong> (&ldquo;act within 60 minutes&rdquo;,
            &ldquo;last chance&rdquo;, &ldquo;account will be suspended today&rdquo;), <strong>threat language</strong>{' '}
            (&ldquo;warrant for your arrest&rdquo;, &ldquo;deportation&rdquo;, &ldquo;legal action&rdquo;), and{' '}
            <strong>any text claiming to be from the IRS, Medicare, HMRC, or the ATO</strong>. These agencies write
            letters — they do not send you links. Generic greetings like &ldquo;Dear Customer&rdquo; and{' '}
            <strong>URL shorteners</strong> (bit.ly, tinyurl, random .xyz or .click domains) are medium-severity flags:
            on their own they prove nothing, but combined with urgency or an OTP request they confirm the scam.
          </p>

          <p>
            Finally, the tool looks at <strong>writing style</strong> — excessive ALL CAPS, strings of exclamation
            marks, and requests for personal details like your Social Security Number, bank account, or mother&rsquo;s
            maiden name. A real company already knows who you are; they do not need to ask.
          </p>

          <p>
            Each signal adds to a risk score out of 100. Anything above 30 deserves a pause; above 60 and you should
            delete the message. But remember — no automated tool catches everything. If a message feels wrong but the
            score is low, trust your gut and ask a family member, friend, or your bank before you click or reply.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="mb-12">
        <h2
          className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-6"
          style={{ color: 'var(--text-primary)' }}
        >
          Frequently asked questions
        </h2>
        <div className="space-y-4">
          {faqItems.map((faq, i) => (
            <details
              key={i}
              className="group rounded-xl border overflow-hidden"
              style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-secondary)' }}
            >
              <summary
                className="cursor-pointer list-none p-5 text-lg font-semibold flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800/50"
                style={{ color: 'var(--text-primary)' }}
              >
                <span>{faq.question}</span>
                <span className="ml-3 text-brand-blue transition-transform group-open:rotate-180" aria-hidden>
                  ▾
                </span>
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
          Related safety guides
        </h2>
        <ul className="space-y-3">
          {related.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="text-brand-blue hover:underline font-medium text-lg">
                {item.title} →
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}

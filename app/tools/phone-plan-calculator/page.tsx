import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_URL, SITE_NAME } from '@/lib/utils'
import { breadcrumbJsonLd, faqJsonLd, webApplicationJsonLd } from '@/lib/seo'
import Breadcrumbs from '@/components/Breadcrumbs'
import PhonePlanCalculator from '@/components/PhonePlanCalculator'

const PAGE_URL = `${SITE_URL}/tools/phone-plan-calculator`

export const metadata: Metadata = {
  title: 'Senior Phone Plan Savings Calculator — Find a Cheaper Plan',
  description:
    'Compare your current phone bill against the best senior phone plans from T-Mobile, AT&T, Consumer Cellular, and more. See how much you could save each month.',
  keywords: [
    'senior phone plan calculator',
    'cheapest phone plan for seniors',
    'senior cell phone plan comparison',
    'T-Mobile 55 plus plan',
    'AT&T senior plan',
    'Consumer Cellular plans',
    'best phone plans for seniors 2026',
    'save money on phone bill',
    'phone plan savings calculator',
    'Lively phone plan',
    'Mint Mobile for seniors',
  ],
  openGraph: {
    type: 'website',
    url: PAGE_URL,
    title: 'Senior Phone Plan Savings Calculator',
    description: 'Compare your phone bill against senior plans and find out how much you could save.',
    siteName: SITE_NAME,
    images: [{
      url: `${SITE_URL}/api/og?title=${encodeURIComponent('Phone Plan Savings Calculator')}`,
      width: 1200, height: 630, alt: 'Phone Plan Calculator',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Senior Phone Plan Savings Calculator',
    description: 'Find out if you\'re overpaying for your phone plan.',
  },
  alternates: { canonical: PAGE_URL },
}

const faqItems = [
  {
    question: 'What is the cheapest phone plan for seniors?',
    answer: 'Mint Mobile offers plans starting at $15/month with 5GB of data, using T-Mobile\'s network. Consumer Cellular starts at $20/month with 1GB. For unlimited data, T-Mobile\'s 55+ Essentials plan at $40/month is the best value.',
  },
  {
    question: 'Do I need an unlimited data plan?',
    answer: 'Most seniors who primarily use their phone for calls, texts, email, and light browsing can get by with 5-10GB of data per month. You only need unlimited if you frequently stream video (Netflix, YouTube) away from WiFi or use your phone as a hotspot.',
  },
  {
    question: 'Will I lose my phone number if I switch?',
    answer: 'No! By law, you can keep your phone number when switching carriers. This is called "number porting" and your new carrier will handle it for you — usually it takes less than 24 hours.',
  },
  {
    question: 'Can I keep my current phone?',
    answer: 'In most cases, yes. Modern phones are usually "unlocked" and work with any carrier. If your phone is more than 5 years old, you may want to check with the new carrier first. They can verify your phone is compatible.',
  },
]

export default function PhonePlanCalculatorPage() {
  const breadcrumbs = [
    { name: 'Home', url: SITE_URL },
    { name: 'Tools', url: `${SITE_URL}/tools` },
    { name: 'Phone Plan Calculator' },
  ]

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(breadcrumbs)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqItems)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationJsonLd({ name: 'Phone Plan Savings Calculator', description: 'A free calculator that helps seniors compare phone plans and find the most affordable option for their usage.', url: `${SITE_URL}/tools/phone-plan-calculator` })) }} />

      <Breadcrumbs items={[
        { label: 'Home', href: '/' },
        { label: 'Tools', href: '/tools' },
        { label: 'Phone Plan Calculator' },
      ]} />

      <section className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-heading)] mb-4" style={{ color: 'var(--text-primary)' }}>
          Phone Plan Savings Calculator
        </h1>
        <p className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          Many seniors overpay for their phone plans by $20-50 per month. Tell us what you&apos;re
          paying now, and we&apos;ll show you senior-friendly plans that could save you money.
        </p>
      </section>

      <section className="mb-12">
        <PhonePlanCalculator />
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
          Related Guides
        </h2>
        <ul className="space-y-3">
          <li><Link href="/phone-plans" className="text-brand-blue hover:underline font-medium">Compare All Senior Phone Plans →</Link></li>
          <li><Link href="/tools/device-quiz" className="text-brand-blue hover:underline font-medium">Which Phone Is Right for Me? Take the Quiz →</Link></li>
          <li><Link href="/senior-discounts" className="text-brand-blue hover:underline font-medium">Browse All Senior Tech Discounts →</Link></li>
        </ul>
      </section>
    </div>
  )
}

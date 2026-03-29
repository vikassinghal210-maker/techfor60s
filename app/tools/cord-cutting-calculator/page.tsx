import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_URL, SITE_NAME } from '@/lib/utils'
import { breadcrumbJsonLd, faqJsonLd } from '@/lib/seo'
import Breadcrumbs from '@/components/Breadcrumbs'
import CordCuttingCalculator from '@/components/CordCuttingCalculator'

const PAGE_URL = `${SITE_URL}/tools/cord-cutting-calculator`

export const metadata: Metadata = {
  title: 'Cord-Cutting Savings Calculator — How Much Can You Save?',
  description:
    'Find out how much you could save by switching from cable TV to streaming services. Our free calculator recommends the best streaming services for your viewing habits. Designed for seniors.',
  keywords: [
    'cord cutting calculator',
    'cancel cable TV savings',
    'streaming vs cable cost',
    'how much can I save cutting the cord',
    'best streaming services for seniors',
    'replace cable with streaming',
    'cord cutting guide for seniors',
    'streaming services comparison',
    'cable TV alternatives',
  ],
  openGraph: {
    type: 'website',
    url: PAGE_URL,
    title: 'Cord-Cutting Calculator — How Much Can You Save?',
    description: 'Find out how much you could save by switching from cable to streaming. Free calculator designed for seniors.',
    siteName: SITE_NAME,
    images: [{
      url: `${SITE_URL}/api/og?title=${encodeURIComponent('Cord-Cutting Savings Calculator')}`,
      width: 1200, height: 630, alt: 'Cord-Cutting Calculator',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cord-Cutting Calculator — How Much Can You Save?',
    description: 'Find out how much you could save by ditching cable for streaming services.',
  },
  alternates: { canonical: PAGE_URL },
}

const faqItems = [
  {
    question: 'What does "cutting the cord" mean?',
    answer: 'Cutting the cord means canceling your traditional cable or satellite TV subscription and switching to internet-based streaming services like Netflix, Hulu, or YouTube TV. Most people save $50-150 per month by making this switch.',
  },
  {
    question: 'Can I still watch live TV without cable?',
    answer: 'Yes! Services like YouTube TV ($72.99/mo), Sling TV ($40/mo), and Fubo ($79.99/mo) offer live TV channels including news, sports, and network shows. You can also get local channels for free with a digital antenna.',
  },
  {
    question: 'What equipment do I need?',
    answer: 'You need an internet connection and a streaming device. If you have a Smart TV made after 2018, streaming apps are already built in. Otherwise, you can use a Roku ($30), Amazon Fire TV Stick ($40), or Apple TV ($130). These plug into your TV\'s HDMI port.',
  },
  {
    question: 'Will I lose my favorite channels?',
    answer: 'Most popular channels and shows are available on streaming services. The biggest exception is some regional sports networks. Use our calculator above to tell us what you watch, and we\'ll recommend services that cover your favorites.',
  },
  {
    question: 'Is it complicated to set up?',
    answer: 'Not at all! Most streaming devices plug in and guide you through setup in under 10 minutes. Each service has a free trial so you can test it before committing. Check out our step-by-step Roku and Fire Stick setup guides.',
  },
]

export default function CordCuttingCalculatorPage() {
  const breadcrumbs = [
    { name: 'Home', url: SITE_URL },
    { name: 'Tools', url: `${SITE_URL}/tools` },
    { name: 'Cord-Cutting Calculator' },
  ]

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(breadcrumbs)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqItems)) }} />

      <Breadcrumbs items={[
        { label: 'Home', href: '/' },
        { label: 'Tools', href: '/tools' },
        { label: 'Cord-Cutting Calculator' },
      ]} />

      <section className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-heading)] mb-4" style={{ color: 'var(--text-primary)' }}>
          Cord-Cutting Savings Calculator
        </h1>
        <p className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          Wondering if you should cancel cable? Tell us what you pay and what you watch, and
          we&apos;ll show you exactly how much you could save with streaming services.
        </p>
      </section>

      <section className="mb-12">
        <CordCuttingCalculator />
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
          <li><Link href="/tools/internet-speed-calculator" className="text-brand-blue hover:underline font-medium">How Much Internet Speed Do I Need? →</Link></li>
          <li><Link href="/tools/phone-plan-calculator" className="text-brand-blue hover:underline font-medium">Phone Plan Savings Calculator →</Link></li>
          <li><Link href="/category/product-reviews" className="text-brand-blue hover:underline font-medium">Browse Product Reviews →</Link></li>
        </ul>
      </section>
    </div>
  )
}

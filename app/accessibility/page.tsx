import type { Metadata } from 'next'
import Link from 'next/link'
import { CONDITIONS } from '@/lib/accessibility-data'
import { SITE_URL } from '@/lib/utils'
import { breadcrumbJsonLd, faqJsonLd } from '@/lib/seo'
import Breadcrumbs from '@/components/Breadcrumbs'

export const metadata: Metadata = {
  title: 'Accessibility Settings Guides — Make Any Device Easier to Use',
  description:
    'Step-by-step accessibility settings for seniors with low vision, hearing loss, arthritis, tremors, macular degeneration, and color blindness. Guides for iPhone, iPad, Android, Windows, Mac, and Chromebook.',
  keywords: [
    'accessibility settings for seniors',
    'phone accessibility settings',
    'make phone easier to use',
    'low vision settings',
    'hearing loss phone settings',
    'arthritis phone settings',
    'senior accessibility guide',
    'device accessibility for elderly',
  ],
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/accessibility`,
    title: 'Accessibility Settings Guides — Make Any Device Easier to Use',
    description:
      'Step-by-step accessibility settings for seniors with low vision, hearing loss, arthritis, tremors, and more.',
    siteName: 'TechFor60s',
  },
  alternates: { canonical: `${SITE_URL}/accessibility` },
}

const FAQS = [
  {
    question: 'What are accessibility settings on a phone or computer?',
    answer:
      'Accessibility settings are built-in options on every phone, tablet, and computer that make the device easier to use. They can make text bigger, read the screen aloud, add captions, reduce the need for precise tapping, and much more. Every modern device has them — you just need to turn them on.',
  },
  {
    question: 'How do I make text bigger on my phone?',
    answer:
      'On iPhone, go to Settings, then Accessibility, then Display & Text Size, then Larger Text. On Android, go to Settings, then Accessibility, then Font Size. Both let you slide to your preferred size. Our guides walk you through every step for each device.',
  },
  {
    question: 'Can I control my phone by voice if I have trouble with my hands?',
    answer:
      'Yes! iPhone has Voice Control, Android has Voice Access, Windows has Voice Typing, and Mac has Voice Control. These features let you navigate, type, and tap without touching the screen. Our arthritis and tremor guides show you exactly how to set them up.',
  },
  {
    question: 'Are accessibility settings free?',
    answer:
      'Yes, all the accessibility settings in our guides are completely free. They are built into every iPhone, iPad, Android phone, Windows PC, Mac, and Chromebook. You do not need to download or buy anything extra.',
  },
]

export default function AccessibilityIndexPage() {
  const breadcrumbs = [
    { name: 'Home', url: SITE_URL },
    { name: 'Accessibility Settings' },
  ]

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd(breadcrumbs)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd(FAQS)),
        }}
      />

      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Accessibility Settings' },
        ]}
      />

      {/* Hero */}
      <section className="mb-10">
        <h1
          className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-heading)] mb-4"
          style={{ color: 'var(--text-primary)' }}
        >
          Accessibility Settings Guides
        </h1>
        <p className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          Every phone, tablet, and computer has built-in settings to make it easier to use.
          Choose your condition below and we will show you exactly which settings to turn on,
          step by step, for your specific device.
        </p>
      </section>

      {/* Condition Cards Grid */}
      <section className="mb-10">
        <h2
          className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-6"
          style={{ color: 'var(--text-primary)' }}
        >
          Choose Your Condition
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CONDITIONS.map((condition) => (
            <Link
              key={condition.slug}
              href={`/accessibility/${condition.slug}`}
              className="block rounded-xl border p-5 transition-shadow hover:shadow-md"
              style={{
                backgroundColor: 'var(--bg-primary)',
                borderColor: 'var(--border-color)',
              }}
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">{condition.icon}</span>
                <h3
                  className="text-lg font-bold font-[family-name:var(--font-heading)]"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {condition.name}
                </h3>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                {condition.description}
              </p>
              <span className="inline-block mt-3 text-sm font-medium text-brand-blue">
                View device guides &rarr;
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="mb-10">
        <h2
          className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-6"
          style={{ color: 'var(--text-primary)' }}
        >
          Frequently Asked Questions
        </h2>
        <div className="space-y-5">
          {FAQS.map((faq, i) => (
            <div
              key={i}
              className="rounded-xl border p-5"
              style={{
                backgroundColor: 'var(--bg-secondary)',
                borderColor: 'var(--border-color)',
              }}
            >
              <h3
                className="text-lg font-bold font-[family-name:var(--font-heading)] mb-2"
                style={{ color: 'var(--text-primary)' }}
              >
                {faq.question}
              </h3>
              <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Back to home */}
      <div
        className="text-center pt-4 border-t"
        style={{ borderColor: 'var(--border-color)' }}
      >
        <Link href="/" className="text-brand-blue hover:underline font-medium">
          Back to Home
        </Link>
      </div>
    </div>
  )
}

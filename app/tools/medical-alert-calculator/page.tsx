import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_URL, SITE_NAME } from '@/lib/utils'
import { breadcrumbJsonLd, faqJsonLd, webApplicationJsonLd } from '@/lib/seo'
import Breadcrumbs from '@/components/Breadcrumbs'
import MedicalAlertCalculator from '@/components/MedicalAlertCalculator'

const PAGE_URL = `${SITE_URL}/tools/medical-alert-calculator`

export const metadata: Metadata = {
  title: 'Medical Alert System Comparison Calculator — Find the Best System for You',
  description:
    'Answer 6 simple questions and get personalized medical alert system recommendations. Compare features, prices, and find the best match for your needs. Free tool for seniors and families.',
  keywords: [
    'medical alert system comparison',
    'best medical alert system for seniors',
    'medical alert system calculator',
    'compare medical alert systems',
    'fall detection systems for seniors',
    'personal emergency response system',
    'medical alert system cost comparison',
    'medical guardian vs life alert',
    'cheapest medical alert system',
    'best fall detection device',
    'medical alert for elderly living alone',
    'medical alert system reviews',
  ],
  openGraph: {
    type: 'website',
    url: PAGE_URL,
    title: 'Medical Alert System Comparison Calculator',
    description:
      'Answer 6 simple questions and get personalized medical alert system recommendations with price comparisons.',
    siteName: SITE_NAME,
    images: [
      {
        url: `${SITE_URL}/api/og?title=${encodeURIComponent('Medical Alert System Comparison Calculator')}`,
        width: 1200,
        height: 630,
        alt: 'Medical Alert System Comparison Calculator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Medical Alert System Comparison Calculator',
    description:
      'Find the best medical alert system in minutes. Free comparison tool for seniors and families.',
  },
  alternates: { canonical: PAGE_URL },
}

const faqItems = [
  {
    question: 'How does this medical alert system calculator work?',
    answer:
      'You answer 6 simple questions about your living situation, mobility, desired features, budget, and tech comfort level. Our calculator then matches you with the top 3 medical alert systems that fit your specific needs, complete with pricing, features, and pros and cons.',
  },
  {
    question: 'How much do medical alert systems cost per month?',
    answer:
      'Medical alert systems typically cost between $19.95 and $49.95 per month. Basic in-home systems start around $19.95/month, while GPS-enabled mobile systems with fall detection can cost $35-50/month. Some providers charge extra for fall detection ($5-10/month) and equipment may have a one-time cost.',
  },
  {
    question: 'Do I need fall detection on my medical alert system?',
    answer:
      'Fall detection is highly recommended if you live alone, have balance issues, use a walker or cane, or have a history of falls. Automatic fall detection senses when you fall and contacts the monitoring center even if you cannot press the button yourself. It typically adds $5-10 per month to your plan.',
  },
  {
    question: 'What is the difference between in-home and mobile medical alert systems?',
    answer:
      'In-home systems work within a range of your home base station (usually 600-1,300 feet) and connect through your landline or cellular network. Mobile systems include GPS and cellular connectivity, so they work anywhere — at the grocery store, on a walk, or while traveling. Mobile systems cost more but provide protection wherever you go.',
  },
  {
    question: 'Can I try a medical alert system before committing?',
    answer:
      'Yes, most medical alert companies offer a 30-day money-back guarantee or trial period. Bay Alarm Medical, Medical Guardian, and MobileHelp all offer 30-day trials. We recommend testing the system thoroughly during this period — press the button to test response time, wear it in the shower if it is waterproof, and make sure it works in all areas of your home.',
  },
  {
    question: 'Are medical alert systems covered by Medicare or insurance?',
    answer:
      'Standard Medicare does not cover medical alert systems. However, some Medicare Advantage plans and Medicaid programs in certain states do provide coverage. Veterans may be eligible through VA benefits. Check with your specific insurance plan, and ask the medical alert provider if they work with any insurance programs.',
  },
]

export default function MedicalAlertCalculatorPage() {
  const breadcrumbs = [
    { name: 'Home', url: SITE_URL },
    { name: 'Tools', url: `${SITE_URL}/tools` },
    { name: 'Medical Alert Calculator' },
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
              name: 'Medical Alert System Comparison Calculator',
              description:
                'A free interactive tool that helps seniors and families compare medical alert systems based on living situation, mobility, features, budget, and tech comfort level.',
              url: PAGE_URL,
              category: 'HealthApplication',
            })
          ),
        }}
      />

      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Tools', href: '/tools' },
          { label: 'Medical Alert Calculator' },
        ]}
      />

      {/* Hero */}
      <section className="mb-10">
        <h1
          className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-heading)] mb-4"
          style={{ color: 'var(--text-primary)' }}
        >
          Medical Alert System Comparison Calculator
        </h1>
        <p className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          Not sure which medical alert system is right for you or your loved one? Answer 6 quick questions
          and we&apos;ll recommend the <strong>top 3 systems</strong> that match your needs, budget, and
          lifestyle — with prices, features, and honest pros and cons.
        </p>
      </section>

      {/* Tool */}
      <section className="mb-12">
        <MedicalAlertCalculator />
      </section>

      {/* Why Trust Section */}
      <section className="mb-12">
        <h2
          className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-6"
          style={{ color: 'var(--text-primary)' }}
        >
          Why a Medical Alert System Matters
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            {
              title: 'Falls Are the #1 Risk',
              desc: 'One in four adults over 65 falls each year. A medical alert system ensures help arrives fast, even if you cannot reach a phone.',
            },
            {
              title: 'Peace of Mind for Families',
              desc: 'Adult children consistently report less worry and stress when a parent wears a medical alert device, especially if they live alone.',
            },
            {
              title: 'Faster Emergency Response',
              desc: 'Medical alert users receive help an average of 7 minutes faster than those who call 911 after a fall.',
            },
            {
              title: 'Independence at Home',
              desc: 'Medical alerts help seniors stay in their own homes longer. 90% of seniors want to age in place — a medical alert makes that safer.',
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
                <span className="ml-2 text-brand-blue transition-transform group-open:rotate-180">
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
          Related Guides
        </h2>
        <ul className="space-y-3">
          <li>
            <Link
              href="/blog/best-medical-alert-systems-2026"
              className="text-brand-blue hover:underline font-medium"
            >
              Best Medical Alert Systems for Seniors (2026 Guide) →
            </Link>
          </li>
          <li>
            <Link
              href="/blog/best-fall-detection-devices-for-seniors"
              className="text-brand-blue hover:underline font-medium"
            >
              Best Fall Detection Devices for Seniors →
            </Link>
          </li>
          <li>
            <Link
              href="/category/health-wellness"
              className="text-brand-blue hover:underline font-medium"
            >
              Browse All Health & Wellness Articles →
            </Link>
          </li>
          <li>
            <Link href="/tools" className="text-brand-blue hover:underline font-medium">
              Explore All Free Tools →
            </Link>
          </li>
        </ul>
      </section>
    </div>
  )
}

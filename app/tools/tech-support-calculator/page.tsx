import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_URL, SITE_NAME } from '@/lib/utils'
import { breadcrumbJsonLd, faqJsonLd, webApplicationJsonLd } from '@/lib/seo'
import Breadcrumbs from '@/components/Breadcrumbs'
import TechSupportCalculator from '@/components/TechSupportCalculator'

const PAGE_URL = `${SITE_URL}/tools/tech-support-calculator`

export const metadata: Metadata = {
  title: 'Family Tech Support Cost Calculator — How Much Is It Really Costing You?',
  description:
    'Calculate the hidden cost of helping your elderly parents with technology. See your annual time and travel costs, compare professional alternatives, and get personalized recommendations.',
  keywords: [
    'tech support cost calculator',
    'family tech support cost',
    'helping parents with technology',
    'cost of helping elderly parents',
    'tech support for parents',
    'caregiver burnout technology',
    'geek squad vs family help',
    'professional tech support seniors',
    'family tech support alternatives',
    'hidden cost tech support',
  ],
  openGraph: {
    type: 'website',
    url: PAGE_URL,
    title: 'Family Tech Support Cost Calculator',
    description:
      'Calculate the hidden cost of DIY tech support for elderly parents. Compare with professional alternatives.',
    siteName: SITE_NAME,
    images: [
      {
        url: `${SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Family Tech Support Cost Calculator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Family Tech Support Cost Calculator',
    description:
      'Calculate the hidden cost of DIY tech support for elderly parents.',
  },
  alternates: { canonical: PAGE_URL },
}

const faqItems = [
  {
    question: 'How does this calculator work?',
    answer:
      'The calculator estimates the true cost of providing tech support by multiplying your weekly hours by your hourly value, then adding travel costs. It uses a simple formula: (hours/week x 52 weeks x hourly rate) + (visits/year x travel time x hourly rate) + (visits/year x gas cost).',
  },
  {
    question: 'What hourly value should I use?',
    answer:
      'Use your actual hourly wage if you work hourly, or divide your annual salary by 2,080 (52 weeks x 40 hours). If you are retired, consider what your time is worth to you - many retirees value their time at $25-50/hour. If unsure, we use $30/hour as a conservative national average.',
  },
  {
    question: 'Is it wrong to put a price on helping family?',
    answer:
      'Not at all. This calculator is not about being selfish - it is about awareness. Understanding the true cost helps you make informed decisions. Maybe you will decide the time is worth it. Or maybe you will find a professional service that handles the frustrating parts while you focus on quality time with your parent.',
  },
  {
    question: 'What are the best professional tech support options for seniors?',
    answer:
      'Popular options include Geek Squad Total Tech Support ($200/year for unlimited phone and chat support), AARP Tech Support powered by Allstate ($5/month), HelloTech for in-home visits ($50-100/visit), and free resources like Senior Planet classes and TechFor60s.com guides.',
  },
  {
    question: 'How can I reduce how much tech support my parent needs?',
    answer:
      'Focus on teaching independence rather than doing tasks for them. Set up their devices with simplified home screens, enable automatic updates, bookmark important websites, and share our free TechFor60s guides. Teaching a senior to check scams themselves using our Scam Checker tool eliminates one of the most common support requests.',
  },
  {
    question: 'What is caregiver burnout from tech support?',
    answer:
      'Tech support caregiver burnout happens when the emotional and time demands of constantly helping a loved one with technology become overwhelming. Signs include dreading phone calls, feeling irritable during help sessions, and avoiding visits. If you are experiencing this, it is important to explore professional support options or share the responsibility with other family members.',
  },
]

export default function TechSupportCalculatorPage() {
  const breadcrumbs = [
    { name: 'Home', url: SITE_URL },
    { name: 'Tools', url: `${SITE_URL}/tools` },
    { name: 'Tech Support Cost Calculator' },
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
              name: 'Family Tech Support Cost Calculator',
              description:
                'Calculate the hidden cost of providing DIY tech support for elderly parents. Compare with professional alternatives like Geek Squad, HelloTech, and AARP.',
              url: PAGE_URL,
              category: 'FinanceApplication',
            })
          ),
        }}
      />

      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Tools', href: '/tools' },
          { label: 'Tech Support Cost Calculator' },
        ]}
      />

      {/* Hero */}
      <section className="mb-10">
        <h1
          className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-heading)] mb-4"
          style={{ color: 'var(--text-primary)' }}
        >
          Family Tech Support Cost Calculator
        </h1>
        <p className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          How much is helping your parent with technology <em>really</em> costing you? Most people
          dramatically underestimate the time, money, and emotional energy they spend on family tech
          support. Use this calculator to find out — and discover professional alternatives that
          might save you thousands.
        </p>
      </section>

      {/* Tool */}
      <section className="mb-12">
        <TechSupportCalculator />
      </section>

      {/* Why This Matters */}
      <section className="mb-12">
        <h2
          className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-6"
          style={{ color: 'var(--text-primary)' }}
        >
          Why This Matters
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            {
              title: '156 hours per year',
              desc: 'The average adult child spends 3 hours per week on tech support for a parent — that is 156 hours per year, or nearly four 40-hour work weeks.',
            },
            {
              title: 'Relationship strain',
              desc: 'Repeated tech frustrations can damage the parent-child relationship. Professional help keeps your visits focused on quality time.',
            },
            {
              title: 'Hidden travel costs',
              desc: 'Gas, wear on your car, and the time spent driving add up fast — especially for "quick" visits that turn into 2-hour sessions.',
            },
            {
              title: 'Opportunity cost',
              desc: 'Every hour spent troubleshooting WiFi is an hour not spent on your career, hobbies, family, or rest. Your time has real value.',
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
          Related Guides & Tools
        </h2>
        <ul className="space-y-3">
          <li>
            <Link
              href="/blog/how-to-teach-seniors-to-use-technology"
              className="text-brand-blue hover:underline font-medium"
            >
              How to Teach Seniors to Use Technology →
            </Link>
          </li>
          <li>
            <Link
              href="/blog/setting-up-parents-phone-remotely"
              className="text-brand-blue hover:underline font-medium"
            >
              Setting Up a Parent&apos;s Phone Remotely →
            </Link>
          </li>
          <li>
            <Link
              href="/tools/scam-checker"
              className="text-brand-blue hover:underline font-medium"
            >
              Is This a Scam? — Free Scam Checker Tool →
            </Link>
          </li>
          <li>
            <Link
              href="/tools/device-quiz"
              className="text-brand-blue hover:underline font-medium"
            >
              Best Device Quiz for Seniors →
            </Link>
          </li>
          <li>
            <Link href="/tools" className="text-brand-blue hover:underline font-medium">
              Browse All Free Tools →
            </Link>
          </li>
        </ul>
      </section>
    </div>
  )
}

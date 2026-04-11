import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_URL, SITE_NAME } from '@/lib/utils'
import { breadcrumbJsonLd, faqJsonLd, webApplicationJsonLd } from '@/lib/seo'
import Breadcrumbs from '@/components/Breadcrumbs'
import ParentSafetyAudit from '@/components/ParentSafetyAudit'

const PAGE_URL = `${SITE_URL}/tools/parent-safety-audit`

export const metadata: Metadata = {
  title: 'Is My Parent OK? — Free Safety Audit for Elderly Parents',
  description:
    'Take this free 2-minute safety assessment to check if your elderly parent has the right tech safety measures in place. Get personalized recommendations.',
  keywords: [
    'is my parent ok',
    'elderly parent safety checklist',
    'senior safety assessment',
    'parent safety audit',
    'elderly parent tech safety',
    'keeping elderly parent safe',
    'senior living alone safety',
    'elder care safety checklist',
    'aging parent safety tips',
    'tech safety for elderly parents',
    'senior safety quiz',
    'parent safety tool',
  ],
  openGraph: {
    type: 'website',
    url: PAGE_URL,
    title: 'Is My Parent OK? — Free Safety Audit Tool',
    description:
      'A free 2-minute assessment to check your elderly parent\'s tech safety setup and get personalized recommendations.',
    siteName: SITE_NAME,
    images: [
      {
        url: `${SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Parent Safety Audit Tool',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Is My Parent OK? — Free Safety Audit Tool',
    description:
      'Check your elderly parent\'s tech safety in 2 minutes. Free, private, and personalized.',
  },
  alternates: { canonical: PAGE_URL },
}

const faqItems = [
  {
    question: 'How does the parent safety audit work?',
    answer:
      'The audit asks 5 simple questions about your parent\'s living situation, technology use, health concerns, communication frequency, and existing safety measures. Based on your answers, it generates a safety score and personalized recommendations prioritized by urgency.',
  },
  {
    question: 'Is this assessment private?',
    answer:
      'Yes, completely. Everything runs in your web browser. Your answers are never sent to any server — we never see, store, or share any information about your parent.',
  },
  {
    question: 'What does the safety score mean?',
    answer:
      'The score ranges from 0 to 100. A score below 30 is Critical (significant gaps), 30-55 is Needs Attention, 56-80 is Good, and above 80 is Excellent. The score reflects how well-protected your parent is based on their living situation and health needs.',
  },
  {
    question: 'What is the most important safety measure for a senior living alone?',
    answer:
      'A medical alert system is the single most important safety measure for seniors living alone. It provides a way to call for help 24/7, even if they can\'t reach a phone. Modern devices include automatic fall detection, GPS tracking, and two-way communication.',
  },
  {
    question: 'My parent refuses to use technology. What can I do?',
    answer:
      'Start with passive solutions that require no effort from your parent — like a medical alert pendant, a smart speaker for voice calls, or motion sensors that alert you to unusual activity. Focus on one thing at a time, and frame technology as a way to maintain independence rather than a burden.',
  },
  {
    question: 'How often should I retake this assessment?',
    answer:
      'We recommend retaking the audit every 3-6 months, or whenever your parent\'s living situation, health, or technology use changes significantly. Safety needs evolve over time, and staying proactive is the best approach.',
  },
]

export default function ParentSafetyAuditPage() {
  const breadcrumbs = [
    { name: 'Home', url: SITE_URL },
    { name: 'Tools', url: `${SITE_URL}/tools` },
    { name: 'Parent Safety Audit' },
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
              name: 'Parent Safety Audit',
              description:
                'A free interactive assessment that evaluates elderly parent safety across technology, health, and living situation factors, providing a personalized safety score and prioritized recommendations.',
              url: PAGE_URL,
              category: 'HealthApplication',
            }),
          ),
        }}
      />

      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Tools', href: '/tools' },
          { label: 'Parent Safety Audit' },
        ]}
      />

      {/* Hero */}
      <section className="mb-10">
        <h1
          className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-heading)] mb-4"
          style={{ color: 'var(--text-primary)' }}
        >
          Is My Parent OK? — Safety Audit
        </h1>
        <p className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          Worried about your elderly parent&apos;s safety? This free 2-minute assessment checks
          their tech safety setup and gives you a personalized action plan.{' '}
          <strong>Everything stays completely private</strong> — your answers never leave your device.
        </p>
      </section>

      {/* Tool */}
      <section className="mb-12">
        <ParentSafetyAudit />
      </section>

      {/* Why This Matters */}
      <section className="mb-12">
        <h2
          className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-6"
          style={{ color: 'var(--text-primary)' }}
        >
          Why Tech Safety Matters for Seniors
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            {
              title: 'Falls Are the #1 Risk',
              desc: 'Every year, 1 in 4 adults over 65 experiences a fall. A medical alert device can be the difference between a quick recovery and a life-threatening situation.',
            },
            {
              title: 'Seniors Lose $4.8B to Scams',
              desc: 'Adults over 60 lost $4.8 billion to cybercrime in 2024. Simple protections like call blocking and scam awareness training can prevent most attacks.',
            },
            {
              title: 'Loneliness Impacts Health',
              desc: 'Social isolation is as harmful as smoking 15 cigarettes a day. Regular tech-enabled check-ins help seniors stay connected and mentally sharp.',
            },
            {
              title: 'Independence with Safety',
              desc: 'The right technology setup lets your parent maintain their independence while giving you peace of mind. It\'s not about control — it\'s about care.',
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-xl border p-5"
              style={{
                backgroundColor: 'var(--bg-secondary)',
                borderColor: 'var(--border-color)',
              }}
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
          Related Safety Resources
        </h2>
        <ul className="space-y-3">
          <li>
            <Link
              href="/blog/best-medical-alert-systems-2026"
              className="text-brand-blue hover:underline font-medium"
            >
              Best Medical Alert Systems for 2026 →
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
              href="/blog/remote-monitoring-devices-for-elderly-parents"
              className="text-brand-blue hover:underline font-medium"
            >
              Remote Monitoring Devices for Elderly Parents →
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
              href="/category/safety-security"
              className="text-brand-blue hover:underline font-medium"
            >
              Browse All Safety & Security Articles →
            </Link>
          </li>
        </ul>
      </section>
    </div>
  )
}

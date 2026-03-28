import type { Metadata } from 'next'
import { SITE_URL, SITE_NAME } from '@/lib/utils'
import { breadcrumbJsonLd, faqJsonLd } from '@/lib/seo'
import Breadcrumbs from '@/components/Breadcrumbs'
import DeviceQuiz from '@/components/DeviceQuiz'
import Link from 'next/link'

const PAGE_URL = `${SITE_URL}/tools/device-quiz`

export const metadata: Metadata = {
  title: 'Which Device Is Right for You? — Free Quiz for Seniors',
  description:
    'Not sure whether to get an iPhone, Android, or tablet? Take our free 2-minute quiz designed for seniors and get a personalized device recommendation based on your needs and budget.',
  keywords: [
    'best phone for seniors quiz',
    'which tablet should I buy senior',
    'device recommendation quiz for seniors',
    'best smartphone for elderly',
    'iphone or android for seniors',
    'tablet vs phone for seniors',
    'senior device buying guide',
    'easy phone for older adults',
  ],
  openGraph: {
    type: 'website',
    url: PAGE_URL,
    title: 'Which Device Is Right for You? — Free Quiz for Seniors',
    description:
      'Take our free 2-minute quiz and get a personalized phone or tablet recommendation based on your needs.',
    siteName: SITE_NAME,
    images: [
      {
        url: `${SITE_URL}/api/og?title=${encodeURIComponent('Which Device Is Right for You?')}`,
        width: 1200,
        height: 630,
        alt: 'Device Quiz for Seniors',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Which Device Is Right for You? — Free Quiz',
    description:
      'Take our free 2-minute quiz and get a personalized phone or tablet recommendation.',
  },
  alternates: { canonical: PAGE_URL },
}

const faqItems = [
  {
    question: 'How do I know if I need a phone or a tablet?',
    answer:
      'It depends on how you plan to use it. If you mainly want to make calls and take it everywhere, a phone is best. If you prefer a bigger screen for reading, watching videos, or video calls, a tablet might be the better choice. Many people find having both works well - a phone for on-the-go and a tablet for home use.',
  },
  {
    question: 'Is an iPhone easier to use than an Android phone?',
    answer:
      'Both can be easy to use! iPhones are known for their consistent, simple interface and strong security. Android phones offer more variety in price and features, and Samsung phones have a helpful "Easy Mode" designed for simplicity. The best choice often depends on what your family uses - it is easier to get help from people using the same type of phone.',
  },
  {
    question: 'How much should I spend on a phone or tablet?',
    answer:
      'You can get a very good device for $200-$400. You do not need the most expensive phone to do everyday tasks like calling, texting, browsing the web, and taking photos. Budget-friendly options from Samsung, Motorola, and Google work wonderfully for most seniors.',
  },
  {
    question: 'Should I buy a refurbished device to save money?',
    answer:
      'Refurbished devices can be an excellent way to save money. Look for "certified refurbished" products from the manufacturer (like Apple Certified Refurbished) or trusted retailers. These devices are tested, cleaned, and come with a warranty - often saving you 20-40% compared to buying new.',
  },
  {
    question: 'What features matter most for seniors choosing a device?',
    answer:
      'The most important features are: screen size and brightness (bigger and brighter is easier to read), battery life (look for all-day battery), camera quality (for photos of family and video calls), ease of use (simple menus and accessibility options), and good customer support. Physical features like weight and button placement also matter for comfort.',
  },
]

const jsonLdFaqs = [
  {
    question: 'What is the best phone for seniors in 2026?',
    answer:
      'The best phone depends on your needs and budget. For simplicity, the iPhone SE is excellent. For value, the Samsung Galaxy A16 or Google Pixel 8a are great choices. Take our free quiz above to get a personalized recommendation.',
  },
  {
    question: 'Should a senior get a tablet or a smartphone?',
    answer:
      'If you want a device for reading, watching videos, and video calls at home, a tablet is ideal. If you need something portable for calls, texts, and navigation on the go, a smartphone is better. Many seniors benefit from having both.',
  },
  {
    question: 'Is iPhone or Android better for elderly users?',
    answer:
      'Both platforms work well for seniors. iPhones offer a simpler, more consistent experience with strong security. Android phones provide more price options and Samsung\'s Easy Mode is specifically designed for simplicity. Choose based on your budget and what your family uses.',
  },
]

export default function DeviceQuizPage() {
  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: 'Home', url: SITE_URL },
              { name: 'Tools', url: `${SITE_URL}/tools` },
              { name: 'Device Quiz', url: PAGE_URL },
            ])
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd(jsonLdFaqs)),
        }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Tools', href: '/tools' },
            { label: 'Device Quiz' },
          ]}
        />

        {/* Hero Section */}
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-heading)] text-brand-dark mb-4">
            Which Device Is Right for You?
          </h1>
          <p className="text-lg sm:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto mb-2">
            Not sure whether to get a phone or tablet? iPhone or Android? Take our free
            2-minute quiz and get a personalized recommendation.
          </p>
          <p className="text-sm text-[var(--text-muted)]">
            No sign-up required. Your answers are not stored or shared.
          </p>
        </div>

        {/* Quiz Component */}
        <DeviceQuiz />

        {/* FAQ Section */}
        <section className="mt-16 mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold font-[family-name:var(--font-heading)] text-[var(--text-primary)] mb-6 text-center">
            Common Questions About Choosing a Device
          </h2>

          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <details
                key={index}
                className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] overflow-hidden group"
              >
                <summary className="flex items-center justify-between gap-3 p-4 sm:p-5 cursor-pointer hover:bg-[var(--bg-tertiary)] transition-colors list-none [&::-webkit-details-marker]:hidden">
                  <span className="font-semibold text-[var(--text-primary)] text-sm sm:text-base pr-2">
                    {item.question}
                  </span>
                  <svg
                    className="w-5 h-5 shrink-0 text-[var(--text-muted)] transition-transform duration-200 group-open:rotate-180"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-4 sm:px-5 pb-4 sm:pb-5 text-[var(--text-secondary)] text-sm sm:text-base leading-relaxed">
                  {item.answer}
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* Related Articles */}
        <section className="mt-12 mb-8 p-6 sm:p-8 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-color)]">
          <h2 className="text-xl sm:text-2xl font-bold font-[family-name:var(--font-heading)] text-[var(--text-primary)] mb-4">
            Related Guides
          </h2>
          <p className="text-[var(--text-secondary)] mb-5">
            Want to dive deeper? Check out our detailed buying guides:
          </p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <Link
              href="/blog/best-smartphones-for-seniors-2026"
              className="flex items-center gap-2 p-4 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] hover:border-brand-blue hover:shadow-sm transition-all text-brand-blue font-medium text-sm sm:text-base"
            >
              <span aria-hidden="true">📱</span>
              Best Smartphones for Seniors 2026
            </Link>
            <Link
              href="/blog/best-tablets-for-seniors-2026"
              className="flex items-center gap-2 p-4 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] hover:border-brand-blue hover:shadow-sm transition-all text-brand-blue font-medium text-sm sm:text-base"
            >
              <span aria-hidden="true">📋</span>
              Best Tablets for Seniors 2026
            </Link>
            <Link
              href="/blog/iphone-vs-android-for-seniors"
              className="flex items-center gap-2 p-4 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] hover:border-brand-blue hover:shadow-sm transition-all text-brand-blue font-medium text-sm sm:text-base sm:col-span-2 lg:col-span-1"
            >
              <span aria-hidden="true">🔄</span>
              iPhone vs Android for Seniors
            </Link>
          </div>
        </section>
      </div>
    </>
  )
}

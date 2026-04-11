import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_URL, SITE_NAME } from '@/lib/utils'
import { breadcrumbJsonLd, faqJsonLd } from '@/lib/seo'
import Breadcrumbs from '@/components/Breadcrumbs'
import GiftFinder from '@/components/GiftFinder'
import { OCCASIONS, PRICE_RANGES } from '@/lib/gifts-data'

const PAGE_URL = `${SITE_URL}/gifts`

export const metadata: Metadata = {
  title: 'Best Tech Gifts for Seniors (2026) — Interactive Gift Finder',
  description:
    'Find the perfect tech gift for the senior in your life. Our interactive gift finder helps you choose smartphones, tablets, smart home devices, and more based on budget, occasion, and tech comfort level.',
  keywords: [
    'tech gifts for seniors',
    'best tech gifts for elderly',
    'tech gifts for grandparents',
    'senior tech gift guide 2026',
    'tech gifts for mom',
    'tech gifts for dad',
    'easy tech gifts for seniors',
    'tech gifts for non techy seniors',
    'retirement tech gifts',
    'christmas tech gifts seniors',
  ],
  openGraph: {
    type: 'website',
    url: PAGE_URL,
    title: 'Best Tech Gifts for Seniors (2026) — Interactive Gift Finder',
    description:
      'Find the perfect tech gift for seniors with our interactive finder. Filter by occasion, budget, and comfort level.',
    siteName: SITE_NAME,
    images: [
      {
        url: `${SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Tech Gift Finder for Seniors — TechFor60s',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Tech Gifts for Seniors (2026) — Gift Finder',
    description:
      'Find the perfect tech gift with our interactive gift finder designed for seniors.',
  },
  alternates: { canonical: PAGE_URL },
}

const faqItems = [
  {
    question: 'What is the best tech gift for a senior who is not tech-savvy?',
    answer:
      'For seniors who are new to technology, the best gifts are ones that require minimal setup and are intuitive to use. The Amazon Echo Show 8 is our top pick — they can make video calls, listen to music, and get answers just by speaking. Digital photo frames like the Skylight frame are also wonderful because family members send photos directly to it.',
  },
  {
    question: 'How much should I spend on a tech gift for an older adult?',
    answer:
      'You can find excellent tech gifts at every price point. Under $25, consider a phone screen magnifier or wireless charging stand. Under $50, a Roku Streaming Stick or Bluetooth speaker is great. Under $100, a Fitbit or digital photo frame makes a thoughtful gift. For $200+, consider an iPad, Kindle Paperwhite, or Apple Watch SE with fall detection.',
  },
  {
    question: 'What tech gifts help seniors stay connected with family?',
    answer:
      'The best gifts for staying connected include the Amazon Echo Show (video calls by voice command), a digital photo frame (family shares photos remotely), an iPad or tablet (for FaceTime and Zoom), and the Apple Watch SE (for quick calls and texts from the wrist). Smart displays are especially popular because they require no technical knowledge.',
  },
  {
    question: 'Are there tech gifts that can help with senior safety?',
    answer:
      'Absolutely. The Apple Watch SE has fall detection and Emergency SOS. Medical alert devices like the Medical Guardian Mini provide 24/7 emergency response. Tile trackers help find lost keys and wallets. The Ring Video Doorbell lets seniors see visitors without opening the door. Smart pill dispensers ensure medications are taken on schedule and alert family if a dose is missed.',
  },
]

const jsonLdFaqs = faqItems.map((item) => ({
  question: item.question,
  answer: item.answer,
}))

export default function GiftsPage() {
  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: 'Home', url: SITE_URL },
              { name: 'Tech Gift Finder', url: PAGE_URL },
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

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Tech Gift Finder' },
          ]}
        />

        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-heading)] text-brand-dark mb-4">
            Tech Gift Finder for Seniors
          </h1>
          <p className="text-lg sm:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto mb-3">
            Finding the right tech gift for Mom, Dad, or Grandma does not have to be
            stressful. Answer a few quick questions and we will show you the best
            options they will actually love and use.
          </p>
          <p className="text-sm text-[var(--text-muted)]">
            Curated by our team. Updated for 2026. No sign-up required.
          </p>
        </div>

        {/* Interactive Gift Finder */}
        <section className="mb-16 p-4 sm:p-8 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-secondary)]">
          <GiftFinder />
        </section>

        {/* Browse by Occasion */}
        <section className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold font-[family-name:var(--font-heading)] text-[var(--text-primary)] mb-6">
            Browse by Occasion
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {OCCASIONS.map((occ) => (
              <Link
                key={occ.slug}
                href={`/gifts/${occ.slug}`}
                className="flex flex-col items-center gap-2 p-4 sm:p-5 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-primary)] hover:border-brand-blue hover:shadow-md transition-all text-center group"
              >
                <span className="text-2xl sm:text-3xl" aria-hidden="true">
                  {occ.emoji}
                </span>
                <span className="font-semibold text-sm sm:text-base text-[var(--text-primary)] group-hover:text-brand-blue transition-colors">
                  {occ.label}
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Browse by Budget */}
        <section className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold font-[family-name:var(--font-heading)] text-[var(--text-primary)] mb-6">
            Browse by Budget
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
            {PRICE_RANGES.map((range) => (
              <Link
                key={range.slug}
                href={`/gifts/budget/${range.slug}`}
                className="flex items-center justify-center gap-2 p-4 sm:p-5 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-primary)] hover:border-brand-blue hover:shadow-md transition-all text-center group"
              >
                <span className="font-semibold text-sm sm:text-base text-[var(--text-primary)] group-hover:text-brand-blue transition-colors">
                  {range.label}
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold font-[family-name:var(--font-heading)] text-[var(--text-primary)] mb-6 text-center">
            Common Questions About Tech Gifts for Seniors
          </h2>
          <div className="space-y-4 max-w-3xl mx-auto">
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

        {/* Related Links */}
        <section className="p-6 sm:p-8 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-color)]">
          <h2 className="text-xl sm:text-2xl font-bold font-[family-name:var(--font-heading)] text-[var(--text-primary)] mb-4">
            Related Guides
          </h2>
          <p className="text-[var(--text-secondary)] mb-5">
            Want to dive deeper? Check out our detailed gift and buying guides:
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            <Link
              href="/blog/best-tech-gifts-for-seniors-2026"
              className="flex items-center gap-2 p-4 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] hover:border-brand-blue hover:shadow-sm transition-all text-brand-blue font-medium text-sm sm:text-base"
            >
              <span aria-hidden="true">🎁</span>
              Best Tech Gifts for Seniors 2026
            </Link>
            <Link
              href="/tools/device-quiz"
              className="flex items-center gap-2 p-4 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] hover:border-brand-blue hover:shadow-sm transition-all text-brand-blue font-medium text-sm sm:text-base"
            >
              <span aria-hidden="true">📱</span>
              Which Device Is Right for You? Quiz
            </Link>
          </div>
        </section>
      </div>
    </>
  )
}

import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_URL } from '@/lib/utils'
import { breadcrumbJsonLd } from '@/lib/seo'
import Breadcrumbs from '@/components/Breadcrumbs'
import PlanFilter from '@/components/PlanFilter'
import {
  getAllPlans,
  getCarriers,
  PLAN_CATEGORIES,
} from '@/lib/phone-plans-data'

export const metadata: Metadata = {
  title: 'Best Phone Plans for Seniors (2026) — Compare Plans & Prices',
  description:
    'Compare 25+ phone plans side by side. Find the best cell phone plan for seniors with clear pricing, senior discounts, and plain-English explanations of every feature.',
  keywords: [
    'best phone plans for seniors',
    'senior cell phone plans 2026',
    'cheap phone plans for elderly',
    '55+ phone plans comparison',
    'AARP phone plans',
    'senior mobile plans',
  ],
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/phone-plans`,
    title: 'Best Phone Plans for Seniors (2026) — Compare Plans & Prices',
    description:
      'Compare 25+ phone plans side by side. Find the best cell phone plan for seniors with clear pricing, senior discounts, and plain-English explanations.',
    siteName: 'TechFor60s',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Phone Plans for Seniors (2026)',
    description:
      'Compare 25+ phone plans side by side. Clear pricing, senior discounts, plain-English explanations.',
  },
  alternates: { canonical: `${SITE_URL}/phone-plans` },
}

export default function PhonePlansPage() {
  const plans = getAllPlans()
  const carriers = getCarriers()

  const breadcrumbs = [
    { name: 'Home', url: SITE_URL },
    { name: 'Phone Plans for Seniors', url: `${SITE_URL}/phone-plans` },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd(breadcrumbs)),
        }}
      />

      <Breadcrumbs
        items={[{ label: 'Home', href: '/' }, { label: 'Phone Plans' }]}
      />

      {/* Hero Section */}
      <div className="text-center mb-10">
        <h1
          className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 font-[family-name:var(--font-heading)]"
          style={{ color: 'var(--text-primary)' }}
        >
          Best Phone Plans for Seniors (2026)
        </h1>
        <p
          className="text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed"
          style={{ color: 'var(--text-secondary)' }}
        >
          Choosing a phone plan can be confusing. We compared {plans.length}{' '}
          plans from {carriers.length} carriers and explain everything in plain
          English — no jargon, no tricks. Find the right plan for{' '}
          <strong>your</strong> needs and budget below.
        </p>
      </div>

      {/* Quick Tips Box */}
      <div
        className="rounded-xl border p-5 sm:p-6 mb-10"
        style={{
          backgroundColor: 'var(--bg-tertiary)',
          borderColor: 'var(--border-color)',
        }}
      >
        <h2
          className="text-xl font-bold mb-3 font-[family-name:var(--font-heading)]"
          style={{ color: 'var(--text-primary)' }}
        >
          Quick Guide: What Do These Terms Mean?
        </h2>
        <div
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm"
          style={{ color: 'var(--text-secondary)' }}
        >
          <div>
            <p className="font-semibold" style={{ color: 'var(--text-primary)' }}>
              Data (GB)
            </p>
            <p>
              &ldquo;Data&rdquo; is what your phone uses to browse the internet,
              check email, watch videos, or use apps when you are not connected
              to Wi-Fi. 1 GB is enough for about 1,000 emails or 2 hours of web
              browsing.
            </p>
          </div>
          <div>
            <p className="font-semibold" style={{ color: 'var(--text-primary)' }}>
              Hotspot
            </p>
            <p>
              A hotspot lets you share your phone&apos;s internet connection with
              a tablet or laptop — like carrying a small Wi-Fi router in your
              pocket.
            </p>
          </div>
          <div>
            <p className="font-semibold" style={{ color: 'var(--text-primary)' }}>
              5G vs. 4G LTE
            </p>
            <p>
              5G is a newer, faster type of cell signal. 4G LTE is still plenty
              fast for most tasks. Both work well for calls, texts, and
              browsing.
            </p>
          </div>
          <div>
            <p className="font-semibold" style={{ color: 'var(--text-primary)' }}>
              No Contract
            </p>
            <p>
              Means you can cancel anytime without paying a penalty. You are not
              locked in for a year or two like the old days.
            </p>
          </div>
        </div>
      </div>

      {/* Filterable Plan Listing */}
      <PlanFilter plans={plans} />

      {/* Browse by Carrier */}
      <section className="mt-16 mb-12">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-6 font-[family-name:var(--font-heading)]"
          style={{ color: 'var(--text-primary)' }}
        >
          Browse Plans by Carrier
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {carriers.map((carrier) => (
            <Link
              key={carrier.slug}
              href={`/phone-plans/${carrier.slug}`}
              className="rounded-xl border p-4 text-center transition-shadow hover:shadow-lg"
              style={{
                backgroundColor: 'var(--bg-primary)',
                borderColor: 'var(--border-color)',
              }}
            >
              <p
                className="font-bold text-lg font-[family-name:var(--font-heading)]"
                style={{ color: 'var(--text-primary)' }}
              >
                {carrier.name}
              </p>
              <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
                View all plans &rarr;
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Best Plans For... Categories */}
      <section className="mb-12">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-6 font-[family-name:var(--font-heading)]"
          style={{ color: 'var(--text-primary)' }}
        >
          Best Plans For...
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {PLAN_CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/phone-plans/best-for/${cat.slug}`}
              className="rounded-xl border p-5 transition-shadow hover:shadow-lg"
              style={{
                backgroundColor: 'var(--bg-primary)',
                borderColor: 'var(--border-color)',
              }}
            >
              <h3
                className="font-bold text-lg mb-1 font-[family-name:var(--font-heading)]"
                style={{ color: 'var(--text-primary)' }}
              >
                {cat.label}
              </h3>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                {cat.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Related Reading */}
      <section
        className="rounded-xl border p-6 mb-8"
        style={{
          backgroundColor: 'var(--bg-tertiary)',
          borderColor: 'var(--border-color)',
        }}
      >
        <h2
          className="text-xl font-bold mb-3 font-[family-name:var(--font-heading)]"
          style={{ color: 'var(--text-primary)' }}
        >
          Related Reading
        </h2>
        <ul
          className="space-y-2 text-sm"
          style={{ color: 'var(--text-secondary)' }}
        >
          <li>
            <Link
              href="/blog/best-phone-plans-for-seniors-2026"
              className="text-brand-blue hover:underline"
            >
              Best Phone Plans for Seniors in 2026 — Full Guide
            </Link>
          </li>
          <li>
            <Link
              href="/tools"
              className="text-brand-blue hover:underline"
            >
              More Free Tech Tools for Seniors
            </Link>
          </li>
          <li>
            <Link
              href="/category/product-reviews"
              className="text-brand-blue hover:underline"
            >
              Phone & Device Reviews
            </Link>
          </li>
        </ul>
      </section>
    </div>
  )
}

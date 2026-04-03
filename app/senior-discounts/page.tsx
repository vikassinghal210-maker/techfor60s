import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllDiscounts, getPopularDiscounts, DISCOUNT_CATEGORIES } from '@/lib/discounts-data'
import { SITE_URL } from '@/lib/utils'
import { breadcrumbJsonLd } from '@/lib/seo'
import Breadcrumbs from '@/components/Breadcrumbs'
import DiscountSearch from '@/components/DiscountSearch'

export const metadata: Metadata = {
  title: '150+ Senior Discounts (2026) — Complete Directory',
  description:
    'The most comprehensive list of senior discounts in 2026. Save on phone plans, groceries, restaurants, travel, insurance, and more. Find every discount you qualify for.',
  keywords: [
    'senior discounts',
    'senior discounts 2026',
    'senior citizen discounts',
    'AARP discounts',
    'discounts for seniors',
    'senior savings',
    'over 55 discounts',
    'over 60 discounts',
    'over 65 discounts',
    'senior discount directory',
  ],
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/senior-discounts`,
    title: '150+ Senior Discounts (2026) — Complete Directory | TechFor60s',
    description:
      'The most comprehensive list of senior discounts in 2026. Save on phone plans, groceries, restaurants, travel, insurance, and more.',
    siteName: 'TechFor60s',
  },
  twitter: {
    card: 'summary_large_image',
    title: '150+ Senior Discounts (2026) — Complete Directory',
    description:
      'The most comprehensive list of senior discounts in 2026. Save on phone plans, groceries, restaurants, travel, insurance, and more.',
  },
  alternates: { canonical: `${SITE_URL}/senior-discounts` },
}

export default function SeniorDiscountsPage() {
  const allDiscounts = getAllDiscounts()
  const popularDiscounts = getPopularDiscounts()
  const totalCategories = DISCOUNT_CATEGORIES.filter((c) => c.count > 0).length

  const breadcrumbs = [
    { name: 'Home', url: SITE_URL },
    { name: 'Senior Discounts' },
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: 'Home', url: SITE_URL },
              { name: 'Senior Discounts', url: `${SITE_URL}/senior-discounts` },
            ])
          ),
        }}
      />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Senior Discounts' },
          ]}
        />

        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1
            className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl font-bold mb-4"
            style={{ color: 'var(--text-primary)' }}
          >
            Senior Discount Directory
          </h1>
          <p
            className="text-xl md:text-2xl mb-6 max-w-3xl mx-auto"
            style={{ color: 'var(--text-secondary)' }}
          >
            Discover {allDiscounts.length}+ discounts you may not know about.
            Many seniors leave hundreds of dollars on the table every year.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <div
              className="rounded-xl px-6 py-4 border"
              style={{
                backgroundColor: 'var(--bg-tertiary)',
                borderColor: 'var(--border-color)',
              }}
            >
              <p className="text-3xl font-bold text-brand-blue">{allDiscounts.length}+</p>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                Verified Discounts
              </p>
            </div>
            <div
              className="rounded-xl px-6 py-4 border"
              style={{
                backgroundColor: 'var(--bg-tertiary)',
                borderColor: 'var(--border-color)',
              }}
            >
              <p className="text-3xl font-bold text-brand-blue">{totalCategories}</p>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                Categories
              </p>
            </div>
            <div
              className="rounded-xl px-6 py-4 border"
              style={{
                backgroundColor: 'var(--bg-tertiary)',
                borderColor: 'var(--border-color)',
              }}
            >
              <p className="text-3xl font-bold text-brand-blue">2026</p>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                Updated
              </p>
            </div>
          </div>
        </div>

        {/* Most Popular Section */}
        <section className="mb-14">
          <h2
            className="font-[family-name:var(--font-heading)] text-2xl md:text-3xl font-bold mb-6"
            style={{ color: 'var(--text-primary)' }}
          >
            Most Popular Senior Discounts
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {popularDiscounts.slice(0, 9).map((d) => {
              const catInfo = DISCOUNT_CATEGORIES.find((c) => c.slug === d.category)
              return (
                <Link
                  key={d.slug}
                  href={`/senior-discounts/${d.slug}`}
                  className="group rounded-xl border p-5 transition-all hover:shadow-lg hover:-translate-y-0.5"
                  style={{
                    backgroundColor: 'var(--bg-primary)',
                    borderColor: 'var(--border-color)',
                  }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1 min-w-0 mr-3">
                      <h3
                        className="font-[family-name:var(--font-heading)] text-lg font-bold group-hover:text-brand-blue transition-colors"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        {d.company}
                      </h3>
                      <span
                        className="text-xs font-medium"
                        style={{ color: 'var(--text-muted)' }}
                      >
                        {catInfo?.label ?? d.category}
                      </span>
                    </div>
                    <span className="shrink-0 inline-flex items-center rounded-lg bg-green-100 text-green-800 px-3 py-1.5 text-sm font-bold whitespace-nowrap">
                      {d.discountValue}
                    </span>
                  </div>
                  <p
                    className="text-sm line-clamp-2"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {d.discount}
                  </p>
                </Link>
              )
            })}
          </div>
        </section>

        {/* Browse by Category */}
        <section className="mb-14">
          <h2
            className="font-[family-name:var(--font-heading)] text-2xl md:text-3xl font-bold mb-6"
            style={{ color: 'var(--text-primary)' }}
          >
            Browse by Category
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {DISCOUNT_CATEGORIES.filter((c) => c.count > 0).map((cat) => (
              <Link
                key={cat.slug}
                href={`/senior-discounts/category/${cat.slug}`}
                className="group rounded-xl border p-4 text-center transition-all hover:shadow-md hover:-translate-y-0.5"
                style={{
                  backgroundColor: 'var(--bg-primary)',
                  borderColor: 'var(--border-color)',
                }}
              >
                <span className="text-3xl block mb-2">{cat.icon}</span>
                <h3
                  className="font-[family-name:var(--font-heading)] text-sm font-bold group-hover:text-brand-blue transition-colors"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {cat.label}
                </h3>
                <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
                  {cat.count} discount{cat.count !== 1 ? 's' : ''}
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* Full Searchable Directory */}
        <section>
          <h2
            className="font-[family-name:var(--font-heading)] text-2xl md:text-3xl font-bold mb-6"
            style={{ color: 'var(--text-primary)' }}
          >
            Search All Discounts
          </h2>
          <DiscountSearch discounts={allDiscounts} />
        </section>

        {/* Related Guides */}
        <section className="mt-14">
          <h2
            className="font-[family-name:var(--font-heading)] text-2xl md:text-3xl font-bold mb-6"
            style={{ color: 'var(--text-primary)' }}
          >
            Related Guides
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { href: '/blog/best-phone-plans-for-seniors-2026', title: 'Best Phone Plans for Seniors (2026)', desc: 'Compare the most affordable phone plans with senior discounts.' },
              { href: '/blog/best-internet-plans-for-seniors-2026', title: 'Best Internet Plans for Seniors (2026)', desc: 'Find low-cost internet with senior-specific pricing.' },
              { href: '/blog/best-streaming-services-for-seniors', title: 'Best Streaming Services for Seniors', desc: 'Cut cable costs with these senior-friendly streaming options.' },
              { href: '/phone-plans', title: 'Senior Phone Plan Comparator', desc: 'Compare all major carriers side by side with senior pricing.' },
              { href: '/tools/cord-cutting-calculator', title: 'Cord Cutting Calculator', desc: 'See how much you could save by switching to streaming.' },
              { href: '/tools/internet-by-state', title: 'Internet Plans by State', desc: 'Find the best internet deals in your state.' },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group rounded-xl border p-5 transition-all hover:shadow-lg hover:-translate-y-0.5"
                style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)' }}
              >
                <h3
                  className="font-[family-name:var(--font-heading)] text-base font-bold group-hover:text-brand-blue transition-colors mb-2"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {item.title}
                </h3>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{item.desc}</p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  )
}

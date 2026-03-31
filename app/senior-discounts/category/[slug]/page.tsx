import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  getDiscountsByCategory,
  DISCOUNT_CATEGORIES,
  type DiscountCategory,
} from '@/lib/discounts-data'
import { SITE_URL } from '@/lib/utils'
import { breadcrumbJsonLd } from '@/lib/seo'
import Breadcrumbs from '@/components/Breadcrumbs'

export function generateStaticParams() {
  return DISCOUNT_CATEGORIES.filter((c) => c.count > 0).map((c) => ({
    slug: c.slug,
  }))
}

export async function generateMetadata(
  props: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await props.params
  const catInfo = DISCOUNT_CATEGORIES.find((c) => c.slug === slug)
  if (!catInfo) return {}

  const title = `Senior ${catInfo.label} Discounts (2026) — ${catInfo.count}+ Ways to Save`
  const description = `${catInfo.description} Find ${catInfo.count}+ verified senior discounts for ${catInfo.label.toLowerCase()} in 2026.`
  const url = `${SITE_URL}/senior-discounts/category/${slug}`

  return {
    title,
    description,
    keywords: [
      `senior ${catInfo.label.toLowerCase()} discounts`,
      `senior ${catInfo.label.toLowerCase()} discounts 2026`,
      `${catInfo.label.toLowerCase()} discounts for seniors`,
      `${catInfo.label.toLowerCase()} senior citizen discount`,
      'senior discounts',
    ],
    openGraph: {
      type: 'website',
      url,
      title,
      description,
      siteName: 'TechFor60s',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: { canonical: url },
  }
}

function sortByValue(discounts: ReturnType<typeof getDiscountsByCategory>) {
  return [...discounts].sort((a, b) => {
    // Popular first
    if (a.popular !== b.popular) return a.popular ? -1 : 1
    // Then by percentage type vs others
    const aVal = parseFloat(a.discountValue.replace(/[^0-9.]/g, '')) || 0
    const bVal = parseFloat(b.discountValue.replace(/[^0-9.]/g, '')) || 0
    return bVal - aVal
  })
}

export default async function CategoryDiscountsPage(
  props: { params: Promise<{ slug: string }> }
) {
  const { slug } = await props.params
  const catInfo = DISCOUNT_CATEGORIES.find((c) => c.slug === slug)
  if (!catInfo) notFound()

  const discounts = sortByValue(
    getDiscountsByCategory(slug as DiscountCategory)
  )

  if (discounts.length === 0) notFound()

  const breadcrumbs = [
    { name: 'Home', url: SITE_URL },
    { name: 'Senior Discounts', url: `${SITE_URL}/senior-discounts` },
    { name: catInfo.label },
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd(breadcrumbs)),
        }}
      />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Senior Discounts', href: '/senior-discounts' },
            { label: catInfo.label },
          ]}
        />

        {/* Header */}
        <div className="mb-10">
          <span className="text-4xl mb-3 block">{catInfo.icon}</span>
          <h1
            className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl font-bold mb-3"
            style={{ color: 'var(--text-primary)' }}
          >
            Senior {catInfo.label} Discounts
          </h1>
          <p
            className="text-lg max-w-3xl"
            style={{ color: 'var(--text-secondary)' }}
          >
            {catInfo.description}. We found{' '}
            <strong>{discounts.length} discounts</strong> in this category,
            verified for 2026.
          </p>
        </div>

        {/* Discount Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {discounts.map((d) => (
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
                <div className="flex-1 min-w-0 mr-4">
                  <h2
                    className="font-[family-name:var(--font-heading)] text-xl font-bold group-hover:text-brand-blue transition-colors"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {d.company}
                  </h2>
                </div>
                <span className="shrink-0 inline-flex items-center rounded-lg bg-green-100 text-green-800 px-3 py-1.5 text-sm font-bold whitespace-nowrap">
                  {d.discountValue}
                </span>
              </div>

              <p
                className="text-sm mb-3"
                style={{ color: 'var(--text-secondary)' }}
              >
                {d.discount}
              </p>

              <div className="flex flex-wrap gap-2 mb-3">
                <span
                  className="inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium"
                  style={{
                    backgroundColor: 'var(--bg-tertiary)',
                    color: 'var(--text-muted)',
                  }}
                >
                  Age {d.eligibilityAge}+
                </span>
                {d.aarpRequired && (
                  <span className="inline-flex items-center rounded-md bg-red-100 text-red-700 px-2 py-0.5 text-xs font-medium">
                    AARP Required
                  </span>
                )}
                {d.popular && (
                  <span className="inline-flex items-center rounded-md bg-yellow-100 text-yellow-800 px-2 py-0.5 text-xs font-medium">
                    Popular
                  </span>
                )}
              </div>

              <p
                className="text-xs"
                style={{ color: 'var(--text-muted)' }}
              >
                {d.verificationMethod}
              </p>
            </Link>
          ))}
        </div>

        {/* Other Categories */}
        <section className="mt-14">
          <h2
            className="font-[family-name:var(--font-heading)] text-2xl font-bold mb-6"
            style={{ color: 'var(--text-primary)' }}
          >
            Explore Other Categories
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {DISCOUNT_CATEGORIES.filter(
              (c) => c.slug !== slug && c.count > 0
            ).map((cat) => (
              <Link
                key={cat.slug}
                href={`/senior-discounts/category/${cat.slug}`}
                className="group rounded-xl border p-4 text-center transition-all hover:shadow-md hover:-translate-y-0.5"
                style={{
                  backgroundColor: 'var(--bg-primary)',
                  borderColor: 'var(--border-color)',
                }}
              >
                <span className="text-2xl block mb-1">{cat.icon}</span>
                <h3
                  className="text-sm font-bold group-hover:text-brand-blue transition-colors"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {cat.label}
                </h3>
                <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
                  {cat.count} discount{cat.count !== 1 ? 's' : ''}
                </p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  )
}

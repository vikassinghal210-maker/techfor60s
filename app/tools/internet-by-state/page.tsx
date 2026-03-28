import type { Metadata } from 'next'
import Link from 'next/link'
import Breadcrumbs from '@/components/Breadcrumbs'
import { SITE_URL } from '@/lib/utils'
import { breadcrumbJsonLd } from '@/lib/seo'
import { statesData } from '@/lib/states-data'

export const metadata: Metadata = {
  title: 'Best Internet Plans for Seniors by State',
  description:
    'Find the best internet plans for seniors in your state. Compare providers, senior discounts, low-income programs, and average prices across all 50 US states.',
  keywords: [
    'internet plans for seniors by state',
    'best senior internet plans',
    'cheap internet for seniors',
    'senior internet discounts',
    'low income internet by state',
    'senior broadband options',
  ],
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/tools/internet-by-state`,
    title: 'Best Internet Plans for Seniors by State | TechFor60s',
    description:
      'Find the best internet plans for seniors in your state. Compare providers, senior discounts, and average prices across all 50 US states.',
    siteName: 'TechFor60s',
    locale: 'en_US',
  },
  alternates: { canonical: `${SITE_URL}/tools/internet-by-state` },
}

export default function InternetByStatePage() {
  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Tools', href: '/tools' },
    { label: 'Internet by State' },
  ]

  const jsonLd = breadcrumbJsonLd([
    { name: 'Home', url: SITE_URL },
    { name: 'Tools', url: `${SITE_URL}/tools` },
    { name: 'Internet by State' },
  ])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-6xl mx-auto px-4 py-8">
        <Breadcrumbs items={breadcrumbs} />

        <header className="mb-10 text-center">
          <h1
            className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-heading)] mb-4"
            style={{ color: 'var(--text-primary)' }}
          >
            Best Internet Plans for Seniors by State
          </h1>
          <p
            className="text-lg leading-relaxed max-w-2xl mx-auto"
            style={{ color: 'var(--text-secondary)' }}
          >
            Internet availability and pricing vary widely across the US. Select
            your state below to find the best providers, senior discounts, and
            low-income assistance programs near you.
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {statesData.map((state) => (
            <Link
              key={state.slug}
              href={`/tools/internet-by-state/${state.slug}`}
              className="group block rounded-xl border p-5 transition-all hover:shadow-md hover:border-brand-blue"
              style={{
                borderColor: 'var(--border-color)',
                backgroundColor: 'var(--bg-primary)',
              }}
            >
              <div className="flex items-center justify-between mb-2">
                <h2
                  className="text-lg font-bold font-[family-name:var(--font-heading)] group-hover:text-brand-blue transition-colors"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {state.name}
                </h2>
                <span
                  className="text-xs font-semibold px-2 py-0.5 rounded"
                  style={{
                    backgroundColor: 'var(--bg-tertiary)',
                    color: 'var(--text-muted)',
                  }}
                >
                  {state.abbreviation}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <p
                  className="text-sm"
                  style={{ color: 'var(--text-muted)' }}
                >
                  Avg. {state.averagePrice}
                </p>
                <p
                  className="text-sm"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {state.providers.length} providers
                </p>
              </div>
              <p
                className="text-xs mt-2"
                style={{ color: 'var(--text-muted)' }}
              >
                {state.providers
                  .filter((p) => p.seniorDiscount)
                  .map((p) => p.name)
                  .join(', ') || 'View plans'}
              </p>
            </Link>
          ))}
        </div>

        {/* Bottom CTA */}
        <div
          className="mt-12 rounded-xl border p-8 text-center"
          style={{
            borderColor: 'var(--border-color)',
            backgroundColor: 'var(--bg-tertiary)',
          }}
        >
          <h2
            className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-3"
            style={{ color: 'var(--text-primary)' }}
          >
            Need More Help Choosing?
          </h2>
          <p
            className="text-sm mb-5 max-w-xl mx-auto"
            style={{ color: 'var(--text-secondary)' }}
          >
            Read our comprehensive guide to the best internet plans for seniors
            nationwide, or take our device quiz to find the right tech for your
            needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/blog/best-internet-plans-for-seniors-2026"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-brand-blue text-white font-medium text-sm hover:opacity-90 transition-opacity"
            >
              Read the Full Guide
            </Link>
            <Link
              href="/tools/device-quiz"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg border font-medium text-sm transition-colors hover:bg-brand-blue hover:text-white"
              style={{
                borderColor: 'var(--border-color)',
                color: 'var(--text-secondary)',
              }}
            >
              Take the Device Quiz
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

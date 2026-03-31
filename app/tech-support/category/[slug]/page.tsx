import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { SITE_URL } from '@/lib/utils'
import { breadcrumbJsonLd } from '@/lib/seo'
import {
  SUPPORT_CATEGORIES,
  getSupportByCategory,
  getCategoryBySlug,
} from '@/lib/support-data'
import Breadcrumbs from '@/components/Breadcrumbs'

export function generateStaticParams() {
  return SUPPORT_CATEGORIES.map((cat) => ({ slug: cat.slug }))
}

export async function generateMetadata(
  props: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await props.params
  const category = getCategoryBySlug(slug)
  if (!category) return {}

  const title = `${category.label} Support Numbers — Reach a Human Fast (2026)`
  const description = `Find customer service phone numbers for ${category.label.toLowerCase()}. Tips to skip the robot and talk to a real person. ${category.description}`
  const url = `${SITE_URL}/tech-support/category/${slug}`

  return {
    title,
    description,
    keywords: [
      `${category.label.toLowerCase()} support numbers`,
      `${category.label.toLowerCase()} customer service`,
      `${category.label.toLowerCase()} phone number`,
      `reach a human ${category.label.toLowerCase()}`,
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

export default async function CategorySupportPage(
  props: { params: Promise<{ slug: string }> }
) {
  const { slug } = await props.params
  const category = getCategoryBySlug(slug)
  if (!category) notFound()

  const companies = getSupportByCategory(category.slug)

  const breadcrumbs = [
    { name: 'Home', url: SITE_URL },
    { name: 'Tech Support', url: `${SITE_URL}/tech-support` },
    { name: category.label },
  ]

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd(breadcrumbs)),
        }}
      />

      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Tech Support', href: '/tech-support' },
          { label: category.label },
        ]}
      />

      {/* Hero */}
      <section className="mb-10">
        <div className="flex items-center gap-4 mb-4">
          <span className="text-4xl" aria-hidden="true">
            {category.icon}
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-heading)] text-[var(--text-primary)]">
            {category.label} Support Numbers
          </h1>
        </div>
        <p className="text-lg text-[var(--text-secondary)] leading-relaxed max-w-2xl">
          {category.description} Find the right phone number and tips to reach a
          real person quickly.
        </p>
      </section>

      {/* Companies List */}
      <section className="mb-12">
        <div className="space-y-4">
          {companies.map((company) => (
            <div
              key={company.slug}
              className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-primary)] p-5 sm:p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-4">
                  <span className="flex-shrink-0 w-12 h-12 rounded-full bg-brand-blue text-white flex items-center justify-center text-lg font-bold">
                    {company.logo}
                  </span>
                  <div>
                    <Link
                      href={`/tech-support/${company.slug}`}
                      className="text-xl font-bold text-[var(--text-primary)] hover:text-brand-blue transition-colors no-underline"
                    >
                      {company.name}
                    </Link>
                    <div className="flex flex-wrap items-center gap-3 mt-1">
                      <span className="text-sm text-[var(--text-muted)]">
                        {company.hours}
                      </span>
                      <span className="text-sm text-[var(--text-muted)]">
                        Wait: {company.avgWaitTime}
                      </span>
                      {company.seniorSupport && (
                        <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400">
                          Senior-Friendly
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex-shrink-0 sm:text-right">
                  {company.phoneNumber ? (
                    <a
                      href={`tel:${company.phoneNumber.replace(/[^+\d]/g, '')}`}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-brand-blue text-white rounded-xl font-bold text-lg hover:bg-blue-800 transition-colors no-underline shadow-md hover:shadow-lg"
                      aria-label={`Call ${company.name} at ${company.phoneNumber}`}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      {company.phoneNumber}
                    </a>
                  ) : (
                    <Link
                      href={`/tech-support/${company.slug}`}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--bg-tertiary)] text-[var(--text-primary)] rounded-xl font-semibold text-base hover:bg-brand-blue hover:text-white transition-colors no-underline"
                    >
                      View Support Options
                    </Link>
                  )}
                </div>
              </div>

              <p className="text-[var(--text-secondary)] mt-3 text-sm leading-relaxed">
                {company.description}
              </p>

              {/* Quick tip */}
              {company.tipsToReachHuman.length > 0 && (
                <p className="mt-2 text-sm text-[var(--text-muted)] italic">
                  Quick tip: {company.tipsToReachHuman[0]}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Browse Other Categories */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-[var(--text-primary)] mb-4">
          Browse Other Categories
        </h2>
        <div className="flex flex-wrap gap-3">
          {SUPPORT_CATEGORIES.filter((cat) => cat.slug !== slug).map((cat) => (
            <Link
              key={cat.slug}
              href={`/tech-support/category/${cat.slug}`}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[var(--border-color)] text-sm font-medium text-[var(--text-primary)] hover:bg-brand-blue hover:text-white hover:border-brand-blue transition-colors no-underline"
            >
              <span aria-hidden="true">{cat.icon}</span>
              {cat.label}
            </Link>
          ))}
        </div>
      </section>

      {/* Back Link */}
      <div className="text-center pt-4 border-t border-[var(--border-color)]">
        <Link
          href="/tech-support"
          className="text-brand-blue hover:underline font-medium"
        >
          View all tech support phone numbers
        </Link>
      </div>
    </div>
  )
}

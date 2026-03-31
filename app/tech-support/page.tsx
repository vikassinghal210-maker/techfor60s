import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_URL } from '@/lib/utils'
import { breadcrumbJsonLd } from '@/lib/seo'
import {
  getAllSupport,
  SUPPORT_CATEGORIES,
  POPULAR_COMPANIES,
  getSupportBySlug,
} from '@/lib/support-data'
import Breadcrumbs from '@/components/Breadcrumbs'
import SupportSearch from '@/components/SupportSearch'

export const metadata: Metadata = {
  title: 'Tech Support Phone Numbers — Reach a Human Fast',
  description:
    'Find the real customer service phone number for any tech company. Tips to skip the robot and reach a human fast. Apple, Samsung, Netflix, Verizon, and 100+ more.',
  keywords: [
    'tech support phone numbers',
    'customer service numbers',
    'reach a human',
    'tech company phone numbers',
    'senior tech support',
    'how to call Apple support',
    'Netflix customer service number',
  ],
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/tech-support`,
    title: 'Tech Support Phone Numbers — Reach a Human Fast',
    description:
      'Find the real customer service phone number for any tech company. Tips to skip the robot and reach a human fast.',
    siteName: 'TechFor60s',
  },
  alternates: { canonical: `${SITE_URL}/tech-support` },
}

export default function TechSupportIndexPage() {
  const allCompanies = getAllSupport()
  const popularEntries = POPULAR_COMPANIES.map((slug) => getSupportBySlug(slug)).filter(Boolean)

  const breadcrumbs = [
    { name: 'Home', url: SITE_URL },
    { name: 'Tech Support' },
  ]

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd(breadcrumbs)),
        }}
      />

      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Tech Support' },
        ]}
      />

      {/* Hero */}
      <section className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-heading)] text-[var(--text-primary)] mb-4">
          Tech Support Phone Numbers
        </h1>
        <p className="text-xl text-[var(--text-secondary)] max-w-2xl mx-auto mb-8 leading-relaxed">
          Find the real phone number for any tech company. We show you how to
          skip the robot and <strong>reach a human fast</strong>.
        </p>

        {/* Search */}
        <SupportSearch companies={allCompanies} />
      </section>

      {/* Popular Companies */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-[var(--text-primary)] mb-6">
          Most Popular Support Numbers
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {popularEntries.map((company) => {
            if (!company) return null
            return (
              <div
                key={company.slug}
                className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-primary)] p-5 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="flex-shrink-0 w-10 h-10 rounded-full bg-brand-blue text-white flex items-center justify-center text-base font-bold">
                    {company.logo}
                  </span>
                  <div>
                    <Link
                      href={`/tech-support/${company.slug}`}
                      className="text-[var(--text-primary)] font-semibold hover:text-brand-blue transition-colors no-underline text-lg"
                    >
                      {company.name}
                    </Link>
                    <p className="text-xs text-[var(--text-muted)]">
                      {company.hours}
                    </p>
                  </div>
                </div>

                {company.phoneNumber ? (
                  <a
                    href={`tel:${company.phoneNumber.replace(/[^+\d]/g, '')}`}
                    className="flex items-center justify-center gap-2 w-full py-3 bg-brand-blue text-white rounded-lg font-bold text-lg hover:bg-blue-800 transition-colors no-underline"
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
                    className="flex items-center justify-center gap-2 w-full py-3 bg-[var(--bg-tertiary)] text-[var(--text-primary)] rounded-lg font-semibold text-base hover:bg-brand-blue hover:text-white transition-colors no-underline"
                  >
                    View Support Options
                  </Link>
                )}
              </div>
            )
          })}
        </div>
      </section>

      {/* Browse by Category */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-[var(--text-primary)] mb-6">
          Browse by Category
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SUPPORT_CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/tech-support/category/${cat.slug}`}
              className="flex items-start gap-4 p-5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-primary)] hover:shadow-md hover:border-brand-blue transition-all no-underline group"
            >
              <span className="text-3xl flex-shrink-0" aria-hidden="true">
                {cat.icon}
              </span>
              <div>
                <h3 className="font-semibold text-[var(--text-primary)] group-hover:text-brand-blue transition-colors text-lg">
                  {cat.label}
                </h3>
                <p className="text-sm text-[var(--text-muted)] mt-1 leading-relaxed">
                  {cat.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* All Companies List */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-[var(--text-primary)] mb-6">
          All Companies (A-Z)
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[...allCompanies]
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((company) => (
              <Link
                key={company.slug}
                href={`/tech-support/${company.slug}`}
                className="flex items-center justify-between gap-2 px-4 py-3 rounded-lg border border-[var(--border-color)] hover:border-brand-blue hover:shadow-sm transition-all no-underline group"
              >
                <span className="text-[var(--text-primary)] font-medium group-hover:text-brand-blue transition-colors truncate">
                  {company.name}
                </span>
                {company.phoneNumber && (
                  <span className="text-xs text-[var(--text-muted)] flex-shrink-0">
                    {company.phoneNumber}
                  </span>
                )}
              </Link>
            ))}
        </div>
      </section>

      {/* Helpful Resources */}
      <section className="rounded-xl p-6 border border-[var(--border-color)] bg-[var(--bg-tertiary)]">
        <h2 className="text-xl font-bold font-[family-name:var(--font-heading)] text-[var(--text-primary)] mb-4">
          Helpful Resources
        </h2>
        <ul className="space-y-3">
          <li>
            <Link
              href="/blog/best-free-apps-for-seniors-2026"
              className="text-brand-blue hover:underline font-medium"
            >
              Best Free Apps for Seniors in 2026
            </Link>
            <span className="block text-sm mt-0.5 text-[var(--text-muted)]">
              Discover the most useful free apps for staying connected, managing
              health, and entertainment.
            </span>
          </li>
          <li>
            <Link
              href="/tools/device-quiz"
              className="text-brand-blue hover:underline font-medium"
            >
              Which Device Is Right for You? Take the Quiz
            </Link>
            <span className="block text-sm mt-0.5 text-[var(--text-muted)]">
              Not sure whether you need a tablet, smartphone, or laptop? Our
              quick quiz will help you decide.
            </span>
          </li>
          <li>
            <Link
              href="/tools/tech-classes"
              className="text-brand-blue hover:underline font-medium"
            >
              Free Tech Classes for Seniors
            </Link>
            <span className="block text-sm mt-0.5 text-[var(--text-muted)]">
              Find free technology help near you — libraries, community centers,
              and nonprofit programs.
            </span>
          </li>
        </ul>
      </section>
    </div>
  )
}

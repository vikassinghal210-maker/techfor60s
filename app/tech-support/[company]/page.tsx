import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { SITE_URL } from '@/lib/utils'
import { breadcrumbJsonLd } from '@/lib/seo'
import {
  getAllSupport,
  getSupportBySlug,
  getSupportByCategory,
  getCategoryBySlug,
} from '@/lib/support-data'
import Breadcrumbs from '@/components/Breadcrumbs'

export function generateStaticParams() {
  return getAllSupport().map((entry) => ({ company: entry.slug }))
}

export async function generateMetadata(
  props: { params: Promise<{ company: string }> }
): Promise<Metadata> {
  const { company: slug } = await props.params
  const entry = getSupportBySlug(slug)
  if (!entry) return {}

  const title = `${entry.name} Customer Service Phone Number & Support (2026)`
  const description = `Call ${entry.name} support at ${entry.phoneNumber ?? 'their help center'}. Hours: ${entry.hours}. Tips to reach a real person fast. ${entry.description}`
  const url = `${SITE_URL}/tech-support/${slug}`

  return {
    title,
    description,
    keywords: [
      `${entry.name} customer service number`,
      `${entry.name} phone number`,
      `${entry.name} support`,
      `call ${entry.name}`,
      `${entry.name} help`,
      `reach a human ${entry.name}`,
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

export default async function CompanySupportPage(
  props: { params: Promise<{ company: string }> }
) {
  const { company: slug } = await props.params
  const entry = getSupportBySlug(slug)
  if (!entry) notFound()

  const category = getCategoryBySlug(entry.category)
  const categoryLabel = category?.label ?? entry.category.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())
  const relatedCompanies = getSupportByCategory(entry.category).filter(
    (c) => c.slug !== entry.slug
  )

  const breadcrumbs = [
    { name: 'Home', url: SITE_URL },
    { name: 'Tech Support', url: `${SITE_URL}/tech-support` },
    { name: entry.name },
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
          { label: entry.name },
        ]}
      />

      {/* Header */}
      <header className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <span className="flex-shrink-0 w-16 h-16 rounded-2xl bg-brand-blue text-white flex items-center justify-center text-2xl font-bold">
            {entry.logo}
          </span>
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-heading)] text-[var(--text-primary)]">
              {entry.name} Support
            </h1>
            <Link
              href={`/tech-support/category/${entry.category}`}
              className="text-sm text-brand-blue hover:underline no-underline"
            >
              {categoryLabel}
            </Link>
          </div>
        </div>
        <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
          {entry.description}
        </p>
      </header>

      {/* Primary Phone Number — THE MOST PROMINENT ELEMENT */}
      {entry.phoneNumber && (
        <section className="mb-8 rounded-2xl border-2 border-brand-blue bg-blue-50 dark:bg-blue-950/30 p-6 sm:p-8 text-center">
          <p className="text-sm font-semibold text-brand-blue uppercase tracking-wide mb-2">
            Customer Service Phone Number
          </p>
          <a
            href={`tel:${entry.phoneNumber.replace(/[^+\d]/g, '')}`}
            className="inline-flex items-center gap-3 px-8 py-5 bg-brand-blue text-white rounded-xl font-bold text-2xl sm:text-3xl hover:bg-blue-800 transition-colors no-underline shadow-lg hover:shadow-xl"
            aria-label={`Call ${entry.name} at ${entry.phoneNumber}`}
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            {entry.phoneNumber}
          </a>
          <p className="text-[var(--text-muted)] text-sm mt-3">
            Tap or click to call. {entry.hours}.
          </p>
        </section>
      )}

      {/* Senior Support Line */}
      {entry.seniorSupport && entry.seniorLine && entry.seniorLine !== entry.phoneNumber && (
        <section className="mb-8 rounded-2xl border-2 border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30 p-6 text-center">
          <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wide mb-2">
            Dedicated Senior / Accessibility Support
          </p>
          <a
            href={`tel:${entry.seniorLine.replace(/[^+\d]/g, '')}`}
            className="inline-flex items-center gap-3 px-6 py-4 bg-emerald-600 text-white rounded-xl font-bold text-xl sm:text-2xl hover:bg-emerald-700 transition-colors no-underline shadow-lg"
            aria-label={`Call ${entry.name} senior support at ${entry.seniorLine}`}
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            {entry.seniorLine}
          </a>
          <p className="text-sm text-emerald-700 dark:text-emerald-400 mt-2">
            This line offers patient, senior-friendly assistance.
          </p>
        </section>
      )}

      {/* Senior Support Badge (when same number) */}
      {entry.seniorSupport && (!entry.seniorLine || entry.seniorLine === entry.phoneNumber) && (
        <div className="mb-8 flex items-center gap-3 px-5 py-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800">
          <span className="text-2xl" aria-hidden="true">&#9989;</span>
          <p className="text-emerald-800 dark:text-emerald-300 font-medium">
            {entry.name} offers senior-friendly support with patient, accessible service.
          </p>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6 mb-10">
        {/* Hours & Wait Time */}
        <div className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-primary)] p-5">
          <h2 className="text-lg font-bold font-[family-name:var(--font-heading)] text-[var(--text-primary)] mb-4">
            Hours & Wait Time
          </h2>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-[var(--text-muted)] font-medium">Support Hours</p>
              <p className="text-[var(--text-primary)] font-semibold text-lg">{entry.hours}</p>
            </div>
            <div>
              <p className="text-sm text-[var(--text-muted)] font-medium">Average Wait Time</p>
              <p className="text-[var(--text-primary)] font-semibold text-lg">{entry.avgWaitTime}</p>
            </div>
          </div>
        </div>

        {/* International Numbers */}
        <div className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-primary)] p-5">
          <h2 className="text-lg font-bold font-[family-name:var(--font-heading)] text-[var(--text-primary)] mb-4">
            Phone Numbers
          </h2>
          <div className="space-y-3">
            {entry.phoneNumberUS && (
              <div className="flex items-center justify-between">
                <span className="text-[var(--text-muted)] text-sm font-medium">US</span>
                <a
                  href={`tel:${entry.phoneNumberUS.replace(/[^+\d]/g, '')}`}
                  className="text-brand-blue font-bold hover:underline no-underline text-lg"
                >
                  {entry.phoneNumberUS}
                </a>
              </div>
            )}
            {entry.phoneNumberUK && (
              <div className="flex items-center justify-between">
                <span className="text-[var(--text-muted)] text-sm font-medium">UK</span>
                <a
                  href={`tel:${entry.phoneNumberUK.replace(/[^+\d]/g, '')}`}
                  className="text-brand-blue font-bold hover:underline no-underline text-lg"
                >
                  {entry.phoneNumberUK}
                </a>
              </div>
            )}
            {!entry.phoneNumberUS && !entry.phoneNumberUK && (
              <p className="text-[var(--text-muted)]">
                No phone support available. See online options below.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Tips to Reach a Human */}
      {entry.tipsToReachHuman.length > 0 && (
        <section className="mb-10">
          <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-[var(--text-primary)] mb-6">
            Tips to Reach a Real Person
          </h2>
          <div className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-primary)] p-5 sm:p-6">
            <ol className="space-y-4">
              {entry.tipsToReachHuman.map((tip, i) => (
                <li key={i} className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-blue text-white flex items-center justify-center text-sm font-bold">
                    {i + 1}
                  </span>
                  <p className="text-[var(--text-secondary)] leading-relaxed pt-1 text-lg">
                    {tip}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {/* Alternative Contact Methods */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-[var(--text-primary)] mb-6">
          Other Ways to Get Help
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {entry.chatUrl && (
            <a
              href={entry.chatUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-primary)] hover:shadow-md hover:border-brand-blue transition-all no-underline group"
            >
              <span className="flex-shrink-0 w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </span>
              <div>
                <p className="font-semibold text-[var(--text-primary)] group-hover:text-brand-blue transition-colors text-lg">
                  Live Chat
                </p>
                <p className="text-sm text-[var(--text-muted)]">
                  Chat with {entry.name} support online
                </p>
              </div>
            </a>
          )}
          <a
            href={entry.supportUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 p-5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-primary)] hover:shadow-md hover:border-brand-blue transition-all no-underline group"
          >
            <span className="flex-shrink-0 w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-600 flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
            </span>
            <div>
              <p className="font-semibold text-[var(--text-primary)] group-hover:text-brand-blue transition-colors text-lg">
                Support Website
              </p>
              <p className="text-sm text-[var(--text-muted)]">
                Visit {entry.name} help center
              </p>
            </div>
          </a>
        </div>
      </section>

      {/* Related Support in Same Category */}
      {relatedCompanies.length > 0 && (
        <section className="mb-10">
          <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-[var(--text-primary)] mb-6">
            Related {categoryLabel} Support
          </h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {relatedCompanies.slice(0, 8).map((related) => (
              <Link
                key={related.slug}
                href={`/tech-support/${related.slug}`}
                className="flex items-center justify-between gap-3 px-4 py-3 rounded-xl border border-[var(--border-color)] hover:border-brand-blue hover:shadow-sm transition-all no-underline group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="flex-shrink-0 w-9 h-9 rounded-full bg-brand-blue text-white flex items-center justify-center text-sm font-bold">
                    {related.logo}
                  </span>
                  <span className="text-[var(--text-primary)] font-medium group-hover:text-brand-blue transition-colors truncate">
                    {related.name}
                  </span>
                </div>
                {related.phoneNumber && (
                  <span className="text-xs text-[var(--text-muted)] flex-shrink-0 hidden sm:inline">
                    {related.phoneNumber}
                  </span>
                )}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Helpful Articles */}
      <section className="rounded-xl p-6 border border-[var(--border-color)] bg-[var(--bg-tertiary)] mb-8">
        <h2 className="text-xl font-bold font-[family-name:var(--font-heading)] text-[var(--text-primary)] mb-4">
          Helpful Articles
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
              Discover the most useful free apps for staying connected and safe
              online.
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
              Not sure whether you need a tablet, smartphone, or laptop? Find
              out in under 2 minutes.
            </span>
          </li>
        </ul>
      </section>

      {/* Back to All Support */}
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

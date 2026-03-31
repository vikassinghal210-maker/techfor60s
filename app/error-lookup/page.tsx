import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_URL } from '@/lib/utils'
import { breadcrumbJsonLd } from '@/lib/seo'
import Breadcrumbs from '@/components/Breadcrumbs'
import ErrorSearch from '@/components/ErrorSearch'
import {
  ALL_ERRORS,
  DEVICE_CATEGORIES,
  getPopularErrors,
} from '@/lib/errors-data'

export const metadata: Metadata = {
  title: 'Error Message Lookup — What Does That Error Mean?',
  description:
    'See a confusing error on your phone, computer, or browser? Type it here and we will explain what it means in plain English, plus show you exactly how to fix it.',
  keywords: [
    'error message lookup',
    'what does this error mean',
    'phone error message help',
    'computer error explained',
    'fix error message',
    'error message for seniors',
  ],
  alternates: { canonical: `${SITE_URL}/error-lookup` },
  openGraph: {
    title: 'Error Message Lookup — What Does That Error Mean? | TechFor60s',
    description:
      'See a confusing error? Type it here and we will explain it in plain English, plus how to fix it.',
    url: `${SITE_URL}/error-lookup`,
  },
}

const SEVERITY_COLORS: Record<string, string> = {
  low: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  medium:
    'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
  high: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
}

export default function ErrorLookupPage() {
  const popular = getPopularErrors()

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: 'Home', url: SITE_URL },
              { name: 'Error Lookup' },
            ])
          ),
        }}
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-brand-blue via-blue-700 to-blue-900 text-white py-14 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-heading)] mb-4">
            Error Message Lookup
          </h1>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto mb-8">
            See an error on your screen? Don&rsquo;t worry — type it here and
            we&rsquo;ll explain what it means in plain English, plus show you
            exactly how to fix it.
          </p>
          <ErrorSearch allErrors={ALL_ERRORS} />
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Error Lookup' },
          ]}
        />

        {/* Browse by device */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-[var(--text-primary)] mb-6">
            Browse by Device Type
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {DEVICE_CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/error-lookup/device/${cat.slug}`}
                className="card p-5 text-center hover:border-brand-blue/30 transition-all no-underline group"
              >
                <span className="text-4xl block mb-2" aria-hidden="true">
                  {cat.icon}
                </span>
                <span className="font-semibold text-[var(--text-primary)] group-hover:text-brand-blue transition-colors block">
                  {cat.label}
                </span>
                <span className="text-sm text-[var(--text-muted)] block mt-1">
                  {cat.count} errors explained
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Popular errors */}
        <section className="mt-14">
          <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-[var(--text-primary)] mb-6">
            Most Common Error Messages
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {popular.map((error) => (
              <Link
                key={error.slug}
                href={`/error-lookup/${error.slug}`}
                className="card p-4 flex items-start gap-3 hover:border-brand-blue/30 transition-all no-underline group"
              >
                <span className="text-2xl mt-0.5" aria-hidden="true">
                  {DEVICE_CATEGORIES.find((c) => c.slug === error.device)?.icon ?? '❓'}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-[var(--text-primary)] group-hover:text-brand-blue transition-colors truncate">
                    {error.errorText}
                  </p>
                  <p className="text-sm text-[var(--text-secondary)] line-clamp-2 mt-0.5">
                    {error.plainMeaning}
                  </p>
                </div>
                <span
                  className={`text-xs font-medium px-2 py-0.5 rounded-full shrink-0 mt-1 ${SEVERITY_COLORS[error.severity]}`}
                >
                  {error.severity}
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Reassuring message */}
        <section className="mt-14 card p-8 text-center bg-blue-50 dark:bg-blue-900/10 border-brand-blue/20">
          <p className="text-xl font-semibold text-[var(--text-primary)] mb-2">
            Don&rsquo;t worry — error messages are normal!
          </p>
          <p className="text-[var(--text-secondary)] max-w-xl mx-auto">
            Every phone, computer, and app shows error messages from time to
            time. They are usually easy to fix and do not mean your device is
            broken. If you cannot find your specific error here, try searching
            above or{' '}
            <Link href="/contact" className="text-brand-blue hover:underline">
              contact us
            </Link>{' '}
            and we will help.
          </p>
        </section>
      </div>
    </>
  )
}

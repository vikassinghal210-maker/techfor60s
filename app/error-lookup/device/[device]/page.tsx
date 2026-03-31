import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { SITE_URL } from '@/lib/utils'
import { breadcrumbJsonLd } from '@/lib/seo'
import Breadcrumbs from '@/components/Breadcrumbs'
import {
  DEVICE_CATEGORIES,
  getErrorsByDevice,
} from '@/lib/errors-data'
import type { DeviceType } from '@/lib/errors-data'

export const dynamicParams = true

export function generateStaticParams() {
  return DEVICE_CATEGORIES.map((c) => ({ device: c.slug }))
}

export async function generateMetadata(
  props: { params: Promise<{ device: string }> }
): Promise<Metadata> {
  const { device } = await props.params
  const category = DEVICE_CATEGORIES.find((c) => c.slug === device)
  if (!category) return {}

  const title = `${category.label} Error Messages Explained`
  const description = `Plain-English explanations for ${category.count} common ${category.label} error messages. See what each error means and how to fix it step by step.`
  const url = `${SITE_URL}/error-lookup/device/${device}`

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} | TechFor60s`,
      description,
      url,
    },
  }
}

const SEVERITY_COLORS: Record<string, string> = {
  low: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  medium: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
  high: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
}

const SEVERITY_LABELS: Record<string, string> = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
}

export default async function DeviceErrorsPage(
  props: { params: Promise<{ device: string }> }
) {
  const { device } = await props.params
  const category = DEVICE_CATEGORIES.find((c) => c.slug === device)
  if (!category) notFound()

  const errors = getErrorsByDevice(device as DeviceType)

  // Group by severity for display
  const highErrors = errors.filter((e) => e.severity === 'high')
  const mediumErrors = errors.filter((e) => e.severity === 'medium')
  const lowErrors = errors.filter((e) => e.severity === 'low')

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: 'Home', url: SITE_URL },
              { name: 'Error Lookup', url: `${SITE_URL}/error-lookup` },
              { name: category.label },
            ])
          ),
        }}
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-brand-blue via-blue-700 to-blue-900 text-white py-14 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <span className="text-5xl block mb-4" aria-hidden="true">
            {category.icon}
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-heading)] mb-4">
            {category.label} Error Messages Explained
          </h1>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto">
            Don&rsquo;t worry — every {category.label.toLowerCase()} user sees
            error messages from time to time. Here are {category.count} common
            ones, explained in plain English with step-by-step fixes.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Error Lookup', href: '/error-lookup' },
            { label: category.label },
          ]}
        />

        {/* Render each severity group */}
        {[
          { label: 'High Priority — Fix These First', errors: highErrors },
          { label: 'Medium Priority', errors: mediumErrors },
          { label: 'Low Priority — Not Urgent', errors: lowErrors },
        ]
          .filter((group) => group.errors.length > 0)
          .map((group) => (
            <section key={group.label} className="mt-10">
              <h2 className="text-xl font-bold font-[family-name:var(--font-heading)] text-[var(--text-primary)] mb-4">
                {group.label}
              </h2>
              <div className="space-y-3">
                {group.errors.map((error) => (
                  <Link
                    key={error.slug}
                    href={`/error-lookup/${error.slug}`}
                    className="card p-5 flex flex-col sm:flex-row sm:items-center gap-3 hover:border-brand-blue/30 transition-all no-underline group"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className={`text-xs font-semibold px-2 py-0.5 rounded-full ${SEVERITY_COLORS[error.severity]}`}
                        >
                          {SEVERITY_LABELS[error.severity]}
                        </span>
                      </div>
                      <p className="font-semibold text-lg text-[var(--text-primary)] group-hover:text-brand-blue transition-colors">
                        {error.errorText}
                      </p>
                      <p className="text-sm text-[var(--text-secondary)] mt-1 line-clamp-2">
                        {error.plainMeaning}
                      </p>
                    </div>
                    <span className="text-brand-blue font-medium text-sm whitespace-nowrap shrink-0">
                      See fix &rarr;
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          ))}

        {/* Closing */}
        <section className="mt-14 card p-8 text-center bg-blue-50 dark:bg-blue-900/10 border-brand-blue/20">
          <p className="text-lg font-semibold text-[var(--text-primary)] mb-2">
            Can&rsquo;t find your error?
          </p>
          <p className="text-[var(--text-secondary)] mb-4">
            Try searching for it on the main error lookup page, or browse errors
            for a different device.
          </p>
          <Link
            href="/error-lookup"
            className="inline-flex items-center gap-2 bg-brand-blue text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors no-underline"
          >
            Search All Errors
          </Link>
        </section>
      </div>
    </>
  )
}

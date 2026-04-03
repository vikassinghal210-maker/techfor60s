import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { SITE_URL } from '@/lib/utils'
import { breadcrumbJsonLd, faqJsonLd } from '@/lib/seo'
import Breadcrumbs from '@/components/Breadcrumbs'
import {
  getAllErrors,
  getErrorBySlug,
  DEVICE_CATEGORIES,
} from '@/lib/errors-data'
import type { ErrorEntry } from '@/lib/errors-data'

export const dynamicParams = true

export function generateStaticParams() {
  return getAllErrors().map((e) => ({ slug: e.slug }))
}

export async function generateMetadata(
  props: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await props.params
  const error = getErrorBySlug(slug)
  if (!error) return {}

  const title = `${error.errorText} — What It Means & How to Fix It`
  const description = `${error.plainMeaning} Step-by-step instructions to fix the "${error.errorText}" error.`
  const url = `${SITE_URL}/error-lookup/${slug}`

  return {
    title,
    description,
    keywords: [
      error.errorText,
      `fix ${error.errorText}`,
      `${error.errorText} meaning`,
      ...error.searchTerms.slice(0, 5),
    ],
    alternates: { canonical: url },
    openGraph: {
      title: `${title} | TechFor60s`,
      description,
      url,
      images: [
        {
          url: `${SITE_URL}/api/og?title=${encodeURIComponent(title)}`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
  }
}

const SEVERITY_CONFIG = {
  low: {
    label: 'Low Urgency',
    color: 'bg-green-100 text-green-700 border-green-300 dark:bg-green-900/20 dark:text-green-400 dark:border-green-700',
    dot: 'bg-green-500',
    message: 'This is not urgent. Take your time with the fix.',
  },
  medium: {
    label: 'Medium Urgency',
    color: 'bg-yellow-100 text-yellow-700 border-yellow-300 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-700',
    dot: 'bg-yellow-500',
    message: 'Worth fixing soon, but no need to panic.',
  },
  high: {
    label: 'High Urgency',
    color: 'bg-red-100 text-red-700 border-red-300 dark:bg-red-900/20 dark:text-red-400 dark:border-red-700',
    dot: 'bg-red-500',
    message: 'Fix this as soon as you can for the best result.',
  },
}

export default async function ErrorDetailPage(
  props: { params: Promise<{ slug: string }> }
) {
  const { slug } = await props.params
  const error = getErrorBySlug(slug)
  if (!error) notFound()

  const severity = SEVERITY_CONFIG[error.severity]
  const deviceCategory = DEVICE_CATEGORIES.find((c) => c.slug === error.device)
  const url = `${SITE_URL}/error-lookup/${slug}`

  // Get related errors
  const relatedErrors = error.relatedErrors
    .map((s) => getErrorBySlug(s))
    .filter((e): e is ErrorEntry => e !== undefined)

  // Build FAQ schema
  const faqs = [
    {
      question: `What does "${error.errorText}" mean?`,
      answer: error.plainMeaning,
    },
    {
      question: `How do I fix "${error.errorText}"?`,
      answer: error.steps.join(' '),
    },
    {
      question: `What causes "${error.errorText}"?`,
      answer: error.commonCauses.join('. ') + '.',
    },
    {
      question: `How do I prevent "${error.errorText}" from happening again?`,
      answer: error.prevention,
    },
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: 'Home', url: SITE_URL },
              { name: 'Error Lookup', url: `${SITE_URL}/error-lookup` },
              { name: error.errorText },
            ])
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd(faqs)),
        }}
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Error Lookup', href: '/error-lookup' },
            { label: error.errorText },
          ]}
        />

        {/* Reassurance banner */}
        <div className="card p-4 mt-4 mb-8 bg-blue-50 dark:bg-blue-900/10 border-brand-blue/20 text-center">
          <p className="text-[var(--text-primary)] font-medium">
            Don&rsquo;t worry — this is a common issue and usually easy to fix!
          </p>
        </div>

        {/* Error box */}
        <div className="rounded-xl border-2 border-red-400 dark:border-red-600 bg-red-50 dark:bg-red-900/10 p-6 mb-8">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl" aria-hidden="true">
              {deviceCategory?.icon ?? '❓'}
            </span>
            <span className="text-sm font-medium text-red-600 dark:text-red-400 uppercase tracking-wide">
              {deviceCategory?.label ?? error.device} Error
            </span>
          </div>
          <p className="text-xl sm:text-2xl font-mono font-bold text-red-700 dark:text-red-300">
            &ldquo;{error.errorText}&rdquo;
          </p>
        </div>

        {/* What this means */}
        <section className="mb-10">
          <h1 className="text-2xl sm:text-3xl font-bold font-[family-name:var(--font-heading)] text-[var(--text-primary)] mb-4">
            What This Means (In Plain English)
          </h1>
          <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
            {error.plainMeaning}
          </p>
        </section>

        {/* Severity */}
        <div className={`rounded-lg border p-4 mb-10 ${severity.color}`}>
          <div className="flex items-center gap-3">
            <span className={`w-3 h-3 rounded-full ${severity.dot} shrink-0`} />
            <div>
              <span className="font-semibold">{severity.label}</span>
              <span className="mx-2">&mdash;</span>
              <span>{severity.message}</span>
            </div>
          </div>
        </div>

        {/* Common causes */}
        <section className="mb-10">
          <h2 className="text-xl font-bold font-[family-name:var(--font-heading)] text-[var(--text-primary)] mb-4">
            Common Causes
          </h2>
          <ul className="space-y-2">
            {error.commonCauses.map((cause, i) => (
              <li
                key={i}
                className="flex items-start gap-3 text-[var(--text-secondary)]"
              >
                <span className="text-brand-blue font-bold mt-0.5 shrink-0">
                  &bull;
                </span>
                <span>{cause}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* How to fix it */}
        <section className="mb-10">
          <h2 className="text-xl sm:text-2xl font-bold font-[family-name:var(--font-heading)] text-[var(--text-primary)] mb-6">
            How to Fix It — Step by Step
          </h2>
          <ol className="space-y-4">
            {error.steps.map((step, i) => (
              <li key={i} className="flex items-start gap-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-brand-blue text-white font-bold text-sm shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <p className="text-lg text-[var(--text-primary)] leading-relaxed pt-0.5">
                  {step}
                </p>
              </li>
            ))}
          </ol>
        </section>

        {/* Prevention */}
        <section className="mb-10 card p-6 bg-emerald-50 dark:bg-emerald-900/10 border-emerald-200 dark:border-emerald-700/30">
          <h2 className="text-xl font-bold font-[family-name:var(--font-heading)] text-[var(--text-primary)] mb-3">
            How to Prevent This in the Future
          </h2>
          <p className="text-[var(--text-secondary)] leading-relaxed">
            {error.prevention}
          </p>
        </section>

        {/* Related errors */}
        {relatedErrors.length > 0 && (
          <section className="mb-10">
            <h2 className="text-xl font-bold font-[family-name:var(--font-heading)] text-[var(--text-primary)] mb-4">
              Related Errors You Might See
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {relatedErrors.map((related) => {
                const relCat = DEVICE_CATEGORIES.find(
                  (c) => c.slug === related.device
                )
                return (
                  <Link
                    key={related.slug}
                    href={`/error-lookup/${related.slug}`}
                    className="card p-4 flex items-start gap-3 hover:border-brand-blue/30 transition-all no-underline group"
                  >
                    <span className="text-xl mt-0.5" aria-hidden="true">
                      {relCat?.icon ?? '❓'}
                    </span>
                    <div className="min-w-0">
                      <p className="font-semibold text-[var(--text-primary)] group-hover:text-brand-blue transition-colors truncate">
                        {related.errorText}
                      </p>
                      <p className="text-sm text-[var(--text-secondary)] line-clamp-2 mt-0.5">
                        {related.plainMeaning}
                      </p>
                    </div>
                  </Link>
                )
              })}
            </div>
          </section>
        )}

        {/* Closing reassurance */}
        <section className="card p-8 text-center bg-blue-50 dark:bg-blue-900/10 border-brand-blue/20 mt-6 mb-4">
          <p className="text-lg font-semibold text-[var(--text-primary)] mb-2">
            Still stuck? Don&rsquo;t worry!
          </p>
          <p className="text-[var(--text-secondary)]">
            If the steps above did not solve the problem, ask a trusted friend
            or family member for help, or{' '}
            <Link href="/contact" className="text-brand-blue hover:underline">
              contact us
            </Link>{' '}
            and we will do our best to assist you.
          </p>
        </section>

        {/* Back link */}
        <div className="mt-6 text-center">
          <Link
            href="/error-lookup"
            className="text-brand-blue hover:underline font-medium"
          >
            &larr; Back to Error Message Lookup
          </Link>
        </div>
      </div>
    </>
  )
}

import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { SITE_URL, SITE_NAME } from '@/lib/utils'
import { breadcrumbJsonLd, webApplicationJsonLd } from '@/lib/seo'
import Breadcrumbs from '@/components/Breadcrumbs'
import {
  getAllGovServices,
  getGovServiceBySlug,
  getGovServicesByCategory,
  getGovCategoryBySlug,
} from '@/lib/gov-services-data'

export function generateStaticParams() {
  return getAllGovServices().map((s) => ({ slug: s.slug }))
}

export async function generateMetadata(
  props: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await props.params
  const service = getGovServiceBySlug(slug)
  if (!service) return {}

  const title = `How to Use ${service.shortName} Online — Senior-Friendly Guide`
  const description = `Step-by-step guide to ${service.name} for seniors. ${service.description} Phone: ${service.phoneNumber ?? 'see guide'}.`
  const url = `${SITE_URL}/government-services/${slug}`

  return {
    title,
    description,
    keywords: [
      `${service.shortName} guide for seniors`,
      `how to use ${service.shortName}`,
      `${service.shortName} help`,
      `${service.name} senior guide`,
      `${service.shortName} step by step`,
    ],
    openGraph: {
      type: 'website',
      url,
      title,
      description,
      siteName: SITE_NAME,
      images: [
        {
          url: `${SITE_URL}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: `${service.shortName} Guide for Seniors`,
        },
      ],
    },
    twitter: { card: 'summary_large_image', title, description },
    alternates: { canonical: url },
  }
}

export default async function GovServicePage(
  props: { params: Promise<{ slug: string }> }
) {
  const { slug } = await props.params
  const service = getGovServiceBySlug(slug)
  if (!service) notFound()

  const category = getGovCategoryBySlug(service.category)
  const relatedServices = getGovServicesByCategory(service.category).filter(
    (s) => s.slug !== service.slug
  )

  const breadcrumbs = [
    { name: 'Home', url: SITE_URL },
    { name: 'Government Services', url: `${SITE_URL}/government-services` },
    { name: service.shortName },
  ]

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(breadcrumbs)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            webApplicationJsonLd({
              name: `${service.shortName} Senior Guide`,
              description: service.description,
              url: `${SITE_URL}/government-services/${slug}`,
              category: 'GovernmentApplication',
            })
          ),
        }}
      />

      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Government Services', href: '/government-services' },
          { label: service.shortName },
        ]}
      />

      {/* Header */}
      <header className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <span className="flex-shrink-0 w-16 h-16 rounded-2xl bg-brand-blue text-white flex items-center justify-center text-3xl">
            {service.icon}
          </span>
          <div>
            <h1
              className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-heading)]"
              style={{ color: 'var(--text-primary)' }}
            >
              {service.name}
            </h1>
            {category && (
              <span className="text-sm text-brand-blue">{category.label}</span>
            )}
          </div>
        </div>
        <p className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          {service.description}
        </p>
      </header>

      {/* Difficulty + Phone */}
      <div className="grid sm:grid-cols-2 gap-4 mb-8">
        <div
          className="rounded-xl border p-5"
          style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}
        >
          <p className="text-sm font-medium mb-1" style={{ color: 'var(--text-muted)' }}>
            Difficulty Level
          </p>
          <p
            className={`text-lg font-bold ${
              service.difficulty === 'easy'
                ? 'text-green-600'
                : service.difficulty === 'moderate'
                  ? 'text-yellow-600'
                  : 'text-red-600'
            }`}
          >
            {service.difficulty === 'easy'
              ? 'Easy — Most people can do this'
              : service.difficulty === 'moderate'
                ? 'Moderate — May need help first time'
                : 'More Complex — Consider getting help'}
          </p>
        </div>

        {service.phoneNumber && (
          <div
            className="rounded-xl border p-5"
            style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}
          >
            <p className="text-sm font-medium mb-1" style={{ color: 'var(--text-muted)' }}>
              Need Help? Call
            </p>
            <a
              href={`tel:${service.phoneNumber.replace(/[^+\d]/g, '')}`}
              className="text-lg font-bold text-brand-blue hover:underline"
            >
              {service.phoneNumber}
            </a>
          </div>
        )}
      </div>

      {/* Senior Tip */}
      <div className="mb-8 rounded-xl border-2 border-brand-blue bg-blue-50 dark:bg-blue-950/30 p-5">
        <p className="font-semibold text-brand-blue mb-1 text-lg">Senior Tip</p>
        <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          {service.seniorTip}
        </p>
      </div>

      {/* Step-by-Step Setup */}
      <section className="mb-10">
        <h2
          className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-6"
          style={{ color: 'var(--text-primary)' }}
        >
          How to Get Started
        </h2>
        <div className="space-y-4">
          {service.steps.map((step, i) => (
            <div
              key={i}
              className="flex gap-4 rounded-xl border p-5"
              style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}
            >
              <span className="flex-shrink-0 w-10 h-10 rounded-full bg-brand-blue text-white flex items-center justify-center font-bold text-lg">
                {i + 1}
              </span>
              <div>
                <h3 className="font-semibold text-lg" style={{ color: 'var(--text-primary)' }}>
                  {step.title}
                </h3>
                <p className="mt-1 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Common Tasks */}
      <section className="mb-10">
        <h2
          className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-6"
          style={{ color: 'var(--text-primary)' }}
        >
          Common Tasks You Can Do Online
        </h2>
        <div className="space-y-3">
          {service.commonTasks.map((task, i) => (
            <div
              key={i}
              className="rounded-xl border p-4"
              style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}
            >
              <p className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                {task.task}
              </p>
              <p className="text-sm mt-1 font-mono" style={{ color: 'var(--text-muted)' }}>
                {task.path}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Troubleshooting */}
      <section className="mb-10">
        <h2
          className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-6"
          style={{ color: 'var(--text-primary)' }}
        >
          Troubleshooting
        </h2>
        <div className="space-y-4">
          {service.troubleshooting.map((item, i) => (
            <details
              key={i}
              className="group rounded-xl border overflow-hidden"
              style={{ borderColor: 'var(--border-color)' }}
            >
              <summary
                className="cursor-pointer list-none p-5 text-lg font-semibold flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800/50"
                style={{ color: 'var(--text-primary)' }}
              >
                {item.problem}
                <span className="ml-2 text-brand-blue transition-transform group-open:rotate-180">
                  ▾
                </span>
              </summary>
              <div className="px-5 pb-5">
                <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {item.solution}
                </p>
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* Accessibility */}
      <section className="mb-10">
        <div
          className="rounded-xl border p-5"
          style={{ backgroundColor: 'var(--bg-tertiary)', borderColor: 'var(--border-color)' }}
        >
          <h2
            className="text-xl font-bold font-[family-name:var(--font-heading)] mb-2"
            style={{ color: 'var(--text-primary)' }}
          >
            Accessibility & Phone Help
          </h2>
          <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            {service.accessibilityNotes}
          </p>
        </div>
      </section>

      {/* Visit Website Button */}
      <div className="mb-10 text-center">
        <a
          href={service.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-8 py-4 bg-brand-blue text-white rounded-xl font-bold text-lg hover:bg-blue-800 transition-colors no-underline shadow-lg"
        >
          Visit {service.shortName}
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>

      {/* Related Services */}
      {relatedServices.length > 0 && (
        <section className="mb-10">
          <h2
            className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-4"
            style={{ color: 'var(--text-primary)' }}
          >
            Related {category?.label ?? 'Government'} Services
          </h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {relatedServices.map((related) => (
              <Link
                key={related.slug}
                href={`/government-services/${related.slug}`}
                className="flex items-center gap-3 px-4 py-3 rounded-xl border hover:border-brand-blue hover:shadow-sm transition-all no-underline group"
                style={{ borderColor: 'var(--border-color)' }}
              >
                <span className="text-xl flex-shrink-0">{related.icon}</span>
                <div className="min-w-0">
                  <p
                    className="font-medium group-hover:text-brand-blue transition-colors truncate"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {related.shortName}
                  </p>
                  <p className="text-xs truncate" style={{ color: 'var(--text-muted)' }}>
                    {related.description.substring(0, 60)}...
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Safety Reminder */}
      <div
        className="rounded-xl border-2 border-amber-400 bg-amber-50 dark:bg-amber-950/30 p-5 mb-8"
      >
        <p className="font-semibold text-amber-800 dark:text-amber-300 mb-2">
          Safety Reminder
        </p>
        <p className="text-amber-700 dark:text-amber-400 leading-relaxed">
          Always check that the website address ends in <strong>.gov</strong> before entering personal
          information. Never share your Social Security number, Medicare number, or bank details in
          response to an unsolicited email, call, or text.
        </p>
      </div>

      {/* Back Link */}
      <div className="text-center pt-4 border-t" style={{ borderColor: 'var(--border-color)' }}>
        <Link
          href="/government-services"
          className="text-brand-blue hover:underline font-medium"
        >
          ← View all government service guides
        </Link>
      </div>
    </div>
  )
}

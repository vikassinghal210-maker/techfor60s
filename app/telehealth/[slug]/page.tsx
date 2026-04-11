import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { SITE_URL, SITE_NAME } from '@/lib/utils'
import { breadcrumbJsonLd, webApplicationJsonLd } from '@/lib/seo'
import Breadcrumbs from '@/components/Breadcrumbs'
import {
  getAllTelehealthPlatforms,
  getTelehealthBySlug,
  getTelehealthByCategory,
  getTelehealthCategoryBySlug,
} from '@/lib/telehealth-data'

export function generateStaticParams() {
  return getAllTelehealthPlatforms().map((p) => ({ slug: p.slug }))
}

export async function generateMetadata(
  props: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await props.params
  const platform = getTelehealthBySlug(slug)
  if (!platform) return {}

  const title = `How to Use ${platform.shortName} for Telehealth — Senior Setup Guide`
  const description = `Step-by-step guide to setting up ${platform.name} for video doctor visits. ${platform.description.substring(0, 120)}`
  const url = `${SITE_URL}/telehealth/${slug}`

  return {
    title,
    description,
    keywords: [
      `${platform.shortName} setup guide`,
      `how to use ${platform.shortName}`,
      `${platform.shortName} telehealth`,
      `${platform.shortName} video visit`,
      `${platform.shortName} for seniors`,
    ],
    openGraph: {
      type: 'website', url, title, description, siteName: SITE_NAME,
      images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630 }],
    },
    twitter: { card: 'summary_large_image', title, description },
    alternates: { canonical: url },
  }
}

export default async function TelehealthPlatformPage(
  props: { params: Promise<{ slug: string }> }
) {
  const { slug } = await props.params
  const platform = getTelehealthBySlug(slug)
  if (!platform) notFound()

  const category = getTelehealthCategoryBySlug(platform.category)
  const related = getTelehealthByCategory(platform.category).filter((p) => p.slug !== platform.slug)

  const breadcrumbs = [
    { name: 'Home', url: SITE_URL },
    { name: 'Telehealth Guides', url: `${SITE_URL}/telehealth` },
    { name: platform.shortName },
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
          __html: JSON.stringify(webApplicationJsonLd({
            name: `${platform.shortName} Setup Guide`,
            description: platform.description,
            url: `${SITE_URL}/telehealth/${slug}`,
            category: 'HealthApplication',
          })),
        }}
      />

      <Breadcrumbs items={[
        { label: 'Home', href: '/' },
        { label: 'Telehealth Guides', href: '/telehealth' },
        { label: platform.shortName },
      ]} />

      {/* Header */}
      <header className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <span className="flex-shrink-0 w-16 h-16 rounded-2xl bg-brand-blue text-white flex items-center justify-center text-3xl">
            {platform.icon}
          </span>
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-heading)]" style={{ color: 'var(--text-primary)' }}>
              {platform.name}
            </h1>
            {category && <span className="text-sm text-brand-blue">{category.label}</span>}
          </div>
        </div>
        <p className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          {platform.description}
        </p>
      </header>

      {/* Quick Info */}
      <div className="grid sm:grid-cols-2 gap-4 mb-8">
        <div className="rounded-xl border p-5" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
          <p className="text-sm font-medium mb-1" style={{ color: 'var(--text-muted)' }}>Cost</p>
          <p className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>{platform.cost}</p>
        </div>
        <div className="rounded-xl border p-5" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
          <p className="text-sm font-medium mb-1" style={{ color: 'var(--text-muted)' }}>Medicare</p>
          <p className={`text-lg font-bold ${platform.acceptsMedicare ? 'text-green-600' : 'text-amber-600'}`}>
            {platform.acceptsMedicare ? 'Accepted' : 'Not directly — check your plan'}
          </p>
        </div>
      </div>

      {/* App Downloads */}
      {(platform.appIos || platform.appAndroid) && (
        <div className="mb-8 rounded-xl border p-5 flex flex-wrap gap-4" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
          <p className="w-full text-sm font-medium" style={{ color: 'var(--text-muted)' }}>Download the App</p>
          {platform.appIos && (
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
              🍎 {platform.appIos}
            </span>
          )}
          {platform.appAndroid && (
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
              🤖 {platform.appAndroid}
            </span>
          )}
        </div>
      )}

      {/* Setup Steps */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-6" style={{ color: 'var(--text-primary)' }}>
          How to Set Up {platform.shortName}
        </h2>
        <div className="space-y-4">
          {platform.setupSteps.map((step, i) => (
            <div key={i} className="flex gap-4 rounded-xl border p-5" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
              <span className="flex-shrink-0 w-10 h-10 rounded-full bg-brand-blue text-white flex items-center justify-center font-bold text-lg">
                {i + 1}
              </span>
              <div>
                <h3 className="font-semibold text-lg" style={{ color: 'var(--text-primary)' }}>{step.title}</h3>
                <p className="mt-1 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-4" style={{ color: 'var(--text-primary)' }}>
          What You Can Do
        </h2>
        <div className="rounded-xl border p-5" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
          <ul className="space-y-3">
            {platform.features.map((feature, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="text-green-500 mt-0.5 text-lg">✓</span>
                <span className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Tips */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-4" style={{ color: 'var(--text-primary)' }}>
          Tips for Seniors
        </h2>
        <div className="rounded-xl border-2 border-brand-blue bg-blue-50 dark:bg-blue-950/30 p-5">
          <ul className="space-y-3">
            {platform.tips.map((tip, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="text-brand-blue mt-0.5 text-lg">💡</span>
                <span className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Troubleshooting */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-6" style={{ color: 'var(--text-primary)' }}>
          Troubleshooting
        </h2>
        <div className="space-y-4">
          {platform.troubleshooting.map((item, i) => (
            <details key={i} className="group rounded-xl border overflow-hidden" style={{ borderColor: 'var(--border-color)' }}>
              <summary className="cursor-pointer list-none p-5 text-lg font-semibold flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800/50" style={{ color: 'var(--text-primary)' }}>
                {item.problem}
                <span className="ml-2 text-brand-blue transition-transform group-open:rotate-180">▾</span>
              </summary>
              <div className="px-5 pb-5">
                <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{item.solution}</p>
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* Visit Website */}
      <div className="mb-10 text-center">
        <a
          href={platform.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-8 py-4 bg-brand-blue text-white rounded-xl font-bold text-lg hover:bg-blue-800 transition-colors no-underline shadow-lg"
        >
          Visit {platform.shortName}
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>

      {/* Related Platforms */}
      {related.length > 0 && (
        <section className="mb-10">
          <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-4" style={{ color: 'var(--text-primary)' }}>
            Other {category?.label ?? 'Telehealth'} Options
          </h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {related.map((r) => (
              <Link key={r.slug} href={`/telehealth/${r.slug}`} className="flex items-center gap-3 px-4 py-3 rounded-xl border hover:border-brand-blue hover:shadow-sm transition-all no-underline group" style={{ borderColor: 'var(--border-color)' }}>
                <span className="text-xl flex-shrink-0">{r.icon}</span>
                <div className="min-w-0">
                  <p className="font-medium group-hover:text-brand-blue transition-colors truncate" style={{ color: 'var(--text-primary)' }}>{r.shortName}</p>
                  <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{r.cost}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Preparation Checklist */}
      <section className="mb-8 rounded-xl border p-6" style={{ backgroundColor: 'var(--bg-tertiary)', borderColor: 'var(--border-color)' }}>
        <h2 className="text-xl font-bold font-[family-name:var(--font-heading)] mb-4" style={{ color: 'var(--text-primary)' }}>
          Before Your Video Visit
        </h2>
        <ul className="space-y-2">
          {[
            'Find a quiet, well-lit room',
            'Charge your device fully',
            'Test your camera and microphone',
            'Have your medication list ready',
            'Write down your questions beforehand',
            'Log in 10 minutes early',
            'Have your insurance card nearby',
          ].map((item, i) => (
            <li key={i} className="flex items-center gap-2" style={{ color: 'var(--text-secondary)' }}>
              <span className="text-brand-blue">☐</span> {item}
            </li>
          ))}
        </ul>
      </section>

      <div className="text-center pt-4 border-t" style={{ borderColor: 'var(--border-color)' }}>
        <Link href="/telehealth" className="text-brand-blue hover:underline font-medium">
          ← View all telehealth guides
        </Link>
      </div>
    </div>
  )
}

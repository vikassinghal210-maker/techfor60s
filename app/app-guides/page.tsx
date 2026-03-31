import type { Metadata } from 'next'
import Link from 'next/link'
import { APPS, DEVICES, APP_CATEGORY_LABELS, getAppsByCategory, getDevicesForApp } from '@/lib/app-guides-data'
import { SITE_URL } from '@/lib/utils'
import { breadcrumbJsonLd } from '@/lib/seo'
import Breadcrumbs from '@/components/Breadcrumbs'

export const metadata: Metadata = {
  title: 'App Guides for Seniors — How to Use Popular Apps Step by Step',
  description:
    'Simple, step-by-step guides for seniors to learn WhatsApp, Zoom, Facebook, YouTube, Gmail, and more on iPhone, iPad, Android, Windows, Mac, and Chromebook.',
  keywords: [
    'app guides for seniors',
    'how to use apps for elderly',
    'senior app tutorials',
    'WhatsApp guide seniors',
    'Zoom tutorial elderly',
    'Facebook guide for older adults',
  ],
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/app-guides`,
    title: 'App Guides for Seniors — TechFor60s',
    description:
      'Simple, step-by-step guides to learn popular apps on any device. Written in plain English for adults over 60.',
    siteName: 'TechFor60s',
  },
  alternates: { canonical: `${SITE_URL}/app-guides` },
}

const categoryOrder = ['communication', 'social', 'productivity', 'shopping', 'finance', 'entertainment']

function StarRating({ rating }: { rating: number }) {
  return (
    <span className="inline-flex items-center gap-0.5" aria-label={`${rating} out of 5 senior-friendly rating`}>
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={i < rating ? 'text-yellow-500' : 'text-gray-300'}>
          ★
        </span>
      ))}
    </span>
  )
}

export default function AppGuidesIndex() {
  const appsByCategory = getAppsByCategory()
  const breadcrumbs = [
    { name: 'Home', url: SITE_URL },
    { name: 'App Guides' },
  ]

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd(breadcrumbs)),
        }}
      />

      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'App Guides' },
        ]}
      />

      {/* Hero */}
      <section className="mb-10">
        <h1
          className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-heading)] mb-4"
          style={{ color: 'var(--text-primary)' }}
        >
          App Guides for Seniors
        </h1>
        <p className="text-lg leading-relaxed max-w-3xl" style={{ color: 'var(--text-secondary)' }}>
          Learn how to use the most popular apps — step by step, in plain English.
          Pick an app below and we will show you exactly how to set it up and use it
          on your iPhone, iPad, Android, computer, or Chromebook.
        </p>
        <p className="mt-3 text-sm font-medium" style={{ color: 'var(--text-muted)' }}>
          {APPS.length} apps &middot; {DEVICES.length} devices &middot; {APPS.length * DEVICES.length} step-by-step guides
        </p>
      </section>

      {/* Category sections */}
      {categoryOrder.map((catSlug) => {
        const apps = appsByCategory[catSlug]
        if (!apps || apps.length === 0) return null
        return (
          <section key={catSlug} className="mb-12" id={catSlug}>
            <h2
              className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-6 flex items-center gap-2"
              style={{ color: 'var(--text-primary)' }}
            >
              {APP_CATEGORY_LABELS[catSlug]}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {apps.map((app) => {
                const devices = getDevicesForApp(app.slug)
                return (
                  <Link
                    key={app.slug}
                    href={`/app-guides/${app.slug}`}
                    className="group block rounded-xl border p-5 transition-shadow hover:shadow-lg"
                    style={{
                      backgroundColor: 'var(--bg-primary)',
                      borderColor: 'var(--border-color)',
                    }}
                  >
                    <div className="flex items-start gap-4">
                      <span className="text-4xl flex-shrink-0">{app.icon}</span>
                      <div className="min-w-0">
                        <h3
                          className="text-lg font-bold font-[family-name:var(--font-heading)] group-hover:text-brand-blue transition-colors"
                          style={{ color: 'var(--text-primary)' }}
                        >
                          {app.name}
                        </h3>
                        <span
                          className="inline-block text-xs font-semibold px-2 py-0.5 rounded-full mt-1 mb-2"
                          style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-muted)' }}
                        >
                          {APP_CATEGORY_LABELS[app.category]}
                        </span>
                        <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--text-secondary)' }}>
                          {app.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <StarRating rating={app.seniorFriendly} />
                          <span className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>
                            {devices.length} device {devices.length === 1 ? 'guide' : 'guides'}
                          </span>
                        </div>
                        <span
                          className="inline-block mt-3 text-sm font-medium text-brand-blue group-hover:underline"
                        >
                          View guides &rarr;
                        </span>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </section>
        )
      })}

      {/* Quick-jump by device */}
      <section
        className="rounded-xl p-6 border mt-4 mb-10"
        style={{ backgroundColor: 'var(--bg-tertiary)', borderColor: 'var(--border-color)' }}
      >
        <h2
          className="text-xl font-bold font-[family-name:var(--font-heading)] mb-4"
          style={{ color: 'var(--text-primary)' }}
        >
          Browse by Device
        </h2>
        <p className="mb-4 text-sm" style={{ color: 'var(--text-muted)' }}>
          Already know your device? Jump to all the app guides for it:
        </p>
        <div className="flex flex-wrap gap-3">
          {DEVICES.map((device) => (
            <span
              key={device.slug}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border text-sm font-medium"
              style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)', backgroundColor: 'var(--bg-primary)' }}
            >
              <span>{device.icon}</span>
              {device.name}
            </span>
          ))}
        </div>
      </section>

      {/* Back to home */}
      <div className="text-center pt-4 border-t" style={{ borderColor: 'var(--border-color)' }}>
        <Link href="/" className="text-brand-blue hover:underline font-medium">
          Back to TechFor60s Home
        </Link>
      </div>
    </div>
  )
}

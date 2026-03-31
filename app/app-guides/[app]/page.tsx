import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  APPS,
  DEVICES,
  APP_CATEGORY_LABELS,
  getApp,
  getDevicesForApp,
  getGuide,
} from '@/lib/app-guides-data'
import { SITE_URL } from '@/lib/utils'
import { breadcrumbJsonLd } from '@/lib/seo'
import Breadcrumbs from '@/components/Breadcrumbs'

export async function generateStaticParams() {
  return APPS.map((app) => ({ app: app.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ app: string }>
}): Promise<Metadata> {
  const { app: appSlug } = await params
  const app = getApp(appSlug)
  if (!app) return {}

  const title = `How to Use ${app.name} — Guides for Every Device`
  const description = `Step-by-step ${app.name} guides for seniors on iPhone, iPad, Android, Windows PC, Mac, and Chromebook. Download, set up, and learn the basics in plain English.`
  const url = `${SITE_URL}/app-guides/${app.slug}`

  return {
    title,
    description,
    keywords: [
      `how to use ${app.name.toLowerCase()}`,
      `${app.name.toLowerCase()} guide for seniors`,
      `${app.name.toLowerCase()} tutorial elderly`,
      `${app.name.toLowerCase()} setup help`,
      `${app.name.toLowerCase()} step by step`,
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

export default async function AppDetailPage({
  params,
}: {
  params: Promise<{ app: string }>
}) {
  const { app: appSlug } = await params
  const app = getApp(appSlug)
  if (!app) notFound()

  const devices = getDevicesForApp(appSlug)
  const otherApps = APPS.filter((a) => a.category === app.category && a.slug !== app.slug)

  const breadcrumbs = [
    { name: 'Home', url: SITE_URL },
    { name: 'App Guides', url: `${SITE_URL}/app-guides` },
    { name: app.name },
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
          { label: 'App Guides', href: '/app-guides' },
          { label: app.name },
        ]}
      />

      {/* App Hero */}
      <section className="mb-10">
        <div className="flex items-start gap-5 mb-5">
          <span className="text-6xl flex-shrink-0">{app.icon}</span>
          <div>
            <h1
              className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-heading)] mb-2"
              style={{ color: 'var(--text-primary)' }}
            >
              How to Use {app.name}
            </h1>
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <span
                className="text-xs font-semibold px-2.5 py-1 rounded-full"
                style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-muted)' }}
              >
                {APP_CATEGORY_LABELS[app.category]}
              </span>
              <span
                className="text-xs font-medium px-2.5 py-1 rounded-full"
                style={{ backgroundColor: app.free ? '#dcfce7' : '#fef3c7', color: app.free ? '#166534' : '#92400e' }}
              >
                {app.free ? 'Free' : 'Paid Subscription'}
              </span>
              <StarRating rating={app.seniorFriendly} />
            </div>
            <p className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              {app.description}
            </p>
            <p className="mt-2 text-sm" style={{ color: 'var(--text-muted)' }}>
              Official website:{' '}
              <a
                href={app.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-blue hover:underline"
              >
                {app.website.replace(/^https?:\/\//, '')}
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* Device Picker */}
      <section className="mb-10">
        <h2
          className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-2"
          style={{ color: 'var(--text-primary)' }}
        >
          Choose Your Device
        </h2>
        <p className="mb-5" style={{ color: 'var(--text-muted)' }}>
          Select the device you want to use {app.name} on. We will walk you through every step.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {devices.map((device) => {
            const guide = getGuide(appSlug, device.slug)
            const stepCount = guide
              ? guide.downloadSteps.length + guide.setupSteps.length + guide.basicUsage.length
              : 0
            return (
              <Link
                key={device.slug}
                href={`/app-guides/${appSlug}/${device.slug}`}
                className="group flex items-center gap-4 rounded-xl border p-5 transition-all hover:shadow-lg hover:border-brand-blue"
                style={{
                  backgroundColor: 'var(--bg-primary)',
                  borderColor: 'var(--border-color)',
                }}
              >
                <span className="text-4xl flex-shrink-0">{device.icon}</span>
                <div>
                  <h3
                    className="text-lg font-bold font-[family-name:var(--font-heading)] group-hover:text-brand-blue transition-colors"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {device.name}
                  </h3>
                  <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                    {stepCount} steps &middot; Full guide
                  </p>
                  <span className="inline-block mt-1 text-sm font-medium text-brand-blue group-hover:underline">
                    Read guide &rarr;
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      {/* What You Will Learn */}
      <section
        className="mb-10 rounded-xl p-6 border-l-4 border-l-brand-blue"
        style={{ backgroundColor: 'var(--bg-tertiary)' }}
      >
        <h2
          className="text-xl font-bold font-[family-name:var(--font-heading)] mb-3"
          style={{ color: 'var(--text-primary)' }}
        >
          What You Will Learn
        </h2>
        <ul className="space-y-2">
          <li className="flex items-start gap-2">
            <span className="text-brand-blue font-bold mt-0.5">1.</span>
            <span style={{ color: 'var(--text-secondary)' }}>
              How to download and install {app.name} on your device
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-brand-blue font-bold mt-0.5">2.</span>
            <span style={{ color: 'var(--text-secondary)' }}>
              How to set up your account and get started
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-brand-blue font-bold mt-0.5">3.</span>
            <span style={{ color: 'var(--text-secondary)' }}>
              Basic features and how to use them every day
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-brand-blue font-bold mt-0.5">4.</span>
            <span style={{ color: 'var(--text-secondary)' }}>
              Senior-friendly tips and common problems solved
            </span>
          </li>
        </ul>
      </section>

      {/* Related Apps */}
      {otherApps.length > 0 && (
        <section className="mb-10">
          <h2
            className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-4"
            style={{ color: 'var(--text-primary)' }}
          >
            More {APP_CATEGORY_LABELS[app.category]} Apps
          </h2>
          <div className="flex flex-wrap gap-3">
            {otherApps.map((a) => (
              <Link
                key={a.slug}
                href={`/app-guides/${a.slug}`}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border text-sm font-medium transition-colors hover:bg-brand-blue hover:text-white hover:border-brand-blue"
                style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
              >
                <span>{a.icon}</span>
                {a.name}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Back to index */}
      <div className="text-center pt-4 border-t" style={{ borderColor: 'var(--border-color)' }}>
        <Link href="/app-guides" className="text-brand-blue hover:underline font-medium">
          Browse All App Guides
        </Link>
      </div>
    </div>
  )
}

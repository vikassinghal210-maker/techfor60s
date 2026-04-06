import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  APPS,
  DEVICES,
  APP_CATEGORY_LABELS,
  getApp,
  getDevice,
  getGuide,
  getDevicesForApp,
  getAppsForDevice,
  getAllAppGuidePairs,
} from '@/lib/app-guides-data'
import { SITE_URL } from '@/lib/utils'
import { breadcrumbJsonLd, howToJsonLd, faqJsonLd } from '@/lib/seo'
import Breadcrumbs from '@/components/Breadcrumbs'

export async function generateStaticParams() {
  return getAllAppGuidePairs()
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ app: string; device: string }>
}): Promise<Metadata> {
  const { app: appSlug, device: deviceSlug } = await params
  const app = getApp(appSlug)
  const device = getDevice(deviceSlug)
  if (!app || !device) return {}

  const title = `How to Use ${app.name} on ${device.name} [2026 Setup Guide]`
  const description = `Download, set up, and start using ${app.name} on your ${device.name} — step by step. Written for seniors in plain English with troubleshooting tips.`
  const url = `${SITE_URL}/app-guides/${app.slug}/${device.slug}`

  return {
    title,
    description,
    keywords: [
      `how to use ${app.name.toLowerCase()} on ${device.name.toLowerCase()}`,
      `${app.name.toLowerCase()} ${device.name.toLowerCase()} guide`,
      `${app.name.toLowerCase()} tutorial for seniors`,
      `download ${app.name.toLowerCase()} ${device.name.toLowerCase()}`,
      `set up ${app.name.toLowerCase()} ${device.name.toLowerCase()}`,
      `${app.name.toLowerCase()} help elderly`,
    ],
    openGraph: {
      type: 'article',
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

export default async function AppGuideDevicePage({
  params,
}: {
  params: Promise<{ app: string; device: string }>
}) {
  const { app: appSlug, device: deviceSlug } = await params
  const app = getApp(appSlug)
  const device = getDevice(deviceSlug)
  const guide = getGuide(appSlug, deviceSlug)

  if (!app || !device || !guide) notFound()

  const otherDevices = getDevicesForApp(appSlug).filter((d) => d.slug !== deviceSlug)
  const otherApps = getAppsForDevice(deviceSlug).filter((a) => a.slug !== appSlug).slice(0, 6)
  const pageUrl = `${SITE_URL}/app-guides/${app.slug}/${device.slug}`

  const allSteps = [
    ...guide.downloadSteps.map((s, i) => ({ name: `Download Step ${i + 1}`, text: s })),
    ...guide.setupSteps.map((s) => ({ name: s.title, text: s.description })),
    ...guide.basicUsage.map((s) => ({ name: s.title, text: s.description })),
  ]

  const faqItems = guide.commonIssues.map((issue) => ({
    question: issue.problem,
    answer: issue.solution,
  }))

  const breadcrumbs = [
    { name: 'Home', url: SITE_URL },
    { name: 'App Guides', url: `${SITE_URL}/app-guides` },
    { name: app.name, url: `${SITE_URL}/app-guides/${app.slug}` },
    { name: device.name },
  ]

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      {/* JSON-LD: Breadcrumbs */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd(breadcrumbs)),
        }}
      />
      {/* JSON-LD: HowTo */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            howToJsonLd({
              name: `How to Use ${app.name} on ${device.name}`,
              description: `Step-by-step instructions to download, set up, and use ${app.name} on your ${device.name}.`,
              steps: allSteps,
              url: pageUrl,
              totalTime: 'PT10M',
            })
          ),
        }}
      />
      {/* JSON-LD: FAQ */}
      {faqItems.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqJsonLd(faqItems)),
          }}
        />
      )}

      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'App Guides', href: '/app-guides' },
          { label: app.name, href: `/app-guides/${app.slug}` },
          { label: device.name },
        ]}
      />

      {/* Hero */}
      <section className="mb-10">
        <div className="flex flex-wrap items-center gap-3 mb-4">
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
            {app.free ? 'Free App' : 'Paid Subscription'}
          </span>
          <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-blue-100 text-blue-800">
            {allSteps.length} steps total
          </span>
        </div>
        <h1
          className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-heading)] mb-4"
          style={{ color: 'var(--text-primary)' }}
        >
          How to Use {app.name} on {device.name}
        </h1>
        <p className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          This guide walks you through downloading, setting up, and using {app.name} on
          your {device.name} — one step at a time. No tech jargon, just clear instructions.
        </p>
      </section>

      {/* Step 1: Download */}
      <section className="mb-10">
        <h2
          className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-6 flex items-center gap-3"
          style={{ color: 'var(--text-primary)' }}
        >
          <span className="flex-shrink-0 w-9 h-9 rounded-full bg-brand-blue text-white flex items-center justify-center text-base font-bold">
            1
          </span>
          Download {app.name}
        </h2>
        <ol className="space-y-4 ml-12">
          {guide.downloadSteps.map((step, i) => (
            <li key={i} className="flex gap-3">
              <span
                className="flex-shrink-0 w-7 h-7 rounded-full border-2 border-brand-blue text-brand-blue flex items-center justify-center text-sm font-bold"
              >
                {i + 1}
              </span>
              <p className="text-lg leading-relaxed pt-0.5" style={{ color: 'var(--text-secondary)' }}>
                {step}
              </p>
            </li>
          ))}
        </ol>
      </section>

      {/* Step 2: Setup */}
      <section className="mb-10">
        <h2
          className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-6 flex items-center gap-3"
          style={{ color: 'var(--text-primary)' }}
        >
          <span className="flex-shrink-0 w-9 h-9 rounded-full bg-brand-blue text-white flex items-center justify-center text-base font-bold">
            2
          </span>
          Set Up Your Account
        </h2>
        <div className="space-y-5 ml-12">
          {guide.setupSteps.map((step, i) => (
            <div key={i} className="rounded-lg border p-4" style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)' }}>
              <h3 className="font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
                {step.title}
              </h3>
              <p className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Step 3: Basic Usage */}
      <section className="mb-10">
        <h2
          className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-6 flex items-center gap-3"
          style={{ color: 'var(--text-primary)' }}
        >
          <span className="flex-shrink-0 w-9 h-9 rounded-full bg-brand-blue text-white flex items-center justify-center text-base font-bold">
            3
          </span>
          How to Use {app.name}
        </h2>
        <div className="space-y-5 ml-12">
          {guide.basicUsage.map((usage, i) => (
            <div key={i} className="rounded-lg border p-4" style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)' }}>
              <h3 className="font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
                {usage.title}
              </h3>
              <p className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {usage.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Senior Tips Callout */}
      <section
        className="mb-10 rounded-xl p-6 border-l-4 border-l-brand-blue"
        style={{ backgroundColor: 'var(--bg-tertiary)' }}
      >
        <h2
          className="text-xl font-bold font-[family-name:var(--font-heading)] mb-4"
          style={{ color: 'var(--text-primary)' }}
        >
          Tips for Seniors
        </h2>
        <ul className="space-y-3">
          {guide.seniorTips.map((tip, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="text-brand-blue font-bold text-lg flex-shrink-0">&#10003;</span>
              <p className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {tip}
              </p>
            </li>
          ))}
        </ul>
      </section>

      {/* Common Issues FAQ */}
      {guide.commonIssues.length > 0 && (
        <section className="mb-10">
          <h2
            className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-6"
            style={{ color: 'var(--text-primary)' }}
          >
            Common Issues &amp; Solutions
          </h2>
          <div className="space-y-4">
            {guide.commonIssues.map((issue, i) => (
              <details
                key={i}
                className="group rounded-lg border overflow-hidden"
                style={{ borderColor: 'var(--border-color)' }}
              >
                <summary
                  className="flex items-center justify-between cursor-pointer p-4 font-bold text-lg hover:bg-blue-50 transition-colors"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {issue.problem}
                  <span className="text-brand-blue ml-2 group-open:rotate-180 transition-transform">&#9660;</span>
                </summary>
                <div
                  className="px-4 pb-4 text-lg leading-relaxed"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {issue.solution}
                </div>
              </details>
            ))}
          </div>
        </section>
      )}

      {/* Try on a Different Device */}
      {otherDevices.length > 0 && (
        <section className="mb-10">
          <h2
            className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-4"
            style={{ color: 'var(--text-primary)' }}
          >
            Use {app.name} on a Different Device
          </h2>
          <p className="mb-4" style={{ color: 'var(--text-muted)' }}>
            Same app, different device. Pick yours below:
          </p>
          <div className="flex flex-wrap gap-3">
            {otherDevices.map((d) => (
              <Link
                key={d.slug}
                href={`/app-guides/${appSlug}/${d.slug}`}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border text-sm font-medium transition-colors hover:bg-brand-blue hover:text-white hover:border-brand-blue"
                style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
              >
                <span>{d.icon}</span>
                {d.name}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* More Apps for This Device */}
      {otherApps.length > 0 && (
        <section className="mb-10">
          <h2
            className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-4"
            style={{ color: 'var(--text-primary)' }}
          >
            More App Guides for {device.name}
          </h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {otherApps.map((a) => (
              <Link
                key={a.slug}
                href={`/app-guides/${a.slug}/${deviceSlug}`}
                className="block rounded-lg border p-4 transition-shadow hover:shadow-md"
                style={{
                  backgroundColor: 'var(--bg-primary)',
                  borderColor: 'var(--border-color)',
                }}
              >
                <span className="flex items-center gap-2">
                  <span className="text-2xl">{a.icon}</span>
                  <span className="font-medium" style={{ color: 'var(--text-primary)' }}>
                    {a.name}
                  </span>
                </span>
                <span className="block text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
                  {APP_CATEGORY_LABELS[a.category]}
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Related Resources */}
      <section
        className="mb-10 rounded-xl p-6 border"
        style={{ backgroundColor: 'var(--bg-tertiary)', borderColor: 'var(--border-color)' }}
      >
        <h2
          className="text-xl font-bold font-[family-name:var(--font-heading)] mb-4"
          style={{ color: 'var(--text-primary)' }}
        >
          Related Articles
        </h2>
        <ul className="space-y-3">
          <li>
            <Link href="/tools/device-quiz" className="text-brand-blue hover:underline font-medium">
              Which Device Is Right for You? Take the Quiz
            </Link>
            <span className="block text-sm mt-0.5" style={{ color: 'var(--text-muted)' }}>
              Not sure which phone or tablet to get? Our quiz helps you decide.
            </span>
          </li>
          <li>
            <Link href="/app-guides" className="text-brand-blue hover:underline font-medium">
              Browse All App Guides
            </Link>
            <span className="block text-sm mt-0.5" style={{ color: 'var(--text-muted)' }}>
              Step-by-step guides for 15 popular apps on every device.
            </span>
          </li>
        </ul>
      </section>

      {/* Back to index */}
      <div
        className="text-center pt-4 border-t"
        style={{ borderColor: 'var(--border-color)' }}
      >
        <Link href="/app-guides" className="text-brand-blue hover:underline font-medium">
          Browse All App Guides
        </Link>
      </div>
    </div>
  )
}

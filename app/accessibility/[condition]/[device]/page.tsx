import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  CONDITIONS,
  ACCESS_DEVICES,
  getCondition,
  getAccessDevice,
  getGuide,
  getGuidesForCondition,
  getGuidesForDevice,
  getAllConditionDevicePairs,
} from '@/lib/accessibility-data'
import { SITE_URL } from '@/lib/utils'
import { breadcrumbJsonLd, howToJsonLd } from '@/lib/seo'
import Breadcrumbs from '@/components/Breadcrumbs'

export async function generateStaticParams() {
  return getAllConditionDevicePairs()
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ condition: string; device: string }>
}): Promise<Metadata> {
  const { condition: conditionSlug, device: deviceSlug } = await params
  const condition = getCondition(conditionSlug)
  const device = getAccessDevice(deviceSlug)
  if (!condition || !device) return {}

  const title = `${condition.name} Settings on ${device.name} — Accessibility Guide for Seniors`
  const description = `Step-by-step guide to set up ${condition.name.toLowerCase()} accessibility settings on your ${device.name}. Make your ${device.name} easier to use with ${condition.name.toLowerCase()}.`
  const url = `${SITE_URL}/accessibility/${condition.slug}/${device.slug}`

  return {
    title,
    description,
    keywords: [
      `${condition.name.toLowerCase()} settings ${device.name}`,
      `${condition.name.toLowerCase()} ${device.name} for seniors`,
      `${device.name} accessibility settings`,
      `${condition.name.toLowerCase()} ${device.brand} settings`,
      `make ${device.name} easier to use`,
      `${device.name} ${condition.name.toLowerCase()} guide`,
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

export default async function AccessibilityGuidePage({
  params,
}: {
  params: Promise<{ condition: string; device: string }>
}) {
  const { condition: conditionSlug, device: deviceSlug } = await params
  const condition = getCondition(conditionSlug)
  const device = getAccessDevice(deviceSlug)
  const guide = getGuide(conditionSlug, deviceSlug)

  if (!condition || !device || !guide) notFound()

  const otherDeviceGuides = getGuidesForCondition(conditionSlug).filter(
    (g) => g.deviceSlug !== deviceSlug
  )
  const otherConditionGuides = getGuidesForDevice(deviceSlug).filter(
    (g) => g.conditionSlug !== conditionSlug
  )

  const otherDevices = otherDeviceGuides
    .map((g) => ACCESS_DEVICES.find((d) => d.slug === g.deviceSlug))
    .filter(Boolean) as typeof ACCESS_DEVICES

  const otherConditions = otherConditionGuides
    .map((g) => CONDITIONS.find((c) => c.slug === g.conditionSlug))
    .filter(Boolean) as typeof CONDITIONS

  const breadcrumbs = [
    { name: 'Home', url: SITE_URL },
    { name: 'Accessibility Settings', url: `${SITE_URL}/accessibility` },
    { name: condition.name, url: `${SITE_URL}/accessibility/${condition.slug}` },
    { name: device.name },
  ]

  const pageUrl = `${SITE_URL}/accessibility/${condition.slug}/${device.slug}`

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd(breadcrumbs)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            howToJsonLd({
              name: `${condition.name} Accessibility Settings on ${device.name}`,
              description: `How to set up ${condition.name.toLowerCase()} accessibility settings on your ${device.name}.`,
              steps: guide.settings.map((setting, i) => ({
                name: `Step ${i + 1}: ${setting.name}`,
                text: `${setting.description} Navigate to: ${setting.path}`,
              })),
              url: pageUrl,
            })
          ),
        }}
      />

      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Accessibility Settings', href: '/accessibility' },
          { label: condition.name, href: `/accessibility/${condition.slug}` },
          { label: device.name },
        ]}
      />

      {/* Hero */}
      <section className="mb-10">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${condition.color}`}>
            {condition.icon} {condition.name}
          </span>
          <span
            className="text-xs font-medium px-2.5 py-1 rounded-full"
            style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-muted)' }}
          >
            {device.icon} {device.name}
          </span>
        </div>
        <h1
          className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-heading)] mb-4"
          style={{ color: 'var(--text-primary)' }}
        >
          {condition.name} Settings on {device.name}
        </h1>
        <p className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          {guide.intro}
        </p>
      </section>

      {/* Settings List */}
      <section className="mb-10">
        <h2
          className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-6"
          style={{ color: 'var(--text-primary)' }}
        >
          Settings to Turn On
        </h2>
        <ol className="space-y-6">
          {guide.settings.map((setting, i) => (
            <li key={i} className="flex gap-4">
              <span className="flex-shrink-0 w-10 h-10 rounded-full bg-brand-blue text-white flex items-center justify-center text-lg font-bold">
                {i + 1}
              </span>
              <div className="pt-1">
                <h3
                  className="text-lg font-bold font-[family-name:var(--font-heading)] mb-1"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {setting.name}
                </h3>
                <p
                  className="text-sm font-mono px-3 py-2 rounded-lg mb-2"
                  style={{
                    backgroundColor: 'var(--bg-tertiary)',
                    color: 'var(--text-secondary)',
                  }}
                >
                  {setting.path}
                </p>
                <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {setting.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* Tip Callout */}
      <section
        className="mb-10 rounded-xl p-6 border-l-4 border-l-brand-blue"
        style={{ backgroundColor: 'var(--bg-tertiary)' }}
      >
        <h3
          className="text-lg font-bold font-[family-name:var(--font-heading)] mb-2"
          style={{ color: 'var(--text-primary)' }}
        >
          Helpful Tip
        </h3>
        <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          {guide.tip}
        </p>
      </section>

      {/* Try on a Different Device */}
      {otherDevices.length > 0 && (
        <section className="mb-10">
          <h2
            className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-4"
            style={{ color: 'var(--text-primary)' }}
          >
            Try on a Different Device
          </h2>
          <p className="mb-4" style={{ color: 'var(--text-muted)' }}>
            Same condition, different device. Pick yours below:
          </p>
          <div className="flex flex-wrap gap-3">
            {otherDevices.map((d) => (
              <Link
                key={d.slug}
                href={`/accessibility/${condition.slug}/${d.slug}`}
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

      {/* Other Conditions for This Device */}
      {otherConditions.length > 0 && (
        <section className="mb-10">
          <h2
            className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-4"
            style={{ color: 'var(--text-primary)' }}
          >
            Other Conditions for {device.name}
          </h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {otherConditions.map((c) => (
              <Link
                key={c.slug}
                href={`/accessibility/${c.slug}/${device.slug}`}
                className="block rounded-lg border p-4 transition-shadow hover:shadow-md"
                style={{
                  backgroundColor: 'var(--bg-primary)',
                  borderColor: 'var(--border-color)',
                }}
              >
                <span className="font-medium" style={{ color: 'var(--text-primary)' }}>
                  {c.icon} {c.name}
                </span>
                <span className="block text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
                  {c.description}
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Related Articles */}
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
            <Link href="/how-to" className="text-brand-blue hover:underline font-medium">
              How-To Guides for Every Device
            </Link>
            <span className="block text-sm mt-0.5" style={{ color: 'var(--text-muted)' }}>
              Step-by-step instructions for common tasks on any device.
            </span>
          </li>
        </ul>
      </section>

      {/* Back to index */}
      <div
        className="text-center pt-4 border-t"
        style={{ borderColor: 'var(--border-color)' }}
      >
        <Link href="/accessibility" className="text-brand-blue hover:underline font-medium">
          Browse all Accessibility Guides
        </Link>
      </div>
    </div>
  )
}

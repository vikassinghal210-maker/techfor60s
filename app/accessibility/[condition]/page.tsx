import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { CONDITIONS, ACCESS_DEVICES, getCondition, getGuidesForCondition } from '@/lib/accessibility-data'
import { SITE_URL } from '@/lib/utils'
import { breadcrumbJsonLd } from '@/lib/seo'
import Breadcrumbs from '@/components/Breadcrumbs'

export async function generateStaticParams() {
  return CONDITIONS.map((c) => ({ condition: c.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ condition: string }>
}): Promise<Metadata> {
  const { condition: conditionSlug } = await params
  const condition = getCondition(conditionSlug)
  if (!condition) return {}

  const title = `${condition.name} Accessibility Settings — Device Guides for Seniors`
  const description = `Step-by-step ${condition.name.toLowerCase()} accessibility settings for iPhone, iPad, Android, Windows, Mac, and Chromebook. Make any device easier to use with ${condition.name.toLowerCase()}.`
  const url = `${SITE_URL}/accessibility/${condition.slug}`

  return {
    title,
    description,
    keywords: [
      `${condition.name.toLowerCase()} accessibility settings`,
      `${condition.name.toLowerCase()} phone settings`,
      `${condition.name.toLowerCase()} device settings for seniors`,
      `${condition.name.toLowerCase()} iphone settings`,
      `${condition.name.toLowerCase()} android settings`,
      `make device easier to use ${condition.name.toLowerCase()}`,
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

export default async function ConditionPage({
  params,
}: {
  params: Promise<{ condition: string }>
}) {
  const { condition: conditionSlug } = await params
  const condition = getCondition(conditionSlug)

  if (!condition) notFound()

  const guides = getGuidesForCondition(conditionSlug)
  const availableDeviceSlugs = new Set(guides.map((g) => g.deviceSlug))
  const devices = ACCESS_DEVICES.filter((d) => availableDeviceSlugs.has(d.slug))

  const breadcrumbs = [
    { name: 'Home', url: SITE_URL },
    { name: 'Accessibility Settings', url: `${SITE_URL}/accessibility` },
    { name: condition.name },
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
          { label: 'Accessibility Settings', href: '/accessibility' },
          { label: condition.name },
        ]}
      />

      {/* Hero */}
      <section className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-4xl">{condition.icon}</span>
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${condition.color}`}>
            {condition.name}
          </span>
        </div>
        <h1
          className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-heading)] mb-4"
          style={{ color: 'var(--text-primary)' }}
        >
          {condition.name} Settings for Every Device
        </h1>
        <p className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          {condition.description} Choose your device below for step-by-step instructions.
        </p>
      </section>

      {/* Device Cards Grid */}
      <section className="mb-10">
        <h2
          className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-6"
          style={{ color: 'var(--text-primary)' }}
        >
          Choose Your Device
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {devices.map((device) => (
            <Link
              key={device.slug}
              href={`/accessibility/${condition.slug}/${device.slug}`}
              className="block rounded-xl border p-5 transition-shadow hover:shadow-md"
              style={{
                backgroundColor: 'var(--bg-primary)',
                borderColor: 'var(--border-color)',
              }}
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl">{device.icon}</span>
                <div>
                  <h3
                    className="text-lg font-bold font-[family-name:var(--font-heading)]"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {device.name}
                  </h3>
                  <span className="text-sm" style={{ color: 'var(--text-muted)' }}>
                    {device.brand}
                  </span>
                </div>
              </div>
              <span className="inline-block mt-2 text-sm font-medium text-brand-blue">
                View settings guide &rarr;
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Other Conditions */}
      <section className="mb-10">
        <h2
          className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-4"
          style={{ color: 'var(--text-primary)' }}
        >
          Other Conditions
        </h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {CONDITIONS.filter((c) => c.slug !== conditionSlug).map((c) => (
            <Link
              key={c.slug}
              href={`/accessibility/${c.slug}`}
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

      {/* Back to accessibility index */}
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

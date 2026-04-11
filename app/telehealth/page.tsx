import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_URL, SITE_NAME } from '@/lib/utils'
import { breadcrumbJsonLd } from '@/lib/seo'
import Breadcrumbs from '@/components/Breadcrumbs'
import { TELEHEALTH_PLATFORMS, TELEHEALTH_CATEGORIES } from '@/lib/telehealth-data'

const PAGE_URL = `${SITE_URL}/telehealth`

export const metadata: Metadata = {
  title: 'Telehealth Platform Guides — Video Doctor Visits Made Simple',
  description:
    'Step-by-step setup guides for MyChart, Teladoc, Kaiser, VA Video Connect, and more. Learn how to have a video doctor appointment from home.',
  keywords: [
    'telehealth for seniors',
    'mychart setup guide',
    'teladoc how to use',
    'video doctor visit',
    'telehealth setup help',
    'virtual doctor appointment senior',
    'va video connect setup',
    'kaiser telehealth guide',
  ],
  openGraph: {
    type: 'website',
    url: PAGE_URL,
    title: 'Telehealth Platform Guides — Video Doctor Visits Made Simple',
    description: 'Step-by-step guides for video doctor visits. MyChart, Teladoc, Kaiser, and more.',
    siteName: SITE_NAME,
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630 }],
  },
  alternates: { canonical: PAGE_URL },
}

export default function TelehealthHubPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd([
            { name: 'Home', url: SITE_URL },
            { name: 'Telehealth Guides' },
          ])),
        }}
      />

      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Telehealth Guides' }]} />

      <header className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-heading)] mb-4" style={{ color: 'var(--text-primary)' }}>
          Telehealth Setup Guides
        </h1>
        <p className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          See your doctor from home using video. These step-by-step guides show you exactly how to
          set up and use each telehealth platform — in plain English.
        </p>
      </header>

      {/* Readiness checker CTA */}
      <div className="mb-10 rounded-xl border-2 border-brand-blue bg-blue-50 dark:bg-blue-950/30 p-6 text-center">
        <p className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
          Not sure if you&apos;re ready for telehealth?
        </p>
        <Link
          href="/tools/telehealth-readiness"
          className="inline-block px-6 py-3 bg-brand-blue text-white rounded-xl font-bold hover:bg-blue-800 transition-colors no-underline"
        >
          Take the Telehealth Readiness Check
        </Link>
      </div>

      {/* Categories */}
      {TELEHEALTH_CATEGORIES.map((cat) => {
        const platforms = TELEHEALTH_PLATFORMS.filter((p) => p.category === cat.slug)
        if (platforms.length === 0) return null

        return (
          <section key={cat.slug} className="mb-10">
            <h2
              className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-2 flex items-center gap-3"
              style={{ color: 'var(--text-primary)' }}
            >
              <span>{cat.icon}</span> {cat.label}
            </h2>
            <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>{cat.description}</p>

            <div className="grid sm:grid-cols-2 gap-4">
              {platforms.map((platform) => (
                <Link
                  key={platform.slug}
                  href={`/telehealth/${platform.slug}`}
                  className="group rounded-xl border p-5 hover:shadow-md hover:border-brand-blue transition-all no-underline"
                  style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl flex-shrink-0">{platform.icon}</span>
                    <div className="min-w-0">
                      <h3 className="font-semibold text-lg group-hover:text-brand-blue transition-colors" style={{ color: 'var(--text-primary)' }}>
                        {platform.shortName}
                      </h3>
                      <p className="text-sm mt-1 line-clamp-2 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                        {platform.description.substring(0, 120)}...
                      </p>
                      <div className="mt-2 flex flex-wrap items-center gap-2">
                        <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 font-medium">
                          {platform.cost}
                        </span>
                        {platform.acceptsMedicare && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 font-medium">
                            Medicare accepted
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )
      })}

      {/* Related */}
      <section className="rounded-xl border p-6 mt-10" style={{ backgroundColor: 'var(--bg-tertiary)', borderColor: 'var(--border-color)' }}>
        <h2 className="text-xl font-bold font-[family-name:var(--font-heading)] mb-4" style={{ color: 'var(--text-primary)' }}>
          Related Guides
        </h2>
        <ul className="space-y-3">
          <li>
            <Link href="/blog/telehealth-guide-for-seniors" className="text-brand-blue hover:underline font-medium">
              Complete Telehealth Guide for Seniors
            </Link>
          </li>
          <li>
            <Link href="/blog/best-video-calling-apps-for-seniors" className="text-brand-blue hover:underline font-medium">
              Best Video Calling Apps for Seniors
            </Link>
          </li>
          <li>
            <Link href="/tools/wifi-troubleshooter" className="text-brand-blue hover:underline font-medium">
              WiFi Troubleshooter — Fix Connection Issues
            </Link>
          </li>
          <li>
            <Link href="/government-services/medicare-gov" className="text-brand-blue hover:underline font-medium">
              How to Use Medicare.gov
            </Link>
          </li>
        </ul>
      </section>
    </div>
  )
}

import type { Metadata } from 'next'
import Link from 'next/link'
import { getUSCities, getUKCities } from '@/lib/cities-data'
import { SITE_URL } from '@/lib/utils'
import { breadcrumbJsonLd } from '@/lib/seo'
import Breadcrumbs from '@/components/Breadcrumbs'
import CityGrid from '@/components/CityGrid'

export const metadata: Metadata = {
  title: 'Free Tech Classes for Seniors Near You',
  description:
    'Find free technology classes, computer help, and digital literacy programs for seniors in 30 major US and UK cities. Libraries, community centers, and nonprofits offering hands-on tech training.',
  keywords: [
    'free tech classes for seniors',
    'senior computer classes near me',
    'technology help for elderly',
    'digital literacy programs seniors',
    'free computer classes for older adults',
  ],
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/tools/tech-classes`,
    title: 'Free Tech Classes for Seniors Near You',
    description:
      'Find free technology classes and digital literacy programs for seniors in 30 major US and UK cities.',
    siteName: 'TechFor60s',
  },
  alternates: { canonical: `${SITE_URL}/tools/tech-classes` },
}

export default function TechClassesIndexPage() {
  const usCities = getUSCities()
  const ukCities = getUKCities()

  const breadcrumbs = [
    { name: 'Home', url: SITE_URL },
    { name: 'Tech Classes for Seniors' },
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
          { label: 'Tech Classes for Seniors' },
        ]}
      />

      {/* Hero */}
      <section className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-heading)] mb-4" style={{ color: 'var(--text-primary)' }}>
          Free Tech Classes for Seniors Near You
        </h1>
        <p className="text-lg leading-relaxed max-w-3xl" style={{ color: 'var(--text-secondary)' }}>
          Find free technology classes, computer help, and digital literacy programs in your city.
          We have compiled resources for 30 major cities across the United States and United Kingdom
          — including libraries, community centers, and nonprofits that offer hands-on tech training
          for adults over 60.
        </p>
      </section>

      <CityGrid usCities={usCities} ukCities={ukCities} />

      {/* Helpful Links */}
      <section className="mt-8 rounded-xl p-6 border" style={{ backgroundColor: 'var(--bg-tertiary)', borderColor: 'var(--border-color)' }}>
        <h2 className="text-xl font-bold font-[family-name:var(--font-heading)] mb-4" style={{ color: 'var(--text-primary)' }}>
          More Helpful Resources
        </h2>
        <ul className="space-y-3">
          <li>
            <Link href="/blog/best-free-apps-for-seniors-2026" className="text-brand-blue hover:underline font-medium">
              Best Free Apps for Seniors in 2026
            </Link>
            <span className="block text-sm mt-0.5" style={{ color: 'var(--text-muted)' }}>
              The most useful free apps for staying connected, managing health, and having fun.
            </span>
          </li>
          <li>
            <Link href="/tools/device-quiz" className="text-brand-blue hover:underline font-medium">
              Which Device Is Right for You? Take the Quiz
            </Link>
            <span className="block text-sm mt-0.5" style={{ color: 'var(--text-muted)' }}>
              Not sure whether you need a tablet, smartphone, or laptop? Our quick quiz will help.
            </span>
          </li>
        </ul>
      </section>
    </div>
  )
}

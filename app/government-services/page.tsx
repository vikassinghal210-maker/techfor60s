import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_URL, SITE_NAME } from '@/lib/utils'
import { breadcrumbJsonLd } from '@/lib/seo'
import Breadcrumbs from '@/components/Breadcrumbs'
import { GOV_SERVICES, GOV_SERVICE_CATEGORIES } from '@/lib/gov-services-data'

const PAGE_URL = `${SITE_URL}/government-services`

export const metadata: Metadata = {
  title: 'Government Services Online — Senior-Friendly Guides',
  description:
    'Step-by-step guides to using government websites like SSA.gov, Medicare.gov, IRS.gov, and VA.gov. Written in plain English for seniors.',
  keywords: [
    'government services online for seniors',
    'ssa.gov help for seniors',
    'medicare.gov guide',
    'irs.gov help',
    'va.gov guide for seniors',
    'government websites for elderly',
    'senior government benefits online',
    'how to use government websites',
  ],
  openGraph: {
    type: 'website',
    url: PAGE_URL,
    title: 'Government Services Online — Senior-Friendly Guides',
    description:
      'Plain English guides to Social Security, Medicare, IRS, VA, and other government websites.',
    siteName: SITE_NAME,
    images: [
      {
        url: `${SITE_URL}/api/og?title=${encodeURIComponent('Government Services Online Guides')}`,
        width: 1200,
        height: 630,
        alt: 'Government Services Online Guides for Seniors',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Government Services Online — Senior-Friendly Guides',
    description: 'Plain English guides to government websites for seniors.',
  },
  alternates: { canonical: PAGE_URL },
}

export default function GovernmentServicesPage() {
  const breadcrumbs = [
    { name: 'Home', url: SITE_URL },
    { name: 'Government Services' },
  ]

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(breadcrumbs)) }}
      />

      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Government Services' }]} />

      <header className="mb-10">
        <h1
          className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-heading)] mb-4"
          style={{ color: 'var(--text-primary)' }}
        >
          Government Services Online
        </h1>
        <p className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          Step-by-step guides to using government websites — written in plain English for seniors.
          No jargon, no confusion. Each guide shows you exactly what to click and what to type.
        </p>
      </header>

      {/* Safety Warning */}
      <div
        className="mb-10 rounded-xl border-2 border-amber-400 bg-amber-50 dark:bg-amber-950/30 p-5"
      >
        <p className="font-semibold text-amber-800 dark:text-amber-300 mb-2 text-lg">
          Stay Safe Online
        </p>
        <p className="text-amber-700 dark:text-amber-400 leading-relaxed">
          Real government websites always end in <strong>.gov</strong>. The government will never
          ask for payment by gift card, wire transfer, or cryptocurrency. If you get an email or
          call threatening you from a &quot;government agency,&quot; it is almost certainly a scam.
        </p>
      </div>

      {/* Categories */}
      {GOV_SERVICE_CATEGORIES.map((cat) => {
        const services = GOV_SERVICES.filter((s) => s.category === cat.slug)
        if (services.length === 0) return null

        return (
          <section key={cat.slug} className="mb-10">
            <h2
              className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-2 flex items-center gap-3"
              style={{ color: 'var(--text-primary)' }}
            >
              <span className="text-2xl">{cat.icon}</span> {cat.label}
            </h2>
            <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>
              {cat.description}
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              {services.map((service) => (
                <Link
                  key={service.slug}
                  href={`/government-services/${service.slug}`}
                  className="group rounded-xl border p-5 hover:shadow-md hover:border-brand-blue transition-all no-underline"
                  style={{
                    backgroundColor: 'var(--bg-secondary)',
                    borderColor: 'var(--border-color)',
                  }}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl flex-shrink-0">{service.icon}</span>
                    <div className="min-w-0">
                      <h3
                        className="font-semibold text-lg group-hover:text-brand-blue transition-colors"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        {service.shortName}
                      </h3>
                      <p
                        className="text-sm mt-1 line-clamp-2 leading-relaxed"
                        style={{ color: 'var(--text-secondary)' }}
                      >
                        {service.description}
                      </p>
                      <div className="mt-2 flex items-center gap-2">
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                            service.difficulty === 'easy'
                              ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                              : service.difficulty === 'moderate'
                                ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                                : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                          }`}
                        >
                          {service.difficulty === 'easy'
                            ? 'Easy'
                            : service.difficulty === 'moderate'
                              ? 'Moderate'
                              : 'More Complex'}
                        </span>
                        {service.phoneNumber && (
                          <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                            Phone help available
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

      {/* Related Resources */}
      <section
        className="rounded-xl border p-6 mt-10"
        style={{ backgroundColor: 'var(--bg-tertiary)', borderColor: 'var(--border-color)' }}
      >
        <h2
          className="text-xl font-bold font-[family-name:var(--font-heading)] mb-4"
          style={{ color: 'var(--text-primary)' }}
        >
          Related Guides
        </h2>
        <ul className="space-y-3">
          <li>
            <Link href="/tools/scam-checker" className="text-brand-blue hover:underline font-medium">
              Is This a Scam? — Free Scam Checker Tool
            </Link>
            <span className="block text-sm mt-0.5" style={{ color: 'var(--text-muted)' }}>
              Check suspicious emails claiming to be from government agencies.
            </span>
          </li>
          <li>
            <Link href="/blog/how-to-create-strong-passwords" className="text-brand-blue hover:underline font-medium">
              How to Create Strong Passwords
            </Link>
            <span className="block text-sm mt-0.5" style={{ color: 'var(--text-muted)' }}>
              Keep your government accounts secure with strong, unique passwords.
            </span>
          </li>
          <li>
            <Link href="/senior-discounts" className="text-brand-blue hover:underline font-medium">
              Senior Discounts Directory
            </Link>
            <span className="block text-sm mt-0.5" style={{ color: 'var(--text-muted)' }}>
              Find discounts available to adults over 60.
            </span>
          </li>
        </ul>
      </section>
    </div>
  )
}

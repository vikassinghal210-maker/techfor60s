import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { cities, getCityBySlug, getNearbyCities } from '@/lib/cities-data'
import { SITE_URL } from '@/lib/utils'
import { breadcrumbJsonLd } from '@/lib/seo'
import Breadcrumbs from '@/components/Breadcrumbs'

export async function generateStaticParams() {
  return cities.map((city) => ({ city: city.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>
}): Promise<Metadata> {
  const { city: slug } = await params
  const city = getCityBySlug(slug)
  if (!city) return {}

  const title = `Free Tech Classes for Seniors in ${city.name} (2026)`
  const description = `Find free technology classes, computer help, and digital literacy programs for seniors in ${city.name}, ${city.region}. Libraries, community centers, and nonprofits offering hands-on tech training.`
  const url = `${SITE_URL}/tools/tech-classes/${city.slug}`

  return {
    title,
    description,
    keywords: [
      `free tech classes for seniors ${city.name}`,
      `senior computer classes ${city.name}`,
      `technology help for elderly ${city.name}`,
      `digital literacy seniors ${city.region}`,
      `free computer classes near me`,
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

const typeLabels: Record<string, string> = {
  library: 'Library Program',
  'community-center': 'Community Center',
  nonprofit: 'Nonprofit Organization',
  online: 'Online Program',
}

const typeColors: Record<string, string> = {
  library: 'bg-blue-100 text-blue-800',
  'community-center': 'bg-green-100 text-green-800',
  nonprofit: 'bg-purple-100 text-purple-800',
  online: 'bg-amber-100 text-amber-800',
}

export default async function CityTechClassesPage({
  params,
}: {
  params: Promise<{ city: string }>
}) {
  const { city: slug } = await params
  const city = getCityBySlug(slug)
  if (!city) notFound()

  const nearby = getNearbyCities(slug)

  const breadcrumbs = [
    { name: 'Home', url: SITE_URL },
    { name: 'Tech Classes for Seniors', url: `${SITE_URL}/tools/tech-classes` },
    { name: city.name },
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
          { label: 'Tech Classes', href: '/tools/tech-classes' },
          { label: city.name },
        ]}
      />

      {/* Hero */}
      <section className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-heading)] mb-4" style={{ color: 'var(--text-primary)' }}>
          Free Tech Classes for Seniors in {city.name}
        </h1>
        <p className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          Looking for free technology help in {city.name}, {city.region}? You are in the right place.
          Below you will find local libraries, community centers, and nonprofit organizations that
          offer hands-on tech training for adults over 60 — all free or very low cost.
        </p>
      </section>

      {/* Resource Cards */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-6" style={{ color: 'var(--text-primary)' }}>
          Where to Learn Tech in {city.name}
        </h2>
        <div className="grid gap-5">
          {city.resources.map((resource) => (
            <div
              key={resource.name}
              className="rounded-xl p-5 sm:p-6 border transition-shadow hover:shadow-md"
              style={{
                backgroundColor: 'var(--bg-primary)',
                borderColor: 'var(--border-color)',
              }}
            >
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <h3 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
                  {resource.name}
                </h3>
                <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${typeColors[resource.type]}`}>
                  {typeLabels[resource.type]}
                </span>
                {resource.free && (
                  <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    Free
                  </span>
                )}
              </div>
              <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {resource.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Library Programs */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-6" style={{ color: 'var(--text-primary)' }}>
          Public Library Programs in {city.name}
        </h2>
        <p className="mb-5 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          Public libraries are one of the best-kept secrets for free tech help. Most library systems
          offer computer classes, one-on-one tech appointments, free WiFi, and even device lending
          programs. Here are the major library systems serving {city.name}:
        </p>
        <div className="grid gap-4">
          {city.libraries.map((library) => (
            <div
              key={library.name}
              className="rounded-lg p-5 border-l-4 border-l-brand-blue"
              style={{ backgroundColor: 'var(--bg-tertiary)' }}
            >
              <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                {library.name}
              </h3>
              <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {library.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Tips */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-6" style={{ color: 'var(--text-primary)' }}>
          Tips for Finding Tech Help in {city.name}
        </h2>
        <ul className="space-y-3">
          {city.tips.map((tip, i) => (
            <li key={i} className="flex gap-3">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-brand-blue text-white flex items-center justify-center text-sm font-bold">
                {i + 1}
              </span>
              <p className="leading-relaxed pt-0.5" style={{ color: 'var(--text-secondary)' }}>
                {tip}
              </p>
            </li>
          ))}
        </ul>
      </section>

      {/* Related Resources */}
      <section className="mb-12 rounded-xl p-6 border" style={{ backgroundColor: 'var(--bg-tertiary)', borderColor: 'var(--border-color)' }}>
        <h2 className="text-xl font-bold font-[family-name:var(--font-heading)] mb-4" style={{ color: 'var(--text-primary)' }}>
          More Helpful Resources
        </h2>
        <ul className="space-y-3">
          <li>
            <Link href="/blog/best-free-apps-for-seniors-2026" className="text-brand-blue hover:underline font-medium">
              Best Free Apps for Seniors in 2026
            </Link>
            <span className="block text-sm mt-0.5" style={{ color: 'var(--text-muted)' }}>
              Discover the most useful free apps for staying connected, managing health, and having fun.
            </span>
          </li>
          <li>
            <Link href="/tools/device-quiz" className="text-brand-blue hover:underline font-medium">
              Which Device Is Right for You? Take the Quiz
            </Link>
            <span className="block text-sm mt-0.5" style={{ color: 'var(--text-muted)' }}>
              Not sure whether you need a tablet, smartphone, or laptop? Our quick quiz will help you decide.
            </span>
          </li>
        </ul>
      </section>

      {/* Browse Other Cities */}
      {nearby.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-4" style={{ color: 'var(--text-primary)' }}>
            Browse Nearby Cities
          </h2>
          <div className="flex flex-wrap gap-3">
            {nearby.map((nearbyCity) => (
              <Link
                key={nearbyCity.slug}
                href={`/tools/tech-classes/${nearbyCity.slug}`}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border text-sm font-medium transition-colors hover:bg-brand-blue hover:text-white hover:border-brand-blue"
                style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
              >
                {nearbyCity.name}
                <span style={{ color: 'var(--text-muted)' }}>&rarr;</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* All Cities Link */}
      <div className="text-center pt-4 border-t" style={{ borderColor: 'var(--border-color)' }}>
        <Link href="/tools/tech-classes" className="text-brand-blue hover:underline font-medium">
          View all 30 cities with free tech classes for seniors
        </Link>
      </div>
    </div>
  )
}

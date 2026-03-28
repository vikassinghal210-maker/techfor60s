import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Breadcrumbs from '@/components/Breadcrumbs'
import { SITE_URL } from '@/lib/utils'
import { breadcrumbJsonLd } from '@/lib/seo'
import { statesData, stateNeighbors } from '@/lib/states-data'

export async function generateStaticParams() {
  return statesData.map((state) => ({ state: state.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ state: string }>
}): Promise<Metadata> {
  const { state: stateSlug } = await params
  const state = statesData.find((s) => s.slug === stateSlug)
  if (!state) return {}

  const title = `Best Internet Plans for Seniors in ${state.name} (2026)`
  const description = `Compare the best internet plans for seniors in ${state.name}. Find low-cost options, senior discounts from ${state.providers.map((p) => p.name).slice(0, 3).join(', ')}, and government assistance programs.`
  const url = `${SITE_URL}/tools/internet-by-state/${state.slug}`

  return {
    title,
    description,
    keywords: [
      `${state.name} internet for seniors`,
      `best internet plans ${state.name}`,
      `senior internet discounts ${state.abbreviation}`,
      `cheap internet for elderly ${state.name}`,
      `low income internet ${state.name}`,
      `${state.name} senior broadband`,
    ],
    openGraph: {
      type: 'website',
      url,
      title,
      description,
      siteName: 'TechFor60s',
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: { canonical: url },
  }
}

export default async function StatePage({
  params,
}: {
  params: Promise<{ state: string }>
}) {
  const { state: stateSlug } = await params
  const state = statesData.find((s) => s.slug === stateSlug)
  if (!state) notFound()

  const neighbors = (stateNeighbors[state.slug] ?? [])
    .map((slug) => statesData.find((s) => s.slug === slug))
    .filter(Boolean)

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Tools', href: '/tools' },
    { label: 'Internet by State', href: '/tools/internet-by-state' },
    { label: state.name },
  ]

  const jsonLd = breadcrumbJsonLd([
    { name: 'Home', url: SITE_URL },
    { name: 'Tools', url: `${SITE_URL}/tools` },
    { name: 'Internet by State', url: `${SITE_URL}/tools/internet-by-state` },
    { name: state.name },
  ])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumbs items={breadcrumbs} />

        {/* Hero */}
        <header className="mb-10">
          <h1
            className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-heading)] mb-4"
            style={{ color: 'var(--text-primary)' }}
          >
            Best Internet Plans for Seniors in {state.name}
          </h1>
          <p
            className="text-lg leading-relaxed"
            style={{ color: 'var(--text-secondary)' }}
          >
            Finding affordable, reliable internet in {state.name} does not have
            to be confusing. We have compared the top providers available to
            seniors in {state.abbreviation}, including plans with senior
            discounts, low-income assistance, and no-contract options. Average
            cost: <strong>{state.averagePrice}</strong>.
          </p>
        </header>

        {/* Provider Comparison Cards */}
        <section className="mb-12">
          <h2
            className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-6"
            style={{ color: 'var(--text-primary)' }}
          >
            Internet Providers in {state.name}
          </h2>

          <div className="grid gap-6">
            {state.providers.map((provider) => (
              <div
                key={provider.name}
                className="rounded-xl border p-6 transition-shadow hover:shadow-md"
                style={{
                  borderColor: 'var(--border-color)',
                  backgroundColor: 'var(--bg-primary)',
                }}
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3
                        className="text-xl font-bold font-[family-name:var(--font-heading)]"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        {provider.name}
                      </h3>
                      {provider.seniorDiscount && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Senior Discount
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3">
                      <div>
                        <p
                          className="text-xs font-semibold uppercase tracking-wide mb-1"
                          style={{ color: 'var(--text-muted)' }}
                        >
                          Connection Type
                        </p>
                        <p
                          className="text-sm capitalize"
                          style={{ color: 'var(--text-secondary)' }}
                        >
                          {provider.type}
                        </p>
                      </div>
                      <div>
                        <p
                          className="text-xs font-semibold uppercase tracking-wide mb-1"
                          style={{ color: 'var(--text-muted)' }}
                        >
                          Speeds
                        </p>
                        <p
                          className="text-sm"
                          style={{ color: 'var(--text-secondary)' }}
                        >
                          {provider.speeds}
                        </p>
                      </div>
                      <div>
                        <p
                          className="text-xs font-semibold uppercase tracking-wide mb-1"
                          style={{ color: 'var(--text-muted)' }}
                        >
                          Starting Price
                        </p>
                        <p className="text-sm font-bold text-brand-blue">
                          {provider.startingPrice}
                        </p>
                      </div>
                    </div>

                    {provider.seniorPlan && (
                      <div
                        className="mt-4 p-3 rounded-lg"
                        style={{ backgroundColor: 'var(--bg-tertiary)' }}
                      >
                        <p
                          className="text-sm"
                          style={{ color: 'var(--text-secondary)' }}
                        >
                          <span className="font-semibold">Senior/Low-Income Plan:</span>{' '}
                          {provider.seniorPlan}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Senior Discount Programs */}
        <section className="mb-12">
          <h2
            className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-4"
            style={{ color: 'var(--text-primary)' }}
          >
            Senior Discount &amp; Assistance Programs in {state.name}
          </h2>

          <div
            className="rounded-xl border p-6 space-y-6"
            style={{
              borderColor: 'var(--border-color)',
              backgroundColor: 'var(--bg-primary)',
            }}
          >
            <div>
              <h3
                className="text-lg font-bold mb-2"
                style={{ color: 'var(--text-primary)' }}
              >
                FCC Lifeline Program
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: 'var(--text-secondary)' }}
              >
                The federal Lifeline program provides a <strong>$9.25 per month
                discount</strong> on phone or internet service for qualifying
                low-income households. Seniors receiving Medicaid, SNAP, SSI,
                Federal Public Housing Assistance, or Veterans Pension benefits
                automatically qualify. Apply at{' '}
                <a
                  href="https://www.lifelinesupport.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-blue hover:underline"
                >
                  LifelineSupport.org
                </a>{' '}
                or contact your local {state.name} social services office.
              </p>
            </div>

            <div>
              <h3
                className="text-lg font-bold mb-2"
                style={{ color: 'var(--text-primary)' }}
              >
                Provider Low-Income Programs
              </h3>
              <p
                className="text-sm leading-relaxed mb-3"
                style={{ color: 'var(--text-secondary)' }}
              >
                Several major ISPs in {state.name} offer their own discounted
                plans for qualifying seniors and low-income households:
              </p>
              <ul className="space-y-2">
                {state.providers
                  .filter((p) => p.seniorPlan)
                  .map((p) => (
                    <li
                      key={p.name}
                      className="flex items-start gap-2 text-sm"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      <span className="text-brand-blue font-bold mt-0.5">
                        &bull;
                      </span>
                      <span>
                        <strong>{p.name}:</strong> {p.seniorPlan}
                      </span>
                    </li>
                  ))}
              </ul>
            </div>

            <div>
              <h3
                className="text-lg font-bold mb-2"
                style={{ color: 'var(--text-primary)' }}
              >
                About the ACP (Affordable Connectivity Program)
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: 'var(--text-secondary)' }}
              >
                The ACP ended in June 2024, but many providers who participated
                have introduced their own replacement programs to help
                low-income customers. Ask your provider about successor
                discounts when signing up. The Lifeline program remains active
                and is the primary federal internet assistance program available
                in {state.name}.
              </p>
            </div>
          </div>
        </section>

        {/* State-Specific Tips */}
        <section className="mb-12">
          <h2
            className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-4"
            style={{ color: 'var(--text-primary)' }}
          >
            Tips for {state.name} Seniors
          </h2>

          <div className="space-y-4">
            {state.tips.map((tip, i) => (
              <div
                key={i}
                className="flex items-start gap-4 p-4 rounded-lg"
                style={{ backgroundColor: 'var(--bg-tertiary)' }}
              >
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-blue text-white flex items-center justify-center text-sm font-bold">
                  {i + 1}
                </span>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {tip}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Internal Links */}
        <section className="mb-12">
          <h2
            className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-4"
            style={{ color: 'var(--text-primary)' }}
          >
            Related Resources
          </h2>

          <div className="grid gap-4 sm:grid-cols-2">
            <Link
              href="/blog/best-internet-plans-for-seniors-2026"
              className="block p-5 rounded-xl border transition-all hover:shadow-md hover:border-brand-blue"
              style={{
                borderColor: 'var(--border-color)',
                backgroundColor: 'var(--bg-primary)',
              }}
            >
              <h3
                className="font-bold mb-1"
                style={{ color: 'var(--text-primary)' }}
              >
                Best Internet Plans for Seniors (2026)
              </h3>
              <p
                className="text-sm"
                style={{ color: 'var(--text-muted)' }}
              >
                Our comprehensive national guide to the best internet plans for
                older adults.
              </p>
            </Link>

            <Link
              href="/tools/device-quiz"
              className="block p-5 rounded-xl border transition-all hover:shadow-md hover:border-brand-blue"
              style={{
                borderColor: 'var(--border-color)',
                backgroundColor: 'var(--bg-primary)',
              }}
            >
              <h3
                className="font-bold mb-1"
                style={{ color: 'var(--text-primary)' }}
              >
                Device Quiz
              </h3>
              <p
                className="text-sm"
                style={{ color: 'var(--text-muted)' }}
              >
                Not sure which device you need? Take our quick quiz to find the
                best phone, tablet, or laptop for you.
              </p>
            </Link>
          </div>
        </section>

        {/* Browse Other States */}
        <section>
          <h2
            className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-4"
            style={{ color: 'var(--text-primary)' }}
          >
            Browse Other States
          </h2>

          <div className="flex flex-wrap gap-2">
            {neighbors.map((neighbor) =>
              neighbor ? (
                <Link
                  key={neighbor.slug}
                  href={`/tools/internet-by-state/${neighbor.slug}`}
                  className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium border transition-colors hover:bg-brand-blue hover:text-white"
                  style={{
                    borderColor: 'var(--border-color)',
                    color: 'var(--text-secondary)',
                  }}
                >
                  {neighbor.name}
                </Link>
              ) : null,
            )}
          </div>

          <p className="mt-4">
            <Link
              href="/tools/internet-by-state"
              className="text-brand-blue hover:underline text-sm font-medium"
            >
              View all 50 states &rarr;
            </Link>
          </p>
        </section>
      </div>
    </>
  )
}

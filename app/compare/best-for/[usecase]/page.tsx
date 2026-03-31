import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { USE_CASES, getBestPhonesFor, getComparisons, getPhoneBySlug, type Phone } from '@/lib/phones-data'
import { breadcrumbJsonLd } from '@/lib/seo'
import { SITE_URL } from '@/lib/utils'
import Breadcrumbs from '@/components/Breadcrumbs'
import { Star, Check, X, ArrowRight, ChevronRight, Trophy, Shield } from 'lucide-react'

// ── Static generation ────────────────────────────────────────────────────────

export async function generateStaticParams() {
  return USE_CASES.map((uc) => ({ usecase: uc.slug }))
}

export const dynamicParams = false

// ── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ usecase: string }>
}): Promise<Metadata> {
  const { usecase } = await params
  const uc = USE_CASES.find((u) => u.slug === usecase)
  if (!uc) return { title: 'Best Phones for Seniors' }

  const title = `Best Phones for Seniors with ${uc.label} Needs (2026)`
  const description = `${uc.description} Ranked by senior-friendliness with detailed comparisons.`
  const url = `${SITE_URL}/compare/best-for/${uc.slug}`

  return {
    title,
    description,
    keywords: [
      `best phone for seniors ${uc.label.toLowerCase()}`,
      `senior phone ${uc.label.toLowerCase()}`,
      'best phone for elderly',
      'senior friendly phones 2026',
    ],
    openGraph: {
      title,
      description,
      url,
      type: 'website',
      siteName: 'TechFor60s',
    },
    alternates: { canonical: url },
  }
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function getRelevantComparisons(phones: Phone[]): { slugA: string; slugB: string }[] {
  const slugs = new Set(phones.map((p) => p.slug))
  const all = getComparisons()
  return all
    .filter((c) => slugs.has(c.slugA) && slugs.has(c.slugB))
    .slice(0, 6)
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default async function BestForPage({
  params,
}: {
  params: Promise<{ usecase: string }>
}) {
  const { usecase } = await params
  const uc = USE_CASES.find((u) => u.slug === usecase)
  if (!uc) return <div>Use case not found.</div>

  const phones = getBestPhonesFor(usecase)
  const comparisons = getRelevantComparisons(phones)

  const jsonLdBreadcrumb = breadcrumbJsonLd([
    { name: 'Home', url: SITE_URL },
    { name: 'Compare Phones', url: `${SITE_URL}/compare` },
    { name: `Best for ${uc.label}` },
  ])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-brand-blue via-blue-700 to-blue-900 text-white py-10 sm:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Compare Phones', href: '/compare' },
              { label: `Best for ${uc.label}` },
            ]}
          />
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-[family-name:var(--font-heading)] mt-4">
            Best Phones for Seniors: {uc.label}
          </h1>
          <p className="text-blue-100 mt-2 text-lg max-w-2xl">
            {uc.description}
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-14 space-y-10">

        {/* Ranked List */}
        <section>
          <h2 className="text-xl sm:text-2xl font-bold font-[family-name:var(--font-heading)] mb-6" style={{ color: 'var(--text-primary)' }}>
            Top {phones.length} Phones Ranked
          </h2>
          <div className="space-y-6">
            {phones.map((phone, idx) => (
              <div
                key={phone.slug}
                className="rounded-2xl p-5 sm:p-6 transition-shadow hover:shadow-md"
                style={{ backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
              >
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                  {/* Rank + Image */}
                  <div className="flex sm:flex-col items-center gap-3 sm:gap-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white ${
                      idx === 0 ? 'bg-amber-500' : idx === 1 ? 'bg-gray-400' : idx === 2 ? 'bg-amber-700' : 'bg-gray-300'
                    }`}>
                      {idx + 1}
                    </div>
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden relative flex-shrink-0">
                      <Image
                        src={phone.thumbnail}
                        alt={phone.name}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </div>
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h3 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
                        {phone.name}
                      </h3>
                      {idx === 0 && (
                        <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 flex items-center gap-1">
                          <Trophy className="w-3 h-3" /> Top Pick
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-3 text-sm mb-3" style={{ color: 'var(--text-muted)' }}>
                      <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>{phone.price}</span>
                      <span>|</span>
                      <span>{phone.screenSize}</span>
                      <span>|</span>
                      <span>{phone.os}</span>
                      <span>|</span>
                      <span>{phone.battery}</span>
                    </div>

                    {/* Score bar */}
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-xs font-semibold" style={{ color: 'var(--text-muted)' }}>Senior Score</span>
                      <div className="flex-1 max-w-48 h-3 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--border-color)' }}>
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-brand-blue to-blue-400"
                          style={{ width: `${phone.seniorScore * 10}%` }}
                        />
                      </div>
                      <span className="text-sm font-bold text-brand-blue">{phone.seniorScore}/10</span>
                    </div>

                    <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--text-secondary)' }}>
                      {phone.summary}
                    </p>

                    {/* Key features */}
                    <div className="flex flex-wrap gap-3 mb-3">
                      {phone.emergencySOS && (
                        <span className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
                          <Shield className="w-3 h-3" /> Emergency SOS
                        </span>
                      )}
                      {phone.fallDetection && (
                        <span className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
                          <Check className="w-3 h-3" /> Fall Detection
                        </span>
                      )}
                      {phone.hearingAidRating.includes('M4') && (
                        <span className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-blue-100 text-brand-blue dark:bg-blue-900/30">
                          <Star className="w-3 h-3" /> Top Hearing Aid Rating
                        </span>
                      )}
                    </div>

                    {/* Pros snippet */}
                    <div className="grid sm:grid-cols-2 gap-1.5">
                      {phone.pros.slice(0, 3).map((pro) => (
                        <div key={pro} className="flex items-start gap-1.5 text-xs" style={{ color: 'var(--text-secondary)' }}>
                          <Check className="w-3.5 h-3.5 text-emerald-500 mt-0.5 flex-shrink-0" />
                          <span>{pro}</span>
                        </div>
                      ))}
                      {phone.cons.slice(0, 1).map((con) => (
                        <div key={con} className="flex items-start gap-1.5 text-xs" style={{ color: 'var(--text-secondary)' }}>
                          <X className="w-3.5 h-3.5 text-red-400 mt-0.5 flex-shrink-0" />
                          <span>{con}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Compare These Phones */}
        {comparisons.length > 0 && (
          <section>
            <h2 className="text-xl sm:text-2xl font-bold font-[family-name:var(--font-heading)] mb-6" style={{ color: 'var(--text-primary)' }}>
              Compare These Phones Head-to-Head
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {comparisons.map(({ slugA, slugB }) => {
                const pA = getPhoneBySlug(slugA)
                const pB = getPhoneBySlug(slugB)
                if (!pA || !pB) return null
                return (
                  <Link
                    key={`${slugA}-${slugB}`}
                    href={`/compare/${slugA}-vs-${slugB}`}
                    className="rounded-xl p-4 transition-all hover:shadow-md flex items-center gap-3 group"
                    style={{ backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
                  >
                    <div className="flex -space-x-3 flex-shrink-0">
                      <div className="w-10 h-10 rounded-lg overflow-hidden relative border-2 border-white dark:border-gray-800">
                        <Image src={pA.thumbnail} alt={pA.name} fill className="object-cover" sizes="40px" />
                      </div>
                      <div className="w-10 h-10 rounded-lg overflow-hidden relative border-2 border-white dark:border-gray-800">
                        <Image src={pB.thumbnail} alt={pB.name} fill className="object-cover" sizes="40px" />
                      </div>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium truncate" style={{ color: 'var(--text-primary)' }}>
                        {pA.name} vs {pB.name}
                      </p>
                    </div>
                    <ChevronRight className="w-4 h-4 flex-shrink-0 text-gray-400 group-hover:text-brand-blue transition-colors" />
                  </Link>
                )
              })}
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="rounded-2xl p-6 sm:p-8 bg-gradient-to-br from-blue-50 to-emerald-50 dark:from-blue-950/30 dark:to-emerald-950/30 text-center" style={{ border: '1px solid var(--border-color)' }}>
          <h2 className="text-lg sm:text-xl font-bold font-[family-name:var(--font-heading)] mb-2" style={{ color: 'var(--text-primary)' }}>
            Not sure which phone is right for you?
          </h2>
          <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
            Take our quick quiz or read our full buying guide for personalised advice.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/tools/device-quiz"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-brand-blue text-white text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Take the Device Quiz <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/compare"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-colors"
              style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)', border: '1px solid var(--border-color)' }}
            >
              All Comparisons <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* Browse Other Use Cases */}
        <section>
          <h2 className="text-xl sm:text-2xl font-bold font-[family-name:var(--font-heading)] mb-6" style={{ color: 'var(--text-primary)' }}>
            Browse Other Categories
          </h2>
          <div className="flex flex-wrap gap-2">
            {USE_CASES.filter((u) => u.slug !== usecase).map((u) => (
              <Link
                key={u.slug}
                href={`/compare/best-for/${u.slug}`}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium transition-colors hover:bg-brand-blue hover:text-white"
                style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-secondary)', border: '1px solid var(--border-color)' }}
              >
                {u.label}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  )
}

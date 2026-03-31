import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { Star } from 'lucide-react'
import Breadcrumbs from '@/components/Breadcrumbs'
import { SITE_URL } from '@/lib/utils'
import { breadcrumbJsonLd } from '@/lib/seo'
import {
  PRICE_RANGES,
  OCCASIONS,
  getGiftsByPriceRange,
  type GiftProduct,
} from '@/lib/gifts-data'

// ── Static Params ─────────────────────────────────────────────────────────────

export async function generateStaticParams() {
  return PRICE_RANGES.map((r) => ({ range: r.slug }))
}

// ── Metadata ──────────────────────────────────────────────────────────────────

function getBudgetTitle(label: string): string {
  if (label.startsWith('$')) {
    return `Best Tech Gifts ${label} for Seniors (2026)`
  }
  return `Best Tech Gifts ${label} for Seniors (2026)`
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ range: string }>
}): Promise<Metadata> {
  const { range: slug } = await params
  const range = PRICE_RANGES.find((r) => r.slug === slug)
  if (!range) return {}

  const title = getBudgetTitle(range.label)
  const description = `Discover the best tech gifts ${range.label.toLowerCase()} for seniors in 2026. Carefully curated gadgets, devices, and accessories that older adults will actually love and use.`
  const url = `${SITE_URL}/gifts/budget/${slug}`

  return {
    title,
    description,
    keywords: [
      `tech gifts ${range.label.toLowerCase()} for seniors`,
      `senior tech gifts ${range.label.toLowerCase()}`,
      'affordable tech gifts elderly',
      `best tech gifts ${range.label.toLowerCase()}`,
      'budget tech gifts for grandparents',
    ],
    openGraph: {
      type: 'website',
      url,
      title,
      description,
      images: [
        {
          url: `${SITE_URL}/api/og?title=${encodeURIComponent(title)}`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: { canonical: url },
  }
}

// ── Star Rating ───────────────────────────────────────────────────────────────

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-3.5 h-3.5 ${
            i < rating
              ? 'fill-amber-400 text-amber-400'
              : 'fill-gray-200 text-gray-200'
          }`}
        />
      ))}
    </div>
  )
}

// ── Gift Card ─────────────────────────────────────────────────────────────────

function GiftCard({ gift }: { gift: GiftProduct }) {
  const occasionLabels = gift.occasions
    .filter((o) => o !== 'any')
    .map((slug) => OCCASIONS.find((o) => o.slug === slug))
    .filter(Boolean)

  return (
    <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-primary)] overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative aspect-square bg-[var(--bg-tertiary)]">
        <Image
          src={gift.thumbnail}
          alt={gift.name}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <span className="absolute top-3 right-3 bg-brand-blue text-white text-sm font-bold px-3 py-1 rounded-full shadow">
          {gift.price}
        </span>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-[var(--text-primary)] font-[family-name:var(--font-heading)] text-base mb-2 leading-tight">
          {gift.name}
        </h3>
        <div className="flex items-center gap-2 mb-2">
          <StarRating rating={gift.rating} />
          <span className="text-xs text-[var(--text-muted)]">
            Senior-friendly: {gift.seniorFriendly}/5
          </span>
        </div>
        <p className="text-sm text-[var(--text-secondary)] mb-3 line-clamp-3">
          {gift.description}
        </p>
        <p className="text-sm font-medium text-amber-700 dark:text-amber-300 mb-3">
          {gift.whyGreat}
        </p>
        {occasionLabels.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {occasionLabels.slice(0, 4).map((occ) => (
              <Link
                key={occ!.slug}
                href={`/gifts/${occ!.slug}`}
                className="text-xs px-2 py-0.5 rounded-full bg-[var(--bg-tertiary)] text-[var(--text-muted)] hover:text-brand-blue hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-colors"
              >
                {occ!.emoji} {occ!.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// ── Page Component ────────────────────────────────────────────────────────────

export default async function BudgetGiftsPage({
  params,
}: {
  params: Promise<{ range: string }>
}) {
  const { range: slug } = await params
  const range = PRICE_RANGES.find((r) => r.slug === slug)
  if (!range) notFound()

  const gifts = getGiftsByPriceRange(slug).sort((a, b) => b.rating - a.rating)
  const title = getBudgetTitle(range.label)
  const pageUrl = `${SITE_URL}/gifts/budget/${slug}`

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: 'Home', url: SITE_URL },
              { name: 'Gift Finder', url: `${SITE_URL}/gifts` },
              { name: range.label, url: pageUrl },
            ])
          ),
        }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Gift Finder', href: '/gifts' },
            { label: range.label },
          ]}
        />

        {/* Hero */}
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-heading)] text-brand-dark mb-4">
            {title}
          </h1>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
            {gifts.length} carefully chosen tech gift{gifts.length === 1 ? '' : 's'}{' '}
            {range.label.toLowerCase()} that seniors will genuinely enjoy. Every product
            has been selected for ease of use and practical value.
          </p>
        </div>

        {/* Gift Grid */}
        {gifts.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-12">
            {gifts.map((gift) => (
              <GiftCard key={gift.slug} gift={gift} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 mb-12">
            <p className="text-lg text-[var(--text-muted)]">
              No gifts found in this price range. Try a different budget.
            </p>
          </div>
        )}

        {/* Browse Other Budgets */}
        <section className="mb-8 p-6 sm:p-8 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-color)]">
          <h2 className="text-xl sm:text-2xl font-bold font-[family-name:var(--font-heading)] text-[var(--text-primary)] mb-4">
            Browse Other Budgets
          </h2>
          <div className="flex flex-wrap gap-3">
            {PRICE_RANGES.filter((r) => r.slug !== slug).map((r) => (
              <Link
                key={r.slug}
                href={`/gifts/budget/${r.slug}`}
                className="px-5 py-2.5 rounded-full border border-[var(--border-color)] bg-[var(--bg-primary)] text-[var(--text-primary)] hover:border-brand-blue hover:text-brand-blue font-medium text-sm transition-all"
              >
                {r.label}
              </Link>
            ))}
          </div>
        </section>

        {/* Browse by Occasion */}
        <section className="mb-8 p-6 sm:p-8 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-color)]">
          <h2 className="text-xl sm:text-2xl font-bold font-[family-name:var(--font-heading)] text-[var(--text-primary)] mb-4">
            Browse by Occasion
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {OCCASIONS.map((occ) => (
              <Link
                key={occ.slug}
                href={`/gifts/${occ.slug}`}
                className="flex items-center gap-2 p-3 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] hover:border-brand-blue hover:shadow-sm transition-all text-sm font-medium text-[var(--text-primary)] hover:text-brand-blue"
              >
                <span aria-hidden="true">{occ.emoji}</span>
                {occ.label}
              </Link>
            ))}
          </div>
        </section>

        {/* Related Links */}
        <section className="p-6 sm:p-8 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-color)]">
          <h2 className="text-xl sm:text-2xl font-bold font-[family-name:var(--font-heading)] text-[var(--text-primary)] mb-4">
            Related Guides
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            <Link
              href="/gifts"
              className="flex items-center gap-2 p-4 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] hover:border-brand-blue hover:shadow-sm transition-all text-brand-blue font-medium text-sm sm:text-base"
            >
              <span aria-hidden="true">🎯</span>
              Try the Interactive Gift Finder
            </Link>
            <Link
              href="/blog/best-tech-gifts-for-seniors-2026"
              className="flex items-center gap-2 p-4 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] hover:border-brand-blue hover:shadow-sm transition-all text-brand-blue font-medium text-sm sm:text-base"
            >
              <span aria-hidden="true">🎁</span>
              Best Tech Gifts for Seniors 2026
            </Link>
            <Link
              href="/tools/device-quiz"
              className="flex items-center gap-2 p-4 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] hover:border-brand-blue hover:shadow-sm transition-all text-brand-blue font-medium text-sm sm:text-base"
            >
              <span aria-hidden="true">📱</span>
              Which Device Is Right for You? Quiz
            </Link>
          </div>
        </section>
      </div>
    </>
  )
}

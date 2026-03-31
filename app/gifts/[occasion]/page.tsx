import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { Star } from 'lucide-react'
import Breadcrumbs from '@/components/Breadcrumbs'
import { SITE_URL } from '@/lib/utils'
import { breadcrumbJsonLd } from '@/lib/seo'
import {
  OCCASIONS,
  PRICE_RANGES,
  getGiftsByOccasion,
  type GiftProduct,
} from '@/lib/gifts-data'

// ── Static Params ─────────────────────────────────────────────────────────────

export async function generateStaticParams() {
  return OCCASIONS.map((occ) => ({ occasion: occ.slug }))
}

// ── Metadata ──────────────────────────────────────────────────────────────────

function getOccasionTitle(label: string): string {
  const map: Record<string, string> = {
    Christmas: 'Best Tech Gifts for Seniors (Christmas 2026)',
    Birthday: 'Best Tech Birthday Gifts for Seniors (2026)',
    "Mother's Day": 'Best Tech Gifts for Mom (Mother\'s Day 2026)',
    "Father's Day": 'Best Tech Gifts for Dad (Father\'s Day 2026)',
    Retirement: 'Best Tech Gifts for Retirement (2026)',
    "Grandparents' Day": 'Best Tech Gifts for Grandparents (2026)',
    "Valentine's Day": 'Best Valentine\'s Tech Gifts for Seniors (2026)',
    'Any Occasion': 'Best Tech Gifts for Seniors — Any Occasion (2026)',
  }
  return map[label] ?? `Best Tech Gifts for Seniors — ${label} (2026)`
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ occasion: string }>
}): Promise<Metadata> {
  const { occasion: slug } = await params
  const occasion = OCCASIONS.find((o) => o.slug === slug)
  if (!occasion) return {}

  const title = getOccasionTitle(occasion.label)
  const url = `${SITE_URL}/gifts/${slug}`

  return {
    title,
    description: occasion.description,
    keywords: [
      `tech gifts ${occasion.label.toLowerCase()}`,
      `${occasion.label.toLowerCase()} tech gifts seniors`,
      'tech gifts for elderly',
      'senior tech gift ideas',
      `best ${occasion.label.toLowerCase()} gifts for grandparents`,
    ],
    openGraph: {
      type: 'website',
      url,
      title,
      description: occasion.description,
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
      description: occasion.description,
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
        <p className="text-sm font-medium text-amber-700 dark:text-amber-300">
          {gift.whyGreat}
        </p>
      </div>
    </div>
  )
}

// ── Page Component ────────────────────────────────────────────────────────────

export default async function OccasionGiftsPage({
  params,
}: {
  params: Promise<{ occasion: string }>
}) {
  const { occasion: slug } = await params
  const occasion = OCCASIONS.find((o) => o.slug === slug)
  if (!occasion) notFound()

  const gifts = getGiftsByOccasion(slug)
  const pageUrl = `${SITE_URL}/gifts/${slug}`

  // Group by price tier
  const tiers: { label: string; range: string; items: GiftProduct[] }[] = [
    { label: 'Under $25', range: 'under-25', items: [] },
    { label: 'Under $50', range: 'under-50', items: [] },
    { label: 'Under $100', range: 'under-100', items: [] },
    { label: 'Under $200', range: 'under-200', items: [] },
    { label: '$200 & Up', range: 'over-200', items: [] },
  ]
  for (const gift of gifts) {
    const tier = tiers.find((t) => t.range === gift.priceRange)
    tier?.items.push(gift)
  }
  const nonEmptyTiers = tiers.filter((t) => t.items.length > 0)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: 'Home', url: SITE_URL },
              { name: 'Gift Finder', url: `${SITE_URL}/gifts` },
              { name: occasion.label, url: pageUrl },
            ])
          ),
        }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Gift Finder', href: '/gifts' },
            { label: occasion.label },
          ]}
        />

        {/* Hero */}
        <div className="text-center mb-10">
          <span className="text-4xl sm:text-5xl mb-3 block" aria-hidden="true">
            {occasion.emoji}
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-heading)] text-brand-dark mb-4">
            {getOccasionTitle(occasion.label)}
          </h1>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
            {occasion.description}
          </p>
        </div>

        {/* Gift Grid by Price Tier */}
        {nonEmptyTiers.map((tier) => (
          <section key={tier.range} className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-xl sm:text-2xl font-bold font-[family-name:var(--font-heading)] text-[var(--text-primary)]">
                {tier.label}
              </h2>
              <span className="text-sm text-[var(--text-muted)] bg-[var(--bg-tertiary)] px-3 py-1 rounded-full">
                {tier.items.length} {tier.items.length === 1 ? 'gift' : 'gifts'}
              </span>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {tier.items
                .sort((a, b) => b.rating - a.rating)
                .map((gift) => (
                  <GiftCard key={gift.slug} gift={gift} />
                ))}
            </div>
          </section>
        ))}

        {/* Cross-links */}
        <section className="mt-12 p-6 sm:p-8 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-color)]">
          <h2 className="text-xl sm:text-2xl font-bold font-[family-name:var(--font-heading)] text-[var(--text-primary)] mb-4">
            Browse Other Occasions
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {OCCASIONS.filter((o) => o.slug !== slug).map((occ) => (
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
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Link
              href="/gifts"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-blue text-white font-semibold text-sm hover:opacity-90 transition-opacity"
            >
              Try the Interactive Gift Finder
            </Link>
            <Link
              href="/gifts/budget/under-50"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-brand-blue text-brand-blue font-semibold text-sm hover:bg-brand-blue hover:text-white transition-all"
            >
              Browse Gifts Under $50
            </Link>
          </div>
        </section>

        {/* Internal Links */}
        <section className="mt-8 p-6 sm:p-8 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-color)]">
          <h2 className="text-xl sm:text-2xl font-bold font-[family-name:var(--font-heading)] text-[var(--text-primary)] mb-4">
            Related Guides
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
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

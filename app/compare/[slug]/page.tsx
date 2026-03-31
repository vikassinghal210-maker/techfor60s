import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getComparisons, getPhoneBySlug, getAllPhones, type Phone } from '@/lib/phones-data'
import { breadcrumbJsonLd } from '@/lib/seo'
import { SITE_URL } from '@/lib/utils'
import Breadcrumbs from '@/components/Breadcrumbs'
import { Check, X, Trophy, Star, Shield, Phone as PhoneIcon, ArrowRight, ChevronRight } from 'lucide-react'

// ── Static generation ────────────────────────────────────────────────────────

export async function generateStaticParams() {
  const comparisons = getComparisons()
  return comparisons.map(({ slugA, slugB }) => ({
    slug: `${slugA}-vs-${slugB}`,
  }))
}

export const dynamicParams = false

// ── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const vsIndex = slug.indexOf('-vs-')
  if (vsIndex === -1) return { title: 'Compare Phones for Seniors' }

  const slugA = slug.slice(0, vsIndex)
  const slugB = slug.slice(vsIndex + 4)
  const phoneA = getPhoneBySlug(slugA)
  const phoneB = getPhoneBySlug(slugB)

  if (!phoneA || !phoneB) return { title: 'Compare Phones for Seniors' }

  const title = `${phoneA.name} vs ${phoneB.name} for Seniors (2026)`
  const description = `Side-by-side comparison of ${phoneA.name} vs ${phoneB.name} for seniors and elderly users. Compare ease of use, screen readability, hearing aid ratings, safety features, and more.`
  const url = `${SITE_URL}/compare/${slug}`

  return {
    title,
    description,
    keywords: [
      `${phoneA.name} vs ${phoneB.name}`,
      `${phoneA.name} vs ${phoneB.name} for seniors`,
      'best phone for seniors',
      'senior phone comparison',
      'phone for elderly',
      `${phoneA.name} review seniors`,
      `${phoneB.name} review seniors`,
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

function ScoreBar({ label, scoreA, scoreB, nameA, nameB }: {
  label: string
  scoreA: number
  scoreB: number
  nameA: string
  nameB: string
}) {
  const winner = scoreA > scoreB ? 'A' : scoreB > scoreA ? 'B' : 'tie'
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{label}</span>
        {winner !== 'tie' && (
          <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 flex items-center gap-1">
            <Trophy className="w-3 h-3" />
            {winner === 'A' ? nameA : nameB}
          </span>
        )}
      </div>
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <span className="text-xs w-8 text-right font-bold text-brand-blue">{scoreA}</span>
          <div className="flex-1 h-4 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
            <div
              className="h-full rounded-full bg-gradient-to-r from-brand-blue to-blue-500 transition-all duration-500"
              style={{ width: `${scoreA * 10}%` }}
            />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs w-8 text-right font-bold text-emerald-600">{scoreB}</span>
          <div className="flex-1 h-4 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
            <div
              className="h-full rounded-full bg-gradient-to-r from-emerald-600 to-emerald-400 transition-all duration-500"
              style={{ width: `${scoreB * 10}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

function BooleanRow({ label, valueA, valueB }: { label: string; valueA: boolean; valueB: boolean }) {
  const winnerA = valueA && !valueB
  const winnerB = valueB && !valueA
  return (
    <tr className="border-b" style={{ borderColor: 'var(--border-color)' }}>
      <td className="py-3 px-3 text-sm font-medium text-center" style={{ color: 'var(--text-primary)' }}>{label}</td>
      <td className={`py-3 px-3 text-center ${winnerA ? 'bg-emerald-50 dark:bg-emerald-900/10' : ''}`}>
        {valueA ? (
          <Check className="w-5 h-5 text-emerald-600 mx-auto" />
        ) : (
          <X className="w-5 h-5 text-red-400 mx-auto" />
        )}
      </td>
      <td className={`py-3 px-3 text-center ${winnerB ? 'bg-emerald-50 dark:bg-emerald-900/10' : ''}`}>
        {valueB ? (
          <Check className="w-5 h-5 text-emerald-600 mx-auto" />
        ) : (
          <X className="w-5 h-5 text-red-400 mx-auto" />
        )}
      </td>
    </tr>
  )
}

function TextRow({ label, valueA, valueB, highlightLower, highlightHigher }: {
  label: string
  valueA: string
  valueB: string
  highlightLower?: boolean
  highlightHigher?: boolean
}) {
  return (
    <tr className="border-b" style={{ borderColor: 'var(--border-color)' }}>
      <td className="py-3 px-3 text-sm font-medium text-center" style={{ color: 'var(--text-primary)' }}>{label}</td>
      <td className="py-3 px-3 text-sm text-center" style={{ color: 'var(--text-secondary)' }}>{valueA}</td>
      <td className="py-3 px-3 text-sm text-center" style={{ color: 'var(--text-secondary)' }}>{valueB}</td>
    </tr>
  )
}

function generateVerdict(a: Phone, b: Phone): string {
  const diff = a.seniorScore - b.seniorScore

  if (Math.abs(diff) <= 1) {
    if (a.priceNum < b.priceNum) {
      return `Both phones score similarly for senior-friendliness, but the ${a.name} offers better value at ${a.price} compared to the ${b.name} at ${b.price}. If budget matters, go with the ${a.name}. If you value ${b.bestFor[0]?.replace('-', ' ') || 'extra features'}, the ${b.name} is worth the premium.`
    }
    if (b.priceNum < a.priceNum) {
      return `Both phones score similarly for senior-friendliness, but the ${b.name} offers better value at ${b.price} compared to the ${a.name} at ${a.price}. If budget matters, go with the ${b.name}. If you value ${a.bestFor[0]?.replace('-', ' ') || 'extra features'}, the ${a.name} is worth the premium.`
    }
    return `These two phones are very closely matched for seniors. The ${a.name} edges ahead in ${a.easeOfUse > b.easeOfUse ? 'ease of use' : 'screen readability'}, while the ${b.name} is stronger for ${b.bestFor[0]?.replace('-', ' ') || 'other needs'}. Your choice should come down to whether you prefer ${a.os} or ${b.os}.`
  }

  const winner = diff > 0 ? a : b
  const loser = diff > 0 ? b : a

  return `For most seniors, we recommend the ${winner.name}. It scores ${winner.seniorScore}/10 for senior-friendliness compared to ${loser.seniorScore}/10 for the ${loser.name}. The ${winner.name} is particularly good for ${winner.bestFor.slice(0, 2).join(' and ').replace(/-/g, ' ')}. However, the ${loser.name} could be the better choice if you specifically need ${loser.bestFor[0]?.replace(/-/g, ' ') || 'different features'} or prefer ${loser.os}.`
}

function getRelatedComparisons(slugA: string, slugB: string): { slugA: string; slugB: string }[] {
  const all = getComparisons()
  const related = all.filter(
    (c) =>
      (c.slugA === slugA || c.slugB === slugA || c.slugA === slugB || c.slugB === slugB) &&
      !(c.slugA === slugA && c.slugB === slugB) &&
      !(c.slugA === slugB && c.slugB === slugA)
  )
  return related.slice(0, 6)
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default async function ComparisonPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const vsIndex = slug.indexOf('-vs-')

  if (vsIndex === -1) return <div>Invalid comparison.</div>

  const slugA = slug.slice(0, vsIndex)
  const slugB = slug.slice(vsIndex + 4)
  const phoneA = getPhoneBySlug(slugA)
  const phoneB = getPhoneBySlug(slugB)

  if (!phoneA || !phoneB) return <div>Phones not found.</div>

  const related = getRelatedComparisons(slugA, slugB)
  const verdict = generateVerdict(phoneA, phoneB)

  const jsonLdBreadcrumb = breadcrumbJsonLd([
    { name: 'Home', url: SITE_URL },
    { name: 'Compare Phones', url: `${SITE_URL}/compare` },
    { name: `${phoneA.name} vs ${phoneB.name}` },
  ])

  const jsonLdProducts = [phoneA, phoneB].map((phone) => ({
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: phone.name,
    brand: { '@type': 'Brand', name: phone.brand },
    image: phone.thumbnail,
    description: phone.summary,
    offers: {
      '@type': 'Offer',
      price: phone.priceNum,
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: phone.seniorScore,
      bestRating: 10,
      worstRating: 1,
      ratingCount: 1,
    },
  }))

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
      />
      {jsonLdProducts.map((ld, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
        />
      ))}

      {/* Hero */}
      <section className="bg-gradient-to-br from-brand-blue via-blue-700 to-blue-900 text-white py-10 sm:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Compare Phones', href: '/compare' },
              { label: `${phoneA.name} vs ${phoneB.name}` },
            ]}
          />
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-[family-name:var(--font-heading)] mt-4 text-center">
            {phoneA.name} vs {phoneB.name}
          </h1>
          <p className="text-blue-100 text-center mt-2 text-lg">
            Side-by-side comparison for seniors — which phone is right for you?
          </p>

          {/* Phone cards side by side */}
          <div className="grid grid-cols-2 gap-4 sm:gap-8 mt-8 max-w-2xl mx-auto">
            {[phoneA, phoneB].map((phone, idx) => (
              <div key={phone.slug} className="text-center">
                <div className="relative w-28 h-28 sm:w-36 sm:h-36 mx-auto rounded-2xl overflow-hidden bg-white/10 backdrop-blur-sm">
                  <Image
                    src={phone.thumbnail}
                    alt={phone.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 112px, 144px"
                  />
                </div>
                <h2 className="mt-3 font-bold text-base sm:text-lg">{phone.name}</h2>
                <p className="text-blue-200 text-sm">{phone.price}</p>
                <div className="mt-2 inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold" style={{
                  backgroundColor: idx === 0 ? 'rgba(59,130,246,0.3)' : 'rgba(16,185,129,0.3)',
                }}>
                  <Star className="w-3 h-3" />
                  {phone.seniorScore}/10 Senior Score
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-14 space-y-12">

        {/* Senior-Friendliness Scores */}
        <section>
          <h2 className="text-xl sm:text-2xl font-bold font-[family-name:var(--font-heading)] mb-6" style={{ color: 'var(--text-primary)' }}>
            Senior-Friendliness Scores
          </h2>
          <div className="rounded-2xl p-6 sm:p-8 space-y-6" style={{ backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}>
            {/* Legend */}
            <div className="flex flex-wrap gap-4 text-xs mb-2">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-brand-blue inline-block" />
                {phoneA.name}
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-emerald-600 inline-block" />
                {phoneB.name}
              </span>
            </div>
            <ScoreBar label="Overall Senior Score" scoreA={phoneA.seniorScore} scoreB={phoneB.seniorScore} nameA={phoneA.name} nameB={phoneB.name} />
            <ScoreBar label="Ease of Use" scoreA={phoneA.easeOfUse} scoreB={phoneB.easeOfUse} nameA={phoneA.name} nameB={phoneB.name} />
            <ScoreBar label="Screen Readability" scoreA={phoneA.screenReadability} scoreB={phoneB.screenReadability} nameA={phoneA.name} nameB={phoneB.name} />
          </div>
        </section>

        {/* Detailed Comparison Table */}
        <section>
          <h2 className="text-xl sm:text-2xl font-bold font-[family-name:var(--font-heading)] mb-6" style={{ color: 'var(--text-primary)' }}>
            Detailed Specs Comparison
          </h2>
          <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid var(--border-color)' }}>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ backgroundColor: 'var(--bg-tertiary)' }}>
                    <th className="py-3 px-3 text-center font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>Feature</th>
                    <th className="py-3 px-3 text-center font-semibold text-sm text-brand-blue">{phoneA.name}</th>
                    <th className="py-3 px-3 text-center font-semibold text-sm text-emerald-600">{phoneB.name}</th>
                  </tr>
                </thead>
                <tbody style={{ backgroundColor: 'var(--bg-primary)' }}>
                  <TextRow label="Price" valueA={phoneA.price} valueB={phoneB.price} />
                  <TextRow label="Screen Size" valueA={phoneA.screenSize} valueB={phoneB.screenSize} />
                  <TextRow label="Weight" valueA={phoneA.weight} valueB={phoneB.weight} />
                  <TextRow label="Operating System" valueA={phoneA.os} valueB={phoneB.os} />
                  <TextRow label="Battery Life" valueA={phoneA.battery} valueB={phoneB.battery} />
                  <TextRow label="Storage" valueA={phoneA.storage} valueB={phoneB.storage} />
                  <TextRow label="Camera" valueA={phoneA.camera} valueB={phoneB.camera} />
                  <TextRow label="Hearing Aid Rating" valueA={phoneA.hearingAidRating} valueB={phoneB.hearingAidRating} />
                  <TextRow label="Voice Assistant" valueA={phoneA.voiceAssistant} valueB={phoneB.voiceAssistant} />
                  <BooleanRow label="Emergency SOS" valueA={phoneA.emergencySOS} valueB={phoneB.emergencySOS} />
                  <BooleanRow label="Fall Detection" valueA={phoneA.fallDetection} valueB={phoneB.fallDetection} />
                  <BooleanRow label="Water Resistant" valueA={phoneA.waterResistant} valueB={phoneB.waterResistant} />
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Pros & Cons Side by Side */}
        <section>
          <h2 className="text-xl sm:text-2xl font-bold font-[family-name:var(--font-heading)] mb-6" style={{ color: 'var(--text-primary)' }}>
            Pros &amp; Cons
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[phoneA, phoneB].map((phone, idx) => (
              <div key={phone.slug} className="rounded-2xl p-6" style={{ backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}>
                <h3 className="font-bold text-lg mb-4" style={{ color: idx === 0 ? undefined : undefined }}>
                  <span className={idx === 0 ? 'text-brand-blue' : 'text-emerald-600'}>{phone.name}</span>
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-semibold text-emerald-600 mb-2 flex items-center gap-1">
                      <Check className="w-4 h-4" /> Pros
                    </h4>
                    <ul className="space-y-1.5">
                      {phone.pros.map((pro) => (
                        <li key={pro} className="text-sm flex items-start gap-2" style={{ color: 'var(--text-secondary)' }}>
                          <Check className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                          {pro}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-red-500 mb-2 flex items-center gap-1">
                      <X className="w-4 h-4" /> Cons
                    </h4>
                    <ul className="space-y-1.5">
                      {phone.cons.map((con) => (
                        <li key={con} className="text-sm flex items-start gap-2" style={{ color: 'var(--text-secondary)' }}>
                          <X className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                          {con}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Our Recommendation */}
        <section className="rounded-2xl p-6 sm:p-8 bg-gradient-to-br from-blue-50 to-emerald-50 dark:from-blue-950/30 dark:to-emerald-950/30" style={{ border: '1px solid var(--border-color)' }}>
          <div className="flex items-center gap-2 mb-4">
            <Trophy className="w-6 h-6 text-amber-500" />
            <h2 className="text-xl sm:text-2xl font-bold font-[family-name:var(--font-heading)]" style={{ color: 'var(--text-primary)' }}>
              Our Recommendation
            </h2>
          </div>
          <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            {verdict}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/blog/best-smartphones-for-seniors-2026"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-brand-blue text-white text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Read Our Full Buying Guide <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/tools/device-quiz"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors" style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-primary)', border: '1px solid var(--border-color)' }}
            >
              Take the Device Quiz <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* Compare with Other Phones */}
        {related.length > 0 && (
          <section>
            <h2 className="text-xl sm:text-2xl font-bold font-[family-name:var(--font-heading)] mb-6" style={{ color: 'var(--text-primary)' }}>
              Compare with Other Phones
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {related.map(({ slugA: rA, slugB: rB }) => {
                const pA = getPhoneBySlug(rA)
                const pB = getPhoneBySlug(rB)
                if (!pA || !pB) return null
                return (
                  <Link
                    key={`${rA}-${rB}`}
                    href={`/compare/${rA}-vs-${rB}`}
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
      </div>
    </>
  )
}

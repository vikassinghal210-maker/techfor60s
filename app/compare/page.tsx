import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getAllPhones, getPhoneBySlug, getPopularComparisons, USE_CASES, getComparisons } from '@/lib/phones-data'
import { breadcrumbJsonLd } from '@/lib/seo'
import { SITE_URL } from '@/lib/utils'
import Breadcrumbs from '@/components/Breadcrumbs'
import { Search, ArrowRight, Star, ChevronRight, Smartphone, Eye, Ear, Heart, Camera, DollarSign, Monitor, Feather, Battery, Video, Zap } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Compare Phones for Seniors — Side-by-Side Comparisons',
  description:
    'Compare phones side by side with senior-friendly ratings. Find the best phone for your needs with our easy-to-read comparisons of ease of use, screen readability, hearing aid support, and safety features.',
  alternates: { canonical: `${SITE_URL}/compare` },
  openGraph: {
    title: 'Compare Phones for Seniors — Side-by-Side Comparisons | TechFor60s',
    description:
      'Compare phones side by side with senior-friendly ratings. Find the best phone for your needs.',
    url: `${SITE_URL}/compare`,
    type: 'website',
    siteName: 'TechFor60s',
  },
}

const USE_CASE_ICONS: Record<string, typeof Eye> = {
  'bad-eyesight': Eye,
  'hearing-aids': Ear,
  simplicity: Heart,
  photography: Camera,
  budget: DollarSign,
  'big-screen': Monitor,
  lightweight: Feather,
  'long-battery': Battery,
  'video-calls': Video,
  'first-smartphone': Zap,
}

export default function CompareIndexPage() {
  const phones = getAllPhones()
  const popular = getPopularComparisons()

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: 'Home', url: SITE_URL },
              { name: 'Compare Phones' },
            ])
          ),
        }}
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-brand-blue via-blue-700 to-blue-900 text-white py-12 sm:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Compare Phones' },
            ]}
          />
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-heading)] mt-4 mb-4">
            Phone vs Phone for Seniors
          </h1>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto mb-8">
            Not sure which phone is right for you? Compare any two phones side by side with ratings that focus on what matters most to seniors.
          </p>

          {/* Quick search hint */}
          <div className="max-w-xl mx-auto">
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 text-left">
              <Search className="w-5 h-5 text-blue-200 flex-shrink-0" />
              <p className="text-sm text-blue-100">
                Browse our popular comparisons below, or pick any phone to see all matchups.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-14 space-y-14">

        {/* Popular Comparisons */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl sm:text-2xl font-bold font-[family-name:var(--font-heading)]" style={{ color: 'var(--text-primary)' }}>
              Popular Comparisons
            </h2>
            <span className="text-sm font-medium px-3 py-1 rounded-full bg-blue-100 text-brand-blue dark:bg-blue-900/30">
              {getComparisons().length}+ matchups
            </span>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {popular.map(({ slugA, slugB }) => {
              const pA = getPhoneBySlug(slugA)
              const pB = getPhoneBySlug(slugB)
              if (!pA || !pB) return null
              return (
                <Link
                  key={`${slugA}-${slugB}`}
                  href={`/compare/${slugA}-vs-${slugB}`}
                  className="rounded-xl p-4 sm:p-5 transition-all hover:shadow-lg group"
                  style={{ backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex -space-x-3">
                      <div className="w-12 h-12 rounded-lg overflow-hidden relative border-2 border-white dark:border-gray-800">
                        <Image src={pA.thumbnail} alt={pA.name} fill className="object-cover" sizes="48px" />
                      </div>
                      <div className="w-12 h-12 rounded-lg overflow-hidden relative border-2 border-white dark:border-gray-800">
                        <Image src={pB.thumbnail} alt={pB.name} fill className="object-cover" sizes="48px" />
                      </div>
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-100 text-brand-blue dark:bg-blue-900/30">
                      VS
                    </span>
                  </div>
                  <h3 className="font-semibold text-sm mb-1" style={{ color: 'var(--text-primary)' }}>
                    {pA.name} vs {pB.name}
                  </h3>
                  <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--text-muted)' }}>
                    <span>{pA.price} vs {pB.price}</span>
                    <span className="mx-1">|</span>
                    <span className="flex items-center gap-0.5">
                      <Star className="w-3 h-3" />
                      {pA.seniorScore} vs {pB.seniorScore}
                    </span>
                  </div>
                  <div className="mt-3 flex items-center gap-1 text-brand-blue text-xs font-medium group-hover:gap-2 transition-all">
                    Compare now <ArrowRight className="w-3 h-3" />
                  </div>
                </Link>
              )
            })}
          </div>
        </section>

        {/* Browse by Phone */}
        <section>
          <h2 className="text-xl sm:text-2xl font-bold font-[family-name:var(--font-heading)] mb-2" style={{ color: 'var(--text-primary)' }}>
            Browse by Phone
          </h2>
          <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>
            Pick a phone to see all available comparisons.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {phones.map((phone) => {
              // Link to the first comparison involving this phone
              const firstMatch = getComparisons().find(
                (c) => c.slugA === phone.slug || c.slugB === phone.slug
              )
              const href = firstMatch
                ? `/compare/${firstMatch.slugA}-vs-${firstMatch.slugB}`
                : `/compare`

              return (
                <Link
                  key={phone.slug}
                  href={href}
                  className="flex items-center gap-3 rounded-xl p-3 transition-all hover:shadow-md group"
                  style={{ backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
                >
                  <div className="w-10 h-10 rounded-lg overflow-hidden relative flex-shrink-0">
                    <Image src={phone.thumbnail} alt={phone.name} fill className="object-cover" sizes="40px" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium truncate" style={{ color: 'var(--text-primary)' }}>
                      {phone.name}
                    </p>
                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                      {phone.price} | {phone.seniorScore}/10
                    </p>
                  </div>
                  <ChevronRight className="w-4 h-4 flex-shrink-0 text-gray-400 group-hover:text-brand-blue transition-colors" />
                </Link>
              )
            })}
          </div>
        </section>

        {/* Best Phones For... */}
        <section>
          <h2 className="text-xl sm:text-2xl font-bold font-[family-name:var(--font-heading)] mb-2" style={{ color: 'var(--text-primary)' }}>
            Best Phones For...
          </h2>
          <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>
            Find the right phone based on what matters most to you.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {USE_CASES.map((uc) => {
              const Icon = USE_CASE_ICONS[uc.slug] || Smartphone
              return (
                <Link
                  key={uc.slug}
                  href={`/compare/best-for/${uc.slug}`}
                  className="rounded-xl p-5 transition-all hover:shadow-lg group"
                  style={{ backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
                >
                  <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5 text-brand-blue" />
                  </div>
                  <h3 className="font-semibold text-base mb-1" style={{ color: 'var(--text-primary)' }}>
                    {uc.label}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                    {uc.description}
                  </p>
                  <div className="mt-3 flex items-center gap-1 text-brand-blue text-sm font-medium group-hover:gap-2 transition-all">
                    View phones <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              )
            })}
          </div>
        </section>

        {/* Related Guides */}
        <section>
          <h2 className="text-xl sm:text-2xl font-bold font-[family-name:var(--font-heading)] mb-6" style={{ color: 'var(--text-primary)' }}>
            Related Guides
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { href: '/blog/best-smartphones-for-seniors-2026', title: 'Best Smartphones for Seniors (2026)', desc: 'Our top picks with full reviews and ratings.' },
              { href: '/blog/best-large-button-phones-for-seniors', title: 'Best Large Button Phones', desc: 'Simple phones with big buttons and easy interfaces.' },
              { href: '/tools/device-quiz', title: 'Which Device Is Right for You?', desc: 'Take our 5-question quiz to find the perfect device.' },
              { href: '/phone-plans', title: 'Phone Plan Comparator', desc: 'Found your phone? Now find the best plan for it.' },
              { href: '/blog/best-phone-plans-for-seniors-2026', title: 'Best Phone Plans for Seniors', desc: 'Compare plans with senior discounts from all carriers.' },
              { href: '/senior-discounts', title: 'Senior Discount Directory', desc: 'Save on phones, plans, and 150+ more discounts.' },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-xl p-4 transition-all hover:shadow-md group"
                style={{ backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
              >
                <h3 className="font-semibold text-sm mb-1 group-hover:text-brand-blue transition-colors" style={{ color: 'var(--text-primary)' }}>
                  {item.title}
                </h3>
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{item.desc}</p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  )
}

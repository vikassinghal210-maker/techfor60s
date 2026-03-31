import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { SITE_URL } from '@/lib/utils'
import { breadcrumbJsonLd } from '@/lib/seo'
import Breadcrumbs from '@/components/Breadcrumbs'
import { PLAN_CATEGORIES, getPlansByCategory } from '@/lib/phone-plans-data'
import type { PhonePlan } from '@/lib/phone-plans-data'

export function generateStaticParams() {
  return PLAN_CATEGORIES.map((c) => ({ category: c.slug }))
}

export async function generateMetadata(
  props: { params: Promise<{ category: string }> }
): Promise<Metadata> {
  const { category: catSlug } = await props.params
  const category = PLAN_CATEGORIES.find((c) => c.slug === catSlug)
  if (!category) return {}

  const title = `${category.label} for Seniors (2026) — Phone Plan Guide`
  const description = category.description
  const url = `${SITE_URL}/phone-plans/best-for/${catSlug}`

  return {
    title,
    description,
    keywords: [
      `${category.label.toLowerCase()} seniors`,
      `best ${catSlug.replace(/-/g, ' ')} phone plans seniors`,
      'senior phone plans 2026',
    ],
    openGraph: {
      type: 'website',
      url,
      title,
      description,
      siteName: 'TechFor60s',
      locale: 'en_US',
    },
    twitter: { card: 'summary_large_image', title, description },
    alternates: { canonical: url },
  }
}

function getCategoryExplanation(slug: string): string {
  const explanations: Record<string, string> = {
    cheapest:
      'If you mainly use your phone for calls, texts, and occasional browsing, you do not need an expensive plan. These plans all cost $30 per month or less and still provide reliable service from major networks. Some require paying several months in advance for the best rate, so we note that clearly below.',
    'unlimited-data':
      'With an unlimited data plan, you never have to worry about running out of internet or getting surprise overage charges. These plans let you browse the web, watch videos, make video calls, and use apps as much as you want. "Unlimited" means the data does not run out, though speeds may slow down a bit during very busy network times.',
    'senior-specific':
      'These plans are specifically designed for people aged 55 and older. They offer the same great service as regular plans but at a discounted price. You typically need to verify your age when signing up. Most require two lines (perfect for couples), though some carriers offer single-line senior plans too.',
    'no-contract':
      'Every plan listed here lets you cancel anytime with no penalty. There are no early termination fees and no long-term commitments. You pay month-to-month and can switch carriers whenever you want. This is now the norm for most carriers, which is great news for consumers.',
    'family-plans':
      'Family plans let you share an account with your spouse, children, or other family members. The more lines you add, the cheaper each line becomes. This is one of the easiest ways to save money on phone service — for example, two people on T-Mobile Essentials 55+ pay just $27.50 per line instead of paying for two separate plans.',
    'hearing-aid-compatible':
      'If you wear hearing aids, look for phones and plans from carriers that specifically support hearing-aid compatibility (rated M3/T3 or higher). All the plans below come from carriers that offer hearing-aid compatible devices and have good track records with accessibility features.',
    'international-calling':
      'If you have family or friends in other countries, these plans include international calling or texting at no extra cost (or very low cost). This can save you significant money compared to paying per-minute international rates, which can be $1–3 per minute with some carriers.',
  }
  return explanations[slug] ?? ''
}

export default async function CategoryPage(
  props: { params: Promise<{ category: string }> }
) {
  const { category: catSlug } = await props.params
  const category = PLAN_CATEGORIES.find((c) => c.slug === catSlug)
  if (!category) notFound()

  const plans = getPlansByCategory(catSlug)

  const breadcrumbs = [
    { name: 'Home', url: SITE_URL },
    { name: 'Phone Plans', url: `${SITE_URL}/phone-plans` },
    { name: category.label, url: `${SITE_URL}/phone-plans/best-for/${catSlug}` },
  ]

  const explanation = getCategoryExplanation(catSlug)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd(breadcrumbs)),
        }}
      />

      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Phone Plans', href: '/phone-plans' },
          { label: category.label },
        ]}
      />

      {/* Header */}
      <div className="mb-8">
        <h1
          className="text-3xl sm:text-4xl font-bold mb-4 font-[family-name:var(--font-heading)]"
          style={{ color: 'var(--text-primary)' }}
        >
          {category.label} for Seniors (2026)
        </h1>
        <p
          className="text-lg leading-relaxed max-w-4xl"
          style={{ color: 'var(--text-secondary)' }}
        >
          {category.description}
        </p>
      </div>

      {/* Explanation */}
      {explanation && (
        <div
          className="rounded-xl border p-5 mb-10"
          style={{
            backgroundColor: 'var(--bg-tertiary)',
            borderColor: 'var(--border-color)',
          }}
        >
          <h2
            className="text-lg font-bold mb-2 font-[family-name:var(--font-heading)]"
            style={{ color: 'var(--text-primary)' }}
          >
            What You Should Know
          </h2>
          <p
            className="text-sm leading-relaxed"
            style={{ color: 'var(--text-secondary)' }}
          >
            {explanation}
          </p>
        </div>
      )}

      {/* Plan Count */}
      <p
        className="text-sm font-medium mb-6"
        style={{ color: 'var(--text-muted)' }}
      >
        {plans.length} plan{plans.length !== 1 ? 's' : ''} found
      </p>

      {/* Plans */}
      <div className="space-y-6 mb-12">
        {plans.map((plan, index) => (
          <CategoryPlanCard key={plan.slug} plan={plan} rank={index + 1} />
        ))}
      </div>

      {/* Other Categories */}
      <section className="mb-10">
        <h2
          className="text-2xl font-bold mb-4 font-[family-name:var(--font-heading)]"
          style={{ color: 'var(--text-primary)' }}
        >
          Other Plan Categories
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {PLAN_CATEGORIES.filter((c) => c.slug !== catSlug).map((cat) => (
            <Link
              key={cat.slug}
              href={`/phone-plans/best-for/${cat.slug}`}
              className="rounded-xl border p-4 transition-shadow hover:shadow-lg"
              style={{
                backgroundColor: 'var(--bg-primary)',
                borderColor: 'var(--border-color)',
              }}
            >
              <h3
                className="font-bold font-[family-name:var(--font-heading)]"
                style={{ color: 'var(--text-primary)' }}
              >
                {cat.label}
              </h3>
              <p
                className="text-sm mt-1"
                style={{ color: 'var(--text-muted)' }}
              >
                {cat.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Back Link */}
      <div>
        <Link
          href="/phone-plans"
          className="text-brand-blue hover:underline font-medium"
        >
          &larr; Back to all phone plans
        </Link>
      </div>
    </div>
  )
}

function CategoryPlanCard({
  plan,
  rank,
}: {
  plan: PhonePlan
  rank: number
}) {
  return (
    <div
      className="rounded-xl border p-5 sm:p-6"
      style={{
        backgroundColor: 'var(--bg-primary)',
        borderColor: 'var(--border-color)',
      }}
    >
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
        <div className="flex items-start gap-3">
          <span
            className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-blue text-white flex items-center justify-center text-sm font-bold"
          >
            {rank}
          </span>
          <div>
            <p
              className="text-sm font-medium"
              style={{ color: 'var(--text-muted)' }}
            >
              {plan.carrier}
            </p>
            <h3
              className="text-xl font-bold font-[family-name:var(--font-heading)]"
              style={{ color: 'var(--text-primary)' }}
            >
              {plan.planName}
            </h3>
          </div>
        </div>
        <div className="text-left sm:text-right flex-shrink-0">
          <p className="text-3xl font-bold text-brand-blue">
            {plan.price.split('/')[0]}
          </p>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            /{plan.price.split('/').slice(1).join('/')}
          </p>
        </div>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-2 mb-4">
        {plan.seniorSpecific && (
          <span className="text-xs font-semibold px-2 py-1 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300">
            55+ Discount
          </span>
        )}
        {plan.aarpDiscount && (
          <span className="text-xs font-semibold px-2 py-1 rounded-full bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300">
            AARP Discount
          </span>
        )}
        {!plan.contractRequired && (
          <span className="text-xs font-semibold px-2 py-1 rounded-full bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300">
            No Contract
          </span>
        )}
        {plan.hearingAidCompatible && (
          <span className="text-xs font-semibold px-2 py-1 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300">
            Hearing-Aid OK
          </span>
        )}
      </div>

      {/* Details Grid */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-sm mb-4"
        style={{ color: 'var(--text-secondary)' }}
      >
        <div>
          <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>
            Data:{' '}
          </span>
          {plan.data}
        </div>
        <div>
          <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>
            Talk & Text:{' '}
          </span>
          {plan.talkText}
        </div>
        <div>
          <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>
            Network:{' '}
          </span>
          {plan.network}
        </div>
        <div>
          <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>
            Hotspot:{' '}
          </span>
          {plan.hotspot}
        </div>
        <div>
          <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>
            International:{' '}
          </span>
          {plan.internationalCalling}
        </div>
        <div>
          <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>
            Family Plan:{' '}
          </span>
          {plan.familyPlan ? (plan.perLineWithFamily ?? 'Yes') : 'No'}
        </div>
      </div>

      {/* Best For */}
      <div
        className="rounded-lg p-3 mb-4 text-sm"
        style={{ backgroundColor: 'var(--bg-tertiary)' }}
      >
        <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>
          Best for:{' '}
        </span>
        <span style={{ color: 'var(--text-secondary)' }}>{plan.bestFor}</span>
      </div>

      {/* Pros & Cons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <p className="text-sm font-semibold mb-2 text-green-700 dark:text-green-400">
            Pros
          </p>
          <ul className="space-y-1">
            {plan.pros.map((pro, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-sm"
                style={{ color: 'var(--text-secondary)' }}
              >
                <span className="text-green-600 flex-shrink-0">&#10003;</span>
                {pro}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold mb-2 text-red-700 dark:text-red-400">
            Cons
          </p>
          <ul className="space-y-1">
            {plan.cons.map((con, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-sm"
                style={{ color: 'var(--text-secondary)' }}
              >
                <span className="text-red-500 flex-shrink-0">&#10007;</span>
                {con}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Carrier Link */}
      <div className="mt-4 pt-3 border-t" style={{ borderColor: 'var(--border-color)' }}>
        <Link
          href={`/phone-plans/${plan.carrierSlug}`}
          className="text-sm font-medium text-brand-blue hover:underline"
        >
          See all {plan.carrier} plans &rarr;
        </Link>
      </div>
    </div>
  )
}

import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { SITE_URL } from '@/lib/utils'
import { breadcrumbJsonLd } from '@/lib/seo'
import Breadcrumbs from '@/components/Breadcrumbs'
import {
  getCarriers,
  getPlansByCarrier,
  getCarrierComparisons,
} from '@/lib/phone-plans-data'
import type { PhonePlan } from '@/lib/phone-plans-data'

export function generateStaticParams() {
  return getCarriers().map((c) => ({ carrier: c.slug }))
}

export async function generateMetadata(
  props: { params: Promise<{ carrier: string }> }
): Promise<Metadata> {
  const { carrier: carrierSlug } = await props.params
  const carriers = getCarriers()
  const carrier = carriers.find((c) => c.slug === carrierSlug)
  if (!carrier) return {}

  const plans = getPlansByCarrier(carrierSlug)
  const lowestPrice = Math.min(...plans.map((p) => p.priceNum))

  const title = `${carrier.name} Phone Plans for Seniors (2026) — From $${lowestPrice}/mo`
  const description = `Compare all ${carrier.name} phone plans for seniors. See pricing, data options, senior discounts, and which ${carrier.name} plan is the best value for your needs.`
  const url = `${SITE_URL}/phone-plans/${carrier.slug}`

  return {
    title,
    description,
    keywords: [
      `${carrier.name} senior phone plans`,
      `${carrier.name} plans for elderly`,
      `${carrier.name} 55+ plans`,
      `best ${carrier.name} plan for seniors`,
      `${carrier.name} phone plan comparison`,
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

// Carrier overview information
function getCarrierOverview(slug: string): {
  description: string
  seniorPros: string[]
  seniorCons: string[]
} {
  const overviews: Record<string, { description: string; seniorPros: string[]; seniorCons: string[] }> = {
    't-mobile': {
      description: 'T-Mobile is one of the most senior-friendly carriers in the US, offering dedicated 55+ plans at significant discounts. Their nationwide 5G network is the largest in the country, and all plans include taxes and fees in the advertised price — so the price you see is the price you pay.',
      seniorPros: [
        'Dedicated 55+ plans with real savings',
        'Largest 5G network in the US',
        'Taxes and fees included — no surprise charges',
        'Strong in-store support with friendly staff',
        'Mexico & Canada coverage on most plans',
      ],
      seniorCons: [
        '55+ plans require exactly 2 lines',
        'Coverage can be weaker in very rural areas',
        'Some plans are online-signup only',
      ],
    },
    'consumer-cellular': {
      description: 'Consumer Cellular was built specifically with seniors in mind. They are the exclusive wireless partner of AARP and consistently rank #1 in customer satisfaction among value carriers. Their US-based customer service team is known for patience and helpfulness.',
      seniorPros: [
        'AARP members save 5% every month',
        'US-based customer support that takes time to help',
        'Flexible plans — upgrade or downgrade anytime',
        'No contracts, no activation fees, no overage penalties',
        'Rated #1 by J.D. Power for value carriers',
      ],
      seniorCons: [
        'No physical stores — phone and online support only',
        'International calling costs extra',
        'Limited phone selection compared to big carriers',
      ],
    },
    'verizon': {
      description: 'Verizon offers the most reliable network coverage in America, especially in rural and suburban areas. Their 55+ plans bring premium network quality at a discount for seniors, making them a top choice for people who need dependable service everywhere they go.',
      seniorPros: [
        'Best overall network coverage, especially rural areas',
        '55+ plans with meaningful discounts',
        'Extensive retail store network for in-person help',
        '5G access included on all current plans',
        'Strong reputation for network reliability',
      ],
      seniorCons: [
        '55+ plans limited to 2 lines only',
        'More expensive than budget carriers',
        'Can be confusing with many plan tiers',
      ],
    },
    'lively': {
      description: 'Lively (formerly Jitterbug) makes phones and plans designed from the ground up for seniors. Their phones feature large buttons, simplified menus, a built-in urgent response button, and hearing-aid compatibility. If simplicity is your top priority, Lively is the go-to choice.',
      seniorPros: [
        'Phones designed specifically for seniors',
        'Extra-large buttons and simplified interface',
        'Built-in urgent response button for emergencies',
        'All phones are hearing-aid compatible',
        'No-contract, straightforward plans',
      ],
      seniorCons: [
        'Very limited phone selection',
        'Cannot use modern smartphone apps easily',
        'No hotspot on any plan',
        'Pricier than some alternatives for basic features',
      ],
    },
    'mint-mobile': {
      description: 'Mint Mobile offers some of the lowest prices in wireless by selling plans in 3, 6, or 12-month blocks. They run on T-Mobile\'s fast 5G network and include features like hotspot at no extra cost. The trade-off is that setup and support are entirely online.',
      seniorPros: [
        'Some of the lowest prices available anywhere',
        'Full T-Mobile 5G network access',
        'Hotspot included on every plan',
        'Mexico & Canada calling included',
        'No long-term contract obligation',
      ],
      seniorCons: [
        'Must pay several months upfront',
        'No physical stores — all support is online',
        'SIM card setup requires some tech comfort',
        'Renewal pricing may increase',
      ],
    },
    'att': {
      description: 'AT&T is one of America\'s oldest and most trusted carriers with excellent nationwide coverage. They offer AARP discounts and strong family plan pricing, making them a solid choice for seniors who want a name-brand carrier with in-store support.',
      seniorPros: [
        'Excellent nationwide coverage',
        'AARP member discounts available',
        'Thousands of retail stores for in-person help',
        'Strong family plan pricing for multiple lines',
        'Reliable 5G and 4G LTE network',
      ],
      seniorCons: [
        'No dedicated 55+ plans like T-Mobile',
        'Can be expensive for a single line',
        'Taxes and fees are extra on most plans',
      ],
    },
    'spectrum-mobile': {
      description: 'Spectrum Mobile offers very competitive pricing on Verizon\'s network, but there is one catch: you must be a Spectrum internet customer. If you already have Spectrum at home, bundling your phone can save you significant money.',
      seniorPros: [
        'Runs on Verizon\'s reliable network',
        'Very affordable unlimited plan at $30/mo',
        'No extra taxes or fees',
        'Easy to bundle with existing Spectrum service',
        'No contract required',
      ],
      seniorCons: [
        'Requires Spectrum internet — not available standalone',
        'No senior-specific discounts',
        'Limited to areas where Spectrum provides service',
      ],
    },
    'visible': {
      description: 'Visible is Verizon\'s budget-friendly sub-brand, offering unlimited plans on Verizon\'s network at prices that rival the cheapest carriers. Everything is managed through an app or website, so it works best for seniors comfortable with technology.',
      seniorPros: [
        'Full Verizon network at a fraction of the cost',
        'All taxes and fees included in the price',
        'Unlimited data starting at just $25/mo',
        'No contract — cancel anytime',
        'Visible+ includes international calling',
      ],
      seniorCons: [
        'No physical stores at all',
        'All customer support is through the app or online',
        'Requires comfort with self-service setup',
      ],
    },
    'google-fi': {
      description: 'Google Fi stands out for its international features and flexible pay-as-you-go pricing. It automatically switches between T-Mobile and US Cellular networks for the best signal, and it works seamlessly in 200+ countries — perfect for traveling seniors.',
      seniorPros: [
        'Works in 200+ countries at no extra charge',
        'Flexible plan — only pay for data you use',
        'Automatically picks the strongest network signal',
        'Bill never exceeds $60/mo on the Flexible plan',
        'Excellent for international travelers',
      ],
      seniorCons: [
        'Customer support is mostly online',
        'Requires a compatible phone',
        'Per-GB pricing can add up for heavier users',
      ],
    },
    'straight-talk': {
      description: 'Straight Talk is a prepaid carrier available at every Walmart. You can choose whether to run on Verizon, T-Mobile, or AT&T\'s network, making it flexible for wherever you live. Plans are simple and there are no credit checks or contracts.',
      seniorPros: [
        'Available at every Walmart — easy to buy',
        'Choose your network: Verizon, T-Mobile, or AT&T',
        'No credit check or contract required',
        'Simple, flat-rate pricing',
        'Prepaid — never a surprise bill',
      ],
      seniorCons: [
        'Customer service can be slow',
        'No senior-specific discounts',
        'Support is limited outside of Walmart',
        'No family plan discounts',
      ],
    },
    'cricket-wireless': {
      description: 'Cricket Wireless runs on AT&T\'s network and stands out for having physical stores across the country where you can get in-person help. Pricing is straightforward, data never has overage charges (it just slows down), and family plans offer solid savings.',
      seniorPros: [
        'Thousands of physical stores for face-to-face help',
        'Runs on AT&T\'s reliable network',
        'No overage charges ever — data just slows down',
        'Good family plan discounts for multiple lines',
        'Simple, flat-rate pricing',
      ],
      seniorCons: [
        'Video streaming capped at standard definition',
        'Data deprioritized behind AT&T postpaid customers',
        'No senior-specific discounts',
      ],
    },
  }
  return overviews[slug] ?? {
    description: 'A wireless carrier offering phone plans suitable for seniors.',
    seniorPros: ['Competitive pricing', 'No contract required'],
    seniorCons: ['Limited senior-specific features'],
  }
}

export default async function CarrierPage(
  props: { params: Promise<{ carrier: string }> }
) {
  const { carrier: carrierSlug } = await props.params
  const carriers = getCarriers()
  const carrier = carriers.find((c) => c.slug === carrierSlug)
  if (!carrier) notFound()

  const plans = getPlansByCarrier(carrierSlug)
  const overview = getCarrierOverview(carrierSlug)

  // Find comparisons involving this carrier
  const comparisons = getCarrierComparisons().filter(
    (c) => c.carrier1Slug === carrierSlug || c.carrier2Slug === carrierSlug
  )

  const breadcrumbs = [
    { name: 'Home', url: SITE_URL },
    { name: 'Phone Plans', url: `${SITE_URL}/phone-plans` },
    { name: carrier.name, url: `${SITE_URL}/phone-plans/${carrier.slug}` },
  ]

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
          { label: carrier.name },
        ]}
      />

      {/* Carrier Header */}
      <div className="mb-8">
        <h1
          className="text-3xl sm:text-4xl font-bold mb-4 font-[family-name:var(--font-heading)]"
          style={{ color: 'var(--text-primary)' }}
        >
          {carrier.name} Phone Plans for Seniors (2026)
        </h1>
        <p
          className="text-lg leading-relaxed max-w-4xl"
          style={{ color: 'var(--text-secondary)' }}
        >
          {overview.description}
        </p>
      </div>

      {/* Pros & Cons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div
          className="rounded-xl border p-5"
          style={{
            backgroundColor: 'var(--bg-primary)',
            borderColor: 'var(--border-color)',
          }}
        >
          <h2
            className="text-xl font-bold mb-3 font-[family-name:var(--font-heading)] text-green-700 dark:text-green-400"
          >
            Why Seniors Like {carrier.name}
          </h2>
          <ul className="space-y-2">
            {overview.seniorPros.map((pro, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-sm"
                style={{ color: 'var(--text-secondary)' }}
              >
                <span className="text-green-600 mt-0.5 flex-shrink-0">&#10003;</span>
                {pro}
              </li>
            ))}
          </ul>
        </div>
        <div
          className="rounded-xl border p-5"
          style={{
            backgroundColor: 'var(--bg-primary)',
            borderColor: 'var(--border-color)',
          }}
        >
          <h2
            className="text-xl font-bold mb-3 font-[family-name:var(--font-heading)] text-red-700 dark:text-red-400"
          >
            Things to Consider
          </h2>
          <ul className="space-y-2">
            {overview.seniorCons.map((con, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-sm"
                style={{ color: 'var(--text-secondary)' }}
              >
                <span className="text-red-500 mt-0.5 flex-shrink-0">&#10007;</span>
                {con}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* All Plans */}
      <h2
        className="text-2xl sm:text-3xl font-bold mb-6 font-[family-name:var(--font-heading)]"
        style={{ color: 'var(--text-primary)' }}
      >
        All {carrier.name} Plans
      </h2>
      <div className="space-y-6 mb-12">
        {plans.map((plan) => (
          <PlanDetailCard key={plan.slug} plan={plan} />
        ))}
      </div>

      {/* Compare With Other Carriers */}
      {comparisons.length > 0 && (
        <section className="mb-12">
          <h2
            className="text-2xl font-bold mb-4 font-[family-name:var(--font-heading)]"
            style={{ color: 'var(--text-primary)' }}
          >
            Compare {carrier.name} With...
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {comparisons.map((comp) => {
              const otherName =
                comp.carrier1Slug === carrierSlug
                  ? comp.carrier2Name
                  : comp.carrier1Name
              return (
                <Link
                  key={comp.slug}
                  href={`/phone-plans/compare/${comp.slug}`}
                  className="rounded-xl border p-4 transition-shadow hover:shadow-lg"
                  style={{
                    backgroundColor: 'var(--bg-primary)',
                    borderColor: 'var(--border-color)',
                  }}
                >
                  <p
                    className="font-bold font-[family-name:var(--font-heading)]"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {carrier.name} vs. {otherName}
                  </p>
                  <p
                    className="text-sm mt-1"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    Side-by-side comparison &rarr;
                  </p>
                </Link>
              )
            })}
          </div>
        </section>
      )}

      {/* Back Link */}
      <div className="mt-8">
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

function PlanDetailCard({ plan }: { plan: PhonePlan }) {
  return (
    <div
      className="rounded-xl border p-5 sm:p-6"
      style={{
        backgroundColor: 'var(--bg-primary)',
        borderColor: 'var(--border-color)',
      }}
    >
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
        <div>
          <h3
            className="text-xl font-bold font-[family-name:var(--font-heading)]"
            style={{ color: 'var(--text-primary)' }}
          >
            {plan.planName}
          </h3>
          <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
            {plan.bestFor}
          </p>
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
          <span className="inline-block text-xs font-semibold px-2 py-1 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300">
            55+ Discount
          </span>
        )}
        {plan.aarpDiscount && (
          <span className="inline-block text-xs font-semibold px-2 py-1 rounded-full bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300">
            AARP Discount
          </span>
        )}
        {!plan.contractRequired && (
          <span className="inline-block text-xs font-semibold px-2 py-1 rounded-full bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300">
            No Contract
          </span>
        )}
      </div>

      {/* Feature Grid */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-sm mb-5"
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
          {plan.familyPlan
            ? plan.perLineWithFamily
              ? `Yes — ${plan.perLineWithFamily}`
              : 'Yes'
            : 'No'}
        </div>
      </div>

      {/* Pros & Cons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <p
            className="text-sm font-semibold mb-2 text-green-700 dark:text-green-400"
          >
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
          <p
            className="text-sm font-semibold mb-2 text-red-700 dark:text-red-400"
          >
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
    </div>
  )
}

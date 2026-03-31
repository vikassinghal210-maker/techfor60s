import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { SITE_URL } from '@/lib/utils'
import { breadcrumbJsonLd } from '@/lib/seo'
import Breadcrumbs from '@/components/Breadcrumbs'
import {
  getCarrierComparisons,
  getComparisonBySlug,
  getPlansByCarrier,
} from '@/lib/phone-plans-data'
import type { PhonePlan } from '@/lib/phone-plans-data'

export function generateStaticParams() {
  return getCarrierComparisons().map((c) => ({ slug: c.slug }))
}

export async function generateMetadata(
  props: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await props.params
  const comparison = getComparisonBySlug(slug)
  if (!comparison) return {}

  const title = `${comparison.carrier1Name} vs ${comparison.carrier2Name} for Seniors (2026)`
  const description = `Side-by-side comparison of ${comparison.carrier1Name} and ${comparison.carrier2Name} phone plans for seniors. Compare pricing, data, coverage, and senior discounts to find the best fit.`
  const url = `${SITE_URL}/phone-plans/compare/${slug}`

  return {
    title,
    description,
    keywords: [
      `${comparison.carrier1Name} vs ${comparison.carrier2Name}`,
      `${comparison.carrier1Name} vs ${comparison.carrier2Name} seniors`,
      `best carrier for seniors`,
      `phone plan comparison seniors`,
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

function getVerdict(
  carrier1Name: string,
  carrier2Name: string,
  plans1: PhonePlan[],
  plans2: PhonePlan[]
): { winner: string; explanation: string } {
  const avg1 = plans1.reduce((sum, p) => sum + p.priceNum, 0) / plans1.length
  const avg2 = plans2.reduce((sum, p) => sum + p.priceNum, 0) / plans2.length
  const senior1 = plans1.some((p) => p.seniorSpecific)
  const senior2 = plans2.some((p) => p.seniorSpecific)
  const min1 = Math.min(...plans1.map((p) => p.priceNum))
  const min2 = Math.min(...plans2.map((p) => p.priceNum))

  if (senior1 && !senior2) {
    return {
      winner: carrier1Name,
      explanation: `${carrier1Name} offers dedicated senior/55+ plans with discounted pricing, giving them an edge for older adults. ${carrier2Name} has competitive pricing but lacks age-specific discounts.`,
    }
  }
  if (senior2 && !senior1) {
    return {
      winner: carrier2Name,
      explanation: `${carrier2Name} offers dedicated senior/55+ plans with discounted pricing, giving them an edge for older adults. ${carrier1Name} has competitive pricing but lacks age-specific discounts.`,
    }
  }
  if (avg1 < avg2) {
    return {
      winner: carrier1Name,
      explanation: `${carrier1Name} offers lower average pricing (starting at $${min1}/mo vs $${min2}/mo for ${carrier2Name}), making them the better value for budget-conscious seniors. However, ${carrier2Name} may offer better coverage or features depending on your location.`,
    }
  }
  if (avg2 < avg1) {
    return {
      winner: carrier2Name,
      explanation: `${carrier2Name} offers lower average pricing (starting at $${min2}/mo vs $${min1}/mo for ${carrier1Name}), making them the better value for budget-conscious seniors. However, ${carrier1Name} may offer better coverage or features depending on your location.`,
    }
  }
  return {
    winner: 'Tie',
    explanation: `Both ${carrier1Name} and ${carrier2Name} offer excellent value for seniors. Your best choice depends on which network has better coverage in your area and which specific features matter most to you.`,
  }
}

export default async function ComparisonPage(
  props: { params: Promise<{ slug: string }> }
) {
  const { slug } = await props.params
  const comparison = getComparisonBySlug(slug)
  if (!comparison) notFound()

  const plans1 = getPlansByCarrier(comparison.carrier1Slug)
  const plans2 = getPlansByCarrier(comparison.carrier2Slug)
  const verdict = getVerdict(
    comparison.carrier1Name,
    comparison.carrier2Name,
    plans1,
    plans2
  )

  const breadcrumbs = [
    { name: 'Home', url: SITE_URL },
    { name: 'Phone Plans', url: `${SITE_URL}/phone-plans` },
    {
      name: `${comparison.carrier1Name} vs ${comparison.carrier2Name}`,
      url: `${SITE_URL}/phone-plans/compare/${slug}`,
    },
  ]

  // Build comparison features table
  const featureRows = buildFeatureComparison(plans1, plans2)

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
          {
            label: `${comparison.carrier1Name} vs ${comparison.carrier2Name}`,
          },
        ]}
      />

      {/* Header */}
      <div className="text-center mb-10">
        <h1
          className="text-3xl sm:text-4xl font-bold mb-4 font-[family-name:var(--font-heading)]"
          style={{ color: 'var(--text-primary)' }}
        >
          {comparison.carrier1Name} vs {comparison.carrier2Name} for Seniors
        </h1>
        <p
          className="text-lg max-w-3xl mx-auto"
          style={{ color: 'var(--text-secondary)' }}
        >
          A plain-English comparison of {comparison.carrier1Name} and{' '}
          {comparison.carrier2Name} phone plans. We look at pricing, data,
          coverage, and senior-friendly features to help you decide.
        </p>
      </div>

      {/* Feature Comparison Table */}
      <div className="overflow-x-auto mb-10">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th
                className="text-left p-3 text-sm font-semibold border-b-2"
                style={{
                  color: 'var(--text-primary)',
                  borderColor: 'var(--border-color)',
                }}
              >
                Feature
              </th>
              <th
                className="text-center p-3 text-sm font-semibold border-b-2"
                style={{
                  color: 'var(--text-primary)',
                  borderColor: 'var(--border-color)',
                }}
              >
                {comparison.carrier1Name}
              </th>
              <th
                className="text-center p-3 text-sm font-semibold border-b-2"
                style={{
                  color: 'var(--text-primary)',
                  borderColor: 'var(--border-color)',
                }}
              >
                {comparison.carrier2Name}
              </th>
            </tr>
          </thead>
          <tbody>
            {featureRows.map((row, i) => (
              <tr key={i}>
                <td
                  className="p-3 text-sm font-medium border-b"
                  style={{
                    color: 'var(--text-primary)',
                    borderColor: 'var(--border-color)',
                  }}
                >
                  {row.feature}
                </td>
                <td
                  className="p-3 text-sm text-center border-b"
                  style={{
                    color: 'var(--text-secondary)',
                    borderColor: 'var(--border-color)',
                  }}
                >
                  {row.carrier1}
                </td>
                <td
                  className="p-3 text-sm text-center border-b"
                  style={{
                    color: 'var(--text-secondary)',
                    borderColor: 'var(--border-color)',
                  }}
                >
                  {row.carrier2}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Side-by-Side Plans */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        {/* Carrier 1 Plans */}
        <div>
          <h2
            className="text-2xl font-bold mb-4 font-[family-name:var(--font-heading)]"
            style={{ color: 'var(--text-primary)' }}
          >
            {comparison.carrier1Name} Plans
          </h2>
          <div className="space-y-4">
            {plans1.map((plan) => (
              <CompactPlanCard key={plan.slug} plan={plan} />
            ))}
          </div>
        </div>

        {/* Carrier 2 Plans */}
        <div>
          <h2
            className="text-2xl font-bold mb-4 font-[family-name:var(--font-heading)]"
            style={{ color: 'var(--text-primary)' }}
          >
            {comparison.carrier2Name} Plans
          </h2>
          <div className="space-y-4">
            {plans2.map((plan) => (
              <CompactPlanCard key={plan.slug} plan={plan} />
            ))}
          </div>
        </div>
      </div>

      {/* Verdict */}
      <div
        className="rounded-xl border p-6 mb-10"
        style={{
          backgroundColor: 'var(--bg-tertiary)',
          borderColor: 'var(--border-color)',
        }}
      >
        <h2
          className="text-2xl font-bold mb-3 font-[family-name:var(--font-heading)]"
          style={{ color: 'var(--text-primary)' }}
        >
          Our Verdict
        </h2>
        {verdict.winner !== 'Tie' && (
          <p className="text-lg font-semibold text-brand-blue mb-2">
            Winner for seniors: {verdict.winner}
          </p>
        )}
        <p
          className="text-base leading-relaxed"
          style={{ color: 'var(--text-secondary)' }}
        >
          {verdict.explanation}
        </p>
      </div>

      {/* Links */}
      <div className="flex flex-wrap gap-4">
        <Link
          href={`/phone-plans/${comparison.carrier1Slug}`}
          className="text-brand-blue hover:underline font-medium"
        >
          See all {comparison.carrier1Name} plans &rarr;
        </Link>
        <Link
          href={`/phone-plans/${comparison.carrier2Slug}`}
          className="text-brand-blue hover:underline font-medium"
        >
          See all {comparison.carrier2Name} plans &rarr;
        </Link>
        <Link
          href="/phone-plans"
          className="text-brand-blue hover:underline font-medium"
        >
          &larr; Back to all plans
        </Link>
      </div>
    </div>
  )
}

function CompactPlanCard({ plan }: { plan: PhonePlan }) {
  return (
    <div
      className="rounded-lg border p-4"
      style={{
        backgroundColor: 'var(--bg-primary)',
        borderColor: 'var(--border-color)',
      }}
    >
      <div className="flex items-start justify-between mb-2">
        <h3
          className="font-bold font-[family-name:var(--font-heading)]"
          style={{ color: 'var(--text-primary)' }}
        >
          {plan.planName}
        </h3>
        <span className="text-xl font-bold text-brand-blue flex-shrink-0 ml-3">
          {plan.price.split('/')[0]}
          <span className="text-xs font-normal" style={{ color: 'var(--text-muted)' }}>
            /{plan.price.split('/').slice(1).join('/')}
          </span>
        </span>
      </div>
      <div className="flex flex-wrap gap-2 mb-2">
        {plan.seniorSpecific && (
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300">
            55+
          </span>
        )}
        {plan.aarpDiscount && (
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300">
            AARP
          </span>
        )}
      </div>
      <div
        className="text-sm space-y-1"
        style={{ color: 'var(--text-secondary)' }}
      >
        <p>
          <span className="font-medium">Data:</span> {plan.data} &middot;{' '}
          <span className="font-medium">Hotspot:</span> {plan.hotspot}
        </p>
        <p className="italic text-xs" style={{ color: 'var(--text-muted)' }}>
          {plan.bestFor}
        </p>
      </div>
    </div>
  )
}

function buildFeatureComparison(
  plans1: PhonePlan[],
  plans2: PhonePlan[]
): { feature: string; carrier1: string; carrier2: string }[] {
  const min1 = Math.min(...plans1.map((p) => p.priceNum))
  const max1 = Math.max(...plans1.map((p) => p.priceNum))
  const min2 = Math.min(...plans2.map((p) => p.priceNum))
  const max2 = Math.max(...plans2.map((p) => p.priceNum))

  return [
    {
      feature: 'Starting Price',
      carrier1: `$${min1}/mo`,
      carrier2: `$${min2}/mo`,
    },
    {
      feature: 'Price Range',
      carrier1: `$${min1} – $${max1}/mo`,
      carrier2: `$${min2} – $${max2}/mo`,
    },
    {
      feature: 'Number of Plans',
      carrier1: `${plans1.length} plans`,
      carrier2: `${plans2.length} plans`,
    },
    {
      feature: 'Senior-Specific Plans',
      carrier1: plans1.some((p) => p.seniorSpecific) ? 'Yes' : 'No',
      carrier2: plans2.some((p) => p.seniorSpecific) ? 'Yes' : 'No',
    },
    {
      feature: 'AARP Discount',
      carrier1: plans1.some((p) => p.aarpDiscount) ? 'Yes' : 'No',
      carrier2: plans2.some((p) => p.aarpDiscount) ? 'Yes' : 'No',
    },
    {
      feature: 'Unlimited Data Option',
      carrier1: plans1.some((p) => p.dataNum === -1) ? 'Yes' : 'No',
      carrier2: plans2.some((p) => p.dataNum === -1) ? 'Yes' : 'No',
    },
    {
      feature: 'Contract Required',
      carrier1: plans1.some((p) => p.contractRequired) ? 'Yes' : 'No',
      carrier2: plans2.some((p) => p.contractRequired) ? 'Yes' : 'No',
    },
    {
      feature: 'Hearing-Aid Compatible',
      carrier1: plans1.every((p) => p.hearingAidCompatible) ? 'Yes' : 'Some plans',
      carrier2: plans2.every((p) => p.hearingAidCompatible) ? 'Yes' : 'Some plans',
    },
    {
      feature: 'International Calling',
      carrier1: plans1.some((p) => p.internationalCalling !== 'None')
        ? plans1.find((p) => p.internationalCalling !== 'None')!.internationalCalling
        : 'Not included',
      carrier2: plans2.some((p) => p.internationalCalling !== 'None')
        ? plans2.find((p) => p.internationalCalling !== 'None')!.internationalCalling
        : 'Not included',
    },
    {
      feature: 'Family Plan Available',
      carrier1: plans1.some((p) => p.familyPlan) ? 'Yes' : 'No',
      carrier2: plans2.some((p) => p.familyPlan) ? 'Yes' : 'No',
    },
    {
      feature: 'Network',
      carrier1: plans1[0]?.network ?? 'N/A',
      carrier2: plans2[0]?.network ?? 'N/A',
    },
  ]
}

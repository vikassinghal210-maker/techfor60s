import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  getAllDiscounts,
  getDiscountBySlug,
  getDiscountsByCategory,
  DISCOUNT_CATEGORIES,
} from '@/lib/discounts-data'
import { SITE_URL } from '@/lib/utils'
import { breadcrumbJsonLd } from '@/lib/seo'
import Breadcrumbs from '@/components/Breadcrumbs'

export function generateStaticParams() {
  return getAllDiscounts().map((d) => ({ company: d.slug }))
}

export async function generateMetadata(
  props: { params: Promise<{ company: string }> }
): Promise<Metadata> {
  const { company } = await props.params
  const discount = getDiscountBySlug(company)
  if (!discount) return {}

  const title = `Senior Discount at ${discount.company} (2026) — How to Save`
  const description = `${discount.discount}. Learn how to claim your senior discount at ${discount.company}. Eligibility: age ${discount.eligibilityAge}+.${discount.aarpRequired ? ' AARP card required.' : ''}`
  const url = `${SITE_URL}/senior-discounts/${discount.slug}`

  return {
    title,
    description,
    keywords: [
      `${discount.company} senior discount`,
      `${discount.company} senior discount 2026`,
      `${discount.company} discount for seniors`,
      `${discount.company} AARP discount`,
      `senior discount ${discount.category}`,
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

export default async function CompanyDiscountPage(
  props: { params: Promise<{ company: string }> }
) {
  const { company } = await props.params
  const discount = getDiscountBySlug(company)
  if (!discount) notFound()

  const catInfo = DISCOUNT_CATEGORIES.find((c) => c.slug === discount.category)
  const related = getDiscountsByCategory(discount.category)
    .filter((d) => d.slug !== discount.slug)
    .slice(0, 6)

  const breadcrumbs = [
    { name: 'Home', url: SITE_URL },
    { name: 'Senior Discounts', url: `${SITE_URL}/senior-discounts` },
    { name: discount.company },
  ]

  const claimSteps = discount.howToClaim
    .split('\n')
    .map((s) => s.replace(/^\d+\.\s*/, '').trim())
    .filter(Boolean)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd(breadcrumbs)),
        }}
      />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Senior Discounts', href: '/senior-discounts' },
            { label: discount.company },
          ]}
        />

        {/* Header with Discount Value */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-start gap-4 mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">{catInfo?.icon}</span>
                <Link
                  href={`/senior-discounts/category/${discount.category}`}
                  className="text-sm font-medium text-brand-blue hover:underline"
                >
                  {catInfo?.label ?? discount.category}
                </Link>
              </div>
              <h1
                className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl font-bold mb-2"
                style={{ color: 'var(--text-primary)' }}
              >
                {discount.company} Senior Discount
              </h1>
              <p
                className="text-lg"
                style={{ color: 'var(--text-secondary)' }}
              >
                {discount.discount}
              </p>
            </div>

            {/* Large Discount Badge */}
            <div className="shrink-0 rounded-2xl bg-green-50 border-2 border-green-200 p-6 text-center min-w-[140px]">
              <p className="text-3xl md:text-4xl font-bold text-green-700 leading-tight">
                {discount.discountValue}
              </p>
              <p className="text-sm text-green-600 font-medium mt-1">
                {discount.discountType === 'percentage'
                  ? 'OFF'
                  : discount.discountType === 'fixed-amount'
                    ? 'SAVINGS'
                    : discount.discountType === 'free-upgrade'
                      ? ''
                      : discount.discountType === 'bogo'
                        ? 'DEAL'
                        : 'PLAN'}
              </p>
            </div>
          </div>
        </div>

        {/* Eligibility Card */}
        <div
          className="rounded-xl border p-6 mb-8"
          style={{
            backgroundColor: 'var(--bg-tertiary)',
            borderColor: 'var(--border-color)',
          }}
        >
          <h2
            className="font-[family-name:var(--font-heading)] text-xl font-bold mb-4"
            style={{ color: 'var(--text-primary)' }}
          >
            Who Qualifies?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div
              className="rounded-lg border p-4"
              style={{
                backgroundColor: 'var(--bg-primary)',
                borderColor: 'var(--border-color)',
              }}
            >
              <p className="text-sm font-medium mb-1" style={{ color: 'var(--text-muted)' }}>
                Minimum Age
              </p>
              <p
                className="text-2xl font-bold"
                style={{ color: 'var(--text-primary)' }}
              >
                {discount.eligibilityAge}+
              </p>
            </div>
            <div
              className="rounded-lg border p-4"
              style={{
                backgroundColor: 'var(--bg-primary)',
                borderColor: 'var(--border-color)',
              }}
            >
              <p className="text-sm font-medium mb-1" style={{ color: 'var(--text-muted)' }}>
                AARP Required?
              </p>
              <p
                className="text-2xl font-bold"
                style={{ color: discount.aarpRequired ? '#dc2626' : '#16a34a' }}
              >
                {discount.aarpRequired ? 'Yes' : 'No'}
              </p>
            </div>
            <div
              className="rounded-lg border p-4"
              style={{
                backgroundColor: 'var(--bg-primary)',
                borderColor: 'var(--border-color)',
              }}
            >
              <p className="text-sm font-medium mb-1" style={{ color: 'var(--text-muted)' }}>
                Verification
              </p>
              <p
                className="text-sm font-medium"
                style={{ color: 'var(--text-primary)' }}
              >
                {discount.verificationMethod}
              </p>
            </div>
          </div>
        </div>

        {/* About This Discount */}
        <div className="mb-8">
          <h2
            className="font-[family-name:var(--font-heading)] text-xl font-bold mb-3"
            style={{ color: 'var(--text-primary)' }}
          >
            About This Discount
          </h2>
          <p
            className="text-base leading-relaxed"
            style={{ color: 'var(--text-secondary)' }}
          >
            {discount.details}
          </p>
        </div>

        {/* How to Claim — Step by Step */}
        <div
          className="rounded-xl border p-6 mb-8"
          style={{
            backgroundColor: 'var(--bg-primary)',
            borderColor: 'var(--border-color)',
          }}
        >
          <h2
            className="font-[family-name:var(--font-heading)] text-xl font-bold mb-5"
            style={{ color: 'var(--text-primary)' }}
          >
            How to Claim This Discount
          </h2>
          <ol className="space-y-4">
            {claimSteps.map((step, i) => (
              <li key={i} className="flex gap-4">
                <span className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-brand-blue text-white text-sm font-bold">
                  {i + 1}
                </span>
                <p
                  className="text-base pt-1"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {step}
                </p>
              </li>
            ))}
          </ol>
        </div>

        {/* Last Verified */}
        <div
          className="flex items-center gap-2 mb-10 text-sm"
          style={{ color: 'var(--text-muted)' }}
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>
            Last verified:{' '}
            {new Date(discount.lastVerified).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </span>
        </div>

        {/* Related Discounts */}
        {related.length > 0 && (
          <section>
            <h2
              className="font-[family-name:var(--font-heading)] text-2xl font-bold mb-5"
              style={{ color: 'var(--text-primary)' }}
            >
              More {catInfo?.label ?? discount.category} Discounts
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {related.map((d) => (
                <Link
                  key={d.slug}
                  href={`/senior-discounts/${d.slug}`}
                  className="group rounded-xl border p-4 transition-all hover:shadow-md hover:-translate-y-0.5"
                  style={{
                    backgroundColor: 'var(--bg-primary)',
                    borderColor: 'var(--border-color)',
                  }}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3
                      className="font-[family-name:var(--font-heading)] text-base font-bold group-hover:text-brand-blue transition-colors"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {d.company}
                    </h3>
                    <span className="shrink-0 ml-2 text-xs font-bold text-green-700 bg-green-100 px-2 py-0.5 rounded">
                      {d.discountValue}
                    </span>
                  </div>
                  <p
                    className="text-sm line-clamp-2"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {d.discount}
                  </p>
                </Link>
              ))}
            </div>
            <div className="mt-6 text-center">
              <Link
                href={`/senior-discounts/category/${discount.category}`}
                className="text-brand-blue hover:underline font-medium"
              >
                View all {catInfo?.label?.toLowerCase()} discounts &rarr;
              </Link>
            </div>
          </section>
        )}
      </div>
    </>
  )
}

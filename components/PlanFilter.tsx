'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import type { PhonePlan } from '@/lib/phone-plans-data'

const PRICE_RANGES = [
  { label: 'All Prices', min: 0, max: 999 },
  { label: 'Under $20/mo', min: 0, max: 20 },
  { label: '$20–$35/mo', min: 20, max: 35 },
  { label: '$35–$50/mo', min: 35, max: 50 },
  { label: '$50+/mo', min: 50, max: 999 },
]

const DATA_OPTIONS = [
  { label: 'Any Amount', value: 'any' },
  { label: 'No Data Needed', value: 'none' },
  { label: '1–5 GB', value: 'light' },
  { label: '5–15 GB', value: 'moderate' },
  { label: '15+ GB', value: 'heavy' },
  { label: 'Unlimited', value: 'unlimited' },
]

const SORT_OPTIONS = [
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Data: Most First', value: 'data-desc' },
]

function dataExplainer(dataNum: number, data: string): string {
  if (dataNum === -1) return 'Browse, stream, and video-call as much as you want'
  if (dataNum === 0) return 'Calls and texts only — no internet browsing'
  if (dataNum <= 1) return 'Enough for about 20 emails and light browsing per day'
  if (dataNum <= 5) return 'Enough for daily email, social media, maps, and some photos'
  if (dataNum <= 10) return 'Good for video calls, music streaming, and regular browsing'
  if (dataNum <= 20) return 'Plenty for watching videos, video calls, and heavy browsing'
  return `${data} of data — enough for most daily activities`
}

export default function PlanFilter({ plans }: { plans: PhonePlan[] }) {
  const [priceRange, setPriceRange] = useState(0)
  const [dataOption, setDataOption] = useState('any')
  const [seniorOnly, setSeniorOnly] = useState(false)
  const [sortBy, setSortBy] = useState('price-asc')

  const filtered = useMemo(() => {
    let result = [...plans]

    // Price filter
    const range = PRICE_RANGES[priceRange]
    result = result.filter((p) => p.priceNum >= range.min && p.priceNum <= range.max)

    // Data filter
    if (dataOption === 'none') result = result.filter((p) => p.dataNum === 0)
    else if (dataOption === 'light') result = result.filter((p) => p.dataNum >= 1 && p.dataNum <= 5)
    else if (dataOption === 'moderate') result = result.filter((p) => p.dataNum > 5 && p.dataNum <= 15)
    else if (dataOption === 'heavy') result = result.filter((p) => p.dataNum > 15 && p.dataNum !== -1)
    else if (dataOption === 'unlimited') result = result.filter((p) => p.dataNum === -1)

    // Senior toggle
    if (seniorOnly) result = result.filter((p) => p.seniorSpecific)

    // Sort
    if (sortBy === 'price-asc') result.sort((a, b) => a.priceNum - b.priceNum)
    else if (sortBy === 'price-desc') result.sort((a, b) => b.priceNum - a.priceNum)
    else if (sortBy === 'data-desc') result.sort((a, b) => (b.dataNum === -1 ? 999 : b.dataNum) - (a.dataNum === -1 ? 999 : a.dataNum))

    return result
  }, [plans, priceRange, dataOption, seniorOnly, sortBy])

  return (
    <div>
      {/* Filter Controls */}
      <div
        className="rounded-xl p-4 sm:p-6 mb-8 border"
        style={{
          backgroundColor: 'var(--bg-tertiary)',
          borderColor: 'var(--border-color)',
        }}
      >
        <h2
          className="text-lg font-semibold mb-4 font-[family-name:var(--font-heading)]"
          style={{ color: 'var(--text-primary)' }}
        >
          Filter Plans to Find Your Match
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Price Range */}
          <div>
            <label
              className="block text-sm font-medium mb-1"
              style={{ color: 'var(--text-secondary)' }}
            >
              Monthly Budget
            </label>
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              className="w-full rounded-lg px-3 py-2 border text-sm"
              style={{
                backgroundColor: 'var(--bg-primary)',
                borderColor: 'var(--border-color)',
                color: 'var(--text-primary)',
              }}
            >
              {PRICE_RANGES.map((r, i) => (
                <option key={i} value={i}>
                  {r.label}
                </option>
              ))}
            </select>
          </div>

          {/* Data Amount */}
          <div>
            <label
              className="block text-sm font-medium mb-1"
              style={{ color: 'var(--text-secondary)' }}
            >
              How Much Internet Do You Need?
            </label>
            <select
              value={dataOption}
              onChange={(e) => setDataOption(e.target.value)}
              className="w-full rounded-lg px-3 py-2 border text-sm"
              style={{
                backgroundColor: 'var(--bg-primary)',
                borderColor: 'var(--border-color)',
                color: 'var(--text-primary)',
              }}
            >
              {DATA_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>

          {/* Sort */}
          <div>
            <label
              className="block text-sm font-medium mb-1"
              style={{ color: 'var(--text-secondary)' }}
            >
              Sort By
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full rounded-lg px-3 py-2 border text-sm"
              style={{
                backgroundColor: 'var(--bg-primary)',
                borderColor: 'var(--border-color)',
                color: 'var(--text-primary)',
              }}
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>

          {/* Senior Toggle */}
          <div className="flex items-end">
            <label className="flex items-center gap-2 cursor-pointer py-2">
              <input
                type="checkbox"
                checked={seniorOnly}
                onChange={(e) => setSeniorOnly(e.target.checked)}
                className="w-5 h-5 rounded border-2 accent-blue-700"
              />
              <span
                className="text-sm font-medium"
                style={{ color: 'var(--text-primary)' }}
              >
                Show only 55+ / senior plans
              </span>
            </label>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <p
        className="mb-4 text-sm font-medium"
        style={{ color: 'var(--text-muted)' }}
      >
        Showing {filtered.length} plan{filtered.length !== 1 ? 's' : ''}
      </p>

      {/* Plan Cards */}
      {filtered.length === 0 ? (
        <div
          className="text-center py-12 rounded-xl border"
          style={{
            backgroundColor: 'var(--bg-tertiary)',
            borderColor: 'var(--border-color)',
          }}
        >
          <p
            className="text-lg font-medium"
            style={{ color: 'var(--text-primary)' }}
          >
            No plans match your filters.
          </p>
          <p className="text-sm mt-2" style={{ color: 'var(--text-muted)' }}>
            Try adjusting your budget or data needs above.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filtered.map((plan) => (
            <div
              key={plan.slug}
              className="rounded-xl border p-5 flex flex-col transition-shadow hover:shadow-lg"
              style={{
                backgroundColor: 'var(--bg-primary)',
                borderColor: 'var(--border-color)',
              }}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p
                    className="text-sm font-medium"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {plan.carrier}
                  </p>
                  <h3
                    className="text-lg font-bold font-[family-name:var(--font-heading)]"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {plan.planName}
                  </h3>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-brand-blue">
                    {plan.price.split('/')[0]}
                  </p>
                  <p
                    className="text-xs"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    /{plan.price.split('/').slice(1).join('/')}
                  </p>
                </div>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-3">
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
                {plan.hearingAidCompatible && (
                  <span className="inline-block text-xs font-semibold px-2 py-1 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300">
                    Hearing-Aid OK
                  </span>
                )}
              </div>

              {/* Key Details */}
              <div
                className="space-y-2 text-sm mb-4 flex-1"
                style={{ color: 'var(--text-secondary)' }}
              >
                <div className="flex justify-between">
                  <span>Data:</span>
                  <span className="font-medium" style={{ color: 'var(--text-primary)' }}>
                    {plan.data}
                  </span>
                </div>
                <p
                  className="text-xs italic"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {dataExplainer(plan.dataNum, plan.data)}
                </p>
                <div className="flex justify-between">
                  <span>Calls & Texts:</span>
                  <span className="font-medium" style={{ color: 'var(--text-primary)' }}>
                    {plan.talkText}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Network:</span>
                  <span className="font-medium" style={{ color: 'var(--text-primary)' }}>
                    {plan.network}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Hotspot:</span>
                  <span className="font-medium" style={{ color: 'var(--text-primary)' }}>
                    {plan.hotspot}
                  </span>
                </div>
              </div>

              {/* Best For */}
              <div
                className="rounded-lg p-3 mb-3 text-sm"
                style={{ backgroundColor: 'var(--bg-tertiary)' }}
              >
                <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                  Best for:{' '}
                </span>
                <span style={{ color: 'var(--text-secondary)' }}>{plan.bestFor}</span>
              </div>

              {/* Link to carrier page */}
              <Link
                href={`/phone-plans/${plan.carrierSlug}`}
                className="text-sm font-medium text-brand-blue hover:underline mt-auto"
              >
                See all {plan.carrier} plans &rarr;
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

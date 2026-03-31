'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import type { Discount, DiscountCategory } from '@/lib/discounts-data'
import { DISCOUNT_CATEGORIES } from '@/lib/discounts-data'

interface DiscountSearchProps {
  discounts: Discount[]
}

export default function DiscountSearch({ discounts }: DiscountSearchProps) {
  const [query, setQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedAge, setSelectedAge] = useState<number>(0)
  const [aarpOnly, setAarpOnly] = useState(false)

  const filtered = useMemo(() => {
    return discounts.filter((d) => {
      if (query && !d.company.toLowerCase().includes(query.toLowerCase()) && !d.discount.toLowerCase().includes(query.toLowerCase())) {
        return false
      }
      if (selectedCategory !== 'all' && d.category !== selectedCategory) {
        return false
      }
      if (selectedAge > 0 && d.eligibilityAge > selectedAge) {
        return false
      }
      if (aarpOnly && !d.aarpRequired) {
        return false
      }
      return true
    })
  }, [discounts, query, selectedCategory, selectedAge, aarpOnly])

  const categoryLabel = (slug: string) =>
    DISCOUNT_CATEGORIES.find((c) => c.slug === slug)?.label ?? slug

  return (
    <div>
      {/* Search and Filters */}
      <div
        className="rounded-2xl p-6 mb-8 border"
        style={{
          backgroundColor: 'var(--bg-tertiary)',
          borderColor: 'var(--border-color)',
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          {/* Search */}
          <div className="lg:col-span-2">
            <label
              htmlFor="discount-search"
              className="block text-sm font-medium mb-1"
              style={{ color: 'var(--text-secondary)' }}
            >
              Search by company name
            </label>
            <input
              id="discount-search"
              type="text"
              placeholder="e.g. T-Mobile, Kroger, Amtrak..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
              style={{
                backgroundColor: 'var(--bg-primary)',
                borderColor: 'var(--border-color)',
                color: 'var(--text-primary)',
              }}
            />
          </div>

          {/* Category Filter */}
          <div>
            <label
              htmlFor="category-filter"
              className="block text-sm font-medium mb-1"
              style={{ color: 'var(--text-secondary)' }}
            >
              Category
            </label>
            <select
              id="category-filter"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
              style={{
                backgroundColor: 'var(--bg-primary)',
                borderColor: 'var(--border-color)',
                color: 'var(--text-primary)',
              }}
            >
              <option value="all">All Categories</option>
              {DISCOUNT_CATEGORIES.map((cat) => (
                <option key={cat.slug} value={cat.slug}>
                  {cat.icon} {cat.label} ({cat.count})
                </option>
              ))}
            </select>
          </div>

          {/* Age Filter */}
          <div>
            <label
              htmlFor="age-filter"
              className="block text-sm font-medium mb-1"
              style={{ color: 'var(--text-secondary)' }}
            >
              Your age
            </label>
            <select
              id="age-filter"
              value={selectedAge}
              onChange={(e) => setSelectedAge(Number(e.target.value))}
              className="w-full rounded-lg border px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
              style={{
                backgroundColor: 'var(--bg-primary)',
                borderColor: 'var(--border-color)',
                color: 'var(--text-primary)',
              }}
            >
              <option value={0}>Any age</option>
              <option value={50}>50+</option>
              <option value={55}>55+</option>
              <option value={60}>60+</option>
              <option value={62}>62+</option>
              <option value={65}>65+</option>
            </select>
          </div>
        </div>

        {/* AARP Toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setAarpOnly(!aarpOnly)}
            className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${
              aarpOnly ? 'bg-brand-blue' : 'bg-gray-300'
            }`}
            role="switch"
            aria-checked={aarpOnly}
            aria-label="Show only AARP discounts"
          >
            <span
              className={`inline-block h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${
                aarpOnly ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
          <span
            className="text-sm font-medium"
            style={{ color: 'var(--text-secondary)' }}
          >
            AARP discounts only
          </span>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between mb-6">
        <p
          className="text-lg font-medium"
          style={{ color: 'var(--text-primary)' }}
        >
          {filtered.length === discounts.length
            ? `Showing all ${filtered.length} discounts`
            : `${filtered.length} discount${filtered.length !== 1 ? 's' : ''} found`}
        </p>
        {(query || selectedCategory !== 'all' || selectedAge > 0 || aarpOnly) && (
          <button
            onClick={() => {
              setQuery('')
              setSelectedCategory('all')
              setSelectedAge(0)
              setAarpOnly(false)
            }}
            className="text-sm text-brand-blue hover:underline font-medium"
          >
            Clear all filters
          </button>
        )}
      </div>

      {/* Results Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((d) => (
            <Link
              key={d.slug}
              href={`/senior-discounts/${d.slug}`}
              className="group rounded-xl border p-5 transition-all hover:shadow-lg hover:-translate-y-0.5"
              style={{
                backgroundColor: 'var(--bg-primary)',
                borderColor: 'var(--border-color)',
              }}
            >
              {/* Discount Value Badge */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1 min-w-0 mr-3">
                  <h3
                    className="font-[family-name:var(--font-heading)] text-lg font-bold group-hover:text-brand-blue transition-colors truncate"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {d.company}
                  </h3>
                  <span
                    className="text-xs font-medium"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {categoryLabel(d.category)}
                  </span>
                </div>
                <span className="shrink-0 inline-flex items-center rounded-lg bg-green-100 text-green-800 px-3 py-1.5 text-sm font-bold whitespace-nowrap">
                  {d.discountValue}
                </span>
              </div>

              {/* Discount Description */}
              <p
                className="text-sm mb-3 line-clamp-2"
                style={{ color: 'var(--text-secondary)' }}
              >
                {d.discount}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                <span
                  className="inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium"
                  style={{
                    backgroundColor: 'var(--bg-tertiary)',
                    color: 'var(--text-muted)',
                  }}
                >
                  Age {d.eligibilityAge}+
                </span>
                {d.aarpRequired && (
                  <span className="inline-flex items-center rounded-md bg-red-100 text-red-700 px-2 py-0.5 text-xs font-medium">
                    AARP Required
                  </span>
                )}
                {d.popular && (
                  <span className="inline-flex items-center rounded-md bg-yellow-100 text-yellow-800 px-2 py-0.5 text-xs font-medium">
                    Popular
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div
          className="text-center py-16 rounded-xl border"
          style={{
            backgroundColor: 'var(--bg-tertiary)',
            borderColor: 'var(--border-color)',
          }}
        >
          <p
            className="text-xl font-medium mb-2"
            style={{ color: 'var(--text-primary)' }}
          >
            No discounts match your filters
          </p>
          <p style={{ color: 'var(--text-muted)' }}>
            Try broadening your search or clearing some filters.
          </p>
        </div>
      )}
    </div>
  )
}

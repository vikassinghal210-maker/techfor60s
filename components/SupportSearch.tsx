'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import type { SupportEntry } from '@/lib/support-data'

interface SupportSearchProps {
  companies: SupportEntry[]
}

export default function SupportSearch({ companies }: SupportSearchProps) {
  const [query, setQuery] = useState('')

  const results = useMemo(() => {
    if (!query.trim()) return []
    const q = query.toLowerCase().trim()
    return companies
      .filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.category.toLowerCase().replace(/-/g, ' ').includes(q) ||
          c.description.toLowerCase().includes(q)
      )
      .slice(0, 12)
  }, [query, companies])

  return (
    <div className="w-full max-w-2xl mx-auto">
      <label htmlFor="support-search" className="sr-only">
        Search for a company
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <svg
            className="w-6 h-6 text-[var(--text-muted)]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <input
          id="support-search"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Type a company name (e.g., Apple, Netflix, Verizon)..."
          className="w-full pl-13 pr-4 py-4 text-lg rounded-xl border-2 border-[var(--border-color)] bg-[var(--bg-primary)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 transition-colors"
          style={{ paddingLeft: '3.25rem' }}
          autoComplete="off"
        />
      </div>

      {/* Search Results */}
      {query.trim() && (
        <div className="mt-4 space-y-3">
          {results.length === 0 ? (
            <p className="text-center py-6 text-[var(--text-muted)] text-lg">
              No companies found for &quot;{query}&quot;. Try a different search.
            </p>
          ) : (
            results.map((company) => (
              <div
                key={company.slug}
                className="flex items-center justify-between gap-4 p-4 rounded-xl border border-[var(--border-color)] bg-[var(--bg-primary)] hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span
                    className="flex-shrink-0 w-11 h-11 rounded-full bg-brand-blue text-white flex items-center justify-center text-lg font-bold"
                    aria-hidden="true"
                  >
                    {company.logo}
                  </span>
                  <div className="min-w-0">
                    <Link
                      href={`/tech-support/${company.slug}`}
                      className="text-[var(--text-primary)] font-semibold hover:text-brand-blue transition-colors text-lg no-underline block truncate"
                    >
                      {company.name}
                    </Link>
                    <p className="text-sm text-[var(--text-muted)] truncate">
                      {company.hours}
                    </p>
                  </div>
                </div>
                <div className="flex-shrink-0">
                  {company.phoneNumber ? (
                    <a
                      href={`tel:${company.phoneNumber.replace(/[^+\d]/g, '')}`}
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-blue text-white rounded-lg font-bold text-base hover:bg-blue-800 transition-colors no-underline whitespace-nowrap"
                      aria-label={`Call ${company.name} at ${company.phoneNumber}`}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      {company.phoneNumber}
                    </a>
                  ) : (
                    <Link
                      href={`/tech-support/${company.slug}`}
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--bg-tertiary)] text-[var(--text-primary)] rounded-lg font-semibold text-base hover:bg-brand-blue hover:text-white transition-colors no-underline whitespace-nowrap"
                    >
                      Get Help
                    </Link>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}

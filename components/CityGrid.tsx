'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { CityData } from '@/lib/cities-data'

export default function CityGrid({
  usCities,
  ukCities,
}: {
  usCities: CityData[]
  ukCities: CityData[]
}) {
  const [search, setSearch] = useState('')

  const query = search.toLowerCase().trim()
  const filteredUS = usCities.filter(
    (c) =>
      c.name.toLowerCase().includes(query) ||
      c.region.toLowerCase().includes(query)
  )
  const filteredUK = ukCities.filter(
    (c) =>
      c.name.toLowerCase().includes(query) ||
      c.region.toLowerCase().includes(query)
  )

  return (
    <>
      {/* Search */}
      <div className="mb-8">
        <label htmlFor="city-search" className="sr-only">
          Search for a city
        </label>
        <input
          id="city-search"
          type="text"
          placeholder="Search for a city..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md px-4 py-3 rounded-lg border text-base outline-none transition-colors focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20"
          style={{
            backgroundColor: 'var(--bg-primary)',
            borderColor: 'var(--border-color)',
            color: 'var(--text-primary)',
          }}
        />
      </div>

      {/* US Cities */}
      {filteredUS.length > 0 && (
        <section className="mb-10">
          <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-5" style={{ color: 'var(--text-primary)' }}>
            United States ({filteredUS.length} {filteredUS.length === 1 ? 'city' : 'cities'})
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredUS.map((city) => (
              <Link
                key={city.slug}
                href={`/tools/tech-classes/${city.slug}`}
                className="group rounded-xl p-5 border transition-all hover:shadow-md hover:border-brand-blue"
                style={{
                  backgroundColor: 'var(--bg-primary)',
                  borderColor: 'var(--border-color)',
                }}
              >
                <h3 className="text-lg font-semibold group-hover:text-brand-blue transition-colors" style={{ color: 'var(--text-primary)' }}>
                  {city.name}
                </h3>
                <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
                  {city.region}
                </p>
                <p className="text-sm mt-2" style={{ color: 'var(--text-secondary)' }}>
                  {city.resources.length} programs &middot; {city.libraries.length} library systems
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* UK Cities */}
      {filteredUK.length > 0 && (
        <section className="mb-10">
          <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-5" style={{ color: 'var(--text-primary)' }}>
            United Kingdom ({filteredUK.length} {filteredUK.length === 1 ? 'city' : 'cities'})
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredUK.map((city) => (
              <Link
                key={city.slug}
                href={`/tools/tech-classes/${city.slug}`}
                className="group rounded-xl p-5 border transition-all hover:shadow-md hover:border-brand-blue"
                style={{
                  backgroundColor: 'var(--bg-primary)',
                  borderColor: 'var(--border-color)',
                }}
              >
                <h3 className="text-lg font-semibold group-hover:text-brand-blue transition-colors" style={{ color: 'var(--text-primary)' }}>
                  {city.name}
                </h3>
                <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
                  {city.region}
                </p>
                <p className="text-sm mt-2" style={{ color: 'var(--text-secondary)' }}>
                  {city.resources.length} programs &middot; {city.libraries.length} library systems
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* No Results */}
      {filteredUS.length === 0 && filteredUK.length === 0 && (
        <div className="text-center py-12">
          <p className="text-lg" style={{ color: 'var(--text-muted)' }}>
            No cities found matching &quot;{search}&quot;. Try a different search term.
          </p>
        </div>
      )}
    </>
  )
}

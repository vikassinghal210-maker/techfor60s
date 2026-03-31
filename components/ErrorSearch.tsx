'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { Search, X, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import type { ErrorEntry } from '@/lib/errors-data'

const DEVICE_ICONS: Record<string, string> = {
  iphone: '📱',
  android: '🤖',
  windows: '💻',
  mac: '🍎',
  browser: '🌐',
  wifi: '📶',
  app: '📲',
}

const SEVERITY_COLORS: Record<string, string> = {
  low: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  medium: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
  high: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
}

interface ErrorSearchProps {
  allErrors: ErrorEntry[]
}

export default function ErrorSearch({ allErrors }: ErrorSearchProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<ErrorEntry[]>([])
  const [isFocused, setIsFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const doSearch = useCallback(
    (q: string) => {
      if (!q.trim()) {
        setResults([])
        return
      }
      const lower = q.toLowerCase().trim()
      const words = lower.split(/\s+/)

      const scored = allErrors.map((error) => {
        let score = 0
        const errorTextLower = error.errorText.toLowerCase()
        const meaningLower = error.plainMeaning.toLowerCase()

        if (errorTextLower === lower) score += 100
        else if (errorTextLower.includes(lower)) score += 60

        for (const term of error.searchTerms) {
          const termLower = term.toLowerCase()
          if (termLower === lower) score += 80
          else if (termLower.includes(lower)) score += 40
          else {
            for (const word of words) {
              if (word.length >= 3 && termLower.includes(word)) score += 15
            }
          }
        }

        for (const word of words) {
          if (word.length >= 3 && errorTextLower.includes(word)) score += 20
          if (word.length >= 3 && meaningLower.includes(word)) score += 5
        }

        if (error.device.includes(lower) || lower.includes(error.device)) score += 10

        for (const cause of error.commonCauses) {
          for (const word of words) {
            if (word.length >= 3 && cause.toLowerCase().includes(word)) score += 3
          }
        }

        return { error, score }
      })

      const filtered = scored
        .filter((r) => r.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, 8)
        .map((r) => r.error)

      setResults(filtered)
    },
    [allErrors]
  )

  useEffect(() => {
    const timeout = setTimeout(() => doSearch(query), 150)
    return () => clearTimeout(timeout)
  }, [query, doSearch])

  return (
    <div className="w-full max-w-2xl mx-auto relative">
      <div
        className={`flex items-center gap-3 bg-white dark:bg-[var(--bg-tertiary)] rounded-2xl border-2 px-5 py-4 transition-colors ${
          isFocused
            ? 'border-brand-blue shadow-lg shadow-blue-500/10'
            : 'border-[var(--border-color)]'
        }`}
      >
        <Search className="w-6 h-6 text-[var(--text-muted)] shrink-0" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          placeholder="Type or paste your error message..."
          className="flex-1 bg-transparent text-lg text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none"
          aria-label="Search for error messages"
        />
        {query && (
          <button
            onClick={() => {
              setQuery('')
              setResults([])
              inputRef.current?.focus()
            }}
            className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Clear search"
          >
            <X className="w-5 h-5 text-[var(--text-muted)]" />
          </button>
        )}
      </div>

      {/* Results dropdown */}
      {query.trim() && isFocused && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-[var(--bg-tertiary)] rounded-xl border border-[var(--border-color)] shadow-xl z-50 max-h-[28rem] overflow-y-auto">
          {results.length > 0 ? (
            <ul className="divide-y divide-[var(--border-color)]">
              {results.map((error) => (
                <li key={error.slug}>
                  <Link
                    href={`/error-lookup/${error.slug}`}
                    className="flex items-start gap-3 px-5 py-4 hover:bg-[var(--bg-primary)] transition-colors no-underline"
                  >
                    <span className="text-2xl mt-0.5" aria-hidden="true">
                      {DEVICE_ICONS[error.device] ?? '❓'}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-[var(--text-primary)] truncate">
                        {error.errorText}
                      </p>
                      <p className="text-sm text-[var(--text-secondary)] line-clamp-2 mt-0.5">
                        {error.plainMeaning}
                      </p>
                    </div>
                    <span
                      className={`text-xs font-medium px-2 py-0.5 rounded-full shrink-0 mt-1 ${SEVERITY_COLORS[error.severity]}`}
                    >
                      {error.severity}
                    </span>
                    <ChevronRight className="w-4 h-4 text-[var(--text-muted)] shrink-0 mt-1.5" />
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="px-5 py-8 text-center">
              <p className="text-[var(--text-secondary)] font-medium">
                No matching errors found for &ldquo;{query}&rdquo;
              </p>
              <p className="text-sm text-[var(--text-muted)] mt-2">
                Try different words, or browse by device type below. You can also
                describe the problem in plain English.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

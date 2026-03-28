'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { Search, X } from 'lucide-react'
import Link from 'next/link'
import Fuse from 'fuse.js'
import type { SearchResult } from '@/lib/search'
import { getCategoryInfo } from '@/lib/utils'

interface SearchModalProps {
  searchData: SearchResult[]
  isOpen: boolean
  onClose: () => void
}

export default function SearchModal({ searchData, isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const fuseRef = useRef<Fuse<SearchResult> | null>(null)

  useEffect(() => {
    fuseRef.current = new Fuse(searchData, {
      keys: [
        { name: 'title', weight: 2 },
        { name: 'excerpt', weight: 1 },
        { name: 'category', weight: 0.5 },
      ],
      threshold: 0.4,
      minMatchCharLength: 2,
    })
  }, [searchData])

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus()
      setQuery('')
      setResults([])
      setSelectedIndex(0)
    }
  }, [isOpen])

  useEffect(() => {
    if (!query.trim()) {
      setResults(searchData.slice(0, 6))
      return
    }
    if (fuseRef.current) {
      const found = fuseRef.current.search(query).slice(0, 8)
      setResults(found.map(r => r.item))
    }
    setSelectedIndex(0)
  }, [query, searchData])

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex(i => Math.min(i + 1, results.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex(i => Math.max(i - 1, 0))
    } else if (e.key === 'Enter' && results[selectedIndex]) {
      onClose()
      window.location.href = `/blog/${results[selectedIndex].slug}`
    } else if (e.key === 'Escape') {
      onClose()
    }
  }, [results, selectedIndex, onClose])

  // Global Ctrl+K / Cmd+K listener
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[8vh] sm:pt-[12vh]">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-lg mx-3 sm:mx-4 bg-[var(--bg-primary)] rounded-2xl shadow-2xl border border-[var(--border-color)] overflow-hidden">
        {/* Search input */}
        <div className="flex items-center gap-3 px-4 sm:px-5 border-b border-[var(--border-color)]">
          <Search className="w-5 h-5 text-brand-blue shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search all guides..."
            className="w-full py-4 text-base sm:text-lg bg-transparent outline-none text-[var(--text-primary)] placeholder:text-[var(--text-muted)]"
          />
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-[var(--bg-tertiary)] transition-colors shrink-0">
            <X className="w-5 h-5 text-[var(--text-muted)]" />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-[55vh] overflow-y-auto p-2">
          {results.length === 0 && query.trim() ? (
            <div className="p-8 text-center">
              <p className="text-[var(--text-muted)] text-base">No guides found for &ldquo;{query}&rdquo;</p>
              <p className="text-[var(--text-muted)] text-sm mt-1">Try different keywords</p>
            </div>
          ) : (
            <div className="space-y-0.5">
              {!query.trim() && (
                <p className="px-3 py-2 text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                  Popular Guides
                </p>
              )}
              {results.map((result, i) => {
                const cat = getCategoryInfo(result.category)
                return (
                  <Link
                    key={result.slug}
                    href={`/blog/${result.slug}`}
                    onClick={onClose}
                    className={`block px-3 py-3 rounded-xl no-underline transition-colors ${
                      i === selectedIndex
                        ? 'bg-brand-blue/10 dark:bg-brand-blue/20'
                        : 'hover:bg-gray-50 dark:hover:bg-gray-800/50'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full text-white ${cat.color}`}>
                        {cat.label}
                      </span>
                      {result.difficulty && (
                        <span className="text-[10px] text-[var(--text-muted)]">{result.difficulty}</span>
                      )}
                    </div>
                    <h3 className="font-semibold text-[var(--text-primary)] text-sm">{result.title}</h3>
                    <p className="text-xs text-[var(--text-muted)] line-clamp-1 mt-0.5">{result.excerpt}</p>
                  </Link>
                )
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-4 py-2 border-t border-[var(--border-color)] text-xs text-[var(--text-muted)]">
          <span>Use arrow keys to navigate</span>
          <span><kbd className="px-1.5 py-0.5 rounded border border-[var(--border-color)] font-mono text-[10px]">ESC</kbd> to close</span>
        </div>
      </div>
    </div>
  )
}

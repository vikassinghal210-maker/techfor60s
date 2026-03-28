'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Menu, X, Search } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import FontSizeToggle from './FontSizeToggle'
import DarkModeToggle from './DarkModeToggle'
import SearchModal from './SearchModal'
import type { SearchResult } from '@/lib/search'

const NAV_LINKS = [
  { href: '/blog', label: 'All Guides' },
  { href: '/category/how-to-guides', label: 'How-To' },
  { href: '/category/product-reviews', label: 'Reviews' },
  { href: '/category/safety-security', label: 'Safety' },
  { href: '/about', label: 'About' },
]

interface HeaderProps {
  searchData?: SearchResult[]
}

export default function Header({ searchData = [] }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setSearchOpen(true)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  return (
    <>
      <header
        className={`sticky top-0 z-50 border-b transition-all duration-300 ${
          scrolled
            ? 'border-[var(--border-color)] shadow-sm'
            : 'border-transparent'
        }`}
        style={{ backgroundColor: 'var(--header-bg)', backdropFilter: 'blur(12px)' }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link
              href="/"
              className="text-xl font-bold no-underline text-[var(--text-primary)] font-[family-name:var(--font-heading)]"
            >
              Tech<span className="text-brand-blue">For60s</span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-1 no-underline">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-3 py-2 rounded-lg text-[var(--text-secondary)] hover:text-brand-blue hover:bg-brand-blue/5 font-medium no-underline transition-all text-sm"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Desktop actions */}
            <div className="hidden md:flex items-center gap-1">
              <button
                onClick={() => setSearchOpen(true)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[var(--border-color)] text-[var(--text-muted)] hover:border-brand-blue/30 hover:text-brand-blue transition-all text-sm"
              >
                <Search className="w-4 h-4" />
                <span className="hidden lg:inline">Search</span>
                <kbd className="hidden lg:inline text-[10px] px-1.5 py-0.5 rounded border border-[var(--border-color)] font-mono">
                  Ctrl K
                </kbd>
              </button>
              <FontSizeToggle />
              <DarkModeToggle />
            </div>

            {/* Mobile actions */}
            <div className="flex items-center gap-1 md:hidden">
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/10"
                aria-label="Search"
              >
                <Search className="w-5 h-5 text-[var(--text-secondary)]" />
              </button>
              <FontSizeToggle />
              <DarkModeToggle />
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 text-[var(--text-secondary)]"
                aria-label="Toggle menu"
              >
                {menuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>

          {/* Mobile nav */}
          <AnimatePresence>
            {menuOpen && (
              <motion.nav
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="md:hidden overflow-hidden"
              >
                <div className="pb-4 pt-2 border-t border-[var(--border-color)] no-underline">
                  {NAV_LINKS.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="block py-3 text-lg text-[var(--text-secondary)] hover:text-brand-blue font-medium no-underline transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </motion.nav>
            )}
          </AnimatePresence>
        </div>
      </header>

      <SearchModal
        searchData={searchData}
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
      />
    </>
  )
}

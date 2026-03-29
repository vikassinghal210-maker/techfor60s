'use client'

import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { Menu, X, Search, ChevronDown, Smartphone, FileText, Wifi, MapPin, ShieldAlert, Lock, Accessibility, Printer } from 'lucide-react'
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

const TOOLS_LINKS = [
  { href: '/tools/device-quiz', label: 'Device Quiz', desc: 'Find the right phone or tablet', icon: Smartphone },
  { href: '/tools/iphone-cheat-sheet', label: 'iPhone Cheat Sheet', desc: 'Printable quick reference', icon: FileText },
  { href: '/tools/android-cheat-sheet', label: 'Android Cheat Sheet', desc: 'Printable quick reference', icon: FileText },
  { href: '/tools/internet-by-state', label: 'Internet by State', desc: 'Compare plans in your state', icon: Wifi },
  { href: '/tools/tech-classes', label: 'Tech Classes Near You', desc: 'Free classes in 30 cities', icon: MapPin },
  { href: '/tools/scam-checker', label: 'Scam Checker', desc: 'Check if a message is a scam', icon: ShieldAlert },
  { href: '/tools/password-checker', label: 'Password Checker', desc: 'Test and generate passwords', icon: Lock },
  { href: '/accessibility', label: 'Accessibility Guides', desc: 'Settings for vision, hearing & more', icon: Accessibility },
  { href: '/resources', label: 'Printable Guides', desc: 'Print-friendly cheat sheets', icon: Printer },
]

interface HeaderProps {
  searchData?: SearchResult[]
}

export default function Header({ searchData = [] }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [toolsOpen, setToolsOpen] = useState(false)
  const [mobileToolsOpen, setMobileToolsOpen] = useState(false)
  const toolsRef = useRef<HTMLDivElement>(null)

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

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (toolsRef.current && !toolsRef.current.contains(e.target as Node)) {
        setToolsOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
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

              {/* Tools dropdown */}
              <div ref={toolsRef} className="relative">
                <button
                  onClick={() => setToolsOpen(!toolsOpen)}
                  className="flex items-center gap-1 px-3 py-2 rounded-lg text-[var(--text-secondary)] hover:text-brand-blue hover:bg-brand-blue/5 font-medium transition-all text-sm"
                >
                  Tools
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${toolsOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {toolsOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 4 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full mt-1 w-72 bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-xl shadow-xl overflow-hidden z-50"
                    >
                      <div className="p-2">
                        {TOOLS_LINKS.map((tool) => (
                          <Link
                            key={tool.href}
                            href={tool.href}
                            onClick={() => setToolsOpen(false)}
                            className="flex items-start gap-3 px-3 py-2.5 rounded-lg hover:bg-brand-blue/5 no-underline transition-colors group"
                          >
                            <div className="w-8 h-8 rounded-lg bg-brand-blue/10 text-brand-blue flex items-center justify-center shrink-0 mt-0.5">
                              <tool.icon className="w-4 h-4" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-[var(--text-primary)] group-hover:text-brand-blue transition-colors">
                                {tool.label}
                              </p>
                              <p className="text-xs text-[var(--text-muted)] leading-snug">
                                {tool.desc}
                              </p>
                            </div>
                          </Link>
                        ))}
                      </div>
                      <div className="border-t border-[var(--border-color)] px-3 py-2">
                        <Link
                          href="/tools"
                          onClick={() => setToolsOpen(false)}
                          className="text-xs text-brand-blue font-medium no-underline hover:underline"
                        >
                          View all tools &rarr;
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </nav>

            {/* Desktop actions */}
            <div className="hidden md:flex items-center gap-1">
              <button
                onClick={() => setSearchOpen(true)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[var(--bg-tertiary)] text-[var(--text-muted)] hover:text-brand-blue hover:bg-brand-blue/5 transition-all text-sm min-w-[180px]"
              >
                <Search className="w-4 h-4 shrink-0" />
                <span className="flex-1 text-left">Search guides...</span>
                <kbd className="hidden lg:inline text-[10px] px-1.5 py-0.5 rounded bg-[var(--bg-primary)] border border-[var(--border-color)] font-mono text-[var(--text-muted)]">
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

                  {/* Mobile Tools accordion */}
                  <button
                    onClick={() => setMobileToolsOpen(!mobileToolsOpen)}
                    className="flex items-center justify-between w-full py-3 text-lg text-[var(--text-secondary)] hover:text-brand-blue font-medium transition-colors"
                  >
                    Tools
                    <ChevronDown className={`w-4 h-4 transition-transform ${mobileToolsOpen ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {mobileToolsOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        className="overflow-hidden"
                      >
                        <div className="pl-4 pb-2 space-y-1">
                          {TOOLS_LINKS.map((tool) => (
                            <Link
                              key={tool.href}
                              href={tool.href}
                              onClick={() => { setMenuOpen(false); setMobileToolsOpen(false) }}
                              className="flex items-center gap-3 py-2.5 no-underline group"
                            >
                              <div className="w-8 h-8 rounded-lg bg-brand-blue/10 text-brand-blue flex items-center justify-center shrink-0">
                                <tool.icon className="w-4 h-4" />
                              </div>
                              <div>
                                <p className="text-[15px] font-medium text-[var(--text-secondary)] group-hover:text-brand-blue transition-colors">
                                  {tool.label}
                                </p>
                                <p className="text-xs text-[var(--text-muted)]">{tool.desc}</p>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
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

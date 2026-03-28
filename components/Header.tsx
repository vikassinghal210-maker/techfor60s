'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import FontSizeToggle from './FontSizeToggle'

const NAV_LINKS = [
  { href: '/blog', label: 'All Guides' },
  { href: '/category/how-to-guides', label: 'How-To' },
  { href: '/category/product-reviews', label: 'Reviews' },
  { href: '/category/safety-security', label: 'Safety' },
  { href: '/about', label: 'About' },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="text-xl font-bold no-underline text-brand-dark font-[family-name:var(--font-heading)]"
          >
            Tech<span className="text-brand-blue">For60s</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6 no-underline">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-700 hover:text-brand-blue font-medium no-underline transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <FontSizeToggle />
          </nav>

          {/* Mobile menu button */}
          <div className="flex items-center gap-3 md:hidden">
            <FontSizeToggle />
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 text-gray-700"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        {menuOpen && (
          <nav className="md:hidden pb-4 border-t border-gray-100 pt-4 no-underline">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block py-3 text-lg text-gray-700 hover:text-brand-blue font-medium no-underline"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  )
}

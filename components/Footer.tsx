'use client'

import Link from 'next/link'
import { SITE_NAME } from '@/lib/utils'
import { Heart } from 'lucide-react'

export default function Footer() {
  return (
    <footer style={{ backgroundColor: 'var(--footer-bg)' }} className="text-gray-300 mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <p className="text-white text-xl font-bold font-[family-name:var(--font-heading)] mb-3 no-underline">
              Tech<span className="text-blue-400">For60s</span>
            </p>
            <p className="text-sm leading-relaxed text-gray-400 mb-4">
              Simple, jargon-free tech guides written for adults over 60. Learn at your own pace.
            </p>
          </div>

          {/* Guides */}
          <div className="no-underline">
            <h3 className="text-white font-semibold mb-3 text-sm uppercase tracking-wide">Guides</h3>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/blog" className="text-gray-400 hover:text-white transition-colors">All Guides</Link></li>
              <li><Link href="/category/how-to-guides" className="text-gray-400 hover:text-white transition-colors">How-To Guides</Link></li>
              <li><Link href="/category/product-reviews" className="text-gray-400 hover:text-white transition-colors">Product Reviews</Link></li>
              <li><Link href="/category/explainers" className="text-gray-400 hover:text-white transition-colors">Tech Explained</Link></li>
              <li><Link href="/category/safety-security" className="text-gray-400 hover:text-white transition-colors">Safety &amp; Security</Link></li>
              <li><Link href="/category/apps-services" className="text-gray-400 hover:text-white transition-colors">Apps &amp; Services</Link></li>
            </ul>
          </div>

          {/* Tools */}
          <div className="no-underline">
            <h3 className="text-white font-semibold mb-3 text-sm uppercase tracking-wide">Free Tools</h3>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/tools/device-quiz" className="text-gray-400 hover:text-white transition-colors">Device Quiz</Link></li>
              <li><Link href="/tools/iphone-cheat-sheet" className="text-gray-400 hover:text-white transition-colors">iPhone Cheat Sheet</Link></li>
              <li><Link href="/tools/android-cheat-sheet" className="text-gray-400 hover:text-white transition-colors">Android Cheat Sheet</Link></li>
              <li><Link href="/tools/internet-by-state" className="text-gray-400 hover:text-white transition-colors">Internet by State</Link></li>
              <li><Link href="/tools/tech-classes" className="text-gray-400 hover:text-white transition-colors">Tech Classes Near You</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div className="no-underline">
            <h3 className="text-white font-semibold mb-3 text-sm uppercase tracking-wide">Company</h3>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
              <li><Link href="/privacy-policy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/disclaimer" className="text-gray-400 hover:text-white transition-colors">Disclaimer</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white font-semibold mb-3 text-sm uppercase tracking-wide">Stay Updated</h3>
            <p className="text-sm text-gray-400 mb-3">
              Get one simple tech guide per week.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-2">
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-3 py-2.5 rounded-lg bg-white/5 border border-gray-700 text-white placeholder:text-gray-500 text-sm focus:outline-none focus:border-blue-400"
              />
              <button
                type="submit"
                className="w-full px-3 py-2.5 rounded-lg bg-brand-blue text-white text-sm font-semibold hover:bg-blue-700 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} {SITE_NAME}. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Made with <Heart className="w-3.5 h-3.5 text-red-500" /> for seniors everywhere
          </p>
        </div>
      </div>
    </footer>
  )
}

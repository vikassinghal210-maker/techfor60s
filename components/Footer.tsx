import Link from 'next/link'
import { SITE_NAME } from '@/lib/utils'

export default function Footer() {
  return (
    <footer className="bg-brand-dark text-gray-300 mt-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <p className="text-white text-lg font-bold font-[family-name:var(--font-heading)] mb-2 no-underline">
              Tech<span className="text-blue-400">For60s</span>
            </p>
            <p className="text-sm leading-relaxed">
              Simple, jargon-free tech guides written for adults over 60. Learn at your own pace.
            </p>
          </div>

          {/* Quick Links */}
          <div className="no-underline">
            <h3 className="text-white font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/blog" className="hover:text-white transition-colors">All Guides</Link></li>
              <li><Link href="/category/how-to-guides" className="hover:text-white transition-colors">How-To Guides</Link></li>
              <li><Link href="/category/product-reviews" className="hover:text-white transition-colors">Product Reviews</Link></li>
              <li><Link href="/category/safety-security" className="hover:text-white transition-colors">Safety &amp; Security</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="no-underline">
            <h3 className="text-white font-semibold mb-3">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/disclaimer" className="hover:text-white transition-colors">Disclaimer</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

import Link from 'next/link'
import { Home, Search } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-20 text-center">
      <div className="text-8xl font-bold gradient-text mb-4 font-[family-name:var(--font-heading)]">404</div>
      <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-[var(--text-primary)] mb-4">
        Page Not Found
      </h2>
      <p className="text-[var(--text-secondary)] text-lg mb-8 max-w-md mx-auto">
        Sorry, we could not find the page you were looking for.
        It may have been moved or no longer exists.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center no-underline">
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 bg-brand-blue text-white font-semibold px-8 py-3 rounded-xl text-lg hover:bg-blue-800 transition-colors no-underline"
        >
          <Home className="w-5 h-5" />
          Go Back Home
        </Link>
        <Link
          href="/blog"
          className="inline-flex items-center justify-center gap-2 border-2 border-[var(--border-color)] text-[var(--text-secondary)] font-semibold px-8 py-3 rounded-xl text-lg hover:border-brand-blue hover:text-brand-blue transition-all no-underline"
        >
          <Search className="w-5 h-5" />
          Browse Guides
        </Link>
      </div>
    </div>
  )
}

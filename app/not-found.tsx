import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 text-center">
      <h1 className="text-6xl font-bold text-gray-300 mb-4">404</h1>
      <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-brand-dark mb-4">
        Page Not Found
      </h2>
      <p className="text-gray-600 text-lg mb-8">
        Sorry, we could not find the page you were looking for.
        It may have been moved or no longer exists.
      </p>
      <Link
        href="/"
        className="inline-block bg-brand-blue text-white font-semibold px-8 py-3 rounded-lg text-lg hover:bg-blue-800 transition-colors no-underline"
      >
        Go Back Home
      </Link>
    </div>
  )
}

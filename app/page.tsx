import Link from 'next/link'
import { getAllPostsMeta } from '@/lib/mdx'
import { CATEGORIES, formatDate } from '@/lib/utils'
import { breadcrumbJsonLd } from '@/lib/seo'
import { SITE_URL } from '@/lib/utils'

export const revalidate = 3600

export default function HomePage() {
  const posts = getAllPostsMeta()
  const featured = posts.find((p) => p.featured) ?? posts[0]
  const recent = posts.slice(0, 6)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([{ name: 'Home', url: SITE_URL }])
          ),
        }}
      />

      {/* Hero */}
      <section className="bg-brand-blue text-white py-16 sm:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-3xl sm:text-5xl font-bold font-[family-name:var(--font-heading)] mb-4 leading-tight">
            Technology Made Simple<br />
            <span className="text-blue-200">for Over 60s</span>
          </h1>
          <p className="text-lg sm:text-xl text-blue-100 max-w-2xl mx-auto mb-8">
            Clear, step-by-step guides to help you master your phone, tablet, and everyday tech.
            No jargon. No rush. Just simple help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center no-underline">
            <Link
              href="/blog"
              className="inline-block bg-white text-brand-blue font-semibold px-8 py-3 rounded-lg text-lg hover:bg-blue-50 transition-colors"
            >
              Browse All Guides
            </Link>
            <Link
              href="/category/how-to-guides"
              className="inline-block border-2 border-white text-white font-semibold px-8 py-3 rounded-lg text-lg hover:bg-white/10 transition-colors"
            >
              Start Learning
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-brand-dark mb-6">
          What Would You Like to Learn?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 no-underline">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className="block p-5 bg-white rounded-lg border border-gray-200 hover:border-brand-blue hover:shadow-md transition-all"
            >
              <h3 className="font-semibold text-brand-dark text-lg mb-1">{cat.label}</h3>
              <p className="text-gray-600 text-sm">{cat.description}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Recent Articles */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-brand-dark mb-6">
          Latest Guides
        </h2>
        {recent.length === 0 ? (
          <p className="text-gray-600 text-lg">
            New guides coming soon! Check back shortly.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 no-underline">
            {recent.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="block bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
              >
                {post.thumbnail && (
                  <img
                    src={post.thumbnail}
                    alt={post.thumbnailAlt ?? post.title}
                    className="w-full h-44 object-cover"
                    loading="lazy"
                  />
                )}
                <div className="p-4">
                  {post.difficulty && (
                    <span className="inline-block text-xs font-semibold uppercase px-2 py-0.5 rounded bg-blue-100 text-brand-blue mb-2">
                      {post.difficulty}
                    </span>
                  )}
                  <h3 className="font-semibold text-brand-dark mb-1 leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-2">{post.excerpt}</p>
                  <p className="text-gray-400 text-xs mt-2">
                    {formatDate(post.date)} · {post.readingTime}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Trust section */}
      <section className="bg-white py-12 mt-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-brand-dark mb-4">
            Why TechFor60s?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-8">
            <div>
              <div className="text-4xl mb-3">📱</div>
              <h3 className="font-semibold text-lg mb-1">No Jargon</h3>
              <p className="text-gray-600 text-sm">
                Every guide is written in plain English. We explain every step clearly.
              </p>
            </div>
            <div>
              <div className="text-4xl mb-3">🐢</div>
              <h3 className="font-semibold text-lg mb-1">Your Own Pace</h3>
              <p className="text-gray-600 text-sm">
                No rush, no pressure. Read, re-read, and follow along step by step.
              </p>
            </div>
            <div>
              <div className="text-4xl mb-3">🛡️</div>
              <h3 className="font-semibold text-lg mb-1">Stay Safe</h3>
              <p className="text-gray-600 text-sm">
                Learn to spot scams, protect your passwords, and use the internet safely.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

import Link from 'next/link'
import type { Metadata } from 'next'
import { getAllPostsMeta } from '@/lib/mdx'
import { formatDate, SITE_URL, SITE_NAME } from '@/lib/utils'
import Breadcrumbs from '@/components/Breadcrumbs'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'All Guides',
  description: 'Browse all tech guides, tutorials, and product reviews written for seniors. Simple, step-by-step help for smartphones, tablets, and everyday technology.',
  alternates: { canonical: `${SITE_URL}/blog` },
}

export default function BlogPage() {
  const posts = getAllPostsMeta()

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'All Guides' }]} />

      <h1 className="text-3xl font-bold font-[family-name:var(--font-heading)] text-brand-dark mb-2">
        All Guides
      </h1>
      <p className="text-gray-600 mb-8">
        {posts.length} articles to help you with technology. Start with any guide that interests you.
      </p>

      <div className="space-y-4 no-underline">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="flex gap-4 p-4 bg-white rounded-lg border border-gray-200 hover:border-brand-blue hover:shadow-sm transition-all"
          >
            {post.thumbnail && (
              <img
                src={post.thumbnail}
                alt={post.thumbnailAlt ?? post.title}
                className="w-24 h-24 sm:w-32 sm:h-24 object-cover rounded-md flex-shrink-0"
                loading="lazy"
              />
            )}
            <div className="min-w-0">
              <h2 className="font-semibold text-brand-dark leading-snug mb-1">
                {post.title}
              </h2>
              <p className="text-gray-600 text-sm line-clamp-2">{post.excerpt}</p>
              <p className="text-gray-400 text-xs mt-1">
                {formatDate(post.date)} · {post.readingTime}
                {post.difficulty && (
                  <span className="ml-2 inline-block px-1.5 py-0.5 bg-blue-50 text-brand-blue rounded text-xs font-medium">
                    {post.difficulty}
                  </span>
                )}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

import Link from 'next/link'
import type { Metadata } from 'next'
import { getAllPostsMeta } from '@/lib/mdx'
import { CATEGORIES, SITE_URL } from '@/lib/utils'
import Breadcrumbs from '@/components/Breadcrumbs'
import ArticleCard from '@/components/ArticleCard'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'All Guides',
  description: 'Browse all tech guides, tutorials, and product reviews written for seniors. Simple, step-by-step help for smartphones, tablets, and everyday technology.',
  alternates: { canonical: `${SITE_URL}/blog` },
}

export default function BlogPage() {
  const posts = getAllPostsMeta()

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'All Guides' }]} />

      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-heading)] text-[var(--text-primary)] mb-3">
          All Guides
        </h1>
        <p className="text-[var(--text-secondary)]">
          {posts.length} articles to help you with technology. Start with any guide that interests you.
        </p>
      </div>

      {/* Category filter pills */}
      <div className="flex flex-wrap gap-2 mb-8 no-underline">
        <Link
          href="/blog"
          className="px-4 py-2 rounded-full text-sm font-medium bg-brand-blue text-white no-underline"
        >
          All
        </Link>
        {CATEGORIES.map((cat) => (
          <Link
            key={cat.slug}
            href={`/category/${cat.slug}`}
            className="px-4 py-2 rounded-full text-sm font-medium border border-[var(--border-color)] text-[var(--text-secondary)] hover:border-brand-blue hover:text-brand-blue transition-all no-underline"
          >
            {cat.label}
          </Link>
        ))}
      </div>

      {/* Articles */}
      <div className="space-y-5">
        {posts.map((post, i) => (
          <ArticleCard key={post.slug} post={post} variant="list" index={i} />
        ))}
      </div>
    </div>
  )
}

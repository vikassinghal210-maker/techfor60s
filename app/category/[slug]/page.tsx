import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPostsByCategory } from '@/lib/mdx'
import { generateCategoryMetadata } from '@/lib/seo'
import { CATEGORIES, formatDate, getCategoryInfo } from '@/lib/utils'
import Breadcrumbs from '@/components/Breadcrumbs'

export const revalidate = 3600

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata(
  props: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await props.params
  const cat = getCategoryInfo(slug)
  if (!CATEGORIES.find((c) => c.slug === slug)) return {}
  return generateCategoryMetadata(slug, cat.label, cat.description)
}

export default async function CategoryPage(
  props: { params: Promise<{ slug: string }> }
) {
  const { slug } = await props.params
  const cat = CATEGORIES.find((c) => c.slug === slug)
  if (!cat) notFound()

  const posts = getPostsByCategory(slug)

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: cat.label }]} />

      <h1 className="text-3xl font-bold font-[family-name:var(--font-heading)] text-brand-dark mb-2">
        {cat.label}
      </h1>
      <p className="text-gray-600 mb-8">{cat.description}</p>

      {posts.length === 0 ? (
        <p className="text-gray-500 text-lg">
          New guides coming soon for this category. Check back shortly!
        </p>
      ) : (
        <div className="space-y-4 no-underline">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="flex gap-4 p-4 bg-white rounded-lg border border-gray-200 hover:border-brand-blue hover:shadow-sm transition-all"
            >
              <div className="min-w-0">
                <h2 className="font-semibold text-brand-dark leading-snug mb-1">
                  {post.title}
                </h2>
                <p className="text-gray-600 text-sm line-clamp-2">{post.excerpt}</p>
                <p className="text-gray-400 text-xs mt-1">
                  {formatDate(post.date)} · {post.readingTime}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

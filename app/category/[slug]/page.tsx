import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPostsByCategory } from '@/lib/mdx'
import { generateCategoryMetadata, breadcrumbJsonLd, itemListJsonLd } from '@/lib/seo'
import { CATEGORIES, getCategoryInfo, SITE_URL } from '@/lib/utils'
import Breadcrumbs from '@/components/Breadcrumbs'
import ArticleCard from '@/components/ArticleCard'
import { BookOpen, Star, Shield, Lightbulb, Smartphone, ChevronRight } from 'lucide-react'

export const revalidate = 3600

const CATEGORY_ICONS: Record<string, typeof BookOpen> = {
  'how-to-guides': BookOpen,
  'product-reviews': Star,
  'safety-security': Shield,
  'explainers': Lightbulb,
  'apps-services': Smartphone,
}

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
  const Icon = CATEGORY_ICONS[slug] ?? BookOpen
  const otherCategories = CATEGORIES.filter((c) => c.slug !== slug)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: 'Home', url: SITE_URL },
              { name: cat.label, url: `${SITE_URL}/category/${slug}` },
            ])
          ),
        }}
      />
      {posts.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              itemListJsonLd(
                posts.slice(0, 10).map((p, i) => ({
                  position: i + 1,
                  name: p.title,
                  url: `${SITE_URL}/blog/${p.slug}`,
                }))
              )
            ),
          }}
        />
      )}
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: cat.label }]} />

      {/* Category header */}
      <div className="flex items-start gap-4 mb-8">
        <div className={`w-14 h-14 rounded-2xl ${cat.color} text-white flex items-center justify-center shrink-0`}>
          <Icon className="w-7 h-7" />
        </div>
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-heading)] text-[var(--text-primary)] mb-1">
            {cat.label}
          </h1>
          <p className="text-[var(--text-secondary)]">{cat.description}</p>
          <p className="text-sm text-[var(--text-muted)] mt-1">
            {posts.length} {posts.length === 1 ? 'guide' : 'guides'} available
          </p>
        </div>
      </div>

      {/* Articles */}
      {posts.length === 0 ? (
        <div className="card p-12 text-center">
          <p className="text-[var(--text-secondary)] text-lg mb-4">
            New guides coming soon for this category!
          </p>
          <Link
            href="/blog"
            className="text-brand-blue font-medium hover:underline"
          >
            Browse all guides instead
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {posts.map((post, i) => (
            <ArticleCard key={post.slug} post={post} variant="grid" index={i} />
          ))}
        </div>
      )}

      {/* Browse other categories */}
      <section className="mt-8 pt-8 border-t border-[var(--border-color)]">
        <h2 className="text-xl font-bold font-[family-name:var(--font-heading)] text-[var(--text-primary)] mb-4">
          Browse Other Categories
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 no-underline">
          {otherCategories.map((c) => {
            const OtherIcon = CATEGORY_ICONS[c.slug] ?? BookOpen
            return (
              <Link
                key={c.slug}
                href={`/category/${c.slug}`}
                className="group card p-4 flex items-center gap-3 hover:border-brand-blue/30 no-underline transition-all"
              >
                <div className={`w-9 h-9 rounded-lg ${c.color} text-white flex items-center justify-center shrink-0`}>
                  <OtherIcon className="w-4 h-4" />
                </div>
                <span className="font-medium text-[var(--text-primary)] group-hover:text-brand-blue transition-colors flex-1">
                  {c.label}
                </span>
                <ChevronRight className="w-4 h-4 text-[var(--text-muted)]" />
              </Link>
            )
          })}
        </div>
      </section>
    </div>
    </>
  )
}

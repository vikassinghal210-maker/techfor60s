import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { getAllSlugs, getPostBySlug, getRelatedPosts, markdownToHtml } from '@/lib/mdx'
import { generateArticleMetadata, articleJsonLd, breadcrumbJsonLd } from '@/lib/seo'
import { formatDate, getCategoryInfo, SITE_URL } from '@/lib/utils'
import Breadcrumbs from '@/components/Breadcrumbs'
import ReadingProgress from '@/components/ReadingProgress'
import SocialShare from '@/components/SocialShare'
import FeedbackWidget from '@/components/FeedbackWidget'
import BackToTop from '@/components/BackToTop'
import ArticleCard from '@/components/ArticleCard'

export const revalidate = 3600
export const dynamicParams = true

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata(
  props: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await props.params
  const post = getPostBySlug(slug)
  if (!post) return {}
  return generateArticleMetadata(post, slug)
}

export default async function BlogPostPage(
  props: { params: Promise<{ slug: string }> }
) {
  const { slug } = await props.params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  const category = getCategoryInfo(post.category)
  const related = getRelatedPosts(post.slug, post.category, post.tags, 3)
  const wordCount = post.content.trim().split(/\s+/).length
  const articleUrl = `${SITE_URL}/blog/${slug}`
  const htmlContent = markdownToHtml(post.content)

  return (
    <>
      <ReadingProgress />
      <BackToTop />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleJsonLd(post, slug, wordCount)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: 'Home', url: SITE_URL },
              { name: category.label, url: `${SITE_URL}/category/${category.slug}` },
              { name: post.title },
            ])
          ),
        }}
      />

      <article className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: category.label, href: `/category/${category.slug}` },
            { label: post.title },
          ]}
        />

        {/* Header */}
        <header className="mb-8">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <Link
              href={`/category/${category.slug}`}
              className={`text-xs font-semibold px-3 py-1 rounded-full text-white no-underline ${category.color}`}
            >
              {category.label}
            </Link>
            {post.difficulty && (
              <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-blue-50 text-brand-blue dark:bg-blue-900/30">
                {post.difficulty}
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold font-[family-name:var(--font-heading)] text-[var(--text-primary)] leading-[1.15] mb-4">
            {post.title}
          </h1>

          <p className="text-lg text-[var(--text-secondary)] leading-relaxed mb-4">
            {post.excerpt}
          </p>

          <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--text-muted)]">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-brand-blue text-white flex items-center justify-center text-xs font-bold">
                TF
              </div>
              <div>
                <span className="font-medium text-[var(--text-primary)]">{post.author}</span>
              </div>
            </div>
            <span className="hidden sm:inline">·</span>
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span>·</span>
            <span>{post.readingTime}</span>
            {post.estimatedTime && (
              <>
                <span>·</span>
                <span className="text-brand-green font-medium">Takes about {post.estimatedTime}</span>
              </>
            )}
          </div>

          {/* Share buttons */}
          <div className="mt-5 pt-5 border-t border-[var(--border-color)]">
            <SocialShare url={articleUrl} title={post.title} />
          </div>
        </header>

        {/* Thumbnail */}
        {post.thumbnail && (
          <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden mb-10 border border-[var(--border-color)]">
            <Image
              src={post.thumbnail}
              alt={post.thumbnailAlt ?? post.title}
              fill
              sizes="(max-width: 768px) 100vw, 896px"
              className="object-cover"
              priority
            />
          </div>
        )}

        <div className="lg:grid lg:grid-cols-[1fr_220px] lg:gap-10">
          {/* Main content */}
          <div>
            {/* Table of Contents — mobile (inline) */}
            {post.toc.length > 2 && (
              <nav className="lg:hidden card-flat p-5 mb-8">
                <h2 className="font-semibold text-[var(--text-primary)] mb-3 text-sm uppercase tracking-wide">
                  In This Guide
                </h2>
                <ul className="space-y-1.5">
                  {post.toc.map((item) => (
                    <li key={item.id} className={item.level === 3 ? 'ml-4' : ''}>
                      <a
                        href={`#${item.id}`}
                        className="text-brand-blue hover:text-blue-800 text-sm no-underline hover:underline"
                      >
                        {item.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            )}

            {/* Article content */}
            <div
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />

            {/* Tags */}
            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-10 pt-6 border-t border-[var(--border-color)]">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 bg-[var(--bg-tertiary)] text-[var(--text-secondary)] rounded-full text-sm font-medium"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Feedback Widget */}
            <div className="mt-10">
              <FeedbackWidget slug={slug} />
            </div>

            {/* Bottom share */}
            <div className="mt-8 pt-6 border-t border-[var(--border-color)]">
              <p className="text-[var(--text-muted)] text-sm mb-3">
                Know someone who would find this useful?
              </p>
              <SocialShare url={articleUrl} title={post.title} />
            </div>
          </div>

          {/* Sidebar — desktop TOC */}
          {post.toc.length > 2 && (
            <aside className="hidden lg:block">
              <nav className="sticky top-24">
                <h2 className="font-semibold text-[var(--text-primary)] mb-3 text-xs uppercase tracking-widest">
                  In This Guide
                </h2>
                <ul className="space-y-1.5 border-l-2 border-[var(--border-color)] pl-4">
                  {post.toc.map((item) => (
                    <li key={item.id} className={item.level === 3 ? 'ml-3' : ''}>
                      <a
                        href={`#${item.id}`}
                        className="text-[var(--text-muted)] hover:text-brand-blue text-xs no-underline hover:underline transition-colors leading-relaxed"
                      >
                        {item.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </aside>
          )}
        </div>

        {/* Related Articles */}
        {related.length > 0 && (
          <section className="mt-14 pt-10 border-t border-[var(--border-color)]">
            <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-[var(--text-primary)] mb-6">
              You Might Also Like
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {related.map((r, i) => (
                <ArticleCard key={r.slug} post={r} variant="grid" index={i} />
              ))}
            </div>
          </section>
        )}
      </article>
    </>
  )
}

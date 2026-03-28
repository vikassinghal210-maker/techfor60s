import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getAllSlugs, getPostBySlug, getRelatedPosts } from '@/lib/mdx'
import { generateArticleMetadata, articleJsonLd, breadcrumbJsonLd } from '@/lib/seo'
import { formatDate, getCategoryInfo, SITE_URL } from '@/lib/utils'
import Breadcrumbs from '@/components/Breadcrumbs'

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

  return (
    <>
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

      <article className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: category.label, href: `/category/${category.slug}` },
            { label: post.title },
          ]}
        />

        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span>·</span>
            <span>{post.readingTime}</span>
            {post.difficulty && (
              <>
                <span>·</span>
                <span className="inline-block px-2 py-0.5 bg-blue-50 text-brand-blue rounded font-medium">
                  {post.difficulty}
                </span>
              </>
            )}
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-heading)] text-brand-dark leading-tight mb-3">
            {post.title}
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">{post.excerpt}</p>
          {post.estimatedTime && (
            <p className="mt-3 text-sm text-brand-green font-medium">
              This takes about {post.estimatedTime} to do.
            </p>
          )}
        </header>

        {/* Thumbnail */}
        {post.thumbnail && (
          <img
            src={post.thumbnail}
            alt={post.thumbnailAlt ?? post.title}
            className="w-full rounded-lg mb-8"
          />
        )}

        {/* Table of Contents */}
        {post.toc.length > 2 && (
          <nav className="bg-white border border-gray-200 rounded-lg p-5 mb-8">
            <h2 className="font-semibold text-brand-dark mb-3">In This Guide</h2>
            <ul className="space-y-1.5 no-underline">
              {post.toc.map((item) => (
                <li
                  key={item.id}
                  className={item.level === 3 ? 'ml-4' : ''}
                >
                  <a
                    href={`#${item.id}`}
                    className="text-brand-blue hover:text-blue-800 text-sm"
                  >
                    {item.text}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}

        {/* Article content — rendered as HTML from MDX */}
        <div
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: markdownToHtml(post.content) }}
        />

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-gray-200">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Related Articles */}
        {related.length > 0 && (
          <section className="mt-12 pt-8 border-t border-gray-200">
            <h2 className="text-xl font-bold font-[family-name:var(--font-heading)] text-brand-dark mb-4">
              You Might Also Like
            </h2>
            <div className="space-y-3 no-underline">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/blog/${r.slug}`}
                  className="block p-3 bg-white rounded-lg border border-gray-200 hover:border-brand-blue transition-colors"
                >
                  <h3 className="font-medium text-brand-dark">{r.title}</h3>
                  <p className="text-gray-500 text-sm mt-0.5">{r.readingTime}</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>
    </>
  )
}

// Simple markdown to HTML (basic — handles headings, paragraphs, lists, links, bold, italic, images)
function markdownToHtml(md: string): string {
  let html = md
    // Code blocks
    .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre><code>$2</code></pre>')
    // Inline code
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    // Images
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" loading="lazy" />')
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
    // H3
    .replace(/^### (.+)$/gm, (_, t) => `<h3 id="${slugifyHeading(t)}">${t}</h3>`)
    // H2
    .replace(/^## (.+)$/gm, (_, t) => `<h2 id="${slugifyHeading(t)}">${t}</h2>`)
    // Bold
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    // Italic
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    // Unordered lists
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    // Ordered lists
    .replace(/^\d+\. (.+)$/gm, '<li>$1</li>')
    // Horizontal rule
    .replace(/^---$/gm, '<hr />')
    // Paragraphs (lines not already tagged)
    .replace(/^(?!<[hluop]|<li|<hr|<pre|<img)(.+)$/gm, '<p>$1</p>')
    // Wrap consecutive <li> in <ul>
    .replace(/(<li>.*<\/li>\n?)+/g, (match) => `<ul>${match}</ul>`)

  return html
}

function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/(^-|-$)/g, '')
}
